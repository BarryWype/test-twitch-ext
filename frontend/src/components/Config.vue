<template>
  <div class="hello">
    Ceci est une Config
    <input
      id="urlSteamProfil"
      type="text"
    >
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
const twitch = window.Twitch.ext

export default {
  name: 'ConfigVue',

  mounted() {
        this.$twitch.init()
  },

  methods: {
    handleclickbutton() {
      let url = document.getElementById("urlSteamProfil").value
      this.$twitch.testBackend2(url).then(data => {
        console.log('steamID', data.steamID)
        twitch.configuration.set("broadcaster", "1", data.steamID)
        console.log('conf', twitch.configuration.broadcaster)
      })
    }
  },

  

}
</script>