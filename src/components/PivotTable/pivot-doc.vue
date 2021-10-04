<template>
  <b-collapse simple>
    <b-collapse-panel title="Pivot component" name="1">
      <b-table :columns="docCol1" :data="docData1" size="small" border></b-table>
    </b-collapse-panel>
    <b-collapse-panel title="fields element format" name="2">
      <b-tag type="primary" dark>Fields</b-tag>
      <b-table :columns="docCol2" :data="docData2" size="small" border></b-table>
      <b-divider></b-divider>
      <b-tag type="primary" dark>headers</b-tag>
      <b-table :columns="docCol2" :data="docData3" size="small" border></b-table>
    </b-collapse-panel>
    <b-collapse-panel title="Slots" name="3">
      <b-table :columns="docCol3" :data="docData4" size="small" border></b-table>
    </b-collapse-panel>
    <b-collapse-panel title="PivotTable component" name="4">
      <b-tag type="primary" dark>PivotTable</b-tag>
      <b-table :columns="docCol1" :data="docData5" size="small" border></b-table>
      <b-divider></b-divider>
      <b-tag type="primary" dark>row-fields/col-fields</b-tag>
      <b-table :columns="docCol2" :data="docData6" size="small" border></b-table>
    </b-collapse-panel>
  </b-collapse>
</template>

<script>
export default {
  name: 'pivot-doc',
  data() {
    return {
      // doc
      docCol1: [
        { title: '属性名', key: 'prop', width: 220 },
        { title: '类型', key: 'type', width: 100 },
        { title: '默认值', key: 'default', width: 220 },
        { title: '描述', key: 'desc' },
      ],
      docCol2: [
        { title: '属性名', key: 'prop', width: 220 },
        { title: '类型', key: 'type', width: 100 },
        { title: '描述', key: 'desc' },
      ],
      docCol3: [
        { title: '插槽名', key: 'slot', width: 240 },
        { title: '描述', key: 'desc' },
        { title: 'Scope', key: 'scope', width: 160 },
      ],
      docData1: [
        { prop: 'data', type: 'Array', default: '[]', desc: 'pivot表格数据集' },
        { prop: 'fields', type: 'Array', default: '[]', desc: '定义了所有行列字段配置信息。具体包含如下' },
        { prop: 'available-field-keys', type: 'Array', default: '[]', desc: '默认情况下显示为“可用”的字段的键' },
        { prop: 'row-field-keys', type: 'Array', default: '[]', desc: '默认情况下要作为行使用的字段的键' },
        { prop: 'col-field-keys', type: 'Array', default: '[]', desc: '默认情况下要作为列使用的字段的键' },
        { prop: 'reducer', type: 'function', default: '(sum, item) => sum + 1', desc: '计算表数据累加器' },
        { prop: 'reducer-initial-value', type: 'any', default: '0', desc: '累加器初始值' },
        { prop: 'no-data-warning-text', type: 'String', default: 'No data to display.', desc: '无数据文字' },
        { prop: 'is-data-loading', type: 'Boolean', default: 'false', desc: '是否加载' },
        { prop: 'default-show-settings', type: 'Boolean', default: 'true', desc: '是否显示设置按钮' },
        { prop: 'available-fields-label-text', type: 'String', default: 'Available fields', desc: '可选字段标题' },
        { prop: 'rows-label-text', type: 'String', default: 'Available fields', desc: '可选字段标题' },
        { prop: 'rows-label-text', type: 'String', default: 'Rows', desc: '行字段标题' },
        { prop: 'cols-label-text', type: 'String', default: 'Columns', desc: '列字段标题' },
        { prop: 'hide-settings-text', type: 'String', default: 'Hide settings', desc: '隐藏设置文字' },
        { prop: 'show-settings-text', type: 'String', default: 'Show settings', desc: '显示设置文字' },
      ],
      docData2: [
        { prop: 'key', type: 'String', desc: '用于标识字段的key' },
        { prop: 'label', type: 'String', desc: '在可拖动元素中显示的文本' },
        { prop: 'labelSlotName', type: 'String', desc: '可选-用于格式化标签内容的槽位名称' },
        { prop: 'getter', type: 'Function', desc: '函数应用于数据元素以获取字段值，如 getter: item => item.country' },
        { prop: 'sort', type: 'Function', desc: '可选-在pivot表头中排序字段的函数;如果没有提供值，将应用javascript-natural-sort' },
        { prop: 'showHeader', type: 'Boolean', desc: '可选(默认值:true)—标题是否应该显示在数据透视表中' },
        { prop: 'showFooter', type: 'Boolean', desc: '可选(默认:false)—页脚是否应该显示在透视表中' },
        { prop: 'headerSlotName', type: 'String', desc: '可选-用于格式化数据透视表头部的槽名;如果没有提供槽位名称，则该值将显示为data中找到的值' },
        { prop: 'headerSlotNames', type: 'String[]', desc: '可选-用于在数据透视表中格式化标题的槽名' },
        { prop: 'headers', type: 'Array', desc: '可选-标题的定义(参见标题元素格式)' },
        { prop: 'footerSlotName', type: 'String', desc: '与上面表头插槽雷同' },
        { prop: 'footerSlotNames', type: 'String[]', desc: '与上面表头插槽雷同' },
        { prop: 'headerAttributeFilter', type: 'Boolean', desc: '可选(默认:false) -激活下拉菜单过滤字段头属性' },
        { prop: 'valueFilter', type: 'Boolean', desc: '可选(默认:false) -激活下拉菜单过滤字段值' },
        { prop: 'valueFilterSlotName', type: 'Boolean', desc: '可选—用于格式化字段值选择下拉列表中的值的槽名' },
      ],
      docData3: [
        { prop: 'slotName', type: 'String', desc: '用于格式化数据透视表头部的槽名' },
        { prop: 'label', type: 'String', desc: '如果headerAttributeFilter被激活，在字段下拉:标签显示在复选框旁边' },
        { prop: 'checked', type: 'Boolean', desc: '如果headerAttributeFilter被激活，在下拉字段中:默认复选框值' },
      ],
      docData4: [
        { slot: '<field label slot name>', scope: '', desc: '显示在字段可拖动标签中的内容' },
        { slot: '<field header slot name>', scope: '{ value }', desc: '字段的表头内容，从字段头slotname属性引用' },
        {
          slot: '<field value filter slot name>',
          scope: '{ value }',
          desc: '如果字段valueFilter prop被设置为true:复选框旁边菜单中的内容',
        },
        { slot: 'value', scope: '{ value, row, col }', desc: '单元格内容' },
      ],
      docData5: [
        { prop: 'data', type: 'Array', default: '[]', desc: 'pivot表格数据集' },
        { prop: 'row-fields', type: 'Array', default: '[]', desc: '默认情况下作为行使用的字段' },
        { prop: 'col-fields', type: 'Array', default: '[]', desc: '默认情况下作为列使用的字段' },
        { prop: 'reducer', type: 'function', default: '(sum, item) => sum + 1', desc: '计算表数据累加器' },
        { prop: 'reducer-initial-value', type: 'any', default: '0', desc: '累加器初始值' },
        { prop: 'no-data-warning-text', type: 'String', default: 'No data to display.', desc: '无数据文字' },
        { prop: 'is-data-loading', type: 'Boolean', default: 'false', desc: '是否加载' },
      ],
      docData6: [
        { prop: 'getter', type: 'Function', desc: '函数应用于数据元素以获取字段值，如 getter: item => item.country' },
        { prop: 'sort', type: 'Function', desc: '可选-在pivot表头中排序字段的函数;如果没有提供值，将应用javascript-natural-sort' },
        { prop: 'showHeader', type: 'Boolean', desc: '可选(默认值:true)—标题是否应该显示在数据透视表中' },
        { prop: 'showFooter', type: 'Boolean', desc: '可选(默认:false)—页脚是否应该显示在透视表中' },
        { prop: 'headerSlotName', type: 'String', desc: '可选-用于格式化数据透视表头部的槽名;如果没有提供槽位名称，则该值将显示为data中找到的值' },
        { prop: 'headerSlotNames', type: 'String[]', desc: '可选-用于在数据透视表中格式化标题的槽名' },
        { prop: 'footerSlotName', type: 'String', desc: '与上面表头插槽雷同' },
        { prop: 'footerSlotNames', type: 'String[]', desc: '与上面表头插槽雷同' },
        { prop: 'valuesFiltered', type: 'Set', desc: '可选-一组值来过滤显示的行/列' },
      ],
    }
  },
}
</script>
