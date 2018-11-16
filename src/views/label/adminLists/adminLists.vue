<template>
  <div class="list">
  <button @click="test">token</button>
  <span>{{$router.path}}</span>
    <list-data
      ref='list-data'
      @onClickBtnAdd="onClickBtnAdd"
      @onClickBtn="onClickBtn"
      @onClickBtnDelete="onClickBtnDelete"
      @onClickBtnBatchDelete="onClickBtnBatchDelete"
      @onClickBtnUpdate="onClickBtnUpdate"
      @onClickBtnSelect="onClickBtnSelect"
      @pageChange="pageChange"
      @onChangePageSize="onChangePageSize"
      @onSelectionChange="onSelectionChange"
      @onSearch="onSearch"
      @filtersChange="filtersChange"
      @initMainData="initMainData"
      :List='list'
      :Pagination="paginate"
      :Search="search_data"
      :BtnInfo="btn_info"
      :FieldList='fields'
      :pagination='paginate'
      :optionData='optionData'
    >
      <!--<span slot="header-after">我是自定义的header-after内容</span>-->
      <!--<span slot="header-before">我是自定义的header-before内容</span>-->
    </list-data>
  </div>
</template>

<script>
  import adminListsJs from './adminLists.js'

  export default adminListsJs
</script>
<style scoped lang='less'>
  .demo-form-inline {
    display: inline-block;
    float: right;
  }

  .btm-action {
    margin-top: 20px;
    text-align: center;
  }

  .actions-top {
    height: 46px;
  }

  .pagination {
    display: inline-block;
  }
</style>
