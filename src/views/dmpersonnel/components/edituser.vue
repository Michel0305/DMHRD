<template>
<div class="app-container-edituser">
    <el-dialog :title="infousers.user_name" :visible.sync="dialogStatus" :before-close="dialogForm">
        <el-form ref="form" :model="infousers" label-width="80px">
            <div class="dialogClass">
                <div class="usrandimg">
                    <div class="user">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="姓名">
                                    <el-input v-model="infousers.user_name" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="工号" size="mini">
                                    <el-input v-model="infousers.user_id"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="部门">
                                    <el-select v-model="infousers.defpartid" placeholder="请选择"  @change="checkDeptName" size="mini">
                                        <el-option v-for="el in $store.state.departmentjob.departs" :key="el.deptid" :label="el.dept_name" :value="el.deptid ">
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
                                <el-form-item label="岗位">
                                    <el-select v-model="infousers.job" placeholder="请选择" size="mini">
                                        <!-- .filter(items=>{return items.defpartid == infousers.defpartid }) ) -->
                                        <el-option v-for="el in ($store.state.departmentjob.jobs.filter(items=>{return items.defpartid == infousers.defpartid }) )" :key="el.job" :label="el.job" :value="el.job"
                                        :disabled="el.job == infousers.job " >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="职位">
                                    <el-input v-model="infousers.position" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="班次">
                                    <el-select v-model="infousers.timestype" placeholder="请选择" size="mini">
                                        <el-option v-for="el in $store.state.departmentjob.times" :key="el.id" :label="el.timesname" :value="el.id" :disabled="el.ischeck">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="性别">
                                    <el-select v-model="infousers.sex" placeholder="请选择" size="mini">
                                        <el-option v-for="el in optionsSex" :key="el.id" :label="el.label" :value="el.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </div>
                    <div class="userimg">
                        <el-form-item label="图片">
                            <el-image :src="src" class="userimg">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                            </el-image>
                            <!-- <el-input v-model="infousers.imgurl"></el-input> -->
                        </el-form-item>
                    </div>
                </div>
                <div class="userother">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="户籍">
                                <el-input v-model="infousers.address" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="身份ID">
                                <el-input v-model="infousers.cardid" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="教育">
                                <el-select v-model="infousers.education" placeholder="请选择" size="mini">
                                        <el-option v-for="el in optionsEducation" :key="el.id" :label="el.label" :value="el.id">
                                        </el-option>
                                    </el-select>                                
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系方式" size="mini">
                                <el-input v-model="infousers.phone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="入职日期" >
                                <el-date-picker :editable="false" v-model="infousers.indate" type="date" placeholder="选择日期" size="mini">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="上级部门" >
                                 <el-select v-model="infousers.mastpartid" placeholder="请选择" size="mini">
                                        <el-option v-for="el in $store.state.departmentjob.departs" :key="el.deptid" :label="el.dept_name" :value="el.deptid" 
                                        :disabled="el.deptid == infousers.defpartid" >
                                        </el-option>
                                 </el-select>

                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="邮箱">
                                <el-input v-model="infousers.email" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="生日">
                                <el-date-picker :disabled="true" v-model="infousers.birthday" type="date" placeholder="选择日期" size="mini">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="门禁">
                                <el-input v-model="infousers.cdnumber" size="mini"></el-input>                                
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <el-form-item>
                                <el-checkbox v-model="infousers.isline" >在职</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </div>
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
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { mapGetters } from "vuex";
export default {
    name: "edituser",
    data() {
        return {
            isEdit: false,
            src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            optionsEducation:[
            { label: "博士", id: "博士" },
            { label: "硕士", id: "硕士" },
            { label: "研究生", id: "研究生"},
            { label: "本科", id: "本科" },
            { label: "大专", id: "大专" },
            { label: "中专", id: "中专" },
            { label: "高中", id: "高中" },
            { label: "初中", id: "初中" },
            { label: "小学", id: "小学" }],
            optionsSex:[{label:"男",id:"男"},{label:"女",id:"女"}],            
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
    created(){
        console.log(this.$store.state.departmentjob.departs)
//         departs: Array(22)
// jobs: Array(75)
// personals: Array(123)
// times: Array(7)
    },
    mounted: function () {
    },
    methods: {
        dialogForm() {
            let tmpUser = this.infousers;
            this.$emit("dialogFormStatus", tmpUser);
        },
        checkDeptName(val) {
            this.infousers.job = "";
            let deptName =this.$store.state.departmentjob.departs.find((item) => {return item.deptid === val })
            this.infousers.dept = deptName.dept_name;
        }
    },
};
</script>

<style scoped>
.el-dialog__body {
    padding: 10px 10px;
}

.usrandimg {
    display: flex;
}

.el-image {
    width: 180px;
    height: 210px;
}
</style>
