// pages/agencyUp/agencyUp.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    discountList: '',
    discountIndex: 0,
    discount: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('id:',options.id)
    console.log('discount:',options.discount)
    this.setData({
      id: options.id,
      discount: options.discount
    })
    this.getZk()
  },


  //确定
  submitData: function() {
    let that = this
    if (this.data.password && this.data.password.length < 6) {
      wx.showToast({
        title: '请输入不少于6个字符的密码',
        icon: 'none',
        duration: 2000
      })
      return
    }

    wx.request({
      url: apiUrl + '/Api/Agent/editAgent',
      data: {
        id: that.data.id,
        password: that.data.password,
        discount: that.data.discount
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
        }
      }
    })

  },

  getpassword: function(e){
    this.setData({
      password: e.detail.value
    })
  },

  //选择折扣
  binZk: function(e) {
    this.setData({
      discountIndex: e.detail.value,
      discount:this.data.discountList[e.detail.value]
    })
    //console.log(this.data.discount)
  },

  //获取折扣规则
  getZk: function() {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Agent/getAddConfig',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('规则：', res)
        if(res.data.status == '1'){
          that.getZhekou(res.data.data.min_discount)
        }
      }
    })
  },

  //格式化折扣选项
  getZhekou: function(val) {
    let zkList = []
    for(var i=val; i<101; i++){
      zkList.push(i) 
    }
    for(var i=0; i<zkList.length; i++){
      //console.log(zkList[i])
      if(this.data.discount == zkList[i]){
        this.setData({
          discountIndex: i
        })
      }
    }
    console.log('discountIndex:', this.data.discountIndex)
    this.setData({
      discountList: zkList
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