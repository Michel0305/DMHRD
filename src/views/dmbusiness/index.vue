<template>
  <div class="app-container-switchwork">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" icon="el-icon-edit" size="mini" :disabled="isEdit" @click="createNewDays">创建</el-button>
          <el-button icon="el-icon-edit-outline" size="mini" :disabled="isEdit" @click="editDays">修改</el-button>
          <el-button type="warning" icon="el-icon-collection-tag" size="mini" :disabled="!isEdit" @click="submitDays(0)">草稿</el-button>
          <el-button type="success" icon="el-icon-check" size="mini" :disabled="!isEdit" @click="submitDays(1)">送出</el-button>
          <el-button type="info" icon="el-icon-close" size="mini" :disabled="!isEdit" @click="cancelDays">取消</el-button>

        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-form ref="bussiness" :model="businessBase" :rules="rules" label-width="80px">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="职员" prop="userid">
                <el-select v-model="businessBase.userid" filterable placeholder="请选择" size="mini" :disabled="!isEdit">
                  <el-option
                    v-for="item in $store.state.departmentjob.personals.filter(el => {
                      if($store.getters.partids.findIndex((es)=>{ return el.defpartid == es} )>=0 || parseInt(el.user_id) == parseInt($store.getters.account)){
                        return el
                      }})"
                    :key="item.user_id"
                    :label="item.user_name"
                    :value="item.user_id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出差日期" prop="checkdate">
                <el-date-picker v-model="businessBase.checkdate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" size="mini" :disabled="!isEdit" format="yyyy-MM-dd" value-format="yyyy-MM-dd" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="出差地" prop="toaddressids">
                <el-cascader v-model="businessBase.toaddressids" size="mini" :options="options" :disabled="!isEdit" @change="handleChange" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="详细点" :disabled="isEdit" prop="dscaddress">
                <el-input v-model="businessBase.dscaddress" size="mini" :disabled="!isEdit" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="交通方式" prop="carplate">
                <el-select v-model="businessBase.carplate" placeholder="请选择" size="mini" :disabled="!isEdit">
                  <el-option v-for="item in caroptions" :key="item.val" :label="item.val" :value="item.val" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报销" label-width="60">
                <el-switch v-model="businessBase.isapply" size="mini" :disabled="!isEdit" />
                <el-link class="upload" type="primary" :disabled="!isEdit">附件<i class="el-icon-upload2" /></el-link>
                <el-link class="upload" type="success">预览<i class="el-icon-view el-icon--right" /> </el-link>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注" size="mini">
            <el-input v-model="businessBase.remark" type="textarea" :disabled="!isEdit" size="mini" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="20" :offset="2">
        <el-table :data="businessData" size="mini" border style="width: 100%" :max-height="$store.getters.locheight - 320" @cell-click="setRow">
          <el-table-column prop="userid" label="姓名" width="80" :formatter="formatUserName" />
          <el-table-column prop="userid" label="部门" width="140" :formatter="formatUserDept" />
          <el-table-column prop="checkdate" label="出差日期" width="100">
            <template>
              {{ $moment(businessData.checkdate).format('YYYY-MM-DD') }}
            </template>
          </el-table-column>
          <el-table-column prop="toaddress" label="目的地" width="260" :formatter="formatAddress" />
          <el-table-column prop="carplate" label="车牌" width="100" />
          <el-table-column prop="isapply" label="报销" width="60" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column prop="appstatus" label="状态" width="110" sortable :sort-by="['appstatus']">
            <template slot-scope="scope">
              <el-tag :type="scope.row.appstatus == 20 || scope.row.appstatus == 15 ?'success':scope.row.appstatus === -10 ?'danger':scope.row.appstatus === 0 ?'info' : ''" disable-transitions effect="dark" size="mini">
                {{ formatStatus(scope.row) }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from 'element-china-area-data'
import {
  getBusindessBase,
  infoBusindessData
} from '@/api/business'
import {
  isArray
} from '@/utils/validate'
export default {
  name: 'Business',
  data() {
    return {
      isEdit: false,
      businessBase: {
        id: 0,
        checkdate: '',
        toaddressids: [],
        toaddress: [],
        dscaddress: '',
        carplate: '',
        isapply: false,
        actfiles: '',
        remark: ''
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() - 5 > new Date(new Date().setDate(new Date().getDate() + 10)) || time.getTime() < new Date(new Date().setDate(new Date().getDate() - 1))
        }
      },
      model: '',
      caroptions: [{
        val: '粤S.12345'
      }, {
        val: '粤S.23456'
      }, {
        val: '粤S.34567'
      }, {
        val: '粤S.45678'
      }, {
        val: '自驾'
      }, {
        val: '外车'
      }],
      options: regionData,
      selectedOptions: [],
      businessData: [],
      rules: {
        userid: [{
          required: true,
          message: '请输入申请人',
          trigger: 'blur'
        }],
        checkdate: [{
          required: true,
          message: '请选择出差日期',
          trigger: 'blur'
        }],
        toaddressids: [{
          required: true,
          message: '请选择出差地',
          trigger: 'blur'
        }],
        dscaddress: [{
          required: true,
          message: '请输入目的地',
          trigger: 'blur'
        }],
        carplate: [{
          required: true,
          message: '请选择交通方式',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    getBusindessBase().then((rs) => {
      if (rs.data.code == 200) {
        this.businessData = [] = rs.data.msg
      } else {
        console.log(rs.data.msg)
        this.$message.error(`数据初始化错误,请关闭当前页面刷新`)
      }
    })
  },
  methods: {
    createNewDays() {
      this.businessBase = {
        id: 0,
        checkdate: '',
        toaddress: '',
        dscaddress: '',
        carplate: '',
        isapply: false,
        actfiles: '',
        remark: ''
      }
      this.isEdit = true
    },
    editDays() {
      if (this.businessBase.id == 0 || this.businessBase.appstatus > 0) return
      this.isEdit = true
    },
    submitDays(types) {
      this.$refs['bussiness'].validate((valid) => {
        if (valid) {
          this.isEdit = false
          this.formatAddressCN()
          this.businessBase.selectedOptions = this.selectedOptions
          this.businessBase.types = types
          infoBusindessData(this.businessBase).then((rs) => {
            if (rs.data.code == 200) {
              this.replaceDefData(rs.data.msg)
              this.$message.success(`数据更新保存成功`)
              this.resetForm('bussiness')
            } else {
              console.log(rs.data.msg)
              this.$message.error(`数据更新保存发生异常,请刷新后重试`)
            }
          })
        } else {
          this.$message.error(`请检查输入信息准确性`)
        }
      })
    },
    cancelDays() {
      this.isEdit = false
      // this.resetForm('days')
    },
    formatAddressCN() {
      this.businessBase.toaddressids.forEach((el) => {
        this.selectedOptions.push(CodeToText[el])
      })
    },
    formatAddressCode(info) {
      info.forEach((el) => {
        this.selectedOptions.push(TextToCode[el])
      })
    },
    formatAddress(row, col) {
      let address = ''
      if (isArray(row.toaddressids)) {
        row.toaddressids.forEach((el) => {
          address = address + ' ' + CodeToText[el]
        })
      } else {
        const tmp = [] = row.toaddressids.split(',')
        tmp.forEach((el) => {
          address = address + ' ' + CodeToText[el]
        })
      }

      return `${address} - ${row.dscaddress}`
    },
    handleChange(value) {},
    setRow(row, index) {
      if (this.isEdit) return
      if (isArray(row.toaddressids)) return this.businessBase = {} = row
      const tmp = [] = row.toaddressids.split(',')
      const tmpRow = row
      tmpRow.toaddressids = tmp
      this.businessBase = {} = tmpRow
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    replaceDefData(info) {
      const indexID = this.businessData.findIndex(val => parseInt(val.id) == parseInt(info.id))
      this.businessData.splice(
        indexID < 0 ? 0 : indexID,
        indexID < 0 ? 0 : 1,
        info
      )
    },
    formatUserName(row, colum) {
      const tmpUser = this.$store.state.departmentjob.personals.filter((el) => {
        return parseInt(el.user_id) === parseInt(row.userid)
      })
      return tmpUser.length == 0 ? row.userid : tmpUser[0].user_name
    },
    formatUserDept(row, colum) {
      const tmpUser = this.$store.state.departmentjob.personals.filter((el) => {
        return parseInt(el.user_id) === parseInt(row.userid)
      })
      return tmpUser.length == 0 ? '未知' : tmpUser[0].dept
    },
    formatStatus(row) {
      const tmps = this.$store.getters.applovestatus.filter((el) => {
        return el.model.replace(/(^\s*)|(\s*$)/g, '') == 'business' && el.statusid == row.appstatus
      })
      return tmps.length == 0 ? '未知' : tmps[0].msg
    }
  }
}
</script>

<style scoped>
.el-form {
    background: radial-gradient(#e6e1e1, transparent);
    padding: 20px;
}

.grid-content {
    padding-top: 12px;
    border-radius: 4px;
    min-height: 50px;
    padding-left: 20px;
}

.bg-purple-dark {
    background: #dfe2e4;
}

.el-form-item {
    margin-bottom: 17px;
}

.upload {
    margin-left: 30px;
}
</style>
