const app = getApp()
const apiUrl = app.globalData.apiUrl;
const iconUrl = app.globalData.iconUrl;
const WxParse = require('../../../wxParse/wxParse.js'); //解析html 
Page({
  data: {
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    imgUrl: apiUrl,
    goodsId: '',
    goodsData: '',
  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      goodsId: options.id
    })
    this.getGoodsShow()
  },


  //获取商品详情
  getGoodsShow: function() {
    app.openLo()
    let that = this
    wx.request({
      url: apiUrl + '/Api/Vshop/getGoodsInfo?goods_id=' + that.data.goodsId,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('商品详情：', res)
        wx.stopPullDownRefresh() //停止刷新动画
        app.closeLo()
        if (res.data.status == '1') {

          that.setData({
            goodsData: res.data.data
          })
          WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
          
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



  goAffirm: function() {
    app.setCache('goodsData',this.data.goodsData)
    wx.navigateTo({
      url: '../affirm/affirm',
    })
  },


  // 显示遮罩层 
  showModal: function() {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 300, //动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快 
      timingFunction: 'ease', //动画的效果 默认值是linear 
    })
    this.animation = animation
    setTimeout(function() {
      that.fadeIn(); //调用显示动画 
    }, 200)
  },
 
  // 隐藏遮罩层 
  hideModal: function() {
    var that = this;
    var animation = wx.createAnimation({
      duration: 300, //动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快 
      timingFunction: 'ease', //动画的效果 默认值是linear 
    })
    this.animation = animation
    that.fadeDown(); //调用隐藏动画 
    setTimeout(function() {
      that.setData({
        hideModal: true
      })
    }, 320) //先执行下滑动画，再隐藏模块 
  },
 
  //动画集 
  fadeIn: function() {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性 
    })
  },
  fadeDown: function() {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },




})
