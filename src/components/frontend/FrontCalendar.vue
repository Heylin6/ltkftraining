<template>
    <div id='main' class="container">
        <loading :active.sync="isLoading"></loading>
        <ImageWallSpace></ImageWallSpace>
        <div>
          <div class="calendar">
            <div class="top">
              <div class="title">
                  {{this.setYear}} 年 {{this.setMonth}} 月
              </div>
              <div class="btns">
                <button class="today badge badge-heylin"
                        @click.prevent="gonowmonth()">
                        <span>本月</span>
                </button>
                <button @click.prevent="gopreventmonth()">
                        <i class="fas fa-backward"></i>
                        </button>
                <button @click.prevent="gonextmonth()">
                        <i class="fas fa-forward"></i>
                        </button>
              </div>
            </div>
            <div class="month">
                  <div class="weeks">
                      <div v-for="(item, index) in weeks"
                          :key="index">
                          {{item}}
                      </div>
                  </div>
                  <div class="days"
                       v-for="(item, index) in MonthArrInit"
                      :key="index">
                            <div v-for="(item2, index2) in item"
                                :key="index2"
                                :class="[item2.l ?'':'next-prev-month',item2.t ? 'today' : null]"
                                :data-y="item2.y"
                                :data-m="item2.m"
                                :data-d="item2.d">
                                <!-- 之後撈後端這邊邏輯會修改 -->
                                <span v-if="item2.d % 5 !== 0"
                                      class="badge badge-heylin ml-2">
                                      已預訂
                                </span>
                                <span v-else-if="item2.d % 10 === 0"
                                      class="badge badge-danger ml-2">
                                      休息日
                                </span>
                                <span v-else
                                      class="badge badge-success  ml-2">
                                      可預約
                                </span>
                            </div>
                  </div>
            </div>
          </div>
        </div>
        <hr class="featurette-divider">
        <div class="container col-md-6">
            <h2 style="text-align:center;
                      padding:0 0 25px 0;
                      font-weight: 700;">
                      行事曆說明
            </h2>
            <h5>
                可從此行事曆確認講師們的行程事項，如果您與排好時間，行事曆中也出現可預訂的標示，那太好了，歡迎趕快與我們聯絡。
            </h5>
        </div>
    </div>
