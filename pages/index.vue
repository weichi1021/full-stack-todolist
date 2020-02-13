<template lang="pug">
  el-container
    el-header
      header-bar
    el-container
      menu-bar.mt5
      el-main.ptb0.prl0
        note-container
</template>

<script>
import HeaderBar from '~/components/HeaderBar.vue'
import MenuBar from '~/components/MenuBar.vue'
import NoteContainer from '~/components/NoteContainer.vue'

export default {
  components: {
    HeaderBar,
    MenuBar,
    NoteContainer,
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
</style>

