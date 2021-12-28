# 分析平台配置说明

## 一、文件目录

### 1.1、schema-editor 核心目录

    ├── canvas-main                // 核心画布组件内容
    │   ├── dv-transform           // 组件外侧transform容器，主要用于处理位置、旋转、缩放、大小等。
    │   ├── mark-line              // 对齐线，开启吸附时进行渲染吸附对齐线。
    │   ├── ruler                  // 画布标尺内容
    ├── components-panel           // 组件列表部分
    ├── config-panel               // 配置面板信息
    │   ├── components             // 配置面板基础组件，如基础setting（尺寸旋转等），配置标题，数据编辑器，显示api状态等。
    │   ├── data-center-panel      // 数据中心面板，包括静态数据及动态数据
    │   ├── setting-panel          // 设置面板，不同组件设置的加载器
    │   ├── page-config.vue        // 全局page页面配置面板，配置页面信息参数
    │   ├── index.vue              // 设置面板入口
    ├── context-menu               // 右键菜单组件
    ├── footer-panel               // git 忽略项
    ├── header-bar                 // 头部工具条
    ├── layer-panel                // 图层面板
    ├── toolbox-panel              // 画布工具箱
    └── index.vue                  // screen-editor入口

### 1.2、schema-components

`src/components/Schema/`为组件目录，每个组件分类一个文件夹，不同组件放置于不同位置，以`basic-bar`组件为例

    ├── config.js                  // 组件配置文件js
    ├── config.vue                 // 组件配置面板config
    ├── main.vue                   // 组件渲染主组件内容
    ├── index.js                   // 组件导出入口

## 二、新增组件

### 2.1、新增基础配置

`src/config/components-list`新增一个组件基础配置，以V跟组件名为命名，如VMainTitle，并放置对应位置到list数组中导出。

### 2.2、编写组件相关文件

如main-title，在合适的位置编写组件基础配置以及对应的主组件`main.vue` 和`config.vue` 配置组件，并编写`config.js`配置内容

### 2.3、编写config.js

配置项内容包含基础部分以及数据部分，结构大概如下

```javascript
export const mainTitleConfig = {
  alias: '通用标题',                        // 组件别名
  icon: 'file-word',                       // 组件的显示图标
  type: ComType.com,                       // 组件的类型 （暂时都是默认为com）
  attr: { w: 300, h: 48 },                 // 组件初始的宽高数据
  config: { title: '我是标题数据' },         // 组件独有的配置项，完全自定义，在组件渲染的`main.vue` 和`config.vue`中进行配置操作
  apiData: initApiData({}),                // 组件的数据存储配置，如无需数据则为{}，通常数据需要调用此函数进行初始化。具体参考下方详细说明。
  events: {},                              // 组件事件配置项
}
```

组件基本配置项以及对应的主渲染、主配置组件导出后，在`src/components/Schema/index.js`进行注册，后续即可生成。

### 2.4、创建组件配置

`src/config/components-cfg`文件， 将刚刚配置过的文件名新增至创建函数中，如下

```javascript
export function createComponent(name) {
  switch (name.substr(1)) {
    case 'MainTitle':
      return mergeConfig('MainTitle', mainTitleConfig)
    default:
      throw Error(`Unknown component type: ${name}.`)
  }
}
```

通常如果控制台警告或者是拖拽点击组件没有反应，基本都是组件没有注册或者此处没有返回对应的配置项信息。

新增的组件，只需编写基本的组件名称即可，`mergeConfig`函数回默认将不同的组件配置项以及基础默认的`DatavComponent`配置项进行merge。

### 2.5、渲染组件

之后，页面中组件列表中就会正常渲染新增的组件，并且可以正常进行拖拽生成以及配置操作。具体的业务组件，即根据业务自行编辑即可。

## 三、组件配置config详解

一个组件配置的config.js包含了全部的组件配置信息。

### 3.1、根属性解析，默认的属性为*标识

| 属性名    | 说明    |
|----------|-------- |
| id*      | 默认参数，组件唯一编码，组件拖拽/点击创建时，在配置项merge时自主生成   |
| name*    | 默认参数，组件名称，创建组件的名称，需要跟组件main.vue中的名称保持一致，是动态渲染组件的依据   |
| locked*  | 默认参数，组件是否锁定，锁定状态的组件，在画布中无法点选，图层面板可选中   |
| hided *  | 默认参数，组件是否是隐藏的，隐藏状态的组件，在画布中不渲染，图层面板可选中   |
| type     | 组件的类别，目前暂时权威com，即基础组件类型，后续可能回扩充容器组件、布局组件等   |
| alias    | 组件的别名，一般为中文，也是图层以及组件重命名时修改的字段   |
| icon     | 组件渲染图层时的前缀图标   |
| attr     | 组件transform数据， x: left,y: top, w: 宽度,h: 高度,rotate: 旋转角度,opacity: 透明度 ,自定义的时候一般只需要指定宽高即可  |
| config   | 组件独有的核心配置项，需要根据当前配置编辑不同的main.vue 以及 config.vue组件   |
| apiData  | 组件自定义的数据存储配置，主要为存储组件的数据来源（静态/api)，以及staticPath静态资源的接口地址等。  |
| events   | 组件自定义的事件配置，如配置click点击事件，   |

### 3.2、apiData 组件自定义数据存储配置

一般根据业务组件类型定义，如纯静态组件则直接设置为{}，否则需要初始化函数`initApiData`进行创建

初始化字段以及初始化配置均在`src/config/data-source.js`，图表类型一般需要配置静态数据存储路径。

注：静态路径一般需要如下配置，此时需要至`public/data/`中去编写一个json文件，以便静态数据请求时能够灵活定义。具体数据加载时机请看下面的详细说明。

注：comId ，为组件唯一标识，merge配置项时会自动注入，为了方便获取对应组件内容。

```javascript
const basicBarConfig = {
  //...
  apiData: initApiData({ staticPath: 'bar/basic-bar' }),
  //...
}

// result
source = {
  "comId": "BasicLine_4353",
  "id": "api_2631",
  "config": { "data": "[{\"x\":\"上海\",\"y\":23}]", "seriesCount": 1 },
  "type": "static",
  "staticPath": "line/basic-line"
}
```

## 四、页面配置数据流程简述

以下的内容，组件screen编辑器路径为`view/schema/screen-editor`，组件路径为`components/Schema`，hooks目录为`hooks/schema`

### 4.1、点选/拖拽 组件至画布

通过点选或拖拽将组件拖拽至画布中，其中

    组件面板点击->在`screen-editor/screencomponents-panel`中会调用`toAddCom`函数，创建对应组件，并添加至`vuex/schema/comps`中
    组件拖拽至面板->在`screen-editor/canvas-main`中会调用`dropToAddCom`函数，创建对应组件，并添加至`vuex/schema/comps`中

不同的是，点击创建组件会默认添加至屏幕中间，拖拽生成的组件会放置到对应的位置。并且，添加组件至vuex/state中

接着会根据组件的配置，如果需要配置数据apiData，则手动执行一次静态数据填充

```javascript
  // 如是静态数据，且存在staticPath，则填充一次数据
if (com.apiData && com.apiData.type === ApiType.static && com.apiData.staticPath) {
  const { data } = await getStaticData(com.id, com.apiData.staticPath)
  selectedCom.value.apiData.config.data = JSON.stringify(data)
}
```

注：getStaticData，会去`public/data/`目录中获取json静态数据文件的数据，以便外部可以灵活修改。

### 4.2、canvas-main 画布渲染组件

`screen-editor/canvas-main/index.vue`画布核心组件，会获取vux中的comps列表数据进行循环，
其中组件需要用dv-transform包裹，主要实现缩放、位置等配置，然后借助component组件 `:is="comp.name"` 会渲染实际组件的main.vue，其中main.vue
的组件均需要提供props.data来接收不同组件的配置信息。

### 4.3、自定义组件 main.vue 渲染组件

载入的不同组件main.vue会进行不同组件的渲染，组件需要提供props.data来接收配置信息，组件的setup，中一般需要编写如下信息

```javascript
    // config 配置项（必须）
const config = computed(() => props.data.config)
// attr 属性用于渲染容器宽高等（必须）
const attr = computed(() => props.data.attr)
const { dvData, dvEmit } = useDataCenter(props.data)
```

userDataCenter 函数，主要是每个需要数据配置的组件进行数据组装。

```javascript
// 监听数据变更，如apis配置变化了或数据配置项apiData.source.config中修改了，则需要重新设置数据
watch([() => apiData.value.type, apiData.value.config], async () => {
  await setDvData()
}, { deep: true, immediate: true })
```

setDvData 用于设置全局loading等和获取数据信息

```javascript
const setDvData = async () => {
  const { type, config } = apiData.value
  $store.commit('schema/setLoading', true)
  try {
    // 获取源数据
    if (type === ApiType.static) {
      dvData.value = toJson(config.data, {})
    } else {
      // todo: 动态api，获取数据
      dvData.value = {}
    }
  } catch (e) {
    throwError('useDataCenter/setDvData', e)
  }
  setTimeout(() => {
    $store.commit('schema/setLoading', false)
  }, 800)
}
```

    1、初始化loading状态
    2、根据静态还是api进行数据填充，填充至dvData 对象中去，再根据不同组件的需求进行解析使用即可

最后，在main.vue中，会固定获取几个数据值，用于进行数据渲染操作,此部分的数据，可能需要修改

```javascript
// data-cetner
const { dvData, dvEmit } = useDataCenter(props.data)
// config 配置项
const config = computed(() => props.data.config)
// attr 属性
const attr = computed(() => props.data.attr)
// 容器style，自定义，根据不同的组件进行编写
const wrapperStyle = computed(() => ({ width: `${attr.value.w}px`, height: `${attr.value.h}px` }))
// 图表数据，自定义，根据不同图表或者实际需求进行编写
const chartData = computed(() => ({
  xData: dvData.value.xData ?? [],
  yData: dvData.value.yData ?? [],
}))

//...

// 自定义，图表类型，系列数量是动态更新的，隐藏需要额外设置此项。设置seriesCount
watch(() => dvData.value, val => {
  props.data.apiData.config.seriesCount = val.yData ? val.yData.length : 0
})
// 图表类型的组件可选，后续需要做成动态监听的。注册事件
onMounted(() => {
  chartRef.value && chartRef.value.getInstance().on('click', onClick)
})
```
