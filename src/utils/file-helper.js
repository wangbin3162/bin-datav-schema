export function downloadFile(content, fileName) {
  // filename，摘取了常用的部分，其实还有其他一些
  const typeMap = {
    pdf: 'application/pdf',
    doc: 'application/vnd.ms-word',
    docx: 'application/vnd.ms-word',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.ms-excel',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.ms-powerpoint',
    js: 'application/x-javascript',
    json: 'application/json',
    zip: 'application/zip',
    mp3: 'audio/mpeg',
    gif: 'image/gif',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    txt: 'text/plain',
    xml: 'image/text/xml',
  }
  const hg = fileName.split('.').pop().toLocaleLowerCase() || ''

  const data = new Blob([content], { type: typeMap[hg] })
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(data, fileName)
  } else {
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(data)
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(link.href)
  }
}

// 读取文件内容
export function readFileText(file) {
  return new Promise((resolve, reject) => {
    try {
      let file_reader = new FileReader()
      file_reader.onload = res => {
        const fileResult = res.target.result
        resolve(fileResult)
      }
      file_reader.readAsText(file, 'UTF-8')
    } catch (e) {
      reject(e)
    }
  })
}

// 读取文件内容为base64
export function readFileBase64(file) {
  return new Promise((resolve, reject) => {
    try {
      let file_reader = new FileReader()
      file_reader.onload = res => {
        const fileResult = res.target.result
        resolve(fileResult)
      }
      file_reader.readAsDataURL(file) // 将图片转换为base64
    } catch (e) {
      reject(e)
    }
  })
}

// 读取文件内容为base64 IMG
export function readFileBase64Img(file) {
  return new Promise((resolve, reject) => {
    try {
      let file_reader = new FileReader()
      file_reader.onload = res => {
        const fileResult = res.target.result
        const image = new Image()
        image.src = fileResult
        image.onload = () => {
          resolve({
            name: file.name,
            width: image.width,
            height: image.height,
            image: fileResult,
            file: file,
          })
        }
      }
      file_reader.readAsDataURL(file) // 将图片转换为base64
    } catch (e) {
      reject(e)
    }
  })
}

// base64转file
export function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
