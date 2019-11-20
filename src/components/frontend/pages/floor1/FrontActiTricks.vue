<template>
    <div>
      <!-- from FrontMarketing -->
      <!-- 活動花絮 -->
      <section class="portfolio" id="portfolio">
           <div class="portfolio-grid">
              <div class="row">
                    <div v-for="item in activitytricks"
                        :key="item.id"
                         class="col-lg-3 col-sm-6 -12">
                      <div class="card card-block">
                          <a href="#"
                            @click.prevent="openModal(item)">
                                <div style="height:207px;width:474px;background-repeat:no-repeat;"
                                    :style="{ 'background-image': 'url('+item.imgurl+')',
                                            'background-position':item.position ,
                                            'background-size':item.size}">
                                        <!-- <img alt="" :src="item.imgururl"> -->
                                </div>
                                <div class="portfolio-over">
                                    <div>
                                        <h3 class="card-title">
                                            {{item.title}}
                                        </h3>
                                        <p class="card-text">
                                          {{item.content}}
                                        </p>
                                    </div>
                                </div>
                            </a>
                      </div>
                    </div>
                </div>
             </div>
      </section>
        <!-- productModal -->
        <div class="modal fade"
             id="activityModal"
             tabindex="-1"
             role="dialog"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
              <div class="modal-dialog"
                   role="document">
                  <div class="modal-content"
                       style="background-color: black;">
                        <div class="modal-header"
                             style="border-bottom: 1px solid #000000;">
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
                                    <div style="min-width: 100%;height: 16rem;background-repeat:no-repeat;"
                                        :style="{ 'background-image': 'url('+tempActivity.imgurl+')',
                                                  'background-position':tempActivity.position ,
                                                  'background-size':tempActivity.size}">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer"
                             style="border-top: 1px solid #000000;">
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
import activitytricks from '../../../../json/activitytricks.json'

export default {
  components: {

  },
  data () {
    return {
      tempActivity: {},
      activitytricks: {}
    }
  },
  methods: {
    getActivitytricks () {
      var vm = this
      vm.activitytricks = activitytricks.data.activity
      // console.log('vm.activitytricks',vm.activitytricks);
    },
    openModal (item) {
      this.tempActivity = Object.assign({}, item)
      $('#activityModal').modal('show')
    }
  },
  created () {
    this.getActivitytricks()
  }
}
</script>
