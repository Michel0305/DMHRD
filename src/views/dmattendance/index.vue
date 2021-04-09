<template>
<div class="app-container-reissue">
    <el-row :gutter="20">
        <el-col :span="24">
            <div class="grid-content bg-purple-dark">
                <el-row class="headtool">
                    <el-col :span="6" :offset="1">
                        <el-date-picker v-model="downloaddate" type="date" placeholder="选择日期" class="input-with-select" size="mini"></el-date-picker>
                        <el-button class="btndownload" type="warning" icon="el-icon-download" size="mini" :loading="true"></el-button>
                    </el-col>
                    <el-col :span="11" :offset="6">
                        <el-date-picker v-model="swhere.datewhere" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" size="mini">
                        </el-date-picker>
                        <el-select v-model="swhere.dept" placeholder="部门" clearable size="mini" @change="test">
                            <el-option v-for="item in $store.getters.departmentjob_departs" :key="item.deptid" :label="item.dept_name" :value="item.deptid">
                            </el-option>
                        </el-select>
                        <el-button size="mini" icon="el-icon-search" @click="getworkrecordsdata"></el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="
                  recordsData.filter(
                    (data) => !swhere.dept || data.partid == swhere.dept
                  )
                " style="width: 100%" :max-height="$store.getters.locheight">
                            <!-- tableData.filter(
                    (data) =>
                      !search ||
                      data.name.toLowerCase().includes(search.toLowerCase())
                  ) -->
                            <el-table-column label="日期" prop="checkdate" width="110">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{
                      $moment(scope.row.checkdate).format("YYYY-MM-DD")
                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="姓名" prop="userid" :formatter="formatUsername" width="80">
                            </el-table-column>
                            <el-table-column label="部门" prop="partid" :formatter="formatUserDept" width="120">
                            </el-table-column>
                            <el-table-column label="班次" prop="bc" width="110" :formatter="formatTimes">
                            </el-table-column>
                            <el-table-column label="刷卡1" prop="timesone" width="70">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{
                      scope.row.timesone
                        ? $moment(scope.row.timesone).utc().format("HH:mm")
                        : ""
                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="刷卡2" prop="timestwo" width="70">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{
                      scope.row.timestwo
                        ? $moment(scope.row.timestwo).utc().format("HH:mm")
                        : ""
                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="刷卡3" prop="timesthree" width="70">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{
                      scope.row.timesthree
                        ? $moment(scope.row.timesthree).utc().format("HH:mm")
                        : ""
                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="刷卡4" prop="timefour" width="70">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{
                      scope.row.timefour
                        ? $moment(scope.row.timefour).utc().format("HH:mm")
                        : ""
                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="刷卡5" prop="timefive" width="70">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{
                      scope.row.timefive
                        ? $moment(scope.row.timefive).utc().format("HH:mm")
                        : ""
                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="刷卡6" prop="timesix" width="70">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{
                      scope.row.timesix
                        ? $moment(scope.row.timesix).utc().format("HH:mm")
                        : ""
                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="刷卡7" prop="timeseven" width="70">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{
                      scope.row.timeseven
                        ? $moment(scope.row.timeseven).utc().format("HH:mm")
                        : ""
                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="刷卡8" prop="timeseight" width="70">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{
                      scope.row.timeseight
                        ? $moment(scope.row.timeseight).utc().format("HH:mm")
                        : ""
                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="状态" :formatter="formatStatus">
                            </el-table-column>
                            <el-table-column align="right" width="70">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">补卡</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import { getworkrecords } from "@/api/attendance";
export default {
    name: "abnormal",
    data() {
        return {
            loading: false,
            swhere: { datewhere: "", dept: "" },
            downloaddate: "",
            pickerOptions: {
                shortcuts: [{
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            },
            statusOptions: [
                { id: 0, label: "缺早上上班卡" },
                { id: 1, label: "早上上班迟到" },
                { id: 2, label: " 缺早上下班卡" },
                { id: 3, label: "缺下午上班卡" },
                { id: 4, label: "下午上班迟到" },
                { id: 5, label: "缺下午下班卡" },
                { id: 6, label: "缺晚上上班卡" },
                { id: 7, label: "晚上上班迟到" },
                { id: 8, label: "缺晚上上班卡" },
                { id: 9, label: "缺晚班上班卡" },
                { id: 10, label: "晚班上班迟到" },
            ],
            ipOptions: [
                { id: "10.83.34.11", label: "10.83.34.11" },
                { id: "10.83.34.12", label: "10.83.34.12" },
            ],            
            recordsData: [],
            search: "",
        };
    },
    created() {
        this.loading = true;
        getworkrecords(this.swhere).then((rs) => {
            this.recordsData = rs.data;
            this.loading = false;
            console.log(this.recordsData);
        });
        console.log(this.$store);
    },
    methods: {
        getworkrecordsdata() {
            getworkrecords(this.swhere).then((rs) => {
                this.recordsData = rs.data;
            });
        },
        formatUsername(row, colum) {
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
        formatStatus(row, colum) {
            let status = [
                "早上班缺",
                "早下班缺",
                "下上班缺",
                "下下班缺",
                "晚上班缺",
                "晚下班缺",
                "晚班上班缺",
                "早迟到",
                "下迟到",
                "晚迟到",
            ];
            let tmp = [];
            tmp.push(row.styo ? row.styo : "");
            tmp.push(row.styt ? row.styt : "");
            tmp.push(row.styth ? row.styth : "");
            tmp.push(row.styf ? row.styf : "");
            tmp.push(row.styfi ? row.styfi : "");
            tmp.push(row.stys ? row.stys : "");
            let msg = "";
            for (let i = 0; i < tmp.length; i++) {
                const el = tmp[i];
                if (el) {
                    msg += `${status[el - 1]}/`;
                }
            }
            return msg;
        },
        formatTimes(row, colum) {
            let tmpTimes = this.$store.getters.departmentjob_times.filter((el) => {
                return parseInt(el.id) === parseInt(row.bc);
            });
            return tmpTimes.length == 0 ? "未知" : tmpTimes[0].timesname;
        },
        test() {
            console.log(this.swhere.dept);
        },
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

.btndownload {
    margin-left: 20px;
}

.el-table {
    margin-top: 10px;
}

/* .el-select .el-input {
  width: 130px;
} */
/* .input-with-select .el-input-group__prepend {
  background-color: #fff;
} */
.el-date-editor.el-input {
    width: 130px;
}

.el-select>.el-input {
    width: 130px;
}
</style>
