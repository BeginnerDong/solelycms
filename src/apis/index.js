/**
 * Created by sailengsi on 2017/5/11.
 */

/**
 * 导出所有模块需要用到接口
 * 一级属性：模块名
 * 一级属性中的方法：当前模块需要用的接口
 * @type {Object}
 */

import user from './user/'
import userInfo from './userInfo/'
import article from './article/'
import order from './order/'
import system from './system/'
import test from './test/'
import label from './label/'
import product from './product/'
import flowLog from './flowLog/'
import thirdApp from './thirdApp/'
import sku from './sku/'
import message from './message/'

export default [
  {
    module: 'user',
    name: '用户管理',
    list: user
  },
  {
    module: 'userInfo',
    name: '用户信息管理',
    list: userInfo
  }, 
  {
    module: 'article',
    name: '文章管理',
    list: article
  },
  {
    module: 'product',
    name: '商品管理',
    list: product
  }, 
  {
    module: 'order',
    name: '订单管理',
    list: order
  }, 
  {
    module: 'system',
    name: '系统设置',
    list: system
  }, 
  {
    module: 'test',
    name: '测试模块',
    list: test
  },
  {
    module: 'label',
    name: 'label管理',
    list: label
  },
  {
    module: 'flowLog',
    name: 'flowLog管理',
    list: flowLog
  },
  {
    module: 'thirdApp',
    name: 'thirdApp管理',
    list: thirdApp
  },
  {
    module: 'order',
    name: 'order管理',
    list: order
  },
  {
    module: 'sku',
    name: 'sku管理',
    list: sku
  },
  {
    module: 'message',
    name: 'message管理',
    list: message
  }
]
