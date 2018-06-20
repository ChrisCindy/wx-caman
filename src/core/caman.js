import Module from './module'
import { noop, Util } from './util'
import Analyze from './analyze'
import Renderer from './renderer'
// import Log from './logger'
// import IO from './io'
import Event from './event'
import Config from './config'
import Layer from './layer'

/**
 * Here it begins. Caman is defined.
 * There are many different initialization for Caman, which are described on the [Guides](http://camanjs.com/guides).
 * Initialization is tricky because we need to make sure everything we need is actually fully loaded in the DOM before proceeding. When initialized on an image, we need to make sure that the image is done loading before converting it to a canvas element and writing the pixel data. If we do this prematurely, the browser will throw a DOM Error, and chaos will ensue. In the event that we initialize Caman on a canvas element while specifying an image URL, we need to create a new image element, load the image, then continue with initialization.
 * The main goal for Caman was simplicity, so all of this is handled transparently to the end-user.
 *
 * @export
 * @class Caman
 * @extends {Module}
 */
export default class Caman extends Module {
  // The current version.
  static version = {
    release: '1.0.0',
    date: '6/08/2018'
  }

  // @property [Boolean] Allow reverting the canvas?
  // If your JS process is running out of memory, disabling
  // this could help drastically.
  static allowRevert = true

  // Custom toString()
  // @return [String] Version and release information.
  static toString () {
    return `Version ${Caman.version.release}, Released ${Caman.version.date}`
  }

  /**
   * The Caman function.
   * @param { String } canvasId The canvas-id of the canvas component.
   * @param { Number } width The width of the canvas component.
   * @param { Number } height The height of the canvas component.
   * @return [Caman] Initialized Caman instance.
   * @memberof Caman
   */
  constructor (...args) {
    // args[0]: canvasId
    // args[1]: width,
    // args[2]: height
    // args[3]: callback function
    if (args.length === 0) {
      throw new Error('Invalid arguments')
    }
    super()

    // const id = args[0]
    let callback = args[3]
    if (typeof callback !== 'function') {
      callback = noop
    }

    // Every instance gets a unique ID.
    this.id = Util.uniqid()
    this.initializedPixelData = this.originalPixelData = null

    this.pixelStack = [] // Stores the pixel layers
    this.layerStack = [] // Stores all of the layers waiting to be rendered
    this.canvasQueue = [] // Stores all of the canvases to be processed
    this.currentLayer = null

    this.analyze = new Analyze(this)
    this.renderer = new Renderer(this)

    // make sure you do everything in onReady callback
    this.parseArguments(args)
    this.initCanvas()

    return this
  }

  /**
   * Parses the arguments given to the Caman function, and sets the appropriate properties on this instance.
   *
   * @param { Array } args Array of arguments passed to Caman.
   * @memberof Caman
   */
  parseArguments (args) {
    // args[0]: canvasId
    // args[1]: width,
    // args[2]: height
    // args[3]: callback function
    if (args.length === 0) {
      throw new Error('Invalid arguments given')
    }

    // First argument is always our canvas/image
    if (typeof args[0] !== 'string') {
      throw new Error('You must pass the canvas-id as the first argument.')
    }
    this.canvas = args[0]
    if (typeof args[1] !== 'number' || typeof args[2] !== 'number') {
      throw new Error('You must pass the width and height of the canvas component.')
    }
    this.width = args[1]
    this.height = args[2]
    this.callback = typeof args[3] === 'function' ? args[3] : noop
  }

  // Initialization function for browser and canvas objects
  initCanvas () {
    this.context = wx.createCanvasContext(this.canvas)
    this.finishInit()
  }

  /**
   * Final step of initialization. We finish setting up our canvas element, and we draw the image to the canvas (if applicable).
   *
   * @memberof Caman
   */
  finishInit () {
    if (!this.context) {
      this.context = wx.createCanvasContext(this.canvas)
    }

    this.originalWidth = this.preScaledWidth = this.width
    this.originalHeight = this.preScaledHeight = this.height

    const _this = this
    wx.canvasGetImageData({
      canvasId: _this.canvas,
      x: 0,
      y: 0,
      width: _this.width,
      height: _this.height,
      success (res) {
        _this.pixelData = res.data
        Event.trigger(_this, '_pixelDataReady')
        if (Caman.allowRevert) {
          _this.initializedPixelData = Util.dataArray(_this.pixelData.length)
          _this.originalPixelData = Util.dataArray(_this.pixelData.length)

          for (let i = 0; i < _this.pixelData.length; i++) {
            let pixel = _this.pixelData[i]
            _this.initializedPixelData[i] = pixel
            _this.originalPixelData[i] = pixel
          }
        }
      }
    })

    this.dimensions = {
      width: this.width,
      height: this.height
    }

    this.callback(this)

    // Reset the callback so re-initialization doesn't trigger it again.
    this.callback = noop
  }

  /**
   * Reset the canvas pixels to the original state at initialization.
   *
   * @memberof Caman
   */
  resetOriginalPixelData () {
    if (!Caman.allowRevert) {
      throw new Error('Revert disabled')
    }

    this.originalPixelData = Util.dataArray(this.pixelData.length)
    for (let i = 0; i < this.pixelData.length; i++) {
      let pixel = this.pixelData[i]
      this.originalPixelData[i] = pixel
    }
  }

  /**
   * Begins the rendering process. This will execute all of the filter functions called either since initialization or the previous render.
   *
   * @param { Function } [callback=noop] Function to call when rendering is finished.
   * @memberof Caman
   */
  render (callback = noop) {
    Event.trigger(this, 'renderStart')
    this.renderer.execute(this, () => {
      const _this = this
      wx.canvasPutImageData({
        canvasId: _this.canvas,
        data: _this.pixelData,
        x: 0,
        y: 0,
        width: _this.width,
        height: _this.height,
        success: function () {
          callback.call(_this)
        }
      })
    })
  }

  /**
   * Completely resets the canvas back to it's original state.
   * Any size adjustments will also be reset.
   *
   * @memberof Caman
   */
  reset () {
    for (let i = 0; i < this.initializedPixelData.length; i++) {
      let pixel = this.initializedPixelData[i]
      this.pixelData[i] = pixel
    }
    const _this = this
    wx.canvasPutImageData({
      canvasId: _this.canvas,
      data: this.pixelData,
      x: 0,
      y: 0,
      width: _this.width,
      height: _this.height
    })
  }

  /**
   * Pushes the filter callback that modifies the RGBA object into the
  # render queue.
   *
   * @param { String } name Name of the filter function.
   * @param { Function } processFn  The Filter function.
   * @returns { Caman }
   * @memberof Caman
   */
  process (name, processFn) {
    this.renderer.add({
      type: Config.FILTER_TYPE.Single,
      name: name,
      processFn: processFn
    })
    return this
  }

  /**
   * Pushes the kernel into the render queue.
   *
   * @param { String } name The name of the kernel.
   * @param { Array } adjust The convolution kernel represented as a 1D array.
   * @param { Number } [divisor=null] The divisor for the convolution.
   * @param {number} [bias=0] The bias for the convolution.
   * @returns { Caman }
   * @memberof Caman
   */
  processKernel (name, adjust, divisor = null, bias = 0) {
    if (!divisor) {
      divisor = 0
      for (let i = 0; i <= adjust.length; i++) {
        divisor += adjust[i]
      }
    }

    this.renderer.add({
      type: Config.FILTER_TYPE.Kernel,
      name,
      adjust,
      divisor,
      bias
    })

    return this
  }

  /**
   * Adds a standalone plugin into the render queue.
   *
   * @param { String } plugin Name of the plugin.
   * @param { Array } args Array of arguments to pass to the plugin.
   * @returns { Caman }
   * @memberof Caman
   */
  processPlugin (plugin, args) {
    this.renderer.add({
      type: Config.FILTER_TYPE.Plugin,
      plugin,
      args
    })

    return this
  }

  /**
   * Pushes a new layer operation into the render queue and calls the layer
  # callback.
   *
   * @param { Function } callback  Function that is executed within the context of the layer.
   * All filter and adjustment functions for the layer will be executed inside of this function.
   * @returns { Caman }
   * @memberof Caman
   */
  newLayer (callback) {
    Event.listen(this, '_pixelDataReady', () => {
      const layer = new Layer(this)
      this.canvasQueue.push(layer)
      this.renderer.add({
        type: Config.FILTER_TYPE.LayerDequeue
      })

      callback.call(layer)

      this.renderer.add({
        type: Config.FILTER_TYPE.LayerFinished
      })
    })
    return this
  }

  /**
   * Pushes the layer context and moves to the next operation.
   *
   * @param { Layer } layer The layer to execute.
   * @memberof Caman
   */
  executeLayer (layer) {
    this.pushContext(layer)
  }

  /**
   * Set all of the relevant data to the new layer.
   *
   * @param { Layer } layer The layer whose context we want to switch to.
   * @memberof Caman
   */
  pushContext (layer) {
    this.layerStack.push(this.currentLayer)
    this.pixelStack.push(this.pixelData)
    this.currentLayer = layer
    this.pixelData = layer.pixelData
  }

  // Restore the previous layer context.
  popContext () {
    this.pixelData = this.pixelStack.pop()
    this.currentLayer = this.layerStack.pop()
  }

  // Applies the current layer to its parent layer.
  applyCurrentLayer () {
    this.currentLayer.applyToParent()
  }
}
