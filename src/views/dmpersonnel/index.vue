<template>
  <div class="personnel-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-row>
            <el-col :span="1" :offset="1">
              <el-button type="primary" icon="el-icon-edit" size="mini"
                >入职</el-button
              >
            </el-col>
            <el-col :span="3" :offset="1">
              <el-button type="info" icon="el-icon-download" size="mini"
                >Export</el-button
              >
            </el-col>
            <el-col :span="6" :offset="11">
              <div>
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model="swhere"
                  class="input-with-select"
                >
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
        <el-table
          :data="
            tableData.filter(
              (data) =>
                !swhere ||
                data.user_name.toLowerCase().includes(swhere.toLowerCase()) ||
                !swhere ||
                data.user_id.includes(swhere.toLowerCase())
            )
          "
          :max-height="contentStyleObj.height"
          style="width: 100%"
        >
          <el-table-column label="姓名" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.user_name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="工号" sortable width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.user_id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="性别" width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.sex }}</span>
            </template>
          </el-table-column>

          <el-table-column label="部门" width="180" sortable>
            <template slot-scope="scope">
              <span>{{ scope.row.dept }}</span>
            </template>
          </el-table-column>

          <el-table-column label="岗位" width="130">
            <template slot-scope="scope">
              <span>{{ scope.row.job }}</span>
            </template>
          </el-table-column>

          <el-table-column label="职位" width="130">
            <template slot-scope="scope">
              <span>{{ scope.row.position }}</span>
            </template>
          </el-table-column>

          <el-table-column label="户籍" sortable>
            <template slot-scope="scope">
              <span>{{ scope.row.address }}</span>
            </template>
          </el-table-column>

          <el-table-column label="出生日期">
            <template slot-scope="scope">
              <span>{{ scope.row.birthday }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" sortable prop="tag" width="80">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.isline ? 'success' : 'danger'"
                disable-transitions
                >{{ scope.row.isline ? "在职" : "离职" }}</el-tag
              >
            </template>
          </el-table-column>

          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleResign(scope.$index, scope.row)"
                >离职</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <edituser
      :infousers="rowData"
      :dialogStatus="showstatus"
      @dialogFormStatus="cdialogFormStatus"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
// import { users } from '@/api/user'
import edituser from "@/views/dmpersonnel/components/edituser";
import store from "@/store";
export default {
  name: "personnel",
  components: { edituser }, //引入需要的模板
  data() {
    return {
      swhere: "",
      rowData: {},
      showstatus: false,
      contentStyleObj: {
        height: "",
        width: "100%",
      },
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
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    this.tableData = [] = store.state.departmentjob.personals;
    // console.log(this.$store.getters)
    // this.tableData =

    // users().then(rs=>{
    //   this.tableData = rs.data
    // })
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  },
  mounted() {
    // console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
    // console.log(JSON.stringify(this.$store.state.departmentjob))
    // console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ")
  },
  methods: {
    handleEdit(index, row) {
      //显示
      this.rowData = row;
      this.showstatus = true;
    },

    cdialogFormStatus(val) {
      //接收子主件消息
      console.log(val);
      this.showstatus = false;
    },
    handleDelete(index, row) {},

    getHeight() {
      //此处代码需要优化 全局使用
      this.contentStyleObj.height = window.innerHeight - 150;
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
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
</style>
