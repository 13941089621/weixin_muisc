// component/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type:Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperIndex: 0,
  },
 

  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange: function (e) {
      this.setData({
        swiperIndex: e.detail.current
      })
    },
    btnImg(e){
      console.log(e.currentTarget.dataset.item);
      // console.log(1111);
      var uid=e.currentTarget.dataset.item.uid
      var cid=e.currentTarget.dataset.item.cid
      var indexs=e.currentTarget.dataset.item.indexs
      var albumimg =e.currentTarget.dataset.item.albumimg
      wx.navigateTo({
        url: '/pages/details/details?uid=' + uid  +"&cid=" + cid + "&indexs=" +indexs +"&albumimg=" +albumimg
      })
    },
    
  }
})
