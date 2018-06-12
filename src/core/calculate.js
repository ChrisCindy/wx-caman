/**
 * Various math-heavy helpers that are used throughout CamanJS.
 *
 * @export
 * @class Calculate
 */
export default class Calculate {
  /**
   * Calculates the distance between two points.
   *
   * @static
   * @param { Number } x1 1st point x-coordinate.
   * @param { Number } y1 1st point y-coordinate.
   * @param { Number } x2 2nd point x-coordinate.
   * @param { Number } y2 2nd point y-coordinate.
   * @returns { Number } The distance between the two points.
   * @memberof Calculate
   */
  static distance (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  }

  /**
   * Generates a pseudorandom number that lies within the max - mix range. The number can be either an integer or a float depending on what the user specifies.
   *
   * @static
   * @param { Number } min The lower bound (inclusive).
   * @param { Number } max The upper bound (inclusive).
   * @param { Boolean } getFloat Return a Float or a rounded Integer?
   * @returns { Number } The pseudorandom number, either as a float or integer.
   * @memberof Calculate
   */
  static randomRange (min, max, getFloat = false) {
    const rand = min + (Math.random() * (max - min))
    if (getFloat) {
      return rand.toFixed(getFloat)
    } else {
      return Math.round(rand)
    }
  }

  /**
   * Calculates the luminance of a single pixel using a special weighted sum.
   *
   * @static
   * @param { Object } rgba RGBA object describing a single pixel.
   * @returns { Number } The luminance value of the pixel.
   * @memberof Calculate
   */
  static luminance (rgba) {
    return (0.299 * rgba.r) + (0.587 * rgba.g) + (0.114 * rgba.b)
  }

  /**
   * Generates a bezier curve given a start and end point, with control points in between.
   * Can also optionally bound the y values between a low and high bound.
   * This is different than most bezier curve functions because it attempts to construct it in such a way that we can use it more like a simple input -> output system, or a one-to-one function.
   * In other words we can provide an input color value, and immediately receive an output modified color value.
   * Note that, by design, this does not force X values to be in the range [0..255]. This is to generalize the function a bit more. If you give it a starting X value that isn't 0, and/or a ending X value that isn't 255, you may run into problems with your filter!
   *
   *
   * @static
   * @param { Array } controlPoints 2-item arrays describing the x, y coordinates of the control points. Minimum two.
   * @param { Number } [lowBound=0] Minimum possible value for any y-value in the curve.
   * @param { Number } [highBound=255] Maximum possible value for any y-value in the curve.
   * @returns { Array } Array whose index represents every x-value between start and end, and value represents the corresponding y-value.
   * @memberof Calculate
   */
  static bezier (controlPoints, lowBound = 0, highBound = 255) {
    if (controlPoints.length < 2) {
      throw new Error('Invalid number of arguments to bezier')
    }

    let bezier = {}
    const lerp = (a, b, t) => a * (1 - t) + b * t
    const clamp = (a, min, max) => Math.min(Math.max(a, min), max)

    for (let i = 0; i < 1000; i++) {
      let t = i / 1000
      let prev = controlPoints

      while (prev.length > 1) {
        const next = []
        for (let j = 0; j <= prev.length - 2; j++) {
          next.push([
            lerp(prev[j][0], prev[j + 1][0], t),
            lerp(prev[j][1], prev[j + 1][1], t)
          ])
        }
        prev = next
      }

      bezier[Math.round(prev[0][0])] = Math.round(clamp(prev[0][1], lowBound, highBound))
    }

    const endX = controlPoints[controlPoints.length - 1][0]
    bezier = Calculate.missingValues(bezier, endX)

    // Edge case
    if (!bezier[endX]) {
      bezier[endX] = bezier[endX - 1]
    }

    return bezier
  }

  /**
   * Calculates possible missing values from a given value array. Note that this returns a copy and does not mutate the original. In case no values are missing the original array is returned as that is convenient.
   *
   * @static
   * @param { Array } 2-item arrays describing the x, y coordinates of the control points.
   * @param { Number } end x value of the array (maximum)
   * @return { Array } Array whose index represents every x-value between start and end, and value represents the corresponding y-value.
   * @memberof Calculate
   */
  static missingValues (values, endX) {
    // Do a search for missing values in the bezier array and use linear
    // interpolation to approximate their values
    if (Object.keys(values).length < endX + 1) {
      const ret = {}
      let leftCoord, rightCoord
      for (let i = 0; i <= endX; i++) {
        if (values[i]) {
          ret[i] = values[i]
        } else {
          leftCoord = [i - 1, ret[i - 1]]
          // Find the first value to the right. Ideally this loop will break
          // very quickly.
          for (let j = i; j <= endX; j++) {
            if (values[j]) {
              rightCoord = [j, values[j]]
              break
            }
          }
          ret[i] = leftCoord[1] + ((rightCoord[1] - leftCoord[1]) / (rightCoord[0] - leftCoord[0])) * (i - leftCoord[0])
        }
      }
      return ret
    }
    return values
  }
}
