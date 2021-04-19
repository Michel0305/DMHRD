<template>
<div class="app-container-abreport">
    <el-row :gutter="20">
        <el-col :span="24">
            <div class="grid-content bg-purple-dark">
                <el-row>
                    <el-col :span="1" :offset="1">
                        <el-button type="primary" icon="el-icon-printer" size="mini" @click="exporExcel">导出</el-button>
                    </el-col>
                    <el-col :span="5" :offset="17">
                        <el-date-picker v-model="selectMonth" type="month" placeholder="选择月" size="mini" :disabled="lockBtn" @change="getabreportData">
                        </el-date-picker>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="18" :offset="3">
            <el-table :data="tableData" border style="width: 100%" :style="{width:'100%',height:$store.getters.locheight-10+'px' }" :max-height="$store.getters.locheight">
                <el-table-column prop="tjmonth" label="日期" width="100">
                </el-table-column>
                <el-table-column prop="userid" label="姓名" width="120" :formatter="formatUsername">
                </el-table-column>
                <el-table-column prop="userid" label="部门" width="180" :formatter="formatUserDept">
                </el-table-column>
                <el-table-column prop="assess" label="考核" width="60">
                </el-table-column>
                <el-table-column prop="lateCnt" label="迟到" width="60">
                </el-table-column>
                <el-table-column prop="cardCnt" label="补卡" width="60">
                </el-table-column>
                <el-table-column label="签名">
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</div>
</template>

<script>
import { employeeeval } from '@/api/attendance'

export default ({
    name: "abnormalreport",
    data() {
        return {
            lockBtn: false,
            selectMonth:new Date(),
            tableData: []
        }
    },
    created(){
        employeeeval(this.selectMonth).then((rs)=>{
            this.tableData = rs.data.msg

        })
    },
    methods: {
        getabreportData() {

        },
        exporExcel() {

        },
        formatUsername(row, colum) {
            let tmpUser = this.$store.state.departmentjob.personals.filter((el) => {
                return parseInt(el.user_id) === parseInt(row.userid);
            });
            return tmpUser.length == 0 ? row.userid : tmpUser[0].user_name;
        },
        formatUserDept(row, colum) {
            let tmpUser = this.$store.state.departmentjob.personals.filter((el) => {
                return parseInt(el.user_id) === parseInt(row.userid);
            });
            return tmpUser.length == 0 ? "未知" : tmpUser[0].dept;
        },
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
