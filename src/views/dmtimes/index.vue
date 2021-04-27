<template>
<div class="times-container">
    <div class="grid-content bg-purple-dark">
        <el-row class="bartools">
            <el-col :span="1" :offset="1">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="createTimes">创建</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="timesType" style="width: 100%" :max-height="$store.getters.locheight">
                    <!-- .filter( (data) =>  !search ||  data.name.toLowerCase().includes(search.toLowerCase())) -->
                    <el-table-column label="班次" prop="timesname" width="150" sortable :sort-by="['id']" >
                    </el-table-column>
                    <el-table-column label="类别" prop="timestype" :formatter="timesTypeFormat" width="100">
                    </el-table-column>
                    <el-table-column prop="timesfirst" label="考勤时间1">
                    </el-table-column>
                    <el-table-column label="考勤时间2" prop="timessecond">
                    </el-table-column>
                    <el-table-column label="考勤时间3" prop="timesthird">
                    </el-table-column>
                    <el-table-column label="考勤时间4" prop="timesfourth">
                    </el-table-column>
                    <el-table-column label="考勤时间5" prop="timesfifth">
                    </el-table-column>
                    <el-table-column label="考勤时间6" prop="thimessixth" width="100" size="mini">
                    </el-table-column>
                    <el-table-column label="启用" width="50" prop="ischeck">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.ischeck" active-color="#13ce66" inactive-color="#ff4949" size="mini">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column align="right" width="120">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="handleDelete(scope.$index, scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
    <timesedit :dialogStatus="dlgShow" :infoRow="rowData" @commitFormData="reBackRow" />
</div>
</template>

<script>
import timesedit from "@/views/dmtimes/components/timesedit";
import { removeWorkTime } from "@/api/user";

export default {
    name: "times",
    components: { timesedit },
    data() {
        return {
            dlgShow: false,
            timesType: [],
            search: "",
            rowData: {},
            timesData: []
        };
    },
    created() {
        this.timesType = [] = this.$store.getters.departmentjob_times;
    },
    methods: {
        reBackRow(val) {
            this.dlgShow = false;
            if(val == null) return;
            this.$store.dispatch("departmentjob/replaceTimes", val);
            
        },
        handleEdit(index, row) {
            this.dlgShow = true;
            this.rowData = row;
            this.rowData.isEdit = true;
        },
        handleDelete(index, row) {
            console.log(row)
           this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                removeWorkTime({ id: row.id }).then((rs) => {
                    if (rs.data.code == 200) { 
                        this.$store.dispatch("departmentjob/delTimes", {id:row.id});
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
        timesTypeFormat: (row, column) => {
            switch (row.timestype) {
                case 1:
                    return "夜班";
                case 0:
                    return "白班";
                default:
                    return "未知";
            }
        },
        createTimes() {
            let templateData = {
                id:0,
                isEdit: false,
                ischeck: true,
                thimessixth: "",
                timesfifth: "",
                timesfirst: "",
                timesfourth: "",
                timesname: "",
                timessecond: "",
                timesthird: "",
                timestype: 0,
                workstart:""
            };
            this.dlgShow = true;
            this.rowData = templateData;
        },
    },
};
</script>

<style scoped>
.bartools {
    padding-bottom: 10px;
}

.grid-content {
    padding-top: 12px;
    border-radius: 4px;
    min-height: 50px;
}

.bg-purple-dark {
    background: #dfe2e4;
}
</style>
