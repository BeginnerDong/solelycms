/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'
import { Flowlog } from 'views/'

export default {
  path: 'pay',
  name: '支付管理',
  icon: 'inbox',
  component: Content,
  redirect: '/flowLog/pay/pay',
  children: [
    {
      path: 'pay',
      name: '微信支付记录列表',
      icon: 'reorder',
      component: Flowlog.pay
    },
  ]
}
