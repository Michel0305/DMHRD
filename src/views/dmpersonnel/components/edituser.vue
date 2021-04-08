<template>
<div class="app-container-edituser">
    <el-dialog :title="infousers.isEdit && infousers.id !==0? infousers.user_name : '创建'" :visible.sync="dialogStatus">
        <el-form ref="userForm" :model="infousers" :rules="rules" label-width="80px">
            <div class="dialogClass">
                <div class="usrandimg">
                    <div class="user">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="姓名" prop="user_name">
                                    <el-input :disabled="infousers.isEdit && infousers.id !==0" v-model="infousers.user_name" size="mini" maxlength="5"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="工号" size="mini" prop="user_id">
                                    <el-input v-model="infousers.user_id" :disabled="infousers.isEdit && infousers.id !==0" maxlength="6"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="部门" prop="defpartid">
                                    <el-select v-model="infousers.defpartid" placeholder="请选择" @change="checkDeptName" size="mini">
                                        <el-option v-for="el in $store.state.departmentjob.departs" :key="el.deptid" :label="el.dept_name" :value="el.deptid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="部门编码">
                                    <el-input :readonly="true" v-model="infousers.defpartid" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="岗位" prop="job">
                                    <el-select v-model="infousers.job" placeholder="请选择" size="mini">
                                        <!-- .filter(items=>{return items.defpartid == infousers.defpartid }) ) -->
                                        <el-option v-for="el in $store.state.departmentjob.jobs.filter(
                          (items) => {
                            return items.defpartid == infousers.defpartid;
                          }
                        )" :key="el.job" :label="el.job" :value="el.job" :disabled="el.job == infousers.job">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="班次" prop="timestype">
                                    <el-select v-model="infousers.timestype" placeholder="请选择" size="mini">
                                        <el-option v-for="el in $store.state.departmentjob.times" :key="el.id" :label="el.timesname" :value="el.id" :disabled="!el.ischeck">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="15">
                                <el-form-item label="身份ID" prop="cardid">
                                    <el-input v-model="infousers.cardid" size="mini" minlength="18" maxlength="18"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="9">
                                <el-form-item label="性别">
                                    <el-select v-model="infousers.sex" placeholder="请选择" size="mini">
                                        <el-option v-for="el in optionsSex" :key="el.id" :label="el.label" :value="el.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="教育">
                                    <el-select v-model="infousers.education" placeholder="请选择" size="mini">
                                        <el-option v-for="el in optionsEducation" :key="el.id" :label="el.label" :value="el.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="联系方式" size="mini">
                                    <el-input v-model="infousers.phone" maxlength="11"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="userimg">
                        <el-form-item>
                            <div>
                                <el-upload class="avatar-uploader" :action="actionUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :http-request="UploadPIC">
                                    <img v-if="infousers.imgurl" :src="src" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </el-form-item>
                    </div>
                </div>

                <el-tabs tab-position="left" style="height: 200px">
                    <el-tab-pane label="用户管理">
                        <div class="userother">
                            <el-row>
                                <el-col :span="22">
                                    <el-form-item label="户籍" prop="address">
                                        <el-input v-model="infousers.address" size="mini"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="10">
                                    <el-form-item label="上级部门" prop="mastpartid">
                                        <el-select v-model="infousers.mastpartid" placeholder="请选择" size="mini">
                                            <el-option v-for="el in $store.state.departmentjob.departs" :key="el.deptid" :label="el.dept_name" :value="el.deptid" :disabled="el.deptid == infousers.defpartid">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="邮箱">
                                        <el-input v-model="infousers.email" size="mini"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="10">
                                    <el-form-item label="门禁">
                                        <el-input v-model="infousers.cdnumber" size="mini" placeholder="门禁卡号"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="婚姻">
                                        <el-select v-model="infousers.position" placeholder="婚姻状态" size="mini">
                                            <el-option v-for="el in optionsMarital" :key="el.id" :label="el.id" :value="el.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="9">
                                    <el-form-item label="入职日期" prop="indate">
                                        <el-date-picker :editable="false" v-model="infousers.indate" type="date" placeholder="选择日期" size="mini" value-format="yyyy-MM-DD" :disabled="infousers.isEdit  && infousers.id !==0" class="rq">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" :offset="2">
                                    <el-form-item label="生日">
                                        <el-date-picker :disabled="true" v-model="infousers.birthday" type="date" placeholder="选择日期" size="mini" class="rq" value-format="yyyy-MM-DD">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="2">
                                    <el-form-item>
                                        <el-checkbox v-model="infousers.isline" :disabled="true">在职</el-checkbox>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                        </div>
                    </el-tab-pane>
                    <!-- ​	指纹录入	​	工衣	​	培训	​  合同	​	公司手机	​	文具	​	宿舍钥匙	 -->

                    <el-tab-pane label="入职">
                        <el-form-item>
                            <el-checkbox-group v-model="infousers.documents">
                                <el-col :span="24">
                                    <el-col :span="8">
                                        <el-checkbox label="门禁工号"></el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox label="应聘登记表"></el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox label="入职登记表"></el-checkbox>
                                    </el-col>
                                </el-col>
                                <el-col :span="24">
                                    <el-col :span="8">
                                        <el-checkbox label="身份证复印件"></el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox label="银行卡复印件"></el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox label="彩色照片(2张)"></el-checkbox>
                                    </el-col>
                                </el-col>
                                <el-col :span="24">
                                    <el-col :span="8">
                                        <el-checkbox label="体检报告"></el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox label="证书"></el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox label="弃保声明书"></el-checkbox>
                                    </el-col>
                                </el-col>
                                <el-col :span="24">
                                    <el-col :span="8">
                                        <el-checkbox label="员工外住责任声明书"></el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox label="职员保密/竞业协议"></el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox label="员工宿舍管理制度"></el-checkbox>
                                    </el-col>
                                </el-col>

                            </el-checkbox-group>
                        </el-form-item>​
                    </el-tab-pane>

                    <el-tab-pane label="物品领用">
                        <el-form-item>
                            <el-checkbox-group v-model="infousers.goods">
                                <el-col :span="24">
                                    <el-col :span="8">
                                        <el-checkbox label="工牌"></el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox label="指纹"></el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox label="工衣"></el-checkbox>
                                    </el-col>
                                </el-col>
                                <el-col :span="24">
                                    <el-col :span="8">
                                        <el-checkbox label="培训"></el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox label="公司手机"></el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox label="文具"></el-checkbox>
                                    </el-col>
                                </el-col>
                                <el-col :span="24">
                                    <el-col :span="8">
                                        <el-checkbox label="合同"></el-checkbox>
                                    </el-col>
                                </el-col>
                            </el-checkbox-group>
                        </el-form-item>

                    </el-tab-pane>

                    <el-tab-pane label="银行/社保">
                        <el-form-item label="社保分类">
                            <el-checkbox-group v-model="infousers.social">
                                <el-checkbox label="社保"></el-checkbox>
                                <el-checkbox label="商保"></el-checkbox>
                                <el-checkbox label="公积金"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="开户银行">
                            <el-input v-model="infousers.bankname" placeholder="开户行" maxlength="15" size="mini"></el-input>
                        </el-form-item>
                        <el-form-item label="分支行">
                            <el-input v-model="infousers.bankson" placeholder="分支" maxlength="10" size="mini"></el-input>
                        </el-form-item>
                        <el-form-item label="卡号">
                            <el-input v-model="infousers.bankcard" placeholder="银行账号" maxlength="32" size="mini"></el-input>
                        </el-form-item>
                    </el-tab-pane>

                    <el-tab-pane label="考勤">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <el-form-item label="周工作" prop="workday">
                                    <el-select v-model="infousers.workday" clearable placeholder="请选择" size="mini">
                                        <el-option v-for="item in dayOptions" :key="item.label" :label="item.label" :value="item.label"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="工作时数" prop="workhour">
                                    <el-select v-model="infousers.workhour" clearable placeholder="请选择" size="mini">
                                        <el-option v-for="item in hoursOptions" :key="item.label" :label="item.label" :value="item.label"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="责任制">
                            <el-checkbox v-model="infousers.accountability"></el-checkbox>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-form>
        <!-- <span slot="footer" class="dialog-footer"> -->
        <div class="footer">
            <el-button type="primary" @click="dialogForm(0)" size="mini" class="btnsave">保存</el-button>
            <el-button @click="dialogForm(1)" size="mini">取消</el-button>
        </div>

        <!-- </span>      -->
    </el-dialog>
