<template>
<div>
    <el-row :gutter="10">
        <el-col :span="22" :offset="1">
            <el-table :data="userData" :style="{width:'100%','height':$store.getters.locheight - 55+'px' }">
                <el-table-column fixed  prop="modelname" label="表单名称" width="150">                    
                </el-table-column>
                <el-table-column  prop="userid" label="姓名" width="120" :formatter="formatUserName">                   
                </el-table-column>
                <el-table-column  prop="userid" label="部门" :formatter="formatUserDept">
                </el-table-column>
                <el-table-column prop="leavedate" label="日期">
                    <template slot-scope="scope">
                        {{$moment(scope.row.leavedate).format('YYYY-MM-DD')}}
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注">                   
                </el-table-column>
                <el-table-column prop="formstatus" label="表单状态" width="120">                   
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</div>
</template>

<script>
import {UserBoxData} from "@/api/signform"
export default {
    name: 'userforms',
    data() {
        return {
            userData: []
        }
    },
    created(){        
    },
    mounted() {
        UserBoxData({userid:this.$store.getters.account}).then((rs)=>{
            if(rs.data.code == 200){
                this.userData =[] = rs.data.msg;
            }else{
                console.log(rs.data.msg);
                this.$message.error(`个人申请数据错误,请刷新`);
                return}
        })
    },
    methods:{
        formatUserName(row, colum) {
            let tmpUser = this.$store.state.departmentjob.personals.filter((el) => {
                return parseInt(el.user_id) === parseInt(row.userid);
            });
            return tmpUser.length == 0 ? row.userid : tmpUser[0].user_name;
        },
        formatUserDept(row, colum) {
            let tmpUser = this.$store.state.departmentjob.personals.filter((el) => {
                return parseInt(el.user_id) === parseInt(row.userid);
            });
            return tmpUser.length == 0 ? "未知" : tmpUser[0].dept;
        },
    }
}
</script>
