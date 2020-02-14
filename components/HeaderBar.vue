<template lang="pug">
  section(name="tl-header")
    div
      i.el-icon-notebook-2.mr5
      span Note List
    el-dropdown.hidden-md-and-up(@command="handleCommand")
      span
        i.el-icon-arrow-down
      el-dropdown-menu
        el-dropdown-item(icon="el-icon-notebook-2", command="notes")
          span Notes
        el-dropdown-item(icon="el-icon-collection-tag", :command="`tag-${index}`", v-for="(item, index) in tagList", :key="`tagMenu-${index}`", :divided="index == 0", @click="setMenu(`tag-${item.id}`)")
          span {{ item.display_name }}
        el-dropdown-item(icon="el-icon-edit", command="edit_tags")
          span Edit tags
        el-dropdown-item(icon="el-icon-delete", command="trash", divided)
          span Trash

</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['tagList'])
  },
  methods: {
    ...mapMutations(['setMenu', 'setTagMaintainModalVisible']),
    handleCommand(command){
      console.log(command)
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
</style>
