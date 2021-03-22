<template>
  <div class="times-container">
    <div class="grid-content bg-purple-dark">
      <el-row class="bartools">
        <el-col :span="1" :offset="1">
          <el-button type="primary" icon="el-icon-edit" size="mini"
            >创建</el-button
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table :data="timesType" style="width: 100%">
            <!-- .filter( (data) =>  !search ||  data.name.toLowerCase().includes(search.toLowerCase())) -->
            <el-table-column label="班次" prop="timesname" width="80">
            </el-table-column>
            <el-table-column
              label="类别"
              prop="timestype"
              :formatter="timesTypeFormat"
              width="80"
            >
            </el-table-column>

            <el-table-column
              prop="timesfirst"
              label="考勤时间1"
              :formatter="dateFormat"
              width="120"
            >
            </el-table-column>

            <el-table-column
              label="考勤时间2"
              prop="timessecond"
              :formatter="dateFormat"
              width="120"
            >
            </el-table-column>
            <el-table-column
              label="考勤时间3"
              prop="timesthird"
              :formatter="dateFormat"
              width="120"
            >
            </el-table-column>
            <el-table-column
              label="考勤时间4"
              prop="timesfourth"
              :formatter="dateFormat"
              width="120"
            >
            </el-table-column>
            <el-table-column
              label="考勤时间5"
              prop="timesfifth"
              :formatter="dateFormat"
              width="120"
            >
            </el-table-column>
            <el-table-column
              label="考勤时间6"
              prop="thimessixth"
              :formatter="dateFormat"
              width="120"
              size="mini"
            >
            </el-table-column>
            <el-table-column label="启用">
              <template slot-scope="scope">
                <el-switch v-model="scope.ischeck" disabled> </el-switch>
              </template>
            </el-table-column>
            <el-table-column align="right" width="280">
              <template slot="header">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"
                />
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >Edit</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >Delete</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <timesedit
      :dialogStatus="dlgShow"
      :infoRow="rowData"
      @commitFormData="reBackRow"
    />
  </div>
</template>

<script>
import timesedit from "@/views/dmtimes/components/timesedit";

export default {
  name: "times",
  components: { timesedit },
  data() {
    return {
      dlgShow: false,
      timesType: [],
      search: "",
      rowData: {},
    };
  },
  created() {
    this.timesType = [] = this.$store.state.departmentjob.times;
    console.log(this.$store.state.departmentjob.times);
  },
  methods: {
    reBackRow() {
      this.dlgShow = false;
    },
    handleEdit(index, row) {
      this.dlgShow = true;
      this.rowData = row;
      this.rowData.isEdit = true;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    dateFormat: function (row, column) {
      let tmpRow = row;
      let tmpColumn = column;
      let dates = tmpRow[tmpColumn.property];
      if (dates === undefined || dates === null) return "";
      let tmpDate = dates.replaceAll(/([A-Z])/g, " ");
      return this.$moment(tmpDate).format("HH:mm");
    },
    timesTypeFormat: (row, column) => {
      switch (row.timestype) {
        case 1:
          return "夜班";
        case 0:
          return "白班";
        default:
          return "未知";
      }
    },
  },
};
</script>

<style scoped>
.bartools {
  padding-bottom: 10px;
}

.grid-content {
  padding-top: 12px;
  border-radius: 4px;
  min-height: 50px;
}

.bg-purple-dark {
  background: #f1f3f7;
}
</style>
