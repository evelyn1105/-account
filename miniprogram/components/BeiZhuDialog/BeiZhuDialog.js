// components/BeiZhuDialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    showFlag: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //showDialog
    toggleBeizhuDialog: function () {
      this.setData({
        showFlag: !this.data.showFlag
      })
    },
    submitBeizhu: function (e) {
      const beizhu = e.detail.value.beizhu
      this.triggerEvent("_getBeizhu", {"beizhu": beizhu})
    },
    cancelBeizhuDialog: function () {
      this.triggerEvent("_cancel")
    }
  }
})
