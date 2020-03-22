// pages/clerk/clerk.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    dataList: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    if (this.data.id) {
      this.getData()
    }
  },

  xiaoshu: function() {
    wx.navigateTo({
      url: '../recordMarket/recordMarket?id=' + this.data.id,
    })
  },

  //编辑
  goUp: function() {
    
    wx.navigateTo({
      url: '../clerkUp/clerkUp?id=' + this.data.id + '&username=' + this.data.dataList.username,
    })
  },

  //积分
  jifen: function() {
    wx.navigateTo({
      url: '../recordIntegral/recordIntegral?id=' + this.data.id,
    })
  },

  //删除
  del: function () {
    let that = this
    wx.showModal({
      title: '提示',
      content: '你确定删除改店员吗',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: apiUrl + '/Api/AgentEmploy/delEmploy?id=' + that.data.id,
            header: {
              'content-type': 'application/json',
              'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              console.log('删除回调：', res)
              if (res.data.status == '1') {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1000,
                  mask: true
                })
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1500) 
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })

        } else if (res.cancel) {
          console.log('取消删除')
        }
      }
    })
  },

  getData: function() {

    let that = this
    wx.request({
      url: apiUrl + '/Api/AgentEmploy/getEmploy?id=' + this.data.id,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('店员详情：', res)
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