<template>
  <div class="dashboard-consumer-container">
    <el-col :span="8" class="usermsg">
      <div>
        <span>{{ userData.user_name }}</span>
        <span>合同状态:续约中</span>
        <span>{{ userData.dept }}</span>
        <span>{{ userData.job }}</span>
        <span>{{ userData.cardid }}</span>
        <span>{{ userData.address }}</span>
        <span>{{ userData.birthday }}</span>
        <span>{{ userData.school }}</span>
        <span>{{ userData.education }}</span>
        <span>{{ userData.sex }}</span>
        <pan-thumb :image="avatar" style="float: left">
          Your roles:
          <span class="pan-info-roles">小子加油</span>
        </pan-thumb>
      </div>
    </el-col>
    <el-col :span="16" class="formmsg">
      <div>
        <el-tabs type="border-card">
          <el-tab-pane label="最新公告">
            <div v-html="test"></div>
          </el-tab-pane>
          <el-tab-pane label="电子表单">电子表单</el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </div>
</template>

<script>
import PanThumb from "@/components/PanThumb";
import { mapGetters } from "vuex";
import { userbyid } from "@/api/user";
export default {
  name: "consumer",
  components: { PanThumb },
  data() {
    return {
      userData: {
        user_name: "",
        dept: "",
        job: "",
        cardid: "",
        address: "",
        birthday: "",
        school: "",
        education: "",
        sex: "",
      },
      test: "<p>TTTTTTTTTTTTTTTTTTTT</p>",
      // lineChartData: lineChartData.newVisitis
    };
  },
  created() {
    console.log(this.$store.getters);
    userbyid(this.$store.getters.account).then((rs) => {
      this.userData = rs.data;
    });
    // console.log(this.$store.getters.locheight);
    // console.log(this.userData);
  },
  methods: {
    // handleSetLineChartData(type) {
    //   this.lineChartData = lineChartData[type]
    // }
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"]),
  },
  mounted() {
    this.userData = this.$store.getters.departmentjob_personals.filter((el) => {
      el.user_id == this.$store.getters.account;
    })[0];
    console.log(this.$store.getters.locheight);
    console.log(this.userData);
  },
};
</script>