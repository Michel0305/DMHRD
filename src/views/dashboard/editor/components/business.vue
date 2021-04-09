<template>
<div class="leave-container">
    <ul class="leave">
        <li class="leaveli"><span><label>姓名:</label><a class="leave_a">{{$store.getters.departmentjob_personals.filter((el)=>{ return parseInt(el.user_id)== parseInt(defData[0].userid)})[0].user_name}}</a> </span></li>
        <li class="leaveli"><span><label>部门:</label><a class="leave_a">{{$store.getters.departmentjob_personals.filter((el)=>{ return parseInt(el.user_id)== parseInt(defData[0].userid)})[0].dept}}</a> </span> </li>
        <li class="leaveli"><span><label>出差日期:</label><a class="leave_a">{{$moment(defData[0].checkdate).utc().format('YYYY-MM-DD')}}</a> </span> </li>
        <li class="leaveli"><span><label>出差地点:</label><a class="leave_a">{{outaddress}}</a></span></li>
        <li class="leaveli"><span><label>交通方式:</label><a class="leave_a">{{`${defData[0].carplate}`}}</a> </span></li>        
        <li class="leaveli"><span><label>加班原因:</label><a class="leave_a">{{defData[0].workremark}}</a></span></li>
    </ul> 
</div>
</template>
<script>
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data';
export default ({
    name: 'signbusiness',
    data() {
        return {
            signmsg: '',
            worksTypes: [
                { id: 0, label: "平时" },
                { id: 1, label: "周末" },
                { id: 2, label: "节假日" },
            ]
        }
    },
    props: ["defData"],
    computed:{
        outaddress:function(){
            let tmp = this.defData[0].toaddressids.split(',');
            let tmpaddress =null
            tmp.forEach((el) => {
                    tmpaddress =tmpaddress == null?CodeToText[el]:tmpaddress + '-' + CodeToText[el]
            })
            return tmpaddress+'-'+ this.defData[0].dscaddress
        }
    }
})
</script>

<style scoped>
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
