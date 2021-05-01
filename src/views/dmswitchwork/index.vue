<template>
  <div class="app-container-switchwork">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" icon="el-icon-edit" size="mini" :disabled="isEdit" @click="createNewDays">创建</el-button>
          <el-button icon="el-icon-edit-outline" size="mini" :disabled="isEdit" @click="editDays">修改</el-button>
          <el-button type="warning" icon="el-icon-collection-tag" size="mini" :disabled="!isEdit" @click="submitDays(0)">草稿</el-button>
          <el-button type="success" icon="el-icon-check" size="mini" :disabled="!isEdit" @click="submitDays(1)">送出</el-button>
          <el-button type="info" icon="el-icon-close" size="mini" :disabled="!isEdit" @click="cancelDays">取消</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-form ref="days" :model="baseForm" :rules="rules" label-width="80px">
          <el-form-item label="职员" prop="userid">
            <el-select v-model="baseForm.userid" filterable placeholder="请选择" size="mini" :disabled="!isEdit">
              <el-option
                v-for="item in $store.state.departmentjob.personals.filter(el => {
                  if(this.$store.getters.partids.findIndex((es)=>{ return el.defpartid == es} )>=0 || parseInt(el.user_id) == parseInt($store.getters.account)){
                    return el}}) "
                :key="item.user_id"
                :label="item.user_name"
                :value="item.user_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="申请日期" prop="workdate">
            <el-date-picker v-model="baseForm.workdate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" size="mini" :disabled="!isEdit" />
          </el-form-item>
          <el-form-item label="调休日期" prop="freedate">
            <el-date-picker v-model="baseForm.freedate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptionsEnd" size="mini" :disabled="!isEdit" />
          </el-form-item>
          <el-form-item label="备注" size="mini">
            <el-input v-model="baseForm.remark" type="textarea" :disabled="!isEdit" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="20" :offset="2">
        <el-table :data="switchWorkData" size="mini" border style="width: 100%" @cell-click="setRowData">
          <el-table-column prop="userid" label="姓名" width="120" :formatter="formatUserName" />
          <el-table-column label="部门" prop="userid" width="180" :formatter="formatUserDept" />
          <el-table-column prop="freedate" label="申请日期" width="120">
            <template slot-scope="scope">{{
              $moment(scope.row.freedate).format("YYYY-MM-DD")
            }}</template>
          </el-table-column>
          <el-table-column prop="workdate" label="调休日期" width="120">
            <template slot-scope="scope">{{
              $moment(scope.row.workdate).format("YYYY-MM-DD")
            }}</template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" />
          <el-table-column prop="appstatus" label="单据状态" width="120" sortable :sort-by="['appstatus']">
            <template slot-scope="scope">
              <el-tag :type="scope.row.appstatus == 20 || scope.row.appstatus == 15 ?'success':scope.row.appstatus === -10 ?'danger' : ''" disable-transitions effect="dark" size="mini">
                {{ formatStatus(scope.row) }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { getswitchwork, infoworkdate } from '@/api/switchwork'
export default {
  name: 'Switchwork',
  data() {
    return {
      isEdit: false,
      baseForm: {
        id: 0,
        userid: '',
        workdate: '',
        freedate: '',
        remark: ''
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date(new Date().setDate(new Date().getDate() - 1))
        }
      },
      pickerOptionsEnd: {
        disabledDate(time) {
          return time.getTime() < new Date(new Date().setDate(new Date().getDate()))
        }
      },
      rules: {
        userid: [{ required: true, message: '请输入申请人', trigger: 'blur' }],
        workdate: [
          { required: true, message: '请选择请假类别', trigger: 'blur' }
        ],
        freedate: [{
          required: true,
          message: '请选择日期',
          trigger: 'blur'
        }]
      },
      switchWorkData: []
    }
  },
  created() {
    getswitchwork().then((rs) => {
      if (rs.data.code == 200) {
        const fliterUser = this.$store.getters.departmentjob_personals.filter((el) => { if (this.$store.getters.partids.findIndex((es) => { return el.defpartid == es }) >= 0) { return el.user_id } })
        this.switchWorkData = [] = rs.data.msg.filter((el) => { if (fliterUser.findIndex((evl) => { return parseInt(evl.user_id) == parseInt(el.userid) }) >= 0 || el.userid == this.$store.getters.account || el.createuser == this.$store.getters.account) return el })
      } else {
        console.log(rs.data.msg)
        this.$message.error(`初始化数据发生异常,请关闭窗口,重新刷新网页`)
      }
    })
  },
  methods: {
    createNewDays() {
      this.isEdit = true
      this.baseForm = {
        id: 0,
        userid: '',
        workdate: '',
        freedate: '',
        remark: ''
      }
    },
    editDays() {
      if (this.baseForm.id == 0 || this.baseForm.appstatus > 0) return this.$message.warning(`当前状态不可进行编辑`)
      this.isEdit = true
    },
    submitDays(types) {
      this.$refs['days'].validate((valid) => {
        if (valid) {
          this.baseForm.types = types
          infoworkdate(this.baseForm).then((rs) => {
            if (rs.data.code == 200) {
              this.replaceDefData(rs.data.msg)
              this.resetForm('days')
              this.baseForm.id = 0
              this.baseForm.remark = ''
              this.$message.success(`数据新增/更新成功`)
            } else {
              console.log(rs.data.msg)
              this.$message.error(`数据新增/更新失败,请刷新网页后重试`)
            }
          })
          this.isEdit = false
        } else {
          this.$message.error(`数据提交异常,检查数据准确性`)
        }
      })
    },
    cancelDays() {
      this.isEdit = false
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
    setRowData(row, col) {
      if (this.isEdit) return
      this.baseForm = row
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    replaceDefData(info) {
      const indexID = this.switchWorkData.findIndex(val => parseInt(val.id) == parseInt(info.id))
      this.switchWorkData.splice(
        indexID < 0 ? 0 : indexID,
        indexID < 0 ? 0 : 1,
        info
      )
    },
    formatStatus(row) {
      const tmps = this.$store.getters.applovestatus.filter((el) => {
        return el.model.replace(/(^\s*)|(\s*$)/g, '') == 'switchdays' && el.statusid == row.appstatus
      })
      return tmps.length == 0 ? '未知' : tmps[0].msg
    }
  }
}
</script>

<style scoped>
.el-form {
    background: radial-gradient(#e6e1e1, transparent);
    padding: 20px;
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

.el-form-item {
    margin-bottom: 17px;
}
</style>
