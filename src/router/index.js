/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

// import { Home } from 'layout/'
import { Login } from 'views/'

import Adv from './adv/'
import Function from './function/'
import Demo from './demo/'
import components from './components/'
import User from './user/'
import Label from './label/'
import Article from './article/'
import Product from './product/'
import FlowLog from './flowLog/'
import ThirdApp from './thirdApp/'
import Order from './order/'
import Message from './message/'

const router = new Router({


  routes: [
    {
      path: '/',
      name: 'Hello',
      hidden: true,
      meta: {
        noRequireAuth: true,
      },
      redirect (to) {
        return 'login'
      }
    }, 
    {
      path: '/login',
      name: '登录',
      hidden: true,
      
      meta: {
        noRequireAuth: true,
      },
      component: Login
    },

    User,
    Label,
    Article,
    Product,
    FlowLog,
    ThirdApp,
    Order,
    Message
  ]
});

router.beforeEach((to, from, next) => {
    console.log('routerJs');
    console.log(to);
    store.dispatch('update_tabs', {
      route: to
    });




    if (to.matched.some(r => r.meta.noRequireAuth)) {

        next();

    }else{
        console.log(store.getters.getToken);
        if (store.getters.getToken) {
            console.log(123);
            next();
        }else {
            console.log(456)
            next({
                path: '/login',
                noRequireAuth: true,
            })
        }
    }
});

export default router
