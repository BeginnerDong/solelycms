/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { ThirdApp } from 'views/'

export default {
  path: 'thirdAppLists',
  name: '用户列表',
  icon: 'inbox',
  component: Content,
  redirect: '/thirdApp/thirdAppLists/thirdAppLists',
  children: [
    {
      path: 'thirdAppLists',
      name: '项目列表',
      icon: 'reorder',
      component: ThirdApp.ThirdApp
    },
    
  ]
}
