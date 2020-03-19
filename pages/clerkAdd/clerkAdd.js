// pages/clerkAdd/clerkAdd.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['禁用','启用' ],
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

  },


  //新增
  submitData: function() {
    let that = this
    if (this.verify()){

      wx.request({
        url: apiUrl + '/Api/AgentEmploy/addEmploy',
        data: {
          username: that.data.username,
          password: that.data.password,
          realname: that.data.realname,
          mobile: that.data.mobile,
          qq: that.data.qq,
          status: that.data.status
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log('新增回调：', res)
          if (res.data.status == '1') {
            wx.showToast({
              title: '新增成功',
              icon: 'success',
              duration: 1000,
              mask: true
            })

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
  verify: function() {
    if (this.data.username == '' || this.data.username.length < 3 ){
      wx.showToast({
        title: '请输入不少于3个字符的用户名',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.realname == '' || this.data.realname.length < 2) {
      wx.showToast({
        title: '请输入不少于2个字符的真实姓名',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.mobile == '') {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.qq == '') {
      wx.showToast({
        title: '请输入微信号',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.password == '' || this.data.password.length < 6) {
      wx.showToast({
        title: '请输入不少于6个字符的密码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    return true
  },


  getusername:function(e) {
    this.setData({
      username: e.detail.value
    })
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