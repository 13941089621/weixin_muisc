let App = getApp()
Page({
  data: {
    isHtml:0,  // 判断显隐
    logs: [],
    list:[
      
    ],
    lists:[
    
    ]
  },
 
  // 点击跳转 专辑详情 
  details:function(e){
    // console.log(e.currentTarget.dataset.item,22)
    var uid=e.currentTarget.dataset.item.uid
    var cid=e.currentTarget.dataset.item.cid
    var indexs=e.currentTarget.dataset.item.indexs
    var albumimg =e.currentTarget.dataset.item.albumimg
    wx.navigateTo({
      url: '/pages/details/details?uid=' + uid  +"&cid=" + cid + "&indexs=" +indexs +"&albumimg=" +albumimg
    })

    App.monitor({
      'a':e.currentTarget.dataset.item.albumname ,
      'u': e.currentTarget.dataset.item.uid,
      'pr': e.currentTarget.dataset.item.indexs,
      't': new Date().getTime(),
    })
  },
  onLoad: function () {
    var that =this;
    wx.request({
      url: 'https://www.i1i3.com/api/listalbum/albumListAll', 
      method: 'GET', 
      header: { 
          'Content-Type': 'application/json'
      },
      success: function(res) {        
        that.setData({
          list: res.data.msg       
        })
        console.log(res.data.msg)
      }
    })
    that.setData({
      isHtml:App.globalData.juge
    })
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("监听页面显示")
    this.setData({
      isHtml:App.globalData.juge
    })
  
  },
 

})
