<template>
  <div class="home">
    <vs-row vs-w="12">
      <HelloWorld/>
    </vs-row>
    <vs-row vs-w="12">
      <Question/>
    </vs-row>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Question from '@/components/Question.vue'
export default {
  name: 'home',
  components: {
    HelloWorld,
    Question
  }
}
</script>


