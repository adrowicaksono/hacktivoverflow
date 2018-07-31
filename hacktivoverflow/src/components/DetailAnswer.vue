<template>
    <div>
        
        <vs-row>
            <vs-alert  :vs-icon.sync="icon1" vs-active="true">
                <p v-html="answer.content" style="margin-bottom:20px">
                    {{answer.content}}
                </p>
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
                <md-button class="md-fab md-mini md-plain">
                <md-icon >edit</md-icon>
                </md-button>
            </vs-col>
        </vs-row>
    </div>  
</template>

<script>
import jwt from 'jsonwebtoken'
export default {
    props:['answer'],
    data(){
        return{
           badge1:10,     
        }
    },
    methods:{
        upVote(answer){
        let token =localStorage.getItem("token")
        let vote = answer.vote
        let cid = answer.cid
        let qid = answer.qid
        let uid = answer.uid
        try{
         var decoded = jwt.verify(token, 'hacktiv8');
         if(decoded.id != uid){
            let upvote = Number(vote)+1 
            var updates = {};
            updates['Questions/' + qid + '/Comments/'+cid+'/vote/'] = upvote;
            firebase.database().ref().update(updates);
         }
         
        }catch(err){
          console.log(err.message)
        }
        
      },  
      downVote(answer){
        let token =localStorage.getItem("token")
        let vote = answer.vote
        let cid = answer.cid
        let qid = answer.qid
        let uid = answer.uid
        console.log("===downvote===")
        console.log("badge",vote)
        console.log("cid",cid)
        console.log("===downvote===")
        if(vote > 0){
          try{
            var decoded = jwt.verify(token, 'hacktiv8');
            if(decoded.id != uid){
                let downvote = Number(vote)-1 
                var updates = {};
                updates['Questions/' + qid + '/Comments/'+cid+'/vote/'] = downvote;
                firebase.database().ref().update(updates);
            }
         
          }catch(err){
            console.log(err.message)
          }
        }
      }
    }
}
</script>
