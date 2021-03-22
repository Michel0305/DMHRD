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
                v-model="infoRow.timesname"
                clearable
                size="mini"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="类别">
              <el-select
                v-model="infoRow.timestype"
                placeholder="请选择"
                size="mini"
              >
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
            v-model="infoRow.timesfirst"
            :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '21:30',
            }"
            size="mini"
          >
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="infoRow.timessecond"
            :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '21:30',
              minTime: infoRow.timesfirst,
            }"
            size="mini"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="时间点2">
          <el-time-select
            placeholder="起始时间"
            v-model="infoRow.timesthird"
            :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '21:30',
              minTime: infoRow.timestype !== 0 ? '00:00' : infoRow.timessecond,
            }"
            size="mini"
          >
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="infoRow.timesfourth"
            :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '21:30',
              minTime: infoRow.timesthird,
            }"
            size="mini"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="时间点3">
          <el-time-select
            placeholder="起始时间"
            v-model="infoRow.timesfifth"
            :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '21:30',
              minTime: infoRow.timestype !== 0 ? '00:00' : infoRow.timessecond,
            }"
            size="mini"
          >
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="infoRow.thimessixth"
            :picker-options="{
              start: '07:30',
              step: '00:5',
              end: '21:30',
              minTime: infoRow.thimessixth,
            }"
            size="mini"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="infoRow.ischeck">是否启用</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-col :offset="10" :span="10">
            <el-button type="primary" @click="dialogForm" size="mini"
              >保存</el-button
            >
            <el-button @click="dialogForm" size="mini">取消</el-button>
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
    };
  },
  props: ["dialogStatus", "infoRow"],
  created() {
    console.log(this.infoRow);
  },
  mounted: function () {},
  methods: {
    dialogForm() {
      console.log(this.infoRow);
      // let tmpUser = this.infodepart;
      this.$emit("commitFormData");
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
