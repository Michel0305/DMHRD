<template>
    <div class="app-container-salarysettingtemplate">
        <el-row :gutter="10">
            <el-col :span="12" :offset="6">
                <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="基本薪资">
                        <el-input v-model="ruleForm.basesalay" placeholder="输入基本薪资"></el-input>
                    </el-form-item>
                    <el-form-item label="社保基数">
                        <el-input v-model="ruleForm.basesalay" placeholder="输入社保基数"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default({
     name:'salarysettingsalary',
     data(){
         return{
             ruleForm:{},
             rules:[]
        }
     }
})
</script>
