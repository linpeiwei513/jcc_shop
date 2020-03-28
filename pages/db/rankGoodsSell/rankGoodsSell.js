// pages/db/rankUserSell/rankUserSell.js
const app = getApp()
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start_date: '开始时间',
    end_date: '结束时间',
    dateS: '2000-01-01',
    dateE: '2020-03-28',

    listData: '',
    skip: 0,
    limit: 20,

    imgUrl: app.globalData.apiUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initializeDate()
    this.getData()
  },


  //获取排行数据
  getData: function () {
    wx.showToast({
      title: '获取信息中...',
      icon: 'loading',
      duration: 500
    })
    let that = this
    wx.request({
      url: apiUrl + '/Api/Statics/myGoodsSales?skip=' + that.data.skip + '&limit=' + that.data.limit + '&start_date=' + that.data.start_date + '&end_date=' + that.data.end_date,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('列表数据：', res)
        if (res.data.status == '1') {
          that.setData({
            listData: res.data.data
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




  //选择开始时间
  bindDateChangeS: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      start_date: e.detail.value
    })
  },
  //选择结束时间
  bindDateChangeE: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      end_date: e.detail.value
    })
  },

  //初始化时间
  initializeDate: function () {

    //获取当前日期
    var myDate = new Date();
    var nowY = myDate.getFullYear();
    var nowM = myDate.getMonth() + 1;
    var nowD = myDate.getDate();
    var enddate = nowY + "-" + (nowM < 10 ? "0" + nowM : nowM) + "-" + (nowD < 10 ? "0" + nowD : nowD);//当前日期

    //获取三十天前日期
    var lw = new Date(myDate - 1000 * 60 * 60 * 24 * 30);//最后一个数字30可改，30天的意思
    var lastY = lw.getFullYear();
    var lastM = lw.getMonth() + 1;
    var lastD = lw.getDate();
    var startdate = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD);

    this.setData({
      dateS: startdate,
      dateE: enddate,
      start_date: startdate,
      end_date: enddate
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