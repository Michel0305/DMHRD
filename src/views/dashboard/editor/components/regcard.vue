<template>
    <div class="leave-container">
    <ul class="leave">
        <li class="leaveli"><span><label>姓名:</label><a class="leave_a">{{$store.getters.departmentjob_personals.filter((el)=>{ return parseInt(el.user_id)== parseInt(defData[0].userid)})[0].user_name}}</a> </span></li>
        <li class="leaveli"><span><label>部门:</label><a class="leave_a">{{$store.getters.departmentjob_personals.filter((el)=>{ return parseInt(el.user_id)== parseInt(defData[0].userid)})[0].dept}}</a> </span> </li>
        <li class="leaveli"><span><label>签卡日期:</label><a class="leave_a">{{$moment(defData[0].checkdate).utc().format('YYYY-MM-DD') }}</a></span></li>
        
        <li class="leaveli">
            <span><label>签卡区段:</label><a class="leave_a"><el-select v-model="regList" multiple placeholder="请选择" size="mini" :disabled="true" >
                                <el-option v-for="item in statusOptions" :key="item.id" :label="item.label" :value="item.id" >
                                </el-option>
                            </el-select></a></span>
            
            </li>
        <li class="leaveli"><span><label>备注信息:</label><a class="leave_a">{{defData[0].remark}}</a></span></li>
    </ul>    
</div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default ({
    name: 'regcard',
    data(){
        return{
            regList:[],
            statusOptions: [
                { id: "1", label: "缺早上上班卡" },
                { id: "2", label: "缺早上下班卡" },
                { id: "3", label: "缺下午上班卡" },
                { id: "4", label: "缺下午下班卡" },
                { id: "5", label: "缺晚上上班卡" },
                { id: "6", label: "缺晚上上班卡" },
                { id: "7", label: "缺晚班上班卡" },
            ], 
        }
    },
    props: ["defData"],
    mounted(){
        this.regList = [] = this.defData[0].ids.split(',')
    }
})
</script>
<style>
.el-dialog__headerbtn {
    top: 5px;
    right: 10px;
}

.leave {
    list-style: none;
}

.leaveli {
    padding: 5px;
    line-height: 20px;
}

.leaveli>a {
    margin-left: 20px;
}

.leave_a {
    margin-left: 30px;
        font-family: serif;
    /* font-weight: bold; */
    /* font-size: 10px; */
}
</style>