</div>
</template>

<script>
import { createusers } from '@/api/user';
import { userpicupload } from '@/api/upload'
import { mapGetters } from "vuex";

export default {
    name: "edituser",
    data() {
        return {
            innerVisible: false,
            isEdit: false,
            actionUrl: '',
            imageUrl: '',
            dayOptions: [{ id: '0', label: '5.5' }, { id: '0', label: '6' }, { id: '0', label: '7' }],
            hoursOptions: [{ id: '0', label: '8' }, { id: '0', label: '10' }, { id: '0', label: '12' }],
            optionsEducation: [
                { label: "博士", id: "博士" },
                { label: "硕士", id: "硕士" },
                { label: "研究生", id: "研究生" },
                { label: "本科", id: "本科" },
                { label: "大专", id: "大专" },
                { label: "中专", id: "中专" },
                { label: "高中", id: "高中" },
                { label: "初中", id: "初中" },
                { label: "小学", id: "小学" },
            ],
            optionsSex: [
                { label: "男", id: "男" },
                { label: "女", id: "女" },
            ],
            optionsMarital: [
                { label: "未婚", id: "未婚" },
                { label: "已婚", id: "已婚" },
                { label: "离异", id: "离异" },
            ],
            rules: {
                user_name: [{ required: true, message: "姓名", trigger: "blur" }],
                user_id: [
                    { required: true, message: "工号", trigger: "blur" },
                ],
                defpartid: [
                    { required: true, message: "部门", trigger: "blur" },
                ],
                job: [{ required: true, message: "岗位", trigger: "blur" }, ],
                timestype: [{ required: true, message: "班次", trigger: "blur" }, ],
                cardid: [{ required: true, message: "身份证", trigger: "blur" }, ],
                address: [{ required: true, message: "户籍", trigger: "blur" }, ],
                mastpartid: [{ required: true, message: "上级部门", trigger: "blur" }, ],
                indate: [{ required: true, message: "入职日期", trigger: "blur" }, ],
                workday: [{ required: true, message: "周工作", trigger: "blur" }, ],
                workhour: [{ required: true, message: "工作时数", trigger: "blur" }, ],
            },

        };
    },
    props: ["infousers", "dialogStatus"],
    computed: {
        ...mapGetters(
            ["roles"],
            ["departmentjob_personals"],
            ["departmentjob_departs"],
            ["departmentjob_jobs"],
            ["departmentjob_times"]
        ),
    },
    created() {
        this.actionUrl = `${process.env.VUE_APP_BASE_API}/api/upload/def`;
        // this.src = `${process.env.VUE_APP_BASE_API}`

    },
    mounted: function () {},
    methods: {
        dialogForm(val) {
            let tmpUser = {}
            if (val == 0) {
                tmpUser = this.infousers
                tmpUser.cancel = false
                this.$refs['userForm'].validate((valid) => {
                    if (valid) {
                        if (val == 0) {
                            createusers(tmpUser).then((rs) => {
                                this.notifyMsg(
                                    "提交成功",
                                    "success",
                                    `人员资料已经创建/更新成功`
                                );
                                this.$emit("dialogFormStatus", rs.data.id ? rs.data : tmpUser);
                            })
                        } else { //取消退出
                            this.$emit("dialogFormStatus", tmpUser);
                        }
                    } else {
                        this.notifyMsg(
                            "提交失败",
                            "error",
                            `资料验证失败,* 必填项未完善`
                        );
                    }
                })
            } else {
                tmpUser.cancel = true
                this.$emit("dialogFormStatus", tmpUser);
            }
        },
        notifyMsg(title, type, msg) {
            const h = this.$createElement;
            this.$notify({
                title: title,
                type: type,
                message: msg,
            });
        },
        checkDeptName(val) {
            this.infousers.job = "";
            let deptName = this.$store.state.departmentjob.departs.find((item) => {
                return item.deptid === val;
            });
            this.infousers.dept = deptName.dept_name;
        },
        handleAvatarSuccess(res, file) {
            // this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return;
        },
        UploadPIC(val) {
            let fd = new FormData();
            fd.append('formname', 'user');
            fd.append('name', this.infousers.user_id);
            fd.append('file', val.file, val.file.name);
            userpicupload(fd).then((rs) => {
                if (rs.data.code == 200) {
                    this.infousers.imgurl = rs.data.msg
                } else {
                    console.log(rs.data.msg);
                    this.$message.error(`图片上传失败,请刷新重试`)
                }
            })
        }
    },
    computed: {
        src: function () {
            if (this.infousers.imgurl) return process.env.VUE_APP_BASE_API + this.infousers.imgurl
        }
    },
    watch: {}
};
</script>

<style scoped>
.el-form-item {
    margin-bottom: 0px;
}

.usrandimg {
    display: flex;
}

.el-image {
    width: 180px;
    height: 210px;
}

.el-checkbox {
    padding: 10px;
}

.rq {
    width: 140px;
}

.el-dialog__body {
    padding: 10px 0px;
}

.userimg.el-form-item.el-form-item--medium.el-form-item__content {
    margin-left: 20px;
}

.footer {
    display: flex;
    flex-direction: row-reverse;
}

.btnsave {
    margin-left: 20px;
}

.el-checkbox {
    padding: 0px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
