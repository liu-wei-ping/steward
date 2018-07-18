// pages/am/am.js
var util = require('../../utils/util.js')
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _num: 1,
    _dateTimer: ''
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
    this.setData({
      _num: num
    })
  },
  startClick: function(e) {
    this.timing(this);
  },
  timing:function(that) {
    timer = setTimeout(function() {
      that.setData({
        _dateTimer: util.formatUnixTime(Date.parse(new Date()))
      })
      that.timing(that)
    }, 1000);
  }
})