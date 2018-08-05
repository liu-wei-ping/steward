// pages/statistic/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar_url: '',
    gender: 0,
    company_address: '',
    compangy_loaction: '',
    company_region: '',
    family_address: '',
    family_loaction: '',
    family_region: '',
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