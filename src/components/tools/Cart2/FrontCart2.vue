<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <ImageWall>

        </ImageWall>
        <div class="wrap"
             style="padding: 5% 0;">
              <h1 class="projTitle">
                MyCART
                  <span>
                    -THE LESSONS
                  </span>
                我的購物車
              </h1>
              <div class="heading cf">
                  <h1>
                    結帳清單
                  </h1>
                  <router-link class="continue"
                               style="background: #bb8d66;"
                               to="/membercart" >
                              <span>
                                  繼續購買
                              </span>
                  </router-link>
              </div>
            <div class="cart">
                <ul class="cartWrap">
                    <li class="items"
                       :class="{'odd':index%2==0,'even':index%2==1}"
                        v-for="(item,index) in cart.carts"
                       :key="index">
                          <div class="infoWrap">
                                <div class="cartSection">
                                    <img :src="item.product.imageUrl"
                                          alt=""
                                          class="itemImg" />
                                    <p class="itemNumber">
                                      #{{item.id}}
                                    </p>
                                    <h3>
                                      {{ item.product.title }}
                                    </h3>
                                    <p>
                                      {{ item.qty }} / {{ item.product.unit }}
                                    </p>
                                    <p class="stockStatus"
                                       v-if="item.coupon">
                                       已套用優惠券
                                    </p>
                                </div>
                                <div class="prodTotal cartSection">
                                    <p>
                                      {{ item.final_total | currency }}
                                    </p>
                                </div>
                                <div class="cartSection removeWrap">
                                    <a href="#"
                                       class="remove"
                                       @click="removeCartItem(item.id)">
                                       x
                                    </a>
                                </div>
                          </div>
                    </li>
                </ul>
            </div>
            <div class="promoCode">
              <label for="promo">
                有優惠碼嗎 ?
              </label>
                <input type="text"
                       name="promo"
                       v-model="coupon_code"
                       placholder="請輸入優惠碼" />
                <a href="#"
                   class="btn"
                   style="background: #bb8d66;color:white;"
                  @click="addCouponCode">
                </a>
            </div>
            <div class="subtotal cf">
                <ul v-if="cart.final_total !== cart.total">
                    <li class="totalRow">
                        <span class="label">
                          折扣價
                        </span>
                        <span class="value">
                          ${{ cart.final_total }}
                        </span>
                    </li>
                    <li class="totalRow">
                        <span class="label">
                          稅金
                        </span>
                        <span class="value">
                          $0.00
                        </span>
                    </li>
                    <li class="totalRow final">
                        <span class="label">
                          總計
                        </span>
                        <span class="value">
                          {{ cart.final_total | currency }}
                        </span>
                    </li>
                </ul>
                <ul v-else>
                    <li class="totalRow">
                        <span class="label">
                          總價
                        </span>
                        <span class="value">
                          {{ cart.total | currency }}
                        </span>
                    </li>
                    <li class="totalRow">
                        <span class="label">
                          稅金
                        </span>
                        <span class="value">
                          $0.00
                        </span>
                    </li>
                    <li class="totalRow final">
                        <span class="label">
                          總計
                        </span>
                        <span class="value">
                          {{ cart.total | currency }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <!--結帳FORM-->
        <div class="container">
            <div class="my-5 row justify-content-center" >
                <form class="col-md-8"
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
                      <div class="text-right"
                          style="padding: 25px 0 0 0;">
                            <button class="btn btn-heylin">
                              送出訂單
                            </button>
                      </div>
                </form>
            </div>
        </div>
        <!--結帳FORM-->
    </div>
</template>

<script>
import ImageWall from '../../tools/ImageWall'

export default {
  components: {
    ImageWall
  },
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
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        // console.log('=========');
        // console.log(response.data);
        // console.log('=========');
        var maxcartcount = parseInt(`${process.env.MAXCAERCOUNT}`)
        // console.log('vm.maxcartcount : ',vm.maxcartcount);
        vm.cart = response.data.data
        this.$bus.$emit('carts:push', response.data.data, maxcartcount)
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

  },
  created () {
    this.getCart()
    // 測試警告視窗
    // this.$bus.$emit('message:push','測試','success');
  }
}

</script>
<style scoped>
    @import url(https://fonts.googleapis.com/css?family=Droid+Serif:400,400italic|Montserrat:400,700);

ol, ul {
  list-style: none;
}

caption, th, td {
  text-align: left;
  font-weight: normal;
  vertical-align: middle;
}

q, blockquote {
  quotes: none;
}
q:before, q:after, blockquote:before, blockquote:after {
  content: "";
  content: none;
}

a img {
  border: none;
}

article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
  display: block;
}

