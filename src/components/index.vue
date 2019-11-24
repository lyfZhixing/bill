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
      <span style="font-family: 'Microsoft YaHei UI'" @click="pickType">选择类型 <icon name="down" w="16px" h="16px"/></span>
    </div>
    <!-- 日期选择 -->
    <div style="margin-top: 20px;">
      <div style="float: left; font-size: 16px;height: 50px">
        <span style="float: left;display: block" @click="pickDate">{{ year }}年{{ month }}月{{ day }}日<icon name="down" w="16px" h="16px"/></span>
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
          <div style="color: #999999">
            <!-- 供货类型 -->
              <div style="width: 80px;line-height: 60px;font-size: 24px; background-color: #F2F2F2;margin-bottom: 10px;text-align: center; float: left">
                {{ item.saleType }}
              </div>
            <!-- 品种，重量，时间 -->
            <div style="float: left; height: 60px; margin-left: 20px;padding-top: 5px">
              <div style="margin-bottom: 10px">
                <span style="font-size: 18px;margin-right: 10px" > {{ item.variety }}</span>
                <span> {{ item.weight }}</span> <span> 斤</span>
              </div>
              <div>
                <span> {{ item.saleTime }} </span>
              </div>
            </div>
            <!-- 收入 -->
            <div style="float: right;line-height: 60px;margin-right: 20px;font-size: 24px;color: #FF6666;">
              <span style="margin-right: 10px">{{ item.income }}</span>
              <span>元</span>
            </div>
            <div style="clear: both"/>
            <hr/>

          </div>

        </div>
      </div>
    </div>

    <!-- 日期选择器 -->
    <mt-popup
      v-model="isPickDate"
      position="bottom"
      style="width: 100%;height: 50%">
      <div>
        <span style="float: left;margin-left: 20px;margin-top:20px">取消</span>
        <span style="float: right;margin-right: 20px;margin-top:20px">确定</span>
      </div>
      <mt-picker :slots="slots" visibleItemCount="9" @change="onValuesChange"></mt-picker>
    </mt-popup>
    <!-- 类型选择器 -->
    <mt-popup
      v-model="isPickType"
      position="bottom"
      style="width: 100%;height: 50%">
      <div>
        <mt-button type="danger" plain style="width: 80px;line-height: 30px;float: left;margin-left: 30px;margin-top: 50px">全部</mt-button>
      </div>
      <div style="clear:both"/>
      <div style="margin: 30px auto;">
        <mt-button type="primary" plain style="width: 80px;line-height: 30px;float: left;margin-left: 30px">供货</mt-button>
        <mt-button type="primary" plain style="width: 80px;line-height: 30px;float: left;margin-left: 30px">采摘</mt-button>
        <mt-button type="primary" plain style="width: 80px;line-height: 30px;float: left;margin-left: 30px">盒装</mt-button>
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
      isPickDate: false,
      isPickType: false,
      income: '200',
      yield: '20',
      billList: [
        {
          id: '1',
          // 出货类型
          saleType: '供货',
          // 草莓品种
          variety: '宁玉',
          // 出货斤数
          weight: '5',
          // 出货时间
          saleTime: '11-01 12:30',
          // 价钱
          income: '500'

        },
        {
          id: '1',
          // 出货类型
          saleType: '盒装',
          // 草莓品种
          variety: '红颜',
          // 出货斤数
          weight: '5',
          // 出货时间
          saleTime: '11-01 12:30',
          // 价钱
          income: '500'

        },
        {
          id: '1',
          // 出货类型
          saleType: '采摘',
          // 草莓品种
          variety: '水煮',
          // 出货斤数
          weight: '5',
          // 出货时间
          saleTime: '11-01 12:30',
          // 价钱
          income: '500'

        }
      ],
      slots: [
        {
          flex: 1,
          values: ['2015', '2016', '2017', '2018', '2019', '2020'],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['01', '02', '03', '04', '05', '06'],
          className: 'slot3'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['01', '02', '03', '04', '05', '06'],
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    }
  },
  methods: {
    pickDate () {
      this.isPickDate = true
    },
    pickType () {
      this.isPickType = true
    }
  }
}
</script>

<style>

</style>
