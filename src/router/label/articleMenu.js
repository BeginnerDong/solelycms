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
    component: Label.ArticleMenu
  }]
}
