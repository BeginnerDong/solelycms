export default {
  name: 'coupon',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,

      table_arguments:{
        height:'70%',
        loading:true,
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
          key: 'coupon_no',
          label: '优惠券NO',
          application:[],
          componentName:'sls-input',
          listType:'normal',
          width:50
        },
        {
          key: 'title',
          label: '名称',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入名称',
            clearable:true,
            defaultValue:'',
            optionsName:'',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.title = val;
              }else{
                delete self.searchItem.title;
              };
              self.initMainData(true);
            },
          },
        },
        {
          key: 'description',
          label: '描述',
          application:['编辑','添加'],
          componentName:'sls-textarea',
          listType:'normal',
          placeholder:'请输入描述',
          header_search:{
            componentName:'sls-textarea',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入描述',
            changeFunc:function(e,self){
              if(e.target._value){
                self.searchItem.description = ['LIKE',['%'+e.target._value+'%']];
              }else{
                delete self.searchItem.description;
              };
              self.initMainData(true);
            },
          }
        },
        {
          key: 'price',
          label: '价格',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'value',
          label: '优惠券价值',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'discount',
          label: '折抵份额',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'condition',
          label: '限额（满减）',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: "type",
          label: '优惠券类型',
          application:['编辑','添加'],
          type:'select',
          listType:'normal',
          customSlot:'type',
          componentName:'sls-select',
          optionsName:'typeOptions',
          filter_multiple: false,
          listType:'normal',
          defaultProps: {
            label: 'text',
            value: 'value',
          },
        },
        {
          key: 'stock',
          label: '库存',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'sale_count',
          label: '销量',
          application:[],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'listorder',
          label: '排序',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'',
        },
        {
          key: 'start_time',
          label: '开启时间',
          application:[],
          customSlot:'start_time',
          listType:'',
          componentName:'sls-datetime',
          width:150,
        },
        {
          key: 'end_time',
          label: '结束时间',
          application:[],
          customSlot:'end_time',
          listType:'',
          componentName:'sls-datetime',
          width:150,
        },
        {
          key: 'limit',
          label: '购买数量限制',
          application:[],
          componentName:'sls-input',
          listType:'',
        },
        {
          key: 'use_limit',
          label: '使用数量限制',
          application:[],
          componentName:'sls-input',
          listType:'',
        },
        {
          key:'valid_time',
          label:'有效期',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType: 'timeinit',
          timeinit:function(val){
            return val.valid_time?parseInt(val.valid_time)/86400/10000:''
          }
        },
        {
          key: 'content',
          label: '详情',
          application:['编辑','添加'],
          componentName:'tinymce-editor',
          listType:'',
          dialogStyle:'width:100%;',
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
            componentName:'sls-datetime',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择创建时间',
            changeFunc:function(value,self){
              if(!value){
                delete self.searchItem.create_time;
              }else{
                self.searchItem.create_time = ['between',value = value.map(function(e){return e/1000;})]
              };
              self.initMainData(true);
            },
          },
        },
        {
          key: 'mainImg',
          label: '主图',
          customSlot:'mainImg',
          application:['编辑','添加'],
          componentName:'upload',
          listType:'normal',
          limit:10,
          dialogStyle:'width:90%',
          width:200
        },
        {
          key: 'bannerImg',
          label: '轮播图',
          customSlot:'bannerImg',
          application:['编辑','添加'],
          componentName:'upload',
          listType:'normal',
          limit:10,
          dialogStyle:'width:90%',
          width:200
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
              return '编辑'
            },
            func:{
              apiName:function(self){
                return "api_couponUpdate"
              },
              formData:function(self){
                var newFormData = func.cloneForm(self.formData);
                newFormData.valid_time = parseInt(newFormData.valid_time)/86400/1000;
                return newFormData;
              },
              postData:function(self){
                if(self.submitData.valid_time){
                  self.submitData.valid_time = self.submitData.valid_time*86400*1000;
                };
                if(self.submitData.category_id==0){
                  return false;
                };
                var postData = {
                  searchItem:{
                    id:self.formData.id,
                  },
                  data:self.submitData
                };
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
                return "api_couponUpdate"
              },
              postData:function(self){
                var deleteArray = [];
                for (var i = 0; i < self.selectionArray.length; i++) {
                  deleteArray.push(self.selectionArray[i].id);
                };
                var postData = {
                  searchItem:{
                    id:['in',deleteArray],
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
              return '添加'
            },
            func:{
              apiName:function(self){
                return "api_couponAdd"
              },
              formData:function(self){
                var data = {
                  title:'',
                  description:'',
                  price:'',
                  mainImg:[],
                  bannerImg:[],
                };
                return data
              },
              postData:function(self){
                self.submitData.valid_time = self.submitData.valid_time?self.submitData.valid_time*86400*1000:'';
                var postData = {
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
        thirdapp_id:this.$store.getters.getUserinfo.thirdapp_id
      },
      optionData:{
        statusOptions:[{
          text: '启用',
          value: 1
        }, {
          text: '禁用',
          value: -1
        }],
        typeOptions:[{
          text: '抵扣券',
          value: 1
        }, {
          text: '折扣券',
          value: 2
        }],
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
      self.table_arguments.loading = true;
      const postData  = {};
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

      var res = await self.$$api_couponGet({data: postData});
      self.mainData = res.info.data;
      self.paginate.count = res.info.total;
      self.table_arguments.loading = false;

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
