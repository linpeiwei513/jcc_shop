// pages/salesDetails/salesDetails.js

const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: '',
    goodsData: '',
    imgUrl: '',
    id: '',
    is_manager: '',
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('id:',options.id)
    this.setData({
      is_manager: wx.getStorageSync("is_manager")
    })
    wx.showToast({
      title: '获取信息中...',
      icon: 'loading',
      duration: 500
    })
    this.setData({
      id: options.id,
      imgUrl: apiUrl,
      type: options.type
    })
    this.getData()
  },

  //确认收货
  submitDataShouhuo: function() {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Invoice/confirmIn?bill_no=' + this.data.id,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('确认收货：', res)
        if (res.data.status == '1') {
          wx.showToast({
            title: '确认成功',
            icon: 'success',
            duration: 1000,
            mask: true
          })
          that.getData()
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  //审核通过
  submitData: function(){
    let that = this
    wx.request({
      url: apiUrl + '/Api/Invoice/confirmInvoice?bill_no=' + this.data.id,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('确认审核：', res)
        if (res.data.status == '1') {
          wx.showToast({
            title: '审核成功',
            icon: 'success',
            duration: 1000,
            mask: true
          })
          that.getData()
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  //获取详情
  getData: function() {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Invoice/detail?bill_no=' + this.data.id,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('订单详情：', res)
        if (res.data.status == '1') {
          that.setData({
            orderData: res.data.data,
            goodsData: res.data.data.item_info
          })
        }else{
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
    if(this.data.type == 2){
      wx.navigateBack({
        delta:2
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