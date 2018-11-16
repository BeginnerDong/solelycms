/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { Order } from 'views/'

export default {
  path: 'order',
  name: '订单管理',
  icon: 'inbox',
  component: Content,
  redirect: '/order/order/order',
  children: [
    {
      path: 'order',
      name: '订单列表',
      icon: 'reorder',
      component: Order.order
    },
  ]
}
