<template>
    <!-- from FrontMarketing -->
    <!-- 聽我吹牛 -->
    <div id="divider"
         class="container frontpadding">
            <DividerRect :getdividers="Dividers"></DividerRect>
    </div>
</template>

<script>
import deviders from '../../../../json/divide.json'
import DividerRect from '../../../tools//DividerRect'

export default {
  components: {
    DividerRect
  },
  data () {
    return {
      Dividers: {}
    }
  },
  methods: {
    getDividers () {
      this.Dividers = deviders.data.devide
      // this.$http.get('../json/divide.json').then(response => {
      //     console.log("json資料為:" + response);
      //     //此處的res物件包含了json的檔案資訊和資料
      // })
    }
  },
  created () {
    this.getDividers()
  }
}
</script>
