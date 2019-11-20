<template>
    <div>
            <div v-for="(item) in getdividers"
                :key="item.id">
                <div class="row featurette">
                  <div class="col-md-7"
                      :class="{'order-md-2' : item.id % 2 === 0}">
                      <h2 class="featurette-heading">
                          <span class="text-muted">
                            {{ item.heading }}
                          </span>
                      </h2>
                      <p class="lead">
                        <br>
                        {{ item.content }}
                      </p>
                  </div>
                  <div class="col-md-5"
                      :class="{'order-md-1' : item.id % 2 === 0}">
                      <div class="imgsetting"
                          :style="{ 'background-image': 'url('+item.img+')','background-position':item.position }">
                      </div>
                  </div>
                </div>
                <hr class="featurette-divider"
                    v-if="item.id < 3">
            </div>
    </div>
</template>
<script>
export default {
  name: 'DividerRect',
  props: ['getdividers'],
  data () {
    return {

    }
  }
}
</script>
<style scoped>
  .imgsetting {
      height:445px;
      background-repeat:no-repeat;
      border:1px #ccc solid;
  }
</style>
