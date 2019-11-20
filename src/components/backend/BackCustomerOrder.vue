<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <Pagin @postPage="getProducts"
               :getpagin="pagination">
        </Pagin>
        <!--產品列表畫面-->
        <OrderCard @postPid="getProduct"
                   @postCartPid="addtoCart"
                   :getordercard="products">
        </OrderCard>
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
                                    <span>購買時數</span>
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
                                    <span>{{product.unit}}</span>
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
                                       v-if="product.id === status.loadingItem">
                                    </i>
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
        <Pagin @postPage="getProducts"
               :getpagin="pagination">
        </Pagin>
        <!--購物車-->
        <div class="my-5 row justify-content-center"
             v-if="cart.carts">
                <div class="col-md-6">
                    <table class="table">
                    <thead>
                        <th>

                        </th>
                        <th>
                            品名
                        </th>
                        <th>
                            數量
                        </th>
                        <th>
                            單價
                        </th>
                    </thead>
                    <tbody>
                        <tr v-for="item in cart.carts"
                           :key="item.id">
                            <td class="align-middle">
                                <button type="button"
                                        class="btn btn-outline-danger btn-sm"
                                       @click="removeCartItem(item.id)">
                                        <i class="far fa-trash-alt"></i>
                                </button>
                            </td>
                            <td class="align-middle">
                                {{ item.product.title }}
                                <div class="text-success"
                                    v-if="item.coupon">
                                    已套用優惠券
                                </div>
                            </td>
                            <td class="align-middle">
                                {{ item.qty }}/{{ item.product.unit }}
                            </td>
                            <td class="align-middle text-right">
                                {{ item.final_total }}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3"
                                class="text-right">
                                總計
                            </td>
                            <td class="text-right">
                                {{ cart.total }}
                            </td>
                        </tr>
                        <tr v-if="cart.final_total !== cart.total">
                            <td colspan="3"
                                class="text-right text-success">
                                折扣價
                            </td>
                            <td class="text-right text-success">
                                {{ cart.final_total }}
                            </td>
                        </tr>
                    </tfoot>
                    </table>
                    <div class="input-group mb-3 input-group-sm">
                        <input type="text"
                               class="form-control"
                               v-model="coupon_code"
                               placeholder="請輸入優惠碼">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary"
                                    type="button"
                                   @click="addCouponCode">
                                    套用優惠碼
                            </button>
                        </div>
                    </div>
                </div>
        </div>
        <!--購物車-->
        <!--結帳FORM-->
        <div class="my-5 row justify-content-center">
            <form class="col-md-6"
                 @submit.prevent="createOrder">
                <div class="form-group">
                    <label for="useremail">
                        Email
                    </label>
                    <input type="email"
                           class="form-control"
                           name="email"
                           id="useremail"
                           required
                           v-validate="'required|email'"
                          :class="{'is-invalid': errors.has('email')}"
                           v-model="form.user.email"
                           placeholder="請輸入 Email">
                    <span class="text-danger"
                          v-if="errors.has('email')">
                          {{ errors.first('email') }}
                    </span>
                </div>
                <div class="form-group">
                    <label for="username">
                        收件人姓名
                    </label>
                    <input type="text"
                           class="form-control"
                           name="name"
                           id="username"
                           required
                           :class="{'is-invalid': errors.has('name')}"
                           v-model="form.user.name"
                           v-validate="'required'"
                           placeholder="輸入姓名">
                    <span class="text-danger"
                          v-if="errors.has('name')">
                          姓名必須輸入
                    </span>
                </div>
                <div class="form-group">
                    <label for="usertel">
                        收件人電話
                    </label>
                    <input type="tel"
                           class="form-control"
                           id="usertel"
                           v-model="form.user.tel"
                           placeholder="請輸入電話">
                </div>

                <div class="form-group">
                    <label for="useraddress">
                        收件人地址
                    </label>
                    <input type="address"
                           class="form-control"
                           name="address"
                          :class="{'is-invalid': errors.has('address')}"
                           id="useraddress"
                           v-model="form.user.address"
                           v-validate="'required'"
                           placeholder="請輸入地址">
                    <span class="text-danger"
                          v-if="errors.has('address')">
                          地址欄位不得留空
                    </span>
                </div>

                <div class="form-group">
                    <label for="useraddress">
                        留言
                    </label>
                    <textarea name=""
                              id=""
                              class="form-control"
                              cols="30"
                              rows="10"
                              v-model="form.message">
                    </textarea>
                </div>
                <div class="text-right">
                    <button class="btn btn-danger">
                        送出訂單
                    </button>
                </div>
            </form>
        </div>
        <!--結帳FORM-->
    </div>
</template>

<script>
import $ from 'jquery'
import Pagin from '../tools/Pagin'
import OrderCard from '../tools/OrderCard'

export default {
  components: {
    Pagin, OrderCard
  },
  data () {
    return {
      /* 購買數量 */
      buynum: 1,
      /* 產品列表 */
      products: [],
      /* 單項產品資料 */
      product: {},
      /* 購物車 */
      cart: {},
      /* 分頁 */
      pagination: {},
      /* 付款人資訊 */
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
    getProducts (pagenum = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${pagenum}`
      const vm = this
      console.log(`${process.env.VUE_APP_APIPATH}`)
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        // console.log('=========');
        // console.log(response.data);
        // console.log('=========');
        vm.isLoading = false
        vm.products = response.data.products
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
      console.log('qty : ' + qty)
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
              vm.$router.push(`customercheckout/${response.data.orderId}`)
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

  },
  created () {
    this.getProducts()
    this.getCart()
    // 測試警告視窗
    // this.$bus.$emit('message:push','測試','success');
  }
}
</script>
