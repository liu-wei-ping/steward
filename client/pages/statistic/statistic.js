// pages/statistic/statistic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendar: {

    },
    days_style: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let days_style = new Array;
    // for (let i = 1; i <= days_count; i++) {
    //   const date = new Date(this.data.year, this.data.month - 1, i);
    //   if (date.getDay() == 0) {
    //     days_style.push({
    //       month: 'current',
    //       day: i,
    //       color: '#f488cd'
    //     });
    //   } else {
    //     days_style.push({
    //       month: 'current',
    //       day: i,
    //       color: '#a18ada'
    //     });
    //   }
    // }
    days_style.push({
      month: 'current',
      day: 12,
      color: 'white',
      background: '#b49eeb'
    }, {
      month: 'current',
      day: 17,
      color: 'white',
      background: '#f5a8f0'
    }, {
      month: 'current',
      day: 20,
      color: 'white',
      background: '#aad4f5'
    }, {
      month: 'current',
      day: 25,
      color: 'white',
      background: '#84e7d0'
    }, );
    this.setData({
      days_style: days_style
    })
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
  },
  prev: function(event) {
    console.log(event.detail);
  },
  dateChange: function(event) {
    console.log(event.detail);
  },
  dayClick: function(event) {
    console.log(event.detail);
  }
})