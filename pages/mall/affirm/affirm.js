// pages/mall/affirm/affirm.js
const app = getApp()
const apiUrl = app.globalData.apiUrl;
const iconUrl = app.globalData.iconUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconUrl: iconUrl,
    imgUrl: apiUrl,
    addressData: '',
    isNum: false,
    goodsData: '',
    num: 1,
    numNew: 1,
    jifen: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCacheGoods()
  },

  //提交订单
  submitOrder: function() {
    app.openLo()
    let that = this
    let dataObj = [{
      goods_id: that.data.goodsData.id,
      quantity: that.data.num
    }]
    let datas = JSON.stringify(dataObj)
    wx.request({
      url: apiUrl+'/Api/Vshop/addOrder',
      data: {
        address: that.data.addressData.id,
        datas: datas
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('提交订单回调：', res)
        if(res.data.status == '1'){
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          
        }else{
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

  //前往地址列表
  goAddress: function() {
    wx.navigateTo({
      url: '../../mine/address/list/list?type=1',
    })
  },

  //获取默认收货地址
  getAddressDefault: function() {
    app.openLo()
    let that = this
    wx.request({
      url: apiUrl + '/Api/Member/myAddress?skip=0&limit=20',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        app.closeLo()
        console.log('地址列表：', res)
        if (res.data.status == '1') {
          for(var i=0; i<res.data.data.length; i++){
            if(res.data.data[i].is_default == 1){
              that.setData({
                addressData: res.data.data[i]
              })
            }
          }
        }
      }
    })
  },


  //获取缓存地址
  getCacheAddress: function() {
    //console.log('缓存地址：',app.getCache('addressOn'))
    let addressNew = app.getCache('addressOn')
    if(addressNew){
      this.setData({
        addressData: addressNew
      })
    }else{
      this.getAddressDefault()
    }
  },

  //获取缓存商品
  getCacheGoods: function() {
    let goodsNew = app.getCache('goodsData')
    this.setData({
      goodsData: goodsNew
    })
    this.getCount()
  },

  //计算总积分
  getCount: function() {
    let jifenNew = this.data.num * this.data.goodsData.credits
    this.setData({
      jifen: jifenNew
    })
  },

  //加
  btnJia: function() {
    let numNew = parseInt(this.data.num) + 1
    if(numNew > parseInt(this.data.goodsData.onhand)){
      wx.showToast({
        title: '库存不足',
        icon: 'none',
        duration: 2000
      })
      return
    }else{
      this.setData({
        num: numNew
      })
      this.getCount()
    }
  },

  //减
  btnJian: function() {
    let numNew = parseInt(this.data.num) - 1
    if(numNew <= 0){
      wx.showToast({
        title: '商品数量不能小于1',
        icon: 'none',
        duration: 2000
      })
      return
    }else{
      this.setData({
        num: numNew
      })
      this.getCount()
    }
  },


  //关闭数量输入
  closeNum: function() {
    this.setData({
      isNum: false
    })
  },

  //打开数量输入
  shownum: function(e) {
    this.setData({
      isNum: true,
      numNew: this.data.num
    })
  },

  //确定修改数量
  updateNum: function() {
    this.setData({
      isNum: false
    })
    let numNew = parseInt(this.data.numNew)
    if(numNew <= 0){
      wx.showToast({
        title: '商品数量不能小于1',
        icon: 'none',
        duration: 2000
      })
      return
    }else if(numNew > parseInt(this.data.goodsData.onhand)){
      wx.showToast({
        title: '库存不足',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      num: this.data.numNew
    })
    this.getCount()
  },

  //输入数量
  formNum: function(e) {
    let num = e.detail.value;
    this.setData({
      numNew: num
    })
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCacheAddress()
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