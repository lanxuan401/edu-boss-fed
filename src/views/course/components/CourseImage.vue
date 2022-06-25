<template>
  <div class="course-image">
    <el-progress
      v-if="isUploading"
      type="circle"
      :percentage="percentage"
      :width="178"
      :status="percentage === 100 ? 'success':undefined"
    />
    <el-upload
      v-else
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="handleUpload"
    >
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { uploadCourseImage } from '@/services/course'
import Vue from 'vue'
export default Vue.extend({
  name: 'CourseImage',
  data () {
    return {
      isUploading: false,
      percentage: 0
    }
  },
  props: {
    value: {
      type: String
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  methods: {
    beforeAvatarUpload (file:any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < this.limit

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error(`上传头像图片大小不能超过 ${this.limit}MB!`)
      }
      return isJPG && isLt2M
    },
    async handleUpload (options:any) {
      this.isUploading = true // 上传开始
      const fd = new FormData()
      fd.append('file', options.file)
      const { data } = await uploadCourseImage(fd, (e) => {
        // e.loaded 已上传的数据大小
        // e.total 上传文件的总大小
        // console.log(Math.floor(e.loaded / e.total * 100))
        this.percentage = Math.floor(e.loaded / e.total * 100)
      })
      this.isUploading = false // 上传结束
      this.percentage = 0 // 恢复0,不然上传时会有进度条值倒退的情况
      this.$emit('input', data.data.name)
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
