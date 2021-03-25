<template>
  <div class="app-container-edituser">
    <el-dialog
      :title="infoRow.isEdit ? infoRow.dept_name : '创建'"
      :visible.sync="dialogStatus"
      :before-close="dialogForm"
    >
      <el-form ref="form" :model="infoRow" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门名称">
              <el-input
                v-model="infoRow.dept_name"
                placeholder="请输入"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门编号">
              <el-input
                v-model="infoRow.deptid"
                placeholder="请输入"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="负责人">
              <el-select
                v-model="infoRow.deptower"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="el in $store.state.departmentjob.personals"
                  :key="el.user_id"
                  :label="`${el.user_id} / ${el.user_name}`"
                  :value="el.user_id"
                  :disabled="el.user_id == infoRow.deptower"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级部门">
              <el-select
                v-model="infoRow.upbenchid"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="el in $store.state.departmentjob.departs"
                  :key="el.deptid"
                  :label="`${el.deptid}-${el.dept_name}`"
                  :value="el.deptid"
                  :disabled="el.deptid == infoRow.upbenchid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="编制人数">
              <el-input-number
                size="mini"
                v-model="infoRow.authorized"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogForm">保存</el-button>
        <el-button @click="dialogForm">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'

export default {
  name: "departmentedit",
  data() {
    return {
      isEdit: false,
      infousers: {},
    };
  },
  props: ["dialogStatus", "infoRow"],
  created() {
    console.log(this.$store.state.departmentjob);
  },
  mounted: function () {},
  methods: {
    dialogForm() {
      this.$emit("reBackRow");
    },
  },
};
</script>

<style scoped>
.el-dialog__body {
  padding: 10px 10px;
}

.el-image {
  width: 180px;
  height: 210px;
}
</style>
