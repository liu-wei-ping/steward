// pages/statistic/statistic.js

const currYear = new Date().getFullYear(); // 月份
const currMonth = new Date().getMonth() + 1; // 月份
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workSum: 0,
    restSum: 0,
    overtimeSum: 0,
    days_style: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var year = new Date().getFullYear(); // 年份
    var month = new Date().getMonth() + 1; // 月份
    this.initCalendar(year, month);
  },
  initCalendar: function(year, month) { //月份没有加1
    let days_style = new Array;
    let today = new Date().getDate();
    const days_count = new Date(year, month, 0).getDate();
    for (let i = 1; i <= days_count; i++) {
      const date = new Date(year, month - 1, i);
      if (date.getDay() == 0) {
        days_style.push({
          month: 'current',
          day: i,
          color: '#f488cd'
        });
      } else if (today == i && currMonth == month && currYear == year) {
        days_style.push({
          month: 'current',
          day: i,
          color: 'white',
          background: '#40de5a'
        });
      } else {
        days_style.push({
          month: 'current',
          day: i,
          color: '#a18ada'
        });
      }
    }
    this.setData({
      days_style
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  next: function(event) {
    console.log(event.detail);
    var obj = event.detail;
    this.initCalendar(obj.currentYear, obj.currentMonth);
  },
  prev: function(event) {
    console.log(event.detail);
    var obj = event.detail;
    this.initCalendar(obj.currentYear, obj.currentMonth);

  },
  dateChange: function(event) {
    console.log(event.detail);
    var obj = event.detail;
    this.initCalendar(obj.currentYear, obj.currentMonth);
  },
  dayClick: function(event) {
    console.log(event.detail);
  },
  overtime: function(e) {
    var random = Math.floor(Math.random() * 100);
    var random1 = Math.floor(Math.random() * 100);
    this.setData({
      overtimeSum: random,
      workSum: random1
    })
  },
  rest: function(e) {
    var random = Math.floor(Math.random() * 100);
    var random1 = Math.floor(Math.random() * 100);
    this.setData({
      restSum: random,
      workSum: random1
    })
  },
})