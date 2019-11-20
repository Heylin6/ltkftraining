import Vue from 'vue'
import VueRouter from 'vue-router'

import BackLogin from '@/components/backend/BackLogin.vue'
import BackDashboard from '@/components/backend/BackDashboard.vue'
import BackProducts from '@/components/backend/BackProducts.vue'
import BackOrders from '@/components/backend/BackOrders.vue'
import BackCoupons from '@/components/backend/BackCoupons.vue'
import BackCustomerOrder from '@/components/backend/BackCustomerOrder.vue'
import BackCustomerCheckOut from '@/components/backend/BackCustomerCheckOut.vue'
import FrontIndex from '@/components/frontend/FrontIndex.vue'
import FrontMarketing from '@/components/frontend/pages/FrontMarketing.vue'
import FrontMemberCart from '@/components/frontend/pages/FrontMemberCart.vue'
import FrontMemberCheckOut from '@/components/frontend/pages/FrontMemberCheckOut.vue'
import FrontCart from '@/components/frontend/pages/FrontCart.vue'
import FrontTeacherDetail from '@/components/frontend/pages/FrontTeacherDetail.vue'
import FrontContactUs from '@/components/frontend/pages/FrontContactUs.vue'
import FrontCalendar from '@/components/frontend/FrontCalendar.vue'
import FrontProductDetail from '@/components/tools/OrderCard2/OrderCard2Detail.vue'
import FrontCart2 from '@/components/tools/Cart2/FrontCart2.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*', /* 沒註冊過該路徑的皆為*號 */
    redirect: ''/* 導向路由位置 */
  },
  {
    name: '首頁index路線', /* 呈現的名稱 */
    path: '/index', /* 對應的虛擬路徑 */
    component: FrontIndex, /* 對應元件 */
    children: [
      {
        name: '首頁index路線2', /* 呈現的名稱 */
        path: '', /* 對應的虛擬路徑 */
        component: FrontMarketing, /* 對應元件 */
        props: true
      },
      /*  { */
      /*      name:'陣容師資index路線',/* 呈現的名稱 */
      /*      path:'/trainer',/* 對應的虛擬路徑 */
      /*      component:FrontTeacher,/* 對應元件 */
      /*      props: true */
      /*  }, */
      {
        name: '陣容師資index路線', /* 呈現的名稱 */
        path: 'trainer/:trainerid', /* 對應的虛擬路徑 */
        component: FrontTeacherDetail, /* 對應元件 */
        props: true
      },
      {
        name: '行事曆index路線', /* 呈現的名稱 */
        path: 'calendar', /* 對應的虛擬路徑 */
        component: FrontCalendar, /* 對應元件 */
        props: true
      },
      /*  { */
      /*      name:'提供內容index路線',/* 呈現的名稱 */
      /*      path:'/divider',/* 對應的虛擬路徑 */
      /*      component:FrontDivider,/* 對應元件 */
      /*      props: true */
      /*  }, */
      {
        name: '聯絡我們index路線', /* 呈現的名稱 */
        path: 'contactus', /* 對應的虛擬路徑 */
        component: FrontContactUs, /* 對應元件 */
        props: true
      },
      {
        name: '商品詳細內容index路線', /* 呈現的名稱 */
        path: 'product/:productid', /* 對應的虛擬路徑 */
        component: FrontProductDetail, /* 對應元件 */
        props: true
      },
      {
        name: '前台會員購物車index路線', /* 呈現的名稱 */
        path: 'fcart', /* 對應的虛擬路徑 */
        component: FrontCart, /* 對應元件 */
        props: true
      },
      {
        name: '前台會員購物車index路線', /* 呈現的名稱 */
        path: 'membercart', /* 對應的虛擬路徑 */
        component: FrontMemberCart, /* 對應元件 */
        props: true
      },
      {
        name: '前台會員購物細項index路線', /* 呈現的名稱 */
        path: 'membercart/:productid', /* 對應的虛擬路徑 */
        component: FrontMarketing, /* 對應元件 */
        props: true
      },
      {
        name: '前台會員結帳index路線', /* 呈現的名稱 */
        path: 'membercheckout/:orderId', /* 對應的虛擬路徑 */
        component: FrontMemberCheckOut, /* 對應元件 */
        props: true
      }
    ]
  },
  {
    name: '首頁', /* 呈現的名稱 */
    path: '', /* 對應的虛擬路徑 */
    component: FrontIndex, /* 對應元件 */
    children: [
      {
        name: '首頁', /* 呈現的名稱 */
        path: '', /* 對應的虛擬路徑 */
        component: FrontMarketing, /* 對應元件 */
        props: true
      },
      /*  { */
      /*      name:'陣容師資',/* 呈現的名稱 */
      /*      path:'/trainer',/* 對應的虛擬路徑 */
      /*      component:FrontTeacher,/* 對應元件 */
      /*      props: true */
      /*  }, */
      {
        name: '陣容師資', /* 呈現的名稱 */
        path: '/trainer/:trainerid', /* 對應的虛擬路徑 */
        component: FrontTeacherDetail, /* 對應元件 */
        props: true
      },
      {
        name: '行事曆', /* 呈現的名稱 */
        path: 'calendar', /* 對應的虛擬路徑 */
        component: FrontCalendar, /* 對應元件 */
        props: true
      },
      /*  { */
      /*      name:'提供內容',/* 呈現的名稱 */
      /*      path:'/divider',/* 對應的虛擬路徑 */
      /*      component:FrontDivider,/* 對應元件 */
      /*      props: true */
      /*  }, */
      {
        name: '聯絡我們', /* 呈現的名稱 */
        path: 'contactus', /* 對應的虛擬路徑 */
        component: FrontContactUs, /* 對應元件 */
        props: true
      },
      {
        name: '商品詳細內容', /* 呈現的名稱 */
        path: 'product/:productid', /* 對應的虛擬路徑 */
        component: FrontProductDetail, /* 對應元件 */
        props: true
      },
      {
        name: '前台會員購物車', /* 呈現的名稱 */
        path: 'fcart', /* 對應的虛擬路徑 */
        component: FrontCart2, /* 對應元件 */
        props: true
      },
      {
        name: '前台會員購物車', /* 呈現的名稱 */
        path: 'membercart', /* 對應的虛擬路徑 */
        component: FrontMemberCart, /* 對應元件 */
        props: true
      },
      {
        name: '前台會員購物細項', /* 呈現的名稱 */
        path: 'membercart/:productid', /* 對應的虛擬路徑 */
        component: FrontMarketing, /* 對應元件 */
        props: true
      },
      {
        name: '前台會員結帳', /* 呈現的名稱 */
        path: 'membercheckout/:orderId', /* 對應的虛擬路徑 */
        component: FrontMemberCheckOut, /* 對應元件 */
        props: true
      }
    ]
  },
  {
    name: 'login', /* 呈現的名稱 */
    path: '/login', /* 對應的虛擬路徑 */
    component: BackLogin/* 對應元件 */
  },
  {
    name: 'dashboard', /* 呈現的名稱 */
    path: '/admin', /* 對應的虛擬路徑 */
    component: BackDashboard, /* 對應元件 */
    meta: { requiresAuth: true },
    children: [
      {
        name: 'productsdefault', /* 呈現的名稱 */
        path: '', /* 對應的虛擬路徑 */
        component: BackProducts, /* 對應元件 */
        meta: { requiresAuth: true }
      },
      {
        name: 'products', /* 呈現的名稱 */
        path: 'products', /* 對應的虛擬路徑 */
        component: BackProducts, /* 對應元件 */
        meta: { requiresAuth: true }
      },
      {
        name: 'orders', /* 呈現的名稱 */
        path: 'orders', /* 對應的虛擬路徑 */
        component: BackOrders, /* 對應元件 */
        meta: { requiresAuth: true }
      },
      {
        name: 'coupons', /* 呈現的名稱 */
        path: 'coupons', /* 對應的虛擬路徑 */
        component: BackCoupons, /* 對應元件 */
        meta: { requiresAuth: true }
      }

    ]
  },
  {
    name: 'dashboard', /* 呈現的名稱 */
    path: '/', /* 對應的虛擬路徑 */
    component: BackDashboard, /* 對應元件 */
    meta: { requiresAuth: true },
    children: [
      {
        name: 'customerorder', /* 呈現的名稱 */
        path: 'customerorder', /* 對應的虛擬路徑 */
        component: BackCustomerOrder/* 對應元件 */
      },
      {
        name: 'customercheckout', /* 呈現的名稱 */
        path: 'customercheckout/:orderId', /* 對應的虛擬路徑 */
        component: BackCustomerCheckOut/* 對應元件 */
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
