<template>
<div>
    <el-row :gutter="10">
        <el-col :span="22" :offset="1">
            <el-table :data="userData" :style="{width:'100%','height':$store.getters.locheight - 55+'px' }">
                 <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-timeline>
                                <el-timeline-item
                                v-for="(activity, index) in signBoxData.filter((el)=>{ return parseInt(el.formid) == parseInt(props.row.id) 
                                    && (el.modelname.replace(/(^\s*)|(\s*$)/g,'')) == (props.row.model.replace(/(^\s*)|(\s*$)/g,'')) })"
                                :key="index"
                                :timestamp="$moment(activity.createtime).utc().format('YYYY-MM-DD HH:mm:ss')">
                                {{  $store.getters.applovestatus.filter((el)=>{ return el.model.replace(/(^\s*)|(\s*$)/g,'') == props.row.model.replace(/(^\s*)|(\s*$)/g,'')
                                  && parseInt(el.statusid) == parseInt(activity.apploveid)})[0].msg }}
                                <br/>
                                <br/>
                                {{`意见:  ${activity.appremart}`}}
                                </el-timeline-item>
                            </el-timeline>
                        </template>
                </el-table-column>                
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
            userData: [],
            signBoxData:[],            
        }
    },
    created(){   
          
    },
    mounted() {
        UserBoxData({userid:this.$store.getters.account}).then((rs)=>{
            if(rs.data.code == 200){
                this.userData =[] = rs.data.msg.usersData;
                this.signBoxData = [] = rs.data.msg.signBox;
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
