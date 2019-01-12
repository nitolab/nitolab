<template>
  <div class="imgUploader container"
    @dragover.prevent="onHover"
    @dragleave.prevent="onLeave"
    @drop.prevent="onLeave"
  >
    <div class="spinner primary" v-if="progress"></div>
    <notifications group="foo" />
    <h1>にとりB型</h1>
    <p>ツイートする画像/動画をセンシティブな内容を含むものとして設定してツイートするやつ</p>

    <div v-if="!use_enable">
      <div class="col-sm-12">
        <textarea disabled style="width: 100%; height:5em">
利用規約

当ツイートする画像/動画をセンシティブな内容を含むものとして設定してツイートするやつ（以下、にとりB型）は、nitolab.com運営者である緋村浅日が個人的に作成・運営しているものです。

にとりB型のAPI（アプリケーション・プログラミング・インターフェース）（以下利用者）を使用する人（以下利用者）はにとりB型を使用する場合、本利用規約に同意したものとみなされます。

当利用規約では、以下に関することを全て禁止します。
- サードパーティアプリや自作アプリを使用してにとりB型を使用すること
- にとりB型のリバースエンジニアリング（聞いてくれればナレッジは提供します）
- 10分以内に5回以上の使用
- 営利利用
- 一般的な見解からして不正と見られる行為

プログラム、サービス提供画面、本ソフトウェア等、本APIサービスに関する一切の特許権、実用新案権、意匠権、商標権、著作権、不正競争防止法上の権利、その他一切の財産的若しくは人格的権利（以下「知的財産権等」といいます。）は、全て緋村又はそのライセンサーに帰属します。

利用者は、本利用規約に基づいて、にとりB型を利用することができますが、提供される本APIサービスに関する知的財産権等を取得するものではありません。利用者は、にとりB型の一部または全部を、リバースエンジニアリング、逆コンパイル、又は逆アセンブラ、その他本APIサービスを解析しようと試みてはならないものとします。

緋村はにとりB型の運用に関して得られるいかなる情報をにとりB型の機能以外で使用することはしません。
また、緋村はにとりB型の利用によって起こるいかなるトラブルにも責任を持ちません。

にとりB型は利用者の同意なくいきなり機能変更、運用停止をする場合があります。

にとりB型に関して利用者と緋村との間で問題が生じた場合、利用者と緋村は誠意をもって協議し、その解決に努めるものとします。

以上
2018年12月10日制定
        </textarea>
      </div>
      <div class="col-sm-12">
        <label><input type="checkbox" v-model="checked" />利用規約に同意します</label>
      </div>

      <button @click="twitter_login" class="tweetbutton " :disabled="!checked" ><i class="fab fa-twitter"></i> Login With Twitter</button>
    </div>

    <div v-if="use_enable">
      <form @submit.prevent="submit">
        <input type="file" id="uploade_file" style="display: none" @change="onDrop" />
        <div class="row">
          <div class="col-sm-12">
          </div>
          <div class="col-sm-12">
            <textarea
              class="_status_input"
              v-bind:class="{focus: focus}"
              v-model="message"
              @focus="onFocus"
              @blur="onBlur"
            ></textarea>
            <progress max="140" :value="status_length"></progress>{{ status_length }}
            {{gsl()}}
          </div>
          <div class="col-sm-12">
            <label for="uploade_file" class="img_upload_button"><i class="far fa-image"></i></label>
            今の所アップできる画像は一枚のみです
          </div>
          <div class="col-sm-12">
            <div class="_status_area">
              <div
                class="drop"
                v-bind:class="{over: over}"
                @drop.prevent="onDrop"
              >
                <div class="drop__default-container" @change="onDrop">
                  <div v-if="thumbnail" :style="{'background-image': 'url('+thumbnail+')'}" class="__thumbnail"></div>
                </div>
              </div>
            </div>

          </div>

          <div class="col-sm-12">
            <input type="submit" v-bind:disabled="checkForm()" v-bind:class="{primary: !checkForm()}" />
          </div>
      </div>
      </form>
    </div>
  </div>
</template>

<script>

import {getAccessToken, setAccessToken, hasToken} from '@/storage'
import axios from 'axios';
let url = 'https://apqa9rq0d4.execute-api.ap-northeast-1.amazonaws.com/prod/twitter/upload-media'


export default {
  name: 'imageUploader',
  data () {
    return {
      "logined": false,
      "use_enable": false,
      "status_length": 0,
      "ggg":"",
      "checked": false,

      "message": "",
      "uploadFile": null,
      "thumbnail" : null,
      "image": "",
      "lock": false,
      "progress": false,
      "over": false,
      "focus": false
    }
  },
  created() {
    let t = getAccessToken()
    if(hasToken()) {
      this.use_enable = true;
    }
  },
  methods: {
    checkForm() {
      return !(this.message.length > 0 && this.status_length <= 140 && this.uploadFile && !this.progress)
    },
    gsl() {
      let n = this.message
      let result = 0;
      for(let i=0;i<n.length;i++){
        let chr = n.charCodeAt(i);
        if((chr >= 0x00 && chr < 0x81) || (chr === 0xf8f0) || (chr >= 0xff61 && chr < 0xffa0) || (chr >= 0xf8f1 && chr < 0xf8f4)){
          result += 1;
        }else{
          result += 2;
        }
      }
      this.status_length = Math.ceil(result/2)
    },
    clear() {
      this.thumbnail = null
      this.uploadFile = null
      this.message = ""
    },
    onFocus(e) {
      this.focus = true
    },
    onBlur(e) {
      this.focus = false
    },
    onHover(e){
      this.over = true
    },
    onLeave(e) {
      this.over = false
    },
    onDrop(e) {
      console.log(e)
      let files = e.target.files || e.dataTransfer.files;
      console.log(files)
      for(let i=0;i<files.length;i++){
        if(['image/jpeg', 'image/png', 'image/gif'].indexOf(files[i])){
          this.uploadFile = files[i]
          this.pushImage(files[i])
        }
      }
      this.onLeave()
    },
    pushImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.thumbnail = e.target.result
      };
      reader.readAsDataURL(file);
    },
    delImage(index) {
      this.thumbnails.splice(index, 1)
    },
    submit(e) {
      this.progress = true
      console.log(e)
      console.log(this)

      let formData = new FormData();
      formData.append('media', this.uploadFile);
      formData.append('status', this.message);
      // formData.append('debug', "yes");
      let authent = getAccessToken()

      axios.post(url, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-api-key': 'CgoH28QfiP502VClNhdrV4hAkCHDJYTg15OmkZgS',
            'nitolab_auth': authent.ApiKey
          }
      })
      .then((res) => {
        this.progress = false
        if(res.data.statusCode == '200'){
          this.$notify({
            group: 'foo',
            type: 'success',
            title: 'Send Success',
            text: 'Good! send Success!'
          });
          this.clear()
        }else{
          this.$notify({
            group: 'foo',
            type: 'warn',
            title: 'warning',
            text: res.data.message
          });
        }
        console.log(res)
      })
      .catch((res) => {
        this.progress = false
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'error',
          text: 'oops... an error rized'
        });
        console.log(res)
      })

    },
    twitter_login() {
      axios.get('https://apqa9rq0d4.execute-api.ap-northeast-1.amazonaws.com/prod/twitter/createauth')
      .then((response) => {
        if(response.status === 200 && response.data.statusCode == 200){
          this.auth_url = response.data.results.authURL
          location.href=this.auth_url
        }
      })
    }
  },
  head: {
    title: {
        inner: 'にとりB型'
    },
    meta: () => {
        return [
            { property: 'twitter:card', content: 'summary' },
            { property: 'twitter:title', content: 'にとりB型' },
        ]
    }
  }
}
</script>

<style lang="scss">
.container{
  max-width: 30em;
}
#image {
  max-width: 300px;
}
#imageform {
  opacity: 0.1;
  border:solid red 1px;
}
.drop__default-container{
  min-width: 100%;
  min-height: 100px;
  // border: solid red 1px;
}
.over{
  border: orange dotted 5px;
}
._status_input {
  resize: none;
  width: 100%;
  height: 9em;
  margin-bottom: 0;
  border-radius: 5px;
  &.focus {
    height: 9em;
    border: solid blue 1px;
  }
}
._under_box {
  margin-top: 0;
  width: 100%;
  border: solid yellow 1px;
  padding:1em;
}
.__thumbnail{
  width: 8em;
  height: 8em;
  background-position: center;
  background-size: cover;
}
.img_upload_button {
  font-size: 2em;
  cursor: pointer;
  // background-color: #fff;
  border-radius: .1em;
  border: solid #333 1px;

}

.tweetbutton{
  padding: 1em;
  border-radius: 0.5em;
  border: none;
  background-color: #3498db;
  cursor: pointer;
  color: white;
  &[disabled] {
    cursor: default;
    background-color:#aaa;
  }
}
</style>

