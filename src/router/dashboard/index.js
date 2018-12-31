
import { Home } from 'layout/'

import dashboard from './dashboard'

export default {
  path: '/dashboard',
  name: '控制面板',
  icon: 'inbox',
  id:'1-/dashboard',
  component: Home,
  redirect: '/dashboard/dashboard',
  children: [dashboard]
}
