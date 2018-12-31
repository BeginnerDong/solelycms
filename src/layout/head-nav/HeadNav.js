

export default {
  name: 'head-nav',
  data () {
    return {
      dialog: {
        show_access: false,
        show_set: false,
        show_pass: false,
        title: '修改密码',
        user_info: this.$store.state.user.userinfo,

        set_info: {
          login_style: '',
          disabled_update_pass: [],
          select_users: []
        },

        user_info_rules: {
          old_password: [{
            required: true,
            message: '旧密码不能为空！',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '新密码不能为空！',
            trigger: 'blur'
          }, {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else {
                if (this.dialog.user_info.password !== '') {
                  this.$refs.user_info.validateField('password_confirm')
                }
                callback()
              }
            }
          }],
          password_confirm: [{
            required: true,
            message: '确认密码不能为空！',
            trigger: 'blur'
          }, {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.dialog.user_info.password) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            }
          }]
        }
      },
      mainData:[]
    }
  },
  mounted () {
    this.mainData = this.$router.options.routes;
    console.log('mounted',this.mainData);
    
    // this.setDialogInfo('access');

    // this.onGetSetting();
  },
  methods: {

    /**
     * 退出登录
     */

    checkInAuth(item){
      console.log(this.mainData);
      console.log(item);
      //console.log(this.$store.state.user.userinfo.passage_array);
      
      var index = this.$store.state.user.userinfo.passage_array.indexOf(item)
      console.log(index);

      if(index>=0){
        return true;
      }else{
        return false;
      };
      
    },

    logout () {
      this.$confirm('你确定退出登录么?', '确认退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('remove_userinfo').then(() => {
          this.$router.push('/login')
        })
      })
    },

    /**
     * 弹出框-修改密码或者系统设置
     * @param {string} cmditem 弹框类型
     */
    setDialogInfo (cmditem) {
      if (!cmditem) {
        console.log('test')
        this.$message('菜单选项缺少command属性')
        return
      }
      switch (cmditem) {
        case 'info':
          this.$router.push({
            path: '/demo/user/edit',
            query: {
              id: this.$store.state.user.userinfo.id
            }
          })
          break
        case 'pass':
          this.dialog.show_pass = true
          this.dialog.title = '修改密码'
          break
        case 'set':
          this.onGetSetting()
          this.dialog.show_set = true
          this.dialog.title = '系统设置'
          break
        case 'logout':
          this.logout()
          break
      }
    },

    /**
     * 修改密码
     * @param  {object} userinfo 当前修改密码的表单信息
     */
    async updUserPass (userinfo) {
      

          var postData={
            data:{
              login_name:this.dialog[userinfo].login_name,
              password: this.dialog[userinfo].password,
            }
          };

          try{
            var res = await this.$$api_user_update({data: postData});
          }catch(err){
            console.log(err); 
            notify('网络故障','error');
          };
          if(this.$$sCallBack(res)){
            this.dialog.show_pass = false;
          };



          
          
        
    },

    /**
     * 获取系统设置信息
     */
    onGetSetting () {
      // 获取系统设置信息
      if (this.$store.state.user.userinfo.pid === 0) {
        this.$$api_system_getSetting({
          fn: data => {
            if (data.setting_info.disabled_update_pass) {
              data.setting_info.disabled_update_pass = data.setting_info.disabled_update_pass.split(',')
            } else {
              data.setting_info.disabled_update_pass = []
            }
            data.setting_info.login_style = data.setting_info.login_style + ''

            this.dialog.set_info = data.setting_info
          }
        })
      } else {
        this.$message.error('只有管理员才能操作！')
      }
    },

    /**
     * 修改系统设置信息
     */
    onUpdateSetting () {
      // console.log(this.dialog.set_info.login_style);
      // console.log(this.dialog.set_info.disabled_update_pass);
      // console.log(this.dialog.set_info.id);

      this.$$api_system_updateSetting({
        data: {
          id: this.dialog.set_info.id,
          login_style: this.dialog.set_info.login_style,
          disabled_update_pass: this.dialog.set_info.disabled_update_pass && this.dialog.set_info.disabled_update_pass.length ? this.dialog.set_info.disabled_update_pass.join(',') : ''
        },
        fn: data => {
          this.dialog.show_set = false
        }
      })
    }
  }
}
