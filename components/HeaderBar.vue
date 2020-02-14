<template lang="pug">
  section(name="tl-header")
    .header-title
      i.el-icon-notebook-2.mr5
      span.mobile-menu-name.hidden-md-and-up {{ menuDisplayName }}
      span.hidden-md-and-up &nbsp;|&nbsp;
      span Note List
    el-dropdown.hidden-md-and-up(@command="handleCommand", trigger="click")
      span
        i.el-icon-arrow-down
      el-dropdown-menu
        el-dropdown-item(icon="el-icon-notebook-2", command="notes")
          span Notes
        el-dropdown-item(icon="el-icon-collection-tag", :command="`tag-${item.id}`", v-for="(item, index) in tagList", :key="`tagMenu-${index}`", :divided="index == 0", @click="setMenu(`tag-${item.id}`)")
          span {{ item.display_name }}
        el-dropdown-item(icon="el-icon-edit", command="edit_tags")
          span Edit tags
        el-dropdown-item(icon="el-icon-delete", command="trash", divided)
          span Trash

</template>

<script>
import axios from 'axios'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['tagList']),
    ...mapGetters(['menuDisplayName'])
  },
  methods: {
    ...mapMutations(['setMenu', 'setTagMaintainModalVisible']),
    handleCommand(command){
      // console.log(command)
      if(command == 'edit_tags'){
        this.setTagMaintainModalVisible(true)
        return
      }
      this.setMenu(command)
    }
  }
}
</script>

<style lang="sass" scoped>
  [name="tl-header"]
    height: 100%
    display: flex
    justify-content: space-between
    align-items: center
    padding: 0px 20px
    font-size: 24px
  .el-icon-arrow-down
    font-weight: bold
    font-size: 20px
  .el-dropdown-menu
    max-height: 90vh
    overflow-y: scroll
  .header-title
    display: flex
    align-items: center
  .mobile-menu-name
    max-width: 30vw
    display: inline-block
    white-space: nowrap
    text-overflow: ellipsis
    overflow: hidden
</style>
