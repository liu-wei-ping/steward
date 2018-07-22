//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var bmap = require('./libs/bmap-wx.min.js');
App({
  onLaunch: function() {
    qcloud.setLoginUrl(config.service.loginUrl)
  },
  onShow: function() {
    this.getWeatherData(location);
    var that = this;
    setInterval(function() {
      console.log("天气信息已经更新了");
      that.getWeatherData(location);
    }, 1000 * 30); //30分钟重新一次
  },
  getWeatherData: function(location) {
    // var location="116.43,40.75";
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'BsnPjk8egn0Vm6RAzgfxhhZQ1QmUeNbn'
    });
    var fail = function(data) {
      console.log('查询天气失败')
    };
    var success = function(data) {
      console.log('查询天气成功')
      var weatherData = data.currentWeather[0];
      // weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
      // console.log(weatherData);
      that.globalData.weatherData = weatherData;
    }
    BMap.weather({
      location: location,
      fail: fail,
      success: success
    });
  },
  globalData: {
    userInfo: null,
    weatherData: {}
  }
})