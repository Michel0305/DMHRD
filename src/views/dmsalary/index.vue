<template>
    <div class="app-container-salary">        
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="工资明细" name="salarylist"><tmplatesalary></tmplatesalary></el-tab-pane>
            <el-tab-pane label="基本设定" name="salarysetting">
                <salarysettingsalary></salarysettingsalary>
                </el-tab-pane>
            <el-tab-pane label="个税设定" name="individual">个税设定</el-tab-pane>
            <el-tab-pane label="社保设定" name="social">社保设定</el-tab-pane>
            <el-tab-pane label="税率表" name="retes">税率表</el-tab-pane>
            <el-tab-pane label="公积金" name="accumulation">公积金</el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
export default({
     name:'salary',
     components:{
         salarysettingsalary:resolve=>require(['./components/salarysetting'],resolve),
         tmplatesalary:resolve=>require(['./components/salarylist'],resolve)},
     data(){
         return{
             activeName: 'salarylist'
         }
     }
})
</script>
