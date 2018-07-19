const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};
const formatDate = (date, format) => {
  format = format == undefined ? "Y-M-D:h:m:s" : format;
  var formateArr = ["Y", "M", "D", "h", "m", "s"];
  var returnArr = [];
  returnArr.push(formatNumber(date.getFullYear()));
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));
  returnArr.push(formatNumber(date.getMilliseconds()));
  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
};
const formatUnixTime = (time, format) => {
  return formatDate(new Date(time), format);
};
const formatMilliseTime = (milliseTime, format) => {
  return formatDate(new Date(milliseTime), format);
};
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const format3Number = n => {
  n = n.toString()
  return n[2] ? n : n[1] ? '0' + n : '00' + n
}
//计数器
var timer = function(obj, that) {
  var timer = new Object();
  var n = obj.n || 50;
  timer.hour = obj.hour || 0;
  timer.minutes = obj.minutes || 0;
  timer.second = obj.second || 0;
  timer.millisecond = obj.millisecond || 0;
  var _dataKey = obj.dataKey
  timer._that = that;
  var _setTimeout = null;
  timer.getDateTimer = function() {
    _setTimeout = setTimeout(function() {
      timer.millisecond = timer.millisecond + n;
      if (timer.millisecond >= 1000) {
        timer.millisecond = 0;
        timer.second = timer.second + 1;
      }
      if (timer.second >= 60) {
        timer.second = 0;
        timer.minutes = timer.minutes + 1;
      }
      if (timer.minutes >= 60) {
        timer.minutes = 0;
        timer.hour = timer.hour + 1;
      }
      var res = formatNumber(timer.hour) + ":" + formatNumber(timer.minutes) + ":" + formatNumber(timer.second) + ":" + format3Number(timer.millisecond);
      var thatData = {};
      thatData[obj.dataKey] = res;
      timer._that.setData(thatData);
      timer.getDateTimer()
    }, n);
  }
  timer.clearTimeout = function() {
    clearTimeout(timer._setTimeout);
    timer._setTimeout = null;
  }
  return timer;
}
// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();
  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

module.exports = {
  formatTime,
  formatDate,
  formatUnixTime,
  timer,
  showBusy,
  showSuccess,
  showModel
}