/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'
import { Flowlog } from 'views/'

export default {
  path: 'pay',
  name: '支付管理',
  icon: 'inbox',
  id:'2-/flowLog/pay',
  component: Content,
  redirect: '/flowLog/pay/pay',
  children: [
    {
      path: 'pay',
      name: '微信支付记录列表',
      icon: 'reorder',
      id:'3-/flowLog/pay/pay',
      component: Flowlog.pay
    },
  ]
}
