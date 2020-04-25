// pages/recordSales/recordSales.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: '',
    skip: 0,
    limit: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  //查看详情
  goDetails: function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../stockDetails/stockDetails?id='+e.currentTarget.dataset.id+'&type=1',
    })
  },

  //补货
  goAdd: function(){
    wx.navigateTo({
      url: '../supply/add/add',
    })
  },

  //获取列表
  getDataList: function () {

    let that = this
    wx.request({
      url: apiUrl + '/Api/Invoice/getMyInList?skip=' + that.data.skip + '0&limit=' + that.data.limit,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('补货列表：', res)
        if (res.data.status == '1') {
          that.setData({
            dataList: res.data.data,

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
    this.getDataList()
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