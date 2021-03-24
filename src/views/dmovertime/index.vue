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
                @click="NewUserwork"
                :disabled="isEdit"
                >创建</el-button
              >
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button
                icon="el-icon-edit-outline"
                size="mini"
                @click="EditUserwork"
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
                @click="submitwork"
                >保存</el-button
              >
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button
                type="info"
                icon="el-icon-close"
                size="mini"
                @click="cancelUserwork"
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
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
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
                    end: '24:00',
                    minTime: tmpworkData.starttime,
                  }"
                  size="mini"
                  :disabled="!isEdit"
                >
                </el-time-select>
              </el-form-item>
            </el-col>

            <el-col :span="16">
              <el-form-item label="加班说明">
                <el-input
                  type="textarea"
                  v-model="tmpworkData.workremark"
                  :disabled="!isEdit"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row> </el-row>
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
            width="180"
            :formatter="formatUserDept"
          >
          </el-table-column>
          <el-table-column
            prop="leavetype"
            label="类别"
            width="70"
            :formatter="formatworkType"
          >
          </el-table-column>

          <el-table-column
            prop="workdate"
            label="加班日期"
            width="120"
            :formatter="formatworkDate"
          >
          </el-table-column>

          <el-table-column prop="starttime" label="开始时间" width="80">
          </el-table-column>
          <el-table-column prop="endtime" label="结束时间" width="80">
          </el-table-column>
          <el-table-column label="长度(小时)" width="100" prop="timecount">
          </el-table-column>
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
import { workbase } from "@/api/overwork";
export default {
  name: "overtime",
  data() {
    return {
      checked: false,
      tmpworkData: {
        userid: [],
        worktype: "",
        workremark: "",
        starttime: "",
        endtime: "",
        workdate: "",
        timecount: "",
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
    NewUserwork() {
      this.isEdit = true;
      // this.$refs["leaveData"].resetFields();
      this.tmpworkData = {
        userid: "",
        worktype: "",
        workremark: "",
        starttime: "",
        endtime: "",
        workdate: "",
        applovestatus: "",
      };
    },
    EditUserwork() {
      if (this.tmpworkData.userid == "" || this.tmpworkData.applovestatus > 0)
        return;
      this.isEdit = true;
    },
    cancelUserwork() {
      this.isEdit = false;
      this.tmpworkData = {
        userid: "",
        worktype: "",
        workremark: "",
        starttime: "",
        endtime: "",
        workdate: "",
        applovestatus: "",
      };
    },
    submitwork() {
      console.log(this.tmpworkData.userid);
      this.isEdit = false;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    setRowData(row, column) {
      if (this.isEdit) return;
      this.tmpworkData.userid = [row.userid];
      this.tmpworkData.worktype = row.worktype;
      this.tmpworkData.workremark = row.workremark;
      this.tmpworkData.starttime = row.starttime;
      this.tmpworkData.endtime = row.endtime;
      this.tmpworkData.workdate = row.workdate;
      this.tmpworkData.applovestatus = row.applovestatus;
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
    },
    formatworkStatus(row, colum) {
      let tmpUser = this.workStatus.filter((el) => {
        return parseInt(el.statusid) === parseInt(row.applovestatus);
      });
      return tmpUser.length == 0 ? "未知" : tmpUser[0].msg;
    },
    formatworkDate(row, col) {
      return this.$moment(row.workdate).format("YYYY-MM-DD");
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
  background: #dbdddf;
}
</style>
