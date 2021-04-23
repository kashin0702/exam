// pages/auth/auth.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Identity: false, //身份选择
    IdentityName: 1, //1-学生，0-老师
    active: 0, //0-手机号登录，1-账号密码
    isPhone: false, //手机号登录
    phone: '', //账号
    password: '', //密码
    disabled: true,
    i: 1, //密码显影
    show: true, //密码图标
    token: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this
    //问题1页面加载时需要uid 跳转
    // if (wx.getStorageSync('userInfo')) {
      // if (wx.getStorageSync('Identity') == 1) {
      //   wx.switchTab({
      //     url: '../index/index'
      //   })
      // } else {
      //   wx.redirectTo({
      //     url: '/pages/teacher/index',
      //   })
      // }
    // } else {
      wx.login({
        success(res) {
          console.log(res)
          if (res.code) {
            let dd = {
              code: res.code,
              wx_type: 'exam'
            }
            app._post_form('admin/base/wxlogin', dd, function(res) {
              if (res.data.token) {
                self.setData({
                  token: res.data.token
                })
              }

            })

          } else {

          }
        }
      })
    // }
  },
  //考生
  student: function() {
    this.setData({
      // Identity: true,
      IdentityName: 1,
    })
    wx.setStorageSync('Identity', 1)
  },
  goLogin(){
    this.setData({
      Identity: true,
    })
  },
  //教师
  teacher: function() {
    this.setData({
      // Identity: true,
      IdentityName: 0,
    })
    wx.setStorageSync('Identity', 0)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  l_show_pass: function() { //点击icon显示输入的密码
    let that = this;
    if (that.data.i == 1) {
      that.data.i = 2, that.setData({
        show: false,
      })
    } else {
      that.data.i = 1, that.setData({
        show: true,
      })
    }
  },
  // 获取输入账号
  phoneInput: function(e) {
    //判断账号密码输入让后才高亮显示
    let btnstate
    if (e.detail.value && this.data.password) {
      btnstate = false
    } else {
      btnstate = true
    }
    this.setData({
      phone: e.detail.value,
      disabled: btnstate
    })
  },
  // 获取输入密码
  passwordInput: function(e) {
    //判断账号密码输入让后才高亮显示
    let btnstate
    if (e.detail.value && this.data.phone) {
      btnstate = false
    } else {
      btnstate = true
    }
    this.setData({
      disabled: btnstate,
      password: e.detail.value
    });
  },
  login: function() { // 账号密码登录
    let self = this
    let dd = {}
    dd.username = this.data.phone
    dd.password = this.data.password
    dd.isRemember = 1
    self.setData({
      disabled: true
    }) //登录加载效果
    app._post_form('admin/base/login', dd, function(res) {
      self.setData({
        loading: false,
        disabled: false
      })
      //保存账号与密码 后台返回的key
      wx.setStorageSync("userInfo", res.data.userInfo)
      wx.setStorage({
        key: 'phone',
        data: self.data.phone
      })
      wx.setStorage({
        key: 'password',
        data: self.data.password
      })
      wx.setStorage({
        key: 'authKey',
        data: res.data.authKey
      })
      wx.setStorage({
        key: 'sessionId',
        data: res.data.sessionId
      })
      self.getloginPage();
    })
  },

  getlogin: function(e) { //登陆处理
    wx.switchTab({
      url: '/pages/auto/auto',
    })
  },
  getloginPage: function(e) { //跳转回阅卷端首页，测试
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  onChange(event) { //tab模块切换
    this.setData({
      active: event.detail.index
    })
  },
  getPhoneNumber: function(e) { //获取手机号登录
    let self = this
    self.setData({
      disabled: true
    }) //登录加载效果
    if (!e.detail.encryptedData) {
      return;
    }
    let dd = {
      token: self.data.token,
      iv: e.detail.iv,
      encryptedData: e.detail.encryptedData,
      wx_type: 'exam'
    }
    app._post_form('admin/base/phoneLogin', dd, function(res) {
      self.setData({
        loading: false,
        disabled: false
      })
      //保存账号与密码 后台返回的key
      wx.setStorageSync("userInfo", res.data.userInfo)
      wx.setStorage({
        key: 'phone',
        data: self.data.phone
      })
      wx.setStorage({
        key: 'password',
        data: self.data.password
      })
      wx.setStorage({
        key: 'authKey',
        data: res.data.authKey
      })
      wx.setStorage({
        key: 'sessionId',
        data: res.data.sessionId
      })
      self.getloginPage();



    })



  },
})