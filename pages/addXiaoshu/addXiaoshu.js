// pages/addXiaoshu/addXiaoshu.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: '',
    sale_num: '',
    goods_id: '',
    goods_name: '',
    spec_id: '',
    key_name: '',
    my_onhand: '',
    index: 0,
    item: [],
    type: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('闯过来type：', options.type)

    if(options.type == 1){
      this.setData({
        item: '',
        index: '',
        goods_id: options.goods_id,
        goods_name: options.goods_name,
        spec_id: options.spec_id,
        key_name: options.key_name,
        my_onhand: options.my_onhand,
        type: options.type
      })
    }else if(options.type == 2){
      let index = options.index
      let item = app.getCache('xiaoshuItem')
      console.log('闯过来item：', item)
      this.setData({
        item: item,
        index: index,
        goods_id: item.id,
        goods_name: item.name,
        spec_id: item.spec_arr[index].id,
        key_name: item.spec_arr[index].key_name,
        my_onhand: item.spec_arr[index].my_onhand,
        type: options.type
      })
    }


    
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
    if (that.data.sale_num > that.data.my_onhand) {
      wx.showToast({
        title: '消数数量不能大于库存'+that.data.my_onhand,
        icon: 'none',
        duration: 2000
      })
      return
    }
    

    wx.request({
      url: apiUrl + '/Api/Goods/goodsSale',
      data: {
        goods_id: that.data.goods_id,
        spec_id: that.data.spec_id,
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
          if(that.data.type == 2){
            let itemNew = that.data.item
            //console.log('itemNew:',itemNew)
            itemNew.spec_arr[that.data.index].my_onhand =  parseInt(that.data.item.spec_arr[that.data.index].my_onhand) - parseInt(that.data.sale_num)
            app.setCache('xiaoshuItem',itemNew)
          }
          
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