
//index.js
//获取应用实例
const App = getApp()
Page({
  data: {
    hasUserInfo: false,  //显示隐藏 登入 按钮
    loginId:"",   // ID
    islogin:"",   // 显示隐藏 登入  账号 id 
    avatarUrl:"", // img url
    nickName:""   // name
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        avatarUrl:wx.getStorageSync("avatarUrl"),
        nickName:wx.getStorageSync("nickName")
      })
    }
    this.setData({
      islogin:wx.getStorageSync('userId')
    })
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.setStorageSync("avatarUrl", res.userInfo.avatarUrl)
        wx.setStorageSync("nickName", res.userInfo.nickName)
        this.setData({
          hasUserInfo: true,
          avatarUrl:res.userInfo.avatarUrl,
          nickName:res.userInfo.nickName,
        })
        console.log(res,"微信登入信息")
        this.btn()
      }
    })
  },
  btn(){
    //  把 wx appid 转成 数字
    const accountInfo = wx.getAccountInfoSync();
    // console.log(accountInfo.miniProgram.appId) // 小程序 appId
    var reg=/[0-9]/g;
    var str=accountInfo.miniProgram.appId;
    var t=str.match(reg);
    var nub =t.map(Number).toString().replace(/,/g,"")
    this.setData({
      loginId:nub,
    })
    console.log(this.data.loginId,nub,"获取微信 id 转换成唯一表示");

    wx.request({ 
      url: `https://i1i3.com/api/register?accounts=${nub}&passwords=${nub}`,
      method: 'GET', 
      header: { 
        'Content-Type': 'application/json'
      },
      success: function (data) {
        console.log(data.data.msg,"用户已经注册")
        if(data.data.msg=='用户已经注册'){
          wx.request({ 
            url: `https://i1i3.com/api/login?accounts=${nub}&passwords=${nub}`,
            method: 'GET', 
            header: { 
              'Content-Type': 'application/json'
            },
            success: function (data) {
              console.log(data.data.msg,"最后登入成功了")
              App.globalData.userId = nub;
              wx.setStorageSync("userId", App.globalData.userId) 
            } 
          })
        }else if(data.data.msg=='新用户注册成功'){
          console.log("新用户注册成功")
        }
      }
    })
  },
  // 跳转说明
  go(){
    wx.navigateTo({
      url: `/pages/index/index`
    }) 
  },
  // 退出
  btnOut(){
    console.log("退出")
    wx.removeStorageSync("avatarUrl")
    wx.removeStorageSync("nickName")
    wx.removeStorageSync("userId")
    let that = this
    that.setData({
      hasUserInfo: false,
    })
    this.onLoad();
  },
  // 账号登入
  btnAccount(){
    wx.navigateTo({
      url: `/pages/wxlogin/wxlogin`
    }) 
  }
})
