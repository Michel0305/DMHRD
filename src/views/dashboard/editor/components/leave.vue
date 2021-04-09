<template>
<div class="leave-container">
    <ul class="leave">
        <li class="leaveli"><span><label>姓名:</label><a class="leave_a">{{$store.getters.departmentjob_personals.filter((el)=>{ return parseInt(el.user_id)== parseInt(defData[0].userid)})[0].user_name}}</a> </span></li>
        <li class="leaveli"><span><label>部门:</label><a class="leave_a">{{$store.getters.departmentjob_personals.filter((el)=>{ return parseInt(el.user_id)== parseInt(defData[0].userid)})[0].dept}}</a> </span> </li>
        <li class="leaveli"><span><label>请假类型:</label><a class="leave_a">{{leaveTypes.filter((el)=>{return el.id ==defData[0].leavetype})[0].type }}</a> </span> </li>
        <li class="leaveli"><span><label>开始日期:</label><a class="leave_a">{{$moment(defData[0].starttime).utc().format('YYYY-MM-DD HH:mm') }}</a></span></li>
        <li class="leaveli"><span><label>结束日期:</label><a class="leave_a">{{$moment(defData[0].endtime).utc().format('YYYY-MM-DD HH:mm')}}</a> </span></li>
        <li class="leaveli"><span><label>总时长:</label><a class="leave_a">{{defData[0].days?`${defData[0].days} 天`:`${defData[0].timetotal} 小时`}}</a></span></li>
        <li class="leaveli"><span><label>请假原因:</label><a class="leave_a">{{defData[0].remark}}</a></span></li>
    </ul>    
</div>
</template>

<script>
export default ({
    name: 'signleave',
    data() {
        return {
            leaveTypes: [
                { id: 1, type: '事假' },
                { id: 2, type: '年休' },
                { id: 3, type: '调休' },
                { id: 4, type: '婚假' },
                { id: 5, type: '丧假' },
                { id: 6, type: '病假' },
                { id: 7, type: '陪护' },
                { id: 7, type: '产假' }
            ]
        }
    },
    props: ["defData"],
    mounted() {
        // console.log(this.$store.getters.departmentjob_personals)
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
