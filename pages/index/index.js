//index.js
//获取应用实例
const app = getApp()
const apiUrl = app.globalData.apiUrl;
const iconUrl = app.globalData.iconUrl;
const is_manager = app.globalData.is_manager;
Page({
  data: { 
    motto: 'Hello World',
    iconUrl: iconUrl, //图标阿里云地址
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userData: '',
    agentData: '',
    loSta: 0,
    userType: '',
    is_manager: '',
    ceshi: ''
  },

  onLoad: function () {
    console.log('userInfo:', this.data.canIUse)
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {

        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          ceshi: res
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log('555')
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
    

  },

  //初始化
  chushi: function() {
    console.log('is_manager:',wx.getStorageSync("is_manager"))
    this.setData({
      is_manager: wx.getStorageSync("is_manager"),
    })
    let lo = wx.getStorageSync("lo")
    if(lo == 0){
      this.setData({
        loSta: 0
      })
    }else if(lo == 1){
      this.setData({
        loSta: 1
      })
      this.getUserDatas()
    }
  },

  //登录
  getUserInfo: function(e) {
    app.openLo()
    app.accreditLogin()
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  

  //获取用户信息 agent_info wxUserInfo
  getUserDatas: function() {
    app.openLo()
    let that = this
    wx.request({
      url: apiUrl + '/Api/Member/getProfile',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('用户数据：', res)
        app.closeLo()
        if (res.data.status == '1') {
          that.setData({
            userData: res.data.data,
            //userInfo: wx.getStorageSync("wxUserInfo"),
          })
        }
      }
    })

  },

  

  //退出
  getExit: function() {
    let that = this
    app.openLo()
    wx.request({
      url: apiUrl + '/Api/Member/logout',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        app.closeLo()
        console.log('退出回调：', res)
        if (res.data.status == '1') {
          //清除缓存 is_manager
          wx.removeStorageSync("sessionID")
          wx.removeStorageSync("openid")
          wx.removeStorageSync("userInfo")
          wx.removeStorageSync("agent_info")
          wx.removeStorageSync("loginStatus")
          wx.removeStorageSync("is_manager")
          wx.setStorageSync('lo', 0)
          that.chushi()
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

  //公司信息
  goShop: function() {
    if(this.hint()){
      wx.navigateTo({
        url: '../shop/shop'
      })
    }
    
  },

  //修改密码
  goMima: function() {
    if(this.hint()){
      wx.navigateTo({
        url: '../password/password'
      })
    }
    
  },

  //修改资料
  goZiliao: function() {
    if(this.hint()){
      wx.navigateTo({
        url: '../mine/updatedb/updatedb',
      })
    }
    
  },

  //前往店铺信息
  goShop: function() {
    if(this.hint()){
      wx.navigateTo({
        url: '../shop/shop'
      })
    }
    
  },

  //店员
  goClerk: function() {
    if(this.hint()){
      wx.navigateTo({
        url: '../clerk/list/list',
      })
    }
    
  },

 //统计
 goStatistics: function() {
  if(this.hint()){
    wx.navigateTo({
      url: '../db/index/index',
    })
  }
  
},
  //下级代理
  goAgency: function () {
    if(this.hint()){
      wx.navigateTo({
        url: '../agency/list/list',
      })
    }
    
  },

  //放款返现
  gofangkuan: function () {
    if(this.hint()){
      wx.navigateTo({
        url: '../fangkuan/index/index',
      })
    }
    
  },

  //兑换记录
  goDuihuan: function() {
    if(this.hint()){
      wx.navigateTo({
        url: '../mall/order/order',
      })
    }
    
  },

  //提示登录
  hint: function() {
    if(this.data.loSta == 0){
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    return true
  },

  //补货单
  goBuhuo: function() {
    if(this.hint()){
      wx.navigateTo({
        url: '../recordStock/recordStock',
      })
    }
    
  },

  //销货单
  goXiaohuo: function() {
    if(this.hint()){
      wx.navigateTo({
        url: '../recordSales/recordSales',
      })
    }
    
  },



  //积分记录
  gointegral: function() {
    if(this.hint()){
      wx.navigateTo({
        url: '../mine/integral/integral',
      })
    }
    
  },

  //消数记录
  goxiaoshu: function() {
    if(this.hint()){
      wx.navigateTo({
        url: '../mine/xiaoshu/xiaoshu',
      })
    }
    
  },

  //收货地址
  goAddress: function() {
    if(this.hint()){
      wx.navigateTo({
        url: '../mine/address/list/list?type=2',
      })
    }
    
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    this.chushi()
    

  },
})
