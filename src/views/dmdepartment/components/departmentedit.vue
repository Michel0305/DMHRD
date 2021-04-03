<template>
<div class="app-container-edituser">
    <el-dialog :title="infoRow.isEdit ? infoRow.dept_name : '创建'" :visible.sync="dialogStatus">
        <el-form ref="departform" :model="infoRow" :rules="rules" label-width="80px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="部门名称" prop="dept_name">
                        <el-input v-model="infoRow.dept_name" placeholder="请输入" size="mini"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="部门编号" prop="deptid">
                        <el-input v-model="infoRow.deptid" placeholder="请输入" size="mini" maxlength="5"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="负责人" prop="deptower">
                        <el-select v-model="infoRow.deptower" placeholder="请选择" size="mini">
                            <el-option v-for="el in $store.state.departmentjob.personals" :key="el.user_id" :label="`${el.user_id} / ${el.user_name}`" :value="el.user_id" :disabled="el.user_id == infoRow.deptower">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="上级部门" prop="upbenchid">
                        <el-select v-model="infoRow.upbenchid" placeholder="请选择" size="mini">
                            <el-option v-for="el in $store.state.departmentjob.departs" :key="el.deptid" :label="`${el.deptid}-${el.dept_name}`" :value="el.deptid" :disabled="el.deptid == infoRow.upbenchid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="编制人数">
                        <el-input-number size="mini" v-model="infoRow.authorized"></el-input-number>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="footer">
                <el-button type="primary" @click="dialogForm(0)" class="btnsave" size="mini">保存</el-button>
                <el-button @click="dialogForm(1)" size="mini">取消</el-button>
            </div>
        </el-form>
    </el-dialog>
</div>
</template>

<script>
import { createdeparts } from '@/api/user'

export default {
    name: "departmentedit",
    data() {
        return {
            isEdit: false,
            infousers: {},
            rules: {
                dept_name: [{ required: true, message: "请输入部门名", trigger: "blur" }],
                deptid: [
                    { required: true, message: "请输入部门编号", trigger: "blur" },
                ],
                deptower: [{
                    required: true,
                    message: "请选择负责人",
                    trigger: "change",
                }, ],
                upbenchid: [{
                    required: true,
                    message: "请选择日期",
                    trigger: "change",
                }, ],
            },
        };
    },
    props: ["dialogStatus", "infoRow"],
    created() {
        // console.log(this.$store.state.departmentjob);
    },
    mounted: function () {},
    methods: {
        dialogForm(val) {
            let tmpDept = this.$store.state.departmentjob.departs.filter((el) => { return parseInt(el.deptid) == parseInt(this.infoRow.deptid) })
            if (tmpDept.length > 0 && this.infoRow.id === 0) {
                this.$message({
                    message: '部门编码重复,不可提交',
                    type: 'warning'
                });
                this.infoRow.deptid = null;
                return;
            }
            if (val == 1) {
                this.$emit("reBackRow", { isCreate: false });
                return;
            }
            this.$refs['departform'].validate((valid) => {
                if (valid) {
                    createdeparts(this.infoRow).then((rs) => {
                        let reBackDepart = rs.data
                        if (reBackDepart.code == 200) {
                            if (this.infoRow.id == 0) {
                                reBackDepart.isCreate = true
                            } else {
                                reBackDepart.isCreate = false
                            }
                            this.notifyMsg('数据提交', 'success', '数据提交保存成功');
                            this.$emit("reBackRow", reBackDepart);
                        } else {
                            this.$message.error(reBackDepart.backdata);
                            return
                        }
                    })
                } else {
                    this.$message.error('部门添加失败,验证不通过,请核实输出');
                    return;
                }
            })

        },
        notifyMsg(title, type, msg) {
            const h = this.$createElement;
            this.$notify({
                title: title,
                type: type,
                message: msg,
            });
        },
    },
};
</script>

<style scoped>
.el-dialog__body {
    padding: 10px 10px;
}

.el-image {
    width: 180px;
    height: 210px;
}

.footer {
    display: flex;
    flex-direction: row-reverse;
}

.btnsave {
    margin-left: 20px;
}
</style>
