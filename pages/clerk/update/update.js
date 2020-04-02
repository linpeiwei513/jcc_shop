// pages/clerkUp/clerkUp.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    array: ['禁用', '启用'],
    status: 1,
    username: '',
    password: '',
    realname: '',
    mobile: '',
    qq: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
      username: options.username
    })
  },


  submitData: function () {
    let that = this
    if (this.verify()) {

      wx.request({
        url: apiUrl + '/Api/AgentEmploy/editEmploy',
        data: {
          username: that.data.username,
          password: that.data.password,
          realname: that.data.realname,
          mobile: that.data.mobile,
          status: that.data.status,
          id: that.data.id
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
            //返回上一步
            setTimeout(function () {
              wx.navigateBack({
                delta:1
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
    }

  },


  //校验
  verify: function () {


    if (this.data.password > 0 && this.data.password.length < 6) {
      wx.showToast({
        title: '请输入不少于6个字符的密码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    return true
  },


  getpassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  getrealname: function (e) {
    this.setData({
      realname: e.detail.value
    })
  },

  getmobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  getqq: function (e) {
    this.setData({
      qq: e.detail.value
    })
  },

  bindPickerChange: function (e) {
    this.setData({
      status: e.detail.value
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