<template>
    <div style="height: 100%;">

        <el-row :gutter="20" style="height: 100%;">
            <el-col :span="12" style="height: 100%;">
                <el-row style="height: 100%;">
                    <el-col style="height: 100%;">
                        <el-card shadow="hover" class="mgb20" style="height:30%;" body-style="height:100%">
                            <div   style="height: 70%;display: flex;">
                                <div style="width: 18%;">
                                  <img :src="user.mainImg&&user.mainImg.length>0?user.mainImg[0]['url']:'../../assets/logo.png'" class="user-avator" />
                                </div>
                                <div class="user-info-cont">
                                    <div>{{user.name}}</div>
                                    <div style="margin-top: 20px;text-align: left;">电话：{{user.phone}}</div>
                                    <div style="text-align: left;">地址：{{user.address}}</div>
                                </div>
                                <div style="text-align: center;width: 50%;">
                                  <div>
                                    <el-button type="primary" plain style="margin-bottom:5px;" size="small" @click="onClickBtn(['编辑信息',{},btn_info[6]])">编辑信息</el-button>
                                  </div>
                                </div>
                            </div>
                            <div class="user-info-list">上次登录时间：<span>{{self.$$formatDate( new Date(parseInt(self.$store.getters.getUserinfo.lastlogintime*1000)) ,'yyyy-MM-dd hh:mm')}}</span></div>
                        </el-card>
                        <el-card shadow="hover" style="height:50%;padding-bottom: 15%;overflow: hidden;" body-style="height:100%">
                            <div slot="header" class="clearfix">
                                <span>访问统计<span style="font-size: 14px;">&nbsp;&nbsp;(本周访客共计--{{visitorData.length}}--次)</span></span>
                            </div>
                            <div  style="height:100%">
                              <solely-echarts :options="echartsOptions"></solely-echarts>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12" style="height: 100%;">

                <el-card  shadow="hover"  style="overflow:auto;height:95%">
                    <div slot="header" class="clearfix">
                        <span>留言面板</span>
                    </div>
                    <template>
                        <el-main >

                          <template v-for="(item,index) in mainData"  >
                            <el-card :key="index"  shadow="hover" class="mgb20">
                              <div style="text-align: left;margin-bottom: 10px;font-weight: bold;color:#f1e05a">姓名&nbsp;&nbsp;&nbsp;--&nbsp;{{item.title}}</div>
                              <div style="margin-bottom: 30px;">{{item.content}}</div>
                              <div style="text-align: left;font-size: 14px;margin-bottom: 10px;">
                                <span style="font-weight: bold;">联系方式：</span>
                                <span>
                                  {{item.phone}}
                                </span>
                                </div>
                              <div class="user-info-list">{{item.create_time}}</div>
                            </el-card>
                          </template>
                        </el-main>
                        <div @click="pageChange" v-loading="loading">
                          {{paginate.leftNum>0?'加载更多':''}}
                        </div>
                    </template>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog
        :title="btnNow.text&&btnNow.text(orginFormData)?btnNow.text(orginFormData):''"
        :visible.sync="dialog.dialogFormVisible"
        :close-on-click-modal = 'false'

        >
          <div style="overflow:hidden;zoom:1;text-align: left;padding: 2%;">

            <template v-for='(field,index) in fields'>
               <div
                :key="index"
                 v-if="btnName&&field.application&& field.application.indexOf(btnName)>-1&&((field.isHide&&!field.isHide(self))||!field.isHide)"
                 style="float: left;margin-right: 2%;margin-bottom:5%;padding-left: 1%;"
                 :style="field.dialogStyle?field.dialogStyle:'width:47%'"
                 :label-width="formLabelWidth"
               >
                 <div style="display: inline-block;width: 100px;text-align: left;font-weight: bold;vertical-align: top;">{{field.label}}：</div>
                 <div style="display: inline-block;min-width: 225px;min-height: 50px;">

                   <component
                     :field="field"
                     :optionData="optionData[field.optionsName]"
                     :defaultValue="formData[field.key]||formData[field.key]==0?formData[field.key]:''"
                     :is="field.componentName || 'sls-input'"
                     :fieldArguments="field.dialog?field.dialog:'{}'"
                     @onChange="dialog_fieldChange"
                   >
                   </component>
                 </div>
               </div>
            </template>

          </div>
          <div slot="footer" class="dialog-footer" style="text-align: center;">
            <el-button @click="dialog.dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
  import dashboardJs from './dashboard.js'
  export default dashboardJs
</script>


<style scoped>

    .el-row {
        margin-bottom: 20px;
    }
    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    .user-info-cont {
        width: 30%;
        margin-left: 10px;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
        text-align: center;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
        border-top: 1px solid #e6e2e2;

    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

</style>
