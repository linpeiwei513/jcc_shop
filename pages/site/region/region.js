// pages/site/region/region.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityData: '',
    provinceId: '',
    provinceName: '',
    cityId: '',
    cityName: '',
    regionId: '',
    regionName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that = this
    let siteData = wx.getStorageSync("cityData")
    let cityData = []
    let provinceName = ''
    let cityName = ''
    for (var i = 0; i < siteData.length; i++) { 
      if (siteData[i].id == options.provinceId) {
        provinceName = siteData[i].name
        for (var j = 0; j < siteData[i].children.length; j++){
          if (siteData[i].children[j].id == options.cityId){
            cityName = siteData[i].children[j].name
            cityData = siteData[i].children[j].children
          }
        }
        
      }
    }
    that.setData({
      //cityData: wx.getStorageSync("cityData")
      provinceId: options.provinceId,
      provinceName: provinceName,
      cityId: options.cityId,
      cityName: cityName,
      cityData: cityData
    })
  },

  //选择区
  getRegion(e) {
    
    this.setData({
      regionId: e.currentTarget.dataset['item'].id,
      regionName: e.currentTarget.dataset['item'].name,
    })
    let dataObj = {
      provinceId: this.data.provinceId,
      provinceName: this.data.provinceName,
      cityId: this.data.cityId,
      cityName: this.data.cityName,
      regionId: this.data.regionId,
      regionName: this.data.regionName
    }

    console.log('选择的数据:', dataObj)
    let data = JSON.stringify(dataObj)
    wx.reLaunch({
      url: "/pages/shop/shop?siteData=" + data,
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