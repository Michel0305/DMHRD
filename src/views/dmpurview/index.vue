<template>
  <div class="purview-container">
    <el-row :gutter="10">
      <el-col :span="4" :offset="18">
        <el-input v-model="swhere" size="mini" clearable placeholder="输入关键字搜索" />
      </el-col>
    </el-row>
    <el-row :gutter="2">
      <el-col :span="20" :offset="2">
        <el-table
          ref="userData"
          size="mini"
          :data="$store.getters.departmentjob_personals.filter((data)=>!swhere ||
            data.user_name.toLowerCase().includes(swhere.toLowerCase()) ) "
          height="230"
          border
          highlight-current-row
          style="width: 100%"
          @cell-click="setRow"
        >
          <el-table-column prop="user_name" label="姓名" width="180" />
          <el-table-column prop="user_id" label="编号" />
          <el-table-column prop="dept" label="部门" />
          <el-table-column prop="job" label="岗位" />
          <el-table-column label="操作" width="50" prop="id">
            <template slot-scope="scope">
              <el-button :disabled="rowroleid !== -1" size="mini" :type="rowId == scope.row.id ? 'success' : 'primary'" :icon="rowId == scope.row.id ? 'el-icon-check' : 'el-icon-edit'" circle @click="handleEdit(scope.$index, scope.row)" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="4" :offset="2">
        <el-table ref="rTableRoles" size="mini" :data="roleData" highlight-current-row border tooltip-effect="dark" style="width: 100%" :max-height="$store.getters.locheight - 200" @cell-click="reBackRole" @selection-change="SelectionChangeRoles">
          <el-table-column type="selection" width="40" :selectable="checkboxSelect" />
          <el-table-column prop="rolename" label="角色名称">
            <template slot="header">
              <el-input v-model="roles" size="mini" placeholder="输入关键字搜索" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="50" prop="id">
            <template slot-scope="scope">
              <el-button :disabled="rowId !== -1" size="mini" :type="rowroleid == scope.row.id ? 'success' : 'primary'" :icon="rowroleid == scope.row.id ? 'el-icon-check' : 'el-icon-edit'" circle @click="handleRoleEdit(scope.$index, scope.row)" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-table ref="mTableModels" size="mini" :data="modelData" border tooltip-effect="dark" style="width: 100%" :max-height="$store.getters.locheight - 200" @selection-change="SelectionChangeModels" @cell-click="setRowActive">
          <el-table-column type="selection" width="40" :selectable="checkRoleboxSelect" />
          <el-table-column prop="modelname" label="模块设定">
            <template slot="header">
              <el-input v-model="models" size="mini" placeholder="输入关键字搜索" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-table ref="riTableRights" size="mini" :data="actionData" border tooltip-effect="dark" style="width: 100%" :max-height="$store.getters.locheight - 200" @selection-change="SelectionChangeRights">
          <el-table-column type="selection" width="40" :selectable="checkRoleboxSelect" />
          <el-table-column prop="name" label="权限设定" />
        </el-table>
      </el-col>
      <el-col :span="6" :offset="1">
        <el-table ref="dTableDepart" size="mini" :data="$store.getters.departmentjob_departs" border tooltip-effect="dark" style="width: 100%" :max-height="$store.getters.locheight - 200" @selection-change="SelectionChangeDepart">
          <el-table-column type="selection" width="40" :selectable="checkRoleboxSelect" />
          <el-table-column prop="dept_name" label="管控部门" />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import {
  rightBaseData,
  rightUserToRole,
  rightRoleToModel
} from '@/api/userright'
export default {
  name: 'Purview',
  data() {
    return {
      aaaaa: '',
      swhere: '',
      roleUser: '',
      currentRow: null,
      models: '',
      roles: '',
      rights: '',
      rowId: -1,
      rowroleid: -1,
      setcellroleid: 0,
      changeModels: [],
      changeRoles: [],
      changeRights: [],
      ChangeDepart: [],
      roleData: [],
      loading: null,
      UserToRoles: [],
      RolesToModels: [],
      tmpUser: '',
      tmpModel: '',
      actionData: [{
        id: '1',
        name: 'Open'
      },
      {
        id: '2',
        name: 'Create'
      },
      {
        id: '3',
        name: 'Update'
      },
      {
        id: '4',
        name: 'Delete'
      },
      {
        id: '5',
        name: 'Print'
      },
      {
        id: '6',
        name: 'Approve'
      },
      {
        id: '7',
        name: 'Reject'
      }
      ],
      modelData: []
    }
  },
  created() {
    this.screenLoading()
    rightBaseData().then((rs) => {
      this.loading.close()
      if (rs.data.code == 200) {
        this.roleData = rs.data.basedata.Roles
        this.modelData = rs.data.basedata.Models
        this.UserToRoles = rs.data.basedata.UserToRoles
        this.RolesToModels = rs.data.basedata.RolesToModels
        this.$refs.userData.setCurrentRow(this.$store.getters.departmentjob_personals[0])
        this.$refs.rTableRoles.setCurrentRow(this.roleData[0])
        this.setcellroleid = this.roleData[0].id
        this.setRow(this.$store.getters.departmentjob_personals[0], null)
        this.reBackRole(this.roleData[0], null)
      } else {
        this.$message.error(`数据加载错误,请刷新`)
        console.log(rs.data.basedata)
      }
    })
  },
  mounted() {},
  methods: {
    SelectionChangeRoles(val) {
      this.changeRoles = val
    },
    SelectionChangeModels(val) {
      this.changeModels = val
    },
    SelectionChangeRights(val) {
      this.changeRights = val
    },
    SelectionChangeDepart(val) {
      this.ChangeDepart = val
    },

    // 用户栏位切换
    setRow(row, column) {
      if (this.tmpUser == row.user_id) return
      this.tmpUser = row.user_id
      this.$refs.rTableRoles.clearSelection()
      this.$nextTick(() => {
        this.UserToRoles.forEach((el) => {
          if (el.userid == row.user_id) {
            this.roleData.forEach(vl => {
              if (vl.id == el.roleid) {
                this.$refs.rTableRoles.toggleRowSelection(vl, true)
              }
            })
          }
        })
      })
    },

    // 角色栏位切换
    reBackRole(row, index) { // 处理对应角色模块权限
      if (this.tmpModel == row.id) return
      this.tmpModel = row.id
      this.setcellroleid = row.id
      this.$refs.mTableModels.clearSelection()
      this.$refs.riTableRights.clearSelection()
      this.$refs.dTableDepart.clearSelection()
      this.$nextTick(() => {
        this.RolesToModels.forEach((vls, key) => {
          if (row.id == vls.roleid) {
            const tmpModelData = this.modelData.find(els => { return els.id == vls.modelid })
            this.setRowActive(vls, null, true)
            this.setRowDepart(vls, null, true)
            this.$refs.mTableModels.toggleRowSelection(tmpModelData, true)
          }
        })
      })
    },

    // 模块栏位切换
    setRowActive(ids, vals, isDef = false) {
      this.$refs.riTableRights.clearSelection()
      if (isDef == true) {
        if (!ids.activeid) return
        this.$nextTick(() => {
          ids.activeid.split(',').forEach((el) => {
            this.$refs.riTableRights.toggleRowSelection(this.actionData.find((vl) => { return vl.id == el }), true)
          })
        })
      } else {
        if (ids.activeid) return
        this.$nextTick(() => {
          this.RolesToModels.forEach((vl, key) => {
            if (vl.roleid == this.setcellroleid && vl.modelid == ids.id) {
              vl.activeid.split(',').forEach((el) => {
                this.$refs.riTableRights.toggleRowSelection(this.actionData.find((vl) => { return vl.id == el }), true)
              })
            }
          })
        })
      }
    },

    // 部门模块
    setRowDepart(ids, vals, isDef = false) {
      // console.log(ids)
      this.$refs.dTableDepart.clearSelection()
      if (isDef == true) {
        if (!ids.departid) return
        this.$nextTick(() => {
          ids.departid.split(',').forEach((el) => {
            this.$refs.dTableDepart.toggleRowSelection(this.$store.getters.departmentjob_departs.find((vl) => { return vl.deptid == el }), true)
          })
        })
      } else {
        if (ids.departid) return
        this.$nextTick(() => {
          this.RolesToModels.forEach((vl, key) => {
            if (vl.roleid == this.setcellroleid && vl.modelid == ids.id) {
              vl.departid.split(',').forEach((el) => {
                this.$refs.riTableRights.toggleRowSelection(this.$store.getters.departmentjob_departs.find((vl) => { return vl.deptid == el }), true)
              })
            }
          })
        })
      }
    },

    /**
         * 编辑动作
         */

    handleRoleEdit(index, row) {
      // 角色权限管控
      if (this.rowroleid > -1 && this.rowroleid !== row.id) return
      if (this.rowroleid == -1) {
        this.rowroleid = row.id
      } else {
        // 保存
        const roleToModel = {
          roleid: '',
          model: [],
          rights: [],
          departids: ''
        };
        (roleToModel.roleid = row.id),
        this.changeModels.forEach((el) => {
          roleToModel.model.push(el.id)
        })
        this.changeRights.forEach((el) => {
          roleToModel.rights.push(el)
        })
        this.ChangeDepart.forEach((el) => {
          // 别问我为什么不用push   有本事你上！ 恼火 调试了半天后端一直返回 {} 而不是数据[]
          roleToModel.departids = roleToModel.departids + ',' + el.deptid
        })
        rightRoleToModel(roleToModel).then((rs) => {
          if (rs.data.code == 200) {
            this.$message.success(`角色权限设定成功`)
          } else {
            this.$message.error(`角色权限设定失败,请刷新重试`)
            console.log(rs.data.msg)
            return
          }
        })
        this.rowroleid = -1
      }
    },
    handleEdit(index, row) {
      // 用户对角色管控
      if (this.rowId > -1 && this.rowId !== row.id) return
      if (this.rowId == -1) {
        this.roleUser = row.user_id
        this.rowId = row.id
      } else {
        // 保存
        const infoRole = {
          userid: '',
          role: []
        }
        infoRole.userid = row.user_id
        this.changeRoles.forEach((el) => {
          infoRole.role.push(el.id)
        })
        rightUserToRole(infoRole).then((rs) => {
          if (rs.data.code == 200) {
            this.$message.success(`${row.user_name} 权限设定成功,请用户刷新`)
          } else {
            this.$message.error(`${row.user_name} 权限设定失败,请刷新重试`)
            console.log(rs.data.msg)
            return
          }
        })
        this.rowId = -1
      }
    },

    checkboxSelect(row, rowindex) {
      return this.rowId !== -1
    },
    checkRoleboxSelect(row, index) {
      return this.rowroleid !== -1
    },
    screenLoading() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
  }
}
</script>

<style scoped>
.el-table--medium th,
.el-table--medium td {
    padding: 6px 0;
}

.el-table th,
.el-table td {
    padding: 5px 0;
}
</style>
