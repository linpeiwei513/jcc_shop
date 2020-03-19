//app.js
App({


  data: {
    apiUrl: 'https://fyt.test.fastcmf.com'
  },


  onLaunch: function () {
    let that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

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
              url: that.data.apiUrl + '/Api/Member/wxLogin/code/' + res.code,
              header: {
                'content-type': 'application/json',
                'Cookie': 'PHPSESSID='+sessionid
              },
              method: 'GET',
              dataType: 'json',
              responseType: 'text',
              success: function (e) {
                console.log('返回数据：',e)
                let loginCode = e.data.data.loginCode
                let userOpenid = e.data.data.userOpenid
                let sessionID = e.data.data.sessionID
                
                if(sessionID){
                  that.setSession(sessionID)
                }

                // wx.setStorageSync("cookieKey", e.header["Set-Cookie"]);


                if(loginCode == 200){
                  //如果sessionID存在则存到缓存中

                  if (e.data.data.userInfo.is_initial == '0'){
                    //跳转到修改密码
                    wx.reLaunch({
                      url: '/pages/password/password',
                    })
                    return
                  }else{
                    //储存用户信息
                    wx.setStorageSync("userInfo", e.data.data.userInfo);
                    //存储代理商信息
                    wx.setStorageSync("agent_info", e.data.data.agent_info);
                    
                    //跳转到首页
                    // wx.switchTab({
                    //   url: '/pages/home/home',
                    // })
                  }
                  
                } else if(loginCode == 201){
                  //将openid存到缓存
                  wx.setStorageSync('openid', userOpenid)
                  //跳转到登录页面
                  wx.reLaunch({
                    url: '/pages/login/login',
                  })
                }
              },
              fail: function(err){
                console.log('请求失败：',err)
              }
            })
          }
        })

      }
    })


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
                linsfhas .userInfoReadyCallbackadficall
              }
            }
          })
        }
      }
    })
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







  globalData: {
    userInfo: null,
    apiUrl: 'https://fyt.test.fastcmf.com'
  }
})