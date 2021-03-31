<template>
<div class="app-container-leave">
    <el-row :gutter="20">
        <el-col :span="24">
            <div class="grid-content bg-purple-dark">
                <el-row>
                    <el-col :span="1" :offset="1">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="NewUserleave" :disabled="isEdit">创建</el-button>
                    </el-col>
                    <el-col :span="1" :offset="1">
                        <el-button icon="el-icon-edit-outline" size="mini" @click="EditUserleave" :disabled="isEdit">修改</el-button>
                    </el-col>
                    <el-col :span="1" :offset="1">
                        <el-button type="success" icon="el-icon-check" size="mini" :disabled="!isEdit" @click="submitLeave('leaveData')">保存</el-button>
                    </el-col>
                    <el-col :span="1" :offset="1">
                        <el-button type="info" icon="el-icon-close" size="mini" @click="cancelUserleave" :disabled="!isEdit">取消</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="14" :offset="5">
            <el-form ref="leaveData" :model="tmpleaveData" :rules="rules" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="申请人" prop="userid">
                            <el-select v-model="tmpleaveData.userid" placeholder="请假人" size="mini" :disabled="!isEdit || this.tmpleaveData.userid !== ''">
                                <el-option v-for="item in $store.state.departmentjob.personals" :key="item.user_id" :label="item.user_name" :value="item.user_id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="请假类别" prop="leavetype">
                            <el-select v-model="tmpleaveData.leavetype" placeholder="请选择类别" size="mini" :disabled="!isEdit">
                                <el-option v-for="item in leaveTypes" :key="item.id" :label="item.leavename" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="请假日期" prop="freedate">
                            <el-date-picker v-model="tmpleaveData.freedate" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" range-separator="至" 
                            start-placeholder="开始日期" end-placeholder="结束日期" :disabled="!isEdit" @change="verifyDate" :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="请假说明" prop="remark">
                    <el-input type="textarea" v-model="tmpleaveData.remark" :disabled="!isEdit"></el-input>
                </el-form-item>

                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-form-item label="附件">
                            <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :limit="1">
                                <el-button slot="trigger" size="mini" type="primary" :disabled="!isEdit">选取</el-button>
                                <el-button class="uploadbtn" style="margin-left: 10px" size="mini" type="success" :disabled="!isEdit" @click="submitUpload">上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-col>

        <el-col :span="22" :offset="1">
            <el-table :data="leaveData" :max-height="$store.getters.locheight - 260" border @row-click="setRowData" style="width: 100%">
                <el-table-column prop="id" label="编号" width="100" v-show="false">
                </el-table-column>
                <el-table-column prop="userid" label="姓名" :formatter="formatUserName" width="100">
                </el-table-column>
                <el-table-column prop="userid" label="部门" width="150" :formatter="formatUserDept">
                </el-table-column>
                <el-table-column prop="leavetype" label="类别" width="50" :formatter="formatLeaveType">
                </el-table-column>
                <el-table-column prop="starttime" label="开始日期">
                    <template slot-scope="scope">{{
              $moment(scope.row.starttime).utc().format("YYYY-MM-DD HH:mm:ss")
            }}</template>
                </el-table-column>
                <el-table-column prop="endtime" label="结束日期">
                    <template slot-scope="scope">{{
              $moment(scope.row.endtime).utc().format("YYYY-MM-DD HH:mm:ss")
            }}</template>
                </el-table-column>

                <el-table-column label="天数" width="50" prop="days"></el-table-column>

                <el-table-column label="小时" width="50" prop="timetotal" :formatter="formatHours"></el-table-column>

                <el-table-column label="请假原因" prop="remark"></el-table-column>
                <el-table-column prop="applovestatus" label="单据状态" width="80" :formatter="formatLeaveStatus">
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</div>
</template>

<script>
// import { fetchList } from '@/api/article'
import { leavebase, leaveapply } from "@/api/leave";
export default {
    name: "dmleave",
    data() {
        return {
            loading: "",
            tmpleaveData: {
                id: 0,
                userid: "",
                leavetype: "",
                remark: "",
                freedate: [],
                applovestatus: 0,
            },
            editClick: false,
            isEdit: false,
            fileList: [],
            leaveData: [],
            leaveLog: [],
            leaveStatus: [],
            leaveTypes: [],
            pickerOptions: {
                onPick: (time) => {
                    // console.log(time);
                },
                disabledDate: (time) => {
                    // console.log(time);
                },
            },
            rules: {
                userid: [{ required: true, message: "请输入申请人", trigger: "blur" }],
                leavetype: [
                    { required: true, message: "请选择请假类别", trigger: "change" },
                ],
                freedate: [{
                    required: true,
                    message: "请选择日期",
                    trigger: "change",
                }, ],
            },
        };
    },
    created() {
        this.openFullScreen2();
        leavebase().then((baseData) => {
            this.leaveData = baseData.data.leaveBase;
            this.leaveLog = baseData.data.leaveLog;
            this.leaveStatus = baseData.data.leaveStatus;
            this.leaveTypes = baseData.data.leaveType;
            this.loading.close();
        });
    },
    mounted: function () {},
    methods: {
        NewUserleave() {
            this.isEdit = true;
            this.editClick = false;
            this.tmpleaveData.id = 0;
            this.resetForm("leaveData");
        },
        EditUserleave() {
            if (this.tmpleaveData.userid == "" || this.tmpleaveData.applovestatus > 0)
                return;
            this.isEdit = true;
        },
        cancelUserleave() {
            this.isEdit = false;
            this.resetForm("leaveData");
        },
        submitLeave(formName) {
            //提交
            this.openFullScreen2();
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    leaveapply(this.tmpleaveData).then((rs) => {
                        if (rs.data.code == 200) {
                            this.repaceCurFormDate(rs.data);
                            this.notifyMsg(
                                "提交成功",
                                "success",
                                `${this.tmpleaveData.userid} -- 请假单提交成功`
                            );
                            this.resetForm("leaveData");
                        } else {
                            this.notifyMsg(
                                "提交失败",
                                "error",
                                `${this.tmpleaveData.userid} -- ${rs.data.msg} `
                            );
                            return;
                        }
                        this.isEdit = false;
                        this.loading.close();
                        //
                    });
                } else {
                    this.notifyMsg(
                        "提交失败",
                        "error",
                        `${this.tmpleaveData.userid} -- 请假单提交失败,请核对申请数据`
                    );
                    this.loading.close();
                    return false;
                }
            });
        },
        notifyMsg(title, type, msg) {
            const h = this.$createElement;
            this.$notify({
                title: title,
                type: type,
                message: msg,
            });
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        setRowData(row, column) {
            if (this.isEdit) return;
            this.tmpleaveData.id = row.id;
            this.tmpleaveData.userid = parseInt(row.userid);
            this.tmpleaveData.leavetype = row.leavetype;
            this.tmpleaveData.remark = row.remark;
            this.tmpleaveData.freedate = [
                this.$moment(row.starttime).utc().format("YYYY-MM-DD HH:mm:ss"),
                this.$moment(row.endtime).utc().format("YYYY-MM-DD HH:mm:ss"),
            ];
            this.tmpleaveData.applovestatus = row.applovestatus;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
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
        formatLeaveType(row, colum) {
            let tmpUser = this.leaveTypes.filter((el) => {
                return parseInt(el.id) === parseInt(row.leavetype);
            });
            return tmpUser.length == 0 ? "未知" : tmpUser[0].leavename;
        },
        formatLeaveStatus(row, colum) {
            let tmpUser = this.leaveStatus.filter((el) => {
                return parseInt(el.statusid) === parseInt(row.applovestatus);
            });
            return tmpUser.length == 0 ? "未知" : tmpUser[0].msg;
        },
        formatHours(row, colum) {
            return (row.timetotal / 60).toFixed(1);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        /**
         * 更新本地显示数据
         */
        repaceCurFormDate(values) {
            let indexId = this.leaveData.findIndex((val) => val.id === values.id);
            let replaceData = {
                apploveid: values.apploveid,
                applovestatus: values.applovestatus,
                createuser: values.createuser,
                days: values.days,
                endtime: values.endtime,
                id: values.id,
                leavedate: values.leavedate,
                leavetype: values.leavetype,
                remark: values.remark,
                starttime: values.starttime,
                timetotal: values.timetotal,
                userid: values.userid,
            };
            this.leaveData.splice(
                indexId < 0 ? 0 : indexId,
                indexId < 0 ? 0 : 1,
                replaceData
            );
        },

        verifyDate(val){
          if(val.length !== 0){
            if(this.$moment(val[0]).isBefore(this.$moment(new Date()).subtract(3, 'days'))){
              this.$message.error({message:'请假日期非有效期内，过往日期在三天内',duration:10000});
              this.tmpleaveData.freedate = [];
              return;
            }            
          }            
        },

        openFullScreen2() {
            this.loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
            });
        },
    },
};
</script>

<style scoped>
.el-form {
    background: radial-gradient(#e6e1e1, transparent);
    padding: 20px;
}

.uploadbtn {
    height: 28px;
    margin-left: 10px;
    margin-top: 5px;
}

.upload-demo {
    display: flex;
}

.ul {
    padding-left: 30px;
    height: 20px;
}

.grid-content {
    padding-top: 12px;
    border-radius: 4px;
    min-height: 50px;
}

.bg-purple-dark {
    background: #f1f3f7;
}
</style>
