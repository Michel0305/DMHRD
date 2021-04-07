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
                <el-form-item label="出差日期">
                    <el-date-picker v-model="workdate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" size="mini">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="出差地">
                    <el-cascader size="mini" :options="options" v-model="selectedOptions" @change="handleChange">
                    </el-cascader>
                    <el-input v-model="model" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="车牌号">
                    <el-select v-model="value" placeholder="请选择" size="mini">
                        <el-option v-for="item in caroptions" :key="item.val" :label="item.val" :value="item.val">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否报销">
                    <el-switch v-model="model" size="mini"></el-switch>
                </el-form-item>
                <el-form-item label="备注" size="mini">
                    <el-input type="textarea" v-model="workremark" :disabled="!isEdit" size="mini"></el-input>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="20" :offset="2">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="date" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="date" label="出差日期" width="180">
                </el-table-column>
                <el-table-column prop="date" label="目的地">
                </el-table-column>
                <el-table-column prop="date" label="车牌">
                </el-table-column>
                <el-table-column prop="date" label="备注">
                </el-table-column>
                <el-table-column prop="date" label="备注">
                </el-table-column>
                <el-table-column prop="date" label="单据状态">
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>

</div>
</template>

<script>
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
export default {
    name: "overtime",
    data() {
        return {
            isEdit: false,
            userid: '',
            daysform: {},
            workremark: '',
            workdate: '',
            freedate: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() - 3 < Date.now();
                },
            },
            model: '',
            caroptions: [{ val: '粤S.12345' }, { val: '粤S.23456' }, { val: '粤S.34567' }, { val: '粤S.45678' }],
            options: regionData,
            selectedOptions: [],
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

        },
        handleChange(value) {
            console.log(value)
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
