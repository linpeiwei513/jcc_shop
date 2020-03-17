// pages/site/city/city.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityData: '',
    provinceId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let siteData = wx.getStorageSync("cityData")
    let cityData = []
    for(var i=0; i<siteData.length; i++){
      if (siteData[i].id == options.provinceId){
        cityData = siteData[i].children
      }
    }
    that.setData({
      provinceId: options.provinceId,
      cityData: cityData
    })
  },



  //选择市
  getCity(e) {
    console.log(e.currentTarget.dataset['item'].id)
    let id = e.currentTarget.dataset['item'].id
    wx.navigateTo({
      url: "/pages/site/region/region?cityId=" + id + "&provinceId=" + this.data.provinceId,
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