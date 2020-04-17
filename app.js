//app.js
App({


  data: {
    apiUrl: 'https://fyt2.test.fastcmf.com',
    loginStatue: '0',
    good: 0
  },
  globalData: {
    userInfo: null,
    apiUrl: 'https://fyt2.test.fastcmf.com',
    iconUrl: 'http://lbdj.oss-cn-beijing.aliyuncs.com/lbdj_app_h5/page/cwz/', //图标阿里云地址
    loginStatue: '0',
    good: 0
  },

  onLaunch: function () {
    let that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs) 
    this.inspectLogin()
  },

  

  //检查登录
  inspectLogin: function() {
    console.log('状态:',wx.getStorageSync("lo"))
    console.log('sessionID:', wx.getStorageSync("sessionID"))
    if (wx.getStorageSync("lo")){
      this.globalData.loginStatue = wx.getStorageSync("lo");
      this.globalData.good = wx.getStorageSync("good");
    }
    if (wx.getStorageSync("sessionID")){
      if (this.globalData.loginStatue != '1' && this.globalData.good != 1) {
        this.getLoginState()
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

  //获取用户登录状态
  getLoginState: function () {
    var that = this
    wx.request({
      url: that.data.apiUrl + '/Api/Member/checkLogin',
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
          that.globalData.loginStatue = 1
          that.accreditLogin()
        } else {
          wx.setStorageSync('lo', 0)
          that.globalData.loginStatue = 0
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
              url: that.globalData.apiUrl + '/Api/Member/wxLogin/code/' + res.code,
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


  //写入缓存公共方法
  setCache: function(name,value) {
    wx.setStorageSync(name, value);
  },
  //读取缓存公共方法
  getCache: function(name) {
    return wx.getStorageSync(name);
  },
  //删除缓存公共方法
  delCache: function(name) {
    return wx.removeStorageSync(name);
  },



  //公共POST方法
  _post: function (url, data,cb) {
    var that = this;
    that._isInLine(() => {
      wx.request({
        url: that.data.apiUrl + url,
        data: Object.assign({}, {}, data),
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID='+wx.getStorageSync("sessionID")
        },
        success: function (res) {
          
        }
      })
    })
  },

  //格式化时间戳
  formattingDate: function (timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  },

  //加载动画
  openLo: function() {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000
    })
  },

  //关闭动画
  closeLo: function(){
    wx.hideToast()
  },





  
})