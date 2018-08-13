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
      min: '5:30',
      max: '08:30'
    },
    attendanceTimeConfig: {
      min: '05:30',
      max: '11:00'
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
    var attendanceTimeConfig = this.data.attendanceTimeConfig;
    var nowTime = util.formatDate(new Date(), "h:m:s");
    var wakeUpFlag = this.data.wakeUpFlag;
    var attendanceFlag = this.data.attendanceFlag;
    if (wakeUpTimeConfig['max'] >= nowTime && wakeUpTimeConfig['min'] <= nowTime) {
      wakeUpFlag = true;
      console.log(nowTime, "早起打卡时间了")
    }
    if (attendanceTimeConfig['max'] >= nowTime && attendanceTimeConfig['min'] <= nowTime) {
      attendanceFlag = true;
      console.log(nowTime, "上班打卡时间了")
    }
    this.setData({
      wakeUpFlag: wakeUpFlag,
      attendanceFlag: attendanceFlag,
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
    if (wakeUpFlag) { //早起打卡
      var wakeUpTime = util.formatDate(new Date(), "h:m:s");
      var params = {
        recordTime: wakeUpTime,
        timeType: 1,
        timeTypeName: '起床'
      }
      request.postReq("createCycleInfo", params, (res) => {
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
    var attendanceFlag = this.data.attendanceFlag;
    if (attendanceFlag) {
      var attendanceTime = util.formatDate(new Date(), "h:m:s");
      var params = {
        recordTime: attendanceTime,
        timeType: 2,
        timeTypeName: '上班打卡'
      }
      request.postReq("createCycleInfo", params, (res) => {
        if (res.code == 1) {
          wx.vibrateLong()
        }
      })
    } else {
      console.log("当前时间不能上班打卡了")
    }
    wx.navigateTo({
      url: '../daycycle/daycycle?timeType=2',
    })
  },
  bindchange: function(e) {
    console.log(e);
    var currentItemId = e.detail.currentItemId;
    var source = e.detail.source;
    if (source == "touch") {
      this.setData({
        currentTab: currentItemId
      })
    }
  }
})