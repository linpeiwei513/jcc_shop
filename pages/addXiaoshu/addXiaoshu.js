// pages/addXiaoshu/addXiaoshu.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: '',
    sale_num: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = JSON.parse(options.item);
    console.log('闯过来：', item)
    this.setData({
      dataList: item
    })
  },

  //确定消数
  submitData: function() {
    let that = this
    if(that.data.sale_num == ''){
      wx.showToast({
        title: '请输入消数数量',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (that.data.sale_num < 1) {
      wx.showToast({
        title: '消数数量不能小于1',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.request({
      url: apiUrl + '/Api/Goods/goodsSale',
      data: {
        goods_id: that.data.dataList.id,
        spec_id: that.data.dataList.spec_id,
        sale_num: that.data.sale_num
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('消数回调：', res)
        if (res.data.status == '1') {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.reLaunch({
              url: '../goodsList/goodsList'　　// 页面 A
            })
          }, 1000)


        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          return
        }
      }
    })

  },


  //消数输入
  getNum: function (e) {
    console.log(e)
    this.setData({
      sale_num: e.detail.value
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