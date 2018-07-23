var amapFile = require('../libs/amap-wx.js');
var config = require('../libs/config.js');
var key = config.Config.key;
var myAmapFun = new amapFile.AMapWX({
  key: key
});
var markers = [{
  iconPath: "../images/mapicon_navi_s.png",
  id: 0,
  latitude: 39.989643,
  longitude: 116.481028,
  width: 23,
  height: 33
}, {
  iconPath: "../images/mapicon_navi_e.png",
  id: 0,
  latitude: 39.90816,
  longitude: 116.434446,
  width: 24,
  height: 34
}];

function getRegeo(that) {
  myAmapFun.getRegeo({
    iconPath: "../images/marker.png",
    iconWidth: 22,
    iconHeight: 32,
    success: function(data) {
      var marker = [{
        id: data[0].id,
        latitude: data[0].latitude,
        longitude: data[0].longitude,
        iconPath: data[0].iconPath,
        width: data[0].width,
        height: data[0].height
      }]
      that.setData({
        markers: marker
      });
      that.setData({
        latitude: data[0].latitude
      });
      that.setData({
        longitude: data[0].longitude
      });
      that.setData({
        textData: {
          name: data[0].name,
          desc: data[0].desc
        }
      })
    },
    fail: function(info) {
      // wx.showModal({title:info.errMsg})
    }
  })
}

function getDrivingRoute(that, origin, destination) {
  myAmapFun.getDrivingRoute({
    origin: origin, //'116.481028,39.989643',
    destination: destination, //'116.434446,39.90816',
    success: function(data) {
      console.log("getDrivingRoute->" + JSON.stringify(data));
      var points = [];
      if (data.paths && data.paths[0] && data.paths[0].steps) {
        var steps = data.paths[0].steps;
        for (var i = 0; i < steps.length; i++) {
          var poLen = steps[i].polyline.split(';');
          for (var j = 0; j < poLen.length; j++) {
            points.push({
              longitude: parseFloat(poLen[j].split(',')[0]),
              latitude: parseFloat(poLen[j].split(',')[1])
            })
          }
        }
      }
      var trafficInfo = {};
      trafficInfo.polyline = [{
        points: points,
        color: "#0091ff",
        width: 6
      }]
      trafficInfo.longitude = origin
      trafficInfo.latitude = destination
      if (data.paths[0] && data.paths[0].distance) {
        trafficInfo.distance = data.paths[0].distance + '米';
      }
      if (data.taxi_cost) {
        trafficInfo.cost = '打车约' + parseInt(data.taxi_cost) + '元';
      }
      trafficInfo.markers = markers;
      that.setData({
        trafficInfo: trafficInfo
      });
      console.log(that.data.trafficInfo);
    }
  })
}

function getRidingRout(that, origin, destination) {
  myAmapFun.getRidingRoute({
    origin: origin, //'116.481028,39.989643',
    destination: destination, //'116.434446,39.90816',
    success: function(data) {
      console.log("getRidingRout->" + JSON.stringify(data));
      var points = [];
      if (data.paths && data.paths[0] && data.paths[0].steps) {
        var steps = data.paths[0].steps;
        for (var i = 0; i < steps.length; i++) {
          var poLen = steps[i].polyline.split(';');
          for (var j = 0; j < poLen.length; j++) {
            points.push({
              longitude: parseFloat(poLen[j].split(',')[0]),
              latitude: parseFloat(poLen[j].split(',')[1])
            })
          }
        }
      }
      var trafficInfo = {};
      trafficInfo.polyline = [{
        points: points,
        color: "#0091ff",
        width: 6
      }]
      trafficInfo.longitude = origin
      trafficInfo.latitude = destination
      if (data.paths[0] && data.paths[0].distance) {
        trafficInfo.distance = data.paths[0].distance + '米';
      }
      if (data.taxi_cost) {
        trafficInfo.cost = '打车约' + parseInt(data.taxi_cost) + '元';
      }
      that.setData({
        trafficInfo: trafficInfo
      });
      console.log(that.data.trafficInfo);
    },
    fail: function(info) {

    }
  })
}

function getWalkingRoute(origin, destination) {
  myAmapFun.getWalkingRoute({
    origin: origin, //'116.481028,39.989643',
    destination: destination, //'116.434446,39.90816',
    success: function(data) {
      var points = [];
      if (data.paths && data.paths[0] && data.paths[0].steps) {
        var steps = data.paths[0].steps;
        for (var i = 0; i < steps.length; i++) {
          var poLen = steps[i].polyline.split(';');
          for (var j = 0; j < poLen.length; j++) {
            points.push({
              longitude: parseFloat(poLen[j].split(',')[0]),
              latitude: parseFloat(poLen[j].split(',')[1])
            })
          }
        }
      }
      that.setData({
        polyline: [{
          points: points,
          color: "#0091ff",
          width: 6
        }]
      });
      if (data.paths[0] && data.paths[0].distance) {
        that.setData({
          distance: data.paths[0].distance + '米'
        });
      }
      if (data.paths[0] && data.paths[0].duration) {
        that.setData({
          cost: parseInt(data.paths[0].duration / 60) + '分钟'
        });
      }

    },
    fail: function(info) {

    }
  })
}

function getTransitRoute(origin, destination, city, cityd) {
  myAmapFun.getTransitRoute({
    origin: origin, //'116.481028,39.989643',
    destination: destination, //'116.434446,39.90816',
    city: city, //'北京',
    cityd: cityd,
    success: function(data) {
      if (data && data.transits) {
        var transits = data.transits;
        for (var i = 0; i < transits.length; i++) {
          var segments = transits[i].segments;
          transits[i].transport = [];
          for (var j = 0; j < segments.length; j++) {
            if (segments[j].bus && segments[j].bus.buslines && segments[j].bus.buslines[0] && segments[j].bus.buslines[0].name) {
              var name = segments[j].bus.buslines[0].name
              if (j !== 0) {
                name = '--' + name;
              }
              transits[i].transport.push(name);
            }
          }
        }
      }
      that.setData({
        transits: transits
      });

    },
    fail: function(info) {

    }
  })
}

function getInputtips(keywords, city, citylimit, location) {
  myAmapFun.getInputtips({
    keywords: keywords,
    location: lonlat,
    city: city,
    success: function(data) {
      if (data && data.tips) {
        that.setData({
          tips: data.tips
        });
      }
    }
  })
}

function getWeather(params, callback) {
  var wType = params != null && params.type ? params.type : 'live'; //forecast
  var obj = new Object();
  obj.type = wType;
  if (params != null && params.city) {
    obj.city = params.city;
  }
  obj.success=function(data){
    callback(data);
  }
  obj.fail = function (info){
    //失败回调
    console.log(info)
  }
  myAmapFun.getWeather(obj);
}
module.exports = {
  getRegeo,
  getDrivingRoute,
  getRidingRout,
  getWalkingRoute,
  getTransitRoute,
  getInputtips,
  getWeather
}