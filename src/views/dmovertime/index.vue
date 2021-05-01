<template>
  <div class="app-container-leave">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" icon="el-icon-edit" size="mini" :disabled="isEdit" @click="NewUserwork">创建</el-button>
          <el-button icon="el-icon-edit-outline" size="mini" :disabled="isEdit" @click="EditUserwork">修改</el-button>
          <el-button type="warning" icon="el-icon-collection-tag" size="mini" :disabled="!isEdit" @click="submitwork(0)">草稿</el-button>
          <el-button type="success" icon="el-icon-check" size="mini" :disabled="!isEdit" @click="submitwork(1)">送出</el-button>
          <el-button type="info" icon="el-icon-close" size="mini" :disabled="!isEdit" @click="cancelUserwork">取消</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" :offset="5">
        <el-form ref="workData" :model="tmpworkData" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请人" prop="userid">
                <el-select v-model="tmpworkData.userid" multiple filterable :collapse-tags="!checked" placeholder="加班人" size="mini" :disabled="!isEdit">
                  <el-option
                    v-for="item in $store.state.departmentjob.personals.filter(el => {
                      if(this.$store.getters.partids.findIndex((es)=>{ return el.defpartid == es} )>=0 || parseInt(el.user_id) == parseInt($store.getters.account)){
                        return el}}) "
                    :key="item.user_id"
                    :label="item.user_name"
                    :value="item.user_id"
                  />
                </el-select>
                <el-checkbox v-model="checked" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="加班类别" prop="worktype">
                <el-select v-model="tmpworkData.worktype" placeholder="请选择类别" size="mini" :disabled="!isEdit">
                  <el-option v-for="item in worksTypes" :key="item.id" :label="item.label" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="加班日期" prop="workdate">
                <el-date-picker v-model="tmpworkData.workdate" type="date" placeholder="选择日期" :disabled="!isEdit" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="时间" prop="starttime">
                <el-time-select
                  v-model="tmpworkData.starttime"
                  placeholder="起始时间"
                  :picker-options="{
                    start: '04:30',
                    step: '00:05',
                    end: '21:30',
                  }"
                  size="mini"
                  :disabled="!isEdit"
                />
                <el-time-select
                  v-model="tmpworkData.endtime"
                  placeholder="结束时间"
                  :picker-options="{
                    start: '07:30',
                    step: '00:05',
                    end: '23:30',
                    minTime: tmpworkData.starttime,
                  }"
                  size="mini"
                  :disabled="!isEdit"
                />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="加班说明" prop="workremark">
                <el-input v-model="tmpworkData.workremark" type="textarea" :disabled="!isEdit" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row />
        </el-form>
      </el-col>
      <el-col :span="22" :offset="1">
        <el-table :data="workData" size="mini" :max-height="$store.getters.locheight - 290" border style="width: 100%" @row-click="setRowData">
          <el-table-column prop="id" label="编号" width="50" />
          <el-table-column prop="userid" label="姓名" :formatter="formatUserName" width="80" />
          <el-table-column prop="userid" label="部门" width="150" :formatter="formatUserDept" />
          <el-table-column prop="leavetype" label="类别" width="70" :formatter="formatworkType" />
          <el-table-column prop="workdate" label="加班日期" width="120" :formatter="formatworkDate" />
          <el-table-column prop="starttime" label="开始时间" width="80" />
          <el-table-column prop="endtime" label="结束时间" width="80" />
          <el-table-column label="长度(小时)" width="100" prop="timecount" />
          <el-table-column label="请假原因" prop="workremark" />
          <el-table-column prop="applovestatus" label="单据状态" width="120" sortable :sort-by="['applovestatus']">
            <template slot-scope="scope">
              <el-tag :type="scope.row.applovestatus == 20 || scope.row.applovestatus == 15 ?'success':scope.row.applovestatus === -10 ?'danger' : ''" disable-transitions effect="dark" size="mini">
                {{ formatworkStatus(scope.row,null) }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  workbase,
  workinfodb
} from '@/api/overwork'
export default {
  name: 'Overtime',
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() - 5 > new Date(new Date().setDate(new Date().getDate() + 2)) || time.getTime() < new Date(new Date().setDate(new Date().getDate() - 3))
        }
      },
      checked: false,
      tmpworkData: {
        id: 0,
        userid: [],
        worktype: '',
        workremark: '',
        starttime: '',
        endtime: '',
        workdate: '',
        timecount: '',
        applovestatus: ''
      },
      isEdit: false,
      fileList: [],
      workData: [],
      workLog: [],
      workStatus: [],
      worksTypes: [{
        id: 0,
        label: '平时'
      },
      {
        id: 1,
        label: '周末'
      },
      {
        id: 2,
        label: '节假日'
      },
      {
        id: 3,
        label: '连班'
      }
      ],
      rules: {
        userid: [{
          required: true,
          message: '请输入申请人',
          trigger: 'blur'
        }],
        worktype: [{
          required: true,
          message: '请选择加班类别',
          trigger: 'blur'
        }],
        workdate: [{
          required: true,
          message: '请选择加班日期',
          trigger: 'blur'
        }],
        starttime: [{
          required: true,
          message: '请选择开始时间',
          trigger: 'blur'
        }],
        endtime: [{
          required: true,
          message: '请选择结束时间',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    workbase().then((baseData) => {
      if (baseData.data.code == 200) {
        const fliterUser = this.$store.getters.departmentjob_personals.filter((el) => {
          if (this.$store.getters.partids.findIndex((es) => {
            return el.defpartid == es
          }) >= 0) {
            return el.user_id
          }
        })
        this.workData = [] = baseData.data.msg.workBase.filter((el) => {
          if (fliterUser.findIndex((evl) => {
            return parseInt(evl.user_id) == parseInt(el.userid)
          }) >= 0 || el.userid == this.$store.getters.account || el.createuser == this.$store.getters.account) return el
        })
        this.workLog = [] = baseData.data.msg.workLog
        this.workStatus = [] = baseData.data.msg.workStatus
      } else {
        console.log(baseData.data.msg)
        this.$message.error(`数据初始化失败,请重新刷新试试`)
      }
    })
  },
  mounted: function() {},
  methods: {
    NewUserwork() {
      this.isEdit = true
      this.tmpworkData = {
        id: 0,
        userid: '',
        worktype: '',
        workremark: '',
        starttime: '',
        endtime: '',
        workdate: '',
        applovestatus: ''
      }
    },
    EditUserwork() {
      if (this.tmpworkData.userid == '' || this.tmpworkData.applovestatus > 0) { return this.$message.warning(`当前状态不可进行编辑`) }
      this.isEdit = true
    },
    cancelUserwork() {
      this.isEdit = false
      this.tmpworkData = {
        id: '',
        userid: '',
        worktype: '',
        workremark: '',
        starttime: '',
        endtime: '',
        workdate: '',
        applovestatus: ''
      }
    },
    submitwork(types) {
      this.$refs['workData'].validate((valid) => {
        if (valid) {
          let htmlmsg = ''
          let isPass = true
          this.tmpworkData.types = types
          workinfodb(this.tmpworkData).then((resback) => {
            if (resback.data.code == 200) {
              for (let i = 0; i < resback.data.msg.length; i++) {
                const el = resback.data.msg[i]
                if (el.code == 400) {
                  isPass = false
                  htmlmsg = htmlmsg + `<p> <strong>${el.username}</strong> 加班录入异常信息: </br> &nbsp&nbsp&nbsp&nbsp&nbsp <font size="1" color="red">${el.msg}</font></p>`
                } else {
                  this.replaceDefData(el)
                  this.notifyMsg(
                    '提交成功',
                    'success',
                    `${el.userid} -- 加班单提交成功`
                  )
                }
              }
              if (!isPass) {
                this.$alert(htmlmsg, '提交异常', {
                  dangerouslyUseHTMLString: true
                })
              }
              this.resetForm(formName)
            } else {
              console.log(resback.data.msg)
              this.$message.error(`数据保存失败请刷新后再试`)
            }
          })
          this.isEdit = false
        }
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    setRowData(row, column) {
      if (this.isEdit) return
      this.tmpworkData.id = row.id
      this.tmpworkData.userid = [row.userid]
      this.tmpworkData.worktype = row.worktype
      this.tmpworkData.workremark = row.workremark
      this.tmpworkData.starttime = row.starttime
      this.tmpworkData.endtime = row.endtime
      this.tmpworkData.workdate = row.workdate
      this.tmpworkData.applovestatus = row.applovestatus
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    formatUserName(row, colum) {
      const tmpUser = this.$store.state.departmentjob.personals.filter((el) => {
        return parseInt(el.user_id) === parseInt(row.userid)
      })
      return tmpUser.length == 0 ? row.userid : tmpUser[0].user_name
    },
    formatUserDept(row, colum) {
      const tmpUser = this.$store.state.departmentjob.personals.filter((el) => {
        return parseInt(el.user_id) === parseInt(row.userid)
      })
      return tmpUser.length == 0 ? '未知' : tmpUser[0].dept
    },
    formatworkType(row, colum) {
      switch (row.worktype) {
        case 1:
          return '周末'
          break
        case 2:
          return '节假日'
          break
        default:
          return '平时'
          break
      }
    },
    formatworkStatus(row, colum) {
      const tmpUser = this.workStatus.filter((el) => {
        return parseInt(el.statusid) === parseInt(row.applovestatus)
      })
      return tmpUser.length == 0 ? '未知' : tmpUser[0].msg
    },
    formatworkDate(row, col) {
      return this.$moment(row.workdate).format('YYYY-MM-DD')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    notifyMsg(title, type, msg) {
      const h = this.$createElement
      this.$notify({
        title: title,
        type: type,
        message: msg
      })
    },
    replaceDefData(newData) {
      const _tmp = {
        apploveid: newData.apploveid,
        applovestatus: newData.applovestatus,
        createtime: newData.createtime,
        createuser: newData.createuser,
        endtime: newData.endtime,
        id: newData.id,
        starttime: newData.starttime,
        timecount: newData.timecount,
        userid: newData.userid,
        workdate: newData.workdate,
        workremark: newData.workremark,
        worktype: newData.worktype
      }
      const indexID = this.workData.findIndex(val => parseInt(val.id) === parseInt(newData.id))
      this.workData.splice(
        indexID < 0 ? 0 : indexID,
        indexID < 0 ? 0 : 1,
        _tmp
      )
    }
  }
}
</script>

<style scoped>
.el-form {
    background: radial-gradient(#e6e1e1, transparent);
    padding: 20px;
}

.uploadbtn {
    height: 28px;
    margin-left: 10px;
}

.upload-demo {
    display: flex;
}

.ul {
    padding-left: 30px;
    height: 20px;
}

.grid-content {
    padding-top: 12px;
    border-radius: 4px;
    min-height: 50px;
    padding-left: 20px;
}

.bg-purple-dark {
    background: #dfe2e4;
}
</style>
