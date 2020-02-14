<template lang="pug">
  section(name="tl-menu-group")
    el-menu(:default-active="menuActive", @select="setMenu")
      el-menu-item(index="notes")
        i.el-icon-notebook-2
        span Notes
      el-divider
      el-menu-item(:index="`tag-${item.id}`", v-for="(item, index) in tagList", :key="`tagMenu-${index}`")
        i.el-icon-collection-tag
        span {{ item.display_name }}
      li.el-menu-item(@click="setTagMaintainModalVisible(true)")
        i.el-icon-edit
        span Edit tags
      el-divider
      el-menu-item(index="trash")
        i.el-icon-delete
        span Trash
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['menuActive', 'tagList'])
  },
  methods: {
    ...mapMutations(['setMenu', 'setTagMaintainModalVisible']),
  }
}
</script>


<style lang="sass" scoped>
  .el-menu
    border-right: none
    min-width: 200px
    max-height: calc(100vh - 65px)
    padding-bottom: 20px
    overflow-y: scroll
    // &:hover
    //   overflow-y: scroll
  .el-divider
    margin: 5px 0px
</style>
