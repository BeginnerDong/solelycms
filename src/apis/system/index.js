/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 系统设置
 * @type {Object}
 */
export default [
  {
    name: '获取系统设置信息',
    method: 'getSetting',
    path: '/System/getSetting',
    type: 'get'
  },
  {
    name: '修改系统设置信息',
    method: 'updateSetting',
    path: '/System/updateSetting',
    type: 'post'
  },
  {
    name: '上传文件',
    method: 'uploadImg',
    path: '/Base/FtpFile/upload',
    type: 'post'
  },
  {
    name: '获取微信公众号素材',
    method: 'getSource',
    path: '/WeFunc/Source/getSource',
    type: 'post'
  }
]
