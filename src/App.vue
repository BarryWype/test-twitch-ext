<template>
  <div>
    <img alt="Vue logo" @click='handleclick' src="./assets/logo.png">
    <h1>COUCOU LES IENCHS</h1>
  </div>
</template>

<script>
export default {
  name: 'App',

  mounted() {
    this.$twitch.init()
  },

  methods: {
    handleclick() {
      this.$twitch.testBackend()
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
