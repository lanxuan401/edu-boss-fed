<template>
    <el-container>
        <el-aside width="200px">
            <app-aside/>
        </el-aside>
        <el-container>
            <el-header>
                <app-header/>
            </el-header>
            <el-main>
                <!-- 子路由出口 -->
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

export default Vue.extend({
  name: 'layoutIndex',
  components: {
    AppAside,
    AppHeader
  }
})
</script>

<style lang="scss" scoped>
.el-container{
    min-height: 100vh;
    // 设置最小宽度，在小于这个宽度时，页面显示左右滚动条
    // 在大于这个宽度时,正常显示
    min-width: 980px;
}
.el-aside{
 background: #d3dce6;
}
.el-header{
 background: #fff;
}
.el-main{
    background: #e9eef3;
}
</style>
