<template>
  <div class="resource-list">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-form ref="form" :inline="true" :model="form" class="demo-form-inline">
              <el-form-item prop="name" label="资源名称">
                  <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item prop="url" label="资源路径">
                  <el-input v-model="form.url"></el-input>
              </el-form-item>
              <el-form-item prop="categoryId" label="资源分类">
                <el-select
                  v-model="form.categoryId"
                  clearable
                  placeholder="活动区域"
                >
                  <el-option
                    :label="item.name"
                    :value="item.id"
                    v-for="item in resourceCategories"
                    :key="item.id"
                    ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                    <el-button
                      type="primary"
                      :disabled="isLoading"
                      @click="onSubmit">查询搜索</el-button>
                    <el-button :disabled="isLoading" @click="onReset">重置</el-button>
              </el-form-item>
          </el-form>
        </div>
        <!--
          total 总记录数
          page-size 每页大小
          分页组件会自动根据total和page-size计算出一共分多少页
         -->
        <el-table
          :data="resources"
          style="width: 100%;margin-bottom:20px"
          v-loading="isLoading"
        >
          <el-table-column
             type="index"
             prop="date"
             label="编号"
             width="180">
          </el-table-column>
          <el-table-column
             prop="name"
             label="资源名称"
             width="180">
          </el-table-column>
          <el-table-column
             prop="url"
             label="资源路径">
          </el-table-column>
          <el-table-column
             prop="description"
             label="描述">
          </el-table-column>
          <el-table-column
             prop="createdTime"
             label="添加时间">
          </el-table-column>
          <el-table-column
             label="操作">
            <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                >
                    编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >
                    删除
                </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :disabled="isLoading"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="form.current"
          :page-sizes="[5, 10, 20]"
          :page-size="form.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      resources: [], // 资源列表
      form: {
        name: '',
        url: '',
        current: 1, // 默认查询第1页数据
        size: 5, // 每页大小
        categoryId: null // 资源分类
      },
      totalCount: 0,
      resourceCategories: [], // 资源分类列表
      isLoading: true // 加载状态
    }
  },
  created () {
    this.loadResources()
    this.getResourceCategories()
  },
  methods: {
    async getResourceCategories () {
      const { data } = await getResourceCategories()
      console.log(data)
      this.resourceCategories = data.data
    },
    async loadResources () {
      this.isLoading = true // 展示加载中状态
      const { data } = await getResourcePages(this.form)
      this.resources = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false // 关闭加载中状态
    },
    onSubmit () {
      console.log('submit!')
      this.form.current = 1 // 筛选查询从第一页查询
      this.loadResources()
    },
    handleEdit (row:any) {
      console.log(row)
    },
    handleDelete (row:any) {
      console.log(row)
    },
    handleSizeChange (val:number) {
      console.log(`每页 ${val} 条`)
      this.form.size = val
      this.form.current = 1 // 每页大小改变重新查询第一页数据
      this.loadResources()
    },
    handleCurrentChange (val:number) {
      console.log(`当前页: ${val}`)
      // 请求获取对应页码的数据
      this.form.current = val // 修改要查询的页码
      this.loadResources()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1 // 重置回到第一页
      this.loadResources()
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
