// pages/ready/ready.js
var util = require('../../utils/util.js')
var amap = require('../../utils/amap.js')
var request = require('../../utils/request')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wakeUpTimeConfig: {
      min: '00:00',
      max: '23:56'
    },
    wakeUpFlag: false,
    attendanceFlag: false,
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
    var wakeUpTimeConfig = this.data.wakeUpTimeConfig;
    var nowTime = util.formatDate(new Date(), "h:m:s");
    var wakeUpFlag = true;
    if (wakeUpTimeConfig['max'] > nowTime && wakeUpTimeConfig['min'] < nowTime) {
      var params = {
        recordDate: util.formatDate(new Date(), "Y-M-D")
      }
      request.postReq("queryDaycycleInfo", params, function(res) {
        console.log(res);
      })

    } else {
      wakeUpFlag = false;
      console.log(nowTime, "当前时间不能早起")
    }
    this.setData({
      wakeUpFlag: wakeUpFlag,
      winHeight: winHeight,
      weatherData: weatherData
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

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
    var wakeUpFlag = this.data.wakeUpFlag;
    if (wakeUpFlag) { //起床打卡
      var wakeUpTime = util.formatDate(new Date(), "h:m:s");
      var params = {
        recordTime: wakeUpTime,
        timeType: 1,
        timeTypeName: '起床'
      }
      request.postReq("createDaycycleInfo", params, (res) => {
        if (res.code == 1) {
          wx.vibrateLong();
        }
      })
    } else {
      console.log("当前时间不能打卡早起")
    }
    wx.navigateTo({
      url: '../daycycle/daycycle?timeType=1',
    })
  },
  attendance: function(e) {
    var attendance = this.data.attendanceFlag;
    if (attendance) {
      var attendanceTime = util.formatDate(new Date(), "h:m:s");
      var params = {
        recordTime: attendanceTime,
        timeType: 2,
        timeTypeName: '上班打卡'
      }
      request.postReq("createDaycycleInfo", params, (res) => {
        if (res.code == 1) {
          wx.vibrateLong()
        }
      })
    } else {}
    wx.navigateTo({
      url: '../daycycle/daycycle?timeType=2',
    })
  }
})