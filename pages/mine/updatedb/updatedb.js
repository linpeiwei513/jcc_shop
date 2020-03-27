// pages/mine/updatedb/updatedb.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realname: '',
    mobile: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //确定
  submitData: function() {
    let that = this
    if (this.data.realname == '' || this.data.realname.length < 2) {
      wx.showToast({
        title: '请输入不少于2个字符的真实姓名',
        icon: 'none',
        duration: 2000
      })
      return
    }

    wx.showToast({
      title: '处理中...',
      icon: 'loading',
      duration: 5000
    })

    wx.request({
      url: apiUrl + '/Api/Member/updateProfile',
      data: {
        realname: that.data.realname,
        mobile: that.data.mobile,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('修改回调：', res)
        if (res.data.status == '1') {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000,
            mask: true
          })
          
          setTimeout(function () {
            wx.switchTab({
              url: '../../index/index',
            })
          }, 1000)

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)

        }
      }
    })

  },

  //名字输入
  getrealname: function (e) {
    this.setData({
      realname: e.detail.value
    })
  },
  //手机输入
  getmobile: function (e) {
    this.setData({
      mobile: e.detail.value
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