// pages/home/home.js
let App = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    itemid:0,
    isHtml:0,  // 判断显隐
    posterimg:"" ||'https://www.i1i3.com/api/public/img/user/upload_d77dbed3828d70761c58bb0d51868939.jpg',
    poster: ''||'https://www.i1i3.com/api/public/img/user/upload_d77dbed3828d70761c58bb0d51868939.jpg' ,
    name: '' || 'Dj伯格-朱克-爱的暴风雨',
    author:'' || 'Dj伯格',
    src: '' || 'https://www.i1i3.com/api/uploads/goods/upload_2d2a76bb7a5da0b123bf9761e25c9ae1.mp3',
    musicTime: "00:00:00",
    musicTimeall:"00:00:00",

    isplay:false,
    tabimg1:'../../image/play_on.png',
    tabimg2:'../../image/play_off.png',

    arr: [

    ],
    page:1,
    typeNub:"" ,
    uid:"",
    musicSearch:"",
    typeMood:"",
   
    navbarInitTop:0,
    isFixedTop:false,
    pid:"",
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    // console.log(options,"333")
    that.setData({
      isHtml:App.globalData.juge,
    })
    console.log(App.globalData.isPlayAll,"333")
    this.playList()
    // this.innerAudioContext.onStop((res) => {
    //   console.log('播放结束!');
    // })
  },
  //  list
  playList(){
    var that =this;
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio');
    wx.request({
      url: `https://www.i1i3.com/api/listAll/list?page=${this.data.page}&type=${this.data.typeNub}&musicSearch=${this.data.musicSearch}&typeMood=${this.data.typeMood}`, 
      method: 'GET', 
      header: { 
            'Content-Type': 'application/json'
      },
      success: function(res) {  
        if(res.data.msg) {
          that.setData({
            arr: res.data.msg.concat(res.data.msg)         
          })
        }else{
          that.setData({
            src:'https://www.i1i3.com/api/'+res.data.msg[0].url,
            name: res.data.msg[0].musicname,
            author:res.data.msg[0].istopic,      
          })
        }           
      
        // console.log(res.data.msg[0],123)
      }
    })
  },
  // img 
  imgData(){
    var that =this
    wx.request({
      url: `https://www.i1i3.com/api/listAll/listUserImg?uid=${this.data.uid}`, 
      method: 'GET', 
      header: { 
        'Content-Type': 'application/json'
      },
      success: function(res) {  
        // console.log(res.data.msg[0].img,1233)
        that.setData({
          posterimg:'https://www.i1i3.com/api/' + res.data.msg[0].img
        })
      }
    })
  },

 
  tabimg: function(){
    // var imgs =this.data.isplay
    
    var imgs =App.globalData.isPlayAll
    App.globalData.isPlayAll = !App.globalData.isPlayAll
    this.setData({
      isplay:!imgs
    })
    if(imgs==false){
      this.audioPlay()
    }else{
      this.audioPause()
    }
    console.log(App.globalData.isPlayAll,"sss");
  },
  

  // 点击跳转
  btnmusicplay:function(e){
    console.log(e.currentTarget.dataset,"asfdsafsdfsdg")
    wx.navigateTo({
      url: `/pages/musicplay/musicplay?musicname=${e.currentTarget.dataset.name}&&img=${e.currentTarget.dataset.posterimg}&&mid=${e.currentTarget.dataset.pid}&&music=${e.currentTarget.dataset.music}`
    })  
  },

  audioPlay: function () {
    // this.audioCtx.play()
    this.audiockPlay()
  },
  // 窗口 播放
  audiockPlay: function () {
    wx.playBackgroundAudio({
      //播放地址
      dataUrl: this.data.src,
      //name
      title: this.data.name,
      //图片地址
      coverImgUrl: this.data.posterimg
    })
  },

  // 停止 窗口
  stopPlay(){
    wx.stopBackgroundAudio()
  },
  audioPause: function () {
    this.audioCtx.pause()
    this.stopPlay()
  },
  bindended(e){
    console.log(e,56)
  },


  // 获取歌曲时间倒计时
  bindtimeupdate(res) {
    console.log('bindtimeupdate', parseInt(res.detail.currentTime), '时间总时长-->', parseInt(res.detail.duration));
    this.time(parseInt(res.detail.currentTime))
    this.timeAll(parseInt(res.detail.duration))
    var timeall =parseInt(res.detail.duration)
    var time =parseInt(res.detail.currentTime)
    if(timeall - time==0){
      this.setData({
        isplay:false,
        musicTime:"00:00:00",
        musicTimeall:"00:00:00",
      })
    }
    
  },
  time:function(endTime){
    let secondTime = parseInt(endTime)//将传入的秒的值转化为Number
    let min = 0// 初始化分
    let h =0// 初始化小时
    let result=''
    if(secondTime>60){//如果秒数大于60，将秒数转换成整数
      min=parseInt(secondTime/60)//获取分钟，除以60取整数，得到整数分钟
      secondTime=parseInt(secondTime%60)//获取秒数，秒数取佘，得到整数秒数
      if(min>60){//如果分钟大于60，将分钟转换成小时
        h=parseInt(min/60)//获取小时，获取分钟除以60，得到整数小时
        min=parseInt(min%60) //获取小时后取佘的分，获取分钟除以60取佘的分
      }
    }
    result=`${h.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secondTime.toString().padStart(2,'0')}`
    this.setData({
      musicTime:result,
    })
    return result 
  },


  timeAll:function(endTime){
    let secondTime = parseInt(endTime)//将传入的秒的值转化为Number
    let min = 0// 初始化分
    let h =0// 初始化小时
    let result=''
    if(secondTime>60){//如果秒数大于60，将秒数转换成整数
      min=parseInt(secondTime/60)//获取分钟，除以60取整数，得到整数分钟
      secondTime=parseInt(secondTime%60)//获取秒数，秒数取佘，得到整数秒数
      if(min>60){//如果分钟大于60，将分钟转换成小时
        h=parseInt(min/60)//获取小时，获取分钟除以60，得到整数小时
        min=parseInt(min%60) //获取小时后取佘的分，获取分钟除以60取佘的分
      }
    }
    result=`${h.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secondTime.toString().padStart(2,'0')}`
    this.setData({
      musicTimeall:result,
    })
    return result 
  },

  btnlist:function(event){
    let url = event.currentTarget.dataset.url.url
    let musicname = event.currentTarget.dataset.url.musicname
    let istopic = event.currentTarget.dataset.url.istopic
    var isplay =this.data.isplay
    let pid =event.currentTarget.dataset.url.id
   

    App.monitor({
      'a':event.currentTarget.dataset.url.musicname ,
      'u': event.currentTarget.dataset.url.uid,
      'pr': event.currentTarget.dataset.url.id,
      't': new Date().getTime(),
    })

    if (this.data.itemid == event.currentTarget.dataset.ind){
      return;
    }
    this.setData({
      itemid: event.currentTarget.dataset.ind,
      uid:event.currentTarget.dataset.url.uid
    })
    wx.stopBackgroundAudio()
    
    // 
    this.setData({
      src:'https://www.i1i3.com/api/'+ url,
      author:istopic,
      name:musicname,
      musicTime:"00:00:00",
      musicTimeall:"00:00:00",
      isplay:false,
      navbarInitTop:event.currentTarget.offsetTop,
      pid:pid
    })
    this.imgData()
    console.log(event.currentTarget.offsetTop,55)
    this.setData({
         isFixedTop: false
    });

  },

  /**
  * 监听页面滑动事件
  */
  onPageScroll: function(e) {
    var scrollTop = parseInt(e.scrollTop); //滚动条距离顶部高度
    //判断'滚动条'滚动的距离 和 '元素在初始时'距顶部的距离进行判断
    var isSatisfy = scrollTop >= this.data.navbarInitTop ? true : false;
    //为了防止不停的setData, 这儿做了一个等式判断。 只有处于吸顶的临界值才会不相等
    if (this.data.isFixedTop === isSatisfy) {
     return false;
    }
    this.setData({
     isFixedTop: isSatisfy
    });
   },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("监听页面初次渲染完成")
    // this.setData({
    //   isHtml: 1
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("监听页面显示")
    var musicSearch = getApp().globalData.typeNub
    var typeNub = getApp().globalData.tid


    console.log(musicSearch,typeNub,"aa")
    if(musicSearch!=null){
      // console.log(1111111)
      this.setData({
        typeNub:527,
        page:1,
        musicSearch:musicSearch,
      
      })
      this.playList()
    }else{
      // console.log(2222222)
      this.setData({
        typeNub:typeNub,
        page:1,
        musicSearch:null,
     
      })
      this.playList()
    }
    this.setData({
      isHtml:App.globalData.juge,
      isplay: App.globalData.isPlayAll
    })
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("监听页面隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("监听页面卸载")
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
    wx.showLoading({
      title: '正在加载',
    })
    var that =this;
    let page =this.data.page +1
    wx.request({
      // url: `https://www.i1i3.com/api/listAll/list?page=${page}`, 
      url: `https://www.i1i3.com/api/listAll/list?page=${this.data.page}&type=${this.data.typeNub}&musicSearch=${this.data.musicSearch}&typeMood=${this.data.typeMood}`,
      method: 'GET', 
      header: { 
          'Content-Type': 'application/json'
      },
      success: function (data) {
        var wear=that.data.arr;//空的,用于拼接每次刷新获取的数据
        that.setData({
          page: page,
          arr:wear.concat(data.data.msg)
         })
        wx.hideLoading();
      }
      
    })
    console.log(page,6666)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})