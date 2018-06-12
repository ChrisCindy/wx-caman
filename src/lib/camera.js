import Calculate from '../core/calculate'
import { Util } from '../core/util'
import Convert from '../core/convert'

const vignetteFilters = {
  brightness (rgba, amt, opts) {
    rgba.r = rgba.r - (rgba.r * amt * opts.strength)
    rgba.g = rgba.g - (rgba.g * amt * opts.strength)
    rgba.b = rgba.b - (rgba.b * amt * opts.strength)
    return rgba
  },
  gamma (rgba, amt, opts) {
    rgba.r = Math.pow(rgba.r / 255, Math.max(10 * amt * opts.strength, 1)) * 255
    rgba.g = Math.pow(rgba.g / 255, Math.max(10 * amt * opts.strength, 1)) * 255
    rgba.b = Math.pow(rgba.b / 255, Math.max(10 * amt * opts.strength, 1)) * 255
    return rgba
  },
  colorize (rgba, amt, opts) {
    rgba.r -= (rgba.r - opts.color.r) * amt
    rgba.g -= (rgba.g - opts.color.g) * amt
    rgba.b -= (rgba.b - opts.color.b) * amt
    return rgba
  }
}

/**
 *
 *
 * @export
 * @param {*} Filter
 */
export default function registerCameraFilter (Filter) {
  Filter.register('vignette', function (size, strength = 60) {
    let bezier, center, end, start

    if (typeof size === 'string' && size.substr(-1) === '%') {
      if (this.dimensions.height > this.dimensions.width) {
        size = this.dimensions.width * (parseInt(size.substr(0, size.length - 1), 10) / 100)
      } else {
        size = this.dimensions.height * (parseInt(size.substr(0, size.length - 1), 10) / 100)
      }
    }
    strength /= 100
    center = [this.dimensions.width / 2, this.dimensions.height / 2]
    start = Math.sqrt(Math.pow(center[0], 2) + Math.pow(center[1], 2))
    end = start - size
    bezier = Calculate.bezier([0, 1], [30, 30], [70, 60], [100, 80])
    this.process('vignette', function (rgba) {
      var dist, div, loc
      loc = rgba.locationXY()
      dist = Calculate.distance(loc.x, loc.y, center[0], center[1])
      if (dist > end) {
        div = Math.max(1, (bezier[Math.round(((dist - end) / size) * 100)] / 10) * strength)
        rgba.r = Math.pow(rgba.r / 255, div) * 255
        rgba.g = Math.pow(rgba.g / 255, div) * 255
        rgba.b = Math.pow(rgba.b / 255, div) * 255
      }
      return rgba
    })
  })

  Filter.register('rectangularVignette', function (opts) {
    let defaults, dim, percent, size, _i, _len, _ref
    defaults = {
      strength: 50,
      cornerRadius: 0,
      method: 'brightness',
      color: {
        r: 0,
        g: 0,
        b: 0
      }
    }
    opts = Util.extend(defaults, opts)
    if (!opts.size) {
      return this
    } else if (typeof opts.size === 'string') {
      percent = parseInt(opts.size, 10) / 100
      opts.size = {
        width: this.dimensions.width * percent,
        height: this.dimensions.height * percent
      }
    } else if (typeof opts.size === 'object') {
      _ref = ['width', 'height']
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dim = _ref[_i]
        if (typeof opts.size[dim] === 'string') {
          opts.size[dim] = this.dimensions[dim] * (parseInt(opts.size[dim], 10) / 100)
        }
      }
    } else if (opts.size === 'number') {
      size = opts.size
      opts.size = {
        width: size,
        height: size
      }
    }
    if (typeof opts.cornerRadius === 'string') {
      opts.cornerRadius = (opts.size.width / 2) * (parseInt(opts.cornerRadius, 10) / 100)
    }
    opts.strength /= 100
    opts.size.width = Math.floor(opts.size.width)
    opts.size.height = Math.floor(opts.size.height)
    opts.image = {
      width: this.dimensions.width,
      height: this.dimensions.height
    }
    if (opts.method === 'colorize' && typeof opts.color === 'string') {
      opts.color = Convert.hexToRGB(opts.color)
    }
    opts.coords = {
      left: (this.dimensions.width - opts.size.width) / 2,
      right: this.dimensions.width - opts.coords.left,
      bottom: (this.dimensions.height - opts.size.height) / 2,
      top: this.dimensions.height - opts.coords.bottom
    }
    opts.corners = [
      {
        x: opts.coords.left + opts.cornerRadius,
        y: opts.coords.top - opts.cornerRadius
      }, {
        x: opts.coords.right - opts.cornerRadius,
        y: opts.coords.top - opts.cornerRadius
      }, {
        x: opts.coords.right - opts.cornerRadius,
        y: opts.coords.bottom + opts.cornerRadius
      }, {
        x: opts.coords.left + opts.cornerRadius,
        y: opts.coords.bottom + opts.cornerRadius
      }
    ]
    opts.maxDist = Calculate.distance(0, 0, opts.corners[3].x, opts.corners[3].y) - opts.cornerRadius
    this.process('rectangularVignette', function (rgba) {
      var amt, loc, radialDist
      loc = rgba.locationXY()
      if ((loc.x > opts.corners[0].x && loc.x < opts.corners[1].x) && (loc.y > opts.coords.bottom && loc.y < opts.coords.top)) {
        return rgba
      }
      if ((loc.x > opts.coords.left && loc.x < opts.coords.right) && (loc.y > opts.corners[3].y && loc.y < opts.corners[2].y)) {
        return rgba
      }
      if (loc.x > opts.corners[0].x && loc.x < opts.corners[1].x && loc.y > opts.coords.top) {
        amt = (loc.y - opts.coords.top) / opts.maxDist
      } else if (loc.y > opts.corners[2].y && loc.y < opts.corners[1].y && loc.x > opts.coords.right) {
        amt = (loc.x - opts.coords.right) / opts.maxDist
      } else if (loc.x > opts.corners[0].x && loc.x < opts.corners[1].x && loc.y < opts.coords.bottom) {
        amt = (opts.coords.bottom - loc.y) / opts.maxDist
      } else if (loc.y > opts.corners[2].y && loc.y < opts.corners[1].y && loc.x < opts.coords.left) {
        amt = (opts.coords.left - loc.x) / opts.maxDist
      } else if (loc.x <= opts.corners[0].x && loc.y >= opts.corners[0].y) {
        radialDist = Calculate.distance(loc.x, loc.y, opts.corners[0].x, opts.corners[0].y)
        amt = (radialDist - opts.cornerRadius) / opts.maxDist
      } else if (loc.x >= opts.corners[1].x && loc.y >= opts.corners[1].y) {
        radialDist = Calculate.distance(loc.x, loc.y, opts.corners[1].x, opts.corners[1].y)
        amt = (radialDist - opts.cornerRadius) / opts.maxDist
      } else if (loc.x >= opts.corners[2].x && loc.y <= opts.corers[2].y) {
        radialDist = Calculate.distance(loc.x, loc.y, opts.corners[2].x, opts.corners[2].y)
        amt = (radialDist - opts.cornerRadius) / opts.maxDist
      } else if (loc.x <= opts.corners[3].x && loc.y <= opts.corners[3].y) {
        radialDist = Calculate.distance(loc.x, loc.y, opts.corners[3].x, opts.corners[3].y)
        amt = (radialDist - opts.cornerRadius) / opts.maxDist
      }
      if (amt < 0) {
        return rgba
      }
      return vignetteFilters[opts.method](rgba, amt, opts)
    })
  })
}
