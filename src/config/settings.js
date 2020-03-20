var gbs = {
  //host: '/slsAdminApi', // 接口根地址。本地代理到slsadmin.api.sls.com,线上使用的是Nginx代理
  host: 'http://106.12.155.217/api/public/index.php/api/v1/',
  db_prefix: 'solely', // 本地存储的key
  // 状态码字段
  api_status_key_field: 'solely_code',
  // 状态码value
  api_status_value_field: 100000,
  // 存放数据的字段
  api_data_field: '',
  api_custom: {
    404: function (res) {
      this.$store.dispatch('remove_userinfo').then(() => {
        this.$alert(res.status + ',' + res.msg + '！', '登录错误', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/login')
          }
        })
      })
    }
  },
  menu:[
    {
      id:'0',
      name:'控制面板',
      router:'/home/dashboard',
      button:['添加','添加任务','编辑任务'],
      hasButton:[],
      isShow:true
    },
    {
      id:'1',
      name:'用户管理',
      icon: 'inbox',
      isShow:true,
      children:[
        {
          id:'10',
          name:'管理员列表',
          router:'/home/adminLists',
          icon: 'reorder',
          isShow:true,
          button:['编辑账号','管理权限','添加账号','删除选中','编辑信息','添加信息'],
          hasButton:[]
        },
        {
          id:'11',
          name:'权限管理',
          router:'/home/access',
          icon: 'reorder',
          isShow:false,
          button:['返回','权限全选','更新权限'],
          hasButton:[]
        },
        {
          id:'12',
          name:'员工管理',
          router:'/home/staff',
          icon: 'reorder',
          isShow:true,
          button:['编辑账号','管理权限','添加账号','删除选中','编辑信息','添加信息'],
          hasButton:[]
        },
        {
          id:'13',
          name:'配置列表',
          router:'/home/thirdApp',
          icon: 'reorder',
          isShow:true,
          button:['编辑','添加','删除选中'],
          hasButton:[]
        },
        {
          id:'14',
          name:'角色列表',
          router:'/home/role',
          icon: 'reorder',
          isShow:true,
          button:['编辑','添加','删除选中','管理权限'],
          hasButton:[]
        },
        {
          id:'15',
          name:'用户列表',
          router:'/home/user',
          icon: 'reorder',
          isShow:true,
          button:['编辑账号','添加账号','删除选中','编辑信息','添加信息'],
          hasButton:[]
        },
      ]
    },
    {
      id:'2',
      name:'内容管理',
      icon: 'inbox',
      isShow:true,
      children:[
        {
          id:'21',
          name:'文章菜单管理',
          router:'/home/articleLabel',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'22',
          name:'文章管理',
          router:'/home/article',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'23',
          name:'消息管理',
          router:'/home/message',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        }
      ]
    },

    {
      id:'3',
      name:'商品管理',
      icon: 'inbox',
      isShow:true,
      children:[
        {
          id:'31',
          name:'商品类别',
          router:'/home/productLabel',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'32',
          name:'商品管理',
          router:'/home/product',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加','SKU管理'],
          hasButton:[]
        },
        {
          id:'33',
          name:'SKU类别',
          router:'/home/skuLabel',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'34',
          name:'SKU管理',
          router:'/home/sku',
          icon: 'reorder',
          isShow:false,
          button:['编辑','删除选中','添加','返回'],
          hasButton:[]
        },
        {
          id:'35',
          name:'优惠券管理',
          router:'/home/coupon',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
      ]
    },

    {
      id:'4',
      name:'订单管理',
      icon: 'inbox',
      isShow:true,
      children:[
        {
          id:'41',
          name:'商品订单',
          router:'/home/order',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
      ]
    },

    {
      id:'5',
      name:'流水管理',
      icon: 'inbox',
      isShow:true,
      children:[
        {
          id:'51',
          name:'支付流水',
          router:'/home/pay',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'52',
          name:'余额流水',
          router:'/home/balance',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
        {
          id:'53',
          name:'积分流水',
          router:'/home/score',
          icon: 'reorder',
          isShow:true,
          button:['编辑','删除选中','添加'],
          hasButton:[]
        },
      ]
    }
  ]
}

var cbs = {
  /**
   * ajax请求成功，返回的状态码不是200时调用
   * @param  {object} err 返回的对象，包含错误码和错误信息
   */
  statusError (err) {
    console.log('err')
    if (err.status !== 404) {
      this.$message({
        showClose: true,
        message: '返回错误：' + err.msg,
        type: 'error'
      })
    } else {
      this.$store.dispatch('remove_userinfo').then(() => {
        this.$alert(err.status + ',' + err.msg + '！', '登录错误', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/login')
          }
        })
      })
    }
  },

  /**
   * ajax请求网络出错时调用
   */
  requestError (err) {
    this.$message({
      showClose: true,
      message: '请求错误：' + (err.response ? err.response.status : '') + ',' + (err.response ? err.response.statusText : ''),
      type: 'error'
    })
  }
}

export {
  gbs,
  cbs
}
