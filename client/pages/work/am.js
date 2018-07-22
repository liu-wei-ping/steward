// pages/am/am.js
var util = require('../../utils/util.js')  
var amapFile = require('../../libs/amap-wx.js');
var amap = require('../../utils/amap.js')  
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    _timerDate: '',
    _num: 1,
    btnClass: 'work',
    workStatus: '上班出发',
    marqueeType: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var weatherData = app.globalData.weatherData;
    console.log(weatherData);
    var weatherText = weatherData.currentCity + 'PM2.5：' + weatherData.pm25 + '日期：' + weatherData.date + '温度：' + weatherData.temperature + '天气：' + weatherData.weatherDesc + '风力：' + weatherData.wind;
    util.marquee(this, {
      marqueeType: 1,
      text: weatherText,
      marqueePace: 1, //滚动速度
      size: 18,
      interval: 20 // 时间间隔
    });
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  headClick: function(e) {
    var num = e.currentTarget.dataset.num;
    console.log(num);
    this.setData({
      _num: num
    })
    if (num == 2) {
      var origin = '116.481028,39.989643';
      var destination = '116.434446,39.90816';
      amap.getDrivingRoute(this,origin, destination);
      console.log(this.data.trafficInfo);
    }
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