import Event from './event'
import Filter from './filter'
import { Util } from './util'
import Log from './logger'
import Plugin from './plugin'
import Pixel from './pixel'
import IO from './io'
/**
 * Handles all of the various rendering methods in Caman. Most of the image modification happens here. A new Renderer object is created for every render operation.
 *
 * @export
 * @class Renderer
 */
export default class Renderer {
  // The number of blocks to split the image into during the render process to simulate concurrency. This also helps the browser manage the (possibly) long running render jobs.
  static Blocks = 4

  constructor (c) {
    this.c = c
    this.renderQueue = []
    this.modPixelData = null
  }

  add (job) {
    if (!job) {
      return
    }
    this.renderQueue.push(job)
  }

  // Grabs the next operation from the render queue and passes it to Renderer for execution
  processNext () {
    // If the queue is empty, fire the finished callback
    if (this.renderQueue.length === 0) {
      Event.trigger(this, 'renderFinished')
      this.finishedFn && this.finishedFn.call(this.c)
      return this
    }
    this.currentJob = this.renderQueue.shift()

    switch (this.currentJob.type) {
      case Filter.Type.LayerDequeue:
        const layer = this.c.canvasQueue.shift()
        this.c.executeLayer(layer)
        this.processNext()
        break
      case Filter.Type.LayerFinished:
        this.c.applyCurrentLayer()
        this.c.popContext()
        this.processNext()
        break
      case Filter.Type.LoadOverlay:
        this.loadOverlay(this.currentJob.layer, this.currentJob.src)
        break
      case Filter.Type.Plugin:
        this.executePlugin()
        break
      default:
        this.executeFilter()
    }
  }

  execute (camanInstance, callback) {
    this.finishedFn = callback
    Event.listen(camanInstance, '_pixelDataReady', () => {
      this.modPixelData = Util.dataArray(this.c.pixelData.length)
      this.processNext()
    })
  }

  eachBlock (fn) {
    // Prepare all the required render data
    this.blocksDone = 0

    const n = this.c.pixelData.length
    const blockPixelLength = Math.floor((n / 4) / Renderer.Blocks)
    const blockN = blockPixelLength * 4
    const lastBlockN = blockN + ((n / 4) % Renderer.Blocks) * 4

    for (let i = 0; i < Renderer.Blocks; i++) {
      const start = i * blockN
      const end = start + (i === Renderer.Blocks - 1 ? lastBlockN : blockN)
      setTimeout(() => {
        fn.call(this, i, start, end)
      }, 0)
    }
  }

  // The core of the image rendering, this function executes the provided filter.
  // NOTE: this does not write the updated pixel data to the canvas. That happens when all filters are finished rendering in order to be as fast as possible.
  executeFilter () {
    Event.trigger(this.c, 'processStart', this.currentJob)

    if (this.currentJob.type === Filter.Type.Single) {
      this.eachBlock(this.renderBlock)
    } else {
      this.eachBlock(this.renderKernel)
    }
  }

  // Executes a standalone plugin
  executePlugin () {
    Log.debug(`Executing plugin ${this.currentJob.plugin}`)
    Plugin.execute(this.c, this.currentJob.plugin, this.currentJob.args)
    Log.debug(`Plugin ${this.currentJob.plugin} finished!`)

    this.processNext()
  }

  // Renders a single block of the canvas with the current filter function
  renderBlock (bnum, start, end) {
    Log.debug(`Block #${bnum} - Filter: ${this.currentJob.name}, Start: ${start}, End: ${end}`)
    Event.trigger(this.c, 'blockStarted', {
      blockNum: bnum,
      totalBlocks: Renderer.Blocks,
      startPixel: start,
      endPixel: end
    })

    const pixel = new Pixel()
    pixel.setContext(this.c)

    for (let i = start; i < end; i += 4) {
      pixel.loc = i

      pixel.r = this.c.pixelData[i]
      pixel.g = this.c.pixelData[i + 1]
      pixel.b = this.c.pixelData[i + 2]
      pixel.a = this.c.pixelData[i + 3]

      this.currentJob.processFn(pixel)

      this.c.pixelData[i] = Util.clampRGB(pixel.r)
      this.c.pixelData[i + 1] = Util.clampRGB(pixel.g)
      this.c.pixelData[i + 2] = Util.clampRGB(pixel.b)
      this.c.pixelData[i + 3] = Util.clampRGB(pixel.a)
    }

    this.blockFinished(bnum)
  }

  // Applies an image kernel to the canvas
  renderKernel (bnum, start, end) {
    const bias = this.currentJob.bias
    const divisor = this.currentJob.divisor
    const n = this.c.pixelData.length

    const adjust = this.currentJob.adjust
    const adjustSize = Math.sqrt(adjust.length)

    const kernel = []

    Log.debug(`Rendering kernel - Filter: ${this.currentJob.name}`)

    start = Math.max(start, this.c.dimensions.width * 4 * ((adjustSize - 1) / 2))
    end = Math.min(end, n - (this.c.dimensions.width * 4 * ((adjustSize - 1) / 2)))

    const builder = (adjustSize - 1) / 2

    const pixel = new Pixel()
    pixel.setContext(this.c)

    for (let i = start; i < end; i += 4) {
      pixel.loc = i
      let builderIndex = 0

      for (let j = -builder; j <= builder; j++) {
        for (let k = builder; k >= -builder; k--) {
          let p = pixel.getPixelRelative(j, k)
          kernel[builderIndex * 3] = p.r
          kernel[builderIndex * 3 + 1] = p.g
          kernel[builderIndex * 3 + 2] = p.b
          builderIndex++
        }
      }

      const res = this.processKernel(adjust, kernel, divisor, bias)

      this.modPixelData[i] = Util.clampRGB(res.r)
      this.modPixelData[i + 1] = Util.clampRGB(res.g)
      this.modPixelData[i + 2] = Util.clampRGB(res.b)
      this.modPixelData[i + 3] = this.c.pixelData[i + 3]
    }

    this.blockFinished(bnum)
  }

  // Called when a single block is finished rendering. Once all blocks are done, we signal that this filter is finished rendering and continue to the next step.
  blockFinished (bnum) {
    if (bnum >= 0) {
      Log.debug(`Block #${bnum} finished! Filter: ${this.currentJob.name}`)
    }
    this.blocksDone++

    Event.trigger(this.c, 'blockFinished', {
      blockNum: bnum,
      blocksFinished: this.blocksDone,
      totalBlocks: Renderer.Blocks
    })

    if (this.blocksDone === Renderer.Blocks) {
      if (this.currentJob.type === Filter.Type.Kernel) {
        for (let i = 0; i < this.c.pixelData.length; i++) {
          this.c.pixelData[i] = this.modPixelData[i]
        }
      }

      if (bnum >= 0) {
        Log.debug(`Filter ${this.currentJob.name} finished!`)
      }
      Event.trigger(this.c, 'processComplete', this.currentJob)
      this.processNext()
    }
  }

  // The "filter function" for kernel adjustments.
  processKernel (adjust, kernel, divisor, bias) {
    const val = {
      r: 0,
      g: 0,
      b: 0
    }
    for (let i = 0; i < adjust.length; i++) {
      val.r += adjust[i] * kernel[i * 3]
      val.g += adjust[i] * kernel[i * 3 + 1]
      val.b += adjust[i] * kernel[i * 3 + 2]
    }

    val.r = (val.r / divisor) + bias
    val.g = (val.g / divisor) + bias
    val.b = (val.b / divisor) + bias
    return val
  }

  // Loads an image onto the current canvas
  loadOverlay (layer, src) {
    /* eslint-disable no-undef */
    const img = new Image()
    img.onload = () => {
      layer.context.drawImage(img, 0, 0, this.c.dimensions.width, this.c.dimensions.height)
      layer.imageData = layer.context.getImageData(0, 0, this.c.dimensions.width, this.c.dimensions.height)
      layer.pixelData = layer.imageData.data

      this.c.pixelData = layer.pixelData

      this.processNext()
    }

    const proxyUrl = IO.remoteCheck(src)
    img.src = proxyUrl || src
  }
}
