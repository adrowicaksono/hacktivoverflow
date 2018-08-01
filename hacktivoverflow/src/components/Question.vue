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
             <md-button class="md-fab md-mini md-plain" v-on:click="downVote(question)">
                <i class="material-icons">
                    thumb_down
                </i>
                </md-button>
                <vs-avatar :vs-badge="question.vote" v-bind:vs-text="question.name" vs-size="large"/>
                <md-button class="md-fab md-mini md-plain" v-on:click="upVote(question)">
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
import jwt from 'jsonwebtoken'
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
      upVote(question){
        let token =localStorage.getItem("token")
        let vote = question.vote
        let qid = question.qid
        let uid = question.uid
        try{
          var decoded = jwt.verify(token, 'hacktiv8');
         if(decoded.id != uid){
           let arrvote = question.upvote.split(',') 
            if(arrvote.indexOf(decoded.id) === -1){
              console.log("===========",question.downvote)
              this.spliceDownvote(decoded.id, question.downvote, question.qid)
              this.countUpvote(question.qid, question.vote)
              var updates = {};
              updates['Questions/' + qid + '/upvote/'] = question.upvote +','+decoded.id;
              firebase.database().ref().update(updates);
            } 
         }
         
        }catch(err){
          console.log(err.message)
        }
        
      },  
      downVote(question){
        let token =localStorage.getItem("token")
        let vote = question.vote
        let qid = question.qid
        let uid = question.uid
        console.log("===downvote===")
        console.log("badge",vote)
        console.log("qid",qid)
        console.log("===downvote===")
        // if(vote > 0){
          try{
            var decoded = jwt.verify(token, 'hacktiv8');
            if(decoded.id != uid){
                let arrvote = question.downvote.split(',')
                if(arrvote.indexOf(decoded.id) === -1){
                  this.spliceUpvote(decoded.id, question.upvote, question.qid)
                  this.countDownvote(question.qid, question.vote)
                  var updates = {};
                  updates['Questions/' + qid + '/downvote/'] =  question.downvote +','+decoded.id;
                  firebase.database().ref().update(updates);
                }
            }
         
          }catch(err){
            console.log(err.message)
          }
        // }
      },
      spliceUpvote(id, upvote, qid){
        let arrvote = upvote.split(',')
        let idVote = arrvote.indexOf(id)
        arrvote.splice(idVote, 1)
        let update = arrvote.join(',')
        var updates = {};
        updates['Questions/' + qid + '/upvote/'] = update;
        firebase.database().ref().update(updates); 
      },
      spliceDownvote(id, downvote, qid){
        console.log('----------',downvote)
        let arrvote = downvote.split(',')
        let idVote = arrvote.indexOf(id)
        arrvote.splice(idVote, 1)
        let update = arrvote.join(',')
        var updates = {};
        updates['Questions/' + qid + '/downvote/'] = update;
        firebase.database().ref().update(updates);
      },
      countUpvote(qid, vote){
        let update = Number(vote) + 1
        var updates = {};
        updates['Questions/' + qid + '/vote/'] = update ;
        firebase.database().ref().update(updates);
      },
      countDownvote(qid, vote){
        let update = Number(vote) - 1
        if(update >= 0){
          var updates = {};
          updates['Questions/' + qid + '/vote/'] = update ;
          firebase.database().ref().update(updates);
        }
      },
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

