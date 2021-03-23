<template>
  <div class="app-container-leave">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-row>
            <el-col :span="1" :offset="1">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="NewUserleave"
                :disabled="isEdit"
                >创建</el-button
              >
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button
                icon="el-icon-edit-outline"
                size="mini"
                @click="EditUserleave"
                :disabled="isEdit"
                >修改</el-button
              >
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button
                type="success"
                icon="el-icon-check"
                size="mini"
                :disabled="!isEdit"
                @click="submitLeave"
                >保存</el-button
              >
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button
                type="info"
                icon="el-icon-close"
                size="mini"
                @click="cancelUserleave"
                :disabled="!isEdit"
                >取消</el-button
              >
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" :offset="5">
        <el-form
          ref="leaveData"
          :model="tmpleaveData"
          :rules="rules"
          label-width="80px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请人">
                <el-select
                  v-model="tmpleaveData.userid"
                  placeholder="请假人"
                  size="mini"
                  :disabled="!isEdit"
                >
                  <el-option
                    v-for="item in $store.state.departmentjob.personals"
                    :key="item.user_id"
                    :label="item.user_name"
                    :value="item.user_id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12"
              ><el-form-item label="请假类别">
                <el-select
                  v-model="tmpleaveData.leavetype"
                  placeholder="请选择类别"
                  size="mini"
                  :disabled="!isEdit"
                >
                  <el-option
                    v-for="item in leaveTypes"
                    :key="item.id"
                    :label="item.leavename"
                    :value="item.id"
                  >
                  </el-option>
                </el-select> </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="请假日期">
                <el-date-picker
                  v-model="tmpleaveData.freedate"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :disabled="!isEdit"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="请假说明">
            <el-input
              type="textarea"
              v-model="tmpleaveData.remark"
              :disabled="!isEdit"
            ></el-input>
          </el-form-item>

          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="附件">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :auto-upload="false"
                  :limit="1"
                >
                  <el-button
                    slot="trigger"
                    size="mini"
                    type="primary"
                    :disabled="!isEdit"
                    >选取</el-button
                  >
                  <el-button
                    class="uploadbtn"
                    style="margin-left: 10px"
                    size="mini"
                    type="success"
                    :disabled="!isEdit"
                    @click="submitUpload"
                    >上传</el-button
                  >
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>

      <el-col :span="22" :offset="1">
        <el-table
          :data="leaveData"
          :max-height="$store.getters.locheight - 260"
          border
          @row-click="setRowData"
          style="width: 100%"
        >
          <el-table-column
            prop="userid"
            label="姓名"
            :formatter="formatUserName"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="userid"
            label="部门"
            width="150"
            :formatter="formatUserDept"
          >
          </el-table-column>
          <el-table-column
            prop="leavetype"
            label="类别"
            width="50"
            :formatter="formatLeaveType"
          >
          </el-table-column>
          <el-table-column prop="starttime" label="开始日期"> </el-table-column>
          <el-table-column prop="endtime" label="结束日期"> </el-table-column>
          <el-table-column
            label="长度"
            width="50"
            prop="timetotal"
          ></el-table-column>
          <el-table-column label="请假原因" prop="remark"></el-table-column>
          <el-table-column
            prop="applovestatus"
            label="单据状态"
            width="80"
            :formatter="formatLeaveStatus"
          >
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import { leavebase } from "@/api/leave";
export default {
  name: "dmleave",
  data() {
    return {
      tmpleaveData: {
        userid: "",
        leavetype: "",
        remark: "",
        freedate: [],
      },
      isEdit: false,
      fileList: [],

      leaveData: [],
      leaveLog: [],
      leaveStatus: [],
      leaveTypes: [],
      rules: {
        userid: [{ required: true, message: "请输入申请人", trigger: "blur" }],
        leavetype: [
          { required: true, message: "请选择请假类别", trigger: "blur" },
        ],
        freedate: [
          { required: true, message: "请选择请假日期", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    console.log(this.$store.state.departmentjob);
    leavebase().then((baseData) => {
      this.leaveData = baseData.data.leaveBase;
      this.leaveLog = baseData.data.leaveLog;
      this.leaveStatus = baseData.data.leaveStatus;
      this.leaveTypes = baseData.data.leaveType;
      console.log(baseData);
    });
  },
  mounted: function () {},
  methods: {
    NewUserleave() {
      this.isEdit = true;
      // this.$refs["leaveData"].resetFields();
      this.tmpleaveData = {
        userid: "",
        leavetype: "",
        remark: "",
        freedate: [],
        applovestatus: "",
      };
    },
    EditUserleave() {
      if (this.tmpleaveData.userid == "" || this.tmpleaveData.applovestatus > 0)
        return;
      this.isEdit = true;
    },
    cancelUserleave() {
      this.isEdit = false;
      this.tmpleaveData = {
        userid: "",
        leavetype: "",
        remark: "",
        freedate: [],
        applovestatus: "",
      };
    },
    submitLeave() {
      this.isEdit = false;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    setRowData(row, column) {
      if (this.isEdit) return;
      this.tmpleaveData.userid = parseInt(row.userid);
      this.tmpleaveData.leavetype = row.leavetype;
      this.tmpleaveData.remark = row.remark;
      this.tmpleaveData.freedate = [row.starttime, row.endtime];
      this.tmpleaveData.applovestatus = row.applovestatus;
      console.log(row);
      console.log(column);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
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
    formatLeaveType(row, colum) {
      let tmpUser = this.leaveTypes.filter((el) => {
        return parseInt(el.id) === parseInt(row.leavetype);
      });
      return tmpUser.length == 0 ? "未知" : tmpUser[0].leavename;
    },
    formatLeaveStatus(row, colum) {
      let tmpUser = this.leaveStatus.filter((el) => {
        return parseInt(el.statusid) === parseInt(row.applovestatus);
      });
      return tmpUser.length == 0 ? "未知" : tmpUser[0].msg;
    },
  },
};
</script>

<style scoped>
.el-form {
  background: radial-gradient(#e6e1e1, transparent);
  padding: 20px;
}
.uploadbtn {
  height: 28px;
  margin-left: 10px;
}
.upload-demo {
  display: flex;
}
.ul {
  padding-left: 30px;
  height: 20px;
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
