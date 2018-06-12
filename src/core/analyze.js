/**
 * Various image analysis methods
 *
 * @export
 * @class Analyze
 */
export default class Analyze {
  constructor (c) {
    this.c = c
  }

  // @return {Object} Hash of RGB channels and the occurrence of each value

  /**
   * Calculates the number of occurrences of each color value throughout the image.
   *
   *
   * @returns {Object} Hash of RGB channels and the occurrences of each value
   * @memberof Analyze
   */
  calculateLevels () {
    const levels = {
      r: {},
      g: {},
      b: {}
    }
    // Initialize all values to 0 first so there are no data gaps
    for (let i = 0; i <= 255; i++) {
      levels.r[i] = 0
      levels.g[i] = 0
      levels.b[i] = 0
    }

    // Iterate through each pixel block and increment the level counters
    for (let i = 0, j = this.c.pixelData.length; i < j; i += 4) {
      levels.r[this.c.pixelData[i]]++
      levels.g[this.c.pixelData[i + 1]]++
      levels.b[this.c.pixelData[i + 2]]++
    }

    // Normalize all of the numbers by converting them to percentages between
    // 0 and 1.0
    const numPixels = this.c.pixelData.length / 4

    for (let i = 0; i <= 255; i++) {
      levels.r[i] /= numPixels
      levels.g[i] /= numPixels
      levels.b[i] /= numPixels
    }
    return levels
  }
}
