<template>
  <div class="app-container-edituser">
    <el-dialog
      :title="infousers.isEdit ? infousers.user_name : '创建'"
      :visible.sync="dialogStatus"
      :before-close="dialogForm"
    >
      <el-form ref="form" :model="infousers" label-width="80px">
        <div class="dialogClass">
          <div class="usrandimg">
            <div class="user">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名">
                    <el-input
                      :disabled="infousers.isEdit"
                      v-model="infousers.user_name"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="工号" size="mini">
                    <el-input
                      v-model="infousers.user_id"
                      :disabled="infousers.isEdit"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="部门">
                    <el-select
                      v-model="infousers.defpartid"
                      placeholder="请选择"
                      @change="checkDeptName"
                      size="mini"
                    >
                      <el-option
                        v-for="el in $store.state.departmentjob.departs"
                        :key="el.deptid"
                        :label="el.dept_name"
                        :value="el.deptid"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="部门编码">
                    <el-input
                      :readonly="true"
                      v-model="infousers.defpartid"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="岗位">
                    <el-select
                      v-model="infousers.job"
                      placeholder="请选择"
                      size="mini"
                    >
                      <!-- .filter(items=>{return items.defpartid == infousers.defpartid }) ) -->
                      <el-option
                        v-for="el in $store.state.departmentjob.jobs.filter(
                          (items) => {
                            return items.defpartid == infousers.defpartid;
                          }
                        )"
                        :key="el.job"
                        :label="el.job"
                        :value="el.job"
                        :disabled="el.job == infousers.job"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="班次">
                    <el-select
                      v-model="infousers.timestype"
                      placeholder="请选择"
                      size="mini"
                    >
                      <el-option
                        v-for="el in $store.state.departmentjob.times"
                        :key="el.id"
                        :label="el.timesname"
                        :value="el.id"
                        :disabled="!el.ischeck"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15">
                  <el-form-item label="身份ID">
                    <el-input v-model="infousers.cardid" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="性别">
                    <el-select
                      v-model="infousers.sex"
                      placeholder="请选择"
                      size="mini"
                    >
                      <el-option
                        v-for="el in optionsSex"
                        :key="el.id"
                        :label="el.label"
                        :value="el.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="教育">
                    <el-select
                      v-model="infousers.education"
                      placeholder="请选择"
                      size="mini"
                    >
                      <el-option
                        v-for="el in optionsEducation"
                        :key="el.id"
                        :label="el.label"
                        :value="el.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系方式" size="mini">
                    <el-input v-model="infousers.phone"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="userimg">
              <el-form-item>
                <el-image :src="src" class="userimg">
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>
                <!-- <el-input v-model="infousers.imgurl"></el-input> -->
              </el-form-item>
            </div>
          </div>

          <el-tabs tab-position="left" style="height: 200px">
            <el-tab-pane label="用户管理">
              <div class="userother">
                <el-row>
                  <el-col :span="20">
                    <el-form-item label="户籍">
                      <el-input
                        v-model="infousers.address"
                        size="mini"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="上级部门">
                      <el-select
                        v-model="infousers.mastpartid"
                        placeholder="请选择"
                        size="mini"
                      >
                        <el-option
                          v-for="el in $store.state.departmentjob.departs"
                          :key="el.deptid"
                          :label="el.dept_name"
                          :value="el.deptid"
                          :disabled="el.deptid == infousers.defpartid"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="邮箱">
                      <el-input
                        v-model="infousers.email"
                        size="mini"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="门禁">
                      <el-input
                        v-model="infousers.cdnumber"
                        size="mini"
                        placeholder="门禁卡号"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item>
                      <el-select
                        v-model="infousers.position"
                        placeholder="婚姻状态"
                        size="mini"
                      >
                        <el-option
                          v-for="el in optionsMarital"
                          :key="el.id"
                          :label="el.id"
                          :value="el.id"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item>
                      <el-checkbox v-model="infousers.isline">在职</el-checkbox>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="入职日期">
                      <el-date-picker
                        :editable="false"
                        v-model="infousers.indate"
                        type="date"
                        placeholder="选择日期"
                        size="mini"
                        :disabled="infousers.isEdit"
                        class="rq"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :offset="2">
                    <el-form-item label="生日">
                      <el-date-picker
                        :disabled="true"
                        v-model="infousers.birthday"
                        type="date"
                        placeholder="选择日期"
                        size="mini"
                        class="rq"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <!-- ​	指纹录入	​	工衣	​	培训	​  合同	​	公司手机	​	文具	​	宿舍钥匙	 -->
            <el-tab-pane label="入职" v-model="infousers.documents">
              <el-col :span="24">
                <el-col :span="8"
                  ><el-checkbox label="0">门禁工号</el-checkbox></el-col
                >
                <el-col :span="8"
                  ><el-checkbox label="1">应聘登记表</el-checkbox></el-col
                >
                <el-col :span="8"
                  ><el-checkbox label="2">入职登记表</el-checkbox></el-col
                >
              </el-col>
              <el-col :span="24">
                <el-col :span="8"
                  ><el-checkbox label="3">身份证复印件</el-checkbox></el-col
                >
                <el-col :span="8"
                  ><el-checkbox label="4">银行卡复印件</el-checkbox></el-col
                >
                <el-col :span="8"
                  ><el-checkbox label="5">彩色照片(2张)</el-checkbox></el-col
                >
              </el-col>
              <el-col :span="24">
                <el-col :span="8"
                  ><el-checkbox label="6">体检报告</el-checkbox></el-col
                >
                <el-col :span="8"
                  ><el-checkbox label="7">证书</el-checkbox></el-col
                >
                <el-col :span="8"
                  ><el-checkbox label="8">弃保声明书</el-checkbox></el-col
                >
              </el-col>
              <el-col :span="24">
                <el-col :span="8"
                  ><el-checkbox label="9"
                    >员工外住责任声明书</el-checkbox
                  ></el-col
                >
                <el-col :span="8"
                  ><el-checkbox label="10"
                    >职员保密/竞业协议</el-checkbox
                  ></el-col
                >
                <el-col :span="8"
                  ><el-checkbox label="11"
                    >员工宿舍管理制度</el-checkbox
                  ></el-col
                >
              </el-col>
              ​
            </el-tab-pane>

            <el-tab-pane label="物品领用">
              <el-checkbox-group v-model="infousers.goods">
                <el-col :span="24">
                  <el-col :span="8"
                    ><el-checkbox label="0">工牌</el-checkbox></el-col
                  >
                  <el-col :span="8"
                    ><el-checkbox label="1">指纹</el-checkbox></el-col
                  >
                  <el-col :span="8"
                    ><el-checkbox label="2">工衣</el-checkbox></el-col
                  >
                </el-col>
                <el-col :span="24">
                  <el-col :span="8"
                    ><el-checkbox label="3">培训</el-checkbox></el-col
                  >
                  <el-col :span="8"
                    ><el-checkbox label="4">公司手机</el-checkbox></el-col
                  >
                  <el-col :span="8"
                    ><el-checkbox label="5">文具</el-checkbox></el-col
                  >
                </el-col>
                <el-col :span="24">
                  <el-col :span="8"
                    ><el-checkbox label="6">合同</el-checkbox></el-col
                  >
                </el-col>
              </el-checkbox-group>
            </el-tab-pane>

            <el-tab-pane label="银行/社保">
              <el-form-item label="社保分类">
                <el-checkbox-group v-model="infousers.social">
                  <el-checkbox label="0">社保</el-checkbox>
                  <el-checkbox label="1">商保</el-checkbox>
                  <el-checkbox label="2">公积金</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="开户银行">
                <el-input
                  v-model="infousers.bankname"
                  placeholder="开户行"
                  size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item label="分支行">
                <el-input
                  v-model="infousers.bankson"
                  placeholder="分支"
                  size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item label="卡号">
                <el-input
                  v-model="infousers.bankcard"
                  placeholder="银行账号"
                  size="mini"
                ></el-input>
              </el-form-item>
            </el-tab-pane>
            <!-- <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
          </el-tabs>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogForm">保存</el-button>
        <el-button @click="dialogForm">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { mapGetters } from "vuex";
export default {
  name: "edituser",
  data() {
    return {
      innerVisible: false,
      isEdit: false,
      tmpgoods: [],
      src:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      optionsEducation: [
        { label: "博士", id: "博士" },
        { label: "硕士", id: "硕士" },
        { label: "研究生", id: "研究生" },
        { label: "本科", id: "本科" },
        { label: "大专", id: "大专" },
        { label: "中专", id: "中专" },
        { label: "高中", id: "高中" },
        { label: "初中", id: "初中" },
        { label: "小学", id: "小学" },
      ],
      optionsSex: [
        { label: "男", id: "男" },
        { label: "女", id: "女" },
      ],
      optionsMarital: [
        { label: "未婚", id: "未婚" },
        { label: "已婚", id: "已婚" },
        { label: "离异", id: "离异" },
      ],
    };
  },
  props: ["infousers", "dialogStatus"],
  computed: {
    ...mapGetters(
      ["roles"],
      ["departmentjob_personals"],
      ["departmentjob_departs"],
      ["departmentjob_jobs"],
      ["departmentjob_times"]
    ),
  },
  created() {
    // console.log(this.$store.state.departmentjob.departs);
    // console.log(this.$store.state.departmentjob);
    console.log();
  },
  mounted: function () {},
  methods: {
    dialogForm() {
      let tmpUser = this.infousers;
      this.$emit("dialogFormStatus", tmpUser);
    },
    checkDeptName(val) {
      this.infousers.job = "";
      let deptName = this.$store.state.departmentjob.departs.find((item) => {
        return item.deptid === val;
      });
      this.infousers.dept = deptName.dept_name;
    },
  },
};
</script>

<style scoped>
.el-dialog__body {
  padding: 10px 10px;
}

.usrandimg {
  display: flex;
}

.el-image {
  width: 180px;
  height: 210px;
}
.el-checkbox {
  padding: 10px;
}
.rq {
  width: 140px;
}
</style>
