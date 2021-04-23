<template>
<div class="app-container-reissue">
    <el-row :gutter="20">
        <el-col :span="24">
            <div class="grid-content bg-purple-dark">
                <el-row>
                    <el-col :span="1" :offset="1">
                        <el-button icon="el-icon-edit-outline" size="mini" @click="editDays" :disabled="isEdit">修改</el-button>
                    </el-col>
                    <el-col :span="1" :offset="1">
                        <el-button type="success" icon="el-icon-check" size="mini" :disabled="!isEdit" @click="submitDays">保存</el-button>
                    </el-col>
                    <el-col :span="1" :offset="1">
                        <el-button type="info" icon="el-icon-close" size="mini" @click="cancelDays" :disabled="!isEdit">取消</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="12" :offset="6">
            <el-form ref="days" :model="qkform" label-width="80px">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="职员">
                            <el-select v-model="qkform.attendids.userid" filterable placeholder="请选择" size="mini" :disabled="true">
                                <el-option v-for="item in $store.state.departmentjob.personals.filter(el => {
                                                if($store.getters.partids.findIndex((es)=>{ return el.defpartid == es} )>=0  || parseInt(el.user_id) == parseInt($store.getters.account)){
                                                        return el
                                                    }})" :key="item.user_id" :label="item.user_name" :value="item.user_id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="12">
                        <el-form-item label="部门" prop="checkdate" size="mini">
                            <el-input v-model="qkform.attendids.userid" placeholder="" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col> -->
                </el-row>

                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="补卡日期" prop="checkdate">
                            <el-date-picker v-model="qkform.attendids.checkdate" align="right" type="date" placeholder="选择日期" size="mini" :disabled="true" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="签卡区段">
                            <el-select v-model="qkform.warringData" multiple placeholder="请选择" size="mini" :disabled="!isEdit">
                                <el-option v-for="item in statusOptions" :key="item.id" :label="item.label" :value="item.id" >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注" size="mini">
                    <el-input type="textarea" v-model="qkform.remark" :disabled="!isEdit" size="mini"></el-input>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="22" :offset="1">
            <el-table :data="qkBase" border style="width: 100%" @cell-click="setRowData" :max-height="$store.getters.locheight - 260">
                <el-table-column prop="checkdate" label="日期" width="100">
                    <template slot-scope="scope">
                        {{$moment(scope.row.checkdate).format('YYYY-MM-DD')}}
                    </template>
                </el-table-column>
                <el-table-column prop="userid" label="姓名" width="90" :formatter="formatUserName">
                </el-table-column>
                <el-table-column prop="userid" label="部门" width="120" :formatter="formatUserDept">
                </el-table-column>
                <el-table-column prop="attendids.timesone" label="时间1" width="60">
                    <template slot-scope="scope">
                        {{scope.row.attendids.timesone?$moment(scope.row.attendids.timesone).utc().format('HH:mm'):''}}
                    </template>
                </el-table-column>
                <el-table-column prop="attendids.timestwo" label="时间2" width="60">
                    <template slot-scope="scope">
                        {{scope.row.attendids.timestwo?$moment(scope.row.attendids.timestwo).utc().format('HH:mm'):''}}
                    </template>
                </el-table-column>
                <el-table-column prop="attendids.timesthree" label="时间3" width="60">
                    <template slot-scope="scope">
                        {{scope.row.attendids.timesthree?$moment(scope.row.attendids.timesthree).utc().format('HH:mm'):''}}
                    </template>
                </el-table-column>
                <el-table-column prop="attendids.timefour" label="时间4" width="60">
                    <template slot-scope="scope">
                        {{scope.row.attendids.timefour?$moment(scope.row.attendids.timefour).utc().format('HH:mm'):''}}
                    </template>
                </el-table-column>
                <el-table-column prop="attendids.timefive" label="时间5" width="60">
                    <template slot-scope="scope">
                        {{scope.row.attendids.timefive?$moment(scope.row.attendids.timefive).utc().format('HH:mm'):''}}
                    </template>
                </el-table-column>
                <el-table-column prop="attendids.timesix" label="时间6" width="60">
                    <template slot-scope="scope">
                        {{scope.row.attendids.timesix?$moment(scope.row.attendids.timesix).utc().format('HH:mm'):''}}
                    </template>
                </el-table-column>
                <el-table-column prop="attendids.timeseven" label="时间7" width="60">
                    <template slot-scope="scope">
                        {{scope.row.attendids.timeseven?$moment(scope.row.attendids.timeseven).utc().format('HH:mm'):''}}
                    </template>
                </el-table-column>
                <el-table-column prop="attendids.timeseight" label="时间8" width="60">
                    <template slot-scope="scope">
                        {{scope.row.attendids.timeseight?$moment(scope.row.attendids.timeseight).utc().format('HH:mm'):''}}
                    </template>
                </el-table-column>
                <el-table-column label="异常" :formatter="formatStatus">
                </el-table-column>
                <el-table-column label="状态" prop="appstatus" width="110" sortable :sort-by="['appstatus']">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.appstatus == 20 || scope.row.appstatus == 15 ?'success':scope.row.appstatus === -10 ?'danger':scope.row.appstatus === 0 ?'info':''"  disable-transitions effect="dark" size="mini">
                            {{formmatApploveStatus(scope.row)}}
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</div>
</template>

