<template>
      <div class="centerx">
                <vs-button @click="answer1=!answer1" vs-color="primary" vs-type="filled">{{!answer1?'Open Answers':'Close Answers'}}</vs-button>
                <vs-alert
                 :vs-active.sync="answer1"
                 vs-closable
                >
                    <vue-editor v-model="content"></vue-editor>
                    <vs-button v-on:click="addComment" vs-type="relief" vs-color="success" >Submit</vs-button>  
                </vs-alert>
                <vs-alert
                 :vs-active.sync="answer1"
                 vs-closable
                >
                 <div>
                     <DetailAnswer
                      v-for="(answer, i) in answers" :key="{i}"
                      v-bind:answer="answer"
                     />
                 </div>
                </vs-alert>
            </div>
</template>

<script>
import jwt from 'jsonwebtoken'
import { VueEditor } from 'vue2-editor'
import DetailAnswer from '@/components/DetailAnswer.vue'
export default {
  props:['question'],
  components: {
    VueEditor,
    DetailAnswer,
  },
  data(){
    return {
      badge1:10,
      answer1:false,
      content: '<h5>here is your answer ...</h5>',
      answers: [],
    }
  },
  mounted(){
    var answer = firebase.database().ref('Questions/' + this.question.qid +'/Comments');
    
    answer.on('value', snapshot =>{
      console.log(snapshot.val())
      this.getNewPost(snapshot.val());
    });
  },
  methods:{
      getNewPost(snapshot){
        let tempAnswers = []

        for(let i in snapshot){
            tempAnswers.push(snapshot[i])
        }
        this.answers = tempAnswers
        console.log(this.answers)
      },
      addComment(){
           let token =localStorage.getItem("token")
            console.log(this.question.qid)
            console.log(this.content)
            try {
                var decoded = jwt.verify(token, 'hacktiv8');
                var newPostKey = firebase.database().ref().child('Comments').push().key;
                firebase.database().ref('Questions/'+this.question.qid+'/Comments/'+ newPostKey).set({
                name: decoded.name,
                qid : this.question.qid,
                cid : newPostKey,
                uid: decoded.id,
                content: this.content,
                vote: 0,
                downvote: '',
                upvote: '',
                })
                this.content = `<h1>Question Again ??</h1>`
            } catch(err) {
                console.log('err :',err.message)
            }
      }
  }
}
</script>

<style lang="scss" scoped>
.demo-badge {
    > div {
      margin-bottom: 16px;
    }
  }
</style>