/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { User } from 'views/'

export default {
  path: 'adminLists',
  name: '用户列表',
  icon: 'inbox',
  id:'2-/user/adminLists',
  component: Content,
  meta:{
    children:['3-/user/adminLists/adminLists','3-/user/adminLists/userOne','3-/user/adminLists/user']
  },
  children: [
    {
      path: 'adminLists',
      name: '管理员列表',
      id:'3-/user/adminLists/adminLists',
      icon: 'reorder',
      component: User.AdminLists
    },
    {
      path: 'userOne',
      name: '员工列表',
      icon: 'reorder',
      id:'3-/user/adminLists/userOne',
      component: User.UserOne
    },

    {
      path: 'user',
      name: '用户列表',
      icon: 'reorder',
      id:'3-/user/adminLists/user',
      child_button:[
        { 
          name:'添加信息',
          id:'/user/adminLists/user-添加信息'
        },
        { 
          name:'编辑信息',
          id:'/user/adminLists/user-编辑信息'
        },
        { 
          name:'编辑账号',
          id:'/user/adminLists/user-编辑账号'
        }
      ],
      component: User.User
    },

    {
      path: 'access',
      hide: true,
      name: '权限管理',
      icon: 'reorder',
      id:'3-/user/adminLists/access',
      meta:{
        application:['notInTab','notInAuth']
      },
      component: User.Access
    },
  ]
}
