// app.js
import siteinfo from './siteInfo'
const util = require('./utils/util')
App({
  api_root: siteinfo.api_root,
  com: util,

  getUserId(){
    return wx.getStorageSnyc('user_id')
  },

  /*get请求*/
  _get(url, data, success, fail, complete, check_login) {
    wx.showNavigationBarLoading();
    let _this = this;
    // 构造请求参数
    data = data || {};
    // data.wxapp_id = _this.getWxappId();

    // 构造get请求
    let request = function() {
      let authKey = wx.getStorageSync('authKey');
      let sessionId = wx.getStorageSync('sessionId');
      wx.request({
        url: _this.api_root + url,
        header: {
          'content-type': 'application/json',
          'authKey': authKey,
          'sessionId': sessionId,
        },
        data: data,
        success(res) {
          if (res.data.code !== 200 || typeof res.data !== 'object') {
            if (res.data.code == 101) {
              wx.showToast({
                title: res.error || res.data.error || '请重新登录',
                icon: 'none',
                duration: 2000
              })
              wx.clearStorageSync();
              setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/auth/auth'
                })
              }, 2000)
              return false
            }
            _this.showError(res.data.error);
            return false;
          }
          success && success(res.data);
        },
        fail(res) {
          _this.showError(res.errMsg, function() {
            fail && fail(res);
          });
        },
        complete(res) {
          wx.hideNavigationBarLoading();
          complete && complete(res);
        },
      });
    };
    // 判断是否需要验证登录
    check_login ? _this.doLogin(request) : request();
  },

  /**post提交 */
  _post_form(url, data, success, fail, complete, isShowNavBarLoading) {
    let _this = this;
    let header;
    isShowNavBarLoading || true;
    let authKey = wx.getStorageSync('authKey');
    let sessionId = wx.getStorageSync('sessionId');
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'authKey': authKey,
      'sessionId': sessionId,
    }
    // 在当前页面显示导航条加载动画
    if (isShowNavBarLoading == true) {
      wx.showNavigationBarLoading();
    }
    wx.request({
      url: _this.api_root + url,
      header: header,
      method: 'POST',
      data: data,
      success(res) {
        if (res.data.code !== 200 || typeof res.data !== 'object') {
          if (res.data.code == 101) {
            wx.showToast({
              title: res.error || res.data.error || '请重新登录',
              icon: 'none',
              duration: 2000
            })
            wx.clearStorageSync();
            setTimeout(() => {
              wx.reLaunch({
                url: '/pages/auth/auth'
              })
            }, 2000)
            return false
          }
          _this.showError(res.data.error);
          return false;
        }
        success && success(res.data);
      },
      fail(res) {
        // console.log(res);
        _this.showError(res.errMsg, function() {
          fail && fail(res);
        });
      },
      complete(res) {
        wx.hideNavigationBarLoading();
        // wx.hideLoading();
        complete && complete(res);
      }
    });
  },
  //上传文档
  _upFile(url, data, success, fail, complete, isShowNavBarLoading) {
    let _this = this;
    let header;
    isShowNavBarLoading || true;
    let authKey = wx.getStorageSync('authKey');
    let sessionId = wx.getStorageSync('sessionId');
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'authKey': authKey,
      'sessionId': sessionId,
    }
    // 在当前页面显示导航条加载动画
    if (isShowNavBarLoading == true) {
      wx.showNavigationBarLoading();
    }
    wx.uploadFile({
      url: _this.api_root + url,
      header: header,
      filePath: data,
      name:'iFile',
      success(res) {
        res.data = JSON.parse(res.data);
        if (res.data.code !== 200 || typeof res.data !== 'object') {
          if (res.data.code == 101) {
            wx.showToast({
              title: res.error || res.data.error || '请重新登录',
              icon: 'none',
              duration: 2000
            })
            wx.clearStorageSync();
            setTimeout(() => {
              wx.reLaunch({
                url: '/pages/auth/auth'
              })
            }, 2000)
            return false
          }
          _this.showError(res.data.error);
          return false;
        }
        success && success(res.data);
      },
      fail(res) {
        // console.log(res);
        _this.showError(res.errMsg, function () {
          fail && fail(res);
        });
      },
      complete(res) {
        wx.hideNavigationBarLoading();
        // wx.hideLoading();
        complete && complete(res);
      }
    });
  },
  /**
   * 显示成功提示框
   */
  showSuccess(msg, callback) {
    wx.showToast({
      title: msg,
      icon: 'success',
      mask: true,
      duration: 1500,
      success() {
        callback && (setTimeout(function() {
          callback();
        }, 1500));
      }
    });
  },

  /**
   * 显示失败提示框
   */
  showError(msg, callback) {
    wx.showModal({
      title: '友情提示',
      content: msg,
      showCancel: false,
      success(res) {
        callback && callback();
      }
    });
  },
  onLaunch() {
    
  },
  globalData: {
    userInfo: null
  }
})
