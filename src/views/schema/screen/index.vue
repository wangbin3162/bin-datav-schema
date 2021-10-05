<template>
  <schema-editor></schema-editor>
</template>

<script>
import { onMounted } from 'vue'
import { setAttrVar } from '@/config/setting.cfg'
import usePage from '@/views/schema/screen/hooks/use-page'
import SchemaEditor from '@/components/SchemaEditor/index.vue'

export default {
  name: 'Screen',
  components: { SchemaEditor },
  setup() {
    const pageStatus = usePage()

    onMounted(() => {
      setAttrVar('data-schema', 'screen')
    })
    return {
      ...pageStatus,
    }
  },
}
</script>
