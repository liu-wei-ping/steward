// pages/statistic/setting.js
var request = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar_url: '',
    gender: 0,
    nick_name: "测试用户",
    real_name: "刘测已",
    birthday: "1991-05-21",
    e_mail: "344545454@qq.com",
    open: true,
    company_name: "上海公司",
    company_address: '上海市黄浦区黄河路65号',
    compangy_loaction: '121.47081,31.23406',
    company_region: '上海市黄浦区',
    postcode: "2100010",
    compangy_mail: "admin@iris.com",
    family_address: '上海市浦东新区航昌路199弄1～31号',
    family_loaction: '121.60946,31.07931',
    family_region: '上海市浦东新区',
    mobile_phone: "13900000011",
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var uid = options.uid;
    //TODO 查询用户信息
    this.setData({
      userInfo: {
        nickName: uid,
        uid: uid,
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
    console.log(this.data);
    console.info("onSHow")
    this.setData({
      family_region: this.data.family_region
    });
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
  switchChange: function(e) {
    console.log('switch 发生 change 事件，携带值为', e.detail.value)
  },
  changeAvatar: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        var tempFilePath = res.tempFilePaths[0];
        console.log(tempFilePath);
        that.setData({
          avatar_url: tempFilePath,
        });
      }
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      birthday: e.detail.value
    })
  },
  changeAddressText: function(opt, data) {
    if (opt == 0) {
      this.setData({
        family_address: data.address,
        family_region: data.region,
        family_loaction: data.loaction
      })
    } else {
      this.setData({
        company_address: data.address,
        company_region: data.region,
        company_loaction: data.loaction
      })
    }
  },
  changeAddress: function(e) {
    var tp = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: './address?type=' + tp,
    })
  },
  formSubmit: function(e) {
    console.log(e);
    var params = {
      userInfo: e.detail.value
    };
    request.postReq("createUserInfo", params,function(res){
      
    })
  },
  changeGender: function(e) {
    var that = this;
    wx.showActionSheet({
      itemList: ["男", "女"],
      success: function(res) {
        that.setData({
          gender: res.tapIndex
        })
      }
    })
  },
  changeInfo: function(e) {

  }
})