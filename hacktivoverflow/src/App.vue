<template>
  <div id="app">
    <div id="nav">
      <vs-topbar vs-color="primary" >
          <vs-row vs-w="12">
              <vs-col vs-type="flex" vs-justify="center" vs-align="flex-end" vs-lg="2" vs-sm="4" vs-xs="12" >
                <span class="md-display-1">HACKTIV OVERFLOW</span>
              </vs-col>
              <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="4" vs-xs="12">
                <div style="z-index:20;" class="search-box">
                  <md-autocomplete
                    class="search becenter"
                    v-model="selectedQuestion"
                    :md-options="question"
                    md-layout="box"
                    >
                    <label>Search...</label>
                  </md-autocomplete>
                </div>
              </vs-col>
              <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link> |
                <vs-button v-on:click="signUp" class="becenter" vs-color="success" vs-type="relief">Sign Up</vs-button>
                <vs-button v-on:click="signIn" class="becenter" vs-color="success" vs-type="relief">Sign In</vs-button>
                <vs-button vs-color="warning"  class="becenter" vs-type="relief">Sign Out</vs-button>
              </vs-col>
          </vs-row>
      </vs-topbar>
    </div>
    <vs-prompt
      @vs-cancel="SignIn.email='',SignIn.password=''"
      @vs-accept="signInAcc"
      :vs-is-valid="validName"
      :vs-active.sync="activeSignIn"
      :vs-title="titleDialog1">
       <div class="con-exemple-prompt">
         Enter your email dan password to <b>continue</b>.
         <vs-input placeholder="email" v-model="SignIn.email"/>
         <vs-input placeholder="password" v-model="SignIn.password"/>
         <vs-alert :vs-active="!validName" vs-color="danger" vs-icon="new_releases" >
           Fields can not be empty please enter the data
         </vs-alert>
       </div>
     </vs-prompt>

     <vs-prompt
      @vs-cancel="SignUp.name='',SignUp.email='',SignUp.password=''"
      @vs-accept="signUpAcc"
      :vs-is-valid="validName"
      :vs-active.sync="activeSignUp"
      :vs-title="titleDialog2">
       <div class="con-exemple-prompt">
         Enter your name, email and password to <b>continue</b>.
         <vs-input placeholder="name" v-model="SignUp.name"/>
         <vs-input placeholder="email" v-model="SignUp.email"/>
         <vs-input placeholder="password" v-model="SignUp.password"/>
         <vs-alert :vs-active="!validName" vs-color="danger" vs-icon="new_releases" >
           Fields can not be empty please enter the data
         </vs-alert>
       </div>
     </vs-prompt>


    <router-view/>
  </div>
</template>



<script>


export default {
  data(){
    return{
      activeSignUp : false,
      titleDialog2 : "Sign Up",
      SignUp:{
        name:'',
        email:'',
        password:''
      },
      activeSignIn : false,
      titleDialog1 : "Sign In",
      SignIn:{
        email:'',
        password:''
      },
      selectedQuestion: '',
       question: ['More Question']
    }
  },
  methods:{
    signIn(){
      console.log("disign In")
       this.activeSignIn = true
    },
    signUp(){
      console.log("disign Up")
      this.activeSignUp = true
    },
    signInAcc(){
      console.log("di accept")
      console.log(this.SignIn.email, this.SignIn.password)
    },
    signUpAcc(){
      console.log("di accept")
      console.log(this.SignUp.name, this.SignUp.email, this.SignUp.password)
    }
  }
}
</script>


<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 0;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
.becenter{
  margin:px;  
}
}
</style>
