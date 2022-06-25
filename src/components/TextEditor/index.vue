<template>
  <div ref="editor" class="text-editor">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { uploadCourseImage } from '@/services/course'
export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  // 组件已经渲染好,可以初始化操作DOM了
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor as any)
      // 配置 onchange 回调函数
      // 事件监听必须在create之前
      editor.config.onchange = (value: string) => {
        this.$emit('input', value)
      }
      editor.config.customUploadImg = async function (resultFiles: any, insertImgFn: any) {
        console.log(resultFiles, insertImgFn)
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadCourseImage(fd)
        insertImgFn(data.data.name) // 根据图片地址生成img标签，插入富文本编辑器内容中·
      }

      editor.create()
      // 注意：设置初始化必须在 create 之后
      editor.txt.html(this.value)
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
