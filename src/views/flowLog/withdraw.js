export default {
  name: 'withdraw',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,

      table_arguments:{
        height:'70%',
        row_key:'id',
        tree_props:{
          children: 'child',
          child: 'child',
          hasChildren:'child'
        },
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
          key: 'count',
          label: '金额',
          application:[],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'trade_info',
          label: '说明',
          application:[],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: "withdraw_status",
          label: '提现状态',
          application:['编辑','添加'],
          listType:'normal',
          formatter:function(val,tests){
            return ['拒绝','待审核','同意'][val.withdraw_status+1];
          },
          componentName:'sls-select',
          optionsName:'withdrawOptions',
          filter_multiple: false,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
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
            optionsName:'',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.user_no = val;
              }else{
                delete self.searchItem.user_no;
              };
              self.initMainData(true);
            },
          },
        },
        {
          key: 'name',
          label: '用户姓名',
          application:[],
          componentName:'sls-input',
          listType:'normal',
          formatter:function(val,tests){
            return val.UserInfo.name?val.UserInfo.name:'';
          },
        },
        {
          key: 'phone',
          label: '用户电话',
          application:[],
          componentName:'sls-input',
          listType:'normal',
          formatter:function(val,tests){
            return val.UserInfo.phone?val.UserInfo.phone:'';
          },
        },
        {
          key: "status",
          label: '状态',
          application:[],
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
            componentName:'sls-date-time-range',
            style:'width:160px;margin-right:2px;',
            start_placeholder:'创建开始时间',
            end_placeholder:'创建结束时间',
            changeFunc:function(value,self){
              if(!value){
                delete self.searchItem.create_time;
              }else{
                self.searchItem.create_time = ['between',value = value.map(function(e){return e/1000;})]
              };
              self.initMainData(true);
            },
          },
          width:200,
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
            funcType:'submit',
            position:'list',
            text:function(data){
              return '同意'
            },
            styleFunc:function(data){
              if(data.withdraw_status==0){
                return 'background-color: #029A15'
              }else{
                return 'display: none'
              }
            },
            func:{
              apiName:function(self){
                return "api_flowLogUpdate"
              },
              formData:function(self){
                return self.formData
              },
              postData:function(self){
                var postData = {
                  searchItem:{
                    id:self.formData.id,
                    user_type:0,
                  },
                  data:{
                    withdraw_status:1,
                  }
                };
                return postData;
              }
            },
          },
          {
            type:'info',
            icon:'edit',
            size:'mini',
            funcType:'submit',
            position:'list',
            text:function(data){
              return '拒绝'
            },
            styleFunc:function(data){
              if(data.withdraw_status==0){
                return 'background-color: #F56C6C'
              }else{
                return 'display: none'
              }
            },
            func:{
              apiName:function(self){
                return "api_flowLogUpdate"
              },
              formData:function(self){
                return self.formData
              },
              postData:function(self){
                var postData = {
                  searchItem:{
                    id:self.formData.id,
                    user_type:0,
                  },
                  data:{
                    withdraw_status:-1,
                    status:-1,
                  }
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
        type:2,
        user_type:0,
        withdraw:1,
        status:['in',[1,-1]],
      },
      optionData:{
        statusOptions:[{
          text: '启用',
          value: 1
        }, {
          text: '禁用',
          value: -1
        }],
        withdrawOptions:[
          {
            text: '拒绝',
            value: -1
          },
          {
            text: '待审核',
            value: 0
          },
          {
            text: '同意',
            value: 1
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
      this.initMainData();
    },



    /**
     * 列表主函数
     */
    async initMainData(isNew) {

      const self = this;
      const postData = {};
      if(isNew){
        self.paginate.currentPage = 1;
      };
      postData.paginate = self.$$cloneForm(self.paginate);
      postData.token = self.$store.getters.getToken;
      if (self.searchItem) {
        postData.searchItem = self.$$cloneForm(self.searchItem)
      };
      if(JSON.stringify(self.getBefore) != "{}"){
        postData.getBefore = self.$$cloneForm(self.getBefore);
      };
      postData.getAfter = {
        UserInfo:{
          tableName:'UserInfo',
          middleKey:'user_no',
          key:'user_no',
          condition:'=',
          searchItem:{
            status:1
          },
          info:['name','phone'],
        },
      };

      var res = await self.$$api_flowLogGet({data: postData});
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

      if(Object.func){
        var res = await Object.func(Object.value,self);
        if(Object.callbak){
          Object.callbak(res);
        };

      };

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
        if(self.btnNow.func.formData(self).withdraw_status!=0){
            self.$message({
              type: 'info',
              message: '该笔提现已审核'
            });
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
