import { builder, getQueryParameters } from '@/mock/util'
import Mock from 'mockjs'
import { generateId } from '@/utils/util'
import { FIELD_TYPE } from '@/components/Service/LinkNode/node-util'

const idMock = []

for (let i = 0; i < 3; i++) {
  idMock.push(generateId().toString())
}

const tables = [
  {
    id: idMock[0],
    title: 'analysis',
    tableName: 'analysis',
    fields: [
      {
        fieldId: idMock[0] + '001',
        field: 'country',
        title: '国家',
        dataType: 'STRING',
        type: FIELD_TYPE.dimension,
      },
      {
        fieldId: idMock[0] + '002',
        field: 'province',
        title: '省',
        dataType: 'STRING',
        type: FIELD_TYPE.dimension,
      },
      {
        fieldId: idMock[0] + '003',
        field: 'city',
        title: '市',
        dataType: 'STRING',
        type: FIELD_TYPE.dimension,
      },
      {
        fieldId: idMock[0] + '004',
        field: 'count',
        title: '统计',
        dataType: 'NUMBER',
        type: FIELD_TYPE.measure,
      },
    ],
  },
  {
    id: idMock[1],
    title: 'depart',
    tableName: 'depart',
    fields: [
      {
        fieldId: idMock[1] + '001',
        field: 'dept_code',
        title: '部门编号',
        dataType: 'STRING',
        type: FIELD_TYPE.dimension,
      },
      {
        fieldId: idMock[1] + '002',
        field: 'dept_name',
        title: '部门名称',
        dataType: 'STRING',
        type: FIELD_TYPE.dimension,
      },
      {
        fieldId: idMock[1] + '003',
        field: 'parent_dept',
        title: '上级部门',
        dataType: 'STRING',
        type: FIELD_TYPE.measure,
      },
      {
        fieldId: idMock[1] + '004',
        field: 'level',
        title: '层级',
        dataType: 'NUMBER',
        type: FIELD_TYPE.measure,
      },
    ],
  },
  {
    id: idMock[2],
    title: 'batch_job',
    tableName: 'batch_job',
    fields: [
      {
        fieldId: idMock[2] + '001',
        field: 'res_name',
        title: '资源信息',
        dataType: 'STRING',
        type: FIELD_TYPE.dimension,
      },
      {
        fieldId: idMock[2] + '002',
        field: 'job_name',
        title: '任务名称',
        dataType: 'STRING',
        type: FIELD_TYPE.dimension,
      },
      {
        fieldId: idMock[2] + '003',
        field: 'create_date',
        title: '创建时间',
        dataType: 'DATE',
        type: FIELD_TYPE.measure,
      },
      {
        fieldId: idMock[2] + '004',
        field: 'create_dept',
        title: '创建部门',
        dataType: 'NUMBER',
        type: FIELD_TYPE.measure,
      },
      {
        fieldId: idMock[2] + '005',
        field: 'total',
        title: '总数',
        dataType: 'NUMBER',
        type: FIELD_TYPE.measure,
      },
      {
        fieldId: idMock[2] + '006',
        field: 'success_count',
        title: '成功条数',
        dataType: 'NUMBER',
        type: FIELD_TYPE.measure,
      },
      {
        fieldId: idMock[2] + '007',
        field: 'repeat_count',
        title: '重复条数',
        dataType: 'NUMBER',
        type: FIELD_TYPE.measure,
      },
      {
        fieldId: idMock[2] + '008',
        field: 'flow_direction',
        title: '信息流向',
        dataType: 'STRING',
        type: FIELD_TYPE.dimension,
      },
    ],
  },
]

