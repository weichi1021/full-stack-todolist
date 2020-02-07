<template lang="pug">
  section(name="tl-notes-container")
    div.mb25.pt25.prl30(v-if="!isTrash")
      .text-line(v-show="!showTextBox", @click="addTextBox()") Take a note...
      .text-box(v-show="showTextBox")
        .header
          el-input(type="text", v-model="param.title", placeholder="Title")
        .content
          el-input(type="textarea", v-model="param.content", :rows="4", resize="none", placeholder="Take a note...")
        .footer.text-right
          el-button(type="text", @click="closeTextBox()") Close
    div.notes-container(@click="blurTextBox($event)")
      .notes-group(v-for="(item, index) in notesList", :key="`notes-${index}`")
        .header(v-if="item.title") {{ item.title }}
        .conten(v-if="item.content") {{ item.content }}
        .footer.btn-pos-right(v-if="!isTrash")
          el-button(type="text", @click="editTextBox(item)")
            i.el-icon-edit
          el-button(type="text", @click="removeNotes(item.id)")
            i.el-icon-delete
        .footer.btn-pos-left(v-if="isTrash")
          el-button(type="text", @click="deleteTextBox(item.id)")
            i.el-icon-delete-solid
          el-button(type="text", @click="restoreNotes(item.id)")
            i.el-icon-refresh-left
    el-dialog(:visible.sync="editModalVisible", width="500px", :show-close="false", @close="closeTextBox()")
      .text-box
        .header
          el-input(type="text", v-model="param.title", placeholder="Title")
        .content
          el-input(type="textarea", v-model="param.content", :rows="4", resize="none", placeholder="Take a note...")
        .footer.text-right
          el-button(type="text", @click="closeTextBox()") Close
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      showTextBox: false,
      editModalVisible: false,
      param: {
        title: '',
        content: ''
      },
      notesList: [],
    }
  },
  created() {
    this.queryTodoList();
  },
  watch: {
    menuActive() {
      this.queryTodoList()
    }
  },
  computed: {
    ...mapState(['menuActive']),
    isTrash() {
      return (this.menuActive == 'trash')
    },
  },
  methods: {
    // verify
    verify() {
      let pass = true
      let verifyList = Object.keys(this.param);
      verifyList.forEach(item => {
        pass = !(this.param[item].trim() == '')
      })
      console.log('verify = '+ pass)
      return pass
    },
    // trigger
    addTextBox() {
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
    blurTextBox(event) {
      const eltextBox = document.querySelector('.text-box');
      const eltextLine = document.querySelector('.text-line');
      if(this.showTextBox && !this.editModalVisible && !eltextBox.contains(event.target)){
        this.showTextBox = false;
        if(!this.verify()) return
        this.addNotes()
        console.log('add note')
      }
    },
    editTextBox(item) {
      this.editModalVisible = true;
      this.param.title = item.title;
      this.param.content = item.content;
      setTimeout(() => {
        document.querySelector('.el-dialog .text-box>.header input').focus()
      }, 300)
    },
    deleteTextBox(id) {
      this.$confirm('', 'Delete note forever?', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then(({ value }) => {
        this.deleteNotes(id);
      })
  },
    // api
    async queryTodoList() {
      let apiAction = 'query_todo_list' // active list
      if(this.isTrash) apiAction = 'query_trash_todo_list' // inactive list
      try{
        const resp = await axios.post('/api/todo-list', {
          action: apiAction
        })
        this.notesList = resp.data;
        // console.log(resp)
      }catch(err){
        // console.log(err)
      }
    },
    async addNotes() {
      try{
        const resp = await axios.post('/api/todo-list', {
          action: 'add_note',
          data: this.param
        })
        this.queryTodoList()
        console.log(resp)
      }catch(err){
        console.log(err)
      }
    },
    async removeNotes(id) {
      try{
        const resp = await axios.post('/api/todo-list', {
          action: 'change_active_note',
          data: {
            id: id,
            active: false
          }
        })
        this.queryTodoList()
        console.log(resp)
      }catch(err){
        console.log(err)
      }
    },
    async restoreNotes(id) {
      try{
        const resp = await axios.post('/api/todo-list', {
          action: 'change_active_note',
          data: {
            id: id,
            active: true
          }
        })
        this.queryTodoList()
        console.log(resp)
      }catch(err){
        console.log(err)
      }
    },
    async deleteNotes(id) {
      try{
        const resp = await axios.post('/api/todo-list', {
          action: 'delete_note',
          data: { id }
        })
        this.queryTodoList()
        console.log(resp)
      }catch(err){
        console.log(err)
      }
    },
  }
}

</script>

<style lang="sass" scoped>
  .text-box,
  .text-line
    border: 1px solid #E4E7ED
    border-radius: 5px
    color: #606266
    box-shadow: 2px 2px 5px 0px #E4E7ED
    max-width: 500px
    margin: 0px auto
  .text-line
    padding: 10px
    cursor: text
  .text-box .footer
    padding: 10px 15px
  .notes-container
    padding: 0px 20px
    display: flex
    flex-wrap: wrap
  .notes-group
    position: relative
    display: inline-block
    border: 1px solid #E4E7ED
    border-radius: 5px
    padding: 15px 15px 35px
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
</style>
<style lang="sass">
  .text-box .el-input>input,
  .text-box .el-textarea>textarea
    border: none
    color: #303133
    font-size: 16px
  .text-box .el-input>input::placeholder,
  .text-box .el-textarea>textarea::placeholder
    color: #606266
  .text-box .el-input>input
    font-weight: bold
  .text-box .footer .el-button,
  .notes-group .footer .el-button
    color: #606266
    font-size: 14px
    padding: 8px
    &:hover
      background-color: #f4f4f5
  .el-dialog
    border-radius: 5px
    .text-box
      box-shadow: none
      border: none
    .el-dialog__header
      padding: 0px
    .el-dialog__body
      padding: 5px
</style>
