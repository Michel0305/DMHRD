<template>
<div class="purview-container">
    <el-row :gutter="10">
        <el-col :span="20" :offset="2">
            <el-table ref="userData" :data="$store.getters.departmentjob_personals" height="250" border highlight-current-row style="width: 100%"  @cell-click="setRow">
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
                <el-table-column label="操作" width="90" prop="id">                    
                    <template slot-scope="scope">
                        <el-button                        
                        size="mini"
                        :type="rowId == scope.row.id ?'success':'primary'" 
                        :icon="rowId == scope.row.id ?'el-icon-check':'el-icon-edit'" 
                        circle                        
                        @click="handleEdit(scope.$index, scope.row)"></el-button>                                                
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="4" :offset="2">
            <el-table ref="multipleTableRoles" :data="roleData" border tooltip-effect="dark" style="width: 100%" @selection-change="SelectionChangeRoles" :max-height="$store.getters.locheight-200">
                <el-table-column type="selection" width="40">
                </el-table-column>             
                <el-table-column prop="name" label="角色名称" >
                    <template slot="header">
                        <el-input v-model="roles" size="mini" placeholder="输入关键字搜索" />
                    </template>
                </el-table-column>                
            </el-table>
        </el-col>
        <el-col :span="4" :offset="1">
            <el-table ref="multipleTableModels" :data="modelDate" border tooltip-effect="dark" style="width: 100%" @selection-change="SelectionChangeModels" :max-height="$store.getters.locheight-200">
                <el-table-column type="selection" width="40">
                </el-table-column>             
                <el-table-column prop="name" label="模块设定" >
                    <template slot="header">
                        <el-input v-model="models" size="mini" placeholder="输入关键字搜索" />
                    </template>
                </el-table-column>                
            </el-table>
        </el-col>
        <el-col :span="3" :offset="1">
            <el-table ref="multipleTableRights" :data="actionData" border tooltip-effect="dark" style="width: 100%" @selection-change="SelectionChangeRights" :max-height="$store.getters.locheight-200">
                <el-table-column type="selection" width="40">
                </el-table-column>             
                <el-table-column prop="name" label="权限设定" >                    
                </el-table-column>                
            </el-table>
        </el-col>
        <el-col :span="6" :offset="1">
            <el-table ref="multipleTableDepart" :data="this.$store.getters.departmentjob_departs" border tooltip-effect="dark" style="width: 100%" @selection-change="SelectionChangeDepart" :max-height="$store.getters.locheight-200">
                <el-table-column type="selection" width="40">
                </el-table-column>             
                <el-table-column prop="dept_name" label="管控部门" >                    
                </el-table-column>                
            </el-table>
        </el-col>
    </el-row>
</div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {
    name: "purview",
    data() {
        return {            
            swhere: '',
            roleUser:'',
            currentRow: null,
            models:'',
            roles:'',
            rights:'',
            rowId:-1,
            changeModels:[],
            changeRoles:[],
            changeRights:[],
            ChangeDepart:[],
            roleData: [{
                id:'1', name: '超级管理员',
                }, {
                id:'2', name: '管理员',
                }, {
                id:'3', name: ' 人资',
                }, {
                id:'4', name: '文员',
                }, {
                id:'5', name: '仓库',
                }, {
                id:'6', name: '采购',
                }, {
                id:'7', name: '销售',
                }],
            actionData:[{
                id:'1', name: 'Open'
                }, {
                id:'2', name: 'Create'
                }, {
                id:'3', name: 'Update'
                }, {
                id:'4', name: 'Delete'
                }, {
                id:'5', name: 'Print'
                }, {
                id:'6', name: 'Approve'
                }, {
                id:'7', name: 'Reject'
                }],
            modelDate:[{
                id:'1', name: '请假单',router:''
                }, {
                id:'2', name: '加班单',router:''
                }, {
                id:'3', name: '调休单',router:''
                }, {
                id:'4', name: '补卡单',router:''
                }, {
                id:'5', name: '出差单',router:''
                }, {
                id:'6', name: '出勤报表',router:''
                }, {
                id:'7', name: '考勤异常',router:''
                }, {
                id:'8', name: '加班报表',router:''
                }, {
                id:'9', name: '休假报表',router:''
                }, {
                id:'10', name: '人员管理',router:''
                }, {
                id:'11', name: '组织架构',router:''
                }, {
                id:'12', name: '部门管理',router:''
                }, {
                id:'13', name: '考勤班次',router:''
                }, {
                id:'14', name: '权限设定',router:''
                }, {
                id:'15', name: '表单维护',router:''
                }, {
                id:'16', name: '流程设定',router:''
                }]

        }
    },
    created() {        
        // console.log(this.$store.getters)
    },
    mounted(){
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
    methods:{
        SelectionChangeRoles(val){
            this.changeRoles =val
        },
        SelectionChangeModels(val){
            this.changeModels =val
        },
        SelectionChangeRights(val){
            this.changeRights =val
        },
        SelectionChangeDepart(val){
            this.ChangeDepart =val
        },
        setRow(row, column){//待处理
            
        },
        handleEdit(index, row){  
            if(this.rowId>-1 && this.rowId !== row.id) return;
            if(this.rowId==-1){
                this.roleUser = row.user_id
                this.rowId = row.id
            }else{ //保存
              this.rowId = -1
                console.log(this.changeRoles)
                console.log(this.changeModels)
                console.log(this.changeRights)
                console.log(this.ChangeDepart)            
            }
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
