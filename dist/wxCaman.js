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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3hDYW1hbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2NvcmUvbW9kdWxlLmpzIiwiLi4vc3JjL2NvcmUvdXRpbC5qcyIsIi4uL3NyYy9jb3JlL2FuYWx5emUuanMiLCIuLi9zcmMvY29yZS9ldmVudC5qcyIsIi4uL3NyYy9jb3JlL2NvbmZpZy5qcyIsIi4uL3NyYy9jb3JlL2xvZ2dlci5qcyIsIi4uL3NyYy9jb3JlL3BsdWdpbi5qcyIsIi4uL3NyYy9jb3JlL3BpeGVsLmpzIiwiLi4vc3JjL2NvcmUvcmVuZGVyZXIuanMiLCIuLi9zcmMvY29yZS9ibGVuZGVyLmpzIiwiLi4vc3JjL2NvcmUvbGF5ZXIuanMiLCIuLi9zcmMvY29yZS9jYW1hbi5qcyIsIi4uL3NyYy9jb3JlL2ZpbHRlci5qcyIsIi4uL3NyYy9saWIvYmxlbmRlcnMuanMiLCIuLi9zcmMvY29yZS9jb252ZXJ0LmpzIiwiLi4vc3JjL2NvcmUvY2FsY3VsYXRlLmpzIiwiLi4vc3JjL2xpYi9maWx0ZXJzLmpzIiwiLi4vc3JjL2xpYi9jYW1lcmEuanMiLCIuLi9zcmMvbGliL2JsdXIuanMiLCIuLi9zcmMvbGliL3Bvc3Rlcml6ZS5qcyIsIi4uL3NyYy9saWIvcHJlc2V0cy5qcyIsIi4uL3NyYy9saWIvc3RhY2tCbHVyLmpzIiwiLi4vc3JjL2xpYi9wbHVnaW5zLmpzIiwiLi4vc3JjL2NvcmUvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCBtb2R1bGVLZXl3b3JkcyA9IFsnZXh0ZW5kZWQnLCAnaW5jbHVkZWQnXVxuXG4vKipcbiAqIEZvciB0aGUgcGFydHMgb2YgdGhpcyBjb2RlIGFkYXB0ZWQgZnJvbSBodHRwOi8vYXJjdHVyby5naXRodWIuY29tL2xpYnJhcnkvY29mZmVlc2NyaXB0LzAzX2NsYXNzZXMuaHRtbFxuICogYmVsb3cgaXMgdGhlIHJlcXVpcmVkIGNvcHlyaWdodCBub3RpY2UuXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEgQWxleGFuZGVyIE1hY0NhdyAoaW5mb0BlcmliaXVtLm9yZylcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBNb2R1bGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kdWxlIHtcbiAgLy8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdCBpdHNlbGYgbGlrZSBhIHN0YXRpYyBtZXRob2RcbiAgc3RhdGljIGV4dGVuZHMgKG9iaikge1xuICAgIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChtb2R1bGVLZXl3b3Jkcy5pbmRleE9mID09PSAtMSkge1xuICAgICAgICB0aGlzW2tleV0gPSBvYmpba2V5XVxuICAgICAgfVxuICAgIH1cbiAgICBvYmouZXh0ZW5kZWQgJiYgb2JqLmV4dGVuZGVkLmFwcGx5KHRoaXMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIEluY2x1ZGUgbWV0aG9kcyBvbiB0aGUgb2JqZWN0IHByb3RvdHlwZVxuICBzdGF0aWMgaW5jbHVkZXMgKG9iaikge1xuICAgIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChtb2R1bGVLZXl3b3Jkcy5pbmRleE9mID09PSAtMSkge1xuICAgICAgICB0aGlzLnByb3RvdHlwZVtrZXldID0gb2JqW2tleV1cbiAgICAgIH1cbiAgICB9XG4gICAgb2JqLmluY2x1ZGVkICYmIG9iai5pbmNsdWRlZC5hcHBseSh0aGlzKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBBZGQgbWV0aG9kcyBvbiB0aGlzIHByb3RvdHlwZSB0aGF0IHBvaW50IHRvIGFub3RoZXIgbWV0aG9kXG4gIC8vIG9uIGFub3RoZXIgb2JqZWN0J3MgcHJvdG90eXBlLlxuICBzdGF0aWMgZGVsZWdhdGUgKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBhcmdzLnBvcCgpXG4gICAgZm9yIChsZXQgaSBpbiBhcmdzKSB7XG4gICAgICBjb25zdCBzb3VyY2UgPSBhcmdzW2ldXG4gICAgICB0aGlzLnByb3RvdHlwZVtzb3VyY2VdID0gdGFyZ2V0LnByb3RvdHlwZVtzb3VyY2VdXG4gICAgfVxuICB9XG5cbiAgLy8gQ3JlYXRlIGFuIGFsaWFzIGZvciBhIGZ1bmN0aW9uXG4gIHN0YXRpYyBhbGlhc0Z1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIHRoaXMucHJvdG90eXBlW3RvXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICB0aGlzLnByb3RvdHlwZVtmcm9tXS5hcHBseSh0aGlzLCBhcmdzKVxuICAgIH1cbiAgfVxuXG4gIC8vIENyZWF0ZSBhbiBhbGlhcyBmb3IgYSBwcm9wZXJ0eVxuICBzdGF0aWMgYWxpYXNQcm9wZXJ0eSAodG8sIGZyb20pIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5wcm90b3R5cGUsIHRvLCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2Zyb21dXG4gICAgICB9LFxuICAgICAgc2V0ICh2YWwpIHtcbiAgICAgICAgdGhpc1tmcm9tXSA9IHZhbFxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBFeGVjdXRlIGEgZnVuY3Rpb24gaW4gdGhlIGNvbnRleHQgb2YgdGhlIG9iamVjdCxcbiAgLy8gYW5kIHBhc3MgYSByZWZlcmVuY2UgdG8gdGhlIG9iamVjdCdzIHByb3RvdHlwZS5cbiAgc3RhdGljIGluY2x1ZGVkIChmdW5jKSB7XG4gICAgZnVuYy5jYWxsKHRoaXMsIHRoaXMucHJvdG90eXBlKVxuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gbm9vcCAoKSB7fVxuXG4vKipcbiAqXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIFV0aWxcbiAqL1xuZXhwb3J0IGNsYXNzIFV0aWwge1xuICBzdGF0aWMgdW5pcWlkIChsZW4gPSA3KSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzUpLnN1YnN0cigyLCBsZW4pXG4gIH1cblxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdGhhdCBleHRlbmRzIG9uZSBvYmplY3Qgd2l0aCBhbGwgdGhlIHByb3BlcmllcyBvZiBvdGhlciBvYmplY3RzXG4gIHN0YXRpYyBleHRlbmQgKG9iaiwgLi4uc3JjKSB7XG4gICAgY29uc3QgZGVzdCA9IG9ialxuICAgIGZvciAobGV0IGkgaW4gc3JjKSB7XG4gICAgICBsZXQgY29weSA9IHNyY1tpXVxuICAgICAgZm9yIChsZXQgcHJvcCBpbiBjb3B5KSB7XG4gICAgICAgIGlmIChjb3B5Lmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgZGVzdFtwcm9wXSA9IGNvcHlbcHJvcF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZXN0XG4gIH1cblxuICAvLyBJbiBvcmRlciB0byBzdGF5IHRydWUgdG8gdGhlIGxhdGVzdCBzcGVjLCBSR0IgdmFsdWVzIG11c3QgYmUgY2xhbXBlZCBiZXR3ZWVuIDAgYW5kIDI1NS4gSWYgd2UgZG9uJ3QgZG8gdGhpcywgd2VpcmQgdGhpbmdzIGhhcHBlbi5cbiAgc3RhdGljIGNsYW1wUkdCICh2YWwpIHtcbiAgICBpZiAodmFsIDwgMCkge1xuICAgICAgcmV0dXJuIDBcbiAgICB9XG4gICAgaWYgKHZhbCA+IDI1NSkge1xuICAgICAgcmV0dXJuIDI1NVxuICAgIH1cblxuICAgIHJldHVybiB2YWxcbiAgfVxuXG4gIHN0YXRpYyBjb3B5QXR0cmlidXRlcyAoZnJvbSwgdG8sIG9wdHMgPSB7fSkge1xuICAgIGZvciAobGV0IGkgaW4gZnJvbS5hdHRyaWJ1dGVzKSB7XG4gICAgICBsZXQgYXR0ciA9IGZyb20uYXR0cmlidXRlc1tpXVxuICAgICAgaWYgKG9wdHMuZXhjZXB0ICYmIG9wdHMuZXhjZXB0LmluZGV4T2YoYXR0ci5ub2RlTmFtZSkgIT09IC0xKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICB0by5zZXRBdHRyaWJ1dGUoYXR0ci5ub2RlTmFtZSwgYXR0ci5ub2RlVmFsdWUpXG4gICAgfVxuICB9XG5cbiAgLy8gU3VwcG9ydCBmb3IgYnJvd3NlcnMgdGhhdCBkb24ndCBrbm93IFVpbnQ4QXJyYXkgKHN1Y2ggYXMgSUU5KVxuICBzdGF0aWMgZGF0YUFycmF5IChsZW5ndGggPSAwKSB7XG4gICAgaWYgKFVpbnQ4Q2xhbXBlZEFycmF5KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGxlbmd0aClcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBBcnJheShsZW5ndGgpXG4gIH1cbn1cbiIsIi8qKlxuICogVmFyaW91cyBpbWFnZSBhbmFseXNpcyBtZXRob2RzXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEFuYWx5emVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5hbHl6ZSB7XG4gIGNvbnN0cnVjdG9yIChjKSB7XG4gICAgdGhpcy5jID0gY1xuICB9XG5cbiAgLy8gQHJldHVybiB7T2JqZWN0fSBIYXNoIG9mIFJHQiBjaGFubmVscyBhbmQgdGhlIG9jY3VycmVuY2Ugb2YgZWFjaCB2YWx1ZVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBudW1iZXIgb2Ygb2NjdXJyZW5jZXMgb2YgZWFjaCBjb2xvciB2YWx1ZSB0aHJvdWdob3V0IHRoZSBpbWFnZS5cbiAgICpcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gSGFzaCBvZiBSR0IgY2hhbm5lbHMgYW5kIHRoZSBvY2N1cnJlbmNlcyBvZiBlYWNoIHZhbHVlXG4gICAqIEBtZW1iZXJvZiBBbmFseXplXG4gICAqL1xuICBjYWxjdWxhdGVMZXZlbHMgKCkge1xuICAgIGNvbnN0IGxldmVscyA9IHtcbiAgICAgIHI6IHt9LFxuICAgICAgZzoge30sXG4gICAgICBiOiB7fVxuICAgIH1cbiAgICAvLyBJbml0aWFsaXplIGFsbCB2YWx1ZXMgdG8gMCBmaXJzdCBzbyB0aGVyZSBhcmUgbm8gZGF0YSBnYXBzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMjU1OyBpKyspIHtcbiAgICAgIGxldmVscy5yW2ldID0gMFxuICAgICAgbGV2ZWxzLmdbaV0gPSAwXG4gICAgICBsZXZlbHMuYltpXSA9IDBcbiAgICB9XG5cbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggZWFjaCBwaXhlbCBibG9jayBhbmQgaW5jcmVtZW50IHRoZSBsZXZlbCBjb3VudGVyc1xuICAgIGZvciAobGV0IGkgPSAwLCBqID0gdGhpcy5jLnBpeGVsRGF0YS5sZW5ndGg7IGkgPCBqOyBpICs9IDQpIHtcbiAgICAgIGxldmVscy5yW3RoaXMuYy5waXhlbERhdGFbaV1dKytcbiAgICAgIGxldmVscy5nW3RoaXMuYy5waXhlbERhdGFbaSArIDFdXSsrXG4gICAgICBsZXZlbHMuYlt0aGlzLmMucGl4ZWxEYXRhW2kgKyAyXV0rK1xuICAgIH1cblxuICAgIC8vIE5vcm1hbGl6ZSBhbGwgb2YgdGhlIG51bWJlcnMgYnkgY29udmVydGluZyB0aGVtIHRvIHBlcmNlbnRhZ2VzIGJldHdlZW5cbiAgICAvLyAwIGFuZCAxLjBcbiAgICBjb25zdCBudW1QaXhlbHMgPSB0aGlzLmMucGl4ZWxEYXRhLmxlbmd0aCAvIDRcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDI1NTsgaSsrKSB7XG4gICAgICBsZXZlbHMucltpXSAvPSBudW1QaXhlbHNcbiAgICAgIGxldmVscy5nW2ldIC89IG51bVBpeGVsc1xuICAgICAgbGV2ZWxzLmJbaV0gLz0gbnVtUGl4ZWxzXG4gICAgfVxuICAgIHJldHVybiBsZXZlbHNcbiAgfVxufVxuIiwiLyoqXG4gKiBFdmVudCBzeXN0ZW0gdGhhdCBjYW4gYmUgdXNlZCB0byByZWdpc3RlciBjYWxsYmFja3MgdGhhdCBnZXQgZmlyZWQgZHVyaW5nIGNlcnRhaW4gdGltZXMgaW4gdGhlIHJlbmRlciBwcm9jZXNzLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBFdmVudFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudCB7XG4gIHN0YXRpYyBldmVudHMgPSB7fVxuICAvLyBBbGwgb2YgdGhlIHN1cHBvcnRlZCBldmVudCB0eXBlc1xuICBzdGF0aWMgdHlwZXMgPSBbXG4gICAgJ3Byb2Nlc3NTdGFydCcsXG4gICAgJ3Byb2Nlc3NDb21wbGV0ZScsXG4gICAgJ3JlbmRlclN0YXJ0JyxcbiAgICAncmVuZGVyRmluaXNoZWQnLFxuICAgICdibG9ja1N0YXJ0ZWQnLFxuICAgICdibG9ja0ZpbmlzaGVkJyxcbiAgICAnX3BpeGVsRGF0YVJlYWR5J1xuICBdXG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgYW4gZXZlbnQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgQ2FtYW4gfSB0YXJnZXQgSW5zdGFuY2Ugb2YgQ2FtYW4gZW1pdHRpbmcgdGhlIGV2ZW50LlxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSB0eXBlIFRoZSBldmVudCB0eXBlLlxuICAgKiBAcGFyYW0geyBPYmplY3QgfSBbZGF0YT1udWxsXSBFeHRyYSBkYXRhIHRvIHNlbmQgd2l0aCB0aGUgZXZlbnQuXG4gICAqIEBtZW1iZXJvZiBFdmVudFxuICAgKi9cbiAgc3RhdGljIHRyaWdnZXIgKHRhcmdldCwgdHlwZSwgZGF0YSA9IG51bGwpIHtcbiAgICBpZiAodGhpcy5ldmVudHNbdHlwZV0gJiYgdGhpcy5ldmVudHNbdHlwZV0ubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpIGluIHRoaXMuZXZlbnRzW3R5cGVdKSB7XG4gICAgICAgIGxldCBldmVudCA9IHRoaXMuZXZlbnRzW3R5cGVdW2ldXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IG51bGwgfHwgdGFyZ2V0LmlkID09PSBldmVudC50YXJnZXQuaWQpIHtcbiAgICAgICAgICBldmVudC5mbi5jYWxsKHRhcmdldCwgZGF0YSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gZm9yIGFuIGV2ZW50LiBPcHRpb25hbGx5IGJpbmQgdGhlIGxpc3RlbiB0byBhIHNpbmdsZSBpbnN0YW5jZSBvciBhbGwgaW5zdGFuY2VzLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBvdmVybG9hZCBsaXN0ZW4odGFyZ2V0LCB0eXBlLCBmbilcbiAgICogTGlzdGVuIGZvciBldmVudHMgZW1pdHRlZCBmcm9tIGEgcGFydGljdWxhciBDYW1hbiBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHsgQ2FtYW4gfSB0YXJnZXQgVGhlIGluc3RhbmNlIHRvIGxpc3RlbiB0by5cbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gdHlwZSBUaGUgdHlwZSBvZiBldmVudCB0byBsaXN0ZW4gZm9yLlxuICAgKiBAcGFyYW0geyBGdW5jdGlvbiB9IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cbiAgICpcbiAgICogQG92ZXJsb2FkIGxpc3Rlbih0eXBlLCBmbilcbiAgICogTGlzdGVuIGZvciBhbiBldmVudCBmcm9tIGFsbCBDYW1hbiBpbnN0YW5jZXMuXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHR5cGUgVGhlIHR5cGUgb2YgZXZlbnQgdG8gbGlzdGVuIGZvci5cbiAgICogQHBhcmFtIHsgRnVuY3Rpb24gfSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAqIEBtZW1iZXJvZiBFdmVudFxuICAgKi9cbiAgc3RhdGljIGxpc3RlbiAodGFyZ2V0LCB0eXBlLCBmbikge1xuICAgIC8vIEFkanVzdCBhcmd1bWVudHMgaWYgdGFyZ2V0IGlzIG9taXR0ZWRcbiAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IF90eXBlID0gdGFyZ2V0XG4gICAgICBjb25zdCBfZm4gPSB0eXBlXG5cbiAgICAgIHRhcmdldCA9IG51bGxcbiAgICAgIHR5cGUgPSBfdHlwZVxuXG4gICAgICBmbiA9IF9mblxuICAgIH1cblxuICAgIC8vIFZhbGlkYXRpb25cbiAgICBpZiAodGhpcy50eXBlcy5pbmRleE9mKHR5cGUpID09PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmV2ZW50c1t0eXBlXSkge1xuICAgICAgdGhpcy5ldmVudHNbdHlwZV0gPSBbXVxuICAgIH1cbiAgICB0aGlzLmV2ZW50c1t0eXBlXS5wdXNoKHt0YXJnZXQsIGZufSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgc3RhdGljIG9uY2UgKHRhcmdldCwgdHlwZSwgZm4pIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXNcbiAgICBmdW5jdGlvbiBvbiAoKSB7XG4gICAgICBfdGhpcy5vZmYodGFyZ2V0LCB0eXBlLCBvbilcbiAgICAgIGZuLmFwcGx5KF90aGlzLCBhcmd1bWVudHMpXG4gICAgfVxuICAgIG9uLmZuID0gZm5cbiAgICB0aGlzLmxpc3Rlbih0YXJnZXQsIHR5cGUsIG9uKVxuICB9XG5cbiAgc3RhdGljIG9mZiAodGFyZ2V0LCB0eXBlLCBmbikge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdGhpcy5ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgLy8gQWRqdXN0IGFyZ3VtZW50cyBpZiB0YXJnZXQgaXMgb21pdHRlZFxuICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgX3R5cGUgPSB0YXJnZXRcbiAgICAgIGNvbnN0IF9mbiA9IHR5cGVcblxuICAgICAgdGFyZ2V0ID0gbnVsbFxuICAgICAgdHlwZSA9IF90eXBlXG5cbiAgICAgIGZuID0gX2ZuXG4gICAgfVxuXG4gICAgY29uc3QgY2JzID0gdGhpcy5ldmVudHNbdHlwZV1cbiAgICBpZiAoIWNicykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKCFmbikge1xuICAgICAgdGhpcy5ldmVudHNbdHlwZV0gPSBudWxsXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNwZWNpZmljIGhhbmRsZXJcbiAgICAgIGxldCBjYlxuICAgICAgbGV0IGkgPSBjYnMubGVuZ3RoXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGNiID0gY2JzW2ldXG4gICAgICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICAgICAgY2JzLnNwbGljZShpLCAxKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImNvbnN0IENvbmZpZyA9IHtcbiAgLy8gRGVidWcgbW9kZSBlbmFibGVzIGNvbnNvbGUgbG9nZ2luZy5cbiAgREVCVUc6IGZhbHNlLFxuICAvLyBBbGwgb2YgdGhlIGRpZmZlcmVudCByZW5kZXIgb3BlcmF0aXZlc1xuICBGSUxURVJfVFlQRToge1xuICAgIFNpbmdsZTogMSxcbiAgICBLZXJuZWw6IDIsXG4gICAgTGF5ZXJEZXF1ZXVlOiAzLFxuICAgIExheWVyRmluaXNoZWQ6IDQsXG4gICAgTG9hZE92ZXJsYXk6IDUsXG4gICAgUGx1Z2luOiA2XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlnXG4iLCJpbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uZmlnJ1xuLyoqXG4gKiBTaW1wbGUgY29uc29sZSBsb2dnZXIgY2xhc3MgdGhhdCBjYW4gYmUgdG9nZ2xlZCBvbiBhbmQgb2ZmIGJhc2VkIG9uIENhbWFuLkRFQlVHXG4gKlxuICogQGNsYXNzIExvZ2dlclxuICovXG5jbGFzcyBMb2dnZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgY29uc3QgbG9nTGV2ZWwgPSBbJ2xvZycsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InXVxuICAgIGZvciAobGV0IGkgaW4gbG9nTGV2ZWwpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBsb2dMZXZlbFtpXVxuICAgICAgdGhpc1tuYW1lXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGlmICghQ29uZmlnLkRFQlVHKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zb2xlW25hbWVdLmFwcGx5KGNvbnNvbGUsIGFyZ3MpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBXZSdyZSBwcm9iYWJseSB1c2luZyBJRTkgb3IgZWFybGllclxuICAgICAgICAgIGNvbnNvbGVbbmFtZV0oYXJncylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRlYnVnID0gdGhpcy5sb2dcbiAgfVxufVxuXG5jb25zdCBMb2cgPSBuZXcgTG9nZ2VyKClcbmV4cG9ydCBkZWZhdWx0IExvZ1xuIiwiLyoqXG4gKiBTdG9yZXMgYW5kIHJlZ2lzdGVycyBzdGFuZGFsb25lIHBsdWdpbnNcbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUGx1Z2luXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbiB7XG4gIHN0YXRpYyBwbHVnaW5zID0ge31cblxuICBzdGF0aWMgcmVnaXN0ZXIgKG5hbWUsIHBsdWdpbikge1xuICAgIHRoaXMucGx1Z2luc1tuYW1lXSA9IHBsdWdpblxuICB9XG5cbiAgc3RhdGljIGV4ZWN1dGUgKGNvbnRleHQsIG5hbWUsIGFyZ3MpIHtcbiAgICB0aGlzLnBsdWdpbnNbbmFtZV0uYXBwbHkoY29udGV4dCwgYXJncylcbiAgfVxufVxuIiwiLyoqXG4gKiBSZXByZXNlbnRzIGEgc2luZ2xlIFBpeGVsIGluIGFuIGltYWdlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBQaXhlbFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaXhlbCB7XG4gIHN0YXRpYyBjb29yZGluYXRlc1RvTG9jYXRpb24gKHgsIHksIHdpZHRoKSB7XG4gICAgcmV0dXJuICh5ICogd2lkdGggKyB4KSAqIDRcbiAgfVxuICBzdGF0aWMgbG9jYXRpb25Ub0Nvb3JkaW5hdGVzIChsb2MsIHdpZHRoKSB7XG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IobG9jIC8gKHdpZHRoICogNCkpXG4gICAgY29uc3QgeCA9IChsb2MgJSAod2lkdGggKiA0KSkgLyA0XG5cbiAgICByZXR1cm4ge3gsIHl9XG4gIH1cblxuICBjb25zdHJ1Y3RvciAociA9IDAsIGcgPSAwLCBiID0gMCwgYSA9IDI1NSwgYyA9IG51bGwpIHtcbiAgICB0aGlzLmxvYyA9IDBcbiAgICB0aGlzLnIgPSByXG4gICAgdGhpcy5nID0gZ1xuICAgIHRoaXMuYiA9IGJcbiAgICB0aGlzLmEgPSBhXG4gICAgdGhpcy5jID0gY1xuICB9XG5cbiAgc2V0Q29udGV4dCAoYykge1xuICAgIHRoaXMuYyA9IGNcbiAgfVxuXG4gIC8vIFJldHJpZXZlcyB0aGUgWCwgWSBsb2NhdGlvbiBvZiB0aGUgY3VycmVudCBwaXhlbC4gVGhlIG9yaWdpbiBpcyBhdCB0aGUgYm90dG9tIGxlZnQgY29ybmVyIG9mIHRoZSBpbWFnZSwgbGlrZSBhIG5vcm1hbCBjb29yZGluYXRlIHN5c3RlbS5cbiAgbG9jYXRpb25YWSAoKSB7XG4gICAgaWYgKCF0aGlzLmMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZXMgYSBDYW1hbkpTIGNvbnRleHQnKVxuICAgIH1cbiAgICBjb25zdCB5ID0gdGhpcy5jLmRpbWVuc2lvbnMuaGVpZ2h0IC0gTWF0aC5mbG9vcih0aGlzLmxvYyAvICh0aGlzLmMuZGltZW5zaW9ucy53aWR0aCAqIDQpKVxuICAgIGNvbnN0IHggPSAodGhpcy5sb2MgJSAodGhpcy5jLmRpbWVuc2lvbnMud2lkdGggKiA0KSkgLyA0XG5cbiAgICByZXR1cm4ge3gsIHl9XG4gIH1cblxuICBwaXhlbEF0TG9jYXRpb24gKGxvYykge1xuICAgIGlmICghdGhpcy5jKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVpcmVzIGEgQ2FtYW5KUyBjb250ZXh0JylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBpeGVsKFxuICAgICAgdGhpcy5jLnBpeGVsRGF0YVtsb2NdLFxuICAgICAgdGhpcy5jLnBpeGVsRGF0YVtsb2MgKyAxXSxcbiAgICAgIHRoaXMuYy5waXhlbERhdGFbbG9jICsgMl0sXG4gICAgICB0aGlzLmMucGl4ZWxEYXRhW2xvYyArIDNdLFxuICAgICAgdGhpcy5jXG4gICAgKVxuICB9XG5cbiAgLy8gUmV0dXJucyBhbiBSR0JBIG9iamVjdCBmb3IgYSBwaXhlbCB3aG9zZSBsb2NhdGlvbiBpcyBzcGVjaWZpZWQgaW4gcmVsYXRpb24gdG8gdGhlIGN1cnJlbnQgcGl4ZWwuXG4gIGdldFBpeGVsUmVsYXRpdmUgKGhvcml6LCB2ZXJ0KSB7XG4gICAgaWYgKCF0aGlzLmMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZXMgYSBDYW1hbkpTIGNvbnRleHQnKVxuICAgIH1cblxuICAgIC8vIFdlIGludmVydCB0aGUgdmVydF9vZmZzZXQgaW4gb3JkZXIgdG8gbWFrZSB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gbm9uLWludmVydGVkLiBJbiBsYXltYW5zIHRlcm1zOiAtMSBtZWFucyBkb3duIGFuZCArMSBtZWFucyB1cC5cbiAgICBjb25zdCBuZXdMb2MgPSB0aGlzLmxvYyArICh0aGlzLmMuZGltZW5zaW9ucy53aWR0aCAqIDQgKiAodmVydCAqIC0xKSkgKyAoNCAqIGhvcml6KVxuXG4gICAgaWYgKG5ld0xvYyA+IHRoaXMuYy5waXhlbERhdGEubGVuZ3RoIHx8IG5ld0xvYyA8IDApIHtcbiAgICAgIHJldHVybiBuZXcgUGl4ZWwoMCwgMCwgMCwgMjU1LCB0aGlzLmMpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGl4ZWxBdExvY2F0aW9uKG5ld0xvYylcbiAgfVxuXG4gIC8vIFRoZSBjb3VudGVycGFydCB0byBnZXRQaXhlbFJlbGF0aXZlLCB0aGlzIHVwZGF0ZXMgdGhlIHZhbHVlIG9mIGEgcGl4ZWwgd2hvc2UgbG9jYXRpb24gaXMgc3BlY2lmaWVkIGluIHJlbGF0aW9uIHRvIHRoZSBjdXJyZW50IHBpeGVsLlxuICBzdGF0aWMgcHV0UGl4ZWxSZWxhdGl2ZSAoaG9yaXosIHZlcnQsIHJnYmEpIHtcbiAgICBpZiAoIXRoaXMuYykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlcyBhIENhbWFuSlMgY29udGV4dCcpXG4gICAgfVxuXG4gICAgY29uc3QgbmV3TG9jID0gdGhpcy5sb2MgKyAodGhpcy5jLmRpbWVuc2lvbnMud2lkdGggKiA0ICogKHZlcnQgKiAtMSkpICsgKDQgKiBob3JpeilcblxuICAgIGlmIChuZXdMb2MgPiB0aGlzLmMucGl4ZWxEYXRhLmxlbmd0aCB8fCBuZXdMb2MgPCAwKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLmMucGl4ZWxEYXRhW25ld0xvY10gPSByZ2JhLnJcbiAgICB0aGlzLmMucGl4ZWxEYXRhW25ld0xvYyArIDFdID0gcmdiYS5nXG4gICAgdGhpcy5jLnBpeGVsRGF0YVtuZXdMb2MgKyAyXSA9IHJnYmEuYlxuICAgIHRoaXMuYy5waXhlbERhdGFbbmV3TG9jICsgM10gPSByZ2JhLmFcblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICAvLyBHZXRzIGFuIFJHQkEgb2JqZWN0IGZvciBhbiBhcmJpdHJhcnkgcGl4ZWwgaW4gdGhlIGNhbnZhcyBzcGVjaWZpZWQgYnkgYWJzb2x1dGUgWCwgWSBjb29yZGluYXRlc1xuICBnZXRQaXhlbCAoeCwgeSkge1xuICAgIGlmICghdGhpcy5jKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVpcmVzIGEgQ2FtYW5KUyBjb250ZXh0JylcbiAgICB9XG5cbiAgICBjb25zdCBsb2MgPSB0aGlzLmNvb3JkaW5hdGVzVG9Mb2NhdGlvbih4LCB5LCB0aGlzLndpZHRoKVxuICAgIHJldHVybiB0aGlzLnBpeGVsQXRMb2NhdGlvbihsb2MpXG4gIH1cblxuICAvLyBVcGRhdGVzIHRoZSBwaXhlbCBhdCB0aGUgZ2l2ZW4gWCwgWSBjb29yZGluYXRlXG4gIHB1dFBpeGVsICh4LCB5LCByZ2JhKSB7XG4gICAgaWYgKCF0aGlzLmMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZXMgYSBDYW1hbkpTIGNvbnRleHQnKVxuICAgIH1cblxuICAgIGNvbnN0IGxvYyA9IHRoaXMuY29vcmRpbmF0ZXNUb0xvY2F0aW9uKHgsIHksIHRoaXMud2lkdGgpXG5cbiAgICB0aGlzLmMucGl4ZWxEYXRhW2xvY10gPSByZ2JhLnJcbiAgICB0aGlzLmMucGl4ZWxEYXRhW2xvYyArIDFdID0gcmdiYS5nXG4gICAgdGhpcy5jLnBpeGVsRGF0YVtsb2MgKyAyXSA9IHJnYmEuYlxuICAgIHRoaXMuYy5waXhlbERhdGFbbG9jICsgM10gPSByZ2JhLmFcbiAgfVxuXG4gIHRvU3RyaW5nICgpIHtcbiAgICB0aGlzLnRvS2V5KClcbiAgfVxuXG4gIHRvSGV4IChpbmNsdWRlQWxwaGEgPSBmYWxzZSkge1xuICAgIGxldCBoZXggPSBgIyR7dGhpcy5yLnRvU3RyaW5nKDE2KX0ke3RoaXMuZy50b1N0cmluZygxNil9JHt0aGlzLmIudG9TdHJpbmcoMTYpfWBcblxuICAgIGlmIChpbmNsdWRlQWxwaGEpIHtcbiAgICAgIGhleCArPSB0aGlzLmEudG9TdHJpbmcoMTYpXG4gICAgfVxuICAgIHJldHVybiBoZXhcbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4vdXRpbCdcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2dnZXInXG5pbXBvcnQgUGx1Z2luIGZyb20gJy4vcGx1Z2luJ1xuaW1wb3J0IFBpeGVsIGZyb20gJy4vcGl4ZWwnXG5cbi8qKlxuICogSGFuZGxlcyBhbGwgb2YgdGhlIHZhcmlvdXMgcmVuZGVyaW5nIG1ldGhvZHMgaW4gQ2FtYW4uIE1vc3Qgb2YgdGhlIGltYWdlIG1vZGlmaWNhdGlvbiBoYXBwZW5zIGhlcmUuIEEgbmV3IFJlbmRlcmVyIG9iamVjdCBpcyBjcmVhdGVkIGZvciBldmVyeSByZW5kZXIgb3BlcmF0aW9uLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBSZW5kZXJlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlciB7XG4gIC8vIFRoZSBudW1iZXIgb2YgYmxvY2tzIHRvIHNwbGl0IHRoZSBpbWFnZSBpbnRvIGR1cmluZyB0aGUgcmVuZGVyIHByb2Nlc3MgdG8gc2ltdWxhdGUgY29uY3VycmVuY3kuIFRoaXMgYWxzbyBoZWxwcyB0aGUgYnJvd3NlciBtYW5hZ2UgdGhlIChwb3NzaWJseSkgbG9uZyBydW5uaW5nIHJlbmRlciBqb2JzLlxuICBzdGF0aWMgQmxvY2tzID0gNFxuXG4gIGNvbnN0cnVjdG9yIChjKSB7XG4gICAgdGhpcy5jID0gY1xuICAgIHRoaXMucmVuZGVyUXVldWUgPSBbXVxuICAgIHRoaXMubW9kUGl4ZWxEYXRhID0gbnVsbFxuICB9XG5cbiAgYWRkIChqb2IpIHtcbiAgICBpZiAoIWpvYikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMucmVuZGVyUXVldWUucHVzaChqb2IpXG4gIH1cblxuICAvLyBHcmFicyB0aGUgbmV4dCBvcGVyYXRpb24gZnJvbSB0aGUgcmVuZGVyIHF1ZXVlIGFuZCBwYXNzZXMgaXQgdG8gUmVuZGVyZXIgZm9yIGV4ZWN1dGlvblxuICBwcm9jZXNzTmV4dCAoKSB7XG4gICAgLy8gSWYgdGhlIHF1ZXVlIGlzIGVtcHR5LCBmaXJlIHRoZSBmaW5pc2hlZCBjYWxsYmFja1xuICAgIGlmICh0aGlzLnJlbmRlclF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgRXZlbnQudHJpZ2dlcih0aGlzLCAncmVuZGVyRmluaXNoZWQnKVxuICAgICAgdGhpcy5maW5pc2hlZEZuICYmIHRoaXMuZmluaXNoZWRGbi5jYWxsKHRoaXMuYylcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHRoaXMuY3VycmVudEpvYiA9IHRoaXMucmVuZGVyUXVldWUuc2hpZnQoKVxuXG4gICAgc3dpdGNoICh0aGlzLmN1cnJlbnRKb2IudHlwZSkge1xuICAgICAgY2FzZSBDb25maWcuRklMVEVSX1RZUEUuTGF5ZXJEZXF1ZXVlOlxuICAgICAgICBjb25zdCBsYXllciA9IHRoaXMuYy5jYW52YXNRdWV1ZS5zaGlmdCgpXG4gICAgICAgIHRoaXMuYy5leGVjdXRlTGF5ZXIobGF5ZXIpXG4gICAgICAgIHRoaXMucHJvY2Vzc05leHQoKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBDb25maWcuRklMVEVSX1RZUEUuTGF5ZXJGaW5pc2hlZDpcbiAgICAgICAgdGhpcy5jLmFwcGx5Q3VycmVudExheWVyKClcbiAgICAgICAgdGhpcy5jLnBvcENvbnRleHQoKVxuICAgICAgICB0aGlzLnByb2Nlc3NOZXh0KClcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgQ29uZmlnLkZJTFRFUl9UWVBFLkxvYWRPdmVybGF5OlxuICAgICAgICB0aGlzLmxvYWRPdmVybGF5KHRoaXMuY3VycmVudEpvYi5sYXllciwgdGhpcy5jdXJyZW50Sm9iLnNyYylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgQ29uZmlnLkZJTFRFUl9UWVBFLlBsdWdpbjpcbiAgICAgICAgdGhpcy5leGVjdXRlUGx1Z2luKClcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuZXhlY3V0ZUZpbHRlcigpXG4gICAgfVxuICB9XG5cbiAgZXhlY3V0ZSAoY2FtYW5JbnN0YW5jZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmZpbmlzaGVkRm4gPSBjYWxsYmFja1xuICAgIEV2ZW50Lmxpc3RlbihjYW1hbkluc3RhbmNlLCAnX3BpeGVsRGF0YVJlYWR5JywgKCkgPT4ge1xuICAgICAgdGhpcy5tb2RQaXhlbERhdGEgPSBVdGlsLmRhdGFBcnJheSh0aGlzLmMucGl4ZWxEYXRhLmxlbmd0aClcbiAgICAgIHRoaXMucHJvY2Vzc05leHQoKVxuICAgIH0pXG4gIH1cblxuICBlYWNoQmxvY2sgKGZuKSB7XG4gICAgLy8gUHJlcGFyZSBhbGwgdGhlIHJlcXVpcmVkIHJlbmRlciBkYXRhXG4gICAgdGhpcy5ibG9ja3NEb25lID0gMFxuXG4gICAgY29uc3QgbiA9IHRoaXMuYy5waXhlbERhdGEubGVuZ3RoXG4gICAgY29uc3QgYmxvY2tQaXhlbExlbmd0aCA9IE1hdGguZmxvb3IoKG4gLyA0KSAvIFJlbmRlcmVyLkJsb2NrcylcbiAgICBjb25zdCBibG9ja04gPSBibG9ja1BpeGVsTGVuZ3RoICogNFxuICAgIGNvbnN0IGxhc3RCbG9ja04gPSBibG9ja04gKyAoKG4gLyA0KSAlIFJlbmRlcmVyLkJsb2NrcykgKiA0XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IFJlbmRlcmVyLkJsb2NrczsgaSsrKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGkgKiBibG9ja05cbiAgICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgKGkgPT09IFJlbmRlcmVyLkJsb2NrcyAtIDEgPyBsYXN0QmxvY2tOIDogYmxvY2tOKVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGZuLmNhbGwodGhpcywgaSwgc3RhcnQsIGVuZClcbiAgICAgIH0sIDApXG4gICAgfVxuICB9XG5cbiAgLy8gVGhlIGNvcmUgb2YgdGhlIGltYWdlIHJlbmRlcmluZywgdGhpcyBmdW5jdGlvbiBleGVjdXRlcyB0aGUgcHJvdmlkZWQgZmlsdGVyLlxuICAvLyBOT1RFOiB0aGlzIGRvZXMgbm90IHdyaXRlIHRoZSB1cGRhdGVkIHBpeGVsIGRhdGEgdG8gdGhlIGNhbnZhcy4gVGhhdCBoYXBwZW5zIHdoZW4gYWxsIGZpbHRlcnMgYXJlIGZpbmlzaGVkIHJlbmRlcmluZyBpbiBvcmRlciB0byBiZSBhcyBmYXN0IGFzIHBvc3NpYmxlLlxuICBleGVjdXRlRmlsdGVyICgpIHtcbiAgICBFdmVudC50cmlnZ2VyKHRoaXMuYywgJ3Byb2Nlc3NTdGFydCcsIHRoaXMuY3VycmVudEpvYilcblxuICAgIGlmICh0aGlzLmN1cnJlbnRKb2IudHlwZSA9PT0gQ29uZmlnLkZJTFRFUl9UWVBFLlNpbmdsZSkge1xuICAgICAgdGhpcy5lYWNoQmxvY2sodGhpcy5yZW5kZXJCbG9jaylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lYWNoQmxvY2sodGhpcy5yZW5kZXJLZXJuZWwpXG4gICAgfVxuICB9XG5cbiAgLy8gRXhlY3V0ZXMgYSBzdGFuZGFsb25lIHBsdWdpblxuICBleGVjdXRlUGx1Z2luICgpIHtcbiAgICBMb2cuZGVidWcoYEV4ZWN1dGluZyBwbHVnaW4gJHt0aGlzLmN1cnJlbnRKb2IucGx1Z2lufWApXG4gICAgUGx1Z2luLmV4ZWN1dGUodGhpcy5jLCB0aGlzLmN1cnJlbnRKb2IucGx1Z2luLCB0aGlzLmN1cnJlbnRKb2IuYXJncylcbiAgICBMb2cuZGVidWcoYFBsdWdpbiAke3RoaXMuY3VycmVudEpvYi5wbHVnaW59IGZpbmlzaGVkIWApXG5cbiAgICB0aGlzLnByb2Nlc3NOZXh0KClcbiAgfVxuXG4gIC8vIFJlbmRlcnMgYSBzaW5nbGUgYmxvY2sgb2YgdGhlIGNhbnZhcyB3aXRoIHRoZSBjdXJyZW50IGZpbHRlciBmdW5jdGlvblxuICByZW5kZXJCbG9jayAoYm51bSwgc3RhcnQsIGVuZCkge1xuICAgIExvZy5kZWJ1ZyhgQmxvY2sgIyR7Ym51bX0gLSBGaWx0ZXI6ICR7dGhpcy5jdXJyZW50Sm9iLm5hbWV9LCBTdGFydDogJHtzdGFydH0sIEVuZDogJHtlbmR9YClcbiAgICBFdmVudC50cmlnZ2VyKHRoaXMuYywgJ2Jsb2NrU3RhcnRlZCcsIHtcbiAgICAgIGJsb2NrTnVtOiBibnVtLFxuICAgICAgdG90YWxCbG9ja3M6IFJlbmRlcmVyLkJsb2NrcyxcbiAgICAgIHN0YXJ0UGl4ZWw6IHN0YXJ0LFxuICAgICAgZW5kUGl4ZWw6IGVuZFxuICAgIH0pXG5cbiAgICBjb25zdCBwaXhlbCA9IG5ldyBQaXhlbCgpXG4gICAgcGl4ZWwuc2V0Q29udGV4dCh0aGlzLmMpXG5cbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gNCkge1xuICAgICAgcGl4ZWwubG9jID0gaVxuXG4gICAgICBwaXhlbC5yID0gdGhpcy5jLnBpeGVsRGF0YVtpXVxuICAgICAgcGl4ZWwuZyA9IHRoaXMuYy5waXhlbERhdGFbaSArIDFdXG4gICAgICBwaXhlbC5iID0gdGhpcy5jLnBpeGVsRGF0YVtpICsgMl1cbiAgICAgIHBpeGVsLmEgPSB0aGlzLmMucGl4ZWxEYXRhW2kgKyAzXVxuXG4gICAgICB0aGlzLmN1cnJlbnRKb2IucHJvY2Vzc0ZuKHBpeGVsKVxuXG4gICAgICB0aGlzLmMucGl4ZWxEYXRhW2ldID0gVXRpbC5jbGFtcFJHQihwaXhlbC5yKVxuICAgICAgdGhpcy5jLnBpeGVsRGF0YVtpICsgMV0gPSBVdGlsLmNsYW1wUkdCKHBpeGVsLmcpXG4gICAgICB0aGlzLmMucGl4ZWxEYXRhW2kgKyAyXSA9IFV0aWwuY2xhbXBSR0IocGl4ZWwuYilcbiAgICAgIHRoaXMuYy5waXhlbERhdGFbaSArIDNdID0gVXRpbC5jbGFtcFJHQihwaXhlbC5hKVxuICAgIH1cblxuICAgIHRoaXMuYmxvY2tGaW5pc2hlZChibnVtKVxuICB9XG5cbiAgLy8gQXBwbGllcyBhbiBpbWFnZSBrZXJuZWwgdG8gdGhlIGNhbnZhc1xuICByZW5kZXJLZXJuZWwgKGJudW0sIHN0YXJ0LCBlbmQpIHtcbiAgICBjb25zdCBiaWFzID0gdGhpcy5jdXJyZW50Sm9iLmJpYXNcbiAgICBjb25zdCBkaXZpc29yID0gdGhpcy5jdXJyZW50Sm9iLmRpdmlzb3JcbiAgICBjb25zdCBuID0gdGhpcy5jLnBpeGVsRGF0YS5sZW5ndGhcblxuICAgIGNvbnN0IGFkanVzdCA9IHRoaXMuY3VycmVudEpvYi5hZGp1c3RcbiAgICBjb25zdCBhZGp1c3RTaXplID0gTWF0aC5zcXJ0KGFkanVzdC5sZW5ndGgpXG5cbiAgICBjb25zdCBrZXJuZWwgPSBbXVxuXG4gICAgTG9nLmRlYnVnKGBSZW5kZXJpbmcga2VybmVsIC0gRmlsdGVyOiAke3RoaXMuY3VycmVudEpvYi5uYW1lfWApXG5cbiAgICBzdGFydCA9IE1hdGgubWF4KHN0YXJ0LCB0aGlzLmMuZGltZW5zaW9ucy53aWR0aCAqIDQgKiAoKGFkanVzdFNpemUgLSAxKSAvIDIpKVxuICAgIGVuZCA9IE1hdGgubWluKGVuZCwgbiAtICh0aGlzLmMuZGltZW5zaW9ucy53aWR0aCAqIDQgKiAoKGFkanVzdFNpemUgLSAxKSAvIDIpKSlcblxuICAgIGNvbnN0IGJ1aWxkZXIgPSAoYWRqdXN0U2l6ZSAtIDEpIC8gMlxuXG4gICAgY29uc3QgcGl4ZWwgPSBuZXcgUGl4ZWwoKVxuICAgIHBpeGVsLnNldENvbnRleHQodGhpcy5jKVxuXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDQpIHtcbiAgICAgIHBpeGVsLmxvYyA9IGlcbiAgICAgIGxldCBidWlsZGVySW5kZXggPSAwXG5cbiAgICAgIGZvciAobGV0IGogPSAtYnVpbGRlcjsgaiA8PSBidWlsZGVyOyBqKyspIHtcbiAgICAgICAgZm9yIChsZXQgayA9IGJ1aWxkZXI7IGsgPj0gLWJ1aWxkZXI7IGstLSkge1xuICAgICAgICAgIGxldCBwID0gcGl4ZWwuZ2V0UGl4ZWxSZWxhdGl2ZShqLCBrKVxuICAgICAgICAgIGtlcm5lbFtidWlsZGVySW5kZXggKiAzXSA9IHAuclxuICAgICAgICAgIGtlcm5lbFtidWlsZGVySW5kZXggKiAzICsgMV0gPSBwLmdcbiAgICAgICAgICBrZXJuZWxbYnVpbGRlckluZGV4ICogMyArIDJdID0gcC5iXG4gICAgICAgICAgYnVpbGRlckluZGV4KytcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCByZXMgPSB0aGlzLnByb2Nlc3NLZXJuZWwoYWRqdXN0LCBrZXJuZWwsIGRpdmlzb3IsIGJpYXMpXG5cbiAgICAgIHRoaXMubW9kUGl4ZWxEYXRhW2ldID0gVXRpbC5jbGFtcFJHQihyZXMucilcbiAgICAgIHRoaXMubW9kUGl4ZWxEYXRhW2kgKyAxXSA9IFV0aWwuY2xhbXBSR0IocmVzLmcpXG4gICAgICB0aGlzLm1vZFBpeGVsRGF0YVtpICsgMl0gPSBVdGlsLmNsYW1wUkdCKHJlcy5iKVxuICAgICAgdGhpcy5tb2RQaXhlbERhdGFbaSArIDNdID0gdGhpcy5jLnBpeGVsRGF0YVtpICsgM11cbiAgICB9XG5cbiAgICB0aGlzLmJsb2NrRmluaXNoZWQoYm51bSlcbiAgfVxuXG4gIC8vIENhbGxlZCB3aGVuIGEgc2luZ2xlIGJsb2NrIGlzIGZpbmlzaGVkIHJlbmRlcmluZy4gT25jZSBhbGwgYmxvY2tzIGFyZSBkb25lLCB3ZSBzaWduYWwgdGhhdCB0aGlzIGZpbHRlciBpcyBmaW5pc2hlZCByZW5kZXJpbmcgYW5kIGNvbnRpbnVlIHRvIHRoZSBuZXh0IHN0ZXAuXG4gIGJsb2NrRmluaXNoZWQgKGJudW0pIHtcbiAgICBpZiAoYm51bSA+PSAwKSB7XG4gICAgICBMb2cuZGVidWcoYEJsb2NrICMke2JudW19IGZpbmlzaGVkISBGaWx0ZXI6ICR7dGhpcy5jdXJyZW50Sm9iLm5hbWV9YClcbiAgICB9XG4gICAgdGhpcy5ibG9ja3NEb25lKytcblxuICAgIEV2ZW50LnRyaWdnZXIodGhpcy5jLCAnYmxvY2tGaW5pc2hlZCcsIHtcbiAgICAgIGJsb2NrTnVtOiBibnVtLFxuICAgICAgYmxvY2tzRmluaXNoZWQ6IHRoaXMuYmxvY2tzRG9uZSxcbiAgICAgIHRvdGFsQmxvY2tzOiBSZW5kZXJlci5CbG9ja3NcbiAgICB9KVxuXG4gICAgaWYgKHRoaXMuYmxvY2tzRG9uZSA9PT0gUmVuZGVyZXIuQmxvY2tzKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50Sm9iLnR5cGUgPT09IENvbmZpZy5GSUxURVJfVFlQRS5LZXJuZWwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmMucGl4ZWxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5jLnBpeGVsRGF0YVtpXSA9IHRoaXMubW9kUGl4ZWxEYXRhW2ldXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGJudW0gPj0gMCkge1xuICAgICAgICBMb2cuZGVidWcoYEZpbHRlciAke3RoaXMuY3VycmVudEpvYi5uYW1lfSBmaW5pc2hlZCFgKVxuICAgICAgfVxuICAgICAgRXZlbnQudHJpZ2dlcih0aGlzLmMsICdwcm9jZXNzQ29tcGxldGUnLCB0aGlzLmN1cnJlbnRKb2IpXG4gICAgICB0aGlzLnByb2Nlc3NOZXh0KClcbiAgICB9XG4gIH1cblxuICAvLyBUaGUgXCJmaWx0ZXIgZnVuY3Rpb25cIiBmb3Iga2VybmVsIGFkanVzdG1lbnRzLlxuICBwcm9jZXNzS2VybmVsIChhZGp1c3QsIGtlcm5lbCwgZGl2aXNvciwgYmlhcykge1xuICAgIGNvbnN0IHZhbCA9IHtcbiAgICAgIHI6IDAsXG4gICAgICBnOiAwLFxuICAgICAgYjogMFxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkanVzdC5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsLnIgKz0gYWRqdXN0W2ldICoga2VybmVsW2kgKiAzXVxuICAgICAgdmFsLmcgKz0gYWRqdXN0W2ldICoga2VybmVsW2kgKiAzICsgMV1cbiAgICAgIHZhbC5iICs9IGFkanVzdFtpXSAqIGtlcm5lbFtpICogMyArIDJdXG4gICAgfVxuXG4gICAgdmFsLnIgPSAodmFsLnIgLyBkaXZpc29yKSArIGJpYXNcbiAgICB2YWwuZyA9ICh2YWwuZyAvIGRpdmlzb3IpICsgYmlhc1xuICAgIHZhbC5iID0gKHZhbC5iIC8gZGl2aXNvcikgKyBiaWFzXG4gICAgcmV0dXJuIHZhbFxuICB9XG59XG4iLCIvKipcbiAqIEJ1aWx0LWluIGxheWVyIGJsZW5kZXJzLiBNYW55IG9mIHRoZXNlIG1pbWljIFBob3Rvc2hvcCBibGVuZCBtb2Rlcy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQmxlbmRlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCbGVuZGVyIHtcbiAgc3RhdGljIGJsZW5kZXJzID0ge31cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGJsZW5kZXIuIENhbiBiZSB1c2VkIHRvIGFkZCB5b3VyIG93biBibGVuZGVycyBvdXRzaWRlIG9mIHRoZSBjb3JlIGxpYnJhcnksIGlmIG5lZWRlZC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBuYW1lIE5hbWUgb2YgdGhlIGJsZW5kZXIuXG4gICAqIEBwYXJhbSB7IEZ1bmN0aW9uIH0gZnVuYyBUaGUgYmxlbmRlciBmdW5jdGlvbi5cbiAgICogQG1lbWJlcm9mIEJsZW5kZXJcbiAgICovXG4gIHN0YXRpYyByZWdpc3RlciAobmFtZSwgZnVuYykge1xuICAgIHRoaXMuYmxlbmRlcnNbbmFtZV0gPSBmdW5jXG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZXMgYSBibGVuZGVyIHRvIGNvbWJpbmUgYSBsYXllciB3aXRoIGl0cyBwYXJlbnQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSBOYW1lIG9mIHRoZSBibGVuZGluZyBmdW5jdGlvbiB0byBpbnZva2UuXG4gICAqIEBwYXJhbSB7IE9iamVjdCB9IHJnYmFMYXllciBSR0JBIG9iamVjdCBvZiB0aGUgY3VycmVudCBwaXhlbCBmcm9tIHRoZSBsYXllci5cbiAgICogQHBhcmFtIHsgT2JqZWN0IH0gcmdiYVBhcmVudCBSR0JBIG9iamVjdCBvZiB0aGUgY29ycmVzcG9uZGluZyBwaXhlbCBpbiB0aGUgcGFyZW50IGxheWVyLlxuICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IFJHQkEgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgYmxlbmRlZCBwaXhlbC5cbiAgICogQG1lbWJlcm9mIEJsZW5kZXJcbiAgICovXG4gIHN0YXRpYyBleGVjdXRlIChuYW1lLCByZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5ibGVuZGVyc1tuYW1lXShyZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpXG4gIH1cbn1cbiIsImltcG9ydCB7IFV0aWwgfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQgQmxlbmRlciBmcm9tICcuL2JsZW5kZXInXG5cbi8qKlxuICogVGhlIGVudGlyZSBsYXllcmluZyBzeXN0ZW0gZm9yIENhbWFuIHJlc2lkZXMgaW4gdGhpcyBmaWxlLiBMYXllcnMgZ2V0IHRoZWlyIG93biBjYW52YXNMYXllciBvYmplY3Qgd2hpY2ggaXMgY3JlYXRlZCB3aGVuIG5ld0xheWVyKCkgaXMgY2FsbGVkLiBGb3IgZXh0ZW5zaXZlIGluZm9ybWF0aW9uIHJlZ2FyZGluZyB0aGUgc3BlY2lmaWNzIG9mIGhvdyB0aGUgbGF5ZXJpbmcgc3lzdGVtIHdvcmtzLCB0aGVyZSBpcyBhbiBpbi1kZXB0aCBibG9nIHBvc3Qgb24gdGhpcyB2ZXJ5IHRvcGljLlxuICogSW5zdGVhZCBvZiBjb3B5aW5nIHRoZSBlbnRpcmV0eSBvZiB0aGF0IHBvc3QsIEknbGwgc2ltcGx5IHBvaW50IHlvdSB0b3dhcmRzIHRoZSBbYmxvZyBsaW5rXShodHRwOi8vYmxvZy5tZWx0aW5naWNlLm5ldC9wcm9ncmFtbWluZy9pbXBsZW1lbnRpbmctbGF5ZXJzLWNhbWFuanMpLlxuICogSG93ZXZlciwgdGhlIGdpc3Qgb2YgdGhlIGxheWVyaW5nIHN5c3RlbSBpcyB0aGF0LCBmb3IgZWFjaCBsYXllciwgaXQgY3JlYXRlcyBhIG5ldyBjYW52YXMgZWxlbWVudCBhbmQgdGhlbiBlaXRoZXIgY29waWVzIHRoZSBwYXJlbnQgbGF5ZXIncyBkYXRhIG9yIGFwcGxpZXMgYSBzb2xpZCBjb2xvciB0byB0aGUgbmV3IGxheWVyLiBBZnRlciBzb21lIChvcHRpb25hbCkgZWZmZWN0cyBhcmUgYXBwbGllZCwgdGhlIGxheWVyIGlzIGJsZW5kZWQgYmFjayBpbnRvIHRoZSBwYXJlbnQgY2FudmFzIGxheWVyIHVzaW5nIG9uZSBvZiBtYW55IGRpZmZlcmVudCBibGVuZGluZyBhbGdvcml0aG1zLlxuICogWW91IGNhbiBhbHNvIGxvYWQgYW4gaW1hZ2UgKGxvY2FsIG9yIHJlbW90ZSwgd2l0aCBhIHByb3h5KSBpbnRvIGEgY2FudmFzIGxheWVyLCB3aGljaCBpcyB1c2VmdWwgaWYgeW91IHdhbnQgdG8gYWRkIHRleHR1cmVzIHRvIGFuIGltYWdlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBMYXllclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXllciB7XG4gIGNvbnN0cnVjdG9yIChjKSB7XG4gICAgLy8gQ29tcGF0aWJpbGl0eVxuICAgIHRoaXMuYyA9IGNcbiAgICB0aGlzLmZpbHRlciA9IGNcblxuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIGJsZW5kaW5nTW9kZTogJ25vcm1hbCcsXG4gICAgICBvcGFjaXR5OiAxLjBcbiAgICB9XG5cbiAgICAvLyBFYWNoIGxheWVyIGdldHMgaXRzIG93biB1bmlxdWUgSURcbiAgICB0aGlzLmxheWVySUQgPSBVdGlsLnVuaXFpZCgpXG5cbiAgICAvLyBDcmVhdGUgdGhlIGNhbnZhcyBmb3IgdGhpcyBsYXllclxuICAgIC8vIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcblxuICAgIC8vIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5jLmRpbWVuc2lvbnMud2lkdGhcbiAgICAvLyB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmMuZGltZW5zaW9ucy5oZWlnaHRcblxuICAgIC8vIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICAvLyB0aGlzLmNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpXG4gICAgLy8gdGhpcy5pbWFnZURhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpXG4gICAgLy8gdGhpcy5waXhlbERhdGEgPSB0aGlzLmltYWdlRGF0YS5kYXRhXG5cbiAgICB0aGlzLndpZHRoID0gdGhpcy5jLmRpbWVuc2lvbnMud2lkdGhcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuYy5kaW1lbnNpb25zLmhlaWdodFxuICAgIHRoaXMucGl4ZWxEYXRhID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHRoaXMuYy5waXhlbERhdGEubGVuZ3RoKVxuICB9XG5cbiAgLy8gSWYgeW91IHdhbnQgdG8gY3JlYXRlIG5lc3RlZCBsYXllcnNcbiAgbmV3TGF5ZXIgKGNiKSB7XG4gICAgdGhpcy5jLm5ld0xheWVyKGNiKVxuICB9XG5cbiAgLy8gU2V0cyB0aGUgYmxlbmRpbmcgbW9kZSBvZiB0aGlzIGxheWVyLiBUaGUgbW9kZSBpcyB0aGUgbmFtZSBvZiBhIGJsZW5kZXIgZnVuY3Rpb24uXG4gIHNldEJsZW5kaW5nTW9kZSAobW9kZSkge1xuICAgIHRoaXMub3B0aW9ucy5ibGVuZGluZ01vZGUgPSBtb2RlXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIFNldHMgdGhlIG9wYWNpdHkgb2YgdGhpcyBsYXllci4gVGhpcyBhZmZlY3RzIGhvdyBtdWNoIG9mIHRoaXMgbGF5ZXIgaXMgYXBwbGllZCB0byB0aGUgcGFyZW50IGxheWVyIGF0IHJlbmRlciB0aW1lLlxuICBvcGFjaXR5IChvcGFjaXR5KSB7XG4gICAgdGhpcy5vcHRpb25zLm9wYWNpdHkgPSBvcGFjaXR5IC8gMTAwXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIENvcGllcyB0aGUgY29udGVudHMgb2YgdGhlIHBhcmVudCBsYXllciB0byB0aGlzIGxheWVyXG4gIGNvcHlQYXJlbnQgKCkge1xuICAgIGNvbnN0IHBhcmVudERhdGEgPSB0aGlzLnBpeGVsRGF0YVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jLnBpeGVsRGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgdGhpcy5waXhlbERhdGFbaV0gPSBwYXJlbnREYXRhW2ldXG4gICAgICB0aGlzLnBpeGVsRGF0YVtpICsgMV0gPSBwYXJlbnREYXRhW2kgKyAxXVxuICAgICAgdGhpcy5waXhlbERhdGFbaSArIDJdID0gcGFyZW50RGF0YVtpICsgMl1cbiAgICAgIHRoaXMucGl4ZWxEYXRhW2kgKyAzXSA9IHBhcmVudERhdGFbaSArIDNdXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBGaWxscyB0aGlzIGxheWVyIHdpZHRoIGEgc2luZ2xlIGNvbG9yXG4gIGZpbGxDb2xvciAoKSB7XG4gICAgdGhpcy5jLmZpbGxDb2xvci5hcHBseSh0aGlzLmMsIGFyZ3VtZW50cylcbiAgfVxuXG4gIC8vIFRha2VzIHRoZSBjb250ZW50cyBvZiB0aGlzIGxheWVyIGFuZCBhcHBsaWVzIHRoZW0gdG8gdGhlIHBhcmVudCBsYXllciBhdCByZW5kZXIgdGltZS4gVGhpcyBzaG91bGQgbmV2ZXIgYmUgY2FsbGVkIGV4cGxpY2l0bHkgYnkgdGhlIHVzZXIuXG4gIGFwcGx5VG9QYXJlbnQgKCkge1xuICAgIGNvbnN0IHBhcmVudERhdGEgPSB0aGlzLmMucGl4ZWxTdGFja1t0aGlzLmMucGl4ZWxTdGFjay5sZW5ndGggLSAxXVxuICAgIGNvbnN0IGxheWVyRGF0YSA9IHRoaXMuYy5waXhlbERhdGFcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJEYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBjb25zdCByZ2JhUGFyZW50ID0ge1xuICAgICAgICByOiBwYXJlbnREYXRhW2ldLFxuICAgICAgICBnOiBwYXJlbnREYXRhW2kgKyAxXSxcbiAgICAgICAgYjogcGFyZW50RGF0YVtpICsgMl0sXG4gICAgICAgIGE6IHBhcmVudERhdGFbaSArIDNdXG4gICAgICB9XG4gICAgICBjb25zdCByZ2JhTGF5ZXIgPSB7XG4gICAgICAgIHI6IGxheWVyRGF0YVtpXSxcbiAgICAgICAgZzogbGF5ZXJEYXRhW2kgKyAxXSxcbiAgICAgICAgYjogbGF5ZXJEYXRhW2kgKyAyXSxcbiAgICAgICAgYTogbGF5ZXJEYXRhW2kgKyAzXVxuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN1bHQgPSBCbGVuZGVyLmV4ZWN1dGUodGhpcy5vcHRpb25zLmJsZW5kaW5nTW9kZSwgcmdiYUxheWVyLCByZ2JhUGFyZW50KVxuICAgICAgcmVzdWx0LnIgPSBVdGlsLmNsYW1wUkdCKHJlc3VsdC5yKVxuICAgICAgcmVzdWx0LmcgPSBVdGlsLmNsYW1wUkdCKHJlc3VsdC5nKVxuICAgICAgcmVzdWx0LmIgPSBVdGlsLmNsYW1wUkdCKHJlc3VsdC5iKVxuICAgICAgaWYgKCFyZXN1bHQuYSkge1xuICAgICAgICByZXN1bHQuYSA9IHJnYmFMYXllci5hXG4gICAgICB9XG5cbiAgICAgIHBhcmVudERhdGFbaV0gPSByZ2JhUGFyZW50LnIgLSAoKHJnYmFQYXJlbnQuciAtIHJlc3VsdC5yKSAqICh0aGlzLm9wdGlvbnMub3BhY2l0eSAqIChyZXN1bHQuYSAvIDI1NSkpKVxuICAgICAgcGFyZW50RGF0YVtpICsgMV0gPSByZ2JhUGFyZW50LmcgLSAoKHJnYmFQYXJlbnQuZyAtIHJlc3VsdC5nKSAqICh0aGlzLm9wdGlvbnMub3BhY2l0eSAqIChyZXN1bHQuYSAvIDI1NSkpKVxuICAgICAgcGFyZW50RGF0YVtpICsgMl0gPSByZ2JhUGFyZW50LmIgLSAoKHJnYmFQYXJlbnQuYiAtIHJlc3VsdC5iKSAqICh0aGlzLm9wdGlvbnMub3BhY2l0eSAqIChyZXN1bHQuYSAvIDI1NSkpKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IE1vZHVsZSBmcm9tICcuL21vZHVsZSdcbmltcG9ydCB7IG5vb3AsIFV0aWwgfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQgQW5hbHl6ZSBmcm9tICcuL2FuYWx5emUnXG5pbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9yZW5kZXJlcidcbi8vIGltcG9ydCBMb2cgZnJvbSAnLi9sb2dnZXInXG4vLyBpbXBvcnQgSU8gZnJvbSAnLi9pbydcbmltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50J1xuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbmZpZydcbmltcG9ydCBMYXllciBmcm9tICcuL2xheWVyJ1xuXG4vKipcbiAqIEhlcmUgaXQgYmVnaW5zLiBDYW1hbiBpcyBkZWZpbmVkLlxuICogVGhlcmUgYXJlIG1hbnkgZGlmZmVyZW50IGluaXRpYWxpemF0aW9uIGZvciBDYW1hbiwgd2hpY2ggYXJlIGRlc2NyaWJlZCBvbiB0aGUgW0d1aWRlc10oaHR0cDovL2NhbWFuanMuY29tL2d1aWRlcykuXG4gKiBJbml0aWFsaXphdGlvbiBpcyB0cmlja3kgYmVjYXVzZSB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSBldmVyeXRoaW5nIHdlIG5lZWQgaXMgYWN0dWFsbHkgZnVsbHkgbG9hZGVkIGluIHRoZSBET00gYmVmb3JlIHByb2NlZWRpbmcuIFdoZW4gaW5pdGlhbGl6ZWQgb24gYW4gaW1hZ2UsIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGltYWdlIGlzIGRvbmUgbG9hZGluZyBiZWZvcmUgY29udmVydGluZyBpdCB0byBhIGNhbnZhcyBlbGVtZW50IGFuZCB3cml0aW5nIHRoZSBwaXhlbCBkYXRhLiBJZiB3ZSBkbyB0aGlzIHByZW1hdHVyZWx5LCB0aGUgYnJvd3NlciB3aWxsIHRocm93IGEgRE9NIEVycm9yLCBhbmQgY2hhb3Mgd2lsbCBlbnN1ZS4gSW4gdGhlIGV2ZW50IHRoYXQgd2UgaW5pdGlhbGl6ZSBDYW1hbiBvbiBhIGNhbnZhcyBlbGVtZW50IHdoaWxlIHNwZWNpZnlpbmcgYW4gaW1hZ2UgVVJMLCB3ZSBuZWVkIHRvIGNyZWF0ZSBhIG5ldyBpbWFnZSBlbGVtZW50LCBsb2FkIHRoZSBpbWFnZSwgdGhlbiBjb250aW51ZSB3aXRoIGluaXRpYWxpemF0aW9uLlxuICogVGhlIG1haW4gZ29hbCBmb3IgQ2FtYW4gd2FzIHNpbXBsaWNpdHksIHNvIGFsbCBvZiB0aGlzIGlzIGhhbmRsZWQgdHJhbnNwYXJlbnRseSB0byB0aGUgZW5kLXVzZXIuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIENhbWFuXG4gKiBAZXh0ZW5kcyB7TW9kdWxlfVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW1hbiBleHRlbmRzIE1vZHVsZSB7XG4gIC8vIFRoZSBjdXJyZW50IHZlcnNpb24uXG4gIHN0YXRpYyB2ZXJzaW9uID0ge1xuICAgIHJlbGVhc2U6ICcxLjAuMCcsXG4gICAgZGF0ZTogJzYvMDgvMjAxOCdcbiAgfVxuXG4gIC8vIEBwcm9wZXJ0eSBbQm9vbGVhbl0gQWxsb3cgcmV2ZXJ0aW5nIHRoZSBjYW52YXM/XG4gIC8vIElmIHlvdXIgSlMgcHJvY2VzcyBpcyBydW5uaW5nIG91dCBvZiBtZW1vcnksIGRpc2FibGluZ1xuICAvLyB0aGlzIGNvdWxkIGhlbHAgZHJhc3RpY2FsbHkuXG4gIHN0YXRpYyBhbGxvd1JldmVydCA9IHRydWVcblxuICAvLyBDdXN0b20gdG9TdHJpbmcoKVxuICAvLyBAcmV0dXJuIFtTdHJpbmddIFZlcnNpb24gYW5kIHJlbGVhc2UgaW5mb3JtYXRpb24uXG4gIHN0YXRpYyB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIGBWZXJzaW9uICR7Q2FtYW4udmVyc2lvbi5yZWxlYXNlfSwgUmVsZWFzZWQgJHtDYW1hbi52ZXJzaW9uLmRhdGV9YFxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBDYW1hbiBmdW5jdGlvbi5cbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gY2FudmFzSWQgVGhlIGNhbnZhcy1pZCBvZiB0aGUgY2FudmFzIGNvbXBvbmVudC5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gd2lkdGggVGhlIHdpZHRoIG9mIHRoZSBjYW52YXMgY29tcG9uZW50LlxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBoZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgY2FudmFzIGNvbXBvbmVudC5cbiAgICogQHJldHVybiBbQ2FtYW5dIEluaXRpYWxpemVkIENhbWFuIGluc3RhbmNlLlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIGNvbnN0cnVjdG9yICguLi5hcmdzKSB7XG4gICAgLy8gYXJnc1swXTogY2FudmFzSWRcbiAgICAvLyBhcmdzWzFdOiB3aWR0aCxcbiAgICAvLyBhcmdzWzJdOiBoZWlnaHRcbiAgICAvLyBhcmdzWzNdOiBjYWxsYmFjayBmdW5jdGlvblxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cycpXG4gICAgfVxuICAgIHN1cGVyKClcblxuICAgIC8vIGNvbnN0IGlkID0gYXJnc1swXVxuICAgIGxldCBjYWxsYmFjayA9IGFyZ3NbM11cbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IG5vb3BcbiAgICB9XG5cbiAgICAvLyBFdmVyeSBpbnN0YW5jZSBnZXRzIGEgdW5pcXVlIElELlxuICAgIHRoaXMuaWQgPSBVdGlsLnVuaXFpZCgpXG4gICAgdGhpcy5pbml0aWFsaXplZFBpeGVsRGF0YSA9IHRoaXMub3JpZ2luYWxQaXhlbERhdGEgPSBudWxsXG5cbiAgICB0aGlzLnBpeGVsU3RhY2sgPSBbXSAvLyBTdG9yZXMgdGhlIHBpeGVsIGxheWVyc1xuICAgIHRoaXMubGF5ZXJTdGFjayA9IFtdIC8vIFN0b3JlcyBhbGwgb2YgdGhlIGxheWVycyB3YWl0aW5nIHRvIGJlIHJlbmRlcmVkXG4gICAgdGhpcy5jYW52YXNRdWV1ZSA9IFtdIC8vIFN0b3JlcyBhbGwgb2YgdGhlIGNhbnZhc2VzIHRvIGJlIHByb2Nlc3NlZFxuICAgIHRoaXMuY3VycmVudExheWVyID0gbnVsbFxuXG4gICAgdGhpcy5hbmFseXplID0gbmV3IEFuYWx5emUodGhpcylcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKHRoaXMpXG5cbiAgICAvLyBtYWtlIHN1cmUgeW91IGRvIGV2ZXJ5dGhpbmcgaW4gb25SZWFkeSBjYWxsYmFja1xuICAgIHRoaXMucGFyc2VBcmd1bWVudHMoYXJncylcbiAgICB0aGlzLmluaXRDYW52YXMoKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIGFyZ3VtZW50cyBnaXZlbiB0byB0aGUgQ2FtYW4gZnVuY3Rpb24sIGFuZCBzZXRzIHRoZSBhcHByb3ByaWF0ZSBwcm9wZXJ0aWVzIG9uIHRoaXMgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7IEFycmF5IH0gYXJncyBBcnJheSBvZiBhcmd1bWVudHMgcGFzc2VkIHRvIENhbWFuLlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHBhcnNlQXJndW1lbnRzIChhcmdzKSB7XG4gICAgLy8gYXJnc1swXTogY2FudmFzSWRcbiAgICAvLyBhcmdzWzFdOiB3aWR0aCxcbiAgICAvLyBhcmdzWzJdOiBoZWlnaHRcbiAgICAvLyBhcmdzWzNdOiBjYWxsYmFjayBmdW5jdGlvblxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cyBnaXZlbicpXG4gICAgfVxuXG4gICAgLy8gRmlyc3QgYXJndW1lbnQgaXMgYWx3YXlzIG91ciBjYW52YXMvaW1hZ2VcbiAgICBpZiAodHlwZW9mIGFyZ3NbMF0gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHBhc3MgdGhlIGNhbnZhcy1pZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQuJylcbiAgICB9XG4gICAgdGhpcy5jYW52YXMgPSBhcmdzWzBdXG4gICAgaWYgKHR5cGVvZiBhcmdzWzFdICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgYXJnc1syXSAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3QgcGFzcyB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgY2FudmFzIGNvbXBvbmVudC4nKVxuICAgIH1cbiAgICB0aGlzLndpZHRoID0gYXJnc1sxXVxuICAgIHRoaXMuaGVpZ2h0ID0gYXJnc1syXVxuICAgIHRoaXMuY2FsbGJhY2sgPSB0eXBlb2YgYXJnc1szXSA9PT0gJ2Z1bmN0aW9uJyA/IGFyZ3NbM10gOiBub29wXG4gIH1cblxuICAvLyBJbml0aWFsaXphdGlvbiBmdW5jdGlvbiBmb3IgYnJvd3NlciBhbmQgY2FudmFzIG9iamVjdHNcbiAgaW5pdENhbnZhcyAoKSB7XG4gICAgdGhpcy5jb250ZXh0ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCh0aGlzLmNhbnZhcylcbiAgICB0aGlzLmZpbmlzaEluaXQoKVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmFsIHN0ZXAgb2YgaW5pdGlhbGl6YXRpb24uIFdlIGZpbmlzaCBzZXR0aW5nIHVwIG91ciBjYW52YXMgZWxlbWVudCwgYW5kIHdlIGRyYXcgdGhlIGltYWdlIHRvIHRoZSBjYW52YXMgKGlmIGFwcGxpY2FibGUpLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIGZpbmlzaEluaXQgKCkge1xuICAgIGlmICghdGhpcy5jb250ZXh0KSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KHRoaXMuY2FudmFzKVxuICAgIH1cblxuICAgIHRoaXMub3JpZ2luYWxXaWR0aCA9IHRoaXMucHJlU2NhbGVkV2lkdGggPSB0aGlzLndpZHRoXG4gICAgdGhpcy5vcmlnaW5hbEhlaWdodCA9IHRoaXMucHJlU2NhbGVkSGVpZ2h0ID0gdGhpcy5oZWlnaHRcblxuICAgIGNvbnN0IF90aGlzID0gdGhpc1xuICAgIHd4LmNhbnZhc0dldEltYWdlRGF0YSh7XG4gICAgICBjYW52YXNJZDogX3RoaXMuY2FudmFzLFxuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgICB3aWR0aDogX3RoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IF90aGlzLmhlaWdodCxcbiAgICAgIHN1Y2Nlc3MgKHJlcykge1xuICAgICAgICBfdGhpcy5waXhlbERhdGEgPSByZXMuZGF0YVxuICAgICAgICBFdmVudC50cmlnZ2VyKF90aGlzLCAnX3BpeGVsRGF0YVJlYWR5JylcbiAgICAgICAgaWYgKENhbWFuLmFsbG93UmV2ZXJ0KSB7XG4gICAgICAgICAgX3RoaXMuaW5pdGlhbGl6ZWRQaXhlbERhdGEgPSBVdGlsLmRhdGFBcnJheShfdGhpcy5waXhlbERhdGEubGVuZ3RoKVxuICAgICAgICAgIF90aGlzLm9yaWdpbmFsUGl4ZWxEYXRhID0gVXRpbC5kYXRhQXJyYXkoX3RoaXMucGl4ZWxEYXRhLmxlbmd0aClcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3RoaXMucGl4ZWxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcGl4ZWwgPSBfdGhpcy5waXhlbERhdGFbaV1cbiAgICAgICAgICAgIF90aGlzLmluaXRpYWxpemVkUGl4ZWxEYXRhW2ldID0gcGl4ZWxcbiAgICAgICAgICAgIF90aGlzLm9yaWdpbmFsUGl4ZWxEYXRhW2ldID0gcGl4ZWxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5kaW1lbnNpb25zID0ge1xuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0XG4gICAgfVxuXG4gICAgdGhpcy5jYWxsYmFjayh0aGlzKVxuXG4gICAgLy8gUmVzZXQgdGhlIGNhbGxiYWNrIHNvIHJlLWluaXRpYWxpemF0aW9uIGRvZXNuJ3QgdHJpZ2dlciBpdCBhZ2Fpbi5cbiAgICB0aGlzLmNhbGxiYWNrID0gbm9vcFxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBjYW52YXMgcGl4ZWxzIHRvIHRoZSBvcmlnaW5hbCBzdGF0ZSBhdCBpbml0aWFsaXphdGlvbi5cbiAgICpcbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICByZXNldE9yaWdpbmFsUGl4ZWxEYXRhICgpIHtcbiAgICBpZiAoIUNhbWFuLmFsbG93UmV2ZXJ0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JldmVydCBkaXNhYmxlZCcpXG4gICAgfVxuXG4gICAgdGhpcy5vcmlnaW5hbFBpeGVsRGF0YSA9IFV0aWwuZGF0YUFycmF5KHRoaXMucGl4ZWxEYXRhLmxlbmd0aClcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGl4ZWxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgcGl4ZWwgPSB0aGlzLnBpeGVsRGF0YVtpXVxuICAgICAgdGhpcy5vcmlnaW5hbFBpeGVsRGF0YVtpXSA9IHBpeGVsXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJlZ2lucyB0aGUgcmVuZGVyaW5nIHByb2Nlc3MuIFRoaXMgd2lsbCBleGVjdXRlIGFsbCBvZiB0aGUgZmlsdGVyIGZ1bmN0aW9ucyBjYWxsZWQgZWl0aGVyIHNpbmNlIGluaXRpYWxpemF0aW9uIG9yIHRoZSBwcmV2aW91cyByZW5kZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7IEZ1bmN0aW9uIH0gW2NhbGxiYWNrPW5vb3BdIEZ1bmN0aW9uIHRvIGNhbGwgd2hlbiByZW5kZXJpbmcgaXMgZmluaXNoZWQuXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgcmVuZGVyIChjYWxsYmFjayA9IG5vb3ApIHtcbiAgICBFdmVudC50cmlnZ2VyKHRoaXMsICdyZW5kZXJTdGFydCcpXG4gICAgdGhpcy5yZW5kZXJlci5leGVjdXRlKHRoaXMsICgpID0+IHtcbiAgICAgIGNvbnN0IF90aGlzID0gdGhpc1xuICAgICAgd3guY2FudmFzUHV0SW1hZ2VEYXRhKHtcbiAgICAgICAgY2FudmFzSWQ6IF90aGlzLmNhbnZhcyxcbiAgICAgICAgZGF0YTogX3RoaXMucGl4ZWxEYXRhLFxuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwLFxuICAgICAgICB3aWR0aDogX3RoaXMud2lkdGgsXG4gICAgICAgIGhlaWdodDogX3RoaXMuaGVpZ2h0LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2FsbGJhY2suY2FsbChfdGhpcylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIENvbXBsZXRlbHkgcmVzZXRzIHRoZSBjYW52YXMgYmFjayB0byBpdCdzIG9yaWdpbmFsIHN0YXRlLlxuICAgKiBBbnkgc2l6ZSBhZGp1c3RtZW50cyB3aWxsIGFsc28gYmUgcmVzZXQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgcmVzZXQgKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pbml0aWFsaXplZFBpeGVsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHBpeGVsID0gdGhpcy5pbml0aWFsaXplZFBpeGVsRGF0YVtpXVxuICAgICAgdGhpcy5waXhlbERhdGFbaV0gPSBwaXhlbFxuICAgIH1cbiAgICBjb25zdCBfdGhpcyA9IHRoaXNcbiAgICB3eC5jYW52YXNQdXRJbWFnZURhdGEoe1xuICAgICAgY2FudmFzSWQ6IF90aGlzLmNhbnZhcyxcbiAgICAgIGRhdGE6IHRoaXMucGl4ZWxEYXRhLFxuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgICB3aWR0aDogX3RoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IF90aGlzLmhlaWdodFxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUHVzaGVzIHRoZSBmaWx0ZXIgY2FsbGJhY2sgdGhhdCBtb2RpZmllcyB0aGUgUkdCQSBvYmplY3QgaW50byB0aGVcbiAgIyByZW5kZXIgcXVldWUuXG4gICAqXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgTmFtZSBvZiB0aGUgZmlsdGVyIGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0geyBGdW5jdGlvbiB9IHByb2Nlc3NGbiAgVGhlIEZpbHRlciBmdW5jdGlvbi5cbiAgICogQHJldHVybnMgeyBDYW1hbiB9XG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgcHJvY2VzcyAobmFtZSwgcHJvY2Vzc0ZuKSB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGQoe1xuICAgICAgdHlwZTogQ29uZmlnLkZJTFRFUl9UWVBFLlNpbmdsZSxcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBwcm9jZXNzRm46IHByb2Nlc3NGblxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoZXMgdGhlIGtlcm5lbCBpbnRvIHRoZSByZW5kZXIgcXVldWUuXG4gICAqXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGtlcm5lbC5cbiAgICogQHBhcmFtIHsgQXJyYXkgfSBhZGp1c3QgVGhlIGNvbnZvbHV0aW9uIGtlcm5lbCByZXByZXNlbnRlZCBhcyBhIDFEIGFycmF5LlxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBbZGl2aXNvcj1udWxsXSBUaGUgZGl2aXNvciBmb3IgdGhlIGNvbnZvbHV0aW9uLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2JpYXM9MF0gVGhlIGJpYXMgZm9yIHRoZSBjb252b2x1dGlvbi5cbiAgICogQHJldHVybnMgeyBDYW1hbiB9XG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgcHJvY2Vzc0tlcm5lbCAobmFtZSwgYWRqdXN0LCBkaXZpc29yID0gbnVsbCwgYmlhcyA9IDApIHtcbiAgICBpZiAoIWRpdmlzb3IpIHtcbiAgICAgIGRpdmlzb3IgPSAwXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBhZGp1c3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGl2aXNvciArPSBhZGp1c3RbaV1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFkZCh7XG4gICAgICB0eXBlOiBDb25maWcuRklMVEVSX1RZUEUuS2VybmVsLFxuICAgICAgbmFtZSxcbiAgICAgIGFkanVzdCxcbiAgICAgIGRpdmlzb3IsXG4gICAgICBiaWFzXG4gICAgfSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHN0YW5kYWxvbmUgcGx1Z2luIGludG8gdGhlIHJlbmRlciBxdWV1ZS5cbiAgICpcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gcGx1Z2luIE5hbWUgb2YgdGhlIHBsdWdpbi5cbiAgICogQHBhcmFtIHsgQXJyYXkgfSBhcmdzIEFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBwbHVnaW4uXG4gICAqIEByZXR1cm5zIHsgQ2FtYW4gfVxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHByb2Nlc3NQbHVnaW4gKHBsdWdpbiwgYXJncykge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkKHtcbiAgICAgIHR5cGU6IENvbmZpZy5GSUxURVJfVFlQRS5QbHVnaW4sXG4gICAgICBwbHVnaW4sXG4gICAgICBhcmdzXG4gICAgfSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUHVzaGVzIGEgbmV3IGxheWVyIG9wZXJhdGlvbiBpbnRvIHRoZSByZW5kZXIgcXVldWUgYW5kIGNhbGxzIHRoZSBsYXllclxuICAjIGNhbGxiYWNrLlxuICAgKlxuICAgKiBAcGFyYW0geyBGdW5jdGlvbiB9IGNhbGxiYWNrICBGdW5jdGlvbiB0aGF0IGlzIGV4ZWN1dGVkIHdpdGhpbiB0aGUgY29udGV4dCBvZiB0aGUgbGF5ZXIuXG4gICAqIEFsbCBmaWx0ZXIgYW5kIGFkanVzdG1lbnQgZnVuY3Rpb25zIGZvciB0aGUgbGF5ZXIgd2lsbCBiZSBleGVjdXRlZCBpbnNpZGUgb2YgdGhpcyBmdW5jdGlvbi5cbiAgICogQHJldHVybnMgeyBDYW1hbiB9XG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgbmV3TGF5ZXIgKGNhbGxiYWNrKSB7XG4gICAgRXZlbnQubGlzdGVuKHRoaXMsICdfcGl4ZWxEYXRhUmVhZHknLCAoKSA9PiB7XG4gICAgICBjb25zdCBsYXllciA9IG5ldyBMYXllcih0aGlzKVxuICAgICAgdGhpcy5jYW52YXNRdWV1ZS5wdXNoKGxheWVyKVxuICAgICAgdGhpcy5yZW5kZXJlci5hZGQoe1xuICAgICAgICB0eXBlOiBDb25maWcuRklMVEVSX1RZUEUuTGF5ZXJEZXF1ZXVlXG4gICAgICB9KVxuXG4gICAgICBjYWxsYmFjay5jYWxsKGxheWVyKVxuXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZCh7XG4gICAgICAgIHR5cGU6IENvbmZpZy5GSUxURVJfVFlQRS5MYXllckZpbmlzaGVkXG4gICAgICB9KVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoZXMgdGhlIGxheWVyIGNvbnRleHQgYW5kIG1vdmVzIHRvIHRoZSBuZXh0IG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHsgTGF5ZXIgfSBsYXllciBUaGUgbGF5ZXIgdG8gZXhlY3V0ZS5cbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICBleGVjdXRlTGF5ZXIgKGxheWVyKSB7XG4gICAgdGhpcy5wdXNoQ29udGV4dChsYXllcilcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYWxsIG9mIHRoZSByZWxldmFudCBkYXRhIHRvIHRoZSBuZXcgbGF5ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7IExheWVyIH0gbGF5ZXIgVGhlIGxheWVyIHdob3NlIGNvbnRleHQgd2Ugd2FudCB0byBzd2l0Y2ggdG8uXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgcHVzaENvbnRleHQgKGxheWVyKSB7XG4gICAgdGhpcy5sYXllclN0YWNrLnB1c2godGhpcy5jdXJyZW50TGF5ZXIpXG4gICAgdGhpcy5waXhlbFN0YWNrLnB1c2godGhpcy5waXhlbERhdGEpXG4gICAgdGhpcy5jdXJyZW50TGF5ZXIgPSBsYXllclxuICAgIHRoaXMucGl4ZWxEYXRhID0gbGF5ZXIucGl4ZWxEYXRhXG4gIH1cblxuICAvLyBSZXN0b3JlIHRoZSBwcmV2aW91cyBsYXllciBjb250ZXh0LlxuICBwb3BDb250ZXh0ICgpIHtcbiAgICB0aGlzLnBpeGVsRGF0YSA9IHRoaXMucGl4ZWxTdGFjay5wb3AoKVxuICAgIHRoaXMuY3VycmVudExheWVyID0gdGhpcy5sYXllclN0YWNrLnBvcCgpXG4gIH1cblxuICAvLyBBcHBsaWVzIHRoZSBjdXJyZW50IGxheWVyIHRvIGl0cyBwYXJlbnQgbGF5ZXIuXG4gIGFwcGx5Q3VycmVudExheWVyICgpIHtcbiAgICB0aGlzLmN1cnJlbnRMYXllci5hcHBseVRvUGFyZW50KClcbiAgfVxufVxuIiwiaW1wb3J0IENhbWFuIGZyb20gJy4vY2FtYW4nXG5cbi8qKlxuICogUmVzcG9uc2libGUgZm9yIHJlZ2lzdGVyaW5nIGFuZCBzdG9yaW5nIGFsbCBvZiB0aGUgZmlsdGVycy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgRmlsdGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbHRlciB7XG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBmaWx0ZXIgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZmlsdGVyLlxuICAgKiBAcGFyYW0geyBGdW5jdGlvbiB9IGZpbHRlckZ1bmMgVGhlIGZpbHRlciBmdW5jdGlvbi5cbiAgICogQG1lbWJlcm9mIEZpbHRlclxuICAgKi9cbiAgc3RhdGljIHJlZ2lzdGVyIChuYW1lLCBmaWx0ZXJGdW5jKSB7XG4gICAgQ2FtYW4ucHJvdG90eXBlW25hbWVdID0gZmlsdGVyRnVuY1xuICB9XG59XG4iLCIvKipcbiAqXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsqfSBCbGVuZGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZ2lzdGVyQmxlbmRlcihCbGVuZGVyKSB7XG4gIC8vIERpcmVjdGx5IGFwcGx5IHRoZSBjaGlsZCBsYXllcidzIHBpeGVscyB0byB0aGUgcGFyZW50IGxheWVyIHdpdGggbm8gc3BlY2lhbCBjaGFuZ2VzXG4gIEJsZW5kZXIucmVnaXN0ZXIoJ25vcm1hbCcsIChyZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcjogcmdiYUxheWVyLnIsXG4gICAgICBnOiByZ2JhTGF5ZXIuZyxcbiAgICAgIGI6IHJnYmFMYXllci5iXG4gICAgfVxuICB9KVxuXG4gIC8vIEFwcGx5IHRoZSBjaGlsZCB0byB0aGUgcGFyZW50IGJ5IG11bHRpcGx5aW5nIHRoZSBjb2xvciB2YWx1ZXMuIFRoaXMgZ2VuZXJhbGx5IGNyZWF0ZXMgY29udHJhc3QuXG4gIEJsZW5kZXIucmVnaXN0ZXIoJ211bHRpcGx5JywgKHJnYmFMYXllciwgcmdiYVBhcmVudCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICByOiAocmdiYUxheWVyLnIgKiByZ2JhUGFyZW50LnIpIC8gMjU1LFxuICAgICAgZzogKHJnYmFMYXllci5nICogcmdiYVBhcmVudC5nKSAvIDI1NSxcbiAgICAgIGI6IChyZ2JhTGF5ZXIuYiAqIHJnYmFQYXJlbnQuYikgLyAyNTVcbiAgICB9XG4gIH0pXG5cbiAgQmxlbmRlci5yZWdpc3Rlcignc2NyZWVuJywgKHJnYmFMYXllciwgcmdiYVBhcmVudCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICByOiAyNTUgLSAoKCgyNTUgLSByZ2JhTGF5ZXIucikgKiAoMjU1IC0gcmdiYVBhcmVudC5yKSkgLyAyNTUpLFxuICAgICAgZzogMjU1IC0gKCgoMjU1IC0gcmdiYUxheWVyLmcpICogKDI1NSAtIHJnYmFQYXJlbnQuZykpIC8gMjU1KSxcbiAgICAgIGI6IDI1NSAtICgoKDI1NSAtIHJnYmFMYXllci5iKSAqICgyNTUgLSByZ2JhUGFyZW50LmIpKSAvIDI1NSlcbiAgICB9XG4gIH0pXG5cbiAgQmxlbmRlci5yZWdpc3Rlcignb3ZlcmxheScsIChyZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB7fVxuICAgIHJlc3VsdC5yID0gcmdiYVBhcmVudC5yID4gMTI4ID8gMjU1IC0gMiAqICgyNTUgLSByZ2JhTGF5ZXIucikgKiAoMjU1IC0gcmdiYVBhcmVudC5yKSAvIDI1NSA6IChyZ2JhUGFyZW50LnIgKiByZ2JhTGF5ZXIuciAqIDIpIC8gMjU1XG4gICAgcmVzdWx0LmcgPSByZ2JhUGFyZW50LmcgPiAxMjggPyAyNTUgLSAyICogKDI1NSAtIHJnYmFMYXllci5nKSAqICgyNTUgLSByZ2JhUGFyZW50LmcpIC8gMjU1IDogKHJnYmFQYXJlbnQuZyAqIHJnYmFMYXllci5nICogMikgLyAyNTVcbiAgICByZXN1bHQuYiA9IHJnYmFQYXJlbnQuYiA+IDEyOCA/IDI1NSAtIDIgKiAoMjU1IC0gcmdiYUxheWVyLmIpICogKDI1NSAtIHJnYmFQYXJlbnQuYikgLyAyNTUgOiAocmdiYVBhcmVudC5iICogcmdiYUxheWVyLmIgKiAyKSAvIDI1NVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9KVxuXG4gIEJsZW5kZXIucmVnaXN0ZXIoJ2RpZmZlcmVuY2UnLCAocmdiYUxheWVyLCByZ2JhUGFyZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHJnYmFMYXllci5yIC0gcmdiYVBhcmVudC5yLFxuICAgICAgZzogcmdiYUxheWVyLmcgLSByZ2JhUGFyZW50LmcsXG4gICAgICBiOiByZ2JhTGF5ZXIuYiAtIHJnYmFQYXJlbnQuYlxuICAgIH1cbiAgfSlcblxuICBCbGVuZGVyLnJlZ2lzdGVyKCdhZGRpdGlvbicsIChyZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcjogcmdiYVBhcmVudC5yICsgcmdiYUxheWVyLnIsXG4gICAgICBnOiByZ2JhUGFyZW50LmcgKyByZ2JhTGF5ZXIuZyxcbiAgICAgIGI6IHJnYmFQYXJlbnQuYiArIHJnYmFMYXllci5iXG4gICAgfVxuICB9KVxuXG4gIEJsZW5kZXIucmVnaXN0ZXIoJ2V4Y2x1c2lvbicsIChyZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcjogMTI4IC0gMiAqIChyZ2JhUGFyZW50LnIgLSAxMjgpICogKHJnYmFMYXllci5yIC0gMTI4KSAvIDI1NSxcbiAgICAgIGc6IDEyOCAtIDIgKiAocmdiYVBhcmVudC5nIC0gMTI4KSAqIChyZ2JhTGF5ZXIuZyAtIDEyOCkgLyAyNTUsXG4gICAgICBiOiAxMjggLSAyICogKHJnYmFQYXJlbnQuYiAtIDEyOCkgKiAocmdiYUxheWVyLmIgLSAxMjgpIC8gMjU1XG4gICAgfVxuICB9KVxuXG4gIEJsZW5kZXIucmVnaXN0ZXIoJ3NvZnRMaWdodCcsIChyZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB7fVxuXG4gICAgcmVzdWx0LnIgPSByZ2JhUGFyZW50LnIgPiAxMjggPyAyNTUgLSAoKDI1NSAtIHJnYmFQYXJlbnQucikgKiAoMjU1IC0gKHJnYmFMYXllci5yIC0gMTI4KSkpIC8gMjU1IDogKHJnYmFQYXJlbnQuciAqIChyZ2JhTGF5ZXIuciArIDEyOCkpIC8gMjU1XG5cbiAgICByZXN1bHQuZyA9IHJnYmFQYXJlbnQuZyA+IDEyOCA/IDI1NSAtICgoMjU1IC0gcmdiYVBhcmVudC5nKSAqICgyNTUgLSAocmdiYUxheWVyLmcgLSAxMjgpKSkgLyAyNTUgOiAocmdiYVBhcmVudC5nICogKHJnYmFMYXllci5nICsgMTI4KSkgLyAyNTVcblxuICAgIHJlc3VsdC5iID0gcmdiYVBhcmVudC5iID4gMTI4ID8gMjU1IC0gKCgyNTUgLSByZ2JhUGFyZW50LmIpICogKDI1NSAtIChyZ2JhTGF5ZXIuYiAtIDEyOCkpKSAvIDI1NSA6IChyZ2JhUGFyZW50LmIgKiAocmdiYUxheWVyLmIgKyAxMjgpKSAvIDI1NVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9KVxuXG4gIEJsZW5kZXIucmVnaXN0ZXIoJ2xpZ2h0ZW4nLCAocmdiYUxheWVyLCByZ2JhUGFyZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHJnYmFQYXJlbnQuciA+IHJnYmFMYXllci5yID8gcmdiYVBhcmVudC5yIDogcmdiYUxheWVyLnIsXG4gICAgICBnOiByZ2JhUGFyZW50LmcgPiByZ2JhTGF5ZXIuZyA/IHJnYmFQYXJlbnQuZyA6IHJnYmFMYXllci5nLFxuICAgICAgYjogcmdiYVBhcmVudC5iID4gcmdiYUxheWVyLmIgPyByZ2JhUGFyZW50LmIgOiByZ2JhTGF5ZXIuYlxuICAgIH1cbiAgfSlcblxuICBCbGVuZGVyLnJlZ2lzdGVyKCdkYXJrZW4nLCAocmdiYUxheWVyLCByZ2JhUGFyZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHJnYmFQYXJlbnQuciA+IHJnYmFMYXllci5yID8gcmdiYUxheWVyLnIgOiByZ2JhUGFyZW50LnIsXG4gICAgICBnOiByZ2JhUGFyZW50LmcgPiByZ2JhTGF5ZXIuZyA/IHJnYmFMYXllci5nIDogcmdiYVBhcmVudC5nLFxuICAgICAgYjogcmdiYVBhcmVudC5iID4gcmdiYUxheWVyLmIgPyByZ2JhTGF5ZXIuYiA6IHJnYmFQYXJlbnQuYlxuICAgIH1cbiAgfSlcbn1cbiIsIi8qKlxuICogVG9ucyBvZiBjb2xvciBjb252ZXJzaW9uIHV0aWxpdHkgZnVuY3Rpb25zLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBDb252ZXJ0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnZlcnQge1xuICAvKipcbiAgICogQ29udmVydHMgdGhlIGhleCByZXByZXNlbnRhdGlvbiBvZiBhIGNvbG9yIHRvIFJHQiB2YWx1ZXMuXG4gICAqIEhleCB2YWx1ZSBjYW4gb3B0aW9uYWxseSBzdGFydCB3aXRoIHRoZSBoYXNoICgjKS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBoZXggVGhlIGNvbG9ycyBoZXggdmFsdWVcbiAgICogQHJldHVybnMgeyBPYmplY3QgfSBUaGUgUkdCIHJlcHJlc2VudGF0aW9uXG4gICAqIEBtZW1iZXJvZiBDb252ZXJ0XG4gICAqL1xuICBzdGF0aWMgaGV4VG9SR0IgKGhleCkge1xuICAgIGlmIChoZXguY2hhckF0KDApID09PSAnIycpIHtcbiAgICAgIGhleCA9IGhleC5zdWJzdHIoMSlcbiAgICB9XG4gICAgY29uc3QgciA9IHBhcnNlSW50KGhleC5zdWJzdHIoMCwgMiksIDE2KVxuICAgIGNvbnN0IGcgPSBwYXJzZUludChoZXguc3Vic3RyKDIsIDIpLCAxNilcbiAgICBjb25zdCBiID0gcGFyc2VJbnQoaGV4LnN1YnN0cig0LCAyKSwgMTYpXG4gICAgcmV0dXJuIHsgciwgZywgYiB9XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYW4gUkdCIGNvbG9yIHRvIEhTTC5cbiAgICogQXNzdW1lcyByLCBnLCBhbmQgYiBhcmUgaW4gdGhlIHNldCBbMCwgMjU1XSBhbmRcbiAgICogcmV0dXJucyBoLCBzLCBhbmQgbCBpbiB0aGUgc2V0IFswLCAxXS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBOdW1iZXIgfSByIFJlZCBjaGFubmVsXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IGcgR3JlZW4gY2hhbm5lbFxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBiIEJsdWUgY2hhbm5lbFxuICAgKiBAcmV0dXJuIHsgQXJyYXkgfSBUaGUgSFNMIHJlcHJlc2VudGF0aW9uXG4gICAqIEBtZW1iZXJvZiBDb252ZXJ0XG4gICAqL1xuICBzdGF0aWMgcmdiVG9IU0wgKHIsIGcsIGIpIHtcbiAgICBpZiAodHlwZW9mIHIgPT09ICdvYmplY3QnKSB7XG4gICAgICBnID0gci5nXG4gICAgICBiID0gci5iXG4gICAgICByID0gci5yXG4gICAgfVxuXG4gICAgciAvPSAyNTVcbiAgICBnIC89IDI1NVxuICAgIGIgLz0gMjU1XG5cbiAgICBjb25zdCBtYXggPSBNYXRoLm1heChyLCBnLCBiKVxuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKHIsIGcsIGIpXG4gICAgY29uc3QgbCA9IChtYXggKyBtaW4pIC8gMlxuICAgIGxldCBoLCBzXG4gICAgaWYgKG1heCA9PT0gbWluKSB7XG4gICAgICBoID0gcyA9IDBcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZCA9IG1heCAtIG1pblxuICAgICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pXG5cbiAgICAgIGlmIChtYXggPT09IHIpIHtcbiAgICAgICAgaCA9IChnIC0gYikgLyBkICsgZyA8IGIgPyA2IDogMFxuICAgICAgfSBlbHNlIGlmIChtYXggPT09IGcpIHtcbiAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMlxuICAgICAgfSBlbHNlIGlmIChtYXggPT09IGIpIHtcbiAgICAgICAgaCA9IChyIC0gZykgLyBkICsgNFxuICAgICAgfVxuXG4gICAgICBoIC89IDZcbiAgICB9XG4gICAgcmV0dXJuIHtoLCBzLCBsfVxuICB9XG5cbiAgLyoqXG4gICAqIG9udmVydHMgYW4gSFNMIGNvbG9yIHZhbHVlIHRvIFJHQi4gQ29udmVyc2lvbiBmb3JtdWxhIGFkYXB0ZWQgZnJvbSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hTTF9jb2xvcl9zcGFjZS5cbiAgICogQXNzdW1lcyBoLCBzLCBhbmQgbCBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDFdIGFuZCByZXR1cm5zIHIsIGcsIGFuZCBiIGluIHRoZSBzZXQgWzAsIDI1NV0uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gaCBUaGUgaHVlXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHMgVGhlIHNhdHVyYXRpb25cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gbCBUaGUgbGlnaHRuZXNzXG4gICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gVGhlIFJHQiByZXByZXNlbnRhdGlvblxuICAgKiBAbWVtYmVyb2YgQ29udmVydFxuICAgKi9cbiAgc3RhdGljIGhzbFRvUkdCIChoLCBzLCBsKSB7XG4gICAgbGV0IHIsIGcsIGIsIHAsIHFcbiAgICBpZiAodHlwZW9mIGggPT09ICdvYmplY3QnKSB7XG4gICAgICBzID0gaC5zXG4gICAgICBsID0gaC5sXG4gICAgICBoID0gaC5oXG4gICAgfVxuICAgIGlmIChzID09PSAwKSB7XG4gICAgICByID0gZyA9IGIgPSBsXG4gICAgfSBlbHNlIHtcbiAgICAgIHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzXG4gICAgICBwID0gMiAqIGwgLSBxXG5cbiAgICAgIHIgPSB0aGlzLmh1ZVRvUkdCKHAsIHEsIGggKyAxIC8gMylcbiAgICAgIGcgPSB0aGlzLmh1ZVRvUkdCKHAsIHEsIGgpXG4gICAgICBiID0gdGhpcy5odWVUb1JHQihwLCBxLCBoIC0gMSAvIDMpXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICByOiByICogMjU1LFxuICAgICAgZzogZyAqIDI1NSxcbiAgICAgIGI6IGIgKiAyNTVcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgZnJvbSB0aGUgaHVlIGNvbG9yIHNwYWNlIGJhY2sgdG8gUkdCLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHBcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gcVxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB0XG4gICAqIEByZXR1cm5zIHsgTnVtYmVyIH0gUkdCIHZhbHVlXG4gICAqIEBtZW1iZXJvZiBDb252ZXJ0XG4gICAqL1xuICBzdGF0aWMgaHVlVG9SR0IgKHAsIHEsIHQpIHtcbiAgICBpZiAodCA8IDApIHtcbiAgICAgIHQgKz0gMVxuICAgIH1cbiAgICBpZiAodCA+IDEpIHtcbiAgICAgIHQgLT0gMVxuICAgIH1cbiAgICBpZiAodCA8IDEgLyA2KSB7XG4gICAgICByZXR1cm4gcCArIChxIC0gcCkgKiA2ICogdFxuICAgIH1cbiAgICBpZiAodCA8IDEgLyAyKSB7XG4gICAgICByZXR1cm4gcVxuICAgIH1cbiAgICBpZiAodCA8IDIgLyAzKSB7XG4gICAgICByZXR1cm4gcCArIChxIC0gcCkgKiAoMiAvIDMgLSB0KSAqIDZcbiAgICB9XG4gICAgcmV0dXJuIHBcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhbiBSR0IgY29sb3IgdmFsdWUgdG8gSFNWLiBDb252ZXJzaW9uIGZvcm11bGEgYWRhcHRlZCBmcm9tIHtodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hTVl9jb2xvcl9zcGFjZX0uXG4gICAqIEFzc3VtZXMgciwgZywgYW5kIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdIGFuZCByZXR1cm5zIGgsIHMsIGFuZCB2IGluIHRoZSBzZXQgWzAsIDFdLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7Kn0gciBUaGUgcmVkIGNvbG9yIHZhbHVlXG4gICAqIEBwYXJhbSB7Kn0gZyBUaGUgZ3JlZW4gY29sb3IgdmFsdWVcbiAgICogQHBhcmFtIHsqfSBiIFRoZSBibHVlIGNvbG9yIHZhbHVlXG4gICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gVGhlIEhTViByZXByZXNlbnRhdGlvblxuICAgKiBAbWVtYmVyb2YgQ29udmVydFxuICAgKi9cbiAgc3RhdGljIHJnYlRvSFNWIChyLCBnLCBiKSB7XG4gICAgciAvPSAyNTVcbiAgICBnIC89IDI1NVxuICAgIGIgLz0gMjU1XG5cbiAgICBjb25zdCBtYXggPSBNYXRoLm1heChyLCBnLCBiKVxuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKHIsIGcsIGIpXG4gICAgY29uc3QgdiA9IG1heFxuICAgIGNvbnN0IGQgPSBtYXggLSBtaW5cblxuICAgIGNvbnN0IHMgPSBtYXggPT09IDAgPyAwIDogZCAvIG1heFxuICAgIGxldCBoXG4gICAgaWYgKG1heCA9PT0gbWluKSB7XG4gICAgICBoID0gMFxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobWF4ID09PSByKSB7XG4gICAgICAgIGggPSAoZyAtIGIpIC8gZCArIGcgPCBiID8gNiA6IDBcbiAgICAgIH0gZWxzZSBpZiAobWF4ID09PSBnKSB7XG4gICAgICAgIGggPSAoYiAtIHIpIC8gZCArIDJcbiAgICAgIH0gZWxzZSBpZiAobWF4ID09PSBiKSB7XG4gICAgICAgIGggPSAociAtIGcpIC8gZCArIDRcbiAgICAgIH1cbiAgICAgIGggLz0gNlxuICAgIH1cblxuICAgIHJldHVybiB7aCwgcywgdn1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhbiBIU1YgY29sb3IgdmFsdWUgdG8gUkdCLiBDb252ZXJzaW9uIGZvcm11bGEgYWRhcHRlZCBmcm9tIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSFNWX2NvbG9yX3NwYWNlLlxuICAgKiBBc3N1bWVzIGgsIHMsIGFuZCB2IGFyZSBjb250YWluZWQgaW4gdGhlIHNldCBbMCwgMV0gYW5kIHJldHVybnMgciwgZywgYW5kIGIgaW4gdGhlIHNldCBbMCwgMjU1XS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBoIFRoZSBodWVcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gcyBUaGUgc2F0dXJhdGlvblxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB2IFRoZSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IFRoZSBSR0IgcmVwcmVzZW50YXRpb25cbiAgICogQG1lbWJlcm9mIENvbnZlcnRcbiAgICovXG4gIHN0YXRpYyBoc3ZUb1JHQiAoaCwgcywgdikge1xuICAgIGNvbnN0IGkgPSBNYXRoLmZsb29yKGggKiA2KVxuICAgIGNvbnN0IGYgPSBoICogNiAtIGlcbiAgICBjb25zdCBwID0gdiAqICgxIC0gcylcbiAgICBjb25zdCBxID0gdiAqICgxIC0gZiAqIHMpXG4gICAgY29uc3QgdCA9IHYgKiAoMSAtICgxIC0gZikgKiBzKVxuXG4gICAgbGV0IHIsIGcsIGJcbiAgICBzd2l0Y2ggKGkgJSA2KSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHIgPSB2XG4gICAgICAgIGcgPSB0XG4gICAgICAgIGIgPSBwXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDE6XG4gICAgICAgIHIgPSBxXG4gICAgICAgIGcgPSB2XG4gICAgICAgIGIgPSBwXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDI6XG4gICAgICAgIHIgPSBwXG4gICAgICAgIGcgPSB2XG4gICAgICAgIGIgPSB0XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHIgPSBwXG4gICAgICAgIGcgPSBxXG4gICAgICAgIGIgPSB2XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHIgPSB0XG4gICAgICAgIGcgPSBwXG4gICAgICAgIGIgPSB2XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDU6XG4gICAgICAgIHIgPSB2XG4gICAgICAgIGcgPSBwXG4gICAgICAgIGIgPSBxXG4gICAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IE1hdGguZmxvb3IociAqIDI1NSksXG4gICAgICBnOiBNYXRoLmZsb29yKGcgKiAyNTUpLFxuICAgICAgYjogTWF0aC5mbG9vcihiICogMjU1KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIFJHQiBjb2xvciB2YWx1ZSB0byB0aGUgWFlaIGNvbG9yIHNwYWNlLiBGb3JtdWxhcyBhcmUgYmFzZWQgb24gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TUkdCIGFzc3VtaW5nIHRoYXQgUkdCIHZhbHVlcyBhcmUgc1JHQi5cbiAgICogQXNzdW1lcyByLCBnLCBhbmQgYiBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDI1NV0gYW5kIHJldHVybnMgeCwgeSwgYW5kIHouXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gciBUaGUgcmVkIGNvbG9yIHZhbHVlXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IGcgVGhlIGdyZWVuIGNvbG9yIHZhbHVlXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IGIgVGhlIGJsdWUgY29sb3IgdmFsdWVcbiAgICogQHJldHVybnMgeyBPYmplY3QgfSBUaGUgWFlaIHJlcHJlc2VudGF0aW9uXG4gICAqIEBtZW1iZXJvZiBDb252ZXJ0XG4gICAqL1xuICBzdGF0aWMgcmdiVG9YWVogKHIsIGcsIGIpIHtcbiAgICByIC89IDI1NVxuICAgIGcgLz0gMjU1XG4gICAgYiAvPSAyNTVcblxuICAgIGlmIChyID4gMC4wNDA0NSkge1xuICAgICAgciA9IE1hdGgucG93KChyICsgMC4wNTUpIC8gMS4wNTUsIDIuNClcbiAgICB9IGVsc2Uge1xuICAgICAgciAvPSAxMi45MlxuICAgIH1cblxuICAgIGlmIChnID4gMC4wNDA0NSkge1xuICAgICAgZyA9IE1hdGgucG93KChnICsgMC4wNTUpIC8gMS4wNTUsIDIuNClcbiAgICB9IGVsc2Uge1xuICAgICAgZyAvPSAxMi45MlxuICAgIH1cblxuICAgIGlmIChiID4gMC4wNDA0NSkge1xuICAgICAgYiA9IE1hdGgucG93KChiICsgMC4wNTUpIC8gMS4wNTUsIDIuNClcbiAgICB9IGVsc2Uge1xuICAgICAgYiAvPSAxMi45MlxuICAgIH1cblxuICAgIGNvbnN0IHggPSByICogMC40MTI0ICsgZyAqIDAuMzU3NiArIGIgKiAwLjE4MDVcbiAgICBjb25zdCB5ID0gciAqIDAuMjEyNiArIGcgKiAwLjcxNTIgKyBiICogMC4wNzIyXG4gICAgY29uc3QgeiA9IHIgKiAwLjAxOTMgKyBnICogMC4xMTkyICsgYiAqIDAuOTUwNVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHggKiAxMDAsXG4gICAgICB5OiB5ICogMTAwLFxuICAgICAgejogeiAqIDEwMFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIFhZWiBjb2xvciB2YWx1ZSB0byB0aGUgc1JHQiBjb2xvciBzcGFjZS4gRm9ybXVsYXMgYXJlIGJhc2VkIG9uIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU1JHQiBhbmQgdGhlIHJlc3VsdGluZyBSR0IgdmFsdWUgd2lsbCBiZSBpbiB0aGUgc1JHQiBjb2xvciBzcGFjZS5cbiAgICogQXNzdW1lcyB4LCB5IGFuZCB6IHZhbHVlcyBhcmUgd2hhdGV2ZXIgdGhleSBhcmUgYW5kIHJldHVybnMgciwgZyBhbmQgYiBpbiB0aGUgc2V0IFswLCAyNTVdLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHggVGhlIFggdmFsdWVcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0geSBUaGUgWSB2YWx1ZVxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB6IFRoZSBaIHZhbHVlXG4gICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gVGhlIFJHQiByZXByZXNlbnRhdGlvblxuICAgKiBAbWVtYmVyb2YgQ29udmVydFxuICAgKi9cbiAgc3RhdGljIHh5elRvUkdCICh4LCB5LCB6KSB7XG4gICAgeCAvPSAxMDBcbiAgICB5IC89IDEwMFxuICAgIHogLz0gMTAwXG5cbiAgICBsZXQgciA9ICgzLjI0MDYgKiB4KSArICgtMS41MzcyICogeSkgKyAoLTAuNDk4NiAqIHopXG4gICAgbGV0IGcgPSAoLTAuOTY4OSAqIHgpICsgKDEuODc1OCAqIHkpICsgKDAuMDQxNSAqIHopXG4gICAgbGV0IGIgPSAoMC4wNTU3ICogeCkgKyAoLTAuMjA0MCAqIHkpICsgKDEuMDU3MCAqIHopXG5cbiAgICBpZiAociA+IDAuMDAzMTMwOCkge1xuICAgICAgciA9ICgxLjA1NSAqIE1hdGgucG93KHIsIDAuNDE2NjY2NjY2NykpIC0gMC4wNTVcbiAgICB9IGVsc2Uge1xuICAgICAgciAqPSAxMi45MlxuICAgIH1cblxuICAgIGlmIChnID4gMC4wMDMxMzA4KSB7XG4gICAgICBnID0gKDEuMDU1ICogTWF0aC5wb3coZywgMC40MTY2NjY2NjY3KSkgLSAwLjA1NVxuICAgIH0gZWxzZSB7XG4gICAgICBnICo9IDEyLjkyXG4gICAgfVxuXG4gICAgaWYgKGIgPiAwLjAwMzEzMDgpIHtcbiAgICAgIGIgPSAoMS4wNTUgKiBNYXRoLnBvdyhiLCAwLjQxNjY2NjY2NjcpKSAtIDAuMDU1XG4gICAgfSBlbHNlIHtcbiAgICAgIGIgKj0gMTIuOTJcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcjogciAqIDI1NSxcbiAgICAgIGc6IGcgKiAyNTUsXG4gICAgICBiOiBiICogMjU1XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgWFlaIGNvbG9yIHZhbHVlIHRvIHRoZSBDSUVMQUIgY29sb3Igc3BhY2UuIEZvcm11bGFzIGFyZSBiYXNlZCBvbiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xhYl9jb2xvcl9zcGFjZSBUaGUgcmVmZXJlbmNlIHdoaXRlIHBvaW50IHVzZWQgaW4gdGhlIGNvbnZlcnNpb24gaXMgRDY1LlxuICAgKiBBc3N1bWVzIHgsIHkgYW5kIHogdmFsdWVzIGFyZSB3aGF0ZXZlciB0aGV5IGFyZSBhbmQgcmV0dXJucyBMKiwgYSogYW5kIGIqIHZhbHVlc1xuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHggVGhlIFggdmFsdWVcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0geSBUaGUgWSB2YWx1ZVxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB6IFRoZSBaIHZhbHVlXG4gICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gVGhlIExhYiByZXByZXNlbnRhdGlvblxuICAgKiBAbWVtYmVyb2YgQ29udmVydFxuICAgKi9cbiAgc3RhdGljIHh5elRvTGFiICh4LCB5LCB6KSB7XG4gICAgaWYgKHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgICAgeSA9IHgueVxuICAgICAgeiA9IHguelxuICAgICAgeCA9IHgueFxuICAgIH1cblxuICAgIGNvbnN0IHdoaXRlWCA9IDk1LjA0N1xuICAgIGNvbnN0IHdoaXRlWSA9IDEwMC4wXG4gICAgY29uc3Qgd2hpdGVaID0gMTA4Ljg4M1xuXG4gICAgeCAvPSB3aGl0ZVhcbiAgICB5IC89IHdoaXRlWVxuICAgIHogLz0gd2hpdGVaXG5cbiAgICBpZiAoeCA+IDAuMDA4ODU2NDUxNjc5KSB7XG4gICAgICB4ID0gTWF0aC5wb3coeCwgMC4zMzMzMzMzMzMzKVxuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gKDcuNzg3MDM3MDM3ICogeCkgKyAwLjEzNzkzMTAzNDVcbiAgICB9XG5cbiAgICBpZiAoeSA+IDAuMDA4ODU2NDUxNjc5KSB7XG4gICAgICB5ID0gTWF0aC5wb3coeSwgMC4zMzMzMzMzMzMzKVxuICAgIH0gZWxzZSB7XG4gICAgICB5ID0gKDcuNzg3MDM3MDM3ICogeSkgKyAwLjEzNzkzMTAzNDVcbiAgICB9XG5cbiAgICBpZiAoeiA+IDAuMDA4ODU2NDUxNjc5KSB7XG4gICAgICB6ID0gTWF0aC5wb3coeiwgMC4zMzMzMzMzMzMzKVxuICAgIH0gZWxzZSB7XG4gICAgICB6ID0gKDcuNzg3MDM3MDM3ICogeikgKyAwLjEzNzkzMTAzNDVcbiAgICB9XG5cbiAgICBjb25zdCBsID0gMTE2ICogeSAtIDE2XG4gICAgY29uc3QgYSA9IDUwMCAqICh4IC0geSlcbiAgICBjb25zdCBiID0gMjAwICogKHkgLSB6KVxuXG4gICAgcmV0dXJuIHsgbCwgYSwgYiB9XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBMKiwgYSosIGIqIGNvbG9yIHZhbHVlcyBmcm9tIHRoZSBDSUVMQUIgY29sb3Igc3BhY2UgdG8gdGhlIFhZWiBjb2xvciBzcGFjZS4gRm9ybXVsYXMgYXJlIGJhc2VkIG9uIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGFiX2NvbG9yX3NwYWNlIFRoZSByZWZlcmVuY2Ugd2hpdGUgcG9pbnQgdXNlZCBpbiB0aGUgY29udmVyc2lvbiBpcyBENjUuXG4gICAqIEFzc3VtZXMgTCosIGEqIGFuZCBiKiB2YWx1ZXMgYXJlIHdoYXRldmVyIHRoZXkgYXJlIGFuZCByZXR1cm5zIHgsIHkgYW5kIHogdmFsdWVzLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7Kn0gbCBUaGUgTCogdmFsdWVcbiAgICogQHBhcmFtIHsqfSBhIFRoZSBhKiB2YWx1ZVxuICAgKiBAcGFyYW0geyp9IGIgVGhlIGIqIHZhbHVlXG4gICAqIEByZXR1cm5zICB7IE9iamVjdCB9IFRoZSBYWVogcmVwcmVzZW50YXRpb25cbiAgICogQG1lbWJlcm9mIENvbnZlcnRcbiAgICovXG4gIHN0YXRpYyBsYWJUb1hZWiAobCwgYSwgYikge1xuICAgIGlmICh0eXBlb2YgbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGEgPSBsLmFcbiAgICAgIGIgPSBsLmJcbiAgICAgIGwgPSBsLmxcbiAgICB9XG5cbiAgICBsZXQgeSA9IChsICsgMTYpIC8gMTE2XG4gICAgbGV0IHggPSB5ICsgKGEgLyA1MDApXG4gICAgbGV0IHogPSB5IC0gKGIgLyAyMDApXG5cbiAgICBpZiAoeCA+IDAuMjA2ODk2NTUxNykge1xuICAgICAgeCA9IHggKiB4ICogeFxuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gMC4xMjg0MTg1NDkzICogKHggLSAwLjEzNzkzMTAzNDUpXG4gICAgfVxuICAgIGlmICh5ID4gMC4yMDY4OTY1NTE3KSB7XG4gICAgICB5ID0geSAqIHkgKiB5XG4gICAgfSBlbHNlIHtcbiAgICAgIHkgPSAwLjEyODQxODU0OTMgKiAoeSAtIDAuMTM3OTMxMDM0NSlcbiAgICB9XG4gICAgaWYgKHogPiAwLjIwNjg5NjU1MTcpIHtcbiAgICAgIHogPSB6ICogeiAqIHpcbiAgICB9IGVsc2Uge1xuICAgICAgeiA9IDAuMTI4NDE4NTQ5MyAqICh6IC0gMC4xMzc5MzEwMzQ1KVxuICAgIH1cblxuICAgIC8vIEQ2NSByZWZlcmVuY2Ugd2hpdGUgcG9pbnRcbiAgICByZXR1cm4ge1xuICAgICAgeDogeCAqIDk1LjA0NyxcbiAgICAgIHk6IHkgKiAxMDAuMCxcbiAgICAgIHo6IHogKiAxMDguODgzXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIEwqLCBhKiwgYiogYmFjayB0byBSR0IgdmFsdWVzLlxuICAgKiBAc2VlIENvbnZlcnQucmdiVG9YWVpcbiAgICogQHNlZSBDb252ZXJ0Lnh5elRvTGFiXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsqfSByIFRoZSByZWQgY29sb3IgdmFsdWVcbiAgICogQHBhcmFtIHsqfSBnIFRoZSBncmVlbiBjb2xvciB2YWx1ZVxuICAgKiBAcGFyYW0geyp9IGIgVGhlIGJsdWUgY29sb3IgdmFsdWVcbiAgICogQG1lbWJlcm9mIENvbnZlcnRcbiAgICovXG4gIHN0YXRpYyByZ2JUb0xhYiAociwgZywgYikge1xuICAgIGlmICh0eXBlb2YgciA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGcgPSByLmdcbiAgICAgIGIgPSByLmJcbiAgICAgIHIgPSByLnJcbiAgICB9XG5cbiAgICBjb25zdCB4eXogPSB0aGlzLnJnYlRvWFlaKHIsIGcsIGIpXG4gICAgcmV0dXJuIHRoaXMueHl6VG9MYWIoeHl6KVxuICB9XG59XG4iLCIvKipcbiAqIFZhcmlvdXMgbWF0aC1oZWF2eSBoZWxwZXJzIHRoYXQgYXJlIHVzZWQgdGhyb3VnaG91dCBDYW1hbkpTLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBDYWxjdWxhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsY3VsYXRlIHtcbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50cy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB4MSAxc3QgcG9pbnQgeC1jb29yZGluYXRlLlxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB5MSAxc3QgcG9pbnQgeS1jb29yZGluYXRlLlxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB4MiAybmQgcG9pbnQgeC1jb29yZGluYXRlLlxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB5MiAybmQgcG9pbnQgeS1jb29yZGluYXRlLlxuICAgKiBAcmV0dXJucyB7IE51bWJlciB9IFRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSB0d28gcG9pbnRzLlxuICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRlXG4gICAqL1xuICBzdGF0aWMgZGlzdGFuY2UgKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4MiAtIHgxLCAyKSArIE1hdGgucG93KHkyIC0geTEsIDIpKVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIHBzZXVkb3JhbmRvbSBudW1iZXIgdGhhdCBsaWVzIHdpdGhpbiB0aGUgbWF4IC0gbWl4IHJhbmdlLiBUaGUgbnVtYmVyIGNhbiBiZSBlaXRoZXIgYW4gaW50ZWdlciBvciBhIGZsb2F0IGRlcGVuZGluZyBvbiB3aGF0IHRoZSB1c2VyIHNwZWNpZmllcy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBtaW4gVGhlIGxvd2VyIGJvdW5kIChpbmNsdXNpdmUpLlxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBtYXggVGhlIHVwcGVyIGJvdW5kIChpbmNsdXNpdmUpLlxuICAgKiBAcGFyYW0geyBCb29sZWFuIH0gZ2V0RmxvYXQgUmV0dXJuIGEgRmxvYXQgb3IgYSByb3VuZGVkIEludGVnZXI/XG4gICAqIEByZXR1cm5zIHsgTnVtYmVyIH0gVGhlIHBzZXVkb3JhbmRvbSBudW1iZXIsIGVpdGhlciBhcyBhIGZsb2F0IG9yIGludGVnZXIuXG4gICAqIEBtZW1iZXJvZiBDYWxjdWxhdGVcbiAgICovXG4gIHN0YXRpYyByYW5kb21SYW5nZSAobWluLCBtYXgsIGdldEZsb2F0ID0gZmFsc2UpIHtcbiAgICBjb25zdCByYW5kID0gbWluICsgKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSlcbiAgICBpZiAoZ2V0RmxvYXQpIHtcbiAgICAgIHJldHVybiByYW5kLnRvRml4ZWQoZ2V0RmxvYXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKHJhbmQpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGx1bWluYW5jZSBvZiBhIHNpbmdsZSBwaXhlbCB1c2luZyBhIHNwZWNpYWwgd2VpZ2h0ZWQgc3VtLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IE9iamVjdCB9IHJnYmEgUkdCQSBvYmplY3QgZGVzY3JpYmluZyBhIHNpbmdsZSBwaXhlbC5cbiAgICogQHJldHVybnMgeyBOdW1iZXIgfSBUaGUgbHVtaW5hbmNlIHZhbHVlIG9mIHRoZSBwaXhlbC5cbiAgICogQG1lbWJlcm9mIENhbGN1bGF0ZVxuICAgKi9cbiAgc3RhdGljIGx1bWluYW5jZSAocmdiYSkge1xuICAgIHJldHVybiAoMC4yOTkgKiByZ2JhLnIpICsgKDAuNTg3ICogcmdiYS5nKSArICgwLjExNCAqIHJnYmEuYilcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBiZXppZXIgY3VydmUgZ2l2ZW4gYSBzdGFydCBhbmQgZW5kIHBvaW50LCB3aXRoIGNvbnRyb2wgcG9pbnRzIGluIGJldHdlZW4uXG4gICAqIENhbiBhbHNvIG9wdGlvbmFsbHkgYm91bmQgdGhlIHkgdmFsdWVzIGJldHdlZW4gYSBsb3cgYW5kIGhpZ2ggYm91bmQuXG4gICAqIFRoaXMgaXMgZGlmZmVyZW50IHRoYW4gbW9zdCBiZXppZXIgY3VydmUgZnVuY3Rpb25zIGJlY2F1c2UgaXQgYXR0ZW1wdHMgdG8gY29uc3RydWN0IGl0IGluIHN1Y2ggYSB3YXkgdGhhdCB3ZSBjYW4gdXNlIGl0IG1vcmUgbGlrZSBhIHNpbXBsZSBpbnB1dCAtPiBvdXRwdXQgc3lzdGVtLCBvciBhIG9uZS10by1vbmUgZnVuY3Rpb24uXG4gICAqIEluIG90aGVyIHdvcmRzIHdlIGNhbiBwcm92aWRlIGFuIGlucHV0IGNvbG9yIHZhbHVlLCBhbmQgaW1tZWRpYXRlbHkgcmVjZWl2ZSBhbiBvdXRwdXQgbW9kaWZpZWQgY29sb3IgdmFsdWUuXG4gICAqIE5vdGUgdGhhdCwgYnkgZGVzaWduLCB0aGlzIGRvZXMgbm90IGZvcmNlIFggdmFsdWVzIHRvIGJlIGluIHRoZSByYW5nZSBbMC4uMjU1XS4gVGhpcyBpcyB0byBnZW5lcmFsaXplIHRoZSBmdW5jdGlvbiBhIGJpdCBtb3JlLiBJZiB5b3UgZ2l2ZSBpdCBhIHN0YXJ0aW5nIFggdmFsdWUgdGhhdCBpc24ndCAwLCBhbmQvb3IgYSBlbmRpbmcgWCB2YWx1ZSB0aGF0IGlzbid0IDI1NSwgeW91IG1heSBydW4gaW50byBwcm9ibGVtcyB3aXRoIHlvdXIgZmlsdGVyIVxuICAgKlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IEFycmF5IH0gY29udHJvbFBvaW50cyAyLWl0ZW0gYXJyYXlzIGRlc2NyaWJpbmcgdGhlIHgsIHkgY29vcmRpbmF0ZXMgb2YgdGhlIGNvbnRyb2wgcG9pbnRzLiBNaW5pbXVtIHR3by5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gW2xvd0JvdW5kPTBdIE1pbmltdW0gcG9zc2libGUgdmFsdWUgZm9yIGFueSB5LXZhbHVlIGluIHRoZSBjdXJ2ZS5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gW2hpZ2hCb3VuZD0yNTVdIE1heGltdW0gcG9zc2libGUgdmFsdWUgZm9yIGFueSB5LXZhbHVlIGluIHRoZSBjdXJ2ZS5cbiAgICogQHJldHVybnMgeyBBcnJheSB9IEFycmF5IHdob3NlIGluZGV4IHJlcHJlc2VudHMgZXZlcnkgeC12YWx1ZSBiZXR3ZWVuIHN0YXJ0IGFuZCBlbmQsIGFuZCB2YWx1ZSByZXByZXNlbnRzIHRoZSBjb3JyZXNwb25kaW5nIHktdmFsdWUuXG4gICAqIEBtZW1iZXJvZiBDYWxjdWxhdGVcbiAgICovXG4gIHN0YXRpYyBiZXppZXIgKGNvbnRyb2xQb2ludHMsIGxvd0JvdW5kID0gMCwgaGlnaEJvdW5kID0gMjU1KSB7XG4gICAgaWYgKGNvbnRyb2xQb2ludHMubGVuZ3RoIDwgMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG51bWJlciBvZiBhcmd1bWVudHMgdG8gYmV6aWVyJylcbiAgICB9XG5cbiAgICBsZXQgYmV6aWVyID0ge31cbiAgICBjb25zdCBsZXJwID0gKGEsIGIsIHQpID0+IGEgKiAoMSAtIHQpICsgYiAqIHRcbiAgICBjb25zdCBjbGFtcCA9IChhLCBtaW4sIG1heCkgPT4gTWF0aC5taW4oTWF0aC5tYXgoYSwgbWluKSwgbWF4KVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwOyBpKyspIHtcbiAgICAgIGxldCB0ID0gaSAvIDEwMDBcbiAgICAgIGxldCBwcmV2ID0gY29udHJvbFBvaW50c1xuXG4gICAgICB3aGlsZSAocHJldi5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbnN0IG5leHQgPSBbXVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBwcmV2Lmxlbmd0aCAtIDI7IGorKykge1xuICAgICAgICAgIG5leHQucHVzaChbXG4gICAgICAgICAgICBsZXJwKHByZXZbal1bMF0sIHByZXZbaiArIDFdWzBdLCB0KSxcbiAgICAgICAgICAgIGxlcnAocHJldltqXVsxXSwgcHJldltqICsgMV1bMV0sIHQpXG4gICAgICAgICAgXSlcbiAgICAgICAgfVxuICAgICAgICBwcmV2ID0gbmV4dFxuICAgICAgfVxuXG4gICAgICBiZXppZXJbTWF0aC5yb3VuZChwcmV2WzBdWzBdKV0gPSBNYXRoLnJvdW5kKGNsYW1wKHByZXZbMF1bMV0sIGxvd0JvdW5kLCBoaWdoQm91bmQpKVxuICAgIH1cblxuICAgIGNvbnN0IGVuZFggPSBjb250cm9sUG9pbnRzW2NvbnRyb2xQb2ludHMubGVuZ3RoIC0gMV1bMF1cbiAgICBiZXppZXIgPSBDYWxjdWxhdGUubWlzc2luZ1ZhbHVlcyhiZXppZXIsIGVuZFgpXG5cbiAgICAvLyBFZGdlIGNhc2VcbiAgICBpZiAoIWJlemllcltlbmRYXSkge1xuICAgICAgYmV6aWVyW2VuZFhdID0gYmV6aWVyW2VuZFggLSAxXVxuICAgIH1cblxuICAgIHJldHVybiBiZXppZXJcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHBvc3NpYmxlIG1pc3NpbmcgdmFsdWVzIGZyb20gYSBnaXZlbiB2YWx1ZSBhcnJheS4gTm90ZSB0aGF0IHRoaXMgcmV0dXJucyBhIGNvcHkgYW5kIGRvZXMgbm90IG11dGF0ZSB0aGUgb3JpZ2luYWwuIEluIGNhc2Ugbm8gdmFsdWVzIGFyZSBtaXNzaW5nIHRoZSBvcmlnaW5hbCBhcnJheSBpcyByZXR1cm5lZCBhcyB0aGF0IGlzIGNvbnZlbmllbnQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgQXJyYXkgfSAyLWl0ZW0gYXJyYXlzIGRlc2NyaWJpbmcgdGhlIHgsIHkgY29vcmRpbmF0ZXMgb2YgdGhlIGNvbnRyb2wgcG9pbnRzLlxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBlbmQgeCB2YWx1ZSBvZiB0aGUgYXJyYXkgKG1heGltdW0pXG4gICAqIEByZXR1cm4geyBBcnJheSB9IEFycmF5IHdob3NlIGluZGV4IHJlcHJlc2VudHMgZXZlcnkgeC12YWx1ZSBiZXR3ZWVuIHN0YXJ0IGFuZCBlbmQsIGFuZCB2YWx1ZSByZXByZXNlbnRzIHRoZSBjb3JyZXNwb25kaW5nIHktdmFsdWUuXG4gICAqIEBtZW1iZXJvZiBDYWxjdWxhdGVcbiAgICovXG4gIHN0YXRpYyBtaXNzaW5nVmFsdWVzICh2YWx1ZXMsIGVuZFgpIHtcbiAgICAvLyBEbyBhIHNlYXJjaCBmb3IgbWlzc2luZyB2YWx1ZXMgaW4gdGhlIGJlemllciBhcnJheSBhbmQgdXNlIGxpbmVhclxuICAgIC8vIGludGVycG9sYXRpb24gdG8gYXBwcm94aW1hdGUgdGhlaXIgdmFsdWVzXG4gICAgaWYgKE9iamVjdC5rZXlzKHZhbHVlcykubGVuZ3RoIDwgZW5kWCArIDEpIHtcbiAgICAgIGNvbnN0IHJldCA9IHt9XG4gICAgICBsZXQgbGVmdENvb3JkLCByaWdodENvb3JkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBlbmRYOyBpKyspIHtcbiAgICAgICAgaWYgKHZhbHVlc1tpXSkge1xuICAgICAgICAgIHJldFtpXSA9IHZhbHVlc1tpXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxlZnRDb29yZCA9IFtpIC0gMSwgcmV0W2kgLSAxXV1cbiAgICAgICAgICAvLyBGaW5kIHRoZSBmaXJzdCB2YWx1ZSB0byB0aGUgcmlnaHQuIElkZWFsbHkgdGhpcyBsb29wIHdpbGwgYnJlYWtcbiAgICAgICAgICAvLyB2ZXJ5IHF1aWNrbHkuXG4gICAgICAgICAgZm9yIChsZXQgaiA9IGk7IGogPD0gZW5kWDsgaisrKSB7XG4gICAgICAgICAgICBpZiAodmFsdWVzW2pdKSB7XG4gICAgICAgICAgICAgIHJpZ2h0Q29vcmQgPSBbaiwgdmFsdWVzW2pdXVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXRbaV0gPSBsZWZ0Q29vcmRbMV0gKyAoKHJpZ2h0Q29vcmRbMV0gLSBsZWZ0Q29vcmRbMV0pIC8gKHJpZ2h0Q29vcmRbMF0gLSBsZWZ0Q29vcmRbMF0pKSAqIChpIC0gbGVmdENvb3JkWzBdKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXNcbiAgfVxufVxuIiwiLy8gVGhlIGZpbHRlcnMgZGVmaW5lIGFsbCBvZiB0aGUgYnVpbHQtaW4gZnVuY3Rpb25hbGl0eSB0aGF0IGNvbWVzIHdpdGggQ2FtYW4gKGFzIG9wcG9zZWQgdG8gYmVpbmcgIHByb3ZpZGVkIGJ5IGEgcGx1Z2luKS4gQWxsIG9mIHRoZXNlIGZpbHRlcnMgYXJlIHJhdGhlcmJhc2ljLCBidXQgYXJlIGV4dHJlbWVseSBwb3dlcmZ1bCB3aGVuIG1hbnkgYXJlIGNvbWJpbmVkLiBGb3IgaW5mb3JtYXRpb24gb24gY3JlYXRpbmcgcGx1Z2lucywgY2hlY2sgb3V0IHRoZSBbUGx1Z2luIENyZWF0aW9uXShodHRwOi8vY2FtYW5qcy5jb20vZG9jcy9wbHVnaW4tY3JlYXRpb24pIHBhZ2UsIGFuZCBmb3IgaW5mb3JtYXRpb24gb24gdXNpbmcgdGhlIHBsdWdpbnMsIGNoZWNrIG91dCB0aGUgW0J1aWx0LUluIEZ1bmN0aW9uYWxpdHkoaHR0cDovL2NhbWFuanMuY29tL2RvY3MvYnVpbHQtaW4pIHBhZ2UuXG5cbmltcG9ydCBDb252ZXJ0IGZyb20gJy4uL2NvcmUvY29udmVydCdcbmltcG9ydCBDYWxjdWxhdGUgZnJvbSAnLi4vY29yZS9jYWxjdWxhdGUnXG5cbi8qKlxuICpcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyp9IEZpbHRlclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWdpc3RlckZpbHRlciAoRmlsdGVyKSB7XG4gIC8qXG4gICogRmlsbCBDb2xvclxuICAqIEZpbGxzIHRoZSBjYW52YXMgd2l0aCBhIHNpbmdsZSBzb2xpZCBjb2xvci5cbiAgKiBBcmd1bWVudHM6IENhbiB0YWtlIGVpdGhlciBzZXBhcmF0ZSBSLCBHLCBhbmQgQiB2YWx1ZXMgYXMgYXJndW1lbnRzLCBvciBhIHNpbmdsZSBoZXggY29sb3IgdmFsdWUuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignZmlsbENvbG9yJywgZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBsZXQgY29sb3JcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNvbG9yID0gQ29udmVydC5oZXhUb1JHQihhcmdzWzBdKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb2xvciA9IHtcbiAgICAgICAgcjogYXJnc1swXSxcbiAgICAgICAgZzogYXJnc1sxXSxcbiAgICAgICAgYjogYXJnc1syXVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzKCdmaWxsQ29sb3InLCAocmdiYSkgPT4ge1xuICAgICAgcmdiYS5yID0gY29sb3IuclxuICAgICAgcmdiYS5nID0gY29sb3IuZ1xuICAgICAgcmdiYS5iID0gY29sb3IuYlxuICAgICAgcmdiYS5hID0gMjU1XG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBCcmlnaHRuZXNzXG4gICogU2ltcGxlIGJyaWdodG5lc3MgYWRqdXN0bWVudC5cbiAgKiBBcmd1bWVudHM6IFJhbmdlIGlzIC0xMDAgdG8gMTAwLiBWYWx1ZXMgPCAwIHdpbGwgZGFya2VuIGltYWdlIHdoaWxlIHZhbHVlcyA+IDAgd2lsbCBicmlnaHRlbi5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdicmlnaHRuZXNzJywgZnVuY3Rpb24gKGFkanVzdCkge1xuICAgIGFkanVzdCA9IE1hdGguZmxvb3IoMjU1ICogKGFkanVzdCAvIDEwMCkpXG4gICAgcmV0dXJuIHRoaXMucHJvY2VzcygnYnJpZ2h0bmVzcycsIChyZ2JhKSA9PiB7XG4gICAgICByZ2JhLnIgKz0gYWRqdXN0XG4gICAgICByZ2JhLmcgKz0gYWRqdXN0XG4gICAgICByZ2JhLmIgKz0gYWRqdXN0XG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBTYXR1cmF0aW9uXG4gICogQWRqdXN0cyB0aGUgY29sb3Igc2F0dXJhdGlvbiBvZiB0aGUgaW1hZ2UuXG4gICogQXJndW1lbnRzOiBSYW5nZSBpcyAtMTAwIHRvIDEwMC4gVmFsdWVzIDwgMCB3aWxsIGRlc2F0dXJhdGUgdGhlIGltYWdlIHdoaWxlIHZhbHVlcyA+IDAgd2lsbCBzYXR1cmF0ZSBpdC5cbiAgKiBJZiB5b3Ugd2FudCB0byBjb21wbGV0ZWx5IGRlc2F0dXJhdGUgdGhlIGltYWdlLCB1c2luZyB0aGUgZ3JleXNjYWxlIGZpbHRlciBpcyBoaWdobHkgcmVjb21tZW5kZWQgYmVjYXVzZSBpdCB3aWxsIHlpZWxkIGJldHRlciByZXN1bHRzLlxuICAqL1xuICBGaWx0ZXIucmVnaXN0ZXIoJ3NhdHVyYXRpb24nLCBmdW5jdGlvbiAoYWRqdXN0KSB7XG4gICAgYWRqdXN0ICo9IC0wLjAxXG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzcygnc2F0dXJhdGlvbicsIChyZ2JhKSA9PiB7XG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1heChyZ2JhLnIsIHJnYmEuZywgcmdiYS5iKVxuXG4gICAgICBpZiAocmdiYS5yICE9PSBtYXgpIHtcbiAgICAgICAgcmdiYS5yICs9IChtYXggLSByZ2JhLnIpICogYWRqdXN0XG4gICAgICB9XG4gICAgICBpZiAocmdiYS5nICE9PSBtYXgpIHtcbiAgICAgICAgcmdiYS5nICs9IChtYXggLSByZ2JhLmcpICogYWRqdXN0XG4gICAgICB9XG4gICAgICBpZiAocmdiYS5iICE9PSBtYXgpIHtcbiAgICAgICAgcmdiYS5iICs9IChtYXggLSByZ2JhLmIpICogYWRqdXN0XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIFZpYnJhbmNlXG4gICogU2ltaWxhciB0byBzYXR1cmF0aW9uLCBidXQgYWRqdXN0cyB0aGUgc2F0dXJhdGlvbiBsZXZlbHMgaW4gYSBzbGlnaHRseSBzbWFydGVyLCBtb3JlIHN1YnRsZSB3YXkuXG4gICogVmlicmFuY2Ugd2lsbCBhdHRlbXB0IHRvIGJvb3N0IGNvbG9ycyB0aGF0IGFyZSBsZXNzIHNhdHVyYXRlZCBtb3JlIGFuZCBib29zdCBhbHJlYWR5IHNhdHVyYXRlZCBjb2xvcnMgbGVzcywgd2hpbGUgc2F0dXJhdGlvbiBib29zdHMgYWxsIGNvbG9ycyBieSB0aGUgc2FtZSBsZXZlbC5cbiAgKiBBcmd1bWVudHM6IFJhbmdlIGlzIC0xMDAgdG8gMTAwLiBWYWx1ZXMgPCAwIHdpbGwgZGVzYXR1cmF0ZSB0aGUgaW1hZ2Ugd2hpbGUgdmFsdWVzID4gMCB3aWxsIHNhdHVyYXRlIGl0LlxuICAqIElmIHlvdSB3YW50IHRvIGNvbXBsZXRlbHkgZGVzYXR1cmF0ZSB0aGUgaW1hZ2UsIHVzaW5nIHRoZSBncmV5c2NhbGUgZmlsdGVyIGlzIGhpZ2hseSByZWNvbW1lbmRlZCBiZWNhdXNlIGl0IHdpbGwgeWllbGQgYmV0dGVyIHJlc3VsdHMuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcigndmlicmFuY2UnLCBmdW5jdGlvbiAoYWRqdXN0KSB7XG4gICAgYWRqdXN0ICo9IC0xXG4gICAgcmV0dXJuIHRoaXMucHJvY2VzcygndmlicmFuY2UnLCAocmdiYSkgPT4ge1xuICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgocmdiYS5yLCByZ2JhLmcsIHJnYmEuYilcbiAgICAgIGNvbnN0IGF2ZyA9IChyZ2JhLnIgKyByZ2JhLmcgKyByZ2JhLmIpIC8gM1xuICAgICAgY29uc3QgYW10ID0gKChNYXRoLmFicyhtYXggLSBhdmcpICogMiAvIDI1NSkgKiBhZGp1c3QpIC8gMTAwXG5cbiAgICAgIGlmIChyZ2JhLnIgIT09IG1heCkge1xuICAgICAgICByZ2JhLnIgKz0gKG1heCAtIHJnYmEucikgKiBhbXRcbiAgICAgIH1cbiAgICAgIGlmIChyZ2JhLmcgIT09IG1heCkge1xuICAgICAgICByZ2JhLmcgKz0gKG1heCAtIHJnYmEuZykgKiBhbXRcbiAgICAgIH1cbiAgICAgIGlmIChyZ2JhLmIgIT09IG1heCkge1xuICAgICAgICByZ2JhLmIgKz0gKG1heCAtIHJnYmEuYikgKiBhbXRcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogR3JleXNjYWxlXG4gICogQW4gaW1wcm92ZWQgZ3JleXNjYWxlIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIG1ha2UgcHJldHRpZXIgcmVzdWx0cyB0aGFuIHNpbXBseSB1c2luZyB0aGUgc2F0dXJhdGlvbiBmaWx0ZXIgdG8gcmVtb3ZlIGNvbG9yLiBJdCBkb2VzIHNvIGJ5IHVzaW5nIGZhY3RvcnMgdGhhdCBkaXJlY3RseSByZWxhdGUgdG8gaG93IHRoZSBodW1hbiBleWUgcGVyY2V2ZXMgY29sb3IgYW5kIHZhbHVlcy4gVGhlcmUgYXJlIG5vIGFyZ3VtZW50cywgaXQgc2ltcGx5IG1ha2VzIHRoZSBpbWFnZSBncmV5c2NhbGUgd2l0aCBubyBpbi1iZXR3ZWVuLlxuICAqIEFsZ29yaXRobSBhZG9wdGVkIGZyb20gaHR0cDovL3d3dy5waHBpZWQuY29tL2ltYWdlLWZ1bi9cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdncmV5c2NhbGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvY2VzcygnZ3JleXNjYWxlJywgKHJnYmEpID0+IHtcbiAgICAgIGNvbnN0IGF2ZyA9IENhbGN1bGF0ZS5sdW1pbmFuY2UocmdiYSlcbiAgICAgIHJnYmEuciA9IGF2Z1xuICAgICAgcmdiYS5nID0gYXZnXG4gICAgICByZ2JhLmIgPSBhdmdcbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIENvbnRyYXN0XG4gICogSW5jcmVhc2VzIG9yIGRlY3JlYXNlcyB0aGUgY29sb3IgY29udHJhc3Qgb2YgdGhlIGltYWdlLlxuICAqIEFyZ3VtZW50czogUmFuZ2UgaXMgLTEwMCB0byAxMDAuIFZhbHVlcyA8IDAgd2lsbCBkZWNyZWFzZSBjb250cmFzdCB3aGlsZSB2YWx1ZXMgPiAwIHdpbGwgaW5jcmVhc2UgY29udHJhc3QuXG4gICogVGhlIGNvbnRyYXN0IGFkanVzdG1lbnQgdmFsdWVzIGFyZSBhIGJpdCBzZW5zaXRpdmUuIFdoaWxlIHVucmVzdHJpY3RlZCwgc2FuZSBhZGp1c3RtZW50IHZhbHVlcyBhcmUgdXN1YWxseSBhcm91bmQgNS0xMC5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdjb250cmFzdCcsIGZ1bmN0aW9uKGFkanVzdCkge1xuICAgIGFkanVzdCA9IE1hdGgucG93KChhZGp1c3QgKyAxMDApIC8gMTAwLCAyKVxuICAgIHJldHVybiB0aGlzLnByb2Nlc3MoJ2NvbnRyYXN0JywgKHJnYmEpID0+IHtcbiAgICAgIC8vIFJlZCBjaGFubmVsXG4gICAgICByZ2JhLnIgLz0gMjU1XG4gICAgICByZ2JhLnIgLT0gMC41XG4gICAgICByZ2JhLnIgKj0gYWRqdXN0XG4gICAgICByZ2JhLnIgKz0gMC41XG4gICAgICByZ2JhLnIgKj0gMjU1XG5cbiAgICAgIC8vIEdyZWVuIGNoYW5uZWxcbiAgICAgIHJnYmEuZyAvPSAyNTVcbiAgICAgIHJnYmEuZyAtPSAwLjVcbiAgICAgIHJnYmEuZyAqPSBhZGp1c3RcbiAgICAgIHJnYmEuZyArPSAwLjVcbiAgICAgIHJnYmEuZyAqPSAyNTVcblxuICAgICAgLy8gQmx1ZSBjaGFubmVsXG4gICAgICByZ2JhLmIgLz0gMjU1XG4gICAgICByZ2JhLmIgLT0gMC41XG4gICAgICByZ2JhLmIgKj0gYWRqdXN0XG4gICAgICByZ2JhLmIgKz0gMC41XG4gICAgICByZ2JhLmIgKj0gMjU1XG5cbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIEh1ZVxuICAqIEFkanVzdHMgdGhlIGh1ZSBvZiB0aGUgaW1hZ2UuIEl0IGNhbiBiZSB1c2VkIHRvIHNoaWZ0IHRoZSBjb2xvcnMgaW4gYW4gaW1hZ2UgaW4gYSB1bmlmb3JtIGZhc2hpb24uIElmIHlvdSBhcmUgdW5mYW1pbGlhciB3aXRoIEh1ZSwgSSByZWNvbW1lbmQgcmVhZGluZyB0aGlzIFtXaWtpcGVkaWEgYXJ0aWNsZV0oaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9IdWUpLlxuICAqIEFyZ3VtZW50czogUmFuZ2UgaXMgMCB0byAxMDBcbiAgKiBTb21ldGltZXMsIEh1ZSBpcyBleHByZXNzZWQgaW4gdGhlIHJhbmdlIG9mIDAgdG8gMzYwLiBJZiB0aGF0J3MgdGhlIHRlcm1pbm9sb2d5IHlvdSdyZSB1c2VkIHRvLCB0aGluayBvZiAwIHRvIDEwMCByZXByZXNlbnRpbmcgdGhlIHBlcmNlbnRhZ2Ugb2YgSHVlIHNoaWZ0IGluIHRoZSAwIHRvIDM2MCByYW5nZS5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdodWUnLCBmdW5jdGlvbiAoYWRqdXN0KSB7XG4gICAgcmV0dXJuIHRoaXMucHJvY2VzcygnaHVlJywgKHJnYmEpID0+IHtcbiAgICAgIGNvbnN0IGhzdiA9IENvbnZlcnQucmdiVG9IU1YocmdiYS5yLCByZ2JhLmcsIHJnYmEuYilcblxuICAgICAgbGV0IGggPSBoc3YuaCAqIDEwMFxuICAgICAgaCArPSBNYXRoLmFicyhhZGp1c3QpXG4gICAgICBoID0gaCAlIDEwMFxuICAgICAgaCAvPSAxMDBcbiAgICAgIGhzdi5oID0gaFxuXG4gICAgICBjb25zdCB7ciwgZywgYn0gPSBDb252ZXJ0LmhzdlRvUkdCKGhzdi5oLCBoc3YucywgaHN2LnYpXG4gICAgICByZ2JhLnIgPSByXG4gICAgICByZ2JhLmcgPSBnXG4gICAgICByZ2JhLmIgPSBiXG5cbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIENvbG9yaXplXG4gICogVW5pZm9ybWx5IHNoaWZ0cyB0aGUgY29sb3JzIGluIGFuIGltYWdlIHRvd2FyZHMgdGhlIGdpdmVuIGNvbG9yLiBUaGUgYWRqdXN0bWVudCByYW5nZSBpcyBmcm9tIDAgdG8gMTAwLiBUaGUgaGlnaGVyIHRoZSB2YWx1ZSwgdGhlIGNsb3NlciB0aGUgY29sb3JzIGluIHRoZSBpbWFnZSBzaGlmdCB0b3dhcmRzIHRoZSBnaXZlbiBhZGp1c3RtZW50IGNvbG9yLlxuICAqIEFyZ3VtZW50czogVGhpcyBmaWx0ZXIgaXMgcG9seW1vcnBoaWMgYW5kIGNhbiB0YWtlIHR3byBkaWZmZXJlbnQgc2V0cyBvZiBhcmd1bWVudHMuIEVpdGhlciBhIGhleCBjb2xvciBzdHJpbmcgYW5kIGFuIGFkanVzdG1lbnQgdmFsdWUsIG9yIFJHQiBjb2xvcnMgYW5kIGFuIGFkanVzdG1lbnQgdmFsdWUuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignY29sb3JpemUnLCBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGxldCByZ2IsIGxldmVsXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAyKSB7XG4gICAgICByZ2IgPSBDb252ZXJ0LmhleFRvUkdCKGFyZ3NbMF0pXG4gICAgICBsZXZlbCA9IGFyZ3NbMV1cbiAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09PSA0KSB7XG4gICAgICByZ2IgPSB7XG4gICAgICAgIHI6IGFyZ3NbMF0sXG4gICAgICAgIGc6IGFyZ3NbMV0sXG4gICAgICAgIGI6IGFyZ3NbMl1cbiAgICAgIH1cbiAgICAgIGxldmVsID0gYXJnc1szXVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnByb2Nlc3MoJ2NvbG9yaXplJywgKHJnYmEpID0+IHtcbiAgICAgIHJnYmEuciAtPSAocmdiYS5yIC0gcmdiLnIpICogKGxldmVsIC8gMTAwKVxuICAgICAgcmdiYS5nIC09IChyZ2JhLmcgLSByZ2IuZykgKiAobGV2ZWwgLyAxMDApXG4gICAgICByZ2JhLmIgLT0gKHJnYmEuYiAtIHJnYi5iKSAqIChsZXZlbCAvIDEwMClcbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIEludmVydFxuICAqIEludmVydHMgYWxsIGNvbG9ycyBpbiB0aGUgaW1hZ2UgYnkgc3VidHJhY3RpbmcgZWFjaCBjb2xvciBjaGFubmVsIHZhbHVlIGZyb20gMjU1LiBObyBhcmd1bWVudHMuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignaW52ZXJ0JywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnByb2Nlc3MoJ2ludmVydCcsIChyZ2JhKSA9PiB7XG4gICAgICByZ2JhLnIgPSAyNTUgLSByZ2JhLnJcbiAgICAgIHJnYmEuZyA9IDI1NSAtIHJnYmEuZ1xuICAgICAgcmdiYS5iID0gMjU1IC0gcmdiYS5iXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBTZXBpYVxuICAqIEFwcGxpZXMgYW4gYWRqdXN0YWJsZSBzZXBpYSBmaWx0ZXIgdG8gdGhlIGltYWdlLlxuICAqIEFyZ3VtZW50czogQXNzdW1lcyBhZGp1c3RtZW50IGlzIGJldHdlZW4gMCBhbmQgMTAwLCB3aGljaCByZXByZXNlbnRzIGhvdyBtdWNoIHRoZSBzZXBpYSBmaWx0ZXIgaXMgYXBwbGllZC5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdzZXBpYScsIGZ1bmN0aW9uIChhZGp1c3QgPSAxMDApIHtcbiAgICBhZGp1c3QgLz0gMTAwXG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzcygnc2VwaWEnLCAocmdiYSkgPT4ge1xuICAgICAgLy8gQWxsIHRocmVlIGNvbG9yIGNoYW5uZWxzIGhhdmUgc3BlY2lhbCBjb252ZXJzaW9uIGZhY3RvcnMgdGhhdFxuICAgICAgLy8gZGVmaW5lIHdoYXQgc2VwaWEgaXMuIEhlcmUgd2UgYWRqdXN0IGVhY2ggY2hhbm5lbCBpbmRpdmlkdWFsbHksXG4gICAgICAvLyB3aXRoIHRoZSB0d2lzdCB0aGF0IHlvdSBjYW4gcGFydGlhbGx5IGFwcGx5IHRoZSBzZXBpYSBmaWx0ZXIuXG4gICAgICByZ2JhLnIgPSBNYXRoLm1pbigyNTUsIChyZ2JhLnIgKiAoMSAtICgwLjYwNyAqIGFkanVzdCkpKSArIChyZ2JhLmcgKiAoMC43NjkgKiBhZGp1c3QpKSArIChyZ2JhLmIgKiAoMC4xODkgKiBhZGp1c3QpKSlcbiAgICAgIHJnYmEuZyA9IE1hdGgubWluKDI1NSwgKHJnYmEuciAqICgwLjM0OSAqIGFkanVzdCkpICsgKHJnYmEuZyAqICgxIC0gKDAuMzE0ICogYWRqdXN0KSkpICsgKHJnYmEuYiAqICgwLjE2OCAqIGFkanVzdCkpKVxuICAgICAgcmdiYS5iID0gTWF0aC5taW4oMjU1LCAocmdiYS5yICogKDAuMjcyICogYWRqdXN0KSkgKyAocmdiYS5nICogKDAuNTM0ICogYWRqdXN0KSkgKyAocmdiYS5iICogKDEgLSAoMC44NjkgKiBhZGp1c3QpKSkpXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBHYW1tYVxuICAqIEFkanVzdHMgdGhlIGdhbW1hIG9mIHRoZSBpbWFnZS5cbiAgKiBBcmd1bWVudHM6IFJhbmdlIGlzIGZyb20gMCB0byBpbmZpbml0eSwgYWx0aG91Z2ggc2FuZSB2YWx1ZXMgYXJlIGZyb20gMCB0byA0IG9yIDUuXG4gICogVmFsdWVzIGJldHdlZW4gMCBhbmQgMSB3aWxsIGxlc3NlbiB0aGUgY29udHJhc3Qgd2hpbGUgdmFsdWVzIGdyZWF0ZXIgdGhhbiAxIHdpbGwgaW5jcmVhc2UgaXQuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignZ2FtbWEnLCBmdW5jdGlvbiAoYWRqdXN0KSB7XG4gICAgcmV0dXJuIHRoaXMucHJvY2VzcygnZ2FtbWEnLCAocmdiYSkgPT4ge1xuICAgICAgcmdiYS5yID0gTWF0aC5wb3cocmdiYS5yIC8gMjU1LCBhZGp1c3QpICogMjU1XG4gICAgICByZ2JhLmcgPSBNYXRoLnBvdyhyZ2JhLmcgLyAyNTUsIGFkanVzdCkgKiAyNTVcbiAgICAgIHJnYmEuYiA9IE1hdGgucG93KHJnYmEuYiAvIDI1NSwgYWRqdXN0KSAqIDI1NVxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogTm9pc2VcbiAgKiBBZGRzIG5vaXNlIHRvIHRoZSBpbWFnZSBvbiBhIHNjYWxlIGZyb20gMSAtIDEwMC4gSG93ZXZlciwgdGhlIHNjYWxlIGlzbid0IGNvbnN0cmFpbmVkLCBzbyB5b3UgY2FuIHNwZWNpZnkgYSB2YWx1ZSA+IDEwMCBpZiB5b3Ugd2FudCBhIExPVCBvZiBub2lzZS5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdub2lzZScsIGZ1bmN0aW9uIChhZGp1c3QpIHtcbiAgICBhZGp1c3QgPSBNYXRoLmFicyhhZGp1c3QpICogMi41NVxuXG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzcygnbm9pc2UnLCAocmdiYSkgPT4ge1xuICAgICAgY29uc3QgcmFuZCA9IENhbGN1bGF0ZS5yYW5kb21SYW5nZShhZGp1c3QgKiAtMSwgYWRqdXN0KVxuICAgICAgcmdiYS5yICs9IHJhbmRcbiAgICAgIHJnYmEuZyArPSByYW5kXG4gICAgICByZ2JhLmIgKz0gcmFuZFxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogQ2xpcFxuICAqIENsaXBzIGEgY29sb3IgdG8gbWF4IHZhbHVlcyB3aGVuIGl0IGZhbGxzIG91dHNpZGUgb2YgdGhlIHNwZWNpZmllZCByYW5nZS5cbiAgKiBBcmd1bWVudHM6IHN1cHBsaWVkIHZhbHVlIHNob3VsZCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdjbGlwJywgZnVuY3Rpb24gKGFkanVzdCkge1xuICAgIGFkanVzdCA9IE1hdGguYWJzKGFkanVzdCkgKiAyLjU1XG5cbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzKCdjbGlwJywgKHJnYmEpID0+IHtcbiAgICAgIGlmIChyZ2JhLnIgPiAyNTUgLSBhZGp1c3QpIHtcbiAgICAgICAgcmdiYS5yID0gMjU1XG4gICAgICB9IGVsc2UgaWYgKHJnYmEuciA8IGFkanVzdCkge1xuICAgICAgICByZ2JhLnIgPSAwXG4gICAgICB9XG5cbiAgICAgIGlmIChyZ2JhLmcgPiAyNTUgLSBhZGp1c3QpIHtcbiAgICAgICAgcmdiYS5nID0gMjU1XG4gICAgICB9IGVsc2UgaWYgKHJnYmEuZyA8IGFkanVzdCkge1xuICAgICAgICByZ2JhLmcgPSAwXG4gICAgICB9XG5cbiAgICAgIGlmIChyZ2JhLmIgPiAyNTUgLSBhZGp1c3QpIHtcbiAgICAgICAgcmdiYS5iID0gMjU1XG4gICAgICB9IGVsc2UgaWYgKHJnYmEuYiA8IGFkanVzdCkge1xuICAgICAgICByZ2JhLmIgPSAwXG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIENoYW5uZWxzXG4gICogTGV0cyB5b3UgbW9kaWZ5IHRoZSBpbnRlbnNpdHkgb2YgYW55IGNvbWJpbmF0aW9uIG9mIHJlZCwgZ3JlZW4sIG9yIGJsdWUgY2hhbm5lbHMgaW5kaXZpZHVhbGx5LlxuICAqIEFyZ3VtZW50czogTXVzdCBiZSBnaXZlbiBhdCBsZWFzdCBvbmUgY29sb3IgY2hhbm5lbCB0byBhZGp1c3QgaW4gb3JkZXIgdG8gd29yay5cbiAgKiBPcHRpb25zIGZvcm1hdCAobXVzdCBzcGVjaWZ5IDEgLSAzIGNvbG9ycyk6XG4gICoge1xuICAqICAgcmVkOiAyMCxcbiAgKiAgIGdyZWVuOiAtNSxcbiAgKiAgIGJsdWU6IC00MFxuICAqIH1cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdjaGFubmVscycsIGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgZm9yIChsZXQgY2hhbiBpbiBvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShjaGFuKSkge1xuICAgICAgICBpZiAob3B0aW9uc1tjaGFuXSA9PT0gMCkge1xuICAgICAgICAgIGRlbGV0ZSBvcHRpb25zW2NoYW5dXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zW2NoYW5dIC89IDEwMFxuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucHJvY2VzcygnY2hhbm5lbHMnLCAocmdiYSkgPT4ge1xuICAgICAgaWYgKG9wdGlvbnMucmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnJlZCA+IDApIHtcbiAgICAgICAgICByZ2JhLnIgKz0gKDI1NSAtIHJnYmEucikgKiBvcHRpb25zLnJlZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJnYmEuciAtPSByZ2JhLnIgKiBNYXRoLmFicyhvcHRpb25zLnJlZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMuZ3JlZW4pIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZ3JlZW4gPiAwKSB7XG4gICAgICAgICAgcmdiYS5nICs9ICgyNTUgLSByZ2JhLmcpICogb3B0aW9ucy5ncmVlblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJnYmEuZyAtPSByZ2JhLmcgKiBNYXRoLmFicyhvcHRpb25zLmdyZWVuKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy5ibHVlKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmJsdWUgPiAwKSB7XG4gICAgICAgICAgcmdiYS5iICs9ICgyNTUgLSByZ2JhLmIpICogb3B0aW9ucy5ibHVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmdiYS5iIC09IHJnYmEuYiAqIE1hdGguYWJzKG9wdGlvbnMuYmx1ZSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBDdXJ2ZXNcbiAgKiBDdXJ2ZXMgaW1wbGVtZW50YXRpb24gdXNpbmcgQmV6aWVyIGN1cnZlIGVxdWF0aW9uLiBJZiB5b3UncmUgZmFtaWxpYXIgd2l0aCB0aGUgQ3VydmVzIGZ1bmN0aW9uYWxpdHkgaW4gUGhvdG9zaG9wLCB0aGlzIHdvcmtzIGluIGEgdmVyeSBzaW1pbGFyIGZhc2hpb24uXG4gICogQXJndW1lbnRzOlxuICAqIGNoYW4gLSBbciwgZywgYiwgcmdiXVxuICAqIGNwcyAtIFt4LCB5XSogKGN1cnZlIGNvbnRyb2wgcG9pbnRzLCBtaW4uIDI7IDAgLSAyNTUpXG4gICogYWxnbyAtIGZ1bmN0aW9uIChvcHRpb25hbClcbiAgKlxuICAqIFRoZSBmaXJzdCBhcmd1bWVudCByZXByZXNlbnRzIHRoZSBjaGFubmVscyB5b3Ugd2lzaCB0byBtb2RpZnkgd2l0aCB0aGUgZmlsdGVyLiBJdCBjYW4gYmUgYW4gYXJyYXkgb2YgY2hhbm5lbHMgb3IgYSBzdHJpbmcgKGZvciBhIHNpbmdsZSBjaGFubmVsKS4gVGhlIHJlc3Qgb2YgdGhlIGFyZ3VtZW50cyBhcmUgMi1lbGVtZW50IGFycmF5cyB0aGF0IHJlcHJlc2VudCBwb2ludCBjb29yZGluYXRlcy4gVGhleSBhcmUgc3BlY2lmaWVkIGluIHRoZSBzYW1lIG9yZGVyIGFzIHNob3duIGluIHRoaXMgaW1hZ2UgdG8gdGhlIHJpZ2h0LiBUaGUgY29vcmRpbmF0ZXMgYXJlIGluIHRoZSByYW5nZSBvZiAwIHRvIDI1NSBmb3IgYm90aCBYIGFuZCBZIHZhbHVlcy5cbiAgKiBJdCBpcyBwb3NzaWJsZSB0byBwYXNzIHRoZSBmdW5jdGlvbiBhbiBvcHRpb25hbCBmdW5jdGlvbiBkZXNjcmliaW5nIHdoaWNoIGN1cnZlIGFsZ29yaXRobSB0byB1c2UuXG4gICogSXQgZGVmYXVsdHMgdG8gYmV6aWVyLlxuICAqIFRoZSB4LWF4aXMgcmVwcmVzZW50cyB0aGUgaW5wdXQgdmFsdWUgZm9yIGEgc2luZ2xlIGNoYW5uZWwsIHdoaWxlIHRoZSB5LWF4aXMgcmVwcmVzZW50cyB0aGUgb3V0cHV0IHZhbHVlLlxuICAqL1xuICBGaWx0ZXIucmVnaXN0ZXIoJ2N1cnZlcycsIGZ1bmN0aW9uIChjaGFucywgLi4uY3BzKSB7XG4gICAgY29uc3QgbGFzdCA9IGNwc1tjcHMubGVuZ3RoIC0gMV1cbiAgICBsZXQgYWxnb1xuICAgIGlmICh0eXBlb2YgbGFzdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYWxnbyA9IGxhc3RcbiAgICAgIGNwcy5wb3AoKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGxhc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICBhbGdvID0gQ2FsY3VsYXRlW2xhc3RdXG4gICAgICBjcHMucG9wKClcbiAgICB9IGVsc2Uge1xuICAgICAgYWxnbyA9IENhbGN1bGF0ZS5iZXppZXJcbiAgICB9XG5cbiAgICAvLyBJZiBjaGFubmVscyBhcmUgaW4gYSBzdHJpbmcsIHNwbGl0IHRvIGFuIGFycmF5XG4gICAgaWYgKHR5cGVvZiBjaGFucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNoYW5zID0gY2hhbnMuc3BsaXQoJycpXG4gICAgfVxuICAgIGlmIChjaGFuc1swXSA9PT0gJ3YnKSB7XG4gICAgICBjaGFucyA9IFsncicsICdnJywgJ2InXVxuICAgIH1cblxuICAgIGlmIChjcHMubGVuZ3RoIDwgMikge1xuICAgICAgLy8gbWlnaHQgd2FudCB0byBnaXZlIGEgd2FybmluZyBub3dcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBudW1iZXIgb2YgYXJndW1lbnRzIHRvIGN1cnZlcyBmaWx0ZXInKVxuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIGEgY3VydmVcbiAgICBjb25zdCBiZXppZXIgPSBhbGdvKGNwcywgMCwgMjU1KVxuXG4gICAgLy8gSWYgdGhlIGN1cnZlIHN0YXJ0cyBhZnRlciB4ID0gMCwgaW5pdGlhbGl6ZSBpdCB3aXRoIGEgZmxhdCBsaW5lXG4gICAgLy8gdW50aWwgdGhlIGN1cnZlIGJlZ2lucy5cbiAgICBjb25zdCBzdGFydCA9IGNwc1swXVxuICAgIGlmIChzdGFydFswXSA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhcnRbMF07IGkrKykge1xuICAgICAgICBiZXppZXJbaV0gPSBzdGFydFsxXVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGVuZCA9IGNwc1tjcHMubGVuZ3RoIC0gMV1cbiAgICBpZiAoZW5kWzBdIDwgMjU1KSB7XG4gICAgICBmb3IgKGxldCBpID0gZW5kWzBdOyBpIDw9IDI1NTsgaSsrKSB7XG4gICAgICAgIGJlemllcltpXSA9IGVuZFsxXVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnByb2Nlc3MoJ2N1cnZlcycsIChyZ2JhKSA9PiB7XG4gICAgICAvLyBOb3cgdGhhdCB3ZSBoYXZlIHRoZSBiZXppZXIgY3VydmUsIHdlIGRvIGEgYmFzaWMgaGFzaG1hcCBsb29rdXBcbiAgICAgIC8vIHRvIGZpbmQgYW5kIHJlcGxhY2UgY29sb3IgdmFsdWVzLlxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFucy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZ2JhW2NoYW5zW2ldXSA9IGJlemllcltyZ2JhW2NoYW5zW2ldXV1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIEV4cG9zdXJlXG4gICogQWRqdXN0cyB0aGUgZXhwb3N1cmUgb2YgdGhlIGltYWdlIGJ5IHVzaW5nIHRoZSBjdXJ2ZXMgZnVuY3Rpb24uXG4gICogQXJndW1lbnRzOiBSYW5nZSBpcyAtMTAwIHRvIDEwMC4gVmFsdWVzIDwgMCB3aWxsIGRlY3JlYXNlIGV4cG9zdXJlIHdoaWxlIHZhbHVlcyA+IDAgd2lsbCBpbmNyZWFzZSBleHBvc3VyZS5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdleHBvc3VyZScsIGZ1bmN0aW9uIChhZGp1c3QpIHtcbiAgICBjb25zdCBwID0gTWF0aC5hYnMoYWRqdXN0KSAvIDEwMFxuXG4gICAgbGV0IGN0cmwxID0gWzAsIDI1NSAqIHBdXG4gICAgbGV0IGN0cmwyID0gWzI1NSAtICgyNTUgKiBwKSwgMjU1XVxuXG4gICAgaWYgKGFkanVzdCA8IDApIHtcbiAgICAgIGN0cmwxID0gY3RybDEucmV2ZXJzZSgpXG4gICAgICBjdHJsMiA9IGN0cmwyLnJldmVyc2UoKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jdXJ2ZXMoJ3JnYicsIFswLCAwXSwgY3RybDEsIGN0cmwyLCBbMjU1LCAyNTVdKVxuICB9KVxufVxuIiwiaW1wb3J0IENhbGN1bGF0ZSBmcm9tICcuLi9jb3JlL2NhbGN1bGF0ZSdcbmltcG9ydCB7IFV0aWwgfSBmcm9tICcuLi9jb3JlL3V0aWwnXG5pbXBvcnQgQ29udmVydCBmcm9tICcuLi9jb3JlL2NvbnZlcnQnXG5cbmNvbnN0IHZpZ25ldHRlRmlsdGVycyA9IHtcbiAgYnJpZ2h0bmVzcyAocmdiYSwgYW10LCBvcHRzKSB7XG4gICAgcmdiYS5yID0gcmdiYS5yIC0gKHJnYmEuciAqIGFtdCAqIG9wdHMuc3RyZW5ndGgpXG4gICAgcmdiYS5nID0gcmdiYS5nIC0gKHJnYmEuZyAqIGFtdCAqIG9wdHMuc3RyZW5ndGgpXG4gICAgcmdiYS5iID0gcmdiYS5iIC0gKHJnYmEuYiAqIGFtdCAqIG9wdHMuc3RyZW5ndGgpXG4gICAgcmV0dXJuIHJnYmFcbiAgfSxcbiAgZ2FtbWEgKHJnYmEsIGFtdCwgb3B0cykge1xuICAgIHJnYmEuciA9IE1hdGgucG93KHJnYmEuciAvIDI1NSwgTWF0aC5tYXgoMTAgKiBhbXQgKiBvcHRzLnN0cmVuZ3RoLCAxKSkgKiAyNTVcbiAgICByZ2JhLmcgPSBNYXRoLnBvdyhyZ2JhLmcgLyAyNTUsIE1hdGgubWF4KDEwICogYW10ICogb3B0cy5zdHJlbmd0aCwgMSkpICogMjU1XG4gICAgcmdiYS5iID0gTWF0aC5wb3cocmdiYS5iIC8gMjU1LCBNYXRoLm1heCgxMCAqIGFtdCAqIG9wdHMuc3RyZW5ndGgsIDEpKSAqIDI1NVxuICAgIHJldHVybiByZ2JhXG4gIH0sXG4gIGNvbG9yaXplIChyZ2JhLCBhbXQsIG9wdHMpIHtcbiAgICByZ2JhLnIgLT0gKHJnYmEuciAtIG9wdHMuY29sb3IucikgKiBhbXRcbiAgICByZ2JhLmcgLT0gKHJnYmEuZyAtIG9wdHMuY29sb3IuZykgKiBhbXRcbiAgICByZ2JhLmIgLT0gKHJnYmEuYiAtIG9wdHMuY29sb3IuYikgKiBhbXRcbiAgICByZXR1cm4gcmdiYVxuICB9XG59XG5cbi8qKlxuICpcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyp9IEZpbHRlclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWdpc3RlckNhbWVyYUZpbHRlciAoRmlsdGVyKSB7XG4gIEZpbHRlci5yZWdpc3RlcigndmlnbmV0dGUnLCBmdW5jdGlvbiAoc2l6ZSwgc3RyZW5ndGggPSA2MCkge1xuICAgIGxldCBiZXppZXIsIGNlbnRlciwgZW5kLCBzdGFydFxuXG4gICAgaWYgKHR5cGVvZiBzaXplID09PSAnc3RyaW5nJyAmJiBzaXplLnN1YnN0cigtMSkgPT09ICclJykge1xuICAgICAgaWYgKHRoaXMuZGltZW5zaW9ucy5oZWlnaHQgPiB0aGlzLmRpbWVuc2lvbnMud2lkdGgpIHtcbiAgICAgICAgc2l6ZSA9IHRoaXMuZGltZW5zaW9ucy53aWR0aCAqIChwYXJzZUludChzaXplLnN1YnN0cigwLCBzaXplLmxlbmd0aCAtIDEpLCAxMCkgLyAxMDApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaXplID0gdGhpcy5kaW1lbnNpb25zLmhlaWdodCAqIChwYXJzZUludChzaXplLnN1YnN0cigwLCBzaXplLmxlbmd0aCAtIDEpLCAxMCkgLyAxMDApXG4gICAgICB9XG4gICAgfVxuICAgIHN0cmVuZ3RoIC89IDEwMFxuICAgIGNlbnRlciA9IFt0aGlzLmRpbWVuc2lvbnMud2lkdGggLyAyLCB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0IC8gMl1cbiAgICBzdGFydCA9IE1hdGguc3FydChNYXRoLnBvdyhjZW50ZXJbMF0sIDIpICsgTWF0aC5wb3coY2VudGVyWzFdLCAyKSlcbiAgICBlbmQgPSBzdGFydCAtIHNpemVcbiAgICBiZXppZXIgPSBDYWxjdWxhdGUuYmV6aWVyKFswLCAxXSwgWzMwLCAzMF0sIFs3MCwgNjBdLCBbMTAwLCA4MF0pXG4gICAgdGhpcy5wcm9jZXNzKCd2aWduZXR0ZScsIGZ1bmN0aW9uIChyZ2JhKSB7XG4gICAgICB2YXIgZGlzdCwgZGl2LCBsb2NcbiAgICAgIGxvYyA9IHJnYmEubG9jYXRpb25YWSgpXG4gICAgICBkaXN0ID0gQ2FsY3VsYXRlLmRpc3RhbmNlKGxvYy54LCBsb2MueSwgY2VudGVyWzBdLCBjZW50ZXJbMV0pXG4gICAgICBpZiAoZGlzdCA+IGVuZCkge1xuICAgICAgICBkaXYgPSBNYXRoLm1heCgxLCAoYmV6aWVyW01hdGgucm91bmQoKChkaXN0IC0gZW5kKSAvIHNpemUpICogMTAwKV0gLyAxMCkgKiBzdHJlbmd0aClcbiAgICAgICAgcmdiYS5yID0gTWF0aC5wb3cocmdiYS5yIC8gMjU1LCBkaXYpICogMjU1XG4gICAgICAgIHJnYmEuZyA9IE1hdGgucG93KHJnYmEuZyAvIDI1NSwgZGl2KSAqIDI1NVxuICAgICAgICByZ2JhLmIgPSBNYXRoLnBvdyhyZ2JhLmIgLyAyNTUsIGRpdikgKiAyNTVcbiAgICAgIH1cbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ3JlY3Rhbmd1bGFyVmlnbmV0dGUnLCBmdW5jdGlvbiAob3B0cykge1xuICAgIGxldCBkZWZhdWx0cywgZGltLCBwZXJjZW50LCBzaXplLCBfaSwgX2xlbiwgX3JlZlxuICAgIGRlZmF1bHRzID0ge1xuICAgICAgc3RyZW5ndGg6IDUwLFxuICAgICAgY29ybmVyUmFkaXVzOiAwLFxuICAgICAgbWV0aG9kOiAnYnJpZ2h0bmVzcycsXG4gICAgICBjb2xvcjoge1xuICAgICAgICByOiAwLFxuICAgICAgICBnOiAwLFxuICAgICAgICBiOiAwXG4gICAgICB9XG4gICAgfVxuICAgIG9wdHMgPSBVdGlsLmV4dGVuZChkZWZhdWx0cywgb3B0cylcbiAgICBpZiAoIW9wdHMuc2l6ZSkge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzLnNpemUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwZXJjZW50ID0gcGFyc2VJbnQob3B0cy5zaXplLCAxMCkgLyAxMDBcbiAgICAgIG9wdHMuc2l6ZSA9IHtcbiAgICAgICAgd2lkdGg6IHRoaXMuZGltZW5zaW9ucy53aWR0aCAqIHBlcmNlbnQsXG4gICAgICAgIGhlaWdodDogdGhpcy5kaW1lbnNpb25zLmhlaWdodCAqIHBlcmNlbnRcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzLnNpemUgPT09ICdvYmplY3QnKSB7XG4gICAgICBfcmVmID0gWyd3aWR0aCcsICdoZWlnaHQnXVxuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIGRpbSA9IF9yZWZbX2ldXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cy5zaXplW2RpbV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgb3B0cy5zaXplW2RpbV0gPSB0aGlzLmRpbWVuc2lvbnNbZGltXSAqIChwYXJzZUludChvcHRzLnNpemVbZGltXSwgMTApIC8gMTAwKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcHRzLnNpemUgPT09ICdudW1iZXInKSB7XG4gICAgICBzaXplID0gb3B0cy5zaXplXG4gICAgICBvcHRzLnNpemUgPSB7XG4gICAgICAgIHdpZHRoOiBzaXplLFxuICAgICAgICBoZWlnaHQ6IHNpemVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRzLmNvcm5lclJhZGl1cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG9wdHMuY29ybmVyUmFkaXVzID0gKG9wdHMuc2l6ZS53aWR0aCAvIDIpICogKHBhcnNlSW50KG9wdHMuY29ybmVyUmFkaXVzLCAxMCkgLyAxMDApXG4gICAgfVxuICAgIG9wdHMuc3RyZW5ndGggLz0gMTAwXG4gICAgb3B0cy5zaXplLndpZHRoID0gTWF0aC5mbG9vcihvcHRzLnNpemUud2lkdGgpXG4gICAgb3B0cy5zaXplLmhlaWdodCA9IE1hdGguZmxvb3Iob3B0cy5zaXplLmhlaWdodClcbiAgICBvcHRzLmltYWdlID0ge1xuICAgICAgd2lkdGg6IHRoaXMuZGltZW5zaW9ucy53aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5kaW1lbnNpb25zLmhlaWdodFxuICAgIH1cbiAgICBpZiAob3B0cy5tZXRob2QgPT09ICdjb2xvcml6ZScgJiYgdHlwZW9mIG9wdHMuY29sb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICBvcHRzLmNvbG9yID0gQ29udmVydC5oZXhUb1JHQihvcHRzLmNvbG9yKVxuICAgIH1cbiAgICBvcHRzLmNvb3JkcyA9IHtcbiAgICAgIGxlZnQ6ICh0aGlzLmRpbWVuc2lvbnMud2lkdGggLSBvcHRzLnNpemUud2lkdGgpIC8gMixcbiAgICAgIHJpZ2h0OiB0aGlzLmRpbWVuc2lvbnMud2lkdGggLSBvcHRzLmNvb3Jkcy5sZWZ0LFxuICAgICAgYm90dG9tOiAodGhpcy5kaW1lbnNpb25zLmhlaWdodCAtIG9wdHMuc2l6ZS5oZWlnaHQpIC8gMixcbiAgICAgIHRvcDogdGhpcy5kaW1lbnNpb25zLmhlaWdodCAtIG9wdHMuY29vcmRzLmJvdHRvbVxuICAgIH1cbiAgICBvcHRzLmNvcm5lcnMgPSBbXG4gICAgICB7XG4gICAgICAgIHg6IG9wdHMuY29vcmRzLmxlZnQgKyBvcHRzLmNvcm5lclJhZGl1cyxcbiAgICAgICAgeTogb3B0cy5jb29yZHMudG9wIC0gb3B0cy5jb3JuZXJSYWRpdXNcbiAgICAgIH0sIHtcbiAgICAgICAgeDogb3B0cy5jb29yZHMucmlnaHQgLSBvcHRzLmNvcm5lclJhZGl1cyxcbiAgICAgICAgeTogb3B0cy5jb29yZHMudG9wIC0gb3B0cy5jb3JuZXJSYWRpdXNcbiAgICAgIH0sIHtcbiAgICAgICAgeDogb3B0cy5jb29yZHMucmlnaHQgLSBvcHRzLmNvcm5lclJhZGl1cyxcbiAgICAgICAgeTogb3B0cy5jb29yZHMuYm90dG9tICsgb3B0cy5jb3JuZXJSYWRpdXNcbiAgICAgIH0sIHtcbiAgICAgICAgeDogb3B0cy5jb29yZHMubGVmdCArIG9wdHMuY29ybmVyUmFkaXVzLFxuICAgICAgICB5OiBvcHRzLmNvb3Jkcy5ib3R0b20gKyBvcHRzLmNvcm5lclJhZGl1c1xuICAgICAgfVxuICAgIF1cbiAgICBvcHRzLm1heERpc3QgPSBDYWxjdWxhdGUuZGlzdGFuY2UoMCwgMCwgb3B0cy5jb3JuZXJzWzNdLngsIG9wdHMuY29ybmVyc1szXS55KSAtIG9wdHMuY29ybmVyUmFkaXVzXG4gICAgdGhpcy5wcm9jZXNzKCdyZWN0YW5ndWxhclZpZ25ldHRlJywgZnVuY3Rpb24gKHJnYmEpIHtcbiAgICAgIHZhciBhbXQsIGxvYywgcmFkaWFsRGlzdFxuICAgICAgbG9jID0gcmdiYS5sb2NhdGlvblhZKClcbiAgICAgIGlmICgobG9jLnggPiBvcHRzLmNvcm5lcnNbMF0ueCAmJiBsb2MueCA8IG9wdHMuY29ybmVyc1sxXS54KSAmJiAobG9jLnkgPiBvcHRzLmNvb3Jkcy5ib3R0b20gJiYgbG9jLnkgPCBvcHRzLmNvb3Jkcy50b3ApKSB7XG4gICAgICAgIHJldHVybiByZ2JhXG4gICAgICB9XG4gICAgICBpZiAoKGxvYy54ID4gb3B0cy5jb29yZHMubGVmdCAmJiBsb2MueCA8IG9wdHMuY29vcmRzLnJpZ2h0KSAmJiAobG9jLnkgPiBvcHRzLmNvcm5lcnNbM10ueSAmJiBsb2MueSA8IG9wdHMuY29ybmVyc1syXS55KSkge1xuICAgICAgICByZXR1cm4gcmdiYVxuICAgICAgfVxuICAgICAgaWYgKGxvYy54ID4gb3B0cy5jb3JuZXJzWzBdLnggJiYgbG9jLnggPCBvcHRzLmNvcm5lcnNbMV0ueCAmJiBsb2MueSA+IG9wdHMuY29vcmRzLnRvcCkge1xuICAgICAgICBhbXQgPSAobG9jLnkgLSBvcHRzLmNvb3Jkcy50b3ApIC8gb3B0cy5tYXhEaXN0XG4gICAgICB9IGVsc2UgaWYgKGxvYy55ID4gb3B0cy5jb3JuZXJzWzJdLnkgJiYgbG9jLnkgPCBvcHRzLmNvcm5lcnNbMV0ueSAmJiBsb2MueCA+IG9wdHMuY29vcmRzLnJpZ2h0KSB7XG4gICAgICAgIGFtdCA9IChsb2MueCAtIG9wdHMuY29vcmRzLnJpZ2h0KSAvIG9wdHMubWF4RGlzdFxuICAgICAgfSBlbHNlIGlmIChsb2MueCA+IG9wdHMuY29ybmVyc1swXS54ICYmIGxvYy54IDwgb3B0cy5jb3JuZXJzWzFdLnggJiYgbG9jLnkgPCBvcHRzLmNvb3Jkcy5ib3R0b20pIHtcbiAgICAgICAgYW10ID0gKG9wdHMuY29vcmRzLmJvdHRvbSAtIGxvYy55KSAvIG9wdHMubWF4RGlzdFxuICAgICAgfSBlbHNlIGlmIChsb2MueSA+IG9wdHMuY29ybmVyc1syXS55ICYmIGxvYy55IDwgb3B0cy5jb3JuZXJzWzFdLnkgJiYgbG9jLnggPCBvcHRzLmNvb3Jkcy5sZWZ0KSB7XG4gICAgICAgIGFtdCA9IChvcHRzLmNvb3Jkcy5sZWZ0IC0gbG9jLngpIC8gb3B0cy5tYXhEaXN0XG4gICAgICB9IGVsc2UgaWYgKGxvYy54IDw9IG9wdHMuY29ybmVyc1swXS54ICYmIGxvYy55ID49IG9wdHMuY29ybmVyc1swXS55KSB7XG4gICAgICAgIHJhZGlhbERpc3QgPSBDYWxjdWxhdGUuZGlzdGFuY2UobG9jLngsIGxvYy55LCBvcHRzLmNvcm5lcnNbMF0ueCwgb3B0cy5jb3JuZXJzWzBdLnkpXG4gICAgICAgIGFtdCA9IChyYWRpYWxEaXN0IC0gb3B0cy5jb3JuZXJSYWRpdXMpIC8gb3B0cy5tYXhEaXN0XG4gICAgICB9IGVsc2UgaWYgKGxvYy54ID49IG9wdHMuY29ybmVyc1sxXS54ICYmIGxvYy55ID49IG9wdHMuY29ybmVyc1sxXS55KSB7XG4gICAgICAgIHJhZGlhbERpc3QgPSBDYWxjdWxhdGUuZGlzdGFuY2UobG9jLngsIGxvYy55LCBvcHRzLmNvcm5lcnNbMV0ueCwgb3B0cy5jb3JuZXJzWzFdLnkpXG4gICAgICAgIGFtdCA9IChyYWRpYWxEaXN0IC0gb3B0cy5jb3JuZXJSYWRpdXMpIC8gb3B0cy5tYXhEaXN0XG4gICAgICB9IGVsc2UgaWYgKGxvYy54ID49IG9wdHMuY29ybmVyc1syXS54ICYmIGxvYy55IDw9IG9wdHMuY29yZXJzWzJdLnkpIHtcbiAgICAgICAgcmFkaWFsRGlzdCA9IENhbGN1bGF0ZS5kaXN0YW5jZShsb2MueCwgbG9jLnksIG9wdHMuY29ybmVyc1syXS54LCBvcHRzLmNvcm5lcnNbMl0ueSlcbiAgICAgICAgYW10ID0gKHJhZGlhbERpc3QgLSBvcHRzLmNvcm5lclJhZGl1cykgLyBvcHRzLm1heERpc3RcbiAgICAgIH0gZWxzZSBpZiAobG9jLnggPD0gb3B0cy5jb3JuZXJzWzNdLnggJiYgbG9jLnkgPD0gb3B0cy5jb3JuZXJzWzNdLnkpIHtcbiAgICAgICAgcmFkaWFsRGlzdCA9IENhbGN1bGF0ZS5kaXN0YW5jZShsb2MueCwgbG9jLnksIG9wdHMuY29ybmVyc1szXS54LCBvcHRzLmNvcm5lcnNbM10ueSlcbiAgICAgICAgYW10ID0gKHJhZGlhbERpc3QgLSBvcHRzLmNvcm5lclJhZGl1cykgLyBvcHRzLm1heERpc3RcbiAgICAgIH1cbiAgICAgIGlmIChhbXQgPCAwKSB7XG4gICAgICAgIHJldHVybiByZ2JhXG4gICAgICB9XG4gICAgICByZXR1cm4gdmlnbmV0dGVGaWx0ZXJzW29wdHMubWV0aG9kXShyZ2JhLCBhbXQsIG9wdHMpXG4gICAgfSlcbiAgfSlcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZ2lzdGVyQmx1ckZpbHRlciAoRmlsdGVyKSB7XG4gIEZpbHRlci5yZWdpc3RlcignYm94Qmx1cicsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnByb2Nlc3NLZXJuZWwoJ0JveCBCbHVyJywgWzEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdKVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcignaGVhdnlSYWRpYWxCbHVyJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucHJvY2Vzc0tlcm5lbCgnSGVhdnkgUmFkaWFsIEJsdXInLCBbMCwgMCwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMSwgMSwgMCwgMCwgMCwgMSwgMCwgMF0pXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdnYXVzc2lhbkJsdXInLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5wcm9jZXNzS2VybmVsKCdHYXVzc2lhbiBCbHVyJywgWzEsIDQsIDYsIDQsIDEsIDQsIDE2LCAyNCwgMTYsIDQsIDYsIDI0LCAzNiwgMjQsIDYsIDQsIDE2LCAyNCwgMTYsIDQsIDEsIDQsIDYsIDQsIDFdKVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcignbW90aW9uQmx1cicsIGZ1bmN0aW9uIChkZWdyZWVzKSB7XG4gICAgbGV0IGtlcm5lbFxuICAgIGlmIChkZWdyZWVzID09PSAwIHx8IGRlZ3JlZXMgPT09IDE4MCkge1xuICAgICAga2VybmVsID0gWzAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDBdXG4gICAgfSBlbHNlIGlmICgoZGVncmVlcyA+IDAgJiYgZGVncmVlcyA8IDkwKSB8fCAoZGVncmVlcyA+IDE4MCAmJiBkZWdyZWVzIDwgMjcwKSkge1xuICAgICAga2VybmVsID0gWzAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDBdXG4gICAgfSBlbHNlIGlmIChkZWdyZWVzID09PSA5MCB8fCBkZWdyZWVzID09PSAyNzApIHtcbiAgICAgIGtlcm5lbCA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXVxuICAgIH0gZWxzZSB7XG4gICAgICBrZXJuZWwgPSBbMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMV1cbiAgICB9XG4gICAgdGhpcy5wcm9jZXNzS2VybmVsKCdNb3Rpb24gQmx1cicsIGtlcm5lbClcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ3NoYXJwZW4nLCBmdW5jdGlvbiAoYW10ID0gMTAwKSB7XG4gICAgYW10IC89IDEwMFxuICAgIHRoaXMucHJvY2Vzc0tlcm5lbCgnU2hhcnBlbicsIFswLCAtYW10LCAwLCAtYW10LCA0ICogYW10ICsgMSwgLWFtdCwgMCwgLWFtdCwgMF0pXG4gIH0pXG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWdpc3RlclBvc3Rlcml6ZUZpbHRlciAoRmlsdGVyKSB7XG4gIEZpbHRlci5yZWdpc3RlcigncG9zdGVyaXplJywgZnVuY3Rpb24gKGFkanVzdCkge1xuICAgIHZhciBudW1PZkFyZWFzLCBudW1PZlZhbHVlc1xuICAgIG51bU9mQXJlYXMgPSAyNTYgLyBhZGp1c3RcbiAgICBudW1PZlZhbHVlcyA9IDI1NSAvIChhZGp1c3QgLSAxKVxuICAgIHRoaXMucHJvY2VzcygncG9zdGVyaXplJywgZnVuY3Rpb24gKHJnYmEpIHtcbiAgICAgIHJnYmEuciA9IE1hdGguZmxvb3IoTWF0aC5mbG9vcihyZ2JhLnIgLyBudW1PZkFyZWFzKSAqIG51bU9mVmFsdWVzKVxuICAgICAgcmdiYS5nID0gTWF0aC5mbG9vcihNYXRoLmZsb29yKHJnYmEuZyAvIG51bU9mQXJlYXMpICogbnVtT2ZWYWx1ZXMpXG4gICAgICByZ2JhLmIgPSBNYXRoLmZsb29yKE1hdGguZmxvb3IocmdiYS5iIC8gbnVtT2ZBcmVhcykgKiBudW1PZlZhbHVlcylcbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcbn1cbiIsIi8qKlxuICogc29tZSBwcmVzZXQgZmlsdGVyc1xuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gRmlsdGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZ2lzdGVyUHJlc2V0RmlsdGVyIChGaWx0ZXIpIHtcbiAgRmlsdGVyLnJlZ2lzdGVyKCd2aW50YWdlJywgZnVuY3Rpb24gKHZpZ25ldHRlID0gdHJ1ZSkge1xuICAgIHRoaXMuZ3JleXNjYWxlKClcbiAgICB0aGlzLmNvbnRyYXN0KDUpXG4gICAgdGhpcy5ub2lzZSgzKVxuICAgIHRoaXMuc2VwaWEoMTAwKVxuICAgIHRoaXMuY2hhbm5lbHMoe3JlZDogOCwgYmx1ZTogMiwgZ3JlZW46IDR9KVxuICAgIHRoaXMuZ2FtbWEoMC44NylcblxuICAgIGlmICh2aWduZXR0ZSkge1xuICAgICAgdGhpcy52aWduZXR0ZSgnNDAlJywgMzApXG4gICAgfVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcignbG9tbycsIGZ1bmN0aW9uICh2aWduZXR0ZSA9IHRydWUpIHtcbiAgICB0aGlzLmJyaWdodG5lc3MoMTUpXG4gICAgdGhpcy5leHBvc3VyZSgxNSlcbiAgICB0aGlzLmN1cnZlcygncmdiJywgWzAsIDBdLCBbMjAwLCAwXSwgWzE1NSwgMjU1XSwgWzI1NSwgMjU1XSlcbiAgICB0aGlzLnNhdHVyYXRpb24oLTIwKVxuICAgIHRoaXMuZ2FtbWEoMS44KVxuICAgIGlmICh2aWduZXR0ZSkge1xuICAgICAgdGhpcy52aWduZXR0ZSgnNTAlJywgNjApXG4gICAgfVxuICAgIHRoaXMuYnJpZ2h0bmVzcyg1KVxuICB9KVxuXG4gIC8vIEZJWE1FOnNoYXJwZW5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdjbGFyaXR5JywgZnVuY3Rpb24gKGdyZXkgPSBmYWxzZSkge1xuICAgIHRoaXMudmlicmFuY2UoMjApXG4gICAgdGhpcy5jdXJ2ZXMoJ3JnYicsIFs1LCAwXSwgWzEzMCwgMTUwXSwgWzE5MCwgMjIwXSwgWzI1MCwgMjU1XSlcbiAgICB0aGlzLnNoYXJwZW4oMTUpXG4gICAgdGhpcy52aWduZXR0ZSgnNDUlJywgMjApXG4gICAgaWYgKGdyZXkpIHtcbiAgICAgIHRoaXMuZ3JleXNjYWxlKClcbiAgICAgIHRoaXMuY29udHJhc3QoNClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ3NpbkNpdHknLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jb250cmFzdCgxMDApXG4gICAgdGhpcy5icmlnaHRuZXNzKDE1KVxuICAgIHRoaXMuZXhwb3N1cmUoMTApXG4gICAgdGhpcy5wb3N0ZXJpemUoODApXG4gICAgdGhpcy5jbGlwKDMwKVxuICAgIHRoaXMuZ3JleXNjYWxlKClcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ3N1bnJpc2UnLCBmdW5jdGlvbiAodmlnbmV0dGUgPSB0cnVlKSB7XG4gICAgdGhpcy5leHBvc3VyZSgzLjUpXG4gICAgdGhpcy5zYXR1cmF0aW9uKC01KVxuICAgIHRoaXMudmlicmFuY2UoNTApXG4gICAgdGhpcy5zZXBpYSg2MClcbiAgICB0aGlzLmNvbG9yaXplKCcjZTg3YjIyJywgMTApXG4gICAgdGhpcy5jaGFubmVscyh7XG4gICAgICByZWQ6IDgsXG4gICAgICBibHVlOiA4XG4gICAgfSlcbiAgICB0aGlzLmNvbnRyYXN0KDUpXG4gICAgdGhpcy5nYW1tYSgxLjIpXG4gICAgaWYgKHZpZ25ldHRlKSB7XG4gICAgICB0aGlzLnZpZ25ldHRlKCc1NSUnLCAyNSlcbiAgICB9XG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdjcm9zc1Byb2Nlc3MnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5leHBvc3VyZSg1KVxuICAgIHRoaXMuY29sb3JpemUoJyNlODdiMjInLCA0KVxuICAgIHRoaXMuc2VwaWEoMjApXG4gICAgdGhpcy5jaGFubmVscyh7XG4gICAgICBibHVlOiA4LFxuICAgICAgcmVkOiAzXG4gICAgfSlcbiAgICB0aGlzLmN1cnZlcygnYicsIFswLCAwXSwgWzEwMCwgMTUwXSwgWzE4MCwgMTgwXSwgWzI1NSwgMjU1XSlcbiAgICB0aGlzLmNvbnRyYXN0KDE1KVxuICAgIHRoaXMudmlicmFuY2UoNzUpXG4gICAgdGhpcy5nYW1tYSgxLjYpXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdvcmFuZ2VQZWVsJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY3VydmVzKCdyZ2InLCBbMCwgMF0sIFsxMDAsIDUwXSwgWzE0MCwgMjAwXSwgWzI1NSwgMjU1XSlcbiAgICB0aGlzLnZpYnJhbmNlKC0zMClcbiAgICB0aGlzLnNhdHVyYXRpb24oLTMwKVxuICAgIHRoaXMuY29sb3JpemUoJyNmZjkwMDAnLCAzMClcbiAgICB0aGlzLmNvbnRyYXN0KC01KVxuICAgIHRoaXMuZ2FtbWEoMS40KVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcignbG92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmJyaWdodG5lc3MoNSlcbiAgICB0aGlzLmV4cG9zdXJlKDgpXG4gICAgdGhpcy5jb250cmFzdCg0KVxuICAgIHRoaXMuY29sb3JpemUoJyNjNDIwMDcnLCAzMClcbiAgICB0aGlzLnZpYnJhbmNlKDUwKVxuICAgIHRoaXMuZ2FtbWEoMS4zKVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcignZ3J1bmd5JywgZnVuY3Rpb24gKHZpZ25ldHRlID0gdHJ1ZSkge1xuICAgIHRoaXMuZ2FtbWEoMS41KVxuICAgIHRoaXMuY2xpcCgyNSlcbiAgICB0aGlzLnNhdHVyYXRpb24oLTYwKVxuICAgIHRoaXMuY29udHJhc3QoNSlcbiAgICB0aGlzLm5vaXNlKDUpXG4gICAgaWYgKHZpZ25ldHRlKSB7XG4gICAgICB0aGlzLnZpZ25ldHRlKCc1MCUnLCAzMClcbiAgICB9XG4gIH0pXG4gIC8vIEZJWE1FOnNoYXJwZW5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdqYXJxdWVzJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2F0dXJhdGlvbigtMzUpXG4gICAgdGhpcy5jdXJ2ZXMoJ2InLCBbMjAsIDBdLCBbOTAsIDEyMF0sIFsxODYsIDE0NF0sIFsyNTUsIDIzMF0pXG4gICAgdGhpcy5jdXJ2ZXMoJ3InLCBbMCwgMF0sIFsxNDQsIDkwXSwgWzEzOCwgMTIwXSwgWzI1NSwgMjU1XSlcbiAgICB0aGlzLmN1cnZlcygnZycsIFsxMCwgMF0sIFsxMTUsIDEwNV0sIFsxNDgsIDEwMF0sIFsyNTUsIDI0OF0pXG4gICAgdGhpcy5jdXJ2ZXMoJ3JnYicsIFswLCAwXSwgWzEyMCwgMTAwXSwgWzEyOCwgMTQwXSwgWzI1NSwgMjU1XSlcbiAgICB0aGlzLnNoYXJwZW4oMjApXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdwaW5ob2xlJywgZnVuY3Rpb24gKHZpZ25ldHRlID0gdHJ1ZSkge1xuICAgIHRoaXMuZ3JleXNjYWxlKClcbiAgICB0aGlzLnNlcGlhKDEwKVxuICAgIHRoaXMuZXhwb3N1cmUoMTApXG4gICAgdGhpcy5jb250cmFzdCgxNSlcbiAgICBpZiAodmlnbmV0dGUpIHtcbiAgICAgIHRoaXMudmlnbmV0dGUoJzYwJScsIDM1KVxuICAgIH1cbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ29sZEJvb3QnLCBmdW5jdGlvbiAodmlnbmV0dGUgPSB0cnVlKSB7XG4gICAgdGhpcy5zYXR1cmF0aW9uKC0yMClcbiAgICB0aGlzLnZpYnJhbmNlKC01MClcbiAgICB0aGlzLmdhbW1hKDEuMSlcbiAgICB0aGlzLnNlcGlhKDMwKVxuICAgIHRoaXMuY2hhbm5lbHMoe1xuICAgICAgcmVkOiAtMTAsXG4gICAgICBibHVlOiA1XG4gICAgfSlcbiAgICB0aGlzLmN1cnZlcygncmdiJywgWzAsIDBdLCBbODAsIDUwXSwgWzEyOCwgMjMwXSwgWzI1NSwgMjU1XSlcbiAgICBpZiAodmlnbmV0dGUpIHtcbiAgICAgIHRoaXMudmlnbmV0dGUoJzYwJScsIDMwKVxuICAgIH1cbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ2dsb3dpbmdTdW4nLCBmdW5jdGlvbiAodmlnbmV0dGUgPSB0cnVlKSB7XG4gICAgdGhpcy5icmlnaHRuZXNzKDEwKVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ211bHRpcGx5JylcbiAgICAgIHRoaXMub3BhY2l0eSg4MClcbiAgICAgIHRoaXMuY29weVBhcmVudCgpXG4gICAgICB0aGlzLmZpbHRlci5nYW1tYSgwLjgpXG4gICAgICB0aGlzLmZpbHRlci5jb250cmFzdCg1MClcbiAgICAgIHRoaXMuZmlsdGVyLmV4cG9zdXJlKDEwKVxuICAgIH0pXG4gICAgdGhpcy5uZXdMYXllcihmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNldEJsZW5kaW5nTW9kZSgnc29mdExpZ2h0JylcbiAgICAgIHRoaXMub3BhY2l0eSg4MClcbiAgICAgIHRoaXMuZmlsbENvbG9yKCcjZjQ5NjAwJylcbiAgICB9KVxuICAgIHRoaXMuZXhwb3N1cmUoMjApXG4gICAgdGhpcy5nYW1tYSgwLjgpXG4gICAgaWYgKHZpZ25ldHRlKSB7XG4gICAgICB0aGlzLnZpZ25ldHRlKCc0NSUnLCAyMClcbiAgICB9XG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdoYXp5RGF5cycsIGZ1bmN0aW9uICh2aWduZXR0ZSA9IHRydWUpIHtcbiAgICB0aGlzLmdhbW1hKDEuMilcbiAgICB0aGlzLm5ld0xheWVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0QmxlbmRpbmdNb2RlKCdvdmVybGF5JylcbiAgICAgIHRoaXMub3BhY2l0eSg2MClcbiAgICAgIHRoaXMuY29weVBhcmVudCgpXG4gICAgICB0aGlzLmZpbHRlci5jaGFubmVscyh7XG4gICAgICAgIHJlZDogNVxuICAgICAgfSlcbiAgICAgIHRoaXMuZmlsdGVyLnN0YWNrQmx1cigxNSlcbiAgICB9KVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ2FkZGl0aW9uJylcbiAgICAgIHRoaXMub3BhY2l0eSg0MClcbiAgICAgIHRoaXMuZmlsbENvbG9yKCcjNjg5OWJhJylcbiAgICB9KVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ211bHRpcGx5JylcbiAgICAgIHRoaXMub3BhY2l0eSgzNSlcbiAgICAgIHRoaXMuY29weVBhcmVudCgpXG4gICAgICB0aGlzLmZpbHRlci5icmlnaHRuZXNzKDQwKVxuICAgICAgdGhpcy5maWx0ZXIudmlicmFuY2UoNDApXG4gICAgICB0aGlzLmZpbHRlci5leHBvc3VyZSgzMClcbiAgICAgIHRoaXMuZmlsdGVyLmNvbnRyYXN0KDE1KVxuICAgICAgdGhpcy5maWx0ZXIuY3VydmVzKCdyJywgWzAsIDQwXSwgWzEyOCwgMTI4XSwgWzEyOCwgMTI4XSwgWzI1NSwgMjE1XSlcbiAgICAgIHRoaXMuZmlsdGVyLmN1cnZlcygnZycsIFswLCA0MF0sIFsxMjgsIDEyOF0sIFsxMjgsIDEyOF0sIFsyNTUsIDIxNV0pXG4gICAgICB0aGlzLmZpbHRlci5jdXJ2ZXMoJ2InLCBbMCwgNDBdLCBbMTI4LCAxMjhdLCBbMTI4LCAxMjhdLCBbMjU1LCAyMTVdKVxuICAgICAgdGhpcy5maWx0ZXIuc3RhY2tCbHVyKDUpXG4gICAgfSlcbiAgICB0aGlzLmN1cnZlcygncicsIFsyMCwgMF0sIFsxMjgsIDE1OF0sIFsxMjgsIDEyOF0sIFsyMzUsIDI1NV0pXG4gICAgdGhpcy5jdXJ2ZXMoJ2cnLCBbMjAsIDBdLCBbMTI4LCAxMjhdLCBbMTI4LCAxMjhdLCBbMjM1LCAyNTVdKVxuICAgIHRoaXMuY3VydmVzKCdiJywgWzIwLCAwXSwgWzEyOCwgMTA4XSwgWzEyOCwgMTI4XSwgWzIzNSwgMjU1XSlcbiAgICBpZiAodmlnbmV0dGUpIHtcbiAgICAgIHRoaXMudmlnbmV0dGUoJzQ1JScsIDIwKVxuICAgIH1cbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ2hlck1hamVzdHknLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5icmlnaHRuZXNzKDQwKVxuICAgIHRoaXMuY29sb3JpemUoJyNlYTFjNWQnLCAxMClcbiAgICB0aGlzLmN1cnZlcygnYicsIFswLCAxMF0sIFsxMjgsIDE4MF0sIFsxOTAsIDE5MF0sIFsyNTUsIDI1NV0pXG4gICAgdGhpcy5uZXdMYXllcihmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuc2V0QmxlbmRpbmdNb2RlKCdvdmVybGF5JylcbiAgICAgIHRoaXMub3BhY2l0eSg1MClcbiAgICAgIHRoaXMuY29weVBhcmVudCgpXG4gICAgICB0aGlzLmZpbHRlci5nYW1tYSgwLjcpXG4gICAgICB0aGlzLm5ld0xheWVyKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldEJsZW5kaW5nTW9kZSgnbm9ybWFsJylcbiAgICAgICAgdGhpcy5vcGFjaXR5KDYwKVxuICAgICAgICB0aGlzLmZpbGxDb2xvcignI2VhMWM1ZCcpXG4gICAgICB9KVxuICAgIH0pXG4gICAgdGhpcy5uZXdMYXllcihmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuc2V0QmxlbmRpbmdNb2RlKCdtdWx0aXBseScpXG4gICAgICB0aGlzLm9wYWNpdHkoNjApXG4gICAgICB0aGlzLmNvcHlQYXJlbnQoKVxuICAgICAgdGhpcy5maWx0ZXIuc2F0dXJhdGlvbig1MClcbiAgICAgIHRoaXMuZmlsdGVyLmh1ZSg5MClcbiAgICAgIHRoaXMuZmlsdGVyLmNvbnRyYXN0KDEwKVxuICAgIH0pXG4gICAgdGhpcy5nYW1tYSgxLjQpXG4gICAgdGhpcy52aWJyYW5jZSgtMzApXG4gICAgdGhpcy5uZXdMYXllcihmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMub3BhY2l0eSgxMClcbiAgICAgIHRoaXMuZmlsbENvbG9yKCcjZTVmMGZmJylcbiAgICB9KVxuICAgIHJldHVybiB0aGlzXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdub3N0YWxnaWEnLCBmdW5jdGlvbiAodmlnbmV0dGUgPSB0cnVlKSB7XG4gICAgdGhpcy5zYXR1cmF0aW9uKDIwKVxuICAgIHRoaXMuZ2FtbWEoMS40KVxuICAgIHRoaXMuZ3JleXNjYWxlKClcbiAgICB0aGlzLmNvbnRyYXN0KDUpXG4gICAgdGhpcy5zZXBpYSgxMDApXG4gICAgdGhpcy5jaGFubmVscyh7XG4gICAgICByZWQ6IDgsXG4gICAgICBibHVlOiAyLFxuICAgICAgZ3JlZW46IDRcbiAgICB9KVxuICAgIHRoaXMuZ2FtbWEoMC44KVxuICAgIHRoaXMuY29udHJhc3QoNSlcbiAgICB0aGlzLmV4cG9zdXJlKDEwKVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnNldEJsZW5kaW5nTW9kZSgnb3ZlcmxheScpXG4gICAgICB0aGlzLmNvcHlQYXJlbnQoKVxuICAgICAgdGhpcy5vcGFjaXR5KDU1KVxuICAgICAgdGhpcy5maWx0ZXIuc3RhY2tCbHVyKDEwKVxuICAgIH0pXG4gICAgaWYgKHZpZ25ldHRlKSB7XG4gICAgICB0aGlzLnZpZ25ldHRlKCc1MCUnLCAzMClcbiAgICB9XG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdoZW1pbmd3YXknLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5ncmV5c2NhbGUoKVxuICAgIHRoaXMuY29udHJhc3QoMTApXG4gICAgdGhpcy5nYW1tYSgwLjkpXG4gICAgdGhpcy5uZXdMYXllcihmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNldEJsZW5kaW5nTW9kZSgnbXVsdGlwbHknKVxuICAgICAgdGhpcy5vcGFjaXR5KDQwKVxuICAgICAgdGhpcy5jb3B5UGFyZW50KClcbiAgICAgIHRoaXMuZmlsdGVyLmV4cG9zdXJlKDE1KVxuICAgICAgdGhpcy5maWx0ZXIuY29udHJhc3QoMTUpXG4gICAgICB0aGlzLmZpbHRlci5jaGFubmVscyh7XG4gICAgICAgIGdyZWVuOiAxMCxcbiAgICAgICAgcmVkOiA1XG4gICAgICB9KVxuICAgIH0pXG4gICAgdGhpcy5zZXBpYSgzMClcbiAgICB0aGlzLmN1cnZlcygncmdiJywgWzAsIDEwXSwgWzEyMCwgOTBdLCBbMTgwLCAyMDBdLCBbMjM1LCAyNTVdKVxuICAgIHRoaXMuY2hhbm5lbHMoe1xuICAgICAgcmVkOiA1LFxuICAgICAgZ3JlZW46IC0yXG4gICAgfSlcbiAgICB0aGlzLmV4cG9zdXJlKDE1KVxuICB9KVxuXG4gIC8vIEZJWE1FOiBzaGFycGVuXG4gIEZpbHRlci5yZWdpc3RlcignY29uY2VudHJhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zaGFycGVuKDQwKVxuICAgIHRoaXMuc2F0dXJhdGlvbigtNTApXG4gICAgdGhpcy5jaGFubmVscyh7XG4gICAgICByZWQ6IDNcbiAgICB9KVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ211bHRpcGx5JylcbiAgICAgIHRoaXMub3BhY2l0eSg4MClcbiAgICAgIHRoaXMuY29weVBhcmVudCgpXG4gICAgICB0aGlzLmZpbHRlci5zaGFycGVuKDUpXG4gICAgICB0aGlzLmZpbHRlci5jb250cmFzdCg1MClcbiAgICAgIHRoaXMuZmlsdGVyLmV4cG9zdXJlKDEwKVxuICAgICAgdGhpcy5maWx0ZXIuY2hhbm5lbHMoe1xuICAgICAgICBibHVlOiA1XG4gICAgICB9KVxuICAgIH0pXG4gICAgdGhpcy5icmlnaHRuZXNzKDEwKVxuICB9KVxufVxuIiwiLypcblN0YWNrQmx1ciAtIGEgZmFzdCBhbG1vc3QgR2F1c3NpYW4gQmx1ciBGb3IgQ2FudmFzIHYwLjMxIG1vZGlmaWVkIGZvciBDYW1hbkpTXG5cblZlcnNpb246ICAgMC4zMVxuQXV0aG9yOiAgICBNYXJpbyBLbGluZ2VtYW5uXG5Db250YWN0OiAgIG1hcmlvQHF1YXNpbW9uZG8uY29tXG5XZWJzaXRlOiAgaHR0cDovL3d3dy5xdWFzaW1vbmRvLmNvbS9TdGFja0JsdXJGb3JDYW52YXNcblR3aXR0ZXI6ICBAcXVhc2ltb25kb1xuTW9kaWZpZWQgQnk6IFJ5YW4gTGVGZXZyZSAoQG1lbHRpbmdpY2UpXG5cbkluIGNhc2UgeW91IGZpbmQgdGhpcyBjbGFzcyB1c2VmdWwgLSBlc3BlY2lhbGx5IGluIGNvbW1lcmNpYWwgcHJvamVjdHMgLVxuSSBhbSBub3QgdG90YWxseSB1bmhhcHB5IGZvciBhIHNtYWxsIGRvbmF0aW9uIHRvIG15IFBheVBhbCBhY2NvdW50XG5tYXJpb0BxdWFzaW1vbmRvLmRlXG5cbk9yIHN1cHBvcnQgbWUgb24gZmxhdHRyOlxuaHR0cHM6Ly9mbGF0dHIuY29tL3RoaW5nLzcyNzkxL1N0YWNrQmx1ci1hLWZhc3QtYWxtb3N0LUdhdXNzaWFuLUJsdXItRWZmZWN0LWZvci1DYW52YXNKYXZhc2NyaXB0XG5cbkNvcHlyaWdodCAoYykgMjAxMCBNYXJpbyBLbGluZ2VtYW5uXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG5vYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0XG5yZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSxcbmNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGVcblNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nXG5jb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG5FWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVNcbk9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG5OT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVFxuSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksXG5XSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbkZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1Jcbk9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5sZXQgQmx1clN0YWNrLCBtdWxUYWJsZSwgc2hnVGFibGVcbm11bFRhYmxlID0gWzUxMiwgNTEyLCA0NTYsIDUxMiwgMzI4LCA0NTYsIDMzNSwgNTEyLCA0MDUsIDMyOCwgMjcxLCA0NTYsIDM4OCwgMzM1LCAyOTIsIDUxMiwgNDU0LCA0MDUsIDM2NCwgMzI4LCAyOTgsIDI3MSwgNDk2LCA0NTYsIDQyMCwgMzg4LCAzNjAsIDMzNSwgMzEyLCAyOTIsIDI3MywgNTEyLCA0ODIsIDQ1NCwgNDI4LCA0MDUsIDM4MywgMzY0LCAzNDUsIDMyOCwgMzEyLCAyOTgsIDI4NCwgMjcxLCAyNTksIDQ5NiwgNDc1LCA0NTYsIDQzNywgNDIwLCA0MDQsIDM4OCwgMzc0LCAzNjAsIDM0NywgMzM1LCAzMjMsIDMxMiwgMzAyLCAyOTIsIDI4MiwgMjczLCAyNjUsIDUxMiwgNDk3LCA0ODIsIDQ2OCwgNDU0LCA0NDEsIDQyOCwgNDE3LCA0MDUsIDM5NCwgMzgzLCAzNzMsIDM2NCwgMzU0LCAzNDUsIDMzNywgMzI4LCAzMjAsIDMxMiwgMzA1LCAyOTgsIDI5MSwgMjg0LCAyNzgsIDI3MSwgMjY1LCAyNTksIDUwNywgNDk2LCA0ODUsIDQ3NSwgNDY1LCA0NTYsIDQ0NiwgNDM3LCA0MjgsIDQyMCwgNDEyLCA0MDQsIDM5NiwgMzg4LCAzODEsIDM3NCwgMzY3LCAzNjAsIDM1NCwgMzQ3LCAzNDEsIDMzNSwgMzI5LCAzMjMsIDMxOCwgMzEyLCAzMDcsIDMwMiwgMjk3LCAyOTIsIDI4NywgMjgyLCAyNzgsIDI3MywgMjY5LCAyNjUsIDI2MSwgNTEyLCA1MDUsIDQ5NywgNDg5LCA0ODIsIDQ3NSwgNDY4LCA0NjEsIDQ1NCwgNDQ3LCA0NDEsIDQzNSwgNDI4LCA0MjIsIDQxNywgNDExLCA0MDUsIDM5OSwgMzk0LCAzODksIDM4MywgMzc4LCAzNzMsIDM2OCwgMzY0LCAzNTksIDM1NCwgMzUwLCAzNDUsIDM0MSwgMzM3LCAzMzIsIDMyOCwgMzI0LCAzMjAsIDMxNiwgMzEyLCAzMDksIDMwNSwgMzAxLCAyOTgsIDI5NCwgMjkxLCAyODcsIDI4NCwgMjgxLCAyNzgsIDI3NCwgMjcxLCAyNjgsIDI2NSwgMjYyLCAyNTksIDI1NywgNTA3LCA1MDEsIDQ5NiwgNDkxLCA0ODUsIDQ4MCwgNDc1LCA0NzAsIDQ2NSwgNDYwLCA0NTYsIDQ1MSwgNDQ2LCA0NDIsIDQzNywgNDMzLCA0MjgsIDQyNCwgNDIwLCA0MTYsIDQxMiwgNDA4LCA0MDQsIDQwMCwgMzk2LCAzOTIsIDM4OCwgMzg1LCAzODEsIDM3NywgMzc0LCAzNzAsIDM2NywgMzYzLCAzNjAsIDM1NywgMzU0LCAzNTAsIDM0NywgMzQ0LCAzNDEsIDMzOCwgMzM1LCAzMzIsIDMyOSwgMzI2LCAzMjMsIDMyMCwgMzE4LCAzMTUsIDMxMiwgMzEwLCAzMDcsIDMwNCwgMzAyLCAyOTksIDI5NywgMjk0LCAyOTIsIDI4OSwgMjg3LCAyODUsIDI4MiwgMjgwLCAyNzgsIDI3NSwgMjczLCAyNzEsIDI2OSwgMjY3LCAyNjUsIDI2MywgMjYxLCAyNTldXG5zaGdUYWJsZSA9IFs5LCAxMSwgMTIsIDEzLCAxMywgMTQsIDE0LCAxNSwgMTUsIDE1LCAxNSwgMTYsIDE2LCAxNiwgMTYsIDE3LCAxNywgMTcsIDE3LCAxNywgMTcsIDE3LCAxOCwgMTgsIDE4LCAxOCwgMTgsIDE4LCAxOCwgMTgsIDE4LCAxOSwgMTksIDE5LCAxOSwgMTksIDE5LCAxOSwgMTksIDE5LCAxOSwgMTksIDE5LCAxOSwgMTksIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjRdXG5CbHVyU3RhY2sgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuciA9IDBcbiAgdGhpcy5nID0gMFxuICB0aGlzLmIgPSAwXG4gIHRoaXMuYSA9IDBcbiAgdGhpcy5uZXh0ID0gbnVsbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJTdGFja0JsdXJQbHVnaW4gKFBsdWdpbikge1xuICBQbHVnaW4ucmVnaXN0ZXIoJ3N0YWNrQmx1cicsIGZ1bmN0aW9uKHJhZGl1cykge1xuICAgIGxldCBiSW5TdW0sIGJPdXRTdW0sIGJTdW0sIGRpdiwgZ0luU3VtLCBnT3V0U3VtLCBnU3VtLCBoZWlnaHQsIGhlaWdodE1pbnVzMSwgaSwgbXVsU3VtLCBwLCBwYiwgcGcsIHBpeGVscywgcHIsIHJJblN1bSwgck91dFN1bSwgclN1bSwgcmFkaXVzUGx1czEsIHJicywgc2hnU3VtLCBzdGFjaywgc3RhY2tFbmQsIHN0YWNrSW4sIHN0YWNrT3V0LCBzdGFja1N0YXJ0LCBzdW1GYWN0b3IsIHdpZHRoLCB3aWR0aE1pbnVzMSwgeCwgeSwgeWksIHlwLCB5dywgX2ksIF9qLCBfaywgX2wsIF9tLCBfbiwgX28sIF9wLCBfcVxuICAgIGlmIChpc05hTihyYWRpdXMpIHx8IHJhZGl1cyA8IDEpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICByYWRpdXMgfD0gMFxuICAgIHBpeGVscyA9IHRoaXMucGl4ZWxEYXRhXG4gICAgd2lkdGggPSB0aGlzLmRpbWVuc2lvbnMud2lkdGhcbiAgICBoZWlnaHQgPSB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0XG4gICAgZGl2ID0gcmFkaXVzICsgcmFkaXVzICsgMVxuICAgIHdpZHRoTWludXMxID0gd2lkdGggLSAxXG4gICAgaGVpZ2h0TWludXMxID0gaGVpZ2h0IC0gMVxuICAgIHJhZGl1c1BsdXMxID0gcmFkaXVzICsgMVxuICAgIHN1bUZhY3RvciA9IHJhZGl1c1BsdXMxICogKHJhZGl1c1BsdXMxICsgMSkgLyAyXG4gICAgc3RhY2tTdGFydCA9IG5ldyBCbHVyU3RhY2soKVxuICAgIHN0YWNrID0gc3RhY2tTdGFydFxuICAgIGZvciAoaSA9IF9pID0gMTsgZGl2ID49IDEgPyBfaSA8IGRpdiA6IF9pID4gZGl2OyBpID0gZGl2ID49IDEgPyArK19pIDogLS1faSkge1xuICAgICAgc3RhY2sgPSBzdGFjay5uZXh0ID0gbmV3IEJsdXJTdGFjaygpXG4gICAgICBpZiAoaSA9PT0gcmFkaXVzUGx1czEpIHtcbiAgICAgICAgc3RhY2tFbmQgPSBzdGFja1xuICAgICAgfVxuICAgIH1cbiAgICBzdGFjay5uZXh0ID0gc3RhY2tTdGFydFxuICAgIHN0YWNrSW4gPSBudWxsXG4gICAgc3RhY2tPdXQgPSBudWxsXG4gICAgeXcgPSB5aSA9IDBcbiAgICBtdWxTdW0gPSBtdWxUYWJsZVtyYWRpdXNdXG4gICAgc2hnU3VtID0gc2hnVGFibGVbcmFkaXVzXVxuICAgIGZvciAoeSA9IF9qID0gMDsgaGVpZ2h0ID49IDAgPyBfaiA8IGhlaWdodCA6IF9qID4gaGVpZ2h0OyB5ID0gaGVpZ2h0ID49IDAgPyArK19qIDogLS1faikge1xuICAgICAgckluU3VtID0gZ0luU3VtID0gYkluU3VtID0gclN1bSA9IGdTdW0gPSBiU3VtID0gMFxuICAgICAgck91dFN1bSA9IHJhZGl1c1BsdXMxICogKHByID0gcGl4ZWxzW3lpXSlcbiAgICAgIGdPdXRTdW0gPSByYWRpdXNQbHVzMSAqIChwZyA9IHBpeGVsc1t5aSArIDFdKVxuICAgICAgYk91dFN1bSA9IHJhZGl1c1BsdXMxICogKHBiID0gcGl4ZWxzW3lpICsgMl0pXG4gICAgICByU3VtICs9IHN1bUZhY3RvciAqIHByXG4gICAgICBnU3VtICs9IHN1bUZhY3RvciAqIHBnXG4gICAgICBiU3VtICs9IHN1bUZhY3RvciAqIHBiXG4gICAgICBzdGFjayA9IHN0YWNrU3RhcnRcbiAgICAgIGZvciAoaSA9IF9rID0gMDsgcmFkaXVzUGx1czEgPj0gMCA/IF9rIDwgcmFkaXVzUGx1czEgOiBfayA+IHJhZGl1c1BsdXMxOyBpID0gcmFkaXVzUGx1czEgPj0gMCA/ICsrX2sgOiAtLV9rKSB7XG4gICAgICAgIHN0YWNrLnIgPSBwclxuICAgICAgICBzdGFjay5nID0gcGdcbiAgICAgICAgc3RhY2suYiA9IHBiXG4gICAgICAgIHN0YWNrID0gc3RhY2submV4dFxuICAgICAgfVxuICAgICAgZm9yIChpID0gX2wgPSAxOyByYWRpdXNQbHVzMSA+PSAxID8gX2wgPCByYWRpdXNQbHVzMSA6IF9sID4gcmFkaXVzUGx1czE7IGkgPSByYWRpdXNQbHVzMSA+PSAxID8gKytfbCA6IC0tX2wpIHtcbiAgICAgICAgcCA9IHlpICsgKCh3aWR0aE1pbnVzMSA8IGkgPyB3aWR0aE1pbnVzMSA6IGkpIDw8IDIpXG4gICAgICAgIHJTdW0gKz0gKHN0YWNrLnIgPSAocHIgPSBwaXhlbHNbcF0pKSAqIChyYnMgPSByYWRpdXNQbHVzMSAtIGkpXG4gICAgICAgIGdTdW0gKz0gKHN0YWNrLmcgPSAocGcgPSBwaXhlbHNbcCArIDFdKSkgKiByYnNcbiAgICAgICAgYlN1bSArPSAoc3RhY2suYiA9IChwYiA9IHBpeGVsc1twICsgMl0pKSAqIHJic1xuICAgICAgICBySW5TdW0gKz0gcHJcbiAgICAgICAgZ0luU3VtICs9IHBnXG4gICAgICAgIGJJblN1bSArPSBwYlxuICAgICAgICBzdGFjayA9IHN0YWNrLm5leHRcbiAgICAgIH1cbiAgICAgIHN0YWNrSW4gPSBzdGFja1N0YXJ0XG4gICAgICBzdGFja091dCA9IHN0YWNrRW5kXG4gICAgICBmb3IgKHggPSBfbSA9IDA7IHdpZHRoID49IDAgPyBfbSA8IHdpZHRoIDogX20gPiB3aWR0aDsgeCA9IHdpZHRoID49IDAgPyArK19tIDogLS1fbSkge1xuICAgICAgICBwaXhlbHNbeWldID0gKHJTdW0gKiBtdWxTdW0pID4+IHNoZ1N1bVxuICAgICAgICBwaXhlbHNbeWkgKyAxXSA9IChnU3VtICogbXVsU3VtKSA+PiBzaGdTdW1cbiAgICAgICAgcGl4ZWxzW3lpICsgMl0gPSAoYlN1bSAqIG11bFN1bSkgPj4gc2hnU3VtXG4gICAgICAgIHJTdW0gLT0gck91dFN1bVxuICAgICAgICBnU3VtIC09IGdPdXRTdW1cbiAgICAgICAgYlN1bSAtPSBiT3V0U3VtXG4gICAgICAgIHJPdXRTdW0gLT0gc3RhY2tJbi5yXG4gICAgICAgIGdPdXRTdW0gLT0gc3RhY2tJbi5nXG4gICAgICAgIGJPdXRTdW0gLT0gc3RhY2tJbi5iXG4gICAgICAgIHAgPSAoeXcgKyAoKHAgPSB4ICsgcmFkaXVzICsgMSkgPCB3aWR0aE1pbnVzMSA/IHAgOiB3aWR0aE1pbnVzMSkpIDw8IDJcbiAgICAgICAgckluU3VtICs9IChzdGFja0luLnIgPSBwaXhlbHNbcF0pXG4gICAgICAgIGdJblN1bSArPSAoc3RhY2tJbi5nID0gcGl4ZWxzW3AgKyAxXSlcbiAgICAgICAgYkluU3VtICs9IChzdGFja0luLmIgPSBwaXhlbHNbcCArIDJdKVxuICAgICAgICByU3VtICs9IHJJblN1bVxuICAgICAgICBnU3VtICs9IGdJblN1bVxuICAgICAgICBiU3VtICs9IGJJblN1bVxuICAgICAgICBzdGFja0luID0gc3RhY2tJbi5uZXh0XG4gICAgICAgIHJPdXRTdW0gKz0gKHByID0gc3RhY2tPdXQucilcbiAgICAgICAgZ091dFN1bSArPSAocGcgPSBzdGFja091dC5nKVxuICAgICAgICBiT3V0U3VtICs9IChwYiA9IHN0YWNrT3V0LmIpXG4gICAgICAgIHJJblN1bSAtPSBwclxuICAgICAgICBnSW5TdW0gLT0gcGdcbiAgICAgICAgYkluU3VtIC09IHBiXG4gICAgICAgIHN0YWNrT3V0ID0gc3RhY2tPdXQubmV4dFxuICAgICAgICB5aSArPSA0XG4gICAgICB9XG4gICAgICB5dyArPSB3aWR0aFxuICAgIH1cbiAgICBmb3IgKHggPSBfbiA9IDA7IHdpZHRoID49IDAgPyBfbiA8IHdpZHRoIDogX24gPiB3aWR0aDsgeCA9IHdpZHRoID49IDAgPyArK19uIDogLS1fbikge1xuICAgICAgZ0luU3VtID0gYkluU3VtID0gckluU3VtID0gZ1N1bSA9IGJTdW0gPSByU3VtID0gMFxuICAgICAgeWkgPSB4IDw8IDJcbiAgICAgIHJPdXRTdW0gPSByYWRpdXNQbHVzMSAqIChwciA9IHBpeGVsc1t5aV0pXG4gICAgICBnT3V0U3VtID0gcmFkaXVzUGx1czEgKiAocGcgPSBwaXhlbHNbeWkgKyAxXSlcbiAgICAgIGJPdXRTdW0gPSByYWRpdXNQbHVzMSAqIChwYiA9IHBpeGVsc1t5aSArIDJdKVxuICAgICAgclN1bSArPSBzdW1GYWN0b3IgKiBwclxuICAgICAgZ1N1bSArPSBzdW1GYWN0b3IgKiBwZ1xuICAgICAgYlN1bSArPSBzdW1GYWN0b3IgKiBwYlxuICAgICAgc3RhY2sgPSBzdGFja1N0YXJ0XG4gICAgICBmb3IgKGkgPSBfbyA9IDA7IHJhZGl1c1BsdXMxID49IDAgPyBfbyA8IHJhZGl1c1BsdXMxIDogX28gPiByYWRpdXNQbHVzMTsgaSA9IHJhZGl1c1BsdXMxID49IDAgPyArK19vIDogLS1fbykge1xuICAgICAgICBzdGFjay5yID0gcHJcbiAgICAgICAgc3RhY2suZyA9IHBnXG4gICAgICAgIHN0YWNrLmIgPSBwYlxuICAgICAgICBzdGFjayA9IHN0YWNrLm5leHRcbiAgICAgIH1cbiAgICAgIHlwID0gd2lkdGhcbiAgICAgIGZvciAoaSA9IF9wID0gMTsgcmFkaXVzID49IDEgPyBfcCA8PSByYWRpdXMgOiBfcCA+PSByYWRpdXM7IGkgPSByYWRpdXMgPj0gMSA/ICsrX3AgOiAtLV9wKSB7XG4gICAgICAgIHlpID0gKHlwICsgeCkgPDwgMlxuICAgICAgICByU3VtICs9IChzdGFjay5yID0gKHByID0gcGl4ZWxzW3lpXSkpICogKHJicyA9IHJhZGl1c1BsdXMxIC0gaSlcbiAgICAgICAgZ1N1bSArPSAoc3RhY2suZyA9IChwZyA9IHBpeGVsc1t5aSArIDFdKSkgKiByYnNcbiAgICAgICAgYlN1bSArPSAoc3RhY2suYiA9IChwYiA9IHBpeGVsc1t5aSArIDJdKSkgKiByYnNcbiAgICAgICAgckluU3VtICs9IHByXG4gICAgICAgIGdJblN1bSArPSBwZ1xuICAgICAgICBiSW5TdW0gKz0gcGJcbiAgICAgICAgc3RhY2sgPSBzdGFjay5uZXh0XG4gICAgICAgIGlmIChpIDwgaGVpZ2h0TWludXMxKSB7XG4gICAgICAgICAgeXAgKz0gd2lkdGhcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgeWkgPSB4XG4gICAgICBzdGFja0luID0gc3RhY2tTdGFydFxuICAgICAgc3RhY2tPdXQgPSBzdGFja0VuZFxuICAgICAgZm9yICh5ID0gX3EgPSAwOyBoZWlnaHQgPj0gMCA/IF9xIDwgaGVpZ2h0IDogX3EgPiBoZWlnaHQ7IHkgPSBoZWlnaHQgPj0gMCA/ICsrX3EgOiAtLV9xKSB7XG4gICAgICAgIHAgPSB5aSA8PCAyXG4gICAgICAgIHBpeGVsc1twXSA9IChyU3VtICogbXVsU3VtKSA+PiBzaGdTdW1cbiAgICAgICAgcGl4ZWxzW3AgKyAxXSA9IChnU3VtICogbXVsU3VtKSA+PiBzaGdTdW1cbiAgICAgICAgcGl4ZWxzW3AgKyAyXSA9IChiU3VtICogbXVsU3VtKSA+PiBzaGdTdW1cbiAgICAgICAgclN1bSAtPSByT3V0U3VtXG4gICAgICAgIGdTdW0gLT0gZ091dFN1bVxuICAgICAgICBiU3VtIC09IGJPdXRTdW1cbiAgICAgICAgck91dFN1bSAtPSBzdGFja0luLnJcbiAgICAgICAgZ091dFN1bSAtPSBzdGFja0luLmdcbiAgICAgICAgYk91dFN1bSAtPSBzdGFja0luLmJcbiAgICAgICAgcCA9ICh4ICsgKCgocCA9IHkgKyByYWRpdXNQbHVzMSkgPCBoZWlnaHRNaW51czEgPyBwIDogaGVpZ2h0TWludXMxKSAqIHdpZHRoKSkgPDwgMlxuICAgICAgICByU3VtICs9IChySW5TdW0gKz0gKHN0YWNrSW4uciA9IHBpeGVsc1twXSkpXG4gICAgICAgIGdTdW0gKz0gKGdJblN1bSArPSAoc3RhY2tJbi5nID0gcGl4ZWxzW3AgKyAxXSkpXG4gICAgICAgIGJTdW0gKz0gKGJJblN1bSArPSAoc3RhY2tJbi5iID0gcGl4ZWxzW3AgKyAyXSkpXG4gICAgICAgIHN0YWNrSW4gPSBzdGFja0luLm5leHRcbiAgICAgICAgck91dFN1bSArPSAocHIgPSBzdGFja091dC5yKVxuICAgICAgICBnT3V0U3VtICs9IChwZyA9IHN0YWNrT3V0LmcpXG4gICAgICAgIGJPdXRTdW0gKz0gKHBiID0gc3RhY2tPdXQuYilcbiAgICAgICAgckluU3VtIC09IHByXG4gICAgICAgIGdJblN1bSAtPSBwZ1xuICAgICAgICBiSW5TdW0gLT0gcGJcbiAgICAgICAgc3RhY2tPdXQgPSBzdGFja091dC5uZXh0XG4gICAgICAgIHlpICs9IHdpZHRoXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclN0YWNrQmx1ckZpbHRlciAoRmlsdGVyKSB7XG4gIEZpbHRlci5yZWdpc3Rlcignc3RhY2tCbHVyJywgZnVuY3Rpb24gKHJhZGl1cykge1xuICAgIHRoaXMucHJvY2Vzc1BsdWdpbignc3RhY2tCbHVyJywgW3JhZGl1c10pXG4gIH0pXG59XG4iLCJpbXBvcnQgcmVnaXN0ZXJDYW1lcmFGaWx0ZXIgZnJvbSAnLi9jYW1lcmEnXG5pbXBvcnQgcmVnaXN0ZXJCbHVyRmlsdGVyIGZyb20gJy4vYmx1cidcbmltcG9ydCByZWdpc3RyZXJQb3N0ZXJpemVGaWx0ZXIgZnJvbSAnLi9wb3N0ZXJpemUnXG5pbXBvcnQgcmVnaXN0ZXJQcmVzZXRGaWx0ZXIgZnJvbSAnLi9wcmVzZXRzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJTdGFja0JsdXJQbHVnaW4sIHJlZ2lzdGVyU3RhY2tCbHVyRmlsdGVyIH0gZnJvbSAnLi9zdGFja0JsdXInXG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclBsdWdpbiAoUGx1Z2luKSB7XG4gIHJlZ2lzdGVyU3RhY2tCbHVyUGx1Z2luKFBsdWdpbilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyUGx1Z2luRmlsdGVyIChGaWx0ZXIpIHtcbiAgcmVnaXN0ZXJDYW1lcmFGaWx0ZXIoRmlsdGVyKVxuICByZWdpc3RlckJsdXJGaWx0ZXIoRmlsdGVyKVxuICByZWdpc3RyZXJQb3N0ZXJpemVGaWx0ZXIoRmlsdGVyKVxuICByZWdpc3RlclByZXNldEZpbHRlcihGaWx0ZXIpXG4gIHJlZ2lzdGVyU3RhY2tCbHVyRmlsdGVyKEZpbHRlcilcbn1cbiIsImltcG9ydCBDYW1hbiBmcm9tICcuL2NhbWFuJ1xuaW1wb3J0IEJsZW5kZXIgZnJvbSAnLi9ibGVuZGVyJ1xuaW1wb3J0IEZpbHRlciBmcm9tICcuL2ZpbHRlcidcbmltcG9ydCBQbHVnaW4gZnJvbSAnLi9wbHVnaW4nXG5cbmltcG9ydCByZWdpc3RlckJsZW5kZXIgZnJvbSAnLi4vbGliL2JsZW5kZXJzJ1xuaW1wb3J0IHJlZ2lzdGVyRmlsdGVyIGZyb20gJy4uL2xpYi9maWx0ZXJzJ1xuaW1wb3J0IHsgcmVnaXN0ZXJQbHVnaW4sIHJlZ2lzdGVyUGx1Z2luRmlsdGVyIH0gZnJvbSAnLi4vbGliL3BsdWdpbnMnXG5cbi8vIHdlY2hhdCBtaW5pIHByb2dyYW0gZW52XG5pZiAodHlwZW9mIHd4ID09PSAndW5kZWZpbmVkJykge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1dlY2hhdC1DYW1hbkpTIGNhbiBvbmx5IHJ1biBpbiB3ZWNoYXQgbWluaSBwcm9ncmFtJylcbn1cbnJlZ2lzdGVyQmxlbmRlcihCbGVuZGVyKVxucmVnaXN0ZXJGaWx0ZXIoRmlsdGVyKVxuXG5yZWdpc3RlclBsdWdpbihQbHVnaW4pXG5yZWdpc3RlclBsdWdpbkZpbHRlcihGaWx0ZXIpXG5cbmV4cG9ydCBkZWZhdWx0IENhbWFuXG4iXSwibmFtZXMiOlsibW9kdWxlS2V5d29yZHMiLCJNb2R1bGUiLCJvYmoiLCJrZXkiLCJpbmRleE9mIiwiZXh0ZW5kZWQiLCJhcHBseSIsInByb3RvdHlwZSIsImluY2x1ZGVkIiwiYXJncyIsInRhcmdldCIsInBvcCIsImkiLCJzb3VyY2UiLCJ0byIsImZyb20iLCJkZWZpbmVQcm9wZXJ0eSIsInZhbCIsImZ1bmMiLCJjYWxsIiwibm9vcCIsIlV0aWwiLCJsZW4iLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHIiLCJkZXN0Iiwic3JjIiwiY29weSIsInByb3AiLCJoYXNPd25Qcm9wZXJ0eSIsIm9wdHMiLCJhdHRyaWJ1dGVzIiwiYXR0ciIsImV4Y2VwdCIsIm5vZGVOYW1lIiwic2V0QXR0cmlidXRlIiwibm9kZVZhbHVlIiwibGVuZ3RoIiwiVWludDhDbGFtcGVkQXJyYXkiLCJBcnJheSIsIkFuYWx5emUiLCJjIiwibGV2ZWxzIiwiciIsImciLCJiIiwiaiIsInBpeGVsRGF0YSIsIm51bVBpeGVscyIsIkV2ZW50IiwidHlwZSIsImRhdGEiLCJldmVudHMiLCJldmVudCIsImlkIiwiZm4iLCJfdHlwZSIsIl9mbiIsInR5cGVzIiwicHVzaCIsIl90aGlzIiwib24iLCJvZmYiLCJhcmd1bWVudHMiLCJsaXN0ZW4iLCJPYmplY3QiLCJjcmVhdGUiLCJjYnMiLCJjYiIsInNwbGljZSIsIkNvbmZpZyIsIkxvZ2dlciIsImxvZ0xldmVsIiwibmFtZSIsImNvbnNvbGUiLCJlIiwiZGVidWciLCJsb2ciLCJMb2ciLCJQbHVnaW4iLCJwbHVnaW4iLCJwbHVnaW5zIiwiY29udGV4dCIsIlBpeGVsIiwieCIsInkiLCJ3aWR0aCIsImxvYyIsImZsb29yIiwiYSIsIkVycm9yIiwiZGltZW5zaW9ucyIsImhlaWdodCIsImhvcml6IiwidmVydCIsIm5ld0xvYyIsInBpeGVsQXRMb2NhdGlvbiIsImNvb3JkaW5hdGVzVG9Mb2NhdGlvbiIsInJnYmEiLCJ0b0tleSIsImluY2x1ZGVBbHBoYSIsImhleCIsIlJlbmRlcmVyIiwicmVuZGVyUXVldWUiLCJtb2RQaXhlbERhdGEiLCJqb2IiLCJ0cmlnZ2VyIiwiZmluaXNoZWRGbiIsImN1cnJlbnRKb2IiLCJzaGlmdCIsIkZJTFRFUl9UWVBFIiwiTGF5ZXJEZXF1ZXVlIiwibGF5ZXIiLCJjYW52YXNRdWV1ZSIsImV4ZWN1dGVMYXllciIsInByb2Nlc3NOZXh0IiwiTGF5ZXJGaW5pc2hlZCIsImFwcGx5Q3VycmVudExheWVyIiwicG9wQ29udGV4dCIsIkxvYWRPdmVybGF5IiwibG9hZE92ZXJsYXkiLCJleGVjdXRlUGx1Z2luIiwiZXhlY3V0ZUZpbHRlciIsImNhbWFuSW5zdGFuY2UiLCJjYWxsYmFjayIsImRhdGFBcnJheSIsImJsb2Nrc0RvbmUiLCJuIiwiYmxvY2tQaXhlbExlbmd0aCIsIkJsb2NrcyIsImJsb2NrTiIsImxhc3RCbG9ja04iLCJzdGFydCIsImVuZCIsIlNpbmdsZSIsImVhY2hCbG9jayIsInJlbmRlckJsb2NrIiwicmVuZGVyS2VybmVsIiwiZXhlY3V0ZSIsImJudW0iLCJwaXhlbCIsInNldENvbnRleHQiLCJwcm9jZXNzRm4iLCJjbGFtcFJHQiIsImJsb2NrRmluaXNoZWQiLCJiaWFzIiwiZGl2aXNvciIsImFkanVzdCIsImFkanVzdFNpemUiLCJzcXJ0Iiwia2VybmVsIiwibWF4IiwibWluIiwiYnVpbGRlciIsImJ1aWxkZXJJbmRleCIsImsiLCJwIiwiZ2V0UGl4ZWxSZWxhdGl2ZSIsInJlcyIsInByb2Nlc3NLZXJuZWwiLCJLZXJuZWwiLCJCbGVuZGVyIiwiYmxlbmRlcnMiLCJyZ2JhTGF5ZXIiLCJyZ2JhUGFyZW50IiwiTGF5ZXIiLCJmaWx0ZXIiLCJvcHRpb25zIiwibGF5ZXJJRCIsInVuaXFpZCIsIm5ld0xheWVyIiwibW9kZSIsImJsZW5kaW5nTW9kZSIsIm9wYWNpdHkiLCJwYXJlbnREYXRhIiwiZmlsbENvbG9yIiwicGl4ZWxTdGFjayIsImxheWVyRGF0YSIsInJlc3VsdCIsIkNhbWFuIiwidmVyc2lvbiIsInJlbGVhc2UiLCJkYXRlIiwiaW5pdGlhbGl6ZWRQaXhlbERhdGEiLCJvcmlnaW5hbFBpeGVsRGF0YSIsImxheWVyU3RhY2siLCJjdXJyZW50TGF5ZXIiLCJhbmFseXplIiwicmVuZGVyZXIiLCJwYXJzZUFyZ3VtZW50cyIsImluaXRDYW52YXMiLCJjYW52YXMiLCJ3eCIsImNyZWF0ZUNhbnZhc0NvbnRleHQiLCJmaW5pc2hJbml0Iiwib3JpZ2luYWxXaWR0aCIsInByZVNjYWxlZFdpZHRoIiwib3JpZ2luYWxIZWlnaHQiLCJwcmVTY2FsZWRIZWlnaHQiLCJjYW52YXNHZXRJbWFnZURhdGEiLCJhbGxvd1JldmVydCIsImNhbnZhc1B1dEltYWdlRGF0YSIsImFkZCIsInB1c2hDb250ZXh0IiwiYXBwbHlUb1BhcmVudCIsIkZpbHRlciIsImZpbHRlckZ1bmMiLCJyZWdpc3RlckJsZW5kZXIiLCJyZWdpc3RlciIsIkNvbnZlcnQiLCJjaGFyQXQiLCJwYXJzZUludCIsImwiLCJoIiwicyIsImQiLCJxIiwiaHVlVG9SR0IiLCJ0IiwidiIsImYiLCJwb3ciLCJ6Iiwid2hpdGVYIiwid2hpdGVZIiwid2hpdGVaIiwieHl6IiwicmdiVG9YWVoiLCJ4eXpUb0xhYiIsIkNhbGN1bGF0ZSIsIngxIiwieTEiLCJ4MiIsInkyIiwiZ2V0RmxvYXQiLCJyYW5kIiwidG9GaXhlZCIsInJvdW5kIiwiY29udHJvbFBvaW50cyIsImxvd0JvdW5kIiwiaGlnaEJvdW5kIiwiYmV6aWVyIiwibGVycCIsImNsYW1wIiwicHJldiIsIm5leHQiLCJlbmRYIiwibWlzc2luZ1ZhbHVlcyIsInZhbHVlcyIsImtleXMiLCJyZXQiLCJsZWZ0Q29vcmQiLCJyaWdodENvb3JkIiwicmVnaXN0ZXJGaWx0ZXIiLCJjb2xvciIsImhleFRvUkdCIiwicHJvY2VzcyIsImF2ZyIsImFtdCIsImFicyIsImx1bWluYW5jZSIsImhzdiIsInJnYlRvSFNWIiwiaHN2VG9SR0IiLCJyZ2IiLCJsZXZlbCIsInJhbmRvbVJhbmdlIiwiY2hhbiIsInJlZCIsImdyZWVuIiwiYmx1ZSIsImNoYW5zIiwiY3BzIiwibGFzdCIsImFsZ28iLCJzcGxpdCIsImN0cmwxIiwiY3RybDIiLCJyZXZlcnNlIiwiY3VydmVzIiwidmlnbmV0dGVGaWx0ZXJzIiwic3RyZW5ndGgiLCJyZWdpc3RlckNhbWVyYUZpbHRlciIsInNpemUiLCJjZW50ZXIiLCJkaXN0IiwiZGl2IiwibG9jYXRpb25YWSIsImRpc3RhbmNlIiwiZGVmYXVsdHMiLCJkaW0iLCJwZXJjZW50IiwiX2kiLCJfbGVuIiwiX3JlZiIsImV4dGVuZCIsImJhYmVsSGVscGVycy50eXBlb2YiLCJjb3JuZXJSYWRpdXMiLCJpbWFnZSIsIm1ldGhvZCIsImNvb3JkcyIsImxlZnQiLCJib3R0b20iLCJjb3JuZXJzIiwidG9wIiwicmlnaHQiLCJtYXhEaXN0IiwicmFkaWFsRGlzdCIsImNvcmVycyIsInJlZ2lzdGVyQmx1ckZpbHRlciIsImRlZ3JlZXMiLCJyZWdpc3RlclBvc3Rlcml6ZUZpbHRlciIsIm51bU9mQXJlYXMiLCJudW1PZlZhbHVlcyIsInJlZ2lzdGVyUHJlc2V0RmlsdGVyIiwidmlnbmV0dGUiLCJncmV5c2NhbGUiLCJjb250cmFzdCIsIm5vaXNlIiwic2VwaWEiLCJjaGFubmVscyIsImdhbW1hIiwiYnJpZ2h0bmVzcyIsImV4cG9zdXJlIiwic2F0dXJhdGlvbiIsImdyZXkiLCJ2aWJyYW5jZSIsInNoYXJwZW4iLCJwb3N0ZXJpemUiLCJjbGlwIiwiY29sb3JpemUiLCJzZXRCbGVuZGluZ01vZGUiLCJjb3B5UGFyZW50Iiwic3RhY2tCbHVyIiwiaHVlIiwiQmx1clN0YWNrIiwibXVsVGFibGUiLCJzaGdUYWJsZSIsInJlZ2lzdGVyU3RhY2tCbHVyUGx1Z2luIiwicmFkaXVzIiwiYkluU3VtIiwiYk91dFN1bSIsImJTdW0iLCJnSW5TdW0iLCJnT3V0U3VtIiwiZ1N1bSIsImhlaWdodE1pbnVzMSIsIm11bFN1bSIsInBiIiwicGciLCJwaXhlbHMiLCJwciIsInJJblN1bSIsInJPdXRTdW0iLCJyU3VtIiwicmFkaXVzUGx1czEiLCJyYnMiLCJzaGdTdW0iLCJzdGFjayIsInN0YWNrRW5kIiwic3RhY2tJbiIsInN0YWNrT3V0Iiwic3RhY2tTdGFydCIsInN1bUZhY3RvciIsIndpZHRoTWludXMxIiwieWkiLCJ5cCIsInl3IiwiX2oiLCJfayIsIl9sIiwiX20iLCJfbiIsIl9vIiwiX3AiLCJfcSIsImlzTmFOIiwicmVnaXN0ZXJTdGFja0JsdXJGaWx0ZXIiLCJwcm9jZXNzUGx1Z2luIiwicmVnaXN0ZXJQbHVnaW4iLCJyZWdpc3RlclBsdWdpbkZpbHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTUEsaUJBQWlCLENBQUMsVUFBRCxFQUFhLFVBQWIsQ0FBdkI7Ozs7Ozs7Ozs7Ozs7O0lBYXFCQzs7Ozs7Ozs7O2dDQUVIQyxLQUFLO1dBQ2QsSUFBSUMsR0FBVCxJQUFnQkQsR0FBaEIsRUFBcUI7WUFDZkYsZUFBZUksT0FBZixLQUEyQixDQUFDLENBQWhDLEVBQW1DO2VBQzVCRCxHQUFMLElBQVlELElBQUlDLEdBQUosQ0FBWjs7O1VBR0FFLFFBQUosSUFBZ0JILElBQUlHLFFBQUosQ0FBYUMsS0FBYixDQUFtQixJQUFuQixDQUFoQjthQUNPLElBQVA7Ozs7Ozs7NkJBSWVKLEtBQUs7V0FDZixJQUFJQyxHQUFULElBQWdCRCxHQUFoQixFQUFxQjtZQUNmRixlQUFlSSxPQUFmLEtBQTJCLENBQUMsQ0FBaEMsRUFBbUM7ZUFDNUJH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RUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsRUFBaEIsRUFBb0IsRUFBcEIsRUFBd0IsRUFBeEIsRUFBNEIsRUFBNUIsRUFBZ0MsRUFBaEMsRUFBb0MsRUFBcEMsRUFBd0MsRUFBeEMsRUFBNEMsRUFBNUMsRUFBZ0QsRUFBaEQsRUFBb0QsRUFBcEQsRUFBd0QsRUFBeEQsRUFBNEQsRUFBNUQsRUFBZ0UsRUFBaEUsRUFBb0UsRUFBcEUsRUFBd0UsRUFBeEUsRUFBNEUsRUFBNUUsRUFBZ0YsRUFBaEYsRUFBb0YsRUFBcEYsRUFBd0YsRUFBeEYsRUFBNEYsRUFBNUYsRUFBZ0csRUFBaEcsRUFBb0csRUFBcEcsRUFBd0csRUFBeEcsRUFBNEcsRUFBNUcsRUFBZ0gsRUFBaEgsRUFBb0gsRUFBcEgsRUFBd0gsRUFBeEgsRUFBNEgsRUFBNUgsRUFBZ0ksRUFBaEksRUFBb0ksRUFBcEksRUFBd0ksRUFBeEksRUFBNEksRUFBNUksRUFBZ0osRUFBaEosRUFBb0osRUFBcEosRUFBd0osRUFBeEosRUFBNEosRUFBNUosRUFBZ0ssRUFBaEssRUFBb0ssRUFBcEssRUFBd0ssRUFBeEssRUFBNEssRUFBNUssRUFBZ0wsRUFBaEwsRUFBb0wsRUFBcEwsRUFBd0wsRUFBeEwsRUFBNEwsRUFBNUwsRUFBZ00sRUFBaE0sRUFBb00sRUFBcE0sRUFBd00sRUFBeE0sRUFBNE0sRUFBNU0sRUFBZ04sRUFBaE4sRUFBb04sRUFBcE4sRUFBd04sRUFBeE4sRUFBNE4sRUFBNU4sRUFBZ08sRUFBaE8sRUFBb08sRUFBcE8sRUFBd08sRUFBeE8sRUFBNE8sRUFBNU8sRUFBZ1AsRUFBaFAsRUFBb1AsRUFBcFAsRUFBd1AsRUFBeFAsRUFBNFAsRUFBNVAsRUFBZ1EsRUFBaFEsRUFBb1EsRUFBcFEsRUFBd1EsRUFBeFEsRUFBNFEsRUFBNVEsRUFBZ1IsRUFBaFIsRUFBb1IsRUFBcFIsRUFBd1IsRUFBeFIsRUFBNFIsRUFBNVIsRUFBZ1MsRUFBaFMsRUFBb1MsRUFBcFMsRUFBd1MsRUFBeFMsRUFBNFMsRUFBNVMsRUFBZ1QsRUFBaFQsRUFBb1QsRUFBcFQsRUFBd1QsRUFBeFQsRUFBNFQsRUFBNVQsRUFBZ1UsRUFBaFUsRUFBb1UsRUFBcFUsRUFBd1UsRUFBeFUsRUFBNFUsRUFBNVUsRUFBZ1YsRUFBaFYsRUFBb1YsRUFBcFYsRUFBd1YsRUFBeFYsRUFBNFYsRUFBNVYsRUFBZ1csRUFBaFcsRUFBb1csRUFBcFcsRUFBd1csRUFBeFcsRUFBNFcsRUFBNVcsRUFBZ1gsRUFBaFgsRUFBb1gsRUFBcFgsRUFBd1gsRUFBeFgsRUFBNFgsRUFBNVgsRUFBZ1ksRUFBaFksRUFBb1ksRUFBcFksRUFBd1ksRUFBeFksRUFBNFksRUFBNVksRUFBZ1osRUFBaFosRUFBb1osRUFBcFosRUFBd1osRUFBeFosRUFBNFosRUFBNVosRUFBZ2EsRUFBaGEsRUFBb2EsRUFBcGEsRUFBd2EsRUFBeGEsRUFBNGEsRUFBNWEsRUFBZ2IsRUFBaGIsRUFBb2IsRUFBcGIsRUFBd2IsRUFBeGIsRUFBNGIsRUFBNWIsRUFBZ2MsRUFBaGMsRUFBb2MsRUFBcGMsRUFBd2MsRUFBeGMsRUFBNGMsRUFBNWMsRUFBZ2QsRUFBaGQsRUFBb2QsRUFBcGQsRUFBd2QsRUFBeGQsRUFBNGQsRUFBNWQsRUFBZ2UsRUFBaGUsRUFBb2UsRUFBcGUsRUFBd2UsRUFBeGUsRUFBNGUsRUFBNWUsRUFBZ2YsRUFBaGYsRUFBb2YsRUFBcGYsRUFBd2YsRUFBeGYsRUFBNGYsRUFBNWYsRUFBZ2dCLEVBQWhnQixFQUFvZ0IsRUFBcGdCLEVBQXdnQixFQUF4Z0IsRUFBNGdCLEVBQTVnQixFQUFnaEIsRUFBaGhCLEVBQW9oQixFQUFwaEIsRUFBd2hCLEVBQXhoQixFQUE0aEIsRUFBNWhCLEVBQWdpQixFQUFoaUIsRUFBb2lCLEVBQXBpQixFQUF3aUIsRUFBeGlCLEVBQTRpQixFQUE1aUIsRUFBZ2pCLEVBQWhqQixFQUFvakIsRUFBcGpCLEVBQXdqQixFQUF4akIsRUFBNGpCLEVBQTVqQixFQUFna0IsRUFBaGtCLEVBQW9rQixFQUFwa0IsRUFBd2tCLEVBQXhrQixFQUE0a0IsRUFBNWtCLEVBQWdsQixFQUFobEIsRUFBb2xCLEVBQXBsQixFQUF3bEIsRUFBeGxCLEVBQTRsQixFQUE1bEIsRUFBZ21CLEVBQWhtQixFQUFvbUIsRUFBcG1CLEVBQXdtQixFQUF4bUIsRUFBNG1CLEVBQTVtQixFQUFnbkIsRUFBaG5CLEVBQW9uQixFQUFwbkIsRUFBd25CLEVBQXhuQixFQUE0bkIsRUFBNW5CLEVBQWdvQixFQUFob0IsRUFBb29CLEVBQXBvQixFQUF3b0IsRUFBeG9CLEVBQTRvQixFQUE1b0IsRUFBZ3BCLEVBQWhwQixFQUFvcEIsRUFBcHBCLEVBQXdwQixFQUF4cEIsRUFBNHBCLEVBQTVwQixFQUFncUIsRUFBaHFCLEVBQW9xQixFQUFwcUIsRUFBd3FCLEVBQXhxQixFQUE0cUIsRUFBNXFCLEVBQWdyQixFQUFockIsRUFBb3JCLEVBQXByQixFQUF3ckIsRUFBeHJCLEVBQTRyQixFQUE1ckIsRUFBZ3NCLEVBQWhzQixFQUFvc0IsRUFBcHNCLEVBQXdzQixFQUF4c0IsRUFBNHNCLEVBQTVzQixFQUFndEIsRUFBaHRCLEVBQW90QixFQUFwdEIsRUFBd3RCLEVBQXh0QixFQUE0dEIsRUFBNXRCLEVBQWd1QixFQUFodUIsRUFBb3VCLEVBQXB1QixFQUF3dUIsRUFBeHVCLEVBQTR1QixFQUE1dUIsRUFBZ3ZCLEVBQWh2QixFQUFvdkIsRUFBcHZCLEVBQXd2QixFQUF4dkIsRUFBNHZCLEVBQTV2QixFQUFnd0IsRUFBaHdCLEVBQW93QixFQUFwd0IsRUFBd3dCLEVBQXh3QixFQUE0d0IsRUFBNXdCLEVBQWd4QixFQUFoeEIsRUFBb3hCLEVBQXB4QixFQUF3eEIsRUFBeHhCLEVBQTR4QixFQUE1eEIsRUFBZ3lCLEVBQWh5QixFQUFveUIsRUFBcHlCLEVBQXd5QixFQUF4eUIsRUFBNHlCLEVBQTV5QixFQUFnekIsRUFBaHpCLEVBQW96QixFQUFwekIsRUFBd3pCLEVBQXh6QixFQUE0ekIsRUFBNXpCLEVBQWcwQixFQUFoMEIsRUFBbzBCLEVBQXAwQixFQUF3MEIsRUFBeDBCLEVBQTQwQixFQUE1MEIsRUFBZzFCLEVBQWgxQixFQUFvMUIsRUFBcDFCLEVBQXcxQixFQUF4MUIsRUFBNDFCLEVBQTUxQixFQUFnMkIsRUFBaDJCLEVBQW8yQixFQUFwMkIsRUFBdzJCLEVBQXgyQixFQUE0MkIsRUFBNTJCLEVBQWczQixFQUFoM0IsRUFBbzNCLEVBQXAzQixFQUF3M0IsRUFBeDNCLEVBQTQzQixFQUE1M0IsRUFBZzRCLEVBQWg0QixFQUFvNEIsRUFBcDRCLEVBQXc0QixFQUF4NEIsRUFBNDRCLEVBQTU0QixFQUFnNUIsRUFBaDVCLEVBQW81QixFQUFwNUIsRUFBdzVCLEVBQXg1QixFQUE0NUIsRUFBNTVCLEVBQWc2QixFQUFoNkIsRUFBbzZCLEVBQXA2QixFQUF3NkIsRUFBeDZCLEVBQTQ2QixFQUE1NkIsRUFBZzdCLEVBQWg3QixFQUFvN0IsRUFBcDdCLEVBQXc3QixFQUF4N0IsRUFBNDdCLEVBQTU3QixFQUFnOEIsRUFBaDhCLEVBQW84QixFQUFwOEIsRUFBdzhCLEVBQXg4QixFQUE0OEIsRUFBNThCLEVBQWc5QixFQUFoOUIsRUFBbzlCLEVBQXA5QixFQUF3OUIsRUFBeDlCLEVBQTQ5QixFQUE1OUIsRUFBZytCLEVBQWgrQixFQUFvK0IsRUFBcCtCLEVBQXcrQixFQUF4K0IsRUFBNCtCLEVBQTUrQixFQUFnL0IsRUFBaC9CLEVBQW8vQixFQUFwL0IsRUFBdy9CLEVBQXgvQixDQUFYO0FBQ0FGLFlBQVkscUJBQVk7T0FDakJwUyxDQUFMLEdBQVMsQ0FBVDtPQUNLQyxDQUFMLEdBQVMsQ0FBVDtPQUNLQyxDQUFMLEdBQVMsQ0FBVDtPQUNLNEMsQ0FBTCxHQUFTLENBQVQ7T0FDSzRKLElBQUwsR0FBWSxJQUFaO0NBTEY7O0FBUUEsQUFBTyxTQUFTNkYsdUJBQVQsQ0FBa0NuUSxNQUFsQyxFQUEwQztTQUN4Q2lJLFFBQVAsQ0FBZ0IsV0FBaEIsRUFBNkIsVUFBU21JLE1BQVQsRUFBaUI7UUFDeENDLGVBQUo7UUFBWUMsZ0JBQVo7UUFBcUJDLGFBQXJCO1FBQTJCeEQsWUFBM0I7UUFBZ0N5RCxlQUFoQztRQUF3Q0MsZ0JBQXhDO1FBQWlEQyxhQUFqRDtRQUF1RDdQLGVBQXZEO1FBQStEOFAscUJBQS9EO1FBQTZFaFYsVUFBN0U7UUFBZ0ZpVixlQUFoRjtRQUF3Ri9MLFVBQXhGO1FBQTJGZ00sV0FBM0Y7UUFBK0ZDLFdBQS9GO1FBQW1HQyxlQUFuRztRQUEyR0MsV0FBM0c7UUFBK0dDLGVBQS9HO1FBQXVIQyxnQkFBdkg7UUFBZ0lDLGFBQWhJO1FBQXNJQyxvQkFBdEk7UUFBbUpDLFlBQW5KO1FBQXdKQyxlQUF4SjtRQUFnS0MsY0FBaEs7UUFBdUtDLGlCQUF2SztRQUFpTEMsZ0JBQWpMO1FBQTBMQyxpQkFBMUw7UUFBb01DLG1CQUFwTTtRQUFnTkMsa0JBQWhOO1FBQTJOclIsY0FBM047UUFBa09zUixvQkFBbE87UUFBK094UixVQUEvTztRQUFrUEMsVUFBbFA7UUFBcVB3UixXQUFyUDtRQUF5UEMsV0FBelA7UUFBNlBDLFdBQTdQO1FBQWlRM0UsV0FBalE7UUFBcVE0RSxXQUFyUTtRQUF5UUMsV0FBelE7UUFBNlFDLFdBQTdRO1FBQWlSQyxXQUFqUjtRQUFxUkMsV0FBclI7UUFBeVJDLFdBQXpSO1FBQTZSQyxXQUE3UjtRQUFpU0MsV0FBalM7UUFDSUMsTUFBTXJDLE1BQU4sS0FBaUJBLFNBQVMsQ0FBOUIsRUFBaUM7OztjQUd2QixDQUFWO2FBQ1MsS0FBS3BTLFNBQWQ7WUFDUSxLQUFLNEMsVUFBTCxDQUFnQkwsS0FBeEI7YUFDUyxLQUFLSyxVQUFMLENBQWdCQyxNQUF6QjtVQUNNdVAsU0FBU0EsTUFBVCxHQUFrQixDQUF4QjtrQkFDYzdQLFFBQVEsQ0FBdEI7bUJBQ2VNLFNBQVMsQ0FBeEI7a0JBQ2N1UCxTQUFTLENBQXZCO2dCQUNZZ0IsZUFBZUEsY0FBYyxDQUE3QixJQUFrQyxDQUE5QztpQkFDYSxJQUFJcEIsU0FBSixFQUFiO1lBQ1EyQixVQUFSO1NBQ0toVyxJQUFJMFIsS0FBSyxDQUFkLEVBQWlCTixPQUFPLENBQVAsR0FBV00sS0FBS04sR0FBaEIsR0FBc0JNLEtBQUtOLEdBQTVDLEVBQWlEcFIsSUFBSW9SLE9BQU8sQ0FBUCxHQUFXLEVBQUVNLEVBQWIsR0FBa0IsRUFBRUEsRUFBekUsRUFBNkU7Y0FDbkVrRSxNQUFNakgsSUFBTixHQUFhLElBQUkwRixTQUFKLEVBQXJCO1VBQ0lyVSxNQUFNeVYsV0FBVixFQUF1QjttQkFDVkcsS0FBWDs7O1VBR0VqSCxJQUFOLEdBQWFxSCxVQUFiO2NBQ1UsSUFBVjtlQUNXLElBQVg7U0FDS0csS0FBSyxDQUFWO2FBQ1M3QixTQUFTRyxNQUFULENBQVQ7YUFDU0YsU0FBU0UsTUFBVCxDQUFUO1NBQ0s5UCxJQUFJMlIsS0FBSyxDQUFkLEVBQWlCcFIsVUFBVSxDQUFWLEdBQWNvUixLQUFLcFIsTUFBbkIsR0FBNEJvUixLQUFLcFIsTUFBbEQsRUFBMERQLElBQUlPLFVBQVUsQ0FBVixHQUFjLEVBQUVvUixFQUFoQixHQUFxQixFQUFFQSxFQUFyRixFQUF5RjtlQUM5RXpCLFNBQVNILFNBQVNjLE9BQU9ULE9BQU9ILE9BQU8sQ0FBaEQ7Z0JBQ1VhLGVBQWVKLEtBQUtELE9BQU9lLEVBQVAsQ0FBcEIsQ0FBVjtnQkFDVVYsZUFBZU4sS0FBS0MsT0FBT2UsS0FBSyxDQUFaLENBQXBCLENBQVY7Z0JBQ1VWLGVBQWVQLEtBQUtFLE9BQU9lLEtBQUssQ0FBWixDQUFwQixDQUFWO2NBQ1FGLFlBQVlaLEVBQXBCO2NBQ1FZLFlBQVlkLEVBQXBCO2NBQ1FjLFlBQVlmLEVBQXBCO2NBQ1FjLFVBQVI7V0FDS2hXLElBQUl1VyxLQUFLLENBQWQsRUFBaUJkLGVBQWUsQ0FBZixHQUFtQmMsS0FBS2QsV0FBeEIsR0FBc0NjLEtBQUtkLFdBQTVELEVBQXlFelYsSUFBSXlWLGVBQWUsQ0FBZixHQUFtQixFQUFFYyxFQUFyQixHQUEwQixFQUFFQSxFQUF6RyxFQUE2RztjQUNyR3RVLENBQU4sR0FBVW9ULEVBQVY7Y0FDTW5ULENBQU4sR0FBVWlULEVBQVY7Y0FDTWhULENBQU4sR0FBVStTLEVBQVY7Z0JBQ1FVLE1BQU1qSCxJQUFkOztXQUVHM08sSUFBSXdXLEtBQUssQ0FBZCxFQUFpQmYsZUFBZSxDQUFmLEdBQW1CZSxLQUFLZixXQUF4QixHQUFzQ2UsS0FBS2YsV0FBNUQsRUFBeUV6VixJQUFJeVYsZUFBZSxDQUFmLEdBQW1CLEVBQUVlLEVBQXJCLEdBQTBCLEVBQUVBLEVBQXpHLEVBQTZHO1lBQ3ZHTCxNQUFNLENBQUNELGNBQWNsVyxDQUFkLEdBQWtCa1csV0FBbEIsR0FBZ0NsVyxDQUFqQyxLQUF1QyxDQUE3QyxDQUFKO2dCQUNRLENBQUM0VixNQUFNM1QsQ0FBTixHQUFXb1QsS0FBS0QsT0FBT2xNLENBQVAsQ0FBakIsS0FBZ0N3TSxNQUFNRCxjQUFjelYsQ0FBcEQsQ0FBUjtnQkFDUSxDQUFDNFYsTUFBTTFULENBQU4sR0FBV2lULEtBQUtDLE9BQU9sTSxJQUFJLENBQVgsQ0FBakIsSUFBbUN3TSxHQUEzQztnQkFDUSxDQUFDRSxNQUFNelQsQ0FBTixHQUFXK1MsS0FBS0UsT0FBT2xNLElBQUksQ0FBWCxDQUFqQixJQUFtQ3dNLEdBQTNDO2tCQUNVTCxFQUFWO2tCQUNVRixFQUFWO2tCQUNVRCxFQUFWO2dCQUNRVSxNQUFNakgsSUFBZDs7Z0JBRVFxSCxVQUFWO2lCQUNXSCxRQUFYO1dBQ0tuUixJQUFJK1IsS0FBSyxDQUFkLEVBQWlCN1IsU0FBUyxDQUFULEdBQWE2UixLQUFLN1IsS0FBbEIsR0FBMEI2UixLQUFLN1IsS0FBaEQsRUFBdURGLElBQUlFLFNBQVMsQ0FBVCxHQUFhLEVBQUU2UixFQUFmLEdBQW9CLEVBQUVBLEVBQWpGLEVBQXFGO2VBQzVFTixFQUFQLElBQWNYLE9BQU9QLE1BQVIsSUFBbUJVLE1BQWhDO2VBQ09RLEtBQUssQ0FBWixJQUFrQnBCLE9BQU9FLE1BQVIsSUFBbUJVLE1BQXBDO2VBQ09RLEtBQUssQ0FBWixJQUFrQnZCLE9BQU9LLE1BQVIsSUFBbUJVLE1BQXBDO2dCQUNRSixPQUFSO2dCQUNRVCxPQUFSO2dCQUNRSCxPQUFSO21CQUNXbUIsUUFBUTdULENBQW5CO21CQUNXNlQsUUFBUTVULENBQW5CO21CQUNXNFQsUUFBUTNULENBQW5CO1lBQ0trVSxNQUFNLENBQUNuTixJQUFJeEUsSUFBSStQLE1BQUosR0FBYSxDQUFsQixJQUF1QnlCLFdBQXZCLEdBQXFDaE4sQ0FBckMsR0FBeUNnTixXQUEvQyxDQUFELElBQWlFLENBQXJFO2tCQUNXSixRQUFRN1QsQ0FBUixHQUFZbVQsT0FBT2xNLENBQVAsQ0FBdkI7a0JBQ1c0TSxRQUFRNVQsQ0FBUixHQUFZa1QsT0FBT2xNLElBQUksQ0FBWCxDQUF2QjtrQkFDVzRNLFFBQVEzVCxDQUFSLEdBQVlpVCxPQUFPbE0sSUFBSSxDQUFYLENBQXZCO2dCQUNRb00sTUFBUjtnQkFDUVQsTUFBUjtnQkFDUUgsTUFBUjtrQkFDVW9CLFFBQVFuSCxJQUFsQjttQkFDWTBHLEtBQUtVLFNBQVM5VCxDQUExQjttQkFDWWtULEtBQUtZLFNBQVM3VCxDQUExQjttQkFDWWdULEtBQUthLFNBQVM1VCxDQUExQjtrQkFDVWtULEVBQVY7a0JBQ1VGLEVBQVY7a0JBQ1VELEVBQVY7bUJBQ1dhLFNBQVNwSCxJQUFwQjtjQUNNLENBQU47O1lBRUkvSixLQUFOOztTQUVHRixJQUFJZ1MsS0FBSyxDQUFkLEVBQWlCOVIsU0FBUyxDQUFULEdBQWE4UixLQUFLOVIsS0FBbEIsR0FBMEI4UixLQUFLOVIsS0FBaEQsRUFBdURGLElBQUlFLFNBQVMsQ0FBVCxHQUFhLEVBQUU4UixFQUFmLEdBQW9CLEVBQUVBLEVBQWpGLEVBQXFGO2VBQzFFaEMsU0FBU1ksU0FBU1AsT0FBT0gsT0FBT1ksT0FBTyxDQUFoRDtXQUNLOVEsS0FBSyxDQUFWO2dCQUNVK1EsZUFBZUosS0FBS0QsT0FBT2UsRUFBUCxDQUFwQixDQUFWO2dCQUNVVixlQUFlTixLQUFLQyxPQUFPZSxLQUFLLENBQVosQ0FBcEIsQ0FBVjtnQkFDVVYsZUFBZVAsS0FBS0UsT0FBT2UsS0FBSyxDQUFaLENBQXBCLENBQVY7Y0FDUUYsWUFBWVosRUFBcEI7Y0FDUVksWUFBWWQsRUFBcEI7Y0FDUWMsWUFBWWYsRUFBcEI7Y0FDUWMsVUFBUjtXQUNLaFcsSUFBSTJXLEtBQUssQ0FBZCxFQUFpQmxCLGVBQWUsQ0FBZixHQUFtQmtCLEtBQUtsQixXQUF4QixHQUFzQ2tCLEtBQUtsQixXQUE1RCxFQUF5RXpWLElBQUl5VixlQUFlLENBQWYsR0FBbUIsRUFBRWtCLEVBQXJCLEdBQTBCLEVBQUVBLEVBQXpHLEVBQTZHO2NBQ3JHMVUsQ0FBTixHQUFVb1QsRUFBVjtjQUNNblQsQ0FBTixHQUFVaVQsRUFBVjtjQUNNaFQsQ0FBTixHQUFVK1MsRUFBVjtnQkFDUVUsTUFBTWpILElBQWQ7O1dBRUcvSixLQUFMO1dBQ0s1RSxJQUFJNFcsS0FBSyxDQUFkLEVBQWlCbkMsVUFBVSxDQUFWLEdBQWNtQyxNQUFNbkMsTUFBcEIsR0FBNkJtQyxNQUFNbkMsTUFBcEQsRUFBNER6VSxJQUFJeVUsVUFBVSxDQUFWLEdBQWMsRUFBRW1DLEVBQWhCLEdBQXFCLEVBQUVBLEVBQXZGLEVBQTJGO2FBQ25GUixLQUFLMVIsQ0FBTixJQUFZLENBQWpCO2dCQUNRLENBQUNrUixNQUFNM1QsQ0FBTixHQUFXb1QsS0FBS0QsT0FBT2UsRUFBUCxDQUFqQixLQUFpQ1QsTUFBTUQsY0FBY3pWLENBQXJELENBQVI7Z0JBQ1EsQ0FBQzRWLE1BQU0xVCxDQUFOLEdBQVdpVCxLQUFLQyxPQUFPZSxLQUFLLENBQVosQ0FBakIsSUFBb0NULEdBQTVDO2dCQUNRLENBQUNFLE1BQU16VCxDQUFOLEdBQVcrUyxLQUFLRSxPQUFPZSxLQUFLLENBQVosQ0FBakIsSUFBb0NULEdBQTVDO2tCQUNVTCxFQUFWO2tCQUNVRixFQUFWO2tCQUNVRCxFQUFWO2dCQUNRVSxNQUFNakgsSUFBZDtZQUNJM08sSUFBSWdWLFlBQVIsRUFBc0I7Z0JBQ2RwUSxLQUFOOzs7V0FHQ0YsQ0FBTDtnQkFDVXNSLFVBQVY7aUJBQ1dILFFBQVg7V0FDS2xSLElBQUlrUyxLQUFLLENBQWQsRUFBaUIzUixVQUFVLENBQVYsR0FBYzJSLEtBQUszUixNQUFuQixHQUE0QjJSLEtBQUszUixNQUFsRCxFQUEwRFAsSUFBSU8sVUFBVSxDQUFWLEdBQWMsRUFBRTJSLEVBQWhCLEdBQXFCLEVBQUVBLEVBQXJGLEVBQXlGO1lBQ25GVixNQUFNLENBQVY7ZUFDT2pOLENBQVAsSUFBYXNNLE9BQU9QLE1BQVIsSUFBbUJVLE1BQS9CO2VBQ096TSxJQUFJLENBQVgsSUFBaUI2TCxPQUFPRSxNQUFSLElBQW1CVSxNQUFuQztlQUNPek0sSUFBSSxDQUFYLElBQWlCMEwsT0FBT0ssTUFBUixJQUFtQlUsTUFBbkM7Z0JBQ1FKLE9BQVI7Z0JBQ1FULE9BQVI7Z0JBQ1FILE9BQVI7bUJBQ1dtQixRQUFRN1QsQ0FBbkI7bUJBQ1c2VCxRQUFRNVQsQ0FBbkI7bUJBQ1c0VCxRQUFRM1QsQ0FBbkI7WUFDS3VDLElBQUssQ0FBQyxDQUFDd0UsSUFBSXZFLElBQUk4USxXQUFULElBQXdCVCxZQUF4QixHQUF1QzlMLENBQXZDLEdBQTJDOEwsWUFBNUMsSUFBNERwUSxLQUFsRSxJQUE2RSxDQUFqRjtnQkFDUzBRLFVBQVdRLFFBQVE3VCxDQUFSLEdBQVltVCxPQUFPbE0sQ0FBUCxDQUFoQztnQkFDUzJMLFVBQVdpQixRQUFRNVQsQ0FBUixHQUFZa1QsT0FBT2xNLElBQUksQ0FBWCxDQUFoQztnQkFDU3dMLFVBQVdvQixRQUFRM1QsQ0FBUixHQUFZaVQsT0FBT2xNLElBQUksQ0FBWCxDQUFoQztrQkFDVTRNLFFBQVFuSCxJQUFsQjttQkFDWTBHLEtBQUtVLFNBQVM5VCxDQUExQjttQkFDWWtULEtBQUtZLFNBQVM3VCxDQUExQjttQkFDWWdULEtBQUthLFNBQVM1VCxDQUExQjtrQkFDVWtULEVBQVY7a0JBQ1VGLEVBQVY7a0JBQ1VELEVBQVY7bUJBQ1dhLFNBQVNwSCxJQUFwQjtjQUNNL0osS0FBTjs7O1dBR0csSUFBUDtHQS9JRjs7O0FBbUpGLEFBQU8sU0FBU21TLHVCQUFULENBQWtDNUssTUFBbEMsRUFBMEM7U0FDeENHLFFBQVAsQ0FBZ0IsV0FBaEIsRUFBNkIsVUFBVW1JLE1BQVYsRUFBa0I7U0FDeEN1QyxhQUFMLENBQW1CLFdBQW5CLEVBQWdDLENBQUN2QyxNQUFELENBQWhDO0dBREY7OztBQ25NSyxTQUFTd0MsY0FBVCxDQUF5QjVTLE1BQXpCLEVBQWlDOzBCQUNkQSxNQUF4Qjs7O0FBR0YsQUFBTyxTQUFTNlMsb0JBQVQsQ0FBK0IvSyxNQUEvQixFQUF1Qzt1QkFDdkJBLE1BQXJCO3FCQUNtQkEsTUFBbkI7MEJBQ3lCQSxNQUF6Qjt1QkFDcUJBLE1BQXJCOzBCQUN3QkEsTUFBeEI7OztBQ05GO0FBQ0EsSUFBSSxPQUFPYixFQUFQLEtBQWMsV0FBbEIsRUFBK0I7UUFDdkIsSUFBSXRHLEtBQUosQ0FBVSxvREFBVixDQUFOOztBQUVGcUgsZ0JBQWdCOUMsT0FBaEI7QUFDQTRGLGVBQWVoRCxNQUFmOztBQUVBOEssZUFBZTVTLE1BQWY7QUFDQTZTLHFCQUFxQi9LLE1BQXJCOzs7OyJ9
