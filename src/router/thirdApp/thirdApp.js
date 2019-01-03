/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { ThirdApp } from 'views/'

export default {
  path: 'thirdAppLists',
  name: '用户列表',
  icon: 'inbox',
  id:'2-/thirdApp/thirdAppLists',
  component: Content,
  meta:{
    children:['3-/thirdApp/thirdAppLists/thirdAppLists']
  },
  children: [
    {
      path: 'thirdAppLists',
      name: '项目列表',
      icon: 'reorder',
      id:'3-/thirdApp/thirdAppLists/thirdAppLists',
      component: ThirdApp.ThirdApp
    },
    
  ]
}
