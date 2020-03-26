// pages/mine/address/add/add.js
const app = getApp();
const apiUrl = app.globalData.apiUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contacts: '',
    tel: '',
    division: '',
    street: '',
    postcode: '',
    is_default: 0,
    switch1Checked: false,


    /**省市区**/
    cityData: '',
    cityArray: [],  //选择器数组
    provinceArr: [], //省
    cityArr: [],  //区
    provinceIndex: 0,
    timeIndex: [0, 0, 0],
    siteName: '选择地区',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getCity()
    this.getCityData()
  },

  //确定
  submitData: function() {
    let that = this
    if(this.verify()){

      wx.request({
        url: apiUrl + '/Api/Member/addAddress',
        data: {
          contacts: that.data.contacts,
          tel: that.data.tel,
          division: that.data.division,
          street: that.data.street,
          postcode: that.data.postcode,
          is_default: that.data.is_default
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
              title: '操作成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(function () {
              wx.reLaunch({
                url: '../list/list'　　// 页面 A
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

    }
  },

  
  //校验输入
  verify: function() {

    if (this.data.contacts == ''){
      wx.showToast({
        title: '请输入联系人',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.tel == '' || this.data.tel.length < 11) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.division == '') {
      wx.showToast({
        title: '请选择所在区域',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.street == '') {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 2000
      })
      return
    }

    return true

  },


  //选择器确定按钮
  bindMultiPickerChange: function (e) {
    console.log('确定：', e)
    this.setData({
      siteName: this.data.cityData[e.detail.value[0]].name + '-' + this.data.cityData[e.detail.value[0]].children[e.detail.value[1]].name + '-' + this.data.cityData[e.detail.value[0]].children[e.detail.value[1]].children[e.detail.value[2]].name,

      division: this.data.cityData[e.detail.value[0]].children[e.detail.value[1]].children[e.detail.value[2]].id

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
    } else if (e.detail.column == 1) {//选择市
      this.gainCity(this.data.provinceIndex, e.detail.value)
    }
  },

  //选择市
  gainCity: function (index, val) {
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
  gainProvince: function (val) {
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

  //初始化城市数据
  getCityData: function () {
    //console.log('城市数据：', this.data.cityData)
    var province = []
    var city = []
    var district = []
    //初始化省份
    for (var i = 0; i < this.data.cityData.length; i++) {
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


  //获取省市区数据
  getCity() {
    let that = this
    if (wx.getStorageSync("cityData")) {
      console.log('有省市区数据：', wx.getStorageSync("cityData"))
      this.setData({
        cityData: wx.getStorageSync("cityData")
      })
    } else {
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

  //联系人
  getContacts: function (e) {
    //console.log(e)
    this.setData({
      contacts: e.detail.value
    })
  },
  //电话
  getTel: function (e) {
    //console.log(e)
    this.setData({
      tel: e.detail.value
    })
  },
  //详细地址 getStreet getPostcode
  getStreet: function (e) {
    console.log(e)
    this.setData({
      street: e.detail.value
    })
  },
  //邮编 getStreet getPostcode
  getPostcode: function (e) {
    console.log(e)
    this.setData({
      postcode: e.detail.value
    })
  },
  //默认
  switch1Change: function (e) {
    console.log(e)
    let isM
    if (e.detail.value == true) {
      isM = 1
    } else {
      isM = 0
    }
    this.setData({
      switch1Checked: e.detail.value,
      is_default: isM
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