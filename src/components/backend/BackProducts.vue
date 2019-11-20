<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right">
            <button class="btn btn-success mt-4"
                   @click="openModal(true)">
                    建立新的活動
            </button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th>
                        編號
                    </th>
                    <th>
                        分類
                    </th>
                    <th>
                        標題
                    </th>
                    <th class="text-right">
                        原價
                    </th>
                    <th class="text-right">
                        售價
                    </th>
                    <th class="text-right">
                        單位
                    </th>
                    <th>
                        功能
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in products"
                   :key="item.id">
                    <td>
                        {{ item.num }}
                    </td>
                    <td>
                        {{ item.category }}
                    </td>
                    <td>
                        {{ item.title }}
                    </td>
                    <td class="text-right">
                        {{ item.origin_price | currency }}
                    </td>
                    <td class="text-right">
                        {{ item.price | currency }}
                    </td>
                    <td class="text-right">
                        {{ item.unit }}
                    </td>
                    <td>
                        <button
                            class="btn btn-outline-primary btn-sm"
                           @click="openModal(false,item)">
                           編輯
                        </button>
                        <button
                            class="btn btn-outline-danger btn-sm"
                           @click="deleteProduct(item)">
                           刪除
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagin @postPage="getProducts"
               :getpagin="pagination">
        </Pagin>
        <!-- productModal -->
        <div id="productModal"
             class="modal fade"
             tabindex="-1"
             role="dialog"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog"
                 role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 id="exampleModalLabel"
                        class="modal-title" >
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
                            <div class="form-group">
                                <label for="image">
                                    輸入圖片網址
                                </label>
                                <input type="text"
                                    class="form-control"
                                    id="image"
                                    v-model="tempProduct.imageUrl"
                                    placeholder="請輸入圖片連結">
                            </div>
                            <div class="form-group">
                                <label for="customFile">或 上傳圖片
                                    <i class="fas fa-spinner fa-pulse"
                                    v-if="status.fileUploading">
                                    </i>
                                </label>
                                <input type="file"
                                    id="customFile"
                                    class="form-control"
                                    ref="files"
                                    @change="uploadFile">
                            </div>
                            <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                                :src="tempProduct.imageUrl"
                                 class="img-fluid"
                                 alt="">
                        </div>
                        <div class="col-sm-8">
                                    <div class="form-group">
                                            <label for="title">
                                                標題
                                            </label>
                                            <input type="text"
                                                   class="form-control"
                                                   id="title"
                                                   v-model="tempProduct.title"
                                                   placeholder="請輸入標題">
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="category">
                                                分類
                                            </label>
                                            <input type="text"
                                                   class="form-control"
                                                   id="category"
                                                   v-model="tempProduct.category"
                                                   placeholder="請輸入分類">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="price">
                                                單位
                                            </label>
                                            <input type="unit"
                                                   class="form-control"
                                                   id="unit"
                                                   v-model="tempProduct.unit"
                                                   placeholder="請輸入單位">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                                <label for="origin_price">
                                                    原價
                                                </label>
                                                <input type="number"
                                                    class="form-control"
                                                    id="origin_price"
                                                    v-model="tempProduct.origin_price"
                                                    placeholder="請輸入原價">
                                        </div>
                                        <div class="form-group col-md-6">
                                                <label for="price">
                                                    售價
                                                </label>
                                                <input type="number"
                                                    class="form-control"
                                                    id="price"
                                                    v-model="tempProduct.price"
                                                    placeholder="請輸入售價">
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="form-group">
                                            <label for="description">
                                                產品描述
                                            </label>
                                            <textarea type="text"
                                                      class="form-control"
                                                      id="description"
                                                      v-model="tempProduct.description"
                                                      placeholder="請輸入產品描述">
                                            </textarea>
                                    </div>
                                    <div class="form-group">
                                            <label for="content">
                                                說明內容
                                            </label>
                                            <textarea type="text"
                                                      class="form-control"
                                                      id="content"
                                                      v-model="tempProduct.content"
                                                      placeholder="請輸入產品說明內容">
                                            </textarea>
                                    </div>
                                    <div class="form-group">
                                            <div class="form-check">
                                                <input class="form-check-input"
                                                       type="checkbox"
                                                       v-model="tempProduct.is_enabled"
                                                       :true-value="1"
                                                       :false-value="0"
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
                           @click="updateProduct">
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
      products: [],
      tempProduct: {},
      pagination: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      }
    }
  },
  methods: {
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
        vm.pagination = response.data.pagination
      })
    },
    openModal (isNew, item) {
      // 用vue的方式開啟modal
      // 傳入參數判斷新增還是修改
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        // Object.assign這寫法要估狗一下
        this.tempProduct = Object.assign({}, item)
        this.isNew = false
      }
      $('#productModal').modal('show')
    },
    updateProduct () {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`
      let httpMethod = 'post'
      const vm = this
      if (!vm.isNew) {
        // 假設不是新增 則為修改
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        // console.log('=========');
        // console.log(response.data);
        // console.log('=========');
        if (response.data.success) {
          $('#productModal').modal('hide')
          vm.getProducts()
        } else {
          vm.getProducts()
          console.log('新增失敗')
        }
      })
    },
    deleteProduct (item) {
      // const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/products`
      // const vm = this
      var del = confirm('確定刪除?')
      if (del) {
        //  this.$http.delete(api).then((response) => {
        //  console.log('=========');
        //  console.log(response.data);
        //  console.log('=========');
        //  vm.products=response.data.products;
        // });
      } else {

      }
    },
    uploadFile () {
      // console.log(this);
      const uploadedfile = this.$refs.files.files[0]
      const vm = this
      // 模擬表單送出形式
      const formData = new FormData()
      // 塞入檔案
      formData.append('file-to-upload', uploadedfile)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`
      // 執行上傳時 開啟讀取icon
      vm.status.fileUploading = true
      // 傳遞時修正他的header
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multpart/form-data'
        }
      }).then((response) => {
        // console.log('=========');
        // console.log(response.data);
        // console.log('=========');
        // 上傳完畢時 關閉讀取icon
        vm.status.fileUploading = false
        if (response.data.success) {
          // vm.tempProduct.imageUrl = response.data.imageUrl;
          // 強制寫入圖片名稱的欄位
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
        } else {
          this.$bus.$emit('message:push', response.data.message.message, 'danger')
        }
      })
    }
  },
  created () {
    this.getProducts()
    // 測試警告視窗
    // this.$bus.$emit('message:push','測試','success');
  }
}
</script>
