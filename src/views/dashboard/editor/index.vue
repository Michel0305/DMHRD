<template>
  <div class="dashboard-editor-container">
    <!-- <el-col :span="6">
      <user-card :user="user" />
    </el-col> -->
    <!-- <div class="clearfix">
      <pan-thumb :image="avatar" style="float: left">
        Your roles:
        <span v-for="item in roles" :key="item" class="pan-info-roles">{{
          item
        }}</span>
      </pan-thumb>

      <div class="info-container">
        <span class="display_name">{{ name }}</span>
        <span style="font-size: 20px; padding-top: 20px; display: inline-block"
          >Editor's Dashboard</span
        >
      </div>
    </div> -->
    <!-- <div>
      <img :src="emptyGif" class="emptyGif" />
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PanThumb from "@/components/PanThumb";
// import GithubCorner from "@/components/GithubCorner";
import UserCard from "./components/UserCard";
export default {
  name: "DashboardEditor",
  components: { PanThumb, UserCard },
  data() {
    return {
      user: {
        type: Object,
        default: () => {
          return {
            name: "",
            email: "",
            avatar: "",
            role: "",
          };
        },
      },
      emptyGif:
        "https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3",
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"]),
  },
};
</script>

<style lang="scss" scoped>
</style>
