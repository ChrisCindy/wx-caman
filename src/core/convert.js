/**
 * Tons of color conversion utility functions.
 *
 * @export
 * @class Convert
 */
export default class Convert {
  /**
   * Converts the hex representation of a color to RGB values.
   * Hex value can optionally start with the hash (#).
   *
   * @static
   * @param { String } hex The colors hex value
   * @returns { Object } The RGB representation
   * @memberof Convert
   */
  static hexToRGB (hex) {
    if (hex.charAt(0) === '#') {
      hex = hex.substr(1)
    }
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    return { r, g, b }
  }

  /**
   * Converts an RGB color to HSL.
   * Assumes r, g, and b are in the set [0, 255] and
   * returns h, s, and l in the set [0, 1].
   *
   * @static
   * @param { Number } r Red channel
   * @param { Number } g Green channel
   * @param { Number } b Blue channel
   * @return { Array } The HSL representation
   * @memberof Convert
   */
  static rgbToHSL (r, g, b) {
    if (typeof r === 'object') {
      g = r.g
      b = r.b
      r = r.r
    }

    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const l = (max + min) / 2
    let h, s
    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      if (max === r) {
        h = (g - b) / d + g < b ? 6 : 0
      } else if (max === g) {
        h = (b - r) / d + 2
      } else if (max === b) {
        h = (r - g) / d + 4
      }

      h /= 6
    }
    return {h, s, l}
  }

  /**
   * onverts an HSL color value to RGB. Conversion formula adapted from http://en.wikipedia.org/wiki/HSL_color_space.
   * Assumes h, s, and l are contained in the set [0, 1] and returns r, g, and b in the set [0, 255].
   *
   * @static
   * @param { Number } h The hue
   * @param { Number } s The saturation
   * @param { Number } l The lightness
   * @returns { Object } The RGB representation
   * @memberof Convert
   */
  static hslToRGB (h, s, l) {
    let r, g, b, p, q
    if (typeof h === 'object') {
      s = h.s
      l = h.l
      h = h.h
    }
    if (s === 0) {
      r = g = b = l
    } else {
      q = l < 0.5 ? l * (1 + s) : l + s - l * s
      p = 2 * l - q

      r = this.hueToRGB(p, q, h + 1 / 3)
      g = this.hueToRGB(p, q, h)
      b = this.hueToRGB(p, q, h - 1 / 3)
    }
    return {
      r: r * 255,
      g: g * 255,
      b: b * 255
    }
  }

  /**
   * Converts from the hue color space back to RGB.
   *
   * @static
   * @param { Number } p
   * @param { Number } q
   * @param { Number } t
   * @returns { Number } RGB value
   * @memberof Convert
   */
  static hueToRGB (p, q, t) {
    if (t < 0) {
      t += 1
    }
    if (t > 1) {
      t -= 1
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t
    }
    if (t < 1 / 2) {
      return q
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6
    }
    return p
  }

  /**
   * Converts an RGB color value to HSV. Conversion formula adapted from {http://en.wikipedia.org/wiki/HSV_color_space}.
   * Assumes r, g, and b are contained in the set [0, 255] and returns h, s, and v in the set [0, 1].
   *
   * @static
   * @param {*} r The red color value
   * @param {*} g The green color value
   * @param {*} b The blue color value
   * @returns { Object } The HSV representation
   * @memberof Convert
   */
  static rgbToHSV (r, g, b) {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const v = max
    const d = max - min

    const s = max === 0 ? 0 : d / max
    let h
    if (max === min) {
      h = 0
    } else {
      if (max === r) {
        h = (g - b) / d + g < b ? 6 : 0
      } else if (max === g) {
        h = (b - r) / d + 2
      } else if (max === b) {
        h = (r - g) / d + 4
      }
      h /= 6
    }

    return {h, s, v}
  }

  /**
   * Converts an HSV color value to RGB. Conversion formula adapted from http://en.wikipedia.org/wiki/HSV_color_space.
   * Assumes h, s, and v are contained in the set [0, 1] and returns r, g, and b in the set [0, 255].
   *
   * @static
   * @param { Number } h The hue
   * @param { Number } s The saturation
   * @param { Number } v The value
   * @returns { Object } The RGB representation
   * @memberof Convert
   */
  static hsvToRGB (h, s, v) {
    const i = Math.floor(h * 6)
    const f = h * 6 - i
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)

    let r, g, b
    switch (i % 6) {
      case 0:
        r = v
        g = t
        b = p
        break
      case 1:
        r = q
        g = v
        b = p
        break
      case 2:
        r = p
        g = v
        b = t
        break
      case 3:
        r = p
        g = q
        b = v
        break
      case 4:
        r = t
        g = p
        b = v
        break
      case 5:
        r = v
        g = p
        b = q
        break
    }

    return {
      r: Math.floor(r * 255),
      g: Math.floor(g * 255),
      b: Math.floor(b * 255)
    }
  }

  /**
   * Converts a RGB color value to the XYZ color space. Formulas are based on http://en.wikipedia.org/wiki/SRGB assuming that RGB values are sRGB.
   * Assumes r, g, and b are contained in the set [0, 255] and returns x, y, and z.
   *
   * @static
   * @param { Number } r The red color value
   * @param { Number } g The green color value
   * @param { Number } b The blue color value
   * @returns { Object } The XYZ representation
   * @memberof Convert
   */
  static rgbToXYZ (r, g, b) {
    r /= 255
    g /= 255
    b /= 255

    if (r > 0.04045) {
      r = Math.pow((r + 0.055) / 1.055, 2.4)
    } else {
      r /= 12.92
    }

    if (g > 0.04045) {
      g = Math.pow((g + 0.055) / 1.055, 2.4)
    } else {
      g /= 12.92
    }

    if (b > 0.04045) {
      b = Math.pow((b + 0.055) / 1.055, 2.4)
    } else {
      b /= 12.92
    }

    const x = r * 0.4124 + g * 0.3576 + b * 0.1805
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722
    const z = r * 0.0193 + g * 0.1192 + b * 0.9505

    return {
      x: x * 100,
      y: y * 100,
      z: z * 100
    }
  }

  /**
   * Converts a XYZ color value to the sRGB color space. Formulas are based on http://en.wikipedia.org/wiki/SRGB and the resulting RGB value will be in the sRGB color space.
   * Assumes x, y and z values are whatever they are and returns r, g and b in the set [0, 255].
   *
   * @static
   * @param { Number } x The X value
   * @param { Number } y The Y value
   * @param { Number } z The Z value
   * @returns { Object } The RGB representation
   * @memberof Convert
   */
  static xyzToRGB (x, y, z) {
    x /= 100
    y /= 100
    z /= 100

    let r = (3.2406 * x) + (-1.5372 * y) + (-0.4986 * z)
    let g = (-0.9689 * x) + (1.8758 * y) + (0.0415 * z)
    let b = (0.0557 * x) + (-0.2040 * y) + (1.0570 * z)

    if (r > 0.0031308) {
      r = (1.055 * Math.pow(r, 0.4166666667)) - 0.055
    } else {
      r *= 12.92
    }

    if (g > 0.0031308) {
      g = (1.055 * Math.pow(g, 0.4166666667)) - 0.055
    } else {
      g *= 12.92
    }

    if (b > 0.0031308) {
      b = (1.055 * Math.pow(b, 0.4166666667)) - 0.055
    } else {
      b *= 12.92
    }

    return {
      r: r * 255,
      g: g * 255,
      b: b * 255
    }
  }

  /**
   * Converts a XYZ color value to the CIELAB color space. Formulas are based on http://en.wikipedia.org/wiki/Lab_color_space The reference white point used in the conversion is D65.
   * Assumes x, y and z values are whatever they are and returns L*, a* and b* values
   *
   * @static
   * @param { Number } x The X value
   * @param { Number } y The Y value
   * @param { Number } z The Z value
   * @returns { Object } The Lab representation
   * @memberof Convert
   */
  static xyzToLab (x, y, z) {
    if (typeof x === 'object') {
      y = x.y
      z = x.z
      x = x.x
    }

    const whiteX = 95.047
    const whiteY = 100.0
    const whiteZ = 108.883

    x /= whiteX
    y /= whiteY
    z /= whiteZ

    if (x > 0.008856451679) {
      x = Math.pow(x, 0.3333333333)
    } else {
      x = (7.787037037 * x) + 0.1379310345
    }

    if (y > 0.008856451679) {
      y = Math.pow(y, 0.3333333333)
    } else {
      y = (7.787037037 * y) + 0.1379310345
    }

    if (z > 0.008856451679) {
      z = Math.pow(z, 0.3333333333)
    } else {
      z = (7.787037037 * z) + 0.1379310345
    }

    const l = 116 * y - 16
    const a = 500 * (x - y)
    const b = 200 * (y - z)

    return { l, a, b }
  }

  /**
   * Converts a L*, a*, b* color values from the CIELAB color space to the XYZ color space. Formulas are based on http://en.wikipedia.org/wiki/Lab_color_space The reference white point used in the conversion is D65.
   * Assumes L*, a* and b* values are whatever they are and returns x, y and z values.
   *
   * @static
   * @param {*} l The L* value
   * @param {*} a The a* value
   * @param {*} b The b* value
   * @returns  { Object } The XYZ representation
   * @memberof Convert
   */
  static labToXYZ (l, a, b) {
    if (typeof l === 'object') {
      a = l.a
      b = l.b
      l = l.l
    }

    let y = (l + 16) / 116
    let x = y + (a / 500)
    let z = y - (b / 200)

    if (x > 0.2068965517) {
      x = x * x * x
    } else {
      x = 0.1284185493 * (x - 0.1379310345)
    }
    if (y > 0.2068965517) {
      y = y * y * y
    } else {
      y = 0.1284185493 * (y - 0.1379310345)
    }
    if (z > 0.2068965517) {
      z = z * z * z
    } else {
      z = 0.1284185493 * (z - 0.1379310345)
    }

    // D65 reference white point
    return {
      x: x * 95.047,
      y: y * 100.0,
      z: z * 108.883
    }
  }

  /**
   * Converts L*, a*, b* back to RGB values.
   * @see Convert.rgbToXYZ
   * @see Convert.xyzToLab
   *
   * @static
   * @param {*} r The red color value
   * @param {*} g The green color value
   * @param {*} b The blue color value
   * @memberof Convert
   */
  static rgbToLab (r, g, b) {
    if (typeof r === 'object') {
      g = r.g
      b = r.b
      r = r.r
    }

    const xyz = this.rgbToXYZ(r, g, b)
    return this.xyzToLab(xyz)
  }
}
