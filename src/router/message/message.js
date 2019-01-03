/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { Message } from 'views/'

export default {
  path: 'message',
  name: '留言管理',
  icon: 'inbox',
  id:'2-/message/message',
  component: Content,
  meta:{
    children:['3-/message/message/message']
  },
  children: [
    {
      path: 'message',
      name: '留言列表',
      icon: 'reorder',
      id:'3-/message/message/message',
      component: Message.Message
    },
  ]
}
