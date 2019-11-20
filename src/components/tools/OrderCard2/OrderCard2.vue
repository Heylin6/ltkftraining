<template>
    <div class="container">
         <div class="row mt-4 productpadding">
            <a href="#"
               class="cardpadding"
               v-for="(item) in getordercard"
               :key="item.id">
                <router-link :to="'/product/'+item.id" >
                    <figure :style="{backgroundImage:`url(${item.imageUrl})`}">
                        <div class="date">
                            <span class="card-date-day">
                                現在只要 {{ item.price | currency }} 元
                            </span>
                            <span class="card-date-month">
                                原價 {{ item.origin_price | currency }} 元
                            </span>
                        </div>
                        <figcaption>
                             <h4>
                                 <span>
                                     {{ item.title }}
                                 </span>
                             </h4>
                        </figcaption>
                    </figure>
                </router-link>
            </a>
        </div>
    </div>
</template>
<script>
export default {
  name: 'OrderCard2',
  // 從老爸傳來的資料
  // 老爸那邊 :getordercard='getProducts'
  // 所以整包資料在這邊變成getordercard
  props: ['getordercard', 'getproductitem'],
  data () {
    return {
      // 購買數量
      buynum: 1,
      // 產品列表
      products: [],
      // 單項產品資料
      product: {},
      // 購物車
      cart: {},
      // 是否讀取中
      isLoading: false,
      status: {},
      coupon_code: ''
    }
  },
  methods: {
    addtoCart (pid) {
      // 丟資料回給老爸
      // 給老爸時的名稱叫postCartPid
      this.$emit('postCartPid', pid)
    }
  },
  computed: {

  }
}
</script>
