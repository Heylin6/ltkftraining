<template>
    <div class="container">
        <loading :active.sync="isLoading"></loading>
            <hr class="featurette-divider">
            <div class="row">
                <div class="col-md-6 col-12">
                    <img class="card-img-top"
                        :src="product.imageUrl"
                        :alt="product.id">
                </div>
                <div class="col-md-6 col-12">
                    <div class="card-body">
                        <p class="h2 card-title">
                            {{product.title}}
                        </p>
                        <p class="card-text my-4">
                            <span class="text-secondary d-block pt-3 pb-2">
                                課程說明
                            </span>
                            {{product.description}}
                        </p>
                        <form>
                            <div class="form-group">
                                <label for="lessonAmount"
                                       class="text-secondary">
                                        購賣單位
                                </label>
                                <input type="number"
                                       class="form-control"
                                       id="buynum"
                                       v-model.number="buynum"
                                      :min="1"
                                       placeholder="請輸入購買時數">
                            </div>
                        </form>
                        <div class="row no-gutters mt-3">
                            <div class="col-6 d-flex my-4">
                                <span class="h5 align-self-center">
                                    總計 {{ buynum * product.price | currency }}
                                </span>
                            </div>
                            <div class="col-6 text-right my-4">
                                 <span class="messagealert">
                                     {{message}}
                                 </span>
                                 <button type="button"
                                         class="btn btn-heylin"
                                        @click.prevent="addtoCart(product.id, buynum)">
                                        <i class="fas fa-spinner fa-spin"
                                           v-if="product.id === status.loadingItem"></i>
                                           加到購物車
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="featurette-divider">
            <div class="row">
                    <div class="col-md-12">
                        <div class="pd-wrapper d-flex justify-content-center">
                            <div class="pd-instruction mb-2 pb-2">
                                    <h2 class="pd-instruction-title">【課程說明】</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2"></div>
                    <div class="col-md-8">
                            <div class="pd-wrapper d-flex justify-content-center">
                                <div>
                                    <p class="contentfont">
                                        {{product.content}}
                                    </p>
                                </div>
                            </div>
                    </div>
                    <div class="col-md-2"></div>
            </div>
            <hr class="featurette-divider">
            <div class="row">
                <div class="col-md-12">
                        <div class="pd-wrapper d-flex justify-content-center">
                            <div class="pd-instruction mb-2 pb-2">
                                    <h2 class="pd-instruction-title">
                                        【內容描述】
                                    </h2>
                            </div>
                        </div>
                </div>
                <div class="col-md-3"></div>
                <div class="col-md-6">
                        <div class="pd-wrapper d-flex justify-content-center">
                            <div>
                                <p class="contentfont">
                                    {{product.description}}
                                </p>
                            </div>
                        </div>
                </div>
                <div class="col-md-3"></div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <hr class="featurette-divider">
                    <CartConfirm></CartConfirm>
                </div>
            </div>
    </div>
</template>
<script>
import CartConfirm from '../../tools/CartConfirm'

export default {
  components: {
    CartConfirm
  },
  data () {
    return {
      // 購買數量
      buynum: 1,
      productId: '',
      product: [],
      status: {},
      message: '',
      // 是否讀取中
      isLoading: false
    }
  },
  methods: {
    getProduct (pid) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${pid}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        // console.log('=========');
        // console.log(response.data);
        // console.log('=========');
        vm.isLoading = false
        vm.message = ''
        vm.product = response.data.product
        // console.log(vm.product);
      })
    },
    addtoCart (pid, qty = 1) {
      if (qty <= 0) {
        this.$bus.$emit('message:push', '數量錯誤,不得為零或負數', 'danger')
      } else {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
        const vm = this
        vm.isLoading = true
        const cart = { product_id: pid, qty }
        this.$http.post(api, { data: cart }).then((response) => {
          // console.log('=========');
          // console.log(response.data);
          // console.log('=========');
          vm.buynum = 1
          vm.isLoading = false
          vm.message = '已加到購物車!'
          // vm.$router.push('/fcart');
        })
      }
    }
  },
  created () {
    this.productId = this.$route.params.productid
    // console.log('this.productId : ',this.productId);
    this.getProduct(this.productId)
  }
}
</script>
<style scoped>
    .contentfont{
        font-size: 36px;
    }
    .messagealert{
        color: red;
        padding: 4.5%;
    }
</style>
