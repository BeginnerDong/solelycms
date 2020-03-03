export default {
  name: 'sign',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      card_arguments:{

        row_key:'id',
        tree_props:{
          children: 'child',
          child: 'child',
          hasChildren:'child'
        },
        default_expand_all:false,
        expand:false,
        selection:true,
        cell_style:{},
        loading:true,
        style:'width:20%;float: left;margin:10px 15px;text-align:left;height:200px'
      },
      fields: [
        {
          key: 'id',
          label: 'ID',
          application:[],
          componentName:'sls-input',
          listType:'normal',
        },

        {
          key: 'behavior',
          label: '是否迟到',
          application:['编辑'],
          formatter:function(val,tests){
            var testArray = ['正常','迟到','早退'];
            return testArray[val.behavior];
          },
          componentName:'sls-select',
          optionsName:'behaviorOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          isHide:function(self){
            if(self.dialog&&self.$store.getters.getUserinfo.primary_scope<40){
              return true;
            }else{
              return false;
            }
          },
          placeholder:'请选择类型',
          header_search:{
            componentName:'sls-select',
            optionsName:'behaviorOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择类型',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.behavior = val;
              }else{
                delete self.searchItem.behavior;
              };
              self.initMainData(true);
            },
          }
        },
        {
          key: 'num',
          label: '状态',
          application:['编辑','添加'],
          formatter:function(val,tests){
            var testArray = ['签到','签退'];
            return testArray[val.num];
          },
          componentName:'sls-select',
          optionsName:'numOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          placeholder:'请选择状态',
          header_search:{
            componentName:'sls-select',
            optionsName:'numOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择状态',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.num = val;
              }else{
                delete self.searchItem.num;
              };
              self.initMainData(true);
            },
          }
        },
        {
          key: 'user_no',
          label: '员工',
          application:['编辑','添加'],
          customSlot:'user_no',
          componentName:'sls-select',
          optionsName:'userOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'name',
            value: 'user_no',
          },
          placeholder:'请选择员工',
          width:100,
          isHide:function(self){
            if(self.$store.getters.getUserinfo.primary_scope<40
            ||(self.dialog&&self.btnNow.text(self.orginFormData)=='添加'&&self.$store.getters.getUserinfo.primary_scope==40)){
              return true;
            }else{
              return false;
            }
          },
          header_search:{
            componentName:'sls-select',
            optionsName:'userOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择员工',
            changeFunc:function(val,self){
              if(val){
                if(val=='test'){
                  self.searchItem.user_no = '';
                }else{
                  self.searchItem.user_no = val;
                };

              }else{
                delete self.searchItem.user_no;
              };
              self.initMainData(true);
            },
            isHide:function(self){

              if(self.$store.getters.getUserinfo.primary_scope<40){
                return true;
              }else{
                return false;
              }
            },
          }
        },
        {
          key: 'create_time',
          label: '创建时间',
          listType:'normal',
          placeholder:'请选择创建时间',
        },
        {
          label: '操作',
          listType:'deal',
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
              return '编辑'
            },
            func:{
              apiName:function(self){
                return "api_routineUpdate"
              },
              formData:function(self){
                return self.formData
              },
              postData:function(self){
                var postData={
                  searchItem:{
                    id:self.formData.id,
                    type:2,
                    user_type:1
                  },
                  data:self.submitData
                };
                if(self.submitData.parentid&&self.submitData.parentid==self.formData.id){
                  self.$$notify('父级ID和子级ID重叠','fail');
                  return false;
                }else{
                  return postData;
                };
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
                return "api_routineUpdate"
              },
              postData:function(self){

                if(self.selectionArray.length>0){
                  var postData = {
                    searchItem:{
                      id:['in',self.selectionArray],
                      user_type:1,
                      type:2
                    },
                    data:{
                      status:-1
                    }
                  };
                  return postData;
                }else{
                  return false
                }

              }
            },
          },
          {
            type:'info',
            icon:'edit',
            size:'medium',
            position:'header',
            text:function(data){
              return '添加'
            },
            func:{
              apiName:function(self){
                return "api_routineAdd"
              },
              formData:function(self){
                var data = {
                  title:'',
                  description:'',
                  mainImg:[],
                };
                return data
              },
              postData:function(self){
                self.submitData.type = 2;
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
        pagesize:12,
        is_page:true,
        page_sizes: [10, 30, 60, 90],
        layout: 'total, sizes, prev, pager, next, jumper',
      },
      searchItem:{
        type:2
      },
      optionData:{
        labelOptions:[],
        userOptions:[],
        behaviorOptions:[{
          text: '正常',
          value: 0
        }, {
          text: '迟到',
          value: 1
        }, {
          text: '早退',
          value: 2
        }],
        numOptions:[{
          text: '签到',
          value: 0
        }, {
          text: '签退',
          value: 1
        }],
        statusOptions:[{
          text: '启用',
          value: 1
        }, {
          text: '禁用',
          value: -1
        }],
      },
      otherData:{
      },
      UserInfo:{
        tableName:'UserInfo',
        searchItem:{
        },
        fixSearchItem:{
          status:1
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
    init () {
      this.initMainData();
      this.initUserData();

    },

    /**
     *
     */
    async initUserData (isNew) {

      const self = this;
      const postData  = {};

      postData.token = self.$store.getters.getToken;
      if (self.searchItem) {
        postData.searchItem = {
          user_type: 1
        }
      };
      if(JSON.stringify(self.getBefore) != "{}"){
        postData.getBefore = self.$$cloneForm(self.getBefore);
      };

      var res =  await self.$$api_userInfoGet({data: postData});
      self.optionData.userOptions = res.info.data;


    },


    /**
     * 列表主函数
     */
    async initMainData (isNew) {

      const self = this;
      self.card_arguments.loading = true;
      const postData  = {};
      if(isNew){
        self.paginate.currentPage = 1;
      };
      postData.paginate = self.$$cloneForm(self.paginate);
      postData.token = self.$store.getters.getToken;
      if (self.searchItem) {
        postData.searchItem = self.$$cloneForm(self.searchItem)
      };
      if(self.$store.getters.getUserinfo.primary_scope>=60){
        postData.searchItem.user_type = 1;
      };
      if(JSON.stringify(self.getBefore) != "{}"){
        postData.getBefore = self.$$cloneForm(self.getBefore);
      };
      postData.getAfter = {
        UserInfo: {
          condition: "=",
          key: "user_no",
          info: ["name", "user_no"],
          middleKey: "user_no",
          searchItem: {status: 1},
          tableName: "UserInfo",
        },
      };
      var res =  await self.$$api_routineGet({data: postData});
      self.mainData = res.info.data;
      self.paginate.count = res.info.total;
      self.card_arguments.loading = false;
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
      console.log('field',Object);
      Object.field.header_search['changeFunc'](Object.value,self);
    },

    pageChange(val){
      console.log('pageChange',val);
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
      console.log('Object',Object);
      self.formData[Object.field.key] = Object.value;
      self.submitData[Object.field.key] = Object.value;
      console.log('submitData',self.submitData);


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

          return;
        };
        console.log('postData',postData)

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
          message: '操作失败'
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