body {
  color: #333;
  -webkit-font-smoothing: antialiased;
  font-family: "Droid Serif", serif;
}

img {
  max-width: 100%;
}

.cf:before, .cf:after {
  content: " ";
  display: table;
}

.cf:after {
  clear: both;
}

.cf {
  *zoom: 1;
}

.wrap {
  max-width: 960px;
  margin: 0 auto;
  margin-bottom: 5em;
}

.projTitle {
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  text-align: center;
  font-size: 2em;
  padding: 1em 0;
  border-bottom: 1px solid #dadada;
  letter-spacing: 3px;
  text-transform: uppercase;
}
.projTitle span {
  font-family: "Droid Serif", serif;
  font-weight: normal;
  font-style: italic;
  text-transform: lowercase;
  color: #777;
}

.heading {
  padding: 1em 0;
  border-bottom: 1px solid #D0D0D0;
}
.heading h1 {
  font-family: "Droid Serif", serif;
  font-size: 2em;
  float: left;
}
.heading a.continue:link, .heading a.continue:visited {
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  letter-spacing: -.015em;
  font-size: .75em;
  padding: 1em;
  color: #fff;
  background: #82ca9c;
  font-weight: bold;
  border-radius: 50px;
  float: right;
  text-align: right;
  -webkit-transition: all 0.25s linear;
  -moz-transition: all 0.25s linear;
  -ms-transition: all 0.25s linear;
  -o-transition: all 0.25s linear;
  transition: all 0.25s linear;
}
.heading a.continue:after {
  content: "\276f";
  padding: .5em;
  position: relative;
  right: 0;
  -webkit-transition: all 0.15s linear;
  -moz-transition: all 0.15s linear;
  -ms-transition: all 0.15s linear;
  -o-transition: all 0.15s linear;
  transition: all 0.15s linear;
}
.heading a.continue:hover, .heading a.continue:focus, .heading a.continue:active {
  background: #f69679;
}
.heading a.continue:hover:after, .heading a.continue:focus:after, .heading a.continue:active:after {
  right: -10px;
}

.tableHead {
  display: table;
  width: 100%;
  font-family: "Montserrat", sans-serif;
  font-size: .75em;
}
.tableHead li {
  display: table-cell;
  padding: 1em 0;
  text-align: center;
}
.tableHead li.prodHeader {
  text-align: left;
}

.cart {
  padding: 1em 0;
}
.cart .items {
  display: block;
  width: 100%;
  vertical-align: middle;
  padding: 1.5em;
  border-bottom: 1px solid #fafafa;
}
.cart .items.even {
  background: #fafafa;
}
.cart .items .infoWrap {
  display: table;
  width: 100%;
}
.cart .items .cartSection {
  display: table-cell;
  vertical-align: middle;
}
.cart .items .cartSection .itemNumber {
  font-size: .75em;
  color: #777;
  margin-bottom: .5em;
}
.cart .items .cartSection h3 {
  font-size: 1em;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: .025em;
}
.cart .items .cartSection p {
  display: inline-block;
  font-size: .85em;
  color: #777777;
  font-family: "Montserrat", sans-serif;
}
.cart .items .cartSection p .quantity {
  font-weight: bold;
  color: #333;
}
.cart .items .cartSection p.stockStatus {
  color: #82CA9C;
  font-weight: bold;
  padding: .5em 0 0 1em;
  text-transform: uppercase;
}
.cart .items .cartSection p.stockStatus.out {
  color: #F69679;
}
.cart .items .cartSection .itemImg {
  width: 4em;
  float: left;
}
.cart .items .cartSection.qtyWrap, .cart .items .cartSection.prodTotal {
  text-align: center;
}
.cart .items .cartSection.qtyWrap p, .cart .items .cartSection.prodTotal p {
  font-weight: bold;
  font-size: 1.25em;
}
.cart .items .cartSection input.qty {
  width: 2em;
  text-align: center;
  font-size: 1em;
  padding: .25em;
  margin: 1em .5em 0 0;
}
.cart .items .cartSection .itemImg {
  width: 8em;
  display: inline;
  padding-right: 1em;
}