</template>
<script>
import ImageWallSpace from '../tools/ImageWallSpace'
export default {
  components: {
    ImageWallSpace
  },
  data () {
    return {
      mode: 'now',
      setYear: 0,
      setMonth: 0,
      prevmonth: {},
      prevyearNum: 0,
      prevmonthNum: 0,
      nextmonth: {},
      nextyearNum: 0,
      nextmonthNum: 0,
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      monthDayCount: 0,
      montharr: [],
      isLoading: false
    }
  },
  methods: {
    gonowmonth () {
      this.mode = 'now'
    },
    gopreventmonth () {
      this.mode = 'prev'
    },
    gonextmonth () {
      this.mode = 'next'
    },
    getYearAndMonth () {
      var dt = new Date()
      this.setYear = dt.getFullYear()
      this.setMonth = dt.getMonth() + 1
    },
    monthDayCount (y, m) {
      this.monthDayCount = (--m === 1)
        ? ((((y % 4) === 0) && ((y % 100) !== 0)) || ((y % 400) === 0))
          ? 29 : 28 : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m]
    },
    prevMonth (y, m) {
      this.prevmonth = {
        y: m === 1
          ? y - 1 : y,
        m: m === 1
          ? 12 : (m - 1)
      }
      this.prevyearNum = this.prevmonth.y
      this.prevmonthNum = this.prevmonth.m
    },
    nextMonth (y, m) {
      this.nextmonth = {
        y: m === 12
          ? y + 1 : y,
        m: m === 12
          ? 1 : (m + 1)
      }
      this.nextyearNum = this.nextmonth.y
      this.nextmonthNum = this.nextmonth.m
    },
    createMonthArr (y, m) {
      var firstDayWeek = new Date(y, m - 1, 1).getDay()
      var monthCount = this.monthDayCount
      var weekCount = parseInt((firstDayWeek + monthCount) / 7, 10) + (((firstDayWeek + monthCount) % 7) ? 1 : 0)

      var p = this.prevmonth
      var prevMonthCount = this.monthDayCount
      var n = this.nextmonth

      var date = new Date()
      this.montharr = Array.apply(null, Array(weekCount)).map(function (_, i) {
        return Array.apply(null, Array(7)).map(function (_, j) {
          var d = i * 7 + j - firstDayWeek + 1
          var m2 = m
          var y2 = y
          var l = true // 是否為本月份

          if (d > monthCount) {
            d = d - monthCount
            m2 = n.m
            y2 = n.y
            l = false
          }

          if (d <= 0) {
            d = d + prevMonthCount
            m2 = p.m
            y2 = p.y
            l = false
          }
          var t = y2 === date.getFullYear() && m2 === date.getMonth() + 1 && d === date.getDate()
          return {
            y: y2, m: m2, d: d, l: l, t: t
          }
        })
      })
    }
  },
  computed: {
    MonthArrInit () {
      const vm = this
      var y, m

      switch (vm.mode) {
        case 'now':
          this.getYearAndMonth()
          var _year = this.setYear
          var _month = this.setMonth

          this.monthDayCount(_year, _month)
          this.prevMonth(_year, _month)
          this.nextMonth(_year, _month)
          this.createMonthArr(_year, _month)
          return this.montharr
        case 'prev':
          y = parseInt(this.prevyearNum, 10)
          m = parseInt(this.prevmonthNum, 10)

          this.setYear = this.prevyearNum
          this.setMonth = this.prevmonthNum

          this.monthDayCount(y, m)
          this.prevMonth(y, m)
          this.nextMonth(y, m)
          this.createMonthArr(y, m)
          this.mode = 'none'
          return this.montharr
        case 'next':
          y = parseInt(this.nextyearNum, 10)
          m = parseInt(this.nextmonthNum, 10)

          this.setYear = this.nextyearNum
          this.setMonth = this.nextmonthNum
          this.monthDayCount(y, m)
          this.prevMonth(y, m)
          this.nextMonth(y, m)
          this.createMonthArr(y, m)
          this.mode = 'none'

          return this.montharr
      }
    }
  },
  created () {
    this.isLoading = true
    this.getYearAndMonth()
    var _year = this.setYear
    var _month = this.setMonth

    this.monthDayCount(_year, _month)
    this.prevMonth(_year, _month)
    this.nextMonth(_year, _month)
    this.createMonthArr(_year, _month)
    this.isLoading = false
  }
}
</script>
<style scoped>
  .calendar{
      display:inline-block;
      width:100%;
      background-color:white;
      padding:16px;
      -moz-box-shadow:0 1px 3px rgba(0,0,0,0.1);
      -webkit-box-shadow:0 1px 3px rgba(0,0,0,0.1);
      box-shadow:0 1px 3px rgba(0,0,0,0.1)
  }
  .calendar .top{

      width:100%;
      height:40px;
      line-height:40px;
      *zoom:1
  }
  .calendar .top:after{
      display:table;
      content:"";
      line-height:0;
      clear:both
  }
  .calendar .top>*{
      float:left;
      display:inline-block
  }
  .calendar .top .title{
      width:calc(100% - 200px)
  }
  /* .calendar .top .title:after{
      content:attr(data-y) "年 " attr(data-m) "月"
  }   */
  .calendar .top .btns{
      width:200px;
      text-align:right
  }
  .calendar .top .btns>button{
      border:1px solid #ffffff;
      height:25px;
      line-height:25px;
      padding:0 5px;
      margin-top:8px
  }
  .calendar .month{
      display:table;
      border-spacing:0;
      border-collapse:collapse;
      table-layout:fixed;
      width:100%;
      margin-top:16px
    }
  .calendar .month .weeks,.calendar .month .days{
      display:table-row
  }
  .calendar .month .weeks>div,.calendar .month .days>div{
      display:table-cell;
      width:calc(100% / 7);
      border:1px solid #c8c8c8
  }
  .calendar .month .weeks>div{
      height:35px;
      line-height:35px;
      text-align:center;
      background-color:#f0f0f0;
      font-weight:bold
  }
  .calendar .month .days>div{
      position:relative;
      height:100px;
      -moz-transition:background-color .3s;
      -o-transition:background-color .3s;
      -webkit-transition:background-color .3s;
      transition:background-color .3s
  }
  .calendar .month .days>div[data-y][data-m][data-d]:after{
      content:attr(data-y) "/" attr(data-m) "/" attr(data-d);
      position:absolute;
      top:0;
      right:0;
      display:inline-block
  }
  .calendar .month .days>div.next-prev-month{
      background-image:-webkit-gradient(linear, 0 0, 100% 100%,
                                        color-stop(0.25, #e1e1e1),
                                        color-stop(0.25, transparent),
                                        color-stop(0.5, transparent),
                                        color-stop(0.5, #e1e1e1),
                                        color-stop(0.75, #e1e1e1),
                                        color-stop(0.75, transparent),
                                        to(transparent));
      -webkit-background-size:20px 20px
  }
  .calendar .month .days>div.today{
      border:3px solid #508ef5
  }
  .calendar .month .days>div:hover{
      background-color:rgba(0,0,0,0.05)
  }
  @media screen and (max-width: 499px) and (min-width: 0){
      .calendar .month{
          display:inline-block
      }
      .calendar .month .weeks,.calendar .month .days{
          display:inline-block;
          width:100%
      }
      .calendar .month .weeks>div,.calendar .month .days>div{
          display:inline-block;
          width:100%
      }
      .calendar .month .weeks{
          display:none
      }
      .calendar .month .days>div{
          height:auto;
          min-height:100px;
          border:0;
          border-top:1px solid #c8c8c8
      }
      .calendar .month .days>div[data-y][data-m][data-d]:after{
          top:4px;
          right:4px
      }
      .calendar .month .days>div.next-prev-month{
          display:none
      }
  }

</style>
