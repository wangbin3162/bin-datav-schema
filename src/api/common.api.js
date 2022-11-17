import { fetchData } from './request'

// 获取参数信息统一接口
export function getConfInfo(code) {
  return fetchData({
    url: '/management/conf/getConfInfo',
    method: 'post',
    data: { code },
  })
}

// 统一上传接口
export function commonUpload(files) {
  const data = new FormData()
  files.forEach(file => {
    data.append('attachments', file, file.name)
  })
  return fetchData({
    url: '/management/comm/file/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
  })
}

// 统一下载接口
export function commonDownload(attachmentId) {
  return fetchData({
    url: '/management/comm/file/downLoad',
    method: 'post',
    responseType: 'arraybuffer',
    data: { attachmentId },
  })
}
