// pages/index/index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util')
var request = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (this.data.logged) return;
    var that = this;
    //用户信息缓存
    const session = qcloud.Session.get()
    console.log(session);
    //已有过登录
    if (session) {
      console.log("第二次登录")
      qcloud.loginWithCode({
        success: res => {
          that.setData({
            userInfo: res,
            logged: true
          })
          wx.setStorageSync("USER_TEMP", res);
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    } else {
      //首次登录
      qcloud.login({
        success: res => {
          console.log(res);
          //获取用户信息 判断是否是老用户
          request.getReq("getUserInfo", "uid=" + res.openId, function(data) {
            //用户已存在直接登录
            if (data.code == 1 && data.data.lenght > 0) {
              //用户信息更新为系统获取信息
              qcloud.Session.set(res.data[0]);
              that.setData({
                logged: true,
              });
            } else {
              var params = {
                userinfo: res
              }
              //创建用户信息
              request.postReq("createUserInfo", params, function(result) {
                if (result.code == 1) {
                    console.log("用户创建成功!");
                }else{
                  //清除缓存
                  qcloud.Session.clear();
                }
              })
            }
          })
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    }
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
  restDay: function(e) {
    wx.reLaunch({
      url: '../reset/index',
    })
  },
  workday: function(e) {
    wx.reLaunch({
      url: '../ready/ready',
    })

  },
  // 用户登录示例
  bindGetUserInfo: function() {
    if (this.data.logged) return
    util.showBusy('正在登录')
    const session = qcloud.Session.get()
    console.log(session);
    if (session) {
      // 第二次登录
      // 或者本地已经有登录态
      // 可使用本函数更新登录态
      console.log("第二次登录")
      qcloud.loginWithCode({
        success: res => {
          this.setData({
            userInfo: res,
            logged: true
          })
          wx.setStorageSync("USER_TEMP", res);
          // util.showSuccess('登录成功')
          this.workday();
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    } else {
      // 首次登录
      qcloud.login({
        success: res => {
          wx.setStorageSync("USER_TEMP", res);
          this.setData({
            userInfo: res,
            logged: true
          })
          util.showSuccess('登录成功')
          this.workday();
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    }
  },

})