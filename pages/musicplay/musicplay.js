// pages/musicplay/musicplay.js
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHtml:0,
    img:"",
    name:"",
    url:"",
    mid:"",
    list:"",
    music:"",
   
    isPlayTabimg:true,   // 点击切换
    playTabImg:"../../image/play_a.png",  // 点击播放
    playTabImga:"../../image/play_b.png",  // 点击暂停
    commentList:"",
    show:false,
    textarea:"",
    clickNub:"",
  
  },
  // 点击播放 暂停方法
  tabimg:function(){
    // let value = this.data.isPlayTabimg;
    App.globalData.isPlayAll = !App.globalData.isPlayAll
    var value =App.globalData.isPlayAll
   
    this.setData({
      isPlayTabimg: !value   
    })
    if(value==false){
      this.audioPause()
    }else {     
      this.audioPlay()
      // App.globalData.isPlayAll==true
    }
  },
  audioPlay: function () {
    // this.audioCtx.play()
    console.log(this.data.music,"music")
    wx.playBackgroundAudio({
      //播放地址
      dataUrl: this.data.url || this.data.music,
      //name
      title: this.data.name,
      //图片地址
      coverImgUrl: this.data.poster,
    })
  
  },
  audioPause: function () {
    // this.audioCtx.pause()
    wx.stopBackgroundAudio()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,"")
    this.audioCtx = wx.createAudioContext('myAudio');
    var that = this;
    that.setData({
      img:options.img,
      name: options.musicname,
      url: options.url,
      mid:options.mid,
      isPlayTabimg: !App.globalData.isPlayAll,
      music:options.music
    })
    this.comment()
  },
  comment(){
    var that =this
    wx.request({
      url: `https://www.i1i3.com/api/comment/commentList?mid=${this.data.mid}`, 
      method: 'GET', 
      header: { 
        'Content-Type': 'application/json'
      },
      success: function(res) {  
        that.setData({
          list:res.data.msg
        })
      }
    })
  },
  btnPl(){
    this.setData({
      show: true
    });
  },
  onClose(){
    this.setData({
       show: false
    });
  },
  // 获取值
  textareaInput(res) {
    console.log(res)
    const { value } = res.detail
    this.setData({
      textarea:value
    })
  },
  // 评论
  btnOk(){
    console.log(App.globalData.userId,wx.getStorageSync('userId'))
    var loginUid =  App.globalData.userId
    if(loginUid){
      if(this.data.textarea){
        wx.request({
          url: `https://i1i3.com/api/comment/comment?musicId=${this.data.mid}&musicName=${this.data.name}&textarea=${this.data.textarea}&fid=${wx.getStorageSync('uid')}&img=${this.data.img}`, 
          method: 'GET', 
          header: { 
            'Content-Type': 'application/json'
          },
          success: function(res) {  
            wx.showToast({
              title: '评论成功',
              icon: 'none'
            })
          }
        })
      }else{
        wx.showToast({
          title: '输入内容',
          icon: 'none'
        })
      }
    }else{
      wx.showToast({
        title: '去登入',
        icon: 'none'
      })
    }
    this.setData({
      show: false
    });
  },
  // 点赞
  zan(e){
    console.log(e,2)
    let clickNub =e.currentTarget.dataset.item.commentClick 
    clickNub++;

    this.setData({
      clickNub:clickNub
    })
    wx.showLoading({
      title: '正在加载',
    })
   
    wx.request({
      url: `https://i1i3.com/api/comment/commentClick?clickNub=${clickNub}&id=${e.currentTarget.dataset.item.id}`, 
      method: 'GET', 
      header: { 
        'Content-Type': 'application/json'
      },
      success: function(res) {  
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isHtml:App.globalData.juge
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})