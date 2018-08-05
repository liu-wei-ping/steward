// pages/statistic/address.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    opType: 0,
    address: "",
    loaction: '',
    region: ['上海市', '上海市', '浦东新区'],
    // customItem: '全部'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var opType = options.type;
    console.log(opType);
    wx.setNavigationBarTitle({
      title: opType == 0 ? "设置常住地址" : "设置公司地址"
    })
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2]; //上一页面
    console.log(prePage);
    if (prePage.route == 'pages/statistic/setting') {
      var preData = prePage.data;
      if (opType == 0) {
        this.setData({
          address: preData.family_address,
          opType: opType
        })
      } else {
        this.setData({
          address: preData.company_address,
          opType: opType
        })
      }
    }

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
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  selectAddress: function(e) {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        var name = res.name;
        var address = res.address;
        var loaction = res.longitude + "," + res.latitude;
        that.setData({
          address: address,
          loaction: loaction
        })
      }
    })
  },
  formSubmit: function(e) {
    console.log(e);
    var opType = this.data.opType;
    var data = e.detail.value;
    var obj = {
      address: data.address,
      region: data.region,
      loaction: data.loaction,
    }
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    if (prePage.route == 'pages/statistic/setting') {
      prePage.changeAddressText(opType, obj);
    }
    wx.navigateBack({
      delta: 1,
    })
  },
  bindconfirm: function(e) {
    console.log(e);
    var value = e.detail.value;
  }
})