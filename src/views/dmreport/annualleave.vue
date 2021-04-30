<template>
<div>
    <el-row :gutter="10">
        <el-col :xs={span:24} :lg={span:12,offset:6}>
            <el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column prop="xm" label="姓名" sortable width="150">
                </el-table-column>
                <el-table-column prop="bm" label="部门" sortable>
                </el-table-column>
                <el-table-column prop="yx" label="余休(小时)" width="160">
                    <template slot-scope="scope">  
                        <div v-if ="isedit && tmpid == scope.row.id">
                            <el-input-number v-model="scope.row.yx" size="mini"></el-input-number>
                        </div>
                        <div v-else>
                            {{scope.row.yx}}                            
                        </div>   
                    </template>
                </el-table-column>
                <el-table-column prop="nx" label="总年休(小时)" width="160">
                    <template slot-scope="scope">  
                        <div v-if ="isedit && tmpid == scope.row.id">
                            <el-input-number v-model="scope.row.nx" size="mini"></el-input-number>
                        </div>
                        <div v-else>
                            {{scope.row.yx}}                            
                        </div>   
                    </template>
                </el-table-column>
                <el-table-column prop="ynx" label="已休年休(小时)" width="160">
                    <template slot-scope="scope">  
                        <div v-if ="isedit && tmpid == scope.row.id">
                            <el-input-number v-model="scope.row.ynx" size="mini"></el-input-number>
                        </div>
                        <div v-else>
                            {{scope.row.yx}}                            
                        </div>   
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="50">
                    <template slot-scope="scope">
                        <el-button size="mini" :type="isedit && tmpid == scope.row.id ?'success':'primary'" :icon="isedit && tmpid == scope.row.id?'el-icon-check':'el-icon-edit'" circle plain @click="handleEdit(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default ({
    name: 'annualleave',
    data() {
        return {
            tmpid: 0,
            isedit: false,
            tableData: [{
                id: 1,
                xm: '张三',
                bm: 'IT',
                yx: '40',
                nx:'40',
                ynx:'20.5'
            }, {
                id: 2,
                xm: '张四',
                bm: '包材',
                yx: '40',
                nx:'40',
                ynx:'10.5'
            }, {
                id: 3,
                xm: '张五',
                bm: 'IT',
                yx: '20',
                nx:'0',
                ynx:'0.5'
            }, {
                id: 4,
                xm: '王三',
                bm: 'IT',
                yx: '40',
                nx:'10',
                ynx:'30.5'
            }]
        }
    },
    methods: {
        handleEdit(index, row) {
            if (this.tmpid == row.id) {
                this.isedit = false;
                this.tmpid = 0;
                this.$message.info(`保存编辑`)
                
            } else {
                this.isedit = true
                this.tmpid = row.id
                this.$message.warning(`进入编辑状态`)
            }
        }
    }
})
</script>
