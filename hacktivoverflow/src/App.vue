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
                <vs-button v-show="!hasLogin" v-on:click="signUp" class="becenter" vs-color="success" vs-type="relief">Sign Up</vs-button>
                <vs-button v-show="!hasLogin" v-on:click="signIn" class="becenter" vs-color="success" vs-type="relief">Sign In</vs-button>
                <vs-button v-show="hasLogin" v-on:click="signOut"  vs-color="warning"  class="becenter" vs-type="relief">Sign Out</vs-button>
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
         <facebook-login class="button"
            appId="548038762266220"
            @login="getUserData"
            @logout="onLogout"
            @get-initial-status="getUserData">
          </facebook-login>
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
import axios from 'axios'

import facebookLogin from 'facebook-login-vuejs';


export default {
  components: {
        facebookLogin
    },
  data(){
    return{
      hasLogin : false,
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
       question: ['More Question'],
       isConnected: false,
      name: '',
      email: '',
      personalID: '',
      FB : null,
      
    }
  },
  created(){
     if(localStorage.token){
      this.hasLogin = true
    }
  },
  // watch:{
    // name:function(){
    //   console.log(this.name)
    // }
  // },
  methods:{
    signIn(){
      console.log("disign In")
      this.getUserData()
      this.activeSignIn = true
    },
    signUp(){
      console.log("disign Up")
      this.activeSignUp = true
    },
    signOut(){
      this.hasLogin = false
      localStorage.clear()
    },
    signInAcc(){
      console.log("di accept")
      console.log(this.SignIn.email, this.SignIn.password)
      axios
      .post('http://hacktivoverflowserver.adrowicaksono.xyz/auth', {
        email: this.SignIn.email,
        password: this.SignIn.password
      })
      .then((respons)=>{
        console.log(respons.data.token)
        this.hasLogin = true
        localStorage.setItem("token", respons.data.token)
        localStorage.setItem("userId", respons.data.userId)
        this.hasLogin = true
        this.SignIn.email = ''
        this.SignIn.password = ''
      })
      .catch(function(err){
        console.log(err.message)
      })
    },
    signUpAcc(){
      console.log("di accept")
      console.log(this.SignUp.name, this.SignUp.email, this.SignUp.password)
      
      axios
      .post('http://hacktivoverflowserver.adrowicaksono.xyz/users', {
        name:this.SignUp.name,
        email:this.SignUp.email,
        password:this.SignUp.password,
      })
      .then((respons)=>{
        console.log(respons)
        this.SignIn.email = this.SignUp.email
        this.activeSignIn = true
      })
      .catch(function(err){
        console.log(err.me)
      })
    },
     getUserData() {
      FB.api('/me', 'GET', { fields: 'id,name,email' },
        userInformation => {
          this.personalID = userInformation.id;
          this.email = userInformation.email;
          this.name = userInformation.name;
          console.log('past',userInformation.email)
          console.log('past',userInformation)
          if(this.activeSignIn && this.isConnected){
            this.SignUp.name =  this.name
            this.SignUp.email =  this.email
            this.SignUp.password =  this.nasme.split(' ')[0]+'kece'+123
            console.log('ini pass sign', this.signUp.password)
          }
        })
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      console.log(payload)
      console.log('dimana nihhh')
      if (this.isConnected) this.getUserData()
    },
    onLogin() {
      this.isConnected = true
      this.getUserData()
    },
    onLogout() {
      console.log(this.name, this.personalID)
      this.isConnected = false;
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
  margin-top:30px;
  margin-right: 10px; 
  padding: 10px;  
}
}
</style>



