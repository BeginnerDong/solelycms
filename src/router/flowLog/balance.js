/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { Article ,Flowlog} from 'views/'

export default {
  path: 'balance',
  name: '佣金管理',
  icon: 'inbox',
  component: Content,
  redirect: '/flowLog/balance/balance',
  children: [
    {
      path: 'balance',
      name: '佣金列表',
      icon: 'reorder',
      component: Flowlog.Balance
    },
  ]
}
