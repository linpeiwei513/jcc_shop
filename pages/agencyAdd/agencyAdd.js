// pages/agencyAdd/agencyAdd.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {    
    rank_list: '',
    rankList: '',
    rankIndex: 0,
    discountList: '',
    discountIndex: 0,
    rank: '',
    discount: '',
    username: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRule()
    
  },

  //确定提交
  submitData: function() {

    let that = this;
    if (this.data.username == '' || this.data.username.length < 3 ){
      wx.showToast({
        title: '请输入不少于3个字符的用户名',
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
    wx.request({
      url: apiUrl + '/Api/AgentEmploy/addEmploy',
      data: {
        username: that.data.username,
        password: that.data.password,
        rank: that.data.rank,
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
        console.log('新增回调：', res)
        if (res.data.status == '1') {
          wx.showToast({
            title: '新增成功',
            icon: 'success',
            duration: 1000,
            mask: true
          })
          setTimeout(function () {
            wx.reLaunch({
              url: '../agencyList/agencyList'　　// 页面 A
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

  getusername: function(e){
    this.setData({
      username: e.detail.value
    })
  },

  getpassword: function(e){
    this.setData({
      password: e.detail.value
    })
  },

  //选择等级
  binDj: function(e) {
    this.setData({
      rankIndex: e.detail.value,
      rank: this.data.rank_list[e.detail.value].id
    })
    //console.log(this.data.rank)
  },

  //选择折扣
  binZk: function(e) {
    this.setData({
      discountIndex: e.detail.value,
      discount:this.data.discountList[e.detail.value]
    })
    //console.log(this.data.discount)
  },

  //获取规则
  getRule: function() {

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
          that.getDengji(res.data.data.rank_list)
          that.getZhekou(res.data.data.min_discount)
          that.setData({
            rank_list: res.data.data.rank_list,
            rank: res.data.data.rank_list[0].id,
            discount:res.data.data.min_discount[0]
          })

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
    this.setData({
      discountList: zkList
    })
    //console.log('折扣：', this.data.discountList)
  },
  //格式化等级
  getDengji: function(list) {
    let djList = []
    for(var i=0; i<list.length; i++){
      djList.push(list[i].name)
    }
    this.setData({
      rankList: djList
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