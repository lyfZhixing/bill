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
        <mt-field label="类型" placeholder="点击选择类型" readonly v-model="form.saleType" >
          <icon name="right" w="16px" h="16px"/>
        </mt-field>
      </span>
      <!-- 品种选择 -->
      <span @click="pickVariety">
        <mt-field label="品种" placeholder="点击选择品种" readonly v-model="form.variety" >
          <icon name="right" w="16px" h="16px"/>
        </mt-field>
      </span>
      <!-- 数量 -->
      <span><mt-field label="数量(斤)" placeholder="请输入重量" type="number" v-model="form.weight"></mt-field></span>
      <span>
        <mt-field label="是否收款" readonly placeholder="默认收款" v-model="form.moneyType"><mt-switch style="margin-top: -30px" @change="isMoneyM" v-model="form.isMoney"/></mt-field>
      </span>

      <div v-if="form.isMoney">
        <!-- 金额 -->
        <span>
          <mt-field label="实收金额(元)" placeholder="请输入金额" type="number" v-model="form.income"></mt-field>
        </span>
        <!-- 收款方式 -->
        <span style="font-family: 'Microsoft YaHei UI'" @click="isPickReceiptM">
          <mt-field label="收款方式" placeholder="点击选择方式" readonly v-model="form.receiptType" >
            <icon name="right" w="16px" h="16px"/>
          </mt-field>
        </span>
      </div>
      <div v-if="!form.isMoney">
        <!-- 签章人 -->
        <span @click="isPickSignaturesM">
          <mt-field label="签章人" placeholder="点击选择" readonly v-model="form.signature" >
            <icon name="right" w="16px" h="16px"/>
          </mt-field>
        </span>
      </div>
      <span><mt-field label="备注" placeholder="填写备注……" type="textarea" rows="4" v-modal="introduction"></mt-field></span>
      <div>
        <mt-button type="primary" style="width: 100px;margin-right: 20px">保存</mt-button>
        <mt-button type="primary" plain style="width: 100px">取消</mt-button>
      </div>

    </div>


    <!-- 类型选择器 -->
    <mt-popup
      v-model="isPickType"
      position="right"
      style="width: 50%;height: 100%">
      <div style="margin: 30px auto;">
        <mt-button type="primary" plain style="width: 120px;line-height: 30px;margin: 15px 30px;display: block" @click="pickGH">供货</mt-button>
        <mt-button type="primary" plain style="width: 120px;line-height: 30px;margin: 15px 30px;display: block">采摘</mt-button>
        <mt-button type="primary" plain style="width: 120px;line-height: 30px;margin: 15px 30px;display: block">盒装</mt-button>
      </div>
    </mt-popup>

    <!-- 品种选择器 -->
    <mt-popup
      v-model="isPickVariety"
      position="right"
      style="width: 50%;height: 100%">
      <div style="margin: 30px auto;">
        <mt-button type="primary" plain style="width: 120px;line-height: 30px;margin: 15px 30px;display: block" @click="pickNY">宁宇</mt-button>
        <mt-button type="primary" plain style="width: 120px;line-height: 30px;margin: 15px 30px;display: block">BB</mt-button>
        <mt-button type="primary" plain style="width: 120px;line-height: 30px;margin: 15px 30px;display: block">CC</mt-button>
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
  export default {
    name: 'Index',
    data () {
      return {
        year: '2019',
        month: '10',
        day: '1',
        form: {
          saleType: '',
          // 品种
          variety: '',
          // 重量
          weight: '',
          income: '',
          isMoney: true,
          moneyType: '',
          receiptType: '',
          signature: ''
        },
        isPickDate: false,
        isPickType: false,
        isPickVariety: false,
        isPickReceipt: false,
        isPickSignature: false,
        yield: '20',
        signatures: [
          {
            id: 4,
            name: '刘翼',
            code: 'QZR_LY'
          },
          {
            id: 5,
            name: '陈梦威',
            code: 'QZR_CMW'
          },
          {
            id: 6,
            name: '营销需要',
            code: 'QZR_YXXY'
          }
        ],
        receiptTypes: [
          {
            id: 1,
            name: '支付宝',
            code: 'SKFS_ZFB'
          },
          {
            id: 2,
            name: '微信',
            code: 'SKFS_WX'
          },
          {
            id: 3,
            name: '现金',
            code: 'SKFS_XJ'
          }
        ],
      }
    },
    methods: {
      pickDate () {
        this.isPickDate = true
      },
      pickType () {
        this.isPickType = true
      },
      pickGH () {
        this.isPickType = false
        this.form.saleType = '供货'
      },
      pickVariety () {
        this.isPickVariety = true
      },
      pickNY () {
        this.isPickVariety = false
        this.form.variety = '宁宇'
      },
      pickReceipt (item){
        this.isPickReceipt = false
        this.form.receiptType = item.name
      },
      isMoneyM () {
        if (this.form.isMoney) {
          this.form.moneyType = '收款'
          this.form.signature = ''
        } else {
          this.form.moneyType = '签章'
          this.form.income = ''
          this.form.receiptType = ''
        }
      },
      isPickReceiptM () {
        this.isPickReceipt = true
      },
      isPickSignaturesM () {
        this.isPickSignature = true
      },
      pickSignature (item) {
        this.isPickSignature = false
        this.form.signature = item.name
      }
    }
  }
</script>
<style>
 .field span {
   margin-top: 30px;
 }
</style>