// 拦截获取左侧列表
Mock.mock(/\/dataset\/listByDsId/, 'get', options => {
  const params = getQueryParameters(options)
  if (params.workspaceId === 'test_datasource') {
    return builder(tables)
  }
  return builder(tables.splice(0, 2))
})
// 拦截获取左侧列表
Mock.mock(/\/dataset\/schema/, 'get', options => {
  const { id } = getQueryParameters(options)
  if (id === 'dataset_0001') {
    return builder({
      physicalSchema: {},
    })
  }
  return builder({
    physicalSchema: {
      id: idMock[0],
      title: 'analysis',
      tableName: 'analysis',
      fields: [
        {
          fieldId: idMock[0] + '001',
          field: 'country',
          title: '国家',
          dataType: 'STRING',
          type: FIELD_TYPE.dimension,
          _checked: true,
        },
        {
          fieldId: idMock[0] + '002',
          field: 'province',
          title: '省',
          dataType: 'STRING',
          type: FIELD_TYPE.dimension,
          _checked: true,
        },
        {
          fieldId: idMock[0] + '003',
          field: 'city',
          title: '市',
          dataType: 'STRING',
          type: FIELD_TYPE.dimension,
          _checked: true,
        },
        {
          fieldId: idMock[0] + '004',
          field: 'count',
          title: '统计',
          dataType: 'NUMBER',
          type: FIELD_TYPE.measure,
          _checked: true,
        },
      ],
      children: [
        {
          id: idMock[1],
          title: 'depart',
          tableName: 'depart',
          joinType: 'LEFT_OUTER_JOIN',
          joinKeys: [{ sourceKey: 'country', targetKey: 'dept_code' }],
          fields: [
            {
              fieldId: idMock[1] + '001',
              field: 'dept_code',
              title: '部门编号',
              dataType: 'STRING',
              type: FIELD_TYPE.dimension,
              _checked: true,
            },
            {
              fieldId: idMock[1] + '002',
              field: 'dept_name',
              title: '部门名称',
              dataType: 'STRING',
              type: FIELD_TYPE.dimension,
              _checked: true,
            },
            {
              fieldId: idMock[1] + '003',
              field: 'parent_dept',
              title: '上级部门',
              dataType: 'STRING',
              type: FIELD_TYPE.measure,
              _checked: true,
            },
            {
              fieldId: idMock[1] + '004',
              field: 'level',
              title: '层级',
              dataType: 'NUMBER',
              type: FIELD_TYPE.measure,
              _checked: true,
            },
          ],
        },
      ],
    },
    cubeSchema: {
      dimension: {
        title: '维度',
        nodeType: 'root',
        children: [
          {
            fieldId: idMock[0] + '001',
            field: 'country',
            title: '国家',
            dataType: 'STRING',
            type: FIELD_TYPE.dimension,
            nodeType: 'attribute',
            tableId: idMock[0],
          },
          {
            fieldId: idMock[0] + '002',
            field: 'province',
            title: '省',
            dataType: 'STRING',
            type: FIELD_TYPE.dimension,
            nodeType: 'attribute',
            tableId: idMock[0],
          },
          {
            fieldId: idMock[0] + '003',
            field: 'city',
            title: '市',
            dataType: 'STRING',
            type: FIELD_TYPE.dimension,
            nodeType: 'attribute',
            tableId: idMock[0],
          },
          {
            fieldId: idMock[1] + '001',
            field: 'dept_code',
            title: '部门编号',
            dataType: 'STRING',
            type: FIELD_TYPE.dimension,
            nodeType: 'attribute',
            tableId: idMock[1],
          },
          {
            fieldId: idMock[1] + '002',
            field: 'dept_name',
            title: '部门名称',
            dataType: 'STRING',
            type: FIELD_TYPE.dimension,
            nodeType: 'attribute',
            tableId: idMock[1],
          },
        ],
      },
      measure: {
        title: '度量',
        nodeType: 'root',
        children: [
          {
            fieldId: idMock[0] + '004',
            field: 'count',
            title: '统计',
            dataType: 'NUMBER',
            type: FIELD_TYPE.measure,
            nodeType: 'attribute',
            tableId: idMock[0],
          },
          {
            fieldId: idMock[1] + '003',
            field: 'parent_dept',
            title: '上级部门',
            dataType: 'NUMBER',
            type: FIELD_TYPE.measure,
            nodeType: 'attribute',
            tableId: idMock[1],
          },
          {
            fieldId: idMock[1] + '004',
            field: 'level',
            title: '层级',
            dataType: 'NUMBER',
            type: FIELD_TYPE.measure,
            nodeType: 'attribute',
            tableId: idMock[1],
          },
        ],
      },
    },
  })
})
