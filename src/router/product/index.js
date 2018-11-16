import { Home } from 'layout/'

import product from './product'

export default {
  path: '/product',
  name: '商品管理',
  icon: 'inbox',
  component: Home,
  redirect: '/product/product',
  children: [product]
}
