<template>
    <div>
       <nav class="navbar navbar-expand-md navbar-dark bg-heylin">
            <a class="navbar-brand"
               href="#">
               ♣︎ L.T.K.F
            </a>
            <button class="navbar-toggler collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbarCollapse collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item"
                   :class="{'active':getnavbaractive===''}">
                    <router-link
                      @click.native="setnavbaractiveStr('')"
                      class="nav-link"
                      to="/">
                          首頁
                    </router-link>
                </li>
                <!-- <li class="nav-item">
                  <router-link class="nav-link" to="/" >
                         陣容師資
                  </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/" >
                          提供內容
                    </router-link>
                </li>
                -->
                <li class="nav-item"
                   :class="{'active':getnavbaractive==='membercart'}">
                    <router-link
                      @click.native="setnavbaractiveStr('membercart')"
                      class="nav-link"
                      to="/membercart">
                          項目購買
                    </router-link>
                </li>
                <li class="nav-item"
                   :class="{'active':getnavbaractive==='contactus'}">
                    <router-link
                      @click.native="setnavbaractiveStr('contactus')"
                      class="nav-link"
                      to="/contactus">
                          聯絡我們
                    </router-link>
                </li>
                <li class="nav-item"
                   :class="{'active':getnavbaractive==='calendar'}">
                    <router-link
                      @click.native="setnavbaractiveStr('calendar')"
                      class="nav-link"
                      to="/calendar" >
                          行事曆
                    </router-link>
                </li>
                <li class="nav-item"
                   :class="{'active':getnavbaractive==='fcart'}">
                   <a class="nav-link"
                     @click="setnavbaractiveStr('fcart');opennav=!opennav;"
                      href="#">

                    <!-- <router-link
                      @click.native="setnavbaractiveStr('fcart')"
                       class="nav-link"
                       to="/fcart" >  -->
                        <div class="dropdown">
                              <i class="fas fa-cart-arrow-down"></i>
                              <div class="shopping-cart active dropdown-content"
                                   style="transition-delay: 50ms;"
                                  :class="{'dropdownOpen' : opennav}">
                                    <div class="shopping-cart-header">
                                        <i class="fa fa-shopping-cart cart-icon"></i>
                                        <span class="badge">
                                            {{ cartlength }}
                                        </span>
                                        <div class="shopping-cart-total"
                                            v-if="cart.final_total !== cart.total">
                                              <span class="lighter-text">
                                                優惠價 :
                                              </span>
                                              <span class="main-color-text total">
                                                $ {{ cart.final_total }}
                                              </span>
                                        </div>
                                        <div class="shopping-cart-total"
                                            v-else>
                                            <span class="lighter-text">
                                                總價 :
                                            </span>
                                            <span class="main-color-text total">
                                                $ {{ cart.total }}
                                            </span>
                                        </div>
                                    </div>
                                    <ul class="shopping-cart-items">
                                        <li class="clearfix"
                                            v-for="(item,index) in reverscarts"
                                           :key="index">
                                                <img :src="item.product.imageUrl"
                                                    :alt="item.product.title">
                                                <span class="item-name">
                                                    {{ item.product.title }}
                                                </span>
                                                <span class="item-detail">

                                                </span>
                                                <span class="item-price">
                                                    ${{ item.final_total }}
                                                </span>
                                                <span class="item-quantity">
                                                    Quantity: {{ item.qty }}
                                                </span>
                                                <hr>
                                        </li>
                                    </ul>
                                    <div v-if="cartlength > maxcartcount">
                                        等其他 {{ cartlength - maxcartcount }} 件 (列表顯示最新{{maxcartcount}}件)
                                    </div>
                                    <hr>
                                    <div>
                                        <router-link class="col-md-12 btn btn-heylin"
                                                     to="/fcart">
                                                     檢視購物車
                                        </router-link>
                                    </div>
                              </div>
                        </div>
                        </a>
                    <!-- </router-link> -->
                </li>
            </ul>
            <!--
              <form class="form-inline mt-2 mt-md-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            -->
            </div>
        </nav>
    </div>
</template>
<script>
export default {
  props: ['getnavbaractive'],
  name: 'FrontHeader',
  data () {
    return {
      // 最大購物車顯示量
      maxcartcount: 3,
      // 扣除最大量後剩餘
      remaincount: 0,
      // 購物車
      cart: {},
      reverscarts: {},
      cartlength: 0,
      opennav: false
    }
  },
  methods: {
    setnavbaractiveStr (item) {
      // console.log('out item',item);
      this.$emit('navbaractiveChange', item)
    },
    getCart () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      console.log('api:', api)
      const vm = this
      vm.maxcartcount = parseInt(`${process.env.VUE_APP_MAXCAERCOUNT}`)
      // console.log('vm.maxcartcount : ',vm.maxcartcount);

      this.$http.get(api).then((response) => {
        vm.cart = response.data.data
        vm.cartlength = response.data.data.carts.length
        if (vm.cartlength > vm.maxcartcount && vm.maxcartcount > 1) {
          vm.reverscarts = response.data.data.carts.slice().reverse().slice(0, vm.maxcartcount)
        } else {
          vm.reverscarts = response.data.data.carts.slice().reverse()
        }
        // console.log(response.data.data);
        // console.log('cartlength',response.data.data.carts.length);
        // console.log('cartlength',vm.cartlength);
      })
    },
    updateCarts (data, maxcartcount) {
      // console.log('updateCarts : ',data);
      const vm = this
      vm.cart = data
      vm.cartlength = data.carts.length
      if (vm.cartlength > maxcartcount && maxcartcount > 1) {
        // console.log('maxcartcount',maxcartcount);
        vm.reverscarts = data.carts.slice().reverse().slice(0, maxcartcount)
        // console.log('vm.reverscarts1',vm.reverscarts);
      } else {
        vm.reverscarts = data.carts.slice().reverse()
      }
    }
  },
  computed: {

  },
  created () {
    const vm = this
    vm.getCart()
    vm.$bus.$on('carts:push', (data, maxcartcount) => {
      vm.updateCarts(data, maxcartcount)
    })
  },
  updated () {

  }
}
</script>
<style scoped>
  .navbarCollapse > ul > li > a > a {
    color:white;
  }

  .active{
    font-weight: 900;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
    margin: 12px 0 0 0px;
    color:black;

    transform: translateY(-2em);
    transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;
  }

  .dropdownOpen {
    display: block;
    transition: all .5s ease;
    -webkit-transition: all .5s ease;
    background-color: #f5f4f4;
    z-index: 1000;

    transform: translateY(0%);
    transition-delay: 0s, 0s, 0.3s;
  }

  /* .dropdown:hover .dropdown-content {
    display: block;
    transition: all .2s ease;
    -webkit-transition: all .2s ease;
    background-color: #f5f4f4;
  } */

  .shopping-cart .shopping-cart-items img {
      float: left;
      margin-right: 12px;
      max-width: 70px;
      max-height: 70px;
  }
  ul {
    list-style: none;
  }
</style>
