<template>
<div class="organization-container">
    <div id="orgchart" class="orgchart" :style="{ height: '500px', width: '100%' }" />
</div>
</template>

<script>
import echarts from "echarts";

export default {
    name: "organization",
    data() {
        return { chart: null };
    },
    mounted() {
        this.initChart();
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    created() {
        console.log(this.$store.state.departmentjob.departs);
        // this.getOrgData();
    },
    methods: {
        initChart() {
            this.chart = echarts.init(document.getElementById("orgchart"));

            this.chart.setOption({
                title: {
                    text: "德玛电子组织结构图",
                },
                tooltip: {
                    show: false,
                    trigger: "item",
                    formatter: "{b}: {c}",
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true },
                    },
                },
                calculable: false,
                series: [{
                    name: "树图",
                    type: "tree",
                    orient: "vertical", // vertical horizontal
                    rootLocation: { x: "50%", y: "15%" }, // 根节点位置  {x: 'center',y: 10}
                    nodePadding: 20,
                    layerPadding: 40,
                    symbol: "rectangle",
                    borderColor: "black",
                    itemStyle: {
                        normal: {
                            color: "#fff", //节点背景色
                            label: {
                                show: true,
                                position: "inside",
                                textStyle: {
                                    color: "black",
                                    fontSize: 15,
                                    //fontWeight:  'bolder'
                                },
                            },
                            lineStyle: {
                                color: "#000",
                                width: 1,
                                type: "broken", // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                            },
                        },
                        emphasis: {
                            label: {
                                show: false,
                            },
                        },
                    },
                    data: [{
                        name: "董事会",
                        value: 6,
                        symbolSize: [70, 30], //外框大小
                        symbol: "rectangle", //窗框形状
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderColor: "black",
                            },
                        },

                        children: [{
                            name: "总经理",
                            value: 6,
                            symbolSize: [70, 30],
                            symbol: "rectangle",
                            itemStyle: {
                                normal: {
                                    borderWidth: 2,
                                    borderColor: "black",
                                },
                            },
                            children: [{
                                    name: "营销中心",
                                    value: 4,
                                    symbolSize: [70, 30],
                                    symbol: "rectangle",
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                position: "inside",
                                            },
                                            borderWidth: 2,
                                            borderColor: "black",
                                        },
                                    },
                                    children: [{
                                            name: "市场部",
                                            value: 4,
                                            symbolSize: [60, 30],
                                            symbol: "rectangle",
                                            itemStyle: {
                                                normal: {
                                                    label: {
                                                        show: true,
                                                        position: "inside",
                                                    },
                                                    borderWidth: 2,
                                                    borderColor: "black",
                                                },
                                            },
                                        },
                                        {
                                            name: "销售部",
                                            value: 4,
                                            symbolSize: [60, 30],
                                            symbol: "rectangle",
                                            itemStyle: {
                                                normal: {
                                                    label: {
                                                        show: true,
                                                        position: "inside",
                                                    },
                                                    borderWidth: 2,
                                                    borderColor: "black",
                                                },
                                            },
                                        },
                                        {
                                            name: "客服部",
                                            value: 4,
                                            symbolSize: [60, 30],
                                            symbol: "rectangle",
                                            itemStyle: {
                                                normal: {
                                                    label: {
                                                        show: true,
                                                        position: "inside",
                                                    },
                                                    borderWidth: 2,
                                                    borderColor: "black",
                                                },
                                            },
                                        },
                                    ],
                                },
                                {
                                    name: "项目中心",
                                    value: 4,
                                    symbolSize: [70, 30],
                                    symbol: "rectangle",
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                position: "inside",
                                            },
                                            borderWidth: 2,
                                            borderColor: "black",
                                        },
                                    },
                                    children: [{
                                            name: "售前支持部",
                                            value: 4,
                                            symbolSize: [90, 30],
                                            symbol: "rectangle",
                                            itemStyle: {
                                                normal: {
                                                    label: {
                                                        show: true,
                                                        position: "inside",
                                                    },
                                                    borderWidth: 2,
                                                    borderColor: "black",
                                                },
                                            },
                                        },
                                        {
                                            name: "项目一部",
                                            value: 4,
                                            symbolSize: [70, 30],
                                            symbol: "rectangle",
                                            itemStyle: {
                                                normal: {
                                                    label: {
                                                        show: true,
                                                        position: "inside",
                                                    },
                                                    borderWidth: 2,
                                                    borderColor: "black",
                                                },
                                            },
                                        },
                                        {
                                            name: "项目二部",
                                            value: 4,
                                            symbolSize: [70, 30],
                                            symbol: "rectangle",
                                            itemStyle: {
                                                normal: {
                                                    label: {
                                                        show: true,
                                                        position: "inside",
                                                    },
                                                    borderWidth: 2,
                                                    borderColor: "black",
                                                },
                                            },
                                        },
                                        {
                                            name: "项目三部",
                                            value: 4,
                                            symbolSize: [70, 30],
                                            symbol: "rectangle",
                                            itemStyle: {
                                                normal: {
                                                    label: {
                                                        show: true,
                                                        position: "inside",
                                                    },
                                                    borderWidth: 2,
                                                    borderColor: "black",
                                                },
                                            },
                                        },
                                    ],
                                },
                                {
                                    name: "技术中心",
                                    value: 4,
                                    symbolSize: [70, 30],
                                    symbol: "rectangle",
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                position: "inside",
                                            },
                                            borderWidth: 2,
                                            borderColor: "black",
                                        },
                                    },
                                    children: [{
                                            name: "开发部",
                                            value: 4,
                                            symbolSize: [70, 30],
                                            symbol: "rectangle",
                                            itemStyle: {
                                                normal: {
                                                    label: {
                                                        show: true,
                                                        position: "inside",
                                                    },
                                                    borderWidth: 2,
                                                    borderColor: "black",
                                                },
                                            },
                                        },
                                        {
                                            name: "设计部",
                                            value: 4,
                                            symbolSize: [70, 30],
                                            symbol: "rectangle",
                                            itemStyle: {
                                                normal: {
                                                    label: {
                                                        show: true,
                                                        position: "inside",
                                                    },
                                                    borderWidth: 2,
                                                    borderColor: "black",
                                                },
                                            },
                                        },
                                        {
                                            name: "系统部",
                                            value: 4,
                                            symbolSize: [70, 30],
                                            symbol: "rectangle",
                                            itemStyle: {
                                                normal: {
                                                    label: {
                                                        show: true,
                                                        position: "inside",
                                                    },
                                                    borderWidth: 2,
                                                    borderColor: "black",
                                                },
                                            },
                                        },
                                    ],
                                },
                                {
                                    name: "行政部",
                                    value: 4,
                                    symbolSize: [70, 30],
                                    symbol: "rectangle",
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                position: "inside",
                                            },
                                            borderWidth: 2,
                                            borderColor: "black",
                                        },
                                    },
                                },
                                {
                                    name: "财务部",
                                    value: 4,
                                    symbolSize: [70, 30],
                                    symbol: "rectangle",
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                position: "inside",
                                            },
                                            borderWidth: 2,
                                            borderColor: "black",
                                        },
                                    },
                                },
                                {
                                    name: "其他分支",
                                    value: 4,
                                    symbolSize: [70, 30],
                                    symbol: "rectangle",
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                position: "inside",
                                            },
                                            borderWidth: 2,
                                            borderColor: "black",
                                        },
                                    },
                                    children: [{
                                        name: "汕头分公司",
                                        value: 4,
                                        symbolSize: [90, 30],
                                        symbol: "rectangle",
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    show: true,
                                                    position: "inside",
                                                },
                                                borderWidth: 2,
                                                borderColor: "black",
                                            },
                                        },
                                    }, ],
                                },
                            ],
                        }, ],
                    }, ],
                }, ],
            });
        },
        getOrgData() {
            //此处需维护，递归方法，一时间忘记写法后期完善
            let tmpPart = null;
            let arrPart = [];
            this.$store.state.departmentjob.departs.forEach((el) => {
                if (tmpPart !== el.upbenchid) {
                    arrPart.push(el.upbenchid);
                    tmpPart = el.upbenchid;
                }
            });
            let tmpData = {
                name: null,
                value: null,
                symbolSize: [70, 30], //外框大小
                symbol: "rectangle", //窗框形状
                itemStyle: {
                    normal: {
                        borderWidth: 2,
                        borderColor: "black",
                    },
                },
                children: [],
            };
            let arrData = [];

            let curUpId = null;
            //   while (true) {
            //     for (
            //       let i = 0;
            //       i < this.$store.state.departmentjob.departs.length;
            //       i++
            //     ) {
            //       const el = this.$store.state.departmentjob.departs[i];
            //       if (curUpId === el.upbenchid) {
            //         tmpData.name = el.dept_name;
            //         tmpData.value = el.deptid;
            //       }
            //     }
            //   }

            //   console.log(arrPart.reverse());
            //   for (let i = 0; i < arrPart.reverse().length; i++) {
            //     const el = arrPart[i];
            //     console.log(el);
            //   }

            // for (let i = 0; i < this.$store.state.departmentjob.departs.length; i++) {
            //     const element = this.$store.state.departmentjob.departs[i];

            // }
            //   let masterID = this.$store.state.departmentjob.departs.filter((el) => {
            //     return el.upbenchid === null;
            //   });

            //   let chartsData = {}
            //   let curDepartID = masterID.deptid
            //   while(true){
            //     let tmpChildren =  this.$store.state.departmentjob.departs.filter((el) => {
            //             return el.upbenchid === curDepartID;
            //        });

            //   }

            //   console.log(masterID);
            // upbenchid
        },
    },
};
</script>
