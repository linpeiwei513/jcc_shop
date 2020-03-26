// pages/goodsList/goodsList.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: '',
    navList: '',
    skip: 0,
    limit: 10,
    showNav: '',
    imgUrl:apiUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '获取信息中...',
      icon: 'loading',
      duration: 500
    })
    this.getGoodsType()
    
  },


  //前往消数
  goxiaoshu: function(e) {
    console.log(e)
    let item = JSON.stringify(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '../addXiaoshu/addXiaoshu?item='+item,
    })
  },

  //选择分类
  onType: function(e) {
    wx.showToast({
      title: '获取信息中...',
      icon: 'loading',
      duration: 500
    })
    let id = e.currentTarget.dataset['index']
    this.setData({
      showNav: id
    })
    this.getGoodsList(id)
  },

  //获取商品列表
  getGoodsList: function(id){
    let that = this
    wx.request({
      url: apiUrl + '/Api/Goods/getGoods?skip=' + that.data.skip + '0&limit=' + that.data.limit + '&catid=' + id +'&keywords=',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('商品列表：', res)
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


  //获取商品分类
  getGoodsType: function() {

    let that = this
    wx.request({
      url: apiUrl + '/Api/Goods/getCats',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('商品分类：', res)
        if (res.data.status == '1') {
          that.setData({
            navList: res.data.data,
            showNav: res.data.data[1].id
          })
          that.getGoodsList(res.data.data[1].id)
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




  goAdd: function() {
    wx.navigateTo({
      url: '../goodsAdd/goodsAdd',
    })
  },

  goYijian: function() {
    wx.navigateTo({
      url: '../yijian/yijian',
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