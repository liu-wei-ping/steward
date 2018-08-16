// components/selectable.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    selectItems: Array,
    selectedItem: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    isHidden: true,
    selectItems: []
  },
  detached: function() {},
  /**
   * 组件的方法列表
   */
  methods: {
    closeSelect(e) {
      this.setData({
        isHidden: !this.data.isHidden
      })
    },
    showSelect(e) {
      console.log(this.data.selectItems);
      console.log(!this.data.isHidden);
      this.setData({
        isHidden: !this.data.isHidden
      })
    },
    _selectChange: function(e) {
      console.log(e);
      var checked = e.detail.value
      var changed = {}
      var selectItem = {};
      var bindNameKey = this.data.bindNameKey;
      var bindValueKey = this.data.bindValueKey;
      var selectItems = this.data.selectItems;
      for (var i = 0; i < selectItems.length; i++) {
        if (checked.indexOf(selectItems[i].value) !== -1) {
          changed['selectItems[' + i + '].checked'] = true
          changed.selectedItem = selectItems[i];
        } else {
          changed['selectItems[' + i + '].checked'] = false
        }
      }
      this.setData(changed)
      this.triggerEvent("selected");
    }
  }
})