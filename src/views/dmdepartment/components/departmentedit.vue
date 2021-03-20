<template>
<div class="app-container-edituser">
    <el-dialog :title="infoRow.dept_name" :visible.sync="dialogStatus" :before-close="dialogForm">
        <el-form ref="form" :model="infoRow" label-width="80px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="部门名称">
                        <el-input v-model="infoRow.dept_name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="部门编号">
                        <el-input v-model="infoRow.deptid" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="负责人">
                        <el-input v-model="infoRow.deptower" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="上级部门">
                        <el-input v-model="infoRow.upbenchid" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="编制人数">
                        <el-input v-model="infoRow.authorized" placeholder="编制"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item>
                    <el-button type="primary" @click="dialogForm">保存</el-button>
                    <el-button @click="dialogForm">取消</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-dialog>
</div>
</template>

<script>
// import { fetchList } from '@/api/article'

export default {
    name: "departmentedit",
    data() {
        return {
            isEdit: false,
            infousers: {}
        };
    },
    props: ["dialogStatus", "infoRow"],
    created() {
        console.log(this.infoRow)
    },
    mounted: function () {},
    methods: {
        dialogForm() {
            // let tmpUser = this.infodepart;
            this.$emit("reBackRow");
        },
        // checkDeptName(val) {
        //     let deptName = this.deptList.find((item) => {
        //         return item.id === val
        //     })
        //     this.infousers.dept = deptName.label;
        // }
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
</style>
