// pages/goods/selectList/selectList.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
const iconUrl = app.globalData.iconUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:apiUrl,
    iconUrl: iconUrl,
    array: [],
    index: 0,
    dataList: [],
    skip: 0,
    limit: 10,
    isStop: 0,
    keywords: '',
    newArr: [],
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getGoodsType()
    
  },

  //确定
  submitData: function() {

    wx.showToast({
      title: '处理中...',
      icon: 'loading',
      duration: 1000
    })

    //将选择数据存入缓存
    wx.setStorageSync("selectGoods", this.data.newArr);

    setTimeout(function () {
      wx.navigateBack({
        delta:1
      })
    }, 1000)

  },

  //重组数据
  setSelectData: function() {

    let oldData = this.data.dataList
    let newData = []

    for(var i=0; i<oldData.length; i++){
      if(oldData[i].spec_arr.length > 0){
        for(var j=0; j<oldData[i].spec_arr.length; j++){
          if(oldData[i].spec_arr[j].isSelect == true){
            newData.push(this.getArr(
              oldData[i].name,
              oldData[i].spec_arr[j].key_name,
              oldData[i].spec_arr[j].goods_id,
              oldData[i].spec_arr[j].id,
              oldData[i].spec_arr[j].price
            ))
          }
        }
      }else if(oldData[i].spec_arr.length < 1){
        if(oldData[i].isSelect == true){
          newData.push(this.getArr(oldData[i].name,'无',oldData[i].id,0,oldData[i].shop_price))
        }
      }
    }
    //console.log('提交：',newData)
    this.setData({
      newArr: newData,
      totalNum: newData.length
    })

  },

  //创建数组模板
  getArr: function(goodsName,guigeName,goodsId,guigeId,price) {
    return {
      goodsName: goodsName,
      guigeName: guigeName,
      goodsId: goodsId,
      guigeId: guigeId,
      price: price,
      num: 1
    }
  },


  //勾选规格
  checkboxChangeLi: function(e){
    //console.log('选中:',e)
    let newData = this.data.dataList
    if(e.detail.value.length>0){
      for(var i=0; i<newData[e.currentTarget.dataset.index].spec_arr.length; i++){
        if(newData[e.currentTarget.dataset.index].spec_arr[i].id == e.currentTarget.dataset.id){
          newData[e.currentTarget.dataset.index].spec_arr[i].isSelect = true
        }
      }
      this.setData({
        dataList: newData
      })
    }else if(e.detail.value.length<1){
      for(var i=0; i<newData[e.currentTarget.dataset.index].spec_arr.length; i++){
        if(newData[e.currentTarget.dataset.index].spec_arr[i].id == e.currentTarget.dataset.id){
          newData[e.currentTarget.dataset.index].spec_arr[i].isSelect = false
        }
      }
      this.setData({
        dataList: newData
      })
    }
    //console.log('haha:',this.data.dataList)
    this.setSelectData()
  },

  //勾选主类
  checkboxChange: function(e) {
    //console.log('选中id:',e.currentTarget.dataset.id)
    //console.log('选中状态:',e.detail.value)
    let newData = this.data.dataList
    if(e.detail.value.length>0){
      for(var i=0; i<newData.length; i++){
        if(newData[i].id == e.currentTarget.dataset.id) {
          newData[i].isSelect = true
          if(newData[i].spec_arr.length > 0){
            for(var j=0; j<newData[i].spec_arr.length; j++){
              newData[i].spec_arr[j].isSelect = true
            }
          }
        }
      }
      this.setData({
        dataList: newData
      })
    }else if(e.detail.value.length < 1){
      for(var i=0; i<newData.length; i++){
        if(newData[i].id == e.currentTarget.dataset.id) {
          newData[i].isSelect = false
          if(newData[i].spec_arr.length > 0){
            for(var j=0; j<newData[i].spec_arr.length; j++){
              newData[i].spec_arr[j].isSelect = false
            }
          }
        }
      }
      this.setData({
        dataList: newData
      })
    }
    this.setSelectData()
  },


  //获取商品列表
  getGoodsList: function(){
    let that = this
    wx.request({
      url: apiUrl + '/Api/Goods/getGoods?skip=' + that.data.skip + '&limit=' + that.data.limit + '&catid=' + that.data.array[that.data.index].id +'&keywords='+that.data.keywords,
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('商品列表：', res.data.data)
        wx.stopPullDownRefresh() //停止刷新动画
        if (res.data.status == '1') {

          let newList = that.data.dataList
          let newSkip = that.data.skip + res.data.data.length

          for(var i=0; i<res.data.data.length; i++){
            res.data.data[i].isSelect = false
            if(res.data.data[i].spec_arr.length > 0){
              for(var j=0; j<res.data.data[i].spec_arr.length; j++){
                res.data.data[i].spec_arr[j].isSelect = false
              }
            }
            newList.push(res.data.data[i])
          }

          console.log('新列表：',newList)

          that.setData({
            dataList: newList,
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


  //获取商品分类
  getGoodsType: function() {

    let that = this
    wx.request({
      url: apiUrl + '/Api/Goods/getCats',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        //console.log('商品分类：', res)
        if (res.data.status == '1') {
          let arrayNew = [{id: '', name:'全部'}]
          for(var i=0; i<res.data.data.length; i++){
            arrayNew.push(res.data.data[i])
          }

          that.setData({
            array: arrayNew,
          })
          that.getGoodsList();
          console.log('新分类：',arrayNew)
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



  //选择分类
  bindPickerChange: function(e) {
    console.log('id', this.data.array[e.detail.value].id)
    console.log('value', e.detail.value)
    wx.showToast({
      title: '获取信息中...',
      icon: 'loading',
      duration: 500
    })
    this.setData({
      index: e.detail.value,
      dataList: [],
      skip: 0
    })
    this.getGoodsList();
  },

  //搜索
  getSo: function() {
    wx.showToast({
      title: '获取信息中...',
      icon: 'loading',
      duration: 500
    })
    this.setData({
      dataList: [],
      skip: 0
    })
    this.getGoodsList();
  },

  //搜索输入
  formSo: function (e) {
    //console.log(e)
    this.setData({
      keywords: e.detail.value
    })
  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("正在下拉刷新");
    this.setData({
      dataList: [],
      skip: 0
    })
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面上拉触底数组");
    if (this.data.isStop != 0) {
      this.getGoodsList();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})