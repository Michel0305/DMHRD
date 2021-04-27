<template>
<el-dialog :title="infousers.user_name" :visible.sync="LdialogStatus" :before-close="dialogForm">
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
        <el-form-item label="离职日期">
            <el-col :span="6">
                <el-date-picker type="date" placeholder="期望日期" v-model="sizeForm.expectdate" style="width: 100%" size="mini"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" :offset="1">-</el-col>
            <el-col :span="6">
                <el-date-picker type="date" placeholder="协商日期" v-model="sizeForm.coordinatedate" style="width: 100%" size="mini"></el-date-picker>
            </el-col>
        </el-form-item>

        <el-form-item label="离职原因">
            <el-col :span="11">
                <el-select v-model="sizeForm.lotype" placeholder="请选择" size="mini">
                    <el-option v-for="item in resgOptions" :key="item.id" :label="item.value" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="20">
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="sizeForm.remark">
                </el-input>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="dialogForm" size="mini">提交</el-button>
            <el-button @click="dialogForm" size="mini">取消</el-button>
        </el-form-item>
    </el-form>
</el-dialog>
</template>

<script>
import { leaveoffice } from "@/api/leave"
export default {
    name: "resignation",
    data() {
        return {
            resgOptions: [
                { id: 0, value: "个人原因" },
                { id: 1, value: "谋求更高发展" },
                { id: 2, value: "工作环境" },
                { id: 3, value: "家庭原因" },
                { id: 4, value: "部门内部" },
                { id: 5, value: "其他备注" },
            ],
            sizeForm: {},
        };
    },
    props: ["infousers", "LdialogStatus"],
    methods: {
        dialogForm() {
            this.sizeForm.userid = this.infousers.user_id
            this.sizeForm.infodate = this.infousers.indate
            leaveoffice(this.sizeForm).then((rs)=>{
              this.$emit("dialogFormStatus", "");
            })
        },
        onSubmit() {
            console.log("submit!");
        },
    },
};
</script>
