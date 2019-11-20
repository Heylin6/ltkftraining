<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right">
            <button class="btn btn-success mt-4"
                   @click="openModal(true)">
                建立新的優惠
            </button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th>名稱</th>
                    <th class="text-right">
                        折扣百分比
                    </th>
                    <th>到期日</th>
                    <th>是否啟用</th>
                    <th>功能</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in coupons"
                   :key="item.id">
                    <td>
                        {{ item.title }}
                    </td>
                    <td class="text-right">
                        {{ item.percent }}
                    </td>
                    <td>
                        {{ item.due_date }}
                    </td>
                    <td>
                        <span v-if="item.is_enabled === 1"
                              class="text-success">
                              啟用
                        </span>
                        <span v-else
                              class="text-muted">
                              未啟用
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm"
                               @click="openModal(false,item)">
                               編輯
                        </button>
                        <!-- <button class="btn btn-outline-danger btn-sm" @click="deleteCoupons(item)">刪除</button> -->
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagin @postPage="getCoupons"
               :getpagin="pagination">
        </Pagin>
        <!-- couponModal -->
        <div class="modal fade"
             id="couponModal"
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
                                Modal title
                            </h5>
                            <button type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-4">
                                </div>
                                <div class="col-sm-8">
                                            <div class="form-group">
                                                    <label for="title">
                                                        標題
                                                    </label>
                                                    <input type="text"
                                                           class="form-control"
                                                           id="title"
                                                           v-model="tempCoupon.title"
                                                           placeholder="請輸入標題">
                                            </div>
                                            <div class="form-group">
                                                    <label for="coupon_code">
                                                        優惠碼
                                                    </label>
                                                    <input type="text"
                                                           class="form-control"
                                                           id="coupon_code"
                                                           v-model="tempCoupon.code"
                                                           placeholder="請輸入優惠碼">
                                            </div>
                                            <div class="form-group">
                                                    <label for="due_date">
                                                        到期日
                                                    </label>
                                                    <input type="date"
                                                           class="form-control"
                                                           id="due_date"
                                                           v-model="tempCoupon.due_date">
                                            </div>
                                            <div class="form-group">
                                                    <label for="price">
                                                        折扣百分比
                                                    </label>
                                                    <input type="number"
                                                           class="form-control"
                                                           id="price"
                                                           min="1"
                                                           v-model="tempCoupon.percent"
                                                           placeholder="請輸入折扣百分比">
                                            </div>
                                            <hr>
                                            <div class="form-group">
                                                <div class="form-check">
                                                    <input class="form-check-input"
                                                           type="checkbox"
                                                          :true-value="1"
                                                          :false-value="0"
                                                           v-model="tempCoupon.is_enabled"
                                                           id="is_enabled">
                                                    <label class="form-check-label"
                                                           for="is_enabled">
                                                           是否啟用
                                                    </label>
                                                </div>
                                            </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button"
                                   class="btn btn-primary"
                                  @click="updateCoupon">
                                    Save changes
                            </button>
                            <button type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal">
                                    Close
                            </button>
                        </div>
                    </div>
                </div>
        </div>
        <!-- couponModal -->
    </div>
</template>

<script>
import $ from 'jquery'
import Pagin from '../tools/Pagin'

export default {
  components: {
    Pagin
  },
  data () {
    return {
      coupons: [],
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: ''
      },
      pagination: {},
      isNew: false,
      isLoading: false
    }
  },
  methods: {
    getCoupons () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons`
      const vm = this

      vm.isLoading = true
      this.$http.get(api).then((response) => {
        // console.log('=========');
        // console.log(response.data);
        // console.log('=========');
        vm.isLoading = false
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
      })
    },
    openModal (isNew, item) {
      // 用vue的方式開啟modal
      // 傳入參數判斷新增還是修改
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
      } else {
        // Object.assign這寫法要估狗一下
        this.tempCoupon = Object.assign({}, item)
        this.isNew = false
      }
      $('#couponModal').modal('show')
    },
    updateCoupon () {
      const vm = this
      if (vm.isNew) {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`
        this.$http.post(url, { data: vm.tempCoupon }).then((response) => {
          // console.log(response, vm.tempCoupon);
          $('#couponModal').modal('hide')
          this.getCoupons()
        })
      } else {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        vm.due_date = new Date(vm.tempCoupon.due_date * 1000)
        this.$http.put(url, { data: vm.tempCoupon }).then((response) => {
          // console.log(response);
          $('#couponModal').modal('hide')
          this.getCoupons()
        })
      }
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
