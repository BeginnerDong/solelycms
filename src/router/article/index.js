/**
 * Created by sailengsi on 2017/5/11.
 */

import { Home } from 'layout/'

import article from './article'

export default {
  path: '/article',
  name: '文章管理',
  icon: 'inbox',
  component: Home,
  redirect: '/article/article',
  children: [article]
}
