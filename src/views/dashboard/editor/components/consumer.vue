<template>
  <div class="dashboard-consumer-container">
    <el-col :span="8" class="usermsg">
      <div>
        <pan-thumb :image="avatar" style="float: left">
          Your roles:
          <span class="pan-info-roles">小子加油</span>
        </pan-thumb>
      </div>
    </el-col>
    <el-col :span="16" class="formmsg">
      <div>
        <el-tabs type="border-card">
          <el-tab-pane label="最新公告">最新公告</el-tab-pane>
          <el-tab-pane label="电子表单">电子表单</el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </div>
</template>

<script>
import PanThumb from "@/components/PanThumb";
import { mapGetters } from "vuex";
export default {
  name: "consumer",
  components: { PanThumb },
  data() {
    return {
      // lineChartData: lineChartData.newVisitis
    };
  },
  created() {
    console.log(this.$store.getters.locheight);
  },
  methods: {
    // handleSetLineChartData(type) {
    //   this.lineChartData = lineChartData[type]
    // }
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"]),
  },
};
</script>