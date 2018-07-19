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
    var that = this;
    timer = util.timer({
      milliseconds: 50,
      dataKey: "_dateTimer"
    }, that)
    console.log(timer);
    if (!timer._setTimeout) {
      timer.getDateTimer();
    }
  },
  endClick: function(e) {
    timer.clearTimeout()
  }
})