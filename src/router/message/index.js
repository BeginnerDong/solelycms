/**
 * Created by sailengsi on 2017/5/11.
 */

import { Home } from 'layout/'

import message from './message'

export default {
  path: '/message',
  name: '留言管理',
  icon: 'inbox',
  id:'1-/message',
  component: Home,
  redirect: '/message/message',
  children: [message]
}
