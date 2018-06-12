/**
 * Built-in layer blenders. Many of these mimic Photoshop blend modes.
 *
 * @export
 * @class Blender
 */
export default class Blender {
  static blenders = {}
  /**
   * Registers a blender. Can be used to add your own blenders outside of the core library, if needed.
   *
   * @static
   * @param { String } name Name of the blender.
   * @param { Function } func The blender function.
   * @memberof Blender
   */
  static register (name, func) {
    this.blenders[name] = func
  }

  /**
   * Executes a blender to combine a layer with its parent.
   *
   * @static
   * @param { String } name Name of the blending function to invoke.
   * @param { Object } rgbaLayer RGBA object of the current pixel from the layer.
   * @param { Object } rgbaParent RGBA object of the corresponding pixel in the parent layer.
   * @returns { Object } RGBA object representing the blended pixel.
   * @memberof Blender
   */
  static execute (name, rgbaLayer, rgbaParent) {
    return this.blenders[name](rgbaLayer, rgbaParent)
  }
}
