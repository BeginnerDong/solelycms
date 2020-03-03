
import HelloWorld from '@/components/HelloWorld'
import { Login,User,Content,Product,Order,FlowLog,Dashboard } from '../views/'
import { Home } from '../layout/'


export default [
  {
    path: '/',
    name: 'cms',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登录',
    hidden: true,
    meta: {
      noRequireAuth: true,
      application:['notInTab','notInAuth']
    },
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta:{},
    children: [
      {
        path: 'dashboard',
        name: '控制面板',
        component: Dashboard.Dashboard
      },
      {
        path: 'adminLists',
        name: '管理员列表',
        component: User.AdminLists
      },
      {
        path: 'role',
        name: '角色管理',
        component: User.Role
      },
      {
        path: 'access',
        name: '权限管理',
        component: User.Access
      },
      {
        path: 'staff',
        name: '员工管理',
        component: User.Staff
      },
      {
        path: 'thirdApp',
        name: '配置列表',
        component: User.ThirdApp
      },
      {
        path: 'articleLabel',
        name: '文章菜单',
        component: Content.Articlelabel
      },
      {
        path: 'Article',
        name: '文章列表',
        component: Content.ArticleLists
      },
      {
        path: 'message',
        name: '消息管理',
        component: Content.Message
      },
      {
        path: 'productLabel',
        name: '商品类别',
        component: Product.ProductLabel
      },
      {
        path: 'product',
        name: '商品管理',
        component: Product.Product
      },
      {
        path: 'skuLabel',
        name: 'SKU类别',
        component: Product.SkuLabel,
      },
      {
        path: 'sku',
        name: 'SKU管理',
        component: Product.Sku,
      },
      {
        path: 'coupon',
        name: '优惠券管理',
        component: Product.Coupon
      },
      {
        path: 'order',
        name: '订单管理',
        component: Order.Order
      },
      {
        path: 'pay',
        name: '支付流水',
        component: FlowLog.Pay
      },
      {
        path: 'balance',
        name: '余额流水',
        component: FlowLog.Balance
      },
      {
        path: 'score',
        name: '积分流水',
        component: FlowLog.Score
      },

    ]
  }
]
