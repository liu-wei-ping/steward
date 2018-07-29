// pages/traffic/traffic.js
var util = require('../../utils/util.js')
var amap = require('../../utils/amap.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startLocation: {},
    endLocation: {},
    distance: '',
    cost: '',
    transits: [],
    polyline: [],
    trafficType: 0, //0：公交 1：自驾 2：骑行 3：步行
    transitRoute: {}, //公交
    drivingRoute: {}, //自驾
    ridingRout: {}, //骑行
    walkingRoute: {}, //步行
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
    var that = this;
    var endLocation = wx.getStorageSync("endLocation");
    var startLocation = wx.getStorageSync("startLocation");
    if (!startLocation) {
      wx.getLocation({
        type: 'gcj02',
        success: function(res) {
          console.log(res);
          var startLocation = {
            location: res.longitude + "," + res.latitude,
            latitude: res.latitude,
            longitude: res.longitude,
            speed: res.speed,
            accuracy: res.accuracy,
            name: '我的位置'
          }
          that.setData({
            startLocation: startLocation,
            endLocation: endLocation
          })
          wx.setStorageSync("startLocation", startLocation);
        }
      })
    } else {
      this.setData({
        startLocation: startLocation,
        endLocation: endLocation
      })
    }
    this.defaultSearch();

    // var pages = getCurrentPages();
    // var prePage = pages[pages.length - 2]; //上一页面
    // console.log(prePage);
    // if (prePage.route == 'pages/ready/ready') {
    //   var preData = prePage.data;
    //   this.setData({
    //     trafficType: preData.trafficType,
    //     transitRoute: preData.transitRoute,
    //     drivingRoute: preData.drivingRoute,
    //     ridingRout: preData.ridingRout,
    //     walkingRoute: preData.walkingRoute,
    //   })
    //   console.log(preData)
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("traffic---onHide")
    // wx.removeStorageSync("startLocation")
    // wx.removeStorageSync("endLocation")
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
    var trafficType = e.currentTarget.dataset.traffictype;
    var startLocation = this.data.startLocation;
    var endLocation = this.data.endLocation;
    var origin = startLocation.location
    var destination = endLocation.location;
    var params = {
      city: '上海',
      origin: origin, //'116.481028,39.989643',
      destination: destination,
    }
    console.log(params);
    var that = this;
    if (trafficType == 0) {
      amap.getTransitRoute(params, function(data) {
        var trafficInfo = amap.transitRouteDefaultResult(data, params.origin, params.destination);
        that.setData({
          trafficType: trafficType,
          transitRoute: trafficInfo,
          markers: trafficInfo.markers,
          polyline: trafficInfo.polyline
        })
        trafficInfo.trafficTyp = trafficType;
        wx.setStorageSync("trafficInfo", trafficInfo)
      });
    } else if (trafficType == 1) {
      amap.getDrivingRoute(params, function(data) {
        var trafficInfo = amap.drivingRoutDefaultResult(data, params.origin, params.destination);
        that.setData({
          trafficType: trafficType,
          drivingRoute: trafficInfo,
          markers: trafficInfo.markers,
          polyline: trafficInfo.polyline
        })
        trafficInfo.trafficTyp = trafficType;
        wx.setStorageSync("trafficInfo", trafficInfo)
      });
    } else if (trafficType == 2) {
      amap.getRidingRout(params, function(data) {
        var trafficInfo = amap.ridingRoutDefaultResult(data, params.origin, params.destination);
        that.setData({
          trafficType: trafficType,
          ridingRout: trafficInfo,
          markers: trafficInfo.markers,
          polyline: trafficInfo.polyline
        })
        trafficInfo.trafficTyp = trafficType;
        wx.setStorageSync("trafficInfo", trafficInfo)
      });
    } else if (trafficType == 3) {
      amap.getWalkingRoute(params, function(data) {
        var trafficInfo = amap.walkingRouteDefaultResult(data, params.origin, params.destination);
        that.setData({
          trafficType: trafficType,
          walkingRoute: trafficInfo,
          markers: trafficInfo.markers,
          polyline: trafficInfo.polyline
        })
        trafficInfo.trafficTyp = trafficType;
        wx.setStorageSync("trafficInfo", trafficInfo)
      });
    }
  },
  bindfocus: function(e) {
    var location = e.currentTarget.dataset.location;
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        if (location == 0) {
          var startLocation = {
            location: res.longitude + "," + res.latitude,
            longitude: res.longitude,
            latitude: res.latitude,
            name: res.name
          }
          that.setData({
            startLocation: startLocation
          })
          wx.setStorageSync("startLocation", startLocation)
        } else if (location == 1) {
          var endLocation = {
            location: res.longitude + "," + res.latitude,
            longitude: res.longitude,
            latitude: res.latitude,
            name: res.name
          }
          that.setData({
            endLocation: endLocation
          })
          wx.setStorageSync("endLocation", endLocation)

        }
        that.defaultSearch();

      }
    })
    // wx.navigateTo({
    //   url: '../location/location?location=' + location,
    // })
  },
  defaultSearch: function() {
    var startLocation = this.data.startLocation;
    var endLocation = this.data.endLocation;
    var origin = startLocation.location
    var destination = endLocation.location;
    var params = {
      city: '上海',
      origin: origin, //'116.481028,39.989643',
      destination: destination,
    }
    var that=this;
    amap.getTransitRoute(params, function(data) {
      var trafficInfo = amap.transitRouteDefaultResult(data, params.origin, params.destination);
      that.setData({
        trafficType: 0,
        transitRoute: trafficInfo,
        markers: trafficInfo.markers,
        polyline: trafficInfo.polyline
      })
      trafficInfo.trafficTyp = 0;
      wx.setStorageSync("trafficInfo", trafficInfo)
    });
  }
})