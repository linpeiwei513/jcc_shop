// pages/mall/list/list.js
const app = getApp()
const apiUrl = app.globalData.apiUrl;
const iconUrl = app.globalData.iconUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconUrl: iconUrl,
    imgUrl: apiUrl,
    sx: 0,
    tuijian: false,
    dataList: [],
    navList: 0,
    skip: 0,
    limit: 10,
    isStop: 0,
    is_recommend: 0,
    catid: '',
    keywords: '',
    listorder: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      catid: options.id
    })
    this.onPullDownRefresh()
  },

  //是否推荐
  onTuijian: function() {
    app.openLo()
    if(this.data.is_recommend == 0){
      this.setData({
        is_recommend: 1,
        tuijian: true
      })
    }else{
      this.setData({
        is_recommend: 0,
        tuijian: false
      })
    }

    this.getGoodsList()

  },

  //排序
  onSx: function() {
    app.openLo()
    if(this.data.sx == 1){
      this.setData({
        sx: 2,
        listorder: 'ASC',
      })
    }else{
      this.setData({
        sx: 1,
        listorder: 'DESC',
      })
    }
    this.getGoodsList()
  },



  //获取列表
  getGoodsList: function() {
    console.log('catid:',this.data.catid)
    let that = this
    wx.request({
      url: apiUrl + '/Api/Vshop/getGoodsList?skip=' + that.data.skip + '&limit=' + that.data.limit + '&is_recommend='+that.data.is_recommend+'&catid='+that.data.catid+'&keywords='+that.data.keywords+'&listorder='+that.data.listorder,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('商品列表：', res)
        wx.stopPullDownRefresh() //停止刷新动画
        app.closeLo()
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





  goGoods: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../goods/goods?id='+e.currentTarget.dataset.id,
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
    console.log("正在下拉刷新");
    this.setData({
      dataList: [],
      skip: 0
    })
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面上拉触底数组");
    if (this.data.isStop != 0) {
      this.getGoodsList();
    }

  },
})