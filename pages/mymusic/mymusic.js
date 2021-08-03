// pages/mymusic/mymusic.js

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isHtml:0,  // 判断显隐
    inputValue:"",
    tid:"",
    nameList:[
      {id:0,name:"全部"},
      {id:1,name:"劲爆"},
      {id:2,name:"清闲"},
      {id:3,name:"狂嗨"},
      {id:4,name:"电子"},
      {id:5,name:"DJ电音(Remix)"},
      {id:6,name:"蹦迪"},
      {id:7,name:"爵士乐"},
      {id:8,name:"心灵疗伤"},
      {id:9,name:"摇滚说唱"},
      {id:10,name:"串烧"},
      {id:11,name:"车载"},
    ],
    nameListTwo: [
      // {id:0,name:"郁闷"},
      // {id:1,name:"兴奋"},
      // {id:2,name:"幸福"},
      // {id:3,name:"劲爆"},
      // {id:4,name:"狂嗨"},
      // {id:5,name:"沉重"},
      // {id:6,name:"失落"},
      // {id:7,name:"快活"},
      // {id:8,name:"开心"},
    ],
  },
    // 跳转 首页
  linto(){
    app.globalData.typeNub = this.data.inputValue;
    app.globalData.tid = 0;
    wx.switchTab({
      url: '/pages/lists/lists'   
    })
  },
    // 获取 input 值
  bindKeyInput(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  // list btn
  btnList(e){
 
    app.globalData.typeNub = null;
    app.globalData.tid = e.target.dataset.item.id
    console.log(e.target.dataset.item.id,666)
   
    wx.switchTab({
      url: '/pages/lists/lists'   
    })

  },

  
  


 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      isHtml:app.globalData.juge
    })
    console.log(app.globalData.typeNub)
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