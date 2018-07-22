// pages/am/am.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _timerDate: '',
    _num: 1,
    btnClass: 'work-on',
    workStatus: '下班打卡'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  headClick: function (e) {
    var num = e.currentTarget.dataset.num;
    this.setData({
      _num: num
    })
  },
  startClick: function (e) {
    util.timer(this)
    if (!this.setTimeout) {
      this.setData({
        btnClass: 'work',
        workStatus: "我已到家"
      })
      this.getDateTimer();
    } else {
      this.clearTimeout()
    }
  }
})