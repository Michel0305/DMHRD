<template>
<div class="app-container-switchwork">
    <el-row :gutter="20">
        <el-col :span="24">
            <div class="grid-content bg-purple-dark">
                <el-row>
                    <el-col :span="1" :offset="1">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="createNewDays" :disabled="isEdit">创建</el-button>
                    </el-col>
                    <el-col :span="1" :offset="1">
                        <el-button icon="el-icon-edit-outline" size="mini" @click="editDays" :disabled="isEdit">修改</el-button>
                    </el-col>
                    <el-col :span="1" :offset="1">
                        <el-button type="success" icon="el-icon-check" size="mini" :disabled="!isEdit" @click="submitDays('workData')">保存</el-button>
                    </el-col>
                    <el-col :span="1" :offset="1">
                        <el-button type="info" icon="el-icon-close" size="mini" @click="cancelDays" :disabled="!isEdit">取消</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="12" :offset="6">
            <el-form ref="days" :model="daysform" label-width="80px">
                <el-form-item label="职员">
                    <el-select v-model="userid" placeholder="请选择" size="mini">
                        <el-option label="1580" value="项敏"></el-option>
                        <el-option label="1058" value="阿峰"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请日期">
                    <el-date-picker
                        v-model="workdate"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions" size="mini">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="调休日期">
                    <el-date-picker
                        v-model="freedate"
                        align="right"
                        type="date"
                        placeholder="选择日期" size="mini">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="调休日期" size="mini">
                    <el-input type="textarea" v-model="workremark" :disabled="!isEdit"></el-input>                      
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="20" :offset="2">
            <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="date"
            label="申请日期"
            width="180">
            </el-table-column>
            <el-table-column
            prop="date"
            label="调休日期">
            </el-table-column>
            <el-table-column
            prop="date"
            label="备注">
            </el-table-column>
        </el-table>
        </el-col>
    </el-row>

</div>
</template>

<script>
export default {
    name: "overtime",
    data() {
        return {
            isEdit: false,
            userid:'',
            daysform:{},
            workremark:'',
            workdate:'',
            freedate:'',
            pickerOptions:{
                disabledDate(time) {
                    return time.getTime()-3 < Date.now();
                },
            },
            tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
        }
    },
    methods: {
        createNewDays() {

        },
        editDays() {

        },
        submitDays(forms) {

        },
        cancelDays() {

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
}

.bg-purple-dark {
    background: #dbdddf;
}
.el-form-item {
    margin-bottom: 2px;
}
</style>
