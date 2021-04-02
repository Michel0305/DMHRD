<template>
<div class="department-container">
    <el-row>
        <el-col :span="18" :offset="2">
            <el-table max-height="300" :data="departmentData.filter((el)=>el.isDel == false )" style="width: 100%" @row-click="openDetails" highlight-current-row>
                <el-table-column label="编码" prop="id" width="50"> </el-table-column>
                <el-table-column label="部门" prop="dept_name"> </el-table-column>
                <el-table-column label="编号" prop="deptid"> </el-table-column>
                <el-table-column label="负责人" prop="deptower" width="80" :formatter="formatUser"> </el-table-column>
                <el-table-column label="归属" prop="upbenchid" width="80"> </el-table-column>
                <el-table-column label="编制人数" prop="authorized" width="80">
                </el-table-column>
                <el-table-column label="实际人数" prop="usercount" width="80"> </el-table-column>
                <el-table-column align="right">
                    <template slot="header">
                        <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="createNewDepart"></el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="18" :offset="2">
            <el-table :max-height="$store.getters.locheight - 320" :data="
            jobData.filter(
              (data) =>
                (!swhere || data.defpartid === swhere) &&
                (!jobname || data.job.includes(jobname))
            )
          " style="width: 100%">
                <el-table-column label="职位" prop="job"> </el-table-column>
                <el-table-column label="编制人数" prop="usercount"> </el-table-column>
                <el-table-column align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input v-model="jobname" size="mini" placeholder="输入创建" clearable @keyup.enter.native="reSave(scope)" />
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <departmentedit :dialogStatus="dlgShow" :infoRow="rowData" @reBackRow="updateDlgStatus" />
</div>
</template>

<script>
import { dempartsjobs, removedeparts,createJob } from "@/api/user";
import departmentedit from "@/views/dmdepartment/components/departmentedit";
export default {
    name: "department",
    components: { departmentedit }, //引入需要的模板
    data() {
        return {
            swhere: "",
            jobname: "",
            dlgShow: false,
            test: true,
            rowData: {},
            departmentData: [],
            jobData: [],
        };
    },
    computed: {
        // ...mapGetters(["roles"]),
    },
    created() {
        // console.log(this.$store.getters)
        dempartsjobs().then((rs) => {
            this.departmentData = rs.data.departments;
            this.swhere = this.departmentData[0].deptid;
            this.jobData = rs.data.jobs;
        });
    },
    methods: {
        updateDlgStatus(val) {
            this.replaceDefData(val);
            this.dlgShow = false;
        },
        openDetails(row) {
            //单行点击获取row
            this.jobname = "";
            this.swhere = row.deptid;
        },
        handleEdit(index, row) {
            this.rowData = row;
            this.rowData.edit = true;
            this.dlgShow = true;
        },
        createNewDepart() {
            this.rowData = {
                id: 0,
                authorized: 0,
                dept_name: "",
                deptid: null,
                deptower: null,
                edit: false,
                upbenchid: null,
                usercount: 0,
            };
            this.dlgShow = true;
        },

        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                removedeparts({ id: row.id }).then((rs) => {
                    if (rs.data.code == 200) {
                        row.isDel = true;
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败,刷新重试!'
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        reSave(val) {            
            let tmpData = this.jobData.filter(
                (data) => data.defpartid === this.swhere && data.job === this.jobname
            );
            if (tmpData.length == 0) {
                this.$prompt('职位名称', '提示', {
                    inputValue:this.jobname,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    createJob({defpartid:this.swhere,job:value}).then((rs)=>{
                      if(rs.data.code == 200){
                        this.replaceJobData({job:value,usercount:0,defpartid:this.swhere})
                        this.$message({
                        type: 'success',
                        message: `职位 ${value} 添加成功`
                        });
                      }else{
                        this.$message({
                        type: 'error',
                        message: `职位 ${value} 添加失败`
                        });
                      }
                      
                    })                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }
        },
        formatUser(row, colum) {
            let tmpUser = this.$store.getters.departmentjob_personals.filter((item) => { return item.user_id == row.deptower })
            return tmpUser.length == 0 ? "未知" : tmpUser[0].user_name;
        },
        replaceDefData(val) {
            if (val.isCreate) {
                let tmpIndex = this.departmentData.findIndex((el) => el.id == val.id)
                this.departmentData.splice(
                    tmpIndex < 0 ? 0 : tmpIndex,
                    tmpIndex < 0 ? 0 : 1,
                    val.backdata
                );
            }
        },
        replaceJobData(val){
          console.log(val)
          this.jobData.splice(0,0,val);
        }
    },

};
</script>

<style scoped>
.el-row {
    background: rgb(251, 251, 251);
    padding: 20px;
}
</style>
