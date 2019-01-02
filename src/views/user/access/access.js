export default {
  name: 'areaMenu',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      searchForm:{
        status:'1'
      },
      fields: [
        {
          key: 'id',
          label: '类别ID',
          application:['table'],
          type:'input',
        },
        {
          key: "title",
          label: '名称',
          application:['添加','编辑'],
          type:'input'
        },
        {
          key: "description",
          label: '描述',
          application:['添加','编辑'],
          type:'input'
        },
        {
          key: "url",
          label: '跳转链接',
          application:['添加','编辑'],
          type:'input'
        },
        {
          key: "listorder",
          label: '排序',
          application:['添加','编辑'],
          type:'input'
        },
        {
          key: "parentid",
          label: '父级ID',
          application:['添加','编辑'],
          type:'cascader',
          options:'labelOptions',
          
        },
        {
          key: "mainImg",
          label: '主图',
          application:['添加','编辑'],
          type:'upload',
          limit:10,
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
          value:'',
          placeholder:'请选择状态',
          header_search:true,
          header_search_type:'select',
          header_search_style:'width:160px;margin-right:2px;',
          changeFunc:function(value,self){
            
            if(value){
              self.searchItem.status = value;
            }else{
              delete self.searchItem.status;
            };
            self.initMainData();
          },
        },
        {
          key: "name",
          label: '内容',
          application:['api_userInfo_add','api_userInfo_update'],
          type:'vueEditor',
        },
        {
          key: "area",
          label: '区域选择',
          application:['table','api_userInfo_add','api_userInfo_update'],
          type:'select',
          select_list:[
            {
              text: '启用',
              value: 1
            }, 
            {
              text: '禁用',
              value: -1
            }
          ],
        }, 
        {
          key: 'create_time',
          label: '创建时间'
        },
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
      btn_info:[
        {
          type:'danger',
          icon:'delete',
          size:'normal',
          funcType:'emit',
          position:'header',
          text:function(data){
            return '更新权限'
          },
          func:{
            apiName:function(data){
              return "api_user_update"
            },        
            postData:function(data,self,func){
              var res = self.getCheckedNodesAlone();
              var newArray = [];
              for (var i = 0; i < res.length; i++) {
                newArray.push(res[i].id)
              };
              var postData = {
                searchItem:{
                  user_no:self.$store.getters.getUserinfo.user_no
                },
                data:{
                  passage_array:newArray
                }
              };
              console.log('postData',postData);
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
            return '返回'
          },
          funcType:'func',
          func:{
            func:function(data,self,func){
              self.$router.push('/user/adminLists/adminLists');
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
        type:3
      },
      optionData:{
        labelOptions:[]
      },
      defaultProps:{
        children: 'children',
        label: 'name',
        value:'id',
      },
      otherData:{
        deleteApiName:'api_label_update',
      },
      defaultChecked:[]
      

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

    async initMainData(){
      const self =this;
      var data = self.$$cloneForm(self.$router.options.routes);
      console.log('initMainData-data',data)
      for (var i = 0; i < data.length; i++) {
        if(!(data[i].meta&&data[i].meta.application&&data[i].meta.application.indexOf('notInAuth'))){
          self.mainData.push(data[i]);
        };
      };
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
      console.log('init')
      this.onUpdateParams()
      this.initMainData()
      //this.initMenuData()

      const  routerquery = this.$route.params;
      this.user_no = routerquery.user_no;
      this.defaultChecked = routerquery.defaultChecked;
      if(!this.user_no||!this.defaultChecked){
        this.$router.push('/user/adminLists/adminLists');
      };
      console.log('this.user_no',this.user_no)
      console.log('this.defaultChecked',this.defaultChecked)
    },

    async onClickBtn(param){
      const self = this;
      console.log('onClickBtn',param)

      var res = param[2].getCheckedNodesAlone();
      var newArray = [];
      for (var i = 0; i < res.length; i++) {
        newArray.push(res[i].id)
      };
      
      var postData = {
        searchItem:{
          user_no:self.user_no
        },
        data:{
          passage_array:newArray
        }
      };

      var res =  await self.$$api_user_update({data: postData});
      if(res.solely_code==100000){
        this.$$notify('更新权限成功','success');
      }else{
        this.$$notify('更新权限失败','error');
      };
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
