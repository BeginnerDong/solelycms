/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { Article } from 'views/'

export default {
  path: 'article',
  name: '文章管理',
  icon: 'inbox',
  id:'2-/article/article',
  component: Content,
  redirect: '/article/article/article',
  children: [
    {
      path: 'article',
      name: '文章列表',
      icon: 'reorder',
      id:'3-/article/article/article',
      component: Article.Article
    },
  ]
}
