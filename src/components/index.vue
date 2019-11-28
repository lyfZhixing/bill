<!-- 记账首页 -->
<template>
  <div style="font-size: 16px;">
    <mt-header fixed title="账单">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/add" slot="right">
        <mt-button><icon name="add" w="16px" h="16px"/> 新增</mt-button>
      </router-link>
    </mt-header>
    <!-- 类型选择 -->
    <div>
      <span style="font-family: 'Microsoft YaHei UI'" @click="pickType">{{ saleTypeTitle }} <icon name="down" w="16px" h="16px"/></span>
    </div>
    <!-- 日期选择 -->
    <div style="margin-top: 20px;">
      <div style="float: left; font-size: 16px;height: 50px">
        <span style="float: left;display: block" @click="pickDate">{{ $moment(showTime).format('YYYY年MM月DD日') }}<icon name="down" w="16px" h="16px"/></span>
        <div style="clear: left"></div>
        <span style="margin-top: 10px; float: left;display: block">收入:{{ income }}元 &nbsp;&nbsp; 产量:{{ yield }} 斤</span>
      </div>
      <div style="float: right;text-align: center;height: 50px">
        <div style="height:50px; width:1px; border-left:1px #000 solid;float: left; margin-right: 20px"></div>
        <div style="display: inline;font-size: 24px;line-height: 50px">查看统计<icon name="right" w="24px" h="24px"/></div>
      </div>
      <!--<mt-picker :slots="slots" visibleItemCount="3" @change="onValuesChange"></mt-picker>-->
    </div>
    <div style="clear: both"/>
    <!-- 表单数据 -->
    <div style="margin-top: 30px">
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <div v-for="item in billList">
          <div style="color: #999999" @click="showDetail(item)">
            <!-- 供货类型 -->
              <div style="width: 80px;line-height: 60px;font-size: 24px; background-color: #F2F2F2;margin-bottom: 10px;text-align: center; float: left">
                {{ item.saleTypeName }}
              </div>
            <!-- 品种，重量，时间 -->
            <div style="float: left; height: 60px; margin-left: 20px;padding-top: 5px">
              <div style="margin-bottom: 10px">
                <span style="font-size: 18px;margin-right: 10px" > {{ item.varietyName }}</span>
                <span> {{ item.weight }}</span> <span> 斤</span>
              </div>
              <div>
                <span> {{ item.createTime }} </span>
              </div>
            </div>
            <!-- 收入 -->
            <div style="float: right;line-height: 60px;margin-right: 20px;font-size: 16px;color: #FF6666;" v-if="item.isMoney">
              <span style="margin-right: 10px">{{ item.income }}</span>
              <span>元</span>
            </div>
            <div style="float: right;line-height: 60px;margin-right: 20px;font-size: 16px;color: #FF6666;" v-if="!item.isMoney">
              <span>{{ item.signatureName }}</span>
            </div>
            <div style="clear: both"/>
            <hr/>

          </div>

        </div>
      </div>
    </div>

    <!-- 日期选择器 -->
    <mt-datetime-picker
      ref="isPickDate"
      v-model="showTime"
      type="date"
      @confirm="pickDateA"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker>
    <!-- 类型选择器 -->
    <mt-popup
      v-model="isPickType"
      position="bottom"
      style="width: 100%;height: 50%">
      <div>
        <mt-button type="danger" plain style="width: 80px;line-height: 30px;float: left;margin-left: 30px;margin-top: 50px" @click="pickTypeA('all')">全部</mt-button>
      </div>
      <div style="clear:both"/>
      <div style="margin: 30px auto;" v-for="item in saleTypes">
        <mt-button type="primary" plain style="width: 80px;line-height: 30px;float: left;margin-left: 30px" @click="pickTypeA(item)">{{ item.name }}</mt-button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      saleTypes: [],
      showTime: '',
      isPickDate: false,
      isPickType: false,
      income: '',
      yield: '',
      saleTypeTitle: '选择类型',
      query: {
        saleType: '',
        createTime: ''
      },
      billList: [],
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'slot3'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    }
  },
  mounted () {
    // eslint-disable-next-line no-extend-native

  },
  created () {
    this.showTime = new Date()
    this.year = this.showTime.getFullYear() + ''
    this.month = this.showTime.getMonth() + ''
    this.day = this.showTime.getDate() + ''
    this.query.createTime = this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    this.getList()
  },
  methods: {
    getList () {
      this.$axios({
        method: 'get',
        url: this.HOME + 'bill/list',
        params: this.query
      }).then(res => {
        console.log(res.data.content)
        this.billList = res.data.content.billVOs
        this.income = res.data.content.inCome
        this.yield = res.data.content.weight
      }).catch(err => {
        console.log(err)
      })
    },
    pickDate () {
      this.$refs.isPickDate.open()
    },
    pickDateA (date) {
      this.query.createTime = this.$moment(date).format('YYYY-MM-DD HH:mm:ss')
      this.getList()
      this.isPickDate = false
    },
    pickType () {
      // this代表vue对象，之前在入口文件中把axios挂载到了vue中，所以这里直接用this.$axios调用axios对象
      this.$axios({
        method: 'get',
        url: this.HOME + 'dict/query/children/code/CHLX'
      }).then(res => {
        console.log(res.data.content)
        this.saleTypes = res.data.content
      }).catch(err => {
        console.log(err)
      })
      this.isPickType = true
    },
    pickTypeA (item) {
      if (item === 'all') {
        this.saleTypeTitle = '全部'
        this.query.saleType = ''
        this.query.createTime = this.$moment(this.showTime).format('YYYY-MM-DD HH:mm:ss')
      } else {
        this.query.saleType = item.id
        this.saleTypeTitle = item.name
        this.query.createTime = this.$moment(this.showTime).format('YYYY-MM-DD HH:mm:ss')
      }
      this.getList()
      this.isPickType = false
    },
    showDetail (item) {
      this.$router.push({
        path: '/detail',
        query: item
      })
    }
  }
}
</script>

<style>

</style>
