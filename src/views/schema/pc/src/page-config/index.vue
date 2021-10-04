<template>
  <div class="page-config-panel">
    <div class="page-config-top">页面设置</div>
    <div class="page-config-content">
      <div class="page-config-content-tabs">
        <div class="tabs-wrapper">
          <div class="tab-item active">主题</div>
        </div>
        <div class="setting-content schema-setting-content">
          <b-collapse simple>
            <b-collapse-panel title="仪表板主题" name="1">
              <div class="edit-item-title">主题模板</div>
            </b-collapse-panel>
            <b-collapse-panel title="全局配置" name="2">
              <div class="edit-item-title">主题模式</div>
            </b-collapse-panel>
          </b-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-config-panel',
}
</script>
