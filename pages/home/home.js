// pages/home/home.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerData: [],
    xilieData: [],
    actData: [],
    imgUrl: app.globalData.apiUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanner()
    this.getXilie()
    this.getAct()
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
        //console.log('banner数据：', res)
        if (res.data.status == '1') {
          that.setData({
            bannerData: res.data.data
          })
        }
      }
    })
  },

  //获取活动
  getAct: function() {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Content/getAdData?ad_id=2',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        //console.log('act数据：', res)
        if (res.data.status == '1') {
          that.setData({
            actData: res.data.data
          })
        }
      }
    })
  },

  //获取系列
  getXilie: function() {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Goods/getSeries',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('系列数据：', res)
        if (res.data.status == '1') {
          that.setData({
            xilieData: res.data.data
          })
        }
      }
    })
  },

  //系列跳转
  goGoodsList: function(e) {
    //console.log(e.currentTarget.dataset.id)
    wx.setStorageSync("seriesid", e.currentTarget.dataset.id);
    wx.switchTab({
      url: '../goods/goodsList/goodsList',
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
      url: '../goods/goodsList/goodsList'
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
      url: '../clerk/list/list',
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
      url: '../db/index/index',
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
      url: '../agency/list/list',
    })
  },

  //放款返现
  gofangkuan: function () {
    wx.navigateTo({
      url: '../fangkuan/index/index',
    })
  }


})