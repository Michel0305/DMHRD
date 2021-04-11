<template>
<div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
        <div class="title-container">
            <h3 class="title">{{ $t("login.title") }}</h3>
            <lang-select class="set-language" />
        </div>

        <el-form-item prop="username">
            <span class="svg-container">
                <svg-icon icon-class="user" />
            </span>
            <el-input ref="username" v-model="loginForm.username" :placeholder="$t('login.username')" name="username" type="text" tabindex="1" autocomplete="on" />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password" />
                </span>
                <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" :placeholder="$t('login.password')" name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock" @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
                <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
            </el-form-item>
        </el-tooltip>
        <div class="chkremb">
            <el-checkbox v-model="rembaccount" size="mini">记住我</el-checkbox>
        </div>
        <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px" @click.native.prevent="handleLogin">{{ $t("login.logIn") }}</el-button>

    </el-form>
</div>
</template>

<script>
import {
    validUsername
} from "@/utils/validate";
import SocialSign from "./components/SocialSignin";
import LangSelect from "@/components/LangSelect";

export default {
    name: "Login",
    components: {
        LangSelect,
        SocialSign
    },
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error("Please enter the correct user name"));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error("The password can not be less than 6 digits"));
            } else {
                callback();
            }
        };
        return {
            rembaccount: true,
            loginForm: {
                username: "", //min.xiang@maxmore.asia
                password: "", //123456
            },
            loginRules: {
                password: [{
                    required: true,
                    trigger: "blur",
                    validator: validatePassword
                }, ],
            },
            passwordType: "password",
            capsTooltip: false,
            loading: false,
            showDialog: false,
            redirect: undefined,
            otherQuery: {},
        };
    },
    watch: {
        $route: {
            handler: function (route) {
                const query = route.query;
                if (query) {
                    this.redirect = query.redirect;
                    this.otherQuery = this.getOtherQuery(query);
                }
            },
            immediate: true,
        },
    },
    created() {
        // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
        this.getCookie();
    },
    destroyed() {},
    methods: {
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
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    if (this.rembaccount) {
                        this.setCookie(this.loginForm.username, this.loginForm.password, 7);
                    } else {
                        this.clearCookie('', '', -1);
                    }
                    this.loading = true;
                    this.$store
                        .dispatch("user/login", this.loginForm)
                        .then(() => {
                            this.$router.push({
                                path: this.redirect || "/",
                                query: this.otherQuery,
                            });
                            this.loading = false;
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== "redirect") {
                    acc[cur] = query[cur];
                }
                return acc;
            }, {});
        },
        getCookie: function () {
            if (document.cookie.length > 0) {
                var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('='); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] == 'userName') {
                        //  console.log(arr2[1])
                        this.loginForm.username = arr2[1]; //保存到保存数据的地方
                    } else if (arr2[0] == 'password') {
                        // console.log(arr2[1])
                        this.loginForm.password = arr2[1];
                    }
                }
                this.checked = true;
            }
        },
        setCookie(c_name, c_pwd, exdays) {
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
            window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        },
        clearCookie: function () {
            this.setCookie("", "", -1);
        }       
    },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

.chkremb {
    padding: 0px 0px 10px 0px;
}

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style><style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }

        .set-language {
            color: #fff;
            position: absolute;
            top: 3px;
            font-size: 18px;
            right: 0px;
            cursor: pointer;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }

    .thirdparty-button {
        position: absolute;
        right: 0;
        bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
        .thirdparty-button {
            display: none;
        }
    }
}
</style>
