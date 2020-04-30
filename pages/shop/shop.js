// pages/shop/shop.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityArray: [],  //选择器数组
    provinceArr: [], //省
    cityArr: [],  //区
    provinceIndex: 0,
    timeIndex: [0, 0, 0],
    agent_info: '',
    imgUrl: '',
    apiUrl: '',
    siteName: '选择地区',
    
    name: '',
    contact: '',
    mobile: '',
    district: '',
    address: '',
    license: '',
  
    cityData: '',

    tempFilePaths: '',
    imageUrl: '',
    imageUrlNew: '',
    userInfo: '',
    loSta: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShop()
    this.getCity()

    this.getCityData()
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    console.log('用户信息：',this.data.userInfo)
    
  },

  //提交信息
  submitData: function() {
    let that = this
    if (this.data.name == ''){
      wx.showToast({
        title: '请输入公司名称',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.contact == '') {
      wx.showToast({
        title: '请输入联系人',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.mobile == '') {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.district == '') {
      wx.showToast({
        title: '请选择区域',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.address == '') {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 2000
      })
      return
    }


    wx.request({
      url: apiUrl + '/Api/Agent/updateProfile',
      data: {
        name: this.data.name,
        district: this.data.district,
        address: this.data.address,
        contact: this.data.contact,
        mobile: this.data.mobile,
        license: this.data.license
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('提交回调：', res)
        if(res.data.status == '1'){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          that.getShop()
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          return
        }
      },
      fail: function (err) {
        console.log('错误：',err)
      }
    })


  },


  //上传图片
  chooseImage: function(e) {
    var that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log('回调：',res)

        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 2000,
          success: function (ress) {
            console.log('成功加载动画');
          }
        })

        that.setData({
          imageUrl: res.tempFilePaths
        })


        //获取第一张图片
        var filep = res.tempFilePaths[0]

        //上传服务器
        wx.uploadFile({
          url: apiUrl + '/Api/Index/uploadFile',
          filePath: filep,
          name: 'filename',
          formData: {
            'filename': filep
          },
          header: {
            'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
          },
          success: function (res) { 
            console.log('上传回调：', JSON.parse(res.data))
            var imgData = JSON.parse(res.data)
            that.setData({
              license: imgData.data.filepath,
              imageUrlNew: apiUrl + imgData.data.filepath
            })
          },
          fail: function (err) {
            console.log('错误：',err)
          }
        })
 
      },
    })
  },




  //选择器确定按钮
  bindMultiPickerChange: function (e) {
    console.log('确定：',e)
    this.setData({
      siteName: this.data.cityData[e.detail.value[0]].name + '-' + this.data.cityData[e.detail.value[0]].children[e.detail.value[1]].name + '-' + this.data.cityData[e.detail.value[0]].children[e.detail.value[1]].children[e.detail.value[2]].name,
      
      district: this.data.cityData[e.detail.value[0]].children[e.detail.value[1]].children[e.detail.value[2]].id
      
    })
  },


  //初始化城市数据
  getCityData: function() {
    //console.log('城市数据：', this.data.cityData)
    var province = []
    var city = []
    var district = []
    //初始化省份
    for(var i=0; i<this.data.cityData.length; i++){
      province.push(this.data.cityData[i].name)
    }
    //初始化市
    for (var i = 0; i < this.data.cityData[0].children.length; i++) {
      city.push(this.data.cityData[0].children[i].name)
    }
    //初始化区
    for (var i = 0; i < this.data.cityData[0].children[0].children.length; i++) {
      district.push(this.data.cityData[0].children[0].children[i].name)
    }
    this.setData({
      cityArray: [province, city, district],
      provinceArr: province
    })
  },

  //选择器滑动触发事件
  bindMultiPickerColumnChange: function (e) {
    console.log(e)
    var city = []
    var district = []
    if (e.detail.column == 0) {//选择省
      this.gainProvince(e.detail.value)
      this.setData({
        provinceIndex: e.detail.value
      })
    } else if (e.detail.column == 1){//选择市
      this.gainCity(this.data.provinceIndex, e.detail.value)
    }
  },

  //选择市
  gainCity: function(index,val) {
    var district = []
    //区
    for (var i = 0; i < this.data.cityData[index].children[val].children.length; i++) {
      district.push(this.data.cityData[index].children[val].children[i].name)
    }
    this.setData({
      cityArray: [this.data.provinceArr, this.data.cityArr, district]
    })
  },
  

  //选择省份
  gainProvince: function(val) {
    var city = []
    var district = []
    //市
    for (var i = 0; i < this.data.cityData[val].children.length; i++) {
      city.push(this.data.cityData[val].children[i].name)
    }
    //区
    for (var i = 0; i < this.data.cityData[val].children[0].children.length; i++) {
      district.push(this.data.cityData[val].children[0].children[i].name)
    }
    this.setData({
      cityArray: [this.data.provinceArr, city, district],
      cityArr: city
    })
  },








  

  //获取店铺信息
  getShop: function() {
    let that = this
    wx.request({
      url: apiUrl + '/Api/Agent/getProfile',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (e) {
        console.log('公司信息：',e)
        if(e.data.status == '1'){
          that.setData({
            agent_info: e.data.data,
            imgUrl: apiUrl + e.data.data.license
          })
        }
      }
    })
  },

  //获取省市区数据
  getCity() {
    let that = this
    if (wx.getStorageSync("cityData")){
      //console.log('有省市区数据：', wx.getStorageSync("cityData"))
      this.setData({
        cityData: wx.getStorageSync("cityData")
      })
    }else{
      wx.request({
        url: apiUrl + '/Api/Linkage/getAll',
        header: {
          'content-type': 'application/json',
          'Cookie': 'PHPSESSID=' + wx.getStorageSync("sessionID")
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (e) {
          console.log('城市数据', e)
          if (e.data.status == '1') {
            //存储省市区数据
            wx.setStorageSync("cityData", e.data.data);
            this.setData({
              cityData: wx.getStorageSync("cityData")
            })
          }
        }
      })
    }
    
  },

  //公司名称
  getName: function (e) {
    //console.log(e)
    this.setData({
        name: e.detail.value
    })
  },
  //联系人
  getContact: function (e) {
    //console.log(e)
    this.setData({
      contact: e.detail.value
    })
  },
  //联系电话
  getMobile: function (e) {
    //console.log(e)
    this.setData({
      mobile: e.detail.value
    })
  },
  //详细地址
  getAddress: function (e) {
    //console.log(e)
    this.setData({
      address: e.detail.value
    })
  },

//登录
getUserInfo: function(e) {
  app.openLo()
  app.accreditLogin()
  app.globalData.userInfo = e.detail.userInfo
  this.setData({
    userInfo: e.detail.userInfo,
    hasUserInfo: true
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


    let lo = wx.getStorageSync("lo")
    if(lo != 1){
      this.setData({
        loSta: 0
      })
    }else{
      this.setData({
        loSta: 1,
      })
    }

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