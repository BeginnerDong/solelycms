/**
 * Created by sailengsi on 2017/5/11.
 */

import { Home } from 'layout/'

import Balance from './balance'
import score from './score'
import pay from './pay'

export default {
  path: '/flowLog',
  name: '流水管理',
  icon: 'inbox',
  id:'1-/flowLog',
  component: Home,
  redirect: '/flowLog/balance',
  children: [
	  Balance,
	  pay
  ]
}
