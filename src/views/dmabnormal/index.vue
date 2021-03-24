<template>
  <div class="app-container-reissue">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-row>
            <el-col :span="1" :offset="1">
              <el-button
                type="warning"
                icon="el-icon-refresh"
                circle
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
    return {};
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
