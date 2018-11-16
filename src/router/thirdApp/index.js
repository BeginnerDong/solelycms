/**
 * Created by sailengsi on 2017/5/11.
 */

import { Home } from 'layout/'

import thirdApp from './thirdApp'

export default {
  path: '/thirdApp',
  name: '项目管理',
  icon: 'inbox',
  component: Home,
  redirect: '/thirdApp/thirdAppLists',
  children: [thirdApp]
}
