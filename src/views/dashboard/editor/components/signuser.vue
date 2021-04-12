<template>
<div class="app-container-leave">
    <el-dialog :title="curIds.modelname" :visible.sync="dialogStatus" :before-close="dialogForm">
        <div class="head">
            <el-row :gutter="10">
                <el-col :span="1" :offset="1">
                    <el-button type="primary" icon="el-icon-circle-check" size="mini" @click="apploveSign(0)" :disabled="lockApplove">核准</el-button>
                </el-col>
                <el-col :span="3" :offset="3">
                    <el-button type="warning" icon="el-icon-refresh-left" size="mini" @click="apploveSign(1)" :disabled="lockApplove">批退</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="body" style="display: flex; padding: 10px 0px;">
            <div>
                <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="changeData(0)" :disabled="lockBtn || lockzero"></el-button>
            </div>
            <div class="formmsg">
                <component :is="curIds.model == 'leave'?'signleave':curIds.model == 'work'?'signoverwork':curIds.model == 'switchdays'?'switchday':curIds.model=='business'?'signbusiness':'signleave'" :defData="curIds.SignData" />
                <el-col :span="23" :offset="1">
                    <el-input type="textarea" rows="3" v-model="signmsg" placeholder="意见"></el-input>
                </el-col>
            </div>
            <div class="flowmsg">
                <el-timeline>
                    <el-timeline-item v-for="(activity, index) in curIds.ApploveLog" :key="index" :timestamp="$moment(activity.createtime).utc().format('YYYY-MM-DD HH:mm:ss') ">
                        {{activity.statusMsg}} <br/>
                        {{activity.appremart}}
                    </el-timeline-item>
                </el-timeline>
            </div>
            <div>
                <el-button type="primary" size="mini" @click="changeData(1)" :disabled="lockBtn || lockzero"><i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </div>

        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    ApploveForm,
    ApploveOnly
} from '@/api/signform';

import signleave from "./leave";
import signoverwork from "./overwork";
import switchday from "./switchday";
import signbusiness from "./business";
export default ({
    name: 'signuser',
    components: {
        signleave,
        signoverwork,
        switchday,
        signbusiness
    },
    data() {
        return {
            signmsg: '',
            lockBtn:false,
            lockApplove:false,
            lockzero:false,  //三个设定安全锁,防止死命提交
            currentRole: 'signleave',             
        }
    },
    props: ["dialogStatus", "infoData", "curIds"],
    methods: {
        dialogForm() {
            this.$emit("reBackdlgShow", {
                isCreate: false
            });
        },
        changeData(types) {
            this.lockBtn = true;
            let tmpList = this.infoData.filter((el) => {
                return el.reApplove == false
            })     
            tmpList.length == 1? this.lockzero =true : this.lockzero =false
            let indexId = tmpList.findIndex((el) => {
                return parseInt(el.id) == parseInt(this.curIds.SignData[0].id) && el.model == this.curIds.model
            })            
            let listData
            if (types == 0) {
                listData = indexId == 0 ? tmpList[tmpList.length - 1] : tmpList[indexId - 1]
            } else {
                listData = indexId == tmpList.length - 1 ? tmpList[0] : tmpList[indexId + 1]
            }
            this.getDBdata(listData)
        },
        async getDBdata(info) {
            let datas = await ApploveForm(info)
            if (datas.data.code == 200) {
                let tmpcurids = {}
                tmpcurids.SignData = datas.data.msg.SignData
                tmpcurids.model = info.model;
                tmpcurids.modelname = info.modelname;
                tmpcurids.apploveid = info.apploveid;
                tmpcurids.ApploveLog = datas.data.msg.apploveLog
                this.$emit('changeIds', tmpcurids) 
                this.lockApplove = false;  
                this.lockBtn = false;            
            } else {
                console.log(datas.data.msg)
                this.$message.error(`获取数据异常,刷新下页面`);
            }   
            return;         
        },
        apploveSign(types) {
            this.lockApplove = true;
            let indoData = {}
            indoData.apploveUser = this.$store.getters.account
            indoData.apploveid = this.curIds.apploveid
            indoData.id = this.curIds.SignData[0].id
            indoData.model = this.curIds.model
            indoData.apploveType = types
            ApploveOnly(indoData).then((rs) => {
                if(rs.data.code==200){
                    let indexID = this.infoData.findIndex((el) => {
                                    return parseInt(el.id) == parseInt(this.curIds.SignData[0].id) && el.model == this.curIds.model})
                    this.infoData[indexID].reApplove = true;
                    this.$message.success(`审核完成`)
                    if (this.infoData.filter((el) => {
                            return el.reApplove == false
                        }).length == 0) return this.dialogForm()
                    this.changeData(1);
                }else{
                    console.log(rs.data.msg)
                    this.$message.error(`审核出现错误,请刷新后再试`)
                }           
            })
        }
    },
    mounted() {
        console.log(this.curIds)
    }
})
</script>

<style>
.el-dialog__body {
    padding: 10px 20px;
}

.head {
    background: #dfe2e4;
    padding: 10px;
}

.formmsg {
    width: 50%;
}

.flowmsg {
    padding: 20px 0px 0px;
    width: 40%
}

.ul {
    list-style: none;
}
</style>
