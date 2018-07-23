// pages/ready/ready.js
var util = require('../../utils/util.js')
var amap = require('../../utils/amap.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _timerDate: '',
    btnClass: 'work',
    workStatus: '上班出发',
    marqueeType: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var weatherData = app.globalData.weatherData;
    console.log(weatherData);
    var weatherText = weatherData.liveData.province + "\t" + weatherData.city.data + "\t " + weatherData.weather.data + " \t" + weatherData.temperature.data + "℃" + weatherData.winddirection.data;
    util.marquee(this, {
      marqueeType: 1,
      text: weatherText,
      marqueePace: 1, //滚动速度
      size: 18,
      interval: 30 // 时间间隔
    });
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
    wx.showTabBar();
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
  goToTraffic: function(e) {
    wx.redirectTo({
      url: '../traffic/traffic',
    })
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
})