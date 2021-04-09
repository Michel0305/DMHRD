<template>
<div class="leave-container">
    <ul class="leave">
        <li class="leaveli"><span><label>姓名:</label><a class="leave_a">{{$store.getters.departmentjob_personals.filter((el)=>{ return parseInt(el.user_id)== parseInt(defData[0].userid)})[0].user_name}}</a> </span></li>
        <li class="leaveli"><span><label>部门:</label><a class="leave_a">{{$store.getters.departmentjob_personals.filter((el)=>{ return parseInt(el.user_id)== parseInt(defData[0].userid)})[0].dept}}</a> </span> </li>
        <li class="leaveli"><span><label>加班类型:</label><a class="leave_a">{{worksTypes.filter((el)=>{return el.id ==defData[0].worktype})[0].label }}</a> </span> </li>
        <li class="leaveli"><span><label>加班日期:</label><a class="leave_a">{{$moment(defData[0].workdate).utc().format('YYYY-MM-DD') }}</a></span></li>
        <li class="leaveli"><span><label>时间:</label><a class="leave_a">{{`${defData[0].starttime}  -  ${defData[0].endtime}` }}</a> </span></li>
        <li class="leaveli"><span><label>总时长:</label><a class="leave_a">{{`${defData[0].timecount} 小时`}}</a></span></li>
        <li class="leaveli"><span><label>加班原因:</label><a class="leave_a">{{defData[0].workremark}}</a></span></li>
    </ul> 
</div>
</template>
<script>
export default ({
    name: 'signoverwork',
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
