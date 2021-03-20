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
                                    <el-input v-model="infousers.user_name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="工号">
                                    <el-input v-model="infousers.user_id"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="部门">
                                    <el-select v-model="infousers.defpartid" placeholder="请选择" @change="checkDeptName">
                                        <el-option v-for="el in deptList" :key="el.id" :label="el.label" :value="el.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="部门编码">
                                    <el-input :readonly="true" v-model="infousers.defpartid"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="岗位">
                                    <el-input v-model="infousers.job"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="职位">
                                    <el-input v-model="infousers.position"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="班次">
                                    <el-select v-model="infousers.timestype" placeholder="请选择">
                                        <el-option v-for="el in listBc" :key="el.id" :label="el.label" :value="el.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="性别">
                                    <el-select v-model="infousers.sex" placeholder="请选择">
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
                                <el-input v-model="infousers.address"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="身份ID">
                                <el-input v-model="infousers.cardid"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="教育">
                                <el-select v-model="infousers.education" placeholder="请选择">
                                        <el-option v-for="el in optionsEducation" :key="el.id" :label="el.label" :value="el.id">
                                        </el-option>
                                    </el-select>                                
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系方式">
                                <el-input v-model="infousers.phone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="入职日期">
                                <el-date-picker :editable="false" v-model="infousers.indate" type="date" placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="上级部门">
                                 <el-select v-model="infousers.mastpartid" placeholder="请选择">
                                        <el-option v-for="el in deptList" :key="el.id" :label="el.label" :value="el.id" 
                                        :disabled="el.id == infousers.defpartid" >
                                        </el-option>
                                 </el-select>

                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="邮箱">
                                <el-input v-model="infousers.email"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="生日">
                                <el-date-picker :disabled="true" v-model="infousers.birthday" type="date" placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="门禁">
                                <el-input  type="number" v-model="infousers.cdnumber"></el-input>                                
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <el-form-item>
                                <el-checkbox v-model="infousers.isline">在职</el-checkbox>
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

export default {
    name: "edituser",
    data() {
        return {
            isEdit: false,
            src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            listBc: [{
                    id: 1,
                    label: "一班次"
                },
                {
                    id: 2,
                    label: "二班次"
                },
                {
                    id: 3,
                    label: "三班次"
                },
                {
                    id: 4,
                    label: "四班次"
                }
            ],
            deptList: [
                { label: "(ACC) 财务部", id: 100001 },
                { label: "(Assembly) 装配车间", id: 100002 },
                { label: "(CNC) 机加车间", id: 100003 },
                { label: "(CS) 客服部", id: 100004 },
                { label: "(ENG)工程部", id: 100005 },
                { label: "(GMO) 总经办", id: 100006 },
                { label: "(HR & ADM) 人事行政部", id: 100007 },
                { label: "(IM) 注塑车间", id: 100008 },
                { label: "(IT) 网络部", id: 100009 },
                { label: "(PMC) 资材部", id: 100010 },
                { label: "(PROD) 生产部", id: 100011 },
                { label: "(PROD) 生产部 / (Mould) 模具车", id: 100012 },
                { label: "(QC) 品质部", id: 100013 },
                { label: "PC", id: 100014 },
                { label: "(Engineering)工程组", id: 100015 },
                { label: "(Equipment)设备组", id: 100016 },
                { label: "(Project)项目组", id: 100017 },
                { label: "(XG)香港财务部", id: 100018 },
                { label: "(purchase)采购", id: 100019 },
                { label: "(warehouse)仓库", id: 100020 },
                { label: "总经理", id: 111111 },
                { label: "总裁", id: 222222 }
            ],
            optionsEducation:[
            { label: "博士", id: "博士" },
            { label: "硕士", id: "硕士" },
            { label: "研究生", id: "研究生"},
            { label: "本科", id: "本科" },
            { label: "大专", id: "大专" },
            { label: "中专", id: "中专" },
            { label: "高中", id: "高中" },
            { label: "初中", id: "初中" },
            { label: "小学", id: "小学" }
            ],
            optionsSex:[{label:"男",id:"男"},{label:"女",id:"女"}]
        };
    },
    props: ["infousers", "dialogStatus"],
    created() {
        console.log(this.infousers)
    },
    mounted: function () {
        // console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH")
    },
    methods: {
        dialogForm() {
            let tmpUser = this.infousers;
            this.$emit("dialogFormStatus", tmpUser);
        },
        checkDeptName(val) {
            let deptName = this.deptList.find((item) => {
                return item.id === val
            })
            this.infousers.dept = deptName.label;
            console.log(this.infousers)
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
