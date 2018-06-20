export function noop () {}

/**
 *
 *
 * @export
 * @class Util
 */
export class Util {
  static uniqid (len = 7) {
    return Math.random().toString(35).substr(2, len)
  }

  // Helper function that extends one object with all the properies of other objects
  static extend (obj, ...src) {
    const dest = obj
    for (let i in src) {
      let copy = src[i]
      for (let prop in copy) {
        if (copy.hasOwnProperty(prop)) {
          dest[prop] = copy[prop]
        }
      }
    }

    return dest
  }

  // In order to stay true to the latest spec, RGB values must be clamped between 0 and 255. If we don't do this, weird things happen.
  static clampRGB (val) {
    if (val < 0) {
      return 0
    }
    if (val > 255) {
      return 255
    }

    return val
  }

  static copyAttributes (from, to, opts = {}) {
    for (let i in from.attributes) {
      let attr = from.attributes[i]
      if (opts.except && opts.except.indexOf(attr.nodeName) !== -1) {
        continue
      }
      to.setAttribute(attr.nodeName, attr.nodeValue)
    }
  }

  // Support for browsers that don't know Uint8Array (such as IE9)
  static dataArray (length = 0) {
    if (Uint8ClampedArray) {
      return new Uint8ClampedArray(length)
    }
    return new Array(length)
  }
}
