<template lang="pug">
  section.p25(name="note-container")
    //- input
    div.mb25(v-if="!isTrash")
      .text-box(v-if="showTextBox")
        .header
          el-input(type="text", v-model="param.title", placeholder="Title")
        .content
          el-input(type="textarea", v-model="param.content", :rows="4", resize="none", placeholder="Take a note...")
        .tag-group
          el-tag(type="warning", effect="plain", v-for="(tagItem, tagIndex) in param.tags", :key="`tags-${tagIndex}`", closable, @close="removeTag(tagItem)") {{ tagItem.display_name }}
        .footer
          el-input.input-new-tag(v-if="tagInputVisible", v-model="tagInput", size="small", @blur="tagInputVisible = false", @keyup.enter.native="addTag()")
          el-button.button-new-tag(v-else, size="small", @click="openTagInput()") + New Tag
          div
            el-button.note-action(type="text", @click="closeTextBox()") Close
            el-button.note-action.text-primay(type="text", @click="addTextBox()") Create
      .text-line(v-else)
        .text-line-input(@click="clickTextBox()") Take a note...
        //- el-button(type="text")
        //-   i.el-icon-finished
    //- container
    div
      .notes-group(v-for="(item, index) in noteList", :key="`notes-${index}`")
        .header(v-if="item.title") {{ item.title }}
        .conten(v-if="item.content")
          pre {{ item.content }}
        .content(v-if="!item.title && !item.content") Empty note
        .tag-group.mt10
          el-tag(type="warning", v-for="(tagItem, tagIndex) in item.tags", :key="`tags-${tagIndex}`") {{ tagItem.display_name }}
        .footer.btn-pos-right(v-if="!isTrash")
          el-button.note-action.text-primay(type="text", @click="editTextBox(item)")
            i.el-icon-edit
          el-button.note-action(type="text", @click="removeNote(item.id)")
            i.el-icon-delete
        .footer.btn-pos-left(v-if="isTrash")
          el-button.note-action(type="text", @click="deleteTextBox(item.id)")
            i.el-icon-delete-solid
          el-button.note-action(type="text", @click="restoreNote(item.id)")
            i.el-icon-refresh-left
    //- modal
    el-dialog.text-box-dialog(:visible.sync="editModalVisible", width="500px", :show-close="false", @close="closeTextBox()")
      .text-box
        .header
          el-input(type="text", v-model="param.title", placeholder="Title")
        .content
          el-input(type="textarea", v-model="param.content", :rows="4", resize="none", placeholder="Take a note...")
        .footer.text-right
        .tag-group
          el-tag(type="warning", effect="plain", v-for="(tagItem, tagIndex) in param.tags", :key="`tags-${tagIndex}`", closable, @close="removeTag(tagItem)") {{ tagItem.display_name }}
        .footer
          el-input.input-new-tag(v-if="tagInputVisible", v-model="tagInput", size="small", @blur="tagInputVisible = false", @keyup.enter.native="addTag()")
          el-button.button-new-tag(v-else, size="small", @click="openTagInput()") + New Tag
          div
            el-button.note-action(type="text", @click="closeTextBox()") Close
            el-button.note-action.text-primay(type="text", @click="saveNotes()") Save
</template>

<script>
import axios from 'axios'
import _findIndex from 'lodash/findIndex'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: null,
      showTextBox: false,
      isCheckList: true,
      editModalVisible: false,
      tagInputVisible: false,
      tagInput: '',
      param: {
        id: null,
        title: '',
        content: '',
        tags: [],
      },
    }
  },
  async created() {
    this.loading = this.$loading({ lock: true });
    this.getTagList()
    await this.queryNoteList();
    if(this.loading) this.loading.close();
  },
  watch: {
    async menuActive(val) {
      this.loading = this.$loading({
        target: document.querySelector('[name="note-container"]'),
        lock: true
      });
      this.menuChange()
      if(this.loading) this.loading.close();
    }
  },
  computed: {
    ...mapState(['menuActive', 'noteList']),
    ...mapGetters(['isTrash']),
  },
  methods: {
    ...mapMutations(['setTagList']),
    ...mapActions(['getTagList', 'queryNoteList', 'menuChange']),
    // function
    delay(interval) {
      return new Promise((resolve) => {
        setTimeout(resolve, interval);
      })
    },
    // verify
    verify() {
      let pass = true
      let verifyList = Object.keys(this.param);
      pass = !(this.param.title.trim() == '' && this.param.content.trim() == '')
      console.log('verify = '+ pass)
      return pass
    },
    // trigger
    clickTextBox() {
      this.showTextBox = true;
      setTimeout(() => {
        document.querySelector('.text-box>.content textarea').focus()
      }, 300)
    },
    closeTextBox() {
      this.editModalVisible = false;
      this.showTextBox = false;
      Object.assign(this.$data.param, this.$options.data().param)
    },
    addTextBox() {
      this.showTextBox = false;
      if(!this.verify()) return
      this.addNote()
    },
    editTextBox(item) {
      const tmp = JSON.parse(JSON.stringify(item));
      this.param = tmp
      this.editModalVisible = true;
      setTimeout(() => {
        document.querySelector('.el-dialog .text-box>.header input').focus()
      }, 300)
    },
    deleteTextBox(id) {
      this.$confirm('', 'Delete note forever?', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then(({ value }) => {
        this.deleteNote(id);
      })
    },
    openTagInput() {
      this.tagInputVisible = true
      setTimeout(() => {
        document.querySelector('.input-new-tag input').focus()
      }, 300)
    },
    addTag() {
      const findTagIndex = _findIndex(this.param.tags, item => item.display_name == this.tagInput)
      if((findTagIndex !== -1) || (this.tagInput.trim() == '')) return
      this.param.tags.push({ display_name: this.tagInput })
      this.tagInput = ''
    },
    removeTag(removeItem) {
      const findTagIndex = _findIndex(this.param.tags, item => {
        return (!!removeItem.id)? (item.id == removeItem.id) :(item.display_name == removeItem.display_name)
      })
      if(findTagIndex == -1) return
      this.param.tags.splice(findTagIndex, 1)
    },
    // api
    async addNote() {
      try{
        const resp = await axios.post('/api/note-list', {
          action: 'add_note',
          data: this.param
        })
        this.queryNoteList()
        // console.log(resp)
      }catch(err){
        // console.log('add_note', err)
      }
    },
    async saveNotes(item) {
      try{
        const resp = await axios.post('/api/note-list', {
          action: 'save_note',
          data: this.param
        })
        this.closeTextBox()
        this.queryNoteList()
        // console.log(resp)
      }catch(err){
        // console.log('save_note', err)
      }
    },
    async removeNote(id) {
      try{
        const resp = await axios.post('/api/note-list', {
          action: 'change_active_note',
          data: {
            id: id,
            active: false
          }
        })
        this.queryNoteList()
        // console.log(resp)
      }catch(err){
        // console.log('change_active_note', err)
      }
    },
    async restoreNote(id) {
      try{
        const resp = await axios.post('/api/note-list', {
          action: 'change_active_note',
          data: {
            id: id,
            active: true
          }
        })
        this.queryNoteList()
        // console.log(resp)
      }catch(err){
        // console.log('change_active_note', err)
      }
    },
    async deleteNote(id) {
      try{
        const resp = await axios.post('/api/note-list', {
          action: 'delete_note',
          data: { id }
        })
        this.queryNoteList()
        // console.log(resp)
      }catch(err){
        // console.log('delete_note', err)
      }
    },
  }
}

</script>

<style lang="sass">
  @import '~/assets/css/_var.sass'
  .text-box .header .el-input>input,
  .text-box .content .el-textarea>textarea
    border: none
    color: $primaryText
    font-size: 16px
  .text-box .el-input>input::placeholder,
  .text-box .el-textarea>textarea::placeholder
    color: $regularText
  .text-box .header .el-input>input
    font-weight: bold
  .text-box-dialog .el-dialog
    .text-box
      box-shadow: none
      border: none
    .el-dialog__header,
    .el-dialog__body
      padding: 0px
</style>
<style lang="sass" scoped>
  @import '~/assets/css/_var.sass'
  .text-box,
  .text-line
    border: 1px solid $borderColor2
    border-radius: 5px
    color: $regularText
    box-shadow: 2px 2px 5px 0px $borderColor2
    max-width: 500px
    margin: 0px auto
  .text-line
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px
    .text-line-input
      width: 100%
      cursor: text
  .text-box
    padding: 10px 0px 20px
    .footer
      display: flex
      justify-content: space-between
      padding: 10px 15px 0px
    .tag-group
      padding: 0px 15px
      .el-tag + .el-tag
        margin-left: 10px
    .input-new-tag
      width: 90px
  .notes-group
    position: relative
    display: inline-table
    border: 1px solid $borderColor2
    border-radius: 5px
    padding: 15px 15px 50px
    min-width: 240px
    min-height: 120px
    margin: 10px
    .header
      font-weight: bold
      margin-bottom: 5px
    .footer
      display: none
    &:hover .footer
      padding: 10px
      display: block
      position: absolute
      bottom: 0px
    &:hover .footer.btn-pos-right
      right: 0px
    &:hover .footer.btn-pos-left
      left: 0px
    .tag-group>.el-tag + .el-tag
      margin-left: 5px
  pre
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
    line-height: 1.5
  .el-button.note-action
    color: $regularText
    font-size: 14px
    padding: 8px
    &:hover
      color: $regularText
      background-color: $infoColor3
    &.text-primay:hover
      background-color: $primaryColor10
</style>

