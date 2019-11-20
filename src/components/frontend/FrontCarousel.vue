<template>
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li v-for="(item) in Carousels" :key="item.id"
                    data-target="#myCarousel"
                    :data-slide-to="item.id-1"
                    :class="{'active': item.id-1 === 0}"></li>
            </ol>
            <div class="carousel-inner">
                 <div v-for="(item) in Carousels" :key="item.id"
                        class="carousel-item"
                        :class="{'active': item.id-1 === 0}">
                        <img class="bd-placeholder-img"
                            :src="item.imgurl"
                             alt="xmas_orchestra">
                        <svg class="bd-placeholder-img"
                             width="100%"
                             height="100%"
                             xmlns="http://www.w3.org/2000/svg"
                             preserveAspectRatio="xMidYMid slice"
                             focusable="false"
                             role="img">
                                <rect width="100%" height="100%" fill="#777"/>
                        </svg>
                        <div class="container">
                            <div class="carousel-caption"
                                :class="{'text-left': item.id % 3 === 1,'text-right':item.id % 3 === 0}">
                                <h1 style="font-size:1.2cm;font-weight:bold;">
                                    {{item.title}}
                                </h1>
                                <p>
                                    {{item.content}}
                                </p>
                                <p>
                                    <router-link
                                        class="btn btn-lg btn-heylin"
                                        :to="item.routerurl" >
                                        {{item.btnname}}
                                    </router-link>
                                </p>
                            </div>
                        </div>
                </div>
            </div>
            <a class="carousel-control-prev"
               href="#myCarousel"
               role="button"
               data-slide="prev">
                      <span class="carousel-control-prev-icon"
                            aria-hidden="true">
                      </span>
                <span class="sr-only">
                    Previous
                </span>
            </a>
            <a class="carousel-control-next"
               href="#myCarousel"
               role="button"
               data-slide="next">
                    <span class="carousel-control-next-icon"
                          aria-hidden="true">
                    </span>
                <span class="sr-only">
                    Next
                </span>
            </a>
        </div>
</template>

<script>
import CarouselData from '../../json/carousel.json'

export default {
  components: {

  },
  data () {
    return {
      Carousels: {}
    }
  },
  methods: {
    getCarousels () {
      this.Carousels = CarouselData.data.carousel
    }
  },
  created () {
    this.getCarousels()
  }
}
</script>
