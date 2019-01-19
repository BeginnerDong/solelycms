export default {
  name: 'article',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      fields: [
        {
          key: 'title',
          label: '文章标题',
          application:[],
          type:'input',
          listType:'normal',
        },
        {
          key: 'media_id',
          label: '图文ID',
          application:[],
          type:'input',
          listType:'normal'
        },
        {
          key: 'update_time',
          label: '更新时间',
          application:[],
          type:'input',
          listType:'custom',
          custom:function(val,func){
            return val.update_time?func.formatDate(new Date(parseInt(val.update_time)*1000),'yyyy/M/d hh:mm'):''
          }
        },
        {
          key: 'exist',
          label: '是否保存',
          application:[],
          type:'input',
          listType:'normal',
          formatter:function(val,tests){
            return  val.Article&&val.Article.status&&val.Article.status==1?'已保存':'未保存';
          },
        },
        {
          key: "wechat_id",
          label: '公众号',
          application:[],
          type:'select',
          options:'wechatOptions',
          placeholder:'请选择公众号',
          header_search:true,
          value:'',
          header_search_type:'select',
          header_search_value:'',
          header_search_style:'width:160px;margin-right:2px;',
          changeFunc:function(value,self){
            if(!value){ 
              delete self.searchItem.wechat_id;
            }else{
              self.searchItem.wechat_id = value
            };
            self.initMainData();
          },
          defaultProps: {
            label: 'name',
            value: 'id',
          },
        },
        {
          label: '操作',
          listType:'deal',
          width:100
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
            return '保存'
          },
          isHide:function(data,self){
            if(data.Article&&data.Article.status&&data.Article.status==1){
              return true;
            }else{
              return false;
            };
          },
          func:{
            apiName:function(data){
              if (data.Article&&data.Article.status&&data.Article.status==-1) {
                return "api_article_update"
              }else{
                return "api_article_add"
              }
            },

            postData:function(data,self){

              if (data.Article&&data.Article.status&&data.Article.status==-1) {
                var postData = {
                  searchItem:{
                    id:data.Article.id,
                  },
                  data:{
                    status:1,
                  }
                }
              }else{
                var postData = {
                  data:{
                    menu_id:220,
                    title:data.title,
                    content:data.content,
                    mainImg:data.mainImg,
                    passage1:data.media_id,
                    passage2:data.url,
                  }
                };
              }
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
            return '删除'
          },
          isHide:function(data,self){
            if(data.Article&&data.Article.status&&data.Article.status==1){
              return false;
            }else{
              return true;
            };
          },
          func:{
            apiName:function(data){
              return "api_article_update"
            },

            postData:function(data,self){

              var postData = {
                searchItem:{
                  id:data.Article.id,
                },
                data:{
                  status:-1,
                }
              }
              return postData;
            }
          },
        },
        {
          type:'info',
          icon:'edit',
          size:'normal',
          funcType:'submit',
          position:'header',
          text:function(data){
            return '全部保存'
          },
          func:{
            apiName:function(data,self){

              var isadd = false;
              for(var i = 0; i<self.originArray.length; i++){
                if (!self.originArray[i].Article.status) {
                  isadd = true;
                } 
              };

              if(isadd){
                return "api_article_add"
              }else{
                return "api_article_update"
              };
              
            },

            postData:function(data,self){

              var dataArray = [];
              var ids = [];
              
              for(var i = 0; i<self.originArray.length; i++){

                if (self.originArray[i].Article&&self.originArray[i].Article&&self.originArray[i].Article.status==-1) {

                  ids.push(self.originArray[i].Article.id);

                }else{

                  var item = {};
                  item.menu_id = 220;
                  item.title = self.originArray[i].title,
                  item.content = self.originArray[i].content,
                  item.mainImg = self.originArray[i].mainImg,
                  item.passage1 = self.originArray[i].media_id,
                  item.passage2 = self.originArray[i].url,
                  item.user_no = self.store.getters.getUserinfo.user_no,
                  item.thirdapp_id = self.store.getters.getUserinfo.thirdapp_id,
                  dataArray.push(item);

                }
              }

              if(dataArray.length==0&&ids.length==0){
                return {
                  errorMsg:'没有任何选中'
                };
              };

              if (dataArray.length>0) {

                var postData = {
                  dataArray:dataArray,
                }

                if (ids.length>0) {
                  var saveAfter = [
                    {
                      tableName:'Article',
                      FuncName:'update',
                      searchItem:{
                        id:['in',ids],
                      },
                      data:{
                        status:1
                      }
                    },
                  ];
                  postData.saveAfter = saveAfter;
                }

              }else{
                var postData = {
                  searchItem:{
                    id:['in',ids],
                  },
                  data:{
                    status:1
                  }
                }
              };
              console.log('postData',postData);
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
        wechatOptions:[]
      },
      otherData:{
        canSelect(row, index){
          if (row.Article&&row.Article.status&&row.Article.status==1) {
            return false;
          }else{
            return true;
          }
          // console.log('canSelect-row',row);
          // console.log('canSelect-index',index);
        }
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
      this.initWechatData()
    },

    

    async initWechatData(){

      const self =this;
      const postData = {};
      postData.searchItem ={
        status:['=',1]  
      };
      postData.token = self.$store.getters.getToken;

      try{
        var res = await self.$$api_wechat_get({data: postData});
      }catch(err){
        console.log(err); 
        notify('网络故障','error');
      };
       
      if(res){
        self.optionData.wechatOptions = res.info.data;
      };
      if(self.optionData.wechatOptions.length>0)
      self.fields[4].value = self.optionData.wechatOptions[0].id;
      self.searchItem.wechat_id = self.optionData.wechatOptions[0].id;
      self.initMainData();
      
    },


    /**
     * 获取文章列表
     */
    async initMainData () {
      
      const self = this;
      const postData = {};
      postData.token = self.$store.getters.getToken;
      postData.paginate = self.$$cloneForm(self.paginate);
      if (self.searchItem.wechat_id) {
        postData.wechat_id = self.searchItem.wechat_id;
        postData.type = 'news';
        postData.getAfter = {
          Article:{
            tableName:'Article',
            middleKey:'url',
            key:'passage2',
            searchItem:{
              status:['in',[1,-1]]
            },
            condition:'=',
            info:['id','status'],
          },
        }

        var res =  await self.$$api_system_getSource({data: postData});
        self.mainData = res.info.data;
        self.paginate.count = res.info.total;
      }
      
    },


    onClickBtn(val){
      console.log(val)
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