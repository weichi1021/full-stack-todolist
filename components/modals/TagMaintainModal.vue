<template lang="pug">
  el-dialog.tag-maintain-dialog(title="Edit Tags", :visible.sync="modalVisible", width="300px")
    .body
      .tag-item
        el-input(v-model="tagInput", placeholder="Create new tag", @focus="resetData()")
        .btn-group
          el-button(@click="btnCreate()")
            i.el-icon-check
      .tag-item(v-for="(item, index) in tagList", :key="`tagMenu-${index}`")
        .tag-text(v-if="params.id !== item.id") {{ item.display_name }}
        el-input(v-else, v-model="params.display_name")
        .btn-group
          el-button(v-if="params.id !== item.id", @click="btnEdit(item)")
            i.el-icon-edit
          el-button(v-else, @click="updateTag()")
            i.el-icon-check
          el-button(@click="btnDelete(item.id)")
            i.el-icon-delete
    .footer.text-right
      el-button(type="text", @click="modalVisible = false") Done
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      modalVisible: false,
      tagInput: '',
      params: {
        id: null,
        display_name: null
      }
    }
  },
  computed: {
    ...mapState(['tagList'])
  },
  methods: {
    ...mapActions(['getTagList']),
    resetData() {
      Object.assign(this.$data.params, this.$options.data().params)
    },
    // trigger
    btnEdit(item) {
      const tmp = JSON.parse(JSON.stringify(item))
      this.params = tmp;
    },
    btnDelete(id){
      this.$confirm('We’ll delete this label and remove it from all of your Keep notes. Your notes won’t be deleted.', 'Confirm', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then(() => {
        this.deleteTag(id)
      }).catch(() => {
      });
    },
    // api
    async updateTag() {
      try{
        const resp = await axios.put(`/api/tags/${this.params.id}`, {
          action: 'update_tag',
          data: {
            display_name: this.params.display_name
          }
        })
        this.resetData();
        this.getTagList()
      }catch(err){
        // console.log(err)
      }
    },
    async deleteTag(id) {
      try{
        const resp = await axios.delete(`/api/tags/${id}`)
        this.getTagList()
      }catch(err){
        // console.log(err)
      }
    }
  }
}
</script>

<style lang="sass">
  .tag-maintain-dialog .el-dialog
    .el-dialog__body
      padding: 10px
    .btn-group
      display: flex
      margin-left: 20px
    .tag-item
      display: flex
      align-items: center
      justify-content: space-between
      padding: 10px 15px 10px 0px
    .tag-item + .tag-item
      border-top: 1px solid #E4E7ED
    .tag-text
      padding: 0px 15px
    .body
      max-height: 450px
      overflow-y: scroll
    .footer
      border-top: 1px solid #DCDFE6
      padding: 10px 10px 5px

</style>
