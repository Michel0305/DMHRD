<template>
<div class="app-container-anaatt">
    <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="出勤分析图" name="analytical">
        <analytical></analytical>
    </el-tab-pane>
    <el-tab-pane label="日考勤异常" name="abnormal">
        <abnormal></abnormal>
    </el-tab-pane>   
  </el-tabs>  
</div>
</template>

<script>
export default {
    components: {
        abnormal:resolve=>require(['./components/dayattendance'],resolve),
        analytical:resolve=>require(['./components/analytical'],resolve),
    },   
    data() {
        return {
            activeName: 'analytical'
    }            
    },
};
</script>