// 云函数入口文件
const cloud = require('wx-server-sdk')
const appid = 'wx8f2c412b927daf89'; //你的小程序appid
const secret = '27636b2c35a43ee921714aab6327f0aa'; //你的小程序secret
const envName = 'lessfish-0gn8v8qe65d72e75'; // 小程序云开发环境ID
cloud.init({
      env: envName
})

// 云函数入口函数
exports.main = async(event, context) => {
      //先判断云存储是否存在此二维码
      try {
            await cloud.downloadFile({
                  fileID: 'share/' + event.scene + '.jpeg',
            })
            console.log('get from cos')
            return 'share/' + event.scene + '.jpeg'
       //不存在则进行生成
      } catch (e) {
            console.log('creat start')
            //先获取
            const bufferContent = await cloud.openapi.wxacode.getUnlimited({
                  scene: event.scene,
                  page: 'pages/detail/detail'
            })
            console.log(bufferContent)
            //再上传云存储
            const fileContent = await cloud.uploadFile({
                  cloudPath: 'share/' + event.scene + '.jpeg',
                  fileContent: bufferContent.buffer
            })
            return fileContent.fileID
      }
}