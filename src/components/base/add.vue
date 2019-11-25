<!-- 新增 -->
<!--suppress ALL -->
<template>
  <div style="font-size: 16px;">
    <mt-header fixed title="新增账单">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <!-- 表单 -->
    <div class="field" style="margin-top: 40px">
      <!-- 类型选择 -->
      <span @click="pickType">
        <mt-field label="类型" placeholder="点击选择类型" readonly v-model="saleTypeName" >
          <icon name="right" w="16px" h="16px"/>
        </mt-field>
      </span>
      <!-- 品种选择 -->
      <span @click="pickVariety">
        <mt-field label="品种" placeholder="点击选择品种" readonly v-model="varietyName" >
          <icon name="right" w="16px" h="16px"/>
        </mt-field>
      </span>
      <!-- 数量 -->
      <span><mt-field label="数量(斤)" placeholder="请输入重量" type="number" v-model="form.weight"></mt-field></span>
      <span>
        <mt-field label="是否收款" readonly placeholder="默认收款" v-model="moneyTypeName"><mt-switch style="margin-top: -30px" @change="isMoneyM" v-model="form.isMoney"/></mt-field>
      </span>

      <div v-if="form.isMoney">
        <!-- 金额 -->
        <span>
          <mt-field label="实收金额(元)" placeholder="请输入金额" type="number" v-model="form.income"></mt-field>
        </span>
        <!-- 收款方式 -->
        <span style="font-family: 'Microsoft YaHei UI'" @click="isPickReceiptM">
          <mt-field label="收款方式" placeholder="点击选择方式" readonly v-model="receiptTypeName" >
            <icon name="right" w="16px" h="16px"/>
          </mt-field>
        </span>
      </div>
      <div v-if="!form.isMoney">
        <!-- 签章人 -->
        <span @click="isPickSignaturesM">
          <mt-field label="签章人" placeholder="点击选择" readonly v-model="signatureName" >
            <icon name="right" w="16px" h="16px"/>
          </mt-field>
        </span>
      </div>
      <span><mt-field label="备注" placeholder="填写备注……" type="textarea" rows="4" v-model="form.remark"></mt-field></span>
      <div>
        <mt-button type="primary" style="width: 100px;margin-right: 20px" @click="save">保存</mt-button>
        <mt-button type="primary" plain style="width: 100px" @click="cancle">取消</mt-button>
      </div>

    </div>


    <!-- 类型选择器 -->
    <mt-popup
      v-model="isPickType"
      position="right"
      style="width: 50%;height: 100%">
      <div style="margin: 30px auto;" v-for="item in this.saleTypes">
        <mt-button type="primary" plain style="width: 120px;line-height: 30px;margin: 15px 30px;display: block" @click="pickSaleType(item)">{{ item.name }}</mt-button>
      </div>
    </mt-popup>

    <!-- 品种选择器 -->
    <mt-popup
      v-model="isPickVariety"
      position="right"
      style="width: 50%;height: 100%">
      <div style="margin: 30px auto;" v-for="item in this.varietyTypes">
        <mt-button type="primary" plain style="width: 120px;line-height: 30px;margin: 15px 30px;display: block" @click="pickVarietyTypes(item)">{{ item.name }}</mt-button>
      </div>
    </mt-popup>

    <!-- 收款方式选择 -->
    <mt-popup
      v-model="isPickReceipt"
      position="right"
      style="width: 50%;height: 100%">
      <div style="margin: 30px auto;" v-for="item in this.receiptTypes">
        <mt-button type="primary" plain style="width: 120px;line-height: 30px;margin: 15px 30px;display: block" @click="pickReceipt(item)">{{ item.name }}</mt-button>
      </div>
    </mt-popup>

    <!-- 签章选择 -->
    <mt-popup
      v-model="isPickSignature"
      position="right"
      style="width: 50%;height: 100%">
      <div style="margin: 30px auto;" v-for="item in this.signatures">
        <mt-button type="primary" plain style="width: 120px;line-height: 30px;margin: 15px 30px;display: block" @click="pickSignature(item)">{{ item.name }}</mt-button>
      </div>
    </mt-popup>

  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'Index',
    data () {
      return {
        year: '2019',
        month: '10',
        day: '1',
        saleTypeName: '',
        varietyName: '',
        moneyTypeName: '',
        receiptTypeName: '',
        signatureName: '',
        form: {
          saleType: '',
          // 品种
          variety: '',
          // 重量
          weight: '',
          income: '',
          isMoney: true,
          receiptType: '',
          signature: '',
          remark: ''
        },
        isPickDate: false,
        isPickType: false,
        isPickVariety: false,
        isPickReceipt: false,
        isPickSignature: false,
        yield: '20',
        saleTypes: [],
        varietyTypes: [],
        signatures: [],
        receiptTypes: [],
      }
    },
    methods: {
      pickDate () {
        this.isPickDate = true
      },
      pickType () {
        this.$axios({  //this代表vue对象，之前在入口文件中把axios挂载到了vue中，所以这里直接用this.$axios调用axios对象
          method: 'get',
          url: this.HOME + 'dict/query/children/code/CHLX'
        }).then( res => {
          console.log(res.data.content)
          this.saleTypes = res.data.content
        }).catch(err => {
          console.log(err);
        })
        this.isPickType = true
      },
      pickSaleType(item) {
        this.isPickType = false
        this.saleTypeName = item.name
        this.form.saleType = item.id
      },
      pickVariety () {
        this.$axios({  //this代表vue对象，之前在入口文件中把axios挂载到了vue中，所以这里直接用this.$axios调用axios对象
          method: 'get',
          url: this.HOME + 'dict/query/children/code/CMPZ'
        }).then( res => {
          this.varietyTypes = res.data.content
          this.isPickVariety = true
        }).catch(err => {
          console.log(err);
        })
      },
      pickVarietyTypes(item) {
        this.isPickVariety = false
        this.varietyName = item.name
        this.form.variety = item.id
      },
      pickReceipt (item){
        this.isPickReceipt = false
        this.receiptTypeName = item.name
        this.form.receiptType = item.id
      },
      isMoneyM () {
        if (this.form.isMoney) {
          this.moneyTypeName = '收款'
          this.form.signature = ''
          this.signatureName = ''
        } else {
          this.moneyTypeName = '签章'
          this.form.income = ''
          this.form.receiptType = ''
          this.receiptTypeName = ''
        }
      },
      isPickReceiptM () {
        this.$axios({
          method: 'get',
          url: this.HOME + 'dict/query/children/code/SKFS'
        }).then( res => {
          this.receiptTypes = res.data.content
          this.isPickReceipt = true
        }).catch(err => {
          console.log(err);
        })

      },
      isPickSignaturesM () {
        this.$axios({
          method: 'get',
          url: this.HOME + 'dict/query/children/code/QZR'
        }).then( res => {
          this.signatures = res.data.content
          this.isPickSignature = true
        }).catch(err => {
          console.log(err);
        })
      },
      pickSignature (item) {
        this.isPickSignature = false
        this.signatureName = item.name
        this.form.signature = item.id
      },
      save() {
        const th = this
        this.$axios({
          method: 'post',
          url: this.HOME + 'bill/add',
          data: th.form
        }).then( res => {
          if (res.data.code !== 200) {
            this.form = {
              saleType: '',
              // 品种
              variety: '',
              // 重量
              weight: '',
              income: '',
              isMoney: true,
              receiptType: '',
              signature: '',
              remark: ''
            },
            this.saleTypeName = '',
            this.varietyName = '',
            this.moneyTypeName = '',
            this.receiptTypeName = '',
            this.signatureName = '',
            alert ('保存成功')
          } else {
            alert('保存失败')
          }

        }).catch(err => {
          console.log(err);
        })
      },
      cancle() {
        this.$router.push('/')
      }
    }
  }
</script>
<style>
 .field span {
   margin-top: 30px;
 }
</style>
