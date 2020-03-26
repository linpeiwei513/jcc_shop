//index.js
//获取应用实例
const app = getApp()
const apiUrl = app.globalData.apiUrl;
//const iconUrl = app.globalData.iconUrl;
Page({
  data: { 
    motto: 'Hello World',
    iconUrl: 'http://lbdj.oss-cn-beijing.aliyuncs.com/lbdj_app_h5/page/cwz/', //图标阿里云地址
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userData: '',
    agentData: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //退出
  getExit: function() {

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
        console.log('退出回调：', res)
        if (res.data.status == '1') {
          //清除缓存
          wx.removeStorageSync("sessionID")
          wx.removeStorageSync("openid")
          wx.removeStorageSync("userInfo")
          wx.removeStorageSync("agent_info")
          wx.removeStorageSync("loginStatus")
          wx.setStorageSync('lo', 0)
					//返回首页
          wx.redirectTo({
            url: '../welcome/welcome?id=1'
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

  onLoad: function () {


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
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


    this.getUserData()
  },

  //积分记录
  gointegral: function() {
    wx.navigateTo({
      url: '../mine/integral/integral',
    })
  },

  //消数记录
  goxiaoshu: function() {
    wx.navigateTo({
      url: '../mine/xiaoshu/xiaoshu',
    })
  },

  //收货地址
  goAddress: function() {
    wx.navigateTo({
      url: '../mine/address/list/list',
    })
  },

  //获取用户信息 agent_info wxUserInfo
  getUserData: function() {
    this.setData({
      userData: wx.getStorageSync("userInfo"),
      agentData: wx.getStorageSync("agent_info"),
      userInfo: wx.getStorageSync("wxUserInfo"),
    })
    console.log('用户信息：',this.data.userData)
  },

  //公司信息
  goShop: function() {
    wx.navigateTo({
      url: '../shop/shop'
    })
  },

  //修改密码
  goMima: function() {
    wx.navigateTo({
      url: '../password/password'
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
