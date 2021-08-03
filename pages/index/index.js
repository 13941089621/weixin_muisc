//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
 
  },
 
  onLoad: function () {
    
  },
  fz(){
    wx.setClipboardData({
      data: 'i1i3dj网',
      success: function (res) {
        // wx.showModal({
        //   title: '提示',
        //   content: '复制成功',
        //   showCancel: false
        // });
      }
    })
  },
  fzs(){
    wx.setClipboardData({
      data: 'i1i3',
    })
  },
  fzd(){
    wx.setClipboardData({
      data: 'wwww.i1i3.com',
    })
  }

})
