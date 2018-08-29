<template>
  <div class="home">
    <vs-row vs-w="12">
      <HelloWorld/>
    </vs-row>
    <vs-row vs-w="12">
      <vs-col vs-w="5">
       <ListQuestion/> 
      </vs-col>
      <vs-col vs-w="7">
          <router-view></router-view>
      </vs-col>
    </vs-row>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Question from '@/components/Question.vue'
import ListQuestion from '@/components/ListQuestion.vue'
export default {
  name: 'home',
  components: {
    HelloWorld,
    Question,
    ListQuestion
  },
  mounted(){
    console.log('ini mounted homeeeee')
    this.firstRoute()
  },
  watch : {
    '$route' (to, from){
      if(this.$route.name === 'home'){
        console.log('ini watch homeeeee')
        this.firstRoute()
      }
    }
  },
  methods : {
    firstRoute(){
        let question = firebase.database().ref('Questions');
        question.once('value', snapshot =>{
          // this.getNewPost(snapshot.val());
          console.log(snapshot.val(), "====home=====")
          let collection = Object.entries(snapshot.val())
          console.log(collection[0][0], "======")
          let qid = collection[0][0]
          this.$router.replace(`/question-detail/${collection[0][0]}`)
        });
    }
  },

}
</script>


