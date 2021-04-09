<template>
<div class="leave-container">
    <ul class="leave">
        <li class="leaveli"><span><label>姓名:</label><a class="leave_a">{{$store.getters.departmentjob_personals.filter((el)=>{ return parseInt(el.user_id)== parseInt(defData[0].userid)})[0].user_name}}</a> </span></li>
        <li class="leaveli"><span><label>部门:</label><a class="leave_a">{{$store.getters.departmentjob_personals.filter((el)=>{ return parseInt(el.user_id)== parseInt(defData[0].userid)})[0].dept}}</a> </span> </li>
        <li class="leaveli"><span><label>调休日期:</label><a class="leave_a">{{$moment(defData[0].freedate).utc().format('YYYY-MM-DD') }}</a></span></li>
        <li class="leaveli"><span><label>工作日期:</label><a class="leave_a">{{$moment(defData[0].workdate).utc().format('YYYY-MM-DD')}}</a> </span></li>
        <li class="leaveli"><span><label>调休原因:</label><a class="leave_a">{{defData[0].remark}}</a></span></li>
    </ul>    
</div>
</template>

<script>
export default ({
    name: 'switchday',
    data() {
        return {            
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
