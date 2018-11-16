/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'
import {Label} from 'views/'

export default {
  path: 'subjectMenu',
  name: '商品类别管理',
  icon: 'inbox',
  component: Content,
  redirect: '/label/subjectMenu/areaMenu',
  children: [
    {
      path: 'areaMenu',
      name: '商品分类管理',
      icon: 'reorder',
      component: Label.AreaMenu
    },
    {
      path: 'sku',
      name: 'sku标签管理',
      icon: 'reorder',
      component: Label.Sku
    },
  ]
}
