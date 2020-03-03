export default {
  name: 'dashboard',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      table_arguments:{
        height:'70%',
        row_key:'id',
        tree_props:{
          children: 'child',
          child: 'child',
          hasChildren:'child'
        },
        default_expand_all:false,
        expand:false,
        selection:true,
        cell_style:{}
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
          key: 'type',
          label: '状态',
          application:['编辑'],
          formatter:function(val,tests){
            var testArray = ['未处理','已处理']
            return testArray[val.type];
          },
          componentName:'sls-select',
          optionsName:'typeOptions',
          listType:'normal',
          limit:10,
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          placeholder:'请选择状态',
          width:100,
          header_search:{
            componentName:'sls-select',
            optionsName:'typeOptions',
            style:'width:160px;margin-right:2px;',
            placeholder:'请选择状态',
            changeFunc:function(val,self){
              if(val){
                self.searchItem.type = val;
              }else{
                delete self.searchItem.type;
              };
              self.initMainData(true);
            },
          }
        },
        {
          key: 'title',
          label: '姓名',
          application:['编辑'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'content',
          label: '备注',
          application:['编辑'],
          componentName:'sls-textarea',
          listType:'normal',
          dialogStyle:'width:90%'
        },
        {
          key: 'phone',
          label: '电话',
          application:['编辑'],
          componentName:'sls-input',
          listType:'normal',
        },
        {
          key: 'create_time',
          label: '创建时间',
          listType:'normal',
          placeholder:'请选择创建时间',

          width:200,
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
                return "api_messageUpdate"
              },
              formData:function(self){
                return self.formData
              },
              postData:function(self){
                var postData={
                  searchItem:{
                    id:self.formData.id,
                  },
                  data:self.submitData
                };
                if(self.submitData.parentid&&self.submitData.parentid==self.formData.id){
                  self.$$notify('父级ID和子级ID重叠','fail');
                  return false;
                }else{
                  return postData;
                };

              },
              callback:function(self){
                self.initMessageData(true)
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
                return "api_routineUpdate"
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
            size:'mini',
            position:'list',
            text:function(data){
              return '编辑信息'
            },
            func:{
              apiName:function(self){
                if(JSON.stringify(self.user) == "{}"){
                  return "api_userInfoAdd";
                }else{
                  return "api_userInfoUpdate";
                };
              },
              formData:function(self){
                return self.user
              },
              postData:function(self){
                var postData={
                  searchItem:{
                    id:self.formData.id,
                  },
                  data:self.submitData
                };
                if(self.submitData.parentid&&self.submitData.parentid==self.formData.id){
                  self.$$notify('父级ID和子级ID重叠','fail');
                  return false;
                }else{
                  return postData;
                };

              },
              callback:function(self){
                self.initUserInfoData()
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
        leftNum:0,
        layout: 'total, sizes, prev, pager, next, jumper',
      },

      visitorPaginate: {
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
        labelOptions:[],
        typeOptions:[{
          text: '未处理',
          value: 0
        }, {
          text: '已处理',
          value: 1
        }],
      },
      otherData:{},
      UserInfo:{
        tableName:'UserInfo',
        searchItem:{},
        fixSearchItem:{
          status:1
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
      selectionArray:[],
      user:{},
      isSign:false,
      visitorData:[],
      echartsOptions:{},
      loading:false

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
      this.initMainData();
      this.initUserInfoData();
      this.initVisitorData();

    },

    /**
     *
     */
    async initUserInfoData (isNew) {

      const self = this;
      const postData  = {};
      postData.token = self.$store.getters.getToken;
      var res =  await self.$$api_userInfoGet({data: postData});
      if(res.info.data.length>0){
        self.user = res.info.data[0];
      }else{
        self.user = {};
      };

    },


    /**
     * 列表主函数
     */
    async initMainData (isNew) {

      const self = this;
      self.loading = true;
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
      postData.order = {
        'create_time':'desc'
      };
      var res =  await self.$$api_messageGet({data: postData});
      
      self.mainData = res.info.data;
      self.paginate.count = res.info.total;
      self.paginate.leftNum = Math.ceil(self.paginate.count/self.paginate.pagesize) - self.paginate.currentPage;
      self.loading = false;
    },

    /**
     * 列表主函数
     */
    async initVisitorData (isNew) {

      const self = this;
      const postData  = {};
      if(isNew){
        self.visitorPaginate.currentPage = 1;
        self.visitorData = [];
      };
      postData.order = {
        'create_time':'desc'
      };
      postData.searchItem = {
        thirdapp_id:2,
        'create_time':['between',[new Date(new Date().toLocaleDateString()).getTime()/1000-6*86400,new Date(new Date().toLocaleDateString()).getTime()/1000+86400]]
      };
      var res =  await self.$$api_visitorLogsGet({data: postData});
      self.visitorData = res.info.data;
      var echartsOptions = {
        title: {
          text: '访客曲线'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['访客数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel : {//坐标轴刻度标签的相关设置。
            interval:0,
            rotate:"60"
          },
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '访客数',
          type: 'line',
          stack: '总量',
          data: []
        }],
      };
      for(var i=0;i<self.visitorData.length;i++){
        var create_day = self.visitorData[i]['create_time'].substring(0,10);
        var index = echartsOptions.xAxis.data.indexOf(create_day);
        if(index>-1){
          echartsOptions.series[0]['data'][index] = echartsOptions.series[0]['data'][index] + 1;
        }else{
          echartsOptions.xAxis.data.push(create_day);
          echartsOptions.series[0]['data'].push(0);
        };
      };
      self.echartsOptions = echartsOptions;
      console.log('echartsOptions',echartsOptions)
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
      const self = this;
      self.paginate.currentPage++;
      self.initMainData();
    },

    onClickBtn(val){

      const self = this;
      self.submitData = {};
      self.formData = val[1];
      self.btnName = val[0];
      self.formData = val[2].func.formData?self.$$cloneForm(val[2].func.formData(self)):{};
      self.orginFormData = val[1];
      console.log('self.formData',self.formData)
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
      if(Object.field.key=='coordinate'){
        self.formData['latitude'] = Object.value.lat;
        self.formData['longtitude'] = Object.value.lng;
        self.submitData['latitude'] = Object.value.lat;
        self.submitData['longtitude'] = Object.value.lng;
      }else{
        self.formData[Object.field.key] = Object.value;
        self.submitData[Object.field.key] = Object.value;
      };
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
    }

  },


}
