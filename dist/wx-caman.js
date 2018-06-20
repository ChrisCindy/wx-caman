var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var moduleKeywords = ['extended', 'included'];

/**
 * For the parts of this code adapted from http://arcturo.github.com/library/coffeescript/03_classes.html
 * below is the required copyright notice.
 * Copyright (c) 2011 Alexander MacCaw (info@eribium.org)
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @export
 * @class Module
 */

var Module = function () {
  function Module() {
    classCallCheck(this, Module);
  }

  createClass(Module, null, [{
    key: 'extends',

    // Extend the base object itself like a static method
    value: function _extends$$1(obj) {
      for (var key in obj) {
        if (moduleKeywords.indexOf === -1) {
          this[key] = obj[key];
        }
      }
      obj.extended && obj.extended.apply(this);
      return this;
    }

    // Include methods on the object prototype

  }, {
    key: 'includes',
    value: function includes(obj) {
      for (var key in obj) {
        if (moduleKeywords.indexOf === -1) {
          this.prototype[key] = obj[key];
        }
      }
      obj.included && obj.included.apply(this);
      return this;
    }

    // Add methods on this prototype that point to another method
    // on another object's prototype.

  }, {
    key: 'delegate',
    value: function delegate() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var target = args.pop();
      for (var i in args) {
        var source = args[i];
        this.prototype[source] = target.prototype[source];
      }
    }

    // Create an alias for a function

  }, {
    key: 'aliasFunction',
    value: function aliasFunction(to, from) {
      var _this = this;

      this.prototype[to] = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        _this.prototype[from].apply(_this, args);
      };
    }

    // Create an alias for a property

  }, {
    key: 'aliasProperty',
    value: function aliasProperty(to, from) {
      Object.defineProperty(this.prototype, to, {
        get: function get$$1() {
          return this[from];
        },
        set: function set$$1(val) {
          this[from] = val;
        }
      });
    }

    // Execute a function in the context of the object,
    // and pass a reference to the object's prototype.

  }, {
    key: 'included',
    value: function included(func) {
      func.call(this, this.prototype);
    }
  }]);
  return Module;
}();

function noop() {}

/**
 *
 *
 * @export
 * @class Util
 */
var Util = function () {
  function Util() {
    classCallCheck(this, Util);
  }

  createClass(Util, null, [{
    key: "uniqid",
    value: function uniqid() {
      var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 7;

      return Math.random().toString(35).substr(2, len);
    }

    // Helper function that extends one object with all the properies of other objects

  }, {
    key: "extend",
    value: function extend(obj) {
      var dest = obj;

      for (var _len = arguments.length, src = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        src[_key - 1] = arguments[_key];
      }

      for (var i in src) {
        var copy = src[i];
        for (var prop in copy) {
          if (copy.hasOwnProperty(prop)) {
            dest[prop] = copy[prop];
          }
        }
      }

      return dest;
    }

    // In order to stay true to the latest spec, RGB values must be clamped between 0 and 255. If we don't do this, weird things happen.

  }, {
    key: "clampRGB",
    value: function clampRGB(val) {
      if (val < 0) {
        return 0;
      }
      if (val > 255) {
        return 255;
      }

      return val;
    }
  }, {
    key: "copyAttributes",
    value: function copyAttributes(from, to) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      for (var i in from.attributes) {
        var attr = from.attributes[i];
        if (opts.except && opts.except.indexOf(attr.nodeName) !== -1) {
          continue;
        }
        to.setAttribute(attr.nodeName, attr.nodeValue);
      }
    }

    // Support for browsers that don't know Uint8Array (such as IE9)

  }, {
    key: "dataArray",
    value: function dataArray() {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (Uint8ClampedArray) {
        return new Uint8ClampedArray(length);
      }
      return new Array(length);
    }
  }]);
  return Util;
}();

/**
 * Various image analysis methods
 *
 * @export
 * @class Analyze
 */
var Analyze = function () {
  function Analyze(c) {
    classCallCheck(this, Analyze);

    this.c = c;
  }

  // @return {Object} Hash of RGB channels and the occurrence of each value

  /**
   * Calculates the number of occurrences of each color value throughout the image.
   *
   *
   * @returns {Object} Hash of RGB channels and the occurrences of each value
   * @memberof Analyze
   */


  createClass(Analyze, [{
    key: "calculateLevels",
    value: function calculateLevels() {
      var levels = {
        r: {},
        g: {},
        b: {}
        // Initialize all values to 0 first so there are no data gaps
      };for (var i = 0; i <= 255; i++) {
        levels.r[i] = 0;
        levels.g[i] = 0;
        levels.b[i] = 0;
      }

      // Iterate through each pixel block and increment the level counters
      for (var _i = 0, j = this.c.pixelData.length; _i < j; _i += 4) {
        levels.r[this.c.pixelData[_i]]++;
        levels.g[this.c.pixelData[_i + 1]]++;
        levels.b[this.c.pixelData[_i + 2]]++;
      }

      // Normalize all of the numbers by converting them to percentages between
      // 0 and 1.0
      var numPixels = this.c.pixelData.length / 4;

      for (var _i2 = 0; _i2 <= 255; _i2++) {
        levels.r[_i2] /= numPixels;
        levels.g[_i2] /= numPixels;
        levels.b[_i2] /= numPixels;
      }
      return levels;
    }
  }]);
  return Analyze;
}();

/**
 * Event system that can be used to register callbacks that get fired during certain times in the render process.
 *
 * @export
 * @class Event
 */
var Event = function () {
  function Event() {
    classCallCheck(this, Event);
  }

  createClass(Event, null, [{
    key: 'trigger',


    /**
     * Trigger an event.
     *
     * @static
     * @param { Caman } target Instance of Caman emitting the event.
     * @param { String } type The event type.
     * @param { Object } [data=null] Extra data to send with the event.
     * @memberof Event
     */
    value: function trigger(target, type) {
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (this.events[type] && this.events[type].length) {
        for (var i in this.events[type]) {
          var event = this.events[type][i];
          if (event.target === null || target.id === event.target.id) {
            event.fn.call(target, data);
          }
        }
      }
    }

    /**
     * Listen for an event. Optionally bind the listen to a single instance or all instances.
     *
     * @static
     * @overload listen(target, type, fn)
     * Listen for events emitted from a particular Caman instance.
     * @param { Caman } target The instance to listen to.
     * @param { String } type The type of event to listen for.
     * @param { Function } fn The function to call when the event occurs.
     *
     * @overload listen(type, fn)
     * Listen for an event from all Caman instances.
     * @param { String } type The type of event to listen for.
     * @param { Function } fn The function to call when the event occurs.
     * @memberof Event
     */

    // All of the supported event types

  }, {
    key: 'listen',
    value: function listen(target, type, fn) {
      // Adjust arguments if target is omitted
      if (typeof target === 'string') {
        var _type = target;
        var _fn = type;

        target = null;
        type = _type;

        fn = _fn;
      }

      // Validation
      if (this.types.indexOf(type) === -1) {
        return false;
      }

      if (!this.events[type]) {
        this.events[type] = [];
      }
      this.events[type].push({ target: target, fn: fn });
      return true;
    }
  }, {
    key: 'once',
    value: function once(target, type, fn) {
      var _this = this;
      function on() {
        _this.off(target, type, on);
        fn.apply(_this, arguments);
      }
      on.fn = fn;
      this.listen(target, type, on);
    }
  }, {
    key: 'off',
    value: function off(target, type, fn) {
      if (!arguments.length) {
        this.events = Object.create(null);
        return;
      }
      // Adjust arguments if target is omitted
      if (typeof target === 'string') {
        var _type = target;
        var _fn = type;

        target = null;
        type = _type;

        fn = _fn;
      }

      var cbs = this.events[type];
      if (!cbs) {
        return;
      }

      if (!fn) {
        this.events[type] = null;
      } else {
        // specific handler
        var cb = void 0;
        var i = cbs.length;
        while (i--) {
          cb = cbs[i];
          if (cb === fn || cb.fn === fn) {
            cbs.splice(i, 1);
            break;
          }
        }
      }
    }
  }]);
  return Event;
}();

Object.defineProperty(Event, 'events', {
  enumerable: true,
  writable: true,
  value: {}
});
Object.defineProperty(Event, 'types', {
  enumerable: true,
  writable: true,
  value: ['processStart', 'processComplete', 'renderStart', 'renderFinished', 'blockStarted', 'blockFinished', '_pixelDataReady']
});

var Config = {
  // Debug mode enables console logging.
  DEBUG: false,
  // All of the different render operatives
  FILTER_TYPE: {
    Single: 1,
    Kernel: 2,
    LayerDequeue: 3,
    LayerFinished: 4,
    LoadOverlay: 5,
    Plugin: 6
  }
};

/**
 * Simple console logger class that can be toggled on and off based on Caman.DEBUG
 *
 * @class Logger
 */

var Logger = function Logger() {
  var _this = this;

  classCallCheck(this, Logger);

  var logLevel = ['log', 'info', 'warn', 'error'];

  var _loop = function _loop(i) {
    var name = logLevel[i];
    _this[name] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      {
        return;
      }
      try {
        console[name].apply(console, args);
      } catch (e) {
        // We're probably using IE9 or earlier
        console[name](args);
      }
    };
  };

  for (var i in logLevel) {
    _loop(i);
  }
  this.debug = this.log;
};

var Log = new Logger();

/**
 * Stores and registers standalone plugins
 *
 * @export
 * @class Plugin
 */
var Plugin = function () {
  function Plugin() {
    classCallCheck(this, Plugin);
  }

  createClass(Plugin, null, [{
    key: "register",
    value: function register(name, plugin) {
      this.plugins[name] = plugin;
    }
  }, {
    key: "execute",
    value: function execute(context, name, args) {
      this.plugins[name].apply(context, args);
    }
  }]);
  return Plugin;
}();

Object.defineProperty(Plugin, "plugins", {
  enumerable: true,
  writable: true,
  value: {}
});

/**
 * Represents a single Pixel in an image.
 *
 * @export
 * @class Pixel
 */
var Pixel = function () {
  createClass(Pixel, null, [{
    key: 'coordinatesToLocation',
    value: function coordinatesToLocation(x, y, width) {
      return (y * width + x) * 4;
    }
  }, {
    key: 'locationToCoordinates',
    value: function locationToCoordinates(loc, width) {
      var y = Math.floor(loc / (width * 4));
      var x = loc % (width * 4) / 4;

      return { x: x, y: y };
    }
  }]);

  function Pixel() {
    var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 255;
    var c = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    classCallCheck(this, Pixel);

    this.loc = 0;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.c = c;
  }

  createClass(Pixel, [{
    key: 'setContext',
    value: function setContext(c) {
      this.c = c;
    }

    // Retrieves the X, Y location of the current pixel. The origin is at the bottom left corner of the image, like a normal coordinate system.

  }, {
    key: 'locationXY',
    value: function locationXY() {
      if (!this.c) {
        throw new Error('Requires a CamanJS context');
      }
      var y = this.c.dimensions.height - Math.floor(this.loc / (this.c.dimensions.width * 4));
      var x = this.loc % (this.c.dimensions.width * 4) / 4;

      return { x: x, y: y };
    }
  }, {
    key: 'pixelAtLocation',
    value: function pixelAtLocation(loc) {
      if (!this.c) {
        throw new Error('Requires a CamanJS context');
      }

      return new Pixel(this.c.pixelData[loc], this.c.pixelData[loc + 1], this.c.pixelData[loc + 2], this.c.pixelData[loc + 3], this.c);
    }

    // Returns an RGBA object for a pixel whose location is specified in relation to the current pixel.

  }, {
    key: 'getPixelRelative',
    value: function getPixelRelative(horiz, vert) {
      if (!this.c) {
        throw new Error('Requires a CamanJS context');
      }

      // We invert the vert_offset in order to make the coordinate system non-inverted. In laymans terms: -1 means down and +1 means up.
      var newLoc = this.loc + this.c.dimensions.width * 4 * (vert * -1) + 4 * horiz;

      if (newLoc > this.c.pixelData.length || newLoc < 0) {
        return new Pixel(0, 0, 0, 255, this.c);
      }

      return this.pixelAtLocation(newLoc);
    }

    // The counterpart to getPixelRelative, this updates the value of a pixel whose location is specified in relation to the current pixel.

  }, {
    key: 'getPixel',


    // Gets an RGBA object for an arbitrary pixel in the canvas specified by absolute X, Y coordinates
    value: function getPixel(x, y) {
      if (!this.c) {
        throw new Error('Requires a CamanJS context');
      }

      var loc = this.coordinatesToLocation(x, y, this.width);
      return this.pixelAtLocation(loc);
    }

    // Updates the pixel at the given X, Y coordinate

  }, {
    key: 'putPixel',
    value: function putPixel(x, y, rgba) {
      if (!this.c) {
        throw new Error('Requires a CamanJS context');
      }

      var loc = this.coordinatesToLocation(x, y, this.width);

      this.c.pixelData[loc] = rgba.r;
      this.c.pixelData[loc + 1] = rgba.g;
      this.c.pixelData[loc + 2] = rgba.b;
      this.c.pixelData[loc + 3] = rgba.a;
    }
  }, {
    key: 'toString',
    value: function toString() {
      this.toKey();
    }
  }, {
    key: 'toHex',
    value: function toHex() {
      var includeAlpha = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var hex = '#' + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);

      if (includeAlpha) {
        hex += this.a.toString(16);
      }
      return hex;
    }
  }], [{
    key: 'putPixelRelative',
    value: function putPixelRelative(horiz, vert, rgba) {
      if (!this.c) {
        throw new Error('Requires a CamanJS context');
      }

      var newLoc = this.loc + this.c.dimensions.width * 4 * (vert * -1) + 4 * horiz;

      if (newLoc > this.c.pixelData.length || newLoc < 0) {
        return;
      }

      this.c.pixelData[newLoc] = rgba.r;
      this.c.pixelData[newLoc + 1] = rgba.g;
      this.c.pixelData[newLoc + 2] = rgba.b;
      this.c.pixelData[newLoc + 3] = rgba.a;

      return true;
    }
  }]);
  return Pixel;
}();

/**
 * Handles all of the various rendering methods in Caman. Most of the image modification happens here. A new Renderer object is created for every render operation.
 *
 * @export
 * @class Renderer
 */

var Renderer = function () {
  function Renderer(c) {
    classCallCheck(this, Renderer);

    this.c = c;
    this.renderQueue = [];
    this.modPixelData = null;
  }
  // The number of blocks to split the image into during the render process to simulate concurrency. This also helps the browser manage the (possibly) long running render jobs.


  createClass(Renderer, [{
    key: 'add',
    value: function add(job) {
      if (!job) {
        return;
      }
      this.renderQueue.push(job);
    }

    // Grabs the next operation from the render queue and passes it to Renderer for execution

  }, {
    key: 'processNext',
    value: function processNext() {
      // If the queue is empty, fire the finished callback
      if (this.renderQueue.length === 0) {
        Event.trigger(this, 'renderFinished');
        this.finishedFn && this.finishedFn.call(this.c);
        return this;
      }
      this.currentJob = this.renderQueue.shift();

      switch (this.currentJob.type) {
        case Config.FILTER_TYPE.LayerDequeue:
          var layer = this.c.canvasQueue.shift();
          this.c.executeLayer(layer);
          this.processNext();
          break;
        case Config.FILTER_TYPE.LayerFinished:
          this.c.applyCurrentLayer();
          this.c.popContext();
          this.processNext();
          break;
        case Config.FILTER_TYPE.LoadOverlay:
          this.loadOverlay(this.currentJob.layer, this.currentJob.src);
          break;
        case Config.FILTER_TYPE.Plugin:
          this.executePlugin();
          break;
        default:
          this.executeFilter();
      }
    }
  }, {
    key: 'execute',
    value: function execute(camanInstance, callback) {
      var _this = this;

      this.finishedFn = callback;
      Event.listen(camanInstance, '_pixelDataReady', function () {
        _this.modPixelData = Util.dataArray(_this.c.pixelData.length);
        _this.processNext();
      });
    }
  }, {
    key: 'eachBlock',
    value: function eachBlock(fn) {
      var _this2 = this;

      // Prepare all the required render data
      this.blocksDone = 0;

      var n = this.c.pixelData.length;
      var blockPixelLength = Math.floor(n / 4 / Renderer.Blocks);
      var blockN = blockPixelLength * 4;
      var lastBlockN = blockN + n / 4 % Renderer.Blocks * 4;

      var _loop = function _loop(i) {
        var start = i * blockN;
        var end = start + (i === Renderer.Blocks - 1 ? lastBlockN : blockN);
        setTimeout(function () {
          fn.call(_this2, i, start, end);
        }, 0);
      };

      for (var i = 0; i < Renderer.Blocks; i++) {
        _loop(i);
      }
    }

    // The core of the image rendering, this function executes the provided filter.
    // NOTE: this does not write the updated pixel data to the canvas. That happens when all filters are finished rendering in order to be as fast as possible.

  }, {
    key: 'executeFilter',
    value: function executeFilter() {
      Event.trigger(this.c, 'processStart', this.currentJob);

      if (this.currentJob.type === Config.FILTER_TYPE.Single) {
        this.eachBlock(this.renderBlock);
      } else {
        this.eachBlock(this.renderKernel);
      }
    }

    // Executes a standalone plugin

  }, {
    key: 'executePlugin',
    value: function executePlugin() {
      Log.debug('Executing plugin ' + this.currentJob.plugin);
      Plugin.execute(this.c, this.currentJob.plugin, this.currentJob.args);
      Log.debug('Plugin ' + this.currentJob.plugin + ' finished!');

      this.processNext();
    }

    // Renders a single block of the canvas with the current filter function

  }, {
    key: 'renderBlock',
    value: function renderBlock(bnum, start, end) {
      Log.debug('Block #' + bnum + ' - Filter: ' + this.currentJob.name + ', Start: ' + start + ', End: ' + end);
      Event.trigger(this.c, 'blockStarted', {
        blockNum: bnum,
        totalBlocks: Renderer.Blocks,
        startPixel: start,
        endPixel: end
      });

      var pixel = new Pixel();
      pixel.setContext(this.c);

      for (var i = start; i < end; i += 4) {
        pixel.loc = i;

        pixel.r = this.c.pixelData[i];
        pixel.g = this.c.pixelData[i + 1];
        pixel.b = this.c.pixelData[i + 2];
        pixel.a = this.c.pixelData[i + 3];

        this.currentJob.processFn(pixel);

        this.c.pixelData[i] = Util.clampRGB(pixel.r);
        this.c.pixelData[i + 1] = Util.clampRGB(pixel.g);
        this.c.pixelData[i + 2] = Util.clampRGB(pixel.b);
        this.c.pixelData[i + 3] = Util.clampRGB(pixel.a);
      }

      this.blockFinished(bnum);
    }

    // Applies an image kernel to the canvas

  }, {
    key: 'renderKernel',
    value: function renderKernel(bnum, start, end) {
      var bias = this.currentJob.bias;
      var divisor = this.currentJob.divisor;
      var n = this.c.pixelData.length;

      var adjust = this.currentJob.adjust;
      var adjustSize = Math.sqrt(adjust.length);

      var kernel = [];

      Log.debug('Rendering kernel - Filter: ' + this.currentJob.name);

      start = Math.max(start, this.c.dimensions.width * 4 * ((adjustSize - 1) / 2));
      end = Math.min(end, n - this.c.dimensions.width * 4 * ((adjustSize - 1) / 2));

      var builder = (adjustSize - 1) / 2;

      var pixel = new Pixel();
      pixel.setContext(this.c);

      for (var i = start; i < end; i += 4) {
        pixel.loc = i;
        var builderIndex = 0;

        for (var j = -builder; j <= builder; j++) {
          for (var k = builder; k >= -builder; k--) {
            var p = pixel.getPixelRelative(j, k);
            kernel[builderIndex * 3] = p.r;
            kernel[builderIndex * 3 + 1] = p.g;
            kernel[builderIndex * 3 + 2] = p.b;
            builderIndex++;
          }
        }

        var res = this.processKernel(adjust, kernel, divisor, bias);

        this.modPixelData[i] = Util.clampRGB(res.r);
        this.modPixelData[i + 1] = Util.clampRGB(res.g);
        this.modPixelData[i + 2] = Util.clampRGB(res.b);
        this.modPixelData[i + 3] = this.c.pixelData[i + 3];
      }

      this.blockFinished(bnum);
    }

    // Called when a single block is finished rendering. Once all blocks are done, we signal that this filter is finished rendering and continue to the next step.

  }, {
    key: 'blockFinished',
    value: function blockFinished(bnum) {
      if (bnum >= 0) {
        Log.debug('Block #' + bnum + ' finished! Filter: ' + this.currentJob.name);
      }
      this.blocksDone++;

      Event.trigger(this.c, 'blockFinished', {
        blockNum: bnum,
        blocksFinished: this.blocksDone,
        totalBlocks: Renderer.Blocks
      });

      if (this.blocksDone === Renderer.Blocks) {
        if (this.currentJob.type === Config.FILTER_TYPE.Kernel) {
          for (var i = 0; i < this.c.pixelData.length; i++) {
            this.c.pixelData[i] = this.modPixelData[i];
          }
        }

        if (bnum >= 0) {
          Log.debug('Filter ' + this.currentJob.name + ' finished!');
        }
        Event.trigger(this.c, 'processComplete', this.currentJob);
        this.processNext();
      }
    }

    // The "filter function" for kernel adjustments.

  }, {
    key: 'processKernel',
    value: function processKernel(adjust, kernel, divisor, bias) {
      var val = {
        r: 0,
        g: 0,
        b: 0
      };
      for (var i = 0; i < adjust.length; i++) {
        val.r += adjust[i] * kernel[i * 3];
        val.g += adjust[i] * kernel[i * 3 + 1];
        val.b += adjust[i] * kernel[i * 3 + 2];
      }

      val.r = val.r / divisor + bias;
      val.g = val.g / divisor + bias;
      val.b = val.b / divisor + bias;
      return val;
    }
  }]);
  return Renderer;
}();

Object.defineProperty(Renderer, 'Blocks', {
  enumerable: true,
  writable: true,
  value: 4
});

/**
 * Built-in layer blenders. Many of these mimic Photoshop blend modes.
 *
 * @export
 * @class Blender
 */
var Blender = function () {
  function Blender() {
    classCallCheck(this, Blender);
  }

  createClass(Blender, null, [{
    key: "register",

    /**
     * Registers a blender. Can be used to add your own blenders outside of the core library, if needed.
     *
     * @static
     * @param { String } name Name of the blender.
     * @param { Function } func The blender function.
     * @memberof Blender
     */
    value: function register(name, func) {
      this.blenders[name] = func;
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

  }, {
    key: "execute",
    value: function execute(name, rgbaLayer, rgbaParent) {
      return this.blenders[name](rgbaLayer, rgbaParent);
    }
  }]);
  return Blender;
}();

Object.defineProperty(Blender, "blenders", {
  enumerable: true,
  writable: true,
  value: {}
});

/**
 * The entire layering system for Caman resides in this file. Layers get their own canvasLayer object which is created when newLayer() is called. For extensive information regarding the specifics of how the layering system works, there is an in-depth blog post on this very topic.
 * Instead of copying the entirety of that post, I'll simply point you towards the [blog link](http://blog.meltingice.net/programming/implementing-layers-camanjs).
 * However, the gist of the layering system is that, for each layer, it creates a new canvas element and then either copies the parent layer's data or applies a solid color to the new layer. After some (optional) effects are applied, the layer is blended back into the parent canvas layer using one of many different blending algorithms.
 * You can also load an image (local or remote, with a proxy) into a canvas layer, which is useful if you want to add textures to an image.
 *
 * @export
 * @class Layer
 */

var Layer = function () {
  function Layer(c) {
    classCallCheck(this, Layer);

    // Compatibility
    this.c = c;
    this.filter = c;

    this.options = {
      blendingMode: 'normal',
      opacity: 1.0

      // Each layer gets its own unique ID
    };this.layerID = Util.uniqid();

    // Create the canvas for this layer
    // this.canvas = document.createElement('canvas')

    // this.canvas.width = this.c.dimensions.width
    // this.canvas.height = this.c.dimensions.height

    // this.context = this.canvas.getContext('2d')
    // this.context.createImageData(this.canvas.width, this.canvas.height)
    // this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
    // this.pixelData = this.imageData.data

    this.width = this.c.dimensions.width;
    this.height = this.c.dimensions.height;
    this.pixelData = new Uint8ClampedArray(this.c.pixelData.length);
  }

  // If you want to create nested layers


  createClass(Layer, [{
    key: 'newLayer',
    value: function newLayer(cb) {
      this.c.newLayer(cb);
    }

    // Sets the blending mode of this layer. The mode is the name of a blender function.

  }, {
    key: 'setBlendingMode',
    value: function setBlendingMode(mode) {
      this.options.blendingMode = mode;
      return this;
    }

    // Sets the opacity of this layer. This affects how much of this layer is applied to the parent layer at render time.

  }, {
    key: 'opacity',
    value: function opacity(_opacity) {
      this.options.opacity = _opacity / 100;
      return this;
    }

    // Copies the contents of the parent layer to this layer

  }, {
    key: 'copyParent',
    value: function copyParent() {
      var parentData = this.pixelData;
      for (var i = 0; i < this.c.pixelData.length; i += 4) {
        this.pixelData[i] = parentData[i];
        this.pixelData[i + 1] = parentData[i + 1];
        this.pixelData[i + 2] = parentData[i + 2];
        this.pixelData[i + 3] = parentData[i + 3];
      }
      return this;
    }

    // Fills this layer width a single color

  }, {
    key: 'fillColor',
    value: function fillColor() {
      this.c.fillColor.apply(this.c, arguments);
    }

    // Takes the contents of this layer and applies them to the parent layer at render time. This should never be called explicitly by the user.

  }, {
    key: 'applyToParent',
    value: function applyToParent() {
      var parentData = this.c.pixelStack[this.c.pixelStack.length - 1];
      var layerData = this.c.pixelData;

      for (var i = 0; i < layerData.length; i += 4) {
        var rgbaParent = {
          r: parentData[i],
          g: parentData[i + 1],
          b: parentData[i + 2],
          a: parentData[i + 3]
        };
        var rgbaLayer = {
          r: layerData[i],
          g: layerData[i + 1],
          b: layerData[i + 2],
          a: layerData[i + 3]
        };

        var result = Blender.execute(this.options.blendingMode, rgbaLayer, rgbaParent);
        result.r = Util.clampRGB(result.r);
        result.g = Util.clampRGB(result.g);
        result.b = Util.clampRGB(result.b);
        if (!result.a) {
          result.a = rgbaLayer.a;
        }

        parentData[i] = rgbaParent.r - (rgbaParent.r - result.r) * (this.options.opacity * (result.a / 255));
        parentData[i + 1] = rgbaParent.g - (rgbaParent.g - result.g) * (this.options.opacity * (result.a / 255));
        parentData[i + 2] = rgbaParent.b - (rgbaParent.b - result.b) * (this.options.opacity * (result.a / 255));
      }
    }
  }]);
  return Layer;
}();

/**
 * Here it begins. Caman is defined.
 * There are many different initialization for Caman, which are described on the [Guides](http://camanjs.com/guides).
 * Initialization is tricky because we need to make sure everything we need is actually fully loaded in the DOM before proceeding. When initialized on an image, we need to make sure that the image is done loading before converting it to a canvas element and writing the pixel data. If we do this prematurely, the browser will throw a DOM Error, and chaos will ensue. In the event that we initialize Caman on a canvas element while specifying an image URL, we need to create a new image element, load the image, then continue with initialization.
 * The main goal for Caman was simplicity, so all of this is handled transparently to the end-user.
 *
 * @export
 * @class Caman
 * @extends {Module}
 */

var Caman = function (_Module) {
  inherits(Caman, _Module);
  createClass(Caman, null, [{
    key: 'toString',


    // Custom toString()
    // @return [String] Version and release information.

    // The current version.
    value: function toString() {
      return 'Version ' + Caman.version.release + ', Released ' + Caman.version.date;
    }

    /**
     * The Caman function.
     * @param { String } canvasId The canvas-id of the canvas component.
     * @param { Number } width The width of the canvas component.
     * @param { Number } height The height of the canvas component.
     * @return [Caman] Initialized Caman instance.
     * @memberof Caman
     */


    // @property [Boolean] Allow reverting the canvas?
    // If your JS process is running out of memory, disabling
    // this could help drastically.

  }]);

  function Caman() {
    var _ret;

    classCallCheck(this, Caman);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // args[0]: canvasId
    // args[1]: width,
    // args[2]: height
    // args[3]: callback function
    if (args.length === 0) {
      throw new Error('Invalid arguments');
    }

    // const id = args[0]
    var _this2 = possibleConstructorReturn(this, (Caman.__proto__ || Object.getPrototypeOf(Caman)).call(this));

    var callback = args[3];
    if (typeof callback !== 'function') {
      callback = noop;
    }

    // Every instance gets a unique ID.
    _this2.id = Util.uniqid();
    _this2.initializedPixelData = _this2.originalPixelData = null;

    _this2.pixelStack = []; // Stores the pixel layers
    _this2.layerStack = []; // Stores all of the layers waiting to be rendered
    _this2.canvasQueue = []; // Stores all of the canvases to be processed
    _this2.currentLayer = null;

    _this2.analyze = new Analyze(_this2);
    _this2.renderer = new Renderer(_this2);

    // make sure you do everything in onReady callback
    _this2.parseArguments(args);
    _this2.initCanvas();

    return _ret = _this2, possibleConstructorReturn(_this2, _ret);
  }

  /**
   * Parses the arguments given to the Caman function, and sets the appropriate properties on this instance.
   *
   * @param { Array } args Array of arguments passed to Caman.
   * @memberof Caman
   */


  createClass(Caman, [{
    key: 'parseArguments',
    value: function parseArguments(args) {
      // args[0]: canvasId
      // args[1]: width,
      // args[2]: height
      // args[3]: callback function
      if (args.length === 0) {
        throw new Error('Invalid arguments given');
      }

      // First argument is always our canvas/image
      if (typeof args[0] !== 'string') {
        throw new Error('You must pass the canvas-id as the first argument.');
      }
      this.canvas = args[0];
      if (typeof args[1] !== 'number' || typeof args[2] !== 'number') {
        throw new Error('You must pass the width and height of the canvas component.');
      }
      this.width = args[1];
      this.height = args[2];
      this.callback = typeof args[3] === 'function' ? args[3] : noop;
    }

    // Initialization function for browser and canvas objects

  }, {
    key: 'initCanvas',
    value: function initCanvas() {
      this.context = wx.createCanvasContext(this.canvas);
      this.finishInit();
    }

    /**
     * Final step of initialization. We finish setting up our canvas element, and we draw the image to the canvas (if applicable).
     *
     * @memberof Caman
     */

  }, {
    key: 'finishInit',
    value: function finishInit() {
      if (!this.context) {
        this.context = wx.createCanvasContext(this.canvas);
      }

      this.originalWidth = this.preScaledWidth = this.width;
      this.originalHeight = this.preScaledHeight = this.height;

      var _this = this;
      wx.canvasGetImageData({
        canvasId: _this.canvas,
        x: 0,
        y: 0,
        width: _this.width,
        height: _this.height,
        success: function success(res) {
          _this.pixelData = res.data;
          Event.trigger(_this, '_pixelDataReady');
          if (Caman.allowRevert) {
            _this.initializedPixelData = Util.dataArray(_this.pixelData.length);
            _this.originalPixelData = Util.dataArray(_this.pixelData.length);

            for (var i = 0; i < _this.pixelData.length; i++) {
              var pixel = _this.pixelData[i];
              _this.initializedPixelData[i] = pixel;
              _this.originalPixelData[i] = pixel;
            }
          }
        }
      });

      this.dimensions = {
        width: this.width,
        height: this.height
      };

      this.callback(this);

      // Reset the callback so re-initialization doesn't trigger it again.
      this.callback = noop;
    }

    /**
     * Reset the canvas pixels to the original state at initialization.
     *
     * @memberof Caman
     */

  }, {
    key: 'resetOriginalPixelData',
    value: function resetOriginalPixelData() {
      if (!Caman.allowRevert) {
        throw new Error('Revert disabled');
      }

      this.originalPixelData = Util.dataArray(this.pixelData.length);
      for (var i = 0; i < this.pixelData.length; i++) {
        var pixel = this.pixelData[i];
        this.originalPixelData[i] = pixel;
      }
    }

    /**
     * Begins the rendering process. This will execute all of the filter functions called either since initialization or the previous render.
     *
     * @param { Function } [callback=noop] Function to call when rendering is finished.
     * @memberof Caman
     */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

      Event.trigger(this, 'renderStart');
      this.renderer.execute(this, function () {
        var _this = _this3;
        wx.canvasPutImageData({
          canvasId: _this.canvas,
          data: _this.pixelData,
          x: 0,
          y: 0,
          width: _this.width,
          height: _this.height,
          success: function success() {
            callback.call(_this);
          }
        });
      });
    }

    /**
     * Completely resets the canvas back to it's original state.
     * Any size adjustments will also be reset.
     *
     * @memberof Caman
     */

  }, {
    key: 'reset',
    value: function reset() {
      for (var i = 0; i < this.initializedPixelData.length; i++) {
        var pixel = this.initializedPixelData[i];
        this.pixelData[i] = pixel;
      }
      var _this = this;
      wx.canvasPutImageData({
        canvasId: _this.canvas,
        data: this.pixelData,
        x: 0,
        y: 0,
        width: _this.width,
        height: _this.height
      });
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

  }, {
    key: 'process',
    value: function process(name, processFn) {
      this.renderer.add({
        type: Config.FILTER_TYPE.Single,
        name: name,
        processFn: processFn
      });
      return this;
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

  }, {
    key: 'processKernel',
    value: function processKernel(name, adjust) {
      var divisor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var bias = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      if (!divisor) {
        divisor = 0;
        for (var i = 0; i <= adjust.length; i++) {
          divisor += adjust[i];
        }
      }

      this.renderer.add({
        type: Config.FILTER_TYPE.Kernel,
        name: name,
        adjust: adjust,
        divisor: divisor,
        bias: bias
      });

      return this;
    }

    /**
     * Adds a standalone plugin into the render queue.
     *
     * @param { String } plugin Name of the plugin.
     * @param { Array } args Array of arguments to pass to the plugin.
     * @returns { Caman }
     * @memberof Caman
     */

  }, {
    key: 'processPlugin',
    value: function processPlugin(plugin, args) {
      this.renderer.add({
        type: Config.FILTER_TYPE.Plugin,
        plugin: plugin,
        args: args
      });

      return this;
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

  }, {
    key: 'newLayer',
    value: function newLayer(callback) {
      var _this4 = this;

      Event.listen(this, '_pixelDataReady', function () {
        var layer = new Layer(_this4);
        _this4.canvasQueue.push(layer);
        _this4.renderer.add({
          type: Config.FILTER_TYPE.LayerDequeue
        });

        callback.call(layer);

        _this4.renderer.add({
          type: Config.FILTER_TYPE.LayerFinished
        });
      });
      return this;
    }

    /**
     * Pushes the layer context and moves to the next operation.
     *
     * @param { Layer } layer The layer to execute.
     * @memberof Caman
     */

  }, {
    key: 'executeLayer',
    value: function executeLayer(layer) {
      this.pushContext(layer);
    }

    /**
     * Set all of the relevant data to the new layer.
     *
     * @param { Layer } layer The layer whose context we want to switch to.
     * @memberof Caman
     */

  }, {
    key: 'pushContext',
    value: function pushContext(layer) {
      this.layerStack.push(this.currentLayer);
      this.pixelStack.push(this.pixelData);
      this.currentLayer = layer;
      this.pixelData = layer.pixelData;
    }

    // Restore the previous layer context.

  }, {
    key: 'popContext',
    value: function popContext() {
      this.pixelData = this.pixelStack.pop();
      this.currentLayer = this.layerStack.pop();
    }

    // Applies the current layer to its parent layer.

  }, {
    key: 'applyCurrentLayer',
    value: function applyCurrentLayer() {
      this.currentLayer.applyToParent();
    }
  }]);
  return Caman;
}(Module);

Object.defineProperty(Caman, 'version', {
  enumerable: true,
  writable: true,
  value: {
    release: '1.0.0',
    date: '6/08/2018' }
});
Object.defineProperty(Caman, 'allowRevert', {
  enumerable: true,
  writable: true,
  value: true
});

/**
 * Responsible for registering and storing all of the filters.
 *
 * @export
 * @class Filter
 */

var Filter = function () {
  function Filter() {
    classCallCheck(this, Filter);
  }

  createClass(Filter, null, [{
    key: 'register',

    /**
     * Registers a filter function.
     *
     * @static
     * @param { String } name The name of the filter.
     * @param { Function } filterFunc The filter function.
     * @memberof Filter
     */
    value: function register(name, filterFunc) {
      Caman.prototype[name] = filterFunc;
    }
  }]);
  return Filter;
}();

/**
 *
 *
 * @export
 * @param {*} Blender
 */
function registerBlender(Blender) {
  // Directly apply the child layer's pixels to the parent layer with no special changes
  Blender.register('normal', function (rgbaLayer, rgbaParent) {
    return {
      r: rgbaLayer.r,
      g: rgbaLayer.g,
      b: rgbaLayer.b
    };
  });

  // Apply the child to the parent by multiplying the color values. This generally creates contrast.
  Blender.register('multiply', function (rgbaLayer, rgbaParent) {
    return {
      r: rgbaLayer.r * rgbaParent.r / 255,
      g: rgbaLayer.g * rgbaParent.g / 255,
      b: rgbaLayer.b * rgbaParent.b / 255
    };
  });

  Blender.register('screen', function (rgbaLayer, rgbaParent) {
    return {
      r: 255 - (255 - rgbaLayer.r) * (255 - rgbaParent.r) / 255,
      g: 255 - (255 - rgbaLayer.g) * (255 - rgbaParent.g) / 255,
      b: 255 - (255 - rgbaLayer.b) * (255 - rgbaParent.b) / 255
    };
  });

  Blender.register('overlay', function (rgbaLayer, rgbaParent) {
    var result = {};
    result.r = rgbaParent.r > 128 ? 255 - 2 * (255 - rgbaLayer.r) * (255 - rgbaParent.r) / 255 : rgbaParent.r * rgbaLayer.r * 2 / 255;
    result.g = rgbaParent.g > 128 ? 255 - 2 * (255 - rgbaLayer.g) * (255 - rgbaParent.g) / 255 : rgbaParent.g * rgbaLayer.g * 2 / 255;
    result.b = rgbaParent.b > 128 ? 255 - 2 * (255 - rgbaLayer.b) * (255 - rgbaParent.b) / 255 : rgbaParent.b * rgbaLayer.b * 2 / 255;

    return result;
  });

  Blender.register('difference', function (rgbaLayer, rgbaParent) {
    return {
      r: rgbaLayer.r - rgbaParent.r,
      g: rgbaLayer.g - rgbaParent.g,
      b: rgbaLayer.b - rgbaParent.b
    };
  });

  Blender.register('addition', function (rgbaLayer, rgbaParent) {
    return {
      r: rgbaParent.r + rgbaLayer.r,
      g: rgbaParent.g + rgbaLayer.g,
      b: rgbaParent.b + rgbaLayer.b
    };
  });

  Blender.register('exclusion', function (rgbaLayer, rgbaParent) {
    return {
      r: 128 - 2 * (rgbaParent.r - 128) * (rgbaLayer.r - 128) / 255,
      g: 128 - 2 * (rgbaParent.g - 128) * (rgbaLayer.g - 128) / 255,
      b: 128 - 2 * (rgbaParent.b - 128) * (rgbaLayer.b - 128) / 255
    };
  });

  Blender.register('softLight', function (rgbaLayer, rgbaParent) {
    var result = {};

    result.r = rgbaParent.r > 128 ? 255 - (255 - rgbaParent.r) * (255 - (rgbaLayer.r - 128)) / 255 : rgbaParent.r * (rgbaLayer.r + 128) / 255;

    result.g = rgbaParent.g > 128 ? 255 - (255 - rgbaParent.g) * (255 - (rgbaLayer.g - 128)) / 255 : rgbaParent.g * (rgbaLayer.g + 128) / 255;

    result.b = rgbaParent.b > 128 ? 255 - (255 - rgbaParent.b) * (255 - (rgbaLayer.b - 128)) / 255 : rgbaParent.b * (rgbaLayer.b + 128) / 255;

    return result;
  });

  Blender.register('lighten', function (rgbaLayer, rgbaParent) {
    return {
      r: rgbaParent.r > rgbaLayer.r ? rgbaParent.r : rgbaLayer.r,
      g: rgbaParent.g > rgbaLayer.g ? rgbaParent.g : rgbaLayer.g,
      b: rgbaParent.b > rgbaLayer.b ? rgbaParent.b : rgbaLayer.b
    };
  });

  Blender.register('darken', function (rgbaLayer, rgbaParent) {
    return {
      r: rgbaParent.r > rgbaLayer.r ? rgbaLayer.r : rgbaParent.r,
      g: rgbaParent.g > rgbaLayer.g ? rgbaLayer.g : rgbaParent.g,
      b: rgbaParent.b > rgbaLayer.b ? rgbaLayer.b : rgbaParent.b
    };
  });
}

/**
 * Tons of color conversion utility functions.
 *
 * @export
 * @class Convert
 */
var Convert = function () {
  function Convert() {
    classCallCheck(this, Convert);
  }

  createClass(Convert, null, [{
    key: 'hexToRGB',

    /**
     * Converts the hex representation of a color to RGB values.
     * Hex value can optionally start with the hash (#).
     *
     * @static
     * @param { String } hex The colors hex value
     * @returns { Object } The RGB representation
     * @memberof Convert
     */
    value: function hexToRGB(hex) {
      if (hex.charAt(0) === '#') {
        hex = hex.substr(1);
      }
      var r = parseInt(hex.substr(0, 2), 16);
      var g = parseInt(hex.substr(2, 2), 16);
      var b = parseInt(hex.substr(4, 2), 16);
      return { r: r, g: g, b: b };
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

  }, {
    key: 'rgbToHSL',
    value: function rgbToHSL(r, g, b) {
      if ((typeof r === 'undefined' ? 'undefined' : _typeof(r)) === 'object') {
        g = r.g;
        b = r.b;
        r = r.r;
      }

      r /= 255;
      g /= 255;
      b /= 255;

      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var l = (max + min) / 2;
      var h = void 0,
          s = void 0;
      if (max === min) {
        h = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        if (max === r) {
          h = (g - b) / d + g < b ? 6 : 0;
        } else if (max === g) {
          h = (b - r) / d + 2;
        } else if (max === b) {
          h = (r - g) / d + 4;
        }

        h /= 6;
      }
      return { h: h, s: s, l: l };
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

  }, {
    key: 'hslToRGB',
    value: function hslToRGB(h, s, l) {
      var r = void 0,
          g = void 0,
          b = void 0,
          p = void 0,
          q = void 0;
      if ((typeof h === 'undefined' ? 'undefined' : _typeof(h)) === 'object') {
        s = h.s;
        l = h.l;
        h = h.h;
      }
      if (s === 0) {
        r = g = b = l;
      } else {
        q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        p = 2 * l - q;

        r = this.hueToRGB(p, q, h + 1 / 3);
        g = this.hueToRGB(p, q, h);
        b = this.hueToRGB(p, q, h - 1 / 3);
      }
      return {
        r: r * 255,
        g: g * 255,
        b: b * 255
      };
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

  }, {
    key: 'hueToRGB',
    value: function hueToRGB(p, q, t) {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1 / 2) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
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

  }, {
    key: 'rgbToHSV',
    value: function rgbToHSV(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;

      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var v = max;
      var d = max - min;

      var s = max === 0 ? 0 : d / max;
      var h = void 0;
      if (max === min) {
        h = 0;
      } else {
        if (max === r) {
          h = (g - b) / d + g < b ? 6 : 0;
        } else if (max === g) {
          h = (b - r) / d + 2;
        } else if (max === b) {
          h = (r - g) / d + 4;
        }
        h /= 6;
      }

      return { h: h, s: s, v: v };
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

  }, {
    key: 'hsvToRGB',
    value: function hsvToRGB(h, s, v) {
      var i = Math.floor(h * 6);
      var f = h * 6 - i;
      var p = v * (1 - s);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);

      var r = void 0,
          g = void 0,
          b = void 0;
      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }

      return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
      };
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

  }, {
    key: 'rgbToXYZ',
    value: function rgbToXYZ(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;

      if (r > 0.04045) {
        r = Math.pow((r + 0.055) / 1.055, 2.4);
      } else {
        r /= 12.92;
      }

      if (g > 0.04045) {
        g = Math.pow((g + 0.055) / 1.055, 2.4);
      } else {
        g /= 12.92;
      }

      if (b > 0.04045) {
        b = Math.pow((b + 0.055) / 1.055, 2.4);
      } else {
        b /= 12.92;
      }

      var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      var z = r * 0.0193 + g * 0.1192 + b * 0.9505;

      return {
        x: x * 100,
        y: y * 100,
        z: z * 100
      };
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

  }, {
    key: 'xyzToRGB',
    value: function xyzToRGB(x, y, z) {
      x /= 100;
      y /= 100;
      z /= 100;

      var r = 3.2406 * x + -1.5372 * y + -0.4986 * z;
      var g = -0.9689 * x + 1.8758 * y + 0.0415 * z;
      var b = 0.0557 * x + -0.2040 * y + 1.0570 * z;

      if (r > 0.0031308) {
        r = 1.055 * Math.pow(r, 0.4166666667) - 0.055;
      } else {
        r *= 12.92;
      }

      if (g > 0.0031308) {
        g = 1.055 * Math.pow(g, 0.4166666667) - 0.055;
      } else {
        g *= 12.92;
      }

      if (b > 0.0031308) {
        b = 1.055 * Math.pow(b, 0.4166666667) - 0.055;
      } else {
        b *= 12.92;
      }

      return {
        r: r * 255,
        g: g * 255,
        b: b * 255
      };
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

  }, {
    key: 'xyzToLab',
    value: function xyzToLab(x, y, z) {
      if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object') {
        y = x.y;
        z = x.z;
        x = x.x;
      }

      var whiteX = 95.047;
      var whiteY = 100.0;
      var whiteZ = 108.883;

      x /= whiteX;
      y /= whiteY;
      z /= whiteZ;

      if (x > 0.008856451679) {
        x = Math.pow(x, 0.3333333333);
      } else {
        x = 7.787037037 * x + 0.1379310345;
      }

      if (y > 0.008856451679) {
        y = Math.pow(y, 0.3333333333);
      } else {
        y = 7.787037037 * y + 0.1379310345;
      }

      if (z > 0.008856451679) {
        z = Math.pow(z, 0.3333333333);
      } else {
        z = 7.787037037 * z + 0.1379310345;
      }

      var l = 116 * y - 16;
      var a = 500 * (x - y);
      var b = 200 * (y - z);

      return { l: l, a: a, b: b };
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

  }, {
    key: 'labToXYZ',
    value: function labToXYZ(l, a, b) {
      if ((typeof l === 'undefined' ? 'undefined' : _typeof(l)) === 'object') {
        a = l.a;
        b = l.b;
        l = l.l;
      }

      var y = (l + 16) / 116;
      var x = y + a / 500;
      var z = y - b / 200;

      if (x > 0.2068965517) {
        x = x * x * x;
      } else {
        x = 0.1284185493 * (x - 0.1379310345);
      }
      if (y > 0.2068965517) {
        y = y * y * y;
      } else {
        y = 0.1284185493 * (y - 0.1379310345);
      }
      if (z > 0.2068965517) {
        z = z * z * z;
      } else {
        z = 0.1284185493 * (z - 0.1379310345);
      }

      // D65 reference white point
      return {
        x: x * 95.047,
        y: y * 100.0,
        z: z * 108.883
      };
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

  }, {
    key: 'rgbToLab',
    value: function rgbToLab(r, g, b) {
      if ((typeof r === 'undefined' ? 'undefined' : _typeof(r)) === 'object') {
        g = r.g;
        b = r.b;
        r = r.r;
      }

      var xyz = this.rgbToXYZ(r, g, b);
      return this.xyzToLab(xyz);
    }
  }]);
  return Convert;
}();

/**
 * Various math-heavy helpers that are used throughout CamanJS.
 *
 * @export
 * @class Calculate
 */
var Calculate = function () {
  function Calculate() {
    classCallCheck(this, Calculate);
  }

  createClass(Calculate, null, [{
    key: 'distance',

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
    value: function distance(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
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

  }, {
    key: 'randomRange',
    value: function randomRange(min, max) {
      var getFloat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var rand = min + Math.random() * (max - min);
      if (getFloat) {
        return rand.toFixed(getFloat);
      } else {
        return Math.round(rand);
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

  }, {
    key: 'luminance',
    value: function luminance(rgba) {
      return 0.299 * rgba.r + 0.587 * rgba.g + 0.114 * rgba.b;
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

  }, {
    key: 'bezier',
    value: function bezier(controlPoints) {
      var lowBound = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var highBound = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 255;

      if (controlPoints.length < 2) {
        throw new Error('Invalid number of arguments to bezier');
      }

      var bezier = {};
      var lerp = function lerp(a, b, t) {
        return a * (1 - t) + b * t;
      };
      var clamp = function clamp(a, min, max) {
        return Math.min(Math.max(a, min), max);
      };

      for (var i = 0; i < 1000; i++) {
        var t = i / 1000;
        var prev = controlPoints;

        while (prev.length > 1) {
          var next = [];
          for (var j = 0; j <= prev.length - 2; j++) {
            next.push([lerp(prev[j][0], prev[j + 1][0], t), lerp(prev[j][1], prev[j + 1][1], t)]);
          }
          prev = next;
        }

        bezier[Math.round(prev[0][0])] = Math.round(clamp(prev[0][1], lowBound, highBound));
      }

      var endX = controlPoints[controlPoints.length - 1][0];
      bezier = Calculate.missingValues(bezier, endX);

      // Edge case
      if (!bezier[endX]) {
        bezier[endX] = bezier[endX - 1];
      }

      return bezier;
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

  }, {
    key: 'missingValues',
    value: function missingValues(values, endX) {
      // Do a search for missing values in the bezier array and use linear
      // interpolation to approximate their values
      if (Object.keys(values).length < endX + 1) {
        var ret = {};
        var leftCoord = void 0,
            rightCoord = void 0;
        for (var i = 0; i <= endX; i++) {
          if (values[i]) {
            ret[i] = values[i];
          } else {
            leftCoord = [i - 1, ret[i - 1]];
            // Find the first value to the right. Ideally this loop will break
            // very quickly.
            for (var j = i; j <= endX; j++) {
              if (values[j]) {
                rightCoord = [j, values[j]];
                break;
              }
            }
            ret[i] = leftCoord[1] + (rightCoord[1] - leftCoord[1]) / (rightCoord[0] - leftCoord[0]) * (i - leftCoord[0]);
          }
        }
        return ret;
      }
      return values;
    }
  }]);
  return Calculate;
}();

// The filters define all of the built-in functionality that comes with Caman (as opposed to being  provided by a plugin). All of these filters are ratherbasic, but are extremely powerful when many are combined. For information on creating plugins, check out the [Plugin Creation](http://camanjs.com/docs/plugin-creation) page, and for information on using the plugins, check out the [Built-In Functionality(http://camanjs.com/docs/built-in) page.

/**
 *
 *
 * @export
 * @param {*} Filter
 */
function registerFilter(Filter) {
  /*
  * Fill Color
  * Fills the canvas with a single solid color.
  * Arguments: Can take either separate R, G, and B values as arguments, or a single hex color value.
  */
  Filter.register('fillColor', function () {
    var color = void 0;
    if (arguments.length === 1) {
      color = Convert.hexToRGB(arguments.length <= 0 ? undefined : arguments[0]);
    } else {
      color = {
        r: arguments.length <= 0 ? undefined : arguments[0],
        g: arguments.length <= 1 ? undefined : arguments[1],
        b: arguments.length <= 2 ? undefined : arguments[2]
      };
    }
    return this.process('fillColor', function (rgba) {
      rgba.r = color.r;
      rgba.g = color.g;
      rgba.b = color.b;
      rgba.a = 255;
      return rgba;
    });
  });

  /*
  * Brightness
  * Simple brightness adjustment.
  * Arguments: Range is -100 to 100. Values < 0 will darken image while values > 0 will brighten.
  */
  Filter.register('brightness', function (adjust) {
    adjust = Math.floor(255 * (adjust / 100));
    return this.process('brightness', function (rgba) {
      rgba.r += adjust;
      rgba.g += adjust;
      rgba.b += adjust;
      return rgba;
    });
  });

  /*
  * Saturation
  * Adjusts the color saturation of the image.
  * Arguments: Range is -100 to 100. Values < 0 will desaturate the image while values > 0 will saturate it.
  * If you want to completely desaturate the image, using the greyscale filter is highly recommended because it will yield better results.
  */
  Filter.register('saturation', function (adjust) {
    adjust *= -0.01;
    return this.process('saturation', function (rgba) {
      var max = Math.max(rgba.r, rgba.g, rgba.b);

      if (rgba.r !== max) {
        rgba.r += (max - rgba.r) * adjust;
      }
      if (rgba.g !== max) {
        rgba.g += (max - rgba.g) * adjust;
      }
      if (rgba.b !== max) {
        rgba.b += (max - rgba.b) * adjust;
      }

      return rgba;
    });
  });

  /*
  * Vibrance
  * Similar to saturation, but adjusts the saturation levels in a slightly smarter, more subtle way.
  * Vibrance will attempt to boost colors that are less saturated more and boost already saturated colors less, while saturation boosts all colors by the same level.
  * Arguments: Range is -100 to 100. Values < 0 will desaturate the image while values > 0 will saturate it.
  * If you want to completely desaturate the image, using the greyscale filter is highly recommended because it will yield better results.
  */
  Filter.register('vibrance', function (adjust) {
    adjust *= -1;
    return this.process('vibrance', function (rgba) {
      var max = Math.max(rgba.r, rgba.g, rgba.b);
      var avg = (rgba.r + rgba.g + rgba.b) / 3;
      var amt = Math.abs(max - avg) * 2 / 255 * adjust / 100;

      if (rgba.r !== max) {
        rgba.r += (max - rgba.r) * amt;
      }
      if (rgba.g !== max) {
        rgba.g += (max - rgba.g) * amt;
      }
      if (rgba.b !== max) {
        rgba.b += (max - rgba.b) * amt;
      }

      return rgba;
    });
  });

  /*
  * Greyscale
  * An improved greyscale function that should make prettier results than simply using the saturation filter to remove color. It does so by using factors that directly relate to how the human eye perceves color and values. There are no arguments, it simply makes the image greyscale with no in-between.
  * Algorithm adopted from http://www.phpied.com/image-fun/
  */
  Filter.register('greyscale', function () {
    return this.process('greyscale', function (rgba) {
      var avg = Calculate.luminance(rgba);
      rgba.r = avg;
      rgba.g = avg;
      rgba.b = avg;
      return rgba;
    });
  });

  /*
  * Contrast
  * Increases or decreases the color contrast of the image.
  * Arguments: Range is -100 to 100. Values < 0 will decrease contrast while values > 0 will increase contrast.
  * The contrast adjustment values are a bit sensitive. While unrestricted, sane adjustment values are usually around 5-10.
  */
  Filter.register('contrast', function (adjust) {
    adjust = Math.pow((adjust + 100) / 100, 2);
    return this.process('contrast', function (rgba) {
      // Red channel
      rgba.r /= 255;
      rgba.r -= 0.5;
      rgba.r *= adjust;
      rgba.r += 0.5;
      rgba.r *= 255;

      // Green channel
      rgba.g /= 255;
      rgba.g -= 0.5;
      rgba.g *= adjust;
      rgba.g += 0.5;
      rgba.g *= 255;

      // Blue channel
      rgba.b /= 255;
      rgba.b -= 0.5;
      rgba.b *= adjust;
      rgba.b += 0.5;
      rgba.b *= 255;

      return rgba;
    });
  });

  /*
  * Hue
  * Adjusts the hue of the image. It can be used to shift the colors in an image in a uniform fashion. If you are unfamiliar with Hue, I recommend reading this [Wikipedia article](http://en.wikipedia.org/wiki/Hue).
  * Arguments: Range is 0 to 100
  * Sometimes, Hue is expressed in the range of 0 to 360. If that's the terminology you're used to, think of 0 to 100 representing the percentage of Hue shift in the 0 to 360 range.
  */
  Filter.register('hue', function (adjust) {
    return this.process('hue', function (rgba) {
      var hsv = Convert.rgbToHSV(rgba.r, rgba.g, rgba.b);

      var h = hsv.h * 100;
      h += Math.abs(adjust);
      h = h % 100;
      h /= 100;
      hsv.h = h;

      var _Convert$hsvToRGB = Convert.hsvToRGB(hsv.h, hsv.s, hsv.v),
          r = _Convert$hsvToRGB.r,
          g = _Convert$hsvToRGB.g,
          b = _Convert$hsvToRGB.b;

      rgba.r = r;
      rgba.g = g;
      rgba.b = b;

      return rgba;
    });
  });

  /*
  * Colorize
  * Uniformly shifts the colors in an image towards the given color. The adjustment range is from 0 to 100. The higher the value, the closer the colors in the image shift towards the given adjustment color.
  * Arguments: This filter is polymorphic and can take two different sets of arguments. Either a hex color string and an adjustment value, or RGB colors and an adjustment value.
  */
  Filter.register('colorize', function () {
    var rgb = void 0,
        level = void 0;
    if (arguments.length === 2) {
      rgb = Convert.hexToRGB(arguments.length <= 0 ? undefined : arguments[0]);
      level = arguments.length <= 1 ? undefined : arguments[1];
    } else if (arguments.length === 4) {
      rgb = {
        r: arguments.length <= 0 ? undefined : arguments[0],
        g: arguments.length <= 1 ? undefined : arguments[1],
        b: arguments.length <= 2 ? undefined : arguments[2]
      };
      level = arguments.length <= 3 ? undefined : arguments[3];
    }

    return this.process('colorize', function (rgba) {
      rgba.r -= (rgba.r - rgb.r) * (level / 100);
      rgba.g -= (rgba.g - rgb.g) * (level / 100);
      rgba.b -= (rgba.b - rgb.b) * (level / 100);
      return rgba;
    });
  });

  /*
  * Invert
  * Inverts all colors in the image by subtracting each color channel value from 255. No arguments.
  */
  Filter.register('invert', function () {
    return this.process('invert', function (rgba) {
      rgba.r = 255 - rgba.r;
      rgba.g = 255 - rgba.g;
      rgba.b = 255 - rgba.b;
      return rgba;
    });
  });

  /*
  * Sepia
  * Applies an adjustable sepia filter to the image.
  * Arguments: Assumes adjustment is between 0 and 100, which represents how much the sepia filter is applied.
  */
  Filter.register('sepia', function () {
    var adjust = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    adjust /= 100;
    return this.process('sepia', function (rgba) {
      // All three color channels have special conversion factors that
      // define what sepia is. Here we adjust each channel individually,
      // with the twist that you can partially apply the sepia filter.
      rgba.r = Math.min(255, rgba.r * (1 - 0.607 * adjust) + rgba.g * (0.769 * adjust) + rgba.b * (0.189 * adjust));
      rgba.g = Math.min(255, rgba.r * (0.349 * adjust) + rgba.g * (1 - 0.314 * adjust) + rgba.b * (0.168 * adjust));
      rgba.b = Math.min(255, rgba.r * (0.272 * adjust) + rgba.g * (0.534 * adjust) + rgba.b * (1 - 0.869 * adjust));
      return rgba;
    });
  });

  /*
  * Gamma
  * Adjusts the gamma of the image.
  * Arguments: Range is from 0 to infinity, although sane values are from 0 to 4 or 5.
  * Values between 0 and 1 will lessen the contrast while values greater than 1 will increase it.
  */
  Filter.register('gamma', function (adjust) {
    return this.process('gamma', function (rgba) {
      rgba.r = Math.pow(rgba.r / 255, adjust) * 255;
      rgba.g = Math.pow(rgba.g / 255, adjust) * 255;
      rgba.b = Math.pow(rgba.b / 255, adjust) * 255;
      return rgba;
    });
  });

  /*
  * Noise
  * Adds noise to the image on a scale from 1 - 100. However, the scale isn't constrained, so you can specify a value > 100 if you want a LOT of noise.
  */
  Filter.register('noise', function (adjust) {
    adjust = Math.abs(adjust) * 2.55;

    return this.process('noise', function (rgba) {
      var rand = Calculate.randomRange(adjust * -1, adjust);
      rgba.r += rand;
      rgba.g += rand;
      rgba.b += rand;
      return rgba;
    });
  });

  /*
  * Clip
  * Clips a color to max values when it falls outside of the specified range.
  * Arguments: supplied value should be between 0 and 100.
  */
  Filter.register('clip', function (adjust) {
    adjust = Math.abs(adjust) * 2.55;

    return this.process('clip', function (rgba) {
      if (rgba.r > 255 - adjust) {
        rgba.r = 255;
      } else if (rgba.r < adjust) {
        rgba.r = 0;
      }

      if (rgba.g > 255 - adjust) {
        rgba.g = 255;
      } else if (rgba.g < adjust) {
        rgba.g = 0;
      }

      if (rgba.b > 255 - adjust) {
        rgba.b = 255;
      } else if (rgba.b < adjust) {
        rgba.b = 0;
      }

      return rgba;
    });
  });

  /*
  * Channels
  * Lets you modify the intensity of any combination of red, green, or blue channels individually.
  * Arguments: Must be given at least one color channel to adjust in order to work.
  * Options format (must specify 1 - 3 colors):
  * {
  *   red: 20,
  *   green: -5,
  *   blue: -40
  * }
  */
  Filter.register('channels', function (options) {
    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
      return this;
    }
    for (var chan in options) {
      if (options.hasOwnProperty(chan)) {
        if (options[chan] === 0) {
          delete options[chan];
          continue;
        }
        options[chan] /= 100;
      }
    }
    if (options.length === 0) {
      return this;
    }

    return this.process('channels', function (rgba) {
      if (options.red) {
        if (options.red > 0) {
          rgba.r += (255 - rgba.r) * options.red;
        } else {
          rgba.r -= rgba.r * Math.abs(options.red);
        }
      }
      if (options.green) {
        if (options.green > 0) {
          rgba.g += (255 - rgba.g) * options.green;
        } else {
          rgba.g -= rgba.g * Math.abs(options.green);
        }
      }
      if (options.blue) {
        if (options.blue > 0) {
          rgba.b += (255 - rgba.b) * options.blue;
        } else {
          rgba.b -= rgba.b * Math.abs(options.blue);
        }
      }

      return rgba;
    });
  });

  /*
  * Curves
  * Curves implementation using Bezier curve equation. If you're familiar with the Curves functionality in Photoshop, this works in a very similar fashion.
  * Arguments:
  * chan - [r, g, b, rgb]
  * cps - [x, y]* (curve control points, min. 2; 0 - 255)
  * algo - function (optional)
  *
  * The first argument represents the channels you wish to modify with the filter. It can be an array of channels or a string (for a single channel). The rest of the arguments are 2-element arrays that represent point coordinates. They are specified in the same order as shown in this image to the right. The coordinates are in the range of 0 to 255 for both X and Y values.
  * It is possible to pass the function an optional function describing which curve algorithm to use.
  * It defaults to bezier.
  * The x-axis represents the input value for a single channel, while the y-axis represents the output value.
  */
  Filter.register('curves', function (chans) {
    for (var _len = arguments.length, cps = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      cps[_key - 1] = arguments[_key];
    }

    var last = cps[cps.length - 1];
    var algo = void 0;
    if (typeof last === 'function') {
      algo = last;
      cps.pop();
    } else if (typeof last === 'string') {
      algo = Calculate[last];
      cps.pop();
    } else {
      algo = Calculate.bezier;
    }

    // If channels are in a string, split to an array
    if (typeof chans === 'string') {
      chans = chans.split('');
    }
    if (chans[0] === 'v') {
      chans = ['r', 'g', 'b'];
    }

    if (cps.length < 2) {
      // might want to give a warning now
      throw new Error('Invalid number of arguments to curves filter');
    }

    // Generate a curve
    var bezier = algo(cps, 0, 255);

    // If the curve starts after x = 0, initialize it with a flat line
    // until the curve begins.
    var start = cps[0];
    if (start[0] > 0) {
      for (var i = 0; i < start[0]; i++) {
        bezier[i] = start[1];
      }
    }

    var end = cps[cps.length - 1];
    if (end[0] < 255) {
      for (var _i = end[0]; _i <= 255; _i++) {
        bezier[_i] = end[1];
      }
    }

    return this.process('curves', function (rgba) {
      // Now that we have the bezier curve, we do a basic hashmap lookup
      // to find and replace color values.
      for (var _i2 = 0; _i2 < chans.length; _i2++) {
        rgba[chans[_i2]] = bezier[rgba[chans[_i2]]];
      }
      return rgba;
    });
  });

  /*
  * Exposure
  * Adjusts the exposure of the image by using the curves function.
  * Arguments: Range is -100 to 100. Values < 0 will decrease exposure while values > 0 will increase exposure.
  */
  Filter.register('exposure', function (adjust) {
    var p = Math.abs(adjust) / 100;

    var ctrl1 = [0, 255 * p];
    var ctrl2 = [255 - 255 * p, 255];

    if (adjust < 0) {
      ctrl1 = ctrl1.reverse();
      ctrl2 = ctrl2.reverse();
    }
    return this.curves('rgb', [0, 0], ctrl1, ctrl2, [255, 255]);
  });
}

var vignetteFilters = {
  brightness: function brightness(rgba, amt, opts) {
    rgba.r = rgba.r - rgba.r * amt * opts.strength;
    rgba.g = rgba.g - rgba.g * amt * opts.strength;
    rgba.b = rgba.b - rgba.b * amt * opts.strength;
    return rgba;
  },
  gamma: function gamma(rgba, amt, opts) {
    rgba.r = Math.pow(rgba.r / 255, Math.max(10 * amt * opts.strength, 1)) * 255;
    rgba.g = Math.pow(rgba.g / 255, Math.max(10 * amt * opts.strength, 1)) * 255;
    rgba.b = Math.pow(rgba.b / 255, Math.max(10 * amt * opts.strength, 1)) * 255;
    return rgba;
  },
  colorize: function colorize(rgba, amt, opts) {
    rgba.r -= (rgba.r - opts.color.r) * amt;
    rgba.g -= (rgba.g - opts.color.g) * amt;
    rgba.b -= (rgba.b - opts.color.b) * amt;
    return rgba;
  }
};

/**
 *
 *
 * @export
 * @param {*} Filter
 */
function registerCameraFilter(Filter) {
  Filter.register('vignette', function (size) {
    var strength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;

    var bezier = void 0,
        center = void 0,
        end = void 0,
        start = void 0;

    if (typeof size === 'string' && size.substr(-1) === '%') {
      if (this.dimensions.height > this.dimensions.width) {
        size = this.dimensions.width * (parseInt(size.substr(0, size.length - 1), 10) / 100);
      } else {
        size = this.dimensions.height * (parseInt(size.substr(0, size.length - 1), 10) / 100);
      }
    }
    strength /= 100;
    center = [this.dimensions.width / 2, this.dimensions.height / 2];
    start = Math.sqrt(Math.pow(center[0], 2) + Math.pow(center[1], 2));
    end = start - size;
    bezier = Calculate.bezier([0, 1], [30, 30], [70, 60], [100, 80]);
    this.process('vignette', function (rgba) {
      var dist, div, loc;
      loc = rgba.locationXY();
      dist = Calculate.distance(loc.x, loc.y, center[0], center[1]);
      if (dist > end) {
        div = Math.max(1, bezier[Math.round((dist - end) / size * 100)] / 10 * strength);
        rgba.r = Math.pow(rgba.r / 255, div) * 255;
        rgba.g = Math.pow(rgba.g / 255, div) * 255;
        rgba.b = Math.pow(rgba.b / 255, div) * 255;
      }
      return rgba;
    });
  });

  Filter.register('rectangularVignette', function (opts) {
    var defaults$$1 = void 0,
        dim = void 0,
        percent = void 0,
        size = void 0,
        _i = void 0,
        _len = void 0,
        _ref = void 0;
    defaults$$1 = {
      strength: 50,
      cornerRadius: 0,
      method: 'brightness',
      color: {
        r: 0,
        g: 0,
        b: 0
      }
    };
    opts = Util.extend(defaults$$1, opts);
    if (!opts.size) {
      return this;
    } else if (typeof opts.size === 'string') {
      percent = parseInt(opts.size, 10) / 100;
      opts.size = {
        width: this.dimensions.width * percent,
        height: this.dimensions.height * percent
      };
    } else if (_typeof(opts.size) === 'object') {
      _ref = ['width', 'height'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dim = _ref[_i];
        if (typeof opts.size[dim] === 'string') {
          opts.size[dim] = this.dimensions[dim] * (parseInt(opts.size[dim], 10) / 100);
        }
      }
    } else if (opts.size === 'number') {
      size = opts.size;
      opts.size = {
        width: size,
        height: size
      };
    }
    if (typeof opts.cornerRadius === 'string') {
      opts.cornerRadius = opts.size.width / 2 * (parseInt(opts.cornerRadius, 10) / 100);
    }
    opts.strength /= 100;
    opts.size.width = Math.floor(opts.size.width);
    opts.size.height = Math.floor(opts.size.height);
    opts.image = {
      width: this.dimensions.width,
      height: this.dimensions.height
    };
    if (opts.method === 'colorize' && typeof opts.color === 'string') {
      opts.color = Convert.hexToRGB(opts.color);
    }
    opts.coords = {
      left: (this.dimensions.width - opts.size.width) / 2,
      right: this.dimensions.width - opts.coords.left,
      bottom: (this.dimensions.height - opts.size.height) / 2,
      top: this.dimensions.height - opts.coords.bottom
    };
    opts.corners = [{
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
    }];
    opts.maxDist = Calculate.distance(0, 0, opts.corners[3].x, opts.corners[3].y) - opts.cornerRadius;
    this.process('rectangularVignette', function (rgba) {
      var amt, loc, radialDist;
      loc = rgba.locationXY();
      if (loc.x > opts.corners[0].x && loc.x < opts.corners[1].x && loc.y > opts.coords.bottom && loc.y < opts.coords.top) {
        return rgba;
      }
      if (loc.x > opts.coords.left && loc.x < opts.coords.right && loc.y > opts.corners[3].y && loc.y < opts.corners[2].y) {
        return rgba;
      }
      if (loc.x > opts.corners[0].x && loc.x < opts.corners[1].x && loc.y > opts.coords.top) {
        amt = (loc.y - opts.coords.top) / opts.maxDist;
      } else if (loc.y > opts.corners[2].y && loc.y < opts.corners[1].y && loc.x > opts.coords.right) {
        amt = (loc.x - opts.coords.right) / opts.maxDist;
      } else if (loc.x > opts.corners[0].x && loc.x < opts.corners[1].x && loc.y < opts.coords.bottom) {
        amt = (opts.coords.bottom - loc.y) / opts.maxDist;
      } else if (loc.y > opts.corners[2].y && loc.y < opts.corners[1].y && loc.x < opts.coords.left) {
        amt = (opts.coords.left - loc.x) / opts.maxDist;
      } else if (loc.x <= opts.corners[0].x && loc.y >= opts.corners[0].y) {
        radialDist = Calculate.distance(loc.x, loc.y, opts.corners[0].x, opts.corners[0].y);
        amt = (radialDist - opts.cornerRadius) / opts.maxDist;
      } else if (loc.x >= opts.corners[1].x && loc.y >= opts.corners[1].y) {
        radialDist = Calculate.distance(loc.x, loc.y, opts.corners[1].x, opts.corners[1].y);
        amt = (radialDist - opts.cornerRadius) / opts.maxDist;
      } else if (loc.x >= opts.corners[2].x && loc.y <= opts.corers[2].y) {
        radialDist = Calculate.distance(loc.x, loc.y, opts.corners[2].x, opts.corners[2].y);
        amt = (radialDist - opts.cornerRadius) / opts.maxDist;
      } else if (loc.x <= opts.corners[3].x && loc.y <= opts.corners[3].y) {
        radialDist = Calculate.distance(loc.x, loc.y, opts.corners[3].x, opts.corners[3].y);
        amt = (radialDist - opts.cornerRadius) / opts.maxDist;
      }
      if (amt < 0) {
        return rgba;
      }
      return vignetteFilters[opts.method](rgba, amt, opts);
    });
  });
}

function registerBlurFilter(Filter) {
  Filter.register('boxBlur', function () {
    this.processKernel('Box Blur', [1, 1, 1, 1, 1, 1, 1, 1, 1]);
  });

  Filter.register('heavyRadialBlur', function () {
    this.processKernel('Heavy Radial Blur', [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0]);
  });

  Filter.register('gaussianBlur', function () {
    this.processKernel('Gaussian Blur', [1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, 36, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1]);
  });

  Filter.register('motionBlur', function (degrees) {
    var kernel = void 0;
    if (degrees === 0 || degrees === 180) {
      kernel = [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0];
    } else if (degrees > 0 && degrees < 90 || degrees > 180 && degrees < 270) {
      kernel = [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0];
    } else if (degrees === 90 || degrees === 270) {
      kernel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    } else {
      kernel = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
    }
    this.processKernel('Motion Blur', kernel);
  });

  Filter.register('sharpen', function () {
    var amt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    amt /= 100;
    this.processKernel('Sharpen', [0, -amt, 0, -amt, 4 * amt + 1, -amt, 0, -amt, 0]);
  });
}

function registerPosterizeFilter(Filter) {
  Filter.register('posterize', function (adjust) {
    var numOfAreas, numOfValues;
    numOfAreas = 256 / adjust;
    numOfValues = 255 / (adjust - 1);
    this.process('posterize', function (rgba) {
      rgba.r = Math.floor(Math.floor(rgba.r / numOfAreas) * numOfValues);
      rgba.g = Math.floor(Math.floor(rgba.g / numOfAreas) * numOfValues);
      rgba.b = Math.floor(Math.floor(rgba.b / numOfAreas) * numOfValues);
      return rgba;
    });
  });
}

/**
 * some preset filters
 *
 * @export
 * @param {*} Filter
 */
function registerPresetFilter(Filter) {
  Filter.register('vintage', function () {
    var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.greyscale();
    this.contrast(5);
    this.noise(3);
    this.sepia(100);
    this.channels({ red: 8, blue: 2, green: 4 });
    this.gamma(0.87);

    if (vignette) {
      this.vignette('40%', 30);
    }
  });

  Filter.register('lomo', function () {
    var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.brightness(15);
    this.exposure(15);
    this.curves('rgb', [0, 0], [200, 0], [155, 255], [255, 255]);
    this.saturation(-20);
    this.gamma(1.8);
    if (vignette) {
      this.vignette('50%', 60);
    }
    this.brightness(5);
  });

  // FIXME:sharpen
  Filter.register('clarity', function () {
    var grey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    this.vibrance(20);
    this.curves('rgb', [5, 0], [130, 150], [190, 220], [250, 255]);
    this.sharpen(15);
    this.vignette('45%', 20);
    if (grey) {
      this.greyscale();
      this.contrast(4);
    }
    return this;
  });

  Filter.register('sinCity', function () {
    this.contrast(100);
    this.brightness(15);
    this.exposure(10);
    this.posterize(80);
    this.clip(30);
    this.greyscale();
  });

  Filter.register('sunrise', function () {
    var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.exposure(3.5);
    this.saturation(-5);
    this.vibrance(50);
    this.sepia(60);
    this.colorize('#e87b22', 10);
    this.channels({
      red: 8,
      blue: 8
    });
    this.contrast(5);
    this.gamma(1.2);
    if (vignette) {
      this.vignette('55%', 25);
    }
  });

  Filter.register('crossProcess', function () {
    this.exposure(5);
    this.colorize('#e87b22', 4);
    this.sepia(20);
    this.channels({
      blue: 8,
      red: 3
    });
    this.curves('b', [0, 0], [100, 150], [180, 180], [255, 255]);
    this.contrast(15);
    this.vibrance(75);
    this.gamma(1.6);
  });

  Filter.register('orangePeel', function () {
    this.curves('rgb', [0, 0], [100, 50], [140, 200], [255, 255]);
    this.vibrance(-30);
    this.saturation(-30);
    this.colorize('#ff9000', 30);
    this.contrast(-5);
    this.gamma(1.4);
  });

  Filter.register('love', function () {
    this.brightness(5);
    this.exposure(8);
    this.contrast(4);
    this.colorize('#c42007', 30);
    this.vibrance(50);
    this.gamma(1.3);
  });

  Filter.register('grungy', function () {
    var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.gamma(1.5);
    this.clip(25);
    this.saturation(-60);
    this.contrast(5);
    this.noise(5);
    if (vignette) {
      this.vignette('50%', 30);
    }
  });
  // FIXME:sharpen
  Filter.register('jarques', function () {
    this.saturation(-35);
    this.curves('b', [20, 0], [90, 120], [186, 144], [255, 230]);
    this.curves('r', [0, 0], [144, 90], [138, 120], [255, 255]);
    this.curves('g', [10, 0], [115, 105], [148, 100], [255, 248]);
    this.curves('rgb', [0, 0], [120, 100], [128, 140], [255, 255]);
    this.sharpen(20);
  });

  Filter.register('pinhole', function () {
    var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.greyscale();
    this.sepia(10);
    this.exposure(10);
    this.contrast(15);
    if (vignette) {
      this.vignette('60%', 35);
    }
  });

  Filter.register('oldBoot', function () {
    var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.saturation(-20);
    this.vibrance(-50);
    this.gamma(1.1);
    this.sepia(30);
    this.channels({
      red: -10,
      blue: 5
    });
    this.curves('rgb', [0, 0], [80, 50], [128, 230], [255, 255]);
    if (vignette) {
      this.vignette('60%', 30);
    }
  });

  Filter.register('glowingSun', function () {
    var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.brightness(10);
    this.newLayer(function () {
      this.setBlendingMode('multiply');
      this.opacity(80);
      this.copyParent();
      this.filter.gamma(0.8);
      this.filter.contrast(50);
      this.filter.exposure(10);
    });
    this.newLayer(function () {
      this.setBlendingMode('softLight');
      this.opacity(80);
      this.fillColor('#f49600');
    });
    this.exposure(20);
    this.gamma(0.8);
    if (vignette) {
      this.vignette('45%', 20);
    }
  });

  Filter.register('hazyDays', function () {
    var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.gamma(1.2);
    this.newLayer(function () {
      this.setBlendingMode('overlay');
      this.opacity(60);
      this.copyParent();
      this.filter.channels({
        red: 5
      });
      this.filter.stackBlur(15);
    });
    this.newLayer(function () {
      this.setBlendingMode('addition');
      this.opacity(40);
      this.fillColor('#6899ba');
    });
    this.newLayer(function () {
      this.setBlendingMode('multiply');
      this.opacity(35);
      this.copyParent();
      this.filter.brightness(40);
      this.filter.vibrance(40);
      this.filter.exposure(30);
      this.filter.contrast(15);
      this.filter.curves('r', [0, 40], [128, 128], [128, 128], [255, 215]);
      this.filter.curves('g', [0, 40], [128, 128], [128, 128], [255, 215]);
      this.filter.curves('b', [0, 40], [128, 128], [128, 128], [255, 215]);
      this.filter.stackBlur(5);
    });
    this.curves('r', [20, 0], [128, 158], [128, 128], [235, 255]);
    this.curves('g', [20, 0], [128, 128], [128, 128], [235, 255]);
    this.curves('b', [20, 0], [128, 108], [128, 128], [235, 255]);
    if (vignette) {
      this.vignette('45%', 20);
    }
  });

  Filter.register('herMajesty', function () {
    this.brightness(40);
    this.colorize('#ea1c5d', 10);
    this.curves('b', [0, 10], [128, 180], [190, 190], [255, 255]);
    this.newLayer(function () {
      this.setBlendingMode('overlay');
      this.opacity(50);
      this.copyParent();
      this.filter.gamma(0.7);
      this.newLayer(function () {
        this.setBlendingMode('normal');
        this.opacity(60);
        this.fillColor('#ea1c5d');
      });
    });
    this.newLayer(function () {
      this.setBlendingMode('multiply');
      this.opacity(60);
      this.copyParent();
      this.filter.saturation(50);
      this.filter.hue(90);
      this.filter.contrast(10);
    });
    this.gamma(1.4);
    this.vibrance(-30);
    this.newLayer(function () {
      this.opacity(10);
      this.fillColor('#e5f0ff');
    });
    return this;
  });

  Filter.register('nostalgia', function () {
    var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.saturation(20);
    this.gamma(1.4);
    this.greyscale();
    this.contrast(5);
    this.sepia(100);
    this.channels({
      red: 8,
      blue: 2,
      green: 4
    });
    this.gamma(0.8);
    this.contrast(5);
    this.exposure(10);
    this.newLayer(function () {
      this.setBlendingMode('overlay');
      this.copyParent();
      this.opacity(55);
      this.filter.stackBlur(10);
    });
    if (vignette) {
      this.vignette('50%', 30);
    }
  });

  Filter.register('hemingway', function () {
    this.greyscale();
    this.contrast(10);
    this.gamma(0.9);
    this.newLayer(function () {
      this.setBlendingMode('multiply');
      this.opacity(40);
      this.copyParent();
      this.filter.exposure(15);
      this.filter.contrast(15);
      this.filter.channels({
        green: 10,
        red: 5
      });
    });
    this.sepia(30);
    this.curves('rgb', [0, 10], [120, 90], [180, 200], [235, 255]);
    this.channels({
      red: 5,
      green: -2
    });
    this.exposure(15);
  });

  // FIXME: sharpen
  Filter.register('concentrate', function () {
    this.sharpen(40);
    this.saturation(-50);
    this.channels({
      red: 3
    });
    this.newLayer(function () {
      this.setBlendingMode('multiply');
      this.opacity(80);
      this.copyParent();
      this.filter.sharpen(5);
      this.filter.contrast(50);
      this.filter.exposure(10);
      this.filter.channels({
        blue: 5
      });
    });
    this.brightness(10);
  });
}

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

var BlurStack = void 0,
    mulTable = void 0,
    shgTable = void 0;
mulTable = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
shgTable = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
BlurStack = function BlurStack() {
  this.r = 0;
  this.g = 0;
  this.b = 0;
  this.a = 0;
  this.next = null;
};

function registerStackBlurPlugin(Plugin) {
  Plugin.register('stackBlur', function (radius) {
    var bInSum = void 0,
        bOutSum = void 0,
        bSum = void 0,
        div = void 0,
        gInSum = void 0,
        gOutSum = void 0,
        gSum = void 0,
        height = void 0,
        heightMinus1 = void 0,
        i = void 0,
        mulSum = void 0,
        p = void 0,
        pb = void 0,
        pg = void 0,
        pixels = void 0,
        pr = void 0,
        rInSum = void 0,
        rOutSum = void 0,
        rSum = void 0,
        radiusPlus1 = void 0,
        rbs = void 0,
        shgSum = void 0,
        stack = void 0,
        stackEnd = void 0,
        stackIn = void 0,
        stackOut = void 0,
        stackStart = void 0,
        sumFactor = void 0,
        width = void 0,
        widthMinus1 = void 0,
        x = void 0,
        y = void 0,
        yi = void 0,
        yp = void 0,
        yw = void 0,
        _i = void 0,
        _j = void 0,
        _k = void 0,
        _l = void 0,
        _m = void 0,
        _n = void 0,
        _o = void 0,
        _p = void 0,
        _q = void 0;
    if (isNaN(radius) || radius < 1) {
      return;
    }
    radius |= 0;
    pixels = this.pixelData;
    width = this.dimensions.width;
    height = this.dimensions.height;
    div = radius + radius + 1;
    widthMinus1 = width - 1;
    heightMinus1 = height - 1;
    radiusPlus1 = radius + 1;
    sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
    stackStart = new BlurStack();
    stack = stackStart;
    for (i = _i = 1; div >= 1 ? _i < div : _i > div; i = div >= 1 ? ++_i : --_i) {
      stack = stack.next = new BlurStack();
      if (i === radiusPlus1) {
        stackEnd = stack;
      }
    }
    stack.next = stackStart;
    stackIn = null;
    stackOut = null;
    yw = yi = 0;
    mulSum = mulTable[radius];
    shgSum = shgTable[radius];
    for (y = _j = 0; height >= 0 ? _j < height : _j > height; y = height >= 0 ? ++_j : --_j) {
      rInSum = gInSum = bInSum = rSum = gSum = bSum = 0;
      rOutSum = radiusPlus1 * (pr = pixels[yi]);
      gOutSum = radiusPlus1 * (pg = pixels[yi + 1]);
      bOutSum = radiusPlus1 * (pb = pixels[yi + 2]);
      rSum += sumFactor * pr;
      gSum += sumFactor * pg;
      bSum += sumFactor * pb;
      stack = stackStart;
      for (i = _k = 0; radiusPlus1 >= 0 ? _k < radiusPlus1 : _k > radiusPlus1; i = radiusPlus1 >= 0 ? ++_k : --_k) {
        stack.r = pr;
        stack.g = pg;
        stack.b = pb;
        stack = stack.next;
      }
      for (i = _l = 1; radiusPlus1 >= 1 ? _l < radiusPlus1 : _l > radiusPlus1; i = radiusPlus1 >= 1 ? ++_l : --_l) {
        p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
        rSum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
        gSum += (stack.g = pg = pixels[p + 1]) * rbs;
        bSum += (stack.b = pb = pixels[p + 2]) * rbs;
        rInSum += pr;
        gInSum += pg;
        bInSum += pb;
        stack = stack.next;
      }
      stackIn = stackStart;
      stackOut = stackEnd;
      for (x = _m = 0; width >= 0 ? _m < width : _m > width; x = width >= 0 ? ++_m : --_m) {
        pixels[yi] = rSum * mulSum >> shgSum;
        pixels[yi + 1] = gSum * mulSum >> shgSum;
        pixels[yi + 2] = bSum * mulSum >> shgSum;
        rSum -= rOutSum;
        gSum -= gOutSum;
        bSum -= bOutSum;
        rOutSum -= stackIn.r;
        gOutSum -= stackIn.g;
        bOutSum -= stackIn.b;
        p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
        rInSum += stackIn.r = pixels[p];
        gInSum += stackIn.g = pixels[p + 1];
        bInSum += stackIn.b = pixels[p + 2];
        rSum += rInSum;
        gSum += gInSum;
        bSum += bInSum;
        stackIn = stackIn.next;
        rOutSum += pr = stackOut.r;
        gOutSum += pg = stackOut.g;
        bOutSum += pb = stackOut.b;
        rInSum -= pr;
        gInSum -= pg;
        bInSum -= pb;
        stackOut = stackOut.next;
        yi += 4;
      }
      yw += width;
    }
    for (x = _n = 0; width >= 0 ? _n < width : _n > width; x = width >= 0 ? ++_n : --_n) {
      gInSum = bInSum = rInSum = gSum = bSum = rSum = 0;
      yi = x << 2;
      rOutSum = radiusPlus1 * (pr = pixels[yi]);
      gOutSum = radiusPlus1 * (pg = pixels[yi + 1]);
      bOutSum = radiusPlus1 * (pb = pixels[yi + 2]);
      rSum += sumFactor * pr;
      gSum += sumFactor * pg;
      bSum += sumFactor * pb;
      stack = stackStart;
      for (i = _o = 0; radiusPlus1 >= 0 ? _o < radiusPlus1 : _o > radiusPlus1; i = radiusPlus1 >= 0 ? ++_o : --_o) {
        stack.r = pr;
        stack.g = pg;
        stack.b = pb;
        stack = stack.next;
      }
      yp = width;
      for (i = _p = 1; radius >= 1 ? _p <= radius : _p >= radius; i = radius >= 1 ? ++_p : --_p) {
        yi = yp + x << 2;
        rSum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
        gSum += (stack.g = pg = pixels[yi + 1]) * rbs;
        bSum += (stack.b = pb = pixels[yi + 2]) * rbs;
        rInSum += pr;
        gInSum += pg;
        bInSum += pb;
        stack = stack.next;
        if (i < heightMinus1) {
          yp += width;
        }
      }
      yi = x;
      stackIn = stackStart;
      stackOut = stackEnd;
      for (y = _q = 0; height >= 0 ? _q < height : _q > height; y = height >= 0 ? ++_q : --_q) {
        p = yi << 2;
        pixels[p] = rSum * mulSum >> shgSum;
        pixels[p + 1] = gSum * mulSum >> shgSum;
        pixels[p + 2] = bSum * mulSum >> shgSum;
        rSum -= rOutSum;
        gSum -= gOutSum;
        bSum -= bOutSum;
        rOutSum -= stackIn.r;
        gOutSum -= stackIn.g;
        bOutSum -= stackIn.b;
        p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
        rSum += rInSum += stackIn.r = pixels[p];
        gSum += gInSum += stackIn.g = pixels[p + 1];
        bSum += bInSum += stackIn.b = pixels[p + 2];
        stackIn = stackIn.next;
        rOutSum += pr = stackOut.r;
        gOutSum += pg = stackOut.g;
        bOutSum += pb = stackOut.b;
        rInSum -= pr;
        gInSum -= pg;
        bInSum -= pb;
        stackOut = stackOut.next;
        yi += width;
      }
    }
    return this;
  });
}

function registerStackBlurFilter(Filter) {
  Filter.register('stackBlur', function (radius) {
    this.processPlugin('stackBlur', [radius]);
  });
}

function registerPlugin(Plugin) {
  registerStackBlurPlugin(Plugin);
}

function registerPluginFilter(Filter) {
  registerCameraFilter(Filter);
  registerBlurFilter(Filter);
  registerPosterizeFilter(Filter);
  registerPresetFilter(Filter);
  registerStackBlurFilter(Filter);
}

// wechat mini program env
if (typeof wx === 'undefined') {
  throw new Error('Wechat-CamanJS can only run in wechat mini program');
}
registerBlender(Blender);
registerFilter(Filter);

registerPlugin(Plugin);
registerPluginFilter(Filter);

export default Caman;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3gtY2FtYW4uanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb3JlL21vZHVsZS5qcyIsIi4uL3NyYy9jb3JlL3V0aWwuanMiLCIuLi9zcmMvY29yZS9hbmFseXplLmpzIiwiLi4vc3JjL2NvcmUvZXZlbnQuanMiLCIuLi9zcmMvY29yZS9jb25maWcuanMiLCIuLi9zcmMvY29yZS9sb2dnZXIuanMiLCIuLi9zcmMvY29yZS9wbHVnaW4uanMiLCIuLi9zcmMvY29yZS9waXhlbC5qcyIsIi4uL3NyYy9jb3JlL3JlbmRlcmVyLmpzIiwiLi4vc3JjL2NvcmUvYmxlbmRlci5qcyIsIi4uL3NyYy9jb3JlL2xheWVyLmpzIiwiLi4vc3JjL2NvcmUvY2FtYW4uanMiLCIuLi9zcmMvY29yZS9maWx0ZXIuanMiLCIuLi9zcmMvbGliL2JsZW5kZXJzLmpzIiwiLi4vc3JjL2NvcmUvY29udmVydC5qcyIsIi4uL3NyYy9jb3JlL2NhbGN1bGF0ZS5qcyIsIi4uL3NyYy9saWIvZmlsdGVycy5qcyIsIi4uL3NyYy9saWIvY2FtZXJhLmpzIiwiLi4vc3JjL2xpYi9ibHVyLmpzIiwiLi4vc3JjL2xpYi9wb3N0ZXJpemUuanMiLCIuLi9zcmMvbGliL3ByZXNldHMuanMiLCIuLi9zcmMvbGliL3N0YWNrQmx1ci5qcyIsIi4uL3NyYy9saWIvcGx1Z2lucy5qcyIsIi4uL3NyYy9jb3JlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgbW9kdWxlS2V5d29yZHMgPSBbJ2V4dGVuZGVkJywgJ2luY2x1ZGVkJ11cblxuLyoqXG4gKiBGb3IgdGhlIHBhcnRzIG9mIHRoaXMgY29kZSBhZGFwdGVkIGZyb20gaHR0cDovL2FyY3R1cm8uZ2l0aHViLmNvbS9saWJyYXJ5L2NvZmZlZXNjcmlwdC8wM19jbGFzc2VzLmh0bWxcbiAqIGJlbG93IGlzIHRoZSByZXF1aXJlZCBjb3B5cmlnaHQgbm90aWNlLlxuICogQ29weXJpZ2h0IChjKSAyMDExIEFsZXhhbmRlciBNYWNDYXcgKGluZm9AZXJpYml1bS5vcmcpXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgTW9kdWxlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZHVsZSB7XG4gIC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3QgaXRzZWxmIGxpa2UgYSBzdGF0aWMgbWV0aG9kXG4gIHN0YXRpYyBleHRlbmRzIChvYmopIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAobW9kdWxlS2V5d29yZHMuaW5kZXhPZiA9PT0gLTEpIHtcbiAgICAgICAgdGhpc1trZXldID0gb2JqW2tleV1cbiAgICAgIH1cbiAgICB9XG4gICAgb2JqLmV4dGVuZGVkICYmIG9iai5leHRlbmRlZC5hcHBseSh0aGlzKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBJbmNsdWRlIG1ldGhvZHMgb24gdGhlIG9iamVjdCBwcm90b3R5cGVcbiAgc3RhdGljIGluY2x1ZGVzIChvYmopIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAobW9kdWxlS2V5d29yZHMuaW5kZXhPZiA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5wcm90b3R5cGVba2V5XSA9IG9ialtrZXldXG4gICAgICB9XG4gICAgfVxuICAgIG9iai5pbmNsdWRlZCAmJiBvYmouaW5jbHVkZWQuYXBwbHkodGhpcylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gQWRkIG1ldGhvZHMgb24gdGhpcyBwcm90b3R5cGUgdGhhdCBwb2ludCB0byBhbm90aGVyIG1ldGhvZFxuICAvLyBvbiBhbm90aGVyIG9iamVjdCdzIHByb3RvdHlwZS5cbiAgc3RhdGljIGRlbGVnYXRlICguLi5hcmdzKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gYXJncy5wb3AoKVxuICAgIGZvciAobGV0IGkgaW4gYXJncykge1xuICAgICAgY29uc3Qgc291cmNlID0gYXJnc1tpXVxuICAgICAgdGhpcy5wcm90b3R5cGVbc291cmNlXSA9IHRhcmdldC5wcm90b3R5cGVbc291cmNlXVxuICAgIH1cbiAgfVxuXG4gIC8vIENyZWF0ZSBhbiBhbGlhcyBmb3IgYSBmdW5jdGlvblxuICBzdGF0aWMgYWxpYXNGdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICB0aGlzLnByb3RvdHlwZVt0b10gPSAoLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5wcm90b3R5cGVbZnJvbV0uYXBwbHkodGhpcywgYXJncylcbiAgICB9XG4gIH1cblxuICAvLyBDcmVhdGUgYW4gYWxpYXMgZm9yIGEgcHJvcGVydHlcbiAgc3RhdGljIGFsaWFzUHJvcGVydHkgKHRvLCBmcm9tKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMucHJvdG90eXBlLCB0bywge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpc1tmcm9tXVxuICAgICAgfSxcbiAgICAgIHNldCAodmFsKSB7XG4gICAgICAgIHRoaXNbZnJvbV0gPSB2YWxcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gRXhlY3V0ZSBhIGZ1bmN0aW9uIGluIHRoZSBjb250ZXh0IG9mIHRoZSBvYmplY3QsXG4gIC8vIGFuZCBwYXNzIGEgcmVmZXJlbmNlIHRvIHRoZSBvYmplY3QncyBwcm90b3R5cGUuXG4gIHN0YXRpYyBpbmNsdWRlZCAoZnVuYykge1xuICAgIGZ1bmMuY2FsbCh0aGlzLCB0aGlzLnByb3RvdHlwZSlcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIG5vb3AgKCkge31cblxuLyoqXG4gKlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBVdGlsXG4gKi9cbmV4cG9ydCBjbGFzcyBVdGlsIHtcbiAgc3RhdGljIHVuaXFpZCAobGVuID0gNykge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM1KS5zdWJzdHIoMiwgbGVuKVxuICB9XG5cbiAgLy8gSGVscGVyIGZ1bmN0aW9uIHRoYXQgZXh0ZW5kcyBvbmUgb2JqZWN0IHdpdGggYWxsIHRoZSBwcm9wZXJpZXMgb2Ygb3RoZXIgb2JqZWN0c1xuICBzdGF0aWMgZXh0ZW5kIChvYmosIC4uLnNyYykge1xuICAgIGNvbnN0IGRlc3QgPSBvYmpcbiAgICBmb3IgKGxldCBpIGluIHNyYykge1xuICAgICAgbGV0IGNvcHkgPSBzcmNbaV1cbiAgICAgIGZvciAobGV0IHByb3AgaW4gY29weSkge1xuICAgICAgICBpZiAoY29weS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgIGRlc3RbcHJvcF0gPSBjb3B5W3Byb3BdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVzdFxuICB9XG5cbiAgLy8gSW4gb3JkZXIgdG8gc3RheSB0cnVlIHRvIHRoZSBsYXRlc3Qgc3BlYywgUkdCIHZhbHVlcyBtdXN0IGJlIGNsYW1wZWQgYmV0d2VlbiAwIGFuZCAyNTUuIElmIHdlIGRvbid0IGRvIHRoaXMsIHdlaXJkIHRoaW5ncyBoYXBwZW4uXG4gIHN0YXRpYyBjbGFtcFJHQiAodmFsKSB7XG4gICAgaWYgKHZhbCA8IDApIHtcbiAgICAgIHJldHVybiAwXG4gICAgfVxuICAgIGlmICh2YWwgPiAyNTUpIHtcbiAgICAgIHJldHVybiAyNTVcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsXG4gIH1cblxuICBzdGF0aWMgY29weUF0dHJpYnV0ZXMgKGZyb20sIHRvLCBvcHRzID0ge30pIHtcbiAgICBmb3IgKGxldCBpIGluIGZyb20uYXR0cmlidXRlcykge1xuICAgICAgbGV0IGF0dHIgPSBmcm9tLmF0dHJpYnV0ZXNbaV1cbiAgICAgIGlmIChvcHRzLmV4Y2VwdCAmJiBvcHRzLmV4Y2VwdC5pbmRleE9mKGF0dHIubm9kZU5hbWUpICE9PSAtMSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgdG8uc2V0QXR0cmlidXRlKGF0dHIubm9kZU5hbWUsIGF0dHIubm9kZVZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIC8vIFN1cHBvcnQgZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3Qga25vdyBVaW50OEFycmF5IChzdWNoIGFzIElFOSlcbiAgc3RhdGljIGRhdGFBcnJheSAobGVuZ3RoID0gMCkge1xuICAgIGlmIChVaW50OENsYW1wZWRBcnJheSkge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OENsYW1wZWRBcnJheShsZW5ndGgpXG4gICAgfVxuICAgIHJldHVybiBuZXcgQXJyYXkobGVuZ3RoKVxuICB9XG59XG4iLCIvKipcbiAqIFZhcmlvdXMgaW1hZ2UgYW5hbHlzaXMgbWV0aG9kc1xuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBBbmFseXplXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuYWx5emUge1xuICBjb25zdHJ1Y3RvciAoYykge1xuICAgIHRoaXMuYyA9IGNcbiAgfVxuXG4gIC8vIEByZXR1cm4ge09iamVjdH0gSGFzaCBvZiBSR0IgY2hhbm5lbHMgYW5kIHRoZSBvY2N1cnJlbmNlIG9mIGVhY2ggdmFsdWVcblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgbnVtYmVyIG9mIG9jY3VycmVuY2VzIG9mIGVhY2ggY29sb3IgdmFsdWUgdGhyb3VnaG91dCB0aGUgaW1hZ2UuXG4gICAqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEhhc2ggb2YgUkdCIGNoYW5uZWxzIGFuZCB0aGUgb2NjdXJyZW5jZXMgb2YgZWFjaCB2YWx1ZVxuICAgKiBAbWVtYmVyb2YgQW5hbHl6ZVxuICAgKi9cbiAgY2FsY3VsYXRlTGV2ZWxzICgpIHtcbiAgICBjb25zdCBsZXZlbHMgPSB7XG4gICAgICByOiB7fSxcbiAgICAgIGc6IHt9LFxuICAgICAgYjoge31cbiAgICB9XG4gICAgLy8gSW5pdGlhbGl6ZSBhbGwgdmFsdWVzIHRvIDAgZmlyc3Qgc28gdGhlcmUgYXJlIG5vIGRhdGEgZ2Fwc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDI1NTsgaSsrKSB7XG4gICAgICBsZXZlbHMucltpXSA9IDBcbiAgICAgIGxldmVscy5nW2ldID0gMFxuICAgICAgbGV2ZWxzLmJbaV0gPSAwXG4gICAgfVxuXG4gICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGVhY2ggcGl4ZWwgYmxvY2sgYW5kIGluY3JlbWVudCB0aGUgbGV2ZWwgY291bnRlcnNcbiAgICBmb3IgKGxldCBpID0gMCwgaiA9IHRoaXMuYy5waXhlbERhdGEubGVuZ3RoOyBpIDwgajsgaSArPSA0KSB7XG4gICAgICBsZXZlbHMuclt0aGlzLmMucGl4ZWxEYXRhW2ldXSsrXG4gICAgICBsZXZlbHMuZ1t0aGlzLmMucGl4ZWxEYXRhW2kgKyAxXV0rK1xuICAgICAgbGV2ZWxzLmJbdGhpcy5jLnBpeGVsRGF0YVtpICsgMl1dKytcbiAgICB9XG5cbiAgICAvLyBOb3JtYWxpemUgYWxsIG9mIHRoZSBudW1iZXJzIGJ5IGNvbnZlcnRpbmcgdGhlbSB0byBwZXJjZW50YWdlcyBiZXR3ZWVuXG4gICAgLy8gMCBhbmQgMS4wXG4gICAgY29uc3QgbnVtUGl4ZWxzID0gdGhpcy5jLnBpeGVsRGF0YS5sZW5ndGggLyA0XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAyNTU7IGkrKykge1xuICAgICAgbGV2ZWxzLnJbaV0gLz0gbnVtUGl4ZWxzXG4gICAgICBsZXZlbHMuZ1tpXSAvPSBudW1QaXhlbHNcbiAgICAgIGxldmVscy5iW2ldIC89IG51bVBpeGVsc1xuICAgIH1cbiAgICByZXR1cm4gbGV2ZWxzXG4gIH1cbn1cbiIsIi8qKlxuICogRXZlbnQgc3lzdGVtIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVnaXN0ZXIgY2FsbGJhY2tzIHRoYXQgZ2V0IGZpcmVkIGR1cmluZyBjZXJ0YWluIHRpbWVzIGluIHRoZSByZW5kZXIgcHJvY2Vzcy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgRXZlbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnQge1xuICBzdGF0aWMgZXZlbnRzID0ge31cbiAgLy8gQWxsIG9mIHRoZSBzdXBwb3J0ZWQgZXZlbnQgdHlwZXNcbiAgc3RhdGljIHR5cGVzID0gW1xuICAgICdwcm9jZXNzU3RhcnQnLFxuICAgICdwcm9jZXNzQ29tcGxldGUnLFxuICAgICdyZW5kZXJTdGFydCcsXG4gICAgJ3JlbmRlckZpbmlzaGVkJyxcbiAgICAnYmxvY2tTdGFydGVkJyxcbiAgICAnYmxvY2tGaW5pc2hlZCcsXG4gICAgJ19waXhlbERhdGFSZWFkeSdcbiAgXVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGFuIGV2ZW50LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IENhbWFuIH0gdGFyZ2V0IEluc3RhbmNlIG9mIENhbWFuIGVtaXR0aW5nIHRoZSBldmVudC5cbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gdHlwZSBUaGUgZXZlbnQgdHlwZS5cbiAgICogQHBhcmFtIHsgT2JqZWN0IH0gW2RhdGE9bnVsbF0gRXh0cmEgZGF0YSB0byBzZW5kIHdpdGggdGhlIGV2ZW50LlxuICAgKiBAbWVtYmVyb2YgRXZlbnRcbiAgICovXG4gIHN0YXRpYyB0cmlnZ2VyICh0YXJnZXQsIHR5cGUsIGRhdGEgPSBudWxsKSB7XG4gICAgaWYgKHRoaXMuZXZlbnRzW3R5cGVdICYmIHRoaXMuZXZlbnRzW3R5cGVdLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmV2ZW50c1t0eXBlXSkge1xuICAgICAgICBsZXQgZXZlbnQgPSB0aGlzLmV2ZW50c1t0eXBlXVtpXVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBudWxsIHx8IHRhcmdldC5pZCA9PT0gZXZlbnQudGFyZ2V0LmlkKSB7XG4gICAgICAgICAgZXZlbnQuZm4uY2FsbCh0YXJnZXQsIGRhdGEpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIGZvciBhbiBldmVudC4gT3B0aW9uYWxseSBiaW5kIHRoZSBsaXN0ZW4gdG8gYSBzaW5nbGUgaW5zdGFuY2Ugb3IgYWxsIGluc3RhbmNlcy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAb3ZlcmxvYWQgbGlzdGVuKHRhcmdldCwgdHlwZSwgZm4pXG4gICAqIExpc3RlbiBmb3IgZXZlbnRzIGVtaXR0ZWQgZnJvbSBhIHBhcnRpY3VsYXIgQ2FtYW4gaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7IENhbWFuIH0gdGFyZ2V0IFRoZSBpbnN0YW5jZSB0byBsaXN0ZW4gdG8uXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHR5cGUgVGhlIHR5cGUgb2YgZXZlbnQgdG8gbGlzdGVuIGZvci5cbiAgICogQHBhcmFtIHsgRnVuY3Rpb24gfSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAqXG4gICAqIEBvdmVybG9hZCBsaXN0ZW4odHlwZSwgZm4pXG4gICAqIExpc3RlbiBmb3IgYW4gZXZlbnQgZnJvbSBhbGwgQ2FtYW4gaW5zdGFuY2VzLlxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSB0eXBlIFRoZSB0eXBlIG9mIGV2ZW50IHRvIGxpc3RlbiBmb3IuXG4gICAqIEBwYXJhbSB7IEZ1bmN0aW9uIH0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuICAgKiBAbWVtYmVyb2YgRXZlbnRcbiAgICovXG4gIHN0YXRpYyBsaXN0ZW4gKHRhcmdldCwgdHlwZSwgZm4pIHtcbiAgICAvLyBBZGp1c3QgYXJndW1lbnRzIGlmIHRhcmdldCBpcyBvbWl0dGVkXG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBfdHlwZSA9IHRhcmdldFxuICAgICAgY29uc3QgX2ZuID0gdHlwZVxuXG4gICAgICB0YXJnZXQgPSBudWxsXG4gICAgICB0eXBlID0gX3R5cGVcblxuICAgICAgZm4gPSBfZm5cbiAgICB9XG5cbiAgICAvLyBWYWxpZGF0aW9uXG4gICAgaWYgKHRoaXMudHlwZXMuaW5kZXhPZih0eXBlKSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmICghdGhpcy5ldmVudHNbdHlwZV0pIHtcbiAgICAgIHRoaXMuZXZlbnRzW3R5cGVdID0gW11cbiAgICB9XG4gICAgdGhpcy5ldmVudHNbdHlwZV0ucHVzaCh7dGFyZ2V0LCBmbn0pXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHN0YXRpYyBvbmNlICh0YXJnZXQsIHR5cGUsIGZuKSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzXG4gICAgZnVuY3Rpb24gb24gKCkge1xuICAgICAgX3RoaXMub2ZmKHRhcmdldCwgdHlwZSwgb24pXG4gICAgICBmbi5hcHBseShfdGhpcywgYXJndW1lbnRzKVxuICAgIH1cbiAgICBvbi5mbiA9IGZuXG4gICAgdGhpcy5saXN0ZW4odGFyZ2V0LCB0eXBlLCBvbilcbiAgfVxuXG4gIHN0YXRpYyBvZmYgKHRhcmdldCwgdHlwZSwgZm4pIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIC8vIEFkanVzdCBhcmd1bWVudHMgaWYgdGFyZ2V0IGlzIG9taXR0ZWRcbiAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IF90eXBlID0gdGFyZ2V0XG4gICAgICBjb25zdCBfZm4gPSB0eXBlXG5cbiAgICAgIHRhcmdldCA9IG51bGxcbiAgICAgIHR5cGUgPSBfdHlwZVxuXG4gICAgICBmbiA9IF9mblxuICAgIH1cblxuICAgIGNvbnN0IGNicyA9IHRoaXMuZXZlbnRzW3R5cGVdXG4gICAgaWYgKCFjYnMpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghZm4pIHtcbiAgICAgIHRoaXMuZXZlbnRzW3R5cGVdID0gbnVsbFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzcGVjaWZpYyBoYW5kbGVyXG4gICAgICBsZXQgY2JcbiAgICAgIGxldCBpID0gY2JzLmxlbmd0aFxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBjYiA9IGNic1tpXVxuICAgICAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgICAgIGNicy5zcGxpY2UoaSwgMSlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJjb25zdCBDb25maWcgPSB7XG4gIC8vIERlYnVnIG1vZGUgZW5hYmxlcyBjb25zb2xlIGxvZ2dpbmcuXG4gIERFQlVHOiBmYWxzZSxcbiAgLy8gQWxsIG9mIHRoZSBkaWZmZXJlbnQgcmVuZGVyIG9wZXJhdGl2ZXNcbiAgRklMVEVSX1RZUEU6IHtcbiAgICBTaW5nbGU6IDEsXG4gICAgS2VybmVsOiAyLFxuICAgIExheWVyRGVxdWV1ZTogMyxcbiAgICBMYXllckZpbmlzaGVkOiA0LFxuICAgIExvYWRPdmVybGF5OiA1LFxuICAgIFBsdWdpbjogNlxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpZ1xuIiwiaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbmZpZydcbi8qKlxuICogU2ltcGxlIGNvbnNvbGUgbG9nZ2VyIGNsYXNzIHRoYXQgY2FuIGJlIHRvZ2dsZWQgb24gYW5kIG9mZiBiYXNlZCBvbiBDYW1hbi5ERUJVR1xuICpcbiAqIEBjbGFzcyBMb2dnZXJcbiAqL1xuY2xhc3MgTG9nZ2VyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIGNvbnN0IGxvZ0xldmVsID0gWydsb2cnLCAnaW5mbycsICd3YXJuJywgJ2Vycm9yJ11cbiAgICBmb3IgKGxldCBpIGluIGxvZ0xldmVsKSB7XG4gICAgICBjb25zdCBuYW1lID0gbG9nTGV2ZWxbaV1cbiAgICAgIHRoaXNbbmFtZV0gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICBpZiAoIUNvbmZpZy5ERUJVRykge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc29sZVtuYW1lXS5hcHBseShjb25zb2xlLCBhcmdzKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gV2UncmUgcHJvYmFibHkgdXNpbmcgSUU5IG9yIGVhcmxpZXJcbiAgICAgICAgICBjb25zb2xlW25hbWVdKGFyZ3MpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kZWJ1ZyA9IHRoaXMubG9nXG4gIH1cbn1cblxuY29uc3QgTG9nID0gbmV3IExvZ2dlcigpXG5leHBvcnQgZGVmYXVsdCBMb2dcbiIsIi8qKlxuICogU3RvcmVzIGFuZCByZWdpc3RlcnMgc3RhbmRhbG9uZSBwbHVnaW5zXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIFBsdWdpblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbHVnaW4ge1xuICBzdGF0aWMgcGx1Z2lucyA9IHt9XG5cbiAgc3RhdGljIHJlZ2lzdGVyIChuYW1lLCBwbHVnaW4pIHtcbiAgICB0aGlzLnBsdWdpbnNbbmFtZV0gPSBwbHVnaW5cbiAgfVxuXG4gIHN0YXRpYyBleGVjdXRlIChjb250ZXh0LCBuYW1lLCBhcmdzKSB7XG4gICAgdGhpcy5wbHVnaW5zW25hbWVdLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gIH1cbn1cbiIsIi8qKlxuICogUmVwcmVzZW50cyBhIHNpbmdsZSBQaXhlbCBpbiBhbiBpbWFnZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUGl4ZWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGl4ZWwge1xuICBzdGF0aWMgY29vcmRpbmF0ZXNUb0xvY2F0aW9uICh4LCB5LCB3aWR0aCkge1xuICAgIHJldHVybiAoeSAqIHdpZHRoICsgeCkgKiA0XG4gIH1cbiAgc3RhdGljIGxvY2F0aW9uVG9Db29yZGluYXRlcyAobG9jLCB3aWR0aCkge1xuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKGxvYyAvICh3aWR0aCAqIDQpKVxuICAgIGNvbnN0IHggPSAobG9jICUgKHdpZHRoICogNCkpIC8gNFxuXG4gICAgcmV0dXJuIHt4LCB5fVxuICB9XG5cbiAgY29uc3RydWN0b3IgKHIgPSAwLCBnID0gMCwgYiA9IDAsIGEgPSAyNTUsIGMgPSBudWxsKSB7XG4gICAgdGhpcy5sb2MgPSAwXG4gICAgdGhpcy5yID0gclxuICAgIHRoaXMuZyA9IGdcbiAgICB0aGlzLmIgPSBiXG4gICAgdGhpcy5hID0gYVxuICAgIHRoaXMuYyA9IGNcbiAgfVxuXG4gIHNldENvbnRleHQgKGMpIHtcbiAgICB0aGlzLmMgPSBjXG4gIH1cblxuICAvLyBSZXRyaWV2ZXMgdGhlIFgsIFkgbG9jYXRpb24gb2YgdGhlIGN1cnJlbnQgcGl4ZWwuIFRoZSBvcmlnaW4gaXMgYXQgdGhlIGJvdHRvbSBsZWZ0IGNvcm5lciBvZiB0aGUgaW1hZ2UsIGxpa2UgYSBub3JtYWwgY29vcmRpbmF0ZSBzeXN0ZW0uXG4gIGxvY2F0aW9uWFkgKCkge1xuICAgIGlmICghdGhpcy5jKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVpcmVzIGEgQ2FtYW5KUyBjb250ZXh0JylcbiAgICB9XG4gICAgY29uc3QgeSA9IHRoaXMuYy5kaW1lbnNpb25zLmhlaWdodCAtIE1hdGguZmxvb3IodGhpcy5sb2MgLyAodGhpcy5jLmRpbWVuc2lvbnMud2lkdGggKiA0KSlcbiAgICBjb25zdCB4ID0gKHRoaXMubG9jICUgKHRoaXMuYy5kaW1lbnNpb25zLndpZHRoICogNCkpIC8gNFxuXG4gICAgcmV0dXJuIHt4LCB5fVxuICB9XG5cbiAgcGl4ZWxBdExvY2F0aW9uIChsb2MpIHtcbiAgICBpZiAoIXRoaXMuYykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlcyBhIENhbWFuSlMgY29udGV4dCcpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQaXhlbChcbiAgICAgIHRoaXMuYy5waXhlbERhdGFbbG9jXSxcbiAgICAgIHRoaXMuYy5waXhlbERhdGFbbG9jICsgMV0sXG4gICAgICB0aGlzLmMucGl4ZWxEYXRhW2xvYyArIDJdLFxuICAgICAgdGhpcy5jLnBpeGVsRGF0YVtsb2MgKyAzXSxcbiAgICAgIHRoaXMuY1xuICAgIClcbiAgfVxuXG4gIC8vIFJldHVybnMgYW4gUkdCQSBvYmplY3QgZm9yIGEgcGl4ZWwgd2hvc2UgbG9jYXRpb24gaXMgc3BlY2lmaWVkIGluIHJlbGF0aW9uIHRvIHRoZSBjdXJyZW50IHBpeGVsLlxuICBnZXRQaXhlbFJlbGF0aXZlIChob3JpeiwgdmVydCkge1xuICAgIGlmICghdGhpcy5jKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVpcmVzIGEgQ2FtYW5KUyBjb250ZXh0JylcbiAgICB9XG5cbiAgICAvLyBXZSBpbnZlcnQgdGhlIHZlcnRfb2Zmc2V0IGluIG9yZGVyIHRvIG1ha2UgdGhlIGNvb3JkaW5hdGUgc3lzdGVtIG5vbi1pbnZlcnRlZC4gSW4gbGF5bWFucyB0ZXJtczogLTEgbWVhbnMgZG93biBhbmQgKzEgbWVhbnMgdXAuXG4gICAgY29uc3QgbmV3TG9jID0gdGhpcy5sb2MgKyAodGhpcy5jLmRpbWVuc2lvbnMud2lkdGggKiA0ICogKHZlcnQgKiAtMSkpICsgKDQgKiBob3JpeilcblxuICAgIGlmIChuZXdMb2MgPiB0aGlzLmMucGl4ZWxEYXRhLmxlbmd0aCB8fCBuZXdMb2MgPCAwKSB7XG4gICAgICByZXR1cm4gbmV3IFBpeGVsKDAsIDAsIDAsIDI1NSwgdGhpcy5jKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBpeGVsQXRMb2NhdGlvbihuZXdMb2MpXG4gIH1cblxuICAvLyBUaGUgY291bnRlcnBhcnQgdG8gZ2V0UGl4ZWxSZWxhdGl2ZSwgdGhpcyB1cGRhdGVzIHRoZSB2YWx1ZSBvZiBhIHBpeGVsIHdob3NlIGxvY2F0aW9uIGlzIHNwZWNpZmllZCBpbiByZWxhdGlvbiB0byB0aGUgY3VycmVudCBwaXhlbC5cbiAgc3RhdGljIHB1dFBpeGVsUmVsYXRpdmUgKGhvcml6LCB2ZXJ0LCByZ2JhKSB7XG4gICAgaWYgKCF0aGlzLmMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZXMgYSBDYW1hbkpTIGNvbnRleHQnKVxuICAgIH1cblxuICAgIGNvbnN0IG5ld0xvYyA9IHRoaXMubG9jICsgKHRoaXMuYy5kaW1lbnNpb25zLndpZHRoICogNCAqICh2ZXJ0ICogLTEpKSArICg0ICogaG9yaXopXG5cbiAgICBpZiAobmV3TG9jID4gdGhpcy5jLnBpeGVsRGF0YS5sZW5ndGggfHwgbmV3TG9jIDwgMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5jLnBpeGVsRGF0YVtuZXdMb2NdID0gcmdiYS5yXG4gICAgdGhpcy5jLnBpeGVsRGF0YVtuZXdMb2MgKyAxXSA9IHJnYmEuZ1xuICAgIHRoaXMuYy5waXhlbERhdGFbbmV3TG9jICsgMl0gPSByZ2JhLmJcbiAgICB0aGlzLmMucGl4ZWxEYXRhW25ld0xvYyArIDNdID0gcmdiYS5hXG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgLy8gR2V0cyBhbiBSR0JBIG9iamVjdCBmb3IgYW4gYXJiaXRyYXJ5IHBpeGVsIGluIHRoZSBjYW52YXMgc3BlY2lmaWVkIGJ5IGFic29sdXRlIFgsIFkgY29vcmRpbmF0ZXNcbiAgZ2V0UGl4ZWwgKHgsIHkpIHtcbiAgICBpZiAoIXRoaXMuYykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlcyBhIENhbWFuSlMgY29udGV4dCcpXG4gICAgfVxuXG4gICAgY29uc3QgbG9jID0gdGhpcy5jb29yZGluYXRlc1RvTG9jYXRpb24oeCwgeSwgdGhpcy53aWR0aClcbiAgICByZXR1cm4gdGhpcy5waXhlbEF0TG9jYXRpb24obG9jKVxuICB9XG5cbiAgLy8gVXBkYXRlcyB0aGUgcGl4ZWwgYXQgdGhlIGdpdmVuIFgsIFkgY29vcmRpbmF0ZVxuICBwdXRQaXhlbCAoeCwgeSwgcmdiYSkge1xuICAgIGlmICghdGhpcy5jKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVpcmVzIGEgQ2FtYW5KUyBjb250ZXh0JylcbiAgICB9XG5cbiAgICBjb25zdCBsb2MgPSB0aGlzLmNvb3JkaW5hdGVzVG9Mb2NhdGlvbih4LCB5LCB0aGlzLndpZHRoKVxuXG4gICAgdGhpcy5jLnBpeGVsRGF0YVtsb2NdID0gcmdiYS5yXG4gICAgdGhpcy5jLnBpeGVsRGF0YVtsb2MgKyAxXSA9IHJnYmEuZ1xuICAgIHRoaXMuYy5waXhlbERhdGFbbG9jICsgMl0gPSByZ2JhLmJcbiAgICB0aGlzLmMucGl4ZWxEYXRhW2xvYyArIDNdID0gcmdiYS5hXG4gIH1cblxuICB0b1N0cmluZyAoKSB7XG4gICAgdGhpcy50b0tleSgpXG4gIH1cblxuICB0b0hleCAoaW5jbHVkZUFscGhhID0gZmFsc2UpIHtcbiAgICBsZXQgaGV4ID0gYCMke3RoaXMuci50b1N0cmluZygxNil9JHt0aGlzLmcudG9TdHJpbmcoMTYpfSR7dGhpcy5iLnRvU3RyaW5nKDE2KX1gXG5cbiAgICBpZiAoaW5jbHVkZUFscGhhKSB7XG4gICAgICBoZXggKz0gdGhpcy5hLnRvU3RyaW5nKDE2KVxuICAgIH1cbiAgICByZXR1cm4gaGV4XG4gIH1cbn1cbiIsImltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50J1xuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbmZpZydcbmltcG9ydCB7IFV0aWwgfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nZ2VyJ1xuaW1wb3J0IFBsdWdpbiBmcm9tICcuL3BsdWdpbidcbmltcG9ydCBQaXhlbCBmcm9tICcuL3BpeGVsJ1xuXG4vKipcbiAqIEhhbmRsZXMgYWxsIG9mIHRoZSB2YXJpb3VzIHJlbmRlcmluZyBtZXRob2RzIGluIENhbWFuLiBNb3N0IG9mIHRoZSBpbWFnZSBtb2RpZmljYXRpb24gaGFwcGVucyBoZXJlLiBBIG5ldyBSZW5kZXJlciBvYmplY3QgaXMgY3JlYXRlZCBmb3IgZXZlcnkgcmVuZGVyIG9wZXJhdGlvbi5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUmVuZGVyZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXIge1xuICAvLyBUaGUgbnVtYmVyIG9mIGJsb2NrcyB0byBzcGxpdCB0aGUgaW1hZ2UgaW50byBkdXJpbmcgdGhlIHJlbmRlciBwcm9jZXNzIHRvIHNpbXVsYXRlIGNvbmN1cnJlbmN5LiBUaGlzIGFsc28gaGVscHMgdGhlIGJyb3dzZXIgbWFuYWdlIHRoZSAocG9zc2libHkpIGxvbmcgcnVubmluZyByZW5kZXIgam9icy5cbiAgc3RhdGljIEJsb2NrcyA9IDRcblxuICBjb25zdHJ1Y3RvciAoYykge1xuICAgIHRoaXMuYyA9IGNcbiAgICB0aGlzLnJlbmRlclF1ZXVlID0gW11cbiAgICB0aGlzLm1vZFBpeGVsRGF0YSA9IG51bGxcbiAgfVxuXG4gIGFkZCAoam9iKSB7XG4gICAgaWYgKCFqb2IpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLnJlbmRlclF1ZXVlLnB1c2goam9iKVxuICB9XG5cbiAgLy8gR3JhYnMgdGhlIG5leHQgb3BlcmF0aW9uIGZyb20gdGhlIHJlbmRlciBxdWV1ZSBhbmQgcGFzc2VzIGl0IHRvIFJlbmRlcmVyIGZvciBleGVjdXRpb25cbiAgcHJvY2Vzc05leHQgKCkge1xuICAgIC8vIElmIHRoZSBxdWV1ZSBpcyBlbXB0eSwgZmlyZSB0aGUgZmluaXNoZWQgY2FsbGJhY2tcbiAgICBpZiAodGhpcy5yZW5kZXJRdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIEV2ZW50LnRyaWdnZXIodGhpcywgJ3JlbmRlckZpbmlzaGVkJylcbiAgICAgIHRoaXMuZmluaXNoZWRGbiAmJiB0aGlzLmZpbmlzaGVkRm4uY2FsbCh0aGlzLmMpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRKb2IgPSB0aGlzLnJlbmRlclF1ZXVlLnNoaWZ0KClcblxuICAgIHN3aXRjaCAodGhpcy5jdXJyZW50Sm9iLnR5cGUpIHtcbiAgICAgIGNhc2UgQ29uZmlnLkZJTFRFUl9UWVBFLkxheWVyRGVxdWV1ZTpcbiAgICAgICAgY29uc3QgbGF5ZXIgPSB0aGlzLmMuY2FudmFzUXVldWUuc2hpZnQoKVxuICAgICAgICB0aGlzLmMuZXhlY3V0ZUxheWVyKGxheWVyKVxuICAgICAgICB0aGlzLnByb2Nlc3NOZXh0KClcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgQ29uZmlnLkZJTFRFUl9UWVBFLkxheWVyRmluaXNoZWQ6XG4gICAgICAgIHRoaXMuYy5hcHBseUN1cnJlbnRMYXllcigpXG4gICAgICAgIHRoaXMuYy5wb3BDb250ZXh0KClcbiAgICAgICAgdGhpcy5wcm9jZXNzTmV4dCgpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIENvbmZpZy5GSUxURVJfVFlQRS5Mb2FkT3ZlcmxheTpcbiAgICAgICAgdGhpcy5sb2FkT3ZlcmxheSh0aGlzLmN1cnJlbnRKb2IubGF5ZXIsIHRoaXMuY3VycmVudEpvYi5zcmMpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIENvbmZpZy5GSUxURVJfVFlQRS5QbHVnaW46XG4gICAgICAgIHRoaXMuZXhlY3V0ZVBsdWdpbigpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmV4ZWN1dGVGaWx0ZXIoKVxuICAgIH1cbiAgfVxuXG4gIGV4ZWN1dGUgKGNhbWFuSW5zdGFuY2UsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5maW5pc2hlZEZuID0gY2FsbGJhY2tcbiAgICBFdmVudC5saXN0ZW4oY2FtYW5JbnN0YW5jZSwgJ19waXhlbERhdGFSZWFkeScsICgpID0+IHtcbiAgICAgIHRoaXMubW9kUGl4ZWxEYXRhID0gVXRpbC5kYXRhQXJyYXkodGhpcy5jLnBpeGVsRGF0YS5sZW5ndGgpXG4gICAgICB0aGlzLnByb2Nlc3NOZXh0KClcbiAgICB9KVxuICB9XG5cbiAgZWFjaEJsb2NrIChmbikge1xuICAgIC8vIFByZXBhcmUgYWxsIHRoZSByZXF1aXJlZCByZW5kZXIgZGF0YVxuICAgIHRoaXMuYmxvY2tzRG9uZSA9IDBcblxuICAgIGNvbnN0IG4gPSB0aGlzLmMucGl4ZWxEYXRhLmxlbmd0aFxuICAgIGNvbnN0IGJsb2NrUGl4ZWxMZW5ndGggPSBNYXRoLmZsb29yKChuIC8gNCkgLyBSZW5kZXJlci5CbG9ja3MpXG4gICAgY29uc3QgYmxvY2tOID0gYmxvY2tQaXhlbExlbmd0aCAqIDRcbiAgICBjb25zdCBsYXN0QmxvY2tOID0gYmxvY2tOICsgKChuIC8gNCkgJSBSZW5kZXJlci5CbG9ja3MpICogNFxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBSZW5kZXJlci5CbG9ja3M7IGkrKykge1xuICAgICAgY29uc3Qgc3RhcnQgPSBpICogYmxvY2tOXG4gICAgICBjb25zdCBlbmQgPSBzdGFydCArIChpID09PSBSZW5kZXJlci5CbG9ja3MgLSAxID8gbGFzdEJsb2NrTiA6IGJsb2NrTilcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBmbi5jYWxsKHRoaXMsIGksIHN0YXJ0LCBlbmQpXG4gICAgICB9LCAwKVxuICAgIH1cbiAgfVxuXG4gIC8vIFRoZSBjb3JlIG9mIHRoZSBpbWFnZSByZW5kZXJpbmcsIHRoaXMgZnVuY3Rpb24gZXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZpbHRlci5cbiAgLy8gTk9URTogdGhpcyBkb2VzIG5vdCB3cml0ZSB0aGUgdXBkYXRlZCBwaXhlbCBkYXRhIHRvIHRoZSBjYW52YXMuIFRoYXQgaGFwcGVucyB3aGVuIGFsbCBmaWx0ZXJzIGFyZSBmaW5pc2hlZCByZW5kZXJpbmcgaW4gb3JkZXIgdG8gYmUgYXMgZmFzdCBhcyBwb3NzaWJsZS5cbiAgZXhlY3V0ZUZpbHRlciAoKSB7XG4gICAgRXZlbnQudHJpZ2dlcih0aGlzLmMsICdwcm9jZXNzU3RhcnQnLCB0aGlzLmN1cnJlbnRKb2IpXG5cbiAgICBpZiAodGhpcy5jdXJyZW50Sm9iLnR5cGUgPT09IENvbmZpZy5GSUxURVJfVFlQRS5TaW5nbGUpIHtcbiAgICAgIHRoaXMuZWFjaEJsb2NrKHRoaXMucmVuZGVyQmxvY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWFjaEJsb2NrKHRoaXMucmVuZGVyS2VybmVsKVxuICAgIH1cbiAgfVxuXG4gIC8vIEV4ZWN1dGVzIGEgc3RhbmRhbG9uZSBwbHVnaW5cbiAgZXhlY3V0ZVBsdWdpbiAoKSB7XG4gICAgTG9nLmRlYnVnKGBFeGVjdXRpbmcgcGx1Z2luICR7dGhpcy5jdXJyZW50Sm9iLnBsdWdpbn1gKVxuICAgIFBsdWdpbi5leGVjdXRlKHRoaXMuYywgdGhpcy5jdXJyZW50Sm9iLnBsdWdpbiwgdGhpcy5jdXJyZW50Sm9iLmFyZ3MpXG4gICAgTG9nLmRlYnVnKGBQbHVnaW4gJHt0aGlzLmN1cnJlbnRKb2IucGx1Z2lufSBmaW5pc2hlZCFgKVxuXG4gICAgdGhpcy5wcm9jZXNzTmV4dCgpXG4gIH1cblxuICAvLyBSZW5kZXJzIGEgc2luZ2xlIGJsb2NrIG9mIHRoZSBjYW52YXMgd2l0aCB0aGUgY3VycmVudCBmaWx0ZXIgZnVuY3Rpb25cbiAgcmVuZGVyQmxvY2sgKGJudW0sIHN0YXJ0LCBlbmQpIHtcbiAgICBMb2cuZGVidWcoYEJsb2NrICMke2JudW19IC0gRmlsdGVyOiAke3RoaXMuY3VycmVudEpvYi5uYW1lfSwgU3RhcnQ6ICR7c3RhcnR9LCBFbmQ6ICR7ZW5kfWApXG4gICAgRXZlbnQudHJpZ2dlcih0aGlzLmMsICdibG9ja1N0YXJ0ZWQnLCB7XG4gICAgICBibG9ja051bTogYm51bSxcbiAgICAgIHRvdGFsQmxvY2tzOiBSZW5kZXJlci5CbG9ja3MsXG4gICAgICBzdGFydFBpeGVsOiBzdGFydCxcbiAgICAgIGVuZFBpeGVsOiBlbmRcbiAgICB9KVxuXG4gICAgY29uc3QgcGl4ZWwgPSBuZXcgUGl4ZWwoKVxuICAgIHBpeGVsLnNldENvbnRleHQodGhpcy5jKVxuXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDQpIHtcbiAgICAgIHBpeGVsLmxvYyA9IGlcblxuICAgICAgcGl4ZWwuciA9IHRoaXMuYy5waXhlbERhdGFbaV1cbiAgICAgIHBpeGVsLmcgPSB0aGlzLmMucGl4ZWxEYXRhW2kgKyAxXVxuICAgICAgcGl4ZWwuYiA9IHRoaXMuYy5waXhlbERhdGFbaSArIDJdXG4gICAgICBwaXhlbC5hID0gdGhpcy5jLnBpeGVsRGF0YVtpICsgM11cblxuICAgICAgdGhpcy5jdXJyZW50Sm9iLnByb2Nlc3NGbihwaXhlbClcblxuICAgICAgdGhpcy5jLnBpeGVsRGF0YVtpXSA9IFV0aWwuY2xhbXBSR0IocGl4ZWwucilcbiAgICAgIHRoaXMuYy5waXhlbERhdGFbaSArIDFdID0gVXRpbC5jbGFtcFJHQihwaXhlbC5nKVxuICAgICAgdGhpcy5jLnBpeGVsRGF0YVtpICsgMl0gPSBVdGlsLmNsYW1wUkdCKHBpeGVsLmIpXG4gICAgICB0aGlzLmMucGl4ZWxEYXRhW2kgKyAzXSA9IFV0aWwuY2xhbXBSR0IocGl4ZWwuYSlcbiAgICB9XG5cbiAgICB0aGlzLmJsb2NrRmluaXNoZWQoYm51bSlcbiAgfVxuXG4gIC8vIEFwcGxpZXMgYW4gaW1hZ2Uga2VybmVsIHRvIHRoZSBjYW52YXNcbiAgcmVuZGVyS2VybmVsIChibnVtLCBzdGFydCwgZW5kKSB7XG4gICAgY29uc3QgYmlhcyA9IHRoaXMuY3VycmVudEpvYi5iaWFzXG4gICAgY29uc3QgZGl2aXNvciA9IHRoaXMuY3VycmVudEpvYi5kaXZpc29yXG4gICAgY29uc3QgbiA9IHRoaXMuYy5waXhlbERhdGEubGVuZ3RoXG5cbiAgICBjb25zdCBhZGp1c3QgPSB0aGlzLmN1cnJlbnRKb2IuYWRqdXN0XG4gICAgY29uc3QgYWRqdXN0U2l6ZSA9IE1hdGguc3FydChhZGp1c3QubGVuZ3RoKVxuXG4gICAgY29uc3Qga2VybmVsID0gW11cblxuICAgIExvZy5kZWJ1ZyhgUmVuZGVyaW5nIGtlcm5lbCAtIEZpbHRlcjogJHt0aGlzLmN1cnJlbnRKb2IubmFtZX1gKVxuXG4gICAgc3RhcnQgPSBNYXRoLm1heChzdGFydCwgdGhpcy5jLmRpbWVuc2lvbnMud2lkdGggKiA0ICogKChhZGp1c3RTaXplIC0gMSkgLyAyKSlcbiAgICBlbmQgPSBNYXRoLm1pbihlbmQsIG4gLSAodGhpcy5jLmRpbWVuc2lvbnMud2lkdGggKiA0ICogKChhZGp1c3RTaXplIC0gMSkgLyAyKSkpXG5cbiAgICBjb25zdCBidWlsZGVyID0gKGFkanVzdFNpemUgLSAxKSAvIDJcblxuICAgIGNvbnN0IHBpeGVsID0gbmV3IFBpeGVsKClcbiAgICBwaXhlbC5zZXRDb250ZXh0KHRoaXMuYylcblxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSA0KSB7XG4gICAgICBwaXhlbC5sb2MgPSBpXG4gICAgICBsZXQgYnVpbGRlckluZGV4ID0gMFxuXG4gICAgICBmb3IgKGxldCBqID0gLWJ1aWxkZXI7IGogPD0gYnVpbGRlcjsgaisrKSB7XG4gICAgICAgIGZvciAobGV0IGsgPSBidWlsZGVyOyBrID49IC1idWlsZGVyOyBrLS0pIHtcbiAgICAgICAgICBsZXQgcCA9IHBpeGVsLmdldFBpeGVsUmVsYXRpdmUoaiwgaylcbiAgICAgICAgICBrZXJuZWxbYnVpbGRlckluZGV4ICogM10gPSBwLnJcbiAgICAgICAgICBrZXJuZWxbYnVpbGRlckluZGV4ICogMyArIDFdID0gcC5nXG4gICAgICAgICAga2VybmVsW2J1aWxkZXJJbmRleCAqIDMgKyAyXSA9IHAuYlxuICAgICAgICAgIGJ1aWxkZXJJbmRleCsrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzID0gdGhpcy5wcm9jZXNzS2VybmVsKGFkanVzdCwga2VybmVsLCBkaXZpc29yLCBiaWFzKVxuXG4gICAgICB0aGlzLm1vZFBpeGVsRGF0YVtpXSA9IFV0aWwuY2xhbXBSR0IocmVzLnIpXG4gICAgICB0aGlzLm1vZFBpeGVsRGF0YVtpICsgMV0gPSBVdGlsLmNsYW1wUkdCKHJlcy5nKVxuICAgICAgdGhpcy5tb2RQaXhlbERhdGFbaSArIDJdID0gVXRpbC5jbGFtcFJHQihyZXMuYilcbiAgICAgIHRoaXMubW9kUGl4ZWxEYXRhW2kgKyAzXSA9IHRoaXMuYy5waXhlbERhdGFbaSArIDNdXG4gICAgfVxuXG4gICAgdGhpcy5ibG9ja0ZpbmlzaGVkKGJudW0pXG4gIH1cblxuICAvLyBDYWxsZWQgd2hlbiBhIHNpbmdsZSBibG9jayBpcyBmaW5pc2hlZCByZW5kZXJpbmcuIE9uY2UgYWxsIGJsb2NrcyBhcmUgZG9uZSwgd2Ugc2lnbmFsIHRoYXQgdGhpcyBmaWx0ZXIgaXMgZmluaXNoZWQgcmVuZGVyaW5nIGFuZCBjb250aW51ZSB0byB0aGUgbmV4dCBzdGVwLlxuICBibG9ja0ZpbmlzaGVkIChibnVtKSB7XG4gICAgaWYgKGJudW0gPj0gMCkge1xuICAgICAgTG9nLmRlYnVnKGBCbG9jayAjJHtibnVtfSBmaW5pc2hlZCEgRmlsdGVyOiAke3RoaXMuY3VycmVudEpvYi5uYW1lfWApXG4gICAgfVxuICAgIHRoaXMuYmxvY2tzRG9uZSsrXG5cbiAgICBFdmVudC50cmlnZ2VyKHRoaXMuYywgJ2Jsb2NrRmluaXNoZWQnLCB7XG4gICAgICBibG9ja051bTogYm51bSxcbiAgICAgIGJsb2Nrc0ZpbmlzaGVkOiB0aGlzLmJsb2Nrc0RvbmUsXG4gICAgICB0b3RhbEJsb2NrczogUmVuZGVyZXIuQmxvY2tzXG4gICAgfSlcblxuICAgIGlmICh0aGlzLmJsb2Nrc0RvbmUgPT09IFJlbmRlcmVyLkJsb2Nrcykge1xuICAgICAgaWYgKHRoaXMuY3VycmVudEpvYi50eXBlID09PSBDb25maWcuRklMVEVSX1RZUEUuS2VybmVsKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jLnBpeGVsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuYy5waXhlbERhdGFbaV0gPSB0aGlzLm1vZFBpeGVsRGF0YVtpXVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChibnVtID49IDApIHtcbiAgICAgICAgTG9nLmRlYnVnKGBGaWx0ZXIgJHt0aGlzLmN1cnJlbnRKb2IubmFtZX0gZmluaXNoZWQhYClcbiAgICAgIH1cbiAgICAgIEV2ZW50LnRyaWdnZXIodGhpcy5jLCAncHJvY2Vzc0NvbXBsZXRlJywgdGhpcy5jdXJyZW50Sm9iKVxuICAgICAgdGhpcy5wcm9jZXNzTmV4dCgpXG4gICAgfVxuICB9XG5cbiAgLy8gVGhlIFwiZmlsdGVyIGZ1bmN0aW9uXCIgZm9yIGtlcm5lbCBhZGp1c3RtZW50cy5cbiAgcHJvY2Vzc0tlcm5lbCAoYWRqdXN0LCBrZXJuZWwsIGRpdmlzb3IsIGJpYXMpIHtcbiAgICBjb25zdCB2YWwgPSB7XG4gICAgICByOiAwLFxuICAgICAgZzogMCxcbiAgICAgIGI6IDBcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGp1c3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbC5yICs9IGFkanVzdFtpXSAqIGtlcm5lbFtpICogM11cbiAgICAgIHZhbC5nICs9IGFkanVzdFtpXSAqIGtlcm5lbFtpICogMyArIDFdXG4gICAgICB2YWwuYiArPSBhZGp1c3RbaV0gKiBrZXJuZWxbaSAqIDMgKyAyXVxuICAgIH1cblxuICAgIHZhbC5yID0gKHZhbC5yIC8gZGl2aXNvcikgKyBiaWFzXG4gICAgdmFsLmcgPSAodmFsLmcgLyBkaXZpc29yKSArIGJpYXNcbiAgICB2YWwuYiA9ICh2YWwuYiAvIGRpdmlzb3IpICsgYmlhc1xuICAgIHJldHVybiB2YWxcbiAgfVxufVxuIiwiLyoqXG4gKiBCdWlsdC1pbiBsYXllciBibGVuZGVycy4gTWFueSBvZiB0aGVzZSBtaW1pYyBQaG90b3Nob3AgYmxlbmQgbW9kZXMuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEJsZW5kZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxlbmRlciB7XG4gIHN0YXRpYyBibGVuZGVycyA9IHt9XG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBibGVuZGVyLiBDYW4gYmUgdXNlZCB0byBhZGQgeW91ciBvd24gYmxlbmRlcnMgb3V0c2lkZSBvZiB0aGUgY29yZSBsaWJyYXJ5LCBpZiBuZWVkZWQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSBOYW1lIG9mIHRoZSBibGVuZGVyLlxuICAgKiBAcGFyYW0geyBGdW5jdGlvbiB9IGZ1bmMgVGhlIGJsZW5kZXIgZnVuY3Rpb24uXG4gICAqIEBtZW1iZXJvZiBCbGVuZGVyXG4gICAqL1xuICBzdGF0aWMgcmVnaXN0ZXIgKG5hbWUsIGZ1bmMpIHtcbiAgICB0aGlzLmJsZW5kZXJzW25hbWVdID0gZnVuY1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGEgYmxlbmRlciB0byBjb21iaW5lIGEgbGF5ZXIgd2l0aCBpdHMgcGFyZW50LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgTmFtZSBvZiB0aGUgYmxlbmRpbmcgZnVuY3Rpb24gdG8gaW52b2tlLlxuICAgKiBAcGFyYW0geyBPYmplY3QgfSByZ2JhTGF5ZXIgUkdCQSBvYmplY3Qgb2YgdGhlIGN1cnJlbnQgcGl4ZWwgZnJvbSB0aGUgbGF5ZXIuXG4gICAqIEBwYXJhbSB7IE9iamVjdCB9IHJnYmFQYXJlbnQgUkdCQSBvYmplY3Qgb2YgdGhlIGNvcnJlc3BvbmRpbmcgcGl4ZWwgaW4gdGhlIHBhcmVudCBsYXllci5cbiAgICogQHJldHVybnMgeyBPYmplY3QgfSBSR0JBIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGJsZW5kZWQgcGl4ZWwuXG4gICAqIEBtZW1iZXJvZiBCbGVuZGVyXG4gICAqL1xuICBzdGF0aWMgZXhlY3V0ZSAobmFtZSwgcmdiYUxheWVyLCByZ2JhUGFyZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuYmxlbmRlcnNbbmFtZV0ocmdiYUxheWVyLCByZ2JhUGFyZW50KVxuICB9XG59XG4iLCJpbXBvcnQgeyBVdGlsIH0gZnJvbSAnLi91dGlsJ1xuaW1wb3J0IEJsZW5kZXIgZnJvbSAnLi9ibGVuZGVyJ1xuXG4vKipcbiAqIFRoZSBlbnRpcmUgbGF5ZXJpbmcgc3lzdGVtIGZvciBDYW1hbiByZXNpZGVzIGluIHRoaXMgZmlsZS4gTGF5ZXJzIGdldCB0aGVpciBvd24gY2FudmFzTGF5ZXIgb2JqZWN0IHdoaWNoIGlzIGNyZWF0ZWQgd2hlbiBuZXdMYXllcigpIGlzIGNhbGxlZC4gRm9yIGV4dGVuc2l2ZSBpbmZvcm1hdGlvbiByZWdhcmRpbmcgdGhlIHNwZWNpZmljcyBvZiBob3cgdGhlIGxheWVyaW5nIHN5c3RlbSB3b3JrcywgdGhlcmUgaXMgYW4gaW4tZGVwdGggYmxvZyBwb3N0IG9uIHRoaXMgdmVyeSB0b3BpYy5cbiAqIEluc3RlYWQgb2YgY29weWluZyB0aGUgZW50aXJldHkgb2YgdGhhdCBwb3N0LCBJJ2xsIHNpbXBseSBwb2ludCB5b3UgdG93YXJkcyB0aGUgW2Jsb2cgbGlua10oaHR0cDovL2Jsb2cubWVsdGluZ2ljZS5uZXQvcHJvZ3JhbW1pbmcvaW1wbGVtZW50aW5nLWxheWVycy1jYW1hbmpzKS5cbiAqIEhvd2V2ZXIsIHRoZSBnaXN0IG9mIHRoZSBsYXllcmluZyBzeXN0ZW0gaXMgdGhhdCwgZm9yIGVhY2ggbGF5ZXIsIGl0IGNyZWF0ZXMgYSBuZXcgY2FudmFzIGVsZW1lbnQgYW5kIHRoZW4gZWl0aGVyIGNvcGllcyB0aGUgcGFyZW50IGxheWVyJ3MgZGF0YSBvciBhcHBsaWVzIGEgc29saWQgY29sb3IgdG8gdGhlIG5ldyBsYXllci4gQWZ0ZXIgc29tZSAob3B0aW9uYWwpIGVmZmVjdHMgYXJlIGFwcGxpZWQsIHRoZSBsYXllciBpcyBibGVuZGVkIGJhY2sgaW50byB0aGUgcGFyZW50IGNhbnZhcyBsYXllciB1c2luZyBvbmUgb2YgbWFueSBkaWZmZXJlbnQgYmxlbmRpbmcgYWxnb3JpdGhtcy5cbiAqIFlvdSBjYW4gYWxzbyBsb2FkIGFuIGltYWdlIChsb2NhbCBvciByZW1vdGUsIHdpdGggYSBwcm94eSkgaW50byBhIGNhbnZhcyBsYXllciwgd2hpY2ggaXMgdXNlZnVsIGlmIHlvdSB3YW50IHRvIGFkZCB0ZXh0dXJlcyB0byBhbiBpbWFnZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgTGF5ZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5ZXIge1xuICBjb25zdHJ1Y3RvciAoYykge1xuICAgIC8vIENvbXBhdGliaWxpdHlcbiAgICB0aGlzLmMgPSBjXG4gICAgdGhpcy5maWx0ZXIgPSBjXG5cbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICBibGVuZGluZ01vZGU6ICdub3JtYWwnLFxuICAgICAgb3BhY2l0eTogMS4wXG4gICAgfVxuXG4gICAgLy8gRWFjaCBsYXllciBnZXRzIGl0cyBvd24gdW5pcXVlIElEXG4gICAgdGhpcy5sYXllcklEID0gVXRpbC51bmlxaWQoKVxuXG4gICAgLy8gQ3JlYXRlIHRoZSBjYW52YXMgZm9yIHRoaXMgbGF5ZXJcbiAgICAvLyB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG5cbiAgICAvLyB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMuYy5kaW1lbnNpb25zLndpZHRoXG4gICAgLy8gdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5jLmRpbWVuc2lvbnMuaGVpZ2h0XG5cbiAgICAvLyB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgLy8gdGhpcy5jb250ZXh0LmNyZWF0ZUltYWdlRGF0YSh0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KVxuICAgIC8vIHRoaXMuaW1hZ2VEYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KVxuICAgIC8vIHRoaXMucGl4ZWxEYXRhID0gdGhpcy5pbWFnZURhdGEuZGF0YVxuXG4gICAgdGhpcy53aWR0aCA9IHRoaXMuYy5kaW1lbnNpb25zLndpZHRoXG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLmMuZGltZW5zaW9ucy5oZWlnaHRcbiAgICB0aGlzLnBpeGVsRGF0YSA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh0aGlzLmMucGl4ZWxEYXRhLmxlbmd0aClcbiAgfVxuXG4gIC8vIElmIHlvdSB3YW50IHRvIGNyZWF0ZSBuZXN0ZWQgbGF5ZXJzXG4gIG5ld0xheWVyIChjYikge1xuICAgIHRoaXMuYy5uZXdMYXllcihjYilcbiAgfVxuXG4gIC8vIFNldHMgdGhlIGJsZW5kaW5nIG1vZGUgb2YgdGhpcyBsYXllci4gVGhlIG1vZGUgaXMgdGhlIG5hbWUgb2YgYSBibGVuZGVyIGZ1bmN0aW9uLlxuICBzZXRCbGVuZGluZ01vZGUgKG1vZGUpIHtcbiAgICB0aGlzLm9wdGlvbnMuYmxlbmRpbmdNb2RlID0gbW9kZVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBTZXRzIHRoZSBvcGFjaXR5IG9mIHRoaXMgbGF5ZXIuIFRoaXMgYWZmZWN0cyBob3cgbXVjaCBvZiB0aGlzIGxheWVyIGlzIGFwcGxpZWQgdG8gdGhlIHBhcmVudCBsYXllciBhdCByZW5kZXIgdGltZS5cbiAgb3BhY2l0eSAob3BhY2l0eSkge1xuICAgIHRoaXMub3B0aW9ucy5vcGFjaXR5ID0gb3BhY2l0eSAvIDEwMFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBDb3BpZXMgdGhlIGNvbnRlbnRzIG9mIHRoZSBwYXJlbnQgbGF5ZXIgdG8gdGhpcyBsYXllclxuICBjb3B5UGFyZW50ICgpIHtcbiAgICBjb25zdCBwYXJlbnREYXRhID0gdGhpcy5waXhlbERhdGFcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYy5waXhlbERhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIHRoaXMucGl4ZWxEYXRhW2ldID0gcGFyZW50RGF0YVtpXVxuICAgICAgdGhpcy5waXhlbERhdGFbaSArIDFdID0gcGFyZW50RGF0YVtpICsgMV1cbiAgICAgIHRoaXMucGl4ZWxEYXRhW2kgKyAyXSA9IHBhcmVudERhdGFbaSArIDJdXG4gICAgICB0aGlzLnBpeGVsRGF0YVtpICsgM10gPSBwYXJlbnREYXRhW2kgKyAzXVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gRmlsbHMgdGhpcyBsYXllciB3aWR0aCBhIHNpbmdsZSBjb2xvclxuICBmaWxsQ29sb3IgKCkge1xuICAgIHRoaXMuYy5maWxsQ29sb3IuYXBwbHkodGhpcy5jLCBhcmd1bWVudHMpXG4gIH1cblxuICAvLyBUYWtlcyB0aGUgY29udGVudHMgb2YgdGhpcyBsYXllciBhbmQgYXBwbGllcyB0aGVtIHRvIHRoZSBwYXJlbnQgbGF5ZXIgYXQgcmVuZGVyIHRpbWUuIFRoaXMgc2hvdWxkIG5ldmVyIGJlIGNhbGxlZCBleHBsaWNpdGx5IGJ5IHRoZSB1c2VyLlxuICBhcHBseVRvUGFyZW50ICgpIHtcbiAgICBjb25zdCBwYXJlbnREYXRhID0gdGhpcy5jLnBpeGVsU3RhY2tbdGhpcy5jLnBpeGVsU3RhY2subGVuZ3RoIC0gMV1cbiAgICBjb25zdCBsYXllckRhdGEgPSB0aGlzLmMucGl4ZWxEYXRhXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVyRGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgY29uc3QgcmdiYVBhcmVudCA9IHtcbiAgICAgICAgcjogcGFyZW50RGF0YVtpXSxcbiAgICAgICAgZzogcGFyZW50RGF0YVtpICsgMV0sXG4gICAgICAgIGI6IHBhcmVudERhdGFbaSArIDJdLFxuICAgICAgICBhOiBwYXJlbnREYXRhW2kgKyAzXVxuICAgICAgfVxuICAgICAgY29uc3QgcmdiYUxheWVyID0ge1xuICAgICAgICByOiBsYXllckRhdGFbaV0sXG4gICAgICAgIGc6IGxheWVyRGF0YVtpICsgMV0sXG4gICAgICAgIGI6IGxheWVyRGF0YVtpICsgMl0sXG4gICAgICAgIGE6IGxheWVyRGF0YVtpICsgM11cbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdWx0ID0gQmxlbmRlci5leGVjdXRlKHRoaXMub3B0aW9ucy5ibGVuZGluZ01vZGUsIHJnYmFMYXllciwgcmdiYVBhcmVudClcbiAgICAgIHJlc3VsdC5yID0gVXRpbC5jbGFtcFJHQihyZXN1bHQucilcbiAgICAgIHJlc3VsdC5nID0gVXRpbC5jbGFtcFJHQihyZXN1bHQuZylcbiAgICAgIHJlc3VsdC5iID0gVXRpbC5jbGFtcFJHQihyZXN1bHQuYilcbiAgICAgIGlmICghcmVzdWx0LmEpIHtcbiAgICAgICAgcmVzdWx0LmEgPSByZ2JhTGF5ZXIuYVxuICAgICAgfVxuXG4gICAgICBwYXJlbnREYXRhW2ldID0gcmdiYVBhcmVudC5yIC0gKChyZ2JhUGFyZW50LnIgLSByZXN1bHQucikgKiAodGhpcy5vcHRpb25zLm9wYWNpdHkgKiAocmVzdWx0LmEgLyAyNTUpKSlcbiAgICAgIHBhcmVudERhdGFbaSArIDFdID0gcmdiYVBhcmVudC5nIC0gKChyZ2JhUGFyZW50LmcgLSByZXN1bHQuZykgKiAodGhpcy5vcHRpb25zLm9wYWNpdHkgKiAocmVzdWx0LmEgLyAyNTUpKSlcbiAgICAgIHBhcmVudERhdGFbaSArIDJdID0gcmdiYVBhcmVudC5iIC0gKChyZ2JhUGFyZW50LmIgLSByZXN1bHQuYikgKiAodGhpcy5vcHRpb25zLm9wYWNpdHkgKiAocmVzdWx0LmEgLyAyNTUpKSlcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBNb2R1bGUgZnJvbSAnLi9tb2R1bGUnXG5pbXBvcnQgeyBub29wLCBVdGlsIH0gZnJvbSAnLi91dGlsJ1xuaW1wb3J0IEFuYWx5emUgZnJvbSAnLi9hbmFseXplJ1xuaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vcmVuZGVyZXInXG4vLyBpbXBvcnQgTG9nIGZyb20gJy4vbG9nZ2VyJ1xuLy8gaW1wb3J0IElPIGZyb20gJy4vaW8nXG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCdcbmltcG9ydCBDb25maWcgZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgTGF5ZXIgZnJvbSAnLi9sYXllcidcblxuLyoqXG4gKiBIZXJlIGl0IGJlZ2lucy4gQ2FtYW4gaXMgZGVmaW5lZC5cbiAqIFRoZXJlIGFyZSBtYW55IGRpZmZlcmVudCBpbml0aWFsaXphdGlvbiBmb3IgQ2FtYW4sIHdoaWNoIGFyZSBkZXNjcmliZWQgb24gdGhlIFtHdWlkZXNdKGh0dHA6Ly9jYW1hbmpzLmNvbS9ndWlkZXMpLlxuICogSW5pdGlhbGl6YXRpb24gaXMgdHJpY2t5IGJlY2F1c2Ugd2UgbmVlZCB0byBtYWtlIHN1cmUgZXZlcnl0aGluZyB3ZSBuZWVkIGlzIGFjdHVhbGx5IGZ1bGx5IGxvYWRlZCBpbiB0aGUgRE9NIGJlZm9yZSBwcm9jZWVkaW5nLiBXaGVuIGluaXRpYWxpemVkIG9uIGFuIGltYWdlLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBpbWFnZSBpcyBkb25lIGxvYWRpbmcgYmVmb3JlIGNvbnZlcnRpbmcgaXQgdG8gYSBjYW52YXMgZWxlbWVudCBhbmQgd3JpdGluZyB0aGUgcGl4ZWwgZGF0YS4gSWYgd2UgZG8gdGhpcyBwcmVtYXR1cmVseSwgdGhlIGJyb3dzZXIgd2lsbCB0aHJvdyBhIERPTSBFcnJvciwgYW5kIGNoYW9zIHdpbGwgZW5zdWUuIEluIHRoZSBldmVudCB0aGF0IHdlIGluaXRpYWxpemUgQ2FtYW4gb24gYSBjYW52YXMgZWxlbWVudCB3aGlsZSBzcGVjaWZ5aW5nIGFuIGltYWdlIFVSTCwgd2UgbmVlZCB0byBjcmVhdGUgYSBuZXcgaW1hZ2UgZWxlbWVudCwgbG9hZCB0aGUgaW1hZ2UsIHRoZW4gY29udGludWUgd2l0aCBpbml0aWFsaXphdGlvbi5cbiAqIFRoZSBtYWluIGdvYWwgZm9yIENhbWFuIHdhcyBzaW1wbGljaXR5LCBzbyBhbGwgb2YgdGhpcyBpcyBoYW5kbGVkIHRyYW5zcGFyZW50bHkgdG8gdGhlIGVuZC11c2VyLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBDYW1hblxuICogQGV4dGVuZHMge01vZHVsZX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FtYW4gZXh0ZW5kcyBNb2R1bGUge1xuICAvLyBUaGUgY3VycmVudCB2ZXJzaW9uLlxuICBzdGF0aWMgdmVyc2lvbiA9IHtcbiAgICByZWxlYXNlOiAnMS4wLjAnLFxuICAgIGRhdGU6ICc2LzA4LzIwMTgnXG4gIH1cblxuICAvLyBAcHJvcGVydHkgW0Jvb2xlYW5dIEFsbG93IHJldmVydGluZyB0aGUgY2FudmFzP1xuICAvLyBJZiB5b3VyIEpTIHByb2Nlc3MgaXMgcnVubmluZyBvdXQgb2YgbWVtb3J5LCBkaXNhYmxpbmdcbiAgLy8gdGhpcyBjb3VsZCBoZWxwIGRyYXN0aWNhbGx5LlxuICBzdGF0aWMgYWxsb3dSZXZlcnQgPSB0cnVlXG5cbiAgLy8gQ3VzdG9tIHRvU3RyaW5nKClcbiAgLy8gQHJldHVybiBbU3RyaW5nXSBWZXJzaW9uIGFuZCByZWxlYXNlIGluZm9ybWF0aW9uLlxuICBzdGF0aWMgdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiBgVmVyc2lvbiAke0NhbWFuLnZlcnNpb24ucmVsZWFzZX0sIFJlbGVhc2VkICR7Q2FtYW4udmVyc2lvbi5kYXRlfWBcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgQ2FtYW4gZnVuY3Rpb24uXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IGNhbnZhc0lkIFRoZSBjYW52YXMtaWQgb2YgdGhlIGNhbnZhcyBjb21wb25lbnQuXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHdpZHRoIFRoZSB3aWR0aCBvZiB0aGUgY2FudmFzIGNvbXBvbmVudC5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gaGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIGNhbnZhcyBjb21wb25lbnQuXG4gICAqIEByZXR1cm4gW0NhbWFuXSBJbml0aWFsaXplZCBDYW1hbiBpbnN0YW5jZS5cbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoLi4uYXJncykge1xuICAgIC8vIGFyZ3NbMF06IGNhbnZhc0lkXG4gICAgLy8gYXJnc1sxXTogd2lkdGgsXG4gICAgLy8gYXJnc1syXTogaGVpZ2h0XG4gICAgLy8gYXJnc1szXTogY2FsbGJhY2sgZnVuY3Rpb25cbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKVxuICAgIH1cbiAgICBzdXBlcigpXG5cbiAgICAvLyBjb25zdCBpZCA9IGFyZ3NbMF1cbiAgICBsZXQgY2FsbGJhY2sgPSBhcmdzWzNdXG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2sgPSBub29wXG4gICAgfVxuXG4gICAgLy8gRXZlcnkgaW5zdGFuY2UgZ2V0cyBhIHVuaXF1ZSBJRC5cbiAgICB0aGlzLmlkID0gVXRpbC51bmlxaWQoKVxuICAgIHRoaXMuaW5pdGlhbGl6ZWRQaXhlbERhdGEgPSB0aGlzLm9yaWdpbmFsUGl4ZWxEYXRhID0gbnVsbFxuXG4gICAgdGhpcy5waXhlbFN0YWNrID0gW10gLy8gU3RvcmVzIHRoZSBwaXhlbCBsYXllcnNcbiAgICB0aGlzLmxheWVyU3RhY2sgPSBbXSAvLyBTdG9yZXMgYWxsIG9mIHRoZSBsYXllcnMgd2FpdGluZyB0byBiZSByZW5kZXJlZFxuICAgIHRoaXMuY2FudmFzUXVldWUgPSBbXSAvLyBTdG9yZXMgYWxsIG9mIHRoZSBjYW52YXNlcyB0byBiZSBwcm9jZXNzZWRcbiAgICB0aGlzLmN1cnJlbnRMYXllciA9IG51bGxcblxuICAgIHRoaXMuYW5hbHl6ZSA9IG5ldyBBbmFseXplKHRoaXMpXG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcih0aGlzKVxuXG4gICAgLy8gbWFrZSBzdXJlIHlvdSBkbyBldmVyeXRoaW5nIGluIG9uUmVhZHkgY2FsbGJhY2tcbiAgICB0aGlzLnBhcnNlQXJndW1lbnRzKGFyZ3MpXG4gICAgdGhpcy5pbml0Q2FudmFzKClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIHRoZSBhcmd1bWVudHMgZ2l2ZW4gdG8gdGhlIENhbWFuIGZ1bmN0aW9uLCBhbmQgc2V0cyB0aGUgYXBwcm9wcmlhdGUgcHJvcGVydGllcyBvbiB0aGlzIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0geyBBcnJheSB9IGFyZ3MgQXJyYXkgb2YgYXJndW1lbnRzIHBhc3NlZCB0byBDYW1hbi5cbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICBwYXJzZUFyZ3VtZW50cyAoYXJncykge1xuICAgIC8vIGFyZ3NbMF06IGNhbnZhc0lkXG4gICAgLy8gYXJnc1sxXTogd2lkdGgsXG4gICAgLy8gYXJnc1syXTogaGVpZ2h0XG4gICAgLy8gYXJnc1szXTogY2FsbGJhY2sgZnVuY3Rpb25cbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMgZ2l2ZW4nKVxuICAgIH1cblxuICAgIC8vIEZpcnN0IGFyZ3VtZW50IGlzIGFsd2F5cyBvdXIgY2FudmFzL2ltYWdlXG4gICAgaWYgKHR5cGVvZiBhcmdzWzBdICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBwYXNzIHRoZSBjYW52YXMtaWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LicpXG4gICAgfVxuICAgIHRoaXMuY2FudmFzID0gYXJnc1swXVxuICAgIGlmICh0eXBlb2YgYXJnc1sxXSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIGFyZ3NbMl0gIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHBhc3MgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGNhbnZhcyBjb21wb25lbnQuJylcbiAgICB9XG4gICAgdGhpcy53aWR0aCA9IGFyZ3NbMV1cbiAgICB0aGlzLmhlaWdodCA9IGFyZ3NbMl1cbiAgICB0aGlzLmNhbGxiYWNrID0gdHlwZW9mIGFyZ3NbM10gPT09ICdmdW5jdGlvbicgPyBhcmdzWzNdIDogbm9vcFxuICB9XG5cbiAgLy8gSW5pdGlhbGl6YXRpb24gZnVuY3Rpb24gZm9yIGJyb3dzZXIgYW5kIGNhbnZhcyBvYmplY3RzXG4gIGluaXRDYW52YXMgKCkge1xuICAgIHRoaXMuY29udGV4dCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQodGhpcy5jYW52YXMpXG4gICAgdGhpcy5maW5pc2hJbml0KClcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5hbCBzdGVwIG9mIGluaXRpYWxpemF0aW9uLiBXZSBmaW5pc2ggc2V0dGluZyB1cCBvdXIgY2FudmFzIGVsZW1lbnQsIGFuZCB3ZSBkcmF3IHRoZSBpbWFnZSB0byB0aGUgY2FudmFzIChpZiBhcHBsaWNhYmxlKS5cbiAgICpcbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICBmaW5pc2hJbml0ICgpIHtcbiAgICBpZiAoIXRoaXMuY29udGV4dCkge1xuICAgICAgdGhpcy5jb250ZXh0ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCh0aGlzLmNhbnZhcylcbiAgICB9XG5cbiAgICB0aGlzLm9yaWdpbmFsV2lkdGggPSB0aGlzLnByZVNjYWxlZFdpZHRoID0gdGhpcy53aWR0aFxuICAgIHRoaXMub3JpZ2luYWxIZWlnaHQgPSB0aGlzLnByZVNjYWxlZEhlaWdodCA9IHRoaXMuaGVpZ2h0XG5cbiAgICBjb25zdCBfdGhpcyA9IHRoaXNcbiAgICB3eC5jYW52YXNHZXRJbWFnZURhdGEoe1xuICAgICAgY2FudmFzSWQ6IF90aGlzLmNhbnZhcyxcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgICAgd2lkdGg6IF90aGlzLndpZHRoLFxuICAgICAgaGVpZ2h0OiBfdGhpcy5oZWlnaHQsXG4gICAgICBzdWNjZXNzIChyZXMpIHtcbiAgICAgICAgX3RoaXMucGl4ZWxEYXRhID0gcmVzLmRhdGFcbiAgICAgICAgRXZlbnQudHJpZ2dlcihfdGhpcywgJ19waXhlbERhdGFSZWFkeScpXG4gICAgICAgIGlmIChDYW1hbi5hbGxvd1JldmVydCkge1xuICAgICAgICAgIF90aGlzLmluaXRpYWxpemVkUGl4ZWxEYXRhID0gVXRpbC5kYXRhQXJyYXkoX3RoaXMucGl4ZWxEYXRhLmxlbmd0aClcbiAgICAgICAgICBfdGhpcy5vcmlnaW5hbFBpeGVsRGF0YSA9IFV0aWwuZGF0YUFycmF5KF90aGlzLnBpeGVsRGF0YS5sZW5ndGgpXG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF90aGlzLnBpeGVsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHBpeGVsID0gX3RoaXMucGl4ZWxEYXRhW2ldXG4gICAgICAgICAgICBfdGhpcy5pbml0aWFsaXplZFBpeGVsRGF0YVtpXSA9IHBpeGVsXG4gICAgICAgICAgICBfdGhpcy5vcmlnaW5hbFBpeGVsRGF0YVtpXSA9IHBpeGVsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIHRoaXMuZGltZW5zaW9ucyA9IHtcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodFxuICAgIH1cblxuICAgIHRoaXMuY2FsbGJhY2sodGhpcylcblxuICAgIC8vIFJlc2V0IHRoZSBjYWxsYmFjayBzbyByZS1pbml0aWFsaXphdGlvbiBkb2Vzbid0IHRyaWdnZXIgaXQgYWdhaW4uXG4gICAgdGhpcy5jYWxsYmFjayA9IG5vb3BcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgY2FudmFzIHBpeGVscyB0byB0aGUgb3JpZ2luYWwgc3RhdGUgYXQgaW5pdGlhbGl6YXRpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgcmVzZXRPcmlnaW5hbFBpeGVsRGF0YSAoKSB7XG4gICAgaWYgKCFDYW1hbi5hbGxvd1JldmVydCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXZlcnQgZGlzYWJsZWQnKVxuICAgIH1cblxuICAgIHRoaXMub3JpZ2luYWxQaXhlbERhdGEgPSBVdGlsLmRhdGFBcnJheSh0aGlzLnBpeGVsRGF0YS5sZW5ndGgpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpeGVsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHBpeGVsID0gdGhpcy5waXhlbERhdGFbaV1cbiAgICAgIHRoaXMub3JpZ2luYWxQaXhlbERhdGFbaV0gPSBwaXhlbFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCZWdpbnMgdGhlIHJlbmRlcmluZyBwcm9jZXNzLiBUaGlzIHdpbGwgZXhlY3V0ZSBhbGwgb2YgdGhlIGZpbHRlciBmdW5jdGlvbnMgY2FsbGVkIGVpdGhlciBzaW5jZSBpbml0aWFsaXphdGlvbiBvciB0aGUgcHJldmlvdXMgcmVuZGVyLlxuICAgKlxuICAgKiBAcGFyYW0geyBGdW5jdGlvbiB9IFtjYWxsYmFjaz1ub29wXSBGdW5jdGlvbiB0byBjYWxsIHdoZW4gcmVuZGVyaW5nIGlzIGZpbmlzaGVkLlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHJlbmRlciAoY2FsbGJhY2sgPSBub29wKSB7XG4gICAgRXZlbnQudHJpZ2dlcih0aGlzLCAncmVuZGVyU3RhcnQnKVxuICAgIHRoaXMucmVuZGVyZXIuZXhlY3V0ZSh0aGlzLCAoKSA9PiB7XG4gICAgICBjb25zdCBfdGhpcyA9IHRoaXNcbiAgICAgIHd4LmNhbnZhc1B1dEltYWdlRGF0YSh7XG4gICAgICAgIGNhbnZhc0lkOiBfdGhpcy5jYW52YXMsXG4gICAgICAgIGRhdGE6IF90aGlzLnBpeGVsRGF0YSxcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgd2lkdGg6IF90aGlzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IF90aGlzLmhlaWdodCxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbGxiYWNrLmNhbGwoX3RoaXMpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wbGV0ZWx5IHJlc2V0cyB0aGUgY2FudmFzIGJhY2sgdG8gaXQncyBvcmlnaW5hbCBzdGF0ZS5cbiAgICogQW55IHNpemUgYWRqdXN0bWVudHMgd2lsbCBhbHNvIGJlIHJlc2V0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHJlc2V0ICgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaW5pdGlhbGl6ZWRQaXhlbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwaXhlbCA9IHRoaXMuaW5pdGlhbGl6ZWRQaXhlbERhdGFbaV1cbiAgICAgIHRoaXMucGl4ZWxEYXRhW2ldID0gcGl4ZWxcbiAgICB9XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzXG4gICAgd3guY2FudmFzUHV0SW1hZ2VEYXRhKHtcbiAgICAgIGNhbnZhc0lkOiBfdGhpcy5jYW52YXMsXG4gICAgICBkYXRhOiB0aGlzLnBpeGVsRGF0YSxcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgICAgd2lkdGg6IF90aGlzLndpZHRoLFxuICAgICAgaGVpZ2h0OiBfdGhpcy5oZWlnaHRcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hlcyB0aGUgZmlsdGVyIGNhbGxiYWNrIHRoYXQgbW9kaWZpZXMgdGhlIFJHQkEgb2JqZWN0IGludG8gdGhlXG4gICMgcmVuZGVyIHF1ZXVlLlxuICAgKlxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBuYW1lIE5hbWUgb2YgdGhlIGZpbHRlciBmdW5jdGlvbi5cbiAgICogQHBhcmFtIHsgRnVuY3Rpb24gfSBwcm9jZXNzRm4gIFRoZSBGaWx0ZXIgZnVuY3Rpb24uXG4gICAqIEByZXR1cm5zIHsgQ2FtYW4gfVxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHByb2Nlc3MgKG5hbWUsIHByb2Nlc3NGbikge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkKHtcbiAgICAgIHR5cGU6IENvbmZpZy5GSUxURVJfVFlQRS5TaW5nbGUsXG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgcHJvY2Vzc0ZuOiBwcm9jZXNzRm5cbiAgICB9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUHVzaGVzIHRoZSBrZXJuZWwgaW50byB0aGUgcmVuZGVyIHF1ZXVlLlxuICAgKlxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBrZXJuZWwuXG4gICAqIEBwYXJhbSB7IEFycmF5IH0gYWRqdXN0IFRoZSBjb252b2x1dGlvbiBrZXJuZWwgcmVwcmVzZW50ZWQgYXMgYSAxRCBhcnJheS5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gW2Rpdmlzb3I9bnVsbF0gVGhlIGRpdmlzb3IgZm9yIHRoZSBjb252b2x1dGlvbi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtiaWFzPTBdIFRoZSBiaWFzIGZvciB0aGUgY29udm9sdXRpb24uXG4gICAqIEByZXR1cm5zIHsgQ2FtYW4gfVxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHByb2Nlc3NLZXJuZWwgKG5hbWUsIGFkanVzdCwgZGl2aXNvciA9IG51bGwsIGJpYXMgPSAwKSB7XG4gICAgaWYgKCFkaXZpc29yKSB7XG4gICAgICBkaXZpc29yID0gMFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gYWRqdXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRpdmlzb3IgKz0gYWRqdXN0W2ldXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJlci5hZGQoe1xuICAgICAgdHlwZTogQ29uZmlnLkZJTFRFUl9UWVBFLktlcm5lbCxcbiAgICAgIG5hbWUsXG4gICAgICBhZGp1c3QsXG4gICAgICBkaXZpc29yLFxuICAgICAgYmlhc1xuICAgIH0pXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBzdGFuZGFsb25lIHBsdWdpbiBpbnRvIHRoZSByZW5kZXIgcXVldWUuXG4gICAqXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHBsdWdpbiBOYW1lIG9mIHRoZSBwbHVnaW4uXG4gICAqIEBwYXJhbSB7IEFycmF5IH0gYXJncyBBcnJheSBvZiBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgcGx1Z2luLlxuICAgKiBAcmV0dXJucyB7IENhbWFuIH1cbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICBwcm9jZXNzUGx1Z2luIChwbHVnaW4sIGFyZ3MpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZCh7XG4gICAgICB0eXBlOiBDb25maWcuRklMVEVSX1RZUEUuUGx1Z2luLFxuICAgICAgcGx1Z2luLFxuICAgICAgYXJnc1xuICAgIH0pXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hlcyBhIG5ldyBsYXllciBvcGVyYXRpb24gaW50byB0aGUgcmVuZGVyIHF1ZXVlIGFuZCBjYWxscyB0aGUgbGF5ZXJcbiAgIyBjYWxsYmFjay5cbiAgICpcbiAgICogQHBhcmFtIHsgRnVuY3Rpb24gfSBjYWxsYmFjayAgRnVuY3Rpb24gdGhhdCBpcyBleGVjdXRlZCB3aXRoaW4gdGhlIGNvbnRleHQgb2YgdGhlIGxheWVyLlxuICAgKiBBbGwgZmlsdGVyIGFuZCBhZGp1c3RtZW50IGZ1bmN0aW9ucyBmb3IgdGhlIGxheWVyIHdpbGwgYmUgZXhlY3V0ZWQgaW5zaWRlIG9mIHRoaXMgZnVuY3Rpb24uXG4gICAqIEByZXR1cm5zIHsgQ2FtYW4gfVxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIG5ld0xheWVyIChjYWxsYmFjaykge1xuICAgIEV2ZW50Lmxpc3Rlbih0aGlzLCAnX3BpeGVsRGF0YVJlYWR5JywgKCkgPT4ge1xuICAgICAgY29uc3QgbGF5ZXIgPSBuZXcgTGF5ZXIodGhpcylcbiAgICAgIHRoaXMuY2FudmFzUXVldWUucHVzaChsYXllcilcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkKHtcbiAgICAgICAgdHlwZTogQ29uZmlnLkZJTFRFUl9UWVBFLkxheWVyRGVxdWV1ZVxuICAgICAgfSlcblxuICAgICAgY2FsbGJhY2suY2FsbChsYXllcilcblxuICAgICAgdGhpcy5yZW5kZXJlci5hZGQoe1xuICAgICAgICB0eXBlOiBDb25maWcuRklMVEVSX1RZUEUuTGF5ZXJGaW5pc2hlZFxuICAgICAgfSlcbiAgICB9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUHVzaGVzIHRoZSBsYXllciBjb250ZXh0IGFuZCBtb3ZlcyB0byB0aGUgbmV4dCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7IExheWVyIH0gbGF5ZXIgVGhlIGxheWVyIHRvIGV4ZWN1dGUuXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgZXhlY3V0ZUxheWVyIChsYXllcikge1xuICAgIHRoaXMucHVzaENvbnRleHQobGF5ZXIpXG4gIH1cblxuICAvKipcbiAgICogU2V0IGFsbCBvZiB0aGUgcmVsZXZhbnQgZGF0YSB0byB0aGUgbmV3IGxheWVyLlxuICAgKlxuICAgKiBAcGFyYW0geyBMYXllciB9IGxheWVyIFRoZSBsYXllciB3aG9zZSBjb250ZXh0IHdlIHdhbnQgdG8gc3dpdGNoIHRvLlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHB1c2hDb250ZXh0IChsYXllcikge1xuICAgIHRoaXMubGF5ZXJTdGFjay5wdXNoKHRoaXMuY3VycmVudExheWVyKVxuICAgIHRoaXMucGl4ZWxTdGFjay5wdXNoKHRoaXMucGl4ZWxEYXRhKVxuICAgIHRoaXMuY3VycmVudExheWVyID0gbGF5ZXJcbiAgICB0aGlzLnBpeGVsRGF0YSA9IGxheWVyLnBpeGVsRGF0YVxuICB9XG5cbiAgLy8gUmVzdG9yZSB0aGUgcHJldmlvdXMgbGF5ZXIgY29udGV4dC5cbiAgcG9wQ29udGV4dCAoKSB7XG4gICAgdGhpcy5waXhlbERhdGEgPSB0aGlzLnBpeGVsU3RhY2sucG9wKClcbiAgICB0aGlzLmN1cnJlbnRMYXllciA9IHRoaXMubGF5ZXJTdGFjay5wb3AoKVxuICB9XG5cbiAgLy8gQXBwbGllcyB0aGUgY3VycmVudCBsYXllciB0byBpdHMgcGFyZW50IGxheWVyLlxuICBhcHBseUN1cnJlbnRMYXllciAoKSB7XG4gICAgdGhpcy5jdXJyZW50TGF5ZXIuYXBwbHlUb1BhcmVudCgpXG4gIH1cbn1cbiIsImltcG9ydCBDYW1hbiBmcm9tICcuL2NhbWFuJ1xuXG4vKipcbiAqIFJlc3BvbnNpYmxlIGZvciByZWdpc3RlcmluZyBhbmQgc3RvcmluZyBhbGwgb2YgdGhlIGZpbHRlcnMuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEZpbHRlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWx0ZXIge1xuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgZmlsdGVyIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZpbHRlci5cbiAgICogQHBhcmFtIHsgRnVuY3Rpb24gfSBmaWx0ZXJGdW5jIFRoZSBmaWx0ZXIgZnVuY3Rpb24uXG4gICAqIEBtZW1iZXJvZiBGaWx0ZXJcbiAgICovXG4gIHN0YXRpYyByZWdpc3RlciAobmFtZSwgZmlsdGVyRnVuYykge1xuICAgIENhbWFuLnByb3RvdHlwZVtuYW1lXSA9IGZpbHRlckZ1bmNcbiAgfVxufVxuIiwiLyoqXG4gKlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gQmxlbmRlclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWdpc3RlckJsZW5kZXIoQmxlbmRlcikge1xuICAvLyBEaXJlY3RseSBhcHBseSB0aGUgY2hpbGQgbGF5ZXIncyBwaXhlbHMgdG8gdGhlIHBhcmVudCBsYXllciB3aXRoIG5vIHNwZWNpYWwgY2hhbmdlc1xuICBCbGVuZGVyLnJlZ2lzdGVyKCdub3JtYWwnLCAocmdiYUxheWVyLCByZ2JhUGFyZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHJnYmFMYXllci5yLFxuICAgICAgZzogcmdiYUxheWVyLmcsXG4gICAgICBiOiByZ2JhTGF5ZXIuYlxuICAgIH1cbiAgfSlcblxuICAvLyBBcHBseSB0aGUgY2hpbGQgdG8gdGhlIHBhcmVudCBieSBtdWx0aXBseWluZyB0aGUgY29sb3IgdmFsdWVzLiBUaGlzIGdlbmVyYWxseSBjcmVhdGVzIGNvbnRyYXN0LlxuICBCbGVuZGVyLnJlZ2lzdGVyKCdtdWx0aXBseScsIChyZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcjogKHJnYmFMYXllci5yICogcmdiYVBhcmVudC5yKSAvIDI1NSxcbiAgICAgIGc6IChyZ2JhTGF5ZXIuZyAqIHJnYmFQYXJlbnQuZykgLyAyNTUsXG4gICAgICBiOiAocmdiYUxheWVyLmIgKiByZ2JhUGFyZW50LmIpIC8gMjU1XG4gICAgfVxuICB9KVxuXG4gIEJsZW5kZXIucmVnaXN0ZXIoJ3NjcmVlbicsIChyZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcjogMjU1IC0gKCgoMjU1IC0gcmdiYUxheWVyLnIpICogKDI1NSAtIHJnYmFQYXJlbnQucikpIC8gMjU1KSxcbiAgICAgIGc6IDI1NSAtICgoKDI1NSAtIHJnYmFMYXllci5nKSAqICgyNTUgLSByZ2JhUGFyZW50LmcpKSAvIDI1NSksXG4gICAgICBiOiAyNTUgLSAoKCgyNTUgLSByZ2JhTGF5ZXIuYikgKiAoMjU1IC0gcmdiYVBhcmVudC5iKSkgLyAyNTUpXG4gICAgfVxuICB9KVxuXG4gIEJsZW5kZXIucmVnaXN0ZXIoJ292ZXJsYXknLCAocmdiYUxheWVyLCByZ2JhUGFyZW50KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0ge31cbiAgICByZXN1bHQuciA9IHJnYmFQYXJlbnQuciA+IDEyOCA/IDI1NSAtIDIgKiAoMjU1IC0gcmdiYUxheWVyLnIpICogKDI1NSAtIHJnYmFQYXJlbnQucikgLyAyNTUgOiAocmdiYVBhcmVudC5yICogcmdiYUxheWVyLnIgKiAyKSAvIDI1NVxuICAgIHJlc3VsdC5nID0gcmdiYVBhcmVudC5nID4gMTI4ID8gMjU1IC0gMiAqICgyNTUgLSByZ2JhTGF5ZXIuZykgKiAoMjU1IC0gcmdiYVBhcmVudC5nKSAvIDI1NSA6IChyZ2JhUGFyZW50LmcgKiByZ2JhTGF5ZXIuZyAqIDIpIC8gMjU1XG4gICAgcmVzdWx0LmIgPSByZ2JhUGFyZW50LmIgPiAxMjggPyAyNTUgLSAyICogKDI1NSAtIHJnYmFMYXllci5iKSAqICgyNTUgLSByZ2JhUGFyZW50LmIpIC8gMjU1IDogKHJnYmFQYXJlbnQuYiAqIHJnYmFMYXllci5iICogMikgLyAyNTVcblxuICAgIHJldHVybiByZXN1bHRcbiAgfSlcblxuICBCbGVuZGVyLnJlZ2lzdGVyKCdkaWZmZXJlbmNlJywgKHJnYmFMYXllciwgcmdiYVBhcmVudCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICByOiByZ2JhTGF5ZXIuciAtIHJnYmFQYXJlbnQucixcbiAgICAgIGc6IHJnYmFMYXllci5nIC0gcmdiYVBhcmVudC5nLFxuICAgICAgYjogcmdiYUxheWVyLmIgLSByZ2JhUGFyZW50LmJcbiAgICB9XG4gIH0pXG5cbiAgQmxlbmRlci5yZWdpc3RlcignYWRkaXRpb24nLCAocmdiYUxheWVyLCByZ2JhUGFyZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHJnYmFQYXJlbnQuciArIHJnYmFMYXllci5yLFxuICAgICAgZzogcmdiYVBhcmVudC5nICsgcmdiYUxheWVyLmcsXG4gICAgICBiOiByZ2JhUGFyZW50LmIgKyByZ2JhTGF5ZXIuYlxuICAgIH1cbiAgfSlcblxuICBCbGVuZGVyLnJlZ2lzdGVyKCdleGNsdXNpb24nLCAocmdiYUxheWVyLCByZ2JhUGFyZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IDEyOCAtIDIgKiAocmdiYVBhcmVudC5yIC0gMTI4KSAqIChyZ2JhTGF5ZXIuciAtIDEyOCkgLyAyNTUsXG4gICAgICBnOiAxMjggLSAyICogKHJnYmFQYXJlbnQuZyAtIDEyOCkgKiAocmdiYUxheWVyLmcgLSAxMjgpIC8gMjU1LFxuICAgICAgYjogMTI4IC0gMiAqIChyZ2JhUGFyZW50LmIgLSAxMjgpICogKHJnYmFMYXllci5iIC0gMTI4KSAvIDI1NVxuICAgIH1cbiAgfSlcblxuICBCbGVuZGVyLnJlZ2lzdGVyKCdzb2Z0TGlnaHQnLCAocmdiYUxheWVyLCByZ2JhUGFyZW50KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0ge31cblxuICAgIHJlc3VsdC5yID0gcmdiYVBhcmVudC5yID4gMTI4ID8gMjU1IC0gKCgyNTUgLSByZ2JhUGFyZW50LnIpICogKDI1NSAtIChyZ2JhTGF5ZXIuciAtIDEyOCkpKSAvIDI1NSA6IChyZ2JhUGFyZW50LnIgKiAocmdiYUxheWVyLnIgKyAxMjgpKSAvIDI1NVxuXG4gICAgcmVzdWx0LmcgPSByZ2JhUGFyZW50LmcgPiAxMjggPyAyNTUgLSAoKDI1NSAtIHJnYmFQYXJlbnQuZykgKiAoMjU1IC0gKHJnYmFMYXllci5nIC0gMTI4KSkpIC8gMjU1IDogKHJnYmFQYXJlbnQuZyAqIChyZ2JhTGF5ZXIuZyArIDEyOCkpIC8gMjU1XG5cbiAgICByZXN1bHQuYiA9IHJnYmFQYXJlbnQuYiA+IDEyOCA/IDI1NSAtICgoMjU1IC0gcmdiYVBhcmVudC5iKSAqICgyNTUgLSAocmdiYUxheWVyLmIgLSAxMjgpKSkgLyAyNTUgOiAocmdiYVBhcmVudC5iICogKHJnYmFMYXllci5iICsgMTI4KSkgLyAyNTVcblxuICAgIHJldHVybiByZXN1bHRcbiAgfSlcblxuICBCbGVuZGVyLnJlZ2lzdGVyKCdsaWdodGVuJywgKHJnYmFMYXllciwgcmdiYVBhcmVudCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICByOiByZ2JhUGFyZW50LnIgPiByZ2JhTGF5ZXIuciA/IHJnYmFQYXJlbnQuciA6IHJnYmFMYXllci5yLFxuICAgICAgZzogcmdiYVBhcmVudC5nID4gcmdiYUxheWVyLmcgPyByZ2JhUGFyZW50LmcgOiByZ2JhTGF5ZXIuZyxcbiAgICAgIGI6IHJnYmFQYXJlbnQuYiA+IHJnYmFMYXllci5iID8gcmdiYVBhcmVudC5iIDogcmdiYUxheWVyLmJcbiAgICB9XG4gIH0pXG5cbiAgQmxlbmRlci5yZWdpc3RlcignZGFya2VuJywgKHJnYmFMYXllciwgcmdiYVBhcmVudCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICByOiByZ2JhUGFyZW50LnIgPiByZ2JhTGF5ZXIuciA/IHJnYmFMYXllci5yIDogcmdiYVBhcmVudC5yLFxuICAgICAgZzogcmdiYVBhcmVudC5nID4gcmdiYUxheWVyLmcgPyByZ2JhTGF5ZXIuZyA6IHJnYmFQYXJlbnQuZyxcbiAgICAgIGI6IHJnYmFQYXJlbnQuYiA+IHJnYmFMYXllci5iID8gcmdiYUxheWVyLmIgOiByZ2JhUGFyZW50LmJcbiAgICB9XG4gIH0pXG59XG4iLCIvKipcbiAqIFRvbnMgb2YgY29sb3IgY29udmVyc2lvbiB1dGlsaXR5IGZ1bmN0aW9ucy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQ29udmVydFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb252ZXJ0IHtcbiAgLyoqXG4gICAqIENvbnZlcnRzIHRoZSBoZXggcmVwcmVzZW50YXRpb24gb2YgYSBjb2xvciB0byBSR0IgdmFsdWVzLlxuICAgKiBIZXggdmFsdWUgY2FuIG9wdGlvbmFsbHkgc3RhcnQgd2l0aCB0aGUgaGFzaCAoIykuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gaGV4IFRoZSBjb2xvcnMgaGV4IHZhbHVlXG4gICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gVGhlIFJHQiByZXByZXNlbnRhdGlvblxuICAgKiBAbWVtYmVyb2YgQ29udmVydFxuICAgKi9cbiAgc3RhdGljIGhleFRvUkdCIChoZXgpIHtcbiAgICBpZiAoaGV4LmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgICBoZXggPSBoZXguc3Vic3RyKDEpXG4gICAgfVxuICAgIGNvbnN0IHIgPSBwYXJzZUludChoZXguc3Vic3RyKDAsIDIpLCAxNilcbiAgICBjb25zdCBnID0gcGFyc2VJbnQoaGV4LnN1YnN0cigyLCAyKSwgMTYpXG4gICAgY29uc3QgYiA9IHBhcnNlSW50KGhleC5zdWJzdHIoNCwgMiksIDE2KVxuICAgIHJldHVybiB7IHIsIGcsIGIgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGFuIFJHQiBjb2xvciB0byBIU0wuXG4gICAqIEFzc3VtZXMgciwgZywgYW5kIGIgYXJlIGluIHRoZSBzZXQgWzAsIDI1NV0gYW5kXG4gICAqIHJldHVybnMgaCwgcywgYW5kIGwgaW4gdGhlIHNldCBbMCwgMV0uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gciBSZWQgY2hhbm5lbFxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBnIEdyZWVuIGNoYW5uZWxcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gYiBCbHVlIGNoYW5uZWxcbiAgICogQHJldHVybiB7IEFycmF5IH0gVGhlIEhTTCByZXByZXNlbnRhdGlvblxuICAgKiBAbWVtYmVyb2YgQ29udmVydFxuICAgKi9cbiAgc3RhdGljIHJnYlRvSFNMIChyLCBnLCBiKSB7XG4gICAgaWYgKHR5cGVvZiByID09PSAnb2JqZWN0Jykge1xuICAgICAgZyA9IHIuZ1xuICAgICAgYiA9IHIuYlxuICAgICAgciA9IHIuclxuICAgIH1cblxuICAgIHIgLz0gMjU1XG4gICAgZyAvPSAyNTVcbiAgICBiIC89IDI1NVxuXG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgociwgZywgYilcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKVxuICAgIGNvbnN0IGwgPSAobWF4ICsgbWluKSAvIDJcbiAgICBsZXQgaCwgc1xuICAgIGlmIChtYXggPT09IG1pbikge1xuICAgICAgaCA9IHMgPSAwXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGQgPSBtYXggLSBtaW5cbiAgICAgIHMgPSBsID4gMC41ID8gZCAvICgyIC0gbWF4IC0gbWluKSA6IGQgLyAobWF4ICsgbWluKVxuXG4gICAgICBpZiAobWF4ID09PSByKSB7XG4gICAgICAgIGggPSAoZyAtIGIpIC8gZCArIGcgPCBiID8gNiA6IDBcbiAgICAgIH0gZWxzZSBpZiAobWF4ID09PSBnKSB7XG4gICAgICAgIGggPSAoYiAtIHIpIC8gZCArIDJcbiAgICAgIH0gZWxzZSBpZiAobWF4ID09PSBiKSB7XG4gICAgICAgIGggPSAociAtIGcpIC8gZCArIDRcbiAgICAgIH1cblxuICAgICAgaCAvPSA2XG4gICAgfVxuICAgIHJldHVybiB7aCwgcywgbH1cbiAgfVxuXG4gIC8qKlxuICAgKiBvbnZlcnRzIGFuIEhTTCBjb2xvciB2YWx1ZSB0byBSR0IuIENvbnZlcnNpb24gZm9ybXVsYSBhZGFwdGVkIGZyb20gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9IU0xfY29sb3Jfc3BhY2UuXG4gICAqIEFzc3VtZXMgaCwgcywgYW5kIGwgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAxXSBhbmQgcmV0dXJucyByLCBnLCBhbmQgYiBpbiB0aGUgc2V0IFswLCAyNTVdLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IGggVGhlIGh1ZVxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBzIFRoZSBzYXR1cmF0aW9uXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IGwgVGhlIGxpZ2h0bmVzc1xuICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IFRoZSBSR0IgcmVwcmVzZW50YXRpb25cbiAgICogQG1lbWJlcm9mIENvbnZlcnRcbiAgICovXG4gIHN0YXRpYyBoc2xUb1JHQiAoaCwgcywgbCkge1xuICAgIGxldCByLCBnLCBiLCBwLCBxXG4gICAgaWYgKHR5cGVvZiBoID09PSAnb2JqZWN0Jykge1xuICAgICAgcyA9IGguc1xuICAgICAgbCA9IGgubFxuICAgICAgaCA9IGguaFxuICAgIH1cbiAgICBpZiAocyA9PT0gMCkge1xuICAgICAgciA9IGcgPSBiID0gbFxuICAgIH0gZWxzZSB7XG4gICAgICBxID0gbCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogc1xuICAgICAgcCA9IDIgKiBsIC0gcVxuXG4gICAgICByID0gdGhpcy5odWVUb1JHQihwLCBxLCBoICsgMSAvIDMpXG4gICAgICBnID0gdGhpcy5odWVUb1JHQihwLCBxLCBoKVxuICAgICAgYiA9IHRoaXMuaHVlVG9SR0IocCwgcSwgaCAtIDEgLyAzKVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgcjogciAqIDI1NSxcbiAgICAgIGc6IGcgKiAyNTUsXG4gICAgICBiOiBiICogMjU1XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGZyb20gdGhlIGh1ZSBjb2xvciBzcGFjZSBiYWNrIHRvIFJHQi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBwXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHFcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gdFxuICAgKiBAcmV0dXJucyB7IE51bWJlciB9IFJHQiB2YWx1ZVxuICAgKiBAbWVtYmVyb2YgQ29udmVydFxuICAgKi9cbiAgc3RhdGljIGh1ZVRvUkdCIChwLCBxLCB0KSB7XG4gICAgaWYgKHQgPCAwKSB7XG4gICAgICB0ICs9IDFcbiAgICB9XG4gICAgaWYgKHQgPiAxKSB7XG4gICAgICB0IC09IDFcbiAgICB9XG4gICAgaWYgKHQgPCAxIC8gNikge1xuICAgICAgcmV0dXJuIHAgKyAocSAtIHApICogNiAqIHRcbiAgICB9XG4gICAgaWYgKHQgPCAxIC8gMikge1xuICAgICAgcmV0dXJuIHFcbiAgICB9XG4gICAgaWYgKHQgPCAyIC8gMykge1xuICAgICAgcmV0dXJuIHAgKyAocSAtIHApICogKDIgLyAzIC0gdCkgKiA2XG4gICAgfVxuICAgIHJldHVybiBwXG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYW4gUkdCIGNvbG9yIHZhbHVlIHRvIEhTVi4gQ29udmVyc2lvbiBmb3JtdWxhIGFkYXB0ZWQgZnJvbSB7aHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9IU1ZfY29sb3Jfc3BhY2V9LlxuICAgKiBBc3N1bWVzIHIsIGcsIGFuZCBiIGFyZSBjb250YWluZWQgaW4gdGhlIHNldCBbMCwgMjU1XSBhbmQgcmV0dXJucyBoLCBzLCBhbmQgdiBpbiB0aGUgc2V0IFswLCAxXS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyp9IHIgVGhlIHJlZCBjb2xvciB2YWx1ZVxuICAgKiBAcGFyYW0geyp9IGcgVGhlIGdyZWVuIGNvbG9yIHZhbHVlXG4gICAqIEBwYXJhbSB7Kn0gYiBUaGUgYmx1ZSBjb2xvciB2YWx1ZVxuICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IFRoZSBIU1YgcmVwcmVzZW50YXRpb25cbiAgICogQG1lbWJlcm9mIENvbnZlcnRcbiAgICovXG4gIHN0YXRpYyByZ2JUb0hTViAociwgZywgYikge1xuICAgIHIgLz0gMjU1XG4gICAgZyAvPSAyNTVcbiAgICBiIC89IDI1NVxuXG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgociwgZywgYilcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKVxuICAgIGNvbnN0IHYgPSBtYXhcbiAgICBjb25zdCBkID0gbWF4IC0gbWluXG5cbiAgICBjb25zdCBzID0gbWF4ID09PSAwID8gMCA6IGQgLyBtYXhcbiAgICBsZXQgaFxuICAgIGlmIChtYXggPT09IG1pbikge1xuICAgICAgaCA9IDBcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG1heCA9PT0gcikge1xuICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyBnIDwgYiA/IDYgOiAwXG4gICAgICB9IGVsc2UgaWYgKG1heCA9PT0gZykge1xuICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyXG4gICAgICB9IGVsc2UgaWYgKG1heCA9PT0gYikge1xuICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0XG4gICAgICB9XG4gICAgICBoIC89IDZcbiAgICB9XG5cbiAgICByZXR1cm4ge2gsIHMsIHZ9XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYW4gSFNWIGNvbG9yIHZhbHVlIHRvIFJHQi4gQ29udmVyc2lvbiBmb3JtdWxhIGFkYXB0ZWQgZnJvbSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hTVl9jb2xvcl9zcGFjZS5cbiAgICogQXNzdW1lcyBoLCBzLCBhbmQgdiBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDFdIGFuZCByZXR1cm5zIHIsIGcsIGFuZCBiIGluIHRoZSBzZXQgWzAsIDI1NV0uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gaCBUaGUgaHVlXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHMgVGhlIHNhdHVyYXRpb25cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gdiBUaGUgdmFsdWVcbiAgICogQHJldHVybnMgeyBPYmplY3QgfSBUaGUgUkdCIHJlcHJlc2VudGF0aW9uXG4gICAqIEBtZW1iZXJvZiBDb252ZXJ0XG4gICAqL1xuICBzdGF0aWMgaHN2VG9SR0IgKGgsIHMsIHYpIHtcbiAgICBjb25zdCBpID0gTWF0aC5mbG9vcihoICogNilcbiAgICBjb25zdCBmID0gaCAqIDYgLSBpXG4gICAgY29uc3QgcCA9IHYgKiAoMSAtIHMpXG4gICAgY29uc3QgcSA9IHYgKiAoMSAtIGYgKiBzKVxuICAgIGNvbnN0IHQgPSB2ICogKDEgLSAoMSAtIGYpICogcylcblxuICAgIGxldCByLCBnLCBiXG4gICAgc3dpdGNoIChpICUgNikge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByID0gdlxuICAgICAgICBnID0gdFxuICAgICAgICBiID0gcFxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAxOlxuICAgICAgICByID0gcVxuICAgICAgICBnID0gdlxuICAgICAgICBiID0gcFxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyOlxuICAgICAgICByID0gcFxuICAgICAgICBnID0gdlxuICAgICAgICBiID0gdFxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAzOlxuICAgICAgICByID0gcFxuICAgICAgICBnID0gcVxuICAgICAgICBiID0gdlxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA0OlxuICAgICAgICByID0gdFxuICAgICAgICBnID0gcFxuICAgICAgICBiID0gdlxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA1OlxuICAgICAgICByID0gdlxuICAgICAgICBnID0gcFxuICAgICAgICBiID0gcVxuICAgICAgICBicmVha1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICByOiBNYXRoLmZsb29yKHIgKiAyNTUpLFxuICAgICAgZzogTWF0aC5mbG9vcihnICogMjU1KSxcbiAgICAgIGI6IE1hdGguZmxvb3IoYiAqIDI1NSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBSR0IgY29sb3IgdmFsdWUgdG8gdGhlIFhZWiBjb2xvciBzcGFjZS4gRm9ybXVsYXMgYXJlIGJhc2VkIG9uIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU1JHQiBhc3N1bWluZyB0aGF0IFJHQiB2YWx1ZXMgYXJlIHNSR0IuXG4gICAqIEFzc3VtZXMgciwgZywgYW5kIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdIGFuZCByZXR1cm5zIHgsIHksIGFuZCB6LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHIgVGhlIHJlZCBjb2xvciB2YWx1ZVxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBnIFRoZSBncmVlbiBjb2xvciB2YWx1ZVxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBiIFRoZSBibHVlIGNvbG9yIHZhbHVlXG4gICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gVGhlIFhZWiByZXByZXNlbnRhdGlvblxuICAgKiBAbWVtYmVyb2YgQ29udmVydFxuICAgKi9cbiAgc3RhdGljIHJnYlRvWFlaIChyLCBnLCBiKSB7XG4gICAgciAvPSAyNTVcbiAgICBnIC89IDI1NVxuICAgIGIgLz0gMjU1XG5cbiAgICBpZiAociA+IDAuMDQwNDUpIHtcbiAgICAgIHIgPSBNYXRoLnBvdygociArIDAuMDU1KSAvIDEuMDU1LCAyLjQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHIgLz0gMTIuOTJcbiAgICB9XG5cbiAgICBpZiAoZyA+IDAuMDQwNDUpIHtcbiAgICAgIGcgPSBNYXRoLnBvdygoZyArIDAuMDU1KSAvIDEuMDU1LCAyLjQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGcgLz0gMTIuOTJcbiAgICB9XG5cbiAgICBpZiAoYiA+IDAuMDQwNDUpIHtcbiAgICAgIGIgPSBNYXRoLnBvdygoYiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGIgLz0gMTIuOTJcbiAgICB9XG5cbiAgICBjb25zdCB4ID0gciAqIDAuNDEyNCArIGcgKiAwLjM1NzYgKyBiICogMC4xODA1XG4gICAgY29uc3QgeSA9IHIgKiAwLjIxMjYgKyBnICogMC43MTUyICsgYiAqIDAuMDcyMlxuICAgIGNvbnN0IHogPSByICogMC4wMTkzICsgZyAqIDAuMTE5MiArIGIgKiAwLjk1MDVcblxuICAgIHJldHVybiB7XG4gICAgICB4OiB4ICogMTAwLFxuICAgICAgeTogeSAqIDEwMCxcbiAgICAgIHo6IHogKiAxMDBcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBYWVogY29sb3IgdmFsdWUgdG8gdGhlIHNSR0IgY29sb3Igc3BhY2UuIEZvcm11bGFzIGFyZSBiYXNlZCBvbiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NSR0IgYW5kIHRoZSByZXN1bHRpbmcgUkdCIHZhbHVlIHdpbGwgYmUgaW4gdGhlIHNSR0IgY29sb3Igc3BhY2UuXG4gICAqIEFzc3VtZXMgeCwgeSBhbmQgeiB2YWx1ZXMgYXJlIHdoYXRldmVyIHRoZXkgYXJlIGFuZCByZXR1cm5zIHIsIGcgYW5kIGIgaW4gdGhlIHNldCBbMCwgMjU1XS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB4IFRoZSBYIHZhbHVlXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHkgVGhlIFkgdmFsdWVcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0geiBUaGUgWiB2YWx1ZVxuICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IFRoZSBSR0IgcmVwcmVzZW50YXRpb25cbiAgICogQG1lbWJlcm9mIENvbnZlcnRcbiAgICovXG4gIHN0YXRpYyB4eXpUb1JHQiAoeCwgeSwgeikge1xuICAgIHggLz0gMTAwXG4gICAgeSAvPSAxMDBcbiAgICB6IC89IDEwMFxuXG4gICAgbGV0IHIgPSAoMy4yNDA2ICogeCkgKyAoLTEuNTM3MiAqIHkpICsgKC0wLjQ5ODYgKiB6KVxuICAgIGxldCBnID0gKC0wLjk2ODkgKiB4KSArICgxLjg3NTggKiB5KSArICgwLjA0MTUgKiB6KVxuICAgIGxldCBiID0gKDAuMDU1NyAqIHgpICsgKC0wLjIwNDAgKiB5KSArICgxLjA1NzAgKiB6KVxuXG4gICAgaWYgKHIgPiAwLjAwMzEzMDgpIHtcbiAgICAgIHIgPSAoMS4wNTUgKiBNYXRoLnBvdyhyLCAwLjQxNjY2NjY2NjcpKSAtIDAuMDU1XG4gICAgfSBlbHNlIHtcbiAgICAgIHIgKj0gMTIuOTJcbiAgICB9XG5cbiAgICBpZiAoZyA+IDAuMDAzMTMwOCkge1xuICAgICAgZyA9ICgxLjA1NSAqIE1hdGgucG93KGcsIDAuNDE2NjY2NjY2NykpIC0gMC4wNTVcbiAgICB9IGVsc2Uge1xuICAgICAgZyAqPSAxMi45MlxuICAgIH1cblxuICAgIGlmIChiID4gMC4wMDMxMzA4KSB7XG4gICAgICBiID0gKDEuMDU1ICogTWF0aC5wb3coYiwgMC40MTY2NjY2NjY3KSkgLSAwLjA1NVxuICAgIH0gZWxzZSB7XG4gICAgICBiICo9IDEyLjkyXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHIgKiAyNTUsXG4gICAgICBnOiBnICogMjU1LFxuICAgICAgYjogYiAqIDI1NVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIFhZWiBjb2xvciB2YWx1ZSB0byB0aGUgQ0lFTEFCIGNvbG9yIHNwYWNlLiBGb3JtdWxhcyBhcmUgYmFzZWQgb24gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MYWJfY29sb3Jfc3BhY2UgVGhlIHJlZmVyZW5jZSB3aGl0ZSBwb2ludCB1c2VkIGluIHRoZSBjb252ZXJzaW9uIGlzIEQ2NS5cbiAgICogQXNzdW1lcyB4LCB5IGFuZCB6IHZhbHVlcyBhcmUgd2hhdGV2ZXIgdGhleSBhcmUgYW5kIHJldHVybnMgTCosIGEqIGFuZCBiKiB2YWx1ZXNcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB4IFRoZSBYIHZhbHVlXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHkgVGhlIFkgdmFsdWVcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0geiBUaGUgWiB2YWx1ZVxuICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IFRoZSBMYWIgcmVwcmVzZW50YXRpb25cbiAgICogQG1lbWJlcm9mIENvbnZlcnRcbiAgICovXG4gIHN0YXRpYyB4eXpUb0xhYiAoeCwgeSwgeikge1xuICAgIGlmICh0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHkgPSB4LnlcbiAgICAgIHogPSB4LnpcbiAgICAgIHggPSB4LnhcbiAgICB9XG5cbiAgICBjb25zdCB3aGl0ZVggPSA5NS4wNDdcbiAgICBjb25zdCB3aGl0ZVkgPSAxMDAuMFxuICAgIGNvbnN0IHdoaXRlWiA9IDEwOC44ODNcblxuICAgIHggLz0gd2hpdGVYXG4gICAgeSAvPSB3aGl0ZVlcbiAgICB6IC89IHdoaXRlWlxuXG4gICAgaWYgKHggPiAwLjAwODg1NjQ1MTY3OSkge1xuICAgICAgeCA9IE1hdGgucG93KHgsIDAuMzMzMzMzMzMzMylcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9ICg3Ljc4NzAzNzAzNyAqIHgpICsgMC4xMzc5MzEwMzQ1XG4gICAgfVxuXG4gICAgaWYgKHkgPiAwLjAwODg1NjQ1MTY3OSkge1xuICAgICAgeSA9IE1hdGgucG93KHksIDAuMzMzMzMzMzMzMylcbiAgICB9IGVsc2Uge1xuICAgICAgeSA9ICg3Ljc4NzAzNzAzNyAqIHkpICsgMC4xMzc5MzEwMzQ1XG4gICAgfVxuXG4gICAgaWYgKHogPiAwLjAwODg1NjQ1MTY3OSkge1xuICAgICAgeiA9IE1hdGgucG93KHosIDAuMzMzMzMzMzMzMylcbiAgICB9IGVsc2Uge1xuICAgICAgeiA9ICg3Ljc4NzAzNzAzNyAqIHopICsgMC4xMzc5MzEwMzQ1XG4gICAgfVxuXG4gICAgY29uc3QgbCA9IDExNiAqIHkgLSAxNlxuICAgIGNvbnN0IGEgPSA1MDAgKiAoeCAtIHkpXG4gICAgY29uc3QgYiA9IDIwMCAqICh5IC0geilcblxuICAgIHJldHVybiB7IGwsIGEsIGIgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgTCosIGEqLCBiKiBjb2xvciB2YWx1ZXMgZnJvbSB0aGUgQ0lFTEFCIGNvbG9yIHNwYWNlIHRvIHRoZSBYWVogY29sb3Igc3BhY2UuIEZvcm11bGFzIGFyZSBiYXNlZCBvbiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xhYl9jb2xvcl9zcGFjZSBUaGUgcmVmZXJlbmNlIHdoaXRlIHBvaW50IHVzZWQgaW4gdGhlIGNvbnZlcnNpb24gaXMgRDY1LlxuICAgKiBBc3N1bWVzIEwqLCBhKiBhbmQgYiogdmFsdWVzIGFyZSB3aGF0ZXZlciB0aGV5IGFyZSBhbmQgcmV0dXJucyB4LCB5IGFuZCB6IHZhbHVlcy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyp9IGwgVGhlIEwqIHZhbHVlXG4gICAqIEBwYXJhbSB7Kn0gYSBUaGUgYSogdmFsdWVcbiAgICogQHBhcmFtIHsqfSBiIFRoZSBiKiB2YWx1ZVxuICAgKiBAcmV0dXJucyAgeyBPYmplY3QgfSBUaGUgWFlaIHJlcHJlc2VudGF0aW9uXG4gICAqIEBtZW1iZXJvZiBDb252ZXJ0XG4gICAqL1xuICBzdGF0aWMgbGFiVG9YWVogKGwsIGEsIGIpIHtcbiAgICBpZiAodHlwZW9mIGwgPT09ICdvYmplY3QnKSB7XG4gICAgICBhID0gbC5hXG4gICAgICBiID0gbC5iXG4gICAgICBsID0gbC5sXG4gICAgfVxuXG4gICAgbGV0IHkgPSAobCArIDE2KSAvIDExNlxuICAgIGxldCB4ID0geSArIChhIC8gNTAwKVxuICAgIGxldCB6ID0geSAtIChiIC8gMjAwKVxuXG4gICAgaWYgKHggPiAwLjIwNjg5NjU1MTcpIHtcbiAgICAgIHggPSB4ICogeCAqIHhcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IDAuMTI4NDE4NTQ5MyAqICh4IC0gMC4xMzc5MzEwMzQ1KVxuICAgIH1cbiAgICBpZiAoeSA+IDAuMjA2ODk2NTUxNykge1xuICAgICAgeSA9IHkgKiB5ICogeVxuICAgIH0gZWxzZSB7XG4gICAgICB5ID0gMC4xMjg0MTg1NDkzICogKHkgLSAwLjEzNzkzMTAzNDUpXG4gICAgfVxuICAgIGlmICh6ID4gMC4yMDY4OTY1NTE3KSB7XG4gICAgICB6ID0geiAqIHogKiB6XG4gICAgfSBlbHNlIHtcbiAgICAgIHogPSAwLjEyODQxODU0OTMgKiAoeiAtIDAuMTM3OTMxMDM0NSlcbiAgICB9XG5cbiAgICAvLyBENjUgcmVmZXJlbmNlIHdoaXRlIHBvaW50XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHggKiA5NS4wNDcsXG4gICAgICB5OiB5ICogMTAwLjAsXG4gICAgICB6OiB6ICogMTA4Ljg4M1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBMKiwgYSosIGIqIGJhY2sgdG8gUkdCIHZhbHVlcy5cbiAgICogQHNlZSBDb252ZXJ0LnJnYlRvWFlaXG4gICAqIEBzZWUgQ29udmVydC54eXpUb0xhYlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7Kn0gciBUaGUgcmVkIGNvbG9yIHZhbHVlXG4gICAqIEBwYXJhbSB7Kn0gZyBUaGUgZ3JlZW4gY29sb3IgdmFsdWVcbiAgICogQHBhcmFtIHsqfSBiIFRoZSBibHVlIGNvbG9yIHZhbHVlXG4gICAqIEBtZW1iZXJvZiBDb252ZXJ0XG4gICAqL1xuICBzdGF0aWMgcmdiVG9MYWIgKHIsIGcsIGIpIHtcbiAgICBpZiAodHlwZW9mIHIgPT09ICdvYmplY3QnKSB7XG4gICAgICBnID0gci5nXG4gICAgICBiID0gci5iXG4gICAgICByID0gci5yXG4gICAgfVxuXG4gICAgY29uc3QgeHl6ID0gdGhpcy5yZ2JUb1hZWihyLCBnLCBiKVxuICAgIHJldHVybiB0aGlzLnh5elRvTGFiKHh5eilcbiAgfVxufVxuIiwiLyoqXG4gKiBWYXJpb3VzIG1hdGgtaGVhdnkgaGVscGVycyB0aGF0IGFyZSB1c2VkIHRocm91Z2hvdXQgQ2FtYW5KUy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQ2FsY3VsYXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGN1bGF0ZSB7XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBwb2ludHMuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0geDEgMXN0IHBvaW50IHgtY29vcmRpbmF0ZS5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0geTEgMXN0IHBvaW50IHktY29vcmRpbmF0ZS5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0geDIgMm5kIHBvaW50IHgtY29vcmRpbmF0ZS5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0geTIgMm5kIHBvaW50IHktY29vcmRpbmF0ZS5cbiAgICogQHJldHVybnMgeyBOdW1iZXIgfSBUaGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgdHdvIHBvaW50cy5cbiAgICogQG1lbWJlcm9mIENhbGN1bGF0ZVxuICAgKi9cbiAgc3RhdGljIGRpc3RhbmNlICh4MSwgeTEsIHgyLCB5Mikge1xuICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coeDIgLSB4MSwgMikgKyBNYXRoLnBvdyh5MiAtIHkxLCAyKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBwc2V1ZG9yYW5kb20gbnVtYmVyIHRoYXQgbGllcyB3aXRoaW4gdGhlIG1heCAtIG1peCByYW5nZS4gVGhlIG51bWJlciBjYW4gYmUgZWl0aGVyIGFuIGludGVnZXIgb3IgYSBmbG9hdCBkZXBlbmRpbmcgb24gd2hhdCB0aGUgdXNlciBzcGVjaWZpZXMuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gbWluIFRoZSBsb3dlciBib3VuZCAoaW5jbHVzaXZlKS5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gbWF4IFRoZSB1cHBlciBib3VuZCAoaW5jbHVzaXZlKS5cbiAgICogQHBhcmFtIHsgQm9vbGVhbiB9IGdldEZsb2F0IFJldHVybiBhIEZsb2F0IG9yIGEgcm91bmRlZCBJbnRlZ2VyP1xuICAgKiBAcmV0dXJucyB7IE51bWJlciB9IFRoZSBwc2V1ZG9yYW5kb20gbnVtYmVyLCBlaXRoZXIgYXMgYSBmbG9hdCBvciBpbnRlZ2VyLlxuICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRlXG4gICAqL1xuICBzdGF0aWMgcmFuZG9tUmFuZ2UgKG1pbiwgbWF4LCBnZXRGbG9hdCA9IGZhbHNlKSB7XG4gICAgY29uc3QgcmFuZCA9IG1pbiArIChNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpXG4gICAgaWYgKGdldEZsb2F0KSB7XG4gICAgICByZXR1cm4gcmFuZC50b0ZpeGVkKGdldEZsb2F0KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChyYW5kKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBsdW1pbmFuY2Ugb2YgYSBzaW5nbGUgcGl4ZWwgdXNpbmcgYSBzcGVjaWFsIHdlaWdodGVkIHN1bS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBPYmplY3QgfSByZ2JhIFJHQkEgb2JqZWN0IGRlc2NyaWJpbmcgYSBzaW5nbGUgcGl4ZWwuXG4gICAqIEByZXR1cm5zIHsgTnVtYmVyIH0gVGhlIGx1bWluYW5jZSB2YWx1ZSBvZiB0aGUgcGl4ZWwuXG4gICAqIEBtZW1iZXJvZiBDYWxjdWxhdGVcbiAgICovXG4gIHN0YXRpYyBsdW1pbmFuY2UgKHJnYmEpIHtcbiAgICByZXR1cm4gKDAuMjk5ICogcmdiYS5yKSArICgwLjU4NyAqIHJnYmEuZykgKyAoMC4xMTQgKiByZ2JhLmIpXG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgYmV6aWVyIGN1cnZlIGdpdmVuIGEgc3RhcnQgYW5kIGVuZCBwb2ludCwgd2l0aCBjb250cm9sIHBvaW50cyBpbiBiZXR3ZWVuLlxuICAgKiBDYW4gYWxzbyBvcHRpb25hbGx5IGJvdW5kIHRoZSB5IHZhbHVlcyBiZXR3ZWVuIGEgbG93IGFuZCBoaWdoIGJvdW5kLlxuICAgKiBUaGlzIGlzIGRpZmZlcmVudCB0aGFuIG1vc3QgYmV6aWVyIGN1cnZlIGZ1bmN0aW9ucyBiZWNhdXNlIGl0IGF0dGVtcHRzIHRvIGNvbnN0cnVjdCBpdCBpbiBzdWNoIGEgd2F5IHRoYXQgd2UgY2FuIHVzZSBpdCBtb3JlIGxpa2UgYSBzaW1wbGUgaW5wdXQgLT4gb3V0cHV0IHN5c3RlbSwgb3IgYSBvbmUtdG8tb25lIGZ1bmN0aW9uLlxuICAgKiBJbiBvdGhlciB3b3JkcyB3ZSBjYW4gcHJvdmlkZSBhbiBpbnB1dCBjb2xvciB2YWx1ZSwgYW5kIGltbWVkaWF0ZWx5IHJlY2VpdmUgYW4gb3V0cHV0IG1vZGlmaWVkIGNvbG9yIHZhbHVlLlxuICAgKiBOb3RlIHRoYXQsIGJ5IGRlc2lnbiwgdGhpcyBkb2VzIG5vdCBmb3JjZSBYIHZhbHVlcyB0byBiZSBpbiB0aGUgcmFuZ2UgWzAuLjI1NV0uIFRoaXMgaXMgdG8gZ2VuZXJhbGl6ZSB0aGUgZnVuY3Rpb24gYSBiaXQgbW9yZS4gSWYgeW91IGdpdmUgaXQgYSBzdGFydGluZyBYIHZhbHVlIHRoYXQgaXNuJ3QgMCwgYW5kL29yIGEgZW5kaW5nIFggdmFsdWUgdGhhdCBpc24ndCAyNTUsIHlvdSBtYXkgcnVuIGludG8gcHJvYmxlbXMgd2l0aCB5b3VyIGZpbHRlciFcbiAgICpcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBBcnJheSB9IGNvbnRyb2xQb2ludHMgMi1pdGVtIGFycmF5cyBkZXNjcmliaW5nIHRoZSB4LCB5IGNvb3JkaW5hdGVzIG9mIHRoZSBjb250cm9sIHBvaW50cy4gTWluaW11bSB0d28uXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IFtsb3dCb3VuZD0wXSBNaW5pbXVtIHBvc3NpYmxlIHZhbHVlIGZvciBhbnkgeS12YWx1ZSBpbiB0aGUgY3VydmUuXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IFtoaWdoQm91bmQ9MjU1XSBNYXhpbXVtIHBvc3NpYmxlIHZhbHVlIGZvciBhbnkgeS12YWx1ZSBpbiB0aGUgY3VydmUuXG4gICAqIEByZXR1cm5zIHsgQXJyYXkgfSBBcnJheSB3aG9zZSBpbmRleCByZXByZXNlbnRzIGV2ZXJ5IHgtdmFsdWUgYmV0d2VlbiBzdGFydCBhbmQgZW5kLCBhbmQgdmFsdWUgcmVwcmVzZW50cyB0aGUgY29ycmVzcG9uZGluZyB5LXZhbHVlLlxuICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRlXG4gICAqL1xuICBzdGF0aWMgYmV6aWVyIChjb250cm9sUG9pbnRzLCBsb3dCb3VuZCA9IDAsIGhpZ2hCb3VuZCA9IDI1NSkge1xuICAgIGlmIChjb250cm9sUG9pbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBudW1iZXIgb2YgYXJndW1lbnRzIHRvIGJlemllcicpXG4gICAgfVxuXG4gICAgbGV0IGJlemllciA9IHt9XG4gICAgY29uc3QgbGVycCA9IChhLCBiLCB0KSA9PiBhICogKDEgLSB0KSArIGIgKiB0XG4gICAgY29uc3QgY2xhbXAgPSAoYSwgbWluLCBtYXgpID0+IE1hdGgubWluKE1hdGgubWF4KGEsIG1pbiksIG1heClcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwMDsgaSsrKSB7XG4gICAgICBsZXQgdCA9IGkgLyAxMDAwXG4gICAgICBsZXQgcHJldiA9IGNvbnRyb2xQb2ludHNcblxuICAgICAgd2hpbGUgKHByZXYubGVuZ3RoID4gMSkge1xuICAgICAgICBjb25zdCBuZXh0ID0gW11cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gcHJldi5sZW5ndGggLSAyOyBqKyspIHtcbiAgICAgICAgICBuZXh0LnB1c2goW1xuICAgICAgICAgICAgbGVycChwcmV2W2pdWzBdLCBwcmV2W2ogKyAxXVswXSwgdCksXG4gICAgICAgICAgICBsZXJwKHByZXZbal1bMV0sIHByZXZbaiArIDFdWzFdLCB0KVxuICAgICAgICAgIF0pXG4gICAgICAgIH1cbiAgICAgICAgcHJldiA9IG5leHRcbiAgICAgIH1cblxuICAgICAgYmV6aWVyW01hdGgucm91bmQocHJldlswXVswXSldID0gTWF0aC5yb3VuZChjbGFtcChwcmV2WzBdWzFdLCBsb3dCb3VuZCwgaGlnaEJvdW5kKSlcbiAgICB9XG5cbiAgICBjb25zdCBlbmRYID0gY29udHJvbFBvaW50c1tjb250cm9sUG9pbnRzLmxlbmd0aCAtIDFdWzBdXG4gICAgYmV6aWVyID0gQ2FsY3VsYXRlLm1pc3NpbmdWYWx1ZXMoYmV6aWVyLCBlbmRYKVxuXG4gICAgLy8gRWRnZSBjYXNlXG4gICAgaWYgKCFiZXppZXJbZW5kWF0pIHtcbiAgICAgIGJlemllcltlbmRYXSA9IGJlemllcltlbmRYIC0gMV1cbiAgICB9XG5cbiAgICByZXR1cm4gYmV6aWVyXG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyBwb3NzaWJsZSBtaXNzaW5nIHZhbHVlcyBmcm9tIGEgZ2l2ZW4gdmFsdWUgYXJyYXkuIE5vdGUgdGhhdCB0aGlzIHJldHVybnMgYSBjb3B5IGFuZCBkb2VzIG5vdCBtdXRhdGUgdGhlIG9yaWdpbmFsLiBJbiBjYXNlIG5vIHZhbHVlcyBhcmUgbWlzc2luZyB0aGUgb3JpZ2luYWwgYXJyYXkgaXMgcmV0dXJuZWQgYXMgdGhhdCBpcyBjb252ZW5pZW50LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IEFycmF5IH0gMi1pdGVtIGFycmF5cyBkZXNjcmliaW5nIHRoZSB4LCB5IGNvb3JkaW5hdGVzIG9mIHRoZSBjb250cm9sIHBvaW50cy5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gZW5kIHggdmFsdWUgb2YgdGhlIGFycmF5IChtYXhpbXVtKVxuICAgKiBAcmV0dXJuIHsgQXJyYXkgfSBBcnJheSB3aG9zZSBpbmRleCByZXByZXNlbnRzIGV2ZXJ5IHgtdmFsdWUgYmV0d2VlbiBzdGFydCBhbmQgZW5kLCBhbmQgdmFsdWUgcmVwcmVzZW50cyB0aGUgY29ycmVzcG9uZGluZyB5LXZhbHVlLlxuICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRlXG4gICAqL1xuICBzdGF0aWMgbWlzc2luZ1ZhbHVlcyAodmFsdWVzLCBlbmRYKSB7XG4gICAgLy8gRG8gYSBzZWFyY2ggZm9yIG1pc3NpbmcgdmFsdWVzIGluIHRoZSBiZXppZXIgYXJyYXkgYW5kIHVzZSBsaW5lYXJcbiAgICAvLyBpbnRlcnBvbGF0aW9uIHRvIGFwcHJveGltYXRlIHRoZWlyIHZhbHVlc1xuICAgIGlmIChPYmplY3Qua2V5cyh2YWx1ZXMpLmxlbmd0aCA8IGVuZFggKyAxKSB7XG4gICAgICBjb25zdCByZXQgPSB7fVxuICAgICAgbGV0IGxlZnRDb29yZCwgcmlnaHRDb29yZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gZW5kWDsgaSsrKSB7XG4gICAgICAgIGlmICh2YWx1ZXNbaV0pIHtcbiAgICAgICAgICByZXRbaV0gPSB2YWx1ZXNbaV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZWZ0Q29vcmQgPSBbaSAtIDEsIHJldFtpIC0gMV1dXG4gICAgICAgICAgLy8gRmluZCB0aGUgZmlyc3QgdmFsdWUgdG8gdGhlIHJpZ2h0LiBJZGVhbGx5IHRoaXMgbG9vcCB3aWxsIGJyZWFrXG4gICAgICAgICAgLy8gdmVyeSBxdWlja2x5LlxuICAgICAgICAgIGZvciAobGV0IGogPSBpOyBqIDw9IGVuZFg7IGorKykge1xuICAgICAgICAgICAgaWYgKHZhbHVlc1tqXSkge1xuICAgICAgICAgICAgICByaWdodENvb3JkID0gW2osIHZhbHVlc1tqXV1cbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0W2ldID0gbGVmdENvb3JkWzFdICsgKChyaWdodENvb3JkWzFdIC0gbGVmdENvb3JkWzFdKSAvIChyaWdodENvb3JkWzBdIC0gbGVmdENvb3JkWzBdKSkgKiAoaSAtIGxlZnRDb29yZFswXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJldFxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzXG4gIH1cbn1cbiIsIi8vIFRoZSBmaWx0ZXJzIGRlZmluZSBhbGwgb2YgdGhlIGJ1aWx0LWluIGZ1bmN0aW9uYWxpdHkgdGhhdCBjb21lcyB3aXRoIENhbWFuIChhcyBvcHBvc2VkIHRvIGJlaW5nICBwcm92aWRlZCBieSBhIHBsdWdpbikuIEFsbCBvZiB0aGVzZSBmaWx0ZXJzIGFyZSByYXRoZXJiYXNpYywgYnV0IGFyZSBleHRyZW1lbHkgcG93ZXJmdWwgd2hlbiBtYW55IGFyZSBjb21iaW5lZC4gRm9yIGluZm9ybWF0aW9uIG9uIGNyZWF0aW5nIHBsdWdpbnMsIGNoZWNrIG91dCB0aGUgW1BsdWdpbiBDcmVhdGlvbl0oaHR0cDovL2NhbWFuanMuY29tL2RvY3MvcGx1Z2luLWNyZWF0aW9uKSBwYWdlLCBhbmQgZm9yIGluZm9ybWF0aW9uIG9uIHVzaW5nIHRoZSBwbHVnaW5zLCBjaGVjayBvdXQgdGhlIFtCdWlsdC1JbiBGdW5jdGlvbmFsaXR5KGh0dHA6Ly9jYW1hbmpzLmNvbS9kb2NzL2J1aWx0LWluKSBwYWdlLlxuXG5pbXBvcnQgQ29udmVydCBmcm9tICcuLi9jb3JlL2NvbnZlcnQnXG5pbXBvcnQgQ2FsY3VsYXRlIGZyb20gJy4uL2NvcmUvY2FsY3VsYXRlJ1xuXG4vKipcbiAqXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsqfSBGaWx0ZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVnaXN0ZXJGaWx0ZXIgKEZpbHRlcikge1xuICAvKlxuICAqIEZpbGwgQ29sb3JcbiAgKiBGaWxscyB0aGUgY2FudmFzIHdpdGggYSBzaW5nbGUgc29saWQgY29sb3IuXG4gICogQXJndW1lbnRzOiBDYW4gdGFrZSBlaXRoZXIgc2VwYXJhdGUgUiwgRywgYW5kIEIgdmFsdWVzIGFzIGFyZ3VtZW50cywgb3IgYSBzaW5nbGUgaGV4IGNvbG9yIHZhbHVlLlxuICAqL1xuICBGaWx0ZXIucmVnaXN0ZXIoJ2ZpbGxDb2xvcicsIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgbGV0IGNvbG9yXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb2xvciA9IENvbnZlcnQuaGV4VG9SR0IoYXJnc1swXSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29sb3IgPSB7XG4gICAgICAgIHI6IGFyZ3NbMF0sXG4gICAgICAgIGc6IGFyZ3NbMV0sXG4gICAgICAgIGI6IGFyZ3NbMl1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvY2VzcygnZmlsbENvbG9yJywgKHJnYmEpID0+IHtcbiAgICAgIHJnYmEuciA9IGNvbG9yLnJcbiAgICAgIHJnYmEuZyA9IGNvbG9yLmdcbiAgICAgIHJnYmEuYiA9IGNvbG9yLmJcbiAgICAgIHJnYmEuYSA9IDI1NVxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogQnJpZ2h0bmVzc1xuICAqIFNpbXBsZSBicmlnaHRuZXNzIGFkanVzdG1lbnQuXG4gICogQXJndW1lbnRzOiBSYW5nZSBpcyAtMTAwIHRvIDEwMC4gVmFsdWVzIDwgMCB3aWxsIGRhcmtlbiBpbWFnZSB3aGlsZSB2YWx1ZXMgPiAwIHdpbGwgYnJpZ2h0ZW4uXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignYnJpZ2h0bmVzcycsIGZ1bmN0aW9uIChhZGp1c3QpIHtcbiAgICBhZGp1c3QgPSBNYXRoLmZsb29yKDI1NSAqIChhZGp1c3QgLyAxMDApKVxuICAgIHJldHVybiB0aGlzLnByb2Nlc3MoJ2JyaWdodG5lc3MnLCAocmdiYSkgPT4ge1xuICAgICAgcmdiYS5yICs9IGFkanVzdFxuICAgICAgcmdiYS5nICs9IGFkanVzdFxuICAgICAgcmdiYS5iICs9IGFkanVzdFxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogU2F0dXJhdGlvblxuICAqIEFkanVzdHMgdGhlIGNvbG9yIHNhdHVyYXRpb24gb2YgdGhlIGltYWdlLlxuICAqIEFyZ3VtZW50czogUmFuZ2UgaXMgLTEwMCB0byAxMDAuIFZhbHVlcyA8IDAgd2lsbCBkZXNhdHVyYXRlIHRoZSBpbWFnZSB3aGlsZSB2YWx1ZXMgPiAwIHdpbGwgc2F0dXJhdGUgaXQuXG4gICogSWYgeW91IHdhbnQgdG8gY29tcGxldGVseSBkZXNhdHVyYXRlIHRoZSBpbWFnZSwgdXNpbmcgdGhlIGdyZXlzY2FsZSBmaWx0ZXIgaXMgaGlnaGx5IHJlY29tbWVuZGVkIGJlY2F1c2UgaXQgd2lsbCB5aWVsZCBiZXR0ZXIgcmVzdWx0cy5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdzYXR1cmF0aW9uJywgZnVuY3Rpb24gKGFkanVzdCkge1xuICAgIGFkanVzdCAqPSAtMC4wMVxuICAgIHJldHVybiB0aGlzLnByb2Nlc3MoJ3NhdHVyYXRpb24nLCAocmdiYSkgPT4ge1xuICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgocmdiYS5yLCByZ2JhLmcsIHJnYmEuYilcblxuICAgICAgaWYgKHJnYmEuciAhPT0gbWF4KSB7XG4gICAgICAgIHJnYmEuciArPSAobWF4IC0gcmdiYS5yKSAqIGFkanVzdFxuICAgICAgfVxuICAgICAgaWYgKHJnYmEuZyAhPT0gbWF4KSB7XG4gICAgICAgIHJnYmEuZyArPSAobWF4IC0gcmdiYS5nKSAqIGFkanVzdFxuICAgICAgfVxuICAgICAgaWYgKHJnYmEuYiAhPT0gbWF4KSB7XG4gICAgICAgIHJnYmEuYiArPSAobWF4IC0gcmdiYS5iKSAqIGFkanVzdFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBWaWJyYW5jZVxuICAqIFNpbWlsYXIgdG8gc2F0dXJhdGlvbiwgYnV0IGFkanVzdHMgdGhlIHNhdHVyYXRpb24gbGV2ZWxzIGluIGEgc2xpZ2h0bHkgc21hcnRlciwgbW9yZSBzdWJ0bGUgd2F5LlxuICAqIFZpYnJhbmNlIHdpbGwgYXR0ZW1wdCB0byBib29zdCBjb2xvcnMgdGhhdCBhcmUgbGVzcyBzYXR1cmF0ZWQgbW9yZSBhbmQgYm9vc3QgYWxyZWFkeSBzYXR1cmF0ZWQgY29sb3JzIGxlc3MsIHdoaWxlIHNhdHVyYXRpb24gYm9vc3RzIGFsbCBjb2xvcnMgYnkgdGhlIHNhbWUgbGV2ZWwuXG4gICogQXJndW1lbnRzOiBSYW5nZSBpcyAtMTAwIHRvIDEwMC4gVmFsdWVzIDwgMCB3aWxsIGRlc2F0dXJhdGUgdGhlIGltYWdlIHdoaWxlIHZhbHVlcyA+IDAgd2lsbCBzYXR1cmF0ZSBpdC5cbiAgKiBJZiB5b3Ugd2FudCB0byBjb21wbGV0ZWx5IGRlc2F0dXJhdGUgdGhlIGltYWdlLCB1c2luZyB0aGUgZ3JleXNjYWxlIGZpbHRlciBpcyBoaWdobHkgcmVjb21tZW5kZWQgYmVjYXVzZSBpdCB3aWxsIHlpZWxkIGJldHRlciByZXN1bHRzLlxuICAqL1xuICBGaWx0ZXIucmVnaXN0ZXIoJ3ZpYnJhbmNlJywgZnVuY3Rpb24gKGFkanVzdCkge1xuICAgIGFkanVzdCAqPSAtMVxuICAgIHJldHVybiB0aGlzLnByb2Nlc3MoJ3ZpYnJhbmNlJywgKHJnYmEpID0+IHtcbiAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KHJnYmEuciwgcmdiYS5nLCByZ2JhLmIpXG4gICAgICBjb25zdCBhdmcgPSAocmdiYS5yICsgcmdiYS5nICsgcmdiYS5iKSAvIDNcbiAgICAgIGNvbnN0IGFtdCA9ICgoTWF0aC5hYnMobWF4IC0gYXZnKSAqIDIgLyAyNTUpICogYWRqdXN0KSAvIDEwMFxuXG4gICAgICBpZiAocmdiYS5yICE9PSBtYXgpIHtcbiAgICAgICAgcmdiYS5yICs9IChtYXggLSByZ2JhLnIpICogYW10XG4gICAgICB9XG4gICAgICBpZiAocmdiYS5nICE9PSBtYXgpIHtcbiAgICAgICAgcmdiYS5nICs9IChtYXggLSByZ2JhLmcpICogYW10XG4gICAgICB9XG4gICAgICBpZiAocmdiYS5iICE9PSBtYXgpIHtcbiAgICAgICAgcmdiYS5iICs9IChtYXggLSByZ2JhLmIpICogYW10XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIEdyZXlzY2FsZVxuICAqIEFuIGltcHJvdmVkIGdyZXlzY2FsZSBmdW5jdGlvbiB0aGF0IHNob3VsZCBtYWtlIHByZXR0aWVyIHJlc3VsdHMgdGhhbiBzaW1wbHkgdXNpbmcgdGhlIHNhdHVyYXRpb24gZmlsdGVyIHRvIHJlbW92ZSBjb2xvci4gSXQgZG9lcyBzbyBieSB1c2luZyBmYWN0b3JzIHRoYXQgZGlyZWN0bHkgcmVsYXRlIHRvIGhvdyB0aGUgaHVtYW4gZXllIHBlcmNldmVzIGNvbG9yIGFuZCB2YWx1ZXMuIFRoZXJlIGFyZSBubyBhcmd1bWVudHMsIGl0IHNpbXBseSBtYWtlcyB0aGUgaW1hZ2UgZ3JleXNjYWxlIHdpdGggbm8gaW4tYmV0d2Vlbi5cbiAgKiBBbGdvcml0aG0gYWRvcHRlZCBmcm9tIGh0dHA6Ly93d3cucGhwaWVkLmNvbS9pbWFnZS1mdW4vXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignZ3JleXNjYWxlJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnByb2Nlc3MoJ2dyZXlzY2FsZScsIChyZ2JhKSA9PiB7XG4gICAgICBjb25zdCBhdmcgPSBDYWxjdWxhdGUubHVtaW5hbmNlKHJnYmEpXG4gICAgICByZ2JhLnIgPSBhdmdcbiAgICAgIHJnYmEuZyA9IGF2Z1xuICAgICAgcmdiYS5iID0gYXZnXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBDb250cmFzdFxuICAqIEluY3JlYXNlcyBvciBkZWNyZWFzZXMgdGhlIGNvbG9yIGNvbnRyYXN0IG9mIHRoZSBpbWFnZS5cbiAgKiBBcmd1bWVudHM6IFJhbmdlIGlzIC0xMDAgdG8gMTAwLiBWYWx1ZXMgPCAwIHdpbGwgZGVjcmVhc2UgY29udHJhc3Qgd2hpbGUgdmFsdWVzID4gMCB3aWxsIGluY3JlYXNlIGNvbnRyYXN0LlxuICAqIFRoZSBjb250cmFzdCBhZGp1c3RtZW50IHZhbHVlcyBhcmUgYSBiaXQgc2Vuc2l0aXZlLiBXaGlsZSB1bnJlc3RyaWN0ZWQsIHNhbmUgYWRqdXN0bWVudCB2YWx1ZXMgYXJlIHVzdWFsbHkgYXJvdW5kIDUtMTAuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignY29udHJhc3QnLCBmdW5jdGlvbihhZGp1c3QpIHtcbiAgICBhZGp1c3QgPSBNYXRoLnBvdygoYWRqdXN0ICsgMTAwKSAvIDEwMCwgMilcbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzKCdjb250cmFzdCcsIChyZ2JhKSA9PiB7XG4gICAgICAvLyBSZWQgY2hhbm5lbFxuICAgICAgcmdiYS5yIC89IDI1NVxuICAgICAgcmdiYS5yIC09IDAuNVxuICAgICAgcmdiYS5yICo9IGFkanVzdFxuICAgICAgcmdiYS5yICs9IDAuNVxuICAgICAgcmdiYS5yICo9IDI1NVxuXG4gICAgICAvLyBHcmVlbiBjaGFubmVsXG4gICAgICByZ2JhLmcgLz0gMjU1XG4gICAgICByZ2JhLmcgLT0gMC41XG4gICAgICByZ2JhLmcgKj0gYWRqdXN0XG4gICAgICByZ2JhLmcgKz0gMC41XG4gICAgICByZ2JhLmcgKj0gMjU1XG5cbiAgICAgIC8vIEJsdWUgY2hhbm5lbFxuICAgICAgcmdiYS5iIC89IDI1NVxuICAgICAgcmdiYS5iIC09IDAuNVxuICAgICAgcmdiYS5iICo9IGFkanVzdFxuICAgICAgcmdiYS5iICs9IDAuNVxuICAgICAgcmdiYS5iICo9IDI1NVxuXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBIdWVcbiAgKiBBZGp1c3RzIHRoZSBodWUgb2YgdGhlIGltYWdlLiBJdCBjYW4gYmUgdXNlZCB0byBzaGlmdCB0aGUgY29sb3JzIGluIGFuIGltYWdlIGluIGEgdW5pZm9ybSBmYXNoaW9uLiBJZiB5b3UgYXJlIHVuZmFtaWxpYXIgd2l0aCBIdWUsIEkgcmVjb21tZW5kIHJlYWRpbmcgdGhpcyBbV2lraXBlZGlhIGFydGljbGVdKGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSHVlKS5cbiAgKiBBcmd1bWVudHM6IFJhbmdlIGlzIDAgdG8gMTAwXG4gICogU29tZXRpbWVzLCBIdWUgaXMgZXhwcmVzc2VkIGluIHRoZSByYW5nZSBvZiAwIHRvIDM2MC4gSWYgdGhhdCdzIHRoZSB0ZXJtaW5vbG9neSB5b3UncmUgdXNlZCB0bywgdGhpbmsgb2YgMCB0byAxMDAgcmVwcmVzZW50aW5nIHRoZSBwZXJjZW50YWdlIG9mIEh1ZSBzaGlmdCBpbiB0aGUgMCB0byAzNjAgcmFuZ2UuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignaHVlJywgZnVuY3Rpb24gKGFkanVzdCkge1xuICAgIHJldHVybiB0aGlzLnByb2Nlc3MoJ2h1ZScsIChyZ2JhKSA9PiB7XG4gICAgICBjb25zdCBoc3YgPSBDb252ZXJ0LnJnYlRvSFNWKHJnYmEuciwgcmdiYS5nLCByZ2JhLmIpXG5cbiAgICAgIGxldCBoID0gaHN2LmggKiAxMDBcbiAgICAgIGggKz0gTWF0aC5hYnMoYWRqdXN0KVxuICAgICAgaCA9IGggJSAxMDBcbiAgICAgIGggLz0gMTAwXG4gICAgICBoc3YuaCA9IGhcblxuICAgICAgY29uc3Qge3IsIGcsIGJ9ID0gQ29udmVydC5oc3ZUb1JHQihoc3YuaCwgaHN2LnMsIGhzdi52KVxuICAgICAgcmdiYS5yID0gclxuICAgICAgcmdiYS5nID0gZ1xuICAgICAgcmdiYS5iID0gYlxuXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBDb2xvcml6ZVxuICAqIFVuaWZvcm1seSBzaGlmdHMgdGhlIGNvbG9ycyBpbiBhbiBpbWFnZSB0b3dhcmRzIHRoZSBnaXZlbiBjb2xvci4gVGhlIGFkanVzdG1lbnQgcmFuZ2UgaXMgZnJvbSAwIHRvIDEwMC4gVGhlIGhpZ2hlciB0aGUgdmFsdWUsIHRoZSBjbG9zZXIgdGhlIGNvbG9ycyBpbiB0aGUgaW1hZ2Ugc2hpZnQgdG93YXJkcyB0aGUgZ2l2ZW4gYWRqdXN0bWVudCBjb2xvci5cbiAgKiBBcmd1bWVudHM6IFRoaXMgZmlsdGVyIGlzIHBvbHltb3JwaGljIGFuZCBjYW4gdGFrZSB0d28gZGlmZmVyZW50IHNldHMgb2YgYXJndW1lbnRzLiBFaXRoZXIgYSBoZXggY29sb3Igc3RyaW5nIGFuZCBhbiBhZGp1c3RtZW50IHZhbHVlLCBvciBSR0IgY29sb3JzIGFuZCBhbiBhZGp1c3RtZW50IHZhbHVlLlxuICAqL1xuICBGaWx0ZXIucmVnaXN0ZXIoJ2NvbG9yaXplJywgZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBsZXQgcmdiLCBsZXZlbFxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMikge1xuICAgICAgcmdiID0gQ29udmVydC5oZXhUb1JHQihhcmdzWzBdKVxuICAgICAgbGV2ZWwgPSBhcmdzWzFdXG4gICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgcmdiID0ge1xuICAgICAgICByOiBhcmdzWzBdLFxuICAgICAgICBnOiBhcmdzWzFdLFxuICAgICAgICBiOiBhcmdzWzJdXG4gICAgICB9XG4gICAgICBsZXZlbCA9IGFyZ3NbM11cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzKCdjb2xvcml6ZScsIChyZ2JhKSA9PiB7XG4gICAgICByZ2JhLnIgLT0gKHJnYmEuciAtIHJnYi5yKSAqIChsZXZlbCAvIDEwMClcbiAgICAgIHJnYmEuZyAtPSAocmdiYS5nIC0gcmdiLmcpICogKGxldmVsIC8gMTAwKVxuICAgICAgcmdiYS5iIC09IChyZ2JhLmIgLSByZ2IuYikgKiAobGV2ZWwgLyAxMDApXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBJbnZlcnRcbiAgKiBJbnZlcnRzIGFsbCBjb2xvcnMgaW4gdGhlIGltYWdlIGJ5IHN1YnRyYWN0aW5nIGVhY2ggY29sb3IgY2hhbm5lbCB2YWx1ZSBmcm9tIDI1NS4gTm8gYXJndW1lbnRzLlxuICAqL1xuICBGaWx0ZXIucmVnaXN0ZXIoJ2ludmVydCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzKCdpbnZlcnQnLCAocmdiYSkgPT4ge1xuICAgICAgcmdiYS5yID0gMjU1IC0gcmdiYS5yXG4gICAgICByZ2JhLmcgPSAyNTUgLSByZ2JhLmdcbiAgICAgIHJnYmEuYiA9IDI1NSAtIHJnYmEuYlxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogU2VwaWFcbiAgKiBBcHBsaWVzIGFuIGFkanVzdGFibGUgc2VwaWEgZmlsdGVyIHRvIHRoZSBpbWFnZS5cbiAgKiBBcmd1bWVudHM6IEFzc3VtZXMgYWRqdXN0bWVudCBpcyBiZXR3ZWVuIDAgYW5kIDEwMCwgd2hpY2ggcmVwcmVzZW50cyBob3cgbXVjaCB0aGUgc2VwaWEgZmlsdGVyIGlzIGFwcGxpZWQuXG4gICovXG4gIEZpbHRlci5yZWdpc3Rlcignc2VwaWEnLCBmdW5jdGlvbiAoYWRqdXN0ID0gMTAwKSB7XG4gICAgYWRqdXN0IC89IDEwMFxuICAgIHJldHVybiB0aGlzLnByb2Nlc3MoJ3NlcGlhJywgKHJnYmEpID0+IHtcbiAgICAgIC8vIEFsbCB0aHJlZSBjb2xvciBjaGFubmVscyBoYXZlIHNwZWNpYWwgY29udmVyc2lvbiBmYWN0b3JzIHRoYXRcbiAgICAgIC8vIGRlZmluZSB3aGF0IHNlcGlhIGlzLiBIZXJlIHdlIGFkanVzdCBlYWNoIGNoYW5uZWwgaW5kaXZpZHVhbGx5LFxuICAgICAgLy8gd2l0aCB0aGUgdHdpc3QgdGhhdCB5b3UgY2FuIHBhcnRpYWxseSBhcHBseSB0aGUgc2VwaWEgZmlsdGVyLlxuICAgICAgcmdiYS5yID0gTWF0aC5taW4oMjU1LCAocmdiYS5yICogKDEgLSAoMC42MDcgKiBhZGp1c3QpKSkgKyAocmdiYS5nICogKDAuNzY5ICogYWRqdXN0KSkgKyAocmdiYS5iICogKDAuMTg5ICogYWRqdXN0KSkpXG4gICAgICByZ2JhLmcgPSBNYXRoLm1pbigyNTUsIChyZ2JhLnIgKiAoMC4zNDkgKiBhZGp1c3QpKSArIChyZ2JhLmcgKiAoMSAtICgwLjMxNCAqIGFkanVzdCkpKSArIChyZ2JhLmIgKiAoMC4xNjggKiBhZGp1c3QpKSlcbiAgICAgIHJnYmEuYiA9IE1hdGgubWluKDI1NSwgKHJnYmEuciAqICgwLjI3MiAqIGFkanVzdCkpICsgKHJnYmEuZyAqICgwLjUzNCAqIGFkanVzdCkpICsgKHJnYmEuYiAqICgxIC0gKDAuODY5ICogYWRqdXN0KSkpKVxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogR2FtbWFcbiAgKiBBZGp1c3RzIHRoZSBnYW1tYSBvZiB0aGUgaW1hZ2UuXG4gICogQXJndW1lbnRzOiBSYW5nZSBpcyBmcm9tIDAgdG8gaW5maW5pdHksIGFsdGhvdWdoIHNhbmUgdmFsdWVzIGFyZSBmcm9tIDAgdG8gNCBvciA1LlxuICAqIFZhbHVlcyBiZXR3ZWVuIDAgYW5kIDEgd2lsbCBsZXNzZW4gdGhlIGNvbnRyYXN0IHdoaWxlIHZhbHVlcyBncmVhdGVyIHRoYW4gMSB3aWxsIGluY3JlYXNlIGl0LlxuICAqL1xuICBGaWx0ZXIucmVnaXN0ZXIoJ2dhbW1hJywgZnVuY3Rpb24gKGFkanVzdCkge1xuICAgIHJldHVybiB0aGlzLnByb2Nlc3MoJ2dhbW1hJywgKHJnYmEpID0+IHtcbiAgICAgIHJnYmEuciA9IE1hdGgucG93KHJnYmEuciAvIDI1NSwgYWRqdXN0KSAqIDI1NVxuICAgICAgcmdiYS5nID0gTWF0aC5wb3cocmdiYS5nIC8gMjU1LCBhZGp1c3QpICogMjU1XG4gICAgICByZ2JhLmIgPSBNYXRoLnBvdyhyZ2JhLmIgLyAyNTUsIGFkanVzdCkgKiAyNTVcbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIE5vaXNlXG4gICogQWRkcyBub2lzZSB0byB0aGUgaW1hZ2Ugb24gYSBzY2FsZSBmcm9tIDEgLSAxMDAuIEhvd2V2ZXIsIHRoZSBzY2FsZSBpc24ndCBjb25zdHJhaW5lZCwgc28geW91IGNhbiBzcGVjaWZ5IGEgdmFsdWUgPiAxMDAgaWYgeW91IHdhbnQgYSBMT1Qgb2Ygbm9pc2UuXG4gICovXG4gIEZpbHRlci5yZWdpc3Rlcignbm9pc2UnLCBmdW5jdGlvbiAoYWRqdXN0KSB7XG4gICAgYWRqdXN0ID0gTWF0aC5hYnMoYWRqdXN0KSAqIDIuNTVcblxuICAgIHJldHVybiB0aGlzLnByb2Nlc3MoJ25vaXNlJywgKHJnYmEpID0+IHtcbiAgICAgIGNvbnN0IHJhbmQgPSBDYWxjdWxhdGUucmFuZG9tUmFuZ2UoYWRqdXN0ICogLTEsIGFkanVzdClcbiAgICAgIHJnYmEuciArPSByYW5kXG4gICAgICByZ2JhLmcgKz0gcmFuZFxuICAgICAgcmdiYS5iICs9IHJhbmRcbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIENsaXBcbiAgKiBDbGlwcyBhIGNvbG9yIHRvIG1heCB2YWx1ZXMgd2hlbiBpdCBmYWxscyBvdXRzaWRlIG9mIHRoZSBzcGVjaWZpZWQgcmFuZ2UuXG4gICogQXJndW1lbnRzOiBzdXBwbGllZCB2YWx1ZSBzaG91bGQgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignY2xpcCcsIGZ1bmN0aW9uIChhZGp1c3QpIHtcbiAgICBhZGp1c3QgPSBNYXRoLmFicyhhZGp1c3QpICogMi41NVxuXG4gICAgcmV0dXJuIHRoaXMucHJvY2VzcygnY2xpcCcsIChyZ2JhKSA9PiB7XG4gICAgICBpZiAocmdiYS5yID4gMjU1IC0gYWRqdXN0KSB7XG4gICAgICAgIHJnYmEuciA9IDI1NVxuICAgICAgfSBlbHNlIGlmIChyZ2JhLnIgPCBhZGp1c3QpIHtcbiAgICAgICAgcmdiYS5yID0gMFxuICAgICAgfVxuXG4gICAgICBpZiAocmdiYS5nID4gMjU1IC0gYWRqdXN0KSB7XG4gICAgICAgIHJnYmEuZyA9IDI1NVxuICAgICAgfSBlbHNlIGlmIChyZ2JhLmcgPCBhZGp1c3QpIHtcbiAgICAgICAgcmdiYS5nID0gMFxuICAgICAgfVxuXG4gICAgICBpZiAocmdiYS5iID4gMjU1IC0gYWRqdXN0KSB7XG4gICAgICAgIHJnYmEuYiA9IDI1NVxuICAgICAgfSBlbHNlIGlmIChyZ2JhLmIgPCBhZGp1c3QpIHtcbiAgICAgICAgcmdiYS5iID0gMFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBDaGFubmVsc1xuICAqIExldHMgeW91IG1vZGlmeSB0aGUgaW50ZW5zaXR5IG9mIGFueSBjb21iaW5hdGlvbiBvZiByZWQsIGdyZWVuLCBvciBibHVlIGNoYW5uZWxzIGluZGl2aWR1YWxseS5cbiAgKiBBcmd1bWVudHM6IE11c3QgYmUgZ2l2ZW4gYXQgbGVhc3Qgb25lIGNvbG9yIGNoYW5uZWwgdG8gYWRqdXN0IGluIG9yZGVyIHRvIHdvcmsuXG4gICogT3B0aW9ucyBmb3JtYXQgKG11c3Qgc3BlY2lmeSAxIC0gMyBjb2xvcnMpOlxuICAqIHtcbiAgKiAgIHJlZDogMjAsXG4gICogICBncmVlbjogLTUsXG4gICogICBibHVlOiAtNDBcbiAgKiB9XG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignY2hhbm5lbHMnLCBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIGZvciAobGV0IGNoYW4gaW4gb3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoY2hhbikpIHtcbiAgICAgICAgaWYgKG9wdGlvbnNbY2hhbl0gPT09IDApIHtcbiAgICAgICAgICBkZWxldGUgb3B0aW9uc1tjaGFuXVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9uc1tjaGFuXSAvPSAxMDBcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnByb2Nlc3MoJ2NoYW5uZWxzJywgKHJnYmEpID0+IHtcbiAgICAgIGlmIChvcHRpb25zLnJlZCkge1xuICAgICAgICBpZiAob3B0aW9ucy5yZWQgPiAwKSB7XG4gICAgICAgICAgcmdiYS5yICs9ICgyNTUgLSByZ2JhLnIpICogb3B0aW9ucy5yZWRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZ2JhLnIgLT0gcmdiYS5yICogTWF0aC5hYnMob3B0aW9ucy5yZWQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLmdyZWVuKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmdyZWVuID4gMCkge1xuICAgICAgICAgIHJnYmEuZyArPSAoMjU1IC0gcmdiYS5nKSAqIG9wdGlvbnMuZ3JlZW5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZ2JhLmcgLT0gcmdiYS5nICogTWF0aC5hYnMob3B0aW9ucy5ncmVlbilcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMuYmx1ZSkge1xuICAgICAgICBpZiAob3B0aW9ucy5ibHVlID4gMCkge1xuICAgICAgICAgIHJnYmEuYiArPSAoMjU1IC0gcmdiYS5iKSAqIG9wdGlvbnMuYmx1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJnYmEuYiAtPSByZ2JhLmIgKiBNYXRoLmFicyhvcHRpb25zLmJsdWUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogQ3VydmVzXG4gICogQ3VydmVzIGltcGxlbWVudGF0aW9uIHVzaW5nIEJlemllciBjdXJ2ZSBlcXVhdGlvbi4gSWYgeW91J3JlIGZhbWlsaWFyIHdpdGggdGhlIEN1cnZlcyBmdW5jdGlvbmFsaXR5IGluIFBob3Rvc2hvcCwgdGhpcyB3b3JrcyBpbiBhIHZlcnkgc2ltaWxhciBmYXNoaW9uLlxuICAqIEFyZ3VtZW50czpcbiAgKiBjaGFuIC0gW3IsIGcsIGIsIHJnYl1cbiAgKiBjcHMgLSBbeCwgeV0qIChjdXJ2ZSBjb250cm9sIHBvaW50cywgbWluLiAyOyAwIC0gMjU1KVxuICAqIGFsZ28gLSBmdW5jdGlvbiAob3B0aW9uYWwpXG4gICpcbiAgKiBUaGUgZmlyc3QgYXJndW1lbnQgcmVwcmVzZW50cyB0aGUgY2hhbm5lbHMgeW91IHdpc2ggdG8gbW9kaWZ5IHdpdGggdGhlIGZpbHRlci4gSXQgY2FuIGJlIGFuIGFycmF5IG9mIGNoYW5uZWxzIG9yIGEgc3RyaW5nIChmb3IgYSBzaW5nbGUgY2hhbm5lbCkuIFRoZSByZXN0IG9mIHRoZSBhcmd1bWVudHMgYXJlIDItZWxlbWVudCBhcnJheXMgdGhhdCByZXByZXNlbnQgcG9pbnQgY29vcmRpbmF0ZXMuIFRoZXkgYXJlIHNwZWNpZmllZCBpbiB0aGUgc2FtZSBvcmRlciBhcyBzaG93biBpbiB0aGlzIGltYWdlIHRvIHRoZSByaWdodC4gVGhlIGNvb3JkaW5hdGVzIGFyZSBpbiB0aGUgcmFuZ2Ugb2YgMCB0byAyNTUgZm9yIGJvdGggWCBhbmQgWSB2YWx1ZXMuXG4gICogSXQgaXMgcG9zc2libGUgdG8gcGFzcyB0aGUgZnVuY3Rpb24gYW4gb3B0aW9uYWwgZnVuY3Rpb24gZGVzY3JpYmluZyB3aGljaCBjdXJ2ZSBhbGdvcml0aG0gdG8gdXNlLlxuICAqIEl0IGRlZmF1bHRzIHRvIGJlemllci5cbiAgKiBUaGUgeC1heGlzIHJlcHJlc2VudHMgdGhlIGlucHV0IHZhbHVlIGZvciBhIHNpbmdsZSBjaGFubmVsLCB3aGlsZSB0aGUgeS1heGlzIHJlcHJlc2VudHMgdGhlIG91dHB1dCB2YWx1ZS5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdjdXJ2ZXMnLCBmdW5jdGlvbiAoY2hhbnMsIC4uLmNwcykge1xuICAgIGNvbnN0IGxhc3QgPSBjcHNbY3BzLmxlbmd0aCAtIDFdXG4gICAgbGV0IGFsZ29cbiAgICBpZiAodHlwZW9mIGxhc3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFsZ28gPSBsYXN0XG4gICAgICBjcHMucG9wKClcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBsYXN0ID09PSAnc3RyaW5nJykge1xuICAgICAgYWxnbyA9IENhbGN1bGF0ZVtsYXN0XVxuICAgICAgY3BzLnBvcCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZ28gPSBDYWxjdWxhdGUuYmV6aWVyXG4gICAgfVxuXG4gICAgLy8gSWYgY2hhbm5lbHMgYXJlIGluIGEgc3RyaW5nLCBzcGxpdCB0byBhbiBhcnJheVxuICAgIGlmICh0eXBlb2YgY2hhbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjaGFucyA9IGNoYW5zLnNwbGl0KCcnKVxuICAgIH1cbiAgICBpZiAoY2hhbnNbMF0gPT09ICd2Jykge1xuICAgICAgY2hhbnMgPSBbJ3InLCAnZycsICdiJ11cbiAgICB9XG5cbiAgICBpZiAoY3BzLmxlbmd0aCA8IDIpIHtcbiAgICAgIC8vIG1pZ2h0IHdhbnQgdG8gZ2l2ZSBhIHdhcm5pbmcgbm93XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBjdXJ2ZXMgZmlsdGVyJylcbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZSBhIGN1cnZlXG4gICAgY29uc3QgYmV6aWVyID0gYWxnbyhjcHMsIDAsIDI1NSlcblxuICAgIC8vIElmIHRoZSBjdXJ2ZSBzdGFydHMgYWZ0ZXIgeCA9IDAsIGluaXRpYWxpemUgaXQgd2l0aCBhIGZsYXQgbGluZVxuICAgIC8vIHVudGlsIHRoZSBjdXJ2ZSBiZWdpbnMuXG4gICAgY29uc3Qgc3RhcnQgPSBjcHNbMF1cbiAgICBpZiAoc3RhcnRbMF0gPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJ0WzBdOyBpKyspIHtcbiAgICAgICAgYmV6aWVyW2ldID0gc3RhcnRbMV1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBlbmQgPSBjcHNbY3BzLmxlbmd0aCAtIDFdXG4gICAgaWYgKGVuZFswXSA8IDI1NSkge1xuICAgICAgZm9yIChsZXQgaSA9IGVuZFswXTsgaSA8PSAyNTU7IGkrKykge1xuICAgICAgICBiZXppZXJbaV0gPSBlbmRbMV1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzKCdjdXJ2ZXMnLCAocmdiYSkgPT4ge1xuICAgICAgLy8gTm93IHRoYXQgd2UgaGF2ZSB0aGUgYmV6aWVyIGN1cnZlLCB3ZSBkbyBhIGJhc2ljIGhhc2htYXAgbG9va3VwXG4gICAgICAvLyB0byBmaW5kIGFuZCByZXBsYWNlIGNvbG9yIHZhbHVlcy5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmdiYVtjaGFuc1tpXV0gPSBiZXppZXJbcmdiYVtjaGFuc1tpXV1dXG4gICAgICB9XG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBFeHBvc3VyZVxuICAqIEFkanVzdHMgdGhlIGV4cG9zdXJlIG9mIHRoZSBpbWFnZSBieSB1c2luZyB0aGUgY3VydmVzIGZ1bmN0aW9uLlxuICAqIEFyZ3VtZW50czogUmFuZ2UgaXMgLTEwMCB0byAxMDAuIFZhbHVlcyA8IDAgd2lsbCBkZWNyZWFzZSBleHBvc3VyZSB3aGlsZSB2YWx1ZXMgPiAwIHdpbGwgaW5jcmVhc2UgZXhwb3N1cmUuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignZXhwb3N1cmUnLCBmdW5jdGlvbiAoYWRqdXN0KSB7XG4gICAgY29uc3QgcCA9IE1hdGguYWJzKGFkanVzdCkgLyAxMDBcblxuICAgIGxldCBjdHJsMSA9IFswLCAyNTUgKiBwXVxuICAgIGxldCBjdHJsMiA9IFsyNTUgLSAoMjU1ICogcCksIDI1NV1cblxuICAgIGlmIChhZGp1c3QgPCAwKSB7XG4gICAgICBjdHJsMSA9IGN0cmwxLnJldmVyc2UoKVxuICAgICAgY3RybDIgPSBjdHJsMi5yZXZlcnNlKClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3VydmVzKCdyZ2InLCBbMCwgMF0sIGN0cmwxLCBjdHJsMiwgWzI1NSwgMjU1XSlcbiAgfSlcbn1cbiIsImltcG9ydCBDYWxjdWxhdGUgZnJvbSAnLi4vY29yZS9jYWxjdWxhdGUnXG5pbXBvcnQgeyBVdGlsIH0gZnJvbSAnLi4vY29yZS91dGlsJ1xuaW1wb3J0IENvbnZlcnQgZnJvbSAnLi4vY29yZS9jb252ZXJ0J1xuXG5jb25zdCB2aWduZXR0ZUZpbHRlcnMgPSB7XG4gIGJyaWdodG5lc3MgKHJnYmEsIGFtdCwgb3B0cykge1xuICAgIHJnYmEuciA9IHJnYmEuciAtIChyZ2JhLnIgKiBhbXQgKiBvcHRzLnN0cmVuZ3RoKVxuICAgIHJnYmEuZyA9IHJnYmEuZyAtIChyZ2JhLmcgKiBhbXQgKiBvcHRzLnN0cmVuZ3RoKVxuICAgIHJnYmEuYiA9IHJnYmEuYiAtIChyZ2JhLmIgKiBhbXQgKiBvcHRzLnN0cmVuZ3RoKVxuICAgIHJldHVybiByZ2JhXG4gIH0sXG4gIGdhbW1hIChyZ2JhLCBhbXQsIG9wdHMpIHtcbiAgICByZ2JhLnIgPSBNYXRoLnBvdyhyZ2JhLnIgLyAyNTUsIE1hdGgubWF4KDEwICogYW10ICogb3B0cy5zdHJlbmd0aCwgMSkpICogMjU1XG4gICAgcmdiYS5nID0gTWF0aC5wb3cocmdiYS5nIC8gMjU1LCBNYXRoLm1heCgxMCAqIGFtdCAqIG9wdHMuc3RyZW5ndGgsIDEpKSAqIDI1NVxuICAgIHJnYmEuYiA9IE1hdGgucG93KHJnYmEuYiAvIDI1NSwgTWF0aC5tYXgoMTAgKiBhbXQgKiBvcHRzLnN0cmVuZ3RoLCAxKSkgKiAyNTVcbiAgICByZXR1cm4gcmdiYVxuICB9LFxuICBjb2xvcml6ZSAocmdiYSwgYW10LCBvcHRzKSB7XG4gICAgcmdiYS5yIC09IChyZ2JhLnIgLSBvcHRzLmNvbG9yLnIpICogYW10XG4gICAgcmdiYS5nIC09IChyZ2JhLmcgLSBvcHRzLmNvbG9yLmcpICogYW10XG4gICAgcmdiYS5iIC09IChyZ2JhLmIgLSBvcHRzLmNvbG9yLmIpICogYW10XG4gICAgcmV0dXJuIHJnYmFcbiAgfVxufVxuXG4vKipcbiAqXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsqfSBGaWx0ZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVnaXN0ZXJDYW1lcmFGaWx0ZXIgKEZpbHRlcikge1xuICBGaWx0ZXIucmVnaXN0ZXIoJ3ZpZ25ldHRlJywgZnVuY3Rpb24gKHNpemUsIHN0cmVuZ3RoID0gNjApIHtcbiAgICBsZXQgYmV6aWVyLCBjZW50ZXIsIGVuZCwgc3RhcnRcblxuICAgIGlmICh0eXBlb2Ygc2l6ZSA9PT0gJ3N0cmluZycgJiYgc2l6ZS5zdWJzdHIoLTEpID09PSAnJScpIHtcbiAgICAgIGlmICh0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0ID4gdGhpcy5kaW1lbnNpb25zLndpZHRoKSB7XG4gICAgICAgIHNpemUgPSB0aGlzLmRpbWVuc2lvbnMud2lkdGggKiAocGFyc2VJbnQoc2l6ZS5zdWJzdHIoMCwgc2l6ZS5sZW5ndGggLSAxKSwgMTApIC8gMTAwKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2l6ZSA9IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQgKiAocGFyc2VJbnQoc2l6ZS5zdWJzdHIoMCwgc2l6ZS5sZW5ndGggLSAxKSwgMTApIC8gMTAwKVxuICAgICAgfVxuICAgIH1cbiAgICBzdHJlbmd0aCAvPSAxMDBcbiAgICBjZW50ZXIgPSBbdGhpcy5kaW1lbnNpb25zLndpZHRoIC8gMiwgdGhpcy5kaW1lbnNpb25zLmhlaWdodCAvIDJdXG4gICAgc3RhcnQgPSBNYXRoLnNxcnQoTWF0aC5wb3coY2VudGVyWzBdLCAyKSArIE1hdGgucG93KGNlbnRlclsxXSwgMikpXG4gICAgZW5kID0gc3RhcnQgLSBzaXplXG4gICAgYmV6aWVyID0gQ2FsY3VsYXRlLmJlemllcihbMCwgMV0sIFszMCwgMzBdLCBbNzAsIDYwXSwgWzEwMCwgODBdKVxuICAgIHRoaXMucHJvY2VzcygndmlnbmV0dGUnLCBmdW5jdGlvbiAocmdiYSkge1xuICAgICAgdmFyIGRpc3QsIGRpdiwgbG9jXG4gICAgICBsb2MgPSByZ2JhLmxvY2F0aW9uWFkoKVxuICAgICAgZGlzdCA9IENhbGN1bGF0ZS5kaXN0YW5jZShsb2MueCwgbG9jLnksIGNlbnRlclswXSwgY2VudGVyWzFdKVxuICAgICAgaWYgKGRpc3QgPiBlbmQpIHtcbiAgICAgICAgZGl2ID0gTWF0aC5tYXgoMSwgKGJlemllcltNYXRoLnJvdW5kKCgoZGlzdCAtIGVuZCkgLyBzaXplKSAqIDEwMCldIC8gMTApICogc3RyZW5ndGgpXG4gICAgICAgIHJnYmEuciA9IE1hdGgucG93KHJnYmEuciAvIDI1NSwgZGl2KSAqIDI1NVxuICAgICAgICByZ2JhLmcgPSBNYXRoLnBvdyhyZ2JhLmcgLyAyNTUsIGRpdikgKiAyNTVcbiAgICAgICAgcmdiYS5iID0gTWF0aC5wb3cocmdiYS5iIC8gMjU1LCBkaXYpICogMjU1XG4gICAgICB9XG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdyZWN0YW5ndWxhclZpZ25ldHRlJywgZnVuY3Rpb24gKG9wdHMpIHtcbiAgICBsZXQgZGVmYXVsdHMsIGRpbSwgcGVyY2VudCwgc2l6ZSwgX2ksIF9sZW4sIF9yZWZcbiAgICBkZWZhdWx0cyA9IHtcbiAgICAgIHN0cmVuZ3RoOiA1MCxcbiAgICAgIGNvcm5lclJhZGl1czogMCxcbiAgICAgIG1ldGhvZDogJ2JyaWdodG5lc3MnLFxuICAgICAgY29sb3I6IHtcbiAgICAgICAgcjogMCxcbiAgICAgICAgZzogMCxcbiAgICAgICAgYjogMFxuICAgICAgfVxuICAgIH1cbiAgICBvcHRzID0gVXRpbC5leHRlbmQoZGVmYXVsdHMsIG9wdHMpXG4gICAgaWYgKCFvcHRzLnNpemUpIHtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0cy5zaXplID09PSAnc3RyaW5nJykge1xuICAgICAgcGVyY2VudCA9IHBhcnNlSW50KG9wdHMuc2l6ZSwgMTApIC8gMTAwXG4gICAgICBvcHRzLnNpemUgPSB7XG4gICAgICAgIHdpZHRoOiB0aGlzLmRpbWVuc2lvbnMud2lkdGggKiBwZXJjZW50LFxuICAgICAgICBoZWlnaHQ6IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQgKiBwZXJjZW50XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0cy5zaXplID09PSAnb2JqZWN0Jykge1xuICAgICAgX3JlZiA9IFsnd2lkdGgnLCAnaGVpZ2h0J11cbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBkaW0gPSBfcmVmW19pXVxuICAgICAgICBpZiAodHlwZW9mIG9wdHMuc2l6ZVtkaW1dID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIG9wdHMuc2l6ZVtkaW1dID0gdGhpcy5kaW1lbnNpb25zW2RpbV0gKiAocGFyc2VJbnQob3B0cy5zaXplW2RpbV0sIDEwKSAvIDEwMClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3B0cy5zaXplID09PSAnbnVtYmVyJykge1xuICAgICAgc2l6ZSA9IG9wdHMuc2l6ZVxuICAgICAgb3B0cy5zaXplID0ge1xuICAgICAgICB3aWR0aDogc2l6ZSxcbiAgICAgICAgaGVpZ2h0OiBzaXplXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0cy5jb3JuZXJSYWRpdXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBvcHRzLmNvcm5lclJhZGl1cyA9IChvcHRzLnNpemUud2lkdGggLyAyKSAqIChwYXJzZUludChvcHRzLmNvcm5lclJhZGl1cywgMTApIC8gMTAwKVxuICAgIH1cbiAgICBvcHRzLnN0cmVuZ3RoIC89IDEwMFxuICAgIG9wdHMuc2l6ZS53aWR0aCA9IE1hdGguZmxvb3Iob3B0cy5zaXplLndpZHRoKVxuICAgIG9wdHMuc2l6ZS5oZWlnaHQgPSBNYXRoLmZsb29yKG9wdHMuc2l6ZS5oZWlnaHQpXG4gICAgb3B0cy5pbWFnZSA9IHtcbiAgICAgIHdpZHRoOiB0aGlzLmRpbWVuc2lvbnMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuZGltZW5zaW9ucy5oZWlnaHRcbiAgICB9XG4gICAgaWYgKG9wdHMubWV0aG9kID09PSAnY29sb3JpemUnICYmIHR5cGVvZiBvcHRzLmNvbG9yID09PSAnc3RyaW5nJykge1xuICAgICAgb3B0cy5jb2xvciA9IENvbnZlcnQuaGV4VG9SR0Iob3B0cy5jb2xvcilcbiAgICB9XG4gICAgb3B0cy5jb29yZHMgPSB7XG4gICAgICBsZWZ0OiAodGhpcy5kaW1lbnNpb25zLndpZHRoIC0gb3B0cy5zaXplLndpZHRoKSAvIDIsXG4gICAgICByaWdodDogdGhpcy5kaW1lbnNpb25zLndpZHRoIC0gb3B0cy5jb29yZHMubGVmdCxcbiAgICAgIGJvdHRvbTogKHRoaXMuZGltZW5zaW9ucy5oZWlnaHQgLSBvcHRzLnNpemUuaGVpZ2h0KSAvIDIsXG4gICAgICB0b3A6IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQgLSBvcHRzLmNvb3Jkcy5ib3R0b21cbiAgICB9XG4gICAgb3B0cy5jb3JuZXJzID0gW1xuICAgICAge1xuICAgICAgICB4OiBvcHRzLmNvb3Jkcy5sZWZ0ICsgb3B0cy5jb3JuZXJSYWRpdXMsXG4gICAgICAgIHk6IG9wdHMuY29vcmRzLnRvcCAtIG9wdHMuY29ybmVyUmFkaXVzXG4gICAgICB9LCB7XG4gICAgICAgIHg6IG9wdHMuY29vcmRzLnJpZ2h0IC0gb3B0cy5jb3JuZXJSYWRpdXMsXG4gICAgICAgIHk6IG9wdHMuY29vcmRzLnRvcCAtIG9wdHMuY29ybmVyUmFkaXVzXG4gICAgICB9LCB7XG4gICAgICAgIHg6IG9wdHMuY29vcmRzLnJpZ2h0IC0gb3B0cy5jb3JuZXJSYWRpdXMsXG4gICAgICAgIHk6IG9wdHMuY29vcmRzLmJvdHRvbSArIG9wdHMuY29ybmVyUmFkaXVzXG4gICAgICB9LCB7XG4gICAgICAgIHg6IG9wdHMuY29vcmRzLmxlZnQgKyBvcHRzLmNvcm5lclJhZGl1cyxcbiAgICAgICAgeTogb3B0cy5jb29yZHMuYm90dG9tICsgb3B0cy5jb3JuZXJSYWRpdXNcbiAgICAgIH1cbiAgICBdXG4gICAgb3B0cy5tYXhEaXN0ID0gQ2FsY3VsYXRlLmRpc3RhbmNlKDAsIDAsIG9wdHMuY29ybmVyc1szXS54LCBvcHRzLmNvcm5lcnNbM10ueSkgLSBvcHRzLmNvcm5lclJhZGl1c1xuICAgIHRoaXMucHJvY2VzcygncmVjdGFuZ3VsYXJWaWduZXR0ZScsIGZ1bmN0aW9uIChyZ2JhKSB7XG4gICAgICB2YXIgYW10LCBsb2MsIHJhZGlhbERpc3RcbiAgICAgIGxvYyA9IHJnYmEubG9jYXRpb25YWSgpXG4gICAgICBpZiAoKGxvYy54ID4gb3B0cy5jb3JuZXJzWzBdLnggJiYgbG9jLnggPCBvcHRzLmNvcm5lcnNbMV0ueCkgJiYgKGxvYy55ID4gb3B0cy5jb29yZHMuYm90dG9tICYmIGxvYy55IDwgb3B0cy5jb29yZHMudG9wKSkge1xuICAgICAgICByZXR1cm4gcmdiYVxuICAgICAgfVxuICAgICAgaWYgKChsb2MueCA+IG9wdHMuY29vcmRzLmxlZnQgJiYgbG9jLnggPCBvcHRzLmNvb3Jkcy5yaWdodCkgJiYgKGxvYy55ID4gb3B0cy5jb3JuZXJzWzNdLnkgJiYgbG9jLnkgPCBvcHRzLmNvcm5lcnNbMl0ueSkpIHtcbiAgICAgICAgcmV0dXJuIHJnYmFcbiAgICAgIH1cbiAgICAgIGlmIChsb2MueCA+IG9wdHMuY29ybmVyc1swXS54ICYmIGxvYy54IDwgb3B0cy5jb3JuZXJzWzFdLnggJiYgbG9jLnkgPiBvcHRzLmNvb3Jkcy50b3ApIHtcbiAgICAgICAgYW10ID0gKGxvYy55IC0gb3B0cy5jb29yZHMudG9wKSAvIG9wdHMubWF4RGlzdFxuICAgICAgfSBlbHNlIGlmIChsb2MueSA+IG9wdHMuY29ybmVyc1syXS55ICYmIGxvYy55IDwgb3B0cy5jb3JuZXJzWzFdLnkgJiYgbG9jLnggPiBvcHRzLmNvb3Jkcy5yaWdodCkge1xuICAgICAgICBhbXQgPSAobG9jLnggLSBvcHRzLmNvb3Jkcy5yaWdodCkgLyBvcHRzLm1heERpc3RcbiAgICAgIH0gZWxzZSBpZiAobG9jLnggPiBvcHRzLmNvcm5lcnNbMF0ueCAmJiBsb2MueCA8IG9wdHMuY29ybmVyc1sxXS54ICYmIGxvYy55IDwgb3B0cy5jb29yZHMuYm90dG9tKSB7XG4gICAgICAgIGFtdCA9IChvcHRzLmNvb3Jkcy5ib3R0b20gLSBsb2MueSkgLyBvcHRzLm1heERpc3RcbiAgICAgIH0gZWxzZSBpZiAobG9jLnkgPiBvcHRzLmNvcm5lcnNbMl0ueSAmJiBsb2MueSA8IG9wdHMuY29ybmVyc1sxXS55ICYmIGxvYy54IDwgb3B0cy5jb29yZHMubGVmdCkge1xuICAgICAgICBhbXQgPSAob3B0cy5jb29yZHMubGVmdCAtIGxvYy54KSAvIG9wdHMubWF4RGlzdFxuICAgICAgfSBlbHNlIGlmIChsb2MueCA8PSBvcHRzLmNvcm5lcnNbMF0ueCAmJiBsb2MueSA+PSBvcHRzLmNvcm5lcnNbMF0ueSkge1xuICAgICAgICByYWRpYWxEaXN0ID0gQ2FsY3VsYXRlLmRpc3RhbmNlKGxvYy54LCBsb2MueSwgb3B0cy5jb3JuZXJzWzBdLngsIG9wdHMuY29ybmVyc1swXS55KVxuICAgICAgICBhbXQgPSAocmFkaWFsRGlzdCAtIG9wdHMuY29ybmVyUmFkaXVzKSAvIG9wdHMubWF4RGlzdFxuICAgICAgfSBlbHNlIGlmIChsb2MueCA+PSBvcHRzLmNvcm5lcnNbMV0ueCAmJiBsb2MueSA+PSBvcHRzLmNvcm5lcnNbMV0ueSkge1xuICAgICAgICByYWRpYWxEaXN0ID0gQ2FsY3VsYXRlLmRpc3RhbmNlKGxvYy54LCBsb2MueSwgb3B0cy5jb3JuZXJzWzFdLngsIG9wdHMuY29ybmVyc1sxXS55KVxuICAgICAgICBhbXQgPSAocmFkaWFsRGlzdCAtIG9wdHMuY29ybmVyUmFkaXVzKSAvIG9wdHMubWF4RGlzdFxuICAgICAgfSBlbHNlIGlmIChsb2MueCA+PSBvcHRzLmNvcm5lcnNbMl0ueCAmJiBsb2MueSA8PSBvcHRzLmNvcmVyc1syXS55KSB7XG4gICAgICAgIHJhZGlhbERpc3QgPSBDYWxjdWxhdGUuZGlzdGFuY2UobG9jLngsIGxvYy55LCBvcHRzLmNvcm5lcnNbMl0ueCwgb3B0cy5jb3JuZXJzWzJdLnkpXG4gICAgICAgIGFtdCA9IChyYWRpYWxEaXN0IC0gb3B0cy5jb3JuZXJSYWRpdXMpIC8gb3B0cy5tYXhEaXN0XG4gICAgICB9IGVsc2UgaWYgKGxvYy54IDw9IG9wdHMuY29ybmVyc1szXS54ICYmIGxvYy55IDw9IG9wdHMuY29ybmVyc1szXS55KSB7XG4gICAgICAgIHJhZGlhbERpc3QgPSBDYWxjdWxhdGUuZGlzdGFuY2UobG9jLngsIGxvYy55LCBvcHRzLmNvcm5lcnNbM10ueCwgb3B0cy5jb3JuZXJzWzNdLnkpXG4gICAgICAgIGFtdCA9IChyYWRpYWxEaXN0IC0gb3B0cy5jb3JuZXJSYWRpdXMpIC8gb3B0cy5tYXhEaXN0XG4gICAgICB9XG4gICAgICBpZiAoYW10IDwgMCkge1xuICAgICAgICByZXR1cm4gcmdiYVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZpZ25ldHRlRmlsdGVyc1tvcHRzLm1ldGhvZF0ocmdiYSwgYW10LCBvcHRzKVxuICAgIH0pXG4gIH0pXG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWdpc3RlckJsdXJGaWx0ZXIgKEZpbHRlcikge1xuICBGaWx0ZXIucmVnaXN0ZXIoJ2JveEJsdXInLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5wcm9jZXNzS2VybmVsKCdCb3ggQmx1cicsIFsxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxXSlcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ2hlYXZ5UmFkaWFsQmx1cicsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnByb2Nlc3NLZXJuZWwoJ0hlYXZ5IFJhZGlhbCBCbHVyJywgWzAsIDAsIDEsIDAsIDAsIDAsIDEsIDEsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDEsIDEsIDAsIDAsIDAsIDEsIDAsIDBdKVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcignZ2F1c3NpYW5CbHVyJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucHJvY2Vzc0tlcm5lbCgnR2F1c3NpYW4gQmx1cicsIFsxLCA0LCA2LCA0LCAxLCA0LCAxNiwgMjQsIDE2LCA0LCA2LCAyNCwgMzYsIDI0LCA2LCA0LCAxNiwgMjQsIDE2LCA0LCAxLCA0LCA2LCA0LCAxXSlcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ21vdGlvbkJsdXInLCBmdW5jdGlvbiAoZGVncmVlcykge1xuICAgIGxldCBrZXJuZWxcbiAgICBpZiAoZGVncmVlcyA9PT0gMCB8fCBkZWdyZWVzID09PSAxODApIHtcbiAgICAgIGtlcm5lbCA9IFswLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwXVxuICAgIH0gZWxzZSBpZiAoKGRlZ3JlZXMgPiAwICYmIGRlZ3JlZXMgPCA5MCkgfHwgKGRlZ3JlZXMgPiAxODAgJiYgZGVncmVlcyA8IDI3MCkpIHtcbiAgICAgIGtlcm5lbCA9IFswLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwXVxuICAgIH0gZWxzZSBpZiAoZGVncmVlcyA9PT0gOTAgfHwgZGVncmVlcyA9PT0gMjcwKSB7XG4gICAgICBrZXJuZWwgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF1cbiAgICB9IGVsc2Uge1xuICAgICAga2VybmVsID0gWzEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDFdXG4gICAgfVxuICAgIHRoaXMucHJvY2Vzc0tlcm5lbCgnTW90aW9uIEJsdXInLCBrZXJuZWwpXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdzaGFycGVuJywgZnVuY3Rpb24gKGFtdCA9IDEwMCkge1xuICAgIGFtdCAvPSAxMDBcbiAgICB0aGlzLnByb2Nlc3NLZXJuZWwoJ1NoYXJwZW4nLCBbMCwgLWFtdCwgMCwgLWFtdCwgNCAqIGFtdCArIDEsIC1hbXQsIDAsIC1hbXQsIDBdKVxuICB9KVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVnaXN0ZXJQb3N0ZXJpemVGaWx0ZXIgKEZpbHRlcikge1xuICBGaWx0ZXIucmVnaXN0ZXIoJ3Bvc3Rlcml6ZScsIGZ1bmN0aW9uIChhZGp1c3QpIHtcbiAgICB2YXIgbnVtT2ZBcmVhcywgbnVtT2ZWYWx1ZXNcbiAgICBudW1PZkFyZWFzID0gMjU2IC8gYWRqdXN0XG4gICAgbnVtT2ZWYWx1ZXMgPSAyNTUgLyAoYWRqdXN0IC0gMSlcbiAgICB0aGlzLnByb2Nlc3MoJ3Bvc3Rlcml6ZScsIGZ1bmN0aW9uIChyZ2JhKSB7XG4gICAgICByZ2JhLnIgPSBNYXRoLmZsb29yKE1hdGguZmxvb3IocmdiYS5yIC8gbnVtT2ZBcmVhcykgKiBudW1PZlZhbHVlcylcbiAgICAgIHJnYmEuZyA9IE1hdGguZmxvb3IoTWF0aC5mbG9vcihyZ2JhLmcgLyBudW1PZkFyZWFzKSAqIG51bU9mVmFsdWVzKVxuICAgICAgcmdiYS5iID0gTWF0aC5mbG9vcihNYXRoLmZsb29yKHJnYmEuYiAvIG51bU9mQXJlYXMpICogbnVtT2ZWYWx1ZXMpXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG59XG4iLCIvKipcbiAqIHNvbWUgcHJlc2V0IGZpbHRlcnNcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyp9IEZpbHRlclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWdpc3RlclByZXNldEZpbHRlciAoRmlsdGVyKSB7XG4gIEZpbHRlci5yZWdpc3RlcigndmludGFnZScsIGZ1bmN0aW9uICh2aWduZXR0ZSA9IHRydWUpIHtcbiAgICB0aGlzLmdyZXlzY2FsZSgpXG4gICAgdGhpcy5jb250cmFzdCg1KVxuICAgIHRoaXMubm9pc2UoMylcbiAgICB0aGlzLnNlcGlhKDEwMClcbiAgICB0aGlzLmNoYW5uZWxzKHtyZWQ6IDgsIGJsdWU6IDIsIGdyZWVuOiA0fSlcbiAgICB0aGlzLmdhbW1hKDAuODcpXG5cbiAgICBpZiAodmlnbmV0dGUpIHtcbiAgICAgIHRoaXMudmlnbmV0dGUoJzQwJScsIDMwKVxuICAgIH1cbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ2xvbW8nLCBmdW5jdGlvbiAodmlnbmV0dGUgPSB0cnVlKSB7XG4gICAgdGhpcy5icmlnaHRuZXNzKDE1KVxuICAgIHRoaXMuZXhwb3N1cmUoMTUpXG4gICAgdGhpcy5jdXJ2ZXMoJ3JnYicsIFswLCAwXSwgWzIwMCwgMF0sIFsxNTUsIDI1NV0sIFsyNTUsIDI1NV0pXG4gICAgdGhpcy5zYXR1cmF0aW9uKC0yMClcbiAgICB0aGlzLmdhbW1hKDEuOClcbiAgICBpZiAodmlnbmV0dGUpIHtcbiAgICAgIHRoaXMudmlnbmV0dGUoJzUwJScsIDYwKVxuICAgIH1cbiAgICB0aGlzLmJyaWdodG5lc3MoNSlcbiAgfSlcblxuICAvLyBGSVhNRTpzaGFycGVuXG4gIEZpbHRlci5yZWdpc3RlcignY2xhcml0eScsIGZ1bmN0aW9uIChncmV5ID0gZmFsc2UpIHtcbiAgICB0aGlzLnZpYnJhbmNlKDIwKVxuICAgIHRoaXMuY3VydmVzKCdyZ2InLCBbNSwgMF0sIFsxMzAsIDE1MF0sIFsxOTAsIDIyMF0sIFsyNTAsIDI1NV0pXG4gICAgdGhpcy5zaGFycGVuKDE1KVxuICAgIHRoaXMudmlnbmV0dGUoJzQ1JScsIDIwKVxuICAgIGlmIChncmV5KSB7XG4gICAgICB0aGlzLmdyZXlzY2FsZSgpXG4gICAgICB0aGlzLmNvbnRyYXN0KDQpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdzaW5DaXR5JywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY29udHJhc3QoMTAwKVxuICAgIHRoaXMuYnJpZ2h0bmVzcygxNSlcbiAgICB0aGlzLmV4cG9zdXJlKDEwKVxuICAgIHRoaXMucG9zdGVyaXplKDgwKVxuICAgIHRoaXMuY2xpcCgzMClcbiAgICB0aGlzLmdyZXlzY2FsZSgpXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdzdW5yaXNlJywgZnVuY3Rpb24gKHZpZ25ldHRlID0gdHJ1ZSkge1xuICAgIHRoaXMuZXhwb3N1cmUoMy41KVxuICAgIHRoaXMuc2F0dXJhdGlvbigtNSlcbiAgICB0aGlzLnZpYnJhbmNlKDUwKVxuICAgIHRoaXMuc2VwaWEoNjApXG4gICAgdGhpcy5jb2xvcml6ZSgnI2U4N2IyMicsIDEwKVxuICAgIHRoaXMuY2hhbm5lbHMoe1xuICAgICAgcmVkOiA4LFxuICAgICAgYmx1ZTogOFxuICAgIH0pXG4gICAgdGhpcy5jb250cmFzdCg1KVxuICAgIHRoaXMuZ2FtbWEoMS4yKVxuICAgIGlmICh2aWduZXR0ZSkge1xuICAgICAgdGhpcy52aWduZXR0ZSgnNTUlJywgMjUpXG4gICAgfVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcignY3Jvc3NQcm9jZXNzJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZXhwb3N1cmUoNSlcbiAgICB0aGlzLmNvbG9yaXplKCcjZTg3YjIyJywgNClcbiAgICB0aGlzLnNlcGlhKDIwKVxuICAgIHRoaXMuY2hhbm5lbHMoe1xuICAgICAgYmx1ZTogOCxcbiAgICAgIHJlZDogM1xuICAgIH0pXG4gICAgdGhpcy5jdXJ2ZXMoJ2InLCBbMCwgMF0sIFsxMDAsIDE1MF0sIFsxODAsIDE4MF0sIFsyNTUsIDI1NV0pXG4gICAgdGhpcy5jb250cmFzdCgxNSlcbiAgICB0aGlzLnZpYnJhbmNlKDc1KVxuICAgIHRoaXMuZ2FtbWEoMS42KVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3Rlcignb3JhbmdlUGVlbCcsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmN1cnZlcygncmdiJywgWzAsIDBdLCBbMTAwLCA1MF0sIFsxNDAsIDIwMF0sIFsyNTUsIDI1NV0pXG4gICAgdGhpcy52aWJyYW5jZSgtMzApXG4gICAgdGhpcy5zYXR1cmF0aW9uKC0zMClcbiAgICB0aGlzLmNvbG9yaXplKCcjZmY5MDAwJywgMzApXG4gICAgdGhpcy5jb250cmFzdCgtNSlcbiAgICB0aGlzLmdhbW1hKDEuNClcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ2xvdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5icmlnaHRuZXNzKDUpXG4gICAgdGhpcy5leHBvc3VyZSg4KVxuICAgIHRoaXMuY29udHJhc3QoNClcbiAgICB0aGlzLmNvbG9yaXplKCcjYzQyMDA3JywgMzApXG4gICAgdGhpcy52aWJyYW5jZSg1MClcbiAgICB0aGlzLmdhbW1hKDEuMylcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ2dydW5neScsIGZ1bmN0aW9uICh2aWduZXR0ZSA9IHRydWUpIHtcbiAgICB0aGlzLmdhbW1hKDEuNSlcbiAgICB0aGlzLmNsaXAoMjUpXG4gICAgdGhpcy5zYXR1cmF0aW9uKC02MClcbiAgICB0aGlzLmNvbnRyYXN0KDUpXG4gICAgdGhpcy5ub2lzZSg1KVxuICAgIGlmICh2aWduZXR0ZSkge1xuICAgICAgdGhpcy52aWduZXR0ZSgnNTAlJywgMzApXG4gICAgfVxuICB9KVxuICAvLyBGSVhNRTpzaGFycGVuXG4gIEZpbHRlci5yZWdpc3RlcignamFycXVlcycsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNhdHVyYXRpb24oLTM1KVxuICAgIHRoaXMuY3VydmVzKCdiJywgWzIwLCAwXSwgWzkwLCAxMjBdLCBbMTg2LCAxNDRdLCBbMjU1LCAyMzBdKVxuICAgIHRoaXMuY3VydmVzKCdyJywgWzAsIDBdLCBbMTQ0LCA5MF0sIFsxMzgsIDEyMF0sIFsyNTUsIDI1NV0pXG4gICAgdGhpcy5jdXJ2ZXMoJ2cnLCBbMTAsIDBdLCBbMTE1LCAxMDVdLCBbMTQ4LCAxMDBdLCBbMjU1LCAyNDhdKVxuICAgIHRoaXMuY3VydmVzKCdyZ2InLCBbMCwgMF0sIFsxMjAsIDEwMF0sIFsxMjgsIDE0MF0sIFsyNTUsIDI1NV0pXG4gICAgdGhpcy5zaGFycGVuKDIwKVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcigncGluaG9sZScsIGZ1bmN0aW9uICh2aWduZXR0ZSA9IHRydWUpIHtcbiAgICB0aGlzLmdyZXlzY2FsZSgpXG4gICAgdGhpcy5zZXBpYSgxMClcbiAgICB0aGlzLmV4cG9zdXJlKDEwKVxuICAgIHRoaXMuY29udHJhc3QoMTUpXG4gICAgaWYgKHZpZ25ldHRlKSB7XG4gICAgICB0aGlzLnZpZ25ldHRlKCc2MCUnLCAzNSlcbiAgICB9XG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdvbGRCb290JywgZnVuY3Rpb24gKHZpZ25ldHRlID0gdHJ1ZSkge1xuICAgIHRoaXMuc2F0dXJhdGlvbigtMjApXG4gICAgdGhpcy52aWJyYW5jZSgtNTApXG4gICAgdGhpcy5nYW1tYSgxLjEpXG4gICAgdGhpcy5zZXBpYSgzMClcbiAgICB0aGlzLmNoYW5uZWxzKHtcbiAgICAgIHJlZDogLTEwLFxuICAgICAgYmx1ZTogNVxuICAgIH0pXG4gICAgdGhpcy5jdXJ2ZXMoJ3JnYicsIFswLCAwXSwgWzgwLCA1MF0sIFsxMjgsIDIzMF0sIFsyNTUsIDI1NV0pXG4gICAgaWYgKHZpZ25ldHRlKSB7XG4gICAgICB0aGlzLnZpZ25ldHRlKCc2MCUnLCAzMClcbiAgICB9XG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdnbG93aW5nU3VuJywgZnVuY3Rpb24gKHZpZ25ldHRlID0gdHJ1ZSkge1xuICAgIHRoaXMuYnJpZ2h0bmVzcygxMClcbiAgICB0aGlzLm5ld0xheWVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0QmxlbmRpbmdNb2RlKCdtdWx0aXBseScpXG4gICAgICB0aGlzLm9wYWNpdHkoODApXG4gICAgICB0aGlzLmNvcHlQYXJlbnQoKVxuICAgICAgdGhpcy5maWx0ZXIuZ2FtbWEoMC44KVxuICAgICAgdGhpcy5maWx0ZXIuY29udHJhc3QoNTApXG4gICAgICB0aGlzLmZpbHRlci5leHBvc3VyZSgxMClcbiAgICB9KVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ3NvZnRMaWdodCcpXG4gICAgICB0aGlzLm9wYWNpdHkoODApXG4gICAgICB0aGlzLmZpbGxDb2xvcignI2Y0OTYwMCcpXG4gICAgfSlcbiAgICB0aGlzLmV4cG9zdXJlKDIwKVxuICAgIHRoaXMuZ2FtbWEoMC44KVxuICAgIGlmICh2aWduZXR0ZSkge1xuICAgICAgdGhpcy52aWduZXR0ZSgnNDUlJywgMjApXG4gICAgfVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcignaGF6eURheXMnLCBmdW5jdGlvbiAodmlnbmV0dGUgPSB0cnVlKSB7XG4gICAgdGhpcy5nYW1tYSgxLjIpXG4gICAgdGhpcy5uZXdMYXllcihmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNldEJsZW5kaW5nTW9kZSgnb3ZlcmxheScpXG4gICAgICB0aGlzLm9wYWNpdHkoNjApXG4gICAgICB0aGlzLmNvcHlQYXJlbnQoKVxuICAgICAgdGhpcy5maWx0ZXIuY2hhbm5lbHMoe1xuICAgICAgICByZWQ6IDVcbiAgICAgIH0pXG4gICAgICB0aGlzLmZpbHRlci5zdGFja0JsdXIoMTUpXG4gICAgfSlcbiAgICB0aGlzLm5ld0xheWVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0QmxlbmRpbmdNb2RlKCdhZGRpdGlvbicpXG4gICAgICB0aGlzLm9wYWNpdHkoNDApXG4gICAgICB0aGlzLmZpbGxDb2xvcignIzY4OTliYScpXG4gICAgfSlcbiAgICB0aGlzLm5ld0xheWVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0QmxlbmRpbmdNb2RlKCdtdWx0aXBseScpXG4gICAgICB0aGlzLm9wYWNpdHkoMzUpXG4gICAgICB0aGlzLmNvcHlQYXJlbnQoKVxuICAgICAgdGhpcy5maWx0ZXIuYnJpZ2h0bmVzcyg0MClcbiAgICAgIHRoaXMuZmlsdGVyLnZpYnJhbmNlKDQwKVxuICAgICAgdGhpcy5maWx0ZXIuZXhwb3N1cmUoMzApXG4gICAgICB0aGlzLmZpbHRlci5jb250cmFzdCgxNSlcbiAgICAgIHRoaXMuZmlsdGVyLmN1cnZlcygncicsIFswLCA0MF0sIFsxMjgsIDEyOF0sIFsxMjgsIDEyOF0sIFsyNTUsIDIxNV0pXG4gICAgICB0aGlzLmZpbHRlci5jdXJ2ZXMoJ2cnLCBbMCwgNDBdLCBbMTI4LCAxMjhdLCBbMTI4LCAxMjhdLCBbMjU1LCAyMTVdKVxuICAgICAgdGhpcy5maWx0ZXIuY3VydmVzKCdiJywgWzAsIDQwXSwgWzEyOCwgMTI4XSwgWzEyOCwgMTI4XSwgWzI1NSwgMjE1XSlcbiAgICAgIHRoaXMuZmlsdGVyLnN0YWNrQmx1cig1KVxuICAgIH0pXG4gICAgdGhpcy5jdXJ2ZXMoJ3InLCBbMjAsIDBdLCBbMTI4LCAxNThdLCBbMTI4LCAxMjhdLCBbMjM1LCAyNTVdKVxuICAgIHRoaXMuY3VydmVzKCdnJywgWzIwLCAwXSwgWzEyOCwgMTI4XSwgWzEyOCwgMTI4XSwgWzIzNSwgMjU1XSlcbiAgICB0aGlzLmN1cnZlcygnYicsIFsyMCwgMF0sIFsxMjgsIDEwOF0sIFsxMjgsIDEyOF0sIFsyMzUsIDI1NV0pXG4gICAgaWYgKHZpZ25ldHRlKSB7XG4gICAgICB0aGlzLnZpZ25ldHRlKCc0NSUnLCAyMClcbiAgICB9XG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdoZXJNYWplc3R5JywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYnJpZ2h0bmVzcyg0MClcbiAgICB0aGlzLmNvbG9yaXplKCcjZWExYzVkJywgMTApXG4gICAgdGhpcy5jdXJ2ZXMoJ2InLCBbMCwgMTBdLCBbMTI4LCAxODBdLCBbMTkwLCAxOTBdLCBbMjU1LCAyNTVdKVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnNldEJsZW5kaW5nTW9kZSgnb3ZlcmxheScpXG4gICAgICB0aGlzLm9wYWNpdHkoNTApXG4gICAgICB0aGlzLmNvcHlQYXJlbnQoKVxuICAgICAgdGhpcy5maWx0ZXIuZ2FtbWEoMC43KVxuICAgICAgdGhpcy5uZXdMYXllcihmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ25vcm1hbCcpXG4gICAgICAgIHRoaXMub3BhY2l0eSg2MClcbiAgICAgICAgdGhpcy5maWxsQ29sb3IoJyNlYTFjNWQnKVxuICAgICAgfSlcbiAgICB9KVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnNldEJsZW5kaW5nTW9kZSgnbXVsdGlwbHknKVxuICAgICAgdGhpcy5vcGFjaXR5KDYwKVxuICAgICAgdGhpcy5jb3B5UGFyZW50KClcbiAgICAgIHRoaXMuZmlsdGVyLnNhdHVyYXRpb24oNTApXG4gICAgICB0aGlzLmZpbHRlci5odWUoOTApXG4gICAgICB0aGlzLmZpbHRlci5jb250cmFzdCgxMClcbiAgICB9KVxuICAgIHRoaXMuZ2FtbWEoMS40KVxuICAgIHRoaXMudmlicmFuY2UoLTMwKVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLm9wYWNpdHkoMTApXG4gICAgICB0aGlzLmZpbGxDb2xvcignI2U1ZjBmZicpXG4gICAgfSlcbiAgICByZXR1cm4gdGhpc1xuICB9KVxuXG4gIEZpbHRlci5yZWdpc3Rlcignbm9zdGFsZ2lhJywgZnVuY3Rpb24gKHZpZ25ldHRlID0gdHJ1ZSkge1xuICAgIHRoaXMuc2F0dXJhdGlvbigyMClcbiAgICB0aGlzLmdhbW1hKDEuNClcbiAgICB0aGlzLmdyZXlzY2FsZSgpXG4gICAgdGhpcy5jb250cmFzdCg1KVxuICAgIHRoaXMuc2VwaWEoMTAwKVxuICAgIHRoaXMuY2hhbm5lbHMoe1xuICAgICAgcmVkOiA4LFxuICAgICAgYmx1ZTogMixcbiAgICAgIGdyZWVuOiA0XG4gICAgfSlcbiAgICB0aGlzLmdhbW1hKDAuOClcbiAgICB0aGlzLmNvbnRyYXN0KDUpXG4gICAgdGhpcy5leHBvc3VyZSgxMClcbiAgICB0aGlzLm5ld0xheWVyKGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ292ZXJsYXknKVxuICAgICAgdGhpcy5jb3B5UGFyZW50KClcbiAgICAgIHRoaXMub3BhY2l0eSg1NSlcbiAgICAgIHRoaXMuZmlsdGVyLnN0YWNrQmx1cigxMClcbiAgICB9KVxuICAgIGlmICh2aWduZXR0ZSkge1xuICAgICAgdGhpcy52aWduZXR0ZSgnNTAlJywgMzApXG4gICAgfVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcignaGVtaW5nd2F5JywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZ3JleXNjYWxlKClcbiAgICB0aGlzLmNvbnRyYXN0KDEwKVxuICAgIHRoaXMuZ2FtbWEoMC45KVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ211bHRpcGx5JylcbiAgICAgIHRoaXMub3BhY2l0eSg0MClcbiAgICAgIHRoaXMuY29weVBhcmVudCgpXG4gICAgICB0aGlzLmZpbHRlci5leHBvc3VyZSgxNSlcbiAgICAgIHRoaXMuZmlsdGVyLmNvbnRyYXN0KDE1KVxuICAgICAgdGhpcy5maWx0ZXIuY2hhbm5lbHMoe1xuICAgICAgICBncmVlbjogMTAsXG4gICAgICAgIHJlZDogNVxuICAgICAgfSlcbiAgICB9KVxuICAgIHRoaXMuc2VwaWEoMzApXG4gICAgdGhpcy5jdXJ2ZXMoJ3JnYicsIFswLCAxMF0sIFsxMjAsIDkwXSwgWzE4MCwgMjAwXSwgWzIzNSwgMjU1XSlcbiAgICB0aGlzLmNoYW5uZWxzKHtcbiAgICAgIHJlZDogNSxcbiAgICAgIGdyZWVuOiAtMlxuICAgIH0pXG4gICAgdGhpcy5leHBvc3VyZSgxNSlcbiAgfSlcblxuICAvLyBGSVhNRTogc2hhcnBlblxuICBGaWx0ZXIucmVnaXN0ZXIoJ2NvbmNlbnRyYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2hhcnBlbig0MClcbiAgICB0aGlzLnNhdHVyYXRpb24oLTUwKVxuICAgIHRoaXMuY2hhbm5lbHMoe1xuICAgICAgcmVkOiAzXG4gICAgfSlcbiAgICB0aGlzLm5ld0xheWVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0QmxlbmRpbmdNb2RlKCdtdWx0aXBseScpXG4gICAgICB0aGlzLm9wYWNpdHkoODApXG4gICAgICB0aGlzLmNvcHlQYXJlbnQoKVxuICAgICAgdGhpcy5maWx0ZXIuc2hhcnBlbig1KVxuICAgICAgdGhpcy5maWx0ZXIuY29udHJhc3QoNTApXG4gICAgICB0aGlzLmZpbHRlci5leHBvc3VyZSgxMClcbiAgICAgIHRoaXMuZmlsdGVyLmNoYW5uZWxzKHtcbiAgICAgICAgYmx1ZTogNVxuICAgICAgfSlcbiAgICB9KVxuICAgIHRoaXMuYnJpZ2h0bmVzcygxMClcbiAgfSlcbn1cbiIsIi8qXG5TdGFja0JsdXIgLSBhIGZhc3QgYWxtb3N0IEdhdXNzaWFuIEJsdXIgRm9yIENhbnZhcyB2MC4zMSBtb2RpZmllZCBmb3IgQ2FtYW5KU1xuXG5WZXJzaW9uOiAgIDAuMzFcbkF1dGhvcjogICAgTWFyaW8gS2xpbmdlbWFublxuQ29udGFjdDogICBtYXJpb0BxdWFzaW1vbmRvLmNvbVxuV2Vic2l0ZTogIGh0dHA6Ly93d3cucXVhc2ltb25kby5jb20vU3RhY2tCbHVyRm9yQ2FudmFzXG5Ud2l0dGVyOiAgQHF1YXNpbW9uZG9cbk1vZGlmaWVkIEJ5OiBSeWFuIExlRmV2cmUgKEBtZWx0aW5naWNlKVxuXG5JbiBjYXNlIHlvdSBmaW5kIHRoaXMgY2xhc3MgdXNlZnVsIC0gZXNwZWNpYWxseSBpbiBjb21tZXJjaWFsIHByb2plY3RzIC1cbkkgYW0gbm90IHRvdGFsbHkgdW5oYXBweSBmb3IgYSBzbWFsbCBkb25hdGlvbiB0byBteSBQYXlQYWwgYWNjb3VudFxubWFyaW9AcXVhc2ltb25kby5kZVxuXG5PciBzdXBwb3J0IG1lIG9uIGZsYXR0cjpcbmh0dHBzOi8vZmxhdHRyLmNvbS90aGluZy83Mjc5MS9TdGFja0JsdXItYS1mYXN0LWFsbW9zdC1HYXVzc2lhbi1CbHVyLUVmZmVjdC1mb3ItQ2FudmFzSmF2YXNjcmlwdFxuXG5Db3B5cmlnaHQgKGMpIDIwMTAgTWFyaW8gS2xpbmdlbWFublxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxub2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbmZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dFxucmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsXG5jb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlXG5Tb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZ1xuY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbmluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTXG5PRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORFxuTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFRcbkhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLFxuV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG5GUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SXG5PVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxubGV0IEJsdXJTdGFjaywgbXVsVGFibGUsIHNoZ1RhYmxlXG5tdWxUYWJsZSA9IFs1MTIsIDUxMiwgNDU2LCA1MTIsIDMyOCwgNDU2LCAzMzUsIDUxMiwgNDA1LCAzMjgsIDI3MSwgNDU2LCAzODgsIDMzNSwgMjkyLCA1MTIsIDQ1NCwgNDA1LCAzNjQsIDMyOCwgMjk4LCAyNzEsIDQ5NiwgNDU2LCA0MjAsIDM4OCwgMzYwLCAzMzUsIDMxMiwgMjkyLCAyNzMsIDUxMiwgNDgyLCA0NTQsIDQyOCwgNDA1LCAzODMsIDM2NCwgMzQ1LCAzMjgsIDMxMiwgMjk4LCAyODQsIDI3MSwgMjU5LCA0OTYsIDQ3NSwgNDU2LCA0MzcsIDQyMCwgNDA0LCAzODgsIDM3NCwgMzYwLCAzNDcsIDMzNSwgMzIzLCAzMTIsIDMwMiwgMjkyLCAyODIsIDI3MywgMjY1LCA1MTIsIDQ5NywgNDgyLCA0NjgsIDQ1NCwgNDQxLCA0MjgsIDQxNywgNDA1LCAzOTQsIDM4MywgMzczLCAzNjQsIDM1NCwgMzQ1LCAzMzcsIDMyOCwgMzIwLCAzMTIsIDMwNSwgMjk4LCAyOTEsIDI4NCwgMjc4LCAyNzEsIDI2NSwgMjU5LCA1MDcsIDQ5NiwgNDg1LCA0NzUsIDQ2NSwgNDU2LCA0NDYsIDQzNywgNDI4LCA0MjAsIDQxMiwgNDA0LCAzOTYsIDM4OCwgMzgxLCAzNzQsIDM2NywgMzYwLCAzNTQsIDM0NywgMzQxLCAzMzUsIDMyOSwgMzIzLCAzMTgsIDMxMiwgMzA3LCAzMDIsIDI5NywgMjkyLCAyODcsIDI4MiwgMjc4LCAyNzMsIDI2OSwgMjY1LCAyNjEsIDUxMiwgNTA1LCA0OTcsIDQ4OSwgNDgyLCA0NzUsIDQ2OCwgNDYxLCA0NTQsIDQ0NywgNDQxLCA0MzUsIDQyOCwgNDIyLCA0MTcsIDQxMSwgNDA1LCAzOTksIDM5NCwgMzg5LCAzODMsIDM3OCwgMzczLCAzNjgsIDM2NCwgMzU5LCAzNTQsIDM1MCwgMzQ1LCAzNDEsIDMzNywgMzMyLCAzMjgsIDMyNCwgMzIwLCAzMTYsIDMxMiwgMzA5LCAzMDUsIDMwMSwgMjk4LCAyOTQsIDI5MSwgMjg3LCAyODQsIDI4MSwgMjc4LCAyNzQsIDI3MSwgMjY4LCAyNjUsIDI2MiwgMjU5LCAyNTcsIDUwNywgNTAxLCA0OTYsIDQ5MSwgNDg1LCA0ODAsIDQ3NSwgNDcwLCA0NjUsIDQ2MCwgNDU2LCA0NTEsIDQ0NiwgNDQyLCA0MzcsIDQzMywgNDI4LCA0MjQsIDQyMCwgNDE2LCA0MTIsIDQwOCwgNDA0LCA0MDAsIDM5NiwgMzkyLCAzODgsIDM4NSwgMzgxLCAzNzcsIDM3NCwgMzcwLCAzNjcsIDM2MywgMzYwLCAzNTcsIDM1NCwgMzUwLCAzNDcsIDM0NCwgMzQxLCAzMzgsIDMzNSwgMzMyLCAzMjksIDMyNiwgMzIzLCAzMjAsIDMxOCwgMzE1LCAzMTIsIDMxMCwgMzA3LCAzMDQsIDMwMiwgMjk5LCAyOTcsIDI5NCwgMjkyLCAyODksIDI4NywgMjg1LCAyODIsIDI4MCwgMjc4LCAyNzUsIDI3MywgMjcxLCAyNjksIDI2NywgMjY1LCAyNjMsIDI2MSwgMjU5XVxuc2hnVGFibGUgPSBbOSwgMTEsIDEyLCAxMywgMTMsIDE0LCAxNCwgMTUsIDE1LCAxNSwgMTUsIDE2LCAxNiwgMTYsIDE2LCAxNywgMTcsIDE3LCAxNywgMTcsIDE3LCAxNywgMTgsIDE4LCAxOCwgMTgsIDE4LCAxOCwgMTgsIDE4LCAxOCwgMTksIDE5LCAxOSwgMTksIDE5LCAxOSwgMTksIDE5LCAxOSwgMTksIDE5LCAxOSwgMTksIDE5LCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0XVxuQmx1clN0YWNrID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnIgPSAwXG4gIHRoaXMuZyA9IDBcbiAgdGhpcy5iID0gMFxuICB0aGlzLmEgPSAwXG4gIHRoaXMubmV4dCA9IG51bGxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyU3RhY2tCbHVyUGx1Z2luIChQbHVnaW4pIHtcbiAgUGx1Z2luLnJlZ2lzdGVyKCdzdGFja0JsdXInLCBmdW5jdGlvbihyYWRpdXMpIHtcbiAgICBsZXQgYkluU3VtLCBiT3V0U3VtLCBiU3VtLCBkaXYsIGdJblN1bSwgZ091dFN1bSwgZ1N1bSwgaGVpZ2h0LCBoZWlnaHRNaW51czEsIGksIG11bFN1bSwgcCwgcGIsIHBnLCBwaXhlbHMsIHByLCBySW5TdW0sIHJPdXRTdW0sIHJTdW0sIHJhZGl1c1BsdXMxLCByYnMsIHNoZ1N1bSwgc3RhY2ssIHN0YWNrRW5kLCBzdGFja0luLCBzdGFja091dCwgc3RhY2tTdGFydCwgc3VtRmFjdG9yLCB3aWR0aCwgd2lkdGhNaW51czEsIHgsIHksIHlpLCB5cCwgeXcsIF9pLCBfaiwgX2ssIF9sLCBfbSwgX24sIF9vLCBfcCwgX3FcbiAgICBpZiAoaXNOYU4ocmFkaXVzKSB8fCByYWRpdXMgPCAxKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgcmFkaXVzIHw9IDBcbiAgICBwaXhlbHMgPSB0aGlzLnBpeGVsRGF0YVxuICAgIHdpZHRoID0gdGhpcy5kaW1lbnNpb25zLndpZHRoXG4gICAgaGVpZ2h0ID0gdGhpcy5kaW1lbnNpb25zLmhlaWdodFxuICAgIGRpdiA9IHJhZGl1cyArIHJhZGl1cyArIDFcbiAgICB3aWR0aE1pbnVzMSA9IHdpZHRoIC0gMVxuICAgIGhlaWdodE1pbnVzMSA9IGhlaWdodCAtIDFcbiAgICByYWRpdXNQbHVzMSA9IHJhZGl1cyArIDFcbiAgICBzdW1GYWN0b3IgPSByYWRpdXNQbHVzMSAqIChyYWRpdXNQbHVzMSArIDEpIC8gMlxuICAgIHN0YWNrU3RhcnQgPSBuZXcgQmx1clN0YWNrKClcbiAgICBzdGFjayA9IHN0YWNrU3RhcnRcbiAgICBmb3IgKGkgPSBfaSA9IDE7IGRpdiA+PSAxID8gX2kgPCBkaXYgOiBfaSA+IGRpdjsgaSA9IGRpdiA+PSAxID8gKytfaSA6IC0tX2kpIHtcbiAgICAgIHN0YWNrID0gc3RhY2submV4dCA9IG5ldyBCbHVyU3RhY2soKVxuICAgICAgaWYgKGkgPT09IHJhZGl1c1BsdXMxKSB7XG4gICAgICAgIHN0YWNrRW5kID0gc3RhY2tcbiAgICAgIH1cbiAgICB9XG4gICAgc3RhY2submV4dCA9IHN0YWNrU3RhcnRcbiAgICBzdGFja0luID0gbnVsbFxuICAgIHN0YWNrT3V0ID0gbnVsbFxuICAgIHl3ID0geWkgPSAwXG4gICAgbXVsU3VtID0gbXVsVGFibGVbcmFkaXVzXVxuICAgIHNoZ1N1bSA9IHNoZ1RhYmxlW3JhZGl1c11cbiAgICBmb3IgKHkgPSBfaiA9IDA7IGhlaWdodCA+PSAwID8gX2ogPCBoZWlnaHQgOiBfaiA+IGhlaWdodDsgeSA9IGhlaWdodCA+PSAwID8gKytfaiA6IC0tX2opIHtcbiAgICAgIHJJblN1bSA9IGdJblN1bSA9IGJJblN1bSA9IHJTdW0gPSBnU3VtID0gYlN1bSA9IDBcbiAgICAgIHJPdXRTdW0gPSByYWRpdXNQbHVzMSAqIChwciA9IHBpeGVsc1t5aV0pXG4gICAgICBnT3V0U3VtID0gcmFkaXVzUGx1czEgKiAocGcgPSBwaXhlbHNbeWkgKyAxXSlcbiAgICAgIGJPdXRTdW0gPSByYWRpdXNQbHVzMSAqIChwYiA9IHBpeGVsc1t5aSArIDJdKVxuICAgICAgclN1bSArPSBzdW1GYWN0b3IgKiBwclxuICAgICAgZ1N1bSArPSBzdW1GYWN0b3IgKiBwZ1xuICAgICAgYlN1bSArPSBzdW1GYWN0b3IgKiBwYlxuICAgICAgc3RhY2sgPSBzdGFja1N0YXJ0XG4gICAgICBmb3IgKGkgPSBfayA9IDA7IHJhZGl1c1BsdXMxID49IDAgPyBfayA8IHJhZGl1c1BsdXMxIDogX2sgPiByYWRpdXNQbHVzMTsgaSA9IHJhZGl1c1BsdXMxID49IDAgPyArK19rIDogLS1faykge1xuICAgICAgICBzdGFjay5yID0gcHJcbiAgICAgICAgc3RhY2suZyA9IHBnXG4gICAgICAgIHN0YWNrLmIgPSBwYlxuICAgICAgICBzdGFjayA9IHN0YWNrLm5leHRcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IF9sID0gMTsgcmFkaXVzUGx1czEgPj0gMSA/IF9sIDwgcmFkaXVzUGx1czEgOiBfbCA+IHJhZGl1c1BsdXMxOyBpID0gcmFkaXVzUGx1czEgPj0gMSA/ICsrX2wgOiAtLV9sKSB7XG4gICAgICAgIHAgPSB5aSArICgod2lkdGhNaW51czEgPCBpID8gd2lkdGhNaW51czEgOiBpKSA8PCAyKVxuICAgICAgICByU3VtICs9IChzdGFjay5yID0gKHByID0gcGl4ZWxzW3BdKSkgKiAocmJzID0gcmFkaXVzUGx1czEgLSBpKVxuICAgICAgICBnU3VtICs9IChzdGFjay5nID0gKHBnID0gcGl4ZWxzW3AgKyAxXSkpICogcmJzXG4gICAgICAgIGJTdW0gKz0gKHN0YWNrLmIgPSAocGIgPSBwaXhlbHNbcCArIDJdKSkgKiByYnNcbiAgICAgICAgckluU3VtICs9IHByXG4gICAgICAgIGdJblN1bSArPSBwZ1xuICAgICAgICBiSW5TdW0gKz0gcGJcbiAgICAgICAgc3RhY2sgPSBzdGFjay5uZXh0XG4gICAgICB9XG4gICAgICBzdGFja0luID0gc3RhY2tTdGFydFxuICAgICAgc3RhY2tPdXQgPSBzdGFja0VuZFxuICAgICAgZm9yICh4ID0gX20gPSAwOyB3aWR0aCA+PSAwID8gX20gPCB3aWR0aCA6IF9tID4gd2lkdGg7IHggPSB3aWR0aCA+PSAwID8gKytfbSA6IC0tX20pIHtcbiAgICAgICAgcGl4ZWxzW3lpXSA9IChyU3VtICogbXVsU3VtKSA+PiBzaGdTdW1cbiAgICAgICAgcGl4ZWxzW3lpICsgMV0gPSAoZ1N1bSAqIG11bFN1bSkgPj4gc2hnU3VtXG4gICAgICAgIHBpeGVsc1t5aSArIDJdID0gKGJTdW0gKiBtdWxTdW0pID4+IHNoZ1N1bVxuICAgICAgICByU3VtIC09IHJPdXRTdW1cbiAgICAgICAgZ1N1bSAtPSBnT3V0U3VtXG4gICAgICAgIGJTdW0gLT0gYk91dFN1bVxuICAgICAgICByT3V0U3VtIC09IHN0YWNrSW4uclxuICAgICAgICBnT3V0U3VtIC09IHN0YWNrSW4uZ1xuICAgICAgICBiT3V0U3VtIC09IHN0YWNrSW4uYlxuICAgICAgICBwID0gKHl3ICsgKChwID0geCArIHJhZGl1cyArIDEpIDwgd2lkdGhNaW51czEgPyBwIDogd2lkdGhNaW51czEpKSA8PCAyXG4gICAgICAgIHJJblN1bSArPSAoc3RhY2tJbi5yID0gcGl4ZWxzW3BdKVxuICAgICAgICBnSW5TdW0gKz0gKHN0YWNrSW4uZyA9IHBpeGVsc1twICsgMV0pXG4gICAgICAgIGJJblN1bSArPSAoc3RhY2tJbi5iID0gcGl4ZWxzW3AgKyAyXSlcbiAgICAgICAgclN1bSArPSBySW5TdW1cbiAgICAgICAgZ1N1bSArPSBnSW5TdW1cbiAgICAgICAgYlN1bSArPSBiSW5TdW1cbiAgICAgICAgc3RhY2tJbiA9IHN0YWNrSW4ubmV4dFxuICAgICAgICByT3V0U3VtICs9IChwciA9IHN0YWNrT3V0LnIpXG4gICAgICAgIGdPdXRTdW0gKz0gKHBnID0gc3RhY2tPdXQuZylcbiAgICAgICAgYk91dFN1bSArPSAocGIgPSBzdGFja091dC5iKVxuICAgICAgICBySW5TdW0gLT0gcHJcbiAgICAgICAgZ0luU3VtIC09IHBnXG4gICAgICAgIGJJblN1bSAtPSBwYlxuICAgICAgICBzdGFja091dCA9IHN0YWNrT3V0Lm5leHRcbiAgICAgICAgeWkgKz0gNFxuICAgICAgfVxuICAgICAgeXcgKz0gd2lkdGhcbiAgICB9XG4gICAgZm9yICh4ID0gX24gPSAwOyB3aWR0aCA+PSAwID8gX24gPCB3aWR0aCA6IF9uID4gd2lkdGg7IHggPSB3aWR0aCA+PSAwID8gKytfbiA6IC0tX24pIHtcbiAgICAgIGdJblN1bSA9IGJJblN1bSA9IHJJblN1bSA9IGdTdW0gPSBiU3VtID0gclN1bSA9IDBcbiAgICAgIHlpID0geCA8PCAyXG4gICAgICByT3V0U3VtID0gcmFkaXVzUGx1czEgKiAocHIgPSBwaXhlbHNbeWldKVxuICAgICAgZ091dFN1bSA9IHJhZGl1c1BsdXMxICogKHBnID0gcGl4ZWxzW3lpICsgMV0pXG4gICAgICBiT3V0U3VtID0gcmFkaXVzUGx1czEgKiAocGIgPSBwaXhlbHNbeWkgKyAyXSlcbiAgICAgIHJTdW0gKz0gc3VtRmFjdG9yICogcHJcbiAgICAgIGdTdW0gKz0gc3VtRmFjdG9yICogcGdcbiAgICAgIGJTdW0gKz0gc3VtRmFjdG9yICogcGJcbiAgICAgIHN0YWNrID0gc3RhY2tTdGFydFxuICAgICAgZm9yIChpID0gX28gPSAwOyByYWRpdXNQbHVzMSA+PSAwID8gX28gPCByYWRpdXNQbHVzMSA6IF9vID4gcmFkaXVzUGx1czE7IGkgPSByYWRpdXNQbHVzMSA+PSAwID8gKytfbyA6IC0tX28pIHtcbiAgICAgICAgc3RhY2suciA9IHByXG4gICAgICAgIHN0YWNrLmcgPSBwZ1xuICAgICAgICBzdGFjay5iID0gcGJcbiAgICAgICAgc3RhY2sgPSBzdGFjay5uZXh0XG4gICAgICB9XG4gICAgICB5cCA9IHdpZHRoXG4gICAgICBmb3IgKGkgPSBfcCA9IDE7IHJhZGl1cyA+PSAxID8gX3AgPD0gcmFkaXVzIDogX3AgPj0gcmFkaXVzOyBpID0gcmFkaXVzID49IDEgPyArK19wIDogLS1fcCkge1xuICAgICAgICB5aSA9ICh5cCArIHgpIDw8IDJcbiAgICAgICAgclN1bSArPSAoc3RhY2suciA9IChwciA9IHBpeGVsc1t5aV0pKSAqIChyYnMgPSByYWRpdXNQbHVzMSAtIGkpXG4gICAgICAgIGdTdW0gKz0gKHN0YWNrLmcgPSAocGcgPSBwaXhlbHNbeWkgKyAxXSkpICogcmJzXG4gICAgICAgIGJTdW0gKz0gKHN0YWNrLmIgPSAocGIgPSBwaXhlbHNbeWkgKyAyXSkpICogcmJzXG4gICAgICAgIHJJblN1bSArPSBwclxuICAgICAgICBnSW5TdW0gKz0gcGdcbiAgICAgICAgYkluU3VtICs9IHBiXG4gICAgICAgIHN0YWNrID0gc3RhY2submV4dFxuICAgICAgICBpZiAoaSA8IGhlaWdodE1pbnVzMSkge1xuICAgICAgICAgIHlwICs9IHdpZHRoXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHlpID0geFxuICAgICAgc3RhY2tJbiA9IHN0YWNrU3RhcnRcbiAgICAgIHN0YWNrT3V0ID0gc3RhY2tFbmRcbiAgICAgIGZvciAoeSA9IF9xID0gMDsgaGVpZ2h0ID49IDAgPyBfcSA8IGhlaWdodCA6IF9xID4gaGVpZ2h0OyB5ID0gaGVpZ2h0ID49IDAgPyArK19xIDogLS1fcSkge1xuICAgICAgICBwID0geWkgPDwgMlxuICAgICAgICBwaXhlbHNbcF0gPSAoclN1bSAqIG11bFN1bSkgPj4gc2hnU3VtXG4gICAgICAgIHBpeGVsc1twICsgMV0gPSAoZ1N1bSAqIG11bFN1bSkgPj4gc2hnU3VtXG4gICAgICAgIHBpeGVsc1twICsgMl0gPSAoYlN1bSAqIG11bFN1bSkgPj4gc2hnU3VtXG4gICAgICAgIHJTdW0gLT0gck91dFN1bVxuICAgICAgICBnU3VtIC09IGdPdXRTdW1cbiAgICAgICAgYlN1bSAtPSBiT3V0U3VtXG4gICAgICAgIHJPdXRTdW0gLT0gc3RhY2tJbi5yXG4gICAgICAgIGdPdXRTdW0gLT0gc3RhY2tJbi5nXG4gICAgICAgIGJPdXRTdW0gLT0gc3RhY2tJbi5iXG4gICAgICAgIHAgPSAoeCArICgoKHAgPSB5ICsgcmFkaXVzUGx1czEpIDwgaGVpZ2h0TWludXMxID8gcCA6IGhlaWdodE1pbnVzMSkgKiB3aWR0aCkpIDw8IDJcbiAgICAgICAgclN1bSArPSAockluU3VtICs9IChzdGFja0luLnIgPSBwaXhlbHNbcF0pKVxuICAgICAgICBnU3VtICs9IChnSW5TdW0gKz0gKHN0YWNrSW4uZyA9IHBpeGVsc1twICsgMV0pKVxuICAgICAgICBiU3VtICs9IChiSW5TdW0gKz0gKHN0YWNrSW4uYiA9IHBpeGVsc1twICsgMl0pKVxuICAgICAgICBzdGFja0luID0gc3RhY2tJbi5uZXh0XG4gICAgICAgIHJPdXRTdW0gKz0gKHByID0gc3RhY2tPdXQucilcbiAgICAgICAgZ091dFN1bSArPSAocGcgPSBzdGFja091dC5nKVxuICAgICAgICBiT3V0U3VtICs9IChwYiA9IHN0YWNrT3V0LmIpXG4gICAgICAgIHJJblN1bSAtPSBwclxuICAgICAgICBnSW5TdW0gLT0gcGdcbiAgICAgICAgYkluU3VtIC09IHBiXG4gICAgICAgIHN0YWNrT3V0ID0gc3RhY2tPdXQubmV4dFxuICAgICAgICB5aSArPSB3aWR0aFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJTdGFja0JsdXJGaWx0ZXIgKEZpbHRlcikge1xuICBGaWx0ZXIucmVnaXN0ZXIoJ3N0YWNrQmx1cicsIGZ1bmN0aW9uIChyYWRpdXMpIHtcbiAgICB0aGlzLnByb2Nlc3NQbHVnaW4oJ3N0YWNrQmx1cicsIFtyYWRpdXNdKVxuICB9KVxufVxuIiwiaW1wb3J0IHJlZ2lzdGVyQ2FtZXJhRmlsdGVyIGZyb20gJy4vY2FtZXJhJ1xuaW1wb3J0IHJlZ2lzdGVyQmx1ckZpbHRlciBmcm9tICcuL2JsdXInXG5pbXBvcnQgcmVnaXN0cmVyUG9zdGVyaXplRmlsdGVyIGZyb20gJy4vcG9zdGVyaXplJ1xuaW1wb3J0IHJlZ2lzdGVyUHJlc2V0RmlsdGVyIGZyb20gJy4vcHJlc2V0cydcbmltcG9ydCB7IHJlZ2lzdGVyU3RhY2tCbHVyUGx1Z2luLCByZWdpc3RlclN0YWNrQmx1ckZpbHRlciB9IGZyb20gJy4vc3RhY2tCbHVyJ1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJQbHVnaW4gKFBsdWdpbikge1xuICByZWdpc3RlclN0YWNrQmx1clBsdWdpbihQbHVnaW4pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclBsdWdpbkZpbHRlciAoRmlsdGVyKSB7XG4gIHJlZ2lzdGVyQ2FtZXJhRmlsdGVyKEZpbHRlcilcbiAgcmVnaXN0ZXJCbHVyRmlsdGVyKEZpbHRlcilcbiAgcmVnaXN0cmVyUG9zdGVyaXplRmlsdGVyKEZpbHRlcilcbiAgcmVnaXN0ZXJQcmVzZXRGaWx0ZXIoRmlsdGVyKVxuICByZWdpc3RlclN0YWNrQmx1ckZpbHRlcihGaWx0ZXIpXG59XG4iLCJpbXBvcnQgQ2FtYW4gZnJvbSAnLi9jYW1hbidcbmltcG9ydCBCbGVuZGVyIGZyb20gJy4vYmxlbmRlcidcbmltcG9ydCBGaWx0ZXIgZnJvbSAnLi9maWx0ZXInXG5pbXBvcnQgUGx1Z2luIGZyb20gJy4vcGx1Z2luJ1xuXG5pbXBvcnQgcmVnaXN0ZXJCbGVuZGVyIGZyb20gJy4uL2xpYi9ibGVuZGVycydcbmltcG9ydCByZWdpc3RlckZpbHRlciBmcm9tICcuLi9saWIvZmlsdGVycydcbmltcG9ydCB7IHJlZ2lzdGVyUGx1Z2luLCByZWdpc3RlclBsdWdpbkZpbHRlciB9IGZyb20gJy4uL2xpYi9wbHVnaW5zJ1xuXG4vLyB3ZWNoYXQgbWluaSBwcm9ncmFtIGVudlxuaWYgKHR5cGVvZiB3eCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdXZWNoYXQtQ2FtYW5KUyBjYW4gb25seSBydW4gaW4gd2VjaGF0IG1pbmkgcHJvZ3JhbScpXG59XG5yZWdpc3RlckJsZW5kZXIoQmxlbmRlcilcbnJlZ2lzdGVyRmlsdGVyKEZpbHRlcilcblxucmVnaXN0ZXJQbHVnaW4oUGx1Z2luKVxucmVnaXN0ZXJQbHVnaW5GaWx0ZXIoRmlsdGVyKVxuXG5leHBvcnQgZGVmYXVsdCBDYW1hblxuIl0sIm5hbWVzIjpbIm1vZHVsZUtleXdvcmRzIiwiTW9kdWxlIiwib2JqIiwia2V5IiwiaW5kZXhPZiIsImV4dGVuZGVkIiwiYXBwbHkiLCJwcm90b3R5cGUiLCJpbmNsdWRlZCIsImFyZ3MiLCJ0YXJnZXQiLCJwb3AiLCJpIiwic291cmNlIiwidG8iLCJmcm9tIiwiZGVmaW5lUHJvcGVydHkiLCJ2YWwiLCJmdW5jIiwiY2FsbCIsIm5vb3AiLCJVdGlsIiwibGVuIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyIiwiZGVzdCIsInNyYyIsImNvcHkiLCJwcm9wIiwiaGFzT3duUHJvcGVydHkiLCJvcHRzIiwiYXR0cmlidXRlcyIsImF0dHIiLCJleGNlcHQiLCJub2RlTmFtZSIsInNldEF0dHJpYnV0ZSIsIm5vZGVWYWx1ZSIsImxlbmd0aCIsIlVpbnQ4Q2xhbXBlZEFycmF5IiwiQXJyYXkiLCJBbmFseXplIiwiYyIsImxldmVscyIsInIiLCJnIiwiYiIsImoiLCJwaXhlbERhdGEiLCJudW1QaXhlbHMiLCJFdmVudCIsInR5cGUiLCJkYXRhIiwiZXZlbnRzIiwiZXZlbnQiLCJpZCIsImZuIiwiX3R5cGUiLCJfZm4iLCJ0eXBlcyIsInB1c2giLCJfdGhpcyIsIm9uIiwib2ZmIiwiYXJndW1lbnRzIiwibGlzdGVuIiwiT2JqZWN0IiwiY3JlYXRlIiwiY2JzIiwiY2IiLCJzcGxpY2UiLCJDb25maWciLCJMb2dnZXIiLCJsb2dMZXZlbCIsIm5hbWUiLCJjb25zb2xlIiwiZSIsImRlYnVnIiwibG9nIiwiTG9nIiwiUGx1Z2luIiwicGx1Z2luIiwicGx1Z2lucyIsImNvbnRleHQiLCJQaXhlbCIsIngiLCJ5Iiwid2lkdGgiLCJsb2MiLCJmbG9vciIsImEiLCJFcnJvciIsImRpbWVuc2lvbnMiLCJoZWlnaHQiLCJob3JpeiIsInZlcnQiLCJuZXdMb2MiLCJwaXhlbEF0TG9jYXRpb24iLCJjb29yZGluYXRlc1RvTG9jYXRpb24iLCJyZ2JhIiwidG9LZXkiLCJpbmNsdWRlQWxwaGEiLCJoZXgiLCJSZW5kZXJlciIsInJlbmRlclF1ZXVlIiwibW9kUGl4ZWxEYXRhIiwiam9iIiwidHJpZ2dlciIsImZpbmlzaGVkRm4iLCJjdXJyZW50Sm9iIiwic2hpZnQiLCJGSUxURVJfVFlQRSIsIkxheWVyRGVxdWV1ZSIsImxheWVyIiwiY2FudmFzUXVldWUiLCJleGVjdXRlTGF5ZXIiLCJwcm9jZXNzTmV4dCIsIkxheWVyRmluaXNoZWQiLCJhcHBseUN1cnJlbnRMYXllciIsInBvcENvbnRleHQiLCJMb2FkT3ZlcmxheSIsImxvYWRPdmVybGF5IiwiZXhlY3V0ZVBsdWdpbiIsImV4ZWN1dGVGaWx0ZXIiLCJjYW1hbkluc3RhbmNlIiwiY2FsbGJhY2siLCJkYXRhQXJyYXkiLCJibG9ja3NEb25lIiwibiIsImJsb2NrUGl4ZWxMZW5ndGgiLCJCbG9ja3MiLCJibG9ja04iLCJsYXN0QmxvY2tOIiwic3RhcnQiLCJlbmQiLCJTaW5nbGUiLCJlYWNoQmxvY2siLCJyZW5kZXJCbG9jayIsInJlbmRlcktlcm5lbCIsImV4ZWN1dGUiLCJibnVtIiwicGl4ZWwiLCJzZXRDb250ZXh0IiwicHJvY2Vzc0ZuIiwiY2xhbXBSR0IiLCJibG9ja0ZpbmlzaGVkIiwiYmlhcyIsImRpdmlzb3IiLCJhZGp1c3QiLCJhZGp1c3RTaXplIiwic3FydCIsImtlcm5lbCIsIm1heCIsIm1pbiIsImJ1aWxkZXIiLCJidWlsZGVySW5kZXgiLCJrIiwicCIsImdldFBpeGVsUmVsYXRpdmUiLCJyZXMiLCJwcm9jZXNzS2VybmVsIiwiS2VybmVsIiwiQmxlbmRlciIsImJsZW5kZXJzIiwicmdiYUxheWVyIiwicmdiYVBhcmVudCIsIkxheWVyIiwiZmlsdGVyIiwib3B0aW9ucyIsImxheWVySUQiLCJ1bmlxaWQiLCJuZXdMYXllciIsIm1vZGUiLCJibGVuZGluZ01vZGUiLCJvcGFjaXR5IiwicGFyZW50RGF0YSIsImZpbGxDb2xvciIsInBpeGVsU3RhY2siLCJsYXllckRhdGEiLCJyZXN1bHQiLCJDYW1hbiIsInZlcnNpb24iLCJyZWxlYXNlIiwiZGF0ZSIsImluaXRpYWxpemVkUGl4ZWxEYXRhIiwib3JpZ2luYWxQaXhlbERhdGEiLCJsYXllclN0YWNrIiwiY3VycmVudExheWVyIiwiYW5hbHl6ZSIsInJlbmRlcmVyIiwicGFyc2VBcmd1bWVudHMiLCJpbml0Q2FudmFzIiwiY2FudmFzIiwid3giLCJjcmVhdGVDYW52YXNDb250ZXh0IiwiZmluaXNoSW5pdCIsIm9yaWdpbmFsV2lkdGgiLCJwcmVTY2FsZWRXaWR0aCIsIm9yaWdpbmFsSGVpZ2h0IiwicHJlU2NhbGVkSGVpZ2h0IiwiY2FudmFzR2V0SW1hZ2VEYXRhIiwiYWxsb3dSZXZlcnQiLCJjYW52YXNQdXRJbWFnZURhdGEiLCJhZGQiLCJwdXNoQ29udGV4dCIsImFwcGx5VG9QYXJlbnQiLCJGaWx0ZXIiLCJmaWx0ZXJGdW5jIiwicmVnaXN0ZXJCbGVuZGVyIiwicmVnaXN0ZXIiLCJDb252ZXJ0IiwiY2hhckF0IiwicGFyc2VJbnQiLCJsIiwiaCIsInMiLCJkIiwicSIsImh1ZVRvUkdCIiwidCIsInYiLCJmIiwicG93IiwieiIsIndoaXRlWCIsIndoaXRlWSIsIndoaXRlWiIsInh5eiIsInJnYlRvWFlaIiwieHl6VG9MYWIiLCJDYWxjdWxhdGUiLCJ4MSIsInkxIiwieDIiLCJ5MiIsImdldEZsb2F0IiwicmFuZCIsInRvRml4ZWQiLCJyb3VuZCIsImNvbnRyb2xQb2ludHMiLCJsb3dCb3VuZCIsImhpZ2hCb3VuZCIsImJlemllciIsImxlcnAiLCJjbGFtcCIsInByZXYiLCJuZXh0IiwiZW5kWCIsIm1pc3NpbmdWYWx1ZXMiLCJ2YWx1ZXMiLCJrZXlzIiwicmV0IiwibGVmdENvb3JkIiwicmlnaHRDb29yZCIsInJlZ2lzdGVyRmlsdGVyIiwiY29sb3IiLCJoZXhUb1JHQiIsInByb2Nlc3MiLCJhdmciLCJhbXQiLCJhYnMiLCJsdW1pbmFuY2UiLCJoc3YiLCJyZ2JUb0hTViIsImhzdlRvUkdCIiwicmdiIiwibGV2ZWwiLCJyYW5kb21SYW5nZSIsImNoYW4iLCJyZWQiLCJncmVlbiIsImJsdWUiLCJjaGFucyIsImNwcyIsImxhc3QiLCJhbGdvIiwic3BsaXQiLCJjdHJsMSIsImN0cmwyIiwicmV2ZXJzZSIsImN1cnZlcyIsInZpZ25ldHRlRmlsdGVycyIsInN0cmVuZ3RoIiwicmVnaXN0ZXJDYW1lcmFGaWx0ZXIiLCJzaXplIiwiY2VudGVyIiwiZGlzdCIsImRpdiIsImxvY2F0aW9uWFkiLCJkaXN0YW5jZSIsImRlZmF1bHRzIiwiZGltIiwicGVyY2VudCIsIl9pIiwiX2xlbiIsIl9yZWYiLCJleHRlbmQiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiY29ybmVyUmFkaXVzIiwiaW1hZ2UiLCJtZXRob2QiLCJjb29yZHMiLCJsZWZ0IiwiYm90dG9tIiwiY29ybmVycyIsInRvcCIsInJpZ2h0IiwibWF4RGlzdCIsInJhZGlhbERpc3QiLCJjb3JlcnMiLCJyZWdpc3RlckJsdXJGaWx0ZXIiLCJkZWdyZWVzIiwicmVnaXN0ZXJQb3N0ZXJpemVGaWx0ZXIiLCJudW1PZkFyZWFzIiwibnVtT2ZWYWx1ZXMiLCJyZWdpc3RlclByZXNldEZpbHRlciIsInZpZ25ldHRlIiwiZ3JleXNjYWxlIiwiY29udHJhc3QiLCJub2lzZSIsInNlcGlhIiwiY2hhbm5lbHMiLCJnYW1tYSIsImJyaWdodG5lc3MiLCJleHBvc3VyZSIsInNhdHVyYXRpb24iLCJncmV5IiwidmlicmFuY2UiLCJzaGFycGVuIiwicG9zdGVyaXplIiwiY2xpcCIsImNvbG9yaXplIiwic2V0QmxlbmRpbmdNb2RlIiwiY29weVBhcmVudCIsInN0YWNrQmx1ciIsImh1ZSIsIkJsdXJTdGFjayIsIm11bFRhYmxlIiwic2hnVGFibGUiLCJyZWdpc3RlclN0YWNrQmx1clBsdWdpbiIsInJhZGl1cyIsImJJblN1bSIsImJPdXRTdW0iLCJiU3VtIiwiZ0luU3VtIiwiZ091dFN1bSIsImdTdW0iLCJoZWlnaHRNaW51czEiLCJtdWxTdW0iLCJwYiIsInBnIiwicGl4ZWxzIiwicHIiLCJySW5TdW0iLCJyT3V0U3VtIiwiclN1bSIsInJhZGl1c1BsdXMxIiwicmJzIiwic2hnU3VtIiwic3RhY2siLCJzdGFja0VuZCIsInN0YWNrSW4iLCJzdGFja091dCIsInN0YWNrU3RhcnQiLCJzdW1GYWN0b3IiLCJ3aWR0aE1pbnVzMSIsInlpIiwieXAiLCJ5dyIsIl9qIiwiX2siLCJfbCIsIl9tIiwiX24iLCJfbyIsIl9wIiwiX3EiLCJpc05hTiIsInJlZ2lzdGVyU3RhY2tCbHVyRmlsdGVyIiwicHJvY2Vzc1BsdWdpbiIsInJlZ2lzdGVyUGx1Z2luIiwicmVnaXN0ZXJQbHVnaW5GaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLGlCQUFpQixDQUFDLFVBQUQsRUFBYSxVQUFiLENBQXZCOzs7Ozs7Ozs7Ozs7OztJQWFxQkM7Ozs7Ozs7OztnQ0FFSEMsS0FBSztXQUNkLElBQUlDLEdBQVQsSUFBZ0JELEdBQWhCLEVBQXFCO1lBQ2ZGLGVBQWVJLE9BQWYsS0FBMkIsQ0FBQyxDQUFoQyxFQUFtQztlQUM1QkQsR0FBTCxJQUFZRCxJQUFJQyxHQUFKLENBQVo7OztVQUdBRSxRQUFKLElBQWdCSCxJQUFJRyxRQUFKLENBQWFDLEtBQWIsQ0FBbUIsSUFBbkIsQ0FBaEI7YUFDTyxJQUFQOzs7Ozs7OzZCQUllSixLQUFLO1dBQ2YsSUFBSUMsR0FBVCxJQUFnQkQsR0FBaEIsRUFBcUI7WUFDZkYsZUFBZUksT0FBZixLQUEyQixDQUFDLENBQWhDLEVBQW1DO2VBQzVC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LEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLEVBQXdCLEVBQXhCLEVBQTRCLEVBQTVCLEVBQWdDLEVBQWhDLEVBQW9DLEVBQXBDLEVBQXdDLEVBQXhDLEVBQTRDLEVBQTVDLEVBQWdELEVBQWhELEVBQW9ELEVBQXBELEVBQXdELEVBQXhELEVBQTRELEVBQTVELEVBQWdFLEVBQWhFLEVBQW9FLEVBQXBFLEVBQXdFLEVBQXhFLEVBQTRFLEVBQTVFLEVBQWdGLEVBQWhGLEVBQW9GLEVBQXBGLEVBQXdGLEVBQXhGLEVBQTRGLEVBQTVGLEVBQWdHLEVBQWhHLEVBQW9HLEVBQXBHLEVBQXdHLEVBQXhHLEVBQTRHLEVBQTVHLEVBQWdILEVBQWhILEVBQW9ILEVBQXBILEVBQXdILEVBQXhILEVBQTRILEVBQTVILEVBQWdJLEVBQWhJLEVBQW9JLEVBQXBJLEVBQXdJLEVBQXhJLEVBQTRJLEVBQTVJLEVBQWdKLEVBQWhKLEVBQW9KLEVBQXBKLEVBQXdKLEVBQXhKLEVBQTRKLEVBQTVKLEVBQWdLLEVBQWhLLEVBQW9LLEVBQXBLLEVBQXdLLEVBQXhLLEVBQTRLLEVBQTVLLEVBQWdMLEVBQWhMLEVBQW9MLEVBQXBMLEVBQXdMLEVBQXhMLEVBQTRMLEVBQTVMLEVBQWdNLEVBQWhNLEVBQW9NLEVBQXBNLEVBQXdNLEVBQXhNLEVBQTRNLEVBQTVNLEVBQWdOLEVBQWhOLEVBQW9OLEVBQXBOLEVBQXdOLEVBQXhOLEVBQTROLEVBQTVOLEVBQWdPLEVBQWhPLEVBQW9PLEVBQXBPLEVBQXdPLEVBQXhPLEVBQTRPLEVBQTVPLEVBQWdQLEVBQWhQLEVBQW9QLEVBQXBQLEVBQXdQLEVBQXhQLEVBQTRQLEVBQTVQLEVBQWdRLEVBQWhRLEVBQW9RLEVBQXBRLEVBQXdRLEVBQXhRLEVBQTRRLEVBQTVRLEVBQWdSLEVBQWhSLEVBQW9SLEVBQXBSLEVBQXdSLEVBQXhSLEVBQTRSLEVBQTVSLEVBQWdTLEVBQWhTLEVBQW9TLEVBQXBTLEVBQXdTLEVBQXhTLEVBQTRTLEVBQTVTLEVBQWdU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
