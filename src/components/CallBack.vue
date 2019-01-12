<template>
  <div class="hello">
    <div v-if="success">Success !</div>
    <div v-if="processing"><div class="spinner primary"></div>processing...</div>
    <div v-if="error"><i class="fas fa-exclamation-triangle"></i> oops.. an error occurred<br/><a href="/auth/login">relogin</a></div>
    <hr>
    - <a href='/'>nitolab</a> -
  </div>
</template>

<script>
import axios from 'axios';
import {getAccessToken, setAccessToken, hasToken} from '@/storage'

export default {
  data () {
    return {
      "oauth_token": null,
      "oauth_verifier": null,
      "processing": true,
      "error": false,
      "success": false,
      "token": ""
    }
  },
  created () {
    let uri = window.location.href.split('?');
    if (uri.length == 2)
    {
      let vars = uri[1].split('&');
      let getVars = {};
      let tmp = '';
      vars.forEach(function(v){
        tmp = v.split('=');
        if(tmp.length == 2)
        getVars[tmp[0]] = tmp[1];
      });
      this.oauth_token = getVars['oauth_token']
      this.oauth_verifier = getVars['oauth_verifier']
      if(this.oauth_token && this.oauth_verifier) {
        this.verify()
      }
      else{
        this.error = true
      }
    }
    else {
      this.processing = false
      this.error = true
    }
  },
  methods: {
    verify() {
      axios.post('https://apqa9rq0d4.execute-api.ap-northeast-1.amazonaws.com/prod/twitter/verify',
       {
          "oauth_token": this.oauth_token,
          "oauth_verifier": this.oauth_verifier
       }
      )
      .then((response) => {
        console.log(response)
        if(response.data.statusCode == 200){
          this.success = true
          let r = JSON.stringify(response.data.results)
          setAccessToken(r)
          location.href='/app/imgupload'
          this.processing = false
        }
      })
      .catch((response) => {
        this.error = true
      })
    }
  }
}
</script>

<style >
</style>
