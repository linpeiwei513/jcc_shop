// pages/db/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconUrl: 'http://lbdj.oss-cn-beijing.aliyuncs.com/lbdj_app_h5/page/cwz/', //图标阿里云地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  //店员销售排行
  goUserSell: function() {
    wx.navigateTo({
      url: '../rankUserSell/rankUserSell',
    })
  },

  //代理销售排行
  goAgencySell: function () {
    wx.navigateTo({
      url: '../rankAgencySell/rankAgencySell',
    })
  },

  //店铺商品销售排行 goGoodsStores
  goGoodsSell: function () {
    wx.navigateTo({
      url: '../rankGoodsSell/rankGoodsSell',
    })
  },

  //店铺商品库存排行 goAgencyStores
  goGoodsStores: function () {
    wx.navigateTo({
      url: '../rankGoodsStores/rankGoodsStores',
    })
  },

  //代理库存排行 goAgencyStores
  goAgencyStores: function () {
    wx.navigateTo({
      url: '../rankAgencyStores/rankAgencyStores',
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