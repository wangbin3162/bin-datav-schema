module.exports = {
  root: true,
  globals: {
    defineEmits: true,
    defineProps: true,
    defineExpose: true,
  },
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  rules: {
    'indent': 'off',
    'space-before-function-paren': 'off',
    'no-unused-vars': 'off',
    'template-curly-spacing': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'vue/no-mutating-props': 'off',
  },
}
