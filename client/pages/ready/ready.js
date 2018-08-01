// pages/ready/ready.js
var util = require('../../utils/util.js')
var amap = require('../../utils/amap.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0, //手机屏幕高度
    currentTab: 0, //tab 切换标识
    weatherData: {}, //天气
    wakeUpTime: '', //起床时间
    punchInTime: '', //打卡时间
    strategy: 0, //0：公交 1：自驾 2：骑行 3：步行
    city: '上海',
    originName: '我的位置', //起点
    destinationName: '', // 目的地
    origin: '', //起点 经度,纬度 例如： '116.481028,39.989643'
    destination: '', // 目的地 经度,纬度
    scale: 12, //地图比例
    longitude: '121.475424', //经度
    latitude: '31.191984', //纬度
    markers: [], //地图标识
    polyline: [], //路线
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var weatherData = app.globalData.weatherData;
    // console.log(weatherData);
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
    this.mapCtx = wx.createMapContext('navi-map')
  },
  getCenterLocation: function() {
    this.mapCtx.getCenterLocation({
      success: function(res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.currentTab == 1) {
      
    }
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
   * 选择交通方式
   */
  swichStrategy: function(e) {
    var strategy = e.currentTarget.dataset.strategy;
    var params = {
      city: this.data.city,
      origin: this.data.origin,
      destination: this.data.destination,
    }
    this.setData({
      strategy: strategy
    })
    console.log(params);
    var that = this;
    if (strategy == 0) { //公交
      amap.getTransitRoute(params, function(data) {
        var trafficInfo = amap.transitRouteDefaultResult(data, params.origin, params.destination);
        that.setData({
          markers: trafficInfo.markers,
          polyline: trafficInfo.polyline
        })
      });
    } else if (strategy == 1) { //自驾
      amap.getDrivingRoute(params, function(data) {
        var trafficInfo = amap.drivingRoutDefaultResult(data, params.origin, params.destination);
        that.setData({
          markers: trafficInfo.markers,
          polyline: trafficInfo.polyline
        })
      });
    } else if (strategy == 2) { //骑行
      amap.getRidingRout(params, function(data) {
        var trafficInfo = amap.ridingRoutDefaultResult(data, params.origin, params.destination);
        that.setData({
          markers: trafficInfo.markers,
          polyline: trafficInfo.polyline
        })
      });
    } else if (strategy == 3) { //步行
      amap.getWalkingRoute(params, function(data) {
        var trafficInfo = amap.walkingRouteDefaultResult(data, params.origin, params.destination);
        that.setData({
          markers: trafficInfo.markers,
          polyline: trafficInfo.polyline
        })
      });
    }
    // this.setData({
    //     strategy: strategy
    // })
  },
  bindfocus: function(e) {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        var name = res.name;
        var address = res.address;
        var loaction = res.longitude + "," + res.latitude;
        if (name && name.lenght > 8) {
          name = name.substring(0, 8) + "...";
        }
        if (location == 0) {
          that.setData({
            origin: loaction,
            destination: name
          })
        } else if (location == 1) {
          that.setData({
            destination: loaction,
            destinationName: name
          })
        }
      }
    })

  },
  swichTab: function(e) {
    var currentTab = e.currentTarget.dataset.currenttab;
    this.setData({
      currentTab: currentTab
    })
    if (currentTab == 1) {
      var that = this;
      wx.getLocation({
        type: 'gcj02',
        altitude: true,
        success: function (res) {
          console.log(res);
          that.setData({
            longitude: res.longitude,
            latitude: res.latitude,
            originName: res.longitude + "," + res.latitude
          })
          // amap.getRegeo(currLocation, function (data) {
          //   console.log(data);
          // })
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  save: function(e) {
    console.log(e)
  },
  trafficDetail: function(e) {
    var trafficType = e.currentTarget.dataset.traffictype;
    wx.navigateTo({
      url: '../traffic/traffic?type=' + trafficType,
    })
  },
  nearbyClick: function(e) {

  },
  routeClick: function(e) {
    console.log("routeClick...")
    wx.navigateTo({
      url: '../traffic/traffic',
    })
  },
  newRouteClick: function(e) {

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
  clickScale: function(e) {
    var scaleType = e.currentTarget.dataset.scaletype;
    var scale = e.currentTarget.dataset.scale; //5-20
    var newScale = scale + scaleType * 1; //增量1
    if (newScale < 5) {
      newScale = 5;
    }
    if (newScale > 20) {
      newScale = 20
    }
    this.setData({
      scale: newScale
    })
  },
  bindmarkertap: function(e) {
    console.log(e);
    console.log(this.data.trafficInfo);
    var marker = this.data.trafficInfo.markers[e.markerId];
    console.log(marker);
    var params = {
      location: marker.longitude + "," + marker.latitude
    }
    amap.getRegeo(params, function(data) {
      console.log(data);
    })
  },
  wakeUp: function(e) {
    var wareUpTime = this.data.wareUpTime;
    if (!wareUpTime) {
      wx.vibrateLong({
        success: function() {

        }
      })
      var wareUpTime = util.formatDate(new Date(), "h:m:s");
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
      wx.vibrateLong({
        success: function() {}
      })
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