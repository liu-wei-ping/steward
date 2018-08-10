var qcloud = require('../vendor/wafer2-client-sdk/index')
var config = require('../config')
var util = require('../utils/util')
const cache = require("./cache.js")
/**
 * get 请求
 */
function getReq(funKey, params, callback) {
  var url = config.service[funKey];
  if (params) {
    url += ("?" + params);
  }
  console.log('get request：' + url);
  var that = this
  var options = {
    url: url,
    method: 'GET',
    success(result) {
      // console.log('get request result' + JSON.stringify(result));
      if (callback && typeof(callback) == 'function') {
        callback(result.data);
      }
    },
    fail(error) {
      console.log('get request fail：', error);
      util.showModel('请求失败', error);
    }
  }
  wx.request(options)
  // qcloud.request(options)
}
/**
 * Post 请求
 */
const postReq = (funKey, params, callback, tip) => {
  var userinfo = cache.getUserInfoCache();
  var url = config.service[funKey];
  params = params ? params : {};
  params.uid = userinfo && userinfo.uid ? userinfo.uid : "";
  console.info("Post request：" + url, "Post request params：" + JSON.stringify(params));
  var options = {
    url: url,
    data: params ? params : {},
    method: 'POST',
    success: (res) => {
      // console.log('get request result', res);
      if (callback && typeof(callback) == 'function') {
        callback(res.data);
      }
    },
    fail: (error) => {
      console.log('post request fail', error);
      util.showModel('请求失败', error);
    }
  };
  wx.request(options);
  // qcloud.request(options)
};
/**
 * delete 请求
 */
const delReq = (funKey, params, callback) => {
  console.info("delete request：" + url, "delete request params:" + params);
  wx.showModal({
    content: "确定删除？",
    success: function(res) {
      if (res.confirm) {
        var url = config.service[funKey];
        if (params) {
          url += ("?" + params);
        } else {
          util.showModel('删除失败', "参数错误");
        }
        console.log('delete request' + url);
        var that = this
        var options = {
          url: url,
          method: 'DELETE',
          success(result) {
            // console.log('delete request result', result);
            if (callback && typeof(callback) == 'function') {
              callback(result);
            }
          },
          fail(error) {
            console.log('delete request fail', error);
            util.showModel('请求失败', error);
          }
        }
        wx.request(options)
      } else if (res.cancel) {}
    }
  })

};

module.exports = {
  getReq,
  postReq,
  delReq
};