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
    keywords: '',
    seriesid: 0,
    typeList: [],
    typeIndex: 0,
    xilieList: [],
    xilieIndex: 0,
    loSta: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getGoodsType()
    this.getXilie()

  },

  //登录
  goLogin: function(){
    app.openLo()
    app.accreditLogin()
  },


  //补货
  goSupply: function() {
    wx.navigateTo({
      url: '../../supply/add/add',
    })
  },

  //销货
  goSales: function() {
    wx.navigateTo({
      url: '../../sales/add/add',
    })
  },


  //前往消数
  goxiaoshu: function(e) {
    console.log(e.currentTarget.dataset.item)
    let item = e.currentTarget.dataset.item
    if(e.currentTarget.dataset.item.spec_arr){
      console.log('有规格')
      let item = JSON.stringify(e.currentTarget.dataset.item);
      wx.navigateTo({
        url: '../../guigeList/guigeList?item='+item,
      })
    }else{
      console.log('没有规格')
      wx.navigateTo({
        url: '../../addXiaoshu/addXiaoshu?goods_id='+item.id+'&goods_name='+item.name+'&spec_id=0&key_name=&my_onhand='+item.my_onhand,
      })
    }
    
  },

  //选择分类
  bindPickerChange: function(e) {
     let id = this.data.typeList[e.detail.value].id
     let index = e.detail.value
      this.setData({
        showNav: id,
        dataList: [],
        skip: 0,
        typeIndex: index,
      })
      wx.showToast({
        title: '获取信息中...',
        icon: 'loading',
        duration: 500
      })
      this.getGoodsList();
  },

  //选择系列
  bindPickerChangeXl: function(e) {
    let id = this.data.typeList[e.detail.value].id
    let index = e.detail.value
     this.setData({
      seriesid: id,
       dataList: [],
       skip: 0,
       xilieIndex: index,
     })
     wx.showToast({
       title: '获取信息中...',
       icon: 'loading',
       duration: 500
     })
     this.getGoodsList();
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
      url: apiUrl + '/Api/Goods/getGoods?skip=' + that.data.skip + '&limit=' + that.data.limit + '&catid=' + that.data.showNav +'&keywords='+that.data.keywords +'&seriesid='+that.data.seriesid,
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
          let arrayNew = [{id: '0', name:'全部分类'}]
          for(var i=0; i<res.data.data.length; i++){
            arrayNew.push(res.data.data[i])
          }
          that.setData({
            typeList: arrayNew,
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


  //获取系列
  getXilie: function() {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Goods/getSeries',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('商品系列：', res)
        if (res.data.status == '1') {
          let arrayNew = [{id: '0', name:'全部系列'}]
          for(var i=0; i<res.data.data.length; i++){
            arrayNew.push(res.data.data[i])
          }
          that.setData({
            xilieList: arrayNew,
          })

          let id = wx.getStorageSync("seriesid")
          console.log('系列id',id)
          if(id){
            console.log('系列id22222',id)
            for(var i=0; i<that.data.xilieList.length; i++){
              console.log('id1:',that.data.xilieList[i].id)
              if(that.data.xilieList[i].id == id){
                console.log('i:',i)
                that.setData({
                  seriesid: id,
                  xilieIndex: i
                })
              }
            }
            wx.removeStorageSync("seriesid")
          }



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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    let lo = wx.getStorageSync("lo")
    if(lo == 0){
      this.setData({
        loSta: 0
      })
    }else if(lo == 1){
      this.setData({
        loSta: 1
      })
      this.getGoodsList();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})