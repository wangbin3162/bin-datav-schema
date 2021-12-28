import BinUI from 'bin-ui-next'
import { Utils } from 'bin-ui-next'
import config from '../../../package.json'

export function registerUI(app) {
  app.use(BinUI, { disabledDoc: true })
  Utils.log.printVersion(config.description, config.version, '')
}
