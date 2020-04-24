export default {
  name: 'product',
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
          key: 'product_no',
          label: '商品NO',
          application:[],
          componentName:'sls-input',
          listType:'normal',
          width:50
        },
        {
          key: 'title',
          label: '商品名称',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
          header_search:{
            componentName:'sls-input',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入商品名称',
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
          label: '商品描述',
          application:['编辑','添加'],
          componentName:'sls-textarea',
          listType:'normal',
          placeholder:'请输入商品描述',
          header_search:{
            componentName:'sls-textarea',
            style:'width:160px;margin-right:2px;',
            placeholder:'请输入商品描述',
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
          label: '商品价格',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'score',
          label: '可使用积分',
          application:[],
          componentName:'sls-input',
          listType:'',
        },
        {
          key: 'stock',
          label: '商品库存',
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
          key: 'group_stock',
          label: '团购库存',
          application:[],
          componentName:'sls-input',
          listType:'',
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
          key:'duration',
          label:'有效期',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType: 'normal',
        },
        {
          key: 'sku_array',
          label: 'sku',
          application:[],
          componentName:'sls-checkbox',
          listType:'',
          optionsName:'skuOptions',
          defaultProps: {
            label: 'id',
            value: 'title',
          },
        },
        {
          key: 'category_id',
          label: '商品类别',
          application:['编辑','添加'],
          formatter:function(val,tests){
            return val.label[val.category_id]['title'];
          },
          componentName:'sls-cascader',
          optionsName:'labelOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            children: 'children',
            label: 'title',
            value: 'id',
          },
          placeholder:'请选择商品类别',
          header_search:{
            componentName:'sls-cascader',
            optionsName:'labelOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择商品类别',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.category_id = val;
              }else{
                delete self.searchItem.category_id;
              };
              self.initMainData(true);
            },
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
                return "api_productUpdate"
              },
              formData:function(self){
                return self.formData;
              },
              postData:function(self){
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
                return "api_productUpdate"
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
                return "api_productAdd"
              },
              formData:function(self){
                var data = {
                  title:'',
                  description:'',
                  price:'',
                  mainImg:[],
                  bannerImg:[],
                  sku_array:[],
                  start_time:'',
                  end_time:'',
                };
                return data
              },
              postData:function(self){
                self.submitData.type = 1;
                var postData = {
                  data:self.submitData
                };
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
              return 'SKU管理'
            },
            funcType:'func',
            func:{
              func:function(self){
                self.$router.push({
                  path:'/home/sku',
                  name:'SKU管理',
                  params:{
                    product_no:self.orginFormData.product_no,
                    path:'/home/product',
                  }
                });
              },
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
        type:1,
        thirdapp_id:this.$store.getters.getUserinfo.thirdapp_id
      },
      optionData:{
        labelOptions:[],
        skuOptions:[],
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
      this.initMenuData();
      this.initSkuData();
    },


    //获取类别
    async initMenuData(){
      const self = this;
      const postData = {};
      postData.searchItem = {
        type:3,
      };
      postData.token = self.$store.getters.getToken;
      postData.order = {
        listorder:'desc'
      };

      try{
        var res = await self.$$api_labelGet({data: postData});
      }catch(err){
        console.log(err);
        self.$notify('网络故障','error');
      };

      if(res){
        self.optionData.labelOptions = res.info.data;
      };
      console.log('self.optionData',self.optionData)

    },


    //获取SKU信息
    async initSkuData(){
      const self = this;
      const postData = {};
      postData.searchItem ={
        type:5,
      };
      postData.token = self.$store.getters.getToken;
      postData.order = {
        listorder:'desc'
      };

      try{
        var res = await self.$$api_labelGet({data: postData});
      }catch(err){
        console.log(err);
        notify('网络故障','error');
      };

      if(res){
        self.optionData.skuOptions = res.info.data;
      };

    },


    /**
     * 列表主函数
     */
    async initMainData(isNew) {

      const self = this;
      self.table_arguments.loading = true;
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

      var res = await self.$$api_productGet({data: postData});
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
