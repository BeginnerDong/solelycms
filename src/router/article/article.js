/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { Article } from 'views/'

export default {
  path: 'article',
  name: '文章管理',
  icon: 'inbox',
  component: Content,
  redirect: '/article/article/article',
  children: [
    {
      path: 'article',
      name: '文章列表',
      icon: 'reorder',
      component: Article.Article
    },
  ]
}
