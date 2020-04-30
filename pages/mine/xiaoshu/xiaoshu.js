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
    id: '',
    isStop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        id: options.id
      })
    }

    wx.startPullDownRefresh() //执行下拉刷新操作
  },


  //获取列表
  getDataList: function () {

    let that = this
    let newList = that.data.dataList
    wx.request({
      url: apiUrl + '/Api/Member/mySalesLog?skip=' + that.data.skip + '0&limit=' + that.data.limit + '&id=' + that.data.id,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('消数列表：', res)
        wx.stopPullDownRefresh() //停止刷新动画
        if (res.data.status == '1') {

          for(var i=0; i<res.data.data.length; i++){
            res.data.data[i].newDate = app.formattingDate(res.data.data[i].add_time);
          }

          for (var i = 0; i < res.data.data.length; i++) {
            newList.push(res.data.data[i])
          }
          let newSkip = that.data.skip + res.data.data.length

          that.setData({
            dataList: newList,
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.startPullDownRefresh() //执行下拉刷新操作
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
    console.log("正在下拉刷新");
    this.setData({
      dataList: [],
      skip: 0
    })
    this.getDataList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面上拉触底数组");
    if (this.data.isStop != 0) {
      this.getDataList();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})