/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'
import {Label} from 'views/'

export default {
  path: 'subjectMenu',
  name: '商品类别管理',
  icon: 'inbox',
  id:'2-/label/subjectMenu',
  component: Content,
  meta:{
    children:['3-/label/subjectMenu/areaMenu','3-/label/subjectMenu/sku']
  },
  children: [
    {
      path: 'areaMenu',
      name: '商品分类管理',
      icon: 'reorder',
      id:'3-/label/subjectMenu/areaMenu',
      component: Label.AreaMenu
    },
    {
      path: 'sku',
      name: 'sku标签管理',
      icon: 'reorder',
      id:'3-/label/subjectMenu/sku',
      component: Label.Sku
    },
  ]
}
