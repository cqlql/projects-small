<template>
  <div :class="$style.box">
    <div :class="$style.btns">
      <h1 :class="$style.h1">这是以 <em>指定元素</em> 为容器的demo</h1>
      <p><button @click="refresh">手动刷新</button></p>
      <p><button @click="noDataDemo">切换到无数据情况</button></p>
      <p><button @click="refreshOnePage">手动刷新，并且数据不足一页情况</button></p>
    </div>
    <div :class="$style.statList">
      <PulldownRefreshPlus ref="vPulldownRefresh" :load="load" :min-height="containerMinHeight" :get-elem="() => $el">
        <div v-for="(item, key) of list" :key="key" class="item">
          <div class="tit">{{ item.t }}</div>
          <div v-for="(it,k) of item.ls" :key="k" class="row">
            <span class="tt">{{ it.t }}</span>
            <span class="ct">{{ it.v }}</span>
          </div>
        </div>
      </PulldownRefreshPlus>
    </div>
  </div>
</template>
<script>
import PulldownRefreshPlus from '@/components/pulldown-refresh/PulldownRefreshPlus.vue'
import axios from './mock-axios'
export default {
  components: {
    PulldownRefreshPlus
  },
  data () {
    return {
      list: [],
      containerMinHeight: 500 - 50
    }
  },
  methods: {
    async load (page) {
      let d = await axios.get(`/getData?page=${page}&onepage=${this.onepage}&nodata=${this.nodata}`)
      let allList
      if (page === 1) { // 刷新
        allList = this.list = d
      } else {
        allList = this.list = this.list.concat(d)
      }
      if (!allList.length) {
        return 'noData'
      }
      // 当前每页3条
      if (d.length < 3) {
        return 'finish'
      }
    },
    refresh () {
      this.onepage = false
      this.nodata = false
      this.$refs.vPulldownRefresh.refresh()
    },
    noDataDemo () {
      this.nodata = true
      this.$refs.vPulldownRefresh.refresh()
    },
    refreshOnePage () {
      this.onepage = true
      this.nodata = false
      this.$refs.vPulldownRefresh.refresh()
    }
  }
}
</script>

<style module>
.btns {
  padding: 10px;
}
.box {
  position: relative;
  margin: 10px;
  height: 500px;
  overflow: auto;
  border: 2px solid #999;
}
.h1 {
  padding: 4px 0 10px;
  font-size: 16px;
  font-weight: bold;
  em {
    color: #f00;
  }
}
.statList {
  background-color: #f3f3f3;
}
.statList :global{
  .item {
    color: #999;
    padding: 10px 12px;
    border-top: 1px solid #ddd;
    background: #fff;
    /* padding: 0 12px; */
  }
  .item:first-child {
    border-top: none;
  }
  .tit {
    font-size: 18px;
    color: #555;
    padding: 8px 0;
  }

  .row {
    padding: 8px 0
  }
  .em {
    color: #f60;
  }
}
</style>
