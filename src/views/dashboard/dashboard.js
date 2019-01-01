export default {
    name: 'dashboard',
    components: {},
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            todoList: [
                {
                    title: '今天要修复100个bug',
                    status: false,
                },
                {
                    title: '今天要修复100个bug',
                    status: false,
                },
                {
                    title: '今天要写100行代码加几个bug吧',
                    status: false,
                }, {
                    title: '今天要修复100个bug',
                    status: false,
                },
                {
                    title: '今天要修复100个bug',
                    status: true,
                },
                {
                    title: '今天要写100行代码加几个bug吧',
                    status: true,
                }
            ],
            mainData:[],
            self:this,
            fields:[
                {
                  key: 'id',
                  label: 'ID',
                  application:[],
                  type:'input',
                  listType:'normal'
                },
                {
                  key: 'title',
                  label: '标题',
                  application:['添加'],
                  type:'input',
                  listType:'normal'
                }, 
                {
                  key: 'description',
                  label: '事项',
                  application:['添加'],
                  type:'input',
                  listType:'normal'
                },
                {
                    key: "status",
                    label: '状态',
                    application:[''],
                    type:'select',
                    options:
                    [
                        {
                            text: '已处理',
                            value: 1
                        }, 
                        {
                            text: '待处理',
                            value: 0
                        }
                    ],
                    formatter:function(val,tests){
                    return val.status == 1 ? '已处理' : '待处理'
                    },
                    filter_multiple: false,
                    listType:'normal',
                    defaultProps: {
                        label: 'text',
                        value: 'value',
                    },
                    placeholder:'请选择状态',
                    header_search:true,
                    header_search_type:'select',
                    header_search_style:'width:160px;margin-right:2px;',
                    changeFunc:function(e,self){
                        if(e.target._value){
                            self.searchItem.status = e.target._value;
                        }else{
                                delete self.searchItem.status;
                        };
                        self.initMainData();
                    },
                }, 
                {
                  label: '操作',
                  listType:'deal',
                  width:100
                },
            ],

            btn_info:[

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
                            return "api_message_add"
                        },

                        formData:function(data,self,func){
                            var data = {
                                description:''
                            }; 
                            return data
                        },
                                    
                        postData:function(data,self){

                            data.status = 0;
                            data.type = 10;

                            var postData = {
                                data:data
                            };
                            return postData;
                        }

                    },
                },
                {
                    type:'danger',
                    icon:'delete',
                    size:'mini',
                    funcType:'submit',
                    position:'list',
                    text:function(data){
                      return '处理'
                    },
                    func:{
                      apiName:function(data){
                        return "api_message_update"
                      },
                                    
                      postData:function(data,self){
                        var postData = {
                          searchItem:{
                            id:self.btnData.id,
                          },
                          data:{
                            status:1
                          }
                        };
                        return postData;
                        }

                    },
                },
            ],
            
            paginate:{
                count: 0,
                currentPage: 1,
                pagesize:3,
                is_page:true,
                page_sizes: [10, 30, 60, 90],
                layout: 'total, sizes, prev, pager, next, jumper',
            },
            searchItem:{
                type:10,
                status:['in',[0,1]],
            },
            optionData:{
                labelOptions:[]
            },
            otherData:{
            },
            getBefore:{},
        }
    },
    mounted () {
        this.init()
    },
    computed: {
        token: function () {
            return this.$store.getters.getToken
        },
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
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
    methods:{

        /**
         * 初始化
         */
        init () {
          this.initMainData()
        }, 

        /**
         * 获取代办事宜列表
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