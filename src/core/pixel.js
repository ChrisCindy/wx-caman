/**
 * Represents a single Pixel in an image.
 *
 * @export
 * @class Pixel
 */
export default class Pixel {
  static coordinatesToLocation (x, y, width) {
    return (y * width + x) * 4
  }
  static locationToCoordinates (loc, width) {
    const y = Math.floor(loc / (width * 4))
    const x = (loc % (width * 4)) / 4

    return {x, y}
  }

  constructor (r = 0, g = 0, b = 0, a = 255, c = null) {
    this.loc = 0
    this.r = r
    this.g = g
    this.b = b
    this.a = a
    this.c = c
  }

  setContext (c) {
    this.c = c
  }

  // Retrieves the X, Y location of the current pixel. The origin is at the bottom left corner of the image, like a normal coordinate system.
  locationXY () {
    if (!this.c) {
      throw new Error('Requires a CamanJS context')
    }
    const y = this.c.dimensions.height - Math.floor(this.loc / (this.c.dimensions.width * 4))
    const x = (this.loc % (this.c.dimensions.width * 4)) / 4

    return {x, y}
  }

  pixelAtLocation (loc) {
    if (!this.c) {
      throw new Error('Requires a CamanJS context')
    }

    return new Pixel(
      this.c.pixelData[loc],
      this.c.pixelData[loc + 1],
      this.c.pixelData[loc + 2],
      this.c.pixelData[loc + 3],
      this.c
    )
  }

  // Returns an RGBA object for a pixel whose location is specified in relation to the current pixel.
  getPixelRelative (horiz, vert) {
    if (!this.c) {
      throw new Error('Requires a CamanJS context')
    }

    // We invert the vert_offset in order to make the coordinate system non-inverted. In laymans terms: -1 means down and +1 means up.
    const newLoc = this.loc + (this.c.dimensions.width * 4 * (vert * -1)) + (4 * horiz)

    if (newLoc > this.c.pixelData.length || newLoc < 0) {
      return new Pixel(0, 0, 0, 255, this.c)
    }

    return this.pixelAtLocation(newLoc)
  }

  // The counterpart to getPixelRelative, this updates the value of a pixel whose location is specified in relation to the current pixel.
  static putPixelRelative (horiz, vert, rgba) {
    if (!this.c) {
      throw new Error('Requires a CamanJS context')
    }

    const newLoc = this.loc + (this.c.dimensions.width * 4 * (vert * -1)) + (4 * horiz)

    if (newLoc > this.c.pixelData.length || newLoc < 0) {
      return
    }

    this.c.pixelData[newLoc] = rgba.r
    this.c.pixelData[newLoc + 1] = rgba.g
    this.c.pixelData[newLoc + 2] = rgba.b
    this.c.pixelData[newLoc + 3] = rgba.a

    return true
  }

  // Gets an RGBA object for an arbitrary pixel in the canvas specified by absolute X, Y coordinates
  getPixel (x, y) {
    if (!this.c) {
      throw new Error('Requires a CamanJS context')
    }

    const loc = this.coordinatesToLocation(x, y, this.width)
    return this.pixelAtLocation(loc)
  }

  // Updates the pixel at the given X, Y coordinate
  putPixel (x, y, rgba) {
    if (!this.c) {
      throw new Error('Requires a CamanJS context')
    }

    const loc = this.coordinatesToLocation(x, y, this.width)

    this.c.pixelData[loc] = rgba.r
    this.c.pixelData[loc + 1] = rgba.g
    this.c.pixelData[loc + 2] = rgba.b
    this.c.pixelData[loc + 3] = rgba.a
  }

  toString () {
    this.toKey()
  }

  toHex (includeAlpha = false) {
    let hex = `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}`

    if (includeAlpha) {
      hex += this.a.toString(16)
    }
    return hex
  }
}
