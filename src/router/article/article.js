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
  meta:{
    children:['3-/article/article/article']
  },
  children: [
    {
      path: 'article',
      name: '文章列表',
      icon: 'reorder',
      id:'3-/article/article/article',
      child_button:[
        { 
          name:'添加',
          id:'/article/article/article-添加'
        },
        { 
          name:'编辑',
          id:'/article/article/article-编辑'
        },
        { 
          name:'删除选中',
          id:'/article/article/article-删除选中'
        },               
      ],
      component: Article.Article
    },
  ]
}
