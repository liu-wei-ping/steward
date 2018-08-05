var qcloud = require('../vendor/wafer2-client-sdk/index')
var config = require('../config')
var util = require('../utils/util')
/**
 * get 请求
 */
function req_get(funKey, urlParams, callback) {
  console.log("req_get 请求。。。")
  var url = config.service[funKey];
  var params = "";
  if (urlParams) {
    if (typeof(urlParams) == 'array') {
      for (var i = 0; i < urlParams.length; i++) {
        var up = urlParams[i]['key'] + "=" + encodeURIComponent(urlParams[i]['value']) + "&";
        params += up;
      }
    } else if (typeof(urlParams) == 'string') {
      var arr = urlParams.split("&");
      for (var i = 0; i < arr.length; i++) {
        var _PStr = arr[i];
        var key = _PStr.substring(0, _PStr.indexOf("=") + 1)
        console.log("编码之前参数:" + _PStr.substring(_PStr.indexOf("=") + 1))
        var value = encodeURIComponent(_PStr.substring(_PStr.indexOf("=") + 1));
        console.log("编码之后参数:" + value)
        params += (key + value);
      }
    }
    url = url + "?" + params;
  }

  console.log("req_get 请求url-->" + url)
  // util.showBusy('请求中...')
  var that = this
  var options = {
    url: url,
    method: 'GET',
    // login: true,
    success(result) {
      // util.showSuccess('请求成功完成')
      console.log('request success')
      console.log(result)
      callback(result);
      //   requestResult: JSON.stringify(result.data)
    },
    fail(error) {
      util.showModel('请求失败', error);
      console.log('request fail', error);
    }
  }
  wx.request(options)
  // qcloud.request(options)
}

module.exports = {
  req_get
};