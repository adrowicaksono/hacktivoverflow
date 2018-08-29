<template>
  <div class="hello">
    <div class="centerx" style="margin-top:20px;">
      <vs-row vs-align="flex" vs-type="flex"  vs-justify="space-around">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3" vs-sm="12" vs-xs="12">
          <img src="/img/fox.gif" width="300" height="300">
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="9" vs-sm="12" vs-xs="12">
           <md-card md-with-hover >
              <md-ripple class="md-primary">
                <md-card-header>
                  <md-avatar>
                    <img src="/img/loose.jpg" alt="Avatar">
                  </md-avatar>
                  
                  <div class="md-headline">Title goes here</div>
                  <div class="md-subhead">Subtitle here</div>
                </md-card-header>
                <md-card-content>
                 <vue-editor v-model="content"></vue-editor>
                  <vs-button v-on:click="addQuestion" vs-type="relief">Submit</vs-button>
                </md-card-content>
                <md-card-actions>
                  <p style="color:red"> <strong>  {{error}} </strong></p>
                </md-card-actions>
              </md-ripple>
            </md-card>
        </vs-col>
      </vs-row>  
    </div>
  </div>
</template>

<script>
import db from '@/firebase/firebase.js'
import { VueEditor } from 'vue2-editor'
import jwt from 'jsonwebtoken'
import BASE_URL from '@/BASE_URL/BASE_URL'
import axios from 'axios'

export default {
  name: 'HelloWorld',
  components: {
    VueEditor,
   
  },
  props: {
    msg: String
  },
  data(){
    return{
      content: '<h1>Some initial content</h1>',
      error : '',  
    }
  },
  methods:{
    addQuestion(){
      let token =localStorage.getItem("token")
      if(token){
        axios.post(BASE_URL+'auth/isActive',{},{
          headers : {
            Authorization : token
          }
        })
        .then ( response => {
          console.log(response)
          try {
            var decoded = jwt.verify(token, 'hacktiv8');
            var newPostKey = firebase.database().ref().child('Question').push().key;
            firebase.database().ref('Questions/' + newPostKey).set({
              name: decoded.name,
              qid : newPostKey,
              uid: decoded.id,
              content: this.content,
              vote: 0,
              upvote: '',
              downvote: '',
            })
            this.content = `<h1>Question Again ??</h1>`
          } catch(err) {
            this.error = err.message
          }
        })
        .catch ( err => {
          this.error = err.response.data.msg
        })
      }else{
        this.error = "you don't have access"
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.md-card {
  width: 100%;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
 
</style>
