<template>
        <div>
            <!--師資陣容 個人介紹-->
            <!-- 頁面建置中 -->
            <section class="aboutme bg-heylin">
                <div class="container">
                    <div class="heading">
                        <h2>
                            關於我
                        </h2>
                        <p>
                            講師們的小簡介
                        </p>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-7 col-lg-9">
                                <h3 class="trainnerpadding">
                                    {{this.trainer[0].heading}}
                                </h3>
                                <h4 class="subHeading"></h4>
                                <p class="wordpadding col-lg-8">
                                    {{this.trainer[0].content}}
                                </p>
                                <!-- <a href="#" class="bntDownload">Download Printable Resume</a> -->
                        </div>
                        <div class="col-sm-12 col-md-4 col-lg-2 col-md-offset-1 col-lg-offset-1 proPic">
                                <img :src="this.trainer[0].imgurl"
                                      alt=""
                                      class="rm-thumb">
                        </div>
                    </div>
                </div>
            </section>
        </div>
</template>
<script>
import trainerdata from '../../../json/teacher.json'

export default {
  data () {
    return {
      trainerid: '',
      trainer: {}
    }
  },
  methods: {
    getTrainer () {
      var vm = this
      var result = trainerdata.data.teacher.filter(item => item.id === parseInt(this.trainerid))
      vm.trainer = Object.assign({}, result)
      // console.log(' this.trainer : ',this.trainer);
    }
  },
  created () {
    this.trainerid = this.$route.params.trainerid
    this.getTrainer()
    // console.log(' this.trainerid : ',this.trainerid);
  }
}
</script>
<style scope>
.aboutme{
  color:#fff;
  position:relative;
}
.aboutme .container{
  padding-top:85px ;
  padding-bottom:93px ;
}
.aboutTop{
  background:#00bdbd;
  height:60px;
}
.spHeight .aboutTop{
  margin-top:-62px !important;
}
.bntDownload{
  font-size:16px;
  font-family: 'Open Sans', sans-serif;
  font-weight:700;
  background:#474d5d;
  padding:16px 22px;
  display:inline-block;
}
.bntDownload:hover{
  background:#373d4c;
  color:#CCCCCC;
  text-decoration:none;
}
</style>
