<template>
    <vs-card vs-color="warning">
      <vs-card-header vs-background-color="warning" vs-title="Another nice title" vs-subtitle="A nice subtitle" vs-icon="warning"></vs-card-header>
      <vs-card-body>
      <vs-row>
          <vs-col vs-type="flex" vs-justify="flex-start" vs-align="flex-start" vs-w="2">
                <md-avatar class="md-large">
                  <img src="/img/loose.jpg" alt="fox">
                </md-avatar>
          </vs-col>     
               
               
          
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="10">
            <vs-alert vs-title="HEX" vs-active="true" vs-color="#842993">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna a
              liqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
            </vs-alert>
          </vs-col>
            <vs-col vs-type="flex" vs-justify="flex-end" vs-align="flex-end" vs-w="2">
              <vs-row vs-w="12">
                  <md-button class="md-fab md-mini md-plain">
                    <i class="material-icons">
                        thumb_down
                    </i>
                    </md-button>
              </vs-row>
              <vs-row vs-w="12">
                    <vs-avatar :vs-badge="badge1" vs-text="Luisdaniel" vs-size="large"/>
              </vs-row>
              <vs-row vs-w="12">
                    <md-button class="md-fab md-mini md-plain">
                    <i class="material-icons">
                      thumb_up
                    </i>
                  </md-button>
              </vs-row>
          </vs-col>  
      </vs-row>
      </vs-card-body>
      <vs-card-footer>
           <div class="centerx">
                <vs-button @click="answer1=!answer1" vs-color="primary" vs-type="filled">{{!answer1?'Open Answers':'Close Answers'}}</vs-button>
                 
                <vs-alert
                :vs-active.sync="answer1"
                vs-closable>
                  <vue-editor v-model="content"></vue-editor>
                 
                </vs-alert>

                <vs-alert
                :vs-active.sync="answer1"
                :vs-icon.sync="icon1"
                vs-closable>
                      <vs-row>
                        <h3>USER ID</h3>
                      </vs-row>
                      <vs-row>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat  
                        </p> 
                      </vs-row>
                      <vs-row >
                        <vs-col vs-type="flex" vs-justify="flex-start" vs-align="flex-start" vs-sm="12" vs-w="8">
                          <md-button class="md-fab md-mini md-plain">
                            <i class="material-icons">
                              thumb_down
                            </i>
                          </md-button>
                          <vs-avatar :vs-badge="badge1" vs-text="Luisdaniel" vs-size="large"/>
                          <md-button class="md-fab md-mini md-plain">
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
                </vs-alert>
            </div>
      </vs-card-footer>    
    </vs-card>
</template>


<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  data(){
    return {
      badge1:10,
      icon1:'sms',
      answer1:false,
      content: '<h1>Some initial content</h1>'
    }
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

