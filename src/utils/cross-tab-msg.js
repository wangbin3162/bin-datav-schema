// 广播频道
const channel = new BroadcastChannel('SchemaChannel')

/**
 * 发送消息
 * @param {string} type 消息名称
 * @param {*} content 消息内瓤
 */
export function sendMsg(type, content) {
  channel.postMessage({
    type,
    content,
  })
}

/**
 * 发送消息
 * @param {function} callback 消息名称
 */
export function listenMsg(callback) {
  const handler = e => callback && callback(e.data)
  channel.addEventListener('message', handler)
  return () => channel.removeEventListener('message', handler)
}
