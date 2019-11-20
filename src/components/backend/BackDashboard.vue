<template>
<div>
    <BackNavbar :getuser="user"/>
    <Alert></Alert>
    <div class="container-fluid">
        <div class="row">
            <BackSidebar :getpermissionmodules="PermissionModules" />
            <main role="main"
                  class="col-md-9 ml-sm-auto col-lg-10 px-4">
                  <router-view>

                  </router-view>
            </main>
        </div>
    </div>
</div>
</template>
<script>
import BackNavbar from './BackNavbar'
import BackSidebar from './BackSidebar'
import Alert from '../tools/AlertMessage'
import BackUser from '../../json/backenduser.json'

export default {
  components: {
    BackNavbar,
    BackSidebar,
    Alert
  },
  data () {
    return {
      user: {},
      PermissionModules: {}
    }
  },
  methods: {
    getuser () {
      this.user = BackUser.data.user
      this.PermissionModules = BackUser.data
      // console.log('userdata : ',this.userdata);
    }
  },
  created () {
    this.getuser()
  }
}
</script>
