<template>
  <div class="box">
    <div class="move" ref="eMove" :style="{left:x+'px'}">
      <p v-for="(v,i) in 60" :key="i" :style="{transform:`translateX(${i*100}px)`}" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import swipex from './swipex.js'
import Animation from '@/utils/corejs/animation/animation.js'

class Anima {
  constructor ({move = () => {}, rate = 0.2, complete = () => {}}) {
    this.rate = rate
    this.move = move

    // 开关。 是否进行中。true 进行中
    this.sw = false

    this.cur = 0

    this.complete = complete
  }

  start (to, cur = this.cur) {
    let {move} = this

    this.to = to
    this.cur = cur

    if (this.sw) return
    this.sw = true

    let excu = () => {
      if (this.sw) {
        let {to, cur, rate} = this

        this.cur = cur = cur + (rate*=0.5) * (to - cur)

        // 最后一次
        if (Math.abs(to - cur) < 1) {
          this.cur = to
          this.sw = false
          this.complete()
        }

        move(cur)

        this.stopId = window.requestAnimationFrame(excu)
      }
    }
    excu()
  }

  stop () {
    this.sw = false
    window.cancelAnimationFrame(this.stopId)
  }
}
export default {
  data () {
    return {
      x: 0
    }
  },
  mounted () {
    let animation = new Animation()
    let anima = new Anima({move: (x) => {
      this.x = x
    }})
    // animation.easing = (x, t, b, c, d) => { return c * Math.sin(t / d * (Math.PI / 2)) + b }
    swipex({
      elem: this.$el,
      onMove: (xLen) => {
        this.x += xLen
      },
      onSwipeRight: (speed) => {
        console.log('距离r', speed * 100)
        console.log('时间', speed / 10)
        // let x = this.x
        // animation.start((p) => {
        //   this.x = x + speed * 200 * p
        //   // console.log(x + speed * 100 * p)
        // }, speed * 600)

        let t = speed * 1000
        this.$refs.eMove.style.transition = t + 'ms cubic-bezier(0.33, 0.66, 0.66, 1)'
        // this.$refs.eMove.style.transition = t + 'ms cubic-bezier(0.1, 0.57, 0.1, 1)'
        setTimeout(() => { this.$refs.eMove.style.transition = '' }, t)
        setTimeout(() => {
          this.x += speed * speed * 400
        }, 1)

        // anima.start(this.x + speed * 200)

      },
      onSwipeLeft (speed) {
        console.log('距离', speed * 100)
        console.log('时间', speed / 10)
      },
      onSwipeNot () {}
    })
  }
}
</script>

<style scoped>
.box {
  height: 600px;
}
.move {
  position: relative;
}
.box>>>p {
  background-color: #ddd;
  margin: 0;
  height: 200px;
  width: 100px;
  position: absolute;
  top: 0;
  left: -5000px;
}
.box>>>p:nth-child(2n) {
  background-color: #eee;
}
</style>
