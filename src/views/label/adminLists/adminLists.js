export default {
  name: 'abc',
  components: {},
  data () {
    return {
      list: [],
      fields: [
        {
          key: 'id',
          label: '管理员ID',
          application:['table'],
          type:'input',

        },
        {
          key: 'user_no',
          label: '管理员NO',
          application:['table'],
          type:'input'
        }, 
        {
          key: 'login_name',
          label: '管理员登录名',
          application:['table'],
          type:'input'
        }, 
        {
          key: "name",
          label: '管理员姓名',
          application:['table','api_userInfo_add','api_userInfo_update'],
          type:'input'
        },
        {
          key: "menu_id",
          label: '菜单',
          application:['table','api_userInfo_add','api_userInfo_update'],
          type:'cascader',
          options:'labelOptions',
        },
        {
          key: "mainImg",
          label: '主图',
          application:['table','api_userInfo_add','api_userInfo_update'],
          type:'upload',
          options:'labelOptions',
          limit:10,
        },
        {
          key: "name",
          label: '内容',
          application:['table','api_userInfo_add','api_userInfo_update'],
          type:'vueEditor',
          
        },
        {
          key: "area",
          label: '区域选择',
          application:['table','api_userInfo_add','api_userInfo_update'],
          type:'select',
          select_list:[{
            text: '启用',
            value: 1
          }, {
            text: '禁用',
            value: -1

          }],
        }, 
        {
          key: 'create_time',
          label: '创建时间'
        }, 
        {
          width: '160',
          key: 'status',
          label: '状态',
          formatter: function (item) {
            return item.status === 1 ? '启用' : '禁用'
          },
          filter_list: [{
            text: '启用',
            value: 1
          }, {
            text: '禁用',
            value: -1

          }],
        //filter_method: function (value, item) {
          
          //return item.status === value
        //},
        //filter_change: function (filters) {
          //console.log(filters)
        //},
        
          filter_multiple: false
        }
      ],

      // 需要给分页组件传的信息
      pagination: {
        current_page: 1,
        total: 0,
       
        page_sizes: [3, 9, 12, 24],
        layout: 'total, sizes, prev, pager, next, jumper',
        pagesize:10,
        is_page:true,
      },

      // 搜索配置
      search_data: {
        fields: [{
          key: 'title',
          label: '标题'
        }],
        default_value: {
          title: ''
        }
      },

      // 按钮配置
      btn_info: {
        // batch:false,
        // batch_delete:false,
        width: 300,
        add_text: '添加文章',
        select_text: '查看',
        update_text: '修改',
        delete_text: '删除文章',
        batch_delete_text: '批量删除文章',
        list:[
          {
            type:'info',
            icon:'edit',
            size:'mini',
            text:function(data){
              console.log(data);
              console.log(JSON.stringify(data.data.info))
              return JSON.stringify(data.data.info)!= '[]'?'编辑':'添加'
            },
            func:{
              apiName:function(data){
                
                return JSON.stringify(data.info) != "[]" ?"api_userInfo_update":"api_userInfo_add"
              },
              formData:{
                type:{
                  api_userInfo_add:'new',
                  api_userInfo_update:'copy'
                },
                data:function(data){
                  return data['info']
                }
                
              },
              postData:function(self,data){
                  return ;
              }
            },
            
          }
        ],
        


      },
      paginate: {
          count: 0,
          currentPage: 1,
          pagesize:10,
          is_page:true,
          page_sizes: [10, 30, 60, 90],
          layout: 'total, sizes, prev, pager, next, jumper',
      },
      searchItem:{},
      optionData:{
        labelOptions:[]
      }
      

    }

  },
  methods: {

    test(){
      this.$router.push('/function')
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

    async initMenuData(){
      const self =this;
      const postData = {};
      postData.searchItem ={   
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
        //self.menudata = getArrayByTarget(res.data.info.data,'id',356);
        
      };

      
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
      var res =  await self.$$api_user_get({data: postData});
      self.list = res.info.data;
      self.paginate.count = res.info.total;

    },

    async onSubmit(data){
      console.log(data)
    },

    /**
     * 点击删除按钮
     */
    onClickBtnDelete (opts) {
      this.$confirm('删除后不可恢复', '确认删除？').then(() => {
        this.$$api_article_deleteArticle({
          data: {
            id: opts.data.id
          },
          fn: data => {
            this.onGetList()
          }
        })
      })
    },


    onClickBtn(val){
      console.log(val)
    },

    /**
     * 添加文章
     */
    onClickBtnAdd () {
      this.$router.push('/adv/article/edit')
    },

    onClickBtnSelect (opts) {
      console.log(opts)
      this.$message('查看自己处理吧')
    },

    /**
     * 修改按钮
     * @param opts
     */
    onClickBtnUpdate (opts) {
      this.$router.push({
        path: '/adv/article/edit',
        query: {
          id: opts.data.id
        }
      })
    },

    /**
     * 改变页码事件
     * @param current_page    当前页码
     */
    onChangeCurPage (currentPage) {
      var path = this.$route.path
      var query = Object.assign({}, this.$route.query)
      query.current_page = currentPage
      this.$router.push({
        path,
        query
      })
    },

    /**
     * 改变每页显示数量事件
     * @param page_size    每页显示的数量
     */
    onChangePageSize (pageSize) {
      var path = this.$route.path
      var query = Object.assign({}, this.$route.query)
      query.page_size = pageSize
      this.$router.push({
        path,
        query
      })
    },

    /**
     * 更新参数
     */
    onUpdateParams () {
      if (this.$route.query.current_page) {
        this.paginations.current_page = parseInt(this.$route.query.current_page)
      }
      if (this.$route.query.page_size) {
        this.paginations.page_size = parseInt(this.$route.query.page_size)
      }

      this.search_data.default_value.title = this.$route.query.title
    },

    /**
     * 搜索事件
     * @param data    表单数据
     * @param info    其他有用的数据
     */
    onSearch ({data, info}) {
      console.log(data)
      console.log(info)

      var path = this.$route.path
      var query = Object.assign({}, this.$route.query, data)

      this.$router.push({
        path,
        query
      })
    },

    // 批量选择改变CheckBox事件
    onSelectionChange ({ids, datas}) {
      // console.log(ids);
      // console.log(datas);
    },

    /**
     * 批量删除
     * @param ids 选中的ids
     * @param datas  选中的数据集合
     */
    onClickBtnBatchDelete ({ids, datas}) {
      this.$confirm('删除的数据：' + ids.join(','), '确认删除？').then(() => {
        this.$$api_article_deleteArticle({
          data: {
            id: ids.join(',')
          },
          fn: data => {
            this.onGetList()
          }
        })
      })
    },

    /**
     * 初始化
     */
    init () {
      this.onUpdateParams()
      this.initMainData()
      this.initMenuData()
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
  }

}