<script>
import { getRegistrationCard,updateRegistrationCard } from "@/api/attendance"
export default {
    name: "abnormal",
    data() {
        return {
            isEdit: false,
            qkform: {
                id:0,
                attendids: {},
                warringData: [],
            },
            qkBase: [],
            statusOptions: [
                { id: "1", label: "缺早上上班卡" },
                { id: "2", label: "缺早上下班卡" },
                { id: "3", label: "缺下午上班卡" },
                { id: "4", label: "缺下午下班卡" },
                { id: "5", label: "缺晚上上班卡" },
                { id: "6", label: "缺晚上上班卡" },
                { id: "7", label: "缺晚班上班卡" },
            ],             
        };
    },
    methods: {
        editDays() {
            if(this.qkform.id == 0 || this.qkform.appstatus > 0 ) return;
            this.isEdit = true;
        },
        handleChange() {

        },
        cancelDays() {
            this.isEdit = false;
        },
        setRowData(row) {
            if (this.isEdit == true) return;
            this.qkform = row
            this.qkform.warringData =[]= row.ids? row.ids.split(','):[]
            
        },
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
        formatStatus(row, colum) {
            let status = [
                "早上上班卡未打",
                "早上下班卡未打",
                "下午上班卡未打",
                "下午下班卡未打",
                "晚上上班卡未打",
                "晚上下班卡未打",
                "晚班上班卡未打",
                "早上迟到",
                "下午迟到",
                "晚上迟到",
            ];
            let tmp = [];
            tmp.push(row.attendids.styo ? row.attendids.styo : "");
            tmp.push(row.attendids.styt ? row.attendids.styt : "");
            tmp.push(row.attendids.styth ? row.attendids.styth : "");
            tmp.push(row.attendids.styf ? row.attendids.styf : "");
            tmp.push(row.attendids.styfi ? row.attendids.styfi : "");
            tmp.push(row.attendids.stys ? row.attendids.stys : "");
            let msg = "";
            for (let i = 0; i < tmp.length; i++) {
                const el = tmp[i];
                if (el) {
                    msg += `${status[el - 1]}/`;
                }
            }
            return msg;
        },  
        submitDays(){
          if(this.qkform.warringData.length == 0) return this.$message.error(`签卡时间段不能为空`)
          updateRegistrationCard(this.qkform).then((rs)=>{
            if(rs.data.code == 200){
              this.$message.success(`签卡单提交成功`)
            }else{
              console.log(rs.data.msg)
              this.$message.error(`签卡单提交失败,请刷新重试`)
            }
            this.isEdit = false;
          })
        },
        formmatApploveStatus(row){
          let tmpmsg = this.$store.getters.applovestatus.filter((el) => { return el.model.replace(/(^\s*)|(\s*$)/g,'') == 'regcard' && parseInt(row.appstatus) == parseInt(el.statusid) }) 
          if(tmpmsg.length>0) return tmpmsg[0].msg 
          return '未知'    
        }
           
    },
    created() {
        getRegistrationCard().then((rs) => {
            if (rs.data.code == 200) {               
                let fliterUser = this.$store.getters.departmentjob_personals.filter((el) => { if (this.$store.getters.partids.findIndex((es) => { return el.defpartid == es }) >= 0) { return el.user_id } })
                this.qkBase = [] = rs.data.msg.filter((el) => { if (fliterUser.findIndex((evl) => { return parseInt(evl.user_id) == parseInt(el.userid) }) >= 0 || el.userid == this.$store.getters.account || el.createuser == this.$store.getters.account) return el })
            }
        })
    }
};
</script>

<style scoped>
.grid-content {
    padding-top: 12px;
    border-radius: 4px;
    min-height: 50px;
}

.bg-purple-dark {
    background: #dfe2e4;
}

.btndownload {
    margin-left: 20px;
}

.el-form {
    background: radial-gradient(#e6e1e1, transparent);
    padding: 20px;
}

.grid-content {
    padding-top: 12px;
    border-radius: 4px;
    min-height: 50px;
}

.bg-purple-dark {
    background: #dfe2e4;
}

.el-form-item {
    margin-bottom: 17px;
}

.upload {
    margin-left: 30px;
}
</style>
