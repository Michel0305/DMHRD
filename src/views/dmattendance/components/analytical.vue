<template>
<div>
    <el-row class="headtool">
        <!-- <el-col :span="6" :offset="1">
            <el-date-picker v-model="downloaddate" type="date" placeholder="选择日期" class="input-with-select" size="mini"></el-date-picker>
            <el-button class="btndownload" type="warning" icon="el-icon-download" size="mini" :loading="true"></el-button>
        </el-col> -->
        <el-col :span="11" :offset="1">
            <el-date-picker v-model="swhereDate" type="daterange" align="right" unlink-panels 
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" :picker-options="pickerOptions">
            </el-date-picker>           
            <el-button size="mini" icon="el-icon-search" @click="getworkrecordsdata" :disabled="lockbtn"></el-button>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="20" :offset="2">
            <div :id="id" class="echs" :style="{width:'100%',height:`${$store.getters.locheight-50}px` }" />
        </el-col>
    </el-row>
</div>
</template>

<script>
import echarts from 'echarts'
import { eChartAttendance } from "@/api/attendance"
export default ({
    name: 'analytical',
    data() {
        return {
            id: 'dmechart',            
            lockbtn:false,
            swhereDate:[this.$moment(new Date()).subtract(7, 'days'),
            new Date()],
            pickerOptions:{
                disabledDate(time) {
                    return time.getTime()> new Date(new Date().setDate(new Date().getDate()))
                },
            },
        }
    },
    mounted() {
        this.initChart()
    },
    methods: {
        initChart() {
            this.chart = echarts.init(document.getElementById(this.id))
            eChartAttendance({ startdate: this.$moment(this.swhereDate[0]).format('YYYY-MM-DD'), enddate: this.$moment(this.swhereDate[1]).format('YYYY-MM-DD') }).then((rs) => {
                if (rs.data.code == 200) {
                    let seriesList = []
                    let dataList = {
                        titlemsg: [],
                        usercnt: [],
                        reusercnt: [],
                        ountcnt: [],
                        leavecnt: [],
                        latecnt: [],
                        incnt: [],
                        ealycnt: []
                    }
                    rs.data.msg.forEach(el => {
                        for (const key in el) {
                            if (Object.hasOwnProperty.call(el, key)) {
                                dataList[key].push(el[key])
                            }
                        }
                    });
                    let legendList = ['应出勤人数', '实出勤人数', '请假人数', '离职人数', '新进人数', '迟到人数', '未考勤数']
                    let matchList = ['usercnt', 'reusercnt', 'leavecnt', 'ountcnt', 'incnt', 'latecnt', 'ealycnt']
                    legendList.forEach((el, key) => {
                        let tmpList = {
                            name: el,
                            type: 'bar',
                            stack: el,
                            emphasis: {
                                focus: 'series'
                            },
                            data: dataList[matchList[key]]
                        }
                        seriesList.push(tmpList)
                    });
                    this.chart.setOption({
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data: legendList
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: dataList.titlemsg
                        }],
                        yAxis: [{
                            type: 'value'
                        }],
                        series: seriesList
                    })
                }
            })

        },
        getworkrecordsdata(){
           this.initChart()
        }
    }
})
</script>

<style scoped>
</style>
