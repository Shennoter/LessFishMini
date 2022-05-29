// 云函数入口文件
const cloud = require('wx-server-sdk')
const QcloudSms = require("qcloudsms_js")
// 云短信 AppID 以及 AppKey
const appid =xxxxxxxxxxxxxxx
const appkey = "xxxxxxxxxxxxxxx"
const templateId = xxxxxxxxxxxx // 申请模板 ID
const smsSign = "xxxxxxxxxxxx"// 申请的签名

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => new Promise((resolve, reject) => {
      /*单发短信示例为完整示例，更多功能请直接替换以下代码*/
      var qcloudsms = QcloudSms(appid, appkey);
      var ssender = qcloudsms.SmsSingleSender();
      var params = [event.title];
      // 获取发送短信的手机号码
      var mobile = event.mobile
      // 获取手机号国家/地区码
      var nationcode = 86
      ssender.sendWithParam(nationcode, mobile, templateId, params, smsSign, "", "", (err, res, resData) => {
            /*设置请求回调处理, 这里只是演示，您需要自定义相应处理逻辑*/
            if (err) {
                  console.log("err: ", err);
                  reject({ err })
            } else {
                  resolve({ res: res.req, resData })
            }
      }
      );

})
