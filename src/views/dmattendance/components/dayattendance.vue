<template>
  <div class="app-container-reissue">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-row class="headtool">
            <!-- <el-col :span="6" :offset="1">
                        <el-date-picker v-model="downloaddate" type="date" placeholder="选择日期" class="input-with-select" size="mini"></el-date-picker>
                        <el-button class="btndownload" type="warning" icon="el-icon-download" size="mini" :loading="true"></el-button>
                    </el-col> -->
            <el-col :span="14" :offset="1">
              <el-col :span="10">
                <el-date-picker v-model="swhere.datewhere" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" size="mini" />
                <el-select v-model="swhere.dept" placeholder="部门" clearable size="mini">
                  <el-option v-for="item in $store.getters.departmentjob_departs" :key="item.deptid" :label="item.dept_name" :value="item.deptid" />
                </el-select>
              </el-col>
              <el-col :span="3"><el-input v-model="fullname" placeholder="姓名" size="mini" clearable /></el-col>
              <el-button size="mini" icon="el-icon-search" :disabled="lockbtn" @click="getworkrecordsdata" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table
                v-loading="loading"
                size="mini"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                :data="
                  recordsData.filter( //status 默认显示0，已补卡  1， 请假 2
                    (data) =>data.status == 0 && (!swhere.dept || data.partid == swhere.dept) && (!fullname || data.username.includes(fullname))
                  )
                "
                style="width: 100%"
                :max-height="$store.getters.locheight-55"
              >
                <el-table-column label="日期" prop="checkdate" width="110">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      $moment(scope.row.checkdate).format("YYYY-MM-DD")
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名" prop="username" width="80" />
                <el-table-column label="部门" prop="partid" :formatter="formatUserDept" width="120" />
                <el-table-column label="班次" prop="bc" width="160" :formatter="formatTimes" />
                <el-table-column label="刷卡1" prop="timesone" width="80">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      scope.row.timesone
                        ? $moment(scope.row.timesone).utc().format("HH:mm")
                        : ""
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="刷卡2" prop="timestwo" width="70">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      scope.row.timestwo
                        ? $moment(scope.row.timestwo).utc().format("HH:mm")
                        : ""
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="刷卡3" prop="timesthree" width="70">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      scope.row.timesthree
                        ? $moment(scope.row.timesthree).utc().format("HH:mm")
                        : ""
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="刷卡4" prop="timefour" width="70">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      scope.row.timefour
                        ? $moment(scope.row.timefour).utc().format("HH:mm")
                        : ""
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="刷卡5" prop="timefive" width="70">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      scope.row.timefive
                        ? $moment(scope.row.timefive).utc().format("HH:mm")
                        : ""
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="刷卡6" prop="timesix" width="70">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      scope.row.timesix
                        ? $moment(scope.row.timesix).utc().format("HH:mm")
                        : ""
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="刷卡7" prop="timeseven" width="70">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      scope.row.timeseven
                        ? $moment(scope.row.timeseven).utc().format("HH:mm")
                        : ""
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="刷卡8" prop="timeseight" width="70">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      scope.row.timeseight
                        ? $moment(scope.row.timeseight).utc().format("HH:mm")
                        : ""
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="异常状态" :formatter="formatStatus" sortable :sort-by="['styo', 'styt','styth','styf','styfi','stys']" />
                <el-table-column prop="station" label="考勤状态" width="110" sortable :sort-by="['station']">
                  <template slot-scope="scope">
                    <el-tag :type="scope.row.station == 0?'danger':scope.row.station == 1?'success':'warning' ">
                      {{ ["异常","正常","请假","调休","出差","连班","补卡"][scope.row.station] }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column align="right" width="120">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" icon="el-icon-timer" @click="handleEdit(scope.$index, scope.row)" />
                    <el-button size="mini" type="success" icon="el-icon-medal" @click="passCard(scope.$index, scope.row)" />
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="过滤此人员异常" :visible.sync="dialogVisible" width="30%">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-select v-model="chgstatus" placeholder="备注选择" size="mini">
            <el-option v-for="item in options" :key="item.id" :label="item.value" :value="item.id" />
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="changeCardStatus">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getworkrecords, infoRegistrationCard, PassAttendanceCard } from '@/api/attendance'
export default {
  name: 'Abnormal',
  data() {
    return {
      chgstatus: '',
      loading: false,
      lockbtn: false,
      checkid: 0,
      fullname: '',
      swhere: { datewhere: '', dept: '' },
      downloaddate: '',
      dialogVisible: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }
        ]
      },
      statusOptions: [
        { id: 0, label: '缺早上上班卡' },
        { id: 1, label: '早上上班迟到' },
        { id: 2, label: ' 缺早上下班卡' },
        { id: 3, label: '缺下午上班卡' },
        { id: 4, label: '下午上班迟到' },
        { id: 5, label: '缺下午下班卡' },
        { id: 6, label: '缺晚上上班卡' },
        { id: 7, label: '晚上上班迟到' },
        { id: 8, label: '缺晚上上班卡' },
        { id: 9, label: '缺晚班上班卡' },
        { id: 10, label: '晚班上班迟到' },
        { id: 11, label: '早上上班早退' },
        { id: 12, label: '中午上班早退' },
        { id: 13, label: '晚班上班早退' }
      ],
      recordsData: [],
      search: '',
      options: [{ id: 1, value: '正常' }, { id: 2, value: '请假' }, { id: 3, value: '调休' }, { id: 4, value: '出差' }, { id: 5, value: '连班' }, { id: 6, value: '补卡' }]
      // 0 异常  1正常  2请假  3调休  4 出差   5 连班  6补卡
    }
  },
  created() {
    this.loading = true
    getworkrecords(this.swhere).then((rs) => {
      if (rs.data.code == 200) {
        this.recordsData = [] = rs.data.msg
      } else {
        console.log(rs.data.msg)
        this.$message.error(`初始化数据失败`)
      }
      this.loading = false
    })
  },
  methods: {
    getworkrecordsdata() {
      this.lockbtn = true
      getworkrecords(this.swhere).then((rs) => {
        if (rs.data.code == 200) {
          this.recordsData = [] = rs.data.msg
          this.lockbtn = false
        } else {
          console.log(rs.data.msg)
          this.$message.error(`初始化数据失败`)
        }
      })
    },
    formatUsername(row, colum) {
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
    formatStation(row, colum) {
      const status = [
        '异常',
        '正常',
        '请假',
        '调休',
        '出差',
        '连班',
        '补卡'
      ]
      return status[row.station]
    },
    formatStatus(row, colum) {
      const status = [
        '早上班缺',
        '早下班缺',
        '下上班缺',
        '下下班缺',
        '晚上班缺',
        '晚下班缺',
        '晚班上班缺',
        '早迟到',
        '下迟到',
        '晚迟到',
        '早上早退',
        '下午早退',
        '晚上早退'
      ]
      const tmp = []
      tmp.push(row.styo ? row.styo : '')
      tmp.push(row.styt ? row.styt : '')
      tmp.push(row.styth ? row.styth : '')
      tmp.push(row.styf ? row.styf : '')
      tmp.push(row.styfi ? row.styfi : '')
      tmp.push(row.stys ? row.stys : '')
      let msg = ''
      for (let i = 0; i < tmp.length; i++) {
        const el = tmp[i]
        if (el) {
          msg += `${status[el - 1]}/`
        }
      }
      return msg
    },
    formatTimes(row, colum) {
      const tmpTimes = this.$store.getters.departmentjob_times.filter((el) => {
        return parseInt(el.id) === parseInt(row.bc)
      })
      return tmpTimes.length == 0 ? '未知' : tmpTimes[0].timesname
    },
    handleEdit(index, row) {
      if (row.station !== 0) return this.$message.warning(`请确认此单据状态[正常装/已处理]`)
      this.$confirm('确认给当前用户补卡吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        infoRegistrationCard(row).then((rs) => {
          if (rs.data.code == 200) {
            row.status = 1
            this.$message.success(`签卡单已生成`)
          } else {
            this.$message.error(`签卡单生成失败,请刷新后再试`)
            return
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消补卡'
        })
      })
    },
    passCard(index, row) {
      if (row.station !== 0) return this.$message.warning(`请确认此单据状态[正常装/已处理]`)
      this.checkid = row.id
      this.dialogVisible = true
    },
    changeCardStatus() {
      if (this.chgstatus == '') return this.$message.error(`选择处理作业类型`)
      PassAttendanceCard({ station: this.chgstatus, id: this.checkid }).then((rs) => {
        if (rs.data.code == 200) {
          this.recordsData.filter((el) => { return el.id == this.checkid })[0].station = this.chgstatus
          this.dialogVisible = false
          this.$message.success(`过滤签卡成功`)
        } else {
          this.$message.error(`过滤签卡失败,请刷新后再重试`)
        }
      })
    }
  }
}
</script>

<style scoped>
.grid-content {
    padding-top: 12px;
    border-radius: 4px;
    min-height: 50px;
}

.bg-purple-dark {
    background: #dfe2e4;
}

.btndownload {
    margin-left: 20px;
}

.el-table {
    margin-top: 10px;
}

/* .el-select .el-input {
  width: 130px;
} */
/* .input-with-select .el-input-group__prepend {
  background-color: #fff;
} */
.el-date-editor.el-input {
    width: 130px;
}

.el-select>.el-input {
    width: 130px;
}
</style>
