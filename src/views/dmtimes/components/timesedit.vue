<template>
<div class="app-container-edituser">
    <el-dialog :title="infoRow.isEdit ? infoRow.timesname : '创建'" :visible.sync="dialogStatus">
        <el-form ref="timesForm" :model="infoRow" :rules="rules" label-width="80px">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="名称" prop="timesname">
                        <el-input placeholder="请输入内容" v-model="infoRow.timesname" clearable size="mini">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="类别" prop="timestype">
                        <el-select v-model="infoRow.timestype" placeholder="请选择" size="mini">
                            <el-option v-for="item in timeTypes" :key="item.id" :label="item.label" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="时间点1" prop="timesfirst">
                <el-time-select placeholder="起始时间" v-model="infoRow.timesfirst" :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '24:00',
            }" size="mini">
                </el-time-select>
                <el-time-select placeholder="结束时间" v-model="infoRow.timessecond" :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '24:00',
              minTime: infoRow.timesfirst,
            }" size="mini">
                </el-time-select>
            </el-form-item>
            <el-form-item label="时间点2">
                <el-time-select placeholder="起始时间" v-model="infoRow.timesthird" :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '24:00',
              minTime: infoRow.timestype !== 0 ? '00:00' : infoRow.timessecond,
            }" size="mini">
                </el-time-select>
                <el-time-select placeholder="结束时间" v-model="infoRow.timesfourth" :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '24:00',              
            }" size="mini">
                </el-time-select>
                <!-- minTime: infoRow.timesthird, -->
            </el-form-item>
            <el-form-item label="时间点3">
                <el-time-select placeholder="起始时间" v-model="infoRow.timesfifth" :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '24:00',
              minTime: infoRow.timestype !== 0 ? '00:00' : infoRow.timessecond,
            }" size="mini">
                </el-time-select>
                <el-time-select placeholder="结束时间" v-model="infoRow.thimessixth" :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '24:00',
              minTime: infoRow.thimessixth,
            }" size="mini">
                </el-time-select>
            </el-form-item>
            <el-form-item label="加班开始">
                <el-time-select placeholder="加班开始" v-model="infoRow.workstart" :picker-options="{
              start: '04:00',
              step: '00:5',
              end: '24:00',
              minTime: infoRow.workstart,
            }" size="mini">
                </el-time-select>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="infoRow.ischeck">是否启用</el-checkbox>
            </el-form-item>
        </el-form>
        <div class="footer">
            <el-button type="primary" @click="dialogForm(0)" class="btnsave" size="mini">保存</el-button>
            <el-button @click="dialogForm(1)" size="mini">取消</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import { createWorkTime } from '@/api/user'

export default {
    name: "timesedit",
    data() {
        return {
            isEdit: false,
            infousers: {},
            timeTypes: [
                { id: 0, label: "白班" },
                { id: 1, label: "夜班" },
            ],
            rules: {
                timesname: [{ required: true, message: "请输入班次名称", trigger: "blur" }],
                timestype: [{
                    required: true,
                    message: "请选择类别",
                    trigger: "change",
                }, ],
                timesfirst: [{
                    required: true,
                    message: "请选择时间",
                    trigger: "change",
                }, ],
            },
        };
    },
    props: ["dialogStatus", "infoRow"],
    created() {
        // console.log(this.infoRow);
    },
    mounted: function () {},
    methods: {
        dialogForm(type) {
            if (type == 0) {
                this.$refs['timesForm'].validate((valid) => {
                    if (valid) {
                        createWorkTime(this.infoRow).then((rs) => {
                            if (rs.data.code == 200) {
                                this.$emit("commitFormData", rs.data.backdata.isupdate ? this.infoRow : rs.data.backdata);
                                this.$message.success('数据提交成功');
                            } else {
                                this.$message.error('数据提交失败');
                                return
                            }
                        })
                    } else {
                        this.$message.error('添加班次验证失败请核实资料');
                        return
                    }
                })
            } else {
                this.$emit("commitFormData", null);
            }
        },
    },
};
</script>

<style scoped>
.footer {
    display: flex;
    flex-direction: row-reverse;
}

.btnsave {
    margin-left: 20px;
}
</style>
