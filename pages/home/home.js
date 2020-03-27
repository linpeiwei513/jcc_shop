// pages/home/home.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerData: [],
    imgUrl: app.globalData.apiUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanner()
  },

  //banner详情
  goShow: function(e) {
    console.log(e.currentTarget.dataset.item)
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../activityDetails/activityDetails?catid=' + item.catid + '&dataid='+item.dataid,
    })
  },

  //获取banner图
  getBanner: function() {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Content/getAdData?ad_id=1',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('banner数据：', res)
        if (res.data.status == '1') {
          that.setData({
            bannerData: res.data.data
          })
        }
      }
    })
  },



  //前往店铺信息
  goShop: function() {
    wx.navigateTo({
      url: '../shop/shop'
    })
  },
  
  //前往货品列表
  goGoods: function() {
    wx.switchTab({
      url: '../goodsList/goodsList'
    })
  },

  //活动
  goActivity: function() {
    wx.navigateTo({
      url: '../activity/activity',
    })
  },

  //店员
  goClerk: function() {
    wx.navigateTo({
      url: '../clerkList/clerkList',
    })
  },

  //销存记录
  goXiaoucun: function() {
    wx.navigateTo({
      url: '../xiaocun/xiaocun',
    })
  },

  //统计
  goStatistics: function() {
    wx.navigateTo({
      url: '../statistics/statistics',
    })
  },

  //积分商城
  goMall: function() {
    wx.switchTab({
      url: '../mall/index/index',
    })
  },

  //下级代理
  goAgency: function () {
    wx.navigateTo({
      url: '../agencyList/agencyList',
    })
  },

  //放款返现
  gofangkuan: function () {
    wx.navigateTo({
      url: '../fangkuan/fangkuan',
    })
  }


})