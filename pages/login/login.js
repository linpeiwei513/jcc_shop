// pages/login/login.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  getLogin: function() {
    console.log('账号：',this.data.username)
    console.log('密码：',this.data.password)
    let that = this

    if (this.data.username == '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.password == '' || this.data.password.length < 6) {
      wx.showToast({
        title: '请输入不小于六位数密码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.showToast({
      title: '登录中...',
      icon: 'loading',
      duration: 5000
    })

    wx.request({
      url: apiUrl + '/Api/Member/onLogin',
      data: {
        username: that.data.username,
        password: that.data.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID='+wx.getStorageSync("sessionID")
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('登录回调：',res)
        if(res.data.status == '1'){
            //跳转到首页
            wx.switchTab({
              url: '/pages/home/home',
            })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          return
        }
      }
    })
  },

  //获取输入账号
  formName: function(e) {
    //console.log(e)
    this.setData({
      username: e.detail.value
    })
  },
  //获取输入的密码
  formPass: function(e) {
    //console.log(e)
    this.setData({
      password: e.detail.value
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