<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <!--購物車 vif -->
        <div class="my-5 row justify-content-center" v-if="cart.carts">
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
                        <th class="text-right">
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
                            <td colspan="3" class="text-right">
                                <h2>
                                    總計
                                </h2>
                            </td>
                            <td class="text-right">
                                <h2>
                                    {{ cart.total }}
                                </h2>
                            </td>
                        </tr>
                        <tr v-if="cart.final_total !== cart.total">
                            <td colspan="3"
                                class="text-right text-success">
                                <h2>
                                    折扣價
                                </h2>
                            </td>
                            <td class="text-right text-success">
                                <h2>
                                    {{ cart.final_total }}
                                </h2>
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
        <!--購物車 vif -->
        <!--購物車 else -->
        <div class="my-5 row justify-content-center" v-else>
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
                        :key="item.id" >
                                <td colspan="4">
                                </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                                <td colspan="3"
                                    class="text-right">
                                    總計
                                </td>
                                <td class="text-right"></td>
                        </tr>
                        <tr v-if="cart.final_total !== cart.total">
                                <td colspan="3"
                                    class="text-right text-success">
                                    折扣價
                                </td>
                                <td class="text-right text-success">
                                </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <!--購物車 else -->
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
export default {
  data () {
    return {
      // 購物車
      cart: {},
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
    getCart () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
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
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${pid}`
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
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
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
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
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

  },
  created () {
    this.getCart()
  }
}

</script>
