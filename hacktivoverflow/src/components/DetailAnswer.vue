<template>
    <div>
        
        <vs-row>

            <vs-alert  :vs-icon.sync="icon1" vs-active="true">
                <p><strong>{{answer.name}} :</strong></p>
                <p v-html="answer.content" style="margin-bottom:20px">
                    {{answer.content}}
                </p>
                <vue-editor v-if="isEdit" v-model="newContent"></vue-editor>
            </vs-alert> 
        </vs-row>
        <vs-row >
            <vs-col vs-type="flex" vs-justify="flex-start" vs-align="flex-start" vs-sm="12" vs-w="8">
                <md-button class="md-fab md-mini md-plain" v-on:click="downVote(answer)">
                    <i class="material-icons">
                        thumb_down
                    </i>
                </md-button>
                <vs-avatar :vs-badge="answer.vote" v-bind:vs-text="answer.name" vs-size="large"/>
                <md-button class="md-fab md-mini md-plain" v-on:click="upVote(answer)">
                    <i class="material-icons">
                        thumb_up
                    </i>
                </md-button>
            </vs-col>
            <vs-col vs-type="flex" vs-justify="flex-end" vs-align="flex-end"  vs-sm="12" vs-w="4">
                <md-button class="md-fab md-mini md-plain" @click="edit(answer)">
                <md-icon >edit</md-icon>
                </md-button>
                <md-button v-if="isEdit"  class="md-fab md-mini md-plain" @click="isEdit=false">
                <md-icon >clear</md-icon>
                </md-button>
                <md-button v-if="isEdit" class="md-fab md-mini md-plain" @click="update(answer)">
                <md-icon >save</md-icon>
                </md-button>
            </vs-col>
        </vs-row>
    </div>  
</template>

<script>
import jwt from 'jsonwebtoken'
import BASE_URL from '@/BASE_URL/BASE_URL'
import axios from 'axios'
import swal from 'sweetalert2'
import { VueEditor } from 'vue2-editor'

export default {
    props:['answer'],
    components : {
        VueEditor
    },
    data(){
        return{
        //    badge1:10,
           isEdit : false,
           newContent : '', 
        }
    },
    methods:{
        edit (answer) {
            this.isEdit = true
            this.newContent = answer.content
        },
        update (answer){
            let token = localStorage.getItem("token")
                    if(token){
                    axios.post(BASE_URL+'auth/isActive',{},{
                        headers : {
                        Authorization : token
                        }
                    })
                    .then(response => {
                        if (response.data.id == answer.uid){
                        firebase.database().ref('Questions/' + answer.qid + '/Comments/' + answer.cid + '/content' ).set(this.newContent)
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
        upVote(answer){
        console.log(answer.cid)
        let token =localStorage.getItem("token")
        if (token){
            axios.post(BASE_URL+'auth/isActive',{},{
                headers : {
                  Authorization : token
                }
              })
              .then(response => {
                  let vote = answer.vote
                  let cid = answer.cid
                  let qid = answer.qid
                  let uid = answer.uid
                  try{
                  var decoded = jwt.verify(token, 'hacktiv8');
                    if(decoded.id != uid){
                        let arrvote = answer.upvote.split(',')
                        if(arrvote.indexOf(decoded.id) === -1){
                            this.spliceDownvote(decoded.id, answer.downvote, answer.cid, answer.qid)
                            this.countUpvote(answer.cid, answer.qid, answer.vote)  
                            var updates = {};
                            updates['Questions/' + qid + '/Comments/'+cid+'/upvote/'] = answer.upvote +','+decoded.id;
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
              .catch( err => {
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
      downVote(answer){
        let token =localStorage.getItem("token")
        if( token ) {
            axios.post(BASE_URL+'auth/isActive',{},{
                headers : {
                  Authorization : token
                }
              })
              .then(response => {
                    let vote = answer.vote
                    let cid = answer.cid
                    let qid = answer.qid
                    let uid = answer.uid
                    // if(vote > 0){
                    try{
                        var decoded = jwt.verify(token, 'hacktiv8');
                        if(decoded.id != uid){
                            let arrvote = answer.downvote.split(',')
                            if(arrvote.indexOf(decoded.id) === -1){
                                this.spliceUpvote(decoded.id, answer.upvote, answer.cid, answer.qid)
                                this.countDownvote(answer.cid, answer.qid, answer.vote)
                                var updates = {};
                                updates['Questions/' + qid + '/Comments/'+ cid +'/downvote/'] =  answer.downvote +','+decoded.id;
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
              .catch( err => {
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
      spliceUpvote(id, upvote, cid, qid){
        let arrvote = upvote.split(',')
        let idVote = arrvote.indexOf(id)
        arrvote.splice(idVote, 1)
        let update = arrvote.join(',')
        var updates = {};
        updates['Questions/' + qid + '/Comments/'+cid+'/upvote/'] = update;
        firebase.database().ref().update(updates); 
      },
      spliceDownvote(id, downvote, cid, qid){
        let arrvote = downvote.split(',')
        let idVote = arrvote.indexOf(id)
        arrvote.splice(idVote, 1)
        let update = arrvote.join(',')
        var updates = {};
        updates['Questions/' + qid + '/Comments/'+ cid +'/downvote/'] = update;
        firebase.database().ref().update(updates);
      },
      countUpvote(cid, qid, vote){
        let update = Number(vote) + 1
        var updates = {};
        updates['Questions/' + qid + '/Comments/'+cid+'/vote/'] = update ;
        firebase.database().ref().update(updates);
      },
      countDownvote(cid, qid, vote){
        let update = Number(vote) - 1
        if(update >= 0){
          var updates = {};
          updates['Questions/' + qid + '/Comments/'+cid+'/vote/'] = update ;
          firebase.database().ref().update(updates);
        }
      },
    }
}
</script>
