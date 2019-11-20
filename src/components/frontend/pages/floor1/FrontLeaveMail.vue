<template>
    <!-- from FrontMarketing -->
    <!-- 訂閱我們取得最新優惠與活動特訊 -->
    <div class="d-flex justify-content-center">
          <div class="py-5">
               <h5 class="mb-4">訂閱我們取得最新優惠與活動特訊</h5>
               <div class="input-group">
                     <input type="email"
                            class="form-control"
                            name="email"
                            id="useremail"
                            required
                            v-validate="'required|email'"
                           :class="{'is-invalid': errors.has('email')}"
                            placeholder="Email">
                     <div class="input-group-prepend">
                          <button class="rounded-right btn btn-heylin">
                                <span>
                                訂閱
                                </span>
                          </button>
                     </div>
                </div>
            </div>
    </div>
</template>
