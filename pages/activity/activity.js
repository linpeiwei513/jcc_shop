// pages/activity/activity.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: '',
    listData: '',
    listId: '',
    url: app.globalData.apiUrl,
    navClass: 0,
    skip: 0,
    limit: 10
  },

  /**
   * 生命周期函数--监听页面加载  https://fyt.test.fastcmf.com/Api/Content/getPos/posid/2
   */
  onLoad: function (options) {
    var that = this

    wx.request({
      url: apiUrl + '/Api/Content/getCats',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data.data)
        that.setData({
          navList:res.data.data
        })
          
        
      }
    })

    this.getTui()



  },

  //内容详情
  goShow: function(e) {
    console.log(e.currentTarget.dataset.item)
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../activityDetails/activityDetails?catid=' + item.catid + '&dataid=' + item.dataid,
    })
  },




  //获取列表
  getList: function(e) {
    var that = this
    let val = e.currentTarget.dataset['index'];
    let num = e.currentTarget.dataset['num'];
    console.log(val)

    wx.request({
      url: apiUrl + '/Api/Content/getList/catid/'+val+'/skip/'+that.data.skip+'/limit/'+that.data.limit,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log('数据：',res.data.data)
        that.setData({
          listData:res.data.data,
          listId: val,
          navClass: num
        })
      }
    })


  },

  getTui: function() {
    var that = this
    wx.request({
      url: apiUrl + '/Api/Content/getPos/posid/2',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log('数据：',res.data.data)
        that.setData({
          listData:res.data.data,
        })
      }
    })
  },

  getDw: function(e) {
    wx.showToast({
      title: '处理中',
      icon: 'loading',
      duration:30000,
      mask: true
    })
    var that = this
    let val = e.currentTarget.dataset['url'];
    console.log(val)
    wx.downloadFile({
      url: apiUrl + val, //仅为示例，并非真实的资源
      success (res) {
        console.log('下载：',res)
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: function (res){
            const savedFilePath = res.savedFilePath;
            // 打开文件
            wx.openDocument({
              filePath: savedFilePath,
              success: function (res) {
                console.log('打开文档成功')
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration:800,
                  mask: true
                })
              },
            });
          },
          fail: function (err) {
            console.log('保存失败：', err)
            wx.showToast({
              title: '保存失败',
              icon: 'none',
              duration:800,
              mask: true
            })
          }
        })



        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        // if (res.statusCode === 200) {
        //   wx.playVoice({
        //     filePath: res.tempFilePath
        //   })
        // }
      }
    })
  },


  //下拉刷新
  onPullDownRefresh: function() {
    console.log("正在下拉刷新");
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