export default {
  name: 'product',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      fields: [
        {
          key: 'product_no',
          label: '优惠券No',
          application:[],
          type:'input',
          listType:'normal'
        },
        {
          key: 'title',
          label: '优惠券标题',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'description',
          label: '优惠券描述',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'stock',
          label: '优惠券库存',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'sale_count',
          label: '销量',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: "type",
          label: '优惠券类型',
          application:['编辑','添加'],
          type:'select',
          options:[{
            text: '抵扣卷',
            value: 3
          }, {
            text: '折扣卷',
            value: 4
          }],
          formatter:function(val,tests){
            return val.type == 3 ? '抵扣卷' : '折扣卷'
          },
          filter_multiple: false,
          listType:'normal',
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          placeholder:'请选择优惠券类型',
          header_search:true,
          header_search_type:'select',
          header_search_value:'',
          header_search_style:'width:160px;margin-right:2px;',
          changeFunc:function(value,self){
            if(value){
              self.searchItem.type = value;
            }else{
              self.searchItem.type = ['in',[3,4]];
            };
            self.initMainData();
          },
        },
        {
          key: 'end_time',
          label: '截止日期',
          application:['编辑','添加'],
          type:'datetime',
          listType:'custom',
          width:150,
          custom:function(val,func){
            return val.end_time?func.formatDate(new Date(parseInt(val.end_time)),'yyyy/M/d hh:mm'):''
          }
        },
        {
          key: 'limit',
          label: '购买数量限制',
          application:['编辑','添加'],
          type:'input',
        },
        {
          key: 'use_limit',
          label: '使用数量限制',
          application:['编辑','添加'],
          type:'input',
        },
        {
          key:'duration',
          label:'有效期',
          application:['编辑','添加'],
          type:'input',
        },
        {
          key: 'listorder',
          label: '排序',
          application:['编辑','添加'],
          type:'input',
        },
        {
          key: 'discount',
          label: '折抵份额',
          listType:'normal',
          application:['编辑','添加'],
          type:'input',
        },
        {
          key: 'standard',
          label: '使用标准',
          listType:'',
          application:['编辑','添加'],
          type:'input',
        },
        {
          key: "mainImg",
          label: '主图',
          application:['编辑','添加'],
          type:'upload',
          options:'labelOptions',
          limit:10,
        },
        {
          key: "content",
          label: '内容',
          application:['编辑','添加'],
          type:'vueEditor',
        },
        {
          key: "status",
          label: '状态',
          application:['编辑'],
          type:'select',
          options:[{
            text: '启用',
            value: 1
          }, {
            text: '禁用',
            value: -1
          }],
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          formatter:function(val,tests){
            return val.status === 1 ? '启用' : '禁用'
          },
          filter_multiple: false,
          listType:'normal',
        },
        {
          key: 'create_time',
          label: '创建时间',
          listType:'normal',
          width:150,
          placeholder:'请选择创建时间',
          header_search:true,
          header_search_type:'datePicker',
          header_search_value:'',
          header_search_style:'width:160px;margin-right:2px;',
          changeFunc:function(value,self){
            if(!value){ 
              delete self.searchItem.create_time;
            }else{
              self.searchItem.create_time = ['between',value = value.map(function(e){return e/1000;})]
            };
            self.initMainData();
          },
        }, 
        {
          label: '操作',
          listType:'deal',
          width:300
        },
      ],


      // 按钮配置
      btn_info:[
          
        {
          type:'info',
          icon:'edit',
          size:'mini',
          position:'list',
          text:function(data){
            return '编辑'
          },
          func:{
            apiName:function(data){
              return "api_product_update"
            },
            formData:function(data,self){
              return data
            },
            postData:function(data,self){
              var postData={
                searchItem:{
                  id:self.btnData.id
                },
                data:data
              };
              return postData;
            }
          },
        },
        {
            type:'danger',
            icon:'delete',
            size:'normal',
            funcType:'submit',
            position:'header',
            text:function(data){
              return '删除选中'
            },
            func:{
              apiName:function(data){
                return "api_product_update"
              },
              postData:function(data,self){
                var postData = {
                  searchItem:{
                    id:['in',self.deleteArray],
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
            size:'normal',
            position:'header',
            text:function(data){
              return '添加'
            },
            func:{
              apiName:function(data){
                return "api_product_add"
              },
              formData:function(data,self,func){
                var data = {}; 
                data.sku_array = [];
                return data
              },
              postData:function(data,self){
                var postData={
                  data:data
                };
                postData.data.category_id = 0;
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
        type:['in',[3,4]]
      },
      optionData:{
        categoryOptions:[],
        skuOptions:[],
      },
      otherData:{  
      },
      getBefore:{},
      UserInfo:{
        tableName:'UserInfo',
        searchItem:{},
        key:'user_no',
        middleKey:'user_no',
        condition:'in',
      },
      
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
      this.initMainData()
    },
  
    /**
     * 获取文章列表
     */
    async initMainData () {
      const self = this;
      const postData  = {};
      postData.paginate = self.$$cloneForm(self.paginate);        
      postData.token = self.$store.getters.getToken; 
      if (self.searchItem) {
        postData.searchItem = self.$$cloneForm(self.searchItem)
      };
      if(JSON.stringify(self.getBefore) != "{}"){
        postData.getBefore = self.$$cloneForm(self.getBefore);
      };
      postData.order = {
          end_time:'desc',
      };
      var res =  await self.$$api_product_get({data: postData});
      self.mainData = res.info.data;
      self.paginate.count = res.info.total;
    },




    async onClickBtn(val){
      const self = this;
      console.log(val)
      if(val[0]=='导出excel'){
        const postData  = {};
        postData.paginate = self.$$cloneForm(self.paginate);        
        postData.token = self.$store.getters.getToken; 
        if (self.searchItem) {
          postData.searchItem = self.$$cloneForm(self.searchItem)
        };
        if(JSON.stringify(self.getBefore) != "{}"){
          postData.getBefore = self.$$cloneForm(self.getBefore);
        };
        postData.order = self.$$cloneForm(self.order); 
        postData.getAfter = {
          UserInfo:{
            tableName:'userInfo',
            middleKey:'passage1',
            key:'user_no',
            condition:'=',
            searchItem:{
              status:1
            },
            info:['name'],
          },
          Area:{
            tableName:'label',
            middleKey:'discount',
            key:'id',
            condition:'=',
            searchItem:{
              status:1
            },
            info:['title'],
          },
          Subject:{
            tableName:'label',
            middleKey:'view_count',
            key:'id',
            condition:'=',
            searchItem:{
              status:1
            },
            info:['title'],
          },
          FlowLog:{
            tableName:'FlowLog',
            middleKey:'product_no',
            key:'product_no',
            condition:'=',
            searchItem:{
              status:1
            },
            compute:{
              benifits:[
                'sum',
                'count',
                {
                  status:1
                }
              ],
              count:[
                'count',
                'count',
                {
                  status:1
                }
              ],
            }
          }
          
        };
        postData.excelOutput = {
          expTitle:'test',
          expCellName:[
            ['ID','id'],
            ['名称','title'],
            ['科目','Subject','title']
          ],
          fileName:'test'
        };
        var res =  await self.$$api_product_get({data: postData});
        window.location.href = res.info;
        console.log(res);
      }
    },

    async fieldChange(val){
      console.log('product_fieldChange',val);
      const self = this;
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

    pageChange(val){
      console.log(val);
      const self = this;
      self.paginate[val[0]] = val[1];
      self.initMainData();
    },

    
  },
  

}
