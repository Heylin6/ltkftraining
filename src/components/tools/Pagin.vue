<template>
    <div>
        <nav>
            <ul class="pagination">
                <li class="page-item"
                   :class="{'disabled':!getpagin.has_pre}">
                        <a class="page-link"
                        href="#"
                        @click.prevent="getPage(getpagin.current_page-1)">
                        Previous
                        </a>
                </li>
                <li class="page-item"
                   :class="{'active': getpagin.current_page === page}"
                    v-for="(page) in getpagin.total_pages" :key="page">
                        <a class="page-link"
                        href="#"
                        @click.prevent="getPage(page)">
                            {{page}}
                        </a>
                </li>
                <li class="page-item"
                   :class="{'disabled':!getpagin.has_next}">
                        <a class="page-link"
                        href="#"
                        @click.prevent="getPage(getpagin.current_page+1)">
                        Next
                        </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
  name: 'Pagin',
  // 從老爸傳來的資料
  // 老爸那邊 :getpagin='getProducts'
  // 所以整包資料在這邊變成getpagin
  props: ['getpagin'],
  data () {
    return {

    }
  },
  methods: {
    getPage (page = 1) {
      // 防呆,避免傳入O或當前頁數大於總頁數
      if (page === 0 || page > this.getpagin.total_pages) { return }
      // 丟資料回給老爸
      // 給老爸時的名稱叫postPage
      this.$emit('postPage', page)
    }
  }
}
</script>
