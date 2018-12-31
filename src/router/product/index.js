import { Home } from 'layout/'

import product from './product'

export default {
  path: '/product',
  name: '商品管理',
  icon: 'inbox',
  id:'1-/product',
  component: Home,
  redirect: '/product/product',
  children: [product]
}
