<template>
  <div class="alloc-menu">
    <el-card>
      <div slot="header">
          <span>分配权限</span>
      </div>
      <el-tree
        ref="menu-tree"
        :data="menus"
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
        show-checkbox
        default-expand-all
      >
      </el-tree>
      <div style="text-align: center">
          <el-button @click="resetChecked">清空</el-button>
          <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getMenuNodeList,
  allocateRoleMenus,
  getRoleMenus
} from '@/services/menu'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  created () {
    this.loadMenus()
    this.loadRoleMenus()
  },
  methods: {
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      this.getCheckedKeys(data.data)
    },
    resetChecked () {
      (this.$refs['menu-tree'] as Tree).setCheckedKeys([])
    },
    getCheckedKeys (menus:any) {
      menus.forEach((menu:any) => {
        if (menu.selected) {
        //   this.checkedKeys.push(menu.id as never)
          this.checkedKeys = [...this.checkedKeys, menu.id] as any
        }
        // 如果有子元素，继续遍历
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        }
      })
    },
    async loadMenus () {
      const { data } = await getMenuNodeList()
      this.menus = data.data
      console.log(data)
    },
    async onSave () {
      const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys()
      console.log(menuIdList)
      // 拿到选中节点的数据 id 列表
      // 请求提交保存
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList
      })
      this.$message.success('操作成功')
      this.$router.back()
    }
  }
})
</script>

<style lang="scss" scoped></style>
