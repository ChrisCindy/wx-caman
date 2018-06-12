import registerCameraFilter from './camera'
import registerBlurFilter from './blur'
import registrerPosterizeFilter from './posterize'
import registerPresetFilter from './presets'
import { registerStackBlurPlugin, registerStackBlurFilter } from './stackBlur'

export function registerPlugin (Plugin) {
  registerStackBlurPlugin(Plugin)
}

export function registerPluginFilter (Filter) {
  registerCameraFilter(Filter)
  registerBlurFilter(Filter)
  registrerPosterizeFilter(Filter)
  registerPresetFilter(Filter)
  registerStackBlurFilter(Filter)
}
