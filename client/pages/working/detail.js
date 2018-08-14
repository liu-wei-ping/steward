// pages/working/detail.js
var request = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [{
        name: '一级',
        value: '1'
      },
      {
        name: '二级',
        value: '2'
      },
      {
        name: '三级',
        value: '3'
      }
    ],
    isAssign: false,
    taskInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var params = {
      id: options.tid,
    }
    var radioItems = this.data.radioItems;
    request.postReq("queryTaskInfo", params, (res) => {
      if (res.code == 1) {
        var taskInfos = res.data;
        var taskInfo = taskInfos ? taskInfos[0] : {};
        for (var i = 0; i < radioItems.length; i++) {
          if (radioItems[i].value == taskInfo.level) {
            radioItems[i].checked = true;
            break;
          }
        }
        this.setData({
          taskInfo: taskInfo,
          isAssign: options.isAssign ? options.isAssign : false,
          radioItems: radioItems
        })
      }
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
  radioChange: function(e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].value) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  editSubmit: function(e) {
    var params = e.detail.value;
    console.log(params);
    request.postReq("updateTaskInfo", params, (res) => {
          console.log(res);
    });
  },
})