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
            <el-form ref="days" :model="businessBase" label-width="80px">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="职员">
                            <el-select v-model="businessBase.userid" placeholder="请选择" size="mini" :disabled="!isEdit">
                                <el-option v-for="item in $store.state.departmentjob.personals.filter(el => {
                                                if($store.getters.partids.findIndex((es)=>{ return el.defpartid == es} )>=0  || el.user_id == $store.getters.account ){
                                                        return el
                                                    }})" :key="item.user_id" :label="item.user_name" :value="item.user_id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出差日期">
                            <el-date-picker v-model="businessBase.checkdate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" size="mini" :disabled="!isEdit">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="出差地" >
                            <el-cascader size="mini" :options="options" v-model="businessBase.toaddress" @change="handleChange" :disabled="!isEdit">
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="详细点" :disabled="isEdit">
                            <el-input v-model="businessBase.dscaddress" size="mini" :disabled="!isEdit"/>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="车牌号">
                            <el-select v-model="businessBase.carplate" placeholder="请选择" size="mini" :disabled="!isEdit">
                                <el-option v-for="item in caroptions" :key="item.val" :label="item.val" :value="item.val">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否报销" label-width="60">
                            <el-switch v-model="businessBase.isapply" size="mini" :disabled="!isEdit" ></el-switch>
                            <el-link class="upload" type="primary" :disabled="!isEdit">附件<i class="el-icon-upload2" /></el-link>
                            <el-link class="upload" type="success">预览<i class="el-icon-view el-icon--right"></i> </el-link>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注" size="mini">
                    <el-input type="textarea" v-model="businessBase.remark" :disabled="!isEdit" size="mini"></el-input>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="20" :offset="2">
            <el-table :data="businessData" border style="width: 100%">
                <el-table-column prop="userid" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="checkdate" label="出差日期" width="180">
                </el-table-column>
                <el-table-column prop="toaddress" label="目的地">
                </el-table-column>
                <el-table-column prop="carplate" label="车牌">
                </el-table-column>
                <el-table-column prop="isapply" label="是否报销">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
                <el-table-column prop="appstatus" label="单据状态">
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>

</div>
</template>

<script>
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data';
import { getBusindessBase } from '@/api/business'
export default {
    name: "business",
    data() {
        return {
            isEdit: false,
            businessBase: {
                id: 0,
                checkdate: '',
                toaddress: [],
                dscaddress: '',
                carplate: '',
                isapply:false,
                actfiles: '',
                remark: ''
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() - 3 < Date.now();
                },
            },
            model: '',
            caroptions: [{ val: '粤S.12345' }, { val: '粤S.23456' }, { val: '粤S.34567' }, { val: '粤S.45678' }],
            options: regionData,
            selectedOptions: [],
            businessData: []
        }
    },
    created() {
        console.log(this.$store.getters)
        getBusindessBase().then((rs) => {
            if (rs.data.code == 200) {
                this.businessData = [] = rs.data.msg
            } else {
                console.log(rs.data.msg)
                this.$message.error(`数据初始化错误,请关闭当前页面刷新`)
            }
        })
    },
    methods: {
        createNewDays() {
            this.businessBase={
                id: 0,
                checkdate: '',
                toaddress: '',
                dscaddress: '',
                carplate: '',
                isapply: false,
                actfiles: '',
                remark: ''
            }
            this.isEdit = true;
        },
        editDays() {
            if(this.businessBase.id<=0) return
            this.isEdit = true;
        },
        submitDays(forms) {
            this.isEdit = false;
            this.formatAddressCN()
            this.businessBase.selectedOptions = this.selectedOptions;
            console.log(this.businessBase);
            // this.businessBase.toaddress = this.selectedOptions;
        },
        cancelDays() {
             this.isEdit = false;
        },
        formatAddressCN(){
            this.businessBase.toaddress.forEach((el)=>{
                this.selectedOptions.push(CodeToText[el])
            })
        },
        formatAddressCode(info){
            info.forEach((el)=>{
                this.selectedOptions.push(TextToCode[el])
            })
        },
        handleChange(value) {
            // console.log(CodeToText[value[0]])
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
    margin-bottom: 17px;
}

.upload {
    margin-left: 30px;
}
</style>
