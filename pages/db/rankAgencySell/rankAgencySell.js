// pages/db/rankUserSell/rankUserSell.js
const app = getApp()
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    start_date: '开始时间',
    end_date: '结束时间',
    dateS: '2000-01-01',
    dateE: '2020-03-28',

    listData: [],
    skip: 0,
    limit: 10,
    isStop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.initializeDate()
    wx.startPullDownRefresh() //执行下拉刷新操作
  },


  //获取排行数据
  getData: function () {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Statics/subAgentSales?skip=' + that.data.skip + '&limit=' + that.data.limit + '&start_date=' + that.data.start_date + '&end_date=' + that.data.end_date,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        wx.stopPullDownRefresh() //停止刷新动画
        console.log('列表数据：', res)
        if (res.data.status == '1') {

          let newList = that.data.listData
          let newSkip = that.data.skip + res.data.data.length
          for (var i = 0; i < res.data.data.length; i++) {
            newList.push(res.data.data[i])
          }
          that.setData({
            listData: newList,
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

    //获取一年前日期
    var lw = new Date(myDate - 1000 * 60 * 60 * 24 * 365);//最后一个数字365可改，365天的意思
    var lastY = lw.getFullYear();
    var lastM = lw.getMonth() + 1;
    var lastD = lw.getDate();
    var startDay = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD);

    this.setData({
      dateS: startDay,
      dateE: enddate,
      start_date: startdate,
      end_date: enddate
    })

  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("正在下拉刷新");
    this.setData({
      listData: [],
      skip: 0
    })
    this.getData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面上拉触底数组");
    if (this.data.isStop != 0) {
      this.getData();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})