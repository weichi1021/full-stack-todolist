<template lang="pug">
  section(name="tl-menu-group")
    el-menu(:default-active="menuActive", @select="setMenu", :collapse="false")
      el-menu-item(index="notes")
        i.el-icon-notebook-2
        span Notes
      el-divider
      el-menu-item(:index="`tag-${item.id}`", v-for="(item, index) in tagList", :key="`tagMenu-${index}`")
        i.el-icon-collection-tag
        span {{ item.display_name }}
      el-menu-item(index="edit")
        i.el-icon-edit
        span Edit label
      el-divider
      el-menu-item(index="trash")
        i.el-icon-delete
        span Trash
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      tagList: [],
    }
  },
  created() {
    this.getTagList();
  },
  computed: {
    ...mapState(['menuActive'])
  },
  methods: {
    ...mapMutations(['setMenu']),
    async getTagList() {
      try{
        const resp = await axios.get('/api/tags')
        this.tagList = resp.data;
      }catch(err){
        console.log(err.response)
      }
    }
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
