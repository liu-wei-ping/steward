// components/selectable.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  // externalClasses: ['selectable','selectable-box'],
  /**
   * 组件的属性列表
   */
  properties: {
    selectItems: Array,
    selectedItem: Object,
    multiSelect: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    isHidden: true,
    multiSelect: false, //false:单选；true:多选
    selectItems: [],
    selectedItems:[]//选中的
  },
  detached: function() {},
  /**
   * 组件的方法列表
   */
  methods: {
    closeSelect(e) {
      this.setData({
        isHidden: !this.data.isHidden,
      })
      this.triggerEvent("closeSelect");
    },
    showSelect(e) {
      console.log(this.data.selectItems);
      console.log(!this.data.isHidden);
      console.log(this.data.multiSelect);
      this.setData({
        isHidden: !this.data.isHidden
      })
    },
    _selectedItem: function(e) {
      // console.log(e);
      var checked = e.detail.value
      var index = e.currentTarget.dataset.index;
      var changed = {}
      var selectItems = this.data.selectItems;
      var selectedItems = this.data.selectedItems;
      var multiSelect=this.data.multiSelect
      for (var i = 0;i < selectItems.length; i++) {
        if (index == i) {
          if (!multiSelect){//单选
            selectedItems=[];
            changed['selectItems[' + i + '].checked'] = true;
            selectedItems.push(selectItems[i]);
          }else{
            var index = selectedItems.indexOf(selectItems[i]);
            if (index!==-1){
              changed['selectItems[' + i + '].checked'] = false;
              selectedItems.splice(index,1);
            }else{
              changed['selectItems[' + i + '].checked'] = true;
              selectedItems.push(selectItems[i]);
            }
          }
         
        } else {
          if (!multiSelect) {
            changed['selectItems[' + i + '].checked'] = false;
          }
        }
      }
      changed.selectedItems = selectedItems;
      this.setData(changed)
      this.triggerEvent("selected", { composed: true });
    }
  }
})