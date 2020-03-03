
export default [

  //特殊
  {
    name: '登录',
    method: 'login',
    path: '/Func/Common/loginByUp',
    tokenFlag:'false',
    type: 'post'
  },
  {
    name: '上传图片',
    method: 'uploadImg',
    path: '/Base/FtpFile/upload',
    type: 'post'
  },
  {
    name: '获取微信公众号素材',
    method: 'getSource',
    path: '/WeFunc/Source/getSource',
    type: 'post'
  },
  {
    name: '物理删除图片',
    method: 'delImg',
    path: '/Project/Solely/realDelImg',
    type: 'post'
  },

  //用户
  {
    name: '获取用户',
    method: 'userGet',
    path: '/Base/User/get',
    type: 'post'
  },
  {
    name: '删除用户',
    method: 'userDelete',
    path: '/Base/User/delete',
    type: 'post'
  },
  {
    name: '更新用户',
    method: 'userUpdate',
    path: '/Base/User/update',
    type: 'post'
  },
  {
    name: '新增用户',
    method: 'userAdd',
    path: '/Base/User/add',
    type: 'post'
  },

  //用户信息
  {
    name: '更新用户信息',
    method: 'userInfoUpdate',
    path: '/Common/UserInfo/update',
    type: 'post'
  },
  {
    name: '新增用户信息',
    method: 'userInfoAdd',
    path: '/Common/UserInfo/add',
    type: 'post'
  },
  {
    name: '获取userInfo信息',
    method: 'userInfoGet',
    path: 'Common/UserInfo/get',
    type: 'post',
  },

  //权限
  {
    name: '获取权限列表',
    method: 'authGet',
    path: '/Project/Solely/getAuth',
    type: 'post'
  },
  {
    name: '更新权限',
    method: 'updateAuth',
    path: '/Project/Solely/setAuth',
    type: 'post'
  },

  //文章
  {
    name: '获取文章列表',
    method: 'articleGet',
    path: '/Common/Article/get',
    type: 'post'
  },
  {
    name: '添加文章',
    method: 'articleAdd',
    path: '/Common/Article/add',
    type: 'post'
  },
  {
    name: '编辑文章',
    method: 'articleUpdate',
    path: '/Common/Article/update',
    type: 'post'
  },
  {
    name: '删除文章',
    method: 'articleDelete',
    path: '/Common/Article/delete',
    type: 'post'
  },

  //标签
  {
    name: '获取label信息',
    method: 'labelGet',
    path: '/Common/Label/get',
    type: 'post',
  },
  {
    name: '新增label信息',
    method: 'labelAdd',
    path: '/Common/Label/add',
    type: 'post',
  },
  {
    name: '删除label信息',
    method: 'labelDelete',
    path: '/Common/Label/delete',
    type: 'post',
  },
  {
    name: '更新label信息',
    method: 'labelUpdate',
    path: '/Common/Label/update',
    type: 'post',
  },

  //项目
  {
    name: '获取thirdApp信息',
    method: 'thirdAppGet',
    path: 'Base/ThirdApp/get',
    type: 'post',
  },
  {
    name: '增加thirdApp信息',
    method: 'thirdAppAdd',
    path: 'Base/ThirdApp/add',
    type: 'post',
  },
  {
    name: '更新thirdApp信息',
    method: 'thirdAppUpdate',
    path: 'Base/ThirdApp/update',
    type: 'post',
  },
  {
    name: '删除thirdApp信息',
    method: 'thirdAppDelete',
    path: 'Base/ThirdApp/delete',
    type: 'post',
  },

  //角色
  {
    name: '获取角色信息',
    method: 'roleGet',
    path: 'Common/Role/get',
    type: 'post',
  },
  {
    name: '增加角色信息',
    method: 'roleAdd',
    path: 'Common/Role/add',
    type: 'post',
  },
  {
    name: '更新角色信息',
    method: 'roleUpdate',
    path: 'Common/Role/update',
    type: 'post',
  },
  {
    name: '删除角色信息',
    method: 'roleDelete',
    path: 'Common/Role/delete',
    type: 'post',
  },

  //信息
  {
    name: '获取message信息',
    method: 'messageGet',
    path: 'Common/Message/get',
    type: 'post',
  },
  {
    name: '增加message信息',
    method: 'messageAdd',
    path: 'Common/Message/add',
    type: 'post',
  },
  {
    name: '更新message信息',
    method: 'messageUpdate',
    path: 'Common/Message/update',
    type: 'post',
  },
  {
    name: '删除message信息',
    method: 'messageDelete',
    path: 'Common/Message/delete',
    type: 'post',
  },

  //优惠券
  {
    name: '获取优惠券',
    method: 'couponGet',
    path: 'Common/Coupon/get',
    type: 'post',
  },
  {
    name: '增加优惠券',
    method: 'couponAdd',
    path: 'Common/Coupon/add',
    type: 'post',
  },
  {
    name: '更新优惠券',
    method: 'couponUpdate',
    path: 'Common/Coupon/update',
    type: 'post',
  },
  {
    name: '删除优惠券',
    method: 'couponDelete',
    path: 'Common/Coupon/delete',
    type: 'post',
  },

  //流水
  {
    name: '获取流水',
    method: 'flowLogGet',
    path: 'Common/FlowLog/get',
    type: 'post',
  },
  {
    name: '增加流水',
    method: 'flowLogAdd',
    path: 'Common/FlowLog/add',
    type: 'post',
  },
  {
    name: '更新流水',
    method: 'flowLogUpdate',
    path: 'Common/FlowLog/update',
    type: 'post',
  },
  {
    name: '删除流水',
    method: 'flowLogDelete',
    path: 'Common/FlowLog/delete',
    type: 'post',
  },

  //订单
  {
    name: '获取订单',
    method: 'orderGet',
    path: 'Common/Order/get',
    type: 'post',
  },
  {
    name: '更新订单',
    method: 'orderUpdate',
    path: 'Common/Order/update',
    type: 'post',
  },
  {
    name: '删除订单',
    method: 'orderDelete',
    path: 'Common/Order/delete',
    type: 'post',
  },

  //产品
  {
    name: '获取产品',
    method: 'productGet',
    path: 'Common/Product/get',
    type: 'post',
  },
  {
    name: '增加产品',
    method: 'productAdd',
    path: 'Common/Product/add',
    type: 'post',
  },
  {
    name: '更新产品',
    method: 'productUpdate',
    path: 'Common/Product/update',
    type: 'post',
  },
  {
    name: '删除产品',
    method: 'productDelete',
    path: 'Common/Product/delete',
    type: 'post',
  },

  //SKU
  {
    name: '获取SKU',
    method: 'skuGet',
    path: 'Common/Sku/get',
    type: 'post',
  },
  {
    name: '增加SKU',
    method: 'skuAdd',
    path: 'Common/Sku/add',
    type: 'post',
  },
  {
    name: '更新SKU',
    method: 'skuUpdate',
    path: 'Common/Sku/update',
    type: 'post',
  },
  {
    name: '删除SKU',
    method: 'skuDelete',
    path: 'Common/Sku/delete',
    type: 'post',
  },

  //微信账号
  {
    name: '获取微信账号',
    method: 'wechatGet',
    path: 'Common/Wechat/get',
    type: 'post',
  },
  {
    name: '增加微信账号',
    method: 'wechatAdd',
    path: 'Common/Wechat/add',
    type: 'post',
  },
  {
    name: '更新微信账号',
    method: 'wechatUpdate',
    path: 'Common/Wechat/update',
    type: 'post',
  },
  {
    name: '删除微信账号',
    method: 'wechatDelete',
    path: 'Common/Wechat/delete',
    type: 'post',
  },

  //微信模板
  {
    name: '获取微信模板',
    method: 'wxTemplateGet',
    path: 'Common/WxTemplate/get',
    type: 'post',
  },
  {
    name: '增加微信模板',
    method: 'wxTemplateAdd',
    path: 'Common/WxTemplate/add',
    type: 'post',
  },
  {
    name: '更新微信模板',
    method: 'wxTemplateUpdate',
    path: 'Common/WxTemplate/update',
    type: 'post',
  },
  {
    name: '删除微信模板',
    method: 'wxTemplateDelete',
    path: 'Common/WxTemplate/delete',
    type: 'post',
  },

  //访问信息
  {
    name: '添加visitor信息',
    method: 'visitorLogsAdd',
    path: 'Project/Solely/addVisitorInfo',
    type: 'post',
  },
  {
    name: '获取visitor信息',
    method: 'visitorLogsGet',
    path: 'Common/VisitorLogs/get',
    type: 'post',
  },


]
