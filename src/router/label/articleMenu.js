/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import {Label} from 'views/'


export default {
  path: 'articleMenu',
  name: '菜单管理',
  icon: 'inbox',
  component: Content,
  redirect: '/label/articleMenu/articleMenu',
  children: [{
    path: 'articleMenu',
    name: '文章菜单管理',
    icon: 'reorder',
    component: Label.ArticleMenu
  }]
}
