// pages/mall/index/index.js
const app = getApp()
const apiUrl = app.globalData.apiUrl;
const iconUrl = app.globalData.iconUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:apiUrl,
    iconUrl: iconUrl,
    bannerData: [],
    navData: [],
    goodsData: [],
    loSta: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  //登录
  getUserInfo: function(e) {
    app.openLo()
    app.accreditLogin()
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //获取商品列表
  getGoodsList: function() {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Vshop/getGoodsList?skip=0&limit=10&is_recommend=&catid=&keywords=&listorder="DESC"',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('商品列表：', res)
        app.closeLo()
        if (res.data.status == '1') {

          that.setData({
            goodsData: res.data.data,

          })
          
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  //获取商品分类
  getGoodsNav: function() {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Vshop/getCats',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('商品分类数据：', res)
        if (res.data.status == '1') {
          that.setData({
            navData: res.data.data
          })
        }
      }
    })
  },

  //获取banner
  getBanner: function() {

    let that = this
    wx.request({
      url: apiUrl + '/Api/Content/getAdData?ad_id=3',
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

  //跳转商品详情
  goShow: function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../goods/goods?id='+e.currentTarget.dataset.id,
    })
  },

  //跳转列表
  goList: function (e) {
    wx.navigateTo({
      url: '../list/list?id='+e.currentTarget.dataset.id,
    })
  },


  goGoods: function () {
    wx.navigateTo({
      url: '../goods/goods',
    })
  },

  goHelp: function() {
    wx.navigateTo({
      url: '../help/help',
    })
  },

  goCart: function() {
    wx.navigateTo({
      url: '../cart/cart',
    })
  },

  goOrder: function() {
    wx.navigateTo({
      url: '../order/order',
    })
  },

  goJifen: function() {
    wx.navigateTo({
      url: '../integral/integral',
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
    let lo = wx.getStorageSync("lo")
    if(lo == 0){
      this.setData({
        loSta: 0
      })
    }else if(lo == 1){
      this.setData({
        loSta: 1
      })
      this.getBanner()
      this.getGoodsNav()
      this.getGoodsList()
    }
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