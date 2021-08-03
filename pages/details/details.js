// pages/details/details.js
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    imgs:"",
  
  },
  // 点击跳转 专辑详情 
  musicplayList:function(e){
    console.log(e.currentTarget.dataset.item,23333)
    var musicname =e.currentTarget.dataset.item.musicname
    var url ='https://www.i1i3.com/api/' + e.currentTarget.dataset.item.url
    var img ='https://www.i1i3.com/api/' + e.currentTarget.dataset.item.albumimg
    var mid =e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/musicplay/musicplay?musicname=' + musicname  +"&url=" + url +"&img=" +img+"&mid="+mid
    })
    App.monitor({
      'a':e.currentTarget.dataset.item.albumname ,
      'u': e.currentTarget.dataset.item.uid,
      'pr': e.currentTarget.dataset.item.id,
      't': new Date().getTime(),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid =options.uid
    var indexs =options.indexs
    var albumimg =options.albumimg
  
    console.log(options,656)
    var that =this;
    wx.request({
      url: 'https://www.i1i3.com/api/listalbum/Myalbum?uid=' + uid  +"&isNub=" + indexs ,
      method: 'GET', 
      header: { 
          'Content-Type': 'application/json'
      },
      success: function(res) {        
        that.setData({
          list: res.data.msg,
          imgs: 'https://www.i1i3.com/api/'+ albumimg,
          albumname:res.data.msg[0].albumname,
          albumtext:res.data.msg[0].albumtext,
        })
        console.log(res.data.msg,432)
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