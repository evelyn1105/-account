// pages/index/index.js
const app = getApp()  //引用小程序全局变量
Page({
  data: {
    marginTop: '',
    blockHeight: '',
    scrollHeight: '10px'
  },
  onLoad: function (options) {
    this.SetTopLatyout()
    this.SetScrollHeight()
  },
  onShow: function () {
  },
  pageJump: function (e) {
    const name = e.currentTarget.id
    const url = '../' + name + '/' + name
    wx.navigateTo({
      url: url,
    })
  },
  SetTopLatyout: function () {
    const statusBarHeight = wx.getSystemInfoSync()['statusBarHeight']
    const iphoneSys = wx.getSystemInfoSync().system
    const reg = /^(iOS)\s{1}[A-Za-z0-9\.]*/
    app.globalData.blockHeight = wx.getMenuButtonBoundingClientRect().height + 'px' 
    // console.log(reg.test(iphoneSys))
    let titleHeight
    if(reg.test(iphoneSys) == true){
      titleHeight = 44
    }
    else{
      titleHeight = 48
    }
    let marginTop = statusBarHeight + (titleHeight - 32)/2
    app.globalData.marginTop = marginTop + 'px 10px 0'
    this.setData({
      marginTop: app.globalData.marginTop,
      blockHeight: app.globalData.blockHeight
    })
  },
  SetScrollHeight: function () {
    const statusBarHeight = wx.getSystemInfoSync()['statusBarHeight']
    const windowHeight = wx.getSystemInfoSync().windowHeight
    const query = wx.createSelectorQuery()
    query.select("#headerHeight").boundingClientRect()
    query.exec(res => {
      const headerHeight = res[0].height
      this.setData({
        scrollHeight: windowHeight - headerHeight - statusBarHeight - 10 + 'px'
      })
    })
  }
})