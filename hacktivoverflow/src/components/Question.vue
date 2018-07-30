<template>
  <div >
    <vs-card style="margin-top:20px;"  v-for="(question, i) in questions" :key="{i}" vs-color="warning">
      
      <vs-card-header vs-background-color="warning" v-bind:vs-title="question.name" v-bind:vs-subtitle="question.uid" vs-icon="account_circle">
      </vs-card-header>
      <vs-card-body>
        <vs-row style="padding:50px;" vs-type="flex" vs-justify="center" vs-align="flex-start" vs-w="12" v-html="question.content"  >
                  {{question.content}}
        </vs-row>
        <br>
        <vs-row>
             <md-button class="md-fab md-mini md-plain" v-on:click="downVote(question.qid, question.vote)">
                <i class="material-icons">
                    thumb_down
                </i>
                </md-button>
                <vs-avatar :vs-badge="question.vote" v-bind:vs-text="question.name" vs-size="large"/>
                <md-button class="md-fab md-mini md-plain" v-on:click="upVote(question.qid, question.vote)">
                <i class="material-icons" >
                  thumb_up
                </i>
            </md-button>
        </vs-row>
      </vs-card-body>
      <vs-card-footer style="padding:10px;">
         <Answers
          v-bind:question="question"
          />
      </vs-card-footer>    
    </vs-card>
  </div>
</template>


<script>
import { VueEditor } from 'vue2-editor'
import Answers from '@/components/Answers.vue'

export default {
  components: {
    VueEditor,
    Answers
  },
  data(){
    return {
      badge1:10,
      icon1:'sms',
      answer1:false,
      content: '<h1>What is your Question ?</h1>',
      questions: [],
      answers : [],
    }
  },
  mounted(){
    var question = firebase.database().ref('Questions');
    
    question.on('value', snapshot =>{
      this.getNewPost(snapshot.val());
    });
  },
  methods:{
      getNewPost(snapshot){
        let tempQuestions = []
        for(let i in snapshot){
            tempQuestions.push(snapshot[i])
        }
        this.questions = tempQuestions
      },
      upVote(qid, vote){
        console.log("===upvote===")
        console.log("badge",vote)
        console.log("qid",qid)
        console.log("===upvote===")
        let upvote = Number(vote)+1 
        console.log(upvote)
        var updates = {};
        updates['Questions/' + qid + '/vote/'] = upvote;
        firebase.database().ref().update(updates);
      },  
      downVote(qid, vote){
        console.log("===downvote===")
        console.log("badge",vote)
        console.log("qid",qid)
        console.log("===downvote===")
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

