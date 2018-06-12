import Module from './module'
import { $, noop, Util } from './util'
import Store from './store'
import Analyze from './analyze'
import Renderer from './renderer'
import Log from './logger'
import IO from './io'
import Event from './event'
import Filter from './filter'
import Layer from './layer'

/**
 * Here it begins. Caman is defined.
 * There are many different initialization for Caman, which are described on the [Guides](http://camanjs.com/guides).
 * Initialization is tricky because we need to make sure everything we need is actually fully oaded in the DOM before proceeding. When initialized on an image, we need to make sure that the image is done loading before converting it to a canvas element and writing the pixel data. If we do this prematurely, the browser will throw a DOM Error, and chaos will ensue. In the event that we initialize Caman on a canvas element while specifying an image URL, we need to create a new image element, load the image, then continue with initialization.
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

  // @property [Boolean] Debug mode enables console logging.
  static DEBUG = true

  // @property [Boolean] Allow reverting the canvas?
  // If your JS process is running out of memory, disabling
  // this could help drastically.
  static allowRevert = true

  // @property [String] Default cross-origin policy.
  static crossOrigin = 'anonymous'

  // @property [String] Set the URL of the image proxy script.
  static remoteProxy = ''

  // @proparty [String] The GET param used with the proxy script.
  static proxyParam = 'camanProxyUrl'

  // @property [Boolean] Are we in a NodeJS environment?
  static NodeJS = typeof exports !== 'undefined'

  // @property [Boolean] Are we in a wechat mini program environment?
  static wechat = typeof exports !== 'undefined'

  // @property [Boolean] Should we check the DOM for images with Caman instructions?
  static autoload = !Caman.NodeJS

  // Custom toString()
  // @return [String] Version and release information.
  static toString () {
    return `Version ${Caman.version.release}, Released ${Caman.version.date}`
  }

  // Get the ID assigned to this canvas by Caman.
  // @param [DOMObject] canvas The canvas to inspect.
  // @return [String] The Caman ID associated with this canvas.
  static getAttrId (canvas) {
    if (Caman.NodeJS) {
      return true
    }
    if (typeof canvas === 'string') {
      canvas = $(canvas)
    }
    if (canvas && canvas.getAttribute) {
      return canvas.getAttribute('data-caman-id')
    }
    return null
  }

  /**
   * The Caman function. While technically a constructor, it was made to be called without the `new` keyword. Caman will figure it out.
   * @param { DOMObject | String } initializer The DOM selector or DOM object to initialize.
   * @overload Caman(initializer)
   *   Initialize Caman without a callback.
   *
   * @overload Caman(initializer, callback)
   *   Initialize Caman with a callback.
   *   @param [Function] callback Function to call once initialization completes.
   *
   * @overload Caman(initializer, url)
   *   Initialize Caman with a URL to an image and no callback.
   *   @param [String] url URl to an image to draw to the canvas.
   *
   * @overload Caman(initializer, url, callback)
   *   Initialize Caman with a canvas, URL to an image, and a callback.
   *   @param [String] url URl to an image to draw to the canvas.
   *   @param [Function] callback Function to call once initialization completes.
   *
   * @overload Caman(file)
   *   NodeJS: Initialize Caman with a path to an image file and no callback.
   *   @param [String, File] file File object or path to image to read.
   *
   * @overload Caman(file, callback)
   *   NodeJS: Initialize Caman with a file and a callback.
   *   @param [String, File] file File object or path to image to read.
   *   @param [Function] callback Function to call once initialization completes.
   * @return [Caman] Initialized Caman instance.
   * @memberof Caman
   */
  constructor (...args) {
    if (args.length === 0) {
      throw new Error('Invalid arguments')
    }
    super()
    if (this instanceof Caman) {
      // We have to do this to avoid polluting the global scope
      // because of how Coffeescript binds functions specified
      // with => and the fact that Caman can be invoked as both
      // a function and as a 'new' object.
      this.finishInit = this.finishInit.bind(this)
      this.imageLoaded = this.imageLoaded.bind(this)

      if (!Caman.NodeJS) {
        const id = parseInt(Caman.getAttrId(args[0]), 10)
        let callback
        if (typeof args[1] === 'function') {
          callback = args[1]
        } else if (typeof args[1] === 'function') {
          callback = args[2]
        } else {
          callback = noop
        }

        if (!isNaN(id) && Store.has(id)) {
          return Store.execute(id, callback)
        }
      }

      // Every instance gets a unique ID. Makes it much simpler to check if two variables are the same instance.
      this.id = Util.uniqid().get()
      this.initializedPixelData = this.originalPixelData = null
      this.cropCoordinates = { x: 0, y: 0 }
      this.cropped = false
      this.resized = false

      this.pixelStack = [] // Stores the pixel layers
      this.layerStack = [] // Stores all of the layers waiting to be rendered
      this.canvasQueue = [] // Stores all of the canvases to be processed
      this.currentLayer = null
      this.scaled = false

      this.analyze = new Analyze(this)
      this.renderer = new Renderer(this)

      this.domIsLoaded(() => {
        this.parseArguments(args)
        this.setup()
      })
      return this
    } else {
      return new Caman(...args)
    }
  }

  /**
   * Checks to ensure the DOM is loaded. Ensures the callback is always fired, even if the DOM is already loaded before it's invoked. The callback is also always called asynchronously.
   *
   * @param { Function } cb The callback function to fire when the DOM is ready.
   * @memberof Caman
   */
  domIsLoaded (cb) {
    if (Caman.NodeJS) {
      setTimeout(() => {
        cb.call(this)
      }, 0)
    } else {
      if (document.readyState === 'complete') {
        Log.debug('DOM initialized')
        setTimeout(() => {
          cb.call(this)
        }, 0)
      } else {
        const listener = () => {
          if (document.readyState === 'complete') {
            Log.debug('DOM initialized')
            cb.call(this)
          }
        }
        document.addEventListener('readystatechange', listener, false)
      }
    }
  }

  /**
   * Parses the arguments given to the Caman function, and sets the appropriate properties on this instance.
   *
   * @param { Array } args Array of arguments passed to Caman.
   * @memberof Caman
   */
  parseArguments (args) {
    if (args.length === 0) {
      throw new Error('Invalid arguments given')
    }

    // Defaults
    this.initObj = null
    this.initType = null
    this.imageUrl = null
    this.callback = noop

    // First argument is always our canvas/image
    this.setInitObject(args[0])
    if (args.length === 1) {
      return
    }

    switch (typeof args[1]) {
      case 'string':
        this.imageUrl = args[1]
        break
      case 'function':
        this.callback = args[1]
        break
    }

    if (args.length === 2) {
      return
    }

    this.callback = args[2]

    if (args.length === 4) {
      for (let key in args[4]) {
        if (args[4].hasOwnProperty(key)) {
          this.options[key] = args[4][key]
        }
      }
    }
  }

  /**
   * Sets the initialization object for this instance.
   *
   * @param { Object | String } obj The initialization argument.
   * @memberof Caman
   */
  setInitObject (obj) {
    if (Caman.NodeJS) {
      this.initObj = obj
      this.initType = 'node'
      return
    }
    if (typeof obj === 'object') {
      this.initObj = obj
    } else {
      this.initObj = $(obj)
    }

    if (!this.initObj) {
      throw new Error('Could not find image or canvas for initialization.')
    }

    this.initType = this.initObj.nodeName.toLowerCase()
  }

  /**
   * Begins the setup process, which differs depending on whether we're in NodeJS, or if an image or canvas object was provided.
   *
   * @memberof Caman
   */
  setup () {
    console.log(this.initType)
    switch (this.initType) {
      case 'node':
        this.initNode()
        break
      case 'img':
        this.initImage()
        break
      case 'canvas':
        this.initCanvas()
        break
    }
  }

  // Initialization function for NodeJS
  initNode () {}

  // Initialization function for the browser and image objects.
  initImage () {
    this.image = this.initObj
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
    Util.copyAttributes(this.image, this.canvas, {except: ['src']})

    // Swap out image with the canvas element if the image exists in the DOM.
    this.image.parentNode && this.image.parentNode.replaceChild(this.canvas, this.image)

    this.imageAdjustments()
    this.waitForImageLoaded()
  }

  // Initialization function for browser and canvas objects
  // TODO:
  initCanvas () {
    this.canvas = this.initObj
    console.log(this.canvas)
    this.context = this.canvas.getContext('2d')

    if (this.imageUrl) {
      this.image = document.createElement('img')
      this.image.src = this.imageUrl

      this.imageAdjustments()
      this.waitForImageLoaded()
    } else {
      this.finishInit()
    }
  }

  /**
   * Automatically check for a HiDPI capable screen and swap out the image if possible.
   * Also checks the image URL to see if it's a cross-domain request, and attempt to proxy the image. If a cross-origin type is configured, the proxy will be ignored.
   *
   * @memberof Caman
   */
  imageAdjustments () {
    if (IO.isRemote(this.image)) {
      this.image.src = IO.proxyUrl(this.image.src)
      Log.debug(`Remote image detected, using URL = ${this.image.src}`)
    }
  }

  // Utility function that fires {Caman#imageLoaded} once the image is finished loading.
  waitForImageLoaded () {
    if (this.isImageLoaded()) {
      this.imageLoaded()
    } else {
      this.image.onload = this.imageLoaded
    }
  }

  /**
   * Checks if the given image is finished loading.
   * @returns { Boolean } Is the image loaded?
   * @memberof Caman
   */
  isImageLoaded () {
    if (!this.image.complete) {
      return false
    }
    if (this.image.naturalWidth && this.image.naturalWidth === 0) {
      return false
    }
    return true
  }

  /**
   * Internet Explorer has issues figuring out image dimensions when they aren't explicitly defined, apparently. We check the normal width/height properties first, but fall back to natural sizes if they are 0.
   * @returns { Number } Width of the initialization image.
   * @memberof Caman
   */
  imageWidth () {
    return this.image.width || this.image.naturalWidth
  }

  /**
   * @see Caman#imageWidth
   *
   * @returns { Number } Height of the initialization image.
   * @memberof Caman
   */
  imageHeight () {
    return this.image.height || this.image.naturalHeight
  }

  /**
   * Function that is called once the initialization image is finished loading.
   * We make sure that the canvas dimensions are properly set here.
   *
   * @memberof Caman
   */
  imageLoaded () {
    Log.debug(`Image loaded. Width = ${this.imageWidth()}, Height = ${this.imageHeight()}`)

    this.canvas.width = this.imageWidth()
    this.canvas.height = this.imageHeight()

    this.finishInit()
  }

  /**
   * Final step of initialization. We finish setting up our canvas element, and we draw the image to the canvas (if applicable).
   *
   * @memberof Caman
   */
  finishInit () {
    if (!this.context) {
      this.context = this.canvas.getContext('2d')
    }

    this.originalWidth = this.preScaledWidth = this.width = this.canvas.width
    this.originalHeight = this.preScaledHeight = this.height = this.canvas.height

    if (!this.hasId()) {
      this.assignId()
    }

    if (this.image) {
      this.context.drawImage(this.image, 0, 0, this.imageWidth(), this.imageHeight(), 0, 0, this.preScaledWidth, this.preScaledHeight)
    }

    this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
    this.pixelData = this.imageData.data

    if (Caman.allowRevert) {
      this.initializedPixelData = Util.dataArray(this.pixelData.length)
      this.originalPixelData = Util.dataArray(this.pixelData.length)

      for (let i = 0; i < this.pixelData.length; i++) {
        let pixel = this.pixelData[i]
        this.initializedPixelData[i] = pixel
        this.originalPixelData[i] = pixel
      }
    }

    this.dimensions = {
      width: this.canvas.width,
      height: this.canvas.height
    }

    if (!Caman.NodeJS) {
      Store.put(this.id, this)
    }

    this.callback(this)

    // Reset the callback so re-initialization doesn't trigger it again.
    this.callback = noop
  }

  /**
   * If you have a separate context reference to this canvas outside of CamanJS and you make a change to the canvas outside of CamanJS, you will have to call this function to update our context reference to include those changes.
   *
   * @memberof Caman
   */
  reloadCanvasData () {
    this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
    this.pixelData = this.imageData.data
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
   * Does this instance have an ID assigned?
   * @returns { Boolean } Existance of an ID.
   * @memberof Caman
   */
  hasId () {
    return !!Caman.getAttrId(this.canvas)
  }
  /**
   * Assign a unique ID to this instance.
   *
   * @memberof Caman
   */
  assignId () {
    if (Caman.NodeJS || this.canvas.getAttribute('data-caman-id')) {
      return
    }
    this.canvas.setAttribute('data-caman-id', this.id)
  }

  /**
   * Replaces the current canvas with a new one, and properly updates all of the applicable references for this instance.
   *
   * @param { DOMObject } newCanvas The canvas to swap into this instance.
   * @memberof Caman
   */
  replaceCanvas (newCanvas) {
    const oldCanvas = this.canvas
    this.canvas = newCanvas
    this.context = this.canvas.getContext('2d')

    if (!Caman.NodeJS) {
      oldCanvas.parentNode.replaceChild(this.canvas, oldCanvas)
    }

    this.width = this.canvas.width
    this.height = this.canvas.height

    this.reloadCanvasData()

    this.dimensions = {
      width: this.canvas.width,
      height: this.canvas.height
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

    this.renderer.execute(() => {
      this.context.putImageData(this.imageData, 0, 0)
      callback.call(this)
    })
  }

  /**
   * Reverts the canvas back to it's original state while
  # maintaining any cropped or resized dimensions.
   *
   * @param { Boolean } [updateContext=true] Should we apply the reverted pixel data to the canvas context thus triggering a re-render by the browser?
   * @memberof Caman
   */
  revert (updateContext = true) {
    if (!Caman.allowRevert) {
      throw new Error('Revert disabled')
    }

    const originalVisiblePixels = this.originalVisiblePixels()
    for (let i = 0, j = originalVisiblePixels.length; i < j; i++) {
      let pixel = originalVisiblePixels[i]
      this.pixelData[i] = pixel
    }

    if (updateContext) {
      this.context.putImageData(this.imageData, 0, 0)
    }
  }

  /**
   * Completely resets the canvas back to it's original state.
   * Any size adjustments will also be reset.
   *
   * @memberof Caman
   */
  reset () {
    const canvas = document.createElement('canvas')
    Util.copyAttributes(this.canvas, canvas)

    canvas.width = this.originalWidth
    canvas.height = this.originalHeight

    const ctx = canvas.getContext('2d')
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixelData = imageData.data

    for (let i = 0; i < this.initializedPixelData.length; i++) {
      let pixel = this.initializedPixelData[i]
      pixelData[i] = pixel
    }

    ctx.putImageData(imageData, 0, 0)

    this.cropCoordinates = {
      x: 0,
      y: 0
    }
    this.resized = false
    this.replaceCanvas(canvas)
  }

  /**
   * Returns the original pixel data while maintaining any cropping or resizing that may have occurred.
   * **Warning**: this is currently in beta status.
   * @returns { Array } Original pixel values still visible after cropping or resizing.
   * @memberof Caman
   */
  // TODO:
  originalVisiblePixels () {
    if (!Caman.allowRevert) {
      throw new Error('Revert disabled')
    }

    const pixels = []
    return pixels
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
      type: Filter.Type.Single,
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
      type: Filter.Type.Kernel,
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
      type: Filter.Type.Plugin,
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
    const layer = new Layer(this)
    this.canvasQueue.push(layer)
    this.renderer.add({
      type: Filter.Type.LayerDequeue
    })

    callback.call(layer)

    this.renderer.add({
      type: Filter.Type.LayerFinished
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

  /*
   * Grabs the canvas data, encodes it to Base64, then sets the browser location to the encoded data so that the user will be prompted to download it.
   * If we're in NodeJS, then we can save the image to disk.
   * @see Caman
   */
  save () {
    if (exports) {
      this.nodeSave.apply(this, arguments)
    } else {
      this.browserSave.apply(this, arguments)
    }
  }

  browserSave (type = 'png') {
    type = type.toLowerCase()
    // Force download (its a bit hackish)
    const image = this.toBase64(type).replace(`image/${type}`, 'image/octet-stream')
    document.location.href = image
  }

  // nodeSave (file, overwrite = true, callback = null) {
  //   try {
  //     const stats = fs.statSync(file)
  //     if (stats.isFile() && !overwrite) {
  //       return false
  //     }
  //   } catch (e) {
  //     Log.debug(`Creating output file ${file}`)
  //   }

  //   fs.writeFile(file, this.canvas.toBuffer(), (err) => {
  //     Log.debug(`Finished writing to ${file}`)
  //     if (callback) {
  //       callback.call(this, err)
  //     }
  //   })
  // }

  /*
   * Takes the current canvas data, converts it to Base64, then sets it as the source of a new Image object and returns it.
   */
  toImage (type) {
    /* eslint-disable no-undef */
    const img = new Image()
    img.src = this.toBase64(type)
    img.width = this.dimensions.width
    img.height = this.dimensions.height

    if (window.devicePixelRatio) {
      img.width /= window.devicePixelRatio
      img.height /= window.devicePixelRatio
    }
    return img
  }

  /*
  * Base64 encodes the current canvas
  */
  toBase64 (type = 'png') {
    type = type.toLowerCase()
    return this.canvas.toDataURL(`image/${type}`)
  }
}