.special {
  display: block;
  font-family: "Montserrat", sans-serif;
}
.special .specialContent {
  padding: 1em 1em 0;
  display: block;
  margin-top: .5em;
  border-top: 1px solid #dadada;
}
.special .specialContent:before {
  content: "\21b3";
  font-size: 1.5em;
  margin-right: 1em;
  color: #6f6f6f;
  font-family: helvetica, arial, sans-serif;
}

a.remove {
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  color: #ffffff;
  font-weight: bold;
  background: #e0e0e0;
  padding: .5em;
  font-size: .75em;
  display: inline-block;
  border-radius: 100%;
  line-height: .85;
  -webkit-transition: all 0.25s linear;
  -moz-transition: all 0.25s linear;
  -ms-transition: all 0.25s linear;
  -o-transition: all 0.25s linear;
  transition: all 0.25s linear;
}
a.remove:hover {
  background: #f30;
}

.promoCode {
  border: 2px solid #efefef;
  float: left;
  width: 35%;
  padding: 2%;
}
.promoCode label {
  display: block;
  width: 100%;
  font-style: italic;
  font-size: 1.15em;
  margin-bottom: .5em;
  letter-spacing: -.025em;
}
.promoCode input {
  width: 85%;
  font-size: 1em;
  padding: .5em;
  float: left;
  border: 1px solid #dadada;
}
.promoCode input:active, .promoCode input:focus {
  outline: 0;
}
.promoCode a.btn {
  float: left;
  width: 15%;
  padding: .75em 0;
  border-radius: 0 1em 1em 0;
  text-align: center;
  border: 1px solid #bb8d66;
}
.promoCode a.btn:hover {
  border: 1px solid #f69679;
  background: #f69679;
}

.submitbtn:link, .submitbtn:visited {
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  letter-spacing: -.015em;
  font-size: 1em;
  padding: 1em 3em;
  color: #fff;
  background: #82ca9c;
  font-weight: bold;
  border-radius: 50px;
  float: right;
  text-align: right;
  -webkit-transition: all 0.25s linear;
  -moz-transition: all 0.25s linear;
  -ms-transition: all 0.25s linear;
  -o-transition: all 0.25s linear;
  transition: all 0.25s linear;
}
.btn:after {
  content: "\276f";
  padding: .5em;
  position: relative;
  right: 0;
  -webkit-transition: all 0.15s linear;
  -moz-transition: all 0.15s linear;
  -ms-transition: all 0.15s linear;
  -o-transition: all 0.15s linear;
  transition: all 0.15s linear;
}
.btn:hover, .btn:focus, .btn:active {
  background: #f69679;
}
.btn:hover:after, .btn:focus:after, .btn:active:after {
  right: -10px;
}
.promoCode .btn {
  font-size: .85em;
  paddding: .5em 2em;
}

/* TOTAL AND CHECKOUT  */
.subtotal {
  float: right;
  width: 35%;
}
.subtotal .totalRow {
  padding: .5em;
  text-align: right;
}
.subtotal .totalRow.final {
  font-size: 1.25em;
  font-weight: bold;
}
.subtotal .totalRow span {
  display: inline-block;
  padding: 0 0 0 1em;
  text-align: right;
}
.subtotal .totalRow .label {
  font-family: "Montserrat", sans-serif;
  font-size: .85em;
  text-transform: uppercase;
  color: #777;
}
.subtotal .totalRow .value {
  letter-spacing: -.025em;
  width: 35%;
}

@media only screen and (max-width: 39.375em) {
  .wrap {
    width: 98%;
    padding: 2% 0;
  }

  .projTitle {
    font-size: 1.5em;
    padding: 10% 5%;
  }

  .heading {
    padding: 1em;
    font-size: 90%;
  }

  .cart .items .cartSection {
    width: 90%;
    display: block;
    float: left;
  }
  .cart .items .cartSection.qtyWrap {
    width: 10%;
    text-align: center;
    padding: .5em 0;
    float: right;
  }
  .cart .items .cartSection.qtyWrap:before {
    content: "QTY";
    display: block;
    font-family: "Montserrat", sans-serif;
    padding: .25em;
    font-size: .75em;
  }
  .cart .items .cartSection.prodTotal, .cart .items .cartSection.removeWrap {
    /* display: none; */
    text-align: center;
  }
  .cart .items .cartSection .itemImg {
    width: 25%;
  }

  .promoCode, .subtotal {
    width: 100%;
  }

  a.btn.continue {
    width: 100%;
    text-align: center;
  }
}
</style>
