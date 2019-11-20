<template>
    <div class="marketing">
           <FrontCarousel></FrontCarousel>
           <hr class="featurette-divider">
           <FrontSlogan></FrontSlogan>
           <hr class="featurette-divider">
           <FrontDivider></FrontDivider>
           <hr class="featurette-divider">
           <FrontTeacher></FrontTeacher>
           <hr class="featurette-divider">
           <FrontActiTricks></FrontActiTricks>
           <hr class="featurette-divider">
           <FrontLeaveMail></FrontLeaveMail>
    </div>
</template>
<script>
import FrontCarousel from '../FrontCarousel'
import FrontTeacher from './floor1/FrontTeacher'
import FrontDivider from './floor1/FrontDivider'
import FrontActiTricks from './floor1/FrontActiTricks'
import FrontSlogan from './floor1/FrontSlogan'
import FrontLeaveMail from './floor1/FrontLeaveMail'
export default {
  name: 'FrontMarketing',
  components: {
    FrontCarousel,
    FrontTeacher,
    FrontDivider,
    FrontActiTricks,
    FrontSlogan,
    FrontLeaveMail
  }
}
</script>
