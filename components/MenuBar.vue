<template lang="pug">
  section(name="tl-menu-group")
    el-menu
      el-menu-item(index="1")
        i.el-icon-notebook-2
        span Notes
    el-divider
    //- el-menu
    //-   el-menu-item(index="0")
    //-     i.el-icon-collection-tag
    //-     span AAA
    //-   el-menu-item(index="1")
    //-     i.el-icon-edit
    //-     span Edit label
    //- el-divider
    el-menu
      el-menu-item(index="1" divided)
        i.el-icon-delete
        span Trash
</template>


<style lang="sass" scoped>
  .el-menu
    border-right: none
  .el-divider
    margin: 5px 0px
  // .el-menu + .el-menu
  //   border-top: 1px solid #e6e6e6
</style>
