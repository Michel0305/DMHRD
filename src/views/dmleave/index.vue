<template>
  <div class="app-container-leave">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" icon="el-icon-edit" size="mini" :disabled="isEdit" @click="NewUserleave">创建</el-button>
          <el-button icon="el-icon-edit-outline" size="mini" :disabled="isEdit" @click="EditUserleave">修改</el-button>
          <el-button type="warning" icon="el-icon-collection-tag" size="mini" :disabled="!isEdit" @click="submitLeave(0)">草稿</el-button>
          <el-button type="success" icon="el-icon-check" size="mini" :disabled="!isEdit" @click="submitLeave(1)">送出</el-button>
          <el-button type="info" icon="el-icon-close" size="mini" :disabled="!isEdit" @click="cancelUserleave">取消</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" :offset="5">
        <el-form ref="leaveData" :model="tmpleaveData" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请人" prop="userid">
                <el-select v-model="tmpleaveData.userid" filterable placeholder="请假人" size="mini" :disabled="!isEdit || this.tmpleaveData.userid !== ''">
                  <el-option
                    v-for="item in $store.state.departmentjob.personals.filter(el => {
                      if($store.getters.partids.findIndex((es)=>{ return el.defpartid == es} )>=0 || parseInt(el.user_id) == parseInt($store.getters.account)){
                        return el}})"
                    :key="item.user_id"
                    :label="item.user_name"
                    :value="item.user_id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="请假类别" prop="leavetype">
                <el-select v-model="tmpleaveData.leavetype" placeholder="请选择类别" size="mini" :disabled="!isEdit">
                  <el-option v-for="item in leaveTypes" :key="item.id" :label="item.leavename" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="请假日期" prop="freedate">
                <el-date-picker v-model="tmpleaveData.freedate" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :disabled="!isEdit" :picker-options="pickerOptions" @change="verifyDate" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="请假说明" prop="remark">
            <el-input v-model="tmpleaveData.remark" type="textarea" :disabled="!isEdit" />
          </el-form-item>

          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="附件">
                <el-upload ref="upload" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :limit="1">
                  <el-button slot="trigger" size="mini" type="primary" :disabled="!isEdit">选取</el-button>
                  <el-button class="uploadbtn" style="margin-left: 10px" size="mini" type="success" :disabled="!isEdit" @click="submitUpload">上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>

      <el-col :span="22" :offset="1">
        <el-table :data="leaveData" size="small" :max-height="$store.getters.locheight - 280" border style="width: 100%" @row-click="setRowData">
          <el-table-column v-show="false" prop="id" label="编号" width="100" />
          <el-table-column prop="userid" label="姓名" :formatter="formatUserName" width="100" />
          <el-table-column prop="userid" label="部门" width="150" :formatter="formatUserDept" />
          <el-table-column prop="leavetype" label="类别" width="50" :formatter="formatLeaveType" />
          <el-table-column prop="starttime" label="开始日期">
            <template slot-scope="scope">{{
              $moment(scope.row.starttime).utc().format("YYYY-MM-DD HH:mm:ss")
            }}</template>
          </el-table-column>
          <el-table-column prop="endtime" label="结束日期">
            <template slot-scope="scope">{{
              $moment(scope.row.endtime).utc().format("YYYY-MM-DD HH:mm:ss")
            }}</template>
          </el-table-column>
          <el-table-column label="天数" width="50" prop="days" />
          <el-table-column label="小时" width="50" prop="timetotal" :formatter="formatHours" />
          <el-table-column label="请假原因" prop="remark" />
          <el-table-column prop="applovestatus" label="单据状态" width="120" sortable :sort-by="['applovestatus']" class="statsmsg">
            <template slot-scope="scope">
              <el-tag :type="scope.row.applovestatus == 20 || scope.row.applovestatus == 15 ?'success':scope.row.applovestatus === -10 ?'danger' : ''" disable-transitions effect="dark" size="mini">
                {{ formatLeaveStatus(scope.row) }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import { leavebase, leaveapply } from '@/api/leave'
export default {
  name: 'Dmleave',
  data() {
    return {
      loading: '',
      tmpleaveData: {
        id: 0,
        userid: '',
        leavetype: '',
        remark: '',
        freedate: [],
        applovestatus: 0
      },
      editClick: false,
      isEdit: false,
      fileList: [],
      leaveData: [],
      leaveLog: [],
      leaveStatus: [],
      leaveTypes: [],
      pickerOptions: {
        onPick: (time) => {
          // console.log(time);
        },
        disabledDate(time) {
          return time.getTime() < new Date(new Date().setDate(new Date().getDate() - 3))
        }
      },
      rules: {
        userid: [{ required: true, message: '请输入申请人', trigger: 'blur' }],
        leavetype: [
          { required: true, message: '请选择请假类别', trigger: 'change' }
        ],
        freedate: [{
          required: true,
          message: '请选择日期',
          trigger: 'change'
        }]
      }
    }
  },
  created() {
    this.openFullScreen2()
    leavebase().then((baseData) => {
      if (baseData.data.code == 200) {
        const fliterUser = this.$store.getters.departmentjob_personals.filter((el) => { if (this.$store.getters.partids.findIndex((es) => { return el.defpartid == es }) >= 0) { return el.user_id } })
        this.leaveData = [] = baseData.data.msg.leaveBase.filter((el) => { if (fliterUser.findIndex((evl) => { return parseInt(evl.user_id) == parseInt(el.userid) }) >= 0 || el.userid == this.$store.getters.account || el.createuser == this.$store.getters.account) return el })
        this.leaveLog = [] = baseData.data.msg.leaveLog
        this.leaveStatus = [] = baseData.data.msg.leaveStatus
        this.leaveTypes = [] = baseData.data.msg.leaveType
      } else {
        console.log(baseData.data.msg)
        this.$message.error(`数据初始化失败,请关闭当前页面,刷新试试`)
      }
      this.loading.close()
    })
  },
  mounted: function() {},
  methods: {
    NewUserleave() {
      this.isEdit = true
      this.editClick = false
      this.tmpleaveData.id = 0
      this.resetForm('leaveData')
    },
    EditUserleave() {
      if (this.tmpleaveData.userid == '' || this.tmpleaveData.applovestatus > 0) { return this.$message.warning(`当前状态不可修改`) }
      this.isEdit = true
    },
    cancelUserleave() {
      this.isEdit = false
      this.resetForm('leaveData')
    },
    submitLeave(types) {
      // 提交
      this.openFullScreen2()
      this.$refs['leaveData'].validate((valid) => {
        if (valid) {
          this.tmpleaveData.types = types
          leaveapply(this.tmpleaveData).then((rs) => {
            if (rs.data.code == 200) {
              if (rs.data.msg.code == 200) {
                this.repaceCurFormDate(rs.data.msg)
                this.$message.success(`请假单提交成功`)
                this.resetForm('leaveData')
              } else {
                this.$message.error(`${rs.data.msg.msg}`)
                this.loading.close()
                return
              }
            } else {
              this.$message.error(`请假单提交失败,请刷新后重试`)
              this.loading.close()
              return
            }
            this.isEdit = false
            this.loading.close()
            //
          })
        } else {
          this.notifyMsg(
            '提交失败',
            'error',
            `${this.tmpleaveData.userid} -- 请假单提交失败,请核对申请数据`
          )
          this.loading.close()
          return false
        }
      })
    },
    notifyMsg(title, type, msg) {
      const h = this.$createElement
      this.$notify({
        title: title,
        type: type,
        message: msg
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    setRowData(row, column) {
      if (this.isEdit) return
      this.tmpleaveData.id = row.id
      this.tmpleaveData.userid = parseInt(row.userid)
      this.tmpleaveData.leavetype = row.leavetype
      this.tmpleaveData.remark = row.remark
      this.tmpleaveData.freedate = [
        this.$moment(row.starttime).utc().format('YYYY-MM-DD HH:mm:ss'),
        this.$moment(row.endtime).utc().format('YYYY-MM-DD HH:mm:ss')
      ]
      this.tmpleaveData.applovestatus = row.applovestatus
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
    formatLeaveType(row, colum) {
      const tmpUser = this.leaveTypes.filter((el) => {
        return parseInt(el.id) === parseInt(row.leavetype)
      })
      return tmpUser.length == 0 ? '未知' : tmpUser[0].leavename
    },
    formatLeaveStatus(row, colum) {
      const tmpUser = this.leaveStatus.filter((el) => {
        return parseInt(el.statusid) === parseInt(row.applovestatus)
      })
      return tmpUser.length == 0 ? '未知' : tmpUser[0].msg
    },
    formatHours(row, colum) {
      return (row.timetotal / 60).toFixed(1)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    /**
         * 更新本地显示数据
         */
    repaceCurFormDate(values) {
      const indexId = this.leaveData.findIndex((val) => parseInt(val.id) === parseInt(values.id))
      const replaceData = {
        apploveid: values.apploveid,
        applovestatus: values.applovestatus,
        createuser: values.createuser,
        days: values.days,
        endtime: values.endtime,
        id: values.id,
        leavedate: values.leavedate,
        leavetype: values.leavetype,
        remark: values.remark,
        starttime: values.starttime,
        timetotal: values.timetotal,
        userid: values.userid
      }
      this.leaveData.splice(
        indexId < 0 ? 0 : indexId,
        indexId < 0 ? 0 : 1,
        replaceData
      )
    },

    verifyDate(val) {
      if (val.length !== 0) {
        if (this.$moment(val[0]).isBefore(this.$moment(new Date()).subtract(3, 'days'))) {
          this.$message.error({ message: '请假日期非有效期内，过往日期在三天内', duration: 10000 })
          this.tmpleaveData.freedate = []
          return
        }
      }
    },

    openFullScreen2() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
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
    margin-top: 5px;
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
