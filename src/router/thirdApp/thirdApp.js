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
      child_button:[
        { 
          name:'添加',
          id:'/thirdApp/thirdAppLists/thirdAppLists-添加'
        },
        { 
          name:'编辑',
          id:'/thirdApp/thirdAppLists/thirdAppLists-编辑'
        },
        { 
          name:'编辑分销规则',
          id:'/thirdApp/thirdAppLists/thirdAppLists-编辑分销规则'
        },        
        { 
          name:'删除选中',
          id:'/thirdApp/thirdAppLists/thirdAppLists-删除选中'
        },       
      ],
      component: ThirdApp.ThirdApp
    },
  ]
}
