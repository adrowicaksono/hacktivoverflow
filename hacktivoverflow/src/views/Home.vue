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
  }
}
</script>


