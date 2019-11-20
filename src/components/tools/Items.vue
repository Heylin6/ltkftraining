<template>
<div>
    <ul class="nav nav-tabs">
        <li v-for="(item) in getproductitem"
            :key="item.id"
            :class="{'active':item.code === getfilter}">
                <a href="#"
                  @click.prevent="getfilterStr(item)">
                   {{item.name}}
                </a>
        </li>
    </ul>
</div>
</template>
<script>
export default {
  name: 'Items',
  // 從老爸傳來的資料
  // 老爸那邊 :getordercard='getProducts'
  // 所以整包資料在這邊變成getordercard
  props: ['getproductitem', 'getfilter'],
  data () {
    return {

    }
  },
  methods: {
    getfilterStr (item) {
      // 丟資料回給老爸
      // 給老爸時的名稱叫postPid
      this.$emit('filterChange', item)
      // console.log('in item  :',item);
    }
  },
  computed: {

  }
}
</script>
