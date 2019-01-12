<template>
  <div class="hello">
    <notifications group="foo" />
    <button @click="twitter_login" class="button"><i class="fab fa-twitter"></i> Login With Twitter</button>
  </div>
</template>

<script>

import {getAccessToken, setAccessToken, hasToken} from '@/storage'
import axios from 'axios';

export default {

  created() {
    if(hasToken){
      console.log('yes')
      this.$notify({
        group: 'foo',
        type: 'error',
        title: 'error',
        text: 'oops... an error rized'
      });
    }
    else {

    }
  },
  methods: {
    twitter_login() {
      axios.get('https://apqa9rq0d4.execute-api.ap-northeast-1.amazonaws.com/prod/twitter/createauth')
      .then((response) => {
        if(response.status === 200 && response.data.statusCode == 200){
          console.log(response.data.result.authURL)
          this.auth_url = response.data.result.authURL
          location.href=this.auth_url
        }
        
        console.log(response)
      })
    }

  }
}
</script>

<style lang="scss">
.button{
  padding: 1em;
  border-radius: 0.5em;
  border: none;
  background-color: #3498db;
  cursor: pointer;
  color: white;
}

</style>

