<template>
<div class="app-container-salarytemplate">
    <el-row :gutter="20">
        <el-col :span="24">
            <div class="grid-content bg-purple-dark">
                <el-row>
                    <el-col :span="1" :offset="1">
                        <el-button type="primary" icon="el-icon-printer" size="mini" >导出</el-button>
                    </el-col>
                    <el-col :span="5" :offset="17">
                        <el-date-picker v-model="selectMonth" type="month" placeholder="选择月" size="mini" :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-col>

                </el-row>
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="24">
            <el-table :data="tableData" style="width: 100%" border :row-class-name="tableRowClassName" 
            @selection-change="handleSelectionChange" 
            :max-height="$store.getters.locheight - 80"
            :style="{width:'100%','height':$store.getters.locheight - 80+'px' }" >
                <el-table-column
                    type="selection"
                    width="40">
                </el-table-column>
                <el-table-column prop="date" label="姓名" width="80">
                </el-table-column>
                <el-table-column prop="name" label="部门" width="120">
                </el-table-column>
                <el-table-column prop="address" label="基本薪资">
                </el-table-column>
                <el-table-column label="职位+职务">                    
                </el-table-column>
                <el-table-column
                    header-align="center"
                    align="center"                    
                    label="出勤(天)" >
                    <el-table-column label="应出勤">
                    </el-table-column>
                    <el-table-column label="实出勤">
                    </el-table-column>
                    <el-table-column label="请假">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    header-align="center"
                    align="center"
                    label="加班(小时)" >
                    <el-table-column label="平时">
                    </el-table-column>
                    <el-table-column label="周末">
                    </el-table-column>
                    <el-table-column label="节假日">
                    </el-table-column>
                    <el-table-column label="累计">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    header-align="center"
                    align="center"
                    label="应付工资">
                    <el-table-column label="补贴" >
                    </el-table-column>
                    <el-table-column label="工龄" >
                    </el-table-column>
                    <el-table-column label="全勤" >
                    </el-table-column>
                    <el-table-column label="餐补" >
                    </el-table-column>
                    <el-table-column label="奖励" >
                    </el-table-column>
                    <el-table-column label="KPI" >
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    header-align="center"
                    align="center"
                    label="加班费" >
                    <el-table-column label="平时">
                    </el-table-column>
                    <el-table-column label="周末">
                    </el-table-column>
                    <el-table-column label="节假日">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    header-align="center"
                    align="center" 
                    label="应发薪资" >
                </el-table-column>
                <el-table-column
                    header-align="center"
                    align="center"
                    label="扣费项" >
                    <el-table-column label="社保">
                    </el-table-column>
                    <el-table-column label="公积金">
                    </el-table-column>
                    <el-table-column label="工衣/其他">
                    </el-table-column>
                    <el-table-column label="水电">
                    </el-table-column>
                    <el-table-column label="个税">
                    </el-table-column>
                    <el-table-column label="其他">
                    </el-table-column>
                    <el-table-column label="累计">
                    </el-table-column>
                </el-table-column>                
                <el-table-column
                    header-align="center"
                    align="center" 
                    label="实发薪资" >
                </el-table-column>
                <el-table-column label="操作" width="75">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
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
// import { defineComponent } from '@vue/composition-api'
import { getSalaryBaseData } from '@/api/salary';

export default ({
    name: 'tmplatesalary',
    methods: {
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
        handleSelectionChange(val){
        }
    },
    data() {
        return {     
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > new Date(new Date().setDate(new Date().getDate()));
                },
            },       
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            selectMonth:new Date(),

        }
    },
    created(){
        let defMonth = this.$moment(this.selectMonth).format('YYYYMM');
        getSalaryBaseData({month:defMonth}).then((ts)=>{
            console.log(ts)
        })
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
.el-table{
    font-size: 8px;
}
.has-gutter>>>.el-table--medium th,.el-table--medium td {
    padding: 1px 0  !important ;
}
</style>