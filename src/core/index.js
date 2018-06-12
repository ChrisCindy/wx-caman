import Caman from './caman'
import Blender from './blender'
import Filter from './filter'
import Plugin from './plugin'

import registerBlender from '../lib/blenders'
import registerFilter from '../lib/filters'
import { registerPlugin, registerPluginFilter } from '../lib/plugins'

// wechat mini program env
if (typeof wx === 'undefined') {
  // throw new Error('Wechat-CamanJS can only run in wechat mini program')
}
registerBlender(Blender)
registerFilter(Filter)

registerPlugin(Plugin)
registerPluginFilter(Filter)

export default Caman
