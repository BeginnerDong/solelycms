/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { Dashboard } from 'views/'

export default {
  path: 'dashboard',
  name: '控制面板',
  icon: 'inbox',
  id:'2-/dashboard/dashboard',
  component: Content,
  meta:{
    children:['3-/dashboard/dashboard/dashboard']
  },
  children: [
    {
      path: 'dashboard',
      name: '控制面板',
      icon: 'reorder',
      id:'3-/dashboard/dashboard/dashboard',
      child_button:[
        { 
          name:'添加',
          id:'/dashboard/dashboard/dashboard-添加'
        },
        { 
          name:'处理',
          id:'/dashboard/dashboard/dashboard-处理'
        },
      ],
      component: Dashboard.Dashboard
    },
  ]
}
