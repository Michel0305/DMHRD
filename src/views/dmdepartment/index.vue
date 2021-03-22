<template>
  <div class="department-container">
    <el-row>
      <el-col :span="18" :offset="2">
        <el-table
          max-height="300"
          :data="departmentData"
          style="width: 100%"
          @row-click="openDetails"
          highlight-current-row
        >
          <el-table-column label="部门" prop="dept_name"> </el-table-column>
          <el-table-column label="编号" prop="deptid"> </el-table-column>
          <el-table-column label="负责人" prop="deptower"> </el-table-column>
          <el-table-column label="归属" prop="upbenchid"> </el-table-column>
          <el-table-column label="编制人数" prop="authorized">
          </el-table-column>
          <el-table-column label="实际人数" prop="usercount"> </el-table-column>
          <el-table-column align="right">
            <template slot="header">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="2">
        <el-table
          :max-height="$store.getters.locheight"
          :data="
            jobData.filter(
              (data) =>
                (!swhere || data.defpartid === swhere) &&
                (!jobname || data.job.includes(jobname))
            )
          "
          style="width: 100%"
        >
          <el-table-column label="职位" prop="job"> </el-table-column>
          <el-table-column label="编制人数" prop="usercount"> </el-table-column>

          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="jobname"
                size="mini"
                placeholder="输入创建"
                clearable
                @keyup.enter.native="reSave"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <departmentedit
      :dialogStatus="dlgShow"
      :infoRow="rowData"
      @reBackRow="updateDlgStatus"
    />
  </div>
</template>

<script>
import { dempartsjobs } from "@/api/user";
import departmentedit from "@/views/dmdepartment/components/departmentedit";
export default {
  name: "department",
  components: { departmentedit }, //引入需要的模板
  data() {
    return {
      swhere: "",
      jobname: "",
      dlgShow: false,
      test: true,
      rowData: {},
      contentStyleObj: {
        height: "",
        width: "100%",
      },
      departmentData: [],
      jobData: [],
    };
  },
  computed: {
    // ...mapGetters(["roles"]),
  },
  created() {
    dempartsjobs().then((rs) => {
      this.departmentData = rs.data.departments;
      this.swhere = this.departmentData[0].deptid;
      this.jobData = rs.data.jobs;
    });
  },
  methods: {
    updateDlgStatus() {
      this.dlgShow = false;
    },
    openDetails(row) {
      //单行点击获取row
      this.jobname = "";
      this.swhere = row.deptid;
    },
    handleEdit(index, row) {
      this.rowData = row;
      this.rowData.edit = true;
      this.dlgShow = true;
      // console.log(this.dlgShow)
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    reSave() {
      let tmpData = this.jobData.filter(
        (data) => data.defpartid === this.swhere && data.job === this.jobname
      );
      console.log(tmpData.length);
    },
  },
  destroyed() {},
};
</script>

<style scoped>
.el-row {
  background: rgb(251, 251, 251);
  padding: 20px;
}
</style>
