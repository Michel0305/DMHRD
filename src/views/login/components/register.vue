<template>
<div class="register-login">
    <el-dialog title="注册/重置账户" :visible.sync="dialogStatus" width="30%" :close-on-click-modal="false" :before-close="dialogForm">
        <el-form label-width="80px" :model="userForm" ref="regisForm" :rules="rules" class="register-form">
           
            <el-radio-group v-model="userForm.istype">
                <el-radio :label="0">注册</el-radio>
                <el-radio :label="1">重置密码</el-radio>
            </el-radio-group>

            <el-form-item prop="email">
                <span class="svg-container">
                    <svg-icon icon-class="user" /></span>
                <el-input v-model="userForm.email" type="email" :maxlength="50" :placeholder="$t('login.email')" />
            </el-form-item>
            <el-form-item prop="cardid">
                <span class="svg-container">
                    <svg-icon icon-class="qq" />
                </span>
                <el-input v-model="userForm.cardid" type="text" :maxlength="18" :placeholder="$t('login.cardid')"></el-input>
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual v-if="userForm.istype == 1">
                <el-form-item prop="oldpwd">
                    <span class="svg-container">
                        <svg-icon icon-class="password" /></span>
                    <el-input :key="passwordType" v-model="userForm.oldpwd" :maxlength="20" :type="passwordType" :placeholder="$t('login.oldpwd')" @keyup.native="checkCapslock" @blur="capsTooltip = false" />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
            </el-tooltip>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item prop="pwd">
                    <span class="svg-container">
                        <svg-icon icon-class="password" /></span>
                    <el-input :key="passwordType" v-model="userForm.pwd" :type="passwordType" :placeholder="$t('login.pwd')" @keyup.native="checkCapslock" @blur="capsTooltip = false" />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
            </el-tooltip>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item prop="repwd">
                    <span class="svg-container">
                        <svg-icon icon-class="password" />
                    </span>
                    <el-input :key="passwordType" v-model="userForm.repwd" :maxlength="20" :type="passwordType" :placeholder="$t('login.repwd')" @keyup.native="checkCapslock" @blur="capsTooltip = false" />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
            </el-tooltip>
            <el-form-item>
                <el-row :gutter="10">
                    <el-col :span="8"><el-input v-model="infocode"  :maxlength="4" placeholder="验证码"></el-input></el-col>
                    <el-col :span="6" :offset="1"><valid-code :value.sync="validCode"></valid-code></el-col>
                </el-row> 
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogForm(1)" size="mini">提交</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import {userReguster} from '@/api/user';
import validCode from './SIdentify'
export default ({
    name: 'register',
    components:{validCode},
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.userForm.repwd !== '') {
                    this.$refs.regisForm.validateField('repwd');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入新密码'));
            } else if (value !== this.userForm.pwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {
            infocode:'',
            validCode:'',
            passwordType: "password",
            capsTooltip: false,
            userForm: {
                istype:0,
                email: '',
                cardid: '',
                oldpwd:'',
                pwd: '',
                repwd: ''
            },
            rules: {
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                repwd: [
                    { required: true, message: '请再次输入确认密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur', required: true }
                ],

                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                cardid: [
                    { required: true, message: "身份证号不能为空", trigger: 'blur' },
                    { validator: this.validID, trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    props: ['dialogStatus'],
    methods: {
        validID(rule, value, callback) {
            // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (reg.test(value)) {
                callback();
            } else {
                callback(new Error("身份证号码不正确"));
            }
        },
        dialogForm(types) {            
            if (types !== 1){
                this.resetForm('regisForm')
                return this.$emit("commitFormData");
            }
            if(this.infocode == null || this.infocode =='' || this.infocode.toUpperCase() !== this.validCode.toUpperCase() ) return this.$message.error(`请确认验证码`) 
            
            this.$refs['regisForm'].validate((valid) => {
                this.infocode = null;
                if (valid) {                   
                   userReguster({regData:this.userForm}).then((rs)=>{                       
                       if(rs.data.code == 200){                           
                           this.$message.success(`${rs.data.msg}`)
                           this.resetForm('regisForm')
                           return this.$emit("commitFormData");                           
                       }else{
                           this.$message.error(`${rs.data.msg}`)
                       }                      
                   })
                }else{
                    this.$message.error(`请确认您输入的信息准确性`)
                    return;
                }                
            })           
        },
        checkCapslock(e) {
            const {
                key
            } = e;
            this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
        },
        showPwd() {
            if (this.passwordType === "password") {
                this.passwordType = "";
            } else {
                this.passwordType = "password";
            }            
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
})
</script>

<style lang="css" scoped>
.register-login>>>.el-dialog {
    background: #212935;
}

.register-login>>>.el-dialog__title {
    color: #cacaca;
}

.register-form>>>.el-form-item__content {
    margin-left: 20px !important;
    height: 35px !important;
}

.register-form>>>.el-form-item {
    color: #671616 !important;
}
.register-login>>>.el-dialog__body{
    padding: 10px 20px; ;
}
.register-form>>>.el-radio-group{margin-bottom: 15px;}
.register-form>>>.el-input input{
   height: 35px; 
}
.register-form>>>.el-form-item--medium{
  height: 36px;  
}

</style>
