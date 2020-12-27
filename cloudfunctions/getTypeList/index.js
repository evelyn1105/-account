// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    const typeListRes = await db.collection('AccountType').where({kind: 0}).get()
    const typeList = typeListRes.data
    // return await db.collection('AccountType').where({kind: 0}).get()
    return typeList
  } catch(e){
    console.error(e)
  }
}

// wx.cloud.callFunction({
//   name: 'getTypeList',
//   // data: {
//   //  "a": 1,
//   //  "b": 5
//   // },
//   success: (res) => {
//     // console.log(res.result.sum)
//     console.log(res.result)
//   }
// })