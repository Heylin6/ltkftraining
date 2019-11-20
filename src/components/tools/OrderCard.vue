<template>
<div>
    <div class="tab-content">
        <div class="row mt-4">
            <div class="col-md-4 mb-4"
                 v-for="(item) in getordercard"
                :key="item.id">
                <div class="card border-0 shadow-sm">
                    <div style="height: 150px; background-size: cover; background-position: center"
                        :style="{backgroundImage:`url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
                        <span class="badge badge-secondary float-right ml-2">
                            {{ item.category }}
                        </span>
                        <h5 class="card-title">
                            <a href="#"
                               class="text-dark">
                               {{ item.title }}
                            </a>
                        </h5>
                        <p class="card-text">
                            {{ item.description }}
                        </p>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <del class="h6">
                                原價 {{ item.origin_price | currency }} 元
                            </del>
                            <div class="h5">
                                現在只要 {{ item.price | currency }} 元
                            </div>
                        </div>
                    </div>
                    <div class="card-footer d-flex">
                        <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                               @click="getProduct(item.id)">
                                <i class="fas fa-arrow-down"></i>
                                查看更多
                        </button>
                        <button type="button"
                                class="btn btn-outline-danger btn-sm ml-auto"
                               @click="addtoCart(item.id)">
                                <i class="fas fa-shopping-cart"></i>
                                加到購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'OrderCard',
  // 從老爸傳來的資料
  // 老爸那邊 :getordercard='getProducts'
  // 所以整包資料在這邊變成getordercard
  props: ['getordercard'],
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
    getProduct (pid) {
      // 丟資料回給老爸
      // 給老爸時的名稱叫postPid
      this.$emit('postPid', pid)
    },
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
