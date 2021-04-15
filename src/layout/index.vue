<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <!-- <right-panel v-if="showSettings"> -->
      <!-- <settings /> -->
      <!-- </right-panel> -->
    </div>
  </div>
</template>

<script>
import RightPanel from "@/components/RightPanel";
import { AppMain, Navbar, Settings, Sidebar, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { mapState } from "vuex";
import { basedata } from "@/api/user";

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
  },
  mixins: [ResizeMixin],
  data() {
    return {
      contentStyleObj: {
        height: "",
        width: "100%",
      },
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    this.getBaseData();    
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      showSettings: (state) => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader,
      departmentjob_personals: (state) => state.departmentjob.personals,
      departmentjob_departs: (state) => state.departmentjob.departs,
      departmentjob_jobs: (state) => state.departmentjob.jobs,
      departmentjob_times: (state) => state.departmentjob.times,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    getHeight() {
      //此处代码需要优化 全局使用
      this.$store.dispatch("settings/changHeight", window.innerHeight - 150);
    },

    async getBaseData(){
      let baseData = await basedata()  
      //窗体创建时候 加载基本数据源
      if(baseData.data.code == 200){
        let tmpUserData = ([] = baseData.data.msg.resUsers);
        let tmpTimes = ([] = baseData.data.msg.resTimes);
        let tmpJobs = ([] = baseData.data.msg.resJobs);
        let tmpDept = ([] = baseData.data.msg.resDepartments);
        let tmpStatus = [] = baseData.data.msg.resStatus;
        this.$store.dispatch("departmentjob/defPersonal", tmpUserData);
        this.$store.dispatch("departmentjob/defDepart", tmpDept);
        this.$store.dispatch("departmentjob/defeJob", tmpJobs);
        this.$store.dispatch("departmentjob/defTimes", tmpTimes);
        this.$store.dispatch("departmentjob/defstatus", tmpStatus);
      }else{
        console.log(rs.data.msg)
        this.$message.error(`数据初始化失败,请刷新后重试`)
      }  
    }

  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  mounted(){
    this.$message({
          type: 'success',
          message: `欢迎您回来 ${this.$store.getters.name}`,
          center: true,
          duration:3000
        });
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
