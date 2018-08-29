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
                <vs-button v-if="hasLogin  && !isFacebook" v-on:click="signOut"  vs-color="warning"  class="becenter" vs-type="relief">Sign Out</vs-button>
                <facebook-login  v-if="isFacebook" class="button"
                  appId="935675349937864"
                  @login="getUserData"
                  @logout="onLogout"
                  @get-initial-status="getUserData">
                </facebook-login>
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
         Enter your email dan password to <b>continue</b>
         <vs-input placeholder="email" v-model="SignIn.email"/>
         <vs-input type="password" placeholder="password" v-model="SignIn.password"/>
         <vs-alert :vs-active="!SignIn.email" vs-color="danger" vs-icon="new_releases" >
           email can not be empty please enter the data
         </vs-alert>
         <vs-alert :vs-active="!SignIn.password" vs-color="danger" vs-icon="new_releases" >
           password can not be empty please enter the data
         </vs-alert>
         <facebook-login class="button"
            appId="935675349937864"
            @login="getUserData"
            @logout="onLogout"
            @get-initial-status="getUserData">
          </facebook-login>
          <vs-button  class="becenter" @click="googleSignIn" vs-color="success" vs-type="relief">Google SignIn</vs-button>
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
         <vs-input type="password" placeholder="password" v-model="SignUp.password"/>
         <vs-alert :vs-active="!validName" vs-color="danger" vs-icon="new_releases" >
           Fields can not be empty please enter the data
         </vs-alert>
       </div>
     </vs-prompt>
      
    <p style="color:red"><strong>{{error}}</strong></p>
    <router-view/>
  </div>
</template>



<script>
import axios from 'axios'
import jwt from 'jsonwebtoken'
import facebookLogin from 'facebook-login-vuejs';
// import nodemailer from 'nodemailer'
import swal from 'sweetalert2'
import BASE_URL from '@/BASE_URL/BASE_URL'
export default {
  components: {
        facebookLogin
    },
  data(){
    return{
      validName :'',
      error : '' ,
      isFacebook : false,
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
    }else{
      
    }
  },
  watch:{
    name:function(){
      if(typeof this.name != 'undefined'){
        let id = this.personalID
        let email = this.email
        let name = this.name
        var token = jwt.sign({id:id, email:email, name:name}, 'hacktiv8')
          console.log("its time to signup", this.name, this.email, this.personalID)
          console.log("its time to signup", token)
          localStorage.setItem("token", token)
          this.isFacebook = true
          this.hasLogin = true
          this.activeSignIn = false
      }else{
        this.isFacebook = false 
        localStorage.clear()
      }
    }
  },
  methods:{
    googleSignIn(){
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth().signInWithPopup(provider).then((result) => {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(token, "auth firebase")

            axios.post(BASE_URL+'auth/google', {
              accessToken : token
            })
            .then( response => {
              console.log(response.data.token, "======")
              this.hasLogin = true
              localStorage.setItem("token", response.data.token)
              this.activeSignIn = false
              localStorage.setItem("userId", response.data.userId)
              // this.SignIn.email = ''
              // this.SignIn.password = ''
              this.error = ''
            })
            .catch( err => {
              // this.error = err
            })

      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        this.error = errorMessage
      });
    },
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
      .post(BASE_URL+'auth', {
        email: this.SignIn.email,
        password: this.SignIn.password
      })
      .then((respons)=>{
        localStorage.setItem("token", respons.data.token)
        localStorage.setItem("userId", respons.data.userId)
        this.hasLogin = true
        this.SignIn.email = ''
        this.SignIn.password = ''
        this.error = ''
      })
      .catch( (err) => {
        this.SignIn.email = ''
        this.SignIn.password = ''
        this.error = err.response.data.msg
      })
    },
    signUpAcc(){
      console.log("di accept")
      console.log(this.SignUp.name, this.SignUp.email, this.SignUp.password)
      
      axios
      .post(BASE_URL+'users', {
        name:this.SignUp.name,
        email:this.SignUp.email,
        password:this.SignUp.password,
      })
      .then((respons)=>{
        console.log(respons)
        this.SignIn.email = this.SignUp.email
        this.activeSignIn = true
        this.SignUp.name = '',
        this.SignUp.email = '',
        this.SignUp.password = ''
      })
      .catch( (err) => {
        this.error = err.response.data.msg 
        this.SignUp.name = '',
        this.SignUp.email = '',
        this.SignUp.password = ''
      })
    },
     getUserData() {
      FB.api('/me', 'GET', { fields: 'id,name,email' },
        userInformation => {
          this.personalID = userInformation.id;
          this.email = userInformation.email;
          this.name = userInformation.name;
          console.log('past',userInformation.error)
          console.log('past',userInformation.email)
          console.log('past',userInformation)
          
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
      this.isFacebook = false 
      this.hasLogin = false
      console.log(this.name, this.personalID)
      localStorage.clear()
      this.isConnected = false;
    },
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



