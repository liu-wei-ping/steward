// pages/ready/ready.js
var util = require('../../utils/util.js')
var amap = require('../../utils/amap.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: '300', //手机屏幕高度
    currentTab: 0, //tab 切换标识
    weatherData: {}, //天气
    wakeUpTime: '', //起床时间 wake
    punchInTime: '', //打卡时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var weatherData = app.globalData.weatherData;
    var winHeight = app.globalData.phoneInfo.windowHeight;
    this.setData({
      winHeight: winHeight,
      weatherData: weatherData
    })

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
  swichTab: function(e) {
    var currentTab = e.currentTarget.dataset.currenttab;
    this.setData({
      currentTab: currentTab
    })
    if (currentTab == 1) {

    }
  },
  save: function(e) {
    console.log(e)
  },
  startClick: function(e) {
    util.timer(this)
    if (!this.setTimeout) {
      this.setData({
        btnClass: 'work work-on',
        workStatus: "上班打卡"
      })
      this.getDateTimer();
    } else {
      this.clearTimeout()
    }
  },
  wakeUp: function(e) {
    var wareUpTime = this.data.wareUpTime;
    if (!wareUpTime) {
      wx.vibrateLong()
      var wakeUpTime = util.formatDate(new Date(), "h:m:s");
      this.setData({
        wakeUpTime: wakeUpTime
      })
    } else {
      wx.showToast({
        icon: 'success',
        duration: 2000,
        title: '你已经起床了啦~',
      })
    }
  },
  punchIn: function(e) {
    var punchInTime = this.data.punchInTime;
    if (!punchInTime) {
      wx.vibrateLong();
      var punchInTime = util.formatDate(new Date(), "h:m:s");
      this.setData({
        punchInTime: punchInTime
      })
    } else {
      wx.showToast({
        icon: 'success',
        duration: 2000,
        title: '你已经打卡啦~',
      })
    }
  }
})