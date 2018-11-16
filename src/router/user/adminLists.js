/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { User } from 'views/'

export default {
  path: 'adminLists',
  name: '用户列表',
  icon: 'inbox',
  component: Content,
  redirect: '/user/adminLists/adminLists',
  children: [
    {
      path: 'adminLists',
      name: '管理员列表',
      icon: 'reorder',
      component: User.AdminLists
    },

    {
      path: 'userOne',
      name: '员工列表',
      icon: 'reorder',
      component: User.UserOne
    },

    {
      path: 'user',
      name: '用户列表',
      icon: 'reorder',
      component: User.User
    },
  ]
}
