<template lang="pug">
  el-dialog.tag-maintain-dialog(title="Edit Tags", :visible="tagMaintainModalVisible", width="300px", @close="closeModal()")
    .body
      .tag-item
        el-input(v-model="tagInput", placeholder="Create new tag", @focus="resetData()")
        .btn-group
          el-button.note-action.text-primay(@click="btnAdd()")
            i.el-icon-plus
      .tag-item(v-for="(item, index) in tagList", :key="`tagMenu-${index}`")
        .tag-text(v-if="params.id !== item.id") {{ item.display_name }}
        el-input(v-else, v-model="params.display_name")
        .btn-group
          el-button.note-action.text-primay(v-if="params.id !== item.id", @click="btnEdit(item)")
            i.el-icon-edit
          el-button.note-action.text-primay(v-else, @click="btnSave()")
            i.el-icon-check
          el-button.note-action(@click="btnDelete(item.id)")
            i.el-icon-delete
    .footer.text-right
      el-button(type="text", @click="closeModal()") Done
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      tagInput: '',
      params: {
        id: null,
        display_name: null
      }
    }
  },
  computed: {
    ...mapState(['tagList', 'tagMaintainModalVisible'])
  },
  methods: {
    ...mapActions(['getTagList', 'getNoteListByMenu']),
    ...mapMutations(['setTagMaintainModalVisible']),
    resetData(scrollTop = true) {
      this.tagInput = '';
      Object.assign(this.$data.params, this.$options.data().params)
      if(scrollTop) document.querySelector('.tag-maintain-dialog .body').scrollTop = 0;
    },
    // trigger
    closeModal() {
      this.setTagMaintainModalVisible(false)
      this.resetData();
    },
    btnAdd() {
      if(this.tagInput.trim().length == 0) return
      this.createTag();
    },
    btnEdit(item) {
      const tmp = JSON.parse(JSON.stringify(item))
      this.params = tmp;
    },
    btnSave() {
      if(this.params.display_name.trim().length == 0){
        this.resetData(false);
        return
      }
      this.updateTag()
    },
    btnDelete(id){
      this.$confirm('We’ll delete this tag and remove it from all of your Keep notes. Your notes won’t be deleted.', 'Confirm', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then(() => {
        this.deleteTag(id)
      }).catch(() => {
      });
    },
    // api
    async createTag() {
      try{
        const resp = await axios.post('/api/tags', {
          action: 'create_tag',
          data: {
            display_name: this.tagInput
          }
        })
        this.tagInput = ''
        this.getTagList();
      }catch(err){
        // console.log('err')
      }
    },
    async updateTag() {
      try{
        const resp = await axios.put(`/api/tags/${this.params.id}`, {
          action: 'update_tag',
          data: {
            display_name: this.params.display_name
          }
        })
        this.resetData();
        this.getTagList();
        this.getNoteListByMenu();
      }catch(err){
        // console.log(err)
      }
    },
    async deleteTag(id) {
      try{
        const resp = await axios.delete(`/api/tags/${id}`)
        this.getTagList();
        this.getNoteListByMenu();
      }catch(err){
        // console.log(err)
      }
    }
  }
}
</script>

<style lang="sass">
  @import '~/assets/css/_var.sass'
  .tag-maintain-dialog .el-dialog
    .el-dialog__body
      padding: 10px
    .btn-group
      display: flex
      margin-left: 10px
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
      border-top: 1px solid $borderColor1
      padding: 10px 10px 0px
</style>
<style lang="sass" scoped>
  @import '~/assets/css/_var.sass'
  .el-button.note-action
    font-size: 14px
    padding: 8px
  .el-button.text-primay.note-action
    color: $regularText
    border-color: $primaryColor8
    &.text-primay:hover
      border-color: $primaryColor8
      background-color: $primaryColor10
  .el-button.note-action:hover,
  .el-button.note-action:focus
    color: $regularText
    border-color: $borderColor1
    background-color: $infoColor3
</style>
