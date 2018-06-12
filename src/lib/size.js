import Plugin from '../core/plugin'
import Filter from '../core/filter'

// Allows us to crop the canvas and produce a new smaller canvas.
Plugin.register('crop', (width, height, x = 0, y = 0) => {})

// Resize the canvas and the image to a new size
Plugin.register('resize', (newDims = null) => {})

Filter.register('crop', () => {})
Filter.register('resize', () => {})
