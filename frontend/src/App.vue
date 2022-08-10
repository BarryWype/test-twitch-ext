<template>
  <div>
    <h1 v-if="nickname">
      Achivement {{ nickname }}
    </h1>
    <h1 v-else>
      The broadcaster need to configure the extension
    </h1>
    <p v-if="achivements.length === 0">Vide</p>
    <div v-else>
      Liste des succès
      <ul>
        <li v-for="achi in achivements">
          {{ achi.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

const twitchExt = window.Twitch.ext

export default {
    name: "App",

    data() {
        return {
          nickname: null,
          steamID: null,
          appID: null,
          achivements: []
        }
    },
    beforeMount() {
      this.$twitch.init()  
    },
    created() {
      let self = this
      twitchExt.configuration.onChanged(function() {
        self.handleInit()
        self.handleClickAchivement()
        self.handleClickApps()
      })
    },
    methods: {
        handleInit() {
          console.log("init")
          if (twitchExt.configuration.broadcaster) {
            let content = JSON.parse(twitchExt.configuration.broadcaster.content)
            console.log(content)
            try {
                // Parsing the array saved in broadcaster content
                console.log(content.appID)
                this.steamID = content.steamID
                this.appID = content.appID
                this.$steam.callUserSteamProfile(this.steamID).then(data => {
                  this.nickname = data.nickname
                })
            }
            catch (e) {
              console.log("Invalid config")
            }
          }
        },
        handleClickAchivement() {
            this.$steam.callAchivementState(this.steamID, this.appID).then(data => {
              console.log(data)
              this.achivements = data
            })
        },
        handleClickApps() {
            console.log('appId', this.appID)
            this.$steam.callGameInformation(this.appID).then(data => {
                console.log("app", data)
            })
        }
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
