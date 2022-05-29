const app = getApp();
const config = require("../../config.js");
const db = wx.cloud.database();
Page({

      /**
       * 页面的初始数据
       */
      data: {
            showShare: false,
            poster: JSON.parse(config.data).share_poster,
            userInfo: {},
            hasUserInfo: false
      },
      onShow: function() {
            let that = this;
            db.collection('user').where({
              _openid: app.openid
            }).get({
              success: function (res) {
                    console.log(res)
                    that.setData({
                          userInfo: res.data[0].info,
                          hasUserInfo: true
                    })
              },
              fail(){
                    console.log("fail")
                    that.setData({
                      hasUserInfo: false
                    })
              }
        })
        console.log(that.data.userInfo);
      },
      go(e) {
            if (e.currentTarget.dataset.status == '1') {
                  if (!app.openid) {
                        wx.showModal({
                              title: '温馨提示',
                              content: '该功能需要注册方可使用，是否马上去注册',
                              success(res) {
                                    if (res.confirm) {
                                          wx.navigateTo({
                                                url: '/pages/login/login',
                                          })
                                    }
                              }
                        })
                        return false
                  }
            }
            wx.navigateTo({
                  url: e.currentTarget.dataset.go
            })
      },
      //展示分享弹窗
      showShare() {
            this.setData({
                  showShare: true
            });
      },
      //关闭弹窗
      closePop() {
            this.setData({
                  showShare: false,
            });
      },
      //预览图片
      preview(e) {
            wx.previewImage({
                  urls: e.currentTarget.dataset.link.split(",")
            });
      },
      onShareAppMessage() {
            return {
                  title: JSON.parse(config.data).share_title,
                  imageUrl: JSON.parse(config.data).share_img,
                  path: '/pages/start/start'
            }

      },
})