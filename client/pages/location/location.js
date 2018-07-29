// pages/location/location.js
var util = require('../../utils/util.js')
var amap = require('../../utils/amap.js')
var lonlat;
var city;
var tips = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: [],
    location: 1, //0：起始位置 1：终点位置
    placeholder: "输入终点",
    inputValue: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var location = options.location
    var placeholder = "";
    var inputValue = "";
    if (location == 0) {
      var startLocation = wx.getStorageSync("startLocation");
      placeholder = "输入起点";
      inputValue = startLocation ? startLocation.name : '';
    } else {
      var endLocation = wx.getStorageSync("endLocation");
      placeholder = "输入终点";
      inputValue = endLocation ? endLocation.name : '';
    }
    this.setData({
      location: location,
      placeholder: placeholder,
      inputValue: inputValue
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    tips = [];
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    tips = [];
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
  bindinput: function(e) {
    var keywords = e.detail.value;
    var parmas = {
      city: '上海',
      location: lonlat,
      keywords: keywords
    }
    var that = this;
    amap.getInputtips(parmas, function(data) {
      console.log(data);
      if (data && data.tips) {
        tips = data.tips;
        that.setData({
          tips: tips
        });
      }
    })
  },
  bindSearch: function(e) {
    var index = e.target.dataset.index;
    console.log("index-----" + index);
    console.log(tips)
    var selectedTip = tips[index];
    console.log("-------tips------");
    console.log(selectedTip);
    var location = this.data.location;
    console.log(location)
    if (location == 0) {
      wx.setStorageSync("startLocation", selectedTip);
    } else if (location == 1) {
      wx.setStorageSync("endLocation", selectedTip);
    }
    wx.navigateBack({
      delta: 1
    })
  }
})