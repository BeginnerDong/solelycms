/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { Message } from 'views/'

export default {
  path: 'message',
  name: '留言管理',
  icon: 'inbox',
  component: Content,
  redirect: '/message/message/message',
  children: [
    {
      path: 'message',
      name: '留言列表',
      icon: 'reorder',
      component: Message.Message
    },
  ]
}
