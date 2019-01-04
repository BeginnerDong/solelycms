<template>
  <div>
    <el-upload
      class="upload-demo"
      action=""
      :limit="data.limit"
      :on-success="handlesuccess"
      :on-remove="handleRemove"
      :file-list="normalizedImglist"
      :http-request="handleFileUpload"
      list-type="text">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,上传张数限制 {{data.limit}}张</div>
    </el-upload>
  </div>
</template>
<script>
  import Common from './js/Common'
  import plugins from '../../../register/plugin.js'
  import store from 'store/'
  var Js = Common('upload')
  Js.mixins = [{
    data () {
      return {
        defaultProps: {
          children: 'child',
          label: 'title',
          value: 'id',
        },
      }
    },
    computed: {
      cascader_attrs () {
        return this.Data.cascader_attrs || {}
      },
      
      normalizedImglist () {
        if(this.isArrayFn(this.submit_data[this.data.key])){
          return this.submit_data[this.data.key];
        }else{
          return [];
        }
      }
    },
    methods: {

      isArrayFn(value){
        if (typeof Array.isArray === "function") {
        return Array.isArray(value);
        }else{
        return Object.prototype.toString.call(value) === "[object Array]";
        }
      },

      imageChange(fileList){
        if(fileList.length){
          var imgArray = [];
          fileList.forEach((item, index) => {
            imgArray.push(
              {
                name:item['name'],
                url:item['url']
              }
            );
          });
          return imgArray;
          
        }else{
          return 'empty';       
        };

      },

      handleRemove(file, fileList) {
        const self = this;       
        self.$emit('onChange',[this.data.key,this.imageChange(fileList)]);
      },
      
      handlesuccess(response, file, fileList){
        const self = this;
        file.url = self.response;
        self.$emit('onChange',[this.data.key,this.imageChange(fileList)]);
      },
      
      async handleFileUpload(data){
        const self = this;
        
        let file = data.file;
        let param = new FormData();
        
        param.append('file', file, file.name);
        param.append('token', store.getters.getToken);

        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
        };
        //console.log(self.$store.getters.getUserInfo.token);     
        var res = await plugins.api_system_uploadImg({data: param,headers: {'Content-Type': 'multipart/form-data'}});
        console.log(res)
        
        this.response = res.info.url;
        
      },
      
      onChange (val) {
        this.$emit('onChange', [this.data.key,val[val.length-1]])
      },

    },
    created () {
      if (!this.submit_data[this.data.key] || !Array.isArray(this.submit_data[this.data.key])) {
        this.submit_data[this.data.key] = []
      }
      this.temp_field_obj[this.data.key] = []
    },
    mounted () {

    }
  }]
  export default Js
</script>
