<template>
<div>
    <el-row :gutter="10">
        <el-col :xs={span:24} :lg={span:12,offset:6}>
            <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%" :max-height="$store.getters.locheight+20" :row-class-name="tableRowClassName">
                <el-table-column prop="username" label="姓名" sortable width="150">
                </el-table-column>
                <el-table-column prop="dept" label="部门" sortable>
                </el-table-column>
                <el-table-column prop="txCnt" label="余休(小时)" width="160">
                    <template slot-scope="scope">
                        <div v-if="isedit && tmpid == scope.row.userid">
                            <el-input-number v-model="scope.row.txCnt" size="mini"></el-input-number>
                        </div>
                        <div v-else>
                            {{scope.row.txCnt}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="nxDays" label="总年假(小时)" width="160">
                    <template slot-scope="scope">
                        <div v-if="isedit && tmpid == scope.row.userid">
                            <el-input-number v-model="scope.row.nxDays" size="mini"></el-input-number>
                        </div>
                        <div v-else>
                            {{scope.row.nxDays}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="yxDays" label="已休年假(小时)" width="160">
                    <template slot-scope="scope">
                        <div v-if="isedit && tmpid == scope.row.userid">
                            <el-input-number v-model="scope.row.yxDays" size="mini"></el-input-number>
                        </div>
                        <div v-else>
                            {{scope.row.yxDays}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="50">
                    <template slot-scope="scope">
                        <el-button size="mini" :type="isedit && tmpid == scope.row.userid ?'success':'primary'" :icon="isedit && tmpid == scope.row.userid?'el-icon-check':'el-icon-edit'" circle plain @click="handleEdit(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background :current-page="currentPage" @current-change="handleCurrentChange" :page-size="pageSize" :total="totalNum" layout="prev, pager, next">
            </el-pagination>
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
import { AnnualLeaveBaseData,InfoAnnualLeave } from "@/api/leave"
export default ({
    name: 'annualleave',
    methods: {
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex%2== 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            
        },
        handleEdit(index, row) {
            if (this.tmpid == row.userid) {
                this.isedit = false;
                this.tmpid = 0;
                InfoAnnualLeave(row).then((rs)=>{
                    if(rs.data.code == 200){
                        this.$message.success(`保存编辑`)
                    }
                })
            } else {
                this.isedit = true
                this.tmpid = row.userid
                this.$message.warning(`进入编辑状态`)
            }
        },
        handleCurrentChange(val) {
            this.currentPage = val; //动态改变
        },
    },
    data() {
        return {
            tmpid: 0,
            isedit: false,
            tableData: [],
            currentPage: 1, //默认显示第一页
            pageSize: 15, //默认每页显示10条
            totalNum: 100,
        }
    },
    created() {
        AnnualLeaveBaseData().then((rs) => {
            if (rs.data.code == 200) {
                console.log(rs)
                this.tableData = rs.data.msg[0]
            }
        })
    }
})
</script>
