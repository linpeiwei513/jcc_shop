// pages/clerkList/clerkList.js
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
    this.getData()
  },

  //获取列表数据
  getData: function() {
    let that = this
    wx.request({
      url: apiUrl + '/Api/AgentEmploy/getEmployList?skip=' + this.data.skip + '&limit=' + this.data.limit,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('代理列表：', res)
        if (res.data.status == '1') {
          that.setData({
            listData: res.data.data
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


  //新增
  goAdd: function() {
    wx.navigateTo({
      url: '../add/add',
    })
  },

  //详情
  goDetails: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../details/details?id='+e.currentTarget.dataset.id,
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