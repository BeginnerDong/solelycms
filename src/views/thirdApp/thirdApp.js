export default {
  name: 'thirdApp',
  components: {},
  data () {
    return {
      mainData: [],
      fields: [
        {
          key: 'id',
          label: '项目ID',
          application:[],
          type:'input',
          listType:'normal'
        },
        {
          key: 'name',
          label: '项目名称',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'appid',
          label: '小程序appid',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'appsecret',
          label: '小程序appsecret',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'mchid',
          label: '商户支付商户号',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'wxkey',
          label: '商户支付随机Key',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'distribution_level',
          label: '分销层级',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: "firstClass",
          label: '一级分销比例',
          application:['编辑分销规则'],
          type:'input',
          listType:'normal',
          formatter:function(val){
            return val.custom_rule.firstClass?val.custom_rule.firstClass:''
          }
        },
        {
          key: "secondClass",
          label: '二级分销比例',
          application:['编辑分销规则'],
          type:'input',
          listType:'normal',
          formatter:function(val){
            return val.custom_rule.secondClass?val.custom_rule.secondClass:''
          }
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
          formatter:function(val,tests){
            return val.status === 1 ? '启用' : '禁用'
          },
          filter_multiple: false,
          listType:'normal',
          defaultProps: {
            label: 'text',
            value: 'value',
          },

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
              return "api_thirdApp_update"
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
          type:'info',
          icon:'edit',
          size:'mini',
          position:'list',
          text:function(data){
            return '编辑分销规则'
          },
          func:{
            apiName:function(data){
              return "api_thirdApp_update"
            },
            formData:function(data,self){
              //data.discount = data.discount[0]?data.discount[0]:'';
              //data.view_count = data.view_count[0]?data.view_count[0]:'';
              return data.custom_rule
            },
            postData:function(data,self){

              for(var key in data){ 
                self.formData[key] = data[key]
              };
              var postData={
                searchItem:{
                  id:self.btnData.id
                },
                data:{
                  custom_rule:self.formData
                }
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
                return "api_thirdApp_update"
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
                return "api_thirdApp_add"
              },
              
              formData:function(data,self,func){
                
                var data = {}; 
                return data
              },
              
              postData:function(data,self){
                var postData={
                  data:data
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

      },
      optionData:{
        areaOptions:[],
        subjectOptions:[],
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
      defaultProps: {
        children: 'child',
        label: 'title',
        value: 'id',
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
          create_time:'desc',
      };
      var res =  await self.$$api_thirdApp_get({data: postData});
      self.mainData = res.info.data;
      self.paginate.count = res.info.total;

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

    onClickBtn(val){
      console.log(val)
    },

    
  },


}
