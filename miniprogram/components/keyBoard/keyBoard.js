// components/keyBoard/keyBoard.js
const app = getApp()
Component({
  properties: {

  },
  data: {
    num: [{n: [1,2,3]}, {n: [4,5,6]}, {n: [7,8,9]}],
    money: '',
    flag: false
  },
  methods: {
    _clickKey: function (e) {
      // console.log(e.currentTarget.dataset.key)
      switch(e.currentTarget.dataset.key){
        case 'clear':
          this.setData({
            money: '',
            flag: false
          })
          break
        case 'ensure':
          break
        case 'del':
          if(this.data.money.slice(this.data.money.length -1) == '.'){
            this.setData({
              flag: false
            })
          }
          this.setData({
            money: this.data.money.slice(0, this.data.money.length -1)
          })
          break
        case '.':
          if(!this.data.flag && this.data.money.length != 0){
            this.setData({
              flag: true,
              money: this.data.money + e.currentTarget.dataset.key
            })
          }
          break
        default:
          this.setData({
            money: this.data.money + e.currentTarget.dataset.key
          })
          break
      }
      this.triggerEvent("_getMoney", {money: this.data.money})
    },
  }
})
