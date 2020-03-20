export default {
  name: 'user',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,

      table_arguments:{
        height:'70%',
        row_key:'id',
        tree_props:'',
        default_expand_all:false,
        expand:false,
        selection:true,
        cell_style:{}
      },
      fields: [
        {
          key: 'id',
          label: 'ID',
          application:[],
          componentName:'sls-input',
          listType:'normal',
          width:50
        },
        {
          key: 'user_no',
          label: '用户NO',
          application:[],
          componentName:'sls-input',
          listType:'normal',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入用户NO',
            clearable:true,
            defaultValue:'',
            optionDataName:'',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.user_no = val;
              }else{
                delete self.searchItem.user_no;
              };
              self.initMainData();
            },
          },
        },
        {
          key: 'nickname',
          label: '昵称',
          application:['编辑账号','添加账号'],
          componentName:'sls-input',
          listType:'normal',
          placeholder:'请输入昵称',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入昵称',
            changeFunc:function(e,self){
              if(e.target._value){
                self.searchItem.nickname = ['LIKE',['%'+e.target._value+'%']];
              }else{
                delete self.searchItem.nickname;
              };
              self.initMainData();
            },
          }
        },
        {
          key: 'mainImg',
          label: '头像',
          application:['编辑账号','添加账号'],
          dialogStyle:'width:100%;',
          customSlot:'mainImg',
          componentName:'upload',
          listType:'normal',
          limit:1,
        },
        {
          key: "name",
          label: '用户姓名',
          application:['添加信息','编辑信息'],
          componentName:'sls-input',
          listType:'normal',
          formatter:function(val){
            return val.info.name
          },
          placeholder:'请输入用户姓名',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入用户姓名',
            changeFunc:function(e,self){
              if(e.target._value){
                self.UserInfo.searchItem.name = ['LIKE',['%'+e.target._value+'%']]
              }else{
                delete self.UserInfo.searchItem.name
              };
              self.beforeSearch('UserInfo');
            },
          },
        },
        {
          key: "phone",
          label: '电话',
          application:['添加信息','编辑信息'],
          componentName:'sls-input',
          listType:'normal',
          formatter:function(val){
            return val.info.phone
          },
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入电话',
            changeFunc:function(e,self){
              if(e.target._value){
                self.UserInfo.searchItem.phone = ['LIKE',['%'+e.target._value+'%']]
              }else{
                delete self.UserInfo.searchItem.phone
              };
              self.beforeSearch('UserInfo');
            },
          },
        },
        {
          key: "status",
          label: '状态',
          application:[''],
          componentName:'sls-select',
          optionsName:'statusOptions',
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          formatter:function(val){
            if(val.status==1){
              return '启用';
            }else{
              return '关闭';
            };
          }
        },
        {
          key: 'create_time',
          label: '创建时间',
          listType:'normal',
          placeholder:'请选择创建时间',
          header_search:{
            componentName:'sls-datetime',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择创建时间',
            changeFunc:function(value,self){
              if(!value){
                delete self.searchItem.create_time;
              }else{
                self.searchItem.create_time = ['between',value = value.map(function(e){return e/1000;})]
              };
              self.initMainData();
            },
          },
        },
        {
          label: '操作',
          listType:'deal',
          width:200
        },
      ],
      // 按钮配置
      btn_info: [

          {
            type:'info',
            icon:'edit',
            size:'mini',
            position:'list',
            text:function(data){
              if(data){
                return JSON.stringify(data.info)!= '[]'?'编辑信息':'添加信息'
              }else{
                return ['编辑信息','添加信息'];
              }
            },
            func:{
              apiName:function(self){
                return JSON.stringify(self.formData.info) != "[]" ?"api_userInfoUpdate":"api_userInfoAdd"
              },
              formData:function(self){
                var data = self.formData.info;
                return data
              },
              postData:function(self){
                if(self.btnName=='编辑信息'){
                  var postData={
                    searchItem:{
                      id:self.orginFormData.info.id,
                      user_no:self.orginFormData.info.user_no
                    },
                    data:self.submitData
                  }
                }else if(self.btnName=='添加信息'){
                  var postData={
                    data:self.submitData
                  };
                };
                postData.data.user_no=self.orginFormData.user_no;
                return postData;
              }
            },
          },
          {
            type:'info',
            icon:'edit',
            size:'mini',
            position:'list',
            text:function(data){
              return '编辑账号'
            },
            func:{
              apiName:function(self){
                return "api_userUpdate"
              },
              formData:function(self){
                return self.formData
              },
              postData:function(self){
                var postData = {
                  searchItem:{
                    id:self.formData.id,
                    user_no:self.formData.user_no,
                  },
                  data:self.submitData
                }
                return postData;
              }
            },
          },
          {
            type:'danger',
            icon:'delete',
            size:'medium',
            funcType:'submit',
            position:'header',
            text:function(data){
              return '删除选中'
            },
            func:{
              apiName:function(self){
                return "api_userUpdate"
              },
              postData:function(self){
                var deleteArray = [];
                for (var i = 0; i < self.selectionArray.length; i++) {
                  deleteArray.push(self.selectionArray[i].id);
                };
                var postData = {
                  searchItem:{
                    id:['in',deleteArray],
                    user_type:0
                  },
                  data:{
                    status:-1
                  }
                };
                return postData;
              }
            },
          },
          {
            type:'info',
            icon:'edit',
            size:'medium',
            position:'header',
            text:function(data){
              return '添加账号'
            },
            func:{
              apiName:function(self){
                return "api_userAdd"
              },
              formData:function(self){
                var data = {
                  login_name:'',
                  password:'',
                };
                return data
              },
              postData:function(self){
                self.submitData.user_type = 0;
                var postData={
                  data:self.submitData
                };
                return postData;
              }
            },
          },
      ],

      paginate: {
        count: 0,
        currentPage: 1,
        pagesize:10,
        is_page:true,
        page_sizes: [10, 30, 60, 90],
        layout: 'total, sizes, prev, pager, next, jumper',
      },
      searchItem:{
        user_type:0
      },
      optionData:{
        labelOptions:[],
        statusOptions:[
          {
            text: '启用',
            value: 1
          },
          {
            text: '禁用',
            value: -1
          },
        ],
      },
      otherData:{
      },
      UserInfo:{
        tableName:'UserInfo',
        searchItem:{
        },
        key:'user_no',
        middleKey:'user_no',
        condition:'in',
      },
      dialog:{
        formLabelWidth:'auto',
        dialogFormVisible:false,
        title:'用户'
      },
      getBefore:{},
      formLabelWidth:'auto',
      btnName:'',
      formData:{},
      btnNow:{},
      submitData:{},
      orginFormData:{},
      selectionArray:[]

    }

  },

  mounted () {
    this.init()
  },
  computed: {
    token: function () {
      return this.$store.getters.getToken
    }
  },
  watch: {
    $route (to, from) {
      console.log(to)
      this.init()
    },
    token(){

    }
  },
  methods: {

    /**
     * 初始化
     */
    init() {
      this.initMainData()
    },

    /**
     * 列表主函数
     */
    async initMainData() {

      const self = this;
      const postData = {};
      postData.paginate = self.$$cloneForm(self.paginate);
      postData.token = self.$store.getters.getToken;
      if (self.searchItem) {
        postData.searchItem = self.$$cloneForm(self.searchItem)
      };
      if(JSON.stringify(self.getBefore) != "{}"){
        postData.getBefore = self.$$cloneForm(self.getBefore);
      };
      var res =  await self.$$api_userGet({data: postData});

      self.mainData = res.info.data;
      self.paginate.count = res.info.total;

    },


    beforeSearch(TableName){

      const self = this;
      if(JSON.stringify(self.getBefore) == "{}"&&JSON.stringify(self[TableName]['searchItem']) != "{}"){
        self.getBefore = {
          [TableName]:self[TableName],
        };
      }else{
        if(JSON.stringify(self[TableName]['searchItem']) == "{}"){
          self.getBefore = {};
        }else{
          self.getBefore[TableName] = self[TableName];
        };
      };
      self.initMainData();

    },


    filtersChange(params){
      const self = this;
      console.log(params);
      for (var key in params) {
        self.searchItem[key] = params[key][0]
      }
      console.log(self.searchItem)
      self.initMainData();
    },

    async header_search_fieldChange(Object){
      const self = this;
      if(Object.func){
        var res = await Object.func(Object.value,self);
        if(Object.callbak){
          Object.callbak(res);
        };
      }else{
        Object.field.header_search['changeFunc'](Object.value,self);
      };
    },

    pageChange(val){
      const self = this;
      self.paginate[val[0]] = val[1];
      self.initMainData();
    },

    onClickBtn(val){

      const self = this;
      self.submitData = {};
      self.formData = val[1];
      self.btnName = val[0];
      self.formData = val[2].func.formData?self.$$cloneForm(val[2].func.formData(self)):{};
      self.orginFormData = val[1];
      self.btnNow = val[2];
      if(!val[2].funcType){
        self.dialog.dialogFormVisible = true;
      }else if(val[2].funcType=='func'){
        val[2].func.func(this);
      }else if(val[2].funcType=='submit'){
        self.submit();
      };
    },

    async dialog_fieldChange(Object){
      const self = this;
      self.formData[Object.field.key] = Object.value;
      self.submitData[Object.field.key] = Object.value;
    },

    async submit(){
      const self = this;

      this.$confirm('是否确定此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
      	var postData = self.$$cloneForm(self.btnNow.func.postData(self));
        if(!postData){
          self.$$notify('数据故障','fail');
          return;
        };


        var res = await self['$$'+self.btnNow.func.apiName(self)]({data: postData});
        if(res){
          if(self.$$sCallBack(res)){
            self.dialog.dialogFormVisible = false;
            if(self.btnNow.func.callback){
              self.btnNow.func.callback(self);
            }else{
              self.initMainData();
            };
          };
        };
      }).catch((e) => {
        console.log(e)
        self.$message({
          type: 'info',
          message: '故障'
        });
      });
    },

    onSelectionChange(val){
      const self = this;
      self.selectionArray = self.$$cloneForm(val);
      console.log('self.selectionArray',self.selectionArray);
    }

  },


}
