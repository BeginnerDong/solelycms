/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'
import { Article ,Flowlog} from 'views/'

export default {
  path: 'score',
  name: '积分管理',
  icon: 'inbox',
  id:'2-/flowLog/score',
  component: Content,
  redirect: '/flowLog/score/score',
  children: [
    {
      path: 'score',
      name: '积分记录列表',
      icon: 'reorder',
      id:'3-/flowLog/score/score',
      component: Flowlog.Score
    },
  ]
}
