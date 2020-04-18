// pages/supply/add/add.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
const iconUrl = app.globalData.iconUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconUrl: iconUrl,
    dataList: [],
    dataListNew: [],
    totalPrice: 0,
    isNum: false,
    index: '',
    newNum: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //确定
  submitData: function() {
    if(this.data.dataListNew.length < 1){
      wx.showToast({
        title: '请添加商品',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let datas = JSON.stringify(this.data.dataListNew)
    console.log('提交数据：', datas)
    let that = this
    wx.request({
      url: apiUrl + '/Api/Invoice/addIn',
      data: {
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
        console.log('新增回调：', res)
        if (res.data.status == '1') {
          wx.showToast({
            title: '新增成功',
            icon: 'success',
            duration: 1000,
            mask: true
          })
          setTimeout(function () {
            wx.navigateBack({
              delta:1
            })
          }, 1000)

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

  addGoods: function() {
    wx.navigateTo({
      url: '../../goods/selectList/selectList',
    })
  },

  //删除
  delGoods: function(e) {
    //console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    let newArr = this.data.dataList;
    newArr.splice(index,1)
    this.setData({
      dataList: newArr
    })
    this.setGoodstData()
  },

  //加
  btnJia: function(e) {
    app.openLo(); //加载动画
    let index = e.currentTarget.dataset.index;
    let newArr = this.data.dataList;
    if(newArr[index].num > 1000){
      wx.showToast({
        title: '商品数量不能小于1000',
        icon: 'none',
        duration: 2000
      })
      return
    }else{
      newArr[index].num = newArr[index].num + 1
    }
    this.setData({
      dataList: newArr
    })
    app.closeLo();  //关闭动画
    this.setGoodstData()
  },

  //减
  btnJian: function(e) {
    app.openLo(); //加载动画
    let index = e.currentTarget.dataset.index;
    let newArr = this.data.dataList;
    if(newArr[index].num == 1){
      wx.showToast({
        title: '商品数量不能小于1',
        icon: 'none',
        duration: 2000
      })
      return
    }else{
      newArr[index].num = newArr[index].num - 1
    }
    this.setData({
      dataList: newArr
    })
    app.closeLo();  //关闭动画
    this.setGoodstData()
  },

 


  //一键获取补货
  oneSupply: function() {
    app.openLo(); //加载动画
    let that = this
    wx.request({
      url: apiUrl + '/Api/Invoice/addInForSales',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('补货列表：', res)
        app.closeLo();  //关闭动画
        if (res.data.status == '1'  && res.data.data.length > 0) {
          let data = res.data.data
          let newList = that.data.dataList
          for(var i=0; i<data.length; i++){
            newList.push({
              goodsId: data[i].goods_id, 
              goodsName: data[i].goods_name,
              guigeId: data[i].spec_id,
              guigeName: data[i].spec_name,
              num: 1,
              price: data[i].price
            })
          }
          that.setData({
            dataList: newList
          })
          that.setGoodstData()
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


  //获取缓存中添加的数据 wx.getStorageSync("sessionID")
  getSessionData: function() {
    console.log('缓存数据：',wx.getStorageSync("selectGoods"))
    let selectData = wx.getStorageSync("selectGoods")
    let newList = this.data.dataList
    if(selectData){
      for(var i=0; i< selectData.length; i++){
        newList.push(selectData[i])
      }
      this.setData({
        dataList: newList
      })
      //删除缓存
      wx.removeStorageSync("selectGoods")
      this.setGoodstData()
    }

  },

  //重组数据
  setGoodstData: function() {
    app.openLo(); //加载动画
    let newList = this.data.dataList
    let newArr = []
    let newPrice = 0
    for(var i=0; i<newList.length; i++){
      newPrice = Number(newPrice) + Number(newList[i].price) * newList[i].num; 
      newArr.push(this.getArr(newList[i].goodsId,newList[i].guigeId,newList[i].num))
    }
    newPrice = (newPrice).toFixed(2) //总价格
    this.setData({
      totalPrice: newPrice,
      dataListNew: newArr
    })
    app.closeLo();  //关闭动画
  },

  //提交数据结构模板
  getArr: function(goodsId,guigeId,num) {
    return {
      id: goodsId +'_'+ guigeId,
      qty: num
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
    let index = e.currentTarget.dataset.index;
    let newArr = this.data.dataList;
    let newNum = newArr[index].num
    this.setData({
      isNum: true,
      index: index,
      newNum: newNum
    })
  },

  //确定修改数量
  updateNum: function() {
    let index = this.data.index;
    let newArr = this.data.dataList;
    let num = newArr[index].num
    if(num < 1 || num ==' '){
      wx.showToast({
        title: '商品数量至少为1',
        icon: 'none',
        duration: 2000
      })
      num = 1
    }
    newArr[index].num = num
    this.setData({
      dataList: newArr,
      isNum: false
    })
    this.setGoodstData()
  },

   //输入数量
   formNum: function(e) {
    let index = this.data.index;
    let newArr = this.data.dataList;
    let num = e.detail.value;
    newArr[index].num = num
    this.setData({
      dataList: newArr
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
    console.log('执行了')
    this.getSessionData()
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