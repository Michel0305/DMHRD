<template>
<div class="dashboard-editor-container">
    <el-row :gutter="20">
        <el-col :span="24">
            <div class="grid-content bg-purple-dark">
                <el-row>
                    <el-col :span="1" :offset="1">
                        <el-button type="primary" icon="el-icon-circle-check" size="mini" @click="apploveSign">核准</el-button>
                    </el-col>
                    <el-col :span="3" :offset="1">
                        <el-button type="warning" icon="el-icon-refresh-left" size="mini">批退</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="24">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label">
                        <el-badge :value="signData.filter((el)=>{ return el.reApplove == false}).length" :max="99" class="item">
                            <i class="el-icon-date"></i></el-badge>签核箱
                    </span>
                    <el-row :gutter="10" class="tableform">
                        <el-col :span="20" :offset="2">
                            <el-table ref="multipleTable" :data="signData.filter((el)=>{ return el.reApplove == false}).slice((currentPage-1)*pageSize,currentPage*pageSize) " border tooltip-effect="dark" 
                                :style="{width:'100%',height:$store.getters.locheight - 110+'px' }"
                                 @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" :max-height="$store.getters.locheight - 110">
                                <el-table-column type="selection" width="40">
                                </el-table-column>
                                <el-table-column label="表单" width="120" prop="modelname">
                                    <template slot-scope="scope">{{ scope.row.modelname }}</template>
                                </el-table-column>
                                <el-table-column prop="userid" label="姓名" width="100" :formatter="formatUserName">
                                </el-table-column>
                                <el-table-column prop="userid" label="部门" width="140" :formatter="formatUserDept">
                                </el-table-column>
                                <el-table-column prop="leavedate" label="日期" width="120">
                                    <template>
                                        {{$moment(signData.leavedate).format('YYYY-MM-DD')}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="remark" label="简介">
                                </el-table-column>
                                <el-table-column label="查看" width="80">
                                    <template slot-scope="scope">
                                        <el-link type="primary" @click="setRowData(scope.row)">查看<i class="el-icon-view el-icon--right"></i> </el-link>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                        <el-col :span="20" :offset="2">
                            <el-pagination :hide-on-single-page="value" :current-page="currentPage" @current-change="handleCurrentChange" :page-size="pageSize" :total="totalNum" layout="prev, pager, next">
                            </el-pagination>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="个人表单">
                    <span slot="label"><i class="el-icon-user"></i>个人表单</span>
                    我的表单
                </el-tab-pane>
            </el-tabs>

        </el-col>
    </el-row>

    <signuser :dialogStatus="dlgShow" :infoData="signData" :curIds="curIds" @reBackdlgShow="updateDlgStatus" @changeIds="updateCurIdsData" />

</div>
</template>

<script>
import { mapGetters } from "vuex";
import PanThumb from "@/components/PanThumb";
import UserCard from "./components/UserCard";
import { getSignBaseData, ApploveForm } from "@/api/signform";
import signuser from "./components/signuser";

export default {
    name: "DashboardEditor",
    components: { PanThumb, UserCard, signuser },
    methods: {
        async getSignBase() {
            let tmpSign = await getSignBaseData({ userid: this.$store.getters.account })
            if (tmpSign.data.code == 200) {
                this.signData = [] = tmpSign.data.msg
                this.totalNum = this.signData.length
            } else {
                console.log(tmpSign.data.msg)
                this.$message.error(`数据初始化失败请刷新当前页面`)
            }
        },
        apploveSign(){

        },
        handleSelectionChange(val) {
            console.log(val)
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 == 1) {
                return 'success-row';
            }
            return '';
        },
        handleClick() {},
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
        handleCurrentChange(val) {
            this.currentPage = val; //动态改变
        },
        setRowData(row) {
            ApploveForm(row).then((rs) => {
                if (rs.data.code == 200) {
                    this.curIds = rs.data.msg;
                    this.curIds.model = row.model
                    this.curIds.modelname = row.modelname
                    this.curIds.apploveid = row.apploveid
                    this.dlgShow = true;
                } else {
                    console.log(rs.data.msg)
                    this.$message.error(`数据初始失败,请刷新重试`)
                }
            })
        },
        updateDlgStatus(val) {
            this.dlgShow = false;
        },
        updateCurIdsData(val) {
            this.curIds = val;
        }
    },
    data() {
        return {
            dlgShow: false,
            value: false,
            activeName: '',
            signData: [],
            currentPage: 1, //默认显示第一页
            pageSize: 15, //默认每页显示10条
            totalNum: 100,
            curIds: {},
        };
    },
    created() {
        this.getSignBase();
    },
    computed: {
        ...mapGetters(["name", "avatar", "roles"]),
    },

};
</script>

<style>
.grid-content {
    padding-top: 12px;
    border-radius: 4px;
    min-height: 50px;
}

.bg-purple-dark {
    background: #dfe2e4;
}

.tableform {
    margin-top: 15px;
}

.success-row {
    background: #1cff0017 !important;
}

.el-badge__content .el-badge__content--undefined .is-fixed {
    margin-top: 10px;
}

.el-badge__content.is-fixed {
    margin-top: 10px;
    right: -30px;
}
</style>
