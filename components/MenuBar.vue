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
      li.el-menu-item(@click="$refs.TagMaintainModal.modalVisible = true")
        i.el-icon-edit
        span Edit tags
      el-divider
      el-menu-item(index="trash")
        i.el-icon-delete
        span Trash
      //- modal
      tag-maintain-modal(ref="TagMaintainModal")
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
import TagMaintainModal from './modals/TagMaintainModal';

export default {
  components: {
    TagMaintainModal,
  },
  computed: {
    ...mapState(['menuActive', 'tagList'])
  },
  methods: {
    ...mapMutations(['setMenu']),
  }
}
</script>


<style lang="sass" scoped>
  .el-menu
    border-right: none
    min-width: 200px
    max-height: calc(100vh - 65px)
    overflow-y: scroll
    padding-bottom: 20px
  .el-divider
    margin: 5px 0px
</style>
