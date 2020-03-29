// pages/goodsList/goodsList.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
const iconUrl = app.globalData.iconUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    navList: 0,
    skip: 0,
    limit: 10,
    isStop: 0,
    showNav: '',
    imgUrl: apiUrl,
    iconUrl: iconUrl,
    keywords: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getGoodsType()
    wx.startPullDownRefresh() //执行下拉刷新操作
  },


  //前往消数
  goxiaoshu: function(e) {
    console.log(e.currentTarget.dataset.item)
    let item = e.currentTarget.dataset.item
    if(e.currentTarget.dataset.item.spec_arr){
      console.log('有规格')
      let item = JSON.stringify(e.currentTarget.dataset.item);
      wx.navigateTo({
        url: '../guigeList/guigeList?item='+item,
      })
    }else{
      console.log('没有规格')
      wx.navigateTo({
        url: '../addXiaoshu/addXiaoshu?goods_id='+item.id+'&goods_name='+item.name+'&spec_id=0&key_name=&my_onhand='+item.my_onhand,
      })
    }
    
  },

  //选择分类
  onType: function(e) {
    let id = e.currentTarget.dataset['index']
    this.setData({
      showNav: id
    })
    wx.startPullDownRefresh() //执行下拉刷新操作
  },
  //全部
  onTypeQb: function() {
    this.setData({
      showNav: ''
    })
    wx.startPullDownRefresh() //执行下拉刷新操作
  },

  //搜索
  getSo: function() {
    wx.showToast({
      title: '获取信息中...',
      icon: 'loading',
      duration: 500
    })
    this.setData({
      dataList: [],
      skip: 0
    })
    this.getGoodsList();
  },

  //搜索输入
  formSo: function (e) {
    //console.log(e)
    this.setData({
      keywords: e.detail.value
    })
  },

  //获取商品列表
  getGoodsList: function(){
    let that = this
    wx.request({
      url: apiUrl + '/Api/Goods/getGoods?skip=' + that.data.skip + '&limit=' + that.data.limit + '&catid=' + that.data.showNav +'&keywords='+that.data.keywords,
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
          that.setData({
            navList: res.data.data,
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})