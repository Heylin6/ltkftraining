<template>
    <!-- from FrontMarketing -->
    <!-- 師資陣容 -->
    <div id="trainer"
         class="container frontpadding">
            <TeacherRect :getteachers="Teachers"></TeacherRect>
    </div>
</template>
<script>
import teachers from '../../../../json/teacher.json'
import TeacherRect from '../../../tools/TeacherRect'

export default {
  components: {
    TeacherRect
  },
  data () {
    return {
      Teachers: {}
    }
  },
  methods: {
    getTeachers () {
      this.Teachers = teachers.data.teacher
      // this.$http.get('../json/divide.json').then(response => {
      //     console.log("json資料為:" + response);
      //     //此處的res物件包含了json的檔案資訊和資料
      // })
    }
  },
  created () {
    this.getTeachers()
  }
}
</script>
