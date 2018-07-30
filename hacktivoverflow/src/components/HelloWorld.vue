<template>
  <div class="hello">
    <div class="centerx">
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
                  <md-button>Action</md-button>
                  <md-button>Action</md-button>
                </md-card-actions>
              </md-ripple>
            </md-card>
        </vs-col>
      </vs-row>  
    </div>
  </div>
</template>

<script>
var jwtDecode = require('jwt-decode');
import { VueEditor } from 'vue2-editor'
export default {
  name: 'HelloWorld',
  components: {
    VueEditor
  },
  props: {
    msg: String
  },
  data(){
    return{
      content: '<h1>Some initial content</h1>'  
    }
  },
  methods:{
    addQuestion(){
      let token =localStorage.getItem("token")
      console.log(this.content)
      let decoded = jwtDecode(token)
      console.log(decode)
    }
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
