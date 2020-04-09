// pages/mall/order/order.js
const app = getApp()
const apiUrl = app.globalData.apiUrl;
const iconUrl = app.globalData.iconUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:apiUrl,
    listData: [],
    skip: 0,
    limit: 10,
    isStop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //获取兑换列表
  getList: function() {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Vshop/myOrderList?skip=' + this.data.skip + '&limit=' + this.data.limit,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('兑换列表：', res)
        wx.stopPullDownRefresh() //停止刷新动画
        if(res.data.status == '1'){
          let newList = that.data.listData
          let newSkip = that.data.skip + res.data.data.length


          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].newDate = app.formattingDate(res.data.data[i].add_time);
            newList.push(res.data.data[i])
          }
          that.setData({
            listData: newList,
            skip: newSkip,
            isStop: res.data.data.length
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



  goOrderS: function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../orderShow/orderShow?orderId='+e.currentTarget.dataset.id+'&type=2',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("正在下拉刷新");
    this.setData({
      listData: [],
      skip: 0
    })
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面上拉触底数组");
    if (this.data.isStop != 0) {
      this.getList();
    }

  },


   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.startPullDownRefresh() //执行下拉刷新操作
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})