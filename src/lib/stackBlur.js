/*
StackBlur - a fast almost Gaussian Blur For Canvas v0.31 modified for CamanJS

Version:   0.31
Author:    Mario Klingemann
Contact:   mario@quasimondo.com
Website:  http://www.quasimondo.com/StackBlurForCanvas
Twitter:  @quasimondo
Modified By: Ryan LeFevre (@meltingice)

In case you find this class useful - especially in commercial projects -
I am not totally unhappy for a small donation to my PayPal account
mario@quasimondo.de

Or support me on flattr:
https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

Copyright (c) 2010 Mario Klingemann

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
 */

let BlurStack, mulTable, shgTable
mulTable = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259]
shgTable = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24]
BlurStack = function () {
  this.r = 0
  this.g = 0
  this.b = 0
  this.a = 0
  this.next = null
}

export function registerStackBlurPlugin (Plugin) {
  Plugin.register('stackBlur', function(radius) {
    let bInSum, bOutSum, bSum, div, gInSum, gOutSum, gSum, height, heightMinus1, i, mulSum, p, pb, pg, pixels, pr, rInSum, rOutSum, rSum, radiusPlus1, rbs, shgSum, stack, stackEnd, stackIn, stackOut, stackStart, sumFactor, width, widthMinus1, x, y, yi, yp, yw, _i, _j, _k, _l, _m, _n, _o, _p, _q
    if (isNaN(radius) || radius < 1) {
      return
    }
    radius |= 0
    pixels = this.pixelData
    width = this.dimensions.width
    height = this.dimensions.height
    div = radius + radius + 1
    widthMinus1 = width - 1
    heightMinus1 = height - 1
    radiusPlus1 = radius + 1
    sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2
    stackStart = new BlurStack()
    stack = stackStart
    for (i = _i = 1; div >= 1 ? _i < div : _i > div; i = div >= 1 ? ++_i : --_i) {
      stack = stack.next = new BlurStack()
      if (i === radiusPlus1) {
        stackEnd = stack
      }
    }
    stack.next = stackStart
    stackIn = null
    stackOut = null
    yw = yi = 0
    mulSum = mulTable[radius]
    shgSum = shgTable[radius]
    for (y = _j = 0; height >= 0 ? _j < height : _j > height; y = height >= 0 ? ++_j : --_j) {
      rInSum = gInSum = bInSum = rSum = gSum = bSum = 0
      rOutSum = radiusPlus1 * (pr = pixels[yi])
      gOutSum = radiusPlus1 * (pg = pixels[yi + 1])
      bOutSum = radiusPlus1 * (pb = pixels[yi + 2])
      rSum += sumFactor * pr
      gSum += sumFactor * pg
      bSum += sumFactor * pb
      stack = stackStart
      for (i = _k = 0; radiusPlus1 >= 0 ? _k < radiusPlus1 : _k > radiusPlus1; i = radiusPlus1 >= 0 ? ++_k : --_k) {
        stack.r = pr
        stack.g = pg
        stack.b = pb
        stack = stack.next
      }
      for (i = _l = 1; radiusPlus1 >= 1 ? _l < radiusPlus1 : _l > radiusPlus1; i = radiusPlus1 >= 1 ? ++_l : --_l) {
        p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2)
        rSum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i)
        gSum += (stack.g = (pg = pixels[p + 1])) * rbs
        bSum += (stack.b = (pb = pixels[p + 2])) * rbs
        rInSum += pr
        gInSum += pg
        bInSum += pb
        stack = stack.next
      }
      stackIn = stackStart
      stackOut = stackEnd
      for (x = _m = 0; width >= 0 ? _m < width : _m > width; x = width >= 0 ? ++_m : --_m) {
        pixels[yi] = (rSum * mulSum) >> shgSum
        pixels[yi + 1] = (gSum * mulSum) >> shgSum
        pixels[yi + 2] = (bSum * mulSum) >> shgSum
        rSum -= rOutSum
        gSum -= gOutSum
        bSum -= bOutSum
        rOutSum -= stackIn.r
        gOutSum -= stackIn.g
        bOutSum -= stackIn.b
        p = (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2
        rInSum += (stackIn.r = pixels[p])
        gInSum += (stackIn.g = pixels[p + 1])
        bInSum += (stackIn.b = pixels[p + 2])
        rSum += rInSum
        gSum += gInSum
        bSum += bInSum
        stackIn = stackIn.next
        rOutSum += (pr = stackOut.r)
        gOutSum += (pg = stackOut.g)
        bOutSum += (pb = stackOut.b)
        rInSum -= pr
        gInSum -= pg
        bInSum -= pb
        stackOut = stackOut.next
        yi += 4
      }
      yw += width
    }
    for (x = _n = 0; width >= 0 ? _n < width : _n > width; x = width >= 0 ? ++_n : --_n) {
      gInSum = bInSum = rInSum = gSum = bSum = rSum = 0
      yi = x << 2
      rOutSum = radiusPlus1 * (pr = pixels[yi])
      gOutSum = radiusPlus1 * (pg = pixels[yi + 1])
      bOutSum = radiusPlus1 * (pb = pixels[yi + 2])
      rSum += sumFactor * pr
      gSum += sumFactor * pg
      bSum += sumFactor * pb
      stack = stackStart
      for (i = _o = 0; radiusPlus1 >= 0 ? _o < radiusPlus1 : _o > radiusPlus1; i = radiusPlus1 >= 0 ? ++_o : --_o) {
        stack.r = pr
        stack.g = pg
        stack.b = pb
        stack = stack.next
      }
      yp = width
      for (i = _p = 1; radius >= 1 ? _p <= radius : _p >= radius; i = radius >= 1 ? ++_p : --_p) {
        yi = (yp + x) << 2
        rSum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i)
        gSum += (stack.g = (pg = pixels[yi + 1])) * rbs
        bSum += (stack.b = (pb = pixels[yi + 2])) * rbs
        rInSum += pr
        gInSum += pg
        bInSum += pb
        stack = stack.next
        if (i < heightMinus1) {
          yp += width
        }
      }
      yi = x
      stackIn = stackStart
      stackOut = stackEnd
      for (y = _q = 0; height >= 0 ? _q < height : _q > height; y = height >= 0 ? ++_q : --_q) {
        p = yi << 2
        pixels[p] = (rSum * mulSum) >> shgSum
        pixels[p + 1] = (gSum * mulSum) >> shgSum
        pixels[p + 2] = (bSum * mulSum) >> shgSum
        rSum -= rOutSum
        gSum -= gOutSum
        bSum -= bOutSum
        rOutSum -= stackIn.r
        gOutSum -= stackIn.g
        bOutSum -= stackIn.b
        p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2
        rSum += (rInSum += (stackIn.r = pixels[p]))
        gSum += (gInSum += (stackIn.g = pixels[p + 1]))
        bSum += (bInSum += (stackIn.b = pixels[p + 2]))
        stackIn = stackIn.next
        rOutSum += (pr = stackOut.r)
        gOutSum += (pg = stackOut.g)
        bOutSum += (pb = stackOut.b)
        rInSum -= pr
        gInSum -= pg
        bInSum -= pb
        stackOut = stackOut.next
        yi += width
      }
    }
    return this
  })
}

export function registerStackBlurFilter (Filter) {
  Filter.register('stackBlur', function (radius) {
    this.processPlugin('stackBlur', [radius])
  })
}
