/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { Order } from 'views/'

export default {
  path: 'order',
  name: '订单管理',
  icon: 'inbox',
  id:'2-/order/order',
  component: Content,
  meta:{
    children:['3-/order/order/order']
  },
  children: [
    {
      path: 'order',
      name: '订单列表',
      icon: 'reorder',
      id:'3-/order/order/order',
      component: Order.order
    },
  ]
}
