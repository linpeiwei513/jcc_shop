// pages/fangkuan/selectList/selectList.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
const iconUrl = app.globalData.iconUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconUrl: iconUrl,
    agent_id: '',
    listData: [],
    newArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },


  //确定
  submitData: function() {
    wx.showToast({
      title: '处理中...',
      icon: 'loading',
      duration: 1000
    })
    //将选择数据存入缓存
    wx.setStorageSync("selectFx", this.data.newArr);

    setTimeout(function () {
      wx.navigateBack({
        delta:1
      })
    }, 1000)
  },


  //获取待返现清单列表
  getData: function() {
    app.openLo()
    let that = this
    wx.request({
      url: apiUrl + '/Api/Rebate/getInvoiceByRebate?agent_id='+that.data.agent_id+'&skip=0&limit=20',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('清单列表：', res)
        app.closeLo()
        if(res.data.status == '1'){
          let newList = []
          for(var i=0; i<res.data.data.length; i++){
            res.data.data[i].isSelect = false
            newList.push(res.data.data[i])
          }

          that.setData({
            listData: newList,
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

  //重组需要数据
  setSelectData: function() {

    let listArr = this.data.listData
    let listArrNew = []

    for(var i=0; i<listArr.length; i++){
      if(listArr[i].isSelect == true){
        listArrNew.push(this.getArr(
          listArr[i].id,
          listArr[i].bill_no,
          listArr[i].amount,
          listArr[i].total_qty,
          listArr[i].in_id_name,
          listArr[i].add_time,
        ))
      }
    }
    this.setData({
      newArr: listArrNew,
    })

  },


  //创建需要的模板
  getArr: function(id,no,pirce,num,name,time) {
    return {
      id: id,
      no: no,
      price: price,
      num: num,
      name: name,
      time: time
    }
  },


  //选择
  checkboxChange: function(e) {
    let newArr = this.data.listData
    let index = e.currentTarget.dataset.index
    if(e.detail.value.length>0){
      newArr[index].isSelect = true
    }else if(e.detail.value.length<1){
      newArr[index].isSelect = false
    }
    this.setData({
      listData: newArr
    })
    this.setSelectData()
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