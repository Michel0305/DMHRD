<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="{span:24}" :lg="{span:14,offset:5}">
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%" size="mini" :max-height="$store.getters.locheight+20" :row-class-name="tableRowClassName">
          <el-table-column prop="username" label="姓名" sortable width="120" />
          <el-table-column prop="dept" label="部门" sortable />
          <el-table-column prop="txCnt" label="余休(小时)" width="150">
            <template slot-scope="scope">
              <div v-if="isedit && tmpid == scope.row.userid">
                <el-input-number v-model="scope.row.txCnt" size="mini" :precision="1" :step="0.5" />
              </div>
              <div v-else>
                {{ scope.row.txCnt }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="nxDays" label="总年假(小时)" width="150">
            <template slot-scope="scope">
              <div v-if="isedit && tmpid == scope.row.userid && scope.row.nxid !==0">
                <el-input-number v-model="scope.row.nxDays" size="mini" :precision="1" :step="0.5" />
              </div>
              <div v-else>
                {{ scope.row.nxDays }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="yxDays" label="已休年假(小时)" width="150">
            <template slot-scope="scope">
              <div v-if="isedit && tmpid == scope.row.userid && scope.row.nxid !==0">
                <el-input-number v-model="scope.row.yxDays" size="mini" :precision="1" :step="0.5" />
              </div>
              <div v-else>
                {{ scope.row.yxDays }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                clearable
                :placeholder="1 == 2 ?scope.row.userid:'全局搜索' "
              />
            </template>
            <template slot-scope="scope">
              <el-button size="mini" :type="isedit && tmpid == scope.row.userid ?'success':'primary'" :icon="isedit && tmpid == scope.row.userid?'el-icon-check':'el-icon-edit'" circle plain @click="handleEdit(scope.$index, scope.row)" />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background :current-page="currentPage" :page-size="pageSize" :total="totalNum" layout="prev, pager, next" @current-change="handleCurrentChange" />
      </el-col>
    </el-row>
  </div>
</template>

<style>
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}
</style>

<script>
import {
  AnnualLeaveBaseData,
  InfoAnnualLeave
} from '@/api/leave'
export default ({
  name: 'Annualleave',
  data() {
    return {
      tmpid: 0,
      isedit: false,
      tableData: [],
      currentPage: 1, // 默认显示第一页
      pageSize: 18, // 默认每页显示10条
      totalNum: 0
    }
  },
  created() {
    AnnualLeaveBaseData().then((rs) => {
      if (rs.data.code == 200) {
        console.log(rs)
        this.tableData = [] = rs.data.msg[0]
        this.totalNum = this.tableData.length
      }
    })
  },
  methods: {
    tableRowClassName({
      row,
      rowIndex
    }) {
      if (rowIndex % 2 == 1) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
    },
    handleEdit(index, row) {
      if (this.tmpid == row.userid) {
        this.$confirm(`此操作更新  ${row.username}  年休/余休时数, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isedit = false
          this.tmpid = 0
          InfoAnnualLeave(row).then((rs) => {
            if (rs.data.code == 200) {
              this.$message.success(`保存成功`)
            } else {
              console.log(rs.data.msg)
              this.$message.error(`保存错误,请刷新重试`)
            }
          })
        }).catch(() => {
          this.isedit = false
          this.tmpid = 0
          this.$message({
            type: 'info',
            message: '已取消变更'
          })
        })
      } else {
        this.isedit = true
        this.tmpid = row.userid
        this.$message.warning(`进入编辑状态`)
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val // 动态改变
    }
  }
})
</script>
