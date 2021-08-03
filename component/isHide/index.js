// component/isHide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrls: [
      'https://bkimg.cdn.bcebos.com/pic/09fa513d269759eefabc37a6b8fb43166c22dfeb?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U4MA==,g_7,xp_5,yp_5/format,f_auto',
      'https://bkimg.cdn.bcebos.com/pic/0df431adcbef760943c4cef224dda3cc7dd99e8b?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U4MA==,g_7,xp_5,yp_5/format,f_auto',
    ],
    swiperIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  
  methods: {
    swiperChange(e) {
      this.setData({
        swiperIndex: e.detail.current
      })
    },
  }
})
