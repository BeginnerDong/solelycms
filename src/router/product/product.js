/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { Product } from 'views/'

export default {
  path: 'product',
  name: '商品管理',
  icon: 'inbox',
  component: Content,
  redirect: '/product/product/product',
  children: [
    {
      path: 'product',
      name: '商品列表',
      icon: 'reorder',
      component: Product.Product
    },
    {
      path: 'Coupon',
      name: '优惠券列表',
      icon: 'reorder',
      component: Product.Coupon
    },
    {
      path: 'sku',
      name: 'sku列表',
      icon: 'reorder',
      hide:true,
      component: Product.Sku
    },
    
  ]
}
