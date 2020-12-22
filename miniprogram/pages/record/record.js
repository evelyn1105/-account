// pages/record/record.js
const initTime = require('../../utils/initTime')
const db = require('../../utils/db')
const app = getApp()

let startX, endX;
let moveFlag = false;

Page({
  data: {
    marginTop: '',
    blockHeight: '',
    kind : 0,
    ani1: '',
    ani2: '',
    timeFormat: '',
    incomeType: '',
    outcomeType: '',
    selType: 0
  },
  onLoad: function (options) {
    this.initHeight()
    this.initData()
    this.initPage()
  },
  onShow: function () {
  },
  initHeight: function () {
    this.setData({
      marginTop: app.globalData.marginTop,
      blockHeight: app.globalData.blockHeight
    })
  },
  initData: function () {
    db.getAccountTypeList(0).then(res => {
      const outcomeType = res.data
      const remain = outcomeType.length % 5
      if(remain != 0){
        for(let i = 0; i < 5 - remain; i++){
          outcomeType.push({})
        }
      }
      this.setData({
        outcomeType: outcomeType
      })
    })
    db.getAccountTypeList(1).then(res => {
      const incomeType = res.data
      const remain = incomeType.length % 5
      if(remain != 0){
        for(let i = 0; i < 5 - remain; i++){
          incomeType.push({})
        }
      }
      this.setData({
        incomeType: incomeType
      })
    })
  },
  initPage: function () {
    this.getNowTime()
  },
  getNowTime: function () {
    const year = initTime.getYear()
    const month = initTime.getMonth()
    const day = initTime.getDay()
    let hour = initTime.getHour()
    let min = initTime.getMin()
    if(hour < 10) {
      hour = '0' + hour
    }
    if(min < 10) {
      min = '0' + min
    }
    this.setData({
      timeFormat: year + '-' + month + '-' + day + " " + hour + ":" + min
    })
  },
  SeleceAccountType: function (e) {
    console.log(e.currentTarget.dataset.idx)
    this.setData({
      selType: e.currentTarget.dataset.idx
    })
  },
  // 开始触摸
  touchStart: function (e) {
    startX = e.touches[0].pageX // 获取触摸时的原点
    moveFlag = true
  },
  // 触摸移动事件
  touchMove: function (e) {
    endX = e.touches[0].pageX // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 60) {
        console.log("move right")
        this.move2right()
        moveFlag = false
      }
      if (startX - endX > 60) {
        console.log("move left")
        this.move2left()
        moveFlag = false
      }
    }
  },
  // 触摸结束事件
  touchEnd: function (e) {
    moveFlag = true // 回复滑动事件
    // setTimeout(() => {
    //   this.setData({
    //     selType: 0
    //   })
    // }, 700)
  },
  //向左滑动操作
  move2left() {
    const that = this;
    if (this.data.kind == 1) {
      return
    }
    const animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 100
    });
    animation.opacity(0.2).translate(-500, 0).step()
    this.setData({
      ani1: animation.export()
    })
    setTimeout(function () {
      that.setData({
        kind: 1,
        ani2: '',
        selType: 0
      });
    }, 700)
  },
  //向右滑动操作
  move2right() {
    const that = this;
    if (this.data.kind == 0) {
      return
    }
    const animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
      delay: 100
    });
    animation.opacity(0.2).translate(500, 0).step()
    this.setData({
      ani2: animation.export() 
    })
    setTimeout(function () {
      that.setData({
        kind: 0,
        ani1: '',
        selType: 0
      });
    }, 700)
  }
})