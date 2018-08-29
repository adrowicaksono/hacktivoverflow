<template>
  <div >
    <vs-card style="margin-top:20px;"  v-for="question in questions" :key="question.qid" vs-color="warning">
      <vs-card-header vs-background-color="warning" v-bind:vs-title="question.name" v-bind:vs-subtitle="question.uid" vs-icon="account_circle">
      </vs-card-header>
      <vs-card-body>
        <vs-row style="padding:50px;" vs-type="flex" vs-justify="center" vs-align="flex-start" vs-w="12" v-if="isEdit">
            <vs-row>
              <vue-editor v-model="newContent"></vue-editor>
            </vs-row>
            <vs-row>
              <vs-col vs-type="flex" vs-justify="flex-start" vs-align="flex-start"  vs-sm="6" vs-w="6">
                <md-button class="md-fab md-mini md-plain" @click="isEdit=false">
                <md-icon >clear</md-icon>
                </md-button>
                <md-button class="md-fab md-mini md-plain" @click="update(question)">
                <md-icon >save</md-icon>
                </md-button>
              </vs-col>
            </vs-row>
        </vs-row>   
        <vs-row style="padding:50px;" vs-type="flex" vs-justify="center" vs-align="flex-start" vs-w="12" v-html="question.content" >
                  {{question.content}}
        </vs-row>
        <vs-row>
          <vs-col vs-type="flex" vs-justify="flex-start" vs-align="flex-start"  vs-sm="6" vs-w="6">
              <md-button class="md-fab md-mini md-plain" @click="editQuestion(question)">
              <md-icon >edit</md-icon>
              </md-button>
              <md-button class="md-fab md-mini md-plain" @click="deleteQuestion(question)" >
              <md-icon >delete</md-icon>
              </md-button>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="flex-end" vs-align="flex-end"  vs-sm="6" vs-w="6">
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
          </vs-col>
        </vs-row>
        <br>
        
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
import BASE_URL from '@/BASE_URL/BASE_URL'
import swal from 'sweetalert2'
import axios from 'axios'

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
      newContent : '<p>edit</p>',
      isEdit : false,
      error : '',
    }
  },
  mounted(){
     this.isEdit = false
    console.log(this.$route, '+========mounted')
    console.log(this.$route.params, '+params========mounted')
    if(this.$route.name === 'question-detail'){
      var question = firebase.database().ref('Questions/'+this.$route.params.id);
      question.on('value', snapshot =>{
        // this.getNewPost(snapshot.val());
        this.questions = [snapshot.val()]
      });
    }
  },
  watch : {
    '$route' (to, from){
       this.isEdit = false
      console.log(this.$route, '+========watch')
      var question = firebase.database().ref('Questions/'+this.$route.params.id);
      question.on('value', snapshot =>{
        // this.getNewPost(snapshot.val());
        console.log(snapshot.val(), "=========")
        this.questions = [snapshot.val()]
      });
    }
  },
  methods:{
      getNewPost(snapshot){
        let tempQuestions = []
        for(let i in snapshot){
            tempQuestions.push(snapshot[i])
        }
        this.questions = tempQuestions
      },
      editQuestion (question) {
        this.newContent = question.content
        this.isEdit = true
      },
      update (question){
        let token = localStorage.getItem("token")
        if(token){
          axios.post(BASE_URL+'auth/isActive',{},{
            headers : {
              Authorization : token
            }
          })
          .then(response => {
            if (response.data.id == question.uid){
              firebase.database().ref('Questions/' + question.qid + '/content').set(this.newContent)
              this.isEdit = false
              swal({
                  title: 'succes!',
                  text: 'success edited',
                  type: 'success',
                  confirmButtonText: 'Cool'
                })
              this.isEdit = false
            } else {
              swal({
                title: 'Error!',
                text: "it's not yours",
                type: 'error',
                confirmButtonText: 'Cool'
              })
              this.isEdit = false
            }

          })
          .catch (err => {
              swal({
                title: 'Error!',
                text: err.response.data.msg,
                type: 'error',
                confirmButtonText: 'Cool'
              })
          })
        }else {
          swal({
                title: 'Error!',
                text: 'you must be login',
                type: 'error',
                confirmButtonText: 'Cool'
            })
        }
      },
      deleteQuestion (question) {
        let token = localStorage.getItem("token")
        if (token) {
          axios.post(BASE_URL+'auth/isActive',{},{
                headers : {
                  Authorization : token
                }
              })
              .then(response => {
                console.log(response,"==========")
                if (response.data.id === question.uid ){
                  firebase.database().ref('Questions/' + question.qid).set(null)
                  this.isEdit = false
                  swal({
                      title: 'succes!',
                      text: 'success deleted',
                      type: 'success',
                      confirmButtonText: 'Cool'
                    })
                  this.$router.replace('/')

                } else {
                  swal({
                    title: 'Error!',
                    text: "it's not yours",
                    type: 'error',
                    confirmButtonText: 'Cool'
                  })
                }
              })
              .catch (err => {
                  swal({
                    title: 'Error!',
                    text: err.response.data.msg,
                    type: 'error',
                    confirmButtonText: 'Cool'
                  })
              })          
        } else {
          swal({
              title: 'Error!',
              text: 'you must be login',
              type: 'error',
              confirmButtonText: 'Cool'
          })
        }
      },
      upVote(question){
        let token =localStorage.getItem("token")
        if (token) {
          axios.post(BASE_URL+'auth/isActive',{},{
            headers : {
              Authorization : token
            }
          })
          .then ( response => {
            let vote = question.vote
            let qid = question.qid
            let uid = question.uid
              try{
                var decoded = jwt.verify(token, 'hacktiv8');
                  if(decoded.id != uid){
                    let arrvote = question.upvote.split(',') 
                        
                      if( arrvote.indexOf(decoded.id) === -1){
                        console.log("=======", question.downvote)
                        this.spliceDownvote(decoded.id, question.downvote, question.qid)
                        this.countUpvote(question.qid, question.vote)
                        var updates = {};
                        updates['Questions/' + qid + '/upvote/'] = question.upvote +','+decoded.id;
                        firebase.database().ref().update(updates);
                      } 
                } else {
                    swal({
                      title: 'Error!',
                      text: "it's yours",
                      type: 'error',
                      confirmButtonText: 'Cool'
                    })
                }
              }catch(err){
                swal({
                  title: 'Error!',
                  text: err.message,
                  type: 'error',
                  confirmButtonText: 'Cool'
                })
              }
          })
          .catch (err => {
            swal({
                title: 'Error!',
                text: err.response.data.msg,
                type: 'error',
                confirmButtonText: 'Cool'
              })
          })
        } else {
          swal({
                title: 'Error!',
                text: 'you must be login',
                type: 'error',
                confirmButtonText: 'Cool'
              })
        }
        
      },  
      downVote(question){
        let token =localStorage.getItem("token")
        if (token) {
          axios.post(BASE_URL+'auth/isActive',{},{
            headers : {
              Authorization : token
            }
          })
          .then( response => {
              let vote = question.vote
              let qid = question.qid
              let uid = question.uid
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
                  }else {
                    swal({
                      title: 'Error!',
                      text: "it's yours",
                      type: 'error',
                      confirmButtonText: 'Cool'
                    })
                  }
                }catch(err){
                  swal({
                    title: 'Error!',
                    text: err.message,
                    type: 'error',
                    confirmButtonText: 'Cool'
                  })
                }
              // }
          })
          .catch (err => {
              swal({
                title: 'Error!',
                text: err.response.data.msg,
                type: 'error',
                confirmButtonText: 'Cool'
              })
          })
        } else {
          swal({
                title: 'Error!',
                text: 'you must be login',
                type: 'error',
                confirmButtonText: 'Cool'
              })
        }
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

