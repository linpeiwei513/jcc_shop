// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.switchTab({
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
    wx.navigateTo({
      url: '../mall/index/index',
    })
  }


})