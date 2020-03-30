// pages/goods/selectList/selectList.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
const iconUrl = app.globalData.iconUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:apiUrl,
    iconUrl: iconUrl,
    array: [],
    index: 0,
    dataList: [],
    skip: 0,
    limit: 10,
    isStop: 0,
    keywords: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getGoodsType();
    
  },

  //获取商品列表
  getGoodsList: function(){
    let that = this
    wx.request({
      url: apiUrl + '/Api/Goods/getGoods?skip=' + that.data.skip + '&limit=' + that.data.limit + '&catid=' + that.data.array[that.data.index].id +'&keywords='+that.data.keywords,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('商品列表：', res.data.data)
        wx.stopPullDownRefresh() //停止刷新动画
        if (res.data.status == '1') {

          let newList = that.data.dataList
          let newSkip = that.data.skip + res.data.data.length
          for (var i = 0; i < res.data.data.length; i++) {
            newList.push(res.data.data[i])
          }
          that.setData({
            dataList: newList,
            skip: newSkip,
            isStop: res.data.data.length
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
          let arrayNew = [{id: '', name:'全部'}]
          for(var i=0; i<res.data.data.length; i++){
            arrayNew.push(res.data.data[i])
          }

          that.setData({
            array: arrayNew,
          })
          that.getGoodsList();
          console.log('新分类：',arrayNew)
          //for(var i=0; i<)
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



  //选择分类
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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