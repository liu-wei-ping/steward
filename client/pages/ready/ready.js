// pages/ready/ready.js
var util = require('../../utils/util.js')
var amap = require('../../utils/amap.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    currentTab: 0,
    weatherData: {},
    trafficType: 0, //0：公交 1：自驾 2：骑行 3：步行
    transitRoute: {}, //公交
    drivingRoute: {}, //自驾
    ridingRout: {}, //骑行
    walkingRoute: {}, //步行
    markers: [],
    polyline: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var weatherData = app.globalData.weatherData;
    console.log(weatherData);
    var winHeight = app.globalData.phoneInfo.windowHeight;
    var weatherText = weatherData.liveData.province + "\t" + weatherData.city.data + "\t " + weatherData.weather.data + " \t" + weatherData.temperature.data + "℃" + weatherData.winddirection.data;
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
  swichTab: function(e) {
    var currentTab = e.currentTarget.dataset.currenttab;
    this.setData({
      currentTab: currentTab
    })
  },
  bindChange: function(e) {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  switchTraffic: function(e) {
    var params = {
      city: '北京',
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
    }
    var that = this;
    wx.showActionSheet({
      itemList: ['公交', '自驾', '骑行', '步行'],
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          amap.getTransitRoute(params, function(data) {
            var trafficInfo = amap.transitRouteDefaultResult(data, params.origin, params.destination);
            that.setData({
              trafficType: 0,
              transitRoute: trafficInfo,
              markers: trafficInfo.markers,
              polyline: trafficInfo.polyline
            })
          });
        } else if (res.tapIndex == 1) {
          amap.getDrivingRoute(params, function(data) {
            var trafficInfo = amap.drivingRoutDefaultResult(data, params.origin, params.destination);
            that.setData({
              trafficType: 1,
              drivingRoute: trafficInfo,
              markers: trafficInfo.markers,
              polyline: trafficInfo.polyline
            })
          });
        } else if (res.tapIndex == 2) {
          amap.getRidingRout(params, function(data) {
            var trafficInfo = amap.ridingRoutDefaultResult(data, params.origin, params.destination);
            that.setData({
              trafficType: 2,
              ridingRout: trafficInfo,
              markers: trafficInfo.markers,
              polyline: trafficInfo.polyline
            })
          });
        } else if (res.tapIndex == 3) {
          amap.getWalkingRoute(params, function(data) {
            var trafficInfo = amap.walkingRouteDefaultResult(data, params.origin, params.destination);
            that.setData({
              trafficType: 3,
              walkingRoute: trafficInfo,
              markers: trafficInfo.markers,
              polyline: trafficInfo.polyline
            })
          });
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  trafficDetail: function(e) {
    var trafficType = e.currentTarget.dataset.traffictype;
    wx.navigateTo({
      url: '../traffic/traffic?type=' + trafficType,
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