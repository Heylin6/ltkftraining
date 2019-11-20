<template>
    <div class="container">
        <loading :active.sync="isLoading"></loading>
        <ImageWallSpace></ImageWallSpace>
        <!--產品類別畫面-->
        <OrderItems v-model="filterStr"
                   :getproductitem="productitem"
                   :getfilter="filterStr"
                   @filterChange="setfilterStr">
        </OrderItems>
        <!--產品類別畫面-->
        <!--產品列表畫面-->
        <OrderCard2 @postPid="getProduct"
                    @postCartPid="addtoCart"
                    :getordercard="productinit">
        </OrderCard2>
        <!--產品列表畫面-->
        <!--產品內容畫面-->
         <div class="modal fade"
              id="productModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true">
                <div class="modal-dialog"
                     role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"
                                id="exampleModalLabel">
                                {{ product.title }}
                            </h5>
                            <button type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    @click="closeModal()">
                                    <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div style="height: 390px; background-size: cover; background-position: center"
                                :style="{backgroundImage:`url(${product.imageUrl})`}">
                            </div>
                            <hr>
                            <div>
                                <div class="col-md-12">
                                    {{product.description}}
                                </div>
                            </div>
                            <hr>
                            <div>
                                <div class="col-md-12">
                                    {{product.content}}
                                </div>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <div class="h4"
                                     v-if="!product.price">
                                     {{ product.origin_price }} 元
                                </div>
                                <del class="h6"
                                     v-if="product.price">
                                     原價 {{ product.origin_price }} 元
                                </del>
                                <div class="h4"
                                     v-if="product.price">
                                     現在只要 {{ product.price }} 元
                                </div>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <div class="col-md-4">
                                </div>
                                <div class="col-md-3">
                                    <span>
                                        購買時數
                                    </span>
                                </div>
                                <div class="col-md-3">
                                <input type="number"
                                       class="form-control"
                                       id="buynum"
                                       v-model.number="buynum"
                                       :min="1"
                                       placeholder="請輸入購買時數">
                                </div>
                                <div class="col-md-2">
                                    <span>
                                        {{product.unit}}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="text-muted text-nowrap mr-3">
                                小計
                                    <strong>
                                        {{ buynum * product.price }}
                                    </strong>
                                元
                            </div>
                            <button type="button"
                                    class="btn btn-primary"
                                   @click.prevent="addtoCart(product.id, buynum)">
                                    <i class="fas fa-spinner fa-spin"
                                       v-if="product.id === status.loadingItem"></i>
                                    加到購物車
                            </button>
                            <button type="button"
                                    class="btn btn-secondary"
                                    @click.prevent="closeModal()">
                                    關閉
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        <!--產品內容畫面-->
        <div class="d-flex justify-content-center">
            <Pagin @postPage="getProducts"
                   :getpagin="pagination">
            </Pagin>
        </div>
        <hr class="featurette-divider">
        <CartConfirm></CartConfirm>
    </div>
</template>

<script>
import $ from 'jquery'
import Pagin from '../../tools/Pagin'
import OrderCard2 from '../../tools/OrderCard2/OrderCard2'
import OrderItems from '../../tools/Items'
import _productitem from '../../../json/productsitem.json'
import ImageWallSpace from '../../tools/ImageWallSpace'
import CartConfirm from '../../tools/CartConfirm'

export default {
  components: {
    Pagin,
    OrderCard2,
    OrderItems,
    ImageWallSpace,
    CartConfirm
  },
  data () {
    return {
      // 購買數量
      buynum: 1,
      // 搜尋字串
      filterStr: 'all',
      // 暫存產品列表
      tempproducts: [],
      // 所有產品列表
      allproducts: [],
      // 產品列表
      products: [],
      // 單項產品資料
      product: {},
      // 單項產品類別
      productitem: {},
      // 購物車
      cart: {},
      // 分頁
      pagination: {},
      // 付款人資訊
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      // 是否讀取中
      isLoading: false,
      status: {},
      coupon_code: ''
    }
  },
  methods: {
    setfilterStr (item) {
      const vm = this
      vm.filterStr = item.code
      // console.log('out item',item);
    },
    getProductItem () {
      // 未來後端可抓取商品類別時
      // 可用這段進行Api的抓取
      this.productitem = _productitem.data.productitem
      // console.log(this.productitem);
    },
    getAllProducts () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        // console.log('=========');
        // console.log(response.data);
        // console.log('=========');
        vm.allproducts = response.data.products
      })
      vm.isLoading = false
    },
    getProducts (pagenum = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/products/?page=${pagenum}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        // console.log('=========');
        // console.log(response.data);
        // console.log('=========');
        vm.isLoading = false
        vm.products = response.data.products
        vm.tempproducts = response.data.products
        vm.pagination = response.data.pagination
      })
    },
    getProduct (pid) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/product/${pid}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        // console.log('=========');
        // console.log(response.data);
        // console.log('=========');
        $('#productModal').modal('show')
        vm.isLoading = false
        vm.product = response.data.product
      })
    },
    closeModal () {
      const vm = this
      vm.buynum = 1
      $('#productModal').modal('hide')
    },
    addtoCart (pid, qty = 1) {
      if (qty <= 0) {
        this.$bus.$emit('message:push', '數量錯誤,不得為零或負數', 'danger')
      } else {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/cart`
        const vm = this
        vm.isLoading = true
        const cart = { product_id: pid, qty }
        this.$http.post(api, { data: cart }).then((response) => {
          // console.log('=========');
          // console.log(response.data);
          // console.log('=========');
          vm.buynum = 1
          vm.getCart()
          $('#productModal').modal('hide')
          vm.isLoading = false
        })
      }
    },
    getCart () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        // console.log('=========');
        // console.log(response.data);
        // console.log('=========');
        vm.cart = response.data.data
        vm.isLoading = false
      })
    },
    removeCartItem (pid) {
      var del = confirm('確定刪除該項目?')
      if (del) {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/cart/${pid}`
        const vm = this
        vm.isLoading = true
        this.$http.delete(api).then((response) => {
          // console.log('=========');
          // console.log(response.data);
          // console.log('=========');
          // 刪除完畢後重整購物車
          vm.getCart()
          vm.isLoading = false
        })
      } else {

      }
    },
    addCouponCode () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/coupon`
      const vm = this
      const coupon = {
        code: vm.coupon_code
      }
      vm.isLoading = true
      this.$http.post(api, { data: coupon }).then((response) => {
        // console.log('=========');
        // console.log(response.data);
        // console.log('=========');
        // 刪除完畢後重整購物車
        vm.getCart()
        vm.isLoading = false
      })
    },
    createOrder () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/order`
      const vm = this
      const form = vm.form
      this.$validator.validate().then((result) => {
        if (result) {
          vm.isLoading = true
          this.$http.post(api, { data: form }).then((response) => {
            // console.log('=========');
            // console.log('訂單已建立',response);
            // console.log('=========');
            if (response.data.success) {
              vm.$router.push(`membercheckout/${response.data.orderId}`)
            }
            // 刪除完畢後重整購物車
            vm.getCart()
            vm.isLoading = false
          })
        } else {
          console.log('欄位不完整')
        }
      })
    }
  },
  computed: {
    productinit () {
      const vm = this
      if (vm.filterStr === 'all') {
        // console.log('vm.filterStr',vm.filterStr);
        vm.tempproducts = vm.products
        $('.pagination').show()
        return vm.tempproducts
      } else {
        // console.log('vm.filterStr',vm.filterStr);
        // 正常來說頁數跟資料要在後端做篩選
        // 但本範例專案無法對 pagination 做修正
        // 故改用分類搜尋時分頁隱藏
        // vm.getAllProducts();
        vm.tempproducts = vm.allproducts
        $('.pagination').hide()
        return vm.tempproducts.filter(item => item.category === vm.filterStr)
      }
    }
  },
  created () {
    this.getProductItem()
    this.getProducts()
    this.getAllProducts()
    this.getCart()
  }
}
</script>
