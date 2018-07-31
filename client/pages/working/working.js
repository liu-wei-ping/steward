// pages/pm/pm.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskId: -1,
    taskTip: "没有任务执行~~",
    _timerDate: '',
    taskList: [{
      content: '',
      optType: 1,
      btnText: '保存'
    }]
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
  addTask: function(e) {
    var last = this.data.taskList;
    var task = {
      content: '',
      optType: 1,
      btnText: '保存'
    };
    last.push(task);
    this.setData({
      taskList: last
    })
  },
  deleteTask: function(e) {
    var index = e.currentTarget.dataset.index; //位置索引从0开始
    var optType = e.currentTarget.dataset.opttype;
    console.log(optType);
    if (optType == 3) {
      wx.showToast({
        title: '任务正在执行中',
      })
      return;
    }
    var taskList = this.data.taskList;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除此任务？',
      success: function(res) {
        if (res.confirm) {
          taskList.splice(index, 1);
          that.setData({
            taskList: taskList
          })
        }
      }
    })


  },
  editTask: function(e) {
    var index = e.currentTarget.dataset.index; //位置索引从0开始
    var taskList = this.data.taskList;
    var item = taskList[index];
    var taskId = this.data.taskId;
    var taskTip = this.data.taskTip;
    if (!item['content']) {
      wx.showToast({
        title: '填写任务信息！',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var optType = e.currentTarget.dataset.opttype;
    if (optType == 1) { //保存任务
      item.optType = 2;
      item.btnText = '执行';
      taskList[index] = item;
    } else if (optType == 2) { //任务执行
      if (taskId >= 0) {
        wx.showToast({
          title: '有任务在执行',
        })
        return;
      }
      taskId = index;
      item.optType = 3;
      item.btnText = '完成';
      taskTip = item['content'];
      taskList[index] = item;
      util.timer(this)
      //初始化
      this.initTimer();
      if (!this.setTimeout) {
        this.getDateTimer();
      }
    } else if (optType == 3) { //任务完成
      taskId = -1;
      this.clearTimeout()
      item.optType = 4;
      item.btnText = '已完成';
      taskList[index] = item;
      taskList.splice(index, 1);
      taskList.push(item);
    }
    this.setData({
      taskTip: taskTip,
      taskList: taskList,
      taskId: taskId
    })
  },
  input: function(e) {
    var index = e.currentTarget.dataset.index; //位置索引从0开始
    var taskList = this.data.taskList;
    taskList[index]['content'] = e.detail.value;
    this.setData({
      taskList: taskList,
    })
  }
})