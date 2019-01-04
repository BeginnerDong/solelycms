/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import {Label} from 'views/'


export default {
  path: 'articleMenu',
  name: '菜单管理',
  icon: 'inbox',
  id:'2-/label/articleMenu',
  component: Content,
  meta:{
    children:['3-/label/articleMenu/articleMenu']
  },
  children: [{
    path: 'articleMenu',
    name: '文章菜单管理',
    icon: 'reorder',
    id:'3-/label/articleMenu/articleMenu',
    child_button:[
      { 
        name:'添加',
        id:'/label/articleMenu/articleMenu-添加'
      },
      { 
        name:'编辑',
        id:'/label/articleMenu/articleMenu-编辑'
      },
      { 
        name:'删除选中',
        id:'/label/articleMenu/articleMenu-删除选中'
      },       
    ],
    component: Label.ArticleMenu
  }]
}
