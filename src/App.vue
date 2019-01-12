<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  head: {
    meta: () => {
        return [
            { property: 'author', content: 'Asahi Himura' },
            { property: 'keyword', content: 'にとらぼ' },
            { property: 'description', content: 'にとらぼ' },
            { property: 'twitter:card', content: 'summary' },
            { property: 'twitter:title', content: 'にとりB型' },
        ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
