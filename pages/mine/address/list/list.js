// pages/mine/address/list/list.js
const app = getApp()
const apiUrl = app.globalData.apiUrl;
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    skip: 0,
    limit: 7,
    id: '',
    isStop: 0,
    type: '', //跳转来源1：确认订单，2：个人中心
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startPullDownRefresh() //执行下拉刷新操作
    this.setData({
      type: options.type
    })
  },


  //选择收货地址
  goAffirm: function(e) {
    if(this.data.type == 1){
      console.log(e.currentTarget.dataset.item)
      let item = e.currentTarget.dataset.item
      app.setCache('addressOn', item)
      app.openLo()
      setTimeout(function () {
        wx.navigateBack({
          delta:1
        })
      }, 500) 
    } 
  },


  //新增收货地址
  goAdd: function() {
    wx.navigateTo({
      url: '../add/add',
    })
  },
  //编辑收货地址
  goUpdate: function (e) {
    //console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../update/update?id=' + e.currentTarget.dataset.id,
    })
  },


  //获取地址列表
  getAddressList: function() {   
    let that = this
    let newList = that.data.listData
    wx.request({
      url: apiUrl + '/Api/Member/myAddress?skip=' + this.data.skip + '&limit=' + this.data.limit,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        wx.stopPullDownRefresh() //停止刷新动画
        console.log('地址列表：', res)
        if (res.data.status == '1') {
          
          for(var i=0; i<res.data.data.length; i++){
            newList.push(res.data.data[i])
          }
          let newSkip = that.data.skip + res.data.data.length

          that.setData({
            listData: newList,
            skip: newSkip,
            isStop: res.data.data.length
          })
        }
      }
    })

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
    this.getAddressList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { 
    console.log("页面上拉触底数组");
    if(this.data.isStop != 0){
      this.getAddressList();
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})