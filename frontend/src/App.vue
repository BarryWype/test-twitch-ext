<template>
  <div>
    <img
      alt="Vue logo"
      src="./assets/logo.png"
      @click="handleclick"
    >
    <input type="text" id="urlSteamProfil">
    <button
      name="test"
      @click="handleclickbutton"
    >
      test
    </button>
    <h1 v-if="nickname">COUCOU {{this.nickname}}</h1>
    <h1 v-else>COUCOU LES CHIENS</h1>
  </div>
</template>

<script>
export default {
  name: 'App',

  mounted() {
    this.$twitch.init()
  },

  data() {
    return {
      nickname: null
    }
  },

  methods: {
    handleclick() {
      console.log(this.$twitch.testBackend())
      this.$twitch.testBackend().then(data => {
        console.log('data', data)
        this.nickname = data.nickname
      })
    },

    handleclickbutton() {
      let url = document.getElementById("urlSteamProfil").value
      console.log(url)
      this.$twitch.testBackend2(url).then(data => {
        console.log('data', data)
        this.nickname = data.nickname
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
