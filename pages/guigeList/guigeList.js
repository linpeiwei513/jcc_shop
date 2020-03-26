// pages/guigeList/guigeList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: '',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = JSON.parse(options.item);
    console.log('闯过来：', item)
    this.setData({
      dataList: item
    })
  },

  //前往消数
  goxiaoshu: function(e) {
    console.log(e.currentTarget.dataset.item)
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../addXiaoshu/addXiaoshu?goods_id='+this.data.dataList.id+'&goods_name='+this.data.dataList.name+'&spec_id='+item.id+'&key_name='+item.key_name,
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