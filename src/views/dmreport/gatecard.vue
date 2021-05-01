<template>
  <div class="app-container-card">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-row>
            <el-col :span="1" :offset="1">
              <el-button type="primary" icon="el-icon-printer" size="mini" @click="exporExcel">导出</el-button>
            </el-col>
            <el-col :span="5" :offset="17">
              <el-date-picker v-model="selectMonth" type="month" placeholder="选择月" size="mini" :disabled="lockBtn" @change="getCardData" />
              <el-button slot="append" icon="el-icon-search">AA</el-button>
            </el-col>

          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-table :data="cardData" border size="mini" :style="{width:'100%',height:$store.getters.locheight-10+'px' }" :max-height="$store.getters.locheight">
      <el-table-column prop="tjmonth" label="日期" width="70" />
      <el-table-column prop="username" label="姓名" width="80" />
      <el-table-column prop="bm" label="部门" sortable :sort-by="['bm','username']" width="120" />
      <el-table-column prop="d1" label="1号" width="50" />
      <el-table-column prop="d2" label="2号" width="50" />
      <el-table-column prop="d3" label="3号" width="50" />
      <el-table-column prop="d4" label="4号" width="50" />
      <el-table-column prop="d5" label="5号" width="50" />
      <el-table-column prop="d6" label="6号" width="50" />
      <el-table-column prop="d7" label="7号" width="50" />
      <el-table-column prop="d8" label="8号" width="50" />
      <el-table-column prop="d9" label="9号" width="50" />
      <el-table-column prop="d10" label="10号" width="50" />
      <el-table-column prop="d11" label="11号" width="50" />
      <el-table-column prop="d12" label="12号" width="50" />
      <el-table-column prop="d13" label="13号" width="50" />
      <el-table-column prop="d14" label="14号" width="50" />
      <el-table-column prop="d15" label="15号" width="50" />
      <el-table-column prop="d16" label="16号" width="50" />
      <el-table-column prop="d17" label="17号" width="50" />
      <el-table-column prop="d18" label="18号" width="50" />
      <el-table-column prop="d19" label="19号" width="50" />
      <el-table-column prop="d20" label="20号" width="50" />
      <el-table-column prop="d21" label="21号" width="50" />
      <el-table-column prop="d22" label="22号" width="50" />
      <el-table-column prop="d23" label="23号" width="50" />
      <el-table-column prop="d24" label="24号" width="50" />
      <el-table-column prop="d25" label="25号" width="50" />
      <el-table-column prop="d26" label="26号" width="50" />
      <el-table-column prop="d27" label="27号" width="50" />
      <el-table-column prop="d28" label="28号" width="50" />
      <el-table-column prop="d29" label="29号" width="50" />
      <el-table-column prop="d30" label="30号" width="50" />
      <el-table-column prop="d31" label="31号" width="50" />
      <el-table-column prop="cnt" label="应出勤天数" width="80" />
      <el-table-column prop="rnt" label="实出勤天数" width="80" />
      <el-table-column prop="allworks" label="出勤时数" width="80" />
      <el-table-column prop="alloverworks" label="总加班时数" width="80" />
      <el-table-column prop="allleaves" label="总请假时数" width="80" />
    </el-table>
  </div>
</template>

<script>
import { getVGateCard } from '@/api/attendance'
import FilenameOption from './components/FilenameOption'
import AutoWidthOption from './components/AutoWidthOption'
import BookTypeOption from './components/BookTypeOption'
export default ({
  name: 'Gatecard',
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
  data() {
    return {
      loading: '',
      lockBtn: false,
      selectMonth: new Date(),
      cardData: [],
      filename: '',
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  created() {
    this.getCardData()
  },
  methods: {
    async getCardData() {
      this.loadStatus()
      this.lockBtn = true
      const reMonth = this.$moment(this.selectMonth).format('YYYYMM')
      await getVGateCard(reMonth).then((rs) => {
        if (rs.data.code == 200) {
          this.cardData = [] = rs.data.msg
          this.loading.close()
          this.lockBtn = false
        } else {}
      })
    },

    loadStatus() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
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
    async exporExcel() {
      await import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = ['姓名', '部门', '日期', '1号',
          '2号', '3号', '4号', '5号', '6号', '7号',
          '8号', '9号', '10号', '11号', '12号', '13号',
          '14号', '15号', '16号', '17号', '18号', '19号',
          '20号', '21号', '22号', '23号', '24号', '25号',
          '26号', '27号', '28号', '29号', '30号', '31号', '应出勤天数', '实出勤天数', '总出勤(小时)', '加班数(小时)', '请假数(小时)']
        const filterVal = ['username', 'bm', 'tjmonth', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12', 'd13', 'd14', 'd15', 'd16', 'd17', 'd18', 'd19', 'd20', 'd21', 'd22', 'd23', 'd24', 'd25', 'd26', 'd27', 'd28', 'd29', 'd30', 'd31', 'cnt', 'rnt', 'allworks', 'alloverworks', 'allleaves']
        const list = this.cardData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `${this.$moment(this.selectMonth).format('YYYYMM')} - 考勤报表`,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
})
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
}

.bg-purple-dark {
    background: #dfe2e4;
}

.el-form-item {
    margin-bottom: 17px;
}

.upload {
    margin-left: 30px;
}
</style>
