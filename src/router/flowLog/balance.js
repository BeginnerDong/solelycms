/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { Article ,Flowlog} from 'views/'

export default {
  path: 'balance',
  name: '佣金管理',
  icon: 'inbox',
  id:'2-/flowLog/balance',
  component: Content,
  redirect: '/flowLog/balance/balance',
  children: [
    {
      path: 'balance',
      name: '佣金列表',
      icon: 'reorder',
      id:'3-/flowLog/balance/balance',
      component: Flowlog.Balance
    },
  ]
}
