module.exports = {
  backToPre: (page) => {
    wx.navigateTo({
      url: '../' + page + '/' + page,
    })
  }
}