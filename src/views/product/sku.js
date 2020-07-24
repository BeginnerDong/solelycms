export default {
  name: 'sku',
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
          key: 'sku_no',
          label: 'SKU NO',
          application:[],
          componentName:'sls-input',
          listType:'normal',
          width:150
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
                self.searchItem.title = ['LIKE',['%'+val+'%']];
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
        },
        {
          key: 'price',
          label: '价格',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'score',
          label: '可使用积分',
          application:['编辑','添加'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'o_price',
          label: '原价',
          application:['编辑','添加'],
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
          key: 'group_price',
          label: '团购价格',
          application:[],
          componentName:'sls-input',
          listType:'',
        },
        {
          key: 'group_stock',
          label: '团购库存',
          application:[],
          componentName:'sls-input',
          listType:'',
        },
        {
          key: 'standard',
          label: '成团标准',
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
                return "api_skuUpdate"
              },
              formData:function(self){
                if(self.optionData.sku_item&&self.optionData.sku_item.length>0){
                  for(var i=0;i<self.optionData.sku_item.length;i++){
                    self.formData[self.optionData.sku_item[i].title] = '';
                    for(var c_i=0;c_i<self.formData.sku.length;c_i++){
                      if(self.formData.sku[c_i].parentid==self.optionData.sku_item[i].id){
                        self.formData[self.optionData.sku_item[i].title] = self.formData.sku[c_i].id;
                        break;
                      };
                    };
                  };
                };
                return self.formData;
              },
              postData:function(self){
                self.submitData.sku_item = [];
                if(self.optionData.sku_item&&self.optionData.sku_item.length>0){
                  for(var i=0;i<self.optionData.sku_item.length;i++){
                    if(self.submitData[self.optionData.sku_item[i].title]){
                      self.submitData.sku_item.push(self.submitData[self.optionData.sku_item[i].title])
                    }else if(self.formData[self.optionData.sku_item[i].title]){
                      self.submitData.sku_item.push(self.formData[self.optionData.sku_item[i].title])
                    };
                    delete self.submitData[self.optionData.sku_item[i].title];
                  };
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
                return "api_skuUpdate"
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
                return "api_skuAdd"
              },
              formData:function(self){
                var data = {};
                if(self.optionData.sku_item&&self.optionData.sku_item.length>0){
                  for(var i=0;i<self.optionData.sku_item.length;i++){
                    data[self.optionData.sku_item[i].title] = '';
                  };
                };
                return data;
              },
              postData:function(self){
                self.submitData.sku_item = [];
                if(self.optionData.sku_item&&self.optionData.sku_item.length>0){
                  for(var i=0;i<self.optionData.sku_item.length;i++){
                    if(self.submitData[self.optionData.sku_item[i].title]){
                      self.submitData.sku_item.push(self.submitData[self.optionData.sku_item[i].title])
                    };
                    delete self.submitData[self.optionData.sku_item[i].title]
                  };
                };
                var postData = {
                  data:self.submitData
                };
                if(self.product_no){
                  postData.data.product_no = self.product_no;
                  return postData;
                }else{
                  return false;
                };
              }
            },
          },
          {
            type:'info',
            icon:'edit',
            size:'normal',
            position:'header',
            text:function(data){
              return '返回'
            },
            funcType:'func',
            func:{
              func:function(self){
                self.$router.push(self.path);
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
        thirdapp_id:this.$store.getters.getUserinfo.thirdapp_id
      },
      optionData:{
        skuOptions:[],
        sku_item:[],
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
      const self = this;
      self.product_no = this.$route.params.product_no;
      self.path = this.$route.params.path;
      this.initProductData()
      this.initMainData();
    },


    async initProductData(product_no){
      const self = this;
      const postData = {};
      postData.searchItem = {
        product_no:self.product_no
      };
      try{
        var res = await self.$$api_productGet({data: postData});
      }catch(err){
        console.log(err);
        notify('网络故障','error');
      };

      if(res.info.data.length>0){
        self.productInfo = res.info.data[0];
        self.initSkuData(self.productInfo.sku_array);
      }else{
        notify('制定商品不存在','error');
      };

    },


    //获取SKU信息
    async initSkuData(sku_array){
      const self = this;
      const postData = {};
      postData.searchItem = {
        id:['in',sku_array]
      };
      postData.searchItemOr = {
        parentid:['in',sku_array]
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
      self.sku = res.info.data;
      if(self.sku.length>0){

        for(var key in self.sku){
          console.log('item',self.sku[key])
          if(self.sku[key].type=='5'){
            self.optionData[self.sku[key].id+'Options'] = self.sku[key].children||[];
            self.fields.push({
              key: self.sku[key].title,
              label: self.sku[key].title,
              application:['添加','编辑'],
              componentName:'sls-select',
              optionsName:self.sku[key].id+'Options',
              listType:'',
              defaultProps: {
                label: 'title',
                value: 'id',
              },
            });
            self.optionData.sku_item.push(self.sku[key]);
            console.log('optionData',self.optionData)
          };
        };
      };

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
      postData.searchItem.product_no = self.product_no;
      if(JSON.stringify(self.getBefore) != "{}"){
        postData.getBefore = self.$$cloneForm(self.getBefore);
      };
      postData.getAfter = {
        sku:{
          tableName:'Label',
          middleKey:'sku_item',
          key:'id',
          condition:'in',
          searchItem:{
            status:1
          },
        },
      };

      var res = await self.$$api_skuGet({data: postData});
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
