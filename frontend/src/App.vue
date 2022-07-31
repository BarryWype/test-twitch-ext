<template>
  <div>
    <h1 v-if="nickname">
      Achivement {{ nickname }}
    </h1>
    <h1 v-else>
      The broadcaster need to configure the extension
    </h1>
  </div>
</template>

<script>
import twitch from './js/twitch'

const twitchExt = window.Twitch.ext

export default {
  name: 'App',

  data() {
    return {
      nickname: null,
      steamID: null
    }
  },

  beforeMount() {
    this.$twitch.init()
  },

  created() {
    twitchExt.configuration.onChanged(function() {
      // Checks if configuration is defined
      console.log("test")
      if (twitchExt.configuration.broadcaster) {
        console.log(twitch.configuration.broadcaster)
        try {
          // Parsing the array saved in broadcaster content
          this.steamID = twitchExt.configuration.broadcaster.content
          console.log(this.steamID)
          console.log(twitch.testBackend2)
          twitch.testBackend2(this.steamID).then(data => {
            console.log('data', data)
            this.nickname = data.nickname
            console.log(this.nickname)
          })  
        } catch (e) {
          console.log('Invalid config')
        }
      }
    })
  },

  methods: {
    
  },


}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
