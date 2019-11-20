<template>
    <div>
         <nav class="col-md-2 d-none d-md-block bg-light sidebar">
              <div class="sidebar-sticky">
                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>
                    管理者
                  </span>
                  <a href="#"
                     class="d-flex align-items-center text-muted">
                    <span data-feather="plus-circle"></span>
                  </a>
                </h6>
                <ul class="nav flex-column">
                  <li v-for="(item) in getpermissionmodules.modules"
                      :key="item.id"
                      class="nav-item">
                      <a class="nav-link active" href="#">
                        <router-link
                            class="nav-link"
                          :to="item.url" >
                            <i :class="item.icon"></i>
                            <span data-feather="file-text"></span>
                              {{item.name}}
                        </router-link>
                      </a>
                  </li>
                </ul>
                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>模擬功能</span>
                  <a href="#"
                     class="d-flex align-items-center text-muted">
                     <span data-feather="plus-circle"></span>
                  </a>
                </h6>
                <ul class="nav flex-column mb-2">
                  <li v-for="(item) in getpermissionmodules.simulations"
                      :key="item.id"
                      class="nav-item">
                      <a class="nav-link" href="#">
                        <router-link
                            class="nav-link"
                          :to="item.url">
                            <i :class="item.icon"></i>
                            <span data-feather="file-text"></span>
                            {{item.name}}
                        </router-link>
                      </a>
                  </li>
                </ul>
              </div>
          </nav>
    </div>
</template>
<script>
export default {
  name: 'BackSidebar',
  props: ['getpermissionmodules'],
  data () {
    return {

    }
  }
}
</script>
