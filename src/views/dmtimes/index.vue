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
        <el-col>
          <el-table :data="timesType" style="width: 100%">
            <!-- .filter( (data) =>  !search ||  data.name.toLowerCase().includes(search.toLowerCase())) -->
            <el-table-column label="班次" prop="timesname"> </el-table-column>
            <el-table-column label="类别" prop="timestype"> </el-table-column>
            <el-table-column label="考勤时间1" prop="timesfirst">
            </el-table-column>
            <el-table-column label="考勤时间2" prop="timessecond">
            </el-table-column>
            <el-table-column label="考勤时间3" prop="timesthird">
            </el-table-column>
            <el-table-column label="考勤时间4" prop="timesfourth">
            </el-table-column>
            <el-table-column label="考勤时间5" prop="timesfifth">
            </el-table-column>
            <el-table-column label="考勤时间6" prop="thimessixth">
            </el-table-column>
            <el-table-column label="启用" prop="ischeck"> </el-table-column>
            <el-table-column align="right">
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
  </div>
</template>

<script>
export default {
  name: "times",
  //   components: { DropdownMenu },
  data() {
    return {
      timesType: [],
      search: "",
    };
  },
  created() {
    this.timesType = [] = this.$store.state.departmentjob.times;
    console.log(this.$store.state.departmentjob.times);
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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