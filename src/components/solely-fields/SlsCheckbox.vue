<template>
  <div>
    <!-- 普通CheckBox -->
    <el-checkbox-group
      @change="onChange"

      v-model="checkbox_defaultValue">

      <el-checkbox
        v-if="optionData&&JSON.stringify(optionData)!='[]'"
        v-for='(item,index) in optionData'
        :key='index'
        :label="item[field.defaultProps.label]">
        {{item[field.defaultProps.value]}}
      </el-checkbox>

    </el-checkbox-group>
  </div>
</template>

<script>
  import Common from './js/Common'

  var Js = Common('sls-checkbox')
  Js.mixins = [{
    data () {
      return {
        checkbox_defaultValue:[]
      }
    },
    mounted () {
      this.checkbox_defaultValue = this.defaultValue;
    },
    computed: {
      checkbox_group_attrs () {
        return this.Data.checkbox_group_attrs || {}
      },
      checkbox_attrs () {
        return this.Data.checkbox_attrs || {}
      }
    },
    methods: {
      onChange (v) {
        /*if (Array.isArray(v)) {
          this.submit_info[this.data.key] = []
          v.forEach((item) => {
            this.submit_info[this.data.key].push(this.temp_field_obj[this.data.key][item])
          })
        }
        this.events.change && this.events.change({value: v, info: this.submit_info[this.data.key]});*/
        this.$emit('onChange', [this.data.key,v]);
      }
    }
  }]
  export default Js
</script>

<style >

</style>
