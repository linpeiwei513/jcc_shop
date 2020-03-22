// pages/agencyDetails/agencyDetails.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    ageData: '',
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options:', options)
    this.setData({
      id: options.id
    })
    if(this.data.id){
      this.getData()
    }
  },

  //编辑代理
  goUp: function() {
    wx.navigateTo({
      url: '../agencyUp/agencyUp?id='+this.data.id+'&discount='+this.data.ageData.discount,
    })
  },

  //获取代理资料
  getData: function() {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Agent/getAgentInfo?agent_id=' + this.data.id,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('代理详情：', res)
        if (res.data.status == '1') {
          that.setData({
            ageData: res.data.data,
            imgUrl: apiUrl + res.data.data.license
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