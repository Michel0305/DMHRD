const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  departmentjob_personals: state => state.departmentjob.personals,
  departmentjob_departs: state => state.departmentjob.departs,
  departmentjob_jobs: state => state.departmentjob.jobs,
  departmentjob_times: state => state.departmentjob.times,
  locheight: state => state.settings.winHeight,
}
export default getters
