/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { Product } from 'views/'

export default {
  path: 'product',
  name: '商品管理',
  icon: 'inbox',
  id:'2-/product/product',
  component: Content,
  meta:{
    children:['3-/product/product/product','3-/product/product/Coupon','3-/product/product/sku']
  },
  children: [
    {
      path: 'product',
      name: '商品列表',
      icon: 'reorder',
      id:'3-/product/product/product',
      component: Product.Product
    },
    {
      path: 'Coupon',
      name: '优惠券列表',
      icon: 'reorder',
      id:'3-/product/product/Coupon',
      component: Product.Coupon
    },
    {
      path: 'sku',
      name: 'sku列表',
      icon: 'reorder',
      id:'3-/product/product/sku',
      hide: true,
      component: Product.Sku
    }, 
  ]
}