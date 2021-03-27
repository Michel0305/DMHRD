<template>
  <div class="app-container-reissue">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-row>
            <el-col :span="8" :offset="1">
              <el-select v-model="value" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in ipOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                >
                </el-option>
              </el-select>

              <el-button
                class="btndownload"
                type="warning"
                icon="el-icon-download"
                size="mini"
              ></el-button>

              <!-- <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="NewUserwork"
                :disabled="isEdit"
                >创建</el-button
              > -->
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "abnormal",
  data() {
    return {
      value: "",
      ipOptions: [
        { id: "10.83.34.11", label: "10.83.34.11" },
        { id: "10.83.34.12", label: "10.83.34.12" },
      ],
    };
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
.btndownload {
  margin-left: 20px;
}
</style>
