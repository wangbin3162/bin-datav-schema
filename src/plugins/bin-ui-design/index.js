import BinUI, { Utils } from 'bin-ui-design'
import config from '../../../package.json'

export function registerUI(app) {
  app.use(BinUI, { disabledDoc: true })
  Utils.log.printVersion(config.name, config.version, `【${config.description}】`)
}
