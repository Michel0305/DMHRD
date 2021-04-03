<template>
<div class="purview-container">
    <el-row :gutter="10">
        <el-col :span="20" :offset="2">
            <el-table ref="userData" :data="$store.getters.departmentjob_personals" height="250" border highlight-current-row style="width: 100%" @cell-click="setRow">
                <el-table-column prop="user_name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="user_id" label="编号">
                </el-table-column>
                <el-table-column prop="dept" label="部门">
                </el-table-column>
                <el-table-column prop="job" label="岗位">
                    <template slot="header">
                        <el-input v-model="swhere" size="mini" placeholder="输入关键字搜索" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="50" prop="id">
                    <template slot-scope="scope">
                        <el-button :disabled="rowroleid !== -1" size="mini" :type="rowId == scope.row.id ?'success':'primary'" :icon="rowId == scope.row.id ?'el-icon-check':'el-icon-edit'" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="4" :offset="2">
            <el-table ref="multipleTableRoles" :data="roleData" border tooltip-effect="dark" style="width: 100%" @selection-change="SelectionChangeRoles" :max-height="$store.getters.locheight-200">
                <el-table-column type="selection" width="40" :selectable="checkboxSelect">
                </el-table-column>
                <el-table-column prop="rolename" label="角色名称">
                    <template slot="header">
                        <el-input v-model="roles" size="mini" placeholder="输入关键字搜索" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="50" prop="id">
                    <template slot-scope="scope">
                        <el-button :disabled="rowId !==-1" size="mini" :type="rowroleid == scope.row.id ?'success':'primary'" :icon="rowroleid == scope.row.id ?'el-icon-check':'el-icon-edit'" circle @click="handleRoleEdit(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="4" :offset="1">
            <el-table ref="multipleTableModels" :data="modelData" border tooltip-effect="dark" style="width: 100%" @selection-change="SelectionChangeModels" :max-height="$store.getters.locheight-200">
                <el-table-column type="selection" width="40" :selectable="checkRoleboxSelect">
                </el-table-column>
                <el-table-column prop="modelname" label="模块设定">
                    <template slot="header">
                        <el-input v-model="models" size="mini" placeholder="输入关键字搜索" />
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="3" :offset="1">
            <el-table ref="multipleTableRights" :data="actionData" border tooltip-effect="dark" style="width: 100%" @selection-change="SelectionChangeRights" :max-height="$store.getters.locheight-200">
                <el-table-column type="selection" width="40" :selectable="checkRoleboxSelect">
                </el-table-column>
                <el-table-column prop="name" label="权限设定">
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="6" :offset="1">
            <el-table ref="multipleTableDepart" :data="this.$store.getters.departmentjob_departs" border tooltip-effect="dark" style="width: 100%" @selection-change="SelectionChangeDepart" :max-height="$store.getters.locheight-200">
                <el-table-column type="selection" width="40" :selectable="checkRoleboxSelect">
                </el-table-column>
                <el-table-column prop="dept_name" label="管控部门">
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import { rightBaseData, rightUserToRole,rightRoleToModel } from '@/api/userright'
export default {
    name: "purview",
    data() {
        return {
            swhere: '',
            roleUser: '',
            currentRow: null,
            models: '',
            roles: '',
            rights: '',
            rowId: -1,
            rowroleid: -1,
            changeModels: [],
            changeRoles: [],
            changeRights: [],
            ChangeDepart: [],
            roleData: [],
            loading: null,
            UserToRoles:[],
            RolesToModels:[],
            actionData: [{
                id: '1',
                name: 'Open'
            }, {
                id: '2',
                name: 'Create'
            }, {
                id: '3',
                name: 'Update'
            }, {
                id: '4',
                name: 'Delete'
            }, {
                id: '5',
                name: 'Print'
            }, {
                id: '6',
                name: 'Approve'
            }, {
                id: '7',
                name: 'Reject'
            }],
            modelData: []

        }
    },
    created() {
        this.screenLoading()
        rightBaseData().then((rs) => {
            console.log(rs)
            this.loading.close()
            if (rs.data.code == 200) {
                this.roleData = rs.data.basedata.Roles;
                this.modelData = rs.data.basedata.Models;
                this.UserToRoles = rs.data.basedata.UserToRoles
                this.RolesToModels = rs.data.basedata.RolesToModels
            } else {
                this.$message.error(`数据加载错误,请刷新`);
                console.log(rs.data.basedata);
            }
        })
    },
    mounted() {
        this.$refs.userData.setCurrentRow(this.$store.getters.departmentjob_personals[0]);

        this.changeRoles.forEach(row => {
            this.$refs.multipleTableRoles.toggleRowSelection(row);
        });
        this.changeModels.forEach(row => {
            this.$refs.multipleTableModels.toggleRowSelection(row);
        });
        this.changeRights.forEach(row => {
            this.$refs.multipleTableRights.toggleRowSelection(row);
        });
        this.ChangeDepart.forEach(row => {
            this.$refs.multipleTableDepart.toggleRowSelection(row);
        });
    },
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

        setRow(row, column) { //待处理
            console.log(row.user_id)
            //this.UserToRoles
        },

        handleRoleEdit(index, row) { //角色权限管控
            if (this.rowroleid > -1 && this.rowroleid !== row.id) return;
            if (this.rowroleid == -1) {
                this.rowroleid = row.id
            } else { //保存                
                let roleToModel ={roleid:'',model:[],rights:[],departids:'' }
                roleToModel.roleid = row.id,
                this.changeModels.forEach((el)=>{
                    roleToModel.model.push(el.id)
                })
                this.changeRights.forEach((el)=>{
                    roleToModel.rights.push(el)
                })                
                this.ChangeDepart.forEach((el)=>{ //别问我为什么不用push   有本事你上！ 恼火 调试了半天后端一直返回 {} 而不是数据[]
                    roleToModel.departids = roleToModel.departids+','+el.deptid
                })
                rightRoleToModel(roleToModel).then((rs)=>{
                    if(rs.data.code == 200){
                       this.$message.success(`角色权限设定成功`)
                   }else{
                       this.$message.error(`角色权限设定失败,请刷新重试`)
                       console.log(rs.data.msg)
                       return
                   }                  
                })
                this.rowroleid = -1
            }
        },
        handleEdit(index, row) { //用户对角色管控
            if (this.rowId > -1 && this.rowId !== row.id) return;
            if (this.rowId == -1) {
                this.roleUser = row.user_id
                this.rowId = row.id
            } else { //保存
                let infoRole = { userid: '', role: [] }
                infoRole.userid = row.user_id;
                this.changeRoles.forEach((el) => {
                    infoRole.role.push(el.id)
                })
                rightUserToRole(infoRole).then((rs)=>{
                   if(rs.data.code == 200){
                       this.$message.success(`${row.user_name} 权限设定成功,请用户刷新`)
                   }else{
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
            });
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
