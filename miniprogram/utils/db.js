wx.cloud.init()
const db = wx.cloud.database({
  env: "evelyn-k728j"
});
module.exports = {
  getAccountTypeList: (kind) => db.collection('AccountType').where({kind: kind}).get(),
}