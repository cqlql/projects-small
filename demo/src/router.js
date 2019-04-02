/* eslint-disable comma-dangle */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './menu.config.js'
Vue.use(Router)

// 此处加入测试 demo
// let children = [
//   // {
//   //   path: '/test',
//   //   meta: { title: '实验室' },
//   //   component: require('./test.vue').default
//   // },
//   // {
//   //   path: '/buttons',
//   //   meta: { title: '基础组件-按钮' },
//   //   component: require('@/components/buttons/demo.vue').default
//   // },
//   // {
//   //   path: '/load-refresh',
//   //   meta: { title: '下拉刷新+到底加载' },
//   //   component: require('@/components/load-refresh/Demo.vue').default
//   // },
//   // {
//   //   path: '/load-refresh-nodata',
//   //   meta: { title: '下拉刷新+到底加载-无数据情况' },
//   //   component: require('@/components/load-refresh/Demo.NoData.vue').default
//   // },
//   // {
//   //   path: '/pulldown-refresh',
//   //   meta: { title: '下拉刷新-无数据情况' },
//   //   component: require('@/components/pulldown-refresh/Demo.NoData.vue').default
//   // },
//   // {
//   //   path: '/scroll-bottom-load-page',
//   //   meta: { title: '到底加载+集成翻页' },
//   //   component: require('@/components/scroll-bottom-load/Demo.page.vue').default
//   // },
//   // {
//   //   path: '/slide-select',
//   //   meta: { title: '滑动选择' },
//   //   component: require('@/components/slide-select/Demo.vue').default
//   // },
//   {
//     path: '/file-select',
//     meta: { title: 'demo - 文件选择-拍照、录像、录音、文件选择' },
//     component: require('@/modules/corejs/dom/file-select.demo.vue').default
//   },
//   // {
//   //   path: '/image-crop-rotate',
//   //   meta: { title: '图片裁剪-旋转测试' },
//   //   component: require('@/components/image-crop/Rotate.demo.vue').default
//   // },
//   // {
//   //   path: '/image-crop',
//   //   meta: { title: '图片裁剪' },
//   //   component: require('@/components/image-crop/demo.vue').default
//   // },
//   // {
//   //   path: '/image-crop-canvas',
//   //   meta: { title: '图片裁剪-canvas 裁图旋转测试' },
//   //   component: require('@/components/image-crop/Canvas.demo.vue').default
//   // },
//   // {
//   //   path: '/slide-select-date',
//   //   meta: { title: '滑动选择-日期时间' },
//   //   component: require('@/components/slide-select-date/demo.vue').default
//   // },
//   // {
//   //   path: '/list-select-part',
//   //   meta: { title: '列表选择下拉部分' },
//   //   component: require('@/components/list-select-part/demo.vue').default
//   // },
//   // {
//   //   path: '/slide-select-date-future',
//   //   meta: { title: '滑动选择-未来日期时间' },
//   //   component: require('@/components/slide-select-date/DateTimeFuture.demo.vue').default
//   // },
//   // {
//   //   path: '/mobile-slide',
//   //   meta: { title: '移动端幻灯片' },
//   //   component: require('@/components/mobile-slide/demo.vue').default
//   // },
//   // {
//   //   path: '/animation',
//   //   meta: { title: '动画测试' },
//   //   component: require('@/modules/corejs/animation/transition.demo.vue').default
//   // },
//   // {
//   //   path: '/animation2',
//   //   meta: { title: '动画测试2' },
//   //   component: require('@/modules/corejs/animation/transition-transform.demo.vue').default
//   // },
//   {
//     path: '/switch-multi',
//     meta: { title: 'switch-multi' },
//     // component: require('@/modules/switch-multi/demo.vue').default,
//     docs: import(/* webpackChunkName: "toast" */ '@/components/toast/README.md'),
//     children: [
//       {
//         path: 'a'
//       }
//     ]
//   },
//   // {
//   //   path: '/switch-one',
//   //   meta: { title: 'switch-one' },
//   //   component: require('@/modules/switch-one/demo.vue').default
//   // },
//   // {
//   //   path: '/zoom-touch2',
//   //   component: require('@/modules/zoom-touch2/Demo.vue').default
//   // },
// ]

export default new Router({
  routes: routes
})
