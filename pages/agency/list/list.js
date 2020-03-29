// pages/agencyList/agencyList.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: '',
    skip: 0,
    limit: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },


  //获取代理列表
  getList: function() {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Agent/getSubAgents?skip=' + this.data.skip + '&limit=' + this.data.limit,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('代理列表：', res)
        if(res.data.status == '1'){
          that.setData({
            listData: res.data.data
          })
        }
      }
    })
  },


  //新增代理
  goAdd: function() {
    wx.navigateTo({
      url: '../add/add',
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