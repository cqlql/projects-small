<template>
  <div class="chunked-show">
    <div class="cs-top-half">
      <div class="cs-cont">
        <slot name="top"></slot>
      </div>
    </div>
    <div class="cs-drag-bar"><b></b></div>
    <div class="cs-bottom-half">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
  import ChunkedShow from './chunked-show'
  export default {
    name: 'chunked-show',
    props: ['show'],
    // data () {
    //   return {
    //     show: 0
    //   }
    // },
    mounted () {
      this.chunkedShow = new ChunkedShow(this.$el)
    },
    watch: {
      show (v) {
        let {chunkedShow} = this
        if (v) {
          chunkedShow.show()
        } else {
          chunkedShow.hide()
        }
      }
    }
  }
</script>

<style scoped>

  .chunked-show {
    & {

      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    .cs-top-half {
      position: relative;

      background-color: #fff;
      overflow: auto;
      height: 100%;
    }

    .cs-bottom-half {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: none;
      background-color: #fff;
      overflow: auto;
    }

    .cs-cont {

    }

    .cs-drag-bar {

      & {
        /*用fixed因为所在块有滚动条情况，会被滚动隐藏*/
        position: relative;
        left: 0;
        width: 100%;
        z-index: 1;

        background-color: #00b5ff;
        height: 1px;
        transform: translate3d(0, 0, 0);
        display: none;
      }

      b {

        & {
          display: block;
          height: 15px;
          width: 55px;
          background-color: #00b5ff;

          position: absolute;
          left: 50%;
          margin-left: -27.5px;
          border-radius: 0 0 3px 3px;
        }

        &:before {
          content: '';
          display: block;
          height: 0;
          width: 37px;
          position: absolute;
          top: 4px;
          left: 9px;
          border-top: 1px solid #0094cc;
          border-bottom: 1px solid #54d0ff;
        }
        &:after {
          content: '';
          display: block;
          height: 0;
          width: 37px;
          position: absolute;
          top: 8px;
          left: 9px;
          border-top: 1px solid #0094cc;
          border-bottom: 1px solid #54d0ff;
        }
      }

      &:before {
        content: '';
        display: block;
        height: 30px;
        width: 60px;
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);

      }

    }

    &.show {

      .cs-top-half {
        height: auto;
      }
      .cs-bottom-half,
      .cs-drag-bar {
        display: block;
      }
    }
  }

</style>
