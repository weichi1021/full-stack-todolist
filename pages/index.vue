<template lang="pug">
  el-container
    el-header
      header-bar
    el-container
      menu-bar.mt5.hidden-sm-and-down
      el-main.ptb0.prl0
        note-container
    //- modal
    tag-maintain-modal(ref="TagMaintainModal")
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderBar from '~/components/HeaderBar.vue'
import MenuBar from '~/components/MenuBar.vue'
import NoteContainer from '~/components/NoteContainer.vue'
import TagMaintainModal from '~/components/modals/TagMaintainModal'
import 'element-ui/lib/theme-chalk/display.css'

export default {
  head() {
    return {
      title: this.menuDisplayName,
      titleTemplate: '%s | Note List'
    }
  },
  components: {
    HeaderBar,
    MenuBar,
    NoteContainer,
    TagMaintainModal,
  },
  computed: {
    ...mapGetters(['menuDisplayName']),
  }
}
</script>

<style lang="sass">
  @import '~/assets/css/style.sass'
  .el-header
    padding: 0px
    border-bottom: 1px solid #e6e6e6
  .el-main
    max-height: calc(100vh - 60px)
    overflow-y: scroll
    // &:hover
    //   overflow-y: scroll
</style>

