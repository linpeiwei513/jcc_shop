// pages/welcome/welcome.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loginStatue: '0',
    good: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('状态:',wx.getStorageSync("lo"))
    console.log('sessionID:', wx.getStorageSync("sessionID"))

    if (wx.getStorageSync("lo")){
      this.setData({
        loginStatue: wx.getStorageSync("lo"),
        good: wx.getStorageSync("good")
      })
    }
    
    wx.showToast({
      title: '获取信息中...',
      icon: 'loading',
      duration: 2000
    })

    if (wx.getStorageSync("sessionID")) {
      
      if (this.data.loginStatue == '1' && this.data.good == 1) {
        //跳转到首页
        wx.switchTab({
          url: '/pages/home/home',
        })
      }else{
        this.getLoginState()
      }

    }else{
      //this.accreditLogin()
      if(this.data.loginStatue == '1'&& this.data.good == 1){
        //跳转到首页
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
    }

    

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log('微信信息：',res.userInfo)
              wx.setStorageSync("wxUserInfo", res.userInfo);
            }
          })
        }
      }
    })
  },

  bindGetUserInfo: function (e) {
    wx.showToast({
      title: '登录中...',
      icon: 'loading',
      duration: 2000
    })
    this.accreditLogin()
  },

  //获取用户登录状态
  getLoginState: function () {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Member/checkLogin',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('登录状态：', res)
        if (res.data.status == '1') {
          wx.setStorageSync('lo', 1)
          that.setData({
            loginStatue: 1
          })
          that.accreditLogin()
        } else {
          wx.setStorageSync('lo', 0)
          that.setData({
            loginStatue: 0
          })
        }
      }
    })
  },

  //授权登录
  accreditLogin: function () {
    
    let that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //判断登录
        wx.login({
          success(res) {
            console.log('code：', res.code)

            var sessionid = wx.getStorageSync("sessionID");
            sessionid = sessionid ? sessionid : '';
            console.log('sessionid：', sessionid)
            //将code存到缓存中  
            wx.setStorageSync('Code', res.code)
            wx.request({
              url: apiUrl + '/Api/Member/wxLogin/code/' + res.code,
              header: {
                'content-type': 'application/json',
                // 'Cookie': 'PHPSESSID=' + sessionid
              },
              method: 'GET',
              dataType: 'json',
              responseType: 'text',
              success: function (e) {
                console.log('返回数据11：', e)
                let loginCode = e.data.data.loginCode
                let userOpenid = e.data.data.userOpenid
                let sessionID = e.data.data.sessionID

                wx.setStorageSync('lo', 1)

                if (sessionID) {
                  that.setSession(sessionID)
                }

                if (loginCode == 200) {
                  //如果sessionID存在则存到缓存中

                  if (e.data.data.userInfo.is_initial == '0') {
                    //跳转到修改密码
                    wx.reLaunch({
                      url: '/pages/password/password',
                    })
                    return
                  } else {
                    //储存用户信息
                    wx.setStorageSync("userInfo", e.data.data.userInfo);
                    //存储代理商信息
                    wx.setStorageSync("agent_info", e.data.data.agent_info);
                    wx.setStorageSync('good', 1)
                    //跳转到首页
                    wx.switchTab({
                      url: '/pages/home/home',
                    })
                  }

                } else if (loginCode == 201) {
                  //将openid存到缓存
                  wx.setStorageSync('openid', userOpenid)
                  //跳转到登录页面
                  wx.reLaunch({
                    url: '/pages/login/login',
                  })
                }
              },
              fail: function (err) {
                console.log('请求失败：', err)
              }
            })
          }
        })

      }
    })


    // 获取用户信息
    // wx.getSetting({
    //   success: res => {

    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //             linsfhas.userInfoReadyCallbackadficall
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },

  //将sessionID存缓存
  setSession: function (value) {
    wx.setStorageSync("sessionID", value);
  },
  //在缓存中取Session
  getSession: function () {
    return wx.getStorageSync("sessionID")
  },
  //删除缓存Session
  removeSession: function () {
    wx.removeStorageSync("sessionID")
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