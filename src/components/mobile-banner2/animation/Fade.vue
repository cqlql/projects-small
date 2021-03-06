<template>
  <ul class="fade">
    <li
      v-for="(item,index,key) of list" :key="key" ref="items"
      class="item"
      :style="{opacity:item.opacity}"
    >
      <img :src="item.isShow && item.url">
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Watch } from 'vue-property-decorator'
import transitionendOnce from '@/utils/corejs/animation/transitionend-once.ts'
import timeout from '@/utils/corejs/time/timeout-async'
interface imgItem {
  isShow: boolean
  url: string
  opacity: number
}

@Component
export default class Move extends Vue {
  @Prop() readonly imgs!: string[]
  @Prop() readonly width!: number
  index = 0
  list: imgItem[] = []

  moveIndex = 0 // 临时记录当前移动索引，有移动没有切换需要归位情况使用
  // 临时记录。左右移动时清理移动过的项
  prevIndex: number|undefined
  nextIndex: number|undefined

  locked = false
  get count () {
    return this.list.length
  }

  get lastIndex () {
    return this.count - 1
  }

  get multiple () {
    return this.count > 1
  }

  move (x: number) {
    let { index, prevIndex, nextIndex } = this
    const ratio = x / this.width
    if (x < 0) {
      this.opcity(index, 1 + ratio)
      nextIndex = index + 1
      if (nextIndex > this.lastIndex) nextIndex = 0
      if (prevIndex !== undefined && prevIndex !== nextIndex) {
        this.opcity(prevIndex, 0)
        this.prevIndex = undefined
      }
      this.opcity(nextIndex, -ratio)
      this.nextIndex = this.moveIndex = nextIndex
    } else {
      this.opcity(index, 1 - ratio)
      let prevIndex = index - 1
      if (prevIndex < 0) prevIndex = this.lastIndex
      if (nextIndex !== undefined && nextIndex !== prevIndex) {
        this.opcity(nextIndex, 0)
        this.nextIndex = undefined
      }
      this.opcity(prevIndex, ratio)
      this.prevIndex = this.moveIndex = prevIndex
    }
  }

  swipeLeft () {
    if (!this.multiple) {
      this.swipeNot()
      return
    }
    let { index } = this
    index++
    if (index > this.lastIndex) {
      index = 0
    }
    this.loadImg(index)
    this.fade(this.index, 0)
    this.fade(index, 1)
    this.index = index
  }

  swipeRight () {
    if (!this.multiple) {
      this.swipeNot()
      return
    }
    let { index } = this
    index--
    if (index < 0) {
      index = this.lastIndex
    }
    this.loadImg(index)
    this.fade(this.index, 0)
    this.fade(index, 1)
    this.index = index
  }

  swipeNot () {
    this.fade(this.index, 1)
    this.fade(this.moveIndex, 0)
  }

  @Watch('imgs')
  onImgsChanged () {
    this.listSet()
    this.loadImg(0)
    this.opcity(0, 1)
  }

  created () {
    this.listSet()
    this.loadImg(this.index)
  }

  mounted () {
    this.opcity(this.index, 1)
  }

  listSet () {
    this.list = this.imgs.map(url => ({
      isShow: false,
      url,
      opacity: 0
    }))
  }

  async loadImg (index: number) {
    const list = this.list
    const item = list[index]
    item.isShow = true

    await timeout(2000)

    let preIndex = index - 1
    if (preIndex < 0) preIndex = this.lastIndex
    let nextIndex = index + 1
    if (nextIndex > this.lastIndex) nextIndex = 0
    list[preIndex].isShow = list[nextIndex].isShow = true
  }

  fade (index: number, value: number) {
    const elem = (this.$refs.items as HTMLElement[])[index]
    const item = this.list[index]
    const { classList } = elem
    classList.add('transitionActive')
    this.locked = true
    transitionendOnce(elem, () => {
      this.locked = false
      classList.remove('transitionActive')
    })
    item.opacity = value
  }

  opcity (index: number, value: number) {
    const item = this.list[index]
    if (item) item.opacity = value
  }
}
</script>

<style scoped>
.fade {
  position: relative;
  width: 100%;
  height: 100%;
}
.item {
  position: absolute;
  width: 100%;
  height: 100%;
}
.transitionActive {
  transition:opacity 0.3s ease;
}
</style>
