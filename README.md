# bin-datav-schema


## 新增组件

1、`src/config/components-list`新增一个组件基础配置，以V跟组件名为命名，如VMainTitle，并放置对应位置到list分组下。

2、编写组件配置，如main-title，在合适的位置编写组件基础配置以及对应的主组件`main.vue` 和`config.vue` 配置组件，并编写`config.js`配置内容

3、config.js配置项内容包含基础部分以及数据部分，结构大概如下
```js
export const mainTitleConfig = {
  alias: '通用标题',
  icon: 'file-word',
  type: ComType.com,
  attr: { w: 300, h: 48 },
  config: {
    title: '我是标题数据',
  },
  apis: initApiConfig({
    fields: Object.assign({}, ...fields),
  }),
  apiData: initApiData({ staticPath: 'text/main-title' }),
  events: {},
  actions: {},
}

```

其中，config之前的内容为通用内容，必须包含，config内容即为组件配置项，对应apis为数据配置字段，apiData为数据存储配置，events为事件配置，actions是操作配置（操作配置暂未实现）

3、`src/config/components-cfg`文件， 将刚刚配置过的文件名新增至创建函数中，如下

```js
export function createComponent(name) {
  switch (name.substr(1)) {
    case 'MainTitle':
      return mergeConfig('MainTitle', mainTitleConfig)
    default:
      throw Error(`Unknown component type: ${name}.`)
  }
}
```

4、之后就可以正常进行组件渲染了，不同的组件需要编写不同的渲染组件和配置组件，具体根据业务实现开发。
