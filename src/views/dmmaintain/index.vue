<template>
<div class="app-container-maintain">
    <el-tabs type="border-card">
        <el-tab-pane label="节假日设定">
            <el-row>
                <el-col :span="3" :offset="6">
                    <el-button type="primary" plain size="mini" @click="createHolidays">创建</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="6" :offset="8">
                    <el-form :model="ruleForm" status-icon ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="名称" prop="rename">
                            <el-select v-model="ruleForm.rename" clearable placeholder="请选择" size="mini">
                                <el-option v-for="item in holidystype" :key="item.id" :label="item.id" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="开始日期" prop="checkdate">
                            <el-date-picker v-model="ruleForm.checkdate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="ruleForm.remark" size="mini" type="textarea" :rows="3"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="18" :offset="3">
                    <el-table :data="holidaysDate" border :max-height="$store.getters.locheight - 240" style="width: 100%">
                        <el-table-column prop="dayname" label="名称" width="180">
                        </el-table-column>
                        <el-table-column prop="startdate" label="开始日期" width="180">
                            <template slot-scope="scope">
                                {{$moment(scope.row.startdate).format('YYYY-MM-DD') }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="enddate" label="结束日期" width="180">
                            <template slot-scope="scope">
                                {{$moment(scope.row.enddate).format('YYYY-MM-DD') }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="备注">
                        </el-table-column>
                        <el-table-column prop="remark" label="操作" width="50">
                            <template slot-scope="scope">
                                <el-button type="danger" icon="el-icon-delete" circle plain size="mini" @click="handleDelete(scope.$index, scope.row)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="考勤补救">待开发</el-tab-pane>
        <el-tab-pane label="特殊刷卡">待开发</el-tab-pane>
        <el-tab-pane label="邮件补送">待开发</el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import { getHolidays, infoHolidays, removeHolidays } from '@/api/sysconfig'

export default ({
    name: "dmmaintain",
    data() {
        return {
            holidystype: [{ 'id': '春节' }, { 'id': '清明节' }, { 'id': '劳动节' }, { 'id': '端午节' }, { 'id': '中秋节' }, { 'id': '国庆节' }, { 'id': '元旦' }, { 'id': '调休' }],
            ruleForm: {
                rename: '',
                checkdate: [],
                remark: ''
            },
            holidaysDate: [],
            rules: {
                rename: [{ required: true, message: "请输入名称", trigger: "blur" }],
                checkdate: [
                    { required: true, message: "请选择日期", trigger: "blur" },
                ],
            },
        }
    },
    created() {
        getHolidays().then((rs) => {
            if (rs.data.code == 200) {
                this.holidaysDate = [] = rs.data.msg
            } else {
                this.$message.error(`初始化数据失败,请刷新重试`);
            }
        })
    },
    methods: {
        handleDelete(row, index) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                removeHolidays(index).then((rs) => {
                    if (rs.data.code == 200) {
                        let indexID = this.holidaysDate.findIndex(val => val.id === index.id)
                        this.holidaysDate.splice(indexID,1);
                        this.$message.success(`删除成功`);
                        this.ruleForm= {
                            rename: '',
                            checkdate: [],
                            remark: ''
                        }
                    } else {
                        this.$message.success(`删除失败,请刷新后重试`)
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        createHolidays() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    infoHolidays(this.ruleForm).then((rs) => {
                        if (rs.data.code == 200) {
                            this.holidaysDate.splice(0, 0, rs.data.msg);
                            this.$message.success(`数据保存成功`);
                        } else {
                            console.log(rs.data.msg);
                            this.$message.error(`数据保存失败,请刷新后重试`);
                        }
                    })
                } else {
                    this.$message.error(`信息不完整,无法保存数据`);
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }

})
</script>
