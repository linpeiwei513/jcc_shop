// pages/mall/orderShow/orderShow.js
const app = getApp()
const apiUrl = app.globalData.apiUrl;
const iconUrl = app.globalData.iconUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    type: '',
    orderData: '',
    imgUrl: apiUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      orderId: options.orderId,
      type: options.type
    })
    this.getOrderData()
  },

  //支付
  goPay: function() {
    wx.showToast({
      title: '支付中...',
      icon: 'loading',
      duration: 10000
    })
    let that = this
    wx.request({
      url: apiUrl + '/Api/Vshop/payOrder?order_id=' + that.data.orderId,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('支付回调：', res)
        app.closeLo()
        if (res.data.status == '1') {

          wx.showToast({
            title: '支付成功',
            icon: 'none',
            duration: 2000
          })

          that.getOrderData()
          
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


  //获取订单详情
  getOrderData: function() {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Vshop/getOrderInfo?order_id=' + that.data.orderId,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('订单详情：', res)
        app.closeLo()
        if (res.data.status == '1') {

          that.setData({
            orderData: res.data.data
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
    if(this.data.type == 1){
      wx.switchTab({
        url: '../../mall/index/index',
      })
    }
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