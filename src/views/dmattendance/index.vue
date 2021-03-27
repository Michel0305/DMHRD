<template>
  <div class="app-container-reissue">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-row class="headtool">
            <el-col :span="6" :offset="1">
              <el-date-picker
                v-model="downloaddate"
                type="date"
                placeholder="选择日期"
                class="input-with-select"
                size="mini"
              ></el-date-picker>
              <el-button
                class="btndownload"
                type="warning"
                icon="el-icon-download"
                size="mini"
                :loading="true"
              ></el-button>
            </el-col>
            <el-col :span="11" :offset="6">
              <el-date-picker
                v-model="swhere.datewhere"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                size="mini"
              >
              </el-date-picker>
              <el-select
                v-model="swhere.dept"
                placeholder="部门"
                clearable
                size="mini"
              >
                <el-option
                  v-for="item in deptOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-button
                size="mini"
                icon="el-icon-search"
                @click="getworkrecordsdata"
              ></el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                :data="recordsData"
                style="width: 100%"
                :max-height="$store.getters.locheight"
              >
                <!-- tableData.filter(
                    (data) =>
                      !search ||
                      data.name.toLowerCase().includes(search.toLowerCase())
                  ) -->
                <el-table-column label="日期" prop="recordsData.checkdate">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      $moment(scope.row.checkdate).format("YYYY-MM-DD")
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名" prop="recordsData.userid">
                </el-table-column>
                <el-table-column label="部门" prop="recordsData.partid">
                </el-table-column>
                <el-table-column label="班次" prop="bc"> </el-table-column>
                <el-table-column label="刷卡1" prop="recordsData.timesone">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      $moment(scope.row.timesone).format("HH:mm")
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="刷卡2" prop="timestwo">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      $moment(scope.row.timestwo).format("HH:mm")
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="刷卡3" prop="timesthree">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      $moment(scope.row.timesthree).format("HH:mm")
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="刷卡4" prop="timefour">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      scope.row.timefour
                        ? ""
                        : $moment(scope.row.timefour).format("HH:mm")
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="刷卡5" prop="timefive">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      $moment(scope.row.timefive).format("HH:mm")
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="刷卡6" prop="timesix">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      $moment(scope.row.timesix).format("HH:mm")
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="刷卡7" prop="timeseven">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      $moment(scope.row.timeseven).format("HH:mm")
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="刷卡8" prop="timeseight">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                      $moment(scope.row.timeseight).format("HH:mm")
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="状态"> </el-table-column>
                <el-table-column align="right" width="80">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)"
                      type="primary"
                      >补卡</el-button
                    >
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
        shortcuts: [
          {
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
      value: "",
      value1: "",
      deptOptions: [
        { id: 0, label: "ddd" },
        { id: 1, label: "ccc" },
      ],
      ipOptions: [
        { id: "10.83.34.11", label: "10.83.34.11" },
        { id: "10.83.34.12", label: "10.83.34.12" },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
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
  background: #f1f3f7;
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
.el-select > .el-input {
  width: 130px;
}
</style>
