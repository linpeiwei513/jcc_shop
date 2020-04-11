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
    newNum: '',
    dailiList: [],
    dailiIndex: 0,
    dailiName: '请选择代理',
    dailiId: '' 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDaili()
  },

  //选择代理
  bindPickerChange: function(e) {
    console.log('id', this.data.dailiList[e.detail.value].id)
    console.log('value', e.detail.value)
    let id = this.data.dailiList[e.detail.value].id
    let name = this.data.dailiList[e.detail.value].username
    this.setData({
      dailiIndex: e.detail.value,
      dailiId: id,
      dailiName: name
    })
  },

  //确定
  submitData: function() {
    if(this.data.dailiId == ''){
      wx.showToast({
        title: '请选择代理',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(this.data.dataListNew.length < 1){
      wx.showToast({
        title: '请添加清单',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let datas = JSON.stringify(this.data.dataListNew)
    console.log('提交数据：', datas)
    let that = this
    wx.request({
      url: apiUrl + '/Api/Rebate/addRebate',
      data: {
        in_id: that.data.dailiId,
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

  //添加清单
  addReceipts: function(e) {
    if(this.data.dailiId == ''){
      wx.showToast({
        title: '请选择代理',
        icon: 'none',
        duration: 2000
      })
      return
    }else{
      wx.navigateTo({
        url: '../selectList/selectList?id='+this.data.dailiId,
      })
    }
    
  },

  //删除
  delReceipts: function(e) {
    //console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    let newArr = this.data.dataList;
    newArr.splice(index,1)
    this.setData({
      dataList: newArr
    })
    this.setGoodstData()
  },

 

 


  //获取缓存中添加的数据 wx.getStorageSync("sessionID")
  getSessionData: function() {
    console.log('缓存数据：',wx.getStorageSync("selectFx"))
    let selectData = wx.getStorageSync("selectFx")
    let newList = this.data.dataList
    if(selectData){
      for(var i=0; i< selectData.length; i++){
        newList.push(selectData[i])
      }
      this.setData({
        dataList: newList
      })
      //删除缓存
      wx.removeStorageSync("selectFx")
      this.setGoodstData()
    }

  },

  //重组数据
  setGoodstData: function() {
    app.openLo(); //加载动画
    let newList = this.data.dataList
    let newArr = []

    for(var i=0; i<newList.length; i++){
      newArr.push(this.getArr(newList[i].id))
    }
    this.setData({
      dataListNew: newArr
    })
    app.closeLo();  //关闭动画
  },

  //提交数据结构模板
  getArr: function(id) {
    return {
      id: id,
    }
  },


  

  //获取待返现下级代理
  getDaili: function() {
    app.openLo()
    let that = this
    wx.request({
      url: apiUrl + '/Api/Rebate/getAgentByRebate',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('代理列表：', res)
        app.closeLo()
        if(res.data.status == '1'){
          that.setData({
            dailiList: res.data.data,
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