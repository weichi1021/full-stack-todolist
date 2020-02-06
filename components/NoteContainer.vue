<template lang="pug">
  section(name="tl-notes-container", @click="blurTextBox($event)")
    div.mb25.pt25.prl30
      .text-line(v-if="!showTextBox", @click="openTextBox()") Take a note...
      .text-box(v-if="showTextBox", )
        .header
          el-input(type="text", v-model="param.title", placeholder="Title")
        .content
          el-input(type="textarea", v-model="param.content", :rows="4", resize="none", placeholder="Take a note...")
        .footer.text-right
          el-button(type="text", @click="closeTextBox()") Close
    div.prl20
      .notes-group(v-for="(item, index) in notesList", :key="`notes-${index}`")
        .header(v-if="item.title") {{ item.title }}
        .conten(v-if="item.content") {{ item.content }}
        .footer.text-right
          el-button(type="text")
            i.el-icon-edit
          el-button(type="text")
            i.el-icon-delete
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      showTextBox: false,
      param: {
        title: '',
        content: ''
      },
      notesList: [],
    }
  },
  created(){
    this.queryTodoList();
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
    openTextBox() {
      this.showTextBox = true;
      setTimeout(() => {
        document.querySelector('.text-box>.content textarea').focus()
      }, 300)
    },
    closeTextBox() {
      Object.assign(this.$data.param, this.$options.data().param)
      this.showTextBox = false;
    },
    blurTextBox(event) {
      const eltextBox = document.querySelector('.text-box');
      const eltextLine = document.querySelector('.text-line');
      if((eltextBox && !eltextBox.contains(event.target)) && (!eltextLine || eltextLine.contains(event.target))){
        this.showTextBox = false;
        if(!this.verify()) return
        console.log('add note')
        this.add_notes()
      }
    },
    // api
    async queryTodoList() {
      try{
        const resp = await axios.post('/api/todo-list', {
          action: 'query_todo_list'
        })
        this.notesList = resp.data;
        // console.log(resp)
      }catch(err){
        // console.log(err)
      }
    },
    async add_notes() {
      try{
        const resp = await axios.post('/api/todo-list', {
          action: 'add_note',
          data: this.param
        })
        this.queryTodoList()
        console.log(resp)
      }catch(err){
        // console.log('err')
      }
    },
  }
}

</script>
<style lang="sass">
  .text-box .el-input>input,
  .text-box .el-textarea>textarea
    border: none
    color: #606266
    font-size: 16px
  .text-box .el-input>input::placeholder,
  .text-box .el-textarea>textarea::placeholder
    color: #606266
  .text-box .footer .el-button,
  .notes-group .footer .el-button
    color: #606266
    font-size: 14px
    padding: 2px 5px
</style>
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
      padding: 15px 10px
      display: block
      position: absolute
      bottom: 0px
      right: 0px
</style>
