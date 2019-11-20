<template>
    <div>
       <nav class="navbar navbar-dark fixed-top bg-heylin flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-sm-3 col-md-2 mr-0"
               href="#">
               後台系統
            </a>
            <!-- <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"> -->
            <span class="navbar-brand col-sm-9 text-right">
                {{getuser.name}} , 您好!
            </span>
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <a class="nav-link"
                       href="#"
                      @click.prevent="signout">
                      登出
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
  name: 'BackNavbar',
  props: ['getuser'],
  data () {
    return {

    }
  },
  methods: {
    signout () {
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      const vm = this
      this.$http.post(api).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          vm.$router.push('/login')
        }
      })
    }
  }
}
</script>
