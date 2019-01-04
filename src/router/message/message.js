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
      child_button:[
        { 
          name:'编辑',
          id:'/message/message/message-编辑'
        },
        { 
          name:'删除选中',
          id:'/message/message/message-删除选中'
        },       
      ],
      component: Message.Message
    },
  ]
}
