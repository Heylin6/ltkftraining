<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right">
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th @click="mode='create_at',mode_sec='',isReverse=!isReverse">
                        購買時間
                        <span class="icon isReverse"
                             :class="{'inverse' : isReverse}"
                              v-if="mode === 'create_at'">
                             <i class="fas fa-angle-up text-success"></i>
                        </span>
                    </th>
                    <th @click="mode='user',mode_sec='name',isReverse=!isReverse">
                        聯絡人
                        <span class="icon isReverse"
                             :class="{'inverse' : isReverse}"
                              v-if="mode === 'user' && mode_sec==='name'">
                             <i class=" fas fa-angle-up text-success"></i>
                        </span>
                    </th>
                    <th @click="mode='user',mode_sec='email',isReverse=!isReverse">
                        E-Mail
                        <span class="icon isReverse"
                             :class="{'inverse' : isReverse}"
                              v-if="mode === 'user' && mode_sec==='email'">
                             <i class=" fas fa-angle-up text-success"></i>
                        </span>
                    </th>
                    <th>
                        購買款項
                    </th>
                    <th @click="mode='total',mode_sec='',isReverse=!isReverse">
                        結帳金額
                        <span class="icon isReverse"
                                :class="{'inverse' : isReverse}"
                                v-if="mode === 'total'">
                             <i class=" fas fa-angle-up text-success"></i>
                        </span>
                    </th>
                    <th>
                        買家訊息
                    </th>
                    <th @click="mode='is_paid',mode_sec='',isReverse=!isReverse">
                        是否付款
                        <span class="icon isReverse"
                             :class="{'inverse' : isReverse}"
                              v-if="mode === 'is_paid'">
                            <i class=" fas fa-angle-up text-success"></i>
                        </span>
                    </th>
                    <th>
                        功能
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in sortdata"
                   :key="item.id">
                    <td>{{ item.create_at | date }}</td>
                    <td>{{ item.user.name }}</td>
                    <td>{{ item.user.email }}</td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm"
                               @click="openModal(item)">
                              訂單細項
                        </button>
                    </td>
                    <td>{{ item.total | currency }}</td>
                    <td>{{ item.message }}</td>
                    <td>
                        <span v-if="item.is_paid"
                              class="badge badge-success">
                              付款完成
                        </span>
                        <span v-else
                              class="badge badge-secondary">
                              尚未付款
                        </span>
                    </td>
                    <td>
                        <!-- <button class="btn btn-outline-primary btn-sm" @click="openModal(item)">編輯</button> -->
                        <a class="btn btn-sm"
                          :class="btnColors(item.is_paid)"
                           href="#"
                          @click.prevent="gocheckout(item.id)">
                                    <span v-if="item.is_paid">
                                        查看訂單
                                    </span>
                                    <span v-else>
                                        進行付款
                                    </span>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>

        <Pagin @postPage="getOrders"
               :getpagin="pagination">
        </Pagin>
        <!-- OrdersModal -->
        <div class="modal fade"
             id="OrdersModal"
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
                            <div class="col-sm-12">
                                    <table class="table">
                                    <thead>
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
                                        <tr v-for="(item) in tempOrder.products"
                                           :key="item.id">
                                            <td class="align-middle">
                                                {{item.product.category}}
                                            </td>
                                            <td class="align-middle">
                                                {{item.qty}}/{{item.product.unit}}
                                            </td>
                                            <td class="align-middle">
                                                {{item.final_total}}
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="2"
                                                class="text-right">
                                                總計
                                            </td>
                                            <td class="text-right">
                                                {{ tempOrder.total }}
                                            </td>
                                        </tr>
                                    </tfoot>
                                    </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <!-- <button type="button" class="btn btn-primary" @click="updateOrder">儲存</button> -->
                        <button type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal">
                                關閉
                        </button>
                    </div>
                </div>
            </div>
        </div>
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
      Orders: [],
      tempOrder: {},
      tempOrderProducts: {},
      pagination: {},
      isLoading: false,
      mode: '',
      mode_sec: '',
      isReverse: 'true'
    }
  },
  methods: {
    getOrders (pagenum = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/orders/?page=${pagenum}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        // console.log('=========');
        // console.log(response.data);
        // console.log('=========');
        vm.isLoading = false
        vm.Orders = response.data.orders
        vm.pagination = response.data.pagination
      })
    },
    openModal (item) {
      // 用vue的方式開啟modal
      // 傳入參數判斷新增還是修改
      // Object.assign這寫法要估狗一下
      this.tempOrder = Object.assign({}, item)// .filter(a=>a.id==item.id)
      this.tempOrderProducts = Object.assign({}, item.products)
      this.isNew = false
      // console.log('item -> ',item);
      // console.log('vm.tempOrder -> ',this.tempOrder);
      // console.log('vm.tempOrder -> id',this.tempOrder.id);
      // console.log('vm.tempOrder -> total',this.tempOrder.total);
      $('#OrdersModal').modal('show')
    },
    updateOrder (oid) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${oid}`
      const httpMethod = 'put'
      const vm = this
      this.$http[httpMethod](api, { data: vm.tempOrder }).then((response) => {
        // console.log('=========');
        // console.log(response.data);
        // console.log('=========');
        if (response.data.success) {
          $('#OrdersModal').modal('hide')
          vm.getOrders()
        } else {
          vm.getOrders()
          console.log('修改失敗')
        }
      })
    },
    gocheckout (oid) {
      const vm = this
      vm.$router.push(`/customercheckout/${oid}`)
    },
    btnColors (isPaid) {
      return isPaid ? 'btn-outline-success' : 'btn-outline-danger'
    }
  },
  computed: {
    sortdata: function () {
      const vm = this
      if (vm.isReverse) {
        return vm.Orders.sort(function (a, b) {
          if (vm.mode === 'user') {
            return ('' + a[vm.mode][vm.mode_sec]).localeCompare(b[vm.mode][vm.mode_sec])
          } else {
            return ('' + a[vm.mode]).localeCompare(b[vm.mode])
          }
        })
      } else {
        return vm.Orders.reverse(function (a, b) {
          return ('' + b[vm.mode]).localeCompare(a[vm.mode])
        })
      }
    }
  },
  created () {
    this.getOrders()
    // 測試警告視窗
    // this.$bus.$emit('message:push','測試','success');
  }
}
</script>
