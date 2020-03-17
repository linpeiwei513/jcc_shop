// pages/password/password.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    passwordNew: '',
    passwordNews: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //获取输入旧密码
  formPassOld: function (e) {
    //console.log(e)
    this.setData({
      password: e.detail.value
    })
  },

  //获取输入密码
  formPass: function (e) {
    //console.log(e)
    this.setData({
      passwordNew: e.detail.value
    })
  },
  //获取再次输入密码
  formPassNew: function (e) {
    //console.log(e)
    this.setData({
      passwordNews: e.detail.value
    })
  },

  //确认修改
  getSubmit: function () {
    console.log('新密码：',this.data.passwordNew)
    console.log('确认新密码：', this.data.passwordNews)
    console.log('确认新密码11：', this.data.passwordNew.length)

    let that = this
    if (this.data.password == '') {
      wx.showToast({
        title: '请输入旧密码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.passwordNew == '' || this.data.passwordNew.length<6){
      wx.showToast({
        title: '请输入不小于六位数新密码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.passwordNews == '' || this.data.passwordNews.length < 6) {
      wx.showToast({
        title: '请再次输入不小于六位数新密码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.passwordNew != this.data.passwordNews){
      wx.showToast({
        title: '输入的密码不一致',
        icon: 'none',
        duration: 2000
      })
      return
    }

    wx.request({
      url: apiUrl+'/Api/Member/updatePassword',
      data: {
        old_password: that.data.password,
        new_password: that.data.passwordNew,
        confirm_password: that.data.passwordNews
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('修改密码回调：', res)
        if(res.data.status == '1'){
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            //跳转到首页
            wx.switchTab({
              url: '/pages/home/home',
            })
          }, 2000) 
          
          
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