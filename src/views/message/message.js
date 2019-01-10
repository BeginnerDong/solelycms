export default {
  name: 'message',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      fields: [
        {
          key: 'id',
          label: '留言ID',
          application:[],
          type:'input',
          listType:'normal'
        },
        {
          key: 'title',
          label: '名字',
          application:['编辑','添加'],
          type:'input',
          listType:'normal',
          placeholder:'请输入留言姓名',
          header_search:true,
          header_search_type:'input',
          header_search_style:'width:160px;margin-right:2px;',
          changeFunc:function(e,self){
            if(e.target._value){
              self.searchItem.title = e.target._value;
            }else{
              delete self.searchItem.title;
            };
            self.initMainData();
          },
        },
        {
          key: 'phone',
          label: '联系电话',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: "mainImg",
          label: '图片',
          application:['编辑','添加'],
          type:'upload',
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
          application:['编辑','添加'],
          type:'select',
          options:[
            {
              text: '启用',
              value: 1
            },
            {
              text: '禁用',
              value: -1
            }
          ],
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
            apiName:function(data){
              return "api_message_update"
            },
            formData:function(data,self){
              return data
            },
            postData:function(data,self){
              var postData={
                searchItem:{
                  id:self.btnData.id,
                  user_type:0
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
              return "api_message_update"
            },
                          
            postData:function(data,self){
              var postData = {
                searchItem:{
                  id:['in',self.deleteArray],
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
        labelOptions:[]
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
      this.initMenuData()
    },

    async initMenuData(){
      const self =this;
      const postData = {};
      postData.searchItem ={
        type:['=',1]  
      };
      postData.token = self.$store.getters.getToken;
      postData.order ={
        listorder:'desc'
      };

      try{
        var res = await self.$$api_label_get({data: postData});
      }catch(err){
        console.log(err); 
        notify('网络故障','error');
      };
       
      if(res){
        self.optionData.labelOptions = res.info.data;
      };
      
    },


    /**
     * 获取留言列表
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
      var res =  await self.$$api_message_get({data: postData});
      self.mainData = res.info.data;
      self.paginate.count = res.info.total;

    },


    onClickBtn(val){
      console.log(val)
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

    async fieldChange(val){
      console.log('product_fieldChange',val);
      const self = this;
    },

  },
  
}