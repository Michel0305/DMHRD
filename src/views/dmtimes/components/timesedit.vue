<template>
  <div class="app-container-edituser">
    <el-dialog
      :title="infoRow.isEdit ? infoRow.timesname : '创建'"
      :visible.sync="dialogStatus"
      :before-close="dialogForm"
    >
      <el-form ref="form" :model="infoRow" label-width="80px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="名称">
              <el-input
                placeholder="请输入内容"
                v-model="createForm.timesname"
                clearable
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类别">
              <el-select v-model="createForm.timestype" placeholder="请选择">
                <el-option
                  v-for="item in timeTypes"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="时间点1">
          <el-time-select
            placeholder="起始时间"
            v-model="createForm.timesfirst"
            :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '21:30',
            }"
          >
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="createForm.timessecond"
            :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '21:30',
              minTime: createForm.timesfirst,
            }"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="时间点2">
          <el-time-select
            placeholder="起始时间"
            v-model="createForm.timesthird"
            :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '21:30',
              minTime:
                createForm.timestype !== 0 ? '00:00' : createForm.timessecond,
            }"
          >
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="createForm.timesfourth"
            :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '21:30',
              minTime: createForm.timesthird,
            }"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="时间点3">
          <el-time-select
            placeholder="起始时间"
            v-model="createForm.timesfifth"
            :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '21:30',
              minTime:
                createForm.timestype !== 0 ? '00:00' : createForm.timessecond,
            }"
          >
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="createForm.thimessixth"
            :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '21:30',
              minTime: createForm.thimessixth,
            }"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="infoRow.ischeck">是否启用</el-checkbox>
        </el-form-item>
        <!-- <el-form-item label="时间点2"></el-form-item>
          <el-form-item label="时间点3"></el-form-item>
          <el-form-item label="时间点4"></el-form-item>
          <el-form-item label="时间点5"></el-form-item>
          <el-form-item label="时间点6"></el-form-item> -->
        <el-form-item>
          <el-col :span="24" :offset="16">
            <el-button type="primary" @click="dialogForm">保存</el-button>
            <el-button @click="dialogForm">取消</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'

export default {
  name: "timesedit",
  data() {
    return {
      isEdit: false,
      infousers: {},
      timeTypes: [
        { id: 0, label: "白班" },
        { id: 1, label: "夜班" },
      ],
      createForm: {
        isEdit: true,
        ischeck: true,
        thimessixth: "",
        timesfifth: "",
        timesfirst: "",
        timesfourth: "",
        timesname: "",
        timessecond: "",
        timesthird: "",
        timestype: 0,
      },
    };
  },
  props: ["dialogStatus", "infoRow"],
  created() {
    console.log(this.infoRow);
  },
  mounted: function () {},
  methods: {
    dialogForm() {
      console.log(this.createForm);
      // let tmpUser = this.infodepart;
      this.$emit("commitFormData");
    },
    // checkDeptName(val) {
    //     let deptName = this.deptList.find((item) => {
    //         return item.id === val
    //     })
    //     this.infousers.dept = deptName.label;
    // }
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
