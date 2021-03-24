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
          ref="workData"
          :model="tmpworkData"
          :rules="rules"
          label-width="80px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请人">
                <el-select
                  multiple
                  :collapse-tags="!checked"
                  v-model="tmpworkData.userid"
                  placeholder="加班人"
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
                <el-checkbox size="mini" v-model="checked"></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="12"
              ><el-form-item label="加班类别">
                <el-select
                  v-model="tmpworkData.worktype"
                  placeholder="请选择类别"
                  size="mini"
                  :disabled="!isEdit"
                >
                  <el-option
                    v-for="item in worksTypes"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  >
                  </el-option>
                </el-select> </el-form-item
            ></el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="加班日期">
                <el-date-picker
                  v-model="tmpworkData.workdate"
                  type="date"
                  placeholder="选择日期"
                  :disabled="!isEdit"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="时间">
                <el-time-select
                  placeholder="起始时间"
                  v-model="tmpworkData.starttime"
                  :picker-options="{
                    start: '07:30',
                    step: '00:05',
                    end: '21:30',
                  }"
                  size="mini"
                  :disabled="!isEdit"
                >
                </el-time-select>
                <el-time-select
                  placeholder="结束时间"
                  v-model="tmpworkData.endtime"
                  :picker-options="{
                    start: '07:30',
                    step: '00:05',
                    end: '00:00',
                    minTime: tmpworkData.starttime,
                  }"
                  size="mini"
                  :disabled="!isEdit"
                >
                </el-time-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="加班说明">
            <el-input
              type="textarea"
              v-model="tmpworkData.remark"
              :disabled="!isEdit"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="22" :offset="1">
        <el-table
          :data="workData"
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
            :formatter="formatworkType"
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
            :formatter="formatworkStatus"
          >
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import { workbase } from "@/api/overwork";
export default {
  name: "overtime",
  data() {
    return {
      checked: false,
      tmpworkData: {
        userid: "",
        worktype: "",
        remark: "",
        starttime: "",
        endtime: "",
        workdata: "",
        applovestatus: "",
      },
      isEdit: false,
      fileList: [],

      workData: [],
      workLog: [],
      workStatus: [],
      worksTypes: [
        { id: 0, label: "平时" },
        { id: 1, label: "周末" },
        { id: 2, label: "节假日" },
      ],
      rules: {
        userid: [{ required: true, message: "请输入申请人", trigger: "blur" }],
        worktype: [
          { required: true, message: "请选择请假类别", trigger: "blur" },
        ],
        workdata: [
          { required: true, message: "请选择请假日期", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    console.log(this.$store.state.departmentjob);
    workbase().then((baseData) => {
      console.log(baseData);
      this.workData = baseData.data.workBase;
      this.workLog = baseData.data.workLog;
      this.workStatus = baseData.data.workStatus;
      //   this.leaveTypes = baseData.data.leaveType;
    });
  },
  mounted: function () {},
  methods: {
    NewUserleave() {
      this.isEdit = true;
      // this.$refs["leaveData"].resetFields();
      this.tmpworkData = {
        userid: "",
        worktype: "",
        remark: "",
        starttime: "",
        endtime: "",
        workdata: "",
        applovestatus: "",
      };
    },
    EditUserleave() {
      if (this.tmpworkData.userid == "" || this.tmpworkData.applovestatus > 0)
        return;
      this.isEdit = true;
    },
    cancelUserleave() {
      this.isEdit = false;
      this.tmpworkData = {
        userid: "",
        worktype: "",
        remark: "",
        starttime: "",
        endtime: "",
        workdata: "",
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
      //   this.tmpleaveData.userid = parseInt(row.userid);
      //   this.tmpleaveData.leavetype = row.leavetype;
      //   this.tmpleaveData.remark = row.remark;
      //   this.tmpleaveData.freedate = [row.starttime, row.endtime];
      //   this.tmpleaveData.applovestatus = row.applovestatus;
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
    formatworkType(row, colum) {
      switch (row.worktype) {
        case 1:
          return "周末";
          break;
        case 2:
          return "节假日";
          break;
        default:
          return "平时";
          break;
      }
      //   let tmpUser = this.worksType.filter((el) => {
      //     return parseInt(el.id) === parseInt(row.leavetype);
      //   });
      //   return tmpUser.length == 0 ? "未知" : tmpUser[0].leavename;
    },
    formatworkStatus(row, colum) {
      let tmpUser = this.workStatus.filter((el) => {
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
