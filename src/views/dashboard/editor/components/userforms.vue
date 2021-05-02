<template>
  <div>
    <el-row :gutter="10">
      <el-col :xl="{span:22,offset:1}" :span="24">
        <el-table
          :data="userData.filter((data)=>(!search || data.username.includes(search))|| (!search || data.dept.includes(search))||
            (!search || data.modelname.includes(search)))"
          :style="{width:'100%','height':$store.getters.locheight - 55+'px' }"
          :max-height="$store.getters.locheight - 55"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in signBoxData.filter((el)=>{
                    return parseInt(el.formid) == parseInt(props.row.id) && (el.modelname.replace(/(^\s*)|(\s*$)/g,'')) == (props.row.model.replace(/(^\s*)|(\s*$)/g,'')) })"
                  :key="index"
                  :timestamp="$moment(activity.createtime).utc().format('YYYY-MM-DD HH:mm:ss')"
                  :color="activity.statusid== 1?'#da0000':'#1b6d04' "
                >
                  {{ `${$store.getters.applovestatus.filter((el)=>{ return el.model.replace(/(^\s*)|(\s*$)/g,'') == props.row.model.replace(/(^\s*)|(\s*$)/g,'')
                    && parseInt(el.statusid) == parseInt(activity.apploveid)})[0].msg} -- ${$store.getters.departmentjob_personals.filter((el)=>{ return el.user_id == activity.appuser })[0].user_name }` }}
                  <br>
                  <br>
                  {{ `意见: ${activity.appremart}` }}
                </el-timeline-item>
              </el-timeline>
            </template>
          </el-table-column>
          <el-table-column fixed prop="modelname" label="表单名称" width="150" sortable :sort-by="['modelname']" />
          <el-table-column prop="username" label="姓名" width="120" />
          <el-table-column prop="dept" label="部门" sortable :sort-by="['dept']" />
          <el-table-column prop="leavedate" label="日期" sortable :sort-by="['leavedate']">
            <template slot-scope="scope">
              {{ $moment(scope.row.leavedate).format('YYYY-MM-DD') }}
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                clearable
                :placeholder="1 == 2 ?scope.row.remark:'全局搜索' "
              />
            </template>
          </el-table-column>
          <el-table-column prop="applovestatus" sortable :sort-by="['formstatus', 'leavedate','userid','modelname']" label="表单状态" width="120">
            <template slot-scope="scope">
              <el-tag :type="scope.row.applovestatus == 20 || scope.row.applovestatus == 15 ?'success':scope.row.applovestatus === -10 ?'danger' : ''" disable-transitions effect="dark" size="mini">
                {{ formatApploveStatus(scope.row) }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { UserBoxData } from '@/api/signform'
export default {
  name: 'Userforms',
  data() {
    return {
      userData: [],
      signBoxData: [],
      SingStatus: [],
      search: ''
    }
  },
  created() {
    this.getbaseData()
  },
  methods: {
    formatApploveStatus(row, colum) {
      const tmpUser = this.$store.getters.applovestatus.filter((el) => {
        return parseInt(el.statusid) === parseInt(row.applovestatus)
      })
      return tmpUser.length == 0 ? '未知' : tmpUser[0].msg
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
    async getbaseData() {
      const rsBackData = await UserBoxData({ userid: this.$store.getters.account })
      if (rsBackData.data.code == 200) {
        const fliterUser = this.$store.getters.departmentjob_personals.filter((el) => { if (this.$store.getters.partids.findIndex((es) => { return el.defpartid == es }) >= 0) { return el.user_id } })
        this.userData = [] = rsBackData.data.msg.usersData.filter((el) => { if (fliterUser.findIndex((evl) => { return parseInt(evl.user_id) == parseInt(el.userid) }) >= 0 || el.userid == this.$store.getters.account || el.createuser == this.$store.getters.account) return el })
        this.signBoxData = [] = rsBackData.data.msg.signBox
      } else {
        console.log(rsBackData.data.msg)
        this.$message.error(`个人申请数据错误,请刷新`)
      }
    }
  }
}
</script>
