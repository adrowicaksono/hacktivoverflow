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
    </div>  
</template>

<script>
export default {
    props:['answer'],
    data(){
        return{
           badge1:10,     
        }
    }
}
</script>
