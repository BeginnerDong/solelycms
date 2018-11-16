/**
 * Created by sailengsi on 2017/5/11.
 */

import { Home } from 'layout/'


import order from './order'

export default {
  path: '/order',
  name: '订单管理',
  icon: 'inbox',
  component: Home,
  redirect: '/order/order',
  children: [
	  order
  ]
}
