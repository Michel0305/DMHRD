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
                        <el-button type="success" icon="el-icon-check" size="mini" :disabled="!isEdit" @click="submitDays('days')">保存</el-button>
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
            <el-form ref="days" :model="businessBase" :rules="rules" label-width="80px">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="职员" prop="userid">
                            <el-select v-model="businessBase.userid" placeholder="请选择" size="mini" :disabled="!isEdit">
                                <el-option v-for="item in $store.state.departmentjob.personals.filter(el => {
                                                if($store.getters.partids.findIndex((es)=>{ return el.defpartid == es} )>=0  || parseInt(el.user_id) == parseInt($store.getters.account)){
                                                        return el
                                                    }})" :key="item.user_id" :label="item.user_name" :value="item.user_id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出差日期" prop="checkdate">
                            <el-date-picker v-model="businessBase.checkdate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" size="mini" :disabled="!isEdit" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="出差地" prop="toaddressids">
                            <el-cascader size="mini" :options="options" v-model="businessBase.toaddressids" @change="handleChange" :disabled="!isEdit">
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="详细点" :disabled="isEdit" prop="dscaddress">
                            <el-input v-model="businessBase.dscaddress" size="mini" :disabled="!isEdit" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="交通方式" prop="carplate">
                            <el-select v-model="businessBase.carplate" placeholder="请选择" size="mini" :disabled="!isEdit">
                                <el-option v-for="item in caroptions" :key="item.val" :label="item.val" :value="item.val">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="报销" label-width="60">
                            <el-switch v-model="businessBase.isapply" size="mini" :disabled="!isEdit"></el-switch>
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
            <el-table :data="businessData" border style="width: 100%" @cell-click="setRow" :max-height="$store.getters.locheight - 320">
                <el-table-column prop="userid" label="姓名" width="80" :formatter="formatUserName">
                </el-table-column>
                <el-table-column prop="userid" label="部门" width="140" :formatter="formatUserDept">
                </el-table-column>
                <el-table-column prop="checkdate" label="出差日期" width="100">
                    <template>
                        {{$moment(businessData.checkdate).format('YYYY-MM-DD') }}
                    </template>
                </el-table-column>
                <el-table-column prop="toaddress" label="目的地" width="260" :formatter="formatAddress">
                </el-table-column>
                <el-table-column prop="carplate" label="车牌" width="100">
                </el-table-column>
                <el-table-column prop="isapply" label="报销" width="60">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
                <el-table-column prop="appstatus" label="状态" :formatter="formatStatus" width="80">
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</div>
</template>

<script>
import {
    provinceAndCityData,
    regionData,
    provinceAndCityDataPlus,
    regionDataPlus,
    CodeToText,
    TextToCode
} from 'element-china-area-data';
import {
    getBusindessBase,
    infoBusindessData
} from '@/api/business';
import {
    isArray
} from '@/utils/validate';
export default {
    name: "business",
    data() {
        return {
            isEdit: false,
            businessBase: {
                id: 0,
                checkdate: '',
                toaddressids: [],
                toaddress: [],
                dscaddress: '',
                carplate: '',
                isapply: false,
                actfiles: '',
                remark: ''
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() - 5 > new Date(new Date().setDate(new Date().getDate() + 10)) || time.getTime() < new Date(new Date().setDate(new Date().getDate() - 1));
                },
            },
            model: '',
            caroptions: [{
                val: '粤S.12345'
            }, {
                val: '粤S.23456'
            }, {
                val: '粤S.34567'
            }, {
                val: '粤S.45678'
            }, {
                val: '自驾'
            }, {
                val: '外车'
            }],
            options: regionData,
            selectedOptions: [],
            businessData: [],
            rules: {
                userid: [{
                    required: true,
                    message: "请输入申请人",
                    trigger: "blur"
                }],
                checkdate: [{
                    required: true,
                    message: "请选择出差日期",
                    trigger: "blur"
                }, ],
                toaddressids: [{
                    required: true,
                    message: "请选择出差地",
                    trigger: "blur",
                }, ],
                dscaddress: [{
                    required: true,
                    message: "请输入目的地",
                    trigger: "blur",
                }],
                carplate: [{
                    required: true,
                    message: "请选择交通方式",
                    trigger: "blur",
                }],
            },
        }
    },
    created() {
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
            this.businessBase = {
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
            if ( this.businessBase.id == 0 || this.businessBase.appstatus>0) return
            this.isEdit = true;
        },
        submitDays(forms) {
            this.$refs[forms].validate((valid) => {
                if (valid) {
                    this.isEdit = false;
                    this.formatAddressCN()
                    this.businessBase.selectedOptions = this.selectedOptions;
                    infoBusindessData(this.businessBase).then((rs) => {
                        if (rs.data.code == 200) {
                            this.replaceDefData(rs.data.msg)
                            this.$message.success(`数据更新保存成功`)
                            this.resetForm('days');
                        } else {
                            console.log(rs.data.msg)
                            this.$message.error(`数据更新保存发生异常,请刷新后重试`)
                        }

                    })
                }
            })
        },
        cancelDays() {
            this.isEdit = false;
            // this.resetForm('days')
        },
        formatAddressCN() {
            this.businessBase.toaddressids.forEach((el) => {
                this.selectedOptions.push(CodeToText[el])
            })
        },
        formatAddressCode(info) {
            info.forEach((el) => {
                this.selectedOptions.push(TextToCode[el])
            })
        },
        formatAddress(row, col) {
            let address = '';
            if (isArray(row.toaddressids)) {
                row.toaddressids.forEach((el) => {
                    address = address + ' ' + CodeToText[el]
                })
            } else {
                let tmp = [] = row.toaddressids.split(',');
                tmp.forEach((el) => {
                    address = address + ' ' + CodeToText[el]
                })
            }

            return `${address} - ${row.dscaddress}`
        },
        handleChange(value) {},
        setRow(row, index) {
            if (this.isEdit) return;
            if (isArray(row.toaddressids)) return this.businessBase = {} = row;
            let tmp = [] = row.toaddressids.split(',');
            let tmpRow = row
            tmpRow.toaddressids = tmp
            this.businessBase = {} = tmpRow;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        replaceDefData(info) {
            let indexID = this.businessData.findIndex(val => parseInt(val.id) == parseInt(info.id))
            this.businessData.splice(
                indexID < 0 ? 0 : indexID,
                indexID < 0 ? 0 : 1,
                info
            );
        },
        formatUserName(row, colum) {
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
        formatStatus(row){
            let tmps = this.$store.getters.applovestatus.filter((el)=>{
                return el.model.replace(/(^\s*)|(\s*$)/g,'') == 'business' && el.statusid == row.appstatus
            })
            return tmps.length == 0?'未知':tmps[0].msg }
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
    background: #dfe2e4;
}

.el-form-item {
    margin-bottom: 17px;
}

.upload {
    margin-left: 30px;
}
</style>
