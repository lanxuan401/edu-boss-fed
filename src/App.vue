<template>
  <div id="app">
    <!-- 根路由出口-匹配到的路由组件就会渲染到这里 -->
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'

export default Vue.extend({
  name: 'App'
})
</script>
<style lang="scss" scoped>
</style>
