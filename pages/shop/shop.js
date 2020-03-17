// pages/shop/shop.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    agent_info: '',
    imgUrl: '',
    apiUrl: '',

    siteName: '选择地区'
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShop()
    this.getCity()
    console.log('选择的省市区：', JSON.parse(options.siteData))
    let siteData = JSON.parse(options.siteData)
    if (siteData){
      this.setData({
        siteName: siteData.provinceName + '-' + siteData.cityName + '-' + siteData.regionName,
      })
    }
  },
  
  //选择省市区
  showCity() {
    wx.navigateTo({
      url: "/pages/site/province/province",
    })
  },

  //获取店铺信息
  getShop: function() {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Agent/getProfile',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (e) {
        console.log('公司信息：',e)
        if(e.data.status == '1'){
          that.setData({
            agent_info: e.data.data,
            imgUrl: apiUrl + e.data.data.license
          })
        }
      }
    })
  },

  //获取省市区数据
  getCity() {
    let that = this
    if (wx.getStorageSync("cityData")){
      console.log('有省市区数据')
    }else{
      wx.request({
        url: apiUrl + '/Api/Linkage/getAll',
        header: {
          'content-type': 'application/json',
          'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (e) {
          console.log('城市数据', e)
          if (e.data.status == '1') {
            //存储省市区数据
            wx.setStorageSync("cityData", e.data.data);
          }
        }
      })
    }
    
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