// pages/xiaocun/xiaocun.js
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

  goSales: function() {
    wx.navigateTo({
      url: '../recordSales/recordSales',
    })
  },

  goStock: function() {
    wx.navigateTo({
      url: '../recordStock/recordStock',
    })
  }, 

  goMarket: function() {
    wx.navigateTo({
      url: '../mine/xiaoshu/xiaoshu',
    })
  },

  goSalesD: function() {
    wx.navigateTo({
      url: '../recordSalesD/recordSalesD',
    })
  },

  goStockD: function() {
    wx.navigateTo({
      url: '../recordStockD/recordStockD',
    })
  },

  goMarketD: function() {
    wx.navigateTo({
      url: '../recordMarketD/recordMarketD?id=',
    })
  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})