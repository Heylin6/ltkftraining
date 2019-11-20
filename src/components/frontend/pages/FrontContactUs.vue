<template>
    <div >
        <!-- 聯絡我們 -->
        <ImageWall></ImageWall>
        <div class="container"
             style="padding: 5% 0 0 0;">
            <Map></Map>
            <hr class="featurette-divider">
            <SendMail></SendMail>
        </div>
    </div>
</template>
<script>
import SendMail from './floor2/FrontSendMail'
import Map from './floor2/FrontMap'
import ImageWall from '../../tools/ImageWall'
export default {
  components: {
    SendMail,
    Map,
    ImageWall
  },
  data () {
    return {

    }
  },
  created () {

  }
}
</script>
