<template>
<div class="personnel-container">
    <el-row :gutter="20">
        <el-col :span="24">
            <div class="grid-content bg-purple-dark">
                <el-row>
                    <el-col :span="1" :offset="1">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="NewUserInfo">入职</el-button>
                    </el-col>
                    <!-- <el-col :span="3" :offset="1">
                        <el-button type="info" icon="el-icon-download" size="mini">Export</el-button>
                    </el-col> -->
                    <el-col :span="6" :offset="15">
                        <div>
                            <el-input size="mini" placeholder="请输入内容" v-model="swhere" class="input-with-select">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <el-table :data="
            tableData.filter(
              (data) =>
                !swhere ||
                data.user_name.toLowerCase().includes(swhere.toLowerCase()) 
            )
          " :max-height="$store.getters.locheight" style="width: 100%">
                <el-table-column label="姓名" width="90">
                    <template slot-scope="scope">
                        <span>{{ scope.row.user_name }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="工号" sortable width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.user_id }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="性别" width="50">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sex }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="部门" width="110" sortable>
                    <template slot-scope="scope">
                        <span>{{ scope.row.dept }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="岗位" width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.job }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="户籍" sortable>
                    <template slot-scope="scope">
                        <span>{{ scope.row.address }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="出生日期" prop="row.birthday" :formatter="fmByDate" width="100">
                </el-table-column>

                <el-table-column label="入职日期" prop="row.indate" :formatter="fmInfoDate" width="100">
                </el-table-column>

                <el-table-column label="状态" sortable prop="tag" width="80">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.isline ? 'success' : 'danger'" disable-transitions>{{ scope.row.isline ? "在职" : "离职" }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editUserBase(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleResign(scope.$index, scope.row)">离职</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <edituser :infousers="rowData" :dialogStatus="showstatus" @dialogFormStatus="cdialogFormStatus" @emitData="chageemitData" />
    <resignation :infousers="rowData" :LdialogStatus="showResignDlg" @dialogFormStatus="dialogResignStatus" />
</div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
// import { users } from '@/api/user'
import store from "@/store";
import { isArray } from '@/utils/validate';
export default {
    name: "personnel",
    components: {
    //:resolve=>require(['./components/salarysetting'],resolve),
        edituser:resolve=>require(['@/views/dmpersonnel/components/edituser'],resolve),     
        resignation:resolve=>require(['@/views/dmpersonnel/components/resignation'],resolve)}, //引入需要的模板
    data() {
        return {
            swhere: "",
            rowData: {},
            showstatus: false,
            showResignDlg: false,
            tableData: [],
        };
    },
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
       this.getPersonal();      
    },
    methods: {
        async getPersonal() {
            this.tableData = [] =await store.state.departmentjob.personals;
        },
        editUserBase(index, row) {
            //显示
            this.showstatus = true;
            this.rowData = row;
            this.rowData.isEdit = true;
            this.rowData.goods = this.rowData.goods == null ? [] : isArray(this.rowData.goods) ?  this.rowData.goods:this.rowData.goods.split(",");
            this.rowData.documents =
                this.rowData.documents == null ? [] : isArray(this.rowData.documents) ? this.rowData.documents:this.rowData.documents.split(",") ;
            this.rowData.social =
                this.rowData.social == null ? [] : isArray(this.rowData.social) ? this.rowData.social:this.rowData.social.split(",") ;
        },
        handleResign(index, row) {
            this.rowData = row;
            this.showResignDlg = true;
        },

        chageemitData(val){
            this.rowData = val;
            this.rowData.isEdit = true;
            this.rowData.goods = this.rowData.goods == null ? [] : isArray(this.rowData.goods) ?  this.rowData.goods:this.rowData.goods.split(",");
            this.rowData.documents =
                this.rowData.documents == null ? [] : isArray(this.rowData.documents) ? this.rowData.documents:this.rowData.documents.split(",") ;
            this.rowData.social =
                this.rowData.social == null ? [] : isArray(this.rowData.social) ? this.rowData.social:this.rowData.social.split(",") ;
        },

        cdialogFormStatus(val) {
            //接收子主件消息
            this.showstatus = false;
            if (val.cancel) return
            this.replaceDefData(val)            
        },

        dialogResignStatus() {
            this.showResignDlg = false;
        },
        handleDelete(index, row) {},

        getHeight() {
            //此处代码需要优化 全局使用  --OLG 已优化
            this.contentStyleObj.height = window.innerHeight - 150;
        },
        NewUserInfo() {
            let tmpUserData = {
                isEdit: false,
                accountability: 1,
                address: '',
                bankcard: '',
                bankname: '',
                bankson: '',
                birthday: '',
                cardid: '',
                cdnumber: '',
                create_time: '',
                defpartid: '',
                dept: '',
                documents: [],
                education: '',
                email: null,
                goods: [],
                id: 0,
                imgurl: null,
                indate: '',
                isEdit: true,
                isline: true,
                job: '',
                mastpartid: null,
                phone: '',
                position: '',
                school: null,
                sex: '',
                social: [],
                timestype: null,
                user_id: null,
                user_name: null,
                workday: null,
                workhour: null,
                workloc: null
            };
            this.rowData = tmpUserData;
            this.showstatus = true;
        },
        fmInfoDate(row, col) {
            return this.$moment(row.indate).format("YYYY-MM-DD");
        },
        fmByDate(row, col) {
            return this.$moment(row.birthday).format("YYYY-MM-DD");
        },

        replaceDefData(users) {
            let indexId = this.tableData.findIndex((val) => parseInt(val.id) === parseInt(users.id))
            this.tableData.splice(
                indexId < 0 ? 0 : indexId,
                indexId < 0 ? 0 : 1,
                users
            );
        }
    },
};
</script>

<style scoped>
.grid-content {
    padding-top: 12px;
    border-radius: 4px;
    min-height: 50px;
}

.bg-purple-dark {
    background: #dfe2e4;
}
</style>
