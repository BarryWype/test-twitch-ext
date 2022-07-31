<template>
  <div class="hello">
    <span>
      Profil : 
      <input
        id="urlSteamProfil"
        type="text"
        value="https://steamcommunity.com/profiles/76561198020613214/"
      >
    </span>
    <span>
      AppId :
      <input
        id="appID"
        type="text"
        value="211420"
      >
    </span>
    <button
      name="test"
      @click="handleclickbutton"
    >
      Super bouton
    </button>
    <span></span>
  </div>
</template>

<script>
const twitchExt = window.Twitch.ext

export default {
  name: 'ConfigVue',

  mounted() {
    this.$twitch.init()
  },

  methods: {
    handleclickbutton() {
      let url = document.getElementById("urlSteamProfil").value
      let appID = document.getElementById("appID").value
      this.$steam.callUserSteamProfile(url).then(data => {
        console.log('steamID', data.steamID)
        console.log('appID', appID)
        const steamID = data.steamID
        twitchExt.configuration.set("broadcaster", "1", JSON.stringify({'steamID': steamID, 'appID': appID }))
        console.log(twitchExt.configuration)
      })
    }
  },

  

}
</script>