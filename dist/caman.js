(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Caman = factory());
}(this, (function () { 'use strict';

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

  // DOM simplifier (no jQuery dependency)
  // NodeJS compatible
  var $ = function $(sel) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    if ((typeof sel === 'undefined' ? 'undefined' : _typeof(sel)) === 'object' || typeof exports !== 'undefined') {
      return sel;
    }
    return root.querySelector(sel);
  };

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
      key: 'uniqid',
      value: function uniqid() {
        var id = 0;
        return {
          get: function get$$1() {
            return id++;
          }
        };
      }

      // Helper function that extends one object with all the properies of other objects

    }, {
      key: 'extend',
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
      key: 'clampRGB',
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
      key: 'copyAttributes',
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
      key: 'dataArray',
      value: function dataArray() {
        var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        if (Uint8Array) {
          return new Uint8Array(length);
        }
        return new Array(length);
      }
    }]);
    return Util;
  }();

  /**
   * Used for storing instances of CamanInstance objects such that, when Caman() is called on an already initialized element, it returns that object instead of re-initializing.
   *
   * @export
   * @class Store
   */
  var Store = function () {
    function Store() {
      classCallCheck(this, Store);
    }

    createClass(Store, null, [{
      key: "has",
      value: function has(search) {
        return !!this.items[search];
      }
    }, {
      key: "get",
      value: function get$$1(search) {
        return this.items[search];
      }
    }, {
      key: "put",
      value: function put(name, obj) {
        this.items[name] = obj;
      }
    }, {
      key: "execute",
      value: function execute(search, callback) {
        var _this = this;

        setTimeout(function () {
          callback.call(_this.get(search), _this.get(search));
        }, 0);

        return this.get(search);
      }
    }, {
      key: "flush",
      value: function flush() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (name) {
          delete this.items[name];
        } else {
          this.items = {};
        }
      }
    }]);
    return Store;
  }();

  Object.defineProperty(Store, "items", {
    enumerable: true,
    writable: true,
    value: {}
  });

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
    value: ['processStart', 'processComplete', 'renderStart', 'renderFinished', 'blockStarted', 'blockFinished']
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
      // All of the different render operatives

    }]);
    return Filter;
  }();

  Object.defineProperty(Filter, 'Type', {
    enumerable: true,
    writable: true,
    value: {
      Single: 1,
      Kernel: 2,
      LayerDequeue: 3,
      LayerFinished: 4,
      LoadOverlay: 5,
      Plugin: 6 }
  });

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

        if (!Caman.DEBUG) {
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
   * Various I/O based operations
   *
   * @export
   * @class IO
   */

  var IO = function () {
    function IO() {
      classCallCheck(this, IO);
    }

    createClass(IO, null, [{
      key: 'isRemote',


      /**
       * Is the given URL remote?
       * If a cross-origin setting is set, we assume you have CORS properly configured.
       *
       * @static
       * @param { DOMObject } img The image to check.
       * @returns { Boolean }
       * @memberof IO
       */
      value: function isRemote(img) {
        if (!img) {
          return false;
        }
        if (this.corsEnabled(img)) {
          return false;
        }
        return this.isURLRemote(img.src);
      }

      /**
       * Given an image, we check to see if a CORS policy has been defined.
       *
       * @static
       * @param { DOMObject } img The image to check.
       * @returns { Boolean }
       * @memberof IO
       */

      // Used for parsing image URLs for domain names.

    }, {
      key: 'corsEnabled',
      value: function corsEnabled(img) {
        return img.crossOrigin && (img.crossOrigin.toLowerCase() === 'anonymous' || img.crossOrigin.toLowerCase() === 'use-credentials');
      }

      /**
       * Does the given URL exist on a different domain than the current one?
       * This is done by comparing the URL to `document.domain`.
       *
       * @static
       * @param { String } url The URL to check.
       * @returns { Boolean }
       * @memberof IO
       */

    }, {
      key: 'isURLRemote',
      value: function isURLRemote(url) {
        var matches = url.match(this.domainRegex);
        return matches ? matches[1] !== document.domain : false;
      }

      /**
       * Checks to see if the URL is remote, and if there is a proxy defined
       *
       * @static
       * @param { String } src The URL to check.
       * @returns { String } The proxy URL if the image is remote. Nothing otherwise.
       * @memberof IO
       */

    }, {
      key: 'remoteCheck',
      value: function remoteCheck(src) {
        if (this.isURLRemote(src)) {
          if (!Caman.remoteProxy.length) {
            Log.info('Attempting to load a remote image without a configured proxy. URL: //' + src);
          } else {
            if (Caman.isURLRemote(Caman.remoteProxy)) {
              Log.info('Cannot use a remote proxy for loading images.');
              return;
            }
            return this.proxyUrl(src);
          }
        }
      }

      /**
       * Given a URL, get the proxy URL for it.
       *
       * @static
       * @param { String } src The URL to proxy.
       * @returns { String } The proxy URL.
       * @memberof IO
       */

    }, {
      key: 'proxyUrl',
      value: function proxyUrl(src) {
        return (Caman.remoteProxy ? Caman.remoteProxy : '') + ' //' + Caman.proxyParam + '=//' + encodeURIComponent(src);
      }

      /**
       * Shortcut for using one of the bundled proxies.
       *
       * @static
       * @param { String } lang String identifier for the proxy script language.
       * @returns { String } A proxy URL.
       * @memberof IO
       */

    }, {
      key: 'useProxy',
      value: function useProxy(lang) {
        var langToExt = {
          ruby: 'rb',
          python: 'py',
          perl: 'pl',
          javascript: 'js'
        };

        lang = lang.toLowerCase();
        lang = langToExt[lang] ? langToExt[lang] : lang;

        return 'proxies/caman_proxy.' + lang;
      }
    }]);
    return IO;
  }();

  Object.defineProperty(IO, 'domainRegex', {
    enumerable: true,
    writable: true,
    value: /(?:(?:http|https):\/\/)((?:\w+)\.(?:(?:\w|\.)+))/
  });

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
          case Filter.Type.LayerDequeue:
            var layer = this.c.canvasQueue.shift();
            this.c.executeLayer(layer);
            this.processNext();
            break;
          case Filter.Type.LayerFinished:
            this.c.applyCurrentLayer();
            this.c.popContext();
            this.processNext();
            break;
          case Filter.Type.LoadOverlay:
            this.loadOverlay(this.currentJob.layer, this.currentJob.src);
            break;
          case Filter.Type.Plugin:
            this.executePlugin();
            break;
          default:
            this.executeFilter();
        }
      }
    }, {
      key: 'execute',
      value: function execute(callback) {
        this.finishedFn = callback;
        this.modPixelData = Util.dataArray(this.c.pixelData.length);
        this.processNext();
      }
    }, {
      key: 'eachBlock',
      value: function eachBlock(fn) {
        var _this = this;

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
            fn.call(_this, i, start, end);
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

        if (this.currentJob.type === Filter.Type.Single) {
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
          if (this.currentJob.type === Filter.Type.Kernel) {
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

      // Loads an image onto the current canvas

    }, {
      key: 'loadOverlay',
      value: function loadOverlay(layer, src) {
        var _this2 = this;

        /* eslint-disable no-undef */
        var img = new Image();
        img.onload = function () {
          layer.context.drawImage(img, 0, 0, _this2.c.dimensions.width, _this2.c.dimensions.height);
          layer.imageData = layer.context.getImageData(0, 0, _this2.c.dimensions.width, _this2.c.dimensions.height);
          layer.pixelData = layer.imageData.data;

          _this2.c.pixelData = layer.pixelData;

          _this2.processNext();
        };

        var proxyUrl = IO.remoteCheck(src);
        img.src = proxyUrl || src;
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
      };this.layerID = Util.uniqid().get();

      // Create the canvas for this layer
      this.canvas = document.createElement('canvas');

      this.canvas.width = this.c.dimensions.width;
      this.canvas.height = this.c.dimensions.height;

      this.context = this.canvas.getContext('2d');
      this.context.createImageData(this.canvas.width, this.canvas.height);
      this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this.pixelData = this.imageData.data;
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

      // Loads and overlays an image onto this layer

    }, {
      key: 'overlayImage',
      value: function overlayImage(image) {
        if ((typeof image === 'undefined' ? 'undefined' : _typeof(image)) === 'object') {
          image = image.src;
        } else if (typeof image === 'string' && image[0] === '#') {
          image = $(image).src;
        }

        if (!image) {
          return this;
        }

        this.c.renderer.renderQueue.push({
          type: Filter.Type.LoadOverlay,
          src: image,
          layer: this
        });

        return this;
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
   * Initialization is tricky because we need to make sure everything we need is actually fully oaded in the DOM before proceeding. When initialized on an image, we need to make sure that the image is done loading before converting it to a canvas element and writing the pixel data. If we do this prematurely, the browser will throw a DOM Error, and chaos will ensue. In the event that we initialize Caman on a canvas element while specifying an image URL, we need to create a new image element, load the image, then continue with initialization.
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


      // @property [Boolean] Are we in a wechat mini program environment?


      // @proparty [String] The GET param used with the proxy script.


      // @property [String] Default cross-origin policy.


      // @property [Boolean] Debug mode enables console logging.
      value: function toString() {
        return 'Version ' + Caman.version.release + ', Released ' + Caman.version.date;
      }

      // Get the ID assigned to this canvas by Caman.
      // @param [DOMObject] canvas The canvas to inspect.
      // @return [String] The Caman ID associated with this canvas.


      // @property [Boolean] Should we check the DOM for images with Caman instructions?


      // @property [Boolean] Are we in a NodeJS environment?


      // @property [String] Set the URL of the image proxy script.


      // @property [Boolean] Allow reverting the canvas?
      // If your JS process is running out of memory, disabling
      // this could help drastically.

      // The current version.

    }, {
      key: 'getAttrId',
      value: function getAttrId(canvas) {
        if (Caman.NodeJS) {
          return true;
        }
        if (typeof canvas === 'string') {
          canvas = $(canvas);
        }
        if (canvas && canvas.getAttribute) {
          return canvas.getAttribute('data-caman-id');
        }
        return null;
      }

      /**
       * The Caman function. While technically a constructor, it was made to be called without the `new` keyword. Caman will figure it out.
       * @param { DOMObject | String } initializer The DOM selector or DOM object to initialize.
       * @overload Caman(initializer)
       *   Initialize Caman without a callback.
       *
       * @overload Caman(initializer, callback)
       *   Initialize Caman with a callback.
       *   @param [Function] callback Function to call once initialization completes.
       *
       * @overload Caman(initializer, url)
       *   Initialize Caman with a URL to an image and no callback.
       *   @param [String] url URl to an image to draw to the canvas.
       *
       * @overload Caman(initializer, url, callback)
       *   Initialize Caman with a canvas, URL to an image, and a callback.
       *   @param [String] url URl to an image to draw to the canvas.
       *   @param [Function] callback Function to call once initialization completes.
       *
       * @overload Caman(file)
       *   NodeJS: Initialize Caman with a path to an image file and no callback.
       *   @param [String, File] file File object or path to image to read.
       *
       * @overload Caman(file, callback)
       *   NodeJS: Initialize Caman with a file and a callback.
       *   @param [String, File] file File object or path to image to read.
       *   @param [Function] callback Function to call once initialization completes.
       * @return [Caman] Initialized Caman instance.
       * @memberof Caman
       */

    }]);

    function Caman() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      classCallCheck(this, Caman);

      if (args.length === 0) {
        throw new Error('Invalid arguments');
      }

      var _this = possibleConstructorReturn(this, (Caman.__proto__ || Object.getPrototypeOf(Caman)).call(this));

      if (_this instanceof Caman) {
        var _ret2;

        // We have to do this to avoid polluting the global scope
        // because of how Coffeescript binds functions specified
        // with => and the fact that Caman can be invoked as both
        // a function and as a 'new' object.
        _this.finishInit = _this.finishInit.bind(_this);
        _this.imageLoaded = _this.imageLoaded.bind(_this);

        if (!Caman.NodeJS) {
          var id = parseInt(Caman.getAttrId(args[0]), 10);
          var callback = void 0;
          if (typeof args[1] === 'function') {
            callback = args[1];
          } else if (typeof args[1] === 'function') {
            callback = args[2];
          } else {
            callback = noop;
          }

          if (!isNaN(id) && Store.has(id)) {
            var _ret;

            return _ret = Store.execute(id, callback), possibleConstructorReturn(_this, _ret);
          }
        }

        // Every instance gets a unique ID. Makes it much simpler to check if two variables are the same instance.
        _this.id = Util.uniqid().get();
        _this.initializedPixelData = _this.originalPixelData = null;
        _this.cropCoordinates = { x: 0, y: 0 };
        _this.cropped = false;
        _this.resized = false;

        _this.pixelStack = []; // Stores the pixel layers
        _this.layerStack = []; // Stores all of the layers waiting to be rendered
        _this.canvasQueue = []; // Stores all of the canvases to be processed
        _this.currentLayer = null;
        _this.scaled = false;

        _this.analyze = new Analyze(_this);
        _this.renderer = new Renderer(_this);

        _this.domIsLoaded(function () {
          _this.parseArguments(args);
          _this.setup();
        });
        return _ret2 = _this, possibleConstructorReturn(_this, _ret2);
      } else {
        var _ret3;

        return _ret3 = new (Function.prototype.bind.apply(Caman, [null].concat(args)))(), possibleConstructorReturn(_this, _ret3);
      }
      return _this;
    }

    /**
     * Checks to ensure the DOM is loaded. Ensures the callback is always fired, even if the DOM is already loaded before it's invoked. The callback is also always called asynchronously.
     *
     * @param { Function } cb The callback function to fire when the DOM is ready.
     * @memberof Caman
     */


    createClass(Caman, [{
      key: 'domIsLoaded',
      value: function domIsLoaded(cb) {
        var _this2 = this;

        if (Caman.NodeJS) {
          setTimeout(function () {
            cb.call(_this2);
          }, 0);
        } else {
          if (document.readyState === 'complete') {
            Log.debug('DOM initialized');
            setTimeout(function () {
              cb.call(_this2);
            }, 0);
          } else {
            var listener = function listener() {
              if (document.readyState === 'complete') {
                Log.debug('DOM initialized');
                cb.call(_this2);
              }
            };
            document.addEventListener('readystatechange', listener, false);
          }
        }
      }

      /**
       * Parses the arguments given to the Caman function, and sets the appropriate properties on this instance.
       *
       * @param { Array } args Array of arguments passed to Caman.
       * @memberof Caman
       */

    }, {
      key: 'parseArguments',
      value: function parseArguments(args) {
        if (args.length === 0) {
          throw new Error('Invalid arguments given');
        }

        // Defaults
        this.initObj = null;
        this.initType = null;
        this.imageUrl = null;
        this.callback = noop;

        // First argument is always our canvas/image
        this.setInitObject(args[0]);
        if (args.length === 1) {
          return;
        }

        switch (_typeof(args[1])) {
          case 'string':
            this.imageUrl = args[1];
            break;
          case 'function':
            this.callback = args[1];
            break;
        }

        if (args.length === 2) {
          return;
        }

        this.callback = args[2];

        if (args.length === 4) {
          for (var key in args[4]) {
            if (args[4].hasOwnProperty(key)) {
              this.options[key] = args[4][key];
            }
          }
        }
      }

      /**
       * Sets the initialization object for this instance.
       *
       * @param { Object | String } obj The initialization argument.
       * @memberof Caman
       */

    }, {
      key: 'setInitObject',
      value: function setInitObject(obj) {
        if (Caman.NodeJS) {
          this.initObj = obj;
          this.initType = 'node';
          return;
        }
        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
          this.initObj = obj;
        } else {
          this.initObj = $(obj);
        }

        if (!this.initObj) {
          throw new Error('Could not find image or canvas for initialization.');
        }

        this.initType = this.initObj.nodeName.toLowerCase();
      }

      /**
       * Begins the setup process, which differs depending on whether we're in NodeJS, or if an image or canvas object was provided.
       *
       * @memberof Caman
       */

    }, {
      key: 'setup',
      value: function setup() {
        console.log(this.initType);
        switch (this.initType) {
          case 'node':
            this.initNode();
            break;
          case 'img':
            this.initImage();
            break;
          case 'canvas':
            this.initCanvas();
            break;
        }
      }

      // Initialization function for NodeJS

    }, {
      key: 'initNode',
      value: function initNode() {}

      // Initialization function for the browser and image objects.

    }, {
      key: 'initImage',
      value: function initImage() {
        this.image = this.initObj;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        Util.copyAttributes(this.image, this.canvas, { except: ['src'] });

        // Swap out image with the canvas element if the image exists in the DOM.
        this.image.parentNode && this.image.parentNode.replaceChild(this.canvas, this.image);

        this.imageAdjustments();
        this.waitForImageLoaded();
      }

      // Initialization function for browser and canvas objects
      // TODO:

    }, {
      key: 'initCanvas',
      value: function initCanvas() {
        this.canvas = this.initObj;
        console.log(this.canvas);
        this.context = this.canvas.getContext('2d');

        if (this.imageUrl) {
          this.image = document.createElement('img');
          this.image.src = this.imageUrl;

          this.imageAdjustments();
          this.waitForImageLoaded();
        } else {
          this.finishInit();
        }
      }

      /**
       * Automatically check for a HiDPI capable screen and swap out the image if possible.
       * Also checks the image URL to see if it's a cross-domain request, and attempt to proxy the image. If a cross-origin type is configured, the proxy will be ignored.
       *
       * @memberof Caman
       */

    }, {
      key: 'imageAdjustments',
      value: function imageAdjustments() {
        if (IO.isRemote(this.image)) {
          this.image.src = IO.proxyUrl(this.image.src);
          Log.debug('Remote image detected, using URL = ' + this.image.src);
        }
      }

      // Utility function that fires {Caman#imageLoaded} once the image is finished loading.

    }, {
      key: 'waitForImageLoaded',
      value: function waitForImageLoaded() {
        if (this.isImageLoaded()) {
          this.imageLoaded();
        } else {
          this.image.onload = this.imageLoaded;
        }
      }

      /**
       * Checks if the given image is finished loading.
       * @returns { Boolean } Is the image loaded?
       * @memberof Caman
       */

    }, {
      key: 'isImageLoaded',
      value: function isImageLoaded() {
        if (!this.image.complete) {
          return false;
        }
        if (this.image.naturalWidth && this.image.naturalWidth === 0) {
          return false;
        }
        return true;
      }

      /**
       * Internet Explorer has issues figuring out image dimensions when they aren't explicitly defined, apparently. We check the normal width/height properties first, but fall back to natural sizes if they are 0.
       * @returns { Number } Width of the initialization image.
       * @memberof Caman
       */

    }, {
      key: 'imageWidth',
      value: function imageWidth() {
        return this.image.width || this.image.naturalWidth;
      }

      /**
       * @see Caman#imageWidth
       *
       * @returns { Number } Height of the initialization image.
       * @memberof Caman
       */

    }, {
      key: 'imageHeight',
      value: function imageHeight() {
        return this.image.height || this.image.naturalHeight;
      }

      /**
       * Function that is called once the initialization image is finished loading.
       * We make sure that the canvas dimensions are properly set here.
       *
       * @memberof Caman
       */

    }, {
      key: 'imageLoaded',
      value: function imageLoaded() {
        Log.debug('Image loaded. Width = ' + this.imageWidth() + ', Height = ' + this.imageHeight());

        this.canvas.width = this.imageWidth();
        this.canvas.height = this.imageHeight();

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
          this.context = this.canvas.getContext('2d');
        }

        this.originalWidth = this.preScaledWidth = this.width = this.canvas.width;
        this.originalHeight = this.preScaledHeight = this.height = this.canvas.height;

        if (!this.hasId()) {
          this.assignId();
        }

        if (this.image) {
          this.context.drawImage(this.image, 0, 0, this.imageWidth(), this.imageHeight(), 0, 0, this.preScaledWidth, this.preScaledHeight);
        }

        this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.pixelData = this.imageData.data;

        if (Caman.allowRevert) {
          this.initializedPixelData = Util.dataArray(this.pixelData.length);
          this.originalPixelData = Util.dataArray(this.pixelData.length);

          for (var i = 0; i < this.pixelData.length; i++) {
            var pixel = this.pixelData[i];
            this.initializedPixelData[i] = pixel;
            this.originalPixelData[i] = pixel;
          }
        }

        this.dimensions = {
          width: this.canvas.width,
          height: this.canvas.height
        };

        if (!Caman.NodeJS) {
          Store.put(this.id, this);
        }

        this.callback(this);

        // Reset the callback so re-initialization doesn't trigger it again.
        this.callback = noop;
      }

      /**
       * If you have a separate context reference to this canvas outside of CamanJS and you make a change to the canvas outside of CamanJS, you will have to call this function to update our context reference to include those changes.
       *
       * @memberof Caman
       */

    }, {
      key: 'reloadCanvasData',
      value: function reloadCanvasData() {
        this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.pixelData = this.imageData.data;
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
       * Does this instance have an ID assigned?
       * @returns { Boolean } Existance of an ID.
       * @memberof Caman
       */

    }, {
      key: 'hasId',
      value: function hasId() {
        return !!Caman.getAttrId(this.canvas);
      }
      /**
       * Assign a unique ID to this instance.
       *
       * @memberof Caman
       */

    }, {
      key: 'assignId',
      value: function assignId() {
        if (Caman.NodeJS || this.canvas.getAttribute('data-caman-id')) {
          return;
        }
        this.canvas.setAttribute('data-caman-id', this.id);
      }

      /**
       * Replaces the current canvas with a new one, and properly updates all of the applicable references for this instance.
       *
       * @param { DOMObject } newCanvas The canvas to swap into this instance.
       * @memberof Caman
       */

    }, {
      key: 'replaceCanvas',
      value: function replaceCanvas(newCanvas) {
        var oldCanvas = this.canvas;
        this.canvas = newCanvas;
        this.context = this.canvas.getContext('2d');

        if (!Caman.NodeJS) {
          oldCanvas.parentNode.replaceChild(this.canvas, oldCanvas);
        }

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.reloadCanvasData();

        this.dimensions = {
          width: this.canvas.width,
          height: this.canvas.height
        };
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

        this.renderer.execute(function () {
          _this3.context.putImageData(_this3.imageData, 0, 0);
          callback.call(_this3);
        });
      }

      /**
       * Reverts the canvas back to it's original state while
      # maintaining any cropped or resized dimensions.
       *
       * @param { Boolean } [updateContext=true] Should we apply the reverted pixel data to the canvas context thus triggering a re-render by the browser?
       * @memberof Caman
       */

    }, {
      key: 'revert',
      value: function revert() {
        var updateContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (!Caman.allowRevert) {
          throw new Error('Revert disabled');
        }

        var originalVisiblePixels = this.originalVisiblePixels();
        for (var i = 0, j = originalVisiblePixels.length; i < j; i++) {
          var pixel = originalVisiblePixels[i];
          this.pixelData[i] = pixel;
        }

        if (updateContext) {
          this.context.putImageData(this.imageData, 0, 0);
        }
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
        var canvas = document.createElement('canvas');
        Util.copyAttributes(this.canvas, canvas);

        canvas.width = this.originalWidth;
        canvas.height = this.originalHeight;

        var ctx = canvas.getContext('2d');
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var pixelData = imageData.data;

        for (var i = 0; i < this.initializedPixelData.length; i++) {
          var pixel = this.initializedPixelData[i];
          pixelData[i] = pixel;
        }

        ctx.putImageData(imageData, 0, 0);

        this.cropCoordinates = {
          x: 0,
          y: 0
        };
        this.resized = false;
        this.replaceCanvas(canvas);
      }

      /**
       * Returns the original pixel data while maintaining any cropping or resizing that may have occurred.
       * **Warning**: this is currently in beta status.
       * @returns { Array } Original pixel values still visible after cropping or resizing.
       * @memberof Caman
       */
      // TODO:

    }, {
      key: 'originalVisiblePixels',
      value: function originalVisiblePixels() {
        if (!Caman.allowRevert) {
          throw new Error('Revert disabled');
        }

        var pixels = [];
        return pixels;
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
          type: Filter.Type.Single,
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
          type: Filter.Type.Kernel,
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
          type: Filter.Type.Plugin,
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
        var layer = new Layer(this);
        this.canvasQueue.push(layer);
        this.renderer.add({
          type: Filter.Type.LayerDequeue
        });

        callback.call(layer);

        this.renderer.add({
          type: Filter.Type.LayerFinished
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

      /*
       * Grabs the canvas data, encodes it to Base64, then sets the browser location to the encoded data so that the user will be prompted to download it.
       * If we're in NodeJS, then we can save the image to disk.
       * @see Caman
       */

    }, {
      key: 'save',
      value: function save() {
        if (exports) {
          this.nodeSave.apply(this, arguments);
        } else {
          this.browserSave.apply(this, arguments);
        }
      }
    }, {
      key: 'browserSave',
      value: function browserSave() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'png';

        type = type.toLowerCase();
        // Force download (its a bit hackish)
        var image = this.toBase64(type).replace('image/' + type, 'image/octet-stream');
        document.location.href = image;
      }

      // nodeSave (file, overwrite = true, callback = null) {
      //   try {
      //     const stats = fs.statSync(file)
      //     if (stats.isFile() && !overwrite) {
      //       return false
      //     }
      //   } catch (e) {
      //     Log.debug(`Creating output file ${file}`)
      //   }

      //   fs.writeFile(file, this.canvas.toBuffer(), (err) => {
      //     Log.debug(`Finished writing to ${file}`)
      //     if (callback) {
      //       callback.call(this, err)
      //     }
      //   })
      // }

      /*
       * Takes the current canvas data, converts it to Base64, then sets it as the source of a new Image object and returns it.
       */

    }, {
      key: 'toImage',
      value: function toImage(type) {
        /* eslint-disable no-undef */
        var img = new Image();
        img.src = this.toBase64(type);
        img.width = this.dimensions.width;
        img.height = this.dimensions.height;

        if (window.devicePixelRatio) {
          img.width /= window.devicePixelRatio;
          img.height /= window.devicePixelRatio;
        }
        return img;
      }

      /*
      * Base64 encodes the current canvas
      */

    }, {
      key: 'toBase64',
      value: function toBase64() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'png';

        type = type.toLowerCase();
        return this.canvas.toDataURL('image/' + type);
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
  Object.defineProperty(Caman, 'DEBUG', {
    enumerable: true,
    writable: true,
    value: true
  });
  Object.defineProperty(Caman, 'allowRevert', {
    enumerable: true,
    writable: true,
    value: true
  });
  Object.defineProperty(Caman, 'crossOrigin', {
    enumerable: true,
    writable: true,
    value: 'anonymous'
  });
  Object.defineProperty(Caman, 'remoteProxy', {
    enumerable: true,
    writable: true,
    value: ''
  });
  Object.defineProperty(Caman, 'proxyParam', {
    enumerable: true,
    writable: true,
    value: 'camanProxyUrl'
  });
  Object.defineProperty(Caman, 'NodeJS', {
    enumerable: true,
    writable: true,
    value: typeof exports !== 'undefined'
  });
  Object.defineProperty(Caman, 'wechat', {
    enumerable: true,
    writable: true,
    value: typeof exports !== 'undefined'
  });
  Object.defineProperty(Caman, 'autoload', {
    enumerable: true,
    writable: true,
    value: !Caman.NodeJS
  });

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
      this.process('fillColor', function (rgba) {
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
      this.process('brightness', function (rgba) {
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
      this.process('saturation', function (rgba) {
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
      this.process('vibrance', function (rgba) {
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
      this.process('greyscale', function (rgba) {
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
      this.process('contrast', function (rgba) {
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
      this.process('hue', function (rgba) {
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

      this.process('colorize', function (rgba) {
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
      this.process('invert', function (rgba) {
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
      this.process('sepia', function (rgba) {
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
      this.process('gamma', function (rgba) {
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

      this.process('noise', function (rgba) {
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

      this.process('clip', function (rgba) {
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

      this.process('channels', function (rgba) {
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

      this.process('curves', function (rgba) {
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
      this.curves('rgb', [0, 0], ctrl1, ctrl2, [255, 255]);
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
      this.vignette('55%', 25);
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
      this.gamma(1.5);
      this.clip(25);
      this.saturation(-60);
      this.contrast(5);
      this.noise(5);
      this.vignette('50%', 30);
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
      this.greyscale();
      this.sepia(10);
      this.exposure(10);
      this.contrast(15);
      this.vignette('60%', 35);
    });

    Filter.register('oldBoot', function () {
      this.saturation(-20);
      this.vibrance(-50);
      this.gamma(1.1);
      this.sepia(30);
      this.channels({
        red: -10,
        blue: 5
      });
      this.curves('rgb', [0, 0], [80, 50], [128, 230], [255, 255]);
      return this.vignette('60%', 30);
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
        return this.filter.exposure(10);
      });
      this.newLayer(function () {
        this.setBlendingMode('softLight');
        this.opacity(80);
        return this.fillColor('#f49600');
      });
      this.exposure(20);
      this.gamma(0.8);
      if (vignette) {
        return this.vignette('45%', 20);
      }
    });

    Filter.register('hazyDays', function () {
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
      this.vignette('45%', 20);
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
        return this.newLayer(function () {
          this.setBlendingMode('normal');
          this.opacity(60);
          return this.fillColor('#ea1c5d');
        });
      });
      this.newLayer(function () {
        this.setBlendingMode('multiply');
        this.opacity(60);
        this.copyParent();
        this.filter.saturation(50);
        this.filter.hue(90);
        return this.filter.contrast(10);
      });
      this.gamma(1.4);
      this.vibrance(-30);
      this.newLayer(function () {
        this.opacity(10);
        return this.fillColor('#e5f0ff');
      });
      return this;
    });

    Filter.register('nostalgia', function () {
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
      this.vignette('50%', 30);
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
      return this.exposure(15);
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

  registerBlender(Blender);
  registerFilter(Filter);

  registerPlugin(Plugin);
  registerPluginFilter(Filter);

  return Caman;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtYW4uanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb3JlL21vZHVsZS5qcyIsIi4uL3NyYy9jb3JlL3V0aWwuanMiLCIuLi9zcmMvY29yZS9zdG9yZS5qcyIsIi4uL3NyYy9jb3JlL2FuYWx5emUuanMiLCIuLi9zcmMvY29yZS9ldmVudC5qcyIsIi4uL3NyYy9jb3JlL2ZpbHRlci5qcyIsIi4uL3NyYy9jb3JlL2xvZ2dlci5qcyIsIi4uL3NyYy9jb3JlL3BsdWdpbi5qcyIsIi4uL3NyYy9jb3JlL3BpeGVsLmpzIiwiLi4vc3JjL2NvcmUvaW8uanMiLCIuLi9zcmMvY29yZS9yZW5kZXJlci5qcyIsIi4uL3NyYy9jb3JlL2JsZW5kZXIuanMiLCIuLi9zcmMvY29yZS9sYXllci5qcyIsIi4uL3NyYy9jb3JlL2NhbWFuLmpzIiwiLi4vc3JjL2xpYi9ibGVuZGVycy5qcyIsIi4uL3NyYy9jb3JlL2NvbnZlcnQuanMiLCIuLi9zcmMvY29yZS9jYWxjdWxhdGUuanMiLCIuLi9zcmMvbGliL2ZpbHRlcnMuanMiLCIuLi9zcmMvbGliL2NhbWVyYS5qcyIsIi4uL3NyYy9saWIvYmx1ci5qcyIsIi4uL3NyYy9saWIvcG9zdGVyaXplLmpzIiwiLi4vc3JjL2xpYi9wcmVzZXRzLmpzIiwiLi4vc3JjL2xpYi9zdGFja0JsdXIuanMiLCIuLi9zcmMvbGliL3BsdWdpbnMuanMiLCIuLi9zcmMvY29yZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IG1vZHVsZUtleXdvcmRzID0gWydleHRlbmRlZCcsICdpbmNsdWRlZCddXG5cbi8qKlxuICogRm9yIHRoZSBwYXJ0cyBvZiB0aGlzIGNvZGUgYWRhcHRlZCBmcm9tIGh0dHA6Ly9hcmN0dXJvLmdpdGh1Yi5jb20vbGlicmFyeS9jb2ZmZWVzY3JpcHQvMDNfY2xhc3Nlcy5odG1sXG4gKiBiZWxvdyBpcyB0aGUgcmVxdWlyZWQgY29weXJpZ2h0IG5vdGljZS5cbiAqIENvcHlyaWdodCAoYykgMjAxMSBBbGV4YW5kZXIgTWFjQ2F3IChpbmZvQGVyaWJpdW0ub3JnKVxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIE1vZHVsZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2R1bGUge1xuICAvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0IGl0c2VsZiBsaWtlIGEgc3RhdGljIG1ldGhvZFxuICBzdGF0aWMgZXh0ZW5kcyAob2JqKSB7XG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgaWYgKG1vZHVsZUtleXdvcmRzLmluZGV4T2YgPT09IC0xKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IG9ialtrZXldXG4gICAgICB9XG4gICAgfVxuICAgIG9iai5leHRlbmRlZCAmJiBvYmouZXh0ZW5kZWQuYXBwbHkodGhpcylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gSW5jbHVkZSBtZXRob2RzIG9uIHRoZSBvYmplY3QgcHJvdG90eXBlXG4gIHN0YXRpYyBpbmNsdWRlcyAob2JqKSB7XG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgaWYgKG1vZHVsZUtleXdvcmRzLmluZGV4T2YgPT09IC0xKSB7XG4gICAgICAgIHRoaXMucHJvdG90eXBlW2tleV0gPSBvYmpba2V5XVxuICAgICAgfVxuICAgIH1cbiAgICBvYmouaW5jbHVkZWQgJiYgb2JqLmluY2x1ZGVkLmFwcGx5KHRoaXMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIEFkZCBtZXRob2RzIG9uIHRoaXMgcHJvdG90eXBlIHRoYXQgcG9pbnQgdG8gYW5vdGhlciBtZXRob2RcbiAgLy8gb24gYW5vdGhlciBvYmplY3QncyBwcm90b3R5cGUuXG4gIHN0YXRpYyBkZWxlZ2F0ZSAoLi4uYXJncykge1xuICAgIGNvbnN0IHRhcmdldCA9IGFyZ3MucG9wKClcbiAgICBmb3IgKGxldCBpIGluIGFyZ3MpIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IGFyZ3NbaV1cbiAgICAgIHRoaXMucHJvdG90eXBlW3NvdXJjZV0gPSB0YXJnZXQucHJvdG90eXBlW3NvdXJjZV1cbiAgICB9XG4gIH1cblxuICAvLyBDcmVhdGUgYW4gYWxpYXMgZm9yIGEgZnVuY3Rpb25cbiAgc3RhdGljIGFsaWFzRnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgdGhpcy5wcm90b3R5cGVbdG9dID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgIHRoaXMucHJvdG90eXBlW2Zyb21dLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgfVxuICB9XG5cbiAgLy8gQ3JlYXRlIGFuIGFsaWFzIGZvciBhIHByb3BlcnR5XG4gIHN0YXRpYyBhbGlhc1Byb3BlcnR5ICh0bywgZnJvbSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLnByb3RvdHlwZSwgdG8sIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbZnJvbV1cbiAgICAgIH0sXG4gICAgICBzZXQgKHZhbCkge1xuICAgICAgICB0aGlzW2Zyb21dID0gdmFsXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIEV4ZWN1dGUgYSBmdW5jdGlvbiBpbiB0aGUgY29udGV4dCBvZiB0aGUgb2JqZWN0LFxuICAvLyBhbmQgcGFzcyBhIHJlZmVyZW5jZSB0byB0aGUgb2JqZWN0J3MgcHJvdG90eXBlLlxuICBzdGF0aWMgaW5jbHVkZWQgKGZ1bmMpIHtcbiAgICBmdW5jLmNhbGwodGhpcywgdGhpcy5wcm90b3R5cGUpXG4gIH1cbn1cbiIsIi8vIERPTSBzaW1wbGlmaWVyIChubyBqUXVlcnkgZGVwZW5kZW5jeSlcbi8vIE5vZGVKUyBjb21wYXRpYmxlXG5leHBvcnQgY29uc3QgJCA9IChzZWwsIHJvb3QgPSBkb2N1bWVudCkgPT4ge1xuICBpZiAodHlwZW9mIHNlbCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHNlbFxuICB9XG4gIHJldHVybiByb290LnF1ZXJ5U2VsZWN0b3Ioc2VsKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCAoKSB7fVxuXG4vKipcbiAqXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIFV0aWxcbiAqL1xuZXhwb3J0IGNsYXNzIFV0aWwge1xuICBzdGF0aWMgdW5pcWlkICgpIHtcbiAgICBsZXQgaWQgPSAwXG4gICAgcmV0dXJuIHtcbiAgICAgIGdldCAoKSB7XG4gICAgICAgIHJldHVybiBpZCsrXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gSGVscGVyIGZ1bmN0aW9uIHRoYXQgZXh0ZW5kcyBvbmUgb2JqZWN0IHdpdGggYWxsIHRoZSBwcm9wZXJpZXMgb2Ygb3RoZXIgb2JqZWN0c1xuICBzdGF0aWMgZXh0ZW5kIChvYmosIC4uLnNyYykge1xuICAgIGNvbnN0IGRlc3QgPSBvYmpcbiAgICBmb3IgKGxldCBpIGluIHNyYykge1xuICAgICAgbGV0IGNvcHkgPSBzcmNbaV1cbiAgICAgIGZvciAobGV0IHByb3AgaW4gY29weSkge1xuICAgICAgICBpZiAoY29weS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgIGRlc3RbcHJvcF0gPSBjb3B5W3Byb3BdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVzdFxuICB9XG5cbiAgLy8gSW4gb3JkZXIgdG8gc3RheSB0cnVlIHRvIHRoZSBsYXRlc3Qgc3BlYywgUkdCIHZhbHVlcyBtdXN0IGJlIGNsYW1wZWQgYmV0d2VlbiAwIGFuZCAyNTUuIElmIHdlIGRvbid0IGRvIHRoaXMsIHdlaXJkIHRoaW5ncyBoYXBwZW4uXG4gIHN0YXRpYyBjbGFtcFJHQiAodmFsKSB7XG4gICAgaWYgKHZhbCA8IDApIHtcbiAgICAgIHJldHVybiAwXG4gICAgfVxuICAgIGlmICh2YWwgPiAyNTUpIHtcbiAgICAgIHJldHVybiAyNTVcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsXG4gIH1cblxuICBzdGF0aWMgY29weUF0dHJpYnV0ZXMgKGZyb20sIHRvLCBvcHRzID0ge30pIHtcbiAgICBmb3IgKGxldCBpIGluIGZyb20uYXR0cmlidXRlcykge1xuICAgICAgbGV0IGF0dHIgPSBmcm9tLmF0dHJpYnV0ZXNbaV1cbiAgICAgIGlmIChvcHRzLmV4Y2VwdCAmJiBvcHRzLmV4Y2VwdC5pbmRleE9mKGF0dHIubm9kZU5hbWUpICE9PSAtMSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgdG8uc2V0QXR0cmlidXRlKGF0dHIubm9kZU5hbWUsIGF0dHIubm9kZVZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIC8vIFN1cHBvcnQgZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3Qga25vdyBVaW50OEFycmF5IChzdWNoIGFzIElFOSlcbiAgc3RhdGljIGRhdGFBcnJheSAobGVuZ3RoID0gMCkge1xuICAgIGlmIChVaW50OEFycmF5KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIH1cbiAgICByZXR1cm4gbmV3IEFycmF5KGxlbmd0aClcbiAgfVxufVxuIiwiLyoqXG4gKiBVc2VkIGZvciBzdG9yaW5nIGluc3RhbmNlcyBvZiBDYW1hbkluc3RhbmNlIG9iamVjdHMgc3VjaCB0aGF0LCB3aGVuIENhbWFuKCkgaXMgY2FsbGVkIG9uIGFuIGFscmVhZHkgaW5pdGlhbGl6ZWQgZWxlbWVudCwgaXQgcmV0dXJucyB0aGF0IG9iamVjdCBpbnN0ZWFkIG9mIHJlLWluaXRpYWxpemluZy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgU3RvcmVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmUge1xuICBzdGF0aWMgaXRlbXMgPSB7fVxuXG4gIHN0YXRpYyBoYXMgKHNlYXJjaCkge1xuICAgIHJldHVybiAhIXRoaXMuaXRlbXNbc2VhcmNoXVxuICB9XG5cbiAgc3RhdGljIGdldCAoc2VhcmNoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXNbc2VhcmNoXVxuICB9XG5cbiAgc3RhdGljIHB1dCAobmFtZSwgb2JqKSB7XG4gICAgdGhpcy5pdGVtc1tuYW1lXSA9IG9ialxuICB9XG5cbiAgc3RhdGljIGV4ZWN1dGUgKHNlYXJjaCwgY2FsbGJhY2spIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcy5nZXQoc2VhcmNoKSwgdGhpcy5nZXQoc2VhcmNoKSlcbiAgICB9LCAwKVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0KHNlYXJjaClcbiAgfVxuXG4gIHN0YXRpYyBmbHVzaCAobmFtZSA9IGZhbHNlKSB7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLml0ZW1zW25hbWVdXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXRlbXMgPSB7fVxuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBWYXJpb3VzIGltYWdlIGFuYWx5c2lzIG1ldGhvZHNcbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQW5hbHl6ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbmFseXplIHtcbiAgY29uc3RydWN0b3IgKGMpIHtcbiAgICB0aGlzLmMgPSBjXG4gIH1cblxuICAvLyBAcmV0dXJuIHtPYmplY3R9IEhhc2ggb2YgUkdCIGNoYW5uZWxzIGFuZCB0aGUgb2NjdXJyZW5jZSBvZiBlYWNoIHZhbHVlXG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIG51bWJlciBvZiBvY2N1cnJlbmNlcyBvZiBlYWNoIGNvbG9yIHZhbHVlIHRocm91Z2hvdXQgdGhlIGltYWdlLlxuICAgKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBIYXNoIG9mIFJHQiBjaGFubmVscyBhbmQgdGhlIG9jY3VycmVuY2VzIG9mIGVhY2ggdmFsdWVcbiAgICogQG1lbWJlcm9mIEFuYWx5emVcbiAgICovXG4gIGNhbGN1bGF0ZUxldmVscyAoKSB7XG4gICAgY29uc3QgbGV2ZWxzID0ge1xuICAgICAgcjoge30sXG4gICAgICBnOiB7fSxcbiAgICAgIGI6IHt9XG4gICAgfVxuICAgIC8vIEluaXRpYWxpemUgYWxsIHZhbHVlcyB0byAwIGZpcnN0IHNvIHRoZXJlIGFyZSBubyBkYXRhIGdhcHNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAyNTU7IGkrKykge1xuICAgICAgbGV2ZWxzLnJbaV0gPSAwXG4gICAgICBsZXZlbHMuZ1tpXSA9IDBcbiAgICAgIGxldmVscy5iW2ldID0gMFxuICAgIH1cblxuICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIHBpeGVsIGJsb2NrIGFuZCBpbmNyZW1lbnQgdGhlIGxldmVsIGNvdW50ZXJzXG4gICAgZm9yIChsZXQgaSA9IDAsIGogPSB0aGlzLmMucGl4ZWxEYXRhLmxlbmd0aDsgaSA8IGo7IGkgKz0gNCkge1xuICAgICAgbGV2ZWxzLnJbdGhpcy5jLnBpeGVsRGF0YVtpXV0rK1xuICAgICAgbGV2ZWxzLmdbdGhpcy5jLnBpeGVsRGF0YVtpICsgMV1dKytcbiAgICAgIGxldmVscy5iW3RoaXMuYy5waXhlbERhdGFbaSArIDJdXSsrXG4gICAgfVxuXG4gICAgLy8gTm9ybWFsaXplIGFsbCBvZiB0aGUgbnVtYmVycyBieSBjb252ZXJ0aW5nIHRoZW0gdG8gcGVyY2VudGFnZXMgYmV0d2VlblxuICAgIC8vIDAgYW5kIDEuMFxuICAgIGNvbnN0IG51bVBpeGVscyA9IHRoaXMuYy5waXhlbERhdGEubGVuZ3RoIC8gNFxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMjU1OyBpKyspIHtcbiAgICAgIGxldmVscy5yW2ldIC89IG51bVBpeGVsc1xuICAgICAgbGV2ZWxzLmdbaV0gLz0gbnVtUGl4ZWxzXG4gICAgICBsZXZlbHMuYltpXSAvPSBudW1QaXhlbHNcbiAgICB9XG4gICAgcmV0dXJuIGxldmVsc1xuICB9XG59XG4iLCIvKipcbiAqIEV2ZW50IHN5c3RlbSB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlZ2lzdGVyIGNhbGxiYWNrcyB0aGF0IGdldCBmaXJlZCBkdXJpbmcgY2VydGFpbiB0aW1lcyBpbiB0aGUgcmVuZGVyIHByb2Nlc3MuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEV2ZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50IHtcbiAgc3RhdGljIGV2ZW50cyA9IHt9XG4gIC8vIEFsbCBvZiB0aGUgc3VwcG9ydGVkIGV2ZW50IHR5cGVzXG4gIHN0YXRpYyB0eXBlcyA9IFtcbiAgICAncHJvY2Vzc1N0YXJ0JyxcbiAgICAncHJvY2Vzc0NvbXBsZXRlJyxcbiAgICAncmVuZGVyU3RhcnQnLFxuICAgICdyZW5kZXJGaW5pc2hlZCcsXG4gICAgJ2Jsb2NrU3RhcnRlZCcsXG4gICAgJ2Jsb2NrRmluaXNoZWQnXG4gIF1cblxuICAvKipcbiAgICogVHJpZ2dlciBhbiBldmVudC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBDYW1hbiB9IHRhcmdldCBJbnN0YW5jZSBvZiBDYW1hbiBlbWl0dGluZyB0aGUgZXZlbnQuXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHR5cGUgVGhlIGV2ZW50IHR5cGUuXG4gICAqIEBwYXJhbSB7IE9iamVjdCB9IFtkYXRhPW51bGxdIEV4dHJhIGRhdGEgdG8gc2VuZCB3aXRoIHRoZSBldmVudC5cbiAgICogQG1lbWJlcm9mIEV2ZW50XG4gICAqL1xuICBzdGF0aWMgdHJpZ2dlciAodGFyZ2V0LCB0eXBlLCBkYXRhID0gbnVsbCkge1xuICAgIGlmICh0aGlzLmV2ZW50c1t0eXBlXSAmJiB0aGlzLmV2ZW50c1t0eXBlXS5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5ldmVudHNbdHlwZV0pIHtcbiAgICAgICAgbGV0IGV2ZW50ID0gdGhpcy5ldmVudHNbdHlwZV1baV1cbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gbnVsbCB8fCB0YXJnZXQuaWQgPT09IGV2ZW50LnRhcmdldC5pZCkge1xuICAgICAgICAgIGV2ZW50LmZuLmNhbGwodGFyZ2V0LCBkYXRhKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbiBmb3IgYW4gZXZlbnQuIE9wdGlvbmFsbHkgYmluZCB0aGUgbGlzdGVuIHRvIGEgc2luZ2xlIGluc3RhbmNlIG9yIGFsbCBpbnN0YW5jZXMuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG92ZXJsb2FkIGxpc3Rlbih0YXJnZXQsIHR5cGUsIGZuKVxuICAgKiBMaXN0ZW4gZm9yIGV2ZW50cyBlbWl0dGVkIGZyb20gYSBwYXJ0aWN1bGFyIENhbWFuIGluc3RhbmNlLlxuICAgKiBAcGFyYW0geyBDYW1hbiB9IHRhcmdldCBUaGUgaW5zdGFuY2UgdG8gbGlzdGVuIHRvLlxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSB0eXBlIFRoZSB0eXBlIG9mIGV2ZW50IHRvIGxpc3RlbiBmb3IuXG4gICAqIEBwYXJhbSB7IEZ1bmN0aW9uIH0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuICAgKlxuICAgKiBAb3ZlcmxvYWQgbGlzdGVuKHR5cGUsIGZuKVxuICAgKiBMaXN0ZW4gZm9yIGFuIGV2ZW50IGZyb20gYWxsIENhbWFuIGluc3RhbmNlcy5cbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gdHlwZSBUaGUgdHlwZSBvZiBldmVudCB0byBsaXN0ZW4gZm9yLlxuICAgKiBAcGFyYW0geyBGdW5jdGlvbiB9IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cbiAgICogQG1lbWJlcm9mIEV2ZW50XG4gICAqL1xuICBzdGF0aWMgbGlzdGVuICh0YXJnZXQsIHR5cGUsIGZuKSB7XG4gICAgLy8gQWRqdXN0IGFyZ3VtZW50cyBpZiB0YXJnZXQgaXMgb21pdHRlZFxuICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgX3R5cGUgPSB0YXJnZXRcbiAgICAgIGNvbnN0IF9mbiA9IHR5cGVcblxuICAgICAgdGFyZ2V0ID0gbnVsbFxuICAgICAgdHlwZSA9IF90eXBlXG5cbiAgICAgIGZuID0gX2ZuXG4gICAgfVxuXG4gICAgLy8gVmFsaWRhdGlvblxuICAgIGlmICh0aGlzLnR5cGVzLmluZGV4T2YodHlwZSkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZXZlbnRzW3R5cGVdKSB7XG4gICAgICB0aGlzLmV2ZW50c1t0eXBlXSA9IFtdXG4gICAgfVxuICAgIHRoaXMuZXZlbnRzW3R5cGVdLnB1c2goe3RhcmdldCwgZm59KVxuICAgIHJldHVybiB0cnVlXG4gIH1cbn1cbiIsImltcG9ydCBDYW1hbiBmcm9tICcuL2NhbWFuJ1xuXG4vKipcbiAqIFJlc3BvbnNpYmxlIGZvciByZWdpc3RlcmluZyBhbmQgc3RvcmluZyBhbGwgb2YgdGhlIGZpbHRlcnMuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEZpbHRlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWx0ZXIge1xuICAvLyBBbGwgb2YgdGhlIGRpZmZlcmVudCByZW5kZXIgb3BlcmF0aXZlc1xuICBzdGF0aWMgVHlwZSA9IHtcbiAgICBTaW5nbGU6IDEsXG4gICAgS2VybmVsOiAyLFxuICAgIExheWVyRGVxdWV1ZTogMyxcbiAgICBMYXllckZpbmlzaGVkOiA0LFxuICAgIExvYWRPdmVybGF5OiA1LFxuICAgIFBsdWdpbjogNlxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGZpbHRlciBmdW5jdGlvbi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBmaWx0ZXIuXG4gICAqIEBwYXJhbSB7IEZ1bmN0aW9uIH0gZmlsdGVyRnVuYyBUaGUgZmlsdGVyIGZ1bmN0aW9uLlxuICAgKiBAbWVtYmVyb2YgRmlsdGVyXG4gICAqL1xuICBzdGF0aWMgcmVnaXN0ZXIgKG5hbWUsIGZpbHRlckZ1bmMpIHtcbiAgICBDYW1hbi5wcm90b3R5cGVbbmFtZV0gPSBmaWx0ZXJGdW5jXG4gIH1cbn1cbiIsImltcG9ydCBDYW1hbiBmcm9tICcuL2NhbWFuJ1xuLyoqXG4gKiBTaW1wbGUgY29uc29sZSBsb2dnZXIgY2xhc3MgdGhhdCBjYW4gYmUgdG9nZ2xlZCBvbiBhbmQgb2ZmIGJhc2VkIG9uIENhbWFuLkRFQlVHXG4gKlxuICogQGNsYXNzIExvZ2dlclxuICovXG5jbGFzcyBMb2dnZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgY29uc3QgbG9nTGV2ZWwgPSBbJ2xvZycsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InXVxuICAgIGZvciAobGV0IGkgaW4gbG9nTGV2ZWwpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBsb2dMZXZlbFtpXVxuICAgICAgdGhpc1tuYW1lXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGlmICghQ2FtYW4uREVCVUcpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnNvbGVbbmFtZV0uYXBwbHkoY29uc29sZSwgYXJncylcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIFdlJ3JlIHByb2JhYmx5IHVzaW5nIElFOSBvciBlYXJsaWVyXG4gICAgICAgICAgY29uc29sZVtuYW1lXShhcmdzKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZGVidWcgPSB0aGlzLmxvZ1xuICB9XG59XG5cbmNvbnN0IExvZyA9IG5ldyBMb2dnZXIoKVxuZXhwb3J0IGRlZmF1bHQgTG9nXG4iLCIvKipcbiAqIFN0b3JlcyBhbmQgcmVnaXN0ZXJzIHN0YW5kYWxvbmUgcGx1Z2luc1xuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBQbHVnaW5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGx1Z2luIHtcbiAgc3RhdGljIHBsdWdpbnMgPSB7fVxuXG4gIHN0YXRpYyByZWdpc3RlciAobmFtZSwgcGx1Z2luKSB7XG4gICAgdGhpcy5wbHVnaW5zW25hbWVdID0gcGx1Z2luXG4gIH1cblxuICBzdGF0aWMgZXhlY3V0ZSAoY29udGV4dCwgbmFtZSwgYXJncykge1xuICAgIHRoaXMucGx1Z2luc1tuYW1lXS5hcHBseShjb250ZXh0LCBhcmdzKVxuICB9XG59XG4iLCIvKipcbiAqIFJlcHJlc2VudHMgYSBzaW5nbGUgUGl4ZWwgaW4gYW4gaW1hZ2UuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIFBpeGVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpeGVsIHtcbiAgc3RhdGljIGNvb3JkaW5hdGVzVG9Mb2NhdGlvbiAoeCwgeSwgd2lkdGgpIHtcbiAgICByZXR1cm4gKHkgKiB3aWR0aCArIHgpICogNFxuICB9XG4gIHN0YXRpYyBsb2NhdGlvblRvQ29vcmRpbmF0ZXMgKGxvYywgd2lkdGgpIHtcbiAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihsb2MgLyAod2lkdGggKiA0KSlcbiAgICBjb25zdCB4ID0gKGxvYyAlICh3aWR0aCAqIDQpKSAvIDRcblxuICAgIHJldHVybiB7eCwgeX1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yIChyID0gMCwgZyA9IDAsIGIgPSAwLCBhID0gMjU1LCBjID0gbnVsbCkge1xuICAgIHRoaXMubG9jID0gMFxuICAgIHRoaXMuciA9IHJcbiAgICB0aGlzLmcgPSBnXG4gICAgdGhpcy5iID0gYlxuICAgIHRoaXMuYSA9IGFcbiAgICB0aGlzLmMgPSBjXG4gIH1cblxuICBzZXRDb250ZXh0IChjKSB7XG4gICAgdGhpcy5jID0gY1xuICB9XG5cbiAgLy8gUmV0cmlldmVzIHRoZSBYLCBZIGxvY2F0aW9uIG9mIHRoZSBjdXJyZW50IHBpeGVsLiBUaGUgb3JpZ2luIGlzIGF0IHRoZSBib3R0b20gbGVmdCBjb3JuZXIgb2YgdGhlIGltYWdlLCBsaWtlIGEgbm9ybWFsIGNvb3JkaW5hdGUgc3lzdGVtLlxuICBsb2NhdGlvblhZICgpIHtcbiAgICBpZiAoIXRoaXMuYykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlcyBhIENhbWFuSlMgY29udGV4dCcpXG4gICAgfVxuICAgIGNvbnN0IHkgPSB0aGlzLmMuZGltZW5zaW9ucy5oZWlnaHQgLSBNYXRoLmZsb29yKHRoaXMubG9jIC8gKHRoaXMuYy5kaW1lbnNpb25zLndpZHRoICogNCkpXG4gICAgY29uc3QgeCA9ICh0aGlzLmxvYyAlICh0aGlzLmMuZGltZW5zaW9ucy53aWR0aCAqIDQpKSAvIDRcblxuICAgIHJldHVybiB7eCwgeX1cbiAgfVxuXG4gIHBpeGVsQXRMb2NhdGlvbiAobG9jKSB7XG4gICAgaWYgKCF0aGlzLmMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZXMgYSBDYW1hbkpTIGNvbnRleHQnKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUGl4ZWwoXG4gICAgICB0aGlzLmMucGl4ZWxEYXRhW2xvY10sXG4gICAgICB0aGlzLmMucGl4ZWxEYXRhW2xvYyArIDFdLFxuICAgICAgdGhpcy5jLnBpeGVsRGF0YVtsb2MgKyAyXSxcbiAgICAgIHRoaXMuYy5waXhlbERhdGFbbG9jICsgM10sXG4gICAgICB0aGlzLmNcbiAgICApXG4gIH1cblxuICAvLyBSZXR1cm5zIGFuIFJHQkEgb2JqZWN0IGZvciBhIHBpeGVsIHdob3NlIGxvY2F0aW9uIGlzIHNwZWNpZmllZCBpbiByZWxhdGlvbiB0byB0aGUgY3VycmVudCBwaXhlbC5cbiAgZ2V0UGl4ZWxSZWxhdGl2ZSAoaG9yaXosIHZlcnQpIHtcbiAgICBpZiAoIXRoaXMuYykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlcyBhIENhbWFuSlMgY29udGV4dCcpXG4gICAgfVxuXG4gICAgLy8gV2UgaW52ZXJ0IHRoZSB2ZXJ0X29mZnNldCBpbiBvcmRlciB0byBtYWtlIHRoZSBjb29yZGluYXRlIHN5c3RlbSBub24taW52ZXJ0ZWQuIEluIGxheW1hbnMgdGVybXM6IC0xIG1lYW5zIGRvd24gYW5kICsxIG1lYW5zIHVwLlxuICAgIGNvbnN0IG5ld0xvYyA9IHRoaXMubG9jICsgKHRoaXMuYy5kaW1lbnNpb25zLndpZHRoICogNCAqICh2ZXJ0ICogLTEpKSArICg0ICogaG9yaXopXG5cbiAgICBpZiAobmV3TG9jID4gdGhpcy5jLnBpeGVsRGF0YS5sZW5ndGggfHwgbmV3TG9jIDwgMCkge1xuICAgICAgcmV0dXJuIG5ldyBQaXhlbCgwLCAwLCAwLCAyNTUsIHRoaXMuYylcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5waXhlbEF0TG9jYXRpb24obmV3TG9jKVxuICB9XG5cbiAgLy8gVGhlIGNvdW50ZXJwYXJ0IHRvIGdldFBpeGVsUmVsYXRpdmUsIHRoaXMgdXBkYXRlcyB0aGUgdmFsdWUgb2YgYSBwaXhlbCB3aG9zZSBsb2NhdGlvbiBpcyBzcGVjaWZpZWQgaW4gcmVsYXRpb24gdG8gdGhlIGN1cnJlbnQgcGl4ZWwuXG4gIHN0YXRpYyBwdXRQaXhlbFJlbGF0aXZlIChob3JpeiwgdmVydCwgcmdiYSkge1xuICAgIGlmICghdGhpcy5jKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVpcmVzIGEgQ2FtYW5KUyBjb250ZXh0JylcbiAgICB9XG5cbiAgICBjb25zdCBuZXdMb2MgPSB0aGlzLmxvYyArICh0aGlzLmMuZGltZW5zaW9ucy53aWR0aCAqIDQgKiAodmVydCAqIC0xKSkgKyAoNCAqIGhvcml6KVxuXG4gICAgaWYgKG5ld0xvYyA+IHRoaXMuYy5waXhlbERhdGEubGVuZ3RoIHx8IG5ld0xvYyA8IDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuYy5waXhlbERhdGFbbmV3TG9jXSA9IHJnYmEuclxuICAgIHRoaXMuYy5waXhlbERhdGFbbmV3TG9jICsgMV0gPSByZ2JhLmdcbiAgICB0aGlzLmMucGl4ZWxEYXRhW25ld0xvYyArIDJdID0gcmdiYS5iXG4gICAgdGhpcy5jLnBpeGVsRGF0YVtuZXdMb2MgKyAzXSA9IHJnYmEuYVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8vIEdldHMgYW4gUkdCQSBvYmplY3QgZm9yIGFuIGFyYml0cmFyeSBwaXhlbCBpbiB0aGUgY2FudmFzIHNwZWNpZmllZCBieSBhYnNvbHV0ZSBYLCBZIGNvb3JkaW5hdGVzXG4gIGdldFBpeGVsICh4LCB5KSB7XG4gICAgaWYgKCF0aGlzLmMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZXMgYSBDYW1hbkpTIGNvbnRleHQnKVxuICAgIH1cblxuICAgIGNvbnN0IGxvYyA9IHRoaXMuY29vcmRpbmF0ZXNUb0xvY2F0aW9uKHgsIHksIHRoaXMud2lkdGgpXG4gICAgcmV0dXJuIHRoaXMucGl4ZWxBdExvY2F0aW9uKGxvYylcbiAgfVxuXG4gIC8vIFVwZGF0ZXMgdGhlIHBpeGVsIGF0IHRoZSBnaXZlbiBYLCBZIGNvb3JkaW5hdGVcbiAgcHV0UGl4ZWwgKHgsIHksIHJnYmEpIHtcbiAgICBpZiAoIXRoaXMuYykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlcyBhIENhbWFuSlMgY29udGV4dCcpXG4gICAgfVxuXG4gICAgY29uc3QgbG9jID0gdGhpcy5jb29yZGluYXRlc1RvTG9jYXRpb24oeCwgeSwgdGhpcy53aWR0aClcblxuICAgIHRoaXMuYy5waXhlbERhdGFbbG9jXSA9IHJnYmEuclxuICAgIHRoaXMuYy5waXhlbERhdGFbbG9jICsgMV0gPSByZ2JhLmdcbiAgICB0aGlzLmMucGl4ZWxEYXRhW2xvYyArIDJdID0gcmdiYS5iXG4gICAgdGhpcy5jLnBpeGVsRGF0YVtsb2MgKyAzXSA9IHJnYmEuYVxuICB9XG5cbiAgdG9TdHJpbmcgKCkge1xuICAgIHRoaXMudG9LZXkoKVxuICB9XG5cbiAgdG9IZXggKGluY2x1ZGVBbHBoYSA9IGZhbHNlKSB7XG4gICAgbGV0IGhleCA9IGAjJHt0aGlzLnIudG9TdHJpbmcoMTYpfSR7dGhpcy5nLnRvU3RyaW5nKDE2KX0ke3RoaXMuYi50b1N0cmluZygxNil9YFxuXG4gICAgaWYgKGluY2x1ZGVBbHBoYSkge1xuICAgICAgaGV4ICs9IHRoaXMuYS50b1N0cmluZygxNilcbiAgICB9XG4gICAgcmV0dXJuIGhleFxuICB9XG59XG4iLCJpbXBvcnQgQ2FtYW4gZnJvbSAnLi9jYW1hbidcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2dnZXInXG5cbi8qKlxuICogVmFyaW91cyBJL08gYmFzZWQgb3BlcmF0aW9uc1xuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBJT1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJTyB7XG4gIC8vIFVzZWQgZm9yIHBhcnNpbmcgaW1hZ2UgVVJMcyBmb3IgZG9tYWluIG5hbWVzLlxuICBzdGF0aWMgZG9tYWluUmVnZXggPSAvKD86KD86aHR0cHxodHRwcyk6XFwvXFwvKSgoPzpcXHcrKVxcLig/Oig/Olxcd3xcXC4pKykpL1xuXG4gIC8qKlxuICAgKiBJcyB0aGUgZ2l2ZW4gVVJMIHJlbW90ZT9cbiAgICogSWYgYSBjcm9zcy1vcmlnaW4gc2V0dGluZyBpcyBzZXQsIHdlIGFzc3VtZSB5b3UgaGF2ZSBDT1JTIHByb3Blcmx5IGNvbmZpZ3VyZWQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgRE9NT2JqZWN0IH0gaW1nIFRoZSBpbWFnZSB0byBjaGVjay5cbiAgICogQHJldHVybnMgeyBCb29sZWFuIH1cbiAgICogQG1lbWJlcm9mIElPXG4gICAqL1xuICBzdGF0aWMgaXNSZW1vdGUgKGltZykge1xuICAgIGlmICghaW1nKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKHRoaXMuY29yc0VuYWJsZWQoaW1nKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmlzVVJMUmVtb3RlKGltZy5zcmMpXG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYW4gaW1hZ2UsIHdlIGNoZWNrIHRvIHNlZSBpZiBhIENPUlMgcG9saWN5IGhhcyBiZWVuIGRlZmluZWQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgRE9NT2JqZWN0IH0gaW1nIFRoZSBpbWFnZSB0byBjaGVjay5cbiAgICogQHJldHVybnMgeyBCb29sZWFuIH1cbiAgICogQG1lbWJlcm9mIElPXG4gICAqL1xuICBzdGF0aWMgY29yc0VuYWJsZWQgKGltZykge1xuICAgIHJldHVybiBpbWcuY3Jvc3NPcmlnaW4gJiYgKGltZy5jcm9zc09yaWdpbi50b0xvd2VyQ2FzZSgpID09PSAnYW5vbnltb3VzJyB8fCBpbWcuY3Jvc3NPcmlnaW4udG9Mb3dlckNhc2UoKSA9PT0gJ3VzZS1jcmVkZW50aWFscycpXG4gIH1cblxuICAvKipcbiAgICogRG9lcyB0aGUgZ2l2ZW4gVVJMIGV4aXN0IG9uIGEgZGlmZmVyZW50IGRvbWFpbiB0aGFuIHRoZSBjdXJyZW50IG9uZT9cbiAgICogVGhpcyBpcyBkb25lIGJ5IGNvbXBhcmluZyB0aGUgVVJMIHRvIGBkb2N1bWVudC5kb21haW5gLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHVybCBUaGUgVVJMIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7IEJvb2xlYW4gfVxuICAgKiBAbWVtYmVyb2YgSU9cbiAgICovXG4gIHN0YXRpYyBpc1VSTFJlbW90ZSAodXJsKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IHVybC5tYXRjaCh0aGlzLmRvbWFpblJlZ2V4KVxuICAgIHJldHVybiBtYXRjaGVzID8gbWF0Y2hlc1sxXSAhPT0gZG9jdW1lbnQuZG9tYWluIDogZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBVUkwgaXMgcmVtb3RlLCBhbmQgaWYgdGhlcmUgaXMgYSBwcm94eSBkZWZpbmVkXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gc3JjIFRoZSBVUkwgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHsgU3RyaW5nIH0gVGhlIHByb3h5IFVSTCBpZiB0aGUgaW1hZ2UgaXMgcmVtb3RlLiBOb3RoaW5nIG90aGVyd2lzZS5cbiAgICogQG1lbWJlcm9mIElPXG4gICAqL1xuICBzdGF0aWMgcmVtb3RlQ2hlY2sgKHNyYykge1xuICAgIGlmICh0aGlzLmlzVVJMUmVtb3RlKHNyYykpIHtcbiAgICAgIGlmICghQ2FtYW4ucmVtb3RlUHJveHkubGVuZ3RoKSB7XG4gICAgICAgIExvZy5pbmZvKGBBdHRlbXB0aW5nIHRvIGxvYWQgYSByZW1vdGUgaW1hZ2Ugd2l0aG91dCBhIGNvbmZpZ3VyZWQgcHJveHkuIFVSTDogLy8ke3NyY31gKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKENhbWFuLmlzVVJMUmVtb3RlKENhbWFuLnJlbW90ZVByb3h5KSkge1xuICAgICAgICAgIExvZy5pbmZvKCdDYW5ub3QgdXNlIGEgcmVtb3RlIHByb3h5IGZvciBsb2FkaW5nIGltYWdlcy4nKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnByb3h5VXJsKHNyYylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYSBVUkwsIGdldCB0aGUgcHJveHkgVVJMIGZvciBpdC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBzcmMgVGhlIFVSTCB0byBwcm94eS5cbiAgICogQHJldHVybnMgeyBTdHJpbmcgfSBUaGUgcHJveHkgVVJMLlxuICAgKiBAbWVtYmVyb2YgSU9cbiAgICovXG4gIHN0YXRpYyBwcm94eVVybCAoc3JjKSB7XG4gICAgcmV0dXJuIGAke0NhbWFuLnJlbW90ZVByb3h5ID8gQ2FtYW4ucmVtb3RlUHJveHkgOiAnJ30gLy8ke0NhbWFuLnByb3h5UGFyYW19PS8vJHtlbmNvZGVVUklDb21wb25lbnQoc3JjKX1gXG4gIH1cblxuICAvKipcbiAgICogU2hvcnRjdXQgZm9yIHVzaW5nIG9uZSBvZiB0aGUgYnVuZGxlZCBwcm94aWVzLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IGxhbmcgU3RyaW5nIGlkZW50aWZpZXIgZm9yIHRoZSBwcm94eSBzY3JpcHQgbGFuZ3VhZ2UuXG4gICAqIEByZXR1cm5zIHsgU3RyaW5nIH0gQSBwcm94eSBVUkwuXG4gICAqIEBtZW1iZXJvZiBJT1xuICAgKi9cbiAgc3RhdGljIHVzZVByb3h5IChsYW5nKSB7XG4gICAgY29uc3QgbGFuZ1RvRXh0ID0ge1xuICAgICAgcnVieTogJ3JiJyxcbiAgICAgIHB5dGhvbjogJ3B5JyxcbiAgICAgIHBlcmw6ICdwbCcsXG4gICAgICBqYXZhc2NyaXB0OiAnanMnXG4gICAgfVxuXG4gICAgbGFuZyA9IGxhbmcudG9Mb3dlckNhc2UoKVxuICAgIGxhbmcgPSBsYW5nVG9FeHRbbGFuZ10gPyBsYW5nVG9FeHRbbGFuZ10gOiBsYW5nXG5cbiAgICByZXR1cm4gYHByb3hpZXMvY2FtYW5fcHJveHkuJHtsYW5nfWBcbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnXG5pbXBvcnQgRmlsdGVyIGZyb20gJy4vZmlsdGVyJ1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4vdXRpbCdcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2dnZXInXG5pbXBvcnQgUGx1Z2luIGZyb20gJy4vcGx1Z2luJ1xuaW1wb3J0IFBpeGVsIGZyb20gJy4vcGl4ZWwnXG5pbXBvcnQgSU8gZnJvbSAnLi9pbydcbi8qKlxuICogSGFuZGxlcyBhbGwgb2YgdGhlIHZhcmlvdXMgcmVuZGVyaW5nIG1ldGhvZHMgaW4gQ2FtYW4uIE1vc3Qgb2YgdGhlIGltYWdlIG1vZGlmaWNhdGlvbiBoYXBwZW5zIGhlcmUuIEEgbmV3IFJlbmRlcmVyIG9iamVjdCBpcyBjcmVhdGVkIGZvciBldmVyeSByZW5kZXIgb3BlcmF0aW9uLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBSZW5kZXJlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlciB7XG4gIC8vIFRoZSBudW1iZXIgb2YgYmxvY2tzIHRvIHNwbGl0IHRoZSBpbWFnZSBpbnRvIGR1cmluZyB0aGUgcmVuZGVyIHByb2Nlc3MgdG8gc2ltdWxhdGUgY29uY3VycmVuY3kuIFRoaXMgYWxzbyBoZWxwcyB0aGUgYnJvd3NlciBtYW5hZ2UgdGhlIChwb3NzaWJseSkgbG9uZyBydW5uaW5nIHJlbmRlciBqb2JzLlxuICBzdGF0aWMgQmxvY2tzID0gNFxuXG4gIGNvbnN0cnVjdG9yIChjKSB7XG4gICAgdGhpcy5jID0gY1xuICAgIHRoaXMucmVuZGVyUXVldWUgPSBbXVxuICAgIHRoaXMubW9kUGl4ZWxEYXRhID0gbnVsbFxuICB9XG5cbiAgYWRkIChqb2IpIHtcbiAgICBpZiAoIWpvYikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMucmVuZGVyUXVldWUucHVzaChqb2IpXG4gIH1cblxuICAvLyBHcmFicyB0aGUgbmV4dCBvcGVyYXRpb24gZnJvbSB0aGUgcmVuZGVyIHF1ZXVlIGFuZCBwYXNzZXMgaXQgdG8gUmVuZGVyZXIgZm9yIGV4ZWN1dGlvblxuICBwcm9jZXNzTmV4dCAoKSB7XG4gICAgLy8gSWYgdGhlIHF1ZXVlIGlzIGVtcHR5LCBmaXJlIHRoZSBmaW5pc2hlZCBjYWxsYmFja1xuICAgIGlmICh0aGlzLnJlbmRlclF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgRXZlbnQudHJpZ2dlcih0aGlzLCAncmVuZGVyRmluaXNoZWQnKVxuICAgICAgdGhpcy5maW5pc2hlZEZuICYmIHRoaXMuZmluaXNoZWRGbi5jYWxsKHRoaXMuYylcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHRoaXMuY3VycmVudEpvYiA9IHRoaXMucmVuZGVyUXVldWUuc2hpZnQoKVxuXG4gICAgc3dpdGNoICh0aGlzLmN1cnJlbnRKb2IudHlwZSkge1xuICAgICAgY2FzZSBGaWx0ZXIuVHlwZS5MYXllckRlcXVldWU6XG4gICAgICAgIGNvbnN0IGxheWVyID0gdGhpcy5jLmNhbnZhc1F1ZXVlLnNoaWZ0KClcbiAgICAgICAgdGhpcy5jLmV4ZWN1dGVMYXllcihsYXllcilcbiAgICAgICAgdGhpcy5wcm9jZXNzTmV4dCgpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIEZpbHRlci5UeXBlLkxheWVyRmluaXNoZWQ6XG4gICAgICAgIHRoaXMuYy5hcHBseUN1cnJlbnRMYXllcigpXG4gICAgICAgIHRoaXMuYy5wb3BDb250ZXh0KClcbiAgICAgICAgdGhpcy5wcm9jZXNzTmV4dCgpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIEZpbHRlci5UeXBlLkxvYWRPdmVybGF5OlxuICAgICAgICB0aGlzLmxvYWRPdmVybGF5KHRoaXMuY3VycmVudEpvYi5sYXllciwgdGhpcy5jdXJyZW50Sm9iLnNyYylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgRmlsdGVyLlR5cGUuUGx1Z2luOlxuICAgICAgICB0aGlzLmV4ZWN1dGVQbHVnaW4oKVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5leGVjdXRlRmlsdGVyKClcbiAgICB9XG4gIH1cblxuICBleGVjdXRlIChjYWxsYmFjaykge1xuICAgIHRoaXMuZmluaXNoZWRGbiA9IGNhbGxiYWNrXG4gICAgdGhpcy5tb2RQaXhlbERhdGEgPSBVdGlsLmRhdGFBcnJheSh0aGlzLmMucGl4ZWxEYXRhLmxlbmd0aClcbiAgICB0aGlzLnByb2Nlc3NOZXh0KClcbiAgfVxuXG4gIGVhY2hCbG9jayAoZm4pIHtcbiAgICAvLyBQcmVwYXJlIGFsbCB0aGUgcmVxdWlyZWQgcmVuZGVyIGRhdGFcbiAgICB0aGlzLmJsb2Nrc0RvbmUgPSAwXG5cbiAgICBjb25zdCBuID0gdGhpcy5jLnBpeGVsRGF0YS5sZW5ndGhcbiAgICBjb25zdCBibG9ja1BpeGVsTGVuZ3RoID0gTWF0aC5mbG9vcigobiAvIDQpIC8gUmVuZGVyZXIuQmxvY2tzKVxuICAgIGNvbnN0IGJsb2NrTiA9IGJsb2NrUGl4ZWxMZW5ndGggKiA0XG4gICAgY29uc3QgbGFzdEJsb2NrTiA9IGJsb2NrTiArICgobiAvIDQpICUgUmVuZGVyZXIuQmxvY2tzKSAqIDRcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUmVuZGVyZXIuQmxvY2tzOyBpKyspIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gaSAqIGJsb2NrTlxuICAgICAgY29uc3QgZW5kID0gc3RhcnQgKyAoaSA9PT0gUmVuZGVyZXIuQmxvY2tzIC0gMSA/IGxhc3RCbG9ja04gOiBibG9ja04pXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZm4uY2FsbCh0aGlzLCBpLCBzdGFydCwgZW5kKVxuICAgICAgfSwgMClcbiAgICB9XG4gIH1cblxuICAvLyBUaGUgY29yZSBvZiB0aGUgaW1hZ2UgcmVuZGVyaW5nLCB0aGlzIGZ1bmN0aW9uIGV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmaWx0ZXIuXG4gIC8vIE5PVEU6IHRoaXMgZG9lcyBub3Qgd3JpdGUgdGhlIHVwZGF0ZWQgcGl4ZWwgZGF0YSB0byB0aGUgY2FudmFzLiBUaGF0IGhhcHBlbnMgd2hlbiBhbGwgZmlsdGVycyBhcmUgZmluaXNoZWQgcmVuZGVyaW5nIGluIG9yZGVyIHRvIGJlIGFzIGZhc3QgYXMgcG9zc2libGUuXG4gIGV4ZWN1dGVGaWx0ZXIgKCkge1xuICAgIEV2ZW50LnRyaWdnZXIodGhpcy5jLCAncHJvY2Vzc1N0YXJ0JywgdGhpcy5jdXJyZW50Sm9iKVxuXG4gICAgaWYgKHRoaXMuY3VycmVudEpvYi50eXBlID09PSBGaWx0ZXIuVHlwZS5TaW5nbGUpIHtcbiAgICAgIHRoaXMuZWFjaEJsb2NrKHRoaXMucmVuZGVyQmxvY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWFjaEJsb2NrKHRoaXMucmVuZGVyS2VybmVsKVxuICAgIH1cbiAgfVxuXG4gIC8vIEV4ZWN1dGVzIGEgc3RhbmRhbG9uZSBwbHVnaW5cbiAgZXhlY3V0ZVBsdWdpbiAoKSB7XG4gICAgTG9nLmRlYnVnKGBFeGVjdXRpbmcgcGx1Z2luICR7dGhpcy5jdXJyZW50Sm9iLnBsdWdpbn1gKVxuICAgIFBsdWdpbi5leGVjdXRlKHRoaXMuYywgdGhpcy5jdXJyZW50Sm9iLnBsdWdpbiwgdGhpcy5jdXJyZW50Sm9iLmFyZ3MpXG4gICAgTG9nLmRlYnVnKGBQbHVnaW4gJHt0aGlzLmN1cnJlbnRKb2IucGx1Z2lufSBmaW5pc2hlZCFgKVxuXG4gICAgdGhpcy5wcm9jZXNzTmV4dCgpXG4gIH1cblxuICAvLyBSZW5kZXJzIGEgc2luZ2xlIGJsb2NrIG9mIHRoZSBjYW52YXMgd2l0aCB0aGUgY3VycmVudCBmaWx0ZXIgZnVuY3Rpb25cbiAgcmVuZGVyQmxvY2sgKGJudW0sIHN0YXJ0LCBlbmQpIHtcbiAgICBMb2cuZGVidWcoYEJsb2NrICMke2JudW19IC0gRmlsdGVyOiAke3RoaXMuY3VycmVudEpvYi5uYW1lfSwgU3RhcnQ6ICR7c3RhcnR9LCBFbmQ6ICR7ZW5kfWApXG4gICAgRXZlbnQudHJpZ2dlcih0aGlzLmMsICdibG9ja1N0YXJ0ZWQnLCB7XG4gICAgICBibG9ja051bTogYm51bSxcbiAgICAgIHRvdGFsQmxvY2tzOiBSZW5kZXJlci5CbG9ja3MsXG4gICAgICBzdGFydFBpeGVsOiBzdGFydCxcbiAgICAgIGVuZFBpeGVsOiBlbmRcbiAgICB9KVxuXG4gICAgY29uc3QgcGl4ZWwgPSBuZXcgUGl4ZWwoKVxuICAgIHBpeGVsLnNldENvbnRleHQodGhpcy5jKVxuXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDQpIHtcbiAgICAgIHBpeGVsLmxvYyA9IGlcblxuICAgICAgcGl4ZWwuciA9IHRoaXMuYy5waXhlbERhdGFbaV1cbiAgICAgIHBpeGVsLmcgPSB0aGlzLmMucGl4ZWxEYXRhW2kgKyAxXVxuICAgICAgcGl4ZWwuYiA9IHRoaXMuYy5waXhlbERhdGFbaSArIDJdXG4gICAgICBwaXhlbC5hID0gdGhpcy5jLnBpeGVsRGF0YVtpICsgM11cblxuICAgICAgdGhpcy5jdXJyZW50Sm9iLnByb2Nlc3NGbihwaXhlbClcblxuICAgICAgdGhpcy5jLnBpeGVsRGF0YVtpXSA9IFV0aWwuY2xhbXBSR0IocGl4ZWwucilcbiAgICAgIHRoaXMuYy5waXhlbERhdGFbaSArIDFdID0gVXRpbC5jbGFtcFJHQihwaXhlbC5nKVxuICAgICAgdGhpcy5jLnBpeGVsRGF0YVtpICsgMl0gPSBVdGlsLmNsYW1wUkdCKHBpeGVsLmIpXG4gICAgICB0aGlzLmMucGl4ZWxEYXRhW2kgKyAzXSA9IFV0aWwuY2xhbXBSR0IocGl4ZWwuYSlcbiAgICB9XG5cbiAgICB0aGlzLmJsb2NrRmluaXNoZWQoYm51bSlcbiAgfVxuXG4gIC8vIEFwcGxpZXMgYW4gaW1hZ2Uga2VybmVsIHRvIHRoZSBjYW52YXNcbiAgcmVuZGVyS2VybmVsIChibnVtLCBzdGFydCwgZW5kKSB7XG4gICAgY29uc3QgYmlhcyA9IHRoaXMuY3VycmVudEpvYi5iaWFzXG4gICAgY29uc3QgZGl2aXNvciA9IHRoaXMuY3VycmVudEpvYi5kaXZpc29yXG4gICAgY29uc3QgbiA9IHRoaXMuYy5waXhlbERhdGEubGVuZ3RoXG5cbiAgICBjb25zdCBhZGp1c3QgPSB0aGlzLmN1cnJlbnRKb2IuYWRqdXN0XG4gICAgY29uc3QgYWRqdXN0U2l6ZSA9IE1hdGguc3FydChhZGp1c3QubGVuZ3RoKVxuXG4gICAgY29uc3Qga2VybmVsID0gW11cblxuICAgIExvZy5kZWJ1ZyhgUmVuZGVyaW5nIGtlcm5lbCAtIEZpbHRlcjogJHt0aGlzLmN1cnJlbnRKb2IubmFtZX1gKVxuXG4gICAgc3RhcnQgPSBNYXRoLm1heChzdGFydCwgdGhpcy5jLmRpbWVuc2lvbnMud2lkdGggKiA0ICogKChhZGp1c3RTaXplIC0gMSkgLyAyKSlcbiAgICBlbmQgPSBNYXRoLm1pbihlbmQsIG4gLSAodGhpcy5jLmRpbWVuc2lvbnMud2lkdGggKiA0ICogKChhZGp1c3RTaXplIC0gMSkgLyAyKSkpXG5cbiAgICBjb25zdCBidWlsZGVyID0gKGFkanVzdFNpemUgLSAxKSAvIDJcblxuICAgIGNvbnN0IHBpeGVsID0gbmV3IFBpeGVsKClcbiAgICBwaXhlbC5zZXRDb250ZXh0KHRoaXMuYylcblxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSA0KSB7XG4gICAgICBwaXhlbC5sb2MgPSBpXG4gICAgICBsZXQgYnVpbGRlckluZGV4ID0gMFxuXG4gICAgICBmb3IgKGxldCBqID0gLWJ1aWxkZXI7IGogPD0gYnVpbGRlcjsgaisrKSB7XG4gICAgICAgIGZvciAobGV0IGsgPSBidWlsZGVyOyBrID49IC1idWlsZGVyOyBrLS0pIHtcbiAgICAgICAgICBsZXQgcCA9IHBpeGVsLmdldFBpeGVsUmVsYXRpdmUoaiwgaylcbiAgICAgICAgICBrZXJuZWxbYnVpbGRlckluZGV4ICogM10gPSBwLnJcbiAgICAgICAgICBrZXJuZWxbYnVpbGRlckluZGV4ICogMyArIDFdID0gcC5nXG4gICAgICAgICAga2VybmVsW2J1aWxkZXJJbmRleCAqIDMgKyAyXSA9IHAuYlxuICAgICAgICAgIGJ1aWxkZXJJbmRleCsrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzID0gdGhpcy5wcm9jZXNzS2VybmVsKGFkanVzdCwga2VybmVsLCBkaXZpc29yLCBiaWFzKVxuXG4gICAgICB0aGlzLm1vZFBpeGVsRGF0YVtpXSA9IFV0aWwuY2xhbXBSR0IocmVzLnIpXG4gICAgICB0aGlzLm1vZFBpeGVsRGF0YVtpICsgMV0gPSBVdGlsLmNsYW1wUkdCKHJlcy5nKVxuICAgICAgdGhpcy5tb2RQaXhlbERhdGFbaSArIDJdID0gVXRpbC5jbGFtcFJHQihyZXMuYilcbiAgICAgIHRoaXMubW9kUGl4ZWxEYXRhW2kgKyAzXSA9IHRoaXMuYy5waXhlbERhdGFbaSArIDNdXG4gICAgfVxuXG4gICAgdGhpcy5ibG9ja0ZpbmlzaGVkKGJudW0pXG4gIH1cblxuICAvLyBDYWxsZWQgd2hlbiBhIHNpbmdsZSBibG9jayBpcyBmaW5pc2hlZCByZW5kZXJpbmcuIE9uY2UgYWxsIGJsb2NrcyBhcmUgZG9uZSwgd2Ugc2lnbmFsIHRoYXQgdGhpcyBmaWx0ZXIgaXMgZmluaXNoZWQgcmVuZGVyaW5nIGFuZCBjb250aW51ZSB0byB0aGUgbmV4dCBzdGVwLlxuICBibG9ja0ZpbmlzaGVkIChibnVtKSB7XG4gICAgaWYgKGJudW0gPj0gMCkge1xuICAgICAgTG9nLmRlYnVnKGBCbG9jayAjJHtibnVtfSBmaW5pc2hlZCEgRmlsdGVyOiAke3RoaXMuY3VycmVudEpvYi5uYW1lfWApXG4gICAgfVxuICAgIHRoaXMuYmxvY2tzRG9uZSsrXG5cbiAgICBFdmVudC50cmlnZ2VyKHRoaXMuYywgJ2Jsb2NrRmluaXNoZWQnLCB7XG4gICAgICBibG9ja051bTogYm51bSxcbiAgICAgIGJsb2Nrc0ZpbmlzaGVkOiB0aGlzLmJsb2Nrc0RvbmUsXG4gICAgICB0b3RhbEJsb2NrczogUmVuZGVyZXIuQmxvY2tzXG4gICAgfSlcblxuICAgIGlmICh0aGlzLmJsb2Nrc0RvbmUgPT09IFJlbmRlcmVyLkJsb2Nrcykge1xuICAgICAgaWYgKHRoaXMuY3VycmVudEpvYi50eXBlID09PSBGaWx0ZXIuVHlwZS5LZXJuZWwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmMucGl4ZWxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5jLnBpeGVsRGF0YVtpXSA9IHRoaXMubW9kUGl4ZWxEYXRhW2ldXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGJudW0gPj0gMCkge1xuICAgICAgICBMb2cuZGVidWcoYEZpbHRlciAke3RoaXMuY3VycmVudEpvYi5uYW1lfSBmaW5pc2hlZCFgKVxuICAgICAgfVxuICAgICAgRXZlbnQudHJpZ2dlcih0aGlzLmMsICdwcm9jZXNzQ29tcGxldGUnLCB0aGlzLmN1cnJlbnRKb2IpXG4gICAgICB0aGlzLnByb2Nlc3NOZXh0KClcbiAgICB9XG4gIH1cblxuICAvLyBUaGUgXCJmaWx0ZXIgZnVuY3Rpb25cIiBmb3Iga2VybmVsIGFkanVzdG1lbnRzLlxuICBwcm9jZXNzS2VybmVsIChhZGp1c3QsIGtlcm5lbCwgZGl2aXNvciwgYmlhcykge1xuICAgIGNvbnN0IHZhbCA9IHtcbiAgICAgIHI6IDAsXG4gICAgICBnOiAwLFxuICAgICAgYjogMFxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkanVzdC5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsLnIgKz0gYWRqdXN0W2ldICoga2VybmVsW2kgKiAzXVxuICAgICAgdmFsLmcgKz0gYWRqdXN0W2ldICoga2VybmVsW2kgKiAzICsgMV1cbiAgICAgIHZhbC5iICs9IGFkanVzdFtpXSAqIGtlcm5lbFtpICogMyArIDJdXG4gICAgfVxuXG4gICAgdmFsLnIgPSAodmFsLnIgLyBkaXZpc29yKSArIGJpYXNcbiAgICB2YWwuZyA9ICh2YWwuZyAvIGRpdmlzb3IpICsgYmlhc1xuICAgIHZhbC5iID0gKHZhbC5iIC8gZGl2aXNvcikgKyBiaWFzXG4gICAgcmV0dXJuIHZhbFxuICB9XG5cbiAgLy8gTG9hZHMgYW4gaW1hZ2Ugb250byB0aGUgY3VycmVudCBjYW52YXNcbiAgbG9hZE92ZXJsYXkgKGxheWVyLCBzcmMpIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpXG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxheWVyLmNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgdGhpcy5jLmRpbWVuc2lvbnMud2lkdGgsIHRoaXMuYy5kaW1lbnNpb25zLmhlaWdodClcbiAgICAgIGxheWVyLmltYWdlRGF0YSA9IGxheWVyLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuYy5kaW1lbnNpb25zLndpZHRoLCB0aGlzLmMuZGltZW5zaW9ucy5oZWlnaHQpXG4gICAgICBsYXllci5waXhlbERhdGEgPSBsYXllci5pbWFnZURhdGEuZGF0YVxuXG4gICAgICB0aGlzLmMucGl4ZWxEYXRhID0gbGF5ZXIucGl4ZWxEYXRhXG5cbiAgICAgIHRoaXMucHJvY2Vzc05leHQoKVxuICAgIH1cblxuICAgIGNvbnN0IHByb3h5VXJsID0gSU8ucmVtb3RlQ2hlY2soc3JjKVxuICAgIGltZy5zcmMgPSBwcm94eVVybCB8fCBzcmNcbiAgfVxufVxuIiwiLyoqXG4gKiBCdWlsdC1pbiBsYXllciBibGVuZGVycy4gTWFueSBvZiB0aGVzZSBtaW1pYyBQaG90b3Nob3AgYmxlbmQgbW9kZXMuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEJsZW5kZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxlbmRlciB7XG4gIHN0YXRpYyBibGVuZGVycyA9IHt9XG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBibGVuZGVyLiBDYW4gYmUgdXNlZCB0byBhZGQgeW91ciBvd24gYmxlbmRlcnMgb3V0c2lkZSBvZiB0aGUgY29yZSBsaWJyYXJ5LCBpZiBuZWVkZWQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSBOYW1lIG9mIHRoZSBibGVuZGVyLlxuICAgKiBAcGFyYW0geyBGdW5jdGlvbiB9IGZ1bmMgVGhlIGJsZW5kZXIgZnVuY3Rpb24uXG4gICAqIEBtZW1iZXJvZiBCbGVuZGVyXG4gICAqL1xuICBzdGF0aWMgcmVnaXN0ZXIgKG5hbWUsIGZ1bmMpIHtcbiAgICB0aGlzLmJsZW5kZXJzW25hbWVdID0gZnVuY1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGEgYmxlbmRlciB0byBjb21iaW5lIGEgbGF5ZXIgd2l0aCBpdHMgcGFyZW50LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgTmFtZSBvZiB0aGUgYmxlbmRpbmcgZnVuY3Rpb24gdG8gaW52b2tlLlxuICAgKiBAcGFyYW0geyBPYmplY3QgfSByZ2JhTGF5ZXIgUkdCQSBvYmplY3Qgb2YgdGhlIGN1cnJlbnQgcGl4ZWwgZnJvbSB0aGUgbGF5ZXIuXG4gICAqIEBwYXJhbSB7IE9iamVjdCB9IHJnYmFQYXJlbnQgUkdCQSBvYmplY3Qgb2YgdGhlIGNvcnJlc3BvbmRpbmcgcGl4ZWwgaW4gdGhlIHBhcmVudCBsYXllci5cbiAgICogQHJldHVybnMgeyBPYmplY3QgfSBSR0JBIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGJsZW5kZWQgcGl4ZWwuXG4gICAqIEBtZW1iZXJvZiBCbGVuZGVyXG4gICAqL1xuICBzdGF0aWMgZXhlY3V0ZSAobmFtZSwgcmdiYUxheWVyLCByZ2JhUGFyZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuYmxlbmRlcnNbbmFtZV0ocmdiYUxheWVyLCByZ2JhUGFyZW50KVxuICB9XG59XG4iLCJpbXBvcnQgeyAkLCBVdGlsIH0gZnJvbSAnLi91dGlsJ1xuaW1wb3J0IEZpbHRlciBmcm9tICcuL2ZpbHRlcidcbmltcG9ydCBCbGVuZGVyIGZyb20gJy4vYmxlbmRlcidcblxuLyoqXG4gKiBUaGUgZW50aXJlIGxheWVyaW5nIHN5c3RlbSBmb3IgQ2FtYW4gcmVzaWRlcyBpbiB0aGlzIGZpbGUuIExheWVycyBnZXQgdGhlaXIgb3duIGNhbnZhc0xheWVyIG9iamVjdCB3aGljaCBpcyBjcmVhdGVkIHdoZW4gbmV3TGF5ZXIoKSBpcyBjYWxsZWQuIEZvciBleHRlbnNpdmUgaW5mb3JtYXRpb24gcmVnYXJkaW5nIHRoZSBzcGVjaWZpY3Mgb2YgaG93IHRoZSBsYXllcmluZyBzeXN0ZW0gd29ya3MsIHRoZXJlIGlzIGFuIGluLWRlcHRoIGJsb2cgcG9zdCBvbiB0aGlzIHZlcnkgdG9waWMuXG4gKiBJbnN0ZWFkIG9mIGNvcHlpbmcgdGhlIGVudGlyZXR5IG9mIHRoYXQgcG9zdCwgSSdsbCBzaW1wbHkgcG9pbnQgeW91IHRvd2FyZHMgdGhlIFtibG9nIGxpbmtdKGh0dHA6Ly9ibG9nLm1lbHRpbmdpY2UubmV0L3Byb2dyYW1taW5nL2ltcGxlbWVudGluZy1sYXllcnMtY2FtYW5qcykuXG4gKiBIb3dldmVyLCB0aGUgZ2lzdCBvZiB0aGUgbGF5ZXJpbmcgc3lzdGVtIGlzIHRoYXQsIGZvciBlYWNoIGxheWVyLCBpdCBjcmVhdGVzIGEgbmV3IGNhbnZhcyBlbGVtZW50IGFuZCB0aGVuIGVpdGhlciBjb3BpZXMgdGhlIHBhcmVudCBsYXllcidzIGRhdGEgb3IgYXBwbGllcyBhIHNvbGlkIGNvbG9yIHRvIHRoZSBuZXcgbGF5ZXIuIEFmdGVyIHNvbWUgKG9wdGlvbmFsKSBlZmZlY3RzIGFyZSBhcHBsaWVkLCB0aGUgbGF5ZXIgaXMgYmxlbmRlZCBiYWNrIGludG8gdGhlIHBhcmVudCBjYW52YXMgbGF5ZXIgdXNpbmcgb25lIG9mIG1hbnkgZGlmZmVyZW50IGJsZW5kaW5nIGFsZ29yaXRobXMuXG4gKiBZb3UgY2FuIGFsc28gbG9hZCBhbiBpbWFnZSAobG9jYWwgb3IgcmVtb3RlLCB3aXRoIGEgcHJveHkpIGludG8gYSBjYW52YXMgbGF5ZXIsIHdoaWNoIGlzIHVzZWZ1bCBpZiB5b3Ugd2FudCB0byBhZGQgdGV4dHVyZXMgdG8gYW4gaW1hZ2UuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIExheWVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExheWVyIHtcbiAgY29uc3RydWN0b3IgKGMpIHtcbiAgICAvLyBDb21wYXRpYmlsaXR5XG4gICAgdGhpcy5jID0gY1xuICAgIHRoaXMuZmlsdGVyID0gY1xuXG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgYmxlbmRpbmdNb2RlOiAnbm9ybWFsJyxcbiAgICAgIG9wYWNpdHk6IDEuMFxuICAgIH1cblxuICAgIC8vIEVhY2ggbGF5ZXIgZ2V0cyBpdHMgb3duIHVuaXF1ZSBJRFxuICAgIHRoaXMubGF5ZXJJRCA9IFV0aWwudW5pcWlkKCkuZ2V0KClcblxuICAgIC8vIENyZWF0ZSB0aGUgY2FudmFzIGZvciB0aGlzIGxheWVyXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLmMuZGltZW5zaW9ucy53aWR0aFxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuYy5kaW1lbnNpb25zLmhlaWdodFxuXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIHRoaXMuY29udGV4dC5jcmVhdGVJbWFnZURhdGEodGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodClcbiAgICB0aGlzLmltYWdlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodClcbiAgICB0aGlzLnBpeGVsRGF0YSA9IHRoaXMuaW1hZ2VEYXRhLmRhdGFcbiAgfVxuXG4gIC8vIElmIHlvdSB3YW50IHRvIGNyZWF0ZSBuZXN0ZWQgbGF5ZXJzXG4gIG5ld0xheWVyIChjYikge1xuICAgIHRoaXMuYy5uZXdMYXllcihjYilcbiAgfVxuXG4gIC8vIFNldHMgdGhlIGJsZW5kaW5nIG1vZGUgb2YgdGhpcyBsYXllci4gVGhlIG1vZGUgaXMgdGhlIG5hbWUgb2YgYSBibGVuZGVyIGZ1bmN0aW9uLlxuICBzZXRCbGVuZGluZ01vZGUgKG1vZGUpIHtcbiAgICB0aGlzLm9wdGlvbnMuYmxlbmRpbmdNb2RlID0gbW9kZVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBTZXRzIHRoZSBvcGFjaXR5IG9mIHRoaXMgbGF5ZXIuIFRoaXMgYWZmZWN0cyBob3cgbXVjaCBvZiB0aGlzIGxheWVyIGlzIGFwcGxpZWQgdG8gdGhlIHBhcmVudCBsYXllciBhdCByZW5kZXIgdGltZS5cbiAgb3BhY2l0eSAob3BhY2l0eSkge1xuICAgIHRoaXMub3B0aW9ucy5vcGFjaXR5ID0gb3BhY2l0eSAvIDEwMFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBDb3BpZXMgdGhlIGNvbnRlbnRzIG9mIHRoZSBwYXJlbnQgbGF5ZXIgdG8gdGhpcyBsYXllclxuICBjb3B5UGFyZW50ICgpIHtcbiAgICBjb25zdCBwYXJlbnREYXRhID0gdGhpcy5waXhlbERhdGFcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYy5waXhlbERhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIHRoaXMucGl4ZWxEYXRhW2ldID0gcGFyZW50RGF0YVtpXVxuICAgICAgdGhpcy5waXhlbERhdGFbaSArIDFdID0gcGFyZW50RGF0YVtpICsgMV1cbiAgICAgIHRoaXMucGl4ZWxEYXRhW2kgKyAyXSA9IHBhcmVudERhdGFbaSArIDJdXG4gICAgICB0aGlzLnBpeGVsRGF0YVtpICsgM10gPSBwYXJlbnREYXRhW2kgKyAzXVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gRmlsbHMgdGhpcyBsYXllciB3aWR0aCBhIHNpbmdsZSBjb2xvclxuICBmaWxsQ29sb3IgKCkge1xuICAgIHRoaXMuYy5maWxsQ29sb3IuYXBwbHkodGhpcy5jLCBhcmd1bWVudHMpXG4gIH1cblxuICAvLyBMb2FkcyBhbmQgb3ZlcmxheXMgYW4gaW1hZ2Ugb250byB0aGlzIGxheWVyXG4gIG92ZXJsYXlJbWFnZSAoaW1hZ2UpIHtcbiAgICBpZiAodHlwZW9mIGltYWdlID09PSAnb2JqZWN0Jykge1xuICAgICAgaW1hZ2UgPSBpbWFnZS5zcmNcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbWFnZSA9PT0gJ3N0cmluZycgJiYgaW1hZ2VbMF0gPT09ICcjJykge1xuICAgICAgaW1hZ2UgPSAkKGltYWdlKS5zcmNcbiAgICB9XG5cbiAgICBpZiAoIWltYWdlKSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIHRoaXMuYy5yZW5kZXJlci5yZW5kZXJRdWV1ZS5wdXNoKHtcbiAgICAgIHR5cGU6IEZpbHRlci5UeXBlLkxvYWRPdmVybGF5LFxuICAgICAgc3JjOiBpbWFnZSxcbiAgICAgIGxheWVyOiB0aGlzXG4gICAgfSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBUYWtlcyB0aGUgY29udGVudHMgb2YgdGhpcyBsYXllciBhbmQgYXBwbGllcyB0aGVtIHRvIHRoZSBwYXJlbnQgbGF5ZXIgYXQgcmVuZGVyIHRpbWUuIFRoaXMgc2hvdWxkIG5ldmVyIGJlIGNhbGxlZCBleHBsaWNpdGx5IGJ5IHRoZSB1c2VyLlxuICBhcHBseVRvUGFyZW50ICgpIHtcbiAgICBjb25zdCBwYXJlbnREYXRhID0gdGhpcy5jLnBpeGVsU3RhY2tbdGhpcy5jLnBpeGVsU3RhY2subGVuZ3RoIC0gMV1cbiAgICBjb25zdCBsYXllckRhdGEgPSB0aGlzLmMucGl4ZWxEYXRhXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVyRGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgY29uc3QgcmdiYVBhcmVudCA9IHtcbiAgICAgICAgcjogcGFyZW50RGF0YVtpXSxcbiAgICAgICAgZzogcGFyZW50RGF0YVtpICsgMV0sXG4gICAgICAgIGI6IHBhcmVudERhdGFbaSArIDJdLFxuICAgICAgICBhOiBwYXJlbnREYXRhW2kgKyAzXVxuICAgICAgfVxuICAgICAgY29uc3QgcmdiYUxheWVyID0ge1xuICAgICAgICByOiBsYXllckRhdGFbaV0sXG4gICAgICAgIGc6IGxheWVyRGF0YVtpICsgMV0sXG4gICAgICAgIGI6IGxheWVyRGF0YVtpICsgMl0sXG4gICAgICAgIGE6IGxheWVyRGF0YVtpICsgM11cbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdWx0ID0gQmxlbmRlci5leGVjdXRlKHRoaXMub3B0aW9ucy5ibGVuZGluZ01vZGUsIHJnYmFMYXllciwgcmdiYVBhcmVudClcbiAgICAgIHJlc3VsdC5yID0gVXRpbC5jbGFtcFJHQihyZXN1bHQucilcbiAgICAgIHJlc3VsdC5nID0gVXRpbC5jbGFtcFJHQihyZXN1bHQuZylcbiAgICAgIHJlc3VsdC5iID0gVXRpbC5jbGFtcFJHQihyZXN1bHQuYilcbiAgICAgIGlmICghcmVzdWx0LmEpIHtcbiAgICAgICAgcmVzdWx0LmEgPSByZ2JhTGF5ZXIuYVxuICAgICAgfVxuXG4gICAgICBwYXJlbnREYXRhW2ldID0gcmdiYVBhcmVudC5yIC0gKChyZ2JhUGFyZW50LnIgLSByZXN1bHQucikgKiAodGhpcy5vcHRpb25zLm9wYWNpdHkgKiAocmVzdWx0LmEgLyAyNTUpKSlcbiAgICAgIHBhcmVudERhdGFbaSArIDFdID0gcmdiYVBhcmVudC5nIC0gKChyZ2JhUGFyZW50LmcgLSByZXN1bHQuZykgKiAodGhpcy5vcHRpb25zLm9wYWNpdHkgKiAocmVzdWx0LmEgLyAyNTUpKSlcbiAgICAgIHBhcmVudERhdGFbaSArIDJdID0gcmdiYVBhcmVudC5iIC0gKChyZ2JhUGFyZW50LmIgLSByZXN1bHQuYikgKiAodGhpcy5vcHRpb25zLm9wYWNpdHkgKiAocmVzdWx0LmEgLyAyNTUpKSlcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBNb2R1bGUgZnJvbSAnLi9tb2R1bGUnXG5pbXBvcnQgeyAkLCBub29wLCBVdGlsIH0gZnJvbSAnLi91dGlsJ1xuaW1wb3J0IFN0b3JlIGZyb20gJy4vc3RvcmUnXG5pbXBvcnQgQW5hbHl6ZSBmcm9tICcuL2FuYWx5emUnXG5pbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9yZW5kZXJlcidcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2dnZXInXG5pbXBvcnQgSU8gZnJvbSAnLi9pbydcbmltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50J1xuaW1wb3J0IEZpbHRlciBmcm9tICcuL2ZpbHRlcidcbmltcG9ydCBMYXllciBmcm9tICcuL2xheWVyJ1xuXG4vKipcbiAqIEhlcmUgaXQgYmVnaW5zLiBDYW1hbiBpcyBkZWZpbmVkLlxuICogVGhlcmUgYXJlIG1hbnkgZGlmZmVyZW50IGluaXRpYWxpemF0aW9uIGZvciBDYW1hbiwgd2hpY2ggYXJlIGRlc2NyaWJlZCBvbiB0aGUgW0d1aWRlc10oaHR0cDovL2NhbWFuanMuY29tL2d1aWRlcykuXG4gKiBJbml0aWFsaXphdGlvbiBpcyB0cmlja3kgYmVjYXVzZSB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSBldmVyeXRoaW5nIHdlIG5lZWQgaXMgYWN0dWFsbHkgZnVsbHkgb2FkZWQgaW4gdGhlIERPTSBiZWZvcmUgcHJvY2VlZGluZy4gV2hlbiBpbml0aWFsaXplZCBvbiBhbiBpbWFnZSwgd2UgbmVlZCB0byBtYWtlIHN1cmUgdGhhdCB0aGUgaW1hZ2UgaXMgZG9uZSBsb2FkaW5nIGJlZm9yZSBjb252ZXJ0aW5nIGl0IHRvIGEgY2FudmFzIGVsZW1lbnQgYW5kIHdyaXRpbmcgdGhlIHBpeGVsIGRhdGEuIElmIHdlIGRvIHRoaXMgcHJlbWF0dXJlbHksIHRoZSBicm93c2VyIHdpbGwgdGhyb3cgYSBET00gRXJyb3IsIGFuZCBjaGFvcyB3aWxsIGVuc3VlLiBJbiB0aGUgZXZlbnQgdGhhdCB3ZSBpbml0aWFsaXplIENhbWFuIG9uIGEgY2FudmFzIGVsZW1lbnQgd2hpbGUgc3BlY2lmeWluZyBhbiBpbWFnZSBVUkwsIHdlIG5lZWQgdG8gY3JlYXRlIGEgbmV3IGltYWdlIGVsZW1lbnQsIGxvYWQgdGhlIGltYWdlLCB0aGVuIGNvbnRpbnVlIHdpdGggaW5pdGlhbGl6YXRpb24uXG4gKiBUaGUgbWFpbiBnb2FsIGZvciBDYW1hbiB3YXMgc2ltcGxpY2l0eSwgc28gYWxsIG9mIHRoaXMgaXMgaGFuZGxlZCB0cmFuc3BhcmVudGx5IHRvIHRoZSBlbmQtdXNlci5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQ2FtYW5cbiAqIEBleHRlbmRzIHtNb2R1bGV9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbWFuIGV4dGVuZHMgTW9kdWxlIHtcbiAgLy8gVGhlIGN1cnJlbnQgdmVyc2lvbi5cbiAgc3RhdGljIHZlcnNpb24gPSB7XG4gICAgcmVsZWFzZTogJzEuMC4wJyxcbiAgICBkYXRlOiAnNi8wOC8yMDE4J1xuICB9XG5cbiAgLy8gQHByb3BlcnR5IFtCb29sZWFuXSBEZWJ1ZyBtb2RlIGVuYWJsZXMgY29uc29sZSBsb2dnaW5nLlxuICBzdGF0aWMgREVCVUcgPSB0cnVlXG5cbiAgLy8gQHByb3BlcnR5IFtCb29sZWFuXSBBbGxvdyByZXZlcnRpbmcgdGhlIGNhbnZhcz9cbiAgLy8gSWYgeW91ciBKUyBwcm9jZXNzIGlzIHJ1bm5pbmcgb3V0IG9mIG1lbW9yeSwgZGlzYWJsaW5nXG4gIC8vIHRoaXMgY291bGQgaGVscCBkcmFzdGljYWxseS5cbiAgc3RhdGljIGFsbG93UmV2ZXJ0ID0gdHJ1ZVxuXG4gIC8vIEBwcm9wZXJ0eSBbU3RyaW5nXSBEZWZhdWx0IGNyb3NzLW9yaWdpbiBwb2xpY3kuXG4gIHN0YXRpYyBjcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnXG5cbiAgLy8gQHByb3BlcnR5IFtTdHJpbmddIFNldCB0aGUgVVJMIG9mIHRoZSBpbWFnZSBwcm94eSBzY3JpcHQuXG4gIHN0YXRpYyByZW1vdGVQcm94eSA9ICcnXG5cbiAgLy8gQHByb3BhcnR5IFtTdHJpbmddIFRoZSBHRVQgcGFyYW0gdXNlZCB3aXRoIHRoZSBwcm94eSBzY3JpcHQuXG4gIHN0YXRpYyBwcm94eVBhcmFtID0gJ2NhbWFuUHJveHlVcmwnXG5cbiAgLy8gQHByb3BlcnR5IFtCb29sZWFuXSBBcmUgd2UgaW4gYSBOb2RlSlMgZW52aXJvbm1lbnQ/XG4gIHN0YXRpYyBOb2RlSlMgPSB0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCdcblxuICAvLyBAcHJvcGVydHkgW0Jvb2xlYW5dIEFyZSB3ZSBpbiBhIHdlY2hhdCBtaW5pIHByb2dyYW0gZW52aXJvbm1lbnQ/XG4gIHN0YXRpYyB3ZWNoYXQgPSB0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCdcblxuICAvLyBAcHJvcGVydHkgW0Jvb2xlYW5dIFNob3VsZCB3ZSBjaGVjayB0aGUgRE9NIGZvciBpbWFnZXMgd2l0aCBDYW1hbiBpbnN0cnVjdGlvbnM/XG4gIHN0YXRpYyBhdXRvbG9hZCA9ICFDYW1hbi5Ob2RlSlNcblxuICAvLyBDdXN0b20gdG9TdHJpbmcoKVxuICAvLyBAcmV0dXJuIFtTdHJpbmddIFZlcnNpb24gYW5kIHJlbGVhc2UgaW5mb3JtYXRpb24uXG4gIHN0YXRpYyB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIGBWZXJzaW9uICR7Q2FtYW4udmVyc2lvbi5yZWxlYXNlfSwgUmVsZWFzZWQgJHtDYW1hbi52ZXJzaW9uLmRhdGV9YFxuICB9XG5cbiAgLy8gR2V0IHRoZSBJRCBhc3NpZ25lZCB0byB0aGlzIGNhbnZhcyBieSBDYW1hbi5cbiAgLy8gQHBhcmFtIFtET01PYmplY3RdIGNhbnZhcyBUaGUgY2FudmFzIHRvIGluc3BlY3QuXG4gIC8vIEByZXR1cm4gW1N0cmluZ10gVGhlIENhbWFuIElEIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNhbnZhcy5cbiAgc3RhdGljIGdldEF0dHJJZCAoY2FudmFzKSB7XG4gICAgaWYgKENhbWFuLk5vZGVKUykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjYW52YXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjYW52YXMgPSAkKGNhbnZhcylcbiAgICB9XG4gICAgaWYgKGNhbnZhcyAmJiBjYW52YXMuZ2V0QXR0cmlidXRlKSB7XG4gICAgICByZXR1cm4gY2FudmFzLmdldEF0dHJpYnV0ZSgnZGF0YS1jYW1hbi1pZCcpXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICAvKipcbiAgICogVGhlIENhbWFuIGZ1bmN0aW9uLiBXaGlsZSB0ZWNobmljYWxseSBhIGNvbnN0cnVjdG9yLCBpdCB3YXMgbWFkZSB0byBiZSBjYWxsZWQgd2l0aG91dCB0aGUgYG5ld2Aga2V5d29yZC4gQ2FtYW4gd2lsbCBmaWd1cmUgaXQgb3V0LlxuICAgKiBAcGFyYW0geyBET01PYmplY3QgfCBTdHJpbmcgfSBpbml0aWFsaXplciBUaGUgRE9NIHNlbGVjdG9yIG9yIERPTSBvYmplY3QgdG8gaW5pdGlhbGl6ZS5cbiAgICogQG92ZXJsb2FkIENhbWFuKGluaXRpYWxpemVyKVxuICAgKiAgIEluaXRpYWxpemUgQ2FtYW4gd2l0aG91dCBhIGNhbGxiYWNrLlxuICAgKlxuICAgKiBAb3ZlcmxvYWQgQ2FtYW4oaW5pdGlhbGl6ZXIsIGNhbGxiYWNrKVxuICAgKiAgIEluaXRpYWxpemUgQ2FtYW4gd2l0aCBhIGNhbGxiYWNrLlxuICAgKiAgIEBwYXJhbSBbRnVuY3Rpb25dIGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGNhbGwgb25jZSBpbml0aWFsaXphdGlvbiBjb21wbGV0ZXMuXG4gICAqXG4gICAqIEBvdmVybG9hZCBDYW1hbihpbml0aWFsaXplciwgdXJsKVxuICAgKiAgIEluaXRpYWxpemUgQ2FtYW4gd2l0aCBhIFVSTCB0byBhbiBpbWFnZSBhbmQgbm8gY2FsbGJhY2suXG4gICAqICAgQHBhcmFtIFtTdHJpbmddIHVybCBVUmwgdG8gYW4gaW1hZ2UgdG8gZHJhdyB0byB0aGUgY2FudmFzLlxuICAgKlxuICAgKiBAb3ZlcmxvYWQgQ2FtYW4oaW5pdGlhbGl6ZXIsIHVybCwgY2FsbGJhY2spXG4gICAqICAgSW5pdGlhbGl6ZSBDYW1hbiB3aXRoIGEgY2FudmFzLCBVUkwgdG8gYW4gaW1hZ2UsIGFuZCBhIGNhbGxiYWNrLlxuICAgKiAgIEBwYXJhbSBbU3RyaW5nXSB1cmwgVVJsIHRvIGFuIGltYWdlIHRvIGRyYXcgdG8gdGhlIGNhbnZhcy5cbiAgICogICBAcGFyYW0gW0Z1bmN0aW9uXSBjYWxsYmFjayBGdW5jdGlvbiB0byBjYWxsIG9uY2UgaW5pdGlhbGl6YXRpb24gY29tcGxldGVzLlxuICAgKlxuICAgKiBAb3ZlcmxvYWQgQ2FtYW4oZmlsZSlcbiAgICogICBOb2RlSlM6IEluaXRpYWxpemUgQ2FtYW4gd2l0aCBhIHBhdGggdG8gYW4gaW1hZ2UgZmlsZSBhbmQgbm8gY2FsbGJhY2suXG4gICAqICAgQHBhcmFtIFtTdHJpbmcsIEZpbGVdIGZpbGUgRmlsZSBvYmplY3Qgb3IgcGF0aCB0byBpbWFnZSB0byByZWFkLlxuICAgKlxuICAgKiBAb3ZlcmxvYWQgQ2FtYW4oZmlsZSwgY2FsbGJhY2spXG4gICAqICAgTm9kZUpTOiBJbml0aWFsaXplIENhbWFuIHdpdGggYSBmaWxlIGFuZCBhIGNhbGxiYWNrLlxuICAgKiAgIEBwYXJhbSBbU3RyaW5nLCBGaWxlXSBmaWxlIEZpbGUgb2JqZWN0IG9yIHBhdGggdG8gaW1hZ2UgdG8gcmVhZC5cbiAgICogICBAcGFyYW0gW0Z1bmN0aW9uXSBjYWxsYmFjayBGdW5jdGlvbiB0byBjYWxsIG9uY2UgaW5pdGlhbGl6YXRpb24gY29tcGxldGVzLlxuICAgKiBAcmV0dXJuIFtDYW1hbl0gSW5pdGlhbGl6ZWQgQ2FtYW4gaW5zdGFuY2UuXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgY29uc3RydWN0b3IgKC4uLmFyZ3MpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKVxuICAgIH1cbiAgICBzdXBlcigpXG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDYW1hbikge1xuICAgICAgLy8gV2UgaGF2ZSB0byBkbyB0aGlzIHRvIGF2b2lkIHBvbGx1dGluZyB0aGUgZ2xvYmFsIHNjb3BlXG4gICAgICAvLyBiZWNhdXNlIG9mIGhvdyBDb2ZmZWVzY3JpcHQgYmluZHMgZnVuY3Rpb25zIHNwZWNpZmllZFxuICAgICAgLy8gd2l0aCA9PiBhbmQgdGhlIGZhY3QgdGhhdCBDYW1hbiBjYW4gYmUgaW52b2tlZCBhcyBib3RoXG4gICAgICAvLyBhIGZ1bmN0aW9uIGFuZCBhcyBhICduZXcnIG9iamVjdC5cbiAgICAgIHRoaXMuZmluaXNoSW5pdCA9IHRoaXMuZmluaXNoSW5pdC5iaW5kKHRoaXMpXG4gICAgICB0aGlzLmltYWdlTG9hZGVkID0gdGhpcy5pbWFnZUxvYWRlZC5iaW5kKHRoaXMpXG5cbiAgICAgIGlmICghQ2FtYW4uTm9kZUpTKSB7XG4gICAgICAgIGNvbnN0IGlkID0gcGFyc2VJbnQoQ2FtYW4uZ2V0QXR0cklkKGFyZ3NbMF0pLCAxMClcbiAgICAgICAgbGV0IGNhbGxiYWNrXG4gICAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNhbGxiYWNrID0gYXJnc1sxXVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY2FsbGJhY2sgPSBhcmdzWzJdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FsbGJhY2sgPSBub29wXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzTmFOKGlkKSAmJiBTdG9yZS5oYXMoaWQpKSB7XG4gICAgICAgICAgcmV0dXJuIFN0b3JlLmV4ZWN1dGUoaWQsIGNhbGxiYWNrKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEV2ZXJ5IGluc3RhbmNlIGdldHMgYSB1bmlxdWUgSUQuIE1ha2VzIGl0IG11Y2ggc2ltcGxlciB0byBjaGVjayBpZiB0d28gdmFyaWFibGVzIGFyZSB0aGUgc2FtZSBpbnN0YW5jZS5cbiAgICAgIHRoaXMuaWQgPSBVdGlsLnVuaXFpZCgpLmdldCgpXG4gICAgICB0aGlzLmluaXRpYWxpemVkUGl4ZWxEYXRhID0gdGhpcy5vcmlnaW5hbFBpeGVsRGF0YSA9IG51bGxcbiAgICAgIHRoaXMuY3JvcENvb3JkaW5hdGVzID0geyB4OiAwLCB5OiAwIH1cbiAgICAgIHRoaXMuY3JvcHBlZCA9IGZhbHNlXG4gICAgICB0aGlzLnJlc2l6ZWQgPSBmYWxzZVxuXG4gICAgICB0aGlzLnBpeGVsU3RhY2sgPSBbXSAvLyBTdG9yZXMgdGhlIHBpeGVsIGxheWVyc1xuICAgICAgdGhpcy5sYXllclN0YWNrID0gW10gLy8gU3RvcmVzIGFsbCBvZiB0aGUgbGF5ZXJzIHdhaXRpbmcgdG8gYmUgcmVuZGVyZWRcbiAgICAgIHRoaXMuY2FudmFzUXVldWUgPSBbXSAvLyBTdG9yZXMgYWxsIG9mIHRoZSBjYW52YXNlcyB0byBiZSBwcm9jZXNzZWRcbiAgICAgIHRoaXMuY3VycmVudExheWVyID0gbnVsbFxuICAgICAgdGhpcy5zY2FsZWQgPSBmYWxzZVxuXG4gICAgICB0aGlzLmFuYWx5emUgPSBuZXcgQW5hbHl6ZSh0aGlzKVxuICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcih0aGlzKVxuXG4gICAgICB0aGlzLmRvbUlzTG9hZGVkKCgpID0+IHtcbiAgICAgICAgdGhpcy5wYXJzZUFyZ3VtZW50cyhhcmdzKVxuICAgICAgICB0aGlzLnNldHVwKClcbiAgICAgIH0pXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IENhbWFuKC4uLmFyZ3MpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0byBlbnN1cmUgdGhlIERPTSBpcyBsb2FkZWQuIEVuc3VyZXMgdGhlIGNhbGxiYWNrIGlzIGFsd2F5cyBmaXJlZCwgZXZlbiBpZiB0aGUgRE9NIGlzIGFscmVhZHkgbG9hZGVkIGJlZm9yZSBpdCdzIGludm9rZWQuIFRoZSBjYWxsYmFjayBpcyBhbHNvIGFsd2F5cyBjYWxsZWQgYXN5bmNocm9ub3VzbHkuXG4gICAqXG4gICAqIEBwYXJhbSB7IEZ1bmN0aW9uIH0gY2IgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGZpcmUgd2hlbiB0aGUgRE9NIGlzIHJlYWR5LlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIGRvbUlzTG9hZGVkIChjYikge1xuICAgIGlmIChDYW1hbi5Ob2RlSlMpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjYi5jYWxsKHRoaXMpXG4gICAgICB9LCAwKVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICBMb2cuZGVidWcoJ0RPTSBpbml0aWFsaXplZCcpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNiLmNhbGwodGhpcylcbiAgICAgICAgfSwgMClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICBMb2cuZGVidWcoJ0RPTSBpbml0aWFsaXplZCcpXG4gICAgICAgICAgICBjYi5jYWxsKHRoaXMpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCBsaXN0ZW5lciwgZmFsc2UpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgYXJndW1lbnRzIGdpdmVuIHRvIHRoZSBDYW1hbiBmdW5jdGlvbiwgYW5kIHNldHMgdGhlIGFwcHJvcHJpYXRlIHByb3BlcnRpZXMgb24gdGhpcyBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHsgQXJyYXkgfSBhcmdzIEFycmF5IG9mIGFyZ3VtZW50cyBwYXNzZWQgdG8gQ2FtYW4uXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgcGFyc2VBcmd1bWVudHMgKGFyZ3MpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMgZ2l2ZW4nKVxuICAgIH1cblxuICAgIC8vIERlZmF1bHRzXG4gICAgdGhpcy5pbml0T2JqID0gbnVsbFxuICAgIHRoaXMuaW5pdFR5cGUgPSBudWxsXG4gICAgdGhpcy5pbWFnZVVybCA9IG51bGxcbiAgICB0aGlzLmNhbGxiYWNrID0gbm9vcFxuXG4gICAgLy8gRmlyc3QgYXJndW1lbnQgaXMgYWx3YXlzIG91ciBjYW52YXMvaW1hZ2VcbiAgICB0aGlzLnNldEluaXRPYmplY3QoYXJnc1swXSlcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHN3aXRjaCAodHlwZW9mIGFyZ3NbMV0pIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHRoaXMuaW1hZ2VVcmwgPSBhcmdzWzFdXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBhcmdzWzFdXG4gICAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAyKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLmNhbGxiYWNrID0gYXJnc1syXVxuXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSA0KSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gYXJnc1s0XSkge1xuICAgICAgICBpZiAoYXJnc1s0XS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSBhcmdzWzRdW2tleV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbml0aWFsaXphdGlvbiBvYmplY3QgZm9yIHRoaXMgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7IE9iamVjdCB8IFN0cmluZyB9IG9iaiBUaGUgaW5pdGlhbGl6YXRpb24gYXJndW1lbnQuXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgc2V0SW5pdE9iamVjdCAob2JqKSB7XG4gICAgaWYgKENhbWFuLk5vZGVKUykge1xuICAgICAgdGhpcy5pbml0T2JqID0gb2JqXG4gICAgICB0aGlzLmluaXRUeXBlID0gJ25vZGUnXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLmluaXRPYmogPSBvYmpcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0T2JqID0gJChvYmopXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmluaXRPYmopIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgaW1hZ2Ugb3IgY2FudmFzIGZvciBpbml0aWFsaXphdGlvbi4nKVxuICAgIH1cblxuICAgIHRoaXMuaW5pdFR5cGUgPSB0aGlzLmluaXRPYmoubm9kZU5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgLyoqXG4gICAqIEJlZ2lucyB0aGUgc2V0dXAgcHJvY2Vzcywgd2hpY2ggZGlmZmVycyBkZXBlbmRpbmcgb24gd2hldGhlciB3ZSdyZSBpbiBOb2RlSlMsIG9yIGlmIGFuIGltYWdlIG9yIGNhbnZhcyBvYmplY3Qgd2FzIHByb3ZpZGVkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHNldHVwICgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmluaXRUeXBlKVxuICAgIHN3aXRjaCAodGhpcy5pbml0VHlwZSkge1xuICAgICAgY2FzZSAnbm9kZSc6XG4gICAgICAgIHRoaXMuaW5pdE5vZGUoKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnaW1nJzpcbiAgICAgICAgdGhpcy5pbml0SW1hZ2UoKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnY2FudmFzJzpcbiAgICAgICAgdGhpcy5pbml0Q2FudmFzKClcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICAvLyBJbml0aWFsaXphdGlvbiBmdW5jdGlvbiBmb3IgTm9kZUpTXG4gIGluaXROb2RlICgpIHt9XG5cbiAgLy8gSW5pdGlhbGl6YXRpb24gZnVuY3Rpb24gZm9yIHRoZSBicm93c2VyIGFuZCBpbWFnZSBvYmplY3RzLlxuICBpbml0SW1hZ2UgKCkge1xuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLmluaXRPYmpcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIFV0aWwuY29weUF0dHJpYnV0ZXModGhpcy5pbWFnZSwgdGhpcy5jYW52YXMsIHtleGNlcHQ6IFsnc3JjJ119KVxuXG4gICAgLy8gU3dhcCBvdXQgaW1hZ2Ugd2l0aCB0aGUgY2FudmFzIGVsZW1lbnQgaWYgdGhlIGltYWdlIGV4aXN0cyBpbiB0aGUgRE9NLlxuICAgIHRoaXMuaW1hZ2UucGFyZW50Tm9kZSAmJiB0aGlzLmltYWdlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHRoaXMuY2FudmFzLCB0aGlzLmltYWdlKVxuXG4gICAgdGhpcy5pbWFnZUFkanVzdG1lbnRzKClcbiAgICB0aGlzLndhaXRGb3JJbWFnZUxvYWRlZCgpXG4gIH1cblxuICAvLyBJbml0aWFsaXphdGlvbiBmdW5jdGlvbiBmb3IgYnJvd3NlciBhbmQgY2FudmFzIG9iamVjdHNcbiAgLy8gVE9ETzpcbiAgaW5pdENhbnZhcyAoKSB7XG4gICAgdGhpcy5jYW52YXMgPSB0aGlzLmluaXRPYmpcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNhbnZhcylcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG5cbiAgICBpZiAodGhpcy5pbWFnZVVybCkge1xuICAgICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgICB0aGlzLmltYWdlLnNyYyA9IHRoaXMuaW1hZ2VVcmxcblxuICAgICAgdGhpcy5pbWFnZUFkanVzdG1lbnRzKClcbiAgICAgIHRoaXMud2FpdEZvckltYWdlTG9hZGVkKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maW5pc2hJbml0KClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXV0b21hdGljYWxseSBjaGVjayBmb3IgYSBIaURQSSBjYXBhYmxlIHNjcmVlbiBhbmQgc3dhcCBvdXQgdGhlIGltYWdlIGlmIHBvc3NpYmxlLlxuICAgKiBBbHNvIGNoZWNrcyB0aGUgaW1hZ2UgVVJMIHRvIHNlZSBpZiBpdCdzIGEgY3Jvc3MtZG9tYWluIHJlcXVlc3QsIGFuZCBhdHRlbXB0IHRvIHByb3h5IHRoZSBpbWFnZS4gSWYgYSBjcm9zcy1vcmlnaW4gdHlwZSBpcyBjb25maWd1cmVkLCB0aGUgcHJveHkgd2lsbCBiZSBpZ25vcmVkLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIGltYWdlQWRqdXN0bWVudHMgKCkge1xuICAgIGlmIChJTy5pc1JlbW90ZSh0aGlzLmltYWdlKSkge1xuICAgICAgdGhpcy5pbWFnZS5zcmMgPSBJTy5wcm94eVVybCh0aGlzLmltYWdlLnNyYylcbiAgICAgIExvZy5kZWJ1ZyhgUmVtb3RlIGltYWdlIGRldGVjdGVkLCB1c2luZyBVUkwgPSAke3RoaXMuaW1hZ2Uuc3JjfWApXG4gICAgfVxuICB9XG5cbiAgLy8gVXRpbGl0eSBmdW5jdGlvbiB0aGF0IGZpcmVzIHtDYW1hbiNpbWFnZUxvYWRlZH0gb25jZSB0aGUgaW1hZ2UgaXMgZmluaXNoZWQgbG9hZGluZy5cbiAgd2FpdEZvckltYWdlTG9hZGVkICgpIHtcbiAgICBpZiAodGhpcy5pc0ltYWdlTG9hZGVkKCkpIHtcbiAgICAgIHRoaXMuaW1hZ2VMb2FkZWQoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmltYWdlLm9ubG9hZCA9IHRoaXMuaW1hZ2VMb2FkZWRcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBpbWFnZSBpcyBmaW5pc2hlZCBsb2FkaW5nLlxuICAgKiBAcmV0dXJucyB7IEJvb2xlYW4gfSBJcyB0aGUgaW1hZ2UgbG9hZGVkP1xuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIGlzSW1hZ2VMb2FkZWQgKCkge1xuICAgIGlmICghdGhpcy5pbWFnZS5jb21wbGV0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmICh0aGlzLmltYWdlLm5hdHVyYWxXaWR0aCAmJiB0aGlzLmltYWdlLm5hdHVyYWxXaWR0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICAvKipcbiAgICogSW50ZXJuZXQgRXhwbG9yZXIgaGFzIGlzc3VlcyBmaWd1cmluZyBvdXQgaW1hZ2UgZGltZW5zaW9ucyB3aGVuIHRoZXkgYXJlbid0IGV4cGxpY2l0bHkgZGVmaW5lZCwgYXBwYXJlbnRseS4gV2UgY2hlY2sgdGhlIG5vcm1hbCB3aWR0aC9oZWlnaHQgcHJvcGVydGllcyBmaXJzdCwgYnV0IGZhbGwgYmFjayB0byBuYXR1cmFsIHNpemVzIGlmIHRoZXkgYXJlIDAuXG4gICAqIEByZXR1cm5zIHsgTnVtYmVyIH0gV2lkdGggb2YgdGhlIGluaXRpYWxpemF0aW9uIGltYWdlLlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIGltYWdlV2lkdGggKCkge1xuICAgIHJldHVybiB0aGlzLmltYWdlLndpZHRoIHx8IHRoaXMuaW1hZ2UubmF0dXJhbFdpZHRoXG4gIH1cblxuICAvKipcbiAgICogQHNlZSBDYW1hbiNpbWFnZVdpZHRoXG4gICAqXG4gICAqIEByZXR1cm5zIHsgTnVtYmVyIH0gSGVpZ2h0IG9mIHRoZSBpbml0aWFsaXphdGlvbiBpbWFnZS5cbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICBpbWFnZUhlaWdodCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2UuaGVpZ2h0IHx8IHRoaXMuaW1hZ2UubmF0dXJhbEhlaWdodFxuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIG9uY2UgdGhlIGluaXRpYWxpemF0aW9uIGltYWdlIGlzIGZpbmlzaGVkIGxvYWRpbmcuXG4gICAqIFdlIG1ha2Ugc3VyZSB0aGF0IHRoZSBjYW52YXMgZGltZW5zaW9ucyBhcmUgcHJvcGVybHkgc2V0IGhlcmUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgaW1hZ2VMb2FkZWQgKCkge1xuICAgIExvZy5kZWJ1ZyhgSW1hZ2UgbG9hZGVkLiBXaWR0aCA9ICR7dGhpcy5pbWFnZVdpZHRoKCl9LCBIZWlnaHQgPSAke3RoaXMuaW1hZ2VIZWlnaHQoKX1gKVxuXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLmltYWdlV2lkdGgoKVxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaW1hZ2VIZWlnaHQoKVxuXG4gICAgdGhpcy5maW5pc2hJbml0KClcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5hbCBzdGVwIG9mIGluaXRpYWxpemF0aW9uLiBXZSBmaW5pc2ggc2V0dGluZyB1cCBvdXIgY2FudmFzIGVsZW1lbnQsIGFuZCB3ZSBkcmF3IHRoZSBpbWFnZSB0byB0aGUgY2FudmFzIChpZiBhcHBsaWNhYmxlKS5cbiAgICpcbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICBmaW5pc2hJbml0ICgpIHtcbiAgICBpZiAoIXRoaXMuY29udGV4dCkge1xuICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIH1cblxuICAgIHRoaXMub3JpZ2luYWxXaWR0aCA9IHRoaXMucHJlU2NhbGVkV2lkdGggPSB0aGlzLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGhcbiAgICB0aGlzLm9yaWdpbmFsSGVpZ2h0ID0gdGhpcy5wcmVTY2FsZWRIZWlnaHQgPSB0aGlzLmhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodFxuXG4gICAgaWYgKCF0aGlzLmhhc0lkKCkpIHtcbiAgICAgIHRoaXMuYXNzaWduSWQoKVxuICAgIH1cblxuICAgIGlmICh0aGlzLmltYWdlKSB7XG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDAsIDAsIHRoaXMuaW1hZ2VXaWR0aCgpLCB0aGlzLmltYWdlSGVpZ2h0KCksIDAsIDAsIHRoaXMucHJlU2NhbGVkV2lkdGgsIHRoaXMucHJlU2NhbGVkSGVpZ2h0KVxuICAgIH1cblxuICAgIHRoaXMuaW1hZ2VEYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KVxuICAgIHRoaXMucGl4ZWxEYXRhID0gdGhpcy5pbWFnZURhdGEuZGF0YVxuXG4gICAgaWYgKENhbWFuLmFsbG93UmV2ZXJ0KSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVkUGl4ZWxEYXRhID0gVXRpbC5kYXRhQXJyYXkodGhpcy5waXhlbERhdGEubGVuZ3RoKVxuICAgICAgdGhpcy5vcmlnaW5hbFBpeGVsRGF0YSA9IFV0aWwuZGF0YUFycmF5KHRoaXMucGl4ZWxEYXRhLmxlbmd0aClcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpeGVsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgcGl4ZWwgPSB0aGlzLnBpeGVsRGF0YVtpXVxuICAgICAgICB0aGlzLmluaXRpYWxpemVkUGl4ZWxEYXRhW2ldID0gcGl4ZWxcbiAgICAgICAgdGhpcy5vcmlnaW5hbFBpeGVsRGF0YVtpXSA9IHBpeGVsXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5kaW1lbnNpb25zID0ge1xuICAgICAgd2lkdGg6IHRoaXMuY2FudmFzLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmNhbnZhcy5oZWlnaHRcbiAgICB9XG5cbiAgICBpZiAoIUNhbWFuLk5vZGVKUykge1xuICAgICAgU3RvcmUucHV0KHRoaXMuaWQsIHRoaXMpXG4gICAgfVxuXG4gICAgdGhpcy5jYWxsYmFjayh0aGlzKVxuXG4gICAgLy8gUmVzZXQgdGhlIGNhbGxiYWNrIHNvIHJlLWluaXRpYWxpemF0aW9uIGRvZXNuJ3QgdHJpZ2dlciBpdCBhZ2Fpbi5cbiAgICB0aGlzLmNhbGxiYWNrID0gbm9vcFxuICB9XG5cbiAgLyoqXG4gICAqIElmIHlvdSBoYXZlIGEgc2VwYXJhdGUgY29udGV4dCByZWZlcmVuY2UgdG8gdGhpcyBjYW52YXMgb3V0c2lkZSBvZiBDYW1hbkpTIGFuZCB5b3UgbWFrZSBhIGNoYW5nZSB0byB0aGUgY2FudmFzIG91dHNpZGUgb2YgQ2FtYW5KUywgeW91IHdpbGwgaGF2ZSB0byBjYWxsIHRoaXMgZnVuY3Rpb24gdG8gdXBkYXRlIG91ciBjb250ZXh0IHJlZmVyZW5jZSB0byBpbmNsdWRlIHRob3NlIGNoYW5nZXMuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgcmVsb2FkQ2FudmFzRGF0YSAoKSB7XG4gICAgdGhpcy5pbWFnZURhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpXG4gICAgdGhpcy5waXhlbERhdGEgPSB0aGlzLmltYWdlRGF0YS5kYXRhXG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIGNhbnZhcyBwaXhlbHMgdG8gdGhlIG9yaWdpbmFsIHN0YXRlIGF0IGluaXRpYWxpemF0aW9uLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHJlc2V0T3JpZ2luYWxQaXhlbERhdGEgKCkge1xuICAgIGlmICghQ2FtYW4uYWxsb3dSZXZlcnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmV2ZXJ0IGRpc2FibGVkJylcbiAgICB9XG5cbiAgICB0aGlzLm9yaWdpbmFsUGl4ZWxEYXRhID0gVXRpbC5kYXRhQXJyYXkodGhpcy5waXhlbERhdGEubGVuZ3RoKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waXhlbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwaXhlbCA9IHRoaXMucGl4ZWxEYXRhW2ldXG4gICAgICB0aGlzLm9yaWdpbmFsUGl4ZWxEYXRhW2ldID0gcGl4ZWxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRG9lcyB0aGlzIGluc3RhbmNlIGhhdmUgYW4gSUQgYXNzaWduZWQ/XG4gICAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IEV4aXN0YW5jZSBvZiBhbiBJRC5cbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICBoYXNJZCAoKSB7XG4gICAgcmV0dXJuICEhQ2FtYW4uZ2V0QXR0cklkKHRoaXMuY2FudmFzKVxuICB9XG4gIC8qKlxuICAgKiBBc3NpZ24gYSB1bmlxdWUgSUQgdG8gdGhpcyBpbnN0YW5jZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICBhc3NpZ25JZCAoKSB7XG4gICAgaWYgKENhbWFuLk5vZGVKUyB8fCB0aGlzLmNhbnZhcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2FtYW4taWQnKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZSgnZGF0YS1jYW1hbi1pZCcsIHRoaXMuaWQpXG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgdGhlIGN1cnJlbnQgY2FudmFzIHdpdGggYSBuZXcgb25lLCBhbmQgcHJvcGVybHkgdXBkYXRlcyBhbGwgb2YgdGhlIGFwcGxpY2FibGUgcmVmZXJlbmNlcyBmb3IgdGhpcyBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHsgRE9NT2JqZWN0IH0gbmV3Q2FudmFzIFRoZSBjYW52YXMgdG8gc3dhcCBpbnRvIHRoaXMgaW5zdGFuY2UuXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgcmVwbGFjZUNhbnZhcyAobmV3Q2FudmFzKSB7XG4gICAgY29uc3Qgb2xkQ2FudmFzID0gdGhpcy5jYW52YXNcbiAgICB0aGlzLmNhbnZhcyA9IG5ld0NhbnZhc1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcblxuICAgIGlmICghQ2FtYW4uTm9kZUpTKSB7XG4gICAgICBvbGRDYW52YXMucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodGhpcy5jYW52YXMsIG9sZENhbnZhcylcbiAgICB9XG5cbiAgICB0aGlzLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGhcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodFxuXG4gICAgdGhpcy5yZWxvYWRDYW52YXNEYXRhKClcblxuICAgIHRoaXMuZGltZW5zaW9ucyA9IHtcbiAgICAgIHdpZHRoOiB0aGlzLmNhbnZhcy53aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5jYW52YXMuaGVpZ2h0XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJlZ2lucyB0aGUgcmVuZGVyaW5nIHByb2Nlc3MuIFRoaXMgd2lsbCBleGVjdXRlIGFsbCBvZiB0aGUgZmlsdGVyIGZ1bmN0aW9ucyBjYWxsZWQgZWl0aGVyIHNpbmNlIGluaXRpYWxpemF0aW9uIG9yIHRoZSBwcmV2aW91cyByZW5kZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7IEZ1bmN0aW9uIH0gW2NhbGxiYWNrPW5vb3BdIEZ1bmN0aW9uIHRvIGNhbGwgd2hlbiByZW5kZXJpbmcgaXMgZmluaXNoZWQuXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgcmVuZGVyIChjYWxsYmFjayA9IG5vb3ApIHtcbiAgICBFdmVudC50cmlnZ2VyKHRoaXMsICdyZW5kZXJTdGFydCcpXG5cbiAgICB0aGlzLnJlbmRlcmVyLmV4ZWN1dGUoKCkgPT4ge1xuICAgICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YSh0aGlzLmltYWdlRGF0YSwgMCwgMClcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcylcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFJldmVydHMgdGhlIGNhbnZhcyBiYWNrIHRvIGl0J3Mgb3JpZ2luYWwgc3RhdGUgd2hpbGVcbiAgIyBtYWludGFpbmluZyBhbnkgY3JvcHBlZCBvciByZXNpemVkIGRpbWVuc2lvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7IEJvb2xlYW4gfSBbdXBkYXRlQ29udGV4dD10cnVlXSBTaG91bGQgd2UgYXBwbHkgdGhlIHJldmVydGVkIHBpeGVsIGRhdGEgdG8gdGhlIGNhbnZhcyBjb250ZXh0IHRodXMgdHJpZ2dlcmluZyBhIHJlLXJlbmRlciBieSB0aGUgYnJvd3Nlcj9cbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICByZXZlcnQgKHVwZGF0ZUNvbnRleHQgPSB0cnVlKSB7XG4gICAgaWYgKCFDYW1hbi5hbGxvd1JldmVydCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXZlcnQgZGlzYWJsZWQnKVxuICAgIH1cblxuICAgIGNvbnN0IG9yaWdpbmFsVmlzaWJsZVBpeGVscyA9IHRoaXMub3JpZ2luYWxWaXNpYmxlUGl4ZWxzKClcbiAgICBmb3IgKGxldCBpID0gMCwgaiA9IG9yaWdpbmFsVmlzaWJsZVBpeGVscy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgIGxldCBwaXhlbCA9IG9yaWdpbmFsVmlzaWJsZVBpeGVsc1tpXVxuICAgICAgdGhpcy5waXhlbERhdGFbaV0gPSBwaXhlbFxuICAgIH1cblxuICAgIGlmICh1cGRhdGVDb250ZXh0KSB7XG4gICAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuaW1hZ2VEYXRhLCAwLCAwKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wbGV0ZWx5IHJlc2V0cyB0aGUgY2FudmFzIGJhY2sgdG8gaXQncyBvcmlnaW5hbCBzdGF0ZS5cbiAgICogQW55IHNpemUgYWRqdXN0bWVudHMgd2lsbCBhbHNvIGJlIHJlc2V0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHJlc2V0ICgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIFV0aWwuY29weUF0dHJpYnV0ZXModGhpcy5jYW52YXMsIGNhbnZhcylcblxuICAgIGNhbnZhcy53aWR0aCA9IHRoaXMub3JpZ2luYWxXaWR0aFxuICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLm9yaWdpbmFsSGVpZ2h0XG5cbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxuICAgIGNvbnN0IHBpeGVsRGF0YSA9IGltYWdlRGF0YS5kYXRhXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaW5pdGlhbGl6ZWRQaXhlbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwaXhlbCA9IHRoaXMuaW5pdGlhbGl6ZWRQaXhlbERhdGFbaV1cbiAgICAgIHBpeGVsRGF0YVtpXSA9IHBpeGVsXG4gICAgfVxuXG4gICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApXG5cbiAgICB0aGlzLmNyb3BDb29yZGluYXRlcyA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfVxuICAgIHRoaXMucmVzaXplZCA9IGZhbHNlXG4gICAgdGhpcy5yZXBsYWNlQ2FudmFzKGNhbnZhcylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBvcmlnaW5hbCBwaXhlbCBkYXRhIHdoaWxlIG1haW50YWluaW5nIGFueSBjcm9wcGluZyBvciByZXNpemluZyB0aGF0IG1heSBoYXZlIG9jY3VycmVkLlxuICAgKiAqKldhcm5pbmcqKjogdGhpcyBpcyBjdXJyZW50bHkgaW4gYmV0YSBzdGF0dXMuXG4gICAqIEByZXR1cm5zIHsgQXJyYXkgfSBPcmlnaW5hbCBwaXhlbCB2YWx1ZXMgc3RpbGwgdmlzaWJsZSBhZnRlciBjcm9wcGluZyBvciByZXNpemluZy5cbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICAvLyBUT0RPOlxuICBvcmlnaW5hbFZpc2libGVQaXhlbHMgKCkge1xuICAgIGlmICghQ2FtYW4uYWxsb3dSZXZlcnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmV2ZXJ0IGRpc2FibGVkJylcbiAgICB9XG5cbiAgICBjb25zdCBwaXhlbHMgPSBbXVxuICAgIHJldHVybiBwaXhlbHNcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoZXMgdGhlIGZpbHRlciBjYWxsYmFjayB0aGF0IG1vZGlmaWVzIHRoZSBSR0JBIG9iamVjdCBpbnRvIHRoZVxuICAjIHJlbmRlciBxdWV1ZS5cbiAgICpcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSBOYW1lIG9mIHRoZSBmaWx0ZXIgZnVuY3Rpb24uXG4gICAqIEBwYXJhbSB7IEZ1bmN0aW9uIH0gcHJvY2Vzc0ZuICBUaGUgRmlsdGVyIGZ1bmN0aW9uLlxuICAgKiBAcmV0dXJucyB7IENhbWFuIH1cbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICBwcm9jZXNzIChuYW1lLCBwcm9jZXNzRm4pIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZCh7XG4gICAgICB0eXBlOiBGaWx0ZXIuVHlwZS5TaW5nbGUsXG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgcHJvY2Vzc0ZuOiBwcm9jZXNzRm5cbiAgICB9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUHVzaGVzIHRoZSBrZXJuZWwgaW50byB0aGUgcmVuZGVyIHF1ZXVlLlxuICAgKlxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBrZXJuZWwuXG4gICAqIEBwYXJhbSB7IEFycmF5IH0gYWRqdXN0IFRoZSBjb252b2x1dGlvbiBrZXJuZWwgcmVwcmVzZW50ZWQgYXMgYSAxRCBhcnJheS5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gW2Rpdmlzb3I9bnVsbF0gVGhlIGRpdmlzb3IgZm9yIHRoZSBjb252b2x1dGlvbi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtiaWFzPTBdIFRoZSBiaWFzIGZvciB0aGUgY29udm9sdXRpb24uXG4gICAqIEByZXR1cm5zIHsgQ2FtYW4gfVxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHByb2Nlc3NLZXJuZWwgKG5hbWUsIGFkanVzdCwgZGl2aXNvciA9IG51bGwsIGJpYXMgPSAwKSB7XG4gICAgaWYgKCFkaXZpc29yKSB7XG4gICAgICBkaXZpc29yID0gMFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gYWRqdXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRpdmlzb3IgKz0gYWRqdXN0W2ldXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJlci5hZGQoe1xuICAgICAgdHlwZTogRmlsdGVyLlR5cGUuS2VybmVsLFxuICAgICAgbmFtZSxcbiAgICAgIGFkanVzdCxcbiAgICAgIGRpdmlzb3IsXG4gICAgICBiaWFzXG4gICAgfSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHN0YW5kYWxvbmUgcGx1Z2luIGludG8gdGhlIHJlbmRlciBxdWV1ZS5cbiAgICpcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gcGx1Z2luIE5hbWUgb2YgdGhlIHBsdWdpbi5cbiAgICogQHBhcmFtIHsgQXJyYXkgfSBhcmdzIEFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBwbHVnaW4uXG4gICAqIEByZXR1cm5zIHsgQ2FtYW4gfVxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHByb2Nlc3NQbHVnaW4gKHBsdWdpbiwgYXJncykge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkKHtcbiAgICAgIHR5cGU6IEZpbHRlci5UeXBlLlBsdWdpbixcbiAgICAgIHBsdWdpbixcbiAgICAgIGFyZ3NcbiAgICB9KVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoZXMgYSBuZXcgbGF5ZXIgb3BlcmF0aW9uIGludG8gdGhlIHJlbmRlciBxdWV1ZSBhbmQgY2FsbHMgdGhlIGxheWVyXG4gICMgY2FsbGJhY2suXG4gICAqXG4gICAqIEBwYXJhbSB7IEZ1bmN0aW9uIH0gY2FsbGJhY2sgIEZ1bmN0aW9uIHRoYXQgaXMgZXhlY3V0ZWQgd2l0aGluIHRoZSBjb250ZXh0IG9mIHRoZSBsYXllci5cbiAgICogQWxsIGZpbHRlciBhbmQgYWRqdXN0bWVudCBmdW5jdGlvbnMgZm9yIHRoZSBsYXllciB3aWxsIGJlIGV4ZWN1dGVkIGluc2lkZSBvZiB0aGlzIGZ1bmN0aW9uLlxuICAgKiBAcmV0dXJucyB7IENhbWFuIH1cbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICBuZXdMYXllciAoY2FsbGJhY2spIHtcbiAgICBjb25zdCBsYXllciA9IG5ldyBMYXllcih0aGlzKVxuICAgIHRoaXMuY2FudmFzUXVldWUucHVzaChsYXllcilcbiAgICB0aGlzLnJlbmRlcmVyLmFkZCh7XG4gICAgICB0eXBlOiBGaWx0ZXIuVHlwZS5MYXllckRlcXVldWVcbiAgICB9KVxuXG4gICAgY2FsbGJhY2suY2FsbChsYXllcilcblxuICAgIHRoaXMucmVuZGVyZXIuYWRkKHtcbiAgICAgIHR5cGU6IEZpbHRlci5UeXBlLkxheWVyRmluaXNoZWRcbiAgICB9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUHVzaGVzIHRoZSBsYXllciBjb250ZXh0IGFuZCBtb3ZlcyB0byB0aGUgbmV4dCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7IExheWVyIH0gbGF5ZXIgVGhlIGxheWVyIHRvIGV4ZWN1dGUuXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgZXhlY3V0ZUxheWVyIChsYXllcikge1xuICAgIHRoaXMucHVzaENvbnRleHQobGF5ZXIpXG4gIH1cblxuICAvKipcbiAgICogU2V0IGFsbCBvZiB0aGUgcmVsZXZhbnQgZGF0YSB0byB0aGUgbmV3IGxheWVyLlxuICAgKlxuICAgKiBAcGFyYW0geyBMYXllciB9IGxheWVyIFRoZSBsYXllciB3aG9zZSBjb250ZXh0IHdlIHdhbnQgdG8gc3dpdGNoIHRvLlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHB1c2hDb250ZXh0IChsYXllcikge1xuICAgIHRoaXMubGF5ZXJTdGFjay5wdXNoKHRoaXMuY3VycmVudExheWVyKVxuICAgIHRoaXMucGl4ZWxTdGFjay5wdXNoKHRoaXMucGl4ZWxEYXRhKVxuICAgIHRoaXMuY3VycmVudExheWVyID0gbGF5ZXJcbiAgICB0aGlzLnBpeGVsRGF0YSA9IGxheWVyLnBpeGVsRGF0YVxuICB9XG5cbiAgLy8gUmVzdG9yZSB0aGUgcHJldmlvdXMgbGF5ZXIgY29udGV4dC5cbiAgcG9wQ29udGV4dCAoKSB7XG4gICAgdGhpcy5waXhlbERhdGEgPSB0aGlzLnBpeGVsU3RhY2sucG9wKClcbiAgICB0aGlzLmN1cnJlbnRMYXllciA9IHRoaXMubGF5ZXJTdGFjay5wb3AoKVxuICB9XG5cbiAgLy8gQXBwbGllcyB0aGUgY3VycmVudCBsYXllciB0byBpdHMgcGFyZW50IGxheWVyLlxuICBhcHBseUN1cnJlbnRMYXllciAoKSB7XG4gICAgdGhpcy5jdXJyZW50TGF5ZXIuYXBwbHlUb1BhcmVudCgpXG4gIH1cblxuICAvKlxuICAgKiBHcmFicyB0aGUgY2FudmFzIGRhdGEsIGVuY29kZXMgaXQgdG8gQmFzZTY0LCB0aGVuIHNldHMgdGhlIGJyb3dzZXIgbG9jYXRpb24gdG8gdGhlIGVuY29kZWQgZGF0YSBzbyB0aGF0IHRoZSB1c2VyIHdpbGwgYmUgcHJvbXB0ZWQgdG8gZG93bmxvYWQgaXQuXG4gICAqIElmIHdlJ3JlIGluIE5vZGVKUywgdGhlbiB3ZSBjYW4gc2F2ZSB0aGUgaW1hZ2UgdG8gZGlzay5cbiAgICogQHNlZSBDYW1hblxuICAgKi9cbiAgc2F2ZSAoKSB7XG4gICAgaWYgKGV4cG9ydHMpIHtcbiAgICAgIHRoaXMubm9kZVNhdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJyb3dzZXJTYXZlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICB9XG4gIH1cblxuICBicm93c2VyU2F2ZSAodHlwZSA9ICdwbmcnKSB7XG4gICAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKVxuICAgIC8vIEZvcmNlIGRvd25sb2FkIChpdHMgYSBiaXQgaGFja2lzaClcbiAgICBjb25zdCBpbWFnZSA9IHRoaXMudG9CYXNlNjQodHlwZSkucmVwbGFjZShgaW1hZ2UvJHt0eXBlfWAsICdpbWFnZS9vY3RldC1zdHJlYW0nKVxuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBpbWFnZVxuICB9XG5cbiAgLy8gbm9kZVNhdmUgKGZpbGUsIG92ZXJ3cml0ZSA9IHRydWUsIGNhbGxiYWNrID0gbnVsbCkge1xuICAvLyAgIHRyeSB7XG4gIC8vICAgICBjb25zdCBzdGF0cyA9IGZzLnN0YXRTeW5jKGZpbGUpXG4gIC8vICAgICBpZiAoc3RhdHMuaXNGaWxlKCkgJiYgIW92ZXJ3cml0ZSkge1xuICAvLyAgICAgICByZXR1cm4gZmFsc2VcbiAgLy8gICAgIH1cbiAgLy8gICB9IGNhdGNoIChlKSB7XG4gIC8vICAgICBMb2cuZGVidWcoYENyZWF0aW5nIG91dHB1dCBmaWxlICR7ZmlsZX1gKVxuICAvLyAgIH1cblxuICAvLyAgIGZzLndyaXRlRmlsZShmaWxlLCB0aGlzLmNhbnZhcy50b0J1ZmZlcigpLCAoZXJyKSA9PiB7XG4gIC8vICAgICBMb2cuZGVidWcoYEZpbmlzaGVkIHdyaXRpbmcgdG8gJHtmaWxlfWApXG4gIC8vICAgICBpZiAoY2FsbGJhY2spIHtcbiAgLy8gICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBlcnIpXG4gIC8vICAgICB9XG4gIC8vICAgfSlcbiAgLy8gfVxuXG4gIC8qXG4gICAqIFRha2VzIHRoZSBjdXJyZW50IGNhbnZhcyBkYXRhLCBjb252ZXJ0cyBpdCB0byBCYXNlNjQsIHRoZW4gc2V0cyBpdCBhcyB0aGUgc291cmNlIG9mIGEgbmV3IEltYWdlIG9iamVjdCBhbmQgcmV0dXJucyBpdC5cbiAgICovXG4gIHRvSW1hZ2UgKHR5cGUpIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpXG4gICAgaW1nLnNyYyA9IHRoaXMudG9CYXNlNjQodHlwZSlcbiAgICBpbWcud2lkdGggPSB0aGlzLmRpbWVuc2lvbnMud2lkdGhcbiAgICBpbWcuaGVpZ2h0ID0gdGhpcy5kaW1lbnNpb25zLmhlaWdodFxuXG4gICAgaWYgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKSB7XG4gICAgICBpbWcud2lkdGggLz0gd2luZG93LmRldmljZVBpeGVsUmF0aW9cbiAgICAgIGltZy5oZWlnaHQgLz0gd2luZG93LmRldmljZVBpeGVsUmF0aW9cbiAgICB9XG4gICAgcmV0dXJuIGltZ1xuICB9XG5cbiAgLypcbiAgKiBCYXNlNjQgZW5jb2RlcyB0aGUgY3VycmVudCBjYW52YXNcbiAgKi9cbiAgdG9CYXNlNjQgKHR5cGUgPSAncG5nJykge1xuICAgIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKClcbiAgICByZXR1cm4gdGhpcy5jYW52YXMudG9EYXRhVVJMKGBpbWFnZS8ke3R5cGV9YClcbiAgfVxufVxuIiwiLyoqXG4gKlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gQmxlbmRlclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWdpc3RlckJsZW5kZXIoQmxlbmRlcikge1xuICAvLyBEaXJlY3RseSBhcHBseSB0aGUgY2hpbGQgbGF5ZXIncyBwaXhlbHMgdG8gdGhlIHBhcmVudCBsYXllciB3aXRoIG5vIHNwZWNpYWwgY2hhbmdlc1xuICBCbGVuZGVyLnJlZ2lzdGVyKCdub3JtYWwnLCAocmdiYUxheWVyLCByZ2JhUGFyZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHJnYmFMYXllci5yLFxuICAgICAgZzogcmdiYUxheWVyLmcsXG4gICAgICBiOiByZ2JhTGF5ZXIuYlxuICAgIH1cbiAgfSlcblxuICAvLyBBcHBseSB0aGUgY2hpbGQgdG8gdGhlIHBhcmVudCBieSBtdWx0aXBseWluZyB0aGUgY29sb3IgdmFsdWVzLiBUaGlzIGdlbmVyYWxseSBjcmVhdGVzIGNvbnRyYXN0LlxuICBCbGVuZGVyLnJlZ2lzdGVyKCdtdWx0aXBseScsIChyZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcjogKHJnYmFMYXllci5yICogcmdiYVBhcmVudC5yKSAvIDI1NSxcbiAgICAgIGc6IChyZ2JhTGF5ZXIuZyAqIHJnYmFQYXJlbnQuZykgLyAyNTUsXG4gICAgICBiOiAocmdiYUxheWVyLmIgKiByZ2JhUGFyZW50LmIpIC8gMjU1XG4gICAgfVxuICB9KVxuXG4gIEJsZW5kZXIucmVnaXN0ZXIoJ3NjcmVlbicsIChyZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcjogMjU1IC0gKCgoMjU1IC0gcmdiYUxheWVyLnIpICogKDI1NSAtIHJnYmFQYXJlbnQucikpIC8gMjU1KSxcbiAgICAgIGc6IDI1NSAtICgoKDI1NSAtIHJnYmFMYXllci5nKSAqICgyNTUgLSByZ2JhUGFyZW50LmcpKSAvIDI1NSksXG4gICAgICBiOiAyNTUgLSAoKCgyNTUgLSByZ2JhTGF5ZXIuYikgKiAoMjU1IC0gcmdiYVBhcmVudC5iKSkgLyAyNTUpXG4gICAgfVxuICB9KVxuXG4gIEJsZW5kZXIucmVnaXN0ZXIoJ292ZXJsYXknLCAocmdiYUxheWVyLCByZ2JhUGFyZW50KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0ge31cbiAgICByZXN1bHQuciA9IHJnYmFQYXJlbnQuciA+IDEyOCA/IDI1NSAtIDIgKiAoMjU1IC0gcmdiYUxheWVyLnIpICogKDI1NSAtIHJnYmFQYXJlbnQucikgLyAyNTUgOiAocmdiYVBhcmVudC5yICogcmdiYUxheWVyLnIgKiAyKSAvIDI1NVxuICAgIHJlc3VsdC5nID0gcmdiYVBhcmVudC5nID4gMTI4ID8gMjU1IC0gMiAqICgyNTUgLSByZ2JhTGF5ZXIuZykgKiAoMjU1IC0gcmdiYVBhcmVudC5nKSAvIDI1NSA6IChyZ2JhUGFyZW50LmcgKiByZ2JhTGF5ZXIuZyAqIDIpIC8gMjU1XG4gICAgcmVzdWx0LmIgPSByZ2JhUGFyZW50LmIgPiAxMjggPyAyNTUgLSAyICogKDI1NSAtIHJnYmFMYXllci5iKSAqICgyNTUgLSByZ2JhUGFyZW50LmIpIC8gMjU1IDogKHJnYmFQYXJlbnQuYiAqIHJnYmFMYXllci5iICogMikgLyAyNTVcblxuICAgIHJldHVybiByZXN1bHRcbiAgfSlcblxuICBCbGVuZGVyLnJlZ2lzdGVyKCdkaWZmZXJlbmNlJywgKHJnYmFMYXllciwgcmdiYVBhcmVudCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICByOiByZ2JhTGF5ZXIuciAtIHJnYmFQYXJlbnQucixcbiAgICAgIGc6IHJnYmFMYXllci5nIC0gcmdiYVBhcmVudC5nLFxuICAgICAgYjogcmdiYUxheWVyLmIgLSByZ2JhUGFyZW50LmJcbiAgICB9XG4gIH0pXG5cbiAgQmxlbmRlci5yZWdpc3RlcignYWRkaXRpb24nLCAocmdiYUxheWVyLCByZ2JhUGFyZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHJnYmFQYXJlbnQuciArIHJnYmFMYXllci5yLFxuICAgICAgZzogcmdiYVBhcmVudC5nICsgcmdiYUxheWVyLmcsXG4gICAgICBiOiByZ2JhUGFyZW50LmIgKyByZ2JhTGF5ZXIuYlxuICAgIH1cbiAgfSlcblxuICBCbGVuZGVyLnJlZ2lzdGVyKCdleGNsdXNpb24nLCAocmdiYUxheWVyLCByZ2JhUGFyZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IDEyOCAtIDIgKiAocmdiYVBhcmVudC5yIC0gMTI4KSAqIChyZ2JhTGF5ZXIuciAtIDEyOCkgLyAyNTUsXG4gICAgICBnOiAxMjggLSAyICogKHJnYmFQYXJlbnQuZyAtIDEyOCkgKiAocmdiYUxheWVyLmcgLSAxMjgpIC8gMjU1LFxuICAgICAgYjogMTI4IC0gMiAqIChyZ2JhUGFyZW50LmIgLSAxMjgpICogKHJnYmFMYXllci5iIC0gMTI4KSAvIDI1NVxuICAgIH1cbiAgfSlcblxuICBCbGVuZGVyLnJlZ2lzdGVyKCdzb2Z0TGlnaHQnLCAocmdiYUxheWVyLCByZ2JhUGFyZW50KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0ge31cblxuICAgIHJlc3VsdC5yID0gcmdiYVBhcmVudC5yID4gMTI4ID8gMjU1IC0gKCgyNTUgLSByZ2JhUGFyZW50LnIpICogKDI1NSAtIChyZ2JhTGF5ZXIuciAtIDEyOCkpKSAvIDI1NSA6IChyZ2JhUGFyZW50LnIgKiAocmdiYUxheWVyLnIgKyAxMjgpKSAvIDI1NVxuXG4gICAgcmVzdWx0LmcgPSByZ2JhUGFyZW50LmcgPiAxMjggPyAyNTUgLSAoKDI1NSAtIHJnYmFQYXJlbnQuZykgKiAoMjU1IC0gKHJnYmFMYXllci5nIC0gMTI4KSkpIC8gMjU1IDogKHJnYmFQYXJlbnQuZyAqIChyZ2JhTGF5ZXIuZyArIDEyOCkpIC8gMjU1XG5cbiAgICByZXN1bHQuYiA9IHJnYmFQYXJlbnQuYiA+IDEyOCA/IDI1NSAtICgoMjU1IC0gcmdiYVBhcmVudC5iKSAqICgyNTUgLSAocmdiYUxheWVyLmIgLSAxMjgpKSkgLyAyNTUgOiAocmdiYVBhcmVudC5iICogKHJnYmFMYXllci5iICsgMTI4KSkgLyAyNTVcblxuICAgIHJldHVybiByZXN1bHRcbiAgfSlcblxuICBCbGVuZGVyLnJlZ2lzdGVyKCdsaWdodGVuJywgKHJnYmFMYXllciwgcmdiYVBhcmVudCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICByOiByZ2JhUGFyZW50LnIgPiByZ2JhTGF5ZXIuciA/IHJnYmFQYXJlbnQuciA6IHJnYmFMYXllci5yLFxuICAgICAgZzogcmdiYVBhcmVudC5nID4gcmdiYUxheWVyLmcgPyByZ2JhUGFyZW50LmcgOiByZ2JhTGF5ZXIuZyxcbiAgICAgIGI6IHJnYmFQYXJlbnQuYiA+IHJnYmFMYXllci5iID8gcmdiYVBhcmVudC5iIDogcmdiYUxheWVyLmJcbiAgICB9XG4gIH0pXG5cbiAgQmxlbmRlci5yZWdpc3RlcignZGFya2VuJywgKHJnYmFMYXllciwgcmdiYVBhcmVudCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICByOiByZ2JhUGFyZW50LnIgPiByZ2JhTGF5ZXIuciA/IHJnYmFMYXllci5yIDogcmdiYVBhcmVudC5yLFxuICAgICAgZzogcmdiYVBhcmVudC5nID4gcmdiYUxheWVyLmcgPyByZ2JhTGF5ZXIuZyA6IHJnYmFQYXJlbnQuZyxcbiAgICAgIGI6IHJnYmFQYXJlbnQuYiA+IHJnYmFMYXllci5iID8gcmdiYUxheWVyLmIgOiByZ2JhUGFyZW50LmJcbiAgICB9XG4gIH0pXG59XG4iLCIvKipcbiAqIFRvbnMgb2YgY29sb3IgY29udmVyc2lvbiB1dGlsaXR5IGZ1bmN0aW9ucy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQ29udmVydFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb252ZXJ0IHtcbiAgLyoqXG4gICAqIENvbnZlcnRzIHRoZSBoZXggcmVwcmVzZW50YXRpb24gb2YgYSBjb2xvciB0byBSR0IgdmFsdWVzLlxuICAgKiBIZXggdmFsdWUgY2FuIG9wdGlvbmFsbHkgc3RhcnQgd2l0aCB0aGUgaGFzaCAoIykuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gaGV4IFRoZSBjb2xvcnMgaGV4IHZhbHVlXG4gICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gVGhlIFJHQiByZXByZXNlbnRhdGlvblxuICAgKiBAbWVtYmVyb2YgQ29udmVydFxuICAgKi9cbiAgc3RhdGljIGhleFRvUkdCIChoZXgpIHtcbiAgICBpZiAoaGV4LmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgICBoZXggPSBoZXguc3Vic3RyKDEpXG4gICAgfVxuICAgIGNvbnN0IHIgPSBwYXJzZUludChoZXguc3Vic3RyKDAsIDIpLCAxNilcbiAgICBjb25zdCBnID0gcGFyc2VJbnQoaGV4LnN1YnN0cigyLCAyKSwgMTYpXG4gICAgY29uc3QgYiA9IHBhcnNlSW50KGhleC5zdWJzdHIoNCwgMiksIDE2KVxuICAgIHJldHVybiB7IHIsIGcsIGIgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGFuIFJHQiBjb2xvciB0byBIU0wuXG4gICAqIEFzc3VtZXMgciwgZywgYW5kIGIgYXJlIGluIHRoZSBzZXQgWzAsIDI1NV0gYW5kXG4gICAqIHJldHVybnMgaCwgcywgYW5kIGwgaW4gdGhlIHNldCBbMCwgMV0uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gciBSZWQgY2hhbm5lbFxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBnIEdyZWVuIGNoYW5uZWxcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gYiBCbHVlIGNoYW5uZWxcbiAgICogQHJldHVybiB7IEFycmF5IH0gVGhlIEhTTCByZXByZXNlbnRhdGlvblxuICAgKiBAbWVtYmVyb2YgQ29udmVydFxuICAgKi9cbiAgc3RhdGljIHJnYlRvSFNMIChyLCBnLCBiKSB7XG4gICAgaWYgKHR5cGVvZiByID09PSAnb2JqZWN0Jykge1xuICAgICAgZyA9IHIuZ1xuICAgICAgYiA9IHIuYlxuICAgICAgciA9IHIuclxuICAgIH1cblxuICAgIHIgLz0gMjU1XG4gICAgZyAvPSAyNTVcbiAgICBiIC89IDI1NVxuXG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgociwgZywgYilcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKVxuICAgIGNvbnN0IGwgPSAobWF4ICsgbWluKSAvIDJcbiAgICBsZXQgaCwgc1xuICAgIGlmIChtYXggPT09IG1pbikge1xuICAgICAgaCA9IHMgPSAwXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGQgPSBtYXggLSBtaW5cbiAgICAgIHMgPSBsID4gMC41ID8gZCAvICgyIC0gbWF4IC0gbWluKSA6IGQgLyAobWF4ICsgbWluKVxuXG4gICAgICBpZiAobWF4ID09PSByKSB7XG4gICAgICAgIGggPSAoZyAtIGIpIC8gZCArIGcgPCBiID8gNiA6IDBcbiAgICAgIH0gZWxzZSBpZiAobWF4ID09PSBnKSB7XG4gICAgICAgIGggPSAoYiAtIHIpIC8gZCArIDJcbiAgICAgIH0gZWxzZSBpZiAobWF4ID09PSBiKSB7XG4gICAgICAgIGggPSAociAtIGcpIC8gZCArIDRcbiAgICAgIH1cblxuICAgICAgaCAvPSA2XG4gICAgfVxuICAgIHJldHVybiB7aCwgcywgbH1cbiAgfVxuXG4gIC8qKlxuICAgKiBvbnZlcnRzIGFuIEhTTCBjb2xvciB2YWx1ZSB0byBSR0IuIENvbnZlcnNpb24gZm9ybXVsYSBhZGFwdGVkIGZyb20gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9IU0xfY29sb3Jfc3BhY2UuXG4gICAqIEFzc3VtZXMgaCwgcywgYW5kIGwgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAxXSBhbmQgcmV0dXJucyByLCBnLCBhbmQgYiBpbiB0aGUgc2V0IFswLCAyNTVdLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IGggVGhlIGh1ZVxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBzIFRoZSBzYXR1cmF0aW9uXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IGwgVGhlIGxpZ2h0bmVzc1xuICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IFRoZSBSR0IgcmVwcmVzZW50YXRpb25cbiAgICogQG1lbWJlcm9mIENvbnZlcnRcbiAgICovXG4gIHN0YXRpYyBoc2xUb1JHQiAoaCwgcywgbCkge1xuICAgIGxldCByLCBnLCBiLCBwLCBxXG4gICAgaWYgKHR5cGVvZiBoID09PSAnb2JqZWN0Jykge1xuICAgICAgcyA9IGguc1xuICAgICAgbCA9IGgubFxuICAgICAgaCA9IGguaFxuICAgIH1cbiAgICBpZiAocyA9PT0gMCkge1xuICAgICAgciA9IGcgPSBiID0gbFxuICAgIH0gZWxzZSB7XG4gICAgICBxID0gbCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogc1xuICAgICAgcCA9IDIgKiBsIC0gcVxuXG4gICAgICByID0gdGhpcy5odWVUb1JHQihwLCBxLCBoICsgMSAvIDMpXG4gICAgICBnID0gdGhpcy5odWVUb1JHQihwLCBxLCBoKVxuICAgICAgYiA9IHRoaXMuaHVlVG9SR0IocCwgcSwgaCAtIDEgLyAzKVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgcjogciAqIDI1NSxcbiAgICAgIGc6IGcgKiAyNTUsXG4gICAgICBiOiBiICogMjU1XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGZyb20gdGhlIGh1ZSBjb2xvciBzcGFjZSBiYWNrIHRvIFJHQi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBwXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHFcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gdFxuICAgKiBAcmV0dXJucyB7IE51bWJlciB9IFJHQiB2YWx1ZVxuICAgKiBAbWVtYmVyb2YgQ29udmVydFxuICAgKi9cbiAgc3RhdGljIGh1ZVRvUkdCIChwLCBxLCB0KSB7XG4gICAgaWYgKHQgPCAwKSB7XG4gICAgICB0ICs9IDFcbiAgICB9XG4gICAgaWYgKHQgPiAxKSB7XG4gICAgICB0IC09IDFcbiAgICB9XG4gICAgaWYgKHQgPCAxIC8gNikge1xuICAgICAgcmV0dXJuIHAgKyAocSAtIHApICogNiAqIHRcbiAgICB9XG4gICAgaWYgKHQgPCAxIC8gMikge1xuICAgICAgcmV0dXJuIHFcbiAgICB9XG4gICAgaWYgKHQgPCAyIC8gMykge1xuICAgICAgcmV0dXJuIHAgKyAocSAtIHApICogKDIgLyAzIC0gdCkgKiA2XG4gICAgfVxuICAgIHJldHVybiBwXG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYW4gUkdCIGNvbG9yIHZhbHVlIHRvIEhTVi4gQ29udmVyc2lvbiBmb3JtdWxhIGFkYXB0ZWQgZnJvbSB7aHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9IU1ZfY29sb3Jfc3BhY2V9LlxuICAgKiBBc3N1bWVzIHIsIGcsIGFuZCBiIGFyZSBjb250YWluZWQgaW4gdGhlIHNldCBbMCwgMjU1XSBhbmQgcmV0dXJucyBoLCBzLCBhbmQgdiBpbiB0aGUgc2V0IFswLCAxXS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyp9IHIgVGhlIHJlZCBjb2xvciB2YWx1ZVxuICAgKiBAcGFyYW0geyp9IGcgVGhlIGdyZWVuIGNvbG9yIHZhbHVlXG4gICAqIEBwYXJhbSB7Kn0gYiBUaGUgYmx1ZSBjb2xvciB2YWx1ZVxuICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IFRoZSBIU1YgcmVwcmVzZW50YXRpb25cbiAgICogQG1lbWJlcm9mIENvbnZlcnRcbiAgICovXG4gIHN0YXRpYyByZ2JUb0hTViAociwgZywgYikge1xuICAgIHIgLz0gMjU1XG4gICAgZyAvPSAyNTVcbiAgICBiIC89IDI1NVxuXG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgociwgZywgYilcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKVxuICAgIGNvbnN0IHYgPSBtYXhcbiAgICBjb25zdCBkID0gbWF4IC0gbWluXG5cbiAgICBjb25zdCBzID0gbWF4ID09PSAwID8gMCA6IGQgLyBtYXhcbiAgICBsZXQgaFxuICAgIGlmIChtYXggPT09IG1pbikge1xuICAgICAgaCA9IDBcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG1heCA9PT0gcikge1xuICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyBnIDwgYiA/IDYgOiAwXG4gICAgICB9IGVsc2UgaWYgKG1heCA9PT0gZykge1xuICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyXG4gICAgICB9IGVsc2UgaWYgKG1heCA9PT0gYikge1xuICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0XG4gICAgICB9XG4gICAgICBoIC89IDZcbiAgICB9XG5cbiAgICByZXR1cm4ge2gsIHMsIHZ9XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYW4gSFNWIGNvbG9yIHZhbHVlIHRvIFJHQi4gQ29udmVyc2lvbiBmb3JtdWxhIGFkYXB0ZWQgZnJvbSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hTVl9jb2xvcl9zcGFjZS5cbiAgICogQXNzdW1lcyBoLCBzLCBhbmQgdiBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDFdIGFuZCByZXR1cm5zIHIsIGcsIGFuZCBiIGluIHRoZSBzZXQgWzAsIDI1NV0uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gaCBUaGUgaHVlXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHMgVGhlIHNhdHVyYXRpb25cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gdiBUaGUgdmFsdWVcbiAgICogQHJldHVybnMgeyBPYmplY3QgfSBUaGUgUkdCIHJlcHJlc2VudGF0aW9uXG4gICAqIEBtZW1iZXJvZiBDb252ZXJ0XG4gICAqL1xuICBzdGF0aWMgaHN2VG9SR0IgKGgsIHMsIHYpIHtcbiAgICBjb25zdCBpID0gTWF0aC5mbG9vcihoICogNilcbiAgICBjb25zdCBmID0gaCAqIDYgLSBpXG4gICAgY29uc3QgcCA9IHYgKiAoMSAtIHMpXG4gICAgY29uc3QgcSA9IHYgKiAoMSAtIGYgKiBzKVxuICAgIGNvbnN0IHQgPSB2ICogKDEgLSAoMSAtIGYpICogcylcblxuICAgIGxldCByLCBnLCBiXG4gICAgc3dpdGNoIChpICUgNikge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByID0gdlxuICAgICAgICBnID0gdFxuICAgICAgICBiID0gcFxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAxOlxuICAgICAgICByID0gcVxuICAgICAgICBnID0gdlxuICAgICAgICBiID0gcFxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyOlxuICAgICAgICByID0gcFxuICAgICAgICBnID0gdlxuICAgICAgICBiID0gdFxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAzOlxuICAgICAgICByID0gcFxuICAgICAgICBnID0gcVxuICAgICAgICBiID0gdlxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA0OlxuICAgICAgICByID0gdFxuICAgICAgICBnID0gcFxuICAgICAgICBiID0gdlxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA1OlxuICAgICAgICByID0gdlxuICAgICAgICBnID0gcFxuICAgICAgICBiID0gcVxuICAgICAgICBicmVha1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICByOiBNYXRoLmZsb29yKHIgKiAyNTUpLFxuICAgICAgZzogTWF0aC5mbG9vcihnICogMjU1KSxcbiAgICAgIGI6IE1hdGguZmxvb3IoYiAqIDI1NSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBSR0IgY29sb3IgdmFsdWUgdG8gdGhlIFhZWiBjb2xvciBzcGFjZS4gRm9ybXVsYXMgYXJlIGJhc2VkIG9uIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU1JHQiBhc3N1bWluZyB0aGF0IFJHQiB2YWx1ZXMgYXJlIHNSR0IuXG4gICAqIEFzc3VtZXMgciwgZywgYW5kIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdIGFuZCByZXR1cm5zIHgsIHksIGFuZCB6LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHIgVGhlIHJlZCBjb2xvciB2YWx1ZVxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBnIFRoZSBncmVlbiBjb2xvciB2YWx1ZVxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBiIFRoZSBibHVlIGNvbG9yIHZhbHVlXG4gICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gVGhlIFhZWiByZXByZXNlbnRhdGlvblxuICAgKiBAbWVtYmVyb2YgQ29udmVydFxuICAgKi9cbiAgc3RhdGljIHJnYlRvWFlaIChyLCBnLCBiKSB7XG4gICAgciAvPSAyNTVcbiAgICBnIC89IDI1NVxuICAgIGIgLz0gMjU1XG5cbiAgICBpZiAociA+IDAuMDQwNDUpIHtcbiAgICAgIHIgPSBNYXRoLnBvdygociArIDAuMDU1KSAvIDEuMDU1LCAyLjQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHIgLz0gMTIuOTJcbiAgICB9XG5cbiAgICBpZiAoZyA+IDAuMDQwNDUpIHtcbiAgICAgIGcgPSBNYXRoLnBvdygoZyArIDAuMDU1KSAvIDEuMDU1LCAyLjQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGcgLz0gMTIuOTJcbiAgICB9XG5cbiAgICBpZiAoYiA+IDAuMDQwNDUpIHtcbiAgICAgIGIgPSBNYXRoLnBvdygoYiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGIgLz0gMTIuOTJcbiAgICB9XG5cbiAgICBjb25zdCB4ID0gciAqIDAuNDEyNCArIGcgKiAwLjM1NzYgKyBiICogMC4xODA1XG4gICAgY29uc3QgeSA9IHIgKiAwLjIxMjYgKyBnICogMC43MTUyICsgYiAqIDAuMDcyMlxuICAgIGNvbnN0IHogPSByICogMC4wMTkzICsgZyAqIDAuMTE5MiArIGIgKiAwLjk1MDVcblxuICAgIHJldHVybiB7XG4gICAgICB4OiB4ICogMTAwLFxuICAgICAgeTogeSAqIDEwMCxcbiAgICAgIHo6IHogKiAxMDBcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBYWVogY29sb3IgdmFsdWUgdG8gdGhlIHNSR0IgY29sb3Igc3BhY2UuIEZvcm11bGFzIGFyZSBiYXNlZCBvbiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NSR0IgYW5kIHRoZSByZXN1bHRpbmcgUkdCIHZhbHVlIHdpbGwgYmUgaW4gdGhlIHNSR0IgY29sb3Igc3BhY2UuXG4gICAqIEFzc3VtZXMgeCwgeSBhbmQgeiB2YWx1ZXMgYXJlIHdoYXRldmVyIHRoZXkgYXJlIGFuZCByZXR1cm5zIHIsIGcgYW5kIGIgaW4gdGhlIHNldCBbMCwgMjU1XS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB4IFRoZSBYIHZhbHVlXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHkgVGhlIFkgdmFsdWVcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0geiBUaGUgWiB2YWx1ZVxuICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IFRoZSBSR0IgcmVwcmVzZW50YXRpb25cbiAgICogQG1lbWJlcm9mIENvbnZlcnRcbiAgICovXG4gIHN0YXRpYyB4eXpUb1JHQiAoeCwgeSwgeikge1xuICAgIHggLz0gMTAwXG4gICAgeSAvPSAxMDBcbiAgICB6IC89IDEwMFxuXG4gICAgbGV0IHIgPSAoMy4yNDA2ICogeCkgKyAoLTEuNTM3MiAqIHkpICsgKC0wLjQ5ODYgKiB6KVxuICAgIGxldCBnID0gKC0wLjk2ODkgKiB4KSArICgxLjg3NTggKiB5KSArICgwLjA0MTUgKiB6KVxuICAgIGxldCBiID0gKDAuMDU1NyAqIHgpICsgKC0wLjIwNDAgKiB5KSArICgxLjA1NzAgKiB6KVxuXG4gICAgaWYgKHIgPiAwLjAwMzEzMDgpIHtcbiAgICAgIHIgPSAoMS4wNTUgKiBNYXRoLnBvdyhyLCAwLjQxNjY2NjY2NjcpKSAtIDAuMDU1XG4gICAgfSBlbHNlIHtcbiAgICAgIHIgKj0gMTIuOTJcbiAgICB9XG5cbiAgICBpZiAoZyA+IDAuMDAzMTMwOCkge1xuICAgICAgZyA9ICgxLjA1NSAqIE1hdGgucG93KGcsIDAuNDE2NjY2NjY2NykpIC0gMC4wNTVcbiAgICB9IGVsc2Uge1xuICAgICAgZyAqPSAxMi45MlxuICAgIH1cblxuICAgIGlmIChiID4gMC4wMDMxMzA4KSB7XG4gICAgICBiID0gKDEuMDU1ICogTWF0aC5wb3coYiwgMC40MTY2NjY2NjY3KSkgLSAwLjA1NVxuICAgIH0gZWxzZSB7XG4gICAgICBiICo9IDEyLjkyXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHIgKiAyNTUsXG4gICAgICBnOiBnICogMjU1LFxuICAgICAgYjogYiAqIDI1NVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIFhZWiBjb2xvciB2YWx1ZSB0byB0aGUgQ0lFTEFCIGNvbG9yIHNwYWNlLiBGb3JtdWxhcyBhcmUgYmFzZWQgb24gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MYWJfY29sb3Jfc3BhY2UgVGhlIHJlZmVyZW5jZSB3aGl0ZSBwb2ludCB1c2VkIGluIHRoZSBjb252ZXJzaW9uIGlzIEQ2NS5cbiAgICogQXNzdW1lcyB4LCB5IGFuZCB6IHZhbHVlcyBhcmUgd2hhdGV2ZXIgdGhleSBhcmUgYW5kIHJldHVybnMgTCosIGEqIGFuZCBiKiB2YWx1ZXNcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB4IFRoZSBYIHZhbHVlXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHkgVGhlIFkgdmFsdWVcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0geiBUaGUgWiB2YWx1ZVxuICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IFRoZSBMYWIgcmVwcmVzZW50YXRpb25cbiAgICogQG1lbWJlcm9mIENvbnZlcnRcbiAgICovXG4gIHN0YXRpYyB4eXpUb0xhYiAoeCwgeSwgeikge1xuICAgIGlmICh0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHkgPSB4LnlcbiAgICAgIHogPSB4LnpcbiAgICAgIHggPSB4LnhcbiAgICB9XG5cbiAgICBjb25zdCB3aGl0ZVggPSA5NS4wNDdcbiAgICBjb25zdCB3aGl0ZVkgPSAxMDAuMFxuICAgIGNvbnN0IHdoaXRlWiA9IDEwOC44ODNcblxuICAgIHggLz0gd2hpdGVYXG4gICAgeSAvPSB3aGl0ZVlcbiAgICB6IC89IHdoaXRlWlxuXG4gICAgaWYgKHggPiAwLjAwODg1NjQ1MTY3OSkge1xuICAgICAgeCA9IE1hdGgucG93KHgsIDAuMzMzMzMzMzMzMylcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9ICg3Ljc4NzAzNzAzNyAqIHgpICsgMC4xMzc5MzEwMzQ1XG4gICAgfVxuXG4gICAgaWYgKHkgPiAwLjAwODg1NjQ1MTY3OSkge1xuICAgICAgeSA9IE1hdGgucG93KHksIDAuMzMzMzMzMzMzMylcbiAgICB9IGVsc2Uge1xuICAgICAgeSA9ICg3Ljc4NzAzNzAzNyAqIHkpICsgMC4xMzc5MzEwMzQ1XG4gICAgfVxuXG4gICAgaWYgKHogPiAwLjAwODg1NjQ1MTY3OSkge1xuICAgICAgeiA9IE1hdGgucG93KHosIDAuMzMzMzMzMzMzMylcbiAgICB9IGVsc2Uge1xuICAgICAgeiA9ICg3Ljc4NzAzNzAzNyAqIHopICsgMC4xMzc5MzEwMzQ1XG4gICAgfVxuXG4gICAgY29uc3QgbCA9IDExNiAqIHkgLSAxNlxuICAgIGNvbnN0IGEgPSA1MDAgKiAoeCAtIHkpXG4gICAgY29uc3QgYiA9IDIwMCAqICh5IC0geilcblxuICAgIHJldHVybiB7IGwsIGEsIGIgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgTCosIGEqLCBiKiBjb2xvciB2YWx1ZXMgZnJvbSB0aGUgQ0lFTEFCIGNvbG9yIHNwYWNlIHRvIHRoZSBYWVogY29sb3Igc3BhY2UuIEZvcm11bGFzIGFyZSBiYXNlZCBvbiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xhYl9jb2xvcl9zcGFjZSBUaGUgcmVmZXJlbmNlIHdoaXRlIHBvaW50IHVzZWQgaW4gdGhlIGNvbnZlcnNpb24gaXMgRDY1LlxuICAgKiBBc3N1bWVzIEwqLCBhKiBhbmQgYiogdmFsdWVzIGFyZSB3aGF0ZXZlciB0aGV5IGFyZSBhbmQgcmV0dXJucyB4LCB5IGFuZCB6IHZhbHVlcy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyp9IGwgVGhlIEwqIHZhbHVlXG4gICAqIEBwYXJhbSB7Kn0gYSBUaGUgYSogdmFsdWVcbiAgICogQHBhcmFtIHsqfSBiIFRoZSBiKiB2YWx1ZVxuICAgKiBAcmV0dXJucyAgeyBPYmplY3QgfSBUaGUgWFlaIHJlcHJlc2VudGF0aW9uXG4gICAqIEBtZW1iZXJvZiBDb252ZXJ0XG4gICAqL1xuICBzdGF0aWMgbGFiVG9YWVogKGwsIGEsIGIpIHtcbiAgICBpZiAodHlwZW9mIGwgPT09ICdvYmplY3QnKSB7XG4gICAgICBhID0gbC5hXG4gICAgICBiID0gbC5iXG4gICAgICBsID0gbC5sXG4gICAgfVxuXG4gICAgbGV0IHkgPSAobCArIDE2KSAvIDExNlxuICAgIGxldCB4ID0geSArIChhIC8gNTAwKVxuICAgIGxldCB6ID0geSAtIChiIC8gMjAwKVxuXG4gICAgaWYgKHggPiAwLjIwNjg5NjU1MTcpIHtcbiAgICAgIHggPSB4ICogeCAqIHhcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IDAuMTI4NDE4NTQ5MyAqICh4IC0gMC4xMzc5MzEwMzQ1KVxuICAgIH1cbiAgICBpZiAoeSA+IDAuMjA2ODk2NTUxNykge1xuICAgICAgeSA9IHkgKiB5ICogeVxuICAgIH0gZWxzZSB7XG4gICAgICB5ID0gMC4xMjg0MTg1NDkzICogKHkgLSAwLjEzNzkzMTAzNDUpXG4gICAgfVxuICAgIGlmICh6ID4gMC4yMDY4OTY1NTE3KSB7XG4gICAgICB6ID0geiAqIHogKiB6XG4gICAgfSBlbHNlIHtcbiAgICAgIHogPSAwLjEyODQxODU0OTMgKiAoeiAtIDAuMTM3OTMxMDM0NSlcbiAgICB9XG5cbiAgICAvLyBENjUgcmVmZXJlbmNlIHdoaXRlIHBvaW50XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHggKiA5NS4wNDcsXG4gICAgICB5OiB5ICogMTAwLjAsXG4gICAgICB6OiB6ICogMTA4Ljg4M1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBMKiwgYSosIGIqIGJhY2sgdG8gUkdCIHZhbHVlcy5cbiAgICogQHNlZSBDb252ZXJ0LnJnYlRvWFlaXG4gICAqIEBzZWUgQ29udmVydC54eXpUb0xhYlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7Kn0gciBUaGUgcmVkIGNvbG9yIHZhbHVlXG4gICAqIEBwYXJhbSB7Kn0gZyBUaGUgZ3JlZW4gY29sb3IgdmFsdWVcbiAgICogQHBhcmFtIHsqfSBiIFRoZSBibHVlIGNvbG9yIHZhbHVlXG4gICAqIEBtZW1iZXJvZiBDb252ZXJ0XG4gICAqL1xuICBzdGF0aWMgcmdiVG9MYWIgKHIsIGcsIGIpIHtcbiAgICBpZiAodHlwZW9mIHIgPT09ICdvYmplY3QnKSB7XG4gICAgICBnID0gci5nXG4gICAgICBiID0gci5iXG4gICAgICByID0gci5yXG4gICAgfVxuXG4gICAgY29uc3QgeHl6ID0gdGhpcy5yZ2JUb1hZWihyLCBnLCBiKVxuICAgIHJldHVybiB0aGlzLnh5elRvTGFiKHh5eilcbiAgfVxufVxuIiwiLyoqXG4gKiBWYXJpb3VzIG1hdGgtaGVhdnkgaGVscGVycyB0aGF0IGFyZSB1c2VkIHRocm91Z2hvdXQgQ2FtYW5KUy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQ2FsY3VsYXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGN1bGF0ZSB7XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBwb2ludHMuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0geDEgMXN0IHBvaW50IHgtY29vcmRpbmF0ZS5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0geTEgMXN0IHBvaW50IHktY29vcmRpbmF0ZS5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0geDIgMm5kIHBvaW50IHgtY29vcmRpbmF0ZS5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0geTIgMm5kIHBvaW50IHktY29vcmRpbmF0ZS5cbiAgICogQHJldHVybnMgeyBOdW1iZXIgfSBUaGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgdHdvIHBvaW50cy5cbiAgICogQG1lbWJlcm9mIENhbGN1bGF0ZVxuICAgKi9cbiAgc3RhdGljIGRpc3RhbmNlICh4MSwgeTEsIHgyLCB5Mikge1xuICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coeDIgLSB4MSwgMikgKyBNYXRoLnBvdyh5MiAtIHkxLCAyKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBwc2V1ZG9yYW5kb20gbnVtYmVyIHRoYXQgbGllcyB3aXRoaW4gdGhlIG1heCAtIG1peCByYW5nZS4gVGhlIG51bWJlciBjYW4gYmUgZWl0aGVyIGFuIGludGVnZXIgb3IgYSBmbG9hdCBkZXBlbmRpbmcgb24gd2hhdCB0aGUgdXNlciBzcGVjaWZpZXMuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gbWluIFRoZSBsb3dlciBib3VuZCAoaW5jbHVzaXZlKS5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gbWF4IFRoZSB1cHBlciBib3VuZCAoaW5jbHVzaXZlKS5cbiAgICogQHBhcmFtIHsgQm9vbGVhbiB9IGdldEZsb2F0IFJldHVybiBhIEZsb2F0IG9yIGEgcm91bmRlZCBJbnRlZ2VyP1xuICAgKiBAcmV0dXJucyB7IE51bWJlciB9IFRoZSBwc2V1ZG9yYW5kb20gbnVtYmVyLCBlaXRoZXIgYXMgYSBmbG9hdCBvciBpbnRlZ2VyLlxuICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRlXG4gICAqL1xuICBzdGF0aWMgcmFuZG9tUmFuZ2UgKG1pbiwgbWF4LCBnZXRGbG9hdCA9IGZhbHNlKSB7XG4gICAgY29uc3QgcmFuZCA9IG1pbiArIChNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpXG4gICAgaWYgKGdldEZsb2F0KSB7XG4gICAgICByZXR1cm4gcmFuZC50b0ZpeGVkKGdldEZsb2F0KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChyYW5kKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBsdW1pbmFuY2Ugb2YgYSBzaW5nbGUgcGl4ZWwgdXNpbmcgYSBzcGVjaWFsIHdlaWdodGVkIHN1bS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBPYmplY3QgfSByZ2JhIFJHQkEgb2JqZWN0IGRlc2NyaWJpbmcgYSBzaW5nbGUgcGl4ZWwuXG4gICAqIEByZXR1cm5zIHsgTnVtYmVyIH0gVGhlIGx1bWluYW5jZSB2YWx1ZSBvZiB0aGUgcGl4ZWwuXG4gICAqIEBtZW1iZXJvZiBDYWxjdWxhdGVcbiAgICovXG4gIHN0YXRpYyBsdW1pbmFuY2UgKHJnYmEpIHtcbiAgICByZXR1cm4gKDAuMjk5ICogcmdiYS5yKSArICgwLjU4NyAqIHJnYmEuZykgKyAoMC4xMTQgKiByZ2JhLmIpXG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgYmV6aWVyIGN1cnZlIGdpdmVuIGEgc3RhcnQgYW5kIGVuZCBwb2ludCwgd2l0aCBjb250cm9sIHBvaW50cyBpbiBiZXR3ZWVuLlxuICAgKiBDYW4gYWxzbyBvcHRpb25hbGx5IGJvdW5kIHRoZSB5IHZhbHVlcyBiZXR3ZWVuIGEgbG93IGFuZCBoaWdoIGJvdW5kLlxuICAgKiBUaGlzIGlzIGRpZmZlcmVudCB0aGFuIG1vc3QgYmV6aWVyIGN1cnZlIGZ1bmN0aW9ucyBiZWNhdXNlIGl0IGF0dGVtcHRzIHRvIGNvbnN0cnVjdCBpdCBpbiBzdWNoIGEgd2F5IHRoYXQgd2UgY2FuIHVzZSBpdCBtb3JlIGxpa2UgYSBzaW1wbGUgaW5wdXQgLT4gb3V0cHV0IHN5c3RlbSwgb3IgYSBvbmUtdG8tb25lIGZ1bmN0aW9uLlxuICAgKiBJbiBvdGhlciB3b3JkcyB3ZSBjYW4gcHJvdmlkZSBhbiBpbnB1dCBjb2xvciB2YWx1ZSwgYW5kIGltbWVkaWF0ZWx5IHJlY2VpdmUgYW4gb3V0cHV0IG1vZGlmaWVkIGNvbG9yIHZhbHVlLlxuICAgKiBOb3RlIHRoYXQsIGJ5IGRlc2lnbiwgdGhpcyBkb2VzIG5vdCBmb3JjZSBYIHZhbHVlcyB0byBiZSBpbiB0aGUgcmFuZ2UgWzAuLjI1NV0uIFRoaXMgaXMgdG8gZ2VuZXJhbGl6ZSB0aGUgZnVuY3Rpb24gYSBiaXQgbW9yZS4gSWYgeW91IGdpdmUgaXQgYSBzdGFydGluZyBYIHZhbHVlIHRoYXQgaXNuJ3QgMCwgYW5kL29yIGEgZW5kaW5nIFggdmFsdWUgdGhhdCBpc24ndCAyNTUsIHlvdSBtYXkgcnVuIGludG8gcHJvYmxlbXMgd2l0aCB5b3VyIGZpbHRlciFcbiAgICpcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBBcnJheSB9IGNvbnRyb2xQb2ludHMgMi1pdGVtIGFycmF5cyBkZXNjcmliaW5nIHRoZSB4LCB5IGNvb3JkaW5hdGVzIG9mIHRoZSBjb250cm9sIHBvaW50cy4gTWluaW11bSB0d28uXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IFtsb3dCb3VuZD0wXSBNaW5pbXVtIHBvc3NpYmxlIHZhbHVlIGZvciBhbnkgeS12YWx1ZSBpbiB0aGUgY3VydmUuXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IFtoaWdoQm91bmQ9MjU1XSBNYXhpbXVtIHBvc3NpYmxlIHZhbHVlIGZvciBhbnkgeS12YWx1ZSBpbiB0aGUgY3VydmUuXG4gICAqIEByZXR1cm5zIHsgQXJyYXkgfSBBcnJheSB3aG9zZSBpbmRleCByZXByZXNlbnRzIGV2ZXJ5IHgtdmFsdWUgYmV0d2VlbiBzdGFydCBhbmQgZW5kLCBhbmQgdmFsdWUgcmVwcmVzZW50cyB0aGUgY29ycmVzcG9uZGluZyB5LXZhbHVlLlxuICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRlXG4gICAqL1xuICBzdGF0aWMgYmV6aWVyIChjb250cm9sUG9pbnRzLCBsb3dCb3VuZCA9IDAsIGhpZ2hCb3VuZCA9IDI1NSkge1xuICAgIGlmIChjb250cm9sUG9pbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBudW1iZXIgb2YgYXJndW1lbnRzIHRvIGJlemllcicpXG4gICAgfVxuXG4gICAgbGV0IGJlemllciA9IHt9XG4gICAgY29uc3QgbGVycCA9IChhLCBiLCB0KSA9PiBhICogKDEgLSB0KSArIGIgKiB0XG4gICAgY29uc3QgY2xhbXAgPSAoYSwgbWluLCBtYXgpID0+IE1hdGgubWluKE1hdGgubWF4KGEsIG1pbiksIG1heClcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwMDsgaSsrKSB7XG4gICAgICBsZXQgdCA9IGkgLyAxMDAwXG4gICAgICBsZXQgcHJldiA9IGNvbnRyb2xQb2ludHNcblxuICAgICAgd2hpbGUgKHByZXYubGVuZ3RoID4gMSkge1xuICAgICAgICBjb25zdCBuZXh0ID0gW11cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gcHJldi5sZW5ndGggLSAyOyBqKyspIHtcbiAgICAgICAgICBuZXh0LnB1c2goW1xuICAgICAgICAgICAgbGVycChwcmV2W2pdWzBdLCBwcmV2W2ogKyAxXVswXSwgdCksXG4gICAgICAgICAgICBsZXJwKHByZXZbal1bMV0sIHByZXZbaiArIDFdWzFdLCB0KVxuICAgICAgICAgIF0pXG4gICAgICAgIH1cbiAgICAgICAgcHJldiA9IG5leHRcbiAgICAgIH1cblxuICAgICAgYmV6aWVyW01hdGgucm91bmQocHJldlswXVswXSldID0gTWF0aC5yb3VuZChjbGFtcChwcmV2WzBdWzFdLCBsb3dCb3VuZCwgaGlnaEJvdW5kKSlcbiAgICB9XG5cbiAgICBjb25zdCBlbmRYID0gY29udHJvbFBvaW50c1tjb250cm9sUG9pbnRzLmxlbmd0aCAtIDFdWzBdXG4gICAgYmV6aWVyID0gQ2FsY3VsYXRlLm1pc3NpbmdWYWx1ZXMoYmV6aWVyLCBlbmRYKVxuXG4gICAgLy8gRWRnZSBjYXNlXG4gICAgaWYgKCFiZXppZXJbZW5kWF0pIHtcbiAgICAgIGJlemllcltlbmRYXSA9IGJlemllcltlbmRYIC0gMV1cbiAgICB9XG5cbiAgICByZXR1cm4gYmV6aWVyXG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyBwb3NzaWJsZSBtaXNzaW5nIHZhbHVlcyBmcm9tIGEgZ2l2ZW4gdmFsdWUgYXJyYXkuIE5vdGUgdGhhdCB0aGlzIHJldHVybnMgYSBjb3B5IGFuZCBkb2VzIG5vdCBtdXRhdGUgdGhlIG9yaWdpbmFsLiBJbiBjYXNlIG5vIHZhbHVlcyBhcmUgbWlzc2luZyB0aGUgb3JpZ2luYWwgYXJyYXkgaXMgcmV0dXJuZWQgYXMgdGhhdCBpcyBjb252ZW5pZW50LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IEFycmF5IH0gMi1pdGVtIGFycmF5cyBkZXNjcmliaW5nIHRoZSB4LCB5IGNvb3JkaW5hdGVzIG9mIHRoZSBjb250cm9sIHBvaW50cy5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gZW5kIHggdmFsdWUgb2YgdGhlIGFycmF5IChtYXhpbXVtKVxuICAgKiBAcmV0dXJuIHsgQXJyYXkgfSBBcnJheSB3aG9zZSBpbmRleCByZXByZXNlbnRzIGV2ZXJ5IHgtdmFsdWUgYmV0d2VlbiBzdGFydCBhbmQgZW5kLCBhbmQgdmFsdWUgcmVwcmVzZW50cyB0aGUgY29ycmVzcG9uZGluZyB5LXZhbHVlLlxuICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRlXG4gICAqL1xuICBzdGF0aWMgbWlzc2luZ1ZhbHVlcyAodmFsdWVzLCBlbmRYKSB7XG4gICAgLy8gRG8gYSBzZWFyY2ggZm9yIG1pc3NpbmcgdmFsdWVzIGluIHRoZSBiZXppZXIgYXJyYXkgYW5kIHVzZSBsaW5lYXJcbiAgICAvLyBpbnRlcnBvbGF0aW9uIHRvIGFwcHJveGltYXRlIHRoZWlyIHZhbHVlc1xuICAgIGlmIChPYmplY3Qua2V5cyh2YWx1ZXMpLmxlbmd0aCA8IGVuZFggKyAxKSB7XG4gICAgICBjb25zdCByZXQgPSB7fVxuICAgICAgbGV0IGxlZnRDb29yZCwgcmlnaHRDb29yZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gZW5kWDsgaSsrKSB7XG4gICAgICAgIGlmICh2YWx1ZXNbaV0pIHtcbiAgICAgICAgICByZXRbaV0gPSB2YWx1ZXNbaV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZWZ0Q29vcmQgPSBbaSAtIDEsIHJldFtpIC0gMV1dXG4gICAgICAgICAgLy8gRmluZCB0aGUgZmlyc3QgdmFsdWUgdG8gdGhlIHJpZ2h0LiBJZGVhbGx5IHRoaXMgbG9vcCB3aWxsIGJyZWFrXG4gICAgICAgICAgLy8gdmVyeSBxdWlja2x5LlxuICAgICAgICAgIGZvciAobGV0IGogPSBpOyBqIDw9IGVuZFg7IGorKykge1xuICAgICAgICAgICAgaWYgKHZhbHVlc1tqXSkge1xuICAgICAgICAgICAgICByaWdodENvb3JkID0gW2osIHZhbHVlc1tqXV1cbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0W2ldID0gbGVmdENvb3JkWzFdICsgKChyaWdodENvb3JkWzFdIC0gbGVmdENvb3JkWzFdKSAvIChyaWdodENvb3JkWzBdIC0gbGVmdENvb3JkWzBdKSkgKiAoaSAtIGxlZnRDb29yZFswXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJldFxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzXG4gIH1cbn1cbiIsIi8vIFRoZSBmaWx0ZXJzIGRlZmluZSBhbGwgb2YgdGhlIGJ1aWx0LWluIGZ1bmN0aW9uYWxpdHkgdGhhdCBjb21lcyB3aXRoIENhbWFuIChhcyBvcHBvc2VkIHRvIGJlaW5nICBwcm92aWRlZCBieSBhIHBsdWdpbikuIEFsbCBvZiB0aGVzZSBmaWx0ZXJzIGFyZSByYXRoZXJiYXNpYywgYnV0IGFyZSBleHRyZW1lbHkgcG93ZXJmdWwgd2hlbiBtYW55IGFyZSBjb21iaW5lZC4gRm9yIGluZm9ybWF0aW9uIG9uIGNyZWF0aW5nIHBsdWdpbnMsIGNoZWNrIG91dCB0aGUgW1BsdWdpbiBDcmVhdGlvbl0oaHR0cDovL2NhbWFuanMuY29tL2RvY3MvcGx1Z2luLWNyZWF0aW9uKSBwYWdlLCBhbmQgZm9yIGluZm9ybWF0aW9uIG9uIHVzaW5nIHRoZSBwbHVnaW5zLCBjaGVjayBvdXQgdGhlIFtCdWlsdC1JbiBGdW5jdGlvbmFsaXR5KGh0dHA6Ly9jYW1hbmpzLmNvbS9kb2NzL2J1aWx0LWluKSBwYWdlLlxuXG5pbXBvcnQgQ29udmVydCBmcm9tICcuLi9jb3JlL2NvbnZlcnQnXG5pbXBvcnQgQ2FsY3VsYXRlIGZyb20gJy4uL2NvcmUvY2FsY3VsYXRlJ1xuXG4vKipcbiAqXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsqfSBGaWx0ZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVnaXN0ZXJGaWx0ZXIgKEZpbHRlcikge1xuICAvKlxuICAqIEZpbGwgQ29sb3JcbiAgKiBGaWxscyB0aGUgY2FudmFzIHdpdGggYSBzaW5nbGUgc29saWQgY29sb3IuXG4gICogQXJndW1lbnRzOiBDYW4gdGFrZSBlaXRoZXIgc2VwYXJhdGUgUiwgRywgYW5kIEIgdmFsdWVzIGFzIGFyZ3VtZW50cywgb3IgYSBzaW5nbGUgaGV4IGNvbG9yIHZhbHVlLlxuICAqL1xuICBGaWx0ZXIucmVnaXN0ZXIoJ2ZpbGxDb2xvcicsIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgbGV0IGNvbG9yXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb2xvciA9IENvbnZlcnQuaGV4VG9SR0IoYXJnc1swXSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29sb3IgPSB7XG4gICAgICAgIHI6IGFyZ3NbMF0sXG4gICAgICAgIGc6IGFyZ3NbMV0sXG4gICAgICAgIGI6IGFyZ3NbMl1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wcm9jZXNzKCdmaWxsQ29sb3InLCAocmdiYSkgPT4ge1xuICAgICAgcmdiYS5yID0gY29sb3IuclxuICAgICAgcmdiYS5nID0gY29sb3IuZ1xuICAgICAgcmdiYS5iID0gY29sb3IuYlxuICAgICAgcmdiYS5hID0gMjU1XG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBCcmlnaHRuZXNzXG4gICogU2ltcGxlIGJyaWdodG5lc3MgYWRqdXN0bWVudC5cbiAgKiBBcmd1bWVudHM6IFJhbmdlIGlzIC0xMDAgdG8gMTAwLiBWYWx1ZXMgPCAwIHdpbGwgZGFya2VuIGltYWdlIHdoaWxlIHZhbHVlcyA+IDAgd2lsbCBicmlnaHRlbi5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdicmlnaHRuZXNzJywgZnVuY3Rpb24gKGFkanVzdCkge1xuICAgIGFkanVzdCA9IE1hdGguZmxvb3IoMjU1ICogKGFkanVzdCAvIDEwMCkpXG4gICAgdGhpcy5wcm9jZXNzKCdicmlnaHRuZXNzJywgKHJnYmEpID0+IHtcbiAgICAgIHJnYmEuciArPSBhZGp1c3RcbiAgICAgIHJnYmEuZyArPSBhZGp1c3RcbiAgICAgIHJnYmEuYiArPSBhZGp1c3RcbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIFNhdHVyYXRpb25cbiAgKiBBZGp1c3RzIHRoZSBjb2xvciBzYXR1cmF0aW9uIG9mIHRoZSBpbWFnZS5cbiAgKiBBcmd1bWVudHM6IFJhbmdlIGlzIC0xMDAgdG8gMTAwLiBWYWx1ZXMgPCAwIHdpbGwgZGVzYXR1cmF0ZSB0aGUgaW1hZ2Ugd2hpbGUgdmFsdWVzID4gMCB3aWxsIHNhdHVyYXRlIGl0LlxuICAqIElmIHlvdSB3YW50IHRvIGNvbXBsZXRlbHkgZGVzYXR1cmF0ZSB0aGUgaW1hZ2UsIHVzaW5nIHRoZSBncmV5c2NhbGUgZmlsdGVyIGlzIGhpZ2hseSByZWNvbW1lbmRlZCBiZWNhdXNlIGl0IHdpbGwgeWllbGQgYmV0dGVyIHJlc3VsdHMuXG4gICovXG4gIEZpbHRlci5yZWdpc3Rlcignc2F0dXJhdGlvbicsIGZ1bmN0aW9uIChhZGp1c3QpIHtcbiAgICBhZGp1c3QgKj0gLTAuMDFcbiAgICB0aGlzLnByb2Nlc3MoJ3NhdHVyYXRpb24nLCAocmdiYSkgPT4ge1xuICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgocmdiYS5yLCByZ2JhLmcsIHJnYmEuYilcblxuICAgICAgaWYgKHJnYmEuciAhPT0gbWF4KSB7XG4gICAgICAgIHJnYmEuciArPSAobWF4IC0gcmdiYS5yKSAqIGFkanVzdFxuICAgICAgfVxuICAgICAgaWYgKHJnYmEuZyAhPT0gbWF4KSB7XG4gICAgICAgIHJnYmEuZyArPSAobWF4IC0gcmdiYS5nKSAqIGFkanVzdFxuICAgICAgfVxuICAgICAgaWYgKHJnYmEuYiAhPT0gbWF4KSB7XG4gICAgICAgIHJnYmEuYiArPSAobWF4IC0gcmdiYS5iKSAqIGFkanVzdFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBWaWJyYW5jZVxuICAqIFNpbWlsYXIgdG8gc2F0dXJhdGlvbiwgYnV0IGFkanVzdHMgdGhlIHNhdHVyYXRpb24gbGV2ZWxzIGluIGEgc2xpZ2h0bHkgc21hcnRlciwgbW9yZSBzdWJ0bGUgd2F5LlxuICAqIFZpYnJhbmNlIHdpbGwgYXR0ZW1wdCB0byBib29zdCBjb2xvcnMgdGhhdCBhcmUgbGVzcyBzYXR1cmF0ZWQgbW9yZSBhbmQgYm9vc3QgYWxyZWFkeSBzYXR1cmF0ZWQgY29sb3JzIGxlc3MsIHdoaWxlIHNhdHVyYXRpb24gYm9vc3RzIGFsbCBjb2xvcnMgYnkgdGhlIHNhbWUgbGV2ZWwuXG4gICogQXJndW1lbnRzOiBSYW5nZSBpcyAtMTAwIHRvIDEwMC4gVmFsdWVzIDwgMCB3aWxsIGRlc2F0dXJhdGUgdGhlIGltYWdlIHdoaWxlIHZhbHVlcyA+IDAgd2lsbCBzYXR1cmF0ZSBpdC5cbiAgKiBJZiB5b3Ugd2FudCB0byBjb21wbGV0ZWx5IGRlc2F0dXJhdGUgdGhlIGltYWdlLCB1c2luZyB0aGUgZ3JleXNjYWxlIGZpbHRlciBpcyBoaWdobHkgcmVjb21tZW5kZWQgYmVjYXVzZSBpdCB3aWxsIHlpZWxkIGJldHRlciByZXN1bHRzLlxuICAqL1xuICBGaWx0ZXIucmVnaXN0ZXIoJ3ZpYnJhbmNlJywgZnVuY3Rpb24gKGFkanVzdCkge1xuICAgIGFkanVzdCAqPSAtMVxuICAgIHRoaXMucHJvY2VzcygndmlicmFuY2UnLCAocmdiYSkgPT4ge1xuICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgocmdiYS5yLCByZ2JhLmcsIHJnYmEuYilcbiAgICAgIGNvbnN0IGF2ZyA9IChyZ2JhLnIgKyByZ2JhLmcgKyByZ2JhLmIpIC8gM1xuICAgICAgY29uc3QgYW10ID0gKChNYXRoLmFicyhtYXggLSBhdmcpICogMiAvIDI1NSkgKiBhZGp1c3QpIC8gMTAwXG5cbiAgICAgIGlmIChyZ2JhLnIgIT09IG1heCkge1xuICAgICAgICByZ2JhLnIgKz0gKG1heCAtIHJnYmEucikgKiBhbXRcbiAgICAgIH1cbiAgICAgIGlmIChyZ2JhLmcgIT09IG1heCkge1xuICAgICAgICByZ2JhLmcgKz0gKG1heCAtIHJnYmEuZykgKiBhbXRcbiAgICAgIH1cbiAgICAgIGlmIChyZ2JhLmIgIT09IG1heCkge1xuICAgICAgICByZ2JhLmIgKz0gKG1heCAtIHJnYmEuYikgKiBhbXRcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogR3JleXNjYWxlXG4gICogQW4gaW1wcm92ZWQgZ3JleXNjYWxlIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIG1ha2UgcHJldHRpZXIgcmVzdWx0cyB0aGFuIHNpbXBseSB1c2luZyB0aGUgc2F0dXJhdGlvbiBmaWx0ZXIgdG8gcmVtb3ZlIGNvbG9yLiBJdCBkb2VzIHNvIGJ5IHVzaW5nIGZhY3RvcnMgdGhhdCBkaXJlY3RseSByZWxhdGUgdG8gaG93IHRoZSBodW1hbiBleWUgcGVyY2V2ZXMgY29sb3IgYW5kIHZhbHVlcy4gVGhlcmUgYXJlIG5vIGFyZ3VtZW50cywgaXQgc2ltcGx5IG1ha2VzIHRoZSBpbWFnZSBncmV5c2NhbGUgd2l0aCBubyBpbi1iZXR3ZWVuLlxuICAqIEFsZ29yaXRobSBhZG9wdGVkIGZyb20gaHR0cDovL3d3dy5waHBpZWQuY29tL2ltYWdlLWZ1bi9cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdncmV5c2NhbGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5wcm9jZXNzKCdncmV5c2NhbGUnLCAocmdiYSkgPT4ge1xuICAgICAgY29uc3QgYXZnID0gQ2FsY3VsYXRlLmx1bWluYW5jZShyZ2JhKVxuICAgICAgcmdiYS5yID0gYXZnXG4gICAgICByZ2JhLmcgPSBhdmdcbiAgICAgIHJnYmEuYiA9IGF2Z1xuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogQ29udHJhc3RcbiAgKiBJbmNyZWFzZXMgb3IgZGVjcmVhc2VzIHRoZSBjb2xvciBjb250cmFzdCBvZiB0aGUgaW1hZ2UuXG4gICogQXJndW1lbnRzOiBSYW5nZSBpcyAtMTAwIHRvIDEwMC4gVmFsdWVzIDwgMCB3aWxsIGRlY3JlYXNlIGNvbnRyYXN0IHdoaWxlIHZhbHVlcyA+IDAgd2lsbCBpbmNyZWFzZSBjb250cmFzdC5cbiAgKiBUaGUgY29udHJhc3QgYWRqdXN0bWVudCB2YWx1ZXMgYXJlIGEgYml0IHNlbnNpdGl2ZS4gV2hpbGUgdW5yZXN0cmljdGVkLCBzYW5lIGFkanVzdG1lbnQgdmFsdWVzIGFyZSB1c3VhbGx5IGFyb3VuZCA1LTEwLlxuICAqL1xuICBGaWx0ZXIucmVnaXN0ZXIoJ2NvbnRyYXN0JywgZnVuY3Rpb24oYWRqdXN0KSB7XG4gICAgYWRqdXN0ID0gTWF0aC5wb3coKGFkanVzdCArIDEwMCkgLyAxMDAsIDIpXG4gICAgdGhpcy5wcm9jZXNzKCdjb250cmFzdCcsIChyZ2JhKSA9PiB7XG4gICAgICAvLyBSZWQgY2hhbm5lbFxuICAgICAgcmdiYS5yIC89IDI1NVxuICAgICAgcmdiYS5yIC09IDAuNVxuICAgICAgcmdiYS5yICo9IGFkanVzdFxuICAgICAgcmdiYS5yICs9IDAuNVxuICAgICAgcmdiYS5yICo9IDI1NVxuXG4gICAgICAvLyBHcmVlbiBjaGFubmVsXG4gICAgICByZ2JhLmcgLz0gMjU1XG4gICAgICByZ2JhLmcgLT0gMC41XG4gICAgICByZ2JhLmcgKj0gYWRqdXN0XG4gICAgICByZ2JhLmcgKz0gMC41XG4gICAgICByZ2JhLmcgKj0gMjU1XG5cbiAgICAgIC8vIEJsdWUgY2hhbm5lbFxuICAgICAgcmdiYS5iIC89IDI1NVxuICAgICAgcmdiYS5iIC09IDAuNVxuICAgICAgcmdiYS5iICo9IGFkanVzdFxuICAgICAgcmdiYS5iICs9IDAuNVxuICAgICAgcmdiYS5iICo9IDI1NVxuXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBIdWVcbiAgKiBBZGp1c3RzIHRoZSBodWUgb2YgdGhlIGltYWdlLiBJdCBjYW4gYmUgdXNlZCB0byBzaGlmdCB0aGUgY29sb3JzIGluIGFuIGltYWdlIGluIGEgdW5pZm9ybSBmYXNoaW9uLiBJZiB5b3UgYXJlIHVuZmFtaWxpYXIgd2l0aCBIdWUsIEkgcmVjb21tZW5kIHJlYWRpbmcgdGhpcyBbV2lraXBlZGlhIGFydGljbGVdKGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSHVlKS5cbiAgKiBBcmd1bWVudHM6IFJhbmdlIGlzIDAgdG8gMTAwXG4gICogU29tZXRpbWVzLCBIdWUgaXMgZXhwcmVzc2VkIGluIHRoZSByYW5nZSBvZiAwIHRvIDM2MC4gSWYgdGhhdCdzIHRoZSB0ZXJtaW5vbG9neSB5b3UncmUgdXNlZCB0bywgdGhpbmsgb2YgMCB0byAxMDAgcmVwcmVzZW50aW5nIHRoZSBwZXJjZW50YWdlIG9mIEh1ZSBzaGlmdCBpbiB0aGUgMCB0byAzNjAgcmFuZ2UuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignaHVlJywgZnVuY3Rpb24gKGFkanVzdCkge1xuICAgIHRoaXMucHJvY2VzcygnaHVlJywgKHJnYmEpID0+IHtcbiAgICAgIGNvbnN0IGhzdiA9IENvbnZlcnQucmdiVG9IU1YocmdiYS5yLCByZ2JhLmcsIHJnYmEuYilcblxuICAgICAgbGV0IGggPSBoc3YuaCAqIDEwMFxuICAgICAgaCArPSBNYXRoLmFicyhhZGp1c3QpXG4gICAgICBoID0gaCAlIDEwMFxuICAgICAgaCAvPSAxMDBcbiAgICAgIGhzdi5oID0gaFxuXG4gICAgICBjb25zdCB7ciwgZywgYn0gPSBDb252ZXJ0LmhzdlRvUkdCKGhzdi5oLCBoc3YucywgaHN2LnYpXG4gICAgICByZ2JhLnIgPSByXG4gICAgICByZ2JhLmcgPSBnXG4gICAgICByZ2JhLmIgPSBiXG5cbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIENvbG9yaXplXG4gICogVW5pZm9ybWx5IHNoaWZ0cyB0aGUgY29sb3JzIGluIGFuIGltYWdlIHRvd2FyZHMgdGhlIGdpdmVuIGNvbG9yLiBUaGUgYWRqdXN0bWVudCByYW5nZSBpcyBmcm9tIDAgdG8gMTAwLiBUaGUgaGlnaGVyIHRoZSB2YWx1ZSwgdGhlIGNsb3NlciB0aGUgY29sb3JzIGluIHRoZSBpbWFnZSBzaGlmdCB0b3dhcmRzIHRoZSBnaXZlbiBhZGp1c3RtZW50IGNvbG9yLlxuICAqIEFyZ3VtZW50czogVGhpcyBmaWx0ZXIgaXMgcG9seW1vcnBoaWMgYW5kIGNhbiB0YWtlIHR3byBkaWZmZXJlbnQgc2V0cyBvZiBhcmd1bWVudHMuIEVpdGhlciBhIGhleCBjb2xvciBzdHJpbmcgYW5kIGFuIGFkanVzdG1lbnQgdmFsdWUsIG9yIFJHQiBjb2xvcnMgYW5kIGFuIGFkanVzdG1lbnQgdmFsdWUuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignY29sb3JpemUnLCBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGxldCByZ2IsIGxldmVsXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAyKSB7XG4gICAgICByZ2IgPSBDb252ZXJ0LmhleFRvUkdCKGFyZ3NbMF0pXG4gICAgICBsZXZlbCA9IGFyZ3NbMV1cbiAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09PSA0KSB7XG4gICAgICByZ2IgPSB7XG4gICAgICAgIHI6IGFyZ3NbMF0sXG4gICAgICAgIGc6IGFyZ3NbMV0sXG4gICAgICAgIGI6IGFyZ3NbMl1cbiAgICAgIH1cbiAgICAgIGxldmVsID0gYXJnc1szXVxuICAgIH1cblxuICAgIHRoaXMucHJvY2VzcygnY29sb3JpemUnLCAocmdiYSkgPT4ge1xuICAgICAgcmdiYS5yIC09IChyZ2JhLnIgLSByZ2IucikgKiAobGV2ZWwgLyAxMDApXG4gICAgICByZ2JhLmcgLT0gKHJnYmEuZyAtIHJnYi5nKSAqIChsZXZlbCAvIDEwMClcbiAgICAgIHJnYmEuYiAtPSAocmdiYS5iIC0gcmdiLmIpICogKGxldmVsIC8gMTAwKVxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogSW52ZXJ0XG4gICogSW52ZXJ0cyBhbGwgY29sb3JzIGluIHRoZSBpbWFnZSBieSBzdWJ0cmFjdGluZyBlYWNoIGNvbG9yIGNoYW5uZWwgdmFsdWUgZnJvbSAyNTUuIE5vIGFyZ3VtZW50cy5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdpbnZlcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5wcm9jZXNzKCdpbnZlcnQnLCAocmdiYSkgPT4ge1xuICAgICAgcmdiYS5yID0gMjU1IC0gcmdiYS5yXG4gICAgICByZ2JhLmcgPSAyNTUgLSByZ2JhLmdcbiAgICAgIHJnYmEuYiA9IDI1NSAtIHJnYmEuYlxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogU2VwaWFcbiAgKiBBcHBsaWVzIGFuIGFkanVzdGFibGUgc2VwaWEgZmlsdGVyIHRvIHRoZSBpbWFnZS5cbiAgKiBBcmd1bWVudHM6IEFzc3VtZXMgYWRqdXN0bWVudCBpcyBiZXR3ZWVuIDAgYW5kIDEwMCwgd2hpY2ggcmVwcmVzZW50cyBob3cgbXVjaCB0aGUgc2VwaWEgZmlsdGVyIGlzIGFwcGxpZWQuXG4gICovXG4gIEZpbHRlci5yZWdpc3Rlcignc2VwaWEnLCBmdW5jdGlvbiAoYWRqdXN0ID0gMTAwKSB7XG4gICAgYWRqdXN0IC89IDEwMFxuICAgIHRoaXMucHJvY2Vzcygnc2VwaWEnLCAocmdiYSkgPT4ge1xuICAgICAgLy8gQWxsIHRocmVlIGNvbG9yIGNoYW5uZWxzIGhhdmUgc3BlY2lhbCBjb252ZXJzaW9uIGZhY3RvcnMgdGhhdFxuICAgICAgLy8gZGVmaW5lIHdoYXQgc2VwaWEgaXMuIEhlcmUgd2UgYWRqdXN0IGVhY2ggY2hhbm5lbCBpbmRpdmlkdWFsbHksXG4gICAgICAvLyB3aXRoIHRoZSB0d2lzdCB0aGF0IHlvdSBjYW4gcGFydGlhbGx5IGFwcGx5IHRoZSBzZXBpYSBmaWx0ZXIuXG4gICAgICByZ2JhLnIgPSBNYXRoLm1pbigyNTUsIChyZ2JhLnIgKiAoMSAtICgwLjYwNyAqIGFkanVzdCkpKSArIChyZ2JhLmcgKiAoMC43NjkgKiBhZGp1c3QpKSArIChyZ2JhLmIgKiAoMC4xODkgKiBhZGp1c3QpKSlcbiAgICAgIHJnYmEuZyA9IE1hdGgubWluKDI1NSwgKHJnYmEuciAqICgwLjM0OSAqIGFkanVzdCkpICsgKHJnYmEuZyAqICgxIC0gKDAuMzE0ICogYWRqdXN0KSkpICsgKHJnYmEuYiAqICgwLjE2OCAqIGFkanVzdCkpKVxuICAgICAgcmdiYS5iID0gTWF0aC5taW4oMjU1LCAocmdiYS5yICogKDAuMjcyICogYWRqdXN0KSkgKyAocmdiYS5nICogKDAuNTM0ICogYWRqdXN0KSkgKyAocmdiYS5iICogKDEgLSAoMC44NjkgKiBhZGp1c3QpKSkpXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBHYW1tYVxuICAqIEFkanVzdHMgdGhlIGdhbW1hIG9mIHRoZSBpbWFnZS5cbiAgKiBBcmd1bWVudHM6IFJhbmdlIGlzIGZyb20gMCB0byBpbmZpbml0eSwgYWx0aG91Z2ggc2FuZSB2YWx1ZXMgYXJlIGZyb20gMCB0byA0IG9yIDUuXG4gICogVmFsdWVzIGJldHdlZW4gMCBhbmQgMSB3aWxsIGxlc3NlbiB0aGUgY29udHJhc3Qgd2hpbGUgdmFsdWVzIGdyZWF0ZXIgdGhhbiAxIHdpbGwgaW5jcmVhc2UgaXQuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignZ2FtbWEnLCBmdW5jdGlvbiAoYWRqdXN0KSB7XG4gICAgdGhpcy5wcm9jZXNzKCdnYW1tYScsIChyZ2JhKSA9PiB7XG4gICAgICByZ2JhLnIgPSBNYXRoLnBvdyhyZ2JhLnIgLyAyNTUsIGFkanVzdCkgKiAyNTVcbiAgICAgIHJnYmEuZyA9IE1hdGgucG93KHJnYmEuZyAvIDI1NSwgYWRqdXN0KSAqIDI1NVxuICAgICAgcmdiYS5iID0gTWF0aC5wb3cocmdiYS5iIC8gMjU1LCBhZGp1c3QpICogMjU1XG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBOb2lzZVxuICAqIEFkZHMgbm9pc2UgdG8gdGhlIGltYWdlIG9uIGEgc2NhbGUgZnJvbSAxIC0gMTAwLiBIb3dldmVyLCB0aGUgc2NhbGUgaXNuJ3QgY29uc3RyYWluZWQsIHNvIHlvdSBjYW4gc3BlY2lmeSBhIHZhbHVlID4gMTAwIGlmIHlvdSB3YW50IGEgTE9UIG9mIG5vaXNlLlxuICAqL1xuICBGaWx0ZXIucmVnaXN0ZXIoJ25vaXNlJywgZnVuY3Rpb24gKGFkanVzdCkge1xuICAgIGFkanVzdCA9IE1hdGguYWJzKGFkanVzdCkgKiAyLjU1XG5cbiAgICB0aGlzLnByb2Nlc3MoJ25vaXNlJywgKHJnYmEpID0+IHtcbiAgICAgIGNvbnN0IHJhbmQgPSBDYWxjdWxhdGUucmFuZG9tUmFuZ2UoYWRqdXN0ICogLTEsIGFkanVzdClcbiAgICAgIHJnYmEuciArPSByYW5kXG4gICAgICByZ2JhLmcgKz0gcmFuZFxuICAgICAgcmdiYS5iICs9IHJhbmRcbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIENsaXBcbiAgKiBDbGlwcyBhIGNvbG9yIHRvIG1heCB2YWx1ZXMgd2hlbiBpdCBmYWxscyBvdXRzaWRlIG9mIHRoZSBzcGVjaWZpZWQgcmFuZ2UuXG4gICogQXJndW1lbnRzOiBzdXBwbGllZCB2YWx1ZSBzaG91bGQgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignY2xpcCcsIGZ1bmN0aW9uIChhZGp1c3QpIHtcbiAgICBhZGp1c3QgPSBNYXRoLmFicyhhZGp1c3QpICogMi41NVxuXG4gICAgdGhpcy5wcm9jZXNzKCdjbGlwJywgKHJnYmEpID0+IHtcbiAgICAgIGlmIChyZ2JhLnIgPiAyNTUgLSBhZGp1c3QpIHtcbiAgICAgICAgcmdiYS5yID0gMjU1XG4gICAgICB9IGVsc2UgaWYgKHJnYmEuciA8IGFkanVzdCkge1xuICAgICAgICByZ2JhLnIgPSAwXG4gICAgICB9XG5cbiAgICAgIGlmIChyZ2JhLmcgPiAyNTUgLSBhZGp1c3QpIHtcbiAgICAgICAgcmdiYS5nID0gMjU1XG4gICAgICB9IGVsc2UgaWYgKHJnYmEuZyA8IGFkanVzdCkge1xuICAgICAgICByZ2JhLmcgPSAwXG4gICAgICB9XG5cbiAgICAgIGlmIChyZ2JhLmIgPiAyNTUgLSBhZGp1c3QpIHtcbiAgICAgICAgcmdiYS5iID0gMjU1XG4gICAgICB9IGVsc2UgaWYgKHJnYmEuYiA8IGFkanVzdCkge1xuICAgICAgICByZ2JhLmIgPSAwXG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIENoYW5uZWxzXG4gICogTGV0cyB5b3UgbW9kaWZ5IHRoZSBpbnRlbnNpdHkgb2YgYW55IGNvbWJpbmF0aW9uIG9mIHJlZCwgZ3JlZW4sIG9yIGJsdWUgY2hhbm5lbHMgaW5kaXZpZHVhbGx5LlxuICAqIEFyZ3VtZW50czogTXVzdCBiZSBnaXZlbiBhdCBsZWFzdCBvbmUgY29sb3IgY2hhbm5lbCB0byBhZGp1c3QgaW4gb3JkZXIgdG8gd29yay5cbiAgKiBPcHRpb25zIGZvcm1hdCAobXVzdCBzcGVjaWZ5IDEgLSAzIGNvbG9ycyk6XG4gICoge1xuICAqICAgcmVkOiAyMCxcbiAgKiAgIGdyZWVuOiAtNSxcbiAgKiAgIGJsdWU6IC00MFxuICAqIH1cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdjaGFubmVscycsIGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgZm9yIChsZXQgY2hhbiBpbiBvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShjaGFuKSkge1xuICAgICAgICBpZiAob3B0aW9uc1tjaGFuXSA9PT0gMCkge1xuICAgICAgICAgIGRlbGV0ZSBvcHRpb25zW2NoYW5dXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zW2NoYW5dIC89IDEwMFxuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgdGhpcy5wcm9jZXNzKCdjaGFubmVscycsIChyZ2JhKSA9PiB7XG4gICAgICBpZiAob3B0aW9ucy5yZWQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMucmVkID4gMCkge1xuICAgICAgICAgIHJnYmEuciArPSAoMjU1IC0gcmdiYS5yKSAqIG9wdGlvbnMucmVkXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmdiYS5yIC09IHJnYmEuciAqIE1hdGguYWJzKG9wdGlvbnMucmVkKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy5ncmVlbikge1xuICAgICAgICBpZiAob3B0aW9ucy5ncmVlbiA+IDApIHtcbiAgICAgICAgICByZ2JhLmcgKz0gKDI1NSAtIHJnYmEuZykgKiBvcHRpb25zLmdyZWVuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmdiYS5nIC09IHJnYmEuZyAqIE1hdGguYWJzKG9wdGlvbnMuZ3JlZW4pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLmJsdWUpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYmx1ZSA+IDApIHtcbiAgICAgICAgICByZ2JhLmIgKz0gKDI1NSAtIHJnYmEuYikgKiBvcHRpb25zLmJsdWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZ2JhLmIgLT0gcmdiYS5iICogTWF0aC5hYnMob3B0aW9ucy5ibHVlKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIEN1cnZlc1xuICAqIEN1cnZlcyBpbXBsZW1lbnRhdGlvbiB1c2luZyBCZXppZXIgY3VydmUgZXF1YXRpb24uIElmIHlvdSdyZSBmYW1pbGlhciB3aXRoIHRoZSBDdXJ2ZXMgZnVuY3Rpb25hbGl0eSBpbiBQaG90b3Nob3AsIHRoaXMgd29ya3MgaW4gYSB2ZXJ5IHNpbWlsYXIgZmFzaGlvbi5cbiAgKiBBcmd1bWVudHM6XG4gICogY2hhbiAtIFtyLCBnLCBiLCByZ2JdXG4gICogY3BzIC0gW3gsIHldKiAoY3VydmUgY29udHJvbCBwb2ludHMsIG1pbi4gMjsgMCAtIDI1NSlcbiAgKiBhbGdvIC0gZnVuY3Rpb24gKG9wdGlvbmFsKVxuICAqXG4gICogVGhlIGZpcnN0IGFyZ3VtZW50IHJlcHJlc2VudHMgdGhlIGNoYW5uZWxzIHlvdSB3aXNoIHRvIG1vZGlmeSB3aXRoIHRoZSBmaWx0ZXIuIEl0IGNhbiBiZSBhbiBhcnJheSBvZiBjaGFubmVscyBvciBhIHN0cmluZyAoZm9yIGEgc2luZ2xlIGNoYW5uZWwpLiBUaGUgcmVzdCBvZiB0aGUgYXJndW1lbnRzIGFyZSAyLWVsZW1lbnQgYXJyYXlzIHRoYXQgcmVwcmVzZW50IHBvaW50IGNvb3JkaW5hdGVzLiBUaGV5IGFyZSBzcGVjaWZpZWQgaW4gdGhlIHNhbWUgb3JkZXIgYXMgc2hvd24gaW4gdGhpcyBpbWFnZSB0byB0aGUgcmlnaHQuIFRoZSBjb29yZGluYXRlcyBhcmUgaW4gdGhlIHJhbmdlIG9mIDAgdG8gMjU1IGZvciBib3RoIFggYW5kIFkgdmFsdWVzLlxuICAqIEl0IGlzIHBvc3NpYmxlIHRvIHBhc3MgdGhlIGZ1bmN0aW9uIGFuIG9wdGlvbmFsIGZ1bmN0aW9uIGRlc2NyaWJpbmcgd2hpY2ggY3VydmUgYWxnb3JpdGhtIHRvIHVzZS5cbiAgKiBJdCBkZWZhdWx0cyB0byBiZXppZXIuXG4gICogVGhlIHgtYXhpcyByZXByZXNlbnRzIHRoZSBpbnB1dCB2YWx1ZSBmb3IgYSBzaW5nbGUgY2hhbm5lbCwgd2hpbGUgdGhlIHktYXhpcyByZXByZXNlbnRzIHRoZSBvdXRwdXQgdmFsdWUuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignY3VydmVzJywgZnVuY3Rpb24gKGNoYW5zLCAuLi5jcHMpIHtcbiAgICBjb25zdCBsYXN0ID0gY3BzW2Nwcy5sZW5ndGggLSAxXVxuICAgIGxldCBhbGdvXG4gICAgaWYgKHR5cGVvZiBsYXN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhbGdvID0gbGFzdFxuICAgICAgY3BzLnBvcCgpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbGFzdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGFsZ28gPSBDYWxjdWxhdGVbbGFzdF1cbiAgICAgIGNwcy5wb3AoKVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGdvID0gQ2FsY3VsYXRlLmJlemllclxuICAgIH1cblxuICAgIC8vIElmIGNoYW5uZWxzIGFyZSBpbiBhIHN0cmluZywgc3BsaXQgdG8gYW4gYXJyYXlcbiAgICBpZiAodHlwZW9mIGNoYW5zID09PSAnc3RyaW5nJykge1xuICAgICAgY2hhbnMgPSBjaGFucy5zcGxpdCgnJylcbiAgICB9XG4gICAgaWYgKGNoYW5zWzBdID09PSAndicpIHtcbiAgICAgIGNoYW5zID0gWydyJywgJ2cnLCAnYiddXG4gICAgfVxuXG4gICAgaWYgKGNwcy5sZW5ndGggPCAyKSB7XG4gICAgICAvLyBtaWdodCB3YW50IHRvIGdpdmUgYSB3YXJuaW5nIG5vd1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG51bWJlciBvZiBhcmd1bWVudHMgdG8gY3VydmVzIGZpbHRlcicpXG4gICAgfVxuXG4gICAgLy8gR2VuZXJhdGUgYSBjdXJ2ZVxuICAgIGNvbnN0IGJlemllciA9IGFsZ28oY3BzLCAwLCAyNTUpXG5cbiAgICAvLyBJZiB0aGUgY3VydmUgc3RhcnRzIGFmdGVyIHggPSAwLCBpbml0aWFsaXplIGl0IHdpdGggYSBmbGF0IGxpbmVcbiAgICAvLyB1bnRpbCB0aGUgY3VydmUgYmVnaW5zLlxuICAgIGNvbnN0IHN0YXJ0ID0gY3BzWzBdXG4gICAgaWYgKHN0YXJ0WzBdID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFydFswXTsgaSsrKSB7XG4gICAgICAgIGJlemllcltpXSA9IHN0YXJ0WzFdXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZW5kID0gY3BzW2Nwcy5sZW5ndGggLSAxXVxuICAgIGlmIChlbmRbMF0gPCAyNTUpIHtcbiAgICAgIGZvciAobGV0IGkgPSBlbmRbMF07IGkgPD0gMjU1OyBpKyspIHtcbiAgICAgICAgYmV6aWVyW2ldID0gZW5kWzFdXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9jZXNzKCdjdXJ2ZXMnLCAocmdiYSkgPT4ge1xuICAgICAgLy8gTm93IHRoYXQgd2UgaGF2ZSB0aGUgYmV6aWVyIGN1cnZlLCB3ZSBkbyBhIGJhc2ljIGhhc2htYXAgbG9va3VwXG4gICAgICAvLyB0byBmaW5kIGFuZCByZXBsYWNlIGNvbG9yIHZhbHVlcy5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmdiYVtjaGFuc1tpXV0gPSBiZXppZXJbcmdiYVtjaGFuc1tpXV1dXG4gICAgICB9XG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBFeHBvc3VyZVxuICAqIEFkanVzdHMgdGhlIGV4cG9zdXJlIG9mIHRoZSBpbWFnZSBieSB1c2luZyB0aGUgY3VydmVzIGZ1bmN0aW9uLlxuICAqIEFyZ3VtZW50czogUmFuZ2UgaXMgLTEwMCB0byAxMDAuIFZhbHVlcyA8IDAgd2lsbCBkZWNyZWFzZSBleHBvc3VyZSB3aGlsZSB2YWx1ZXMgPiAwIHdpbGwgaW5jcmVhc2UgZXhwb3N1cmUuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignZXhwb3N1cmUnLCBmdW5jdGlvbiAoYWRqdXN0KSB7XG4gICAgY29uc3QgcCA9IE1hdGguYWJzKGFkanVzdCkgLyAxMDBcblxuICAgIGxldCBjdHJsMSA9IFswLCAyNTUgKiBwXVxuICAgIGxldCBjdHJsMiA9IFsyNTUgLSAoMjU1ICogcCksIDI1NV1cblxuICAgIGlmIChhZGp1c3QgPCAwKSB7XG4gICAgICBjdHJsMSA9IGN0cmwxLnJldmVyc2UoKVxuICAgICAgY3RybDIgPSBjdHJsMi5yZXZlcnNlKClcbiAgICB9XG4gICAgdGhpcy5jdXJ2ZXMoJ3JnYicsIFswLCAwXSwgY3RybDEsIGN0cmwyLCBbMjU1LCAyNTVdKVxuICB9KVxufVxuIiwiaW1wb3J0IENhbGN1bGF0ZSBmcm9tICcuLi9jb3JlL2NhbGN1bGF0ZSdcbmltcG9ydCB7IFV0aWwgfSBmcm9tICcuLi9jb3JlL3V0aWwnXG5pbXBvcnQgQ29udmVydCBmcm9tICcuLi9jb3JlL2NvbnZlcnQnXG5cbmNvbnN0IHZpZ25ldHRlRmlsdGVycyA9IHtcbiAgYnJpZ2h0bmVzcyAocmdiYSwgYW10LCBvcHRzKSB7XG4gICAgcmdiYS5yID0gcmdiYS5yIC0gKHJnYmEuciAqIGFtdCAqIG9wdHMuc3RyZW5ndGgpXG4gICAgcmdiYS5nID0gcmdiYS5nIC0gKHJnYmEuZyAqIGFtdCAqIG9wdHMuc3RyZW5ndGgpXG4gICAgcmdiYS5iID0gcmdiYS5iIC0gKHJnYmEuYiAqIGFtdCAqIG9wdHMuc3RyZW5ndGgpXG4gICAgcmV0dXJuIHJnYmFcbiAgfSxcbiAgZ2FtbWEgKHJnYmEsIGFtdCwgb3B0cykge1xuICAgIHJnYmEuciA9IE1hdGgucG93KHJnYmEuciAvIDI1NSwgTWF0aC5tYXgoMTAgKiBhbXQgKiBvcHRzLnN0cmVuZ3RoLCAxKSkgKiAyNTVcbiAgICByZ2JhLmcgPSBNYXRoLnBvdyhyZ2JhLmcgLyAyNTUsIE1hdGgubWF4KDEwICogYW10ICogb3B0cy5zdHJlbmd0aCwgMSkpICogMjU1XG4gICAgcmdiYS5iID0gTWF0aC5wb3cocmdiYS5iIC8gMjU1LCBNYXRoLm1heCgxMCAqIGFtdCAqIG9wdHMuc3RyZW5ndGgsIDEpKSAqIDI1NVxuICAgIHJldHVybiByZ2JhXG4gIH0sXG4gIGNvbG9yaXplIChyZ2JhLCBhbXQsIG9wdHMpIHtcbiAgICByZ2JhLnIgLT0gKHJnYmEuciAtIG9wdHMuY29sb3IucikgKiBhbXRcbiAgICByZ2JhLmcgLT0gKHJnYmEuZyAtIG9wdHMuY29sb3IuZykgKiBhbXRcbiAgICByZ2JhLmIgLT0gKHJnYmEuYiAtIG9wdHMuY29sb3IuYikgKiBhbXRcbiAgICByZXR1cm4gcmdiYVxuICB9XG59XG5cbi8qKlxuICpcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyp9IEZpbHRlclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWdpc3RlckNhbWVyYUZpbHRlciAoRmlsdGVyKSB7XG4gIEZpbHRlci5yZWdpc3RlcigndmlnbmV0dGUnLCBmdW5jdGlvbiAoc2l6ZSwgc3RyZW5ndGggPSA2MCkge1xuICAgIGxldCBiZXppZXIsIGNlbnRlciwgZW5kLCBzdGFydFxuXG4gICAgaWYgKHR5cGVvZiBzaXplID09PSAnc3RyaW5nJyAmJiBzaXplLnN1YnN0cigtMSkgPT09ICclJykge1xuICAgICAgaWYgKHRoaXMuZGltZW5zaW9ucy5oZWlnaHQgPiB0aGlzLmRpbWVuc2lvbnMud2lkdGgpIHtcbiAgICAgICAgc2l6ZSA9IHRoaXMuZGltZW5zaW9ucy53aWR0aCAqIChwYXJzZUludChzaXplLnN1YnN0cigwLCBzaXplLmxlbmd0aCAtIDEpLCAxMCkgLyAxMDApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaXplID0gdGhpcy5kaW1lbnNpb25zLmhlaWdodCAqIChwYXJzZUludChzaXplLnN1YnN0cigwLCBzaXplLmxlbmd0aCAtIDEpLCAxMCkgLyAxMDApXG4gICAgICB9XG4gICAgfVxuICAgIHN0cmVuZ3RoIC89IDEwMFxuICAgIGNlbnRlciA9IFt0aGlzLmRpbWVuc2lvbnMud2lkdGggLyAyLCB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0IC8gMl1cbiAgICBzdGFydCA9IE1hdGguc3FydChNYXRoLnBvdyhjZW50ZXJbMF0sIDIpICsgTWF0aC5wb3coY2VudGVyWzFdLCAyKSlcbiAgICBlbmQgPSBzdGFydCAtIHNpemVcbiAgICBiZXppZXIgPSBDYWxjdWxhdGUuYmV6aWVyKFswLCAxXSwgWzMwLCAzMF0sIFs3MCwgNjBdLCBbMTAwLCA4MF0pXG4gICAgdGhpcy5wcm9jZXNzKCd2aWduZXR0ZScsIGZ1bmN0aW9uIChyZ2JhKSB7XG4gICAgICB2YXIgZGlzdCwgZGl2LCBsb2NcbiAgICAgIGxvYyA9IHJnYmEubG9jYXRpb25YWSgpXG4gICAgICBkaXN0ID0gQ2FsY3VsYXRlLmRpc3RhbmNlKGxvYy54LCBsb2MueSwgY2VudGVyWzBdLCBjZW50ZXJbMV0pXG4gICAgICBpZiAoZGlzdCA+IGVuZCkge1xuICAgICAgICBkaXYgPSBNYXRoLm1heCgxLCAoYmV6aWVyW01hdGgucm91bmQoKChkaXN0IC0gZW5kKSAvIHNpemUpICogMTAwKV0gLyAxMCkgKiBzdHJlbmd0aClcbiAgICAgICAgcmdiYS5yID0gTWF0aC5wb3cocmdiYS5yIC8gMjU1LCBkaXYpICogMjU1XG4gICAgICAgIHJnYmEuZyA9IE1hdGgucG93KHJnYmEuZyAvIDI1NSwgZGl2KSAqIDI1NVxuICAgICAgICByZ2JhLmIgPSBNYXRoLnBvdyhyZ2JhLmIgLyAyNTUsIGRpdikgKiAyNTVcbiAgICAgIH1cbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ3JlY3Rhbmd1bGFyVmlnbmV0dGUnLCBmdW5jdGlvbiAob3B0cykge1xuICAgIGxldCBkZWZhdWx0cywgZGltLCBwZXJjZW50LCBzaXplLCBfaSwgX2xlbiwgX3JlZlxuICAgIGRlZmF1bHRzID0ge1xuICAgICAgc3RyZW5ndGg6IDUwLFxuICAgICAgY29ybmVyUmFkaXVzOiAwLFxuICAgICAgbWV0aG9kOiAnYnJpZ2h0bmVzcycsXG4gICAgICBjb2xvcjoge1xuICAgICAgICByOiAwLFxuICAgICAgICBnOiAwLFxuICAgICAgICBiOiAwXG4gICAgICB9XG4gICAgfVxuICAgIG9wdHMgPSBVdGlsLmV4dGVuZChkZWZhdWx0cywgb3B0cylcbiAgICBpZiAoIW9wdHMuc2l6ZSkge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzLnNpemUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwZXJjZW50ID0gcGFyc2VJbnQob3B0cy5zaXplLCAxMCkgLyAxMDBcbiAgICAgIG9wdHMuc2l6ZSA9IHtcbiAgICAgICAgd2lkdGg6IHRoaXMuZGltZW5zaW9ucy53aWR0aCAqIHBlcmNlbnQsXG4gICAgICAgIGhlaWdodDogdGhpcy5kaW1lbnNpb25zLmhlaWdodCAqIHBlcmNlbnRcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzLnNpemUgPT09ICdvYmplY3QnKSB7XG4gICAgICBfcmVmID0gWyd3aWR0aCcsICdoZWlnaHQnXVxuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIGRpbSA9IF9yZWZbX2ldXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cy5zaXplW2RpbV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgb3B0cy5zaXplW2RpbV0gPSB0aGlzLmRpbWVuc2lvbnNbZGltXSAqIChwYXJzZUludChvcHRzLnNpemVbZGltXSwgMTApIC8gMTAwKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcHRzLnNpemUgPT09ICdudW1iZXInKSB7XG4gICAgICBzaXplID0gb3B0cy5zaXplXG4gICAgICBvcHRzLnNpemUgPSB7XG4gICAgICAgIHdpZHRoOiBzaXplLFxuICAgICAgICBoZWlnaHQ6IHNpemVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRzLmNvcm5lclJhZGl1cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG9wdHMuY29ybmVyUmFkaXVzID0gKG9wdHMuc2l6ZS53aWR0aCAvIDIpICogKHBhcnNlSW50KG9wdHMuY29ybmVyUmFkaXVzLCAxMCkgLyAxMDApXG4gICAgfVxuICAgIG9wdHMuc3RyZW5ndGggLz0gMTAwXG4gICAgb3B0cy5zaXplLndpZHRoID0gTWF0aC5mbG9vcihvcHRzLnNpemUud2lkdGgpXG4gICAgb3B0cy5zaXplLmhlaWdodCA9IE1hdGguZmxvb3Iob3B0cy5zaXplLmhlaWdodClcbiAgICBvcHRzLmltYWdlID0ge1xuICAgICAgd2lkdGg6IHRoaXMuZGltZW5zaW9ucy53aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5kaW1lbnNpb25zLmhlaWdodFxuICAgIH1cbiAgICBpZiAob3B0cy5tZXRob2QgPT09ICdjb2xvcml6ZScgJiYgdHlwZW9mIG9wdHMuY29sb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICBvcHRzLmNvbG9yID0gQ29udmVydC5oZXhUb1JHQihvcHRzLmNvbG9yKVxuICAgIH1cbiAgICBvcHRzLmNvb3JkcyA9IHtcbiAgICAgIGxlZnQ6ICh0aGlzLmRpbWVuc2lvbnMud2lkdGggLSBvcHRzLnNpemUud2lkdGgpIC8gMixcbiAgICAgIHJpZ2h0OiB0aGlzLmRpbWVuc2lvbnMud2lkdGggLSBvcHRzLmNvb3Jkcy5sZWZ0LFxuICAgICAgYm90dG9tOiAodGhpcy5kaW1lbnNpb25zLmhlaWdodCAtIG9wdHMuc2l6ZS5oZWlnaHQpIC8gMixcbiAgICAgIHRvcDogdGhpcy5kaW1lbnNpb25zLmhlaWdodCAtIG9wdHMuY29vcmRzLmJvdHRvbVxuICAgIH1cbiAgICBvcHRzLmNvcm5lcnMgPSBbXG4gICAgICB7XG4gICAgICAgIHg6IG9wdHMuY29vcmRzLmxlZnQgKyBvcHRzLmNvcm5lclJhZGl1cyxcbiAgICAgICAgeTogb3B0cy5jb29yZHMudG9wIC0gb3B0cy5jb3JuZXJSYWRpdXNcbiAgICAgIH0sIHtcbiAgICAgICAgeDogb3B0cy5jb29yZHMucmlnaHQgLSBvcHRzLmNvcm5lclJhZGl1cyxcbiAgICAgICAgeTogb3B0cy5jb29yZHMudG9wIC0gb3B0cy5jb3JuZXJSYWRpdXNcbiAgICAgIH0sIHtcbiAgICAgICAgeDogb3B0cy5jb29yZHMucmlnaHQgLSBvcHRzLmNvcm5lclJhZGl1cyxcbiAgICAgICAgeTogb3B0cy5jb29yZHMuYm90dG9tICsgb3B0cy5jb3JuZXJSYWRpdXNcbiAgICAgIH0sIHtcbiAgICAgICAgeDogb3B0cy5jb29yZHMubGVmdCArIG9wdHMuY29ybmVyUmFkaXVzLFxuICAgICAgICB5OiBvcHRzLmNvb3Jkcy5ib3R0b20gKyBvcHRzLmNvcm5lclJhZGl1c1xuICAgICAgfVxuICAgIF1cbiAgICBvcHRzLm1heERpc3QgPSBDYWxjdWxhdGUuZGlzdGFuY2UoMCwgMCwgb3B0cy5jb3JuZXJzWzNdLngsIG9wdHMuY29ybmVyc1szXS55KSAtIG9wdHMuY29ybmVyUmFkaXVzXG4gICAgdGhpcy5wcm9jZXNzKCdyZWN0YW5ndWxhclZpZ25ldHRlJywgZnVuY3Rpb24gKHJnYmEpIHtcbiAgICAgIHZhciBhbXQsIGxvYywgcmFkaWFsRGlzdFxuICAgICAgbG9jID0gcmdiYS5sb2NhdGlvblhZKClcbiAgICAgIGlmICgobG9jLnggPiBvcHRzLmNvcm5lcnNbMF0ueCAmJiBsb2MueCA8IG9wdHMuY29ybmVyc1sxXS54KSAmJiAobG9jLnkgPiBvcHRzLmNvb3Jkcy5ib3R0b20gJiYgbG9jLnkgPCBvcHRzLmNvb3Jkcy50b3ApKSB7XG4gICAgICAgIHJldHVybiByZ2JhXG4gICAgICB9XG4gICAgICBpZiAoKGxvYy54ID4gb3B0cy5jb29yZHMubGVmdCAmJiBsb2MueCA8IG9wdHMuY29vcmRzLnJpZ2h0KSAmJiAobG9jLnkgPiBvcHRzLmNvcm5lcnNbM10ueSAmJiBsb2MueSA8IG9wdHMuY29ybmVyc1syXS55KSkge1xuICAgICAgICByZXR1cm4gcmdiYVxuICAgICAgfVxuICAgICAgaWYgKGxvYy54ID4gb3B0cy5jb3JuZXJzWzBdLnggJiYgbG9jLnggPCBvcHRzLmNvcm5lcnNbMV0ueCAmJiBsb2MueSA+IG9wdHMuY29vcmRzLnRvcCkge1xuICAgICAgICBhbXQgPSAobG9jLnkgLSBvcHRzLmNvb3Jkcy50b3ApIC8gb3B0cy5tYXhEaXN0XG4gICAgICB9IGVsc2UgaWYgKGxvYy55ID4gb3B0cy5jb3JuZXJzWzJdLnkgJiYgbG9jLnkgPCBvcHRzLmNvcm5lcnNbMV0ueSAmJiBsb2MueCA+IG9wdHMuY29vcmRzLnJpZ2h0KSB7XG4gICAgICAgIGFtdCA9IChsb2MueCAtIG9wdHMuY29vcmRzLnJpZ2h0KSAvIG9wdHMubWF4RGlzdFxuICAgICAgfSBlbHNlIGlmIChsb2MueCA+IG9wdHMuY29ybmVyc1swXS54ICYmIGxvYy54IDwgb3B0cy5jb3JuZXJzWzFdLnggJiYgbG9jLnkgPCBvcHRzLmNvb3Jkcy5ib3R0b20pIHtcbiAgICAgICAgYW10ID0gKG9wdHMuY29vcmRzLmJvdHRvbSAtIGxvYy55KSAvIG9wdHMubWF4RGlzdFxuICAgICAgfSBlbHNlIGlmIChsb2MueSA+IG9wdHMuY29ybmVyc1syXS55ICYmIGxvYy55IDwgb3B0cy5jb3JuZXJzWzFdLnkgJiYgbG9jLnggPCBvcHRzLmNvb3Jkcy5sZWZ0KSB7XG4gICAgICAgIGFtdCA9IChvcHRzLmNvb3Jkcy5sZWZ0IC0gbG9jLngpIC8gb3B0cy5tYXhEaXN0XG4gICAgICB9IGVsc2UgaWYgKGxvYy54IDw9IG9wdHMuY29ybmVyc1swXS54ICYmIGxvYy55ID49IG9wdHMuY29ybmVyc1swXS55KSB7XG4gICAgICAgIHJhZGlhbERpc3QgPSBDYWxjdWxhdGUuZGlzdGFuY2UobG9jLngsIGxvYy55LCBvcHRzLmNvcm5lcnNbMF0ueCwgb3B0cy5jb3JuZXJzWzBdLnkpXG4gICAgICAgIGFtdCA9IChyYWRpYWxEaXN0IC0gb3B0cy5jb3JuZXJSYWRpdXMpIC8gb3B0cy5tYXhEaXN0XG4gICAgICB9IGVsc2UgaWYgKGxvYy54ID49IG9wdHMuY29ybmVyc1sxXS54ICYmIGxvYy55ID49IG9wdHMuY29ybmVyc1sxXS55KSB7XG4gICAgICAgIHJhZGlhbERpc3QgPSBDYWxjdWxhdGUuZGlzdGFuY2UobG9jLngsIGxvYy55LCBvcHRzLmNvcm5lcnNbMV0ueCwgb3B0cy5jb3JuZXJzWzFdLnkpXG4gICAgICAgIGFtdCA9IChyYWRpYWxEaXN0IC0gb3B0cy5jb3JuZXJSYWRpdXMpIC8gb3B0cy5tYXhEaXN0XG4gICAgICB9IGVsc2UgaWYgKGxvYy54ID49IG9wdHMuY29ybmVyc1syXS54ICYmIGxvYy55IDw9IG9wdHMuY29yZXJzWzJdLnkpIHtcbiAgICAgICAgcmFkaWFsRGlzdCA9IENhbGN1bGF0ZS5kaXN0YW5jZShsb2MueCwgbG9jLnksIG9wdHMuY29ybmVyc1syXS54LCBvcHRzLmNvcm5lcnNbMl0ueSlcbiAgICAgICAgYW10ID0gKHJhZGlhbERpc3QgLSBvcHRzLmNvcm5lclJhZGl1cykgLyBvcHRzLm1heERpc3RcbiAgICAgIH0gZWxzZSBpZiAobG9jLnggPD0gb3B0cy5jb3JuZXJzWzNdLnggJiYgbG9jLnkgPD0gb3B0cy5jb3JuZXJzWzNdLnkpIHtcbiAgICAgICAgcmFkaWFsRGlzdCA9IENhbGN1bGF0ZS5kaXN0YW5jZShsb2MueCwgbG9jLnksIG9wdHMuY29ybmVyc1szXS54LCBvcHRzLmNvcm5lcnNbM10ueSlcbiAgICAgICAgYW10ID0gKHJhZGlhbERpc3QgLSBvcHRzLmNvcm5lclJhZGl1cykgLyBvcHRzLm1heERpc3RcbiAgICAgIH1cbiAgICAgIGlmIChhbXQgPCAwKSB7XG4gICAgICAgIHJldHVybiByZ2JhXG4gICAgICB9XG4gICAgICByZXR1cm4gdmlnbmV0dGVGaWx0ZXJzW29wdHMubWV0aG9kXShyZ2JhLCBhbXQsIG9wdHMpXG4gICAgfSlcbiAgfSlcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZ2lzdGVyQmx1ckZpbHRlciAoRmlsdGVyKSB7XG4gIEZpbHRlci5yZWdpc3RlcignYm94Qmx1cicsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnByb2Nlc3NLZXJuZWwoJ0JveCBCbHVyJywgWzEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdKVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcignaGVhdnlSYWRpYWxCbHVyJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucHJvY2Vzc0tlcm5lbCgnSGVhdnkgUmFkaWFsIEJsdXInLCBbMCwgMCwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMSwgMSwgMCwgMCwgMCwgMSwgMCwgMF0pXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdnYXVzc2lhbkJsdXInLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5wcm9jZXNzS2VybmVsKCdHYXVzc2lhbiBCbHVyJywgWzEsIDQsIDYsIDQsIDEsIDQsIDE2LCAyNCwgMTYsIDQsIDYsIDI0LCAzNiwgMjQsIDYsIDQsIDE2LCAyNCwgMTYsIDQsIDEsIDQsIDYsIDQsIDFdKVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcignbW90aW9uQmx1cicsIGZ1bmN0aW9uIChkZWdyZWVzKSB7XG4gICAgbGV0IGtlcm5lbFxuICAgIGlmIChkZWdyZWVzID09PSAwIHx8IGRlZ3JlZXMgPT09IDE4MCkge1xuICAgICAga2VybmVsID0gWzAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDBdXG4gICAgfSBlbHNlIGlmICgoZGVncmVlcyA+IDAgJiYgZGVncmVlcyA8IDkwKSB8fCAoZGVncmVlcyA+IDE4MCAmJiBkZWdyZWVzIDwgMjcwKSkge1xuICAgICAga2VybmVsID0gWzAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDBdXG4gICAgfSBlbHNlIGlmIChkZWdyZWVzID09PSA5MCB8fCBkZWdyZWVzID09PSAyNzApIHtcbiAgICAgIGtlcm5lbCA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXVxuICAgIH0gZWxzZSB7XG4gICAgICBrZXJuZWwgPSBbMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMV1cbiAgICB9XG4gICAgdGhpcy5wcm9jZXNzS2VybmVsKCdNb3Rpb24gQmx1cicsIGtlcm5lbClcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ3NoYXJwZW4nLCBmdW5jdGlvbiAoYW10ID0gMTAwKSB7XG4gICAgYW10IC89IDEwMFxuICAgIHRoaXMucHJvY2Vzc0tlcm5lbCgnU2hhcnBlbicsIFswLCAtYW10LCAwLCAtYW10LCA0ICogYW10ICsgMSwgLWFtdCwgMCwgLWFtdCwgMF0pXG4gIH0pXG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWdpc3RlclBvc3Rlcml6ZUZpbHRlciAoRmlsdGVyKSB7XG4gIEZpbHRlci5yZWdpc3RlcigncG9zdGVyaXplJywgZnVuY3Rpb24gKGFkanVzdCkge1xuICAgIHZhciBudW1PZkFyZWFzLCBudW1PZlZhbHVlc1xuICAgIG51bU9mQXJlYXMgPSAyNTYgLyBhZGp1c3RcbiAgICBudW1PZlZhbHVlcyA9IDI1NSAvIChhZGp1c3QgLSAxKVxuICAgIHRoaXMucHJvY2VzcygncG9zdGVyaXplJywgZnVuY3Rpb24gKHJnYmEpIHtcbiAgICAgIHJnYmEuciA9IE1hdGguZmxvb3IoTWF0aC5mbG9vcihyZ2JhLnIgLyBudW1PZkFyZWFzKSAqIG51bU9mVmFsdWVzKVxuICAgICAgcmdiYS5nID0gTWF0aC5mbG9vcihNYXRoLmZsb29yKHJnYmEuZyAvIG51bU9mQXJlYXMpICogbnVtT2ZWYWx1ZXMpXG4gICAgICByZ2JhLmIgPSBNYXRoLmZsb29yKE1hdGguZmxvb3IocmdiYS5iIC8gbnVtT2ZBcmVhcykgKiBudW1PZlZhbHVlcylcbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcbn1cbiIsIi8qKlxuICogc29tZSBwcmVzZXQgZmlsdGVyc1xuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gRmlsdGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZ2lzdGVyUHJlc2V0RmlsdGVyIChGaWx0ZXIpIHtcbiAgRmlsdGVyLnJlZ2lzdGVyKCd2aW50YWdlJywgZnVuY3Rpb24gKHZpZ25ldHRlID0gdHJ1ZSkge1xuICAgIHRoaXMuZ3JleXNjYWxlKClcbiAgICB0aGlzLmNvbnRyYXN0KDUpXG4gICAgdGhpcy5ub2lzZSgzKVxuICAgIHRoaXMuc2VwaWEoMTAwKVxuICAgIHRoaXMuY2hhbm5lbHMoe3JlZDogOCwgYmx1ZTogMiwgZ3JlZW46IDR9KVxuICAgIHRoaXMuZ2FtbWEoMC44NylcblxuICAgIGlmICh2aWduZXR0ZSkge1xuICAgICAgdGhpcy52aWduZXR0ZSgnNDAlJywgMzApXG4gICAgfVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcignbG9tbycsIGZ1bmN0aW9uICh2aWduZXR0ZSA9IHRydWUpIHtcbiAgICB0aGlzLmJyaWdodG5lc3MoMTUpXG4gICAgdGhpcy5leHBvc3VyZSgxNSlcbiAgICB0aGlzLmN1cnZlcygncmdiJywgWzAsIDBdLCBbMjAwLCAwXSwgWzE1NSwgMjU1XSwgWzI1NSwgMjU1XSlcbiAgICB0aGlzLnNhdHVyYXRpb24oLTIwKVxuICAgIHRoaXMuZ2FtbWEoMS44KVxuICAgIGlmICh2aWduZXR0ZSkge1xuICAgICAgdGhpcy52aWduZXR0ZSgnNTAlJywgNjApXG4gICAgfVxuICAgIHRoaXMuYnJpZ2h0bmVzcyg1KVxuICB9KVxuXG4gIC8vIEZJWE1FOnNoYXJwZW5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdjbGFyaXR5JywgZnVuY3Rpb24gKGdyZXkgPSBmYWxzZSkge1xuICAgIHRoaXMudmlicmFuY2UoMjApXG4gICAgdGhpcy5jdXJ2ZXMoJ3JnYicsIFs1LCAwXSwgWzEzMCwgMTUwXSwgWzE5MCwgMjIwXSwgWzI1MCwgMjU1XSlcbiAgICB0aGlzLnNoYXJwZW4oMTUpXG4gICAgdGhpcy52aWduZXR0ZSgnNDUlJywgMjApXG4gICAgaWYgKGdyZXkpIHtcbiAgICAgIHRoaXMuZ3JleXNjYWxlKClcbiAgICAgIHRoaXMuY29udHJhc3QoNClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ3NpbkNpdHknLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jb250cmFzdCgxMDApXG4gICAgdGhpcy5icmlnaHRuZXNzKDE1KVxuICAgIHRoaXMuZXhwb3N1cmUoMTApXG4gICAgdGhpcy5wb3N0ZXJpemUoODApXG4gICAgdGhpcy5jbGlwKDMwKVxuICAgIHRoaXMuZ3JleXNjYWxlKClcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ3N1bnJpc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5leHBvc3VyZSgzLjUpXG4gICAgdGhpcy5zYXR1cmF0aW9uKC01KVxuICAgIHRoaXMudmlicmFuY2UoNTApXG4gICAgdGhpcy5zZXBpYSg2MClcbiAgICB0aGlzLmNvbG9yaXplKCcjZTg3YjIyJywgMTApXG4gICAgdGhpcy5jaGFubmVscyh7XG4gICAgICByZWQ6IDgsXG4gICAgICBibHVlOiA4XG4gICAgfSlcbiAgICB0aGlzLmNvbnRyYXN0KDUpXG4gICAgdGhpcy5nYW1tYSgxLjIpXG4gICAgdGhpcy52aWduZXR0ZSgnNTUlJywgMjUpXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdjcm9zc1Byb2Nlc3MnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5leHBvc3VyZSg1KVxuICAgIHRoaXMuY29sb3JpemUoJyNlODdiMjInLCA0KVxuICAgIHRoaXMuc2VwaWEoMjApXG4gICAgdGhpcy5jaGFubmVscyh7XG4gICAgICBibHVlOiA4LFxuICAgICAgcmVkOiAzXG4gICAgfSlcbiAgICB0aGlzLmN1cnZlcygnYicsIFswLCAwXSwgWzEwMCwgMTUwXSwgWzE4MCwgMTgwXSwgWzI1NSwgMjU1XSlcbiAgICB0aGlzLmNvbnRyYXN0KDE1KVxuICAgIHRoaXMudmlicmFuY2UoNzUpXG4gICAgdGhpcy5nYW1tYSgxLjYpXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdvcmFuZ2VQZWVsJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY3VydmVzKCdyZ2InLCBbMCwgMF0sIFsxMDAsIDUwXSwgWzE0MCwgMjAwXSwgWzI1NSwgMjU1XSlcbiAgICB0aGlzLnZpYnJhbmNlKC0zMClcbiAgICB0aGlzLnNhdHVyYXRpb24oLTMwKVxuICAgIHRoaXMuY29sb3JpemUoJyNmZjkwMDAnLCAzMClcbiAgICB0aGlzLmNvbnRyYXN0KC01KVxuICAgIHRoaXMuZ2FtbWEoMS40KVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcignbG92ZScsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmJyaWdodG5lc3MoNSlcbiAgICB0aGlzLmV4cG9zdXJlKDgpXG4gICAgdGhpcy5jb250cmFzdCg0KVxuICAgIHRoaXMuY29sb3JpemUoJyNjNDIwMDcnLCAzMClcbiAgICB0aGlzLnZpYnJhbmNlKDUwKVxuICAgIHRoaXMuZ2FtbWEoMS4zKVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcignZ3J1bmd5JywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZ2FtbWEoMS41KVxuICAgIHRoaXMuY2xpcCgyNSlcbiAgICB0aGlzLnNhdHVyYXRpb24oLTYwKVxuICAgIHRoaXMuY29udHJhc3QoNSlcbiAgICB0aGlzLm5vaXNlKDUpXG4gICAgdGhpcy52aWduZXR0ZSgnNTAlJywgMzApXG4gIH0pXG4gIC8vIEZJWE1FOnNoYXJwZW5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdqYXJxdWVzJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2F0dXJhdGlvbigtMzUpXG4gICAgdGhpcy5jdXJ2ZXMoJ2InLCBbMjAsIDBdLCBbOTAsIDEyMF0sIFsxODYsIDE0NF0sIFsyNTUsIDIzMF0pXG4gICAgdGhpcy5jdXJ2ZXMoJ3InLCBbMCwgMF0sIFsxNDQsIDkwXSwgWzEzOCwgMTIwXSwgWzI1NSwgMjU1XSlcbiAgICB0aGlzLmN1cnZlcygnZycsIFsxMCwgMF0sIFsxMTUsIDEwNV0sIFsxNDgsIDEwMF0sIFsyNTUsIDI0OF0pXG4gICAgdGhpcy5jdXJ2ZXMoJ3JnYicsIFswLCAwXSwgWzEyMCwgMTAwXSwgWzEyOCwgMTQwXSwgWzI1NSwgMjU1XSlcbiAgICB0aGlzLnNoYXJwZW4oMjApXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdwaW5ob2xlJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZ3JleXNjYWxlKClcbiAgICB0aGlzLnNlcGlhKDEwKVxuICAgIHRoaXMuZXhwb3N1cmUoMTApXG4gICAgdGhpcy5jb250cmFzdCgxNSlcbiAgICB0aGlzLnZpZ25ldHRlKCc2MCUnLCAzNSlcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ29sZEJvb3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zYXR1cmF0aW9uKC0yMClcbiAgICB0aGlzLnZpYnJhbmNlKC01MClcbiAgICB0aGlzLmdhbW1hKDEuMSlcbiAgICB0aGlzLnNlcGlhKDMwKVxuICAgIHRoaXMuY2hhbm5lbHMoe1xuICAgICAgcmVkOiAtMTAsXG4gICAgICBibHVlOiA1XG4gICAgfSlcbiAgICB0aGlzLmN1cnZlcygncmdiJywgWzAsIDBdLCBbODAsIDUwXSwgWzEyOCwgMjMwXSwgWzI1NSwgMjU1XSlcbiAgICByZXR1cm4gdGhpcy52aWduZXR0ZSgnNjAlJywgMzApXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdnbG93aW5nU3VuJywgZnVuY3Rpb24gKHZpZ25ldHRlID0gdHJ1ZSkge1xuICAgIHRoaXMuYnJpZ2h0bmVzcygxMClcbiAgICB0aGlzLm5ld0xheWVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0QmxlbmRpbmdNb2RlKCdtdWx0aXBseScpXG4gICAgICB0aGlzLm9wYWNpdHkoODApXG4gICAgICB0aGlzLmNvcHlQYXJlbnQoKVxuICAgICAgdGhpcy5maWx0ZXIuZ2FtbWEoMC44KVxuICAgICAgdGhpcy5maWx0ZXIuY29udHJhc3QoNTApXG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIuZXhwb3N1cmUoMTApXG4gICAgfSlcbiAgICB0aGlzLm5ld0xheWVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0QmxlbmRpbmdNb2RlKCdzb2Z0TGlnaHQnKVxuICAgICAgdGhpcy5vcGFjaXR5KDgwKVxuICAgICAgcmV0dXJuIHRoaXMuZmlsbENvbG9yKCcjZjQ5NjAwJylcbiAgICB9KVxuICAgIHRoaXMuZXhwb3N1cmUoMjApXG4gICAgdGhpcy5nYW1tYSgwLjgpXG4gICAgaWYgKHZpZ25ldHRlKSB7XG4gICAgICByZXR1cm4gdGhpcy52aWduZXR0ZSgnNDUlJywgMjApXG4gICAgfVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcignaGF6eURheXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5nYW1tYSgxLjIpXG4gICAgdGhpcy5uZXdMYXllcihmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNldEJsZW5kaW5nTW9kZSgnb3ZlcmxheScpXG4gICAgICB0aGlzLm9wYWNpdHkoNjApXG4gICAgICB0aGlzLmNvcHlQYXJlbnQoKVxuICAgICAgdGhpcy5maWx0ZXIuY2hhbm5lbHMoe1xuICAgICAgICByZWQ6IDVcbiAgICAgIH0pXG4gICAgICB0aGlzLmZpbHRlci5zdGFja0JsdXIoMTUpXG4gICAgfSlcbiAgICB0aGlzLm5ld0xheWVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0QmxlbmRpbmdNb2RlKCdhZGRpdGlvbicpXG4gICAgICB0aGlzLm9wYWNpdHkoNDApXG4gICAgICB0aGlzLmZpbGxDb2xvcignIzY4OTliYScpXG4gICAgfSlcbiAgICB0aGlzLm5ld0xheWVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0QmxlbmRpbmdNb2RlKCdtdWx0aXBseScpXG4gICAgICB0aGlzLm9wYWNpdHkoMzUpXG4gICAgICB0aGlzLmNvcHlQYXJlbnQoKVxuICAgICAgdGhpcy5maWx0ZXIuYnJpZ2h0bmVzcyg0MClcbiAgICAgIHRoaXMuZmlsdGVyLnZpYnJhbmNlKDQwKVxuICAgICAgdGhpcy5maWx0ZXIuZXhwb3N1cmUoMzApXG4gICAgICB0aGlzLmZpbHRlci5jb250cmFzdCgxNSlcbiAgICAgIHRoaXMuZmlsdGVyLmN1cnZlcygncicsIFswLCA0MF0sIFsxMjgsIDEyOF0sIFsxMjgsIDEyOF0sIFsyNTUsIDIxNV0pXG4gICAgICB0aGlzLmZpbHRlci5jdXJ2ZXMoJ2cnLCBbMCwgNDBdLCBbMTI4LCAxMjhdLCBbMTI4LCAxMjhdLCBbMjU1LCAyMTVdKVxuICAgICAgdGhpcy5maWx0ZXIuY3VydmVzKCdiJywgWzAsIDQwXSwgWzEyOCwgMTI4XSwgWzEyOCwgMTI4XSwgWzI1NSwgMjE1XSlcbiAgICAgIHRoaXMuZmlsdGVyLnN0YWNrQmx1cig1KVxuICAgIH0pXG4gICAgdGhpcy5jdXJ2ZXMoJ3InLCBbMjAsIDBdLCBbMTI4LCAxNThdLCBbMTI4LCAxMjhdLCBbMjM1LCAyNTVdKVxuICAgIHRoaXMuY3VydmVzKCdnJywgWzIwLCAwXSwgWzEyOCwgMTI4XSwgWzEyOCwgMTI4XSwgWzIzNSwgMjU1XSlcbiAgICB0aGlzLmN1cnZlcygnYicsIFsyMCwgMF0sIFsxMjgsIDEwOF0sIFsxMjgsIDEyOF0sIFsyMzUsIDI1NV0pXG4gICAgdGhpcy52aWduZXR0ZSgnNDUlJywgMjApXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdoZXJNYWplc3R5JywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYnJpZ2h0bmVzcyg0MClcbiAgICB0aGlzLmNvbG9yaXplKCcjZWExYzVkJywgMTApXG4gICAgdGhpcy5jdXJ2ZXMoJ2InLCBbMCwgMTBdLCBbMTI4LCAxODBdLCBbMTkwLCAxOTBdLCBbMjU1LCAyNTVdKVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnNldEJsZW5kaW5nTW9kZSgnb3ZlcmxheScpXG4gICAgICB0aGlzLm9wYWNpdHkoNTApXG4gICAgICB0aGlzLmNvcHlQYXJlbnQoKVxuICAgICAgdGhpcy5maWx0ZXIuZ2FtbWEoMC43KVxuICAgICAgcmV0dXJuIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0QmxlbmRpbmdNb2RlKCdub3JtYWwnKVxuICAgICAgICB0aGlzLm9wYWNpdHkoNjApXG4gICAgICAgIHJldHVybiB0aGlzLmZpbGxDb2xvcignI2VhMWM1ZCcpXG4gICAgICB9KVxuICAgIH0pXG4gICAgdGhpcy5uZXdMYXllcihmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuc2V0QmxlbmRpbmdNb2RlKCdtdWx0aXBseScpXG4gICAgICB0aGlzLm9wYWNpdHkoNjApXG4gICAgICB0aGlzLmNvcHlQYXJlbnQoKVxuICAgICAgdGhpcy5maWx0ZXIuc2F0dXJhdGlvbig1MClcbiAgICAgIHRoaXMuZmlsdGVyLmh1ZSg5MClcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlci5jb250cmFzdCgxMClcbiAgICB9KVxuICAgIHRoaXMuZ2FtbWEoMS40KVxuICAgIHRoaXMudmlicmFuY2UoLTMwKVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLm9wYWNpdHkoMTApXG4gICAgICByZXR1cm4gdGhpcy5maWxsQ29sb3IoJyNlNWYwZmYnKVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ25vc3RhbGdpYScsIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2F0dXJhdGlvbigyMClcbiAgICB0aGlzLmdhbW1hKDEuNClcbiAgICB0aGlzLmdyZXlzY2FsZSgpXG4gICAgdGhpcy5jb250cmFzdCg1KVxuICAgIHRoaXMuc2VwaWEoMTAwKVxuICAgIHRoaXMuY2hhbm5lbHMoe1xuICAgICAgcmVkOiA4LFxuICAgICAgYmx1ZTogMixcbiAgICAgIGdyZWVuOiA0XG4gICAgfSlcbiAgICB0aGlzLmdhbW1hKDAuOClcbiAgICB0aGlzLmNvbnRyYXN0KDUpXG4gICAgdGhpcy5leHBvc3VyZSgxMClcbiAgICB0aGlzLm5ld0xheWVyKGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ292ZXJsYXknKVxuICAgICAgdGhpcy5jb3B5UGFyZW50KClcbiAgICAgIHRoaXMub3BhY2l0eSg1NSlcbiAgICAgIHRoaXMuZmlsdGVyLnN0YWNrQmx1cigxMClcbiAgICB9KVxuICAgIHRoaXMudmlnbmV0dGUoJzUwJScsIDMwKVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcignaGVtaW5nd2F5JywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZ3JleXNjYWxlKClcbiAgICB0aGlzLmNvbnRyYXN0KDEwKVxuICAgIHRoaXMuZ2FtbWEoMC45KVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ211bHRpcGx5JylcbiAgICAgIHRoaXMub3BhY2l0eSg0MClcbiAgICAgIHRoaXMuY29weVBhcmVudCgpXG4gICAgICB0aGlzLmZpbHRlci5leHBvc3VyZSgxNSlcbiAgICAgIHRoaXMuZmlsdGVyLmNvbnRyYXN0KDE1KVxuICAgICAgdGhpcy5maWx0ZXIuY2hhbm5lbHMoe1xuICAgICAgICBncmVlbjogMTAsXG4gICAgICAgIHJlZDogNVxuICAgICAgfSlcbiAgICB9KVxuICAgIHRoaXMuc2VwaWEoMzApXG4gICAgdGhpcy5jdXJ2ZXMoJ3JnYicsIFswLCAxMF0sIFsxMjAsIDkwXSwgWzE4MCwgMjAwXSwgWzIzNSwgMjU1XSlcbiAgICB0aGlzLmNoYW5uZWxzKHtcbiAgICAgIHJlZDogNSxcbiAgICAgIGdyZWVuOiAtMlxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXMuZXhwb3N1cmUoMTUpXG4gIH0pXG5cbiAgLy8gRklYTUU6IHNoYXJwZW5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdjb25jZW50cmF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNoYXJwZW4oNDApXG4gICAgdGhpcy5zYXR1cmF0aW9uKC01MClcbiAgICB0aGlzLmNoYW5uZWxzKHtcbiAgICAgIHJlZDogM1xuICAgIH0pXG4gICAgdGhpcy5uZXdMYXllcihmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNldEJsZW5kaW5nTW9kZSgnbXVsdGlwbHknKVxuICAgICAgdGhpcy5vcGFjaXR5KDgwKVxuICAgICAgdGhpcy5jb3B5UGFyZW50KClcbiAgICAgIHRoaXMuZmlsdGVyLnNoYXJwZW4oNSlcbiAgICAgIHRoaXMuZmlsdGVyLmNvbnRyYXN0KDUwKVxuICAgICAgdGhpcy5maWx0ZXIuZXhwb3N1cmUoMTApXG4gICAgICB0aGlzLmZpbHRlci5jaGFubmVscyh7XG4gICAgICAgIGJsdWU6IDVcbiAgICAgIH0pXG4gICAgfSlcbiAgICB0aGlzLmJyaWdodG5lc3MoMTApXG4gIH0pXG59XG4iLCIvKlxuU3RhY2tCbHVyIC0gYSBmYXN0IGFsbW9zdCBHYXVzc2lhbiBCbHVyIEZvciBDYW52YXMgdjAuMzEgbW9kaWZpZWQgZm9yIENhbWFuSlNcblxuVmVyc2lvbjogICAwLjMxXG5BdXRob3I6ICAgIE1hcmlvIEtsaW5nZW1hbm5cbkNvbnRhY3Q6ICAgbWFyaW9AcXVhc2ltb25kby5jb21cbldlYnNpdGU6ICBodHRwOi8vd3d3LnF1YXNpbW9uZG8uY29tL1N0YWNrQmx1ckZvckNhbnZhc1xuVHdpdHRlcjogIEBxdWFzaW1vbmRvXG5Nb2RpZmllZCBCeTogUnlhbiBMZUZldnJlIChAbWVsdGluZ2ljZSlcblxuSW4gY2FzZSB5b3UgZmluZCB0aGlzIGNsYXNzIHVzZWZ1bCAtIGVzcGVjaWFsbHkgaW4gY29tbWVyY2lhbCBwcm9qZWN0cyAtXG5JIGFtIG5vdCB0b3RhbGx5IHVuaGFwcHkgZm9yIGEgc21hbGwgZG9uYXRpb24gdG8gbXkgUGF5UGFsIGFjY291bnRcbm1hcmlvQHF1YXNpbW9uZG8uZGVcblxuT3Igc3VwcG9ydCBtZSBvbiBmbGF0dHI6XG5odHRwczovL2ZsYXR0ci5jb20vdGhpbmcvNzI3OTEvU3RhY2tCbHVyLWEtZmFzdC1hbG1vc3QtR2F1c3NpYW4tQmx1ci1FZmZlY3QtZm9yLUNhbnZhc0phdmFzY3JpcHRcblxuQ29weXJpZ2h0IChjKSAyMDEwIE1hcmlvIEtsaW5nZW1hbm5cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbm9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG5maWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXRcbnJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLFxuY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZVxuU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmdcbmNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG5pbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbkVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFU1xuT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcbk5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUXG5IT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSxcbldIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUlxuT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbmxldCBCbHVyU3RhY2ssIG11bFRhYmxlLCBzaGdUYWJsZVxubXVsVGFibGUgPSBbNTEyLCA1MTIsIDQ1NiwgNTEyLCAzMjgsIDQ1NiwgMzM1LCA1MTIsIDQwNSwgMzI4LCAyNzEsIDQ1NiwgMzg4LCAzMzUsIDI5MiwgNTEyLCA0NTQsIDQwNSwgMzY0LCAzMjgsIDI5OCwgMjcxLCA0OTYsIDQ1NiwgNDIwLCAzODgsIDM2MCwgMzM1LCAzMTIsIDI5MiwgMjczLCA1MTIsIDQ4MiwgNDU0LCA0MjgsIDQwNSwgMzgzLCAzNjQsIDM0NSwgMzI4LCAzMTIsIDI5OCwgMjg0LCAyNzEsIDI1OSwgNDk2LCA0NzUsIDQ1NiwgNDM3LCA0MjAsIDQwNCwgMzg4LCAzNzQsIDM2MCwgMzQ3LCAzMzUsIDMyMywgMzEyLCAzMDIsIDI5MiwgMjgyLCAyNzMsIDI2NSwgNTEyLCA0OTcsIDQ4MiwgNDY4LCA0NTQsIDQ0MSwgNDI4LCA0MTcsIDQwNSwgMzk0LCAzODMsIDM3MywgMzY0LCAzNTQsIDM0NSwgMzM3LCAzMjgsIDMyMCwgMzEyLCAzMDUsIDI5OCwgMjkxLCAyODQsIDI3OCwgMjcxLCAyNjUsIDI1OSwgNTA3LCA0OTYsIDQ4NSwgNDc1LCA0NjUsIDQ1NiwgNDQ2LCA0MzcsIDQyOCwgNDIwLCA0MTIsIDQwNCwgMzk2LCAzODgsIDM4MSwgMzc0LCAzNjcsIDM2MCwgMzU0LCAzNDcsIDM0MSwgMzM1LCAzMjksIDMyMywgMzE4LCAzMTIsIDMwNywgMzAyLCAyOTcsIDI5MiwgMjg3LCAyODIsIDI3OCwgMjczLCAyNjksIDI2NSwgMjYxLCA1MTIsIDUwNSwgNDk3LCA0ODksIDQ4MiwgNDc1LCA0NjgsIDQ2MSwgNDU0LCA0NDcsIDQ0MSwgNDM1LCA0MjgsIDQyMiwgNDE3LCA0MTEsIDQwNSwgMzk5LCAzOTQsIDM4OSwgMzgzLCAzNzgsIDM3MywgMzY4LCAzNjQsIDM1OSwgMzU0LCAzNTAsIDM0NSwgMzQxLCAzMzcsIDMzMiwgMzI4LCAzMjQsIDMyMCwgMzE2LCAzMTIsIDMwOSwgMzA1LCAzMDEsIDI5OCwgMjk0LCAyOTEsIDI4NywgMjg0LCAyODEsIDI3OCwgMjc0LCAyNzEsIDI2OCwgMjY1LCAyNjIsIDI1OSwgMjU3LCA1MDcsIDUwMSwgNDk2LCA0OTEsIDQ4NSwgNDgwLCA0NzUsIDQ3MCwgNDY1LCA0NjAsIDQ1NiwgNDUxLCA0NDYsIDQ0MiwgNDM3LCA0MzMsIDQyOCwgNDI0LCA0MjAsIDQxNiwgNDEyLCA0MDgsIDQwNCwgNDAwLCAzOTYsIDM5MiwgMzg4LCAzODUsIDM4MSwgMzc3LCAzNzQsIDM3MCwgMzY3LCAzNjMsIDM2MCwgMzU3LCAzNTQsIDM1MCwgMzQ3LCAzNDQsIDM0MSwgMzM4LCAzMzUsIDMzMiwgMzI5LCAzMjYsIDMyMywgMzIwLCAzMTgsIDMxNSwgMzEyLCAzMTAsIDMwNywgMzA0LCAzMDIsIDI5OSwgMjk3LCAyOTQsIDI5MiwgMjg5LCAyODcsIDI4NSwgMjgyLCAyODAsIDI3OCwgMjc1LCAyNzMsIDI3MSwgMjY5LCAyNjcsIDI2NSwgMjYzLCAyNjEsIDI1OV1cbnNoZ1RhYmxlID0gWzksIDExLCAxMiwgMTMsIDEzLCAxNCwgMTQsIDE1LCAxNSwgMTUsIDE1LCAxNiwgMTYsIDE2LCAxNiwgMTcsIDE3LCAxNywgMTcsIDE3LCAxNywgMTcsIDE4LCAxOCwgMTgsIDE4LCAxOCwgMTgsIDE4LCAxOCwgMTgsIDE5LCAxOSwgMTksIDE5LCAxOSwgMTksIDE5LCAxOSwgMTksIDE5LCAxOSwgMTksIDE5LCAxOSwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNF1cbkJsdXJTdGFjayA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yID0gMFxuICB0aGlzLmcgPSAwXG4gIHRoaXMuYiA9IDBcbiAgdGhpcy5hID0gMFxuICB0aGlzLm5leHQgPSBudWxsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclN0YWNrQmx1clBsdWdpbiAoUGx1Z2luKSB7XG4gIFBsdWdpbi5yZWdpc3Rlcignc3RhY2tCbHVyJywgZnVuY3Rpb24ocmFkaXVzKSB7XG4gICAgbGV0IGJJblN1bSwgYk91dFN1bSwgYlN1bSwgZGl2LCBnSW5TdW0sIGdPdXRTdW0sIGdTdW0sIGhlaWdodCwgaGVpZ2h0TWludXMxLCBpLCBtdWxTdW0sIHAsIHBiLCBwZywgcGl4ZWxzLCBwciwgckluU3VtLCByT3V0U3VtLCByU3VtLCByYWRpdXNQbHVzMSwgcmJzLCBzaGdTdW0sIHN0YWNrLCBzdGFja0VuZCwgc3RhY2tJbiwgc3RhY2tPdXQsIHN0YWNrU3RhcnQsIHN1bUZhY3Rvciwgd2lkdGgsIHdpZHRoTWludXMxLCB4LCB5LCB5aSwgeXAsIHl3LCBfaSwgX2osIF9rLCBfbCwgX20sIF9uLCBfbywgX3AsIF9xXG4gICAgaWYgKGlzTmFOKHJhZGl1cykgfHwgcmFkaXVzIDwgMSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHJhZGl1cyB8PSAwXG4gICAgcGl4ZWxzID0gdGhpcy5waXhlbERhdGFcbiAgICB3aWR0aCA9IHRoaXMuZGltZW5zaW9ucy53aWR0aFxuICAgIGhlaWdodCA9IHRoaXMuZGltZW5zaW9ucy5oZWlnaHRcbiAgICBkaXYgPSByYWRpdXMgKyByYWRpdXMgKyAxXG4gICAgd2lkdGhNaW51czEgPSB3aWR0aCAtIDFcbiAgICBoZWlnaHRNaW51czEgPSBoZWlnaHQgLSAxXG4gICAgcmFkaXVzUGx1czEgPSByYWRpdXMgKyAxXG4gICAgc3VtRmFjdG9yID0gcmFkaXVzUGx1czEgKiAocmFkaXVzUGx1czEgKyAxKSAvIDJcbiAgICBzdGFja1N0YXJ0ID0gbmV3IEJsdXJTdGFjaygpXG4gICAgc3RhY2sgPSBzdGFja1N0YXJ0XG4gICAgZm9yIChpID0gX2kgPSAxOyBkaXYgPj0gMSA/IF9pIDwgZGl2IDogX2kgPiBkaXY7IGkgPSBkaXYgPj0gMSA/ICsrX2kgOiAtLV9pKSB7XG4gICAgICBzdGFjayA9IHN0YWNrLm5leHQgPSBuZXcgQmx1clN0YWNrKClcbiAgICAgIGlmIChpID09PSByYWRpdXNQbHVzMSkge1xuICAgICAgICBzdGFja0VuZCA9IHN0YWNrXG4gICAgICB9XG4gICAgfVxuICAgIHN0YWNrLm5leHQgPSBzdGFja1N0YXJ0XG4gICAgc3RhY2tJbiA9IG51bGxcbiAgICBzdGFja091dCA9IG51bGxcbiAgICB5dyA9IHlpID0gMFxuICAgIG11bFN1bSA9IG11bFRhYmxlW3JhZGl1c11cbiAgICBzaGdTdW0gPSBzaGdUYWJsZVtyYWRpdXNdXG4gICAgZm9yICh5ID0gX2ogPSAwOyBoZWlnaHQgPj0gMCA/IF9qIDwgaGVpZ2h0IDogX2ogPiBoZWlnaHQ7IHkgPSBoZWlnaHQgPj0gMCA/ICsrX2ogOiAtLV9qKSB7XG4gICAgICBySW5TdW0gPSBnSW5TdW0gPSBiSW5TdW0gPSByU3VtID0gZ1N1bSA9IGJTdW0gPSAwXG4gICAgICByT3V0U3VtID0gcmFkaXVzUGx1czEgKiAocHIgPSBwaXhlbHNbeWldKVxuICAgICAgZ091dFN1bSA9IHJhZGl1c1BsdXMxICogKHBnID0gcGl4ZWxzW3lpICsgMV0pXG4gICAgICBiT3V0U3VtID0gcmFkaXVzUGx1czEgKiAocGIgPSBwaXhlbHNbeWkgKyAyXSlcbiAgICAgIHJTdW0gKz0gc3VtRmFjdG9yICogcHJcbiAgICAgIGdTdW0gKz0gc3VtRmFjdG9yICogcGdcbiAgICAgIGJTdW0gKz0gc3VtRmFjdG9yICogcGJcbiAgICAgIHN0YWNrID0gc3RhY2tTdGFydFxuICAgICAgZm9yIChpID0gX2sgPSAwOyByYWRpdXNQbHVzMSA+PSAwID8gX2sgPCByYWRpdXNQbHVzMSA6IF9rID4gcmFkaXVzUGx1czE7IGkgPSByYWRpdXNQbHVzMSA+PSAwID8gKytfayA6IC0tX2spIHtcbiAgICAgICAgc3RhY2suciA9IHByXG4gICAgICAgIHN0YWNrLmcgPSBwZ1xuICAgICAgICBzdGFjay5iID0gcGJcbiAgICAgICAgc3RhY2sgPSBzdGFjay5uZXh0XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSBfbCA9IDE7IHJhZGl1c1BsdXMxID49IDEgPyBfbCA8IHJhZGl1c1BsdXMxIDogX2wgPiByYWRpdXNQbHVzMTsgaSA9IHJhZGl1c1BsdXMxID49IDEgPyArK19sIDogLS1fbCkge1xuICAgICAgICBwID0geWkgKyAoKHdpZHRoTWludXMxIDwgaSA/IHdpZHRoTWludXMxIDogaSkgPDwgMilcbiAgICAgICAgclN1bSArPSAoc3RhY2suciA9IChwciA9IHBpeGVsc1twXSkpICogKHJicyA9IHJhZGl1c1BsdXMxIC0gaSlcbiAgICAgICAgZ1N1bSArPSAoc3RhY2suZyA9IChwZyA9IHBpeGVsc1twICsgMV0pKSAqIHJic1xuICAgICAgICBiU3VtICs9IChzdGFjay5iID0gKHBiID0gcGl4ZWxzW3AgKyAyXSkpICogcmJzXG4gICAgICAgIHJJblN1bSArPSBwclxuICAgICAgICBnSW5TdW0gKz0gcGdcbiAgICAgICAgYkluU3VtICs9IHBiXG4gICAgICAgIHN0YWNrID0gc3RhY2submV4dFxuICAgICAgfVxuICAgICAgc3RhY2tJbiA9IHN0YWNrU3RhcnRcbiAgICAgIHN0YWNrT3V0ID0gc3RhY2tFbmRcbiAgICAgIGZvciAoeCA9IF9tID0gMDsgd2lkdGggPj0gMCA/IF9tIDwgd2lkdGggOiBfbSA+IHdpZHRoOyB4ID0gd2lkdGggPj0gMCA/ICsrX20gOiAtLV9tKSB7XG4gICAgICAgIHBpeGVsc1t5aV0gPSAoclN1bSAqIG11bFN1bSkgPj4gc2hnU3VtXG4gICAgICAgIHBpeGVsc1t5aSArIDFdID0gKGdTdW0gKiBtdWxTdW0pID4+IHNoZ1N1bVxuICAgICAgICBwaXhlbHNbeWkgKyAyXSA9IChiU3VtICogbXVsU3VtKSA+PiBzaGdTdW1cbiAgICAgICAgclN1bSAtPSByT3V0U3VtXG4gICAgICAgIGdTdW0gLT0gZ091dFN1bVxuICAgICAgICBiU3VtIC09IGJPdXRTdW1cbiAgICAgICAgck91dFN1bSAtPSBzdGFja0luLnJcbiAgICAgICAgZ091dFN1bSAtPSBzdGFja0luLmdcbiAgICAgICAgYk91dFN1bSAtPSBzdGFja0luLmJcbiAgICAgICAgcCA9ICh5dyArICgocCA9IHggKyByYWRpdXMgKyAxKSA8IHdpZHRoTWludXMxID8gcCA6IHdpZHRoTWludXMxKSkgPDwgMlxuICAgICAgICBySW5TdW0gKz0gKHN0YWNrSW4uciA9IHBpeGVsc1twXSlcbiAgICAgICAgZ0luU3VtICs9IChzdGFja0luLmcgPSBwaXhlbHNbcCArIDFdKVxuICAgICAgICBiSW5TdW0gKz0gKHN0YWNrSW4uYiA9IHBpeGVsc1twICsgMl0pXG4gICAgICAgIHJTdW0gKz0gckluU3VtXG4gICAgICAgIGdTdW0gKz0gZ0luU3VtXG4gICAgICAgIGJTdW0gKz0gYkluU3VtXG4gICAgICAgIHN0YWNrSW4gPSBzdGFja0luLm5leHRcbiAgICAgICAgck91dFN1bSArPSAocHIgPSBzdGFja091dC5yKVxuICAgICAgICBnT3V0U3VtICs9IChwZyA9IHN0YWNrT3V0LmcpXG4gICAgICAgIGJPdXRTdW0gKz0gKHBiID0gc3RhY2tPdXQuYilcbiAgICAgICAgckluU3VtIC09IHByXG4gICAgICAgIGdJblN1bSAtPSBwZ1xuICAgICAgICBiSW5TdW0gLT0gcGJcbiAgICAgICAgc3RhY2tPdXQgPSBzdGFja091dC5uZXh0XG4gICAgICAgIHlpICs9IDRcbiAgICAgIH1cbiAgICAgIHl3ICs9IHdpZHRoXG4gICAgfVxuICAgIGZvciAoeCA9IF9uID0gMDsgd2lkdGggPj0gMCA/IF9uIDwgd2lkdGggOiBfbiA+IHdpZHRoOyB4ID0gd2lkdGggPj0gMCA/ICsrX24gOiAtLV9uKSB7XG4gICAgICBnSW5TdW0gPSBiSW5TdW0gPSBySW5TdW0gPSBnU3VtID0gYlN1bSA9IHJTdW0gPSAwXG4gICAgICB5aSA9IHggPDwgMlxuICAgICAgck91dFN1bSA9IHJhZGl1c1BsdXMxICogKHByID0gcGl4ZWxzW3lpXSlcbiAgICAgIGdPdXRTdW0gPSByYWRpdXNQbHVzMSAqIChwZyA9IHBpeGVsc1t5aSArIDFdKVxuICAgICAgYk91dFN1bSA9IHJhZGl1c1BsdXMxICogKHBiID0gcGl4ZWxzW3lpICsgMl0pXG4gICAgICByU3VtICs9IHN1bUZhY3RvciAqIHByXG4gICAgICBnU3VtICs9IHN1bUZhY3RvciAqIHBnXG4gICAgICBiU3VtICs9IHN1bUZhY3RvciAqIHBiXG4gICAgICBzdGFjayA9IHN0YWNrU3RhcnRcbiAgICAgIGZvciAoaSA9IF9vID0gMDsgcmFkaXVzUGx1czEgPj0gMCA/IF9vIDwgcmFkaXVzUGx1czEgOiBfbyA+IHJhZGl1c1BsdXMxOyBpID0gcmFkaXVzUGx1czEgPj0gMCA/ICsrX28gOiAtLV9vKSB7XG4gICAgICAgIHN0YWNrLnIgPSBwclxuICAgICAgICBzdGFjay5nID0gcGdcbiAgICAgICAgc3RhY2suYiA9IHBiXG4gICAgICAgIHN0YWNrID0gc3RhY2submV4dFxuICAgICAgfVxuICAgICAgeXAgPSB3aWR0aFxuICAgICAgZm9yIChpID0gX3AgPSAxOyByYWRpdXMgPj0gMSA/IF9wIDw9IHJhZGl1cyA6IF9wID49IHJhZGl1czsgaSA9IHJhZGl1cyA+PSAxID8gKytfcCA6IC0tX3ApIHtcbiAgICAgICAgeWkgPSAoeXAgKyB4KSA8PCAyXG4gICAgICAgIHJTdW0gKz0gKHN0YWNrLnIgPSAocHIgPSBwaXhlbHNbeWldKSkgKiAocmJzID0gcmFkaXVzUGx1czEgLSBpKVxuICAgICAgICBnU3VtICs9IChzdGFjay5nID0gKHBnID0gcGl4ZWxzW3lpICsgMV0pKSAqIHJic1xuICAgICAgICBiU3VtICs9IChzdGFjay5iID0gKHBiID0gcGl4ZWxzW3lpICsgMl0pKSAqIHJic1xuICAgICAgICBySW5TdW0gKz0gcHJcbiAgICAgICAgZ0luU3VtICs9IHBnXG4gICAgICAgIGJJblN1bSArPSBwYlxuICAgICAgICBzdGFjayA9IHN0YWNrLm5leHRcbiAgICAgICAgaWYgKGkgPCBoZWlnaHRNaW51czEpIHtcbiAgICAgICAgICB5cCArPSB3aWR0aFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB5aSA9IHhcbiAgICAgIHN0YWNrSW4gPSBzdGFja1N0YXJ0XG4gICAgICBzdGFja091dCA9IHN0YWNrRW5kXG4gICAgICBmb3IgKHkgPSBfcSA9IDA7IGhlaWdodCA+PSAwID8gX3EgPCBoZWlnaHQgOiBfcSA+IGhlaWdodDsgeSA9IGhlaWdodCA+PSAwID8gKytfcSA6IC0tX3EpIHtcbiAgICAgICAgcCA9IHlpIDw8IDJcbiAgICAgICAgcGl4ZWxzW3BdID0gKHJTdW0gKiBtdWxTdW0pID4+IHNoZ1N1bVxuICAgICAgICBwaXhlbHNbcCArIDFdID0gKGdTdW0gKiBtdWxTdW0pID4+IHNoZ1N1bVxuICAgICAgICBwaXhlbHNbcCArIDJdID0gKGJTdW0gKiBtdWxTdW0pID4+IHNoZ1N1bVxuICAgICAgICByU3VtIC09IHJPdXRTdW1cbiAgICAgICAgZ1N1bSAtPSBnT3V0U3VtXG4gICAgICAgIGJTdW0gLT0gYk91dFN1bVxuICAgICAgICByT3V0U3VtIC09IHN0YWNrSW4uclxuICAgICAgICBnT3V0U3VtIC09IHN0YWNrSW4uZ1xuICAgICAgICBiT3V0U3VtIC09IHN0YWNrSW4uYlxuICAgICAgICBwID0gKHggKyAoKChwID0geSArIHJhZGl1c1BsdXMxKSA8IGhlaWdodE1pbnVzMSA/IHAgOiBoZWlnaHRNaW51czEpICogd2lkdGgpKSA8PCAyXG4gICAgICAgIHJTdW0gKz0gKHJJblN1bSArPSAoc3RhY2tJbi5yID0gcGl4ZWxzW3BdKSlcbiAgICAgICAgZ1N1bSArPSAoZ0luU3VtICs9IChzdGFja0luLmcgPSBwaXhlbHNbcCArIDFdKSlcbiAgICAgICAgYlN1bSArPSAoYkluU3VtICs9IChzdGFja0luLmIgPSBwaXhlbHNbcCArIDJdKSlcbiAgICAgICAgc3RhY2tJbiA9IHN0YWNrSW4ubmV4dFxuICAgICAgICByT3V0U3VtICs9IChwciA9IHN0YWNrT3V0LnIpXG4gICAgICAgIGdPdXRTdW0gKz0gKHBnID0gc3RhY2tPdXQuZylcbiAgICAgICAgYk91dFN1bSArPSAocGIgPSBzdGFja091dC5iKVxuICAgICAgICBySW5TdW0gLT0gcHJcbiAgICAgICAgZ0luU3VtIC09IHBnXG4gICAgICAgIGJJblN1bSAtPSBwYlxuICAgICAgICBzdGFja091dCA9IHN0YWNrT3V0Lm5leHRcbiAgICAgICAgeWkgKz0gd2lkdGhcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyU3RhY2tCbHVyRmlsdGVyIChGaWx0ZXIpIHtcbiAgRmlsdGVyLnJlZ2lzdGVyKCdzdGFja0JsdXInLCBmdW5jdGlvbiAocmFkaXVzKSB7XG4gICAgdGhpcy5wcm9jZXNzUGx1Z2luKCdzdGFja0JsdXInLCBbcmFkaXVzXSlcbiAgfSlcbn1cbiIsImltcG9ydCByZWdpc3RlckNhbWVyYUZpbHRlciBmcm9tICcuL2NhbWVyYSdcbmltcG9ydCByZWdpc3RlckJsdXJGaWx0ZXIgZnJvbSAnLi9ibHVyJ1xuaW1wb3J0IHJlZ2lzdHJlclBvc3Rlcml6ZUZpbHRlciBmcm9tICcuL3Bvc3Rlcml6ZSdcbmltcG9ydCByZWdpc3RlclByZXNldEZpbHRlciBmcm9tICcuL3ByZXNldHMnXG5pbXBvcnQgeyByZWdpc3RlclN0YWNrQmx1clBsdWdpbiwgcmVnaXN0ZXJTdGFja0JsdXJGaWx0ZXIgfSBmcm9tICcuL3N0YWNrQmx1cidcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyUGx1Z2luIChQbHVnaW4pIHtcbiAgcmVnaXN0ZXJTdGFja0JsdXJQbHVnaW4oUGx1Z2luKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJQbHVnaW5GaWx0ZXIgKEZpbHRlcikge1xuICByZWdpc3RlckNhbWVyYUZpbHRlcihGaWx0ZXIpXG4gIHJlZ2lzdGVyQmx1ckZpbHRlcihGaWx0ZXIpXG4gIHJlZ2lzdHJlclBvc3Rlcml6ZUZpbHRlcihGaWx0ZXIpXG4gIHJlZ2lzdGVyUHJlc2V0RmlsdGVyKEZpbHRlcilcbiAgcmVnaXN0ZXJTdGFja0JsdXJGaWx0ZXIoRmlsdGVyKVxufVxuIiwiaW1wb3J0IENhbWFuIGZyb20gJy4vY2FtYW4nXG5pbXBvcnQgQmxlbmRlciBmcm9tICcuL2JsZW5kZXInXG5pbXBvcnQgRmlsdGVyIGZyb20gJy4vZmlsdGVyJ1xuaW1wb3J0IFBsdWdpbiBmcm9tICcuL3BsdWdpbidcblxuaW1wb3J0IHJlZ2lzdGVyQmxlbmRlciBmcm9tICcuLi9saWIvYmxlbmRlcnMnXG5pbXBvcnQgcmVnaXN0ZXJGaWx0ZXIgZnJvbSAnLi4vbGliL2ZpbHRlcnMnXG5pbXBvcnQgeyByZWdpc3RlclBsdWdpbiwgcmVnaXN0ZXJQbHVnaW5GaWx0ZXIgfSBmcm9tICcuLi9saWIvcGx1Z2lucydcblxuLy8gd2VjaGF0IG1pbmkgcHJvZ3JhbSBlbnZcbmlmICh0eXBlb2Ygd3ggPT09ICd1bmRlZmluZWQnKSB7XG4gIC8vIHRocm93IG5ldyBFcnJvcignV2VjaGF0LUNhbWFuSlMgY2FuIG9ubHkgcnVuIGluIHdlY2hhdCBtaW5pIHByb2dyYW0nKVxufVxucmVnaXN0ZXJCbGVuZGVyKEJsZW5kZXIpXG5yZWdpc3RlckZpbHRlcihGaWx0ZXIpXG5cbnJlZ2lzdGVyUGx1Z2luKFBsdWdpbilcbnJlZ2lzdGVyUGx1Z2luRmlsdGVyKEZpbHRlcilcblxuZXhwb3J0IGRlZmF1bHQgQ2FtYW5cbiJdLCJuYW1lcyI6WyJtb2R1bGVLZXl3b3JkcyIsIk1vZHVsZSIsIm9iaiIsImtleSIsImluZGV4T2YiLCJleHRlbmRlZCIsImFwcGx5IiwicHJvdG90eXBlIiwiaW5jbHVkZWQiLCJhcmdzIiwidGFyZ2V0IiwicG9wIiwiaSIsInNvdXJjZSIsInRvIiwiZnJvbSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwic2V0IiwidmFsIiwiZnVuYyIsImNhbGwiLCIkIiwic2VsIiwicm9vdCIsImRvY3VtZW50IiwiZXhwb3J0cyIsInF1ZXJ5U2VsZWN0b3IiLCJub29wIiwiVXRpbCIsImlkIiwiZGVzdCIsInNyYyIsImNvcHkiLCJwcm9wIiwiaGFzT3duUHJvcGVydHkiLCJvcHRzIiwiYXR0cmlidXRlcyIsImF0dHIiLCJleGNlcHQiLCJub2RlTmFtZSIsInNldEF0dHJpYnV0ZSIsIm5vZGVWYWx1ZSIsImxlbmd0aCIsIlVpbnQ4QXJyYXkiLCJBcnJheSIsIlN0b3JlIiwic2VhcmNoIiwiaXRlbXMiLCJuYW1lIiwiY2FsbGJhY2siLCJzZXRUaW1lb3V0IiwiQW5hbHl6ZSIsImMiLCJsZXZlbHMiLCJyIiwiZyIsImIiLCJqIiwicGl4ZWxEYXRhIiwibnVtUGl4ZWxzIiwiRXZlbnQiLCJ0eXBlIiwiZGF0YSIsImV2ZW50cyIsImV2ZW50IiwiZm4iLCJfdHlwZSIsIl9mbiIsInR5cGVzIiwicHVzaCIsIkZpbHRlciIsImZpbHRlckZ1bmMiLCJDYW1hbiIsIlNpbmdsZSIsIktlcm5lbCIsIkxheWVyRGVxdWV1ZSIsIkxheWVyRmluaXNoZWQiLCJMb2FkT3ZlcmxheSIsIlBsdWdpbiIsIkxvZ2dlciIsImxvZ0xldmVsIiwiREVCVUciLCJjb25zb2xlIiwiZSIsImRlYnVnIiwibG9nIiwiTG9nIiwicGx1Z2luIiwicGx1Z2lucyIsImNvbnRleHQiLCJQaXhlbCIsIngiLCJ5Iiwid2lkdGgiLCJsb2MiLCJNYXRoIiwiZmxvb3IiLCJhIiwiRXJyb3IiLCJkaW1lbnNpb25zIiwiaGVpZ2h0IiwiaG9yaXoiLCJ2ZXJ0IiwibmV3TG9jIiwicGl4ZWxBdExvY2F0aW9uIiwiY29vcmRpbmF0ZXNUb0xvY2F0aW9uIiwicmdiYSIsInRvS2V5IiwiaW5jbHVkZUFscGhhIiwiaGV4IiwidG9TdHJpbmciLCJJTyIsImltZyIsImNvcnNFbmFibGVkIiwiaXNVUkxSZW1vdGUiLCJjcm9zc09yaWdpbiIsInRvTG93ZXJDYXNlIiwidXJsIiwibWF0Y2hlcyIsIm1hdGNoIiwiZG9tYWluUmVnZXgiLCJkb21haW4iLCJyZW1vdGVQcm94eSIsImluZm8iLCJwcm94eVVybCIsInByb3h5UGFyYW0iLCJlbmNvZGVVUklDb21wb25lbnQiLCJsYW5nIiwibGFuZ1RvRXh0IiwicnVieSIsInB5dGhvbiIsInBlcmwiLCJqYXZhc2NyaXB0IiwiUmVuZGVyZXIiLCJyZW5kZXJRdWV1ZSIsIm1vZFBpeGVsRGF0YSIsImpvYiIsInRyaWdnZXIiLCJmaW5pc2hlZEZuIiwiY3VycmVudEpvYiIsInNoaWZ0IiwiVHlwZSIsImxheWVyIiwiY2FudmFzUXVldWUiLCJleGVjdXRlTGF5ZXIiLCJwcm9jZXNzTmV4dCIsImFwcGx5Q3VycmVudExheWVyIiwicG9wQ29udGV4dCIsImxvYWRPdmVybGF5IiwiZXhlY3V0ZVBsdWdpbiIsImV4ZWN1dGVGaWx0ZXIiLCJkYXRhQXJyYXkiLCJibG9ja3NEb25lIiwibiIsImJsb2NrUGl4ZWxMZW5ndGgiLCJCbG9ja3MiLCJibG9ja04iLCJsYXN0QmxvY2tOIiwic3RhcnQiLCJlbmQiLCJlYWNoQmxvY2siLCJyZW5kZXJCbG9jayIsInJlbmRlcktlcm5lbCIsImV4ZWN1dGUiLCJibnVtIiwiYmxvY2tOdW0iLCJ0b3RhbEJsb2NrcyIsInN0YXJ0UGl4ZWwiLCJlbmRQaXhlbCIsInBpeGVsIiwic2V0Q29udGV4dCIsInByb2Nlc3NGbiIsImNsYW1wUkdCIiwiYmxvY2tGaW5pc2hlZCIsImJpYXMiLCJkaXZpc29yIiwiYWRqdXN0IiwiYWRqdXN0U2l6ZSIsInNxcnQiLCJrZXJuZWwiLCJtYXgiLCJtaW4iLCJidWlsZGVyIiwiYnVpbGRlckluZGV4IiwiayIsInAiLCJnZXRQaXhlbFJlbGF0aXZlIiwicmVzIiwicHJvY2Vzc0tlcm5lbCIsImJsb2Nrc0ZpbmlzaGVkIiwiSW1hZ2UiLCJvbmxvYWQiLCJkcmF3SW1hZ2UiLCJpbWFnZURhdGEiLCJnZXRJbWFnZURhdGEiLCJyZW1vdGVDaGVjayIsIkJsZW5kZXIiLCJibGVuZGVycyIsInJnYmFMYXllciIsInJnYmFQYXJlbnQiLCJMYXllciIsImZpbHRlciIsIm9wdGlvbnMiLCJibGVuZGluZ01vZGUiLCJvcGFjaXR5IiwibGF5ZXJJRCIsInVuaXFpZCIsImNhbnZhcyIsImNyZWF0ZUVsZW1lbnQiLCJnZXRDb250ZXh0IiwiY3JlYXRlSW1hZ2VEYXRhIiwiY2IiLCJuZXdMYXllciIsIm1vZGUiLCJwYXJlbnREYXRhIiwiZmlsbENvbG9yIiwiYXJndW1lbnRzIiwiaW1hZ2UiLCJyZW5kZXJlciIsInBpeGVsU3RhY2siLCJsYXllckRhdGEiLCJyZXN1bHQiLCJ2ZXJzaW9uIiwicmVsZWFzZSIsImRhdGUiLCJOb2RlSlMiLCJnZXRBdHRyaWJ1dGUiLCJmaW5pc2hJbml0IiwiYmluZCIsImltYWdlTG9hZGVkIiwicGFyc2VJbnQiLCJnZXRBdHRySWQiLCJpc05hTiIsImhhcyIsImluaXRpYWxpemVkUGl4ZWxEYXRhIiwib3JpZ2luYWxQaXhlbERhdGEiLCJjcm9wQ29vcmRpbmF0ZXMiLCJjcm9wcGVkIiwicmVzaXplZCIsImxheWVyU3RhY2siLCJjdXJyZW50TGF5ZXIiLCJzY2FsZWQiLCJhbmFseXplIiwiZG9tSXNMb2FkZWQiLCJwYXJzZUFyZ3VtZW50cyIsInNldHVwIiwicmVhZHlTdGF0ZSIsImxpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXRPYmoiLCJpbml0VHlwZSIsImltYWdlVXJsIiwic2V0SW5pdE9iamVjdCIsImluaXROb2RlIiwiaW5pdEltYWdlIiwiaW5pdENhbnZhcyIsImNvcHlBdHRyaWJ1dGVzIiwicGFyZW50Tm9kZSIsInJlcGxhY2VDaGlsZCIsImltYWdlQWRqdXN0bWVudHMiLCJ3YWl0Rm9ySW1hZ2VMb2FkZWQiLCJpc1JlbW90ZSIsImlzSW1hZ2VMb2FkZWQiLCJjb21wbGV0ZSIsIm5hdHVyYWxXaWR0aCIsIm5hdHVyYWxIZWlnaHQiLCJpbWFnZVdpZHRoIiwiaW1hZ2VIZWlnaHQiLCJvcmlnaW5hbFdpZHRoIiwicHJlU2NhbGVkV2lkdGgiLCJvcmlnaW5hbEhlaWdodCIsInByZVNjYWxlZEhlaWdodCIsImhhc0lkIiwiYXNzaWduSWQiLCJhbGxvd1JldmVydCIsInB1dCIsIm5ld0NhbnZhcyIsIm9sZENhbnZhcyIsInJlbG9hZENhbnZhc0RhdGEiLCJwdXRJbWFnZURhdGEiLCJ1cGRhdGVDb250ZXh0Iiwib3JpZ2luYWxWaXNpYmxlUGl4ZWxzIiwiY3R4IiwicmVwbGFjZUNhbnZhcyIsInBpeGVscyIsImFkZCIsInB1c2hDb250ZXh0IiwiYXBwbHlUb1BhcmVudCIsIm5vZGVTYXZlIiwiYnJvd3NlclNhdmUiLCJ0b0Jhc2U2NCIsInJlcGxhY2UiLCJsb2NhdGlvbiIsImhyZWYiLCJ3aW5kb3ciLCJkZXZpY2VQaXhlbFJhdGlvIiwidG9EYXRhVVJMIiwicmVnaXN0ZXJCbGVuZGVyIiwicmVnaXN0ZXIiLCJDb252ZXJ0IiwiY2hhckF0Iiwic3Vic3RyIiwibCIsImgiLCJzIiwiZCIsInEiLCJodWVUb1JHQiIsInQiLCJ2IiwiZiIsInBvdyIsInoiLCJ3aGl0ZVgiLCJ3aGl0ZVkiLCJ3aGl0ZVoiLCJ4eXoiLCJyZ2JUb1hZWiIsInh5elRvTGFiIiwiQ2FsY3VsYXRlIiwieDEiLCJ5MSIsIngyIiwieTIiLCJnZXRGbG9hdCIsInJhbmQiLCJyYW5kb20iLCJ0b0ZpeGVkIiwicm91bmQiLCJjb250cm9sUG9pbnRzIiwibG93Qm91bmQiLCJoaWdoQm91bmQiLCJiZXppZXIiLCJsZXJwIiwiY2xhbXAiLCJwcmV2IiwibmV4dCIsImVuZFgiLCJtaXNzaW5nVmFsdWVzIiwidmFsdWVzIiwia2V5cyIsInJldCIsImxlZnRDb29yZCIsInJpZ2h0Q29vcmQiLCJyZWdpc3RlckZpbHRlciIsImNvbG9yIiwiaGV4VG9SR0IiLCJwcm9jZXNzIiwiYXZnIiwiYW10IiwiYWJzIiwibHVtaW5hbmNlIiwiaHN2IiwicmdiVG9IU1YiLCJoc3ZUb1JHQiIsInJnYiIsImxldmVsIiwicmFuZG9tUmFuZ2UiLCJjaGFuIiwicmVkIiwiZ3JlZW4iLCJibHVlIiwiY2hhbnMiLCJjcHMiLCJsYXN0IiwiYWxnbyIsInNwbGl0IiwiY3RybDEiLCJjdHJsMiIsInJldmVyc2UiLCJjdXJ2ZXMiLCJ2aWduZXR0ZUZpbHRlcnMiLCJicmlnaHRuZXNzIiwic3RyZW5ndGgiLCJnYW1tYSIsImNvbG9yaXplIiwicmVnaXN0ZXJDYW1lcmFGaWx0ZXIiLCJzaXplIiwiY2VudGVyIiwiZGlzdCIsImRpdiIsImxvY2F0aW9uWFkiLCJkaXN0YW5jZSIsImRlZmF1bHRzIiwiZGltIiwicGVyY2VudCIsIl9pIiwiX2xlbiIsIl9yZWYiLCJjb3JuZXJSYWRpdXMiLCJtZXRob2QiLCJleHRlbmQiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiY29vcmRzIiwibGVmdCIsInJpZ2h0IiwiYm90dG9tIiwidG9wIiwiY29ybmVycyIsIm1heERpc3QiLCJyYWRpYWxEaXN0IiwiY29yZXJzIiwicmVnaXN0ZXJCbHVyRmlsdGVyIiwiZGVncmVlcyIsInJlZ2lzdGVyUG9zdGVyaXplRmlsdGVyIiwibnVtT2ZBcmVhcyIsIm51bU9mVmFsdWVzIiwicmVnaXN0ZXJQcmVzZXRGaWx0ZXIiLCJ2aWduZXR0ZSIsImdyZXlzY2FsZSIsImNvbnRyYXN0Iiwibm9pc2UiLCJzZXBpYSIsImNoYW5uZWxzIiwiZXhwb3N1cmUiLCJzYXR1cmF0aW9uIiwiZ3JleSIsInZpYnJhbmNlIiwic2hhcnBlbiIsInBvc3Rlcml6ZSIsImNsaXAiLCJzZXRCbGVuZGluZ01vZGUiLCJjb3B5UGFyZW50Iiwic3RhY2tCbHVyIiwiaHVlIiwiQmx1clN0YWNrIiwibXVsVGFibGUiLCJzaGdUYWJsZSIsInJlZ2lzdGVyU3RhY2tCbHVyUGx1Z2luIiwicmFkaXVzIiwiYkluU3VtIiwiYk91dFN1bSIsImJTdW0iLCJnSW5TdW0iLCJnT3V0U3VtIiwiZ1N1bSIsImhlaWdodE1pbnVzMSIsIm11bFN1bSIsInBiIiwicGciLCJwciIsInJJblN1bSIsInJPdXRTdW0iLCJyU3VtIiwicmFkaXVzUGx1czEiLCJyYnMiLCJzaGdTdW0iLCJzdGFjayIsInN0YWNrRW5kIiwic3RhY2tJbiIsInN0YWNrT3V0Iiwic3RhY2tTdGFydCIsInN1bUZhY3RvciIsIndpZHRoTWludXMxIiwieWkiLCJ5cCIsInl3IiwiX2oiLCJfayIsIl9sIiwiX20iLCJfbiIsIl9vIiwiX3AiLCJfcSIsInJlZ2lzdGVyU3RhY2tCbHVyRmlsdGVyIiwicHJvY2Vzc1BsdWdpbiIsInJlZ2lzdGVyUGx1Z2luIiwicmVnaXN0ZXJQbHVnaW5GaWx0ZXIiLCJyZWdpc3RyZXJQb3N0ZXJpemVGaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUNBLElBQU1BLGlCQUFpQixDQUFDLFVBQUQsRUFBYSxVQUFiLENBQXZCOztFQUVBOzs7Ozs7Ozs7Ozs7TUFXcUJDOzs7Ozs7OztFQUNuQjtrQ0FDZ0JDLEtBQUs7RUFDbkIsV0FBSyxJQUFJQyxHQUFULElBQWdCRCxHQUFoQixFQUFxQjtFQUNuQixZQUFJRixlQUFlSSxPQUFmLEtBQTJCLENBQUMsQ0FBaEMsRUFBbUM7RUFDakMsZUFBS0QsR0FBTCxJQUFZRCxJQUFJQyxHQUFKLENBQVo7RUFDRDtFQUNGO0VBQ0RELFVBQUlHLFFBQUosSUFBZ0JILElBQUlHLFFBQUosQ0FBYUMsS0FBYixDQUFtQixJQUFuQixDQUFoQjtFQUNBLGFBQU8sSUFBUDtFQUNEOztFQUVEOzs7OytCQUNpQkosS0FBSztFQUNwQixXQUFLLElBQUlDLEdBQVQsSUFBZ0JELEdBQWhCLEVBQXFCO0VBQ25CLFlBQUlGLGVBQWVJLE9BQWYsS0FBMkIsQ0FBQyxDQUFoQyxFQUFtQztFQUNqQyxlQUFLRyxTQUFMLENBQWVKLEdBQWYsSUFBc0JELElBQUlDLEdBQUosQ0FBdEI7RUFDRDtFQUNGO0VBQ0RELFVBQUlNLFFBQUosSUFBZ0JOLElBQUlNLFFBQUosQ0FBYUYsS0FBYixDQUFtQixJQUFuQixDQUFoQjtFQUNBLGFBQU8sSUFBUDtFQUNEOztFQUVEO0VBQ0E7Ozs7aUNBQzBCO0VBQUEsd0NBQU5HLElBQU07RUFBTkEsWUFBTTtFQUFBOztFQUN4QixVQUFNQyxTQUFTRCxLQUFLRSxHQUFMLEVBQWY7RUFDQSxXQUFLLElBQUlDLENBQVQsSUFBY0gsSUFBZCxFQUFvQjtFQUNsQixZQUFNSSxTQUFTSixLQUFLRyxDQUFMLENBQWY7RUFDQSxhQUFLTCxTQUFMLENBQWVNLE1BQWYsSUFBeUJILE9BQU9ILFNBQVAsQ0FBaUJNLE1BQWpCLENBQXpCO0VBQ0Q7RUFDRjs7RUFFRDs7OztvQ0FDc0JDLElBQUlDLE1BQU07RUFBQTs7RUFDOUIsV0FBS1IsU0FBTCxDQUFlTyxFQUFmLElBQXFCLFlBQWE7RUFBQSwyQ0FBVEwsSUFBUztFQUFUQSxjQUFTO0VBQUE7O0VBQ2hDLGNBQUtGLFNBQUwsQ0FBZVEsSUFBZixFQUFxQlQsS0FBckIsQ0FBMkIsS0FBM0IsRUFBaUNHLElBQWpDO0VBQ0QsT0FGRDtFQUdEOztFQUVEOzs7O29DQUNzQkssSUFBSUMsTUFBTTtFQUM5QkMsYUFBT0MsY0FBUCxDQUFzQixLQUFLVixTQUEzQixFQUFzQ08sRUFBdEMsRUFBMEM7RUFDeENJLFdBRHdDLG9CQUNsQztFQUNKLGlCQUFPLEtBQUtILElBQUwsQ0FBUDtFQUNELFNBSHVDO0VBSXhDSSxXQUp3QyxrQkFJbkNDLEdBSm1DLEVBSTlCO0VBQ1IsZUFBS0wsSUFBTCxJQUFhSyxHQUFiO0VBQ0Q7RUFOdUMsT0FBMUM7RUFRRDs7RUFFRDtFQUNBOzs7OytCQUNpQkMsTUFBTTtFQUNyQkEsV0FBS0MsSUFBTCxDQUFVLElBQVYsRUFBZ0IsS0FBS2YsU0FBckI7RUFDRDs7Ozs7RUN0RUg7RUFDQTtBQUNBLEVBQU8sSUFBTWdCLElBQUksU0FBSkEsQ0FBSSxDQUFDQyxHQUFELEVBQTBCO0VBQUEsTUFBcEJDLElBQW9CLHVFQUFiQyxRQUFhOztFQUN6QyxNQUFJLFFBQU9GLEdBQVAseUNBQU9BLEdBQVAsT0FBZSxRQUFmLElBQTJCLE9BQU9HLE9BQVAsS0FBbUIsV0FBbEQsRUFBK0Q7RUFDN0QsV0FBT0gsR0FBUDtFQUNEO0VBQ0QsU0FBT0MsS0FBS0csYUFBTCxDQUFtQkosR0FBbkIsQ0FBUDtFQUNELENBTE07O0FBT1AsRUFBTyxTQUFTSyxJQUFULEdBQWlCOztFQUV4Qjs7Ozs7O0FBTUEsTUFBYUMsSUFBYjtFQUFBO0VBQUE7RUFBQTs7RUFBQTtFQUFBO0VBQUEsNkJBQ21CO0VBQ2YsVUFBSUMsS0FBSyxDQUFUO0VBQ0EsYUFBTztFQUNMYixXQURLLG9CQUNFO0VBQ0wsaUJBQU9hLElBQVA7RUFDRDtFQUhJLE9BQVA7RUFLRDs7RUFFRDs7RUFWRjtFQUFBO0VBQUEsMkJBV2lCN0IsR0FYakIsRUFXOEI7RUFDMUIsVUFBTThCLE9BQU85QixHQUFiOztFQUQwQix3Q0FBTCtCLEdBQUs7RUFBTEEsV0FBSztFQUFBOztFQUUxQixXQUFLLElBQUlyQixDQUFULElBQWNxQixHQUFkLEVBQW1CO0VBQ2pCLFlBQUlDLE9BQU9ELElBQUlyQixDQUFKLENBQVg7RUFDQSxhQUFLLElBQUl1QixJQUFULElBQWlCRCxJQUFqQixFQUF1QjtFQUNyQixjQUFJQSxLQUFLRSxjQUFMLENBQW9CRCxJQUFwQixDQUFKLEVBQStCO0VBQzdCSCxpQkFBS0csSUFBTCxJQUFhRCxLQUFLQyxJQUFMLENBQWI7RUFDRDtFQUNGO0VBQ0Y7O0VBRUQsYUFBT0gsSUFBUDtFQUNEOztFQUVEOztFQXpCRjtFQUFBO0VBQUEsNkJBMEJtQlosR0ExQm5CLEVBMEJ3QjtFQUNwQixVQUFJQSxNQUFNLENBQVYsRUFBYTtFQUNYLGVBQU8sQ0FBUDtFQUNEO0VBQ0QsVUFBSUEsTUFBTSxHQUFWLEVBQWU7RUFDYixlQUFPLEdBQVA7RUFDRDs7RUFFRCxhQUFPQSxHQUFQO0VBQ0Q7RUFuQ0g7RUFBQTtFQUFBLG1DQXFDeUJMLElBckN6QixFQXFDK0JELEVBckMvQixFQXFDOEM7RUFBQSxVQUFYdUIsSUFBVyx1RUFBSixFQUFJOztFQUMxQyxXQUFLLElBQUl6QixDQUFULElBQWNHLEtBQUt1QixVQUFuQixFQUErQjtFQUM3QixZQUFJQyxPQUFPeEIsS0FBS3VCLFVBQUwsQ0FBZ0IxQixDQUFoQixDQUFYO0VBQ0EsWUFBSXlCLEtBQUtHLE1BQUwsSUFBZUgsS0FBS0csTUFBTCxDQUFZcEMsT0FBWixDQUFvQm1DLEtBQUtFLFFBQXpCLE1BQXVDLENBQUMsQ0FBM0QsRUFBOEQ7RUFDNUQ7RUFDRDtFQUNEM0IsV0FBRzRCLFlBQUgsQ0FBZ0JILEtBQUtFLFFBQXJCLEVBQStCRixLQUFLSSxTQUFwQztFQUNEO0VBQ0Y7O0VBRUQ7O0VBL0NGO0VBQUE7RUFBQSxnQ0FnRGdDO0VBQUEsVUFBWkMsTUFBWSx1RUFBSCxDQUFHOztFQUM1QixVQUFJQyxVQUFKLEVBQWdCO0VBQ2QsZUFBTyxJQUFJQSxVQUFKLENBQWVELE1BQWYsQ0FBUDtFQUNEO0VBQ0QsYUFBTyxJQUFJRSxLQUFKLENBQVVGLE1BQVYsQ0FBUDtFQUNEO0VBckRIO0VBQUE7RUFBQTs7RUNqQkE7Ozs7OztNQU1xQkc7Ozs7Ozs7MEJBR1BDLFFBQVE7RUFDbEIsYUFBTyxDQUFDLENBQUMsS0FBS0MsS0FBTCxDQUFXRCxNQUFYLENBQVQ7RUFDRDs7OzZCQUVXQSxRQUFRO0VBQ2xCLGFBQU8sS0FBS0MsS0FBTCxDQUFXRCxNQUFYLENBQVA7RUFDRDs7OzBCQUVXRSxNQUFNaEQsS0FBSztFQUNyQixXQUFLK0MsS0FBTCxDQUFXQyxJQUFYLElBQW1CaEQsR0FBbkI7RUFDRDs7OzhCQUVlOEMsUUFBUUcsVUFBVTtFQUFBOztFQUNoQ0MsaUJBQVcsWUFBTTtFQUNmRCxpQkFBUzdCLElBQVQsQ0FBYyxNQUFLSixHQUFMLENBQVM4QixNQUFULENBQWQsRUFBZ0MsTUFBSzlCLEdBQUwsQ0FBUzhCLE1BQVQsQ0FBaEM7RUFDRCxPQUZELEVBRUcsQ0FGSDs7RUFJQSxhQUFPLEtBQUs5QixHQUFMLENBQVM4QixNQUFULENBQVA7RUFDRDs7OzhCQUUyQjtFQUFBLFVBQWRFLElBQWMsdUVBQVAsS0FBTzs7RUFDMUIsVUFBSUEsSUFBSixFQUFVO0VBQ1IsZUFBTyxLQUFLRCxLQUFMLENBQVdDLElBQVgsQ0FBUDtFQUNELE9BRkQsTUFFTztFQUNMLGFBQUtELEtBQUwsR0FBYSxFQUFiO0VBQ0Q7RUFDRjs7Ozs7d0JBN0JrQkY7OztXQUNKOzs7RUNQakI7Ozs7OztNQU1xQk07RUFDbkIsbUJBQWFDLENBQWIsRUFBZ0I7RUFBQTs7RUFDZCxTQUFLQSxDQUFMLEdBQVNBLENBQVQ7RUFDRDs7RUFFRDs7RUFFQTs7Ozs7Ozs7Ozs7d0NBT21CO0VBQ2pCLFVBQU1DLFNBQVM7RUFDYkMsV0FBRyxFQURVO0VBRWJDLFdBQUcsRUFGVTtFQUdiQyxXQUFHO0VBRUw7RUFMZSxPQUFmLENBTUEsS0FBSyxJQUFJOUMsSUFBSSxDQUFiLEVBQWdCQSxLQUFLLEdBQXJCLEVBQTBCQSxHQUExQixFQUErQjtFQUM3QjJDLGVBQU9DLENBQVAsQ0FBUzVDLENBQVQsSUFBYyxDQUFkO0VBQ0EyQyxlQUFPRSxDQUFQLENBQVM3QyxDQUFULElBQWMsQ0FBZDtFQUNBMkMsZUFBT0csQ0FBUCxDQUFTOUMsQ0FBVCxJQUFjLENBQWQ7RUFDRDs7RUFFRDtFQUNBLFdBQUssSUFBSUEsS0FBSSxDQUFSLEVBQVcrQyxJQUFJLEtBQUtMLENBQUwsQ0FBT00sU0FBUCxDQUFpQmhCLE1BQXJDLEVBQTZDaEMsS0FBSStDLENBQWpELEVBQW9EL0MsTUFBSyxDQUF6RCxFQUE0RDtFQUMxRDJDLGVBQU9DLENBQVAsQ0FBUyxLQUFLRixDQUFMLENBQU9NLFNBQVAsQ0FBaUJoRCxFQUFqQixDQUFUO0VBQ0EyQyxlQUFPRSxDQUFQLENBQVMsS0FBS0gsQ0FBTCxDQUFPTSxTQUFQLENBQWlCaEQsS0FBSSxDQUFyQixDQUFUO0VBQ0EyQyxlQUFPRyxDQUFQLENBQVMsS0FBS0osQ0FBTCxDQUFPTSxTQUFQLENBQWlCaEQsS0FBSSxDQUFyQixDQUFUO0VBQ0Q7O0VBRUQ7RUFDQTtFQUNBLFVBQU1pRCxZQUFZLEtBQUtQLENBQUwsQ0FBT00sU0FBUCxDQUFpQmhCLE1BQWpCLEdBQTBCLENBQTVDOztFQUVBLFdBQUssSUFBSWhDLE1BQUksQ0FBYixFQUFnQkEsT0FBSyxHQUFyQixFQUEwQkEsS0FBMUIsRUFBK0I7RUFDN0IyQyxlQUFPQyxDQUFQLENBQVM1QyxHQUFULEtBQWVpRCxTQUFmO0VBQ0FOLGVBQU9FLENBQVAsQ0FBUzdDLEdBQVQsS0FBZWlELFNBQWY7RUFDQU4sZUFBT0csQ0FBUCxDQUFTOUMsR0FBVCxLQUFlaUQsU0FBZjtFQUNEO0VBQ0QsYUFBT04sTUFBUDtFQUNEOzs7OztFQ2xESDs7Ozs7O01BTXFCTzs7Ozs7Ozs7O0VBWW5COzs7Ozs7Ozs7OEJBU2dCcEQsUUFBUXFELE1BQW1CO0VBQUEsVUFBYkMsSUFBYSx1RUFBTixJQUFNOztFQUN6QyxVQUFJLEtBQUtDLE1BQUwsQ0FBWUYsSUFBWixLQUFxQixLQUFLRSxNQUFMLENBQVlGLElBQVosRUFBa0JuQixNQUEzQyxFQUFtRDtFQUNqRCxhQUFLLElBQUloQyxDQUFULElBQWMsS0FBS3FELE1BQUwsQ0FBWUYsSUFBWixDQUFkLEVBQWlDO0VBQy9CLGNBQUlHLFFBQVEsS0FBS0QsTUFBTCxDQUFZRixJQUFaLEVBQWtCbkQsQ0FBbEIsQ0FBWjtFQUNBLGNBQUlzRCxNQUFNeEQsTUFBTixLQUFpQixJQUFqQixJQUF5QkEsT0FBT3FCLEVBQVAsS0FBY21DLE1BQU14RCxNQUFOLENBQWFxQixFQUF4RCxFQUE0RDtFQUMxRG1DLGtCQUFNQyxFQUFOLENBQVM3QyxJQUFULENBQWNaLE1BQWQsRUFBc0JzRCxJQUF0QjtFQUNEO0VBQ0Y7RUFDRjtFQUNGOztFQUVEOzs7Ozs7Ozs7Ozs7Ozs7OztFQTlCQTs7Ozs2QkE4Q2V0RCxRQUFRcUQsTUFBTUksSUFBSTtFQUMvQjtFQUNBLFVBQUksT0FBT3pELE1BQVAsS0FBa0IsUUFBdEIsRUFBZ0M7RUFDOUIsWUFBTTBELFFBQVExRCxNQUFkO0VBQ0EsWUFBTTJELE1BQU1OLElBQVo7O0VBRUFyRCxpQkFBUyxJQUFUO0VBQ0FxRCxlQUFPSyxLQUFQOztFQUVBRCxhQUFLRSxHQUFMO0VBQ0Q7O0VBRUQ7RUFDQSxVQUFJLEtBQUtDLEtBQUwsQ0FBV2xFLE9BQVgsQ0FBbUIyRCxJQUFuQixNQUE2QixDQUFDLENBQWxDLEVBQXFDO0VBQ25DLGVBQU8sS0FBUDtFQUNEOztFQUVELFVBQUksQ0FBQyxLQUFLRSxNQUFMLENBQVlGLElBQVosQ0FBTCxFQUF3QjtFQUN0QixhQUFLRSxNQUFMLENBQVlGLElBQVosSUFBb0IsRUFBcEI7RUFDRDtFQUNELFdBQUtFLE1BQUwsQ0FBWUYsSUFBWixFQUFrQlEsSUFBbEIsQ0FBdUIsRUFBQzdELGNBQUQsRUFBU3lELE1BQVQsRUFBdkI7RUFDQSxhQUFPLElBQVA7RUFDRDs7Ozs7d0JBdEVrQkw7OztXQUNIOzt3QkFER0E7OztXQUdKLENBQ2IsY0FEYSxFQUViLGlCQUZhLEVBR2IsYUFIYSxFQUliLGdCQUphLEVBS2IsY0FMYSxFQU1iLGVBTmE7OztFQ1BqQjs7Ozs7OztNQU1xQlU7Ozs7Ozs7OztFQVduQjs7Ozs7Ozs7K0JBUWlCdEIsTUFBTXVCLFlBQVk7RUFDakNDLFlBQU1uRSxTQUFOLENBQWdCMkMsSUFBaEIsSUFBd0J1QixVQUF4QjtFQUNEO0VBcEJEOzs7Ozs7d0JBRG1CRDs7O1dBRUw7RUFDWkcsWUFBUSxDQURJO0VBRVpDLFlBQVEsQ0FGSTtFQUdaQyxrQkFBYyxDQUhGO0VBSVpDLG1CQUFlLENBSkg7RUFLWkMsaUJBQWEsQ0FMRDtFQU1aQyxZQUFRLENBTkk7OztFQ1RoQjs7Ozs7O01BS01DLFNBQ0osa0JBQWU7RUFBQTs7RUFBQTs7RUFDYixNQUFNQyxXQUFXLENBQUMsS0FBRCxFQUFRLE1BQVIsRUFBZ0IsTUFBaEIsRUFBd0IsT0FBeEIsQ0FBakI7O0VBRGEsNkJBRUp0RSxDQUZJO0VBR1gsUUFBTXNDLE9BQU9nQyxTQUFTdEUsQ0FBVCxDQUFiO0VBQ0EsVUFBS3NDLElBQUwsSUFBYSxZQUFhO0VBQUEsd0NBQVR6QyxJQUFTO0VBQVRBLFlBQVM7RUFBQTs7RUFDeEIsVUFBSSxDQUFDaUUsTUFBTVMsS0FBWCxFQUFrQjtFQUNoQjtFQUNEO0VBQ0QsVUFBSTtFQUNGQyxnQkFBUWxDLElBQVIsRUFBYzVDLEtBQWQsQ0FBb0I4RSxPQUFwQixFQUE2QjNFLElBQTdCO0VBQ0QsT0FGRCxDQUVFLE9BQU80RSxDQUFQLEVBQVU7RUFDVjtFQUNBRCxnQkFBUWxDLElBQVIsRUFBY3pDLElBQWQ7RUFDRDtFQUNGLEtBVkQ7RUFKVzs7RUFFYixPQUFLLElBQUlHLENBQVQsSUFBY3NFLFFBQWQsRUFBd0I7RUFBQSxVQUFmdEUsQ0FBZTtFQWF2QjtFQUNELE9BQUswRSxLQUFMLEdBQWEsS0FBS0MsR0FBbEI7RUFDRDs7RUFHSCxJQUFNQyxNQUFNLElBQUlQLE1BQUosRUFBWjs7RUMzQkE7Ozs7OztNQU1xQkQ7Ozs7Ozs7K0JBR0Y5QixNQUFNdUMsUUFBUTtFQUM3QixXQUFLQyxPQUFMLENBQWF4QyxJQUFiLElBQXFCdUMsTUFBckI7RUFDRDs7OzhCQUVlRSxTQUFTekMsTUFBTXpDLE1BQU07RUFDbkMsV0FBS2lGLE9BQUwsQ0FBYXhDLElBQWIsRUFBbUI1QyxLQUFuQixDQUF5QnFGLE9BQXpCLEVBQWtDbEYsSUFBbEM7RUFDRDs7Ozs7d0JBVGtCdUU7OztXQUNGOzs7RUNQbkI7Ozs7OztNQU1xQlk7Ozs0Q0FDV0MsR0FBR0MsR0FBR0MsT0FBTztFQUN6QyxhQUFPLENBQUNELElBQUlDLEtBQUosR0FBWUYsQ0FBYixJQUFrQixDQUF6QjtFQUNEOzs7NENBQzZCRyxLQUFLRCxPQUFPO0VBQ3hDLFVBQU1ELElBQUlHLEtBQUtDLEtBQUwsQ0FBV0YsT0FBT0QsUUFBUSxDQUFmLENBQVgsQ0FBVjtFQUNBLFVBQU1GLElBQUtHLE9BQU9ELFFBQVEsQ0FBZixDQUFELEdBQXNCLENBQWhDOztFQUVBLGFBQU8sRUFBQ0YsSUFBRCxFQUFJQyxJQUFKLEVBQVA7RUFDRDs7O0VBRUQsbUJBQXFEO0VBQUEsUUFBeEN0QyxDQUF3Qyx1RUFBcEMsQ0FBb0M7RUFBQSxRQUFqQ0MsQ0FBaUMsdUVBQTdCLENBQTZCO0VBQUEsUUFBMUJDLENBQTBCLHVFQUF0QixDQUFzQjtFQUFBLFFBQW5CeUMsQ0FBbUIsdUVBQWYsR0FBZTtFQUFBLFFBQVY3QyxDQUFVLHVFQUFOLElBQU07RUFBQTs7RUFDbkQsU0FBSzBDLEdBQUwsR0FBVyxDQUFYO0VBQ0EsU0FBS3hDLENBQUwsR0FBU0EsQ0FBVDtFQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtFQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtFQUNBLFNBQUt5QyxDQUFMLEdBQVNBLENBQVQ7RUFDQSxTQUFLN0MsQ0FBTCxHQUFTQSxDQUFUO0VBQ0Q7Ozs7aUNBRVdBLEdBQUc7RUFDYixXQUFLQSxDQUFMLEdBQVNBLENBQVQ7RUFDRDs7RUFFRDs7OzttQ0FDYztFQUNaLFVBQUksQ0FBQyxLQUFLQSxDQUFWLEVBQWE7RUFDWCxjQUFNLElBQUk4QyxLQUFKLENBQVUsNEJBQVYsQ0FBTjtFQUNEO0VBQ0QsVUFBTU4sSUFBSSxLQUFLeEMsQ0FBTCxDQUFPK0MsVUFBUCxDQUFrQkMsTUFBbEIsR0FBMkJMLEtBQUtDLEtBQUwsQ0FBVyxLQUFLRixHQUFMLElBQVksS0FBSzFDLENBQUwsQ0FBTytDLFVBQVAsQ0FBa0JOLEtBQWxCLEdBQTBCLENBQXRDLENBQVgsQ0FBckM7RUFDQSxVQUFNRixJQUFLLEtBQUtHLEdBQUwsSUFBWSxLQUFLMUMsQ0FBTCxDQUFPK0MsVUFBUCxDQUFrQk4sS0FBbEIsR0FBMEIsQ0FBdEMsQ0FBRCxHQUE2QyxDQUF2RDs7RUFFQSxhQUFPLEVBQUNGLElBQUQsRUFBSUMsSUFBSixFQUFQO0VBQ0Q7OztzQ0FFZ0JFLEtBQUs7RUFDcEIsVUFBSSxDQUFDLEtBQUsxQyxDQUFWLEVBQWE7RUFDWCxjQUFNLElBQUk4QyxLQUFKLENBQVUsNEJBQVYsQ0FBTjtFQUNEOztFQUVELGFBQU8sSUFBSVIsS0FBSixDQUNMLEtBQUt0QyxDQUFMLENBQU9NLFNBQVAsQ0FBaUJvQyxHQUFqQixDQURLLEVBRUwsS0FBSzFDLENBQUwsQ0FBT00sU0FBUCxDQUFpQm9DLE1BQU0sQ0FBdkIsQ0FGSyxFQUdMLEtBQUsxQyxDQUFMLENBQU9NLFNBQVAsQ0FBaUJvQyxNQUFNLENBQXZCLENBSEssRUFJTCxLQUFLMUMsQ0FBTCxDQUFPTSxTQUFQLENBQWlCb0MsTUFBTSxDQUF2QixDQUpLLEVBS0wsS0FBSzFDLENBTEEsQ0FBUDtFQU9EOztFQUVEOzs7O3VDQUNrQmlELE9BQU9DLE1BQU07RUFDN0IsVUFBSSxDQUFDLEtBQUtsRCxDQUFWLEVBQWE7RUFDWCxjQUFNLElBQUk4QyxLQUFKLENBQVUsNEJBQVYsQ0FBTjtFQUNEOztFQUVEO0VBQ0EsVUFBTUssU0FBUyxLQUFLVCxHQUFMLEdBQVksS0FBSzFDLENBQUwsQ0FBTytDLFVBQVAsQ0FBa0JOLEtBQWxCLEdBQTBCLENBQTFCLElBQStCUyxPQUFPLENBQUMsQ0FBdkMsQ0FBWixHQUEwRCxJQUFJRCxLQUE3RTs7RUFFQSxVQUFJRSxTQUFTLEtBQUtuRCxDQUFMLENBQU9NLFNBQVAsQ0FBaUJoQixNQUExQixJQUFvQzZELFNBQVMsQ0FBakQsRUFBb0Q7RUFDbEQsZUFBTyxJQUFJYixLQUFKLENBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsR0FBbkIsRUFBd0IsS0FBS3RDLENBQTdCLENBQVA7RUFDRDs7RUFFRCxhQUFPLEtBQUtvRCxlQUFMLENBQXFCRCxNQUFyQixDQUFQO0VBQ0Q7O0VBRUQ7Ozs7OztFQW9CQTsrQkFDVVosR0FBR0MsR0FBRztFQUNkLFVBQUksQ0FBQyxLQUFLeEMsQ0FBVixFQUFhO0VBQ1gsY0FBTSxJQUFJOEMsS0FBSixDQUFVLDRCQUFWLENBQU47RUFDRDs7RUFFRCxVQUFNSixNQUFNLEtBQUtXLHFCQUFMLENBQTJCZCxDQUEzQixFQUE4QkMsQ0FBOUIsRUFBaUMsS0FBS0MsS0FBdEMsQ0FBWjtFQUNBLGFBQU8sS0FBS1csZUFBTCxDQUFxQlYsR0FBckIsQ0FBUDtFQUNEOztFQUVEOzs7OytCQUNVSCxHQUFHQyxHQUFHYyxNQUFNO0VBQ3BCLFVBQUksQ0FBQyxLQUFLdEQsQ0FBVixFQUFhO0VBQ1gsY0FBTSxJQUFJOEMsS0FBSixDQUFVLDRCQUFWLENBQU47RUFDRDs7RUFFRCxVQUFNSixNQUFNLEtBQUtXLHFCQUFMLENBQTJCZCxDQUEzQixFQUE4QkMsQ0FBOUIsRUFBaUMsS0FBS0MsS0FBdEMsQ0FBWjs7RUFFQSxXQUFLekMsQ0FBTCxDQUFPTSxTQUFQLENBQWlCb0MsR0FBakIsSUFBd0JZLEtBQUtwRCxDQUE3QjtFQUNBLFdBQUtGLENBQUwsQ0FBT00sU0FBUCxDQUFpQm9DLE1BQU0sQ0FBdkIsSUFBNEJZLEtBQUtuRCxDQUFqQztFQUNBLFdBQUtILENBQUwsQ0FBT00sU0FBUCxDQUFpQm9DLE1BQU0sQ0FBdkIsSUFBNEJZLEtBQUtsRCxDQUFqQztFQUNBLFdBQUtKLENBQUwsQ0FBT00sU0FBUCxDQUFpQm9DLE1BQU0sQ0FBdkIsSUFBNEJZLEtBQUtULENBQWpDO0VBQ0Q7OztpQ0FFVztFQUNWLFdBQUtVLEtBQUw7RUFDRDs7OzhCQUU0QjtFQUFBLFVBQXRCQyxZQUFzQix1RUFBUCxLQUFPOztFQUMzQixVQUFJQyxZQUFVLEtBQUt2RCxDQUFMLENBQU93RCxRQUFQLENBQWdCLEVBQWhCLENBQVYsR0FBZ0MsS0FBS3ZELENBQUwsQ0FBT3VELFFBQVAsQ0FBZ0IsRUFBaEIsQ0FBaEMsR0FBc0QsS0FBS3RELENBQUwsQ0FBT3NELFFBQVAsQ0FBZ0IsRUFBaEIsQ0FBMUQ7O0VBRUEsVUFBSUYsWUFBSixFQUFrQjtFQUNoQkMsZUFBTyxLQUFLWixDQUFMLENBQU9hLFFBQVAsQ0FBZ0IsRUFBaEIsQ0FBUDtFQUNEO0VBQ0QsYUFBT0QsR0FBUDtFQUNEOzs7dUNBdER3QlIsT0FBT0MsTUFBTUksTUFBTTtFQUMxQyxVQUFJLENBQUMsS0FBS3RELENBQVYsRUFBYTtFQUNYLGNBQU0sSUFBSThDLEtBQUosQ0FBVSw0QkFBVixDQUFOO0VBQ0Q7O0VBRUQsVUFBTUssU0FBUyxLQUFLVCxHQUFMLEdBQVksS0FBSzFDLENBQUwsQ0FBTytDLFVBQVAsQ0FBa0JOLEtBQWxCLEdBQTBCLENBQTFCLElBQStCUyxPQUFPLENBQUMsQ0FBdkMsQ0FBWixHQUEwRCxJQUFJRCxLQUE3RTs7RUFFQSxVQUFJRSxTQUFTLEtBQUtuRCxDQUFMLENBQU9NLFNBQVAsQ0FBaUJoQixNQUExQixJQUFvQzZELFNBQVMsQ0FBakQsRUFBb0Q7RUFDbEQ7RUFDRDs7RUFFRCxXQUFLbkQsQ0FBTCxDQUFPTSxTQUFQLENBQWlCNkMsTUFBakIsSUFBMkJHLEtBQUtwRCxDQUFoQztFQUNBLFdBQUtGLENBQUwsQ0FBT00sU0FBUCxDQUFpQjZDLFNBQVMsQ0FBMUIsSUFBK0JHLEtBQUtuRCxDQUFwQztFQUNBLFdBQUtILENBQUwsQ0FBT00sU0FBUCxDQUFpQjZDLFNBQVMsQ0FBMUIsSUFBK0JHLEtBQUtsRCxDQUFwQztFQUNBLFdBQUtKLENBQUwsQ0FBT00sU0FBUCxDQUFpQjZDLFNBQVMsQ0FBMUIsSUFBK0JHLEtBQUtULENBQXBDOztFQUVBLGFBQU8sSUFBUDtFQUNEOzs7OztFQ3RGSDs7Ozs7OztNQU1xQmM7Ozs7Ozs7OztFQUluQjs7Ozs7Ozs7OytCQVNpQkMsS0FBSztFQUNwQixVQUFJLENBQUNBLEdBQUwsRUFBVTtFQUNSLGVBQU8sS0FBUDtFQUNEO0VBQ0QsVUFBSSxLQUFLQyxXQUFMLENBQWlCRCxHQUFqQixDQUFKLEVBQTJCO0VBQ3pCLGVBQU8sS0FBUDtFQUNEO0VBQ0QsYUFBTyxLQUFLRSxXQUFMLENBQWlCRixJQUFJakYsR0FBckIsQ0FBUDtFQUNEOztFQUVEOzs7Ozs7Ozs7RUF0QkE7Ozs7a0NBOEJvQmlGLEtBQUs7RUFDdkIsYUFBT0EsSUFBSUcsV0FBSixLQUFvQkgsSUFBSUcsV0FBSixDQUFnQkMsV0FBaEIsT0FBa0MsV0FBbEMsSUFBaURKLElBQUlHLFdBQUosQ0FBZ0JDLFdBQWhCLE9BQWtDLGlCQUF2RyxDQUFQO0VBQ0Q7O0VBRUQ7Ozs7Ozs7Ozs7OztrQ0FTb0JDLEtBQUs7RUFDdkIsVUFBTUMsVUFBVUQsSUFBSUUsS0FBSixDQUFVLEtBQUtDLFdBQWYsQ0FBaEI7RUFDQSxhQUFPRixVQUFVQSxRQUFRLENBQVIsTUFBZTlGLFNBQVNpRyxNQUFsQyxHQUEyQyxLQUFsRDtFQUNEOztFQUVEOzs7Ozs7Ozs7OztrQ0FRb0IxRixLQUFLO0VBQ3ZCLFVBQUksS0FBS21GLFdBQUwsQ0FBaUJuRixHQUFqQixDQUFKLEVBQTJCO0VBQ3pCLFlBQUksQ0FBQ3lDLE1BQU1rRCxXQUFOLENBQWtCaEYsTUFBdkIsRUFBK0I7RUFDN0I0QyxjQUFJcUMsSUFBSiwyRUFBaUY1RixHQUFqRjtFQUNELFNBRkQsTUFFTztFQUNMLGNBQUl5QyxNQUFNMEMsV0FBTixDQUFrQjFDLE1BQU1rRCxXQUF4QixDQUFKLEVBQTBDO0VBQ3hDcEMsZ0JBQUlxQyxJQUFKLENBQVMsK0NBQVQ7RUFDQTtFQUNEO0VBQ0QsaUJBQU8sS0FBS0MsUUFBTCxDQUFjN0YsR0FBZCxDQUFQO0VBQ0Q7RUFDRjtFQUNGOztFQUVEOzs7Ozs7Ozs7OzsrQkFRaUJBLEtBQUs7RUFDcEIsY0FBVXlDLE1BQU1rRCxXQUFOLEdBQW9CbEQsTUFBTWtELFdBQTFCLEdBQXdDLEVBQWxELFlBQTBEbEQsTUFBTXFELFVBQWhFLFdBQWdGQyxtQkFBbUIvRixHQUFuQixDQUFoRjtFQUNEOztFQUVEOzs7Ozs7Ozs7OzsrQkFRaUJnRyxNQUFNO0VBQ3JCLFVBQU1DLFlBQVk7RUFDaEJDLGNBQU0sSUFEVTtFQUVoQkMsZ0JBQVEsSUFGUTtFQUdoQkMsY0FBTSxJQUhVO0VBSWhCQyxvQkFBWTtFQUpJLE9BQWxCOztFQU9BTCxhQUFPQSxLQUFLWCxXQUFMLEVBQVA7RUFDQVcsYUFBT0MsVUFBVUQsSUFBVixJQUFrQkMsVUFBVUQsSUFBVixDQUFsQixHQUFvQ0EsSUFBM0M7O0VBRUEsc0NBQThCQSxJQUE5QjtFQUNEOzs7Ozt3QkF2R2tCaEI7OztXQUVFOzs7RUNKdkI7Ozs7Ozs7TUFNcUJzQjtFQUluQixvQkFBYWpGLENBQWIsRUFBZ0I7RUFBQTs7RUFDZCxTQUFLQSxDQUFMLEdBQVNBLENBQVQ7RUFDQSxTQUFLa0YsV0FBTCxHQUFtQixFQUFuQjtFQUNBLFNBQUtDLFlBQUwsR0FBb0IsSUFBcEI7RUFDRDtFQVBEOzs7OzswQkFTS0MsS0FBSztFQUNSLFVBQUksQ0FBQ0EsR0FBTCxFQUFVO0VBQ1I7RUFDRDtFQUNELFdBQUtGLFdBQUwsQ0FBaUJqRSxJQUFqQixDQUFzQm1FLEdBQXRCO0VBQ0Q7O0VBRUQ7Ozs7b0NBQ2U7RUFDYjtFQUNBLFVBQUksS0FBS0YsV0FBTCxDQUFpQjVGLE1BQWpCLEtBQTRCLENBQWhDLEVBQW1DO0VBQ2pDa0IsY0FBTTZFLE9BQU4sQ0FBYyxJQUFkLEVBQW9CLGdCQUFwQjtFQUNBLGFBQUtDLFVBQUwsSUFBbUIsS0FBS0EsVUFBTCxDQUFnQnRILElBQWhCLENBQXFCLEtBQUtnQyxDQUExQixDQUFuQjtFQUNBLGVBQU8sSUFBUDtFQUNEO0VBQ0QsV0FBS3VGLFVBQUwsR0FBa0IsS0FBS0wsV0FBTCxDQUFpQk0sS0FBakIsRUFBbEI7O0VBRUEsY0FBUSxLQUFLRCxVQUFMLENBQWdCOUUsSUFBeEI7RUFDRSxhQUFLUyxPQUFPdUUsSUFBUCxDQUFZbEUsWUFBakI7RUFDRSxjQUFNbUUsUUFBUSxLQUFLMUYsQ0FBTCxDQUFPMkYsV0FBUCxDQUFtQkgsS0FBbkIsRUFBZDtFQUNBLGVBQUt4RixDQUFMLENBQU80RixZQUFQLENBQW9CRixLQUFwQjtFQUNBLGVBQUtHLFdBQUw7RUFDQTtFQUNGLGFBQUszRSxPQUFPdUUsSUFBUCxDQUFZakUsYUFBakI7RUFDRSxlQUFLeEIsQ0FBTCxDQUFPOEYsaUJBQVA7RUFDQSxlQUFLOUYsQ0FBTCxDQUFPK0YsVUFBUDtFQUNBLGVBQUtGLFdBQUw7RUFDQTtFQUNGLGFBQUszRSxPQUFPdUUsSUFBUCxDQUFZaEUsV0FBakI7RUFDRSxlQUFLdUUsV0FBTCxDQUFpQixLQUFLVCxVQUFMLENBQWdCRyxLQUFqQyxFQUF3QyxLQUFLSCxVQUFMLENBQWdCNUcsR0FBeEQ7RUFDQTtFQUNGLGFBQUt1QyxPQUFPdUUsSUFBUCxDQUFZL0QsTUFBakI7RUFDRSxlQUFLdUUsYUFBTDtFQUNBO0VBQ0Y7RUFDRSxlQUFLQyxhQUFMO0VBbEJKO0VBb0JEOzs7OEJBRVFyRyxVQUFVO0VBQ2pCLFdBQUt5RixVQUFMLEdBQWtCekYsUUFBbEI7RUFDQSxXQUFLc0YsWUFBTCxHQUFvQjNHLEtBQUsySCxTQUFMLENBQWUsS0FBS25HLENBQUwsQ0FBT00sU0FBUCxDQUFpQmhCLE1BQWhDLENBQXBCO0VBQ0EsV0FBS3VHLFdBQUw7RUFDRDs7O2dDQUVVaEYsSUFBSTtFQUFBOztFQUNiO0VBQ0EsV0FBS3VGLFVBQUwsR0FBa0IsQ0FBbEI7O0VBRUEsVUFBTUMsSUFBSSxLQUFLckcsQ0FBTCxDQUFPTSxTQUFQLENBQWlCaEIsTUFBM0I7RUFDQSxVQUFNZ0gsbUJBQW1CM0QsS0FBS0MsS0FBTCxDQUFZeUQsSUFBSSxDQUFMLEdBQVVwQixTQUFTc0IsTUFBOUIsQ0FBekI7RUFDQSxVQUFNQyxTQUFTRixtQkFBbUIsQ0FBbEM7RUFDQSxVQUFNRyxhQUFhRCxTQUFXSCxJQUFJLENBQUwsR0FBVXBCLFNBQVNzQixNQUFwQixHQUE4QixDQUExRDs7RUFQYSxpQ0FTSmpKLENBVEk7RUFVWCxZQUFNb0osUUFBUXBKLElBQUlrSixNQUFsQjtFQUNBLFlBQU1HLE1BQU1ELFNBQVNwSixNQUFNMkgsU0FBU3NCLE1BQVQsR0FBa0IsQ0FBeEIsR0FBNEJFLFVBQTVCLEdBQXlDRCxNQUFsRCxDQUFaO0VBQ0ExRyxtQkFBVyxZQUFNO0VBQ2ZlLGFBQUc3QyxJQUFILENBQVEsS0FBUixFQUFjVixDQUFkLEVBQWlCb0osS0FBakIsRUFBd0JDLEdBQXhCO0VBQ0QsU0FGRCxFQUVHLENBRkg7RUFaVzs7RUFTYixXQUFLLElBQUlySixJQUFJLENBQWIsRUFBZ0JBLElBQUkySCxTQUFTc0IsTUFBN0IsRUFBcUNqSixHQUFyQyxFQUEwQztFQUFBLGNBQWpDQSxDQUFpQztFQU16QztFQUNGOztFQUVEO0VBQ0E7Ozs7c0NBQ2lCO0VBQ2ZrRCxZQUFNNkUsT0FBTixDQUFjLEtBQUtyRixDQUFuQixFQUFzQixjQUF0QixFQUFzQyxLQUFLdUYsVUFBM0M7O0VBRUEsVUFBSSxLQUFLQSxVQUFMLENBQWdCOUUsSUFBaEIsS0FBeUJTLE9BQU91RSxJQUFQLENBQVlwRSxNQUF6QyxFQUFpRDtFQUMvQyxhQUFLdUYsU0FBTCxDQUFlLEtBQUtDLFdBQXBCO0VBQ0QsT0FGRCxNQUVPO0VBQ0wsYUFBS0QsU0FBTCxDQUFlLEtBQUtFLFlBQXBCO0VBQ0Q7RUFDRjs7RUFFRDs7OztzQ0FDaUI7RUFDZjVFLFVBQUlGLEtBQUosdUJBQThCLEtBQUt1RCxVQUFMLENBQWdCcEQsTUFBOUM7RUFDQVQsYUFBT3FGLE9BQVAsQ0FBZSxLQUFLL0csQ0FBcEIsRUFBdUIsS0FBS3VGLFVBQUwsQ0FBZ0JwRCxNQUF2QyxFQUErQyxLQUFLb0QsVUFBTCxDQUFnQnBJLElBQS9EO0VBQ0ErRSxVQUFJRixLQUFKLGFBQW9CLEtBQUt1RCxVQUFMLENBQWdCcEQsTUFBcEM7O0VBRUEsV0FBSzBELFdBQUw7RUFDRDs7RUFFRDs7OztrQ0FDYW1CLE1BQU1OLE9BQU9DLEtBQUs7RUFDN0J6RSxVQUFJRixLQUFKLGFBQW9CZ0YsSUFBcEIsbUJBQXNDLEtBQUt6QixVQUFMLENBQWdCM0YsSUFBdEQsaUJBQXNFOEcsS0FBdEUsZUFBcUZDLEdBQXJGO0VBQ0FuRyxZQUFNNkUsT0FBTixDQUFjLEtBQUtyRixDQUFuQixFQUFzQixjQUF0QixFQUFzQztFQUNwQ2lILGtCQUFVRCxJQUQwQjtFQUVwQ0UscUJBQWFqQyxTQUFTc0IsTUFGYztFQUdwQ1ksb0JBQVlULEtBSHdCO0VBSXBDVSxrQkFBVVQ7RUFKMEIsT0FBdEM7O0VBT0EsVUFBTVUsUUFBUSxJQUFJL0UsS0FBSixFQUFkO0VBQ0ErRSxZQUFNQyxVQUFOLENBQWlCLEtBQUt0SCxDQUF0Qjs7RUFFQSxXQUFLLElBQUkxQyxJQUFJb0osS0FBYixFQUFvQnBKLElBQUlxSixHQUF4QixFQUE2QnJKLEtBQUssQ0FBbEMsRUFBcUM7RUFDbkMrSixjQUFNM0UsR0FBTixHQUFZcEYsQ0FBWjs7RUFFQStKLGNBQU1uSCxDQUFOLEdBQVUsS0FBS0YsQ0FBTCxDQUFPTSxTQUFQLENBQWlCaEQsQ0FBakIsQ0FBVjtFQUNBK0osY0FBTWxILENBQU4sR0FBVSxLQUFLSCxDQUFMLENBQU9NLFNBQVAsQ0FBaUJoRCxJQUFJLENBQXJCLENBQVY7RUFDQStKLGNBQU1qSCxDQUFOLEdBQVUsS0FBS0osQ0FBTCxDQUFPTSxTQUFQLENBQWlCaEQsSUFBSSxDQUFyQixDQUFWO0VBQ0ErSixjQUFNeEUsQ0FBTixHQUFVLEtBQUs3QyxDQUFMLENBQU9NLFNBQVAsQ0FBaUJoRCxJQUFJLENBQXJCLENBQVY7O0VBRUEsYUFBS2lJLFVBQUwsQ0FBZ0JnQyxTQUFoQixDQUEwQkYsS0FBMUI7O0VBRUEsYUFBS3JILENBQUwsQ0FBT00sU0FBUCxDQUFpQmhELENBQWpCLElBQXNCa0IsS0FBS2dKLFFBQUwsQ0FBY0gsTUFBTW5ILENBQXBCLENBQXRCO0VBQ0EsYUFBS0YsQ0FBTCxDQUFPTSxTQUFQLENBQWlCaEQsSUFBSSxDQUFyQixJQUEwQmtCLEtBQUtnSixRQUFMLENBQWNILE1BQU1sSCxDQUFwQixDQUExQjtFQUNBLGFBQUtILENBQUwsQ0FBT00sU0FBUCxDQUFpQmhELElBQUksQ0FBckIsSUFBMEJrQixLQUFLZ0osUUFBTCxDQUFjSCxNQUFNakgsQ0FBcEIsQ0FBMUI7RUFDQSxhQUFLSixDQUFMLENBQU9NLFNBQVAsQ0FBaUJoRCxJQUFJLENBQXJCLElBQTBCa0IsS0FBS2dKLFFBQUwsQ0FBY0gsTUFBTXhFLENBQXBCLENBQTFCO0VBQ0Q7O0VBRUQsV0FBSzRFLGFBQUwsQ0FBbUJULElBQW5CO0VBQ0Q7O0VBRUQ7Ozs7bUNBQ2NBLE1BQU1OLE9BQU9DLEtBQUs7RUFDOUIsVUFBTWUsT0FBTyxLQUFLbkMsVUFBTCxDQUFnQm1DLElBQTdCO0VBQ0EsVUFBTUMsVUFBVSxLQUFLcEMsVUFBTCxDQUFnQm9DLE9BQWhDO0VBQ0EsVUFBTXRCLElBQUksS0FBS3JHLENBQUwsQ0FBT00sU0FBUCxDQUFpQmhCLE1BQTNCOztFQUVBLFVBQU1zSSxTQUFTLEtBQUtyQyxVQUFMLENBQWdCcUMsTUFBL0I7RUFDQSxVQUFNQyxhQUFhbEYsS0FBS21GLElBQUwsQ0FBVUYsT0FBT3RJLE1BQWpCLENBQW5COztFQUVBLFVBQU15SSxTQUFTLEVBQWY7O0VBRUE3RixVQUFJRixLQUFKLGlDQUF3QyxLQUFLdUQsVUFBTCxDQUFnQjNGLElBQXhEOztFQUVBOEcsY0FBUS9ELEtBQUtxRixHQUFMLENBQVN0QixLQUFULEVBQWdCLEtBQUsxRyxDQUFMLENBQU8rQyxVQUFQLENBQWtCTixLQUFsQixHQUEwQixDQUExQixJQUErQixDQUFDb0YsYUFBYSxDQUFkLElBQW1CLENBQWxELENBQWhCLENBQVI7RUFDQWxCLFlBQU1oRSxLQUFLc0YsR0FBTCxDQUFTdEIsR0FBVCxFQUFjTixJQUFLLEtBQUtyRyxDQUFMLENBQU8rQyxVQUFQLENBQWtCTixLQUFsQixHQUEwQixDQUExQixJQUErQixDQUFDb0YsYUFBYSxDQUFkLElBQW1CLENBQWxELENBQW5CLENBQU47O0VBRUEsVUFBTUssVUFBVSxDQUFDTCxhQUFhLENBQWQsSUFBbUIsQ0FBbkM7O0VBRUEsVUFBTVIsUUFBUSxJQUFJL0UsS0FBSixFQUFkO0VBQ0ErRSxZQUFNQyxVQUFOLENBQWlCLEtBQUt0SCxDQUF0Qjs7RUFFQSxXQUFLLElBQUkxQyxJQUFJb0osS0FBYixFQUFvQnBKLElBQUlxSixHQUF4QixFQUE2QnJKLEtBQUssQ0FBbEMsRUFBcUM7RUFDbkMrSixjQUFNM0UsR0FBTixHQUFZcEYsQ0FBWjtFQUNBLFlBQUk2SyxlQUFlLENBQW5COztFQUVBLGFBQUssSUFBSTlILElBQUksQ0FBQzZILE9BQWQsRUFBdUI3SCxLQUFLNkgsT0FBNUIsRUFBcUM3SCxHQUFyQyxFQUEwQztFQUN4QyxlQUFLLElBQUkrSCxJQUFJRixPQUFiLEVBQXNCRSxLQUFLLENBQUNGLE9BQTVCLEVBQXFDRSxHQUFyQyxFQUEwQztFQUN4QyxnQkFBSUMsSUFBSWhCLE1BQU1pQixnQkFBTixDQUF1QmpJLENBQXZCLEVBQTBCK0gsQ0FBMUIsQ0FBUjtFQUNBTCxtQkFBT0ksZUFBZSxDQUF0QixJQUEyQkUsRUFBRW5JLENBQTdCO0VBQ0E2SCxtQkFBT0ksZUFBZSxDQUFmLEdBQW1CLENBQTFCLElBQStCRSxFQUFFbEksQ0FBakM7RUFDQTRILG1CQUFPSSxlQUFlLENBQWYsR0FBbUIsQ0FBMUIsSUFBK0JFLEVBQUVqSSxDQUFqQztFQUNBK0g7RUFDRDtFQUNGOztFQUVELFlBQU1JLE1BQU0sS0FBS0MsYUFBTCxDQUFtQlosTUFBbkIsRUFBMkJHLE1BQTNCLEVBQW1DSixPQUFuQyxFQUE0Q0QsSUFBNUMsQ0FBWjs7RUFFQSxhQUFLdkMsWUFBTCxDQUFrQjdILENBQWxCLElBQXVCa0IsS0FBS2dKLFFBQUwsQ0FBY2UsSUFBSXJJLENBQWxCLENBQXZCO0VBQ0EsYUFBS2lGLFlBQUwsQ0FBa0I3SCxJQUFJLENBQXRCLElBQTJCa0IsS0FBS2dKLFFBQUwsQ0FBY2UsSUFBSXBJLENBQWxCLENBQTNCO0VBQ0EsYUFBS2dGLFlBQUwsQ0FBa0I3SCxJQUFJLENBQXRCLElBQTJCa0IsS0FBS2dKLFFBQUwsQ0FBY2UsSUFBSW5JLENBQWxCLENBQTNCO0VBQ0EsYUFBSytFLFlBQUwsQ0FBa0I3SCxJQUFJLENBQXRCLElBQTJCLEtBQUswQyxDQUFMLENBQU9NLFNBQVAsQ0FBaUJoRCxJQUFJLENBQXJCLENBQTNCO0VBQ0Q7O0VBRUQsV0FBS21LLGFBQUwsQ0FBbUJULElBQW5CO0VBQ0Q7O0VBRUQ7Ozs7b0NBQ2VBLE1BQU07RUFDbkIsVUFBSUEsUUFBUSxDQUFaLEVBQWU7RUFDYjlFLFlBQUlGLEtBQUosYUFBb0JnRixJQUFwQiwyQkFBOEMsS0FBS3pCLFVBQUwsQ0FBZ0IzRixJQUE5RDtFQUNEO0VBQ0QsV0FBS3dHLFVBQUw7O0VBRUE1RixZQUFNNkUsT0FBTixDQUFjLEtBQUtyRixDQUFuQixFQUFzQixlQUF0QixFQUF1QztFQUNyQ2lILGtCQUFVRCxJQUQyQjtFQUVyQ3lCLHdCQUFnQixLQUFLckMsVUFGZ0I7RUFHckNjLHFCQUFhakMsU0FBU3NCO0VBSGUsT0FBdkM7O0VBTUEsVUFBSSxLQUFLSCxVQUFMLEtBQW9CbkIsU0FBU3NCLE1BQWpDLEVBQXlDO0VBQ3ZDLFlBQUksS0FBS2hCLFVBQUwsQ0FBZ0I5RSxJQUFoQixLQUF5QlMsT0FBT3VFLElBQVAsQ0FBWW5FLE1BQXpDLEVBQWlEO0VBQy9DLGVBQUssSUFBSWhFLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLMEMsQ0FBTCxDQUFPTSxTQUFQLENBQWlCaEIsTUFBckMsRUFBNkNoQyxHQUE3QyxFQUFrRDtFQUNoRCxpQkFBSzBDLENBQUwsQ0FBT00sU0FBUCxDQUFpQmhELENBQWpCLElBQXNCLEtBQUs2SCxZQUFMLENBQWtCN0gsQ0FBbEIsQ0FBdEI7RUFDRDtFQUNGOztFQUVELFlBQUkwSixRQUFRLENBQVosRUFBZTtFQUNiOUUsY0FBSUYsS0FBSixhQUFvQixLQUFLdUQsVUFBTCxDQUFnQjNGLElBQXBDO0VBQ0Q7RUFDRFksY0FBTTZFLE9BQU4sQ0FBYyxLQUFLckYsQ0FBbkIsRUFBc0IsaUJBQXRCLEVBQXlDLEtBQUt1RixVQUE5QztFQUNBLGFBQUtNLFdBQUw7RUFDRDtFQUNGOztFQUVEOzs7O29DQUNlK0IsUUFBUUcsUUFBUUosU0FBU0QsTUFBTTtFQUM1QyxVQUFNNUosTUFBTTtFQUNWb0MsV0FBRyxDQURPO0VBRVZDLFdBQUcsQ0FGTztFQUdWQyxXQUFHO0VBSE8sT0FBWjtFQUtBLFdBQUssSUFBSTlDLElBQUksQ0FBYixFQUFnQkEsSUFBSXNLLE9BQU90SSxNQUEzQixFQUFtQ2hDLEdBQW5DLEVBQXdDO0VBQ3RDUSxZQUFJb0MsQ0FBSixJQUFTMEgsT0FBT3RLLENBQVAsSUFBWXlLLE9BQU96SyxJQUFJLENBQVgsQ0FBckI7RUFDQVEsWUFBSXFDLENBQUosSUFBU3lILE9BQU90SyxDQUFQLElBQVl5SyxPQUFPekssSUFBSSxDQUFKLEdBQVEsQ0FBZixDQUFyQjtFQUNBUSxZQUFJc0MsQ0FBSixJQUFTd0gsT0FBT3RLLENBQVAsSUFBWXlLLE9BQU96SyxJQUFJLENBQUosR0FBUSxDQUFmLENBQXJCO0VBQ0Q7O0VBRURRLFVBQUlvQyxDQUFKLEdBQVNwQyxJQUFJb0MsQ0FBSixHQUFReUgsT0FBVCxHQUFvQkQsSUFBNUI7RUFDQTVKLFVBQUlxQyxDQUFKLEdBQVNyQyxJQUFJcUMsQ0FBSixHQUFRd0gsT0FBVCxHQUFvQkQsSUFBNUI7RUFDQTVKLFVBQUlzQyxDQUFKLEdBQVN0QyxJQUFJc0MsQ0FBSixHQUFRdUgsT0FBVCxHQUFvQkQsSUFBNUI7RUFDQSxhQUFPNUosR0FBUDtFQUNEOztFQUVEOzs7O2tDQUNhNEgsT0FBTy9HLEtBQUs7RUFBQTs7RUFDdkI7RUFDQSxVQUFNaUYsTUFBTSxJQUFJOEUsS0FBSixFQUFaO0VBQ0E5RSxVQUFJK0UsTUFBSixHQUFhLFlBQU07RUFDakJqRCxjQUFNckQsT0FBTixDQUFjdUcsU0FBZCxDQUF3QmhGLEdBQXhCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLEVBQW1DLE9BQUs1RCxDQUFMLENBQU8rQyxVQUFQLENBQWtCTixLQUFyRCxFQUE0RCxPQUFLekMsQ0FBTCxDQUFPK0MsVUFBUCxDQUFrQkMsTUFBOUU7RUFDQTBDLGNBQU1tRCxTQUFOLEdBQWtCbkQsTUFBTXJELE9BQU4sQ0FBY3lHLFlBQWQsQ0FBMkIsQ0FBM0IsRUFBOEIsQ0FBOUIsRUFBaUMsT0FBSzlJLENBQUwsQ0FBTytDLFVBQVAsQ0FBa0JOLEtBQW5ELEVBQTBELE9BQUt6QyxDQUFMLENBQU8rQyxVQUFQLENBQWtCQyxNQUE1RSxDQUFsQjtFQUNBMEMsY0FBTXBGLFNBQU4sR0FBa0JvRixNQUFNbUQsU0FBTixDQUFnQm5JLElBQWxDOztFQUVBLGVBQUtWLENBQUwsQ0FBT00sU0FBUCxHQUFtQm9GLE1BQU1wRixTQUF6Qjs7RUFFQSxlQUFLdUYsV0FBTDtFQUNELE9BUkQ7O0VBVUEsVUFBTXJCLFdBQVdiLEdBQUdvRixXQUFILENBQWVwSyxHQUFmLENBQWpCO0VBQ0FpRixVQUFJakYsR0FBSixHQUFVNkYsWUFBWTdGLEdBQXRCO0VBQ0Q7Ozs7O3dCQTNPa0JzRzs7O1dBRUg7OztFQ2ZsQjs7Ozs7O01BTXFCK0Q7Ozs7Ozs7O0VBRW5COzs7Ozs7OzsrQkFRaUJwSixNQUFNN0IsTUFBTTtFQUMzQixXQUFLa0wsUUFBTCxDQUFjckosSUFBZCxJQUFzQjdCLElBQXRCO0VBQ0Q7O0VBRUQ7Ozs7Ozs7Ozs7Ozs7OEJBVWdCNkIsTUFBTXNKLFdBQVdDLFlBQVk7RUFDM0MsYUFBTyxLQUFLRixRQUFMLENBQWNySixJQUFkLEVBQW9Cc0osU0FBcEIsRUFBK0JDLFVBQS9CLENBQVA7RUFDRDs7Ozs7d0JBMUJrQkg7OztXQUNEOzs7RUNIcEI7Ozs7Ozs7Ozs7TUFTcUJJO0VBQ25CLGlCQUFhcEosQ0FBYixFQUFnQjtFQUFBOztFQUNkO0VBQ0EsU0FBS0EsQ0FBTCxHQUFTQSxDQUFUO0VBQ0EsU0FBS3FKLE1BQUwsR0FBY3JKLENBQWQ7O0VBRUEsU0FBS3NKLE9BQUwsR0FBZTtFQUNiQyxvQkFBYyxRQUREO0VBRWJDLGVBQVM7O0VBR1g7RUFMZSxLQUFmLENBTUEsS0FBS0MsT0FBTCxHQUFlakwsS0FBS2tMLE1BQUwsR0FBYzlMLEdBQWQsRUFBZjs7RUFFQTtFQUNBLFNBQUsrTCxNQUFMLEdBQWN2TCxTQUFTd0wsYUFBVCxDQUF1QixRQUF2QixDQUFkOztFQUVBLFNBQUtELE1BQUwsQ0FBWWxILEtBQVosR0FBb0IsS0FBS3pDLENBQUwsQ0FBTytDLFVBQVAsQ0FBa0JOLEtBQXRDO0VBQ0EsU0FBS2tILE1BQUwsQ0FBWTNHLE1BQVosR0FBcUIsS0FBS2hELENBQUwsQ0FBTytDLFVBQVAsQ0FBa0JDLE1BQXZDOztFQUVBLFNBQUtYLE9BQUwsR0FBZSxLQUFLc0gsTUFBTCxDQUFZRSxVQUFaLENBQXVCLElBQXZCLENBQWY7RUFDQSxTQUFLeEgsT0FBTCxDQUFheUgsZUFBYixDQUE2QixLQUFLSCxNQUFMLENBQVlsSCxLQUF6QyxFQUFnRCxLQUFLa0gsTUFBTCxDQUFZM0csTUFBNUQ7RUFDQSxTQUFLNkYsU0FBTCxHQUFpQixLQUFLeEcsT0FBTCxDQUFheUcsWUFBYixDQUEwQixDQUExQixFQUE2QixDQUE3QixFQUFnQyxLQUFLYSxNQUFMLENBQVlsSCxLQUE1QyxFQUFtRCxLQUFLa0gsTUFBTCxDQUFZM0csTUFBL0QsQ0FBakI7RUFDQSxTQUFLMUMsU0FBTCxHQUFpQixLQUFLdUksU0FBTCxDQUFlbkksSUFBaEM7RUFDRDs7RUFFRDs7Ozs7K0JBQ1VxSixJQUFJO0VBQ1osV0FBSy9KLENBQUwsQ0FBT2dLLFFBQVAsQ0FBZ0JELEVBQWhCO0VBQ0Q7O0VBRUQ7Ozs7c0NBQ2lCRSxNQUFNO0VBQ3JCLFdBQUtYLE9BQUwsQ0FBYUMsWUFBYixHQUE0QlUsSUFBNUI7RUFDQSxhQUFPLElBQVA7RUFDRDs7RUFFRDs7Ozs4QkFDU1QsVUFBUztFQUNoQixXQUFLRixPQUFMLENBQWFFLE9BQWIsR0FBdUJBLFdBQVUsR0FBakM7RUFDQSxhQUFPLElBQVA7RUFDRDs7RUFFRDs7OzttQ0FDYztFQUNaLFVBQU1VLGFBQWEsS0FBSzVKLFNBQXhCO0VBQ0EsV0FBSyxJQUFJaEQsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUswQyxDQUFMLENBQU9NLFNBQVAsQ0FBaUJoQixNQUFyQyxFQUE2Q2hDLEtBQUssQ0FBbEQsRUFBcUQ7RUFDbkQsYUFBS2dELFNBQUwsQ0FBZWhELENBQWYsSUFBb0I0TSxXQUFXNU0sQ0FBWCxDQUFwQjtFQUNBLGFBQUtnRCxTQUFMLENBQWVoRCxJQUFJLENBQW5CLElBQXdCNE0sV0FBVzVNLElBQUksQ0FBZixDQUF4QjtFQUNBLGFBQUtnRCxTQUFMLENBQWVoRCxJQUFJLENBQW5CLElBQXdCNE0sV0FBVzVNLElBQUksQ0FBZixDQUF4QjtFQUNBLGFBQUtnRCxTQUFMLENBQWVoRCxJQUFJLENBQW5CLElBQXdCNE0sV0FBVzVNLElBQUksQ0FBZixDQUF4QjtFQUNEO0VBQ0QsYUFBTyxJQUFQO0VBQ0Q7O0VBRUQ7Ozs7a0NBQ2E7RUFDWCxXQUFLMEMsQ0FBTCxDQUFPbUssU0FBUCxDQUFpQm5OLEtBQWpCLENBQXVCLEtBQUtnRCxDQUE1QixFQUErQm9LLFNBQS9CO0VBQ0Q7O0VBRUQ7Ozs7bUNBQ2NDLE9BQU87RUFDbkIsVUFBSSxRQUFPQSxLQUFQLHlDQUFPQSxLQUFQLE9BQWlCLFFBQXJCLEVBQStCO0VBQzdCQSxnQkFBUUEsTUFBTTFMLEdBQWQ7RUFDRCxPQUZELE1BRU8sSUFBSSxPQUFPMEwsS0FBUCxLQUFpQixRQUFqQixJQUE2QkEsTUFBTSxDQUFOLE1BQWEsR0FBOUMsRUFBbUQ7RUFDeERBLGdCQUFRcE0sRUFBRW9NLEtBQUYsRUFBUzFMLEdBQWpCO0VBQ0Q7O0VBRUQsVUFBSSxDQUFDMEwsS0FBTCxFQUFZO0VBQ1YsZUFBTyxJQUFQO0VBQ0Q7O0VBRUQsV0FBS3JLLENBQUwsQ0FBT3NLLFFBQVAsQ0FBZ0JwRixXQUFoQixDQUE0QmpFLElBQTVCLENBQWlDO0VBQy9CUixjQUFNUyxPQUFPdUUsSUFBUCxDQUFZaEUsV0FEYTtFQUUvQjlDLGFBQUswTCxLQUYwQjtFQUcvQjNFLGVBQU87RUFId0IsT0FBakM7O0VBTUEsYUFBTyxJQUFQO0VBQ0Q7O0VBRUQ7Ozs7c0NBQ2lCO0VBQ2YsVUFBTXdFLGFBQWEsS0FBS2xLLENBQUwsQ0FBT3VLLFVBQVAsQ0FBa0IsS0FBS3ZLLENBQUwsQ0FBT3VLLFVBQVAsQ0FBa0JqTCxNQUFsQixHQUEyQixDQUE3QyxDQUFuQjtFQUNBLFVBQU1rTCxZQUFZLEtBQUt4SyxDQUFMLENBQU9NLFNBQXpCOztFQUVBLFdBQUssSUFBSWhELElBQUksQ0FBYixFQUFnQkEsSUFBSWtOLFVBQVVsTCxNQUE5QixFQUFzQ2hDLEtBQUssQ0FBM0MsRUFBOEM7RUFDNUMsWUFBTTZMLGFBQWE7RUFDakJqSixhQUFHZ0ssV0FBVzVNLENBQVgsQ0FEYztFQUVqQjZDLGFBQUcrSixXQUFXNU0sSUFBSSxDQUFmLENBRmM7RUFHakI4QyxhQUFHOEosV0FBVzVNLElBQUksQ0FBZixDQUhjO0VBSWpCdUYsYUFBR3FILFdBQVc1TSxJQUFJLENBQWY7RUFKYyxTQUFuQjtFQU1BLFlBQU00TCxZQUFZO0VBQ2hCaEosYUFBR3NLLFVBQVVsTixDQUFWLENBRGE7RUFFaEI2QyxhQUFHcUssVUFBVWxOLElBQUksQ0FBZCxDQUZhO0VBR2hCOEMsYUFBR29LLFVBQVVsTixJQUFJLENBQWQsQ0FIYTtFQUloQnVGLGFBQUcySCxVQUFVbE4sSUFBSSxDQUFkO0VBSmEsU0FBbEI7O0VBT0EsWUFBTW1OLFNBQVN6QixRQUFRakMsT0FBUixDQUFnQixLQUFLdUMsT0FBTCxDQUFhQyxZQUE3QixFQUEyQ0wsU0FBM0MsRUFBc0RDLFVBQXRELENBQWY7RUFDQXNCLGVBQU92SyxDQUFQLEdBQVcxQixLQUFLZ0osUUFBTCxDQUFjaUQsT0FBT3ZLLENBQXJCLENBQVg7RUFDQXVLLGVBQU90SyxDQUFQLEdBQVczQixLQUFLZ0osUUFBTCxDQUFjaUQsT0FBT3RLLENBQXJCLENBQVg7RUFDQXNLLGVBQU9ySyxDQUFQLEdBQVc1QixLQUFLZ0osUUFBTCxDQUFjaUQsT0FBT3JLLENBQXJCLENBQVg7RUFDQSxZQUFJLENBQUNxSyxPQUFPNUgsQ0FBWixFQUFlO0VBQ2I0SCxpQkFBTzVILENBQVAsR0FBV3FHLFVBQVVyRyxDQUFyQjtFQUNEOztFQUVEcUgsbUJBQVc1TSxDQUFYLElBQWdCNkwsV0FBV2pKLENBQVgsR0FBZ0IsQ0FBQ2lKLFdBQVdqSixDQUFYLEdBQWV1SyxPQUFPdkssQ0FBdkIsS0FBNkIsS0FBS29KLE9BQUwsQ0FBYUUsT0FBYixJQUF3QmlCLE9BQU81SCxDQUFQLEdBQVcsR0FBbkMsQ0FBN0IsQ0FBaEM7RUFDQXFILG1CQUFXNU0sSUFBSSxDQUFmLElBQW9CNkwsV0FBV2hKLENBQVgsR0FBZ0IsQ0FBQ2dKLFdBQVdoSixDQUFYLEdBQWVzSyxPQUFPdEssQ0FBdkIsS0FBNkIsS0FBS21KLE9BQUwsQ0FBYUUsT0FBYixJQUF3QmlCLE9BQU81SCxDQUFQLEdBQVcsR0FBbkMsQ0FBN0IsQ0FBcEM7RUFDQXFILG1CQUFXNU0sSUFBSSxDQUFmLElBQW9CNkwsV0FBVy9JLENBQVgsR0FBZ0IsQ0FBQytJLFdBQVcvSSxDQUFYLEdBQWVxSyxPQUFPckssQ0FBdkIsS0FBNkIsS0FBS2tKLE9BQUwsQ0FBYUUsT0FBYixJQUF3QmlCLE9BQU81SCxDQUFQLEdBQVcsR0FBbkMsQ0FBN0IsQ0FBcEM7RUFDRDtFQUNGOzs7OztFQ2xISDs7Ozs7Ozs7Ozs7TUFVcUJ6Qjs7Ozs7O0VBaUNuQjtFQUNBOzs7RUFQQTs7O0VBTkE7OztFQU5BOzs7RUFSQTtpQ0E0Qm1CO0VBQ2pCLDBCQUFrQkEsTUFBTXNKLE9BQU4sQ0FBY0MsT0FBaEMsbUJBQXFEdkosTUFBTXNKLE9BQU4sQ0FBY0UsSUFBbkU7RUFDRDs7RUFFRDtFQUNBO0VBQ0E7OztFQVhBOzs7RUFOQTs7O0VBTkE7OztFQVJBO0VBQ0E7RUFDQTs7RUFYQTs7OztnQ0F5Q2tCakIsUUFBUTtFQUN4QixVQUFJdkksTUFBTXlKLE1BQVYsRUFBa0I7RUFDaEIsZUFBTyxJQUFQO0VBQ0Q7RUFDRCxVQUFJLE9BQU9sQixNQUFQLEtBQWtCLFFBQXRCLEVBQWdDO0VBQzlCQSxpQkFBUzFMLEVBQUUwTCxNQUFGLENBQVQ7RUFDRDtFQUNELFVBQUlBLFVBQVVBLE9BQU9tQixZQUFyQixFQUFtQztFQUNqQyxlQUFPbkIsT0FBT21CLFlBQVAsQ0FBb0IsZUFBcEIsQ0FBUDtFQUNEO0VBQ0QsYUFBTyxJQUFQO0VBQ0Q7O0VBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQThCQSxtQkFBc0I7RUFBQSxzQ0FBTjNOLElBQU07RUFBTkEsVUFBTTtFQUFBOztFQUFBOztFQUNwQixRQUFJQSxLQUFLbUMsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtFQUNyQixZQUFNLElBQUl3RCxLQUFKLENBQVUsbUJBQVYsQ0FBTjtFQUNEOztFQUhtQjs7RUFLcEIsUUFBSSxpQkFBZ0IxQixLQUFwQixFQUEyQjtFQUFBOztFQUN6QjtFQUNBO0VBQ0E7RUFDQTtFQUNBLFlBQUsySixVQUFMLEdBQWtCLE1BQUtBLFVBQUwsQ0FBZ0JDLElBQWhCLE9BQWxCO0VBQ0EsWUFBS0MsV0FBTCxHQUFtQixNQUFLQSxXQUFMLENBQWlCRCxJQUFqQixPQUFuQjs7RUFFQSxVQUFJLENBQUM1SixNQUFNeUosTUFBWCxFQUFtQjtFQUNqQixZQUFNcE0sS0FBS3lNLFNBQVM5SixNQUFNK0osU0FBTixDQUFnQmhPLEtBQUssQ0FBTCxDQUFoQixDQUFULEVBQW1DLEVBQW5DLENBQVg7RUFDQSxZQUFJMEMsaUJBQUo7RUFDQSxZQUFJLE9BQU8xQyxLQUFLLENBQUwsQ0FBUCxLQUFtQixVQUF2QixFQUFtQztFQUNqQzBDLHFCQUFXMUMsS0FBSyxDQUFMLENBQVg7RUFDRCxTQUZELE1BRU8sSUFBSSxPQUFPQSxLQUFLLENBQUwsQ0FBUCxLQUFtQixVQUF2QixFQUFtQztFQUN4QzBDLHFCQUFXMUMsS0FBSyxDQUFMLENBQVg7RUFDRCxTQUZNLE1BRUE7RUFDTDBDLHFCQUFXdEIsSUFBWDtFQUNEOztFQUVELFlBQUksQ0FBQzZNLE1BQU0zTSxFQUFOLENBQUQsSUFBY2dCLE1BQU00TCxHQUFOLENBQVU1TSxFQUFWLENBQWxCLEVBQWlDO0VBQUE7O0VBQy9CLHdCQUFPZ0IsTUFBTXNILE9BQU4sQ0FBY3RJLEVBQWQsRUFBa0JvQixRQUFsQixDQUFQO0VBQ0Q7RUFDRjs7RUFFRDtFQUNBLFlBQUtwQixFQUFMLEdBQVVELEtBQUtrTCxNQUFMLEdBQWM5TCxHQUFkLEVBQVY7RUFDQSxZQUFLME4sb0JBQUwsR0FBNEIsTUFBS0MsaUJBQUwsR0FBeUIsSUFBckQ7RUFDQSxZQUFLQyxlQUFMLEdBQXVCLEVBQUVqSixHQUFHLENBQUwsRUFBUUMsR0FBRyxDQUFYLEVBQXZCO0VBQ0EsWUFBS2lKLE9BQUwsR0FBZSxLQUFmO0VBQ0EsWUFBS0MsT0FBTCxHQUFlLEtBQWY7O0VBRUEsWUFBS25CLFVBQUwsR0FBa0IsRUFBbEIsQ0EvQnlCO0VBZ0N6QixZQUFLb0IsVUFBTCxHQUFrQixFQUFsQixDQWhDeUI7RUFpQ3pCLFlBQUtoRyxXQUFMLEdBQW1CLEVBQW5CLENBakN5QjtFQWtDekIsWUFBS2lHLFlBQUwsR0FBb0IsSUFBcEI7RUFDQSxZQUFLQyxNQUFMLEdBQWMsS0FBZDs7RUFFQSxZQUFLQyxPQUFMLEdBQWUsSUFBSS9MLE9BQUosT0FBZjtFQUNBLFlBQUt1SyxRQUFMLEdBQWdCLElBQUlyRixRQUFKLE9BQWhCOztFQUVBLFlBQUs4RyxXQUFMLENBQWlCLFlBQU07RUFDckIsY0FBS0MsY0FBTCxDQUFvQjdPLElBQXBCO0VBQ0EsY0FBSzhPLEtBQUw7RUFDRCxPQUhEO0VBSUE7RUFDRCxLQTdDRCxNQTZDTztFQUFBOztFQUNMLHdEQUFXN0ssS0FBWCxnQkFBb0JqRSxJQUFwQjtFQUNEO0VBcERtQjtFQXFEckI7O0VBRUQ7Ozs7Ozs7Ozs7a0NBTWE0TSxJQUFJO0VBQUE7O0VBQ2YsVUFBSTNJLE1BQU15SixNQUFWLEVBQWtCO0VBQ2hCL0ssbUJBQVcsWUFBTTtFQUNmaUssYUFBRy9MLElBQUgsQ0FBUSxNQUFSO0VBQ0QsU0FGRCxFQUVHLENBRkg7RUFHRCxPQUpELE1BSU87RUFDTCxZQUFJSSxTQUFTOE4sVUFBVCxLQUF3QixVQUE1QixFQUF3QztFQUN0Q2hLLGNBQUlGLEtBQUosQ0FBVSxpQkFBVjtFQUNBbEMscUJBQVcsWUFBTTtFQUNmaUssZUFBRy9MLElBQUgsQ0FBUSxNQUFSO0VBQ0QsV0FGRCxFQUVHLENBRkg7RUFHRCxTQUxELE1BS087RUFDTCxjQUFNbU8sV0FBVyxTQUFYQSxRQUFXLEdBQU07RUFDckIsZ0JBQUkvTixTQUFTOE4sVUFBVCxLQUF3QixVQUE1QixFQUF3QztFQUN0Q2hLLGtCQUFJRixLQUFKLENBQVUsaUJBQVY7RUFDQStILGlCQUFHL0wsSUFBSCxDQUFRLE1BQVI7RUFDRDtFQUNGLFdBTEQ7RUFNQUksbUJBQVNnTyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOENELFFBQTlDLEVBQXdELEtBQXhEO0VBQ0Q7RUFDRjtFQUNGOztFQUVEOzs7Ozs7Ozs7cUNBTWdCaFAsTUFBTTtFQUNwQixVQUFJQSxLQUFLbUMsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtFQUNyQixjQUFNLElBQUl3RCxLQUFKLENBQVUseUJBQVYsQ0FBTjtFQUNEOztFQUVEO0VBQ0EsV0FBS3VKLE9BQUwsR0FBZSxJQUFmO0VBQ0EsV0FBS0MsUUFBTCxHQUFnQixJQUFoQjtFQUNBLFdBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7RUFDQSxXQUFLMU0sUUFBTCxHQUFnQnRCLElBQWhCOztFQUVBO0VBQ0EsV0FBS2lPLGFBQUwsQ0FBbUJyUCxLQUFLLENBQUwsQ0FBbkI7RUFDQSxVQUFJQSxLQUFLbUMsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtFQUNyQjtFQUNEOztFQUVELHNCQUFlbkMsS0FBSyxDQUFMLENBQWY7RUFDRSxhQUFLLFFBQUw7RUFDRSxlQUFLb1AsUUFBTCxHQUFnQnBQLEtBQUssQ0FBTCxDQUFoQjtFQUNBO0VBQ0YsYUFBSyxVQUFMO0VBQ0UsZUFBSzBDLFFBQUwsR0FBZ0IxQyxLQUFLLENBQUwsQ0FBaEI7RUFDQTtFQU5KOztFQVNBLFVBQUlBLEtBQUttQyxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0VBQ3JCO0VBQ0Q7O0VBRUQsV0FBS08sUUFBTCxHQUFnQjFDLEtBQUssQ0FBTCxDQUFoQjs7RUFFQSxVQUFJQSxLQUFLbUMsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtFQUNyQixhQUFLLElBQUl6QyxHQUFULElBQWdCTSxLQUFLLENBQUwsQ0FBaEIsRUFBeUI7RUFDdkIsY0FBSUEsS0FBSyxDQUFMLEVBQVEyQixjQUFSLENBQXVCakMsR0FBdkIsQ0FBSixFQUFpQztFQUMvQixpQkFBS3lNLE9BQUwsQ0FBYXpNLEdBQWIsSUFBb0JNLEtBQUssQ0FBTCxFQUFRTixHQUFSLENBQXBCO0VBQ0Q7RUFDRjtFQUNGO0VBQ0Y7O0VBRUQ7Ozs7Ozs7OztvQ0FNZUQsS0FBSztFQUNsQixVQUFJd0UsTUFBTXlKLE1BQVYsRUFBa0I7RUFDaEIsYUFBS3dCLE9BQUwsR0FBZXpQLEdBQWY7RUFDQSxhQUFLMFAsUUFBTCxHQUFnQixNQUFoQjtFQUNBO0VBQ0Q7RUFDRCxVQUFJLFFBQU8xUCxHQUFQLHlDQUFPQSxHQUFQLE9BQWUsUUFBbkIsRUFBNkI7RUFDM0IsYUFBS3lQLE9BQUwsR0FBZXpQLEdBQWY7RUFDRCxPQUZELE1BRU87RUFDTCxhQUFLeVAsT0FBTCxHQUFlcE8sRUFBRXJCLEdBQUYsQ0FBZjtFQUNEOztFQUVELFVBQUksQ0FBQyxLQUFLeVAsT0FBVixFQUFtQjtFQUNqQixjQUFNLElBQUl2SixLQUFKLENBQVUsb0RBQVYsQ0FBTjtFQUNEOztFQUVELFdBQUt3SixRQUFMLEdBQWdCLEtBQUtELE9BQUwsQ0FBYWxOLFFBQWIsQ0FBc0I2RSxXQUF0QixFQUFoQjtFQUNEOztFQUVEOzs7Ozs7Ozs4QkFLUztFQUNQbEMsY0FBUUcsR0FBUixDQUFZLEtBQUtxSyxRQUFqQjtFQUNBLGNBQVEsS0FBS0EsUUFBYjtFQUNFLGFBQUssTUFBTDtFQUNFLGVBQUtHLFFBQUw7RUFDQTtFQUNGLGFBQUssS0FBTDtFQUNFLGVBQUtDLFNBQUw7RUFDQTtFQUNGLGFBQUssUUFBTDtFQUNFLGVBQUtDLFVBQUw7RUFDQTtFQVRKO0VBV0Q7O0VBRUQ7Ozs7aUNBQ1k7O0VBRVo7Ozs7a0NBQ2E7RUFDWCxXQUFLdEMsS0FBTCxHQUFhLEtBQUtnQyxPQUFsQjtFQUNBLFdBQUsxQyxNQUFMLEdBQWN2TCxTQUFTd0wsYUFBVCxDQUF1QixRQUF2QixDQUFkO0VBQ0EsV0FBS3ZILE9BQUwsR0FBZSxLQUFLc0gsTUFBTCxDQUFZRSxVQUFaLENBQXVCLElBQXZCLENBQWY7RUFDQXJMLFdBQUtvTyxjQUFMLENBQW9CLEtBQUt2QyxLQUF6QixFQUFnQyxLQUFLVixNQUFyQyxFQUE2QyxFQUFDekssUUFBUSxDQUFDLEtBQUQsQ0FBVCxFQUE3Qzs7RUFFQTtFQUNBLFdBQUttTCxLQUFMLENBQVd3QyxVQUFYLElBQXlCLEtBQUt4QyxLQUFMLENBQVd3QyxVQUFYLENBQXNCQyxZQUF0QixDQUFtQyxLQUFLbkQsTUFBeEMsRUFBZ0QsS0FBS1UsS0FBckQsQ0FBekI7O0VBRUEsV0FBSzBDLGdCQUFMO0VBQ0EsV0FBS0Msa0JBQUw7RUFDRDs7RUFFRDtFQUNBOzs7O21DQUNjO0VBQ1osV0FBS3JELE1BQUwsR0FBYyxLQUFLMEMsT0FBbkI7RUFDQXZLLGNBQVFHLEdBQVIsQ0FBWSxLQUFLMEgsTUFBakI7RUFDQSxXQUFLdEgsT0FBTCxHQUFlLEtBQUtzSCxNQUFMLENBQVlFLFVBQVosQ0FBdUIsSUFBdkIsQ0FBZjs7RUFFQSxVQUFJLEtBQUswQyxRQUFULEVBQW1CO0VBQ2pCLGFBQUtsQyxLQUFMLEdBQWFqTSxTQUFTd0wsYUFBVCxDQUF1QixLQUF2QixDQUFiO0VBQ0EsYUFBS1MsS0FBTCxDQUFXMUwsR0FBWCxHQUFpQixLQUFLNE4sUUFBdEI7O0VBRUEsYUFBS1EsZ0JBQUw7RUFDQSxhQUFLQyxrQkFBTDtFQUNELE9BTkQsTUFNTztFQUNMLGFBQUtqQyxVQUFMO0VBQ0Q7RUFDRjs7RUFFRDs7Ozs7Ozs7O3lDQU1vQjtFQUNsQixVQUFJcEgsR0FBR3NKLFFBQUgsQ0FBWSxLQUFLNUMsS0FBakIsQ0FBSixFQUE2QjtFQUMzQixhQUFLQSxLQUFMLENBQVcxTCxHQUFYLEdBQWlCZ0YsR0FBR2EsUUFBSCxDQUFZLEtBQUs2RixLQUFMLENBQVcxTCxHQUF2QixDQUFqQjtFQUNBdUQsWUFBSUYsS0FBSix5Q0FBZ0QsS0FBS3FJLEtBQUwsQ0FBVzFMLEdBQTNEO0VBQ0Q7RUFDRjs7RUFFRDs7OzsyQ0FDc0I7RUFDcEIsVUFBSSxLQUFLdU8sYUFBTCxFQUFKLEVBQTBCO0VBQ3hCLGFBQUtqQyxXQUFMO0VBQ0QsT0FGRCxNQUVPO0VBQ0wsYUFBS1osS0FBTCxDQUFXMUIsTUFBWCxHQUFvQixLQUFLc0MsV0FBekI7RUFDRDtFQUNGOztFQUVEOzs7Ozs7OztzQ0FLaUI7RUFDZixVQUFJLENBQUMsS0FBS1osS0FBTCxDQUFXOEMsUUFBaEIsRUFBMEI7RUFDeEIsZUFBTyxLQUFQO0VBQ0Q7RUFDRCxVQUFJLEtBQUs5QyxLQUFMLENBQVcrQyxZQUFYLElBQTJCLEtBQUsvQyxLQUFMLENBQVcrQyxZQUFYLEtBQTRCLENBQTNELEVBQThEO0VBQzVELGVBQU8sS0FBUDtFQUNEO0VBQ0QsYUFBTyxJQUFQO0VBQ0Q7O0VBRUQ7Ozs7Ozs7O21DQUtjO0VBQ1osYUFBTyxLQUFLL0MsS0FBTCxDQUFXNUgsS0FBWCxJQUFvQixLQUFLNEgsS0FBTCxDQUFXK0MsWUFBdEM7RUFDRDs7RUFFRDs7Ozs7Ozs7O29DQU1lO0VBQ2IsYUFBTyxLQUFLL0MsS0FBTCxDQUFXckgsTUFBWCxJQUFxQixLQUFLcUgsS0FBTCxDQUFXZ0QsYUFBdkM7RUFDRDs7RUFFRDs7Ozs7Ozs7O29DQU1lO0VBQ2JuTCxVQUFJRixLQUFKLDRCQUFtQyxLQUFLc0wsVUFBTCxFQUFuQyxtQkFBa0UsS0FBS0MsV0FBTCxFQUFsRTs7RUFFQSxXQUFLNUQsTUFBTCxDQUFZbEgsS0FBWixHQUFvQixLQUFLNkssVUFBTCxFQUFwQjtFQUNBLFdBQUszRCxNQUFMLENBQVkzRyxNQUFaLEdBQXFCLEtBQUt1SyxXQUFMLEVBQXJCOztFQUVBLFdBQUt4QyxVQUFMO0VBQ0Q7O0VBRUQ7Ozs7Ozs7O21DQUtjO0VBQ1osVUFBSSxDQUFDLEtBQUsxSSxPQUFWLEVBQW1CO0VBQ2pCLGFBQUtBLE9BQUwsR0FBZSxLQUFLc0gsTUFBTCxDQUFZRSxVQUFaLENBQXVCLElBQXZCLENBQWY7RUFDRDs7RUFFRCxXQUFLMkQsYUFBTCxHQUFxQixLQUFLQyxjQUFMLEdBQXNCLEtBQUtoTCxLQUFMLEdBQWEsS0FBS2tILE1BQUwsQ0FBWWxILEtBQXBFO0VBQ0EsV0FBS2lMLGNBQUwsR0FBc0IsS0FBS0MsZUFBTCxHQUF1QixLQUFLM0ssTUFBTCxHQUFjLEtBQUsyRyxNQUFMLENBQVkzRyxNQUF2RTs7RUFFQSxVQUFJLENBQUMsS0FBSzRLLEtBQUwsRUFBTCxFQUFtQjtFQUNqQixhQUFLQyxRQUFMO0VBQ0Q7O0VBRUQsVUFBSSxLQUFLeEQsS0FBVCxFQUFnQjtFQUNkLGFBQUtoSSxPQUFMLENBQWF1RyxTQUFiLENBQXVCLEtBQUt5QixLQUE1QixFQUFtQyxDQUFuQyxFQUFzQyxDQUF0QyxFQUF5QyxLQUFLaUQsVUFBTCxFQUF6QyxFQUE0RCxLQUFLQyxXQUFMLEVBQTVELEVBQWdGLENBQWhGLEVBQW1GLENBQW5GLEVBQXNGLEtBQUtFLGNBQTNGLEVBQTJHLEtBQUtFLGVBQWhIO0VBQ0Q7O0VBRUQsV0FBSzlFLFNBQUwsR0FBaUIsS0FBS3hHLE9BQUwsQ0FBYXlHLFlBQWIsQ0FBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsS0FBS2EsTUFBTCxDQUFZbEgsS0FBNUMsRUFBbUQsS0FBS2tILE1BQUwsQ0FBWTNHLE1BQS9ELENBQWpCO0VBQ0EsV0FBSzFDLFNBQUwsR0FBaUIsS0FBS3VJLFNBQUwsQ0FBZW5JLElBQWhDOztFQUVBLFVBQUlVLE1BQU0wTSxXQUFWLEVBQXVCO0VBQ3JCLGFBQUt4QyxvQkFBTCxHQUE0QjlNLEtBQUsySCxTQUFMLENBQWUsS0FBSzdGLFNBQUwsQ0FBZWhCLE1BQTlCLENBQTVCO0VBQ0EsYUFBS2lNLGlCQUFMLEdBQXlCL00sS0FBSzJILFNBQUwsQ0FBZSxLQUFLN0YsU0FBTCxDQUFlaEIsTUFBOUIsQ0FBekI7O0VBRUEsYUFBSyxJQUFJaEMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtnRCxTQUFMLENBQWVoQixNQUFuQyxFQUEyQ2hDLEdBQTNDLEVBQWdEO0VBQzlDLGNBQUkrSixRQUFRLEtBQUsvRyxTQUFMLENBQWVoRCxDQUFmLENBQVo7RUFDQSxlQUFLZ08sb0JBQUwsQ0FBMEJoTyxDQUExQixJQUErQitKLEtBQS9CO0VBQ0EsZUFBS2tFLGlCQUFMLENBQXVCak8sQ0FBdkIsSUFBNEIrSixLQUE1QjtFQUNEO0VBQ0Y7O0VBRUQsV0FBS3RFLFVBQUwsR0FBa0I7RUFDaEJOLGVBQU8sS0FBS2tILE1BQUwsQ0FBWWxILEtBREg7RUFFaEJPLGdCQUFRLEtBQUsyRyxNQUFMLENBQVkzRztFQUZKLE9BQWxCOztFQUtBLFVBQUksQ0FBQzVCLE1BQU15SixNQUFYLEVBQW1CO0VBQ2pCcEwsY0FBTXNPLEdBQU4sQ0FBVSxLQUFLdFAsRUFBZixFQUFtQixJQUFuQjtFQUNEOztFQUVELFdBQUtvQixRQUFMLENBQWMsSUFBZDs7RUFFQTtFQUNBLFdBQUtBLFFBQUwsR0FBZ0J0QixJQUFoQjtFQUNEOztFQUVEOzs7Ozs7Ozt5Q0FLb0I7RUFDbEIsV0FBS3NLLFNBQUwsR0FBaUIsS0FBS3hHLE9BQUwsQ0FBYXlHLFlBQWIsQ0FBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsS0FBS2EsTUFBTCxDQUFZbEgsS0FBNUMsRUFBbUQsS0FBS2tILE1BQUwsQ0FBWTNHLE1BQS9ELENBQWpCO0VBQ0EsV0FBSzFDLFNBQUwsR0FBaUIsS0FBS3VJLFNBQUwsQ0FBZW5JLElBQWhDO0VBQ0Q7O0VBRUQ7Ozs7Ozs7OytDQUswQjtFQUN4QixVQUFJLENBQUNVLE1BQU0wTSxXQUFYLEVBQXdCO0VBQ3RCLGNBQU0sSUFBSWhMLEtBQUosQ0FBVSxpQkFBVixDQUFOO0VBQ0Q7O0VBRUQsV0FBS3lJLGlCQUFMLEdBQXlCL00sS0FBSzJILFNBQUwsQ0FBZSxLQUFLN0YsU0FBTCxDQUFlaEIsTUFBOUIsQ0FBekI7RUFDQSxXQUFLLElBQUloQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS2dELFNBQUwsQ0FBZWhCLE1BQW5DLEVBQTJDaEMsR0FBM0MsRUFBZ0Q7RUFDOUMsWUFBSStKLFFBQVEsS0FBSy9HLFNBQUwsQ0FBZWhELENBQWYsQ0FBWjtFQUNBLGFBQUtpTyxpQkFBTCxDQUF1QmpPLENBQXZCLElBQTRCK0osS0FBNUI7RUFDRDtFQUNGOztFQUVEOzs7Ozs7Ozs4QkFLUztFQUNQLGFBQU8sQ0FBQyxDQUFDakcsTUFBTStKLFNBQU4sQ0FBZ0IsS0FBS3hCLE1BQXJCLENBQVQ7RUFDRDtFQUNEOzs7Ozs7OztpQ0FLWTtFQUNWLFVBQUl2SSxNQUFNeUosTUFBTixJQUFnQixLQUFLbEIsTUFBTCxDQUFZbUIsWUFBWixDQUF5QixlQUF6QixDQUFwQixFQUErRDtFQUM3RDtFQUNEO0VBQ0QsV0FBS25CLE1BQUwsQ0FBWXZLLFlBQVosQ0FBeUIsZUFBekIsRUFBMEMsS0FBS1gsRUFBL0M7RUFDRDs7RUFFRDs7Ozs7Ozs7O29DQU1ldVAsV0FBVztFQUN4QixVQUFNQyxZQUFZLEtBQUt0RSxNQUF2QjtFQUNBLFdBQUtBLE1BQUwsR0FBY3FFLFNBQWQ7RUFDQSxXQUFLM0wsT0FBTCxHQUFlLEtBQUtzSCxNQUFMLENBQVlFLFVBQVosQ0FBdUIsSUFBdkIsQ0FBZjs7RUFFQSxVQUFJLENBQUN6SSxNQUFNeUosTUFBWCxFQUFtQjtFQUNqQm9ELGtCQUFVcEIsVUFBVixDQUFxQkMsWUFBckIsQ0FBa0MsS0FBS25ELE1BQXZDLEVBQStDc0UsU0FBL0M7RUFDRDs7RUFFRCxXQUFLeEwsS0FBTCxHQUFhLEtBQUtrSCxNQUFMLENBQVlsSCxLQUF6QjtFQUNBLFdBQUtPLE1BQUwsR0FBYyxLQUFLMkcsTUFBTCxDQUFZM0csTUFBMUI7O0VBRUEsV0FBS2tMLGdCQUFMOztFQUVBLFdBQUtuTCxVQUFMLEdBQWtCO0VBQ2hCTixlQUFPLEtBQUtrSCxNQUFMLENBQVlsSCxLQURIO0VBRWhCTyxnQkFBUSxLQUFLMkcsTUFBTCxDQUFZM0c7RUFGSixPQUFsQjtFQUlEOztFQUVEOzs7Ozs7Ozs7K0JBTXlCO0VBQUE7O0VBQUEsVUFBakJuRCxRQUFpQix1RUFBTnRCLElBQU07O0VBQ3ZCaUMsWUFBTTZFLE9BQU4sQ0FBYyxJQUFkLEVBQW9CLGFBQXBCOztFQUVBLFdBQUtpRixRQUFMLENBQWN2RCxPQUFkLENBQXNCLFlBQU07RUFDMUIsZUFBSzFFLE9BQUwsQ0FBYThMLFlBQWIsQ0FBMEIsT0FBS3RGLFNBQS9CLEVBQTBDLENBQTFDLEVBQTZDLENBQTdDO0VBQ0FoSixpQkFBUzdCLElBQVQsQ0FBYyxNQUFkO0VBQ0QsT0FIRDtFQUlEOztFQUVEOzs7Ozs7Ozs7OytCQU84QjtFQUFBLFVBQXRCb1EsYUFBc0IsdUVBQU4sSUFBTTs7RUFDNUIsVUFBSSxDQUFDaE4sTUFBTTBNLFdBQVgsRUFBd0I7RUFDdEIsY0FBTSxJQUFJaEwsS0FBSixDQUFVLGlCQUFWLENBQU47RUFDRDs7RUFFRCxVQUFNdUwsd0JBQXdCLEtBQUtBLHFCQUFMLEVBQTlCO0VBQ0EsV0FBSyxJQUFJL1EsSUFBSSxDQUFSLEVBQVcrQyxJQUFJZ08sc0JBQXNCL08sTUFBMUMsRUFBa0RoQyxJQUFJK0MsQ0FBdEQsRUFBeUQvQyxHQUF6RCxFQUE4RDtFQUM1RCxZQUFJK0osUUFBUWdILHNCQUFzQi9RLENBQXRCLENBQVo7RUFDQSxhQUFLZ0QsU0FBTCxDQUFlaEQsQ0FBZixJQUFvQitKLEtBQXBCO0VBQ0Q7O0VBRUQsVUFBSStHLGFBQUosRUFBbUI7RUFDakIsYUFBSy9MLE9BQUwsQ0FBYThMLFlBQWIsQ0FBMEIsS0FBS3RGLFNBQS9CLEVBQTBDLENBQTFDLEVBQTZDLENBQTdDO0VBQ0Q7RUFDRjs7RUFFRDs7Ozs7Ozs7OzhCQU1TO0VBQ1AsVUFBTWMsU0FBU3ZMLFNBQVN3TCxhQUFULENBQXVCLFFBQXZCLENBQWY7RUFDQXBMLFdBQUtvTyxjQUFMLENBQW9CLEtBQUtqRCxNQUF6QixFQUFpQ0EsTUFBakM7O0VBRUFBLGFBQU9sSCxLQUFQLEdBQWUsS0FBSytLLGFBQXBCO0VBQ0E3RCxhQUFPM0csTUFBUCxHQUFnQixLQUFLMEssY0FBckI7O0VBRUEsVUFBTVksTUFBTTNFLE9BQU9FLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBWjtFQUNBLFVBQU1oQixZQUFZeUYsSUFBSXhGLFlBQUosQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUJhLE9BQU9sSCxLQUE5QixFQUFxQ2tILE9BQU8zRyxNQUE1QyxDQUFsQjtFQUNBLFVBQU0xQyxZQUFZdUksVUFBVW5JLElBQTVCOztFQUVBLFdBQUssSUFBSXBELElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLZ08sb0JBQUwsQ0FBMEJoTSxNQUE5QyxFQUFzRGhDLEdBQXRELEVBQTJEO0VBQ3pELFlBQUkrSixRQUFRLEtBQUtpRSxvQkFBTCxDQUEwQmhPLENBQTFCLENBQVo7RUFDQWdELGtCQUFVaEQsQ0FBVixJQUFlK0osS0FBZjtFQUNEOztFQUVEaUgsVUFBSUgsWUFBSixDQUFpQnRGLFNBQWpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9COztFQUVBLFdBQUsyQyxlQUFMLEdBQXVCO0VBQ3JCakosV0FBRyxDQURrQjtFQUVyQkMsV0FBRztFQUZrQixPQUF2QjtFQUlBLFdBQUtrSixPQUFMLEdBQWUsS0FBZjtFQUNBLFdBQUs2QyxhQUFMLENBQW1CNUUsTUFBbkI7RUFDRDs7RUFFRDs7Ozs7O0VBTUE7Ozs7OENBQ3lCO0VBQ3ZCLFVBQUksQ0FBQ3ZJLE1BQU0wTSxXQUFYLEVBQXdCO0VBQ3RCLGNBQU0sSUFBSWhMLEtBQUosQ0FBVSxpQkFBVixDQUFOO0VBQ0Q7O0VBRUQsVUFBTTBMLFNBQVMsRUFBZjtFQUNBLGFBQU9BLE1BQVA7RUFDRDs7RUFFRDs7Ozs7Ozs7Ozs7OzhCQVNTNU8sTUFBTTJILFdBQVc7RUFDeEIsV0FBSytDLFFBQUwsQ0FBY21FLEdBQWQsQ0FBa0I7RUFDaEJoTyxjQUFNUyxPQUFPdUUsSUFBUCxDQUFZcEUsTUFERjtFQUVoQnpCLGNBQU1BLElBRlU7RUFHaEIySCxtQkFBV0E7RUFISyxPQUFsQjtFQUtBLGFBQU8sSUFBUDtFQUNEOztFQUVEOzs7Ozs7Ozs7Ozs7O29DQVVlM0gsTUFBTWdJLFFBQWtDO0VBQUEsVUFBMUJELE9BQTBCLHVFQUFoQixJQUFnQjtFQUFBLFVBQVZELElBQVUsdUVBQUgsQ0FBRzs7RUFDckQsVUFBSSxDQUFDQyxPQUFMLEVBQWM7RUFDWkEsa0JBQVUsQ0FBVjtFQUNBLGFBQUssSUFBSXJLLElBQUksQ0FBYixFQUFnQkEsS0FBS3NLLE9BQU90SSxNQUE1QixFQUFvQ2hDLEdBQXBDLEVBQXlDO0VBQ3ZDcUsscUJBQVdDLE9BQU90SyxDQUFQLENBQVg7RUFDRDtFQUNGOztFQUVELFdBQUtnTixRQUFMLENBQWNtRSxHQUFkLENBQWtCO0VBQ2hCaE8sY0FBTVMsT0FBT3VFLElBQVAsQ0FBWW5FLE1BREY7RUFFaEIxQixrQkFGZ0I7RUFHaEJnSSxzQkFIZ0I7RUFJaEJELHdCQUpnQjtFQUtoQkQ7RUFMZ0IsT0FBbEI7O0VBUUEsYUFBTyxJQUFQO0VBQ0Q7O0VBRUQ7Ozs7Ozs7Ozs7O29DQVFldkYsUUFBUWhGLE1BQU07RUFDM0IsV0FBS21OLFFBQUwsQ0FBY21FLEdBQWQsQ0FBa0I7RUFDaEJoTyxjQUFNUyxPQUFPdUUsSUFBUCxDQUFZL0QsTUFERjtFQUVoQlMsc0JBRmdCO0VBR2hCaEY7RUFIZ0IsT0FBbEI7O0VBTUEsYUFBTyxJQUFQO0VBQ0Q7O0VBRUQ7Ozs7Ozs7Ozs7OzsrQkFTVTBDLFVBQVU7RUFDbEIsVUFBTTZGLFFBQVEsSUFBSTBELEtBQUosQ0FBVSxJQUFWLENBQWQ7RUFDQSxXQUFLekQsV0FBTCxDQUFpQjFFLElBQWpCLENBQXNCeUUsS0FBdEI7RUFDQSxXQUFLNEUsUUFBTCxDQUFjbUUsR0FBZCxDQUFrQjtFQUNoQmhPLGNBQU1TLE9BQU91RSxJQUFQLENBQVlsRTtFQURGLE9BQWxCOztFQUlBMUIsZUFBUzdCLElBQVQsQ0FBYzBILEtBQWQ7O0VBRUEsV0FBSzRFLFFBQUwsQ0FBY21FLEdBQWQsQ0FBa0I7RUFDaEJoTyxjQUFNUyxPQUFPdUUsSUFBUCxDQUFZakU7RUFERixPQUFsQjtFQUdBLGFBQU8sSUFBUDtFQUNEOztFQUVEOzs7Ozs7Ozs7bUNBTWNrRSxPQUFPO0VBQ25CLFdBQUtnSixXQUFMLENBQWlCaEosS0FBakI7RUFDRDs7RUFFRDs7Ozs7Ozs7O2tDQU1hQSxPQUFPO0VBQ2xCLFdBQUtpRyxVQUFMLENBQWdCMUssSUFBaEIsQ0FBcUIsS0FBSzJLLFlBQTFCO0VBQ0EsV0FBS3JCLFVBQUwsQ0FBZ0J0SixJQUFoQixDQUFxQixLQUFLWCxTQUExQjtFQUNBLFdBQUtzTCxZQUFMLEdBQW9CbEcsS0FBcEI7RUFDQSxXQUFLcEYsU0FBTCxHQUFpQm9GLE1BQU1wRixTQUF2QjtFQUNEOztFQUVEOzs7O21DQUNjO0VBQ1osV0FBS0EsU0FBTCxHQUFpQixLQUFLaUssVUFBTCxDQUFnQmxOLEdBQWhCLEVBQWpCO0VBQ0EsV0FBS3VPLFlBQUwsR0FBb0IsS0FBS0QsVUFBTCxDQUFnQnRPLEdBQWhCLEVBQXBCO0VBQ0Q7O0VBRUQ7Ozs7MENBQ3FCO0VBQ25CLFdBQUt1TyxZQUFMLENBQWtCK0MsYUFBbEI7RUFDRDs7RUFFRDs7Ozs7Ozs7NkJBS1E7RUFDTixVQUFJdFEsT0FBSixFQUFhO0VBQ1gsYUFBS3VRLFFBQUwsQ0FBYzVSLEtBQWQsQ0FBb0IsSUFBcEIsRUFBMEJvTixTQUExQjtFQUNELE9BRkQsTUFFTztFQUNMLGFBQUt5RSxXQUFMLENBQWlCN1IsS0FBakIsQ0FBdUIsSUFBdkIsRUFBNkJvTixTQUE3QjtFQUNEO0VBQ0Y7OztvQ0FFMEI7RUFBQSxVQUFkM0osSUFBYyx1RUFBUCxLQUFPOztFQUN6QkEsYUFBT0EsS0FBS3VELFdBQUwsRUFBUDtFQUNBO0VBQ0EsVUFBTXFHLFFBQVEsS0FBS3lFLFFBQUwsQ0FBY3JPLElBQWQsRUFBb0JzTyxPQUFwQixZQUFxQ3RPLElBQXJDLEVBQTZDLG9CQUE3QyxDQUFkO0VBQ0FyQyxlQUFTNFEsUUFBVCxDQUFrQkMsSUFBbEIsR0FBeUI1RSxLQUF6QjtFQUNEOztFQUVEO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTs7Ozs7OzhCQUdTNUosTUFBTTtFQUNiO0VBQ0EsVUFBTW1ELE1BQU0sSUFBSThFLEtBQUosRUFBWjtFQUNBOUUsVUFBSWpGLEdBQUosR0FBVSxLQUFLbVEsUUFBTCxDQUFjck8sSUFBZCxDQUFWO0VBQ0FtRCxVQUFJbkIsS0FBSixHQUFZLEtBQUtNLFVBQUwsQ0FBZ0JOLEtBQTVCO0VBQ0FtQixVQUFJWixNQUFKLEdBQWEsS0FBS0QsVUFBTCxDQUFnQkMsTUFBN0I7O0VBRUEsVUFBSWtNLE9BQU9DLGdCQUFYLEVBQTZCO0VBQzNCdkwsWUFBSW5CLEtBQUosSUFBYXlNLE9BQU9DLGdCQUFwQjtFQUNBdkwsWUFBSVosTUFBSixJQUFja00sT0FBT0MsZ0JBQXJCO0VBQ0Q7RUFDRCxhQUFPdkwsR0FBUDtFQUNEOztFQUVEOzs7Ozs7aUNBR3dCO0VBQUEsVUFBZG5ELElBQWMsdUVBQVAsS0FBTzs7RUFDdEJBLGFBQU9BLEtBQUt1RCxXQUFMLEVBQVA7RUFDQSxhQUFPLEtBQUsyRixNQUFMLENBQVl5RixTQUFaLFlBQStCM08sSUFBL0IsQ0FBUDtFQUNEOzs7SUF4dkJnQzlEOzt3QkFBZHlFOzs7V0FFRjtFQUNmdUosYUFBUyxPQURNO0VBRWZDLFVBQU0sV0FGUzs7d0JBRkV4Sjs7O1dBUUo7O3dCQVJJQTs7O1dBYUU7O3dCQWJGQTs7O1dBZ0JFOzt3QkFoQkZBOzs7V0FtQkU7O3dCQW5CRkE7OztXQXNCQzs7d0JBdEJEQTs7O1dBeUJILE9BQU8vQyxPQUFQLEtBQW1COzt3QkF6QmhCK0M7OztXQTRCSCxPQUFPL0MsT0FBUCxLQUFtQjs7d0JBNUJoQitDOzs7V0ErQkQsQ0FBQ0EsTUFBTXlKOzs7RUNwRDNCOzs7Ozs7QUFNQSxFQUFlLFNBQVN3RSxlQUFULENBQXlCckcsT0FBekIsRUFBa0M7RUFDL0M7RUFDQUEsVUFBUXNHLFFBQVIsQ0FBaUIsUUFBakIsRUFBMkIsVUFBQ3BHLFNBQUQsRUFBWUMsVUFBWixFQUEyQjtFQUNwRCxXQUFPO0VBQ0xqSixTQUFHZ0osVUFBVWhKLENBRFI7RUFFTEMsU0FBRytJLFVBQVUvSSxDQUZSO0VBR0xDLFNBQUc4SSxVQUFVOUk7RUFIUixLQUFQO0VBS0QsR0FORDs7RUFRQTtFQUNBNEksVUFBUXNHLFFBQVIsQ0FBaUIsVUFBakIsRUFBNkIsVUFBQ3BHLFNBQUQsRUFBWUMsVUFBWixFQUEyQjtFQUN0RCxXQUFPO0VBQ0xqSixTQUFJZ0osVUFBVWhKLENBQVYsR0FBY2lKLFdBQVdqSixDQUExQixHQUErQixHQUQ3QjtFQUVMQyxTQUFJK0ksVUFBVS9JLENBQVYsR0FBY2dKLFdBQVdoSixDQUExQixHQUErQixHQUY3QjtFQUdMQyxTQUFJOEksVUFBVTlJLENBQVYsR0FBYytJLFdBQVcvSSxDQUExQixHQUErQjtFQUg3QixLQUFQO0VBS0QsR0FORDs7RUFRQTRJLFVBQVFzRyxRQUFSLENBQWlCLFFBQWpCLEVBQTJCLFVBQUNwRyxTQUFELEVBQVlDLFVBQVosRUFBMkI7RUFDcEQsV0FBTztFQUNMakosU0FBRyxNQUFRLENBQUMsTUFBTWdKLFVBQVVoSixDQUFqQixLQUF1QixNQUFNaUosV0FBV2pKLENBQXhDLENBQUQsR0FBK0MsR0FEcEQ7RUFFTEMsU0FBRyxNQUFRLENBQUMsTUFBTStJLFVBQVUvSSxDQUFqQixLQUF1QixNQUFNZ0osV0FBV2hKLENBQXhDLENBQUQsR0FBK0MsR0FGcEQ7RUFHTEMsU0FBRyxNQUFRLENBQUMsTUFBTThJLFVBQVU5SSxDQUFqQixLQUF1QixNQUFNK0ksV0FBVy9JLENBQXhDLENBQUQsR0FBK0M7RUFIcEQsS0FBUDtFQUtELEdBTkQ7O0VBUUE0SSxVQUFRc0csUUFBUixDQUFpQixTQUFqQixFQUE0QixVQUFDcEcsU0FBRCxFQUFZQyxVQUFaLEVBQTJCO0VBQ3JELFFBQU1zQixTQUFTLEVBQWY7RUFDQUEsV0FBT3ZLLENBQVAsR0FBV2lKLFdBQVdqSixDQUFYLEdBQWUsR0FBZixHQUFxQixNQUFNLEtBQUssTUFBTWdKLFVBQVVoSixDQUFyQixLQUEyQixNQUFNaUosV0FBV2pKLENBQTVDLElBQWlELEdBQTVFLEdBQW1GaUosV0FBV2pKLENBQVgsR0FBZWdKLFVBQVVoSixDQUF6QixHQUE2QixDQUE5QixHQUFtQyxHQUFoSTtFQUNBdUssV0FBT3RLLENBQVAsR0FBV2dKLFdBQVdoSixDQUFYLEdBQWUsR0FBZixHQUFxQixNQUFNLEtBQUssTUFBTStJLFVBQVUvSSxDQUFyQixLQUEyQixNQUFNZ0osV0FBV2hKLENBQTVDLElBQWlELEdBQTVFLEdBQW1GZ0osV0FBV2hKLENBQVgsR0FBZStJLFVBQVUvSSxDQUF6QixHQUE2QixDQUE5QixHQUFtQyxHQUFoSTtFQUNBc0ssV0FBT3JLLENBQVAsR0FBVytJLFdBQVcvSSxDQUFYLEdBQWUsR0FBZixHQUFxQixNQUFNLEtBQUssTUFBTThJLFVBQVU5SSxDQUFyQixLQUEyQixNQUFNK0ksV0FBVy9JLENBQTVDLElBQWlELEdBQTVFLEdBQW1GK0ksV0FBVy9JLENBQVgsR0FBZThJLFVBQVU5SSxDQUF6QixHQUE2QixDQUE5QixHQUFtQyxHQUFoSTs7RUFFQSxXQUFPcUssTUFBUDtFQUNELEdBUEQ7O0VBU0F6QixVQUFRc0csUUFBUixDQUFpQixZQUFqQixFQUErQixVQUFDcEcsU0FBRCxFQUFZQyxVQUFaLEVBQTJCO0VBQ3hELFdBQU87RUFDTGpKLFNBQUdnSixVQUFVaEosQ0FBVixHQUFjaUosV0FBV2pKLENBRHZCO0VBRUxDLFNBQUcrSSxVQUFVL0ksQ0FBVixHQUFjZ0osV0FBV2hKLENBRnZCO0VBR0xDLFNBQUc4SSxVQUFVOUksQ0FBVixHQUFjK0ksV0FBVy9JO0VBSHZCLEtBQVA7RUFLRCxHQU5EOztFQVFBNEksVUFBUXNHLFFBQVIsQ0FBaUIsVUFBakIsRUFBNkIsVUFBQ3BHLFNBQUQsRUFBWUMsVUFBWixFQUEyQjtFQUN0RCxXQUFPO0VBQ0xqSixTQUFHaUosV0FBV2pKLENBQVgsR0FBZWdKLFVBQVVoSixDQUR2QjtFQUVMQyxTQUFHZ0osV0FBV2hKLENBQVgsR0FBZStJLFVBQVUvSSxDQUZ2QjtFQUdMQyxTQUFHK0ksV0FBVy9JLENBQVgsR0FBZThJLFVBQVU5STtFQUh2QixLQUFQO0VBS0QsR0FORDs7RUFRQTRJLFVBQVFzRyxRQUFSLENBQWlCLFdBQWpCLEVBQThCLFVBQUNwRyxTQUFELEVBQVlDLFVBQVosRUFBMkI7RUFDdkQsV0FBTztFQUNMakosU0FBRyxNQUFNLEtBQUtpSixXQUFXakosQ0FBWCxHQUFlLEdBQXBCLEtBQTRCZ0osVUFBVWhKLENBQVYsR0FBYyxHQUExQyxJQUFpRCxHQURyRDtFQUVMQyxTQUFHLE1BQU0sS0FBS2dKLFdBQVdoSixDQUFYLEdBQWUsR0FBcEIsS0FBNEIrSSxVQUFVL0ksQ0FBVixHQUFjLEdBQTFDLElBQWlELEdBRnJEO0VBR0xDLFNBQUcsTUFBTSxLQUFLK0ksV0FBVy9JLENBQVgsR0FBZSxHQUFwQixLQUE0QjhJLFVBQVU5SSxDQUFWLEdBQWMsR0FBMUMsSUFBaUQ7RUFIckQsS0FBUDtFQUtELEdBTkQ7O0VBUUE0SSxVQUFRc0csUUFBUixDQUFpQixXQUFqQixFQUE4QixVQUFDcEcsU0FBRCxFQUFZQyxVQUFaLEVBQTJCO0VBQ3ZELFFBQU1zQixTQUFTLEVBQWY7O0VBRUFBLFdBQU92SyxDQUFQLEdBQVdpSixXQUFXakosQ0FBWCxHQUFlLEdBQWYsR0FBcUIsTUFBTyxDQUFDLE1BQU1pSixXQUFXakosQ0FBbEIsS0FBd0IsT0FBT2dKLFVBQVVoSixDQUFWLEdBQWMsR0FBckIsQ0FBeEIsQ0FBRCxHQUF1RCxHQUFsRixHQUF5RmlKLFdBQVdqSixDQUFYLElBQWdCZ0osVUFBVWhKLENBQVYsR0FBYyxHQUE5QixDQUFELEdBQXVDLEdBQTFJOztFQUVBdUssV0FBT3RLLENBQVAsR0FBV2dKLFdBQVdoSixDQUFYLEdBQWUsR0FBZixHQUFxQixNQUFPLENBQUMsTUFBTWdKLFdBQVdoSixDQUFsQixLQUF3QixPQUFPK0ksVUFBVS9JLENBQVYsR0FBYyxHQUFyQixDQUF4QixDQUFELEdBQXVELEdBQWxGLEdBQXlGZ0osV0FBV2hKLENBQVgsSUFBZ0IrSSxVQUFVL0ksQ0FBVixHQUFjLEdBQTlCLENBQUQsR0FBdUMsR0FBMUk7O0VBRUFzSyxXQUFPckssQ0FBUCxHQUFXK0ksV0FBVy9JLENBQVgsR0FBZSxHQUFmLEdBQXFCLE1BQU8sQ0FBQyxNQUFNK0ksV0FBVy9JLENBQWxCLEtBQXdCLE9BQU84SSxVQUFVOUksQ0FBVixHQUFjLEdBQXJCLENBQXhCLENBQUQsR0FBdUQsR0FBbEYsR0FBeUYrSSxXQUFXL0ksQ0FBWCxJQUFnQjhJLFVBQVU5SSxDQUFWLEdBQWMsR0FBOUIsQ0FBRCxHQUF1QyxHQUExSTs7RUFFQSxXQUFPcUssTUFBUDtFQUNELEdBVkQ7O0VBWUF6QixVQUFRc0csUUFBUixDQUFpQixTQUFqQixFQUE0QixVQUFDcEcsU0FBRCxFQUFZQyxVQUFaLEVBQTJCO0VBQ3JELFdBQU87RUFDTGpKLFNBQUdpSixXQUFXakosQ0FBWCxHQUFlZ0osVUFBVWhKLENBQXpCLEdBQTZCaUosV0FBV2pKLENBQXhDLEdBQTRDZ0osVUFBVWhKLENBRHBEO0VBRUxDLFNBQUdnSixXQUFXaEosQ0FBWCxHQUFlK0ksVUFBVS9JLENBQXpCLEdBQTZCZ0osV0FBV2hKLENBQXhDLEdBQTRDK0ksVUFBVS9JLENBRnBEO0VBR0xDLFNBQUcrSSxXQUFXL0ksQ0FBWCxHQUFlOEksVUFBVTlJLENBQXpCLEdBQTZCK0ksV0FBVy9JLENBQXhDLEdBQTRDOEksVUFBVTlJO0VBSHBELEtBQVA7RUFLRCxHQU5EOztFQVFBNEksVUFBUXNHLFFBQVIsQ0FBaUIsUUFBakIsRUFBMkIsVUFBQ3BHLFNBQUQsRUFBWUMsVUFBWixFQUEyQjtFQUNwRCxXQUFPO0VBQ0xqSixTQUFHaUosV0FBV2pKLENBQVgsR0FBZWdKLFVBQVVoSixDQUF6QixHQUE2QmdKLFVBQVVoSixDQUF2QyxHQUEyQ2lKLFdBQVdqSixDQURwRDtFQUVMQyxTQUFHZ0osV0FBV2hKLENBQVgsR0FBZStJLFVBQVUvSSxDQUF6QixHQUE2QitJLFVBQVUvSSxDQUF2QyxHQUEyQ2dKLFdBQVdoSixDQUZwRDtFQUdMQyxTQUFHK0ksV0FBVy9JLENBQVgsR0FBZThJLFVBQVU5SSxDQUF6QixHQUE2QjhJLFVBQVU5SSxDQUF2QyxHQUEyQytJLFdBQVcvSTtFQUhwRCxLQUFQO0VBS0QsR0FORDtFQU9EOztFQzdGRDs7Ozs7O01BTXFCbVA7Ozs7Ozs7O0VBQ25COzs7Ozs7Ozs7K0JBU2lCOUwsS0FBSztFQUNwQixVQUFJQSxJQUFJK0wsTUFBSixDQUFXLENBQVgsTUFBa0IsR0FBdEIsRUFBMkI7RUFDekIvTCxjQUFNQSxJQUFJZ00sTUFBSixDQUFXLENBQVgsQ0FBTjtFQUNEO0VBQ0QsVUFBTXZQLElBQUlnTCxTQUFTekgsSUFBSWdNLE1BQUosQ0FBVyxDQUFYLEVBQWMsQ0FBZCxDQUFULEVBQTJCLEVBQTNCLENBQVY7RUFDQSxVQUFNdFAsSUFBSStLLFNBQVN6SCxJQUFJZ00sTUFBSixDQUFXLENBQVgsRUFBYyxDQUFkLENBQVQsRUFBMkIsRUFBM0IsQ0FBVjtFQUNBLFVBQU1yUCxJQUFJOEssU0FBU3pILElBQUlnTSxNQUFKLENBQVcsQ0FBWCxFQUFjLENBQWQsQ0FBVCxFQUEyQixFQUEzQixDQUFWO0VBQ0EsYUFBTyxFQUFFdlAsSUFBRixFQUFLQyxJQUFMLEVBQVFDLElBQVIsRUFBUDtFQUNEOztFQUVEOzs7Ozs7Ozs7Ozs7Ozs7K0JBWWlCRixHQUFHQyxHQUFHQyxHQUFHO0VBQ3hCLFVBQUksUUFBT0YsQ0FBUCx5Q0FBT0EsQ0FBUCxPQUFhLFFBQWpCLEVBQTJCO0VBQ3pCQyxZQUFJRCxFQUFFQyxDQUFOO0VBQ0FDLFlBQUlGLEVBQUVFLENBQU47RUFDQUYsWUFBSUEsRUFBRUEsQ0FBTjtFQUNEOztFQUVEQSxXQUFLLEdBQUw7RUFDQUMsV0FBSyxHQUFMO0VBQ0FDLFdBQUssR0FBTDs7RUFFQSxVQUFNNEgsTUFBTXJGLEtBQUtxRixHQUFMLENBQVM5SCxDQUFULEVBQVlDLENBQVosRUFBZUMsQ0FBZixDQUFaO0VBQ0EsVUFBTTZILE1BQU10RixLQUFLc0YsR0FBTCxDQUFTL0gsQ0FBVCxFQUFZQyxDQUFaLEVBQWVDLENBQWYsQ0FBWjtFQUNBLFVBQU1zUCxJQUFJLENBQUMxSCxNQUFNQyxHQUFQLElBQWMsQ0FBeEI7RUFDQSxVQUFJMEgsVUFBSjtFQUFBLFVBQU9DLFVBQVA7RUFDQSxVQUFJNUgsUUFBUUMsR0FBWixFQUFpQjtFQUNmMEgsWUFBSUMsSUFBSSxDQUFSO0VBQ0QsT0FGRCxNQUVPO0VBQ0wsWUFBTUMsSUFBSTdILE1BQU1DLEdBQWhCO0VBQ0EySCxZQUFJRixJQUFJLEdBQUosR0FBVUcsS0FBSyxJQUFJN0gsR0FBSixHQUFVQyxHQUFmLENBQVYsR0FBZ0M0SCxLQUFLN0gsTUFBTUMsR0FBWCxDQUFwQzs7RUFFQSxZQUFJRCxRQUFROUgsQ0FBWixFQUFlO0VBQ2J5UCxjQUFJLENBQUN4UCxJQUFJQyxDQUFMLElBQVV5UCxDQUFWLEdBQWMxUCxDQUFkLEdBQWtCQyxDQUFsQixHQUFzQixDQUF0QixHQUEwQixDQUE5QjtFQUNELFNBRkQsTUFFTyxJQUFJNEgsUUFBUTdILENBQVosRUFBZTtFQUNwQndQLGNBQUksQ0FBQ3ZQLElBQUlGLENBQUwsSUFBVTJQLENBQVYsR0FBYyxDQUFsQjtFQUNELFNBRk0sTUFFQSxJQUFJN0gsUUFBUTVILENBQVosRUFBZTtFQUNwQnVQLGNBQUksQ0FBQ3pQLElBQUlDLENBQUwsSUFBVTBQLENBQVYsR0FBYyxDQUFsQjtFQUNEOztFQUVERixhQUFLLENBQUw7RUFDRDtFQUNELGFBQU8sRUFBQ0EsSUFBRCxFQUFJQyxJQUFKLEVBQU9GLElBQVAsRUFBUDtFQUNEOztFQUVEOzs7Ozs7Ozs7Ozs7OzsrQkFXaUJDLEdBQUdDLEdBQUdGLEdBQUc7RUFDeEIsVUFBSXhQLFVBQUo7RUFBQSxVQUFPQyxVQUFQO0VBQUEsVUFBVUMsVUFBVjtFQUFBLFVBQWFpSSxVQUFiO0VBQUEsVUFBZ0J5SCxVQUFoQjtFQUNBLFVBQUksUUFBT0gsQ0FBUCx5Q0FBT0EsQ0FBUCxPQUFhLFFBQWpCLEVBQTJCO0VBQ3pCQyxZQUFJRCxFQUFFQyxDQUFOO0VBQ0FGLFlBQUlDLEVBQUVELENBQU47RUFDQUMsWUFBSUEsRUFBRUEsQ0FBTjtFQUNEO0VBQ0QsVUFBSUMsTUFBTSxDQUFWLEVBQWE7RUFDWDFQLFlBQUlDLElBQUlDLElBQUlzUCxDQUFaO0VBQ0QsT0FGRCxNQUVPO0VBQ0xJLFlBQUlKLElBQUksR0FBSixHQUFVQSxLQUFLLElBQUlFLENBQVQsQ0FBVixHQUF3QkYsSUFBSUUsQ0FBSixHQUFRRixJQUFJRSxDQUF4QztFQUNBdkgsWUFBSSxJQUFJcUgsQ0FBSixHQUFRSSxDQUFaOztFQUVBNVAsWUFBSSxLQUFLNlAsUUFBTCxDQUFjMUgsQ0FBZCxFQUFpQnlILENBQWpCLEVBQW9CSCxJQUFJLElBQUksQ0FBNUIsQ0FBSjtFQUNBeFAsWUFBSSxLQUFLNFAsUUFBTCxDQUFjMUgsQ0FBZCxFQUFpQnlILENBQWpCLEVBQW9CSCxDQUFwQixDQUFKO0VBQ0F2UCxZQUFJLEtBQUsyUCxRQUFMLENBQWMxSCxDQUFkLEVBQWlCeUgsQ0FBakIsRUFBb0JILElBQUksSUFBSSxDQUE1QixDQUFKO0VBQ0Q7RUFDRCxhQUFPO0VBQ0x6UCxXQUFHQSxJQUFJLEdBREY7RUFFTEMsV0FBR0EsSUFBSSxHQUZGO0VBR0xDLFdBQUdBLElBQUk7RUFIRixPQUFQO0VBS0Q7O0VBRUQ7Ozs7Ozs7Ozs7Ozs7K0JBVWlCaUksR0FBR3lILEdBQUdFLEdBQUc7RUFDeEIsVUFBSUEsSUFBSSxDQUFSLEVBQVc7RUFDVEEsYUFBSyxDQUFMO0VBQ0Q7RUFDRCxVQUFJQSxJQUFJLENBQVIsRUFBVztFQUNUQSxhQUFLLENBQUw7RUFDRDtFQUNELFVBQUlBLElBQUksSUFBSSxDQUFaLEVBQWU7RUFDYixlQUFPM0gsSUFBSSxDQUFDeUgsSUFBSXpILENBQUwsSUFBVSxDQUFWLEdBQWMySCxDQUF6QjtFQUNEO0VBQ0QsVUFBSUEsSUFBSSxJQUFJLENBQVosRUFBZTtFQUNiLGVBQU9GLENBQVA7RUFDRDtFQUNELFVBQUlFLElBQUksSUFBSSxDQUFaLEVBQWU7RUFDYixlQUFPM0gsSUFBSSxDQUFDeUgsSUFBSXpILENBQUwsS0FBVyxJQUFJLENBQUosR0FBUTJILENBQW5CLElBQXdCLENBQW5DO0VBQ0Q7RUFDRCxhQUFPM0gsQ0FBUDtFQUNEOztFQUVEOzs7Ozs7Ozs7Ozs7OzsrQkFXaUJuSSxHQUFHQyxHQUFHQyxHQUFHO0VBQ3hCRixXQUFLLEdBQUw7RUFDQUMsV0FBSyxHQUFMO0VBQ0FDLFdBQUssR0FBTDs7RUFFQSxVQUFNNEgsTUFBTXJGLEtBQUtxRixHQUFMLENBQVM5SCxDQUFULEVBQVlDLENBQVosRUFBZUMsQ0FBZixDQUFaO0VBQ0EsVUFBTTZILE1BQU10RixLQUFLc0YsR0FBTCxDQUFTL0gsQ0FBVCxFQUFZQyxDQUFaLEVBQWVDLENBQWYsQ0FBWjtFQUNBLFVBQU02UCxJQUFJakksR0FBVjtFQUNBLFVBQU02SCxJQUFJN0gsTUFBTUMsR0FBaEI7O0VBRUEsVUFBTTJILElBQUk1SCxRQUFRLENBQVIsR0FBWSxDQUFaLEdBQWdCNkgsSUFBSTdILEdBQTlCO0VBQ0EsVUFBSTJILFVBQUo7RUFDQSxVQUFJM0gsUUFBUUMsR0FBWixFQUFpQjtFQUNmMEgsWUFBSSxDQUFKO0VBQ0QsT0FGRCxNQUVPO0VBQ0wsWUFBSTNILFFBQVE5SCxDQUFaLEVBQWU7RUFDYnlQLGNBQUksQ0FBQ3hQLElBQUlDLENBQUwsSUFBVXlQLENBQVYsR0FBYzFQLENBQWQsR0FBa0JDLENBQWxCLEdBQXNCLENBQXRCLEdBQTBCLENBQTlCO0VBQ0QsU0FGRCxNQUVPLElBQUk0SCxRQUFRN0gsQ0FBWixFQUFlO0VBQ3BCd1AsY0FBSSxDQUFDdlAsSUFBSUYsQ0FBTCxJQUFVMlAsQ0FBVixHQUFjLENBQWxCO0VBQ0QsU0FGTSxNQUVBLElBQUk3SCxRQUFRNUgsQ0FBWixFQUFlO0VBQ3BCdVAsY0FBSSxDQUFDelAsSUFBSUMsQ0FBTCxJQUFVMFAsQ0FBVixHQUFjLENBQWxCO0VBQ0Q7RUFDREYsYUFBSyxDQUFMO0VBQ0Q7O0VBRUQsYUFBTyxFQUFDQSxJQUFELEVBQUlDLElBQUosRUFBT0ssSUFBUCxFQUFQO0VBQ0Q7O0VBRUQ7Ozs7Ozs7Ozs7Ozs7OytCQVdpQk4sR0FBR0MsR0FBR0ssR0FBRztFQUN4QixVQUFNM1MsSUFBSXFGLEtBQUtDLEtBQUwsQ0FBVytNLElBQUksQ0FBZixDQUFWO0VBQ0EsVUFBTU8sSUFBSVAsSUFBSSxDQUFKLEdBQVFyUyxDQUFsQjtFQUNBLFVBQU0rSyxJQUFJNEgsS0FBSyxJQUFJTCxDQUFULENBQVY7RUFDQSxVQUFNRSxJQUFJRyxLQUFLLElBQUlDLElBQUlOLENBQWIsQ0FBVjtFQUNBLFVBQU1JLElBQUlDLEtBQUssSUFBSSxDQUFDLElBQUlDLENBQUwsSUFBVU4sQ0FBbkIsQ0FBVjs7RUFFQSxVQUFJMVAsVUFBSjtFQUFBLFVBQU9DLFVBQVA7RUFBQSxVQUFVQyxVQUFWO0VBQ0EsY0FBUTlDLElBQUksQ0FBWjtFQUNFLGFBQUssQ0FBTDtFQUNFNEMsY0FBSStQLENBQUo7RUFDQTlQLGNBQUk2UCxDQUFKO0VBQ0E1UCxjQUFJaUksQ0FBSjtFQUNBO0VBQ0YsYUFBSyxDQUFMO0VBQ0VuSSxjQUFJNFAsQ0FBSjtFQUNBM1AsY0FBSThQLENBQUo7RUFDQTdQLGNBQUlpSSxDQUFKO0VBQ0E7RUFDRixhQUFLLENBQUw7RUFDRW5JLGNBQUltSSxDQUFKO0VBQ0FsSSxjQUFJOFAsQ0FBSjtFQUNBN1AsY0FBSTRQLENBQUo7RUFDQTtFQUNGLGFBQUssQ0FBTDtFQUNFOVAsY0FBSW1JLENBQUo7RUFDQWxJLGNBQUkyUCxDQUFKO0VBQ0ExUCxjQUFJNlAsQ0FBSjtFQUNBO0VBQ0YsYUFBSyxDQUFMO0VBQ0UvUCxjQUFJOFAsQ0FBSjtFQUNBN1AsY0FBSWtJLENBQUo7RUFDQWpJLGNBQUk2UCxDQUFKO0VBQ0E7RUFDRixhQUFLLENBQUw7RUFDRS9QLGNBQUkrUCxDQUFKO0VBQ0E5UCxjQUFJa0ksQ0FBSjtFQUNBakksY0FBSTBQLENBQUo7RUFDQTtFQTlCSjs7RUFpQ0EsYUFBTztFQUNMNVAsV0FBR3lDLEtBQUtDLEtBQUwsQ0FBVzFDLElBQUksR0FBZixDQURFO0VBRUxDLFdBQUd3QyxLQUFLQyxLQUFMLENBQVd6QyxJQUFJLEdBQWYsQ0FGRTtFQUdMQyxXQUFHdUMsS0FBS0MsS0FBTCxDQUFXeEMsSUFBSSxHQUFmO0VBSEUsT0FBUDtFQUtEOztFQUVEOzs7Ozs7Ozs7Ozs7OzsrQkFXaUJGLEdBQUdDLEdBQUdDLEdBQUc7RUFDeEJGLFdBQUssR0FBTDtFQUNBQyxXQUFLLEdBQUw7RUFDQUMsV0FBSyxHQUFMOztFQUVBLFVBQUlGLElBQUksT0FBUixFQUFpQjtFQUNmQSxZQUFJeUMsS0FBS3dOLEdBQUwsQ0FBUyxDQUFDalEsSUFBSSxLQUFMLElBQWMsS0FBdkIsRUFBOEIsR0FBOUIsQ0FBSjtFQUNELE9BRkQsTUFFTztFQUNMQSxhQUFLLEtBQUw7RUFDRDs7RUFFRCxVQUFJQyxJQUFJLE9BQVIsRUFBaUI7RUFDZkEsWUFBSXdDLEtBQUt3TixHQUFMLENBQVMsQ0FBQ2hRLElBQUksS0FBTCxJQUFjLEtBQXZCLEVBQThCLEdBQTlCLENBQUo7RUFDRCxPQUZELE1BRU87RUFDTEEsYUFBSyxLQUFMO0VBQ0Q7O0VBRUQsVUFBSUMsSUFBSSxPQUFSLEVBQWlCO0VBQ2ZBLFlBQUl1QyxLQUFLd04sR0FBTCxDQUFTLENBQUMvUCxJQUFJLEtBQUwsSUFBYyxLQUF2QixFQUE4QixHQUE5QixDQUFKO0VBQ0QsT0FGRCxNQUVPO0VBQ0xBLGFBQUssS0FBTDtFQUNEOztFQUVELFVBQU1tQyxJQUFJckMsSUFBSSxNQUFKLEdBQWFDLElBQUksTUFBakIsR0FBMEJDLElBQUksTUFBeEM7RUFDQSxVQUFNb0MsSUFBSXRDLElBQUksTUFBSixHQUFhQyxJQUFJLE1BQWpCLEdBQTBCQyxJQUFJLE1BQXhDO0VBQ0EsVUFBTWdRLElBQUlsUSxJQUFJLE1BQUosR0FBYUMsSUFBSSxNQUFqQixHQUEwQkMsSUFBSSxNQUF4Qzs7RUFFQSxhQUFPO0VBQ0xtQyxXQUFHQSxJQUFJLEdBREY7RUFFTEMsV0FBR0EsSUFBSSxHQUZGO0VBR0w0TixXQUFHQSxJQUFJO0VBSEYsT0FBUDtFQUtEOztFQUVEOzs7Ozs7Ozs7Ozs7OzsrQkFXaUI3TixHQUFHQyxHQUFHNE4sR0FBRztFQUN4QjdOLFdBQUssR0FBTDtFQUNBQyxXQUFLLEdBQUw7RUFDQTROLFdBQUssR0FBTDs7RUFFQSxVQUFJbFEsSUFBSyxTQUFTcUMsQ0FBVixHQUFnQixDQUFDLE1BQUQsR0FBVUMsQ0FBMUIsR0FBZ0MsQ0FBQyxNQUFELEdBQVU0TixDQUFsRDtFQUNBLFVBQUlqUSxJQUFLLENBQUMsTUFBRCxHQUFVb0MsQ0FBWCxHQUFpQixTQUFTQyxDQUExQixHQUFnQyxTQUFTNE4sQ0FBakQ7RUFDQSxVQUFJaFEsSUFBSyxTQUFTbUMsQ0FBVixHQUFnQixDQUFDLE1BQUQsR0FBVUMsQ0FBMUIsR0FBZ0MsU0FBUzROLENBQWpEOztFQUVBLFVBQUlsUSxJQUFJLFNBQVIsRUFBbUI7RUFDakJBLFlBQUssUUFBUXlDLEtBQUt3TixHQUFMLENBQVNqUSxDQUFULEVBQVksWUFBWixDQUFULEdBQXNDLEtBQTFDO0VBQ0QsT0FGRCxNQUVPO0VBQ0xBLGFBQUssS0FBTDtFQUNEOztFQUVELFVBQUlDLElBQUksU0FBUixFQUFtQjtFQUNqQkEsWUFBSyxRQUFRd0MsS0FBS3dOLEdBQUwsQ0FBU2hRLENBQVQsRUFBWSxZQUFaLENBQVQsR0FBc0MsS0FBMUM7RUFDRCxPQUZELE1BRU87RUFDTEEsYUFBSyxLQUFMO0VBQ0Q7O0VBRUQsVUFBSUMsSUFBSSxTQUFSLEVBQW1CO0VBQ2pCQSxZQUFLLFFBQVF1QyxLQUFLd04sR0FBTCxDQUFTL1AsQ0FBVCxFQUFZLFlBQVosQ0FBVCxHQUFzQyxLQUExQztFQUNELE9BRkQsTUFFTztFQUNMQSxhQUFLLEtBQUw7RUFDRDs7RUFFRCxhQUFPO0VBQ0xGLFdBQUdBLElBQUksR0FERjtFQUVMQyxXQUFHQSxJQUFJLEdBRkY7RUFHTEMsV0FBR0EsSUFBSTtFQUhGLE9BQVA7RUFLRDs7RUFFRDs7Ozs7Ozs7Ozs7Ozs7K0JBV2lCbUMsR0FBR0MsR0FBRzROLEdBQUc7RUFDeEIsVUFBSSxRQUFPN04sQ0FBUCx5Q0FBT0EsQ0FBUCxPQUFhLFFBQWpCLEVBQTJCO0VBQ3pCQyxZQUFJRCxFQUFFQyxDQUFOO0VBQ0E0TixZQUFJN04sRUFBRTZOLENBQU47RUFDQTdOLFlBQUlBLEVBQUVBLENBQU47RUFDRDs7RUFFRCxVQUFNOE4sU0FBUyxNQUFmO0VBQ0EsVUFBTUMsU0FBUyxLQUFmO0VBQ0EsVUFBTUMsU0FBUyxPQUFmOztFQUVBaE8sV0FBSzhOLE1BQUw7RUFDQTdOLFdBQUs4TixNQUFMO0VBQ0FGLFdBQUtHLE1BQUw7O0VBRUEsVUFBSWhPLElBQUksY0FBUixFQUF3QjtFQUN0QkEsWUFBSUksS0FBS3dOLEdBQUwsQ0FBUzVOLENBQVQsRUFBWSxZQUFaLENBQUo7RUFDRCxPQUZELE1BRU87RUFDTEEsWUFBSyxjQUFjQSxDQUFmLEdBQW9CLFlBQXhCO0VBQ0Q7O0VBRUQsVUFBSUMsSUFBSSxjQUFSLEVBQXdCO0VBQ3RCQSxZQUFJRyxLQUFLd04sR0FBTCxDQUFTM04sQ0FBVCxFQUFZLFlBQVosQ0FBSjtFQUNELE9BRkQsTUFFTztFQUNMQSxZQUFLLGNBQWNBLENBQWYsR0FBb0IsWUFBeEI7RUFDRDs7RUFFRCxVQUFJNE4sSUFBSSxjQUFSLEVBQXdCO0VBQ3RCQSxZQUFJek4sS0FBS3dOLEdBQUwsQ0FBU0MsQ0FBVCxFQUFZLFlBQVosQ0FBSjtFQUNELE9BRkQsTUFFTztFQUNMQSxZQUFLLGNBQWNBLENBQWYsR0FBb0IsWUFBeEI7RUFDRDs7RUFFRCxVQUFNVixJQUFJLE1BQU1sTixDQUFOLEdBQVUsRUFBcEI7RUFDQSxVQUFNSyxJQUFJLE9BQU9OLElBQUlDLENBQVgsQ0FBVjtFQUNBLFVBQU1wQyxJQUFJLE9BQU9vQyxJQUFJNE4sQ0FBWCxDQUFWOztFQUVBLGFBQU8sRUFBRVYsSUFBRixFQUFLN00sSUFBTCxFQUFRekMsSUFBUixFQUFQO0VBQ0Q7O0VBRUQ7Ozs7Ozs7Ozs7Ozs7OytCQVdpQnNQLEdBQUc3TSxHQUFHekMsR0FBRztFQUN4QixVQUFJLFFBQU9zUCxDQUFQLHlDQUFPQSxDQUFQLE9BQWEsUUFBakIsRUFBMkI7RUFDekI3TSxZQUFJNk0sRUFBRTdNLENBQU47RUFDQXpDLFlBQUlzUCxFQUFFdFAsQ0FBTjtFQUNBc1AsWUFBSUEsRUFBRUEsQ0FBTjtFQUNEOztFQUVELFVBQUlsTixJQUFJLENBQUNrTixJQUFJLEVBQUwsSUFBVyxHQUFuQjtFQUNBLFVBQUluTixJQUFJQyxJQUFLSyxJQUFJLEdBQWpCO0VBQ0EsVUFBSXVOLElBQUk1TixJQUFLcEMsSUFBSSxHQUFqQjs7RUFFQSxVQUFJbUMsSUFBSSxZQUFSLEVBQXNCO0VBQ3BCQSxZQUFJQSxJQUFJQSxDQUFKLEdBQVFBLENBQVo7RUFDRCxPQUZELE1BRU87RUFDTEEsWUFBSSxnQkFBZ0JBLElBQUksWUFBcEIsQ0FBSjtFQUNEO0VBQ0QsVUFBSUMsSUFBSSxZQUFSLEVBQXNCO0VBQ3BCQSxZQUFJQSxJQUFJQSxDQUFKLEdBQVFBLENBQVo7RUFDRCxPQUZELE1BRU87RUFDTEEsWUFBSSxnQkFBZ0JBLElBQUksWUFBcEIsQ0FBSjtFQUNEO0VBQ0QsVUFBSTROLElBQUksWUFBUixFQUFzQjtFQUNwQkEsWUFBSUEsSUFBSUEsQ0FBSixHQUFRQSxDQUFaO0VBQ0QsT0FGRCxNQUVPO0VBQ0xBLFlBQUksZ0JBQWdCQSxJQUFJLFlBQXBCLENBQUo7RUFDRDs7RUFFRDtFQUNBLGFBQU87RUFDTDdOLFdBQUdBLElBQUksTUFERjtFQUVMQyxXQUFHQSxJQUFJLEtBRkY7RUFHTDROLFdBQUdBLElBQUk7RUFIRixPQUFQO0VBS0Q7O0VBRUQ7Ozs7Ozs7Ozs7Ozs7OytCQVdpQmxRLEdBQUdDLEdBQUdDLEdBQUc7RUFDeEIsVUFBSSxRQUFPRixDQUFQLHlDQUFPQSxDQUFQLE9BQWEsUUFBakIsRUFBMkI7RUFDekJDLFlBQUlELEVBQUVDLENBQU47RUFDQUMsWUFBSUYsRUFBRUUsQ0FBTjtFQUNBRixZQUFJQSxFQUFFQSxDQUFOO0VBQ0Q7O0VBRUQsVUFBTXNRLE1BQU0sS0FBS0MsUUFBTCxDQUFjdlEsQ0FBZCxFQUFpQkMsQ0FBakIsRUFBb0JDLENBQXBCLENBQVo7RUFDQSxhQUFPLEtBQUtzUSxRQUFMLENBQWNGLEdBQWQsQ0FBUDtFQUNEOzs7OztFQ3piSDs7Ozs7O01BTXFCRzs7Ozs7Ozs7RUFDbkI7Ozs7Ozs7Ozs7OytCQVdpQkMsSUFBSUMsSUFBSUMsSUFBSUMsSUFBSTtFQUMvQixhQUFPcE8sS0FBS21GLElBQUwsQ0FBVW5GLEtBQUt3TixHQUFMLENBQVNXLEtBQUtGLEVBQWQsRUFBa0IsQ0FBbEIsSUFBdUJqTyxLQUFLd04sR0FBTCxDQUFTWSxLQUFLRixFQUFkLEVBQWtCLENBQWxCLENBQWpDLENBQVA7RUFDRDs7RUFFRDs7Ozs7Ozs7Ozs7OztrQ0FVb0I1SSxLQUFLRCxLQUF1QjtFQUFBLFVBQWxCZ0osUUFBa0IsdUVBQVAsS0FBTzs7RUFDOUMsVUFBTUMsT0FBT2hKLE1BQU90RixLQUFLdU8sTUFBTCxNQUFpQmxKLE1BQU1DLEdBQXZCLENBQXBCO0VBQ0EsVUFBSStJLFFBQUosRUFBYztFQUNaLGVBQU9DLEtBQUtFLE9BQUwsQ0FBYUgsUUFBYixDQUFQO0VBQ0QsT0FGRCxNQUVPO0VBQ0wsZUFBT3JPLEtBQUt5TyxLQUFMLENBQVdILElBQVgsQ0FBUDtFQUNEO0VBQ0Y7O0VBRUQ7Ozs7Ozs7Ozs7O2dDQVFrQjNOLE1BQU07RUFDdEIsYUFBUSxRQUFRQSxLQUFLcEQsQ0FBZCxHQUFvQixRQUFRb0QsS0FBS25ELENBQWpDLEdBQXVDLFFBQVFtRCxLQUFLbEQsQ0FBM0Q7RUFDRDs7RUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQWVlaVIsZUFBOEM7RUFBQSxVQUEvQkMsUUFBK0IsdUVBQXBCLENBQW9CO0VBQUEsVUFBakJDLFNBQWlCLHVFQUFMLEdBQUs7O0VBQzNELFVBQUlGLGNBQWMvUixNQUFkLEdBQXVCLENBQTNCLEVBQThCO0VBQzVCLGNBQU0sSUFBSXdELEtBQUosQ0FBVSx1Q0FBVixDQUFOO0VBQ0Q7O0VBRUQsVUFBSTBPLFNBQVMsRUFBYjtFQUNBLFVBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFDNU8sQ0FBRCxFQUFJekMsQ0FBSixFQUFPNFAsQ0FBUDtFQUFBLGVBQWFuTixLQUFLLElBQUltTixDQUFULElBQWM1UCxJQUFJNFAsQ0FBL0I7RUFBQSxPQUFiO0VBQ0EsVUFBTTBCLFFBQVEsU0FBUkEsS0FBUSxDQUFDN08sQ0FBRCxFQUFJb0YsR0FBSixFQUFTRCxHQUFUO0VBQUEsZUFBaUJyRixLQUFLc0YsR0FBTCxDQUFTdEYsS0FBS3FGLEdBQUwsQ0FBU25GLENBQVQsRUFBWW9GLEdBQVosQ0FBVCxFQUEyQkQsR0FBM0IsQ0FBakI7RUFBQSxPQUFkOztFQUVBLFdBQUssSUFBSTFLLElBQUksQ0FBYixFQUFnQkEsSUFBSSxJQUFwQixFQUEwQkEsR0FBMUIsRUFBK0I7RUFDN0IsWUFBSTBTLElBQUkxUyxJQUFJLElBQVo7RUFDQSxZQUFJcVUsT0FBT04sYUFBWDs7RUFFQSxlQUFPTSxLQUFLclMsTUFBTCxHQUFjLENBQXJCLEVBQXdCO0VBQ3RCLGNBQU1zUyxPQUFPLEVBQWI7RUFDQSxlQUFLLElBQUl2UixJQUFJLENBQWIsRUFBZ0JBLEtBQUtzUixLQUFLclMsTUFBTCxHQUFjLENBQW5DLEVBQXNDZSxHQUF0QyxFQUEyQztFQUN6Q3VSLGlCQUFLM1EsSUFBTCxDQUFVLENBQ1J3USxLQUFLRSxLQUFLdFIsQ0FBTCxFQUFRLENBQVIsQ0FBTCxFQUFpQnNSLEtBQUt0UixJQUFJLENBQVQsRUFBWSxDQUFaLENBQWpCLEVBQWlDMlAsQ0FBakMsQ0FEUSxFQUVSeUIsS0FBS0UsS0FBS3RSLENBQUwsRUFBUSxDQUFSLENBQUwsRUFBaUJzUixLQUFLdFIsSUFBSSxDQUFULEVBQVksQ0FBWixDQUFqQixFQUFpQzJQLENBQWpDLENBRlEsQ0FBVjtFQUlEO0VBQ0QyQixpQkFBT0MsSUFBUDtFQUNEOztFQUVESixlQUFPN08sS0FBS3lPLEtBQUwsQ0FBV08sS0FBSyxDQUFMLEVBQVEsQ0FBUixDQUFYLENBQVAsSUFBaUNoUCxLQUFLeU8sS0FBTCxDQUFXTSxNQUFNQyxLQUFLLENBQUwsRUFBUSxDQUFSLENBQU4sRUFBa0JMLFFBQWxCLEVBQTRCQyxTQUE1QixDQUFYLENBQWpDO0VBQ0Q7O0VBRUQsVUFBTU0sT0FBT1IsY0FBY0EsY0FBYy9SLE1BQWQsR0FBdUIsQ0FBckMsRUFBd0MsQ0FBeEMsQ0FBYjtFQUNBa1MsZUFBU2IsVUFBVW1CLGFBQVYsQ0FBd0JOLE1BQXhCLEVBQWdDSyxJQUFoQyxDQUFUOztFQUVBO0VBQ0EsVUFBSSxDQUFDTCxPQUFPSyxJQUFQLENBQUwsRUFBbUI7RUFDakJMLGVBQU9LLElBQVAsSUFBZUwsT0FBT0ssT0FBTyxDQUFkLENBQWY7RUFDRDs7RUFFRCxhQUFPTCxNQUFQO0VBQ0Q7O0VBRUQ7Ozs7Ozs7Ozs7OztvQ0FTc0JPLFFBQVFGLE1BQU07RUFDbEM7RUFDQTtFQUNBLFVBQUluVSxPQUFPc1UsSUFBUCxDQUFZRCxNQUFaLEVBQW9CelMsTUFBcEIsR0FBNkJ1UyxPQUFPLENBQXhDLEVBQTJDO0VBQ3pDLFlBQU1JLE1BQU0sRUFBWjtFQUNBLFlBQUlDLGtCQUFKO0VBQUEsWUFBZUMsbUJBQWY7RUFDQSxhQUFLLElBQUk3VSxJQUFJLENBQWIsRUFBZ0JBLEtBQUt1VSxJQUFyQixFQUEyQnZVLEdBQTNCLEVBQWdDO0VBQzlCLGNBQUl5VSxPQUFPelUsQ0FBUCxDQUFKLEVBQWU7RUFDYjJVLGdCQUFJM1UsQ0FBSixJQUFTeVUsT0FBT3pVLENBQVAsQ0FBVDtFQUNELFdBRkQsTUFFTztFQUNMNFUsd0JBQVksQ0FBQzVVLElBQUksQ0FBTCxFQUFRMlUsSUFBSTNVLElBQUksQ0FBUixDQUFSLENBQVo7RUFDQTtFQUNBO0VBQ0EsaUJBQUssSUFBSStDLElBQUkvQyxDQUFiLEVBQWdCK0MsS0FBS3dSLElBQXJCLEVBQTJCeFIsR0FBM0IsRUFBZ0M7RUFDOUIsa0JBQUkwUixPQUFPMVIsQ0FBUCxDQUFKLEVBQWU7RUFDYjhSLDZCQUFhLENBQUM5UixDQUFELEVBQUkwUixPQUFPMVIsQ0FBUCxDQUFKLENBQWI7RUFDQTtFQUNEO0VBQ0Y7RUFDRDRSLGdCQUFJM1UsQ0FBSixJQUFTNFUsVUFBVSxDQUFWLElBQWdCLENBQUNDLFdBQVcsQ0FBWCxJQUFnQkQsVUFBVSxDQUFWLENBQWpCLEtBQWtDQyxXQUFXLENBQVgsSUFBZ0JELFVBQVUsQ0FBVixDQUFsRCxDQUFELElBQXFFNVUsSUFBSTRVLFVBQVUsQ0FBVixDQUF6RSxDQUF4QjtFQUNEO0VBQ0Y7RUFDRCxlQUFPRCxHQUFQO0VBQ0Q7RUFDRCxhQUFPRixNQUFQO0VBQ0Q7Ozs7O0VDNUlIOztFQUtBOzs7Ozs7QUFNQSxFQUFlLFNBQVNLLGNBQVQsQ0FBeUJsUixNQUF6QixFQUFpQztFQUM5Qzs7Ozs7RUFLQUEsU0FBT29PLFFBQVAsQ0FBZ0IsV0FBaEIsRUFBNkIsWUFBbUI7RUFDOUMsUUFBSStDLGNBQUo7RUFDQSxRQUFJLFVBQUsvUyxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0VBQ3JCK1MsY0FBUTlDLFFBQVErQyxRQUFSLGtEQUFSO0VBQ0QsS0FGRCxNQUVPO0VBQ0xELGNBQVE7RUFDTm5TLDJEQURNO0VBRU5DLDJEQUZNO0VBR05DO0VBSE0sT0FBUjtFQUtEO0VBQ0QsU0FBS21TLE9BQUwsQ0FBYSxXQUFiLEVBQTBCLFVBQUNqUCxJQUFELEVBQVU7RUFDbENBLFdBQUtwRCxDQUFMLEdBQVNtUyxNQUFNblMsQ0FBZjtFQUNBb0QsV0FBS25ELENBQUwsR0FBU2tTLE1BQU1sUyxDQUFmO0VBQ0FtRCxXQUFLbEQsQ0FBTCxHQUFTaVMsTUFBTWpTLENBQWY7RUFDQWtELFdBQUtULENBQUwsR0FBUyxHQUFUO0VBQ0EsYUFBT1MsSUFBUDtFQUNELEtBTkQ7RUFPRCxHQWxCRDs7RUFvQkE7Ozs7O0VBS0FwQyxTQUFPb08sUUFBUCxDQUFnQixZQUFoQixFQUE4QixVQUFVMUgsTUFBVixFQUFrQjtFQUM5Q0EsYUFBU2pGLEtBQUtDLEtBQUwsQ0FBVyxPQUFPZ0YsU0FBUyxHQUFoQixDQUFYLENBQVQ7RUFDQSxTQUFLMkssT0FBTCxDQUFhLFlBQWIsRUFBMkIsVUFBQ2pQLElBQUQsRUFBVTtFQUNuQ0EsV0FBS3BELENBQUwsSUFBVTBILE1BQVY7RUFDQXRFLFdBQUtuRCxDQUFMLElBQVV5SCxNQUFWO0VBQ0F0RSxXQUFLbEQsQ0FBTCxJQUFVd0gsTUFBVjtFQUNBLGFBQU90RSxJQUFQO0VBQ0QsS0FMRDtFQU1ELEdBUkQ7O0VBVUE7Ozs7OztFQU1BcEMsU0FBT29PLFFBQVAsQ0FBZ0IsWUFBaEIsRUFBOEIsVUFBVTFILE1BQVYsRUFBa0I7RUFDOUNBLGNBQVUsQ0FBQyxJQUFYO0VBQ0EsU0FBSzJLLE9BQUwsQ0FBYSxZQUFiLEVBQTJCLFVBQUNqUCxJQUFELEVBQVU7RUFDbkMsVUFBTTBFLE1BQU1yRixLQUFLcUYsR0FBTCxDQUFTMUUsS0FBS3BELENBQWQsRUFBaUJvRCxLQUFLbkQsQ0FBdEIsRUFBeUJtRCxLQUFLbEQsQ0FBOUIsQ0FBWjs7RUFFQSxVQUFJa0QsS0FBS3BELENBQUwsS0FBVzhILEdBQWYsRUFBb0I7RUFDbEIxRSxhQUFLcEQsQ0FBTCxJQUFVLENBQUM4SCxNQUFNMUUsS0FBS3BELENBQVosSUFBaUIwSCxNQUEzQjtFQUNEO0VBQ0QsVUFBSXRFLEtBQUtuRCxDQUFMLEtBQVc2SCxHQUFmLEVBQW9CO0VBQ2xCMUUsYUFBS25ELENBQUwsSUFBVSxDQUFDNkgsTUFBTTFFLEtBQUtuRCxDQUFaLElBQWlCeUgsTUFBM0I7RUFDRDtFQUNELFVBQUl0RSxLQUFLbEQsQ0FBTCxLQUFXNEgsR0FBZixFQUFvQjtFQUNsQjFFLGFBQUtsRCxDQUFMLElBQVUsQ0FBQzRILE1BQU0xRSxLQUFLbEQsQ0FBWixJQUFpQndILE1BQTNCO0VBQ0Q7O0VBRUQsYUFBT3RFLElBQVA7RUFDRCxLQWREO0VBZUQsR0FqQkQ7O0VBbUJBOzs7Ozs7O0VBT0FwQyxTQUFPb08sUUFBUCxDQUFnQixVQUFoQixFQUE0QixVQUFVMUgsTUFBVixFQUFrQjtFQUM1Q0EsY0FBVSxDQUFDLENBQVg7RUFDQSxTQUFLMkssT0FBTCxDQUFhLFVBQWIsRUFBeUIsVUFBQ2pQLElBQUQsRUFBVTtFQUNqQyxVQUFNMEUsTUFBTXJGLEtBQUtxRixHQUFMLENBQVMxRSxLQUFLcEQsQ0FBZCxFQUFpQm9ELEtBQUtuRCxDQUF0QixFQUF5Qm1ELEtBQUtsRCxDQUE5QixDQUFaO0VBQ0EsVUFBTW9TLE1BQU0sQ0FBQ2xQLEtBQUtwRCxDQUFMLEdBQVNvRCxLQUFLbkQsQ0FBZCxHQUFrQm1ELEtBQUtsRCxDQUF4QixJQUE2QixDQUF6QztFQUNBLFVBQU1xUyxNQUFROVAsS0FBSytQLEdBQUwsQ0FBUzFLLE1BQU13SyxHQUFmLElBQXNCLENBQXRCLEdBQTBCLEdBQTNCLEdBQWtDNUssTUFBbkMsR0FBNkMsR0FBekQ7O0VBRUEsVUFBSXRFLEtBQUtwRCxDQUFMLEtBQVc4SCxHQUFmLEVBQW9CO0VBQ2xCMUUsYUFBS3BELENBQUwsSUFBVSxDQUFDOEgsTUFBTTFFLEtBQUtwRCxDQUFaLElBQWlCdVMsR0FBM0I7RUFDRDtFQUNELFVBQUluUCxLQUFLbkQsQ0FBTCxLQUFXNkgsR0FBZixFQUFvQjtFQUNsQjFFLGFBQUtuRCxDQUFMLElBQVUsQ0FBQzZILE1BQU0xRSxLQUFLbkQsQ0FBWixJQUFpQnNTLEdBQTNCO0VBQ0Q7RUFDRCxVQUFJblAsS0FBS2xELENBQUwsS0FBVzRILEdBQWYsRUFBb0I7RUFDbEIxRSxhQUFLbEQsQ0FBTCxJQUFVLENBQUM0SCxNQUFNMUUsS0FBS2xELENBQVosSUFBaUJxUyxHQUEzQjtFQUNEOztFQUVELGFBQU9uUCxJQUFQO0VBQ0QsS0FoQkQ7RUFpQkQsR0FuQkQ7O0VBcUJBOzs7OztFQUtBcEMsU0FBT29PLFFBQVAsQ0FBZ0IsV0FBaEIsRUFBNkIsWUFBWTtFQUN2QyxTQUFLaUQsT0FBTCxDQUFhLFdBQWIsRUFBMEIsVUFBQ2pQLElBQUQsRUFBVTtFQUNsQyxVQUFNa1AsTUFBTTdCLFVBQVVnQyxTQUFWLENBQW9CclAsSUFBcEIsQ0FBWjtFQUNBQSxXQUFLcEQsQ0FBTCxHQUFTc1MsR0FBVDtFQUNBbFAsV0FBS25ELENBQUwsR0FBU3FTLEdBQVQ7RUFDQWxQLFdBQUtsRCxDQUFMLEdBQVNvUyxHQUFUO0VBQ0EsYUFBT2xQLElBQVA7RUFDRCxLQU5EO0VBT0QsR0FSRDs7RUFVQTs7Ozs7O0VBTUFwQyxTQUFPb08sUUFBUCxDQUFnQixVQUFoQixFQUE0QixVQUFTMUgsTUFBVCxFQUFpQjtFQUMzQ0EsYUFBU2pGLEtBQUt3TixHQUFMLENBQVMsQ0FBQ3ZJLFNBQVMsR0FBVixJQUFpQixHQUExQixFQUErQixDQUEvQixDQUFUO0VBQ0EsU0FBSzJLLE9BQUwsQ0FBYSxVQUFiLEVBQXlCLFVBQUNqUCxJQUFELEVBQVU7RUFDakM7RUFDQUEsV0FBS3BELENBQUwsSUFBVSxHQUFWO0VBQ0FvRCxXQUFLcEQsQ0FBTCxJQUFVLEdBQVY7RUFDQW9ELFdBQUtwRCxDQUFMLElBQVUwSCxNQUFWO0VBQ0F0RSxXQUFLcEQsQ0FBTCxJQUFVLEdBQVY7RUFDQW9ELFdBQUtwRCxDQUFMLElBQVUsR0FBVjs7RUFFQTtFQUNBb0QsV0FBS25ELENBQUwsSUFBVSxHQUFWO0VBQ0FtRCxXQUFLbkQsQ0FBTCxJQUFVLEdBQVY7RUFDQW1ELFdBQUtuRCxDQUFMLElBQVV5SCxNQUFWO0VBQ0F0RSxXQUFLbkQsQ0FBTCxJQUFVLEdBQVY7RUFDQW1ELFdBQUtuRCxDQUFMLElBQVUsR0FBVjs7RUFFQTtFQUNBbUQsV0FBS2xELENBQUwsSUFBVSxHQUFWO0VBQ0FrRCxXQUFLbEQsQ0FBTCxJQUFVLEdBQVY7RUFDQWtELFdBQUtsRCxDQUFMLElBQVV3SCxNQUFWO0VBQ0F0RSxXQUFLbEQsQ0FBTCxJQUFVLEdBQVY7RUFDQWtELFdBQUtsRCxDQUFMLElBQVUsR0FBVjs7RUFFQSxhQUFPa0QsSUFBUDtFQUNELEtBdkJEO0VBd0JELEdBMUJEOztFQTRCQTs7Ozs7O0VBTUFwQyxTQUFPb08sUUFBUCxDQUFnQixLQUFoQixFQUF1QixVQUFVMUgsTUFBVixFQUFrQjtFQUN2QyxTQUFLMkssT0FBTCxDQUFhLEtBQWIsRUFBb0IsVUFBQ2pQLElBQUQsRUFBVTtFQUM1QixVQUFNc1AsTUFBTXJELFFBQVFzRCxRQUFSLENBQWlCdlAsS0FBS3BELENBQXRCLEVBQXlCb0QsS0FBS25ELENBQTlCLEVBQWlDbUQsS0FBS2xELENBQXRDLENBQVo7O0VBRUEsVUFBSXVQLElBQUlpRCxJQUFJakQsQ0FBSixHQUFRLEdBQWhCO0VBQ0FBLFdBQUtoTixLQUFLK1AsR0FBTCxDQUFTOUssTUFBVCxDQUFMO0VBQ0ErSCxVQUFJQSxJQUFJLEdBQVI7RUFDQUEsV0FBSyxHQUFMO0VBQ0FpRCxVQUFJakQsQ0FBSixHQUFRQSxDQUFSOztFQVA0Qiw4QkFTVkosUUFBUXVELFFBQVIsQ0FBaUJGLElBQUlqRCxDQUFyQixFQUF3QmlELElBQUloRCxDQUE1QixFQUErQmdELElBQUkzQyxDQUFuQyxDQVRVO0VBQUEsVUFTckIvUCxDQVRxQixxQkFTckJBLENBVHFCO0VBQUEsVUFTbEJDLENBVGtCLHFCQVNsQkEsQ0FUa0I7RUFBQSxVQVNmQyxDQVRlLHFCQVNmQSxDQVRlOztFQVU1QmtELFdBQUtwRCxDQUFMLEdBQVNBLENBQVQ7RUFDQW9ELFdBQUtuRCxDQUFMLEdBQVNBLENBQVQ7RUFDQW1ELFdBQUtsRCxDQUFMLEdBQVNBLENBQVQ7O0VBRUEsYUFBT2tELElBQVA7RUFDRCxLQWZEO0VBZ0JELEdBakJEOztFQW1CQTs7Ozs7RUFLQXBDLFNBQU9vTyxRQUFQLENBQWdCLFVBQWhCLEVBQTRCLFlBQW1CO0VBQzdDLFFBQUl5RCxZQUFKO0VBQUEsUUFBU0MsY0FBVDtFQUNBLFFBQUksVUFBSzFULE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7RUFDckJ5VCxZQUFNeEQsUUFBUStDLFFBQVIsa0RBQU47RUFDQVU7RUFDRCxLQUhELE1BR08sSUFBSSxVQUFLMVQsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtFQUM1QnlULFlBQU07RUFDSjdTLDJEQURJO0VBRUpDLDJEQUZJO0VBR0pDO0VBSEksT0FBTjtFQUtBNFM7RUFDRDs7RUFFRCxTQUFLVCxPQUFMLENBQWEsVUFBYixFQUF5QixVQUFDalAsSUFBRCxFQUFVO0VBQ2pDQSxXQUFLcEQsQ0FBTCxJQUFVLENBQUNvRCxLQUFLcEQsQ0FBTCxHQUFTNlMsSUFBSTdTLENBQWQsS0FBb0I4UyxRQUFRLEdBQTVCLENBQVY7RUFDQTFQLFdBQUtuRCxDQUFMLElBQVUsQ0FBQ21ELEtBQUtuRCxDQUFMLEdBQVM0UyxJQUFJNVMsQ0FBZCxLQUFvQjZTLFFBQVEsR0FBNUIsQ0FBVjtFQUNBMVAsV0FBS2xELENBQUwsSUFBVSxDQUFDa0QsS0FBS2xELENBQUwsR0FBUzJTLElBQUkzUyxDQUFkLEtBQW9CNFMsUUFBUSxHQUE1QixDQUFWO0VBQ0EsYUFBTzFQLElBQVA7RUFDRCxLQUxEO0VBTUQsR0FwQkQ7O0VBc0JBOzs7O0VBSUFwQyxTQUFPb08sUUFBUCxDQUFnQixRQUFoQixFQUEwQixZQUFZO0VBQ3BDLFNBQUtpRCxPQUFMLENBQWEsUUFBYixFQUF1QixVQUFDalAsSUFBRCxFQUFVO0VBQy9CQSxXQUFLcEQsQ0FBTCxHQUFTLE1BQU1vRCxLQUFLcEQsQ0FBcEI7RUFDQW9ELFdBQUtuRCxDQUFMLEdBQVMsTUFBTW1ELEtBQUtuRCxDQUFwQjtFQUNBbUQsV0FBS2xELENBQUwsR0FBUyxNQUFNa0QsS0FBS2xELENBQXBCO0VBQ0EsYUFBT2tELElBQVA7RUFDRCxLQUxEO0VBTUQsR0FQRDs7RUFTQTs7Ozs7RUFLQXBDLFNBQU9vTyxRQUFQLENBQWdCLE9BQWhCLEVBQXlCLFlBQXdCO0VBQUEsUUFBZDFILE1BQWMsdUVBQUwsR0FBSzs7RUFDL0NBLGNBQVUsR0FBVjtFQUNBLFNBQUsySyxPQUFMLENBQWEsT0FBYixFQUFzQixVQUFDalAsSUFBRCxFQUFVO0VBQzlCO0VBQ0E7RUFDQTtFQUNBQSxXQUFLcEQsQ0FBTCxHQUFTeUMsS0FBS3NGLEdBQUwsQ0FBUyxHQUFULEVBQWUzRSxLQUFLcEQsQ0FBTCxJQUFVLElBQUssUUFBUTBILE1BQXZCLENBQUQsR0FBcUN0RSxLQUFLbkQsQ0FBTCxJQUFVLFFBQVF5SCxNQUFsQixDQUFyQyxHQUFtRXRFLEtBQUtsRCxDQUFMLElBQVUsUUFBUXdILE1BQWxCLENBQWpGLENBQVQ7RUFDQXRFLFdBQUtuRCxDQUFMLEdBQVN3QyxLQUFLc0YsR0FBTCxDQUFTLEdBQVQsRUFBZTNFLEtBQUtwRCxDQUFMLElBQVUsUUFBUTBILE1BQWxCLENBQUQsR0FBK0J0RSxLQUFLbkQsQ0FBTCxJQUFVLElBQUssUUFBUXlILE1BQXZCLENBQS9CLEdBQW1FdEUsS0FBS2xELENBQUwsSUFBVSxRQUFRd0gsTUFBbEIsQ0FBakYsQ0FBVDtFQUNBdEUsV0FBS2xELENBQUwsR0FBU3VDLEtBQUtzRixHQUFMLENBQVMsR0FBVCxFQUFlM0UsS0FBS3BELENBQUwsSUFBVSxRQUFRMEgsTUFBbEIsQ0FBRCxHQUErQnRFLEtBQUtuRCxDQUFMLElBQVUsUUFBUXlILE1BQWxCLENBQS9CLEdBQTZEdEUsS0FBS2xELENBQUwsSUFBVSxJQUFLLFFBQVF3SCxNQUF2QixDQUEzRSxDQUFUO0VBQ0EsYUFBT3RFLElBQVA7RUFDRCxLQVJEO0VBU0QsR0FYRDs7RUFhQTs7Ozs7O0VBTUFwQyxTQUFPb08sUUFBUCxDQUFnQixPQUFoQixFQUF5QixVQUFVMUgsTUFBVixFQUFrQjtFQUN6QyxTQUFLMkssT0FBTCxDQUFhLE9BQWIsRUFBc0IsVUFBQ2pQLElBQUQsRUFBVTtFQUM5QkEsV0FBS3BELENBQUwsR0FBU3lDLEtBQUt3TixHQUFMLENBQVM3TSxLQUFLcEQsQ0FBTCxHQUFTLEdBQWxCLEVBQXVCMEgsTUFBdkIsSUFBaUMsR0FBMUM7RUFDQXRFLFdBQUtuRCxDQUFMLEdBQVN3QyxLQUFLd04sR0FBTCxDQUFTN00sS0FBS25ELENBQUwsR0FBUyxHQUFsQixFQUF1QnlILE1BQXZCLElBQWlDLEdBQTFDO0VBQ0F0RSxXQUFLbEQsQ0FBTCxHQUFTdUMsS0FBS3dOLEdBQUwsQ0FBUzdNLEtBQUtsRCxDQUFMLEdBQVMsR0FBbEIsRUFBdUJ3SCxNQUF2QixJQUFpQyxHQUExQztFQUNBLGFBQU90RSxJQUFQO0VBQ0QsS0FMRDtFQU1ELEdBUEQ7O0VBU0E7Ozs7RUFJQXBDLFNBQU9vTyxRQUFQLENBQWdCLE9BQWhCLEVBQXlCLFVBQVUxSCxNQUFWLEVBQWtCO0VBQ3pDQSxhQUFTakYsS0FBSytQLEdBQUwsQ0FBUzlLLE1BQVQsSUFBbUIsSUFBNUI7O0VBRUEsU0FBSzJLLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLFVBQUNqUCxJQUFELEVBQVU7RUFDOUIsVUFBTTJOLE9BQU9OLFVBQVVzQyxXQUFWLENBQXNCckwsU0FBUyxDQUFDLENBQWhDLEVBQW1DQSxNQUFuQyxDQUFiO0VBQ0F0RSxXQUFLcEQsQ0FBTCxJQUFVK1EsSUFBVjtFQUNBM04sV0FBS25ELENBQUwsSUFBVThRLElBQVY7RUFDQTNOLFdBQUtsRCxDQUFMLElBQVU2USxJQUFWO0VBQ0EsYUFBTzNOLElBQVA7RUFDRCxLQU5EO0VBT0QsR0FWRDs7RUFZQTs7Ozs7RUFLQXBDLFNBQU9vTyxRQUFQLENBQWdCLE1BQWhCLEVBQXdCLFVBQVUxSCxNQUFWLEVBQWtCO0VBQ3hDQSxhQUFTakYsS0FBSytQLEdBQUwsQ0FBUzlLLE1BQVQsSUFBbUIsSUFBNUI7O0VBRUEsU0FBSzJLLE9BQUwsQ0FBYSxNQUFiLEVBQXFCLFVBQUNqUCxJQUFELEVBQVU7RUFDN0IsVUFBSUEsS0FBS3BELENBQUwsR0FBUyxNQUFNMEgsTUFBbkIsRUFBMkI7RUFDekJ0RSxhQUFLcEQsQ0FBTCxHQUFTLEdBQVQ7RUFDRCxPQUZELE1BRU8sSUFBSW9ELEtBQUtwRCxDQUFMLEdBQVMwSCxNQUFiLEVBQXFCO0VBQzFCdEUsYUFBS3BELENBQUwsR0FBUyxDQUFUO0VBQ0Q7O0VBRUQsVUFBSW9ELEtBQUtuRCxDQUFMLEdBQVMsTUFBTXlILE1BQW5CLEVBQTJCO0VBQ3pCdEUsYUFBS25ELENBQUwsR0FBUyxHQUFUO0VBQ0QsT0FGRCxNQUVPLElBQUltRCxLQUFLbkQsQ0FBTCxHQUFTeUgsTUFBYixFQUFxQjtFQUMxQnRFLGFBQUtuRCxDQUFMLEdBQVMsQ0FBVDtFQUNEOztFQUVELFVBQUltRCxLQUFLbEQsQ0FBTCxHQUFTLE1BQU13SCxNQUFuQixFQUEyQjtFQUN6QnRFLGFBQUtsRCxDQUFMLEdBQVMsR0FBVDtFQUNELE9BRkQsTUFFTyxJQUFJa0QsS0FBS2xELENBQUwsR0FBU3dILE1BQWIsRUFBcUI7RUFDMUJ0RSxhQUFLbEQsQ0FBTCxHQUFTLENBQVQ7RUFDRDs7RUFFRCxhQUFPa0QsSUFBUDtFQUNELEtBcEJEO0VBcUJELEdBeEJEOztFQTBCQTs7Ozs7Ozs7Ozs7RUFXQXBDLFNBQU9vTyxRQUFQLENBQWdCLFVBQWhCLEVBQTRCLFVBQVVoRyxPQUFWLEVBQW1CO0VBQzdDLFFBQUksUUFBT0EsT0FBUCx5Q0FBT0EsT0FBUCxPQUFtQixRQUF2QixFQUFpQztFQUMvQixhQUFPLElBQVA7RUFDRDtFQUNELFNBQUssSUFBSTRKLElBQVQsSUFBaUI1SixPQUFqQixFQUEwQjtFQUN4QixVQUFJQSxRQUFReEssY0FBUixDQUF1Qm9VLElBQXZCLENBQUosRUFBa0M7RUFDaEMsWUFBSTVKLFFBQVE0SixJQUFSLE1BQWtCLENBQXRCLEVBQXlCO0VBQ3ZCLGlCQUFPNUosUUFBUTRKLElBQVIsQ0FBUDtFQUNBO0VBQ0Q7RUFDRDVKLGdCQUFRNEosSUFBUixLQUFpQixHQUFqQjtFQUNEO0VBQ0Y7RUFDRCxRQUFJNUosUUFBUWhLLE1BQVIsS0FBbUIsQ0FBdkIsRUFBMEI7RUFDeEIsYUFBTyxJQUFQO0VBQ0Q7O0VBRUQsU0FBS2lULE9BQUwsQ0FBYSxVQUFiLEVBQXlCLFVBQUNqUCxJQUFELEVBQVU7RUFDakMsVUFBSWdHLFFBQVE2SixHQUFaLEVBQWlCO0VBQ2YsWUFBSTdKLFFBQVE2SixHQUFSLEdBQWMsQ0FBbEIsRUFBcUI7RUFDbkI3UCxlQUFLcEQsQ0FBTCxJQUFVLENBQUMsTUFBTW9ELEtBQUtwRCxDQUFaLElBQWlCb0osUUFBUTZKLEdBQW5DO0VBQ0QsU0FGRCxNQUVPO0VBQ0w3UCxlQUFLcEQsQ0FBTCxJQUFVb0QsS0FBS3BELENBQUwsR0FBU3lDLEtBQUsrUCxHQUFMLENBQVNwSixRQUFRNkosR0FBakIsQ0FBbkI7RUFDRDtFQUNGO0VBQ0QsVUFBSTdKLFFBQVE4SixLQUFaLEVBQW1CO0VBQ2pCLFlBQUk5SixRQUFROEosS0FBUixHQUFnQixDQUFwQixFQUF1QjtFQUNyQjlQLGVBQUtuRCxDQUFMLElBQVUsQ0FBQyxNQUFNbUQsS0FBS25ELENBQVosSUFBaUJtSixRQUFROEosS0FBbkM7RUFDRCxTQUZELE1BRU87RUFDTDlQLGVBQUtuRCxDQUFMLElBQVVtRCxLQUFLbkQsQ0FBTCxHQUFTd0MsS0FBSytQLEdBQUwsQ0FBU3BKLFFBQVE4SixLQUFqQixDQUFuQjtFQUNEO0VBQ0Y7RUFDRCxVQUFJOUosUUFBUStKLElBQVosRUFBa0I7RUFDaEIsWUFBSS9KLFFBQVErSixJQUFSLEdBQWUsQ0FBbkIsRUFBc0I7RUFDcEIvUCxlQUFLbEQsQ0FBTCxJQUFVLENBQUMsTUFBTWtELEtBQUtsRCxDQUFaLElBQWlCa0osUUFBUStKLElBQW5DO0VBQ0QsU0FGRCxNQUVPO0VBQ0wvUCxlQUFLbEQsQ0FBTCxJQUFVa0QsS0FBS2xELENBQUwsR0FBU3VDLEtBQUsrUCxHQUFMLENBQVNwSixRQUFRK0osSUFBakIsQ0FBbkI7RUFDRDtFQUNGOztFQUVELGFBQU8vUCxJQUFQO0VBQ0QsS0F4QkQ7RUF5QkQsR0ExQ0Q7O0VBNENBOzs7Ozs7Ozs7Ozs7O0VBYUFwQyxTQUFPb08sUUFBUCxDQUFnQixRQUFoQixFQUEwQixVQUFVZ0UsS0FBVixFQUF5QjtFQUFBLHNDQUFMQyxHQUFLO0VBQUxBLFNBQUs7RUFBQTs7RUFDakQsUUFBTUMsT0FBT0QsSUFBSUEsSUFBSWpVLE1BQUosR0FBYSxDQUFqQixDQUFiO0VBQ0EsUUFBSW1VLGFBQUo7RUFDQSxRQUFJLE9BQU9ELElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7RUFDOUJDLGFBQU9ELElBQVA7RUFDQUQsVUFBSWxXLEdBQUo7RUFDRCxLQUhELE1BR08sSUFBSSxPQUFPbVcsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtFQUNuQ0MsYUFBTzlDLFVBQVU2QyxJQUFWLENBQVA7RUFDQUQsVUFBSWxXLEdBQUo7RUFDRCxLQUhNLE1BR0E7RUFDTG9XLGFBQU85QyxVQUFVYSxNQUFqQjtFQUNEOztFQUVEO0VBQ0EsUUFBSSxPQUFPOEIsS0FBUCxLQUFpQixRQUFyQixFQUErQjtFQUM3QkEsY0FBUUEsTUFBTUksS0FBTixDQUFZLEVBQVosQ0FBUjtFQUNEO0VBQ0QsUUFBSUosTUFBTSxDQUFOLE1BQWEsR0FBakIsRUFBc0I7RUFDcEJBLGNBQVEsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsQ0FBUjtFQUNEOztFQUVELFFBQUlDLElBQUlqVSxNQUFKLEdBQWEsQ0FBakIsRUFBb0I7RUFDbEI7RUFDQSxZQUFNLElBQUl3RCxLQUFKLENBQVUsOENBQVYsQ0FBTjtFQUNEOztFQUVEO0VBQ0EsUUFBTTBPLFNBQVNpQyxLQUFLRixHQUFMLEVBQVUsQ0FBVixFQUFhLEdBQWIsQ0FBZjs7RUFFQTtFQUNBO0VBQ0EsUUFBTTdNLFFBQVE2TSxJQUFJLENBQUosQ0FBZDtFQUNBLFFBQUk3TSxNQUFNLENBQU4sSUFBVyxDQUFmLEVBQWtCO0VBQ2hCLFdBQUssSUFBSXBKLElBQUksQ0FBYixFQUFnQkEsSUFBSW9KLE1BQU0sQ0FBTixDQUFwQixFQUE4QnBKLEdBQTlCLEVBQW1DO0VBQ2pDa1UsZUFBT2xVLENBQVAsSUFBWW9KLE1BQU0sQ0FBTixDQUFaO0VBQ0Q7RUFDRjs7RUFFRCxRQUFNQyxNQUFNNE0sSUFBSUEsSUFBSWpVLE1BQUosR0FBYSxDQUFqQixDQUFaO0VBQ0EsUUFBSXFILElBQUksQ0FBSixJQUFTLEdBQWIsRUFBa0I7RUFDaEIsV0FBSyxJQUFJckosS0FBSXFKLElBQUksQ0FBSixDQUFiLEVBQXFCckosTUFBSyxHQUExQixFQUErQkEsSUFBL0IsRUFBb0M7RUFDbENrVSxlQUFPbFUsRUFBUCxJQUFZcUosSUFBSSxDQUFKLENBQVo7RUFDRDtFQUNGOztFQUVELFNBQUs0TCxPQUFMLENBQWEsUUFBYixFQUF1QixVQUFDalAsSUFBRCxFQUFVO0VBQy9CO0VBQ0E7RUFDQSxXQUFLLElBQUloRyxNQUFJLENBQWIsRUFBZ0JBLE1BQUlnVyxNQUFNaFUsTUFBMUIsRUFBa0NoQyxLQUFsQyxFQUF1QztFQUNyQ2dHLGFBQUtnUSxNQUFNaFcsR0FBTixDQUFMLElBQWlCa1UsT0FBT2xPLEtBQUtnUSxNQUFNaFcsR0FBTixDQUFMLENBQVAsQ0FBakI7RUFDRDtFQUNELGFBQU9nRyxJQUFQO0VBQ0QsS0FQRDtFQVFELEdBckREOztFQXVEQTs7Ozs7RUFLQXBDLFNBQU9vTyxRQUFQLENBQWdCLFVBQWhCLEVBQTRCLFVBQVUxSCxNQUFWLEVBQWtCO0VBQzVDLFFBQU1TLElBQUkxRixLQUFLK1AsR0FBTCxDQUFTOUssTUFBVCxJQUFtQixHQUE3Qjs7RUFFQSxRQUFJK0wsUUFBUSxDQUFDLENBQUQsRUFBSSxNQUFNdEwsQ0FBVixDQUFaO0VBQ0EsUUFBSXVMLFFBQVEsQ0FBQyxNQUFPLE1BQU12TCxDQUFkLEVBQWtCLEdBQWxCLENBQVo7O0VBRUEsUUFBSVQsU0FBUyxDQUFiLEVBQWdCO0VBQ2QrTCxjQUFRQSxNQUFNRSxPQUFOLEVBQVI7RUFDQUQsY0FBUUEsTUFBTUMsT0FBTixFQUFSO0VBQ0Q7RUFDRCxTQUFLQyxNQUFMLENBQVksS0FBWixFQUFtQixDQUFDLENBQUQsRUFBSSxDQUFKLENBQW5CLEVBQTJCSCxLQUEzQixFQUFrQ0MsS0FBbEMsRUFBeUMsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUF6QztFQUNELEdBWEQ7RUFZRDs7RUNuYkQsSUFBTUcsa0JBQWtCO0VBQ3RCQyxZQURzQixzQkFDVjFRLElBRFUsRUFDSm1QLEdBREksRUFDQzFULElBREQsRUFDTztFQUMzQnVFLFNBQUtwRCxDQUFMLEdBQVNvRCxLQUFLcEQsQ0FBTCxHQUFVb0QsS0FBS3BELENBQUwsR0FBU3VTLEdBQVQsR0FBZTFULEtBQUtrVixRQUF2QztFQUNBM1EsU0FBS25ELENBQUwsR0FBU21ELEtBQUtuRCxDQUFMLEdBQVVtRCxLQUFLbkQsQ0FBTCxHQUFTc1MsR0FBVCxHQUFlMVQsS0FBS2tWLFFBQXZDO0VBQ0EzUSxTQUFLbEQsQ0FBTCxHQUFTa0QsS0FBS2xELENBQUwsR0FBVWtELEtBQUtsRCxDQUFMLEdBQVNxUyxHQUFULEdBQWUxVCxLQUFLa1YsUUFBdkM7RUFDQSxXQUFPM1EsSUFBUDtFQUNELEdBTnFCO0VBT3RCNFEsT0FQc0IsaUJBT2Y1USxJQVBlLEVBT1RtUCxHQVBTLEVBT0oxVCxJQVBJLEVBT0U7RUFDdEJ1RSxTQUFLcEQsQ0FBTCxHQUFTeUMsS0FBS3dOLEdBQUwsQ0FBUzdNLEtBQUtwRCxDQUFMLEdBQVMsR0FBbEIsRUFBdUJ5QyxLQUFLcUYsR0FBTCxDQUFTLEtBQUt5SyxHQUFMLEdBQVcxVCxLQUFLa1YsUUFBekIsRUFBbUMsQ0FBbkMsQ0FBdkIsSUFBZ0UsR0FBekU7RUFDQTNRLFNBQUtuRCxDQUFMLEdBQVN3QyxLQUFLd04sR0FBTCxDQUFTN00sS0FBS25ELENBQUwsR0FBUyxHQUFsQixFQUF1QndDLEtBQUtxRixHQUFMLENBQVMsS0FBS3lLLEdBQUwsR0FBVzFULEtBQUtrVixRQUF6QixFQUFtQyxDQUFuQyxDQUF2QixJQUFnRSxHQUF6RTtFQUNBM1EsU0FBS2xELENBQUwsR0FBU3VDLEtBQUt3TixHQUFMLENBQVM3TSxLQUFLbEQsQ0FBTCxHQUFTLEdBQWxCLEVBQXVCdUMsS0FBS3FGLEdBQUwsQ0FBUyxLQUFLeUssR0FBTCxHQUFXMVQsS0FBS2tWLFFBQXpCLEVBQW1DLENBQW5DLENBQXZCLElBQWdFLEdBQXpFO0VBQ0EsV0FBTzNRLElBQVA7RUFDRCxHQVpxQjtFQWF0QjZRLFVBYnNCLG9CQWFaN1EsSUFiWSxFQWFObVAsR0FiTSxFQWFEMVQsSUFiQyxFQWFLO0VBQ3pCdUUsU0FBS3BELENBQUwsSUFBVSxDQUFDb0QsS0FBS3BELENBQUwsR0FBU25CLEtBQUtzVCxLQUFMLENBQVduUyxDQUFyQixJQUEwQnVTLEdBQXBDO0VBQ0FuUCxTQUFLbkQsQ0FBTCxJQUFVLENBQUNtRCxLQUFLbkQsQ0FBTCxHQUFTcEIsS0FBS3NULEtBQUwsQ0FBV2xTLENBQXJCLElBQTBCc1MsR0FBcEM7RUFDQW5QLFNBQUtsRCxDQUFMLElBQVUsQ0FBQ2tELEtBQUtsRCxDQUFMLEdBQVNyQixLQUFLc1QsS0FBTCxDQUFXalMsQ0FBckIsSUFBMEJxUyxHQUFwQztFQUNBLFdBQU9uUCxJQUFQO0VBQ0Q7RUFsQnFCLENBQXhCOztFQXFCQTs7Ozs7O0FBTUEsRUFBZSxTQUFTOFEsb0JBQVQsQ0FBK0JsVCxNQUEvQixFQUF1QztFQUNwREEsU0FBT29PLFFBQVAsQ0FBZ0IsVUFBaEIsRUFBNEIsVUFBVStFLElBQVYsRUFBK0I7RUFBQSxRQUFmSixRQUFlLHVFQUFKLEVBQUk7O0VBQ3pELFFBQUl6QyxlQUFKO0VBQUEsUUFBWThDLGVBQVo7RUFBQSxRQUFvQjNOLFlBQXBCO0VBQUEsUUFBeUJELGNBQXpCOztFQUVBLFFBQUksT0FBTzJOLElBQVAsS0FBZ0IsUUFBaEIsSUFBNEJBLEtBQUs1RSxNQUFMLENBQVksQ0FBQyxDQUFiLE1BQW9CLEdBQXBELEVBQXlEO0VBQ3ZELFVBQUksS0FBSzFNLFVBQUwsQ0FBZ0JDLE1BQWhCLEdBQXlCLEtBQUtELFVBQUwsQ0FBZ0JOLEtBQTdDLEVBQW9EO0VBQ2xENFIsZUFBTyxLQUFLdFIsVUFBTCxDQUFnQk4sS0FBaEIsSUFBeUJ5SSxTQUFTbUosS0FBSzVFLE1BQUwsQ0FBWSxDQUFaLEVBQWU0RSxLQUFLL1UsTUFBTCxHQUFjLENBQTdCLENBQVQsRUFBMEMsRUFBMUMsSUFBZ0QsR0FBekUsQ0FBUDtFQUNELE9BRkQsTUFFTztFQUNMK1UsZUFBTyxLQUFLdFIsVUFBTCxDQUFnQkMsTUFBaEIsSUFBMEJrSSxTQUFTbUosS0FBSzVFLE1BQUwsQ0FBWSxDQUFaLEVBQWU0RSxLQUFLL1UsTUFBTCxHQUFjLENBQTdCLENBQVQsRUFBMEMsRUFBMUMsSUFBZ0QsR0FBMUUsQ0FBUDtFQUNEO0VBQ0Y7RUFDRDJVLGdCQUFZLEdBQVo7RUFDQUssYUFBUyxDQUFDLEtBQUt2UixVQUFMLENBQWdCTixLQUFoQixHQUF3QixDQUF6QixFQUE0QixLQUFLTSxVQUFMLENBQWdCQyxNQUFoQixHQUF5QixDQUFyRCxDQUFUO0VBQ0EwRCxZQUFRL0QsS0FBS21GLElBQUwsQ0FBVW5GLEtBQUt3TixHQUFMLENBQVNtRSxPQUFPLENBQVAsQ0FBVCxFQUFvQixDQUFwQixJQUF5QjNSLEtBQUt3TixHQUFMLENBQVNtRSxPQUFPLENBQVAsQ0FBVCxFQUFvQixDQUFwQixDQUFuQyxDQUFSO0VBQ0EzTixVQUFNRCxRQUFRMk4sSUFBZDtFQUNBN0MsYUFBU2IsVUFBVWEsTUFBVixDQUFpQixDQUFDLENBQUQsRUFBSSxDQUFKLENBQWpCLEVBQXlCLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBekIsRUFBbUMsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUFuQyxFQUE2QyxDQUFDLEdBQUQsRUFBTSxFQUFOLENBQTdDLENBQVQ7RUFDQSxTQUFLZSxPQUFMLENBQWEsVUFBYixFQUF5QixVQUFValAsSUFBVixFQUFnQjtFQUN2QyxVQUFJaVIsSUFBSixFQUFVQyxHQUFWLEVBQWU5UixHQUFmO0VBQ0FBLFlBQU1ZLEtBQUttUixVQUFMLEVBQU47RUFDQUYsYUFBTzVELFVBQVUrRCxRQUFWLENBQW1CaFMsSUFBSUgsQ0FBdkIsRUFBMEJHLElBQUlGLENBQTlCLEVBQWlDOFIsT0FBTyxDQUFQLENBQWpDLEVBQTRDQSxPQUFPLENBQVAsQ0FBNUMsQ0FBUDtFQUNBLFVBQUlDLE9BQU81TixHQUFYLEVBQWdCO0VBQ2Q2TixjQUFNN1IsS0FBS3FGLEdBQUwsQ0FBUyxDQUFULEVBQWF3SixPQUFPN08sS0FBS3lPLEtBQUwsQ0FBWSxDQUFDbUQsT0FBTzVOLEdBQVIsSUFBZTBOLElBQWhCLEdBQXdCLEdBQW5DLENBQVAsSUFBa0QsRUFBbkQsR0FBeURKLFFBQXJFLENBQU47RUFDQTNRLGFBQUtwRCxDQUFMLEdBQVN5QyxLQUFLd04sR0FBTCxDQUFTN00sS0FBS3BELENBQUwsR0FBUyxHQUFsQixFQUF1QnNVLEdBQXZCLElBQThCLEdBQXZDO0VBQ0FsUixhQUFLbkQsQ0FBTCxHQUFTd0MsS0FBS3dOLEdBQUwsQ0FBUzdNLEtBQUtuRCxDQUFMLEdBQVMsR0FBbEIsRUFBdUJxVSxHQUF2QixJQUE4QixHQUF2QztFQUNBbFIsYUFBS2xELENBQUwsR0FBU3VDLEtBQUt3TixHQUFMLENBQVM3TSxLQUFLbEQsQ0FBTCxHQUFTLEdBQWxCLEVBQXVCb1UsR0FBdkIsSUFBOEIsR0FBdkM7RUFDRDtFQUNELGFBQU9sUixJQUFQO0VBQ0QsS0FYRDtFQVlELEdBM0JEOztFQTZCQXBDLFNBQU9vTyxRQUFQLENBQWdCLHFCQUFoQixFQUF1QyxVQUFVdlEsSUFBVixFQUFnQjtFQUNyRCxRQUFJNFYsb0JBQUo7RUFBQSxRQUFjQyxZQUFkO0VBQUEsUUFBbUJDLGdCQUFuQjtFQUFBLFFBQTRCUixhQUE1QjtFQUFBLFFBQWtDUyxXQUFsQztFQUFBLFFBQXNDQyxhQUF0QztFQUFBLFFBQTRDQyxhQUE1QztFQUNBTCxrQkFBVztFQUNUVixnQkFBVSxFQUREO0VBRVRnQixvQkFBYyxDQUZMO0VBR1RDLGNBQVEsWUFIQztFQUlUN0MsYUFBTztFQUNMblMsV0FBRyxDQURFO0VBRUxDLFdBQUcsQ0FGRTtFQUdMQyxXQUFHO0VBSEU7RUFKRSxLQUFYO0VBVUFyQixXQUFPUCxLQUFLMlcsTUFBTCxDQUFZUixXQUFaLEVBQXNCNVYsSUFBdEIsQ0FBUDtFQUNBLFFBQUksQ0FBQ0EsS0FBS3NWLElBQVYsRUFBZ0I7RUFDZCxhQUFPLElBQVA7RUFDRCxLQUZELE1BRU8sSUFBSSxPQUFPdFYsS0FBS3NWLElBQVosS0FBcUIsUUFBekIsRUFBbUM7RUFDeENRLGdCQUFVM0osU0FBU25NLEtBQUtzVixJQUFkLEVBQW9CLEVBQXBCLElBQTBCLEdBQXBDO0VBQ0F0VixXQUFLc1YsSUFBTCxHQUFZO0VBQ1Y1UixlQUFPLEtBQUtNLFVBQUwsQ0FBZ0JOLEtBQWhCLEdBQXdCb1MsT0FEckI7RUFFVjdSLGdCQUFRLEtBQUtELFVBQUwsQ0FBZ0JDLE1BQWhCLEdBQXlCNlI7RUFGdkIsT0FBWjtFQUlELEtBTk0sTUFNQSxJQUFJTyxRQUFPclcsS0FBS3NWLElBQVosTUFBcUIsUUFBekIsRUFBbUM7RUFDeENXLGFBQU8sQ0FBQyxPQUFELEVBQVUsUUFBVixDQUFQO0VBQ0EsV0FBS0YsS0FBSyxDQUFMLEVBQVFDLE9BQU9DLEtBQUsxVixNQUF6QixFQUFpQ3dWLEtBQUtDLElBQXRDLEVBQTRDRCxJQUE1QyxFQUFrRDtFQUNoREYsY0FBTUksS0FBS0YsRUFBTCxDQUFOO0VBQ0EsWUFBSSxPQUFPL1YsS0FBS3NWLElBQUwsQ0FBVU8sR0FBVixDQUFQLEtBQTBCLFFBQTlCLEVBQXdDO0VBQ3RDN1YsZUFBS3NWLElBQUwsQ0FBVU8sR0FBVixJQUFpQixLQUFLN1IsVUFBTCxDQUFnQjZSLEdBQWhCLEtBQXdCMUosU0FBU25NLEtBQUtzVixJQUFMLENBQVVPLEdBQVYsQ0FBVCxFQUF5QixFQUF6QixJQUErQixHQUF2RCxDQUFqQjtFQUNEO0VBQ0Y7RUFDRixLQVJNLE1BUUEsSUFBSTdWLEtBQUtzVixJQUFMLEtBQWMsUUFBbEIsRUFBNEI7RUFDakNBLGFBQU90VixLQUFLc1YsSUFBWjtFQUNBdFYsV0FBS3NWLElBQUwsR0FBWTtFQUNWNVIsZUFBTzRSLElBREc7RUFFVnJSLGdCQUFRcVI7RUFGRSxPQUFaO0VBSUQ7RUFDRCxRQUFJLE9BQU90VixLQUFLa1csWUFBWixLQUE2QixRQUFqQyxFQUEyQztFQUN6Q2xXLFdBQUtrVyxZQUFMLEdBQXFCbFcsS0FBS3NWLElBQUwsQ0FBVTVSLEtBQVYsR0FBa0IsQ0FBbkIsSUFBeUJ5SSxTQUFTbk0sS0FBS2tXLFlBQWQsRUFBNEIsRUFBNUIsSUFBa0MsR0FBM0QsQ0FBcEI7RUFDRDtFQUNEbFcsU0FBS2tWLFFBQUwsSUFBaUIsR0FBakI7RUFDQWxWLFNBQUtzVixJQUFMLENBQVU1UixLQUFWLEdBQWtCRSxLQUFLQyxLQUFMLENBQVc3RCxLQUFLc1YsSUFBTCxDQUFVNVIsS0FBckIsQ0FBbEI7RUFDQTFELFNBQUtzVixJQUFMLENBQVVyUixNQUFWLEdBQW1CTCxLQUFLQyxLQUFMLENBQVc3RCxLQUFLc1YsSUFBTCxDQUFVclIsTUFBckIsQ0FBbkI7RUFDQWpFLFNBQUtzTCxLQUFMLEdBQWE7RUFDWDVILGFBQU8sS0FBS00sVUFBTCxDQUFnQk4sS0FEWjtFQUVYTyxjQUFRLEtBQUtELFVBQUwsQ0FBZ0JDO0VBRmIsS0FBYjtFQUlBLFFBQUlqRSxLQUFLbVcsTUFBTCxLQUFnQixVQUFoQixJQUE4QixPQUFPblcsS0FBS3NULEtBQVosS0FBc0IsUUFBeEQsRUFBa0U7RUFDaEV0VCxXQUFLc1QsS0FBTCxHQUFhOUMsUUFBUStDLFFBQVIsQ0FBaUJ2VCxLQUFLc1QsS0FBdEIsQ0FBYjtFQUNEO0VBQ0R0VCxTQUFLc1csTUFBTCxHQUFjO0VBQ1pDLFlBQU0sQ0FBQyxLQUFLdlMsVUFBTCxDQUFnQk4sS0FBaEIsR0FBd0IxRCxLQUFLc1YsSUFBTCxDQUFVNVIsS0FBbkMsSUFBNEMsQ0FEdEM7RUFFWjhTLGFBQU8sS0FBS3hTLFVBQUwsQ0FBZ0JOLEtBQWhCLEdBQXdCMUQsS0FBS3NXLE1BQUwsQ0FBWUMsSUFGL0I7RUFHWkUsY0FBUSxDQUFDLEtBQUt6UyxVQUFMLENBQWdCQyxNQUFoQixHQUF5QmpFLEtBQUtzVixJQUFMLENBQVVyUixNQUFwQyxJQUE4QyxDQUgxQztFQUlaeVMsV0FBSyxLQUFLMVMsVUFBTCxDQUFnQkMsTUFBaEIsR0FBeUJqRSxLQUFLc1csTUFBTCxDQUFZRztFQUo5QixLQUFkO0VBTUF6VyxTQUFLMlcsT0FBTCxHQUFlLENBQ2I7RUFDRW5ULFNBQUd4RCxLQUFLc1csTUFBTCxDQUFZQyxJQUFaLEdBQW1CdlcsS0FBS2tXLFlBRDdCO0VBRUV6UyxTQUFHekQsS0FBS3NXLE1BQUwsQ0FBWUksR0FBWixHQUFrQjFXLEtBQUtrVztFQUY1QixLQURhLEVBSVY7RUFDRDFTLFNBQUd4RCxLQUFLc1csTUFBTCxDQUFZRSxLQUFaLEdBQW9CeFcsS0FBS2tXLFlBRDNCO0VBRUR6UyxTQUFHekQsS0FBS3NXLE1BQUwsQ0FBWUksR0FBWixHQUFrQjFXLEtBQUtrVztFQUZ6QixLQUpVLEVBT1Y7RUFDRDFTLFNBQUd4RCxLQUFLc1csTUFBTCxDQUFZRSxLQUFaLEdBQW9CeFcsS0FBS2tXLFlBRDNCO0VBRUR6UyxTQUFHekQsS0FBS3NXLE1BQUwsQ0FBWUcsTUFBWixHQUFxQnpXLEtBQUtrVztFQUY1QixLQVBVLEVBVVY7RUFDRDFTLFNBQUd4RCxLQUFLc1csTUFBTCxDQUFZQyxJQUFaLEdBQW1CdlcsS0FBS2tXLFlBRDFCO0VBRUR6UyxTQUFHekQsS0FBS3NXLE1BQUwsQ0FBWUcsTUFBWixHQUFxQnpXLEtBQUtrVztFQUY1QixLQVZVLENBQWY7RUFlQWxXLFNBQUs0VyxPQUFMLEdBQWVoRixVQUFVK0QsUUFBVixDQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QjNWLEtBQUsyVyxPQUFMLENBQWEsQ0FBYixFQUFnQm5ULENBQXpDLEVBQTRDeEQsS0FBSzJXLE9BQUwsQ0FBYSxDQUFiLEVBQWdCbFQsQ0FBNUQsSUFBaUV6RCxLQUFLa1csWUFBckY7RUFDQSxTQUFLMUMsT0FBTCxDQUFhLHFCQUFiLEVBQW9DLFVBQVVqUCxJQUFWLEVBQWdCO0VBQ2xELFVBQUltUCxHQUFKLEVBQVMvUCxHQUFULEVBQWNrVCxVQUFkO0VBQ0FsVCxZQUFNWSxLQUFLbVIsVUFBTCxFQUFOO0VBQ0EsVUFBSy9SLElBQUlILENBQUosR0FBUXhELEtBQUsyVyxPQUFMLENBQWEsQ0FBYixFQUFnQm5ULENBQXhCLElBQTZCRyxJQUFJSCxDQUFKLEdBQVF4RCxLQUFLMlcsT0FBTCxDQUFhLENBQWIsRUFBZ0JuVCxDQUF0RCxJQUE2REcsSUFBSUYsQ0FBSixHQUFRekQsS0FBS3NXLE1BQUwsQ0FBWUcsTUFBcEIsSUFBOEI5UyxJQUFJRixDQUFKLEdBQVF6RCxLQUFLc1csTUFBTCxDQUFZSSxHQUFuSCxFQUF5SDtFQUN2SCxlQUFPblMsSUFBUDtFQUNEO0VBQ0QsVUFBS1osSUFBSUgsQ0FBSixHQUFReEQsS0FBS3NXLE1BQUwsQ0FBWUMsSUFBcEIsSUFBNEI1UyxJQUFJSCxDQUFKLEdBQVF4RCxLQUFLc1csTUFBTCxDQUFZRSxLQUFqRCxJQUE0RDdTLElBQUlGLENBQUosR0FBUXpELEtBQUsyVyxPQUFMLENBQWEsQ0FBYixFQUFnQmxULENBQXhCLElBQTZCRSxJQUFJRixDQUFKLEdBQVF6RCxLQUFLMlcsT0FBTCxDQUFhLENBQWIsRUFBZ0JsVCxDQUFySCxFQUF5SDtFQUN2SCxlQUFPYyxJQUFQO0VBQ0Q7RUFDRCxVQUFJWixJQUFJSCxDQUFKLEdBQVF4RCxLQUFLMlcsT0FBTCxDQUFhLENBQWIsRUFBZ0JuVCxDQUF4QixJQUE2QkcsSUFBSUgsQ0FBSixHQUFReEQsS0FBSzJXLE9BQUwsQ0FBYSxDQUFiLEVBQWdCblQsQ0FBckQsSUFBMERHLElBQUlGLENBQUosR0FBUXpELEtBQUtzVyxNQUFMLENBQVlJLEdBQWxGLEVBQXVGO0VBQ3JGaEQsY0FBTSxDQUFDL1AsSUFBSUYsQ0FBSixHQUFRekQsS0FBS3NXLE1BQUwsQ0FBWUksR0FBckIsSUFBNEIxVyxLQUFLNFcsT0FBdkM7RUFDRCxPQUZELE1BRU8sSUFBSWpULElBQUlGLENBQUosR0FBUXpELEtBQUsyVyxPQUFMLENBQWEsQ0FBYixFQUFnQmxULENBQXhCLElBQTZCRSxJQUFJRixDQUFKLEdBQVF6RCxLQUFLMlcsT0FBTCxDQUFhLENBQWIsRUFBZ0JsVCxDQUFyRCxJQUEwREUsSUFBSUgsQ0FBSixHQUFReEQsS0FBS3NXLE1BQUwsQ0FBWUUsS0FBbEYsRUFBeUY7RUFDOUY5QyxjQUFNLENBQUMvUCxJQUFJSCxDQUFKLEdBQVF4RCxLQUFLc1csTUFBTCxDQUFZRSxLQUFyQixJQUE4QnhXLEtBQUs0VyxPQUF6QztFQUNELE9BRk0sTUFFQSxJQUFJalQsSUFBSUgsQ0FBSixHQUFReEQsS0FBSzJXLE9BQUwsQ0FBYSxDQUFiLEVBQWdCblQsQ0FBeEIsSUFBNkJHLElBQUlILENBQUosR0FBUXhELEtBQUsyVyxPQUFMLENBQWEsQ0FBYixFQUFnQm5ULENBQXJELElBQTBERyxJQUFJRixDQUFKLEdBQVF6RCxLQUFLc1csTUFBTCxDQUFZRyxNQUFsRixFQUEwRjtFQUMvRi9DLGNBQU0sQ0FBQzFULEtBQUtzVyxNQUFMLENBQVlHLE1BQVosR0FBcUI5UyxJQUFJRixDQUExQixJQUErQnpELEtBQUs0VyxPQUExQztFQUNELE9BRk0sTUFFQSxJQUFJalQsSUFBSUYsQ0FBSixHQUFRekQsS0FBSzJXLE9BQUwsQ0FBYSxDQUFiLEVBQWdCbFQsQ0FBeEIsSUFBNkJFLElBQUlGLENBQUosR0FBUXpELEtBQUsyVyxPQUFMLENBQWEsQ0FBYixFQUFnQmxULENBQXJELElBQTBERSxJQUFJSCxDQUFKLEdBQVF4RCxLQUFLc1csTUFBTCxDQUFZQyxJQUFsRixFQUF3RjtFQUM3RjdDLGNBQU0sQ0FBQzFULEtBQUtzVyxNQUFMLENBQVlDLElBQVosR0FBbUI1UyxJQUFJSCxDQUF4QixJQUE2QnhELEtBQUs0VyxPQUF4QztFQUNELE9BRk0sTUFFQSxJQUFJalQsSUFBSUgsQ0FBSixJQUFTeEQsS0FBSzJXLE9BQUwsQ0FBYSxDQUFiLEVBQWdCblQsQ0FBekIsSUFBOEJHLElBQUlGLENBQUosSUFBU3pELEtBQUsyVyxPQUFMLENBQWEsQ0FBYixFQUFnQmxULENBQTNELEVBQThEO0VBQ25Fb1QscUJBQWFqRixVQUFVK0QsUUFBVixDQUFtQmhTLElBQUlILENBQXZCLEVBQTBCRyxJQUFJRixDQUE5QixFQUFpQ3pELEtBQUsyVyxPQUFMLENBQWEsQ0FBYixFQUFnQm5ULENBQWpELEVBQW9EeEQsS0FBSzJXLE9BQUwsQ0FBYSxDQUFiLEVBQWdCbFQsQ0FBcEUsQ0FBYjtFQUNBaVEsY0FBTSxDQUFDbUQsYUFBYTdXLEtBQUtrVyxZQUFuQixJQUFtQ2xXLEtBQUs0VyxPQUE5QztFQUNELE9BSE0sTUFHQSxJQUFJalQsSUFBSUgsQ0FBSixJQUFTeEQsS0FBSzJXLE9BQUwsQ0FBYSxDQUFiLEVBQWdCblQsQ0FBekIsSUFBOEJHLElBQUlGLENBQUosSUFBU3pELEtBQUsyVyxPQUFMLENBQWEsQ0FBYixFQUFnQmxULENBQTNELEVBQThEO0VBQ25Fb1QscUJBQWFqRixVQUFVK0QsUUFBVixDQUFtQmhTLElBQUlILENBQXZCLEVBQTBCRyxJQUFJRixDQUE5QixFQUFpQ3pELEtBQUsyVyxPQUFMLENBQWEsQ0FBYixFQUFnQm5ULENBQWpELEVBQW9EeEQsS0FBSzJXLE9BQUwsQ0FBYSxDQUFiLEVBQWdCbFQsQ0FBcEUsQ0FBYjtFQUNBaVEsY0FBTSxDQUFDbUQsYUFBYTdXLEtBQUtrVyxZQUFuQixJQUFtQ2xXLEtBQUs0VyxPQUE5QztFQUNELE9BSE0sTUFHQSxJQUFJalQsSUFBSUgsQ0FBSixJQUFTeEQsS0FBSzJXLE9BQUwsQ0FBYSxDQUFiLEVBQWdCblQsQ0FBekIsSUFBOEJHLElBQUlGLENBQUosSUFBU3pELEtBQUs4VyxNQUFMLENBQVksQ0FBWixFQUFlclQsQ0FBMUQsRUFBNkQ7RUFDbEVvVCxxQkFBYWpGLFVBQVUrRCxRQUFWLENBQW1CaFMsSUFBSUgsQ0FBdkIsRUFBMEJHLElBQUlGLENBQTlCLEVBQWlDekQsS0FBSzJXLE9BQUwsQ0FBYSxDQUFiLEVBQWdCblQsQ0FBakQsRUFBb0R4RCxLQUFLMlcsT0FBTCxDQUFhLENBQWIsRUFBZ0JsVCxDQUFwRSxDQUFiO0VBQ0FpUSxjQUFNLENBQUNtRCxhQUFhN1csS0FBS2tXLFlBQW5CLElBQW1DbFcsS0FBSzRXLE9BQTlDO0VBQ0QsT0FITSxNQUdBLElBQUlqVCxJQUFJSCxDQUFKLElBQVN4RCxLQUFLMlcsT0FBTCxDQUFhLENBQWIsRUFBZ0JuVCxDQUF6QixJQUE4QkcsSUFBSUYsQ0FBSixJQUFTekQsS0FBSzJXLE9BQUwsQ0FBYSxDQUFiLEVBQWdCbFQsQ0FBM0QsRUFBOEQ7RUFDbkVvVCxxQkFBYWpGLFVBQVUrRCxRQUFWLENBQW1CaFMsSUFBSUgsQ0FBdkIsRUFBMEJHLElBQUlGLENBQTlCLEVBQWlDekQsS0FBSzJXLE9BQUwsQ0FBYSxDQUFiLEVBQWdCblQsQ0FBakQsRUFBb0R4RCxLQUFLMlcsT0FBTCxDQUFhLENBQWIsRUFBZ0JsVCxDQUFwRSxDQUFiO0VBQ0FpUSxjQUFNLENBQUNtRCxhQUFhN1csS0FBS2tXLFlBQW5CLElBQW1DbFcsS0FBSzRXLE9BQTlDO0VBQ0Q7RUFDRCxVQUFJbEQsTUFBTSxDQUFWLEVBQWE7RUFDWCxlQUFPblAsSUFBUDtFQUNEO0VBQ0QsYUFBT3lRLGdCQUFnQmhWLEtBQUttVyxNQUFyQixFQUE2QjVSLElBQTdCLEVBQW1DbVAsR0FBbkMsRUFBd0MxVCxJQUF4QyxDQUFQO0VBQ0QsS0FsQ0Q7RUFtQ0QsR0ExR0Q7RUEyR0Q7O0VDeEtjLFNBQVMrVyxrQkFBVCxDQUE2QjVVLE1BQTdCLEVBQXFDO0VBQ2xEQSxTQUFPb08sUUFBUCxDQUFnQixTQUFoQixFQUEyQixZQUFZO0VBQ3JDLFNBQUs5RyxhQUFMLENBQW1CLFVBQW5CLEVBQStCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsQ0FBL0I7RUFDRCxHQUZEOztFQUlBdEgsU0FBT29PLFFBQVAsQ0FBZ0IsaUJBQWhCLEVBQW1DLFlBQVk7RUFDN0MsU0FBSzlHLGFBQUwsQ0FBbUIsbUJBQW5CLEVBQXdDLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsRUFBMkMsQ0FBM0MsRUFBOEMsQ0FBOUMsRUFBaUQsQ0FBakQsRUFBb0QsQ0FBcEQsRUFBdUQsQ0FBdkQsRUFBMEQsQ0FBMUQsRUFBNkQsQ0FBN0QsRUFBZ0UsQ0FBaEUsRUFBbUUsQ0FBbkUsRUFBc0UsQ0FBdEUsRUFBeUUsQ0FBekUsQ0FBeEM7RUFDRCxHQUZEOztFQUlBdEgsU0FBT29PLFFBQVAsQ0FBZ0IsY0FBaEIsRUFBZ0MsWUFBWTtFQUMxQyxTQUFLOUcsYUFBTCxDQUFtQixlQUFuQixFQUFvQyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLEVBQW5CLEVBQXVCLEVBQXZCLEVBQTJCLEVBQTNCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLEVBQXJDLEVBQXlDLEVBQXpDLEVBQTZDLEVBQTdDLEVBQWlELENBQWpELEVBQW9ELENBQXBELEVBQXVELEVBQXZELEVBQTJELEVBQTNELEVBQStELEVBQS9ELEVBQW1FLENBQW5FLEVBQXNFLENBQXRFLEVBQXlFLENBQXpFLEVBQTRFLENBQTVFLEVBQStFLENBQS9FLEVBQWtGLENBQWxGLENBQXBDO0VBQ0QsR0FGRDs7RUFJQXRILFNBQU9vTyxRQUFQLENBQWdCLFlBQWhCLEVBQThCLFVBQVV5RyxPQUFWLEVBQW1CO0VBQy9DLFFBQUloTyxlQUFKO0VBQ0EsUUFBSWdPLFlBQVksQ0FBWixJQUFpQkEsWUFBWSxHQUFqQyxFQUFzQztFQUNwQ2hPLGVBQVMsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxFQUEyQyxDQUEzQyxFQUE4QyxDQUE5QyxFQUFpRCxDQUFqRCxFQUFvRCxDQUFwRCxFQUF1RCxDQUF2RCxFQUEwRCxDQUExRCxFQUE2RCxDQUE3RCxFQUFnRSxDQUFoRSxFQUFtRSxDQUFuRSxFQUFzRSxDQUF0RSxFQUF5RSxDQUF6RSxDQUFUO0VBQ0QsS0FGRCxNQUVPLElBQUtnTyxVQUFVLENBQVYsSUFBZUEsVUFBVSxFQUExQixJQUFrQ0EsVUFBVSxHQUFWLElBQWlCQSxVQUFVLEdBQWpFLEVBQXVFO0VBQzVFaE8sZUFBUyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLEVBQTJDLENBQTNDLEVBQThDLENBQTlDLEVBQWlELENBQWpELEVBQW9ELENBQXBELEVBQXVELENBQXZELEVBQTBELENBQTFELEVBQTZELENBQTdELEVBQWdFLENBQWhFLEVBQW1FLENBQW5FLEVBQXNFLENBQXRFLEVBQXlFLENBQXpFLENBQVQ7RUFDRCxLQUZNLE1BRUEsSUFBSWdPLFlBQVksRUFBWixJQUFrQkEsWUFBWSxHQUFsQyxFQUF1QztFQUM1Q2hPLGVBQVMsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxFQUEyQyxDQUEzQyxFQUE4QyxDQUE5QyxFQUFpRCxDQUFqRCxFQUFvRCxDQUFwRCxFQUF1RCxDQUF2RCxFQUEwRCxDQUExRCxFQUE2RCxDQUE3RCxFQUFnRSxDQUFoRSxFQUFtRSxDQUFuRSxFQUFzRSxDQUF0RSxFQUF5RSxDQUF6RSxDQUFUO0VBQ0QsS0FGTSxNQUVBO0VBQ0xBLGVBQVMsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxFQUEyQyxDQUEzQyxFQUE4QyxDQUE5QyxFQUFpRCxDQUFqRCxFQUFvRCxDQUFwRCxFQUF1RCxDQUF2RCxFQUEwRCxDQUExRCxFQUE2RCxDQUE3RCxFQUFnRSxDQUFoRSxFQUFtRSxDQUFuRSxFQUFzRSxDQUF0RSxFQUF5RSxDQUF6RSxDQUFUO0VBQ0Q7RUFDRCxTQUFLUyxhQUFMLENBQW1CLGFBQW5CLEVBQWtDVCxNQUFsQztFQUNELEdBWkQ7O0VBY0E3RyxTQUFPb08sUUFBUCxDQUFnQixTQUFoQixFQUEyQixZQUFxQjtFQUFBLFFBQVhtRCxHQUFXLHVFQUFMLEdBQUs7O0VBQzlDQSxXQUFPLEdBQVA7RUFDQSxTQUFLakssYUFBTCxDQUFtQixTQUFuQixFQUE4QixDQUFDLENBQUQsRUFBSSxDQUFDaUssR0FBTCxFQUFVLENBQVYsRUFBYSxDQUFDQSxHQUFkLEVBQW1CLElBQUlBLEdBQUosR0FBVSxDQUE3QixFQUFnQyxDQUFDQSxHQUFqQyxFQUFzQyxDQUF0QyxFQUF5QyxDQUFDQSxHQUExQyxFQUErQyxDQUEvQyxDQUE5QjtFQUNELEdBSEQ7RUFJRDs7RUMvQmMsU0FBU3VELHVCQUFULENBQWtDOVUsTUFBbEMsRUFBMEM7RUFDdkRBLFNBQU9vTyxRQUFQLENBQWdCLFdBQWhCLEVBQTZCLFVBQVUxSCxNQUFWLEVBQWtCO0VBQzdDLFFBQUlxTyxVQUFKLEVBQWdCQyxXQUFoQjtFQUNBRCxpQkFBYSxNQUFNck8sTUFBbkI7RUFDQXNPLGtCQUFjLE9BQU90TyxTQUFTLENBQWhCLENBQWQ7RUFDQSxTQUFLMkssT0FBTCxDQUFhLFdBQWIsRUFBMEIsVUFBVWpQLElBQVYsRUFBZ0I7RUFDeENBLFdBQUtwRCxDQUFMLEdBQVN5QyxLQUFLQyxLQUFMLENBQVdELEtBQUtDLEtBQUwsQ0FBV1UsS0FBS3BELENBQUwsR0FBUytWLFVBQXBCLElBQWtDQyxXQUE3QyxDQUFUO0VBQ0E1UyxXQUFLbkQsQ0FBTCxHQUFTd0MsS0FBS0MsS0FBTCxDQUFXRCxLQUFLQyxLQUFMLENBQVdVLEtBQUtuRCxDQUFMLEdBQVM4VixVQUFwQixJQUFrQ0MsV0FBN0MsQ0FBVDtFQUNBNVMsV0FBS2xELENBQUwsR0FBU3VDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0MsS0FBTCxDQUFXVSxLQUFLbEQsQ0FBTCxHQUFTNlYsVUFBcEIsSUFBa0NDLFdBQTdDLENBQVQ7RUFDQSxhQUFPNVMsSUFBUDtFQUNELEtBTEQ7RUFNRCxHQVZEO0VBV0Q7O0VDWkQ7Ozs7OztBQU1BLEVBQWUsU0FBUzZTLG9CQUFULENBQStCalYsTUFBL0IsRUFBdUM7RUFDcERBLFNBQU9vTyxRQUFQLENBQWdCLFNBQWhCLEVBQTJCLFlBQTJCO0VBQUEsUUFBakI4RyxRQUFpQix1RUFBTixJQUFNOztFQUNwRCxTQUFLQyxTQUFMO0VBQ0EsU0FBS0MsUUFBTCxDQUFjLENBQWQ7RUFDQSxTQUFLQyxLQUFMLENBQVcsQ0FBWDtFQUNBLFNBQUtDLEtBQUwsQ0FBVyxHQUFYO0VBQ0EsU0FBS0MsUUFBTCxDQUFjLEVBQUN0RCxLQUFLLENBQU4sRUFBU0UsTUFBTSxDQUFmLEVBQWtCRCxPQUFPLENBQXpCLEVBQWQ7RUFDQSxTQUFLYyxLQUFMLENBQVcsSUFBWDs7RUFFQSxRQUFJa0MsUUFBSixFQUFjO0VBQ1osV0FBS0EsUUFBTCxDQUFjLEtBQWQsRUFBcUIsRUFBckI7RUFDRDtFQUNGLEdBWEQ7O0VBYUFsVixTQUFPb08sUUFBUCxDQUFnQixNQUFoQixFQUF3QixZQUEyQjtFQUFBLFFBQWpCOEcsUUFBaUIsdUVBQU4sSUFBTTs7RUFDakQsU0FBS3BDLFVBQUwsQ0FBZ0IsRUFBaEI7RUFDQSxTQUFLMEMsUUFBTCxDQUFjLEVBQWQ7RUFDQSxTQUFLNUMsTUFBTCxDQUFZLEtBQVosRUFBbUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFuQixFQUEyQixDQUFDLEdBQUQsRUFBTSxDQUFOLENBQTNCLEVBQXFDLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBckMsRUFBaUQsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFqRDtFQUNBLFNBQUs2QyxVQUFMLENBQWdCLENBQUMsRUFBakI7RUFDQSxTQUFLekMsS0FBTCxDQUFXLEdBQVg7RUFDQSxRQUFJa0MsUUFBSixFQUFjO0VBQ1osV0FBS0EsUUFBTCxDQUFjLEtBQWQsRUFBcUIsRUFBckI7RUFDRDtFQUNELFNBQUtwQyxVQUFMLENBQWdCLENBQWhCO0VBQ0QsR0FWRDs7RUFZQTtFQUNBOVMsU0FBT29PLFFBQVAsQ0FBZ0IsU0FBaEIsRUFBMkIsWUFBd0I7RUFBQSxRQUFkc0gsSUFBYyx1RUFBUCxLQUFPOztFQUNqRCxTQUFLQyxRQUFMLENBQWMsRUFBZDtFQUNBLFNBQUsvQyxNQUFMLENBQVksS0FBWixFQUFtQixDQUFDLENBQUQsRUFBSSxDQUFKLENBQW5CLEVBQTJCLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBM0IsRUFBdUMsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUF2QyxFQUFtRCxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQW5EO0VBQ0EsU0FBS2dELE9BQUwsQ0FBYSxFQUFiO0VBQ0EsU0FBS1YsUUFBTCxDQUFjLEtBQWQsRUFBcUIsRUFBckI7RUFDQSxRQUFJUSxJQUFKLEVBQVU7RUFDUixXQUFLUCxTQUFMO0VBQ0EsV0FBS0MsUUFBTCxDQUFjLENBQWQ7RUFDRDtFQUNELFdBQU8sSUFBUDtFQUNELEdBVkQ7O0VBWUFwVixTQUFPb08sUUFBUCxDQUFnQixTQUFoQixFQUEyQixZQUFZO0VBQ3JDLFNBQUtnSCxRQUFMLENBQWMsR0FBZDtFQUNBLFNBQUt0QyxVQUFMLENBQWdCLEVBQWhCO0VBQ0EsU0FBSzBDLFFBQUwsQ0FBYyxFQUFkO0VBQ0EsU0FBS0ssU0FBTCxDQUFlLEVBQWY7RUFDQSxTQUFLQyxJQUFMLENBQVUsRUFBVjtFQUNBLFNBQUtYLFNBQUw7RUFDRCxHQVBEOztFQVNBblYsU0FBT29PLFFBQVAsQ0FBZ0IsU0FBaEIsRUFBMkIsWUFBWTtFQUNyQyxTQUFLb0gsUUFBTCxDQUFjLEdBQWQ7RUFDQSxTQUFLQyxVQUFMLENBQWdCLENBQUMsQ0FBakI7RUFDQSxTQUFLRSxRQUFMLENBQWMsRUFBZDtFQUNBLFNBQUtMLEtBQUwsQ0FBVyxFQUFYO0VBQ0EsU0FBS3JDLFFBQUwsQ0FBYyxTQUFkLEVBQXlCLEVBQXpCO0VBQ0EsU0FBS3NDLFFBQUwsQ0FBYztFQUNadEQsV0FBSyxDQURPO0VBRVpFLFlBQU07RUFGTSxLQUFkO0VBSUEsU0FBS2lELFFBQUwsQ0FBYyxDQUFkO0VBQ0EsU0FBS3BDLEtBQUwsQ0FBVyxHQUFYO0VBQ0EsU0FBS2tDLFFBQUwsQ0FBYyxLQUFkLEVBQXFCLEVBQXJCO0VBQ0QsR0FiRDs7RUFlQWxWLFNBQU9vTyxRQUFQLENBQWdCLGNBQWhCLEVBQWdDLFlBQVk7RUFDMUMsU0FBS29ILFFBQUwsQ0FBYyxDQUFkO0VBQ0EsU0FBS3ZDLFFBQUwsQ0FBYyxTQUFkLEVBQXlCLENBQXpCO0VBQ0EsU0FBS3FDLEtBQUwsQ0FBVyxFQUFYO0VBQ0EsU0FBS0MsUUFBTCxDQUFjO0VBQ1pwRCxZQUFNLENBRE07RUFFWkYsV0FBSztFQUZPLEtBQWQ7RUFJQSxTQUFLVyxNQUFMLENBQVksR0FBWixFQUFpQixDQUFDLENBQUQsRUFBSSxDQUFKLENBQWpCLEVBQXlCLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBekIsRUFBcUMsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFyQyxFQUFpRCxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWpEO0VBQ0EsU0FBS3dDLFFBQUwsQ0FBYyxFQUFkO0VBQ0EsU0FBS08sUUFBTCxDQUFjLEVBQWQ7RUFDQSxTQUFLM0MsS0FBTCxDQUFXLEdBQVg7RUFDRCxHQVpEOztFQWNBaFQsU0FBT29PLFFBQVAsQ0FBZ0IsWUFBaEIsRUFBOEIsWUFBWTtFQUN4QyxTQUFLd0UsTUFBTCxDQUFZLEtBQVosRUFBbUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFuQixFQUEyQixDQUFDLEdBQUQsRUFBTSxFQUFOLENBQTNCLEVBQXNDLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBdEMsRUFBa0QsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFsRDtFQUNBLFNBQUsrQyxRQUFMLENBQWMsQ0FBQyxFQUFmO0VBQ0EsU0FBS0YsVUFBTCxDQUFnQixDQUFDLEVBQWpCO0VBQ0EsU0FBS3hDLFFBQUwsQ0FBYyxTQUFkLEVBQXlCLEVBQXpCO0VBQ0EsU0FBS21DLFFBQUwsQ0FBYyxDQUFDLENBQWY7RUFDQSxTQUFLcEMsS0FBTCxDQUFXLEdBQVg7RUFDRCxHQVBEOztFQVNBaFQsU0FBT29PLFFBQVAsQ0FBZ0IsTUFBaEIsRUFBd0IsWUFBWTtFQUNsQyxTQUFLMEUsVUFBTCxDQUFnQixDQUFoQjtFQUNBLFNBQUswQyxRQUFMLENBQWMsQ0FBZDtFQUNBLFNBQUtKLFFBQUwsQ0FBYyxDQUFkO0VBQ0EsU0FBS25DLFFBQUwsQ0FBYyxTQUFkLEVBQXlCLEVBQXpCO0VBQ0EsU0FBSzBDLFFBQUwsQ0FBYyxFQUFkO0VBQ0EsU0FBSzNDLEtBQUwsQ0FBVyxHQUFYO0VBQ0QsR0FQRDs7RUFTQWhULFNBQU9vTyxRQUFQLENBQWdCLFFBQWhCLEVBQTBCLFlBQVk7RUFDcEMsU0FBSzRFLEtBQUwsQ0FBVyxHQUFYO0VBQ0EsU0FBSzhDLElBQUwsQ0FBVSxFQUFWO0VBQ0EsU0FBS0wsVUFBTCxDQUFnQixDQUFDLEVBQWpCO0VBQ0EsU0FBS0wsUUFBTCxDQUFjLENBQWQ7RUFDQSxTQUFLQyxLQUFMLENBQVcsQ0FBWDtFQUNBLFNBQUtILFFBQUwsQ0FBYyxLQUFkLEVBQXFCLEVBQXJCO0VBQ0QsR0FQRDtFQVFBO0VBQ0FsVixTQUFPb08sUUFBUCxDQUFnQixTQUFoQixFQUEyQixZQUFZO0VBQ3JDLFNBQUtxSCxVQUFMLENBQWdCLENBQUMsRUFBakI7RUFDQSxTQUFLN0MsTUFBTCxDQUFZLEdBQVosRUFBaUIsQ0FBQyxFQUFELEVBQUssQ0FBTCxDQUFqQixFQUEwQixDQUFDLEVBQUQsRUFBSyxHQUFMLENBQTFCLEVBQXFDLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBckMsRUFBaUQsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFqRDtFQUNBLFNBQUtBLE1BQUwsQ0FBWSxHQUFaLEVBQWlCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBakIsRUFBeUIsQ0FBQyxHQUFELEVBQU0sRUFBTixDQUF6QixFQUFvQyxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQXBDLEVBQWdELENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBaEQ7RUFDQSxTQUFLQSxNQUFMLENBQVksR0FBWixFQUFpQixDQUFDLEVBQUQsRUFBSyxDQUFMLENBQWpCLEVBQTBCLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBMUIsRUFBc0MsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUF0QyxFQUFrRCxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWxEO0VBQ0EsU0FBS0EsTUFBTCxDQUFZLEtBQVosRUFBbUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFuQixFQUEyQixDQUFDLEdBQUQsRUFBTSxHQUFOLENBQTNCLEVBQXVDLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBdkMsRUFBbUQsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFuRDtFQUNBLFNBQUtnRCxPQUFMLENBQWEsRUFBYjtFQUNELEdBUEQ7O0VBU0E1VixTQUFPb08sUUFBUCxDQUFnQixTQUFoQixFQUEyQixZQUFZO0VBQ3JDLFNBQUsrRyxTQUFMO0VBQ0EsU0FBS0csS0FBTCxDQUFXLEVBQVg7RUFDQSxTQUFLRSxRQUFMLENBQWMsRUFBZDtFQUNBLFNBQUtKLFFBQUwsQ0FBYyxFQUFkO0VBQ0EsU0FBS0YsUUFBTCxDQUFjLEtBQWQsRUFBcUIsRUFBckI7RUFDRCxHQU5EOztFQVFBbFYsU0FBT29PLFFBQVAsQ0FBZ0IsU0FBaEIsRUFBMkIsWUFBWTtFQUNyQyxTQUFLcUgsVUFBTCxDQUFnQixDQUFDLEVBQWpCO0VBQ0EsU0FBS0UsUUFBTCxDQUFjLENBQUMsRUFBZjtFQUNBLFNBQUszQyxLQUFMLENBQVcsR0FBWDtFQUNBLFNBQUtzQyxLQUFMLENBQVcsRUFBWDtFQUNBLFNBQUtDLFFBQUwsQ0FBYztFQUNadEQsV0FBSyxDQUFDLEVBRE07RUFFWkUsWUFBTTtFQUZNLEtBQWQ7RUFJQSxTQUFLUyxNQUFMLENBQVksS0FBWixFQUFtQixDQUFDLENBQUQsRUFBSSxDQUFKLENBQW5CLEVBQTJCLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBM0IsRUFBcUMsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFyQyxFQUFpRCxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWpEO0VBQ0EsV0FBTyxLQUFLc0MsUUFBTCxDQUFjLEtBQWQsRUFBcUIsRUFBckIsQ0FBUDtFQUNELEdBWEQ7O0VBYUFsVixTQUFPb08sUUFBUCxDQUFnQixZQUFoQixFQUE4QixZQUEyQjtFQUFBLFFBQWpCOEcsUUFBaUIsdUVBQU4sSUFBTTs7RUFDdkQsU0FBS3BDLFVBQUwsQ0FBZ0IsRUFBaEI7RUFDQSxTQUFLaEssUUFBTCxDQUFjLFlBQVk7RUFDeEIsV0FBS2lOLGVBQUwsQ0FBcUIsVUFBckI7RUFDQSxXQUFLek4sT0FBTCxDQUFhLEVBQWI7RUFDQSxXQUFLME4sVUFBTDtFQUNBLFdBQUs3TixNQUFMLENBQVk2SyxLQUFaLENBQWtCLEdBQWxCO0VBQ0EsV0FBSzdLLE1BQUwsQ0FBWWlOLFFBQVosQ0FBcUIsRUFBckI7RUFDQSxhQUFPLEtBQUtqTixNQUFMLENBQVlxTixRQUFaLENBQXFCLEVBQXJCLENBQVA7RUFDRCxLQVBEO0VBUUEsU0FBSzFNLFFBQUwsQ0FBYyxZQUFZO0VBQ3hCLFdBQUtpTixlQUFMLENBQXFCLFdBQXJCO0VBQ0EsV0FBS3pOLE9BQUwsQ0FBYSxFQUFiO0VBQ0EsYUFBTyxLQUFLVyxTQUFMLENBQWUsU0FBZixDQUFQO0VBQ0QsS0FKRDtFQUtBLFNBQUt1TSxRQUFMLENBQWMsRUFBZDtFQUNBLFNBQUt4QyxLQUFMLENBQVcsR0FBWDtFQUNBLFFBQUlrQyxRQUFKLEVBQWM7RUFDWixhQUFPLEtBQUtBLFFBQUwsQ0FBYyxLQUFkLEVBQXFCLEVBQXJCLENBQVA7RUFDRDtFQUNGLEdBcEJEOztFQXNCQWxWLFNBQU9vTyxRQUFQLENBQWdCLFVBQWhCLEVBQTRCLFlBQVk7RUFDdEMsU0FBSzRFLEtBQUwsQ0FBVyxHQUFYO0VBQ0EsU0FBS2xLLFFBQUwsQ0FBYyxZQUFZO0VBQ3hCLFdBQUtpTixlQUFMLENBQXFCLFNBQXJCO0VBQ0EsV0FBS3pOLE9BQUwsQ0FBYSxFQUFiO0VBQ0EsV0FBSzBOLFVBQUw7RUFDQSxXQUFLN04sTUFBTCxDQUFZb04sUUFBWixDQUFxQjtFQUNuQnRELGFBQUs7RUFEYyxPQUFyQjtFQUdBLFdBQUs5SixNQUFMLENBQVk4TixTQUFaLENBQXNCLEVBQXRCO0VBQ0QsS0FSRDtFQVNBLFNBQUtuTixRQUFMLENBQWMsWUFBWTtFQUN4QixXQUFLaU4sZUFBTCxDQUFxQixVQUFyQjtFQUNBLFdBQUt6TixPQUFMLENBQWEsRUFBYjtFQUNBLFdBQUtXLFNBQUwsQ0FBZSxTQUFmO0VBQ0QsS0FKRDtFQUtBLFNBQUtILFFBQUwsQ0FBYyxZQUFZO0VBQ3hCLFdBQUtpTixlQUFMLENBQXFCLFVBQXJCO0VBQ0EsV0FBS3pOLE9BQUwsQ0FBYSxFQUFiO0VBQ0EsV0FBSzBOLFVBQUw7RUFDQSxXQUFLN04sTUFBTCxDQUFZMkssVUFBWixDQUF1QixFQUF2QjtFQUNBLFdBQUszSyxNQUFMLENBQVl3TixRQUFaLENBQXFCLEVBQXJCO0VBQ0EsV0FBS3hOLE1BQUwsQ0FBWXFOLFFBQVosQ0FBcUIsRUFBckI7RUFDQSxXQUFLck4sTUFBTCxDQUFZaU4sUUFBWixDQUFxQixFQUFyQjtFQUNBLFdBQUtqTixNQUFMLENBQVl5SyxNQUFaLENBQW1CLEdBQW5CLEVBQXdCLENBQUMsQ0FBRCxFQUFJLEVBQUosQ0FBeEIsRUFBaUMsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFqQyxFQUE2QyxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQTdDLEVBQXlELENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBekQ7RUFDQSxXQUFLekssTUFBTCxDQUFZeUssTUFBWixDQUFtQixHQUFuQixFQUF3QixDQUFDLENBQUQsRUFBSSxFQUFKLENBQXhCLEVBQWlDLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBakMsRUFBNkMsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUE3QyxFQUF5RCxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQXpEO0VBQ0EsV0FBS3pLLE1BQUwsQ0FBWXlLLE1BQVosQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQyxDQUFELEVBQUksRUFBSixDQUF4QixFQUFpQyxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWpDLEVBQTZDLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBN0MsRUFBeUQsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUF6RDtFQUNBLFdBQUt6SyxNQUFMLENBQVk4TixTQUFaLENBQXNCLENBQXRCO0VBQ0QsS0FaRDtFQWFBLFNBQUtyRCxNQUFMLENBQVksR0FBWixFQUFpQixDQUFDLEVBQUQsRUFBSyxDQUFMLENBQWpCLEVBQTBCLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBMUIsRUFBc0MsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUF0QyxFQUFrRCxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWxEO0VBQ0EsU0FBS0EsTUFBTCxDQUFZLEdBQVosRUFBaUIsQ0FBQyxFQUFELEVBQUssQ0FBTCxDQUFqQixFQUEwQixDQUFDLEdBQUQsRUFBTSxHQUFOLENBQTFCLEVBQXNDLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBdEMsRUFBa0QsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFsRDtFQUNBLFNBQUtBLE1BQUwsQ0FBWSxHQUFaLEVBQWlCLENBQUMsRUFBRCxFQUFLLENBQUwsQ0FBakIsRUFBMEIsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUExQixFQUFzQyxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQXRDLEVBQWtELENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBbEQ7RUFDQSxTQUFLc0MsUUFBTCxDQUFjLEtBQWQsRUFBcUIsRUFBckI7RUFDRCxHQWpDRDs7RUFtQ0FsVixTQUFPb08sUUFBUCxDQUFnQixZQUFoQixFQUE4QixZQUFZO0VBQ3hDLFNBQUswRSxVQUFMLENBQWdCLEVBQWhCO0VBQ0EsU0FBS0csUUFBTCxDQUFjLFNBQWQsRUFBeUIsRUFBekI7RUFDQSxTQUFLTCxNQUFMLENBQVksR0FBWixFQUFpQixDQUFDLENBQUQsRUFBSSxFQUFKLENBQWpCLEVBQTBCLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBMUIsRUFBc0MsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUF0QyxFQUFrRCxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWxEO0VBQ0EsU0FBSzlKLFFBQUwsQ0FBYyxZQUFXO0VBQ3ZCLFdBQUtpTixlQUFMLENBQXFCLFNBQXJCO0VBQ0EsV0FBS3pOLE9BQUwsQ0FBYSxFQUFiO0VBQ0EsV0FBSzBOLFVBQUw7RUFDQSxXQUFLN04sTUFBTCxDQUFZNkssS0FBWixDQUFrQixHQUFsQjtFQUNBLGFBQU8sS0FBS2xLLFFBQUwsQ0FBYyxZQUFXO0VBQzlCLGFBQUtpTixlQUFMLENBQXFCLFFBQXJCO0VBQ0EsYUFBS3pOLE9BQUwsQ0FBYSxFQUFiO0VBQ0EsZUFBTyxLQUFLVyxTQUFMLENBQWUsU0FBZixDQUFQO0VBQ0QsT0FKTSxDQUFQO0VBS0QsS0FWRDtFQVdBLFNBQUtILFFBQUwsQ0FBYyxZQUFXO0VBQ3ZCLFdBQUtpTixlQUFMLENBQXFCLFVBQXJCO0VBQ0EsV0FBS3pOLE9BQUwsQ0FBYSxFQUFiO0VBQ0EsV0FBSzBOLFVBQUw7RUFDQSxXQUFLN04sTUFBTCxDQUFZc04sVUFBWixDQUF1QixFQUF2QjtFQUNBLFdBQUt0TixNQUFMLENBQVkrTixHQUFaLENBQWdCLEVBQWhCO0VBQ0EsYUFBTyxLQUFLL04sTUFBTCxDQUFZaU4sUUFBWixDQUFxQixFQUFyQixDQUFQO0VBQ0QsS0FQRDtFQVFBLFNBQUtwQyxLQUFMLENBQVcsR0FBWDtFQUNBLFNBQUsyQyxRQUFMLENBQWMsQ0FBQyxFQUFmO0VBQ0EsU0FBSzdNLFFBQUwsQ0FBYyxZQUFXO0VBQ3ZCLFdBQUtSLE9BQUwsQ0FBYSxFQUFiO0VBQ0EsYUFBTyxLQUFLVyxTQUFMLENBQWUsU0FBZixDQUFQO0VBQ0QsS0FIRDtFQUlBLFdBQU8sSUFBUDtFQUNELEdBOUJEOztFQWdDQWpKLFNBQU9vTyxRQUFQLENBQWdCLFdBQWhCLEVBQTZCLFlBQVc7RUFDdEMsU0FBS3FILFVBQUwsQ0FBZ0IsRUFBaEI7RUFDQSxTQUFLekMsS0FBTCxDQUFXLEdBQVg7RUFDQSxTQUFLbUMsU0FBTDtFQUNBLFNBQUtDLFFBQUwsQ0FBYyxDQUFkO0VBQ0EsU0FBS0UsS0FBTCxDQUFXLEdBQVg7RUFDQSxTQUFLQyxRQUFMLENBQWM7RUFDWnRELFdBQUssQ0FETztFQUVaRSxZQUFNLENBRk07RUFHWkQsYUFBTztFQUhLLEtBQWQ7RUFLQSxTQUFLYyxLQUFMLENBQVcsR0FBWDtFQUNBLFNBQUtvQyxRQUFMLENBQWMsQ0FBZDtFQUNBLFNBQUtJLFFBQUwsQ0FBYyxFQUFkO0VBQ0EsU0FBSzFNLFFBQUwsQ0FBYyxZQUFXO0VBQ3ZCLFdBQUtpTixlQUFMLENBQXFCLFNBQXJCO0VBQ0EsV0FBS0MsVUFBTDtFQUNBLFdBQUsxTixPQUFMLENBQWEsRUFBYjtFQUNBLFdBQUtILE1BQUwsQ0FBWThOLFNBQVosQ0FBc0IsRUFBdEI7RUFDRCxLQUxEO0VBTUEsU0FBS2YsUUFBTCxDQUFjLEtBQWQsRUFBcUIsRUFBckI7RUFDRCxHQXJCRDs7RUF1QkFsVixTQUFPb08sUUFBUCxDQUFnQixXQUFoQixFQUE2QixZQUFZO0VBQ3ZDLFNBQUsrRyxTQUFMO0VBQ0EsU0FBS0MsUUFBTCxDQUFjLEVBQWQ7RUFDQSxTQUFLcEMsS0FBTCxDQUFXLEdBQVg7RUFDQSxTQUFLbEssUUFBTCxDQUFjLFlBQVk7RUFDeEIsV0FBS2lOLGVBQUwsQ0FBcUIsVUFBckI7RUFDQSxXQUFLek4sT0FBTCxDQUFhLEVBQWI7RUFDQSxXQUFLME4sVUFBTDtFQUNBLFdBQUs3TixNQUFMLENBQVlxTixRQUFaLENBQXFCLEVBQXJCO0VBQ0EsV0FBS3JOLE1BQUwsQ0FBWWlOLFFBQVosQ0FBcUIsRUFBckI7RUFDQSxXQUFLak4sTUFBTCxDQUFZb04sUUFBWixDQUFxQjtFQUNuQnJELGVBQU8sRUFEWTtFQUVuQkQsYUFBSztFQUZjLE9BQXJCO0VBSUQsS0FWRDtFQVdBLFNBQUtxRCxLQUFMLENBQVcsRUFBWDtFQUNBLFNBQUsxQyxNQUFMLENBQVksS0FBWixFQUFtQixDQUFDLENBQUQsRUFBSSxFQUFKLENBQW5CLEVBQTRCLENBQUMsR0FBRCxFQUFNLEVBQU4sQ0FBNUIsRUFBdUMsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUF2QyxFQUFtRCxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQW5EO0VBQ0EsU0FBSzJDLFFBQUwsQ0FBYztFQUNadEQsV0FBSyxDQURPO0VBRVpDLGFBQU8sQ0FBQztFQUZJLEtBQWQ7RUFJQSxXQUFPLEtBQUtzRCxRQUFMLENBQWMsRUFBZCxDQUFQO0VBQ0QsR0F0QkQ7O0VBd0JBO0VBQ0F4VixTQUFPb08sUUFBUCxDQUFnQixhQUFoQixFQUErQixZQUFZO0VBQ3pDLFNBQUt3SCxPQUFMLENBQWEsRUFBYjtFQUNBLFNBQUtILFVBQUwsQ0FBZ0IsQ0FBQyxFQUFqQjtFQUNBLFNBQUtGLFFBQUwsQ0FBYztFQUNadEQsV0FBSztFQURPLEtBQWQ7RUFHQSxTQUFLbkosUUFBTCxDQUFjLFlBQVk7RUFDeEIsV0FBS2lOLGVBQUwsQ0FBcUIsVUFBckI7RUFDQSxXQUFLek4sT0FBTCxDQUFhLEVBQWI7RUFDQSxXQUFLME4sVUFBTDtFQUNBLFdBQUs3TixNQUFMLENBQVl5TixPQUFaLENBQW9CLENBQXBCO0VBQ0EsV0FBS3pOLE1BQUwsQ0FBWWlOLFFBQVosQ0FBcUIsRUFBckI7RUFDQSxXQUFLak4sTUFBTCxDQUFZcU4sUUFBWixDQUFxQixFQUFyQjtFQUNBLFdBQUtyTixNQUFMLENBQVlvTixRQUFaLENBQXFCO0VBQ25CcEQsY0FBTTtFQURhLE9BQXJCO0VBR0QsS0FWRDtFQVdBLFNBQUtXLFVBQUwsQ0FBZ0IsRUFBaEI7RUFDRCxHQWxCRDtFQW1CRDs7RUN4U0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBeUNBLElBQUlxRCxrQkFBSjtFQUFBLElBQWVDLGlCQUFmO0VBQUEsSUFBeUJDLGlCQUF6QjtFQUNBRCxXQUFXLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLEVBQW9DLEdBQXBDLEVBQXlDLEdBQXpDLEVBQThDLEdBQTlDLEVBQW1ELEdBQW5ELEVBQXdELEdBQXhELEVBQTZELEdBQTdELEVBQWtFLEdBQWxFLEVBQXVFLEdBQXZFLEVBQTRFLEdBQTVFLEVBQWlGLEdBQWpGLEVBQXNGLEdBQXRGLEVBQTJGLEdBQTNGLEVBQWdHLEdBQWhHLEVBQXFHLEdBQXJHLEVBQTBHLEdBQTFHLEVBQStHLEdBQS9HLEVBQW9ILEdBQXBILEVBQXlILEdBQXpILEVBQThILEdBQTlILEVBQW1JLEdBQW5JLEVBQXdJLEdBQXhJLEVBQTZJLEdBQTdJLEVBQWtKLEdBQWxKLEVBQXVKLEdBQXZKLEVBQTRKLEdBQTVKLEVBQWlLLEdBQWpLLEVBQXNLLEdBQXRLLEVBQTJLLEdBQTNLLEVBQWdMLEdBQWhMLEVBQXFMLEdBQXJMLEVBQTBMLEdBQTFMLEVBQStMLEdBQS9MLEVBQW9NLEdBQXBNLEVBQXlNLEdBQXpNLEVBQThNLEdBQTlNLEVBQW1OLEdBQW5OLEVBQXdOLEdBQXhOLEVBQTZOLEdBQTdOLEVBQWtPLEdBQWxPLEVBQXVPLEdBQXZPLEVBQTRPLEdBQTVPLEVBQWlQLEdBQWpQLEVBQXNQLEdBQXRQLEVBQTJQLEdBQTNQLEVBQWdRLEdBQWhRLEVBQXFRLEdBQXJRLEVBQTBRLEdBQTFRLEVBQStRLEdBQS9RLEVBQW9SLEdBQXBSLEVBQXlSLEdBQXpSLEVBQThSLEdBQTlSLEVBQW1TLEdBQW5TLEVBQXdTLEdBQXhTLEVBQTZTLEdBQTdTLEVBQWtULEdBQWxULEVBQXVULEdBQXZULEVBQTRULEdBQTVULEVBQWlVLEdBQWpVLEVBQXNVLEdBQXRVLEVBQTJVLEdBQTNVLEVBQWdWLEdBQWhWLEVBQXFWLEdBQXJWLEVBQTBWLEdBQTFWLEVBQStWLEdBQS9WLEVBQW9XLEdBQXBXLEVBQXlXLEdBQXpXLEVBQThXLEdBQTlXLEVBQW1YLEdBQW5YLEVBQXdYLEdBQXhYLEVBQTZYLEdBQTdYLEVBQWtZLEdBQWxZLEVBQXVZLEdBQXZZLEVBQTRZLEdBQTVZLEVBQWlaLEdBQWpaLEVBQXNaLEdBQXRaLEVBQTJaLEdBQTNaLEVBQWdhLEdBQWhhLEVBQXFhLEdBQXJhLEVBQTBhLEdBQTFhLEVBQSthLEdBQS9hLEVBQW9iLEdBQXBiLEVBQXliLEdBQXpiLEVBQThiLEdBQTliLEVBQW1jLEdBQW5jLEVBQXdjLEdBQXhjLEVBQTZjLEdBQTdjLEVBQWtkLEdBQWxkLEVBQXVkLEdBQXZkLEVBQTRkLEdBQTVkLEVBQWllLEdBQWplLEVBQXNlLEdBQXRlLEVBQTJlLEdBQTNlLEVBQWdmLEdBQWhmLEVBQXFmLEdBQXJmLEVBQTBmLEdBQTFmLEVBQStmLEdBQS9mLEVBQW9nQixHQUFwZ0IsRUFBeWdCLEdBQXpnQixFQUE4Z0IsR0FBOWdCLEVBQW1oQixHQUFuaEIsRUFBd2hCLEdBQXhoQixFQUE2aEIsR0FBN2hCLEVBQWtpQixHQUFsaUIsRUFBdWlCLEdBQXZpQixFQUE0aUIsR0FBNWlCLEVBQWlqQixHQUFqakIsRUFBc2pCLEdBQXRqQixFQUEyakIsR0FBM2pCLEVBQWdrQixHQUFoa0IsRUFBcWtCLEdBQXJrQixFQUEwa0IsR0FBMWtCLEVBQStrQixHQUEva0IsRUFBb2xCLEdBQXBsQixFQUF5bEIsR0FBemxCLEVBQThsQixHQUE5bEIsRUFBbW1CLEdBQW5tQixFQUF3bUIsR0FBeG1CLEVBQTZtQixHQUE3bUIsRUFBa25CLEdBQWxuQixFQUF1bkIsR0FBdm5CLEVBQTRuQixHQUE1bkIsRUFBaW9CLEdBQWpvQixFQUFzb0IsR0FBdG9CLEVBQTJvQixHQUEzb0IsRUFBZ3BCLEdBQWhwQixFQUFxcEIsR0FBcnBCLEVBQTBwQixHQUExcEIsRUFBK3BCLEdBQS9wQixFQUFvcUIsR0FBcHFCLEVBQXlxQixHQUF6cUIsRUFBOHFCLEdBQTlxQixFQUFtckIsR0FBbnJCLEVBQXdyQixHQUF4ckIsRUFBNnJCLEdBQTdyQixFQUFrc0IsR0FBbHNCLEVBQXVzQixHQUF2c0IsRUFBNHNCLEdBQTVzQixFQUFpdEIsR0FBanRCLEVBQXN0QixHQUF0dEIsRUFBMnRCLEdBQTN0QixFQUFndUIsR0FBaHVCLEVBQXF1QixHQUFydUIsRUFBMHVCLEdBQTF1QixFQUErdUIsR0FBL3VCLEVBQW92QixHQUFwdkIsRUFBeXZCLEdBQXp2QixFQUE4dkIsR0FBOXZCLEVBQW13QixHQUFud0IsRUFBd3dCLEdBQXh3QixFQUE2d0IsR0FBN3dCLEVBQWt4QixHQUFseEIsRUFBdXhCLEdBQXZ4QixFQUE0eEIsR0FBNXhCLEVBQWl5QixHQUFqeUIsRUFBc3lCLEdBQXR5QixFQUEyeUIsR0FBM3lCLEVBQWd6QixHQUFoekIsRUFBcXpCLEdBQXJ6QixFQUEwekIsR0FBMXpCLEVBQSt6QixHQUEvekIsRUFBbzBCLEdBQXAwQixFQUF5MEIsR0FBejBCLEVBQTgwQixHQUE5MEIsRUFBbTFCLEdBQW4xQixFQUF3MUIsR0FBeDFCLEVBQTYxQixHQUE3MUIsRUFBazJCLEdBQWwyQixFQUF1MkIsR0FBdjJCLEVBQTQyQixHQUE1MkIsRUFBaTNCLEdBQWozQixFQUFzM0IsR0FBdDNCLEVBQTIzQixHQUEzM0IsRUFBZzRCLEdBQWg0QixFQUFxNEIsR0FBcjRCLEVBQTA0QixHQUExNEIsRUFBKzRCLEdBQS80QixFQUFvNUIsR0FBcDVCLEVBQXk1QixHQUF6NUIsRUFBODVCLEdBQTk1QixFQUFtNkIsR0FBbjZCLEVBQXc2QixHQUF4NkIsRUFBNjZCLEdBQTc2QixFQUFrN0IsR0FBbDdCLEVBQXU3QixHQUF2N0IsRUFBNDdCLEdBQTU3QixFQUFpOEIsR0FBajhCLEVBQXM4QixHQUF0OEIsRUFBMjhCLEdBQTM4QixFQUFnOUIsR0FBaDlCLEVBQXE5QixHQUFyOUIsRUFBMDlCLEdBQTE5QixFQUErOUIsR0FBLzlCLEVBQW8rQixHQUFwK0IsRUFBeStCLEdBQXorQixFQUE4K0IsR0FBOStCLEVBQW0vQixHQUFuL0IsRUFBdy9CLEdBQXgvQixFQUE2L0IsR0FBNy9CLEVBQWtnQyxHQUFsZ0MsRUFBdWdDLEdBQXZnQyxFQUE0Z0MsR0FBNWdDLEVBQWloQyxHQUFqaEMsRUFBc2hDLEdBQXRoQyxFQUEyaEMsR0FBM2hDLEVBQWdpQyxHQUFoaUMsRUFBcWlDLEdBQXJpQyxFQUEwaUMsR0FBMWlDLEVBQStpQyxHQUEvaUMsRUFBb2pDLEdBQXBqQyxFQUF5akMsR0FBempDLEVBQThqQyxHQUE5akMsRUFBbWtDLEdBQW5rQyxFQUF3a0MsR0FBeGtDLEVBQTZrQyxHQUE3a0MsRUFBa2xDLEdBQWxsQyxFQUF1bEMsR0FBdmxDLEVBQTRsQyxHQUE1bEMsRUFBaW1DLEdBQWptQyxFQUFzbUMsR0FBdG1DLEVBQTJtQyxHQUEzbUMsRUFBZ25DLEdBQWhuQyxFQUFxbkMsR0FBcm5DLEVBQTBuQyxHQUExbkMsRUFBK25DLEdBQS9uQyxFQUFvb0MsR0FBcG9DLEVBQXlvQyxHQUF6b0MsRUFBOG9DLEdBQTlvQyxFQUFtcEMsR0FBbnBDLEVBQXdwQyxHQUF4cEMsRUFBNnBDLEdBQTdwQyxFQUFrcUMsR0FBbHFDLEVBQXVxQyxHQUF2cUMsRUFBNHFDLEdBQTVxQyxFQUFpckMsR0FBanJDLEVBQXNyQyxHQUF0ckMsRUFBMnJDLEdBQTNyQyxFQUFnc0MsR0FBaHNDLEVBQXFzQyxHQUFyc0MsRUFBMHNDLEdBQTFzQyxFQUErc0MsR0FBL3NDLEVBQW90QyxHQUFwdEMsRUFBeXRDLEdBQXp0QyxFQUE4dEMsR0FBOXRDLEVBQW11QyxHQUFudUMsRUFBd3VDLEdBQXh1QyxFQUE2dUMsR0FBN3VDLEVBQWt2QyxHQUFsdkMsRUFBdXZDLEdBQXZ2QyxDQUFYO0VBQ0FDLFdBQVcsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLEVBQXdCLEVBQXhCLEVBQTRCLEVBQTVCLEVBQWdDLEVBQWhDLEVBQW9DLEVBQXBDLEVBQXdDLEVBQXhDLEVBQTRDLEVBQTVDLEVBQWdELEVBQWhELEVBQW9ELEVBQXBELEVBQXdELEVBQXhELEVBQTRELEVBQTVELEVBQWdFLEVBQWhFLEVBQW9FLEVBQXBFLEVBQXdFLEVBQXhFLEVBQTRFLEVBQTVFLEVBQWdGLEVBQWhGLEVBQW9GLEVBQXBGLEVBQXdGLEVBQXhGLEVBQTRGLEVBQTVGLEVBQWdHLEVBQWhHLEVBQW9HLEVBQXBHLEVBQXdHLEVBQXhHLEVBQTRHLEVBQTVHLEVBQWdILEVBQWhILEVBQW9ILEVBQXBILEVBQXdILEVBQXhILEVBQTRILEVBQTVILEVBQWdJLEVBQWhJLEVBQW9JLEVBQXBJLEVBQXdJLEVBQXhJLEVBQTRJLEVBQTVJLEVBQWdKLEVBQWhKLEVBQW9KLEVBQXBKLEVBQXdKLEVBQXhKLEVBQTRKLEVBQTVKLEVBQWdLLEVBQWhLLEVBQW9LLEVBQXBLLEVBQXdLLEVBQXhLLEVBQTRLLEVBQTVLLEVBQWdMLEVBQWhMLEVBQW9MLEVBQXBMLEVBQXdMLEVBQXhMLEVBQTRMLEVBQTVMLEVBQWdNLEVBQWhNLEVBQW9NLEVBQXBNLEVBQXdNLEVBQXhNLEVBQTRNLEVBQTVNLEVBQWdOLEVBQWhOLEVBQW9OLEVBQXBOLEVBQXdOLEVBQXhOLEVBQTROLEVBQTVOLEVBQWdPLEVBQWhPLEVBQW9PLEVBQXBPLEVBQXdPLEVBQXhPLEVBQTRPLEVBQTVPLEVBQWdQLEVBQWhQLEVBQW9QLEVBQXBQLEVBQXdQLEVBQXhQLEVBQTRQLEVBQTVQLEVBQWdRLEVBQWhRLEVBQW9RLEVBQXBRLEVBQXdRLEVBQXhRLEVBQTRRLEVBQTVRLEVBQWdSLEVBQWhSLEVBQW9SLEVBQXBSLEVBQXdSLEVBQXhSLEVBQTRSLEVBQTVSLEVBQWdTLEVBQWhTLEVBQW9TLEVBQXBTLEVBQXdTLEVBQXhTLEVBQTRTLEVBQTVTLEVBQWdULEVBQWhULEVBQW9ULEVBQXBULEVBQXdULEVBQXhULEVBQTRULEVBQTVULEVBQWdVLEVBQWhVLEVBQW9VLEVBQXBVLEVBQXdVLEVBQXhVLEVBQTRVLEVBQTVVLEVBQWdWLEVBQWhWLEVBQW9WLEVBQXBWLEVBQXdWLEVBQXhWLEVBQTRWLEVBQTVWLEVB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
