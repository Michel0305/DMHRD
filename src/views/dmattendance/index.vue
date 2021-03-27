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
              <el-select v-model="swhere.dept" placeholder="部门" size="mini">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-button
                icon="el-icon-search"
                @click="getworkrecordsdata"
              ></el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table
                :data="
                  tableData.filter(
                    (data) =>
                      !search ||
                      data.name.toLowerCase().includes(search.toLowerCase())
                  )
                "
                style="width: 100%"
              >
                <el-table-column label="日期" prop="date"> </el-table-column>
                <el-table-column label="姓名" prop="name"> </el-table-column>
                <el-table-column label="刷卡1" prop="date"> </el-table-column>
                <el-table-column label="刷卡2" prop="name"> </el-table-column>
                <el-table-column label="刷卡3" prop="date"> </el-table-column>
                <el-table-column label="刷卡4" prop="name"> </el-table-column>
                <el-table-column label="刷卡5" prop="date"> </el-table-column>
                <el-table-column label="刷卡6" prop="name"> </el-table-column>
                <el-table-column label="刷卡7" prop="date"> </el-table-column>
                <el-table-column label="刷卡8" prop="name"> </el-table-column>
                <el-table-column label="状态" prop="name"> </el-table-column>
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
      search: "",
    };
  },
  created() {
    getworkrecords(this.swhere).then((rs) => {
      console.log(rs);
    });
    console.log(this.$store);
  },
  methods: {
    getworkrecordsdata() {
      console.log(this.swhere);
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
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-date-editor.el-input {
  width: 130px;
}
.el-select > .el-input {
  width: 130px;
}
</style>
