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
  var $ = function $(sel) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    if ((typeof sel === 'undefined' ? 'undefined' : _typeof(sel)) === 'object') {
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


      // @property [String] Set the URL of the image proxy script.


      // @property [Boolean] Allow reverting the canvas?
      // If your JS process is running out of memory, disabling
      // this could help drastically.

      // The current version.
      value: function toString() {
        return 'Version ' + Caman.version.release + ', Released ' + Caman.version.date;
      }

      // Get the ID assigned to this canvas by Caman.
      // @param [DOMObject] canvas The canvas to inspect.
      // @return [String] The Caman ID associated with this canvas.


      // @property [Boolean] Should we check the DOM for images with Caman instructions?


      // @proparty [String] The GET param used with the proxy script.


      // @property [String] Default cross-origin policy.


      // @property [Boolean] Debug mode enables console logging.

    }, {
      key: 'getAttrId',
      value: function getAttrId(canvas) {
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
       * Begins the setup process
       *
       * @memberof Caman
       */

    }, {
      key: 'setup',
      value: function setup() {
        switch (this.initType) {
          case 'img':
            this.initImage();
            break;
          case 'canvas':
            this.initCanvas();
            break;
        }
      }

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

        Store.put(this.id, this);

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
        if (this.canvas.getAttribute('data-caman-id')) {
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

        oldCanvas.parentNode.replaceChild(this.canvas, oldCanvas);

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
       *
       * @see Caman
       */

    }, {
      key: 'save',
      value: function save() {
        this.browserSave.apply(this, arguments);
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
  Object.defineProperty(Caman, 'wechat', {
    enumerable: true,
    writable: true,
    value: typeof wx !== 'undefined'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtYW4uanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb3JlL21vZHVsZS5qcyIsIi4uL3NyYy9jb3JlL3V0aWwuanMiLCIuLi9zcmMvY29yZS9zdG9yZS5qcyIsIi4uL3NyYy9jb3JlL2FuYWx5emUuanMiLCIuLi9zcmMvY29yZS9ldmVudC5qcyIsIi4uL3NyYy9jb3JlL2ZpbHRlci5qcyIsIi4uL3NyYy9jb3JlL2xvZ2dlci5qcyIsIi4uL3NyYy9jb3JlL3BsdWdpbi5qcyIsIi4uL3NyYy9jb3JlL3BpeGVsLmpzIiwiLi4vc3JjL2NvcmUvaW8uanMiLCIuLi9zcmMvY29yZS9yZW5kZXJlci5qcyIsIi4uL3NyYy9jb3JlL2JsZW5kZXIuanMiLCIuLi9zcmMvY29yZS9sYXllci5qcyIsIi4uL3NyYy9jb3JlL2NhbWFuLmpzIiwiLi4vc3JjL2xpYi9ibGVuZGVycy5qcyIsIi4uL3NyYy9jb3JlL2NvbnZlcnQuanMiLCIuLi9zcmMvY29yZS9jYWxjdWxhdGUuanMiLCIuLi9zcmMvbGliL2ZpbHRlcnMuanMiLCIuLi9zcmMvbGliL2NhbWVyYS5qcyIsIi4uL3NyYy9saWIvYmx1ci5qcyIsIi4uL3NyYy9saWIvcG9zdGVyaXplLmpzIiwiLi4vc3JjL2xpYi9wcmVzZXRzLmpzIiwiLi4vc3JjL2xpYi9zdGFja0JsdXIuanMiLCIuLi9zcmMvbGliL3BsdWdpbnMuanMiLCIuLi9zcmMvY29yZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IG1vZHVsZUtleXdvcmRzID0gWydleHRlbmRlZCcsICdpbmNsdWRlZCddXG5cbi8qKlxuICogRm9yIHRoZSBwYXJ0cyBvZiB0aGlzIGNvZGUgYWRhcHRlZCBmcm9tIGh0dHA6Ly9hcmN0dXJvLmdpdGh1Yi5jb20vbGlicmFyeS9jb2ZmZWVzY3JpcHQvMDNfY2xhc3Nlcy5odG1sXG4gKiBiZWxvdyBpcyB0aGUgcmVxdWlyZWQgY29weXJpZ2h0IG5vdGljZS5cbiAqIENvcHlyaWdodCAoYykgMjAxMSBBbGV4YW5kZXIgTWFjQ2F3IChpbmZvQGVyaWJpdW0ub3JnKVxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIE1vZHVsZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2R1bGUge1xuICAvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0IGl0c2VsZiBsaWtlIGEgc3RhdGljIG1ldGhvZFxuICBzdGF0aWMgZXh0ZW5kcyAob2JqKSB7XG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgaWYgKG1vZHVsZUtleXdvcmRzLmluZGV4T2YgPT09IC0xKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IG9ialtrZXldXG4gICAgICB9XG4gICAgfVxuICAgIG9iai5leHRlbmRlZCAmJiBvYmouZXh0ZW5kZWQuYXBwbHkodGhpcylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gSW5jbHVkZSBtZXRob2RzIG9uIHRoZSBvYmplY3QgcHJvdG90eXBlXG4gIHN0YXRpYyBpbmNsdWRlcyAob2JqKSB7XG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgaWYgKG1vZHVsZUtleXdvcmRzLmluZGV4T2YgPT09IC0xKSB7XG4gICAgICAgIHRoaXMucHJvdG90eXBlW2tleV0gPSBvYmpba2V5XVxuICAgICAgfVxuICAgIH1cbiAgICBvYmouaW5jbHVkZWQgJiYgb2JqLmluY2x1ZGVkLmFwcGx5KHRoaXMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIEFkZCBtZXRob2RzIG9uIHRoaXMgcHJvdG90eXBlIHRoYXQgcG9pbnQgdG8gYW5vdGhlciBtZXRob2RcbiAgLy8gb24gYW5vdGhlciBvYmplY3QncyBwcm90b3R5cGUuXG4gIHN0YXRpYyBkZWxlZ2F0ZSAoLi4uYXJncykge1xuICAgIGNvbnN0IHRhcmdldCA9IGFyZ3MucG9wKClcbiAgICBmb3IgKGxldCBpIGluIGFyZ3MpIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IGFyZ3NbaV1cbiAgICAgIHRoaXMucHJvdG90eXBlW3NvdXJjZV0gPSB0YXJnZXQucHJvdG90eXBlW3NvdXJjZV1cbiAgICB9XG4gIH1cblxuICAvLyBDcmVhdGUgYW4gYWxpYXMgZm9yIGEgZnVuY3Rpb25cbiAgc3RhdGljIGFsaWFzRnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgdGhpcy5wcm90b3R5cGVbdG9dID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgIHRoaXMucHJvdG90eXBlW2Zyb21dLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgfVxuICB9XG5cbiAgLy8gQ3JlYXRlIGFuIGFsaWFzIGZvciBhIHByb3BlcnR5XG4gIHN0YXRpYyBhbGlhc1Byb3BlcnR5ICh0bywgZnJvbSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLnByb3RvdHlwZSwgdG8sIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbZnJvbV1cbiAgICAgIH0sXG4gICAgICBzZXQgKHZhbCkge1xuICAgICAgICB0aGlzW2Zyb21dID0gdmFsXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIEV4ZWN1dGUgYSBmdW5jdGlvbiBpbiB0aGUgY29udGV4dCBvZiB0aGUgb2JqZWN0LFxuICAvLyBhbmQgcGFzcyBhIHJlZmVyZW5jZSB0byB0aGUgb2JqZWN0J3MgcHJvdG90eXBlLlxuICBzdGF0aWMgaW5jbHVkZWQgKGZ1bmMpIHtcbiAgICBmdW5jLmNhbGwodGhpcywgdGhpcy5wcm90b3R5cGUpXG4gIH1cbn1cbiIsIi8vIERPTSBzaW1wbGlmaWVyIChubyBqUXVlcnkgZGVwZW5kZW5jeSlcbmV4cG9ydCBjb25zdCAkID0gKHNlbCwgcm9vdCA9IGRvY3VtZW50KSA9PiB7XG4gIGlmICh0eXBlb2Ygc2VsID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBzZWxcbiAgfVxuICByZXR1cm4gcm9vdC5xdWVyeVNlbGVjdG9yKHNlbClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AgKCkge31cblxuLyoqXG4gKlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBVdGlsXG4gKi9cbmV4cG9ydCBjbGFzcyBVdGlsIHtcbiAgc3RhdGljIHVuaXFpZCAoKSB7XG4gICAgbGV0IGlkID0gMFxuICAgIHJldHVybiB7XG4gICAgICBnZXQgKCkge1xuICAgICAgICByZXR1cm4gaWQrK1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0aGF0IGV4dGVuZHMgb25lIG9iamVjdCB3aXRoIGFsbCB0aGUgcHJvcGVyaWVzIG9mIG90aGVyIG9iamVjdHNcbiAgc3RhdGljIGV4dGVuZCAob2JqLCAuLi5zcmMpIHtcbiAgICBjb25zdCBkZXN0ID0gb2JqXG4gICAgZm9yIChsZXQgaSBpbiBzcmMpIHtcbiAgICAgIGxldCBjb3B5ID0gc3JjW2ldXG4gICAgICBmb3IgKGxldCBwcm9wIGluIGNvcHkpIHtcbiAgICAgICAgaWYgKGNvcHkuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICBkZXN0W3Byb3BdID0gY29weVtwcm9wXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlc3RcbiAgfVxuXG4gIC8vIEluIG9yZGVyIHRvIHN0YXkgdHJ1ZSB0byB0aGUgbGF0ZXN0IHNwZWMsIFJHQiB2YWx1ZXMgbXVzdCBiZSBjbGFtcGVkIGJldHdlZW4gMCBhbmQgMjU1LiBJZiB3ZSBkb24ndCBkbyB0aGlzLCB3ZWlyZCB0aGluZ3MgaGFwcGVuLlxuICBzdGF0aWMgY2xhbXBSR0IgKHZhbCkge1xuICAgIGlmICh2YWwgPCAwKSB7XG4gICAgICByZXR1cm4gMFxuICAgIH1cbiAgICBpZiAodmFsID4gMjU1KSB7XG4gICAgICByZXR1cm4gMjU1XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbFxuICB9XG5cbiAgc3RhdGljIGNvcHlBdHRyaWJ1dGVzIChmcm9tLCB0bywgb3B0cyA9IHt9KSB7XG4gICAgZm9yIChsZXQgaSBpbiBmcm9tLmF0dHJpYnV0ZXMpIHtcbiAgICAgIGxldCBhdHRyID0gZnJvbS5hdHRyaWJ1dGVzW2ldXG4gICAgICBpZiAob3B0cy5leGNlcHQgJiYgb3B0cy5leGNlcHQuaW5kZXhPZihhdHRyLm5vZGVOYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIHRvLnNldEF0dHJpYnV0ZShhdHRyLm5vZGVOYW1lLCBhdHRyLm5vZGVWYWx1ZSlcbiAgICB9XG4gIH1cblxuICAvLyBTdXBwb3J0IGZvciBicm93c2VycyB0aGF0IGRvbid0IGtub3cgVWludDhBcnJheSAoc3VjaCBhcyBJRTkpXG4gIHN0YXRpYyBkYXRhQXJyYXkgKGxlbmd0aCA9IDApIHtcbiAgICBpZiAoVWludDhBcnJheSkge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBBcnJheShsZW5ndGgpXG4gIH1cbn1cbiIsIi8qKlxuICogVXNlZCBmb3Igc3RvcmluZyBpbnN0YW5jZXMgb2YgQ2FtYW5JbnN0YW5jZSBvYmplY3RzIHN1Y2ggdGhhdCwgd2hlbiBDYW1hbigpIGlzIGNhbGxlZCBvbiBhbiBhbHJlYWR5IGluaXRpYWxpemVkIGVsZW1lbnQsIGl0IHJldHVybnMgdGhhdCBvYmplY3QgaW5zdGVhZCBvZiByZS1pbml0aWFsaXppbmcuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIFN0b3JlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlIHtcbiAgc3RhdGljIGl0ZW1zID0ge31cblxuICBzdGF0aWMgaGFzIChzZWFyY2gpIHtcbiAgICByZXR1cm4gISF0aGlzLml0ZW1zW3NlYXJjaF1cbiAgfVxuXG4gIHN0YXRpYyBnZXQgKHNlYXJjaCkge1xuICAgIHJldHVybiB0aGlzLml0ZW1zW3NlYXJjaF1cbiAgfVxuXG4gIHN0YXRpYyBwdXQgKG5hbWUsIG9iaikge1xuICAgIHRoaXMuaXRlbXNbbmFtZV0gPSBvYmpcbiAgfVxuXG4gIHN0YXRpYyBleGVjdXRlIChzZWFyY2gsIGNhbGxiYWNrKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMuZ2V0KHNlYXJjaCksIHRoaXMuZ2V0KHNlYXJjaCkpXG4gICAgfSwgMClcblxuICAgIHJldHVybiB0aGlzLmdldChzZWFyY2gpXG4gIH1cblxuICBzdGF0aWMgZmx1c2ggKG5hbWUgPSBmYWxzZSkge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICBkZWxldGUgdGhpcy5pdGVtc1tuYW1lXVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLml0ZW1zID0ge31cbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogVmFyaW91cyBpbWFnZSBhbmFseXNpcyBtZXRob2RzXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEFuYWx5emVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5hbHl6ZSB7XG4gIGNvbnN0cnVjdG9yIChjKSB7XG4gICAgdGhpcy5jID0gY1xuICB9XG5cbiAgLy8gQHJldHVybiB7T2JqZWN0fSBIYXNoIG9mIFJHQiBjaGFubmVscyBhbmQgdGhlIG9jY3VycmVuY2Ugb2YgZWFjaCB2YWx1ZVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBudW1iZXIgb2Ygb2NjdXJyZW5jZXMgb2YgZWFjaCBjb2xvciB2YWx1ZSB0aHJvdWdob3V0IHRoZSBpbWFnZS5cbiAgICpcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gSGFzaCBvZiBSR0IgY2hhbm5lbHMgYW5kIHRoZSBvY2N1cnJlbmNlcyBvZiBlYWNoIHZhbHVlXG4gICAqIEBtZW1iZXJvZiBBbmFseXplXG4gICAqL1xuICBjYWxjdWxhdGVMZXZlbHMgKCkge1xuICAgIGNvbnN0IGxldmVscyA9IHtcbiAgICAgIHI6IHt9LFxuICAgICAgZzoge30sXG4gICAgICBiOiB7fVxuICAgIH1cbiAgICAvLyBJbml0aWFsaXplIGFsbCB2YWx1ZXMgdG8gMCBmaXJzdCBzbyB0aGVyZSBhcmUgbm8gZGF0YSBnYXBzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMjU1OyBpKyspIHtcbiAgICAgIGxldmVscy5yW2ldID0gMFxuICAgICAgbGV2ZWxzLmdbaV0gPSAwXG4gICAgICBsZXZlbHMuYltpXSA9IDBcbiAgICB9XG5cbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggZWFjaCBwaXhlbCBibG9jayBhbmQgaW5jcmVtZW50IHRoZSBsZXZlbCBjb3VudGVyc1xuICAgIGZvciAobGV0IGkgPSAwLCBqID0gdGhpcy5jLnBpeGVsRGF0YS5sZW5ndGg7IGkgPCBqOyBpICs9IDQpIHtcbiAgICAgIGxldmVscy5yW3RoaXMuYy5waXhlbERhdGFbaV1dKytcbiAgICAgIGxldmVscy5nW3RoaXMuYy5waXhlbERhdGFbaSArIDFdXSsrXG4gICAgICBsZXZlbHMuYlt0aGlzLmMucGl4ZWxEYXRhW2kgKyAyXV0rK1xuICAgIH1cblxuICAgIC8vIE5vcm1hbGl6ZSBhbGwgb2YgdGhlIG51bWJlcnMgYnkgY29udmVydGluZyB0aGVtIHRvIHBlcmNlbnRhZ2VzIGJldHdlZW5cbiAgICAvLyAwIGFuZCAxLjBcbiAgICBjb25zdCBudW1QaXhlbHMgPSB0aGlzLmMucGl4ZWxEYXRhLmxlbmd0aCAvIDRcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDI1NTsgaSsrKSB7XG4gICAgICBsZXZlbHMucltpXSAvPSBudW1QaXhlbHNcbiAgICAgIGxldmVscy5nW2ldIC89IG51bVBpeGVsc1xuICAgICAgbGV2ZWxzLmJbaV0gLz0gbnVtUGl4ZWxzXG4gICAgfVxuICAgIHJldHVybiBsZXZlbHNcbiAgfVxufVxuIiwiLyoqXG4gKiBFdmVudCBzeXN0ZW0gdGhhdCBjYW4gYmUgdXNlZCB0byByZWdpc3RlciBjYWxsYmFja3MgdGhhdCBnZXQgZmlyZWQgZHVyaW5nIGNlcnRhaW4gdGltZXMgaW4gdGhlIHJlbmRlciBwcm9jZXNzLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBFdmVudFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudCB7XG4gIHN0YXRpYyBldmVudHMgPSB7fVxuICAvLyBBbGwgb2YgdGhlIHN1cHBvcnRlZCBldmVudCB0eXBlc1xuICBzdGF0aWMgdHlwZXMgPSBbXG4gICAgJ3Byb2Nlc3NTdGFydCcsXG4gICAgJ3Byb2Nlc3NDb21wbGV0ZScsXG4gICAgJ3JlbmRlclN0YXJ0JyxcbiAgICAncmVuZGVyRmluaXNoZWQnLFxuICAgICdibG9ja1N0YXJ0ZWQnLFxuICAgICdibG9ja0ZpbmlzaGVkJ1xuICBdXG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgYW4gZXZlbnQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgQ2FtYW4gfSB0YXJnZXQgSW5zdGFuY2Ugb2YgQ2FtYW4gZW1pdHRpbmcgdGhlIGV2ZW50LlxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSB0eXBlIFRoZSBldmVudCB0eXBlLlxuICAgKiBAcGFyYW0geyBPYmplY3QgfSBbZGF0YT1udWxsXSBFeHRyYSBkYXRhIHRvIHNlbmQgd2l0aCB0aGUgZXZlbnQuXG4gICAqIEBtZW1iZXJvZiBFdmVudFxuICAgKi9cbiAgc3RhdGljIHRyaWdnZXIgKHRhcmdldCwgdHlwZSwgZGF0YSA9IG51bGwpIHtcbiAgICBpZiAodGhpcy5ldmVudHNbdHlwZV0gJiYgdGhpcy5ldmVudHNbdHlwZV0ubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpIGluIHRoaXMuZXZlbnRzW3R5cGVdKSB7XG4gICAgICAgIGxldCBldmVudCA9IHRoaXMuZXZlbnRzW3R5cGVdW2ldXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IG51bGwgfHwgdGFyZ2V0LmlkID09PSBldmVudC50YXJnZXQuaWQpIHtcbiAgICAgICAgICBldmVudC5mbi5jYWxsKHRhcmdldCwgZGF0YSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gZm9yIGFuIGV2ZW50LiBPcHRpb25hbGx5IGJpbmQgdGhlIGxpc3RlbiB0byBhIHNpbmdsZSBpbnN0YW5jZSBvciBhbGwgaW5zdGFuY2VzLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBvdmVybG9hZCBsaXN0ZW4odGFyZ2V0LCB0eXBlLCBmbilcbiAgICogTGlzdGVuIGZvciBldmVudHMgZW1pdHRlZCBmcm9tIGEgcGFydGljdWxhciBDYW1hbiBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHsgQ2FtYW4gfSB0YXJnZXQgVGhlIGluc3RhbmNlIHRvIGxpc3RlbiB0by5cbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gdHlwZSBUaGUgdHlwZSBvZiBldmVudCB0byBsaXN0ZW4gZm9yLlxuICAgKiBAcGFyYW0geyBGdW5jdGlvbiB9IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cbiAgICpcbiAgICogQG92ZXJsb2FkIGxpc3Rlbih0eXBlLCBmbilcbiAgICogTGlzdGVuIGZvciBhbiBldmVudCBmcm9tIGFsbCBDYW1hbiBpbnN0YW5jZXMuXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHR5cGUgVGhlIHR5cGUgb2YgZXZlbnQgdG8gbGlzdGVuIGZvci5cbiAgICogQHBhcmFtIHsgRnVuY3Rpb24gfSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAqIEBtZW1iZXJvZiBFdmVudFxuICAgKi9cbiAgc3RhdGljIGxpc3RlbiAodGFyZ2V0LCB0eXBlLCBmbikge1xuICAgIC8vIEFkanVzdCBhcmd1bWVudHMgaWYgdGFyZ2V0IGlzIG9taXR0ZWRcbiAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IF90eXBlID0gdGFyZ2V0XG4gICAgICBjb25zdCBfZm4gPSB0eXBlXG5cbiAgICAgIHRhcmdldCA9IG51bGxcbiAgICAgIHR5cGUgPSBfdHlwZVxuXG4gICAgICBmbiA9IF9mblxuICAgIH1cblxuICAgIC8vIFZhbGlkYXRpb25cbiAgICBpZiAodGhpcy50eXBlcy5pbmRleE9mKHR5cGUpID09PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmV2ZW50c1t0eXBlXSkge1xuICAgICAgdGhpcy5ldmVudHNbdHlwZV0gPSBbXVxuICAgIH1cbiAgICB0aGlzLmV2ZW50c1t0eXBlXS5wdXNoKHt0YXJnZXQsIGZufSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59XG4iLCJpbXBvcnQgQ2FtYW4gZnJvbSAnLi9jYW1hbidcblxuLyoqXG4gKiBSZXNwb25zaWJsZSBmb3IgcmVnaXN0ZXJpbmcgYW5kIHN0b3JpbmcgYWxsIG9mIHRoZSBmaWx0ZXJzLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBGaWx0ZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsdGVyIHtcbiAgLy8gQWxsIG9mIHRoZSBkaWZmZXJlbnQgcmVuZGVyIG9wZXJhdGl2ZXNcbiAgc3RhdGljIFR5cGUgPSB7XG4gICAgU2luZ2xlOiAxLFxuICAgIEtlcm5lbDogMixcbiAgICBMYXllckRlcXVldWU6IDMsXG4gICAgTGF5ZXJGaW5pc2hlZDogNCxcbiAgICBMb2FkT3ZlcmxheTogNSxcbiAgICBQbHVnaW46IDZcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBmaWx0ZXIgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZmlsdGVyLlxuICAgKiBAcGFyYW0geyBGdW5jdGlvbiB9IGZpbHRlckZ1bmMgVGhlIGZpbHRlciBmdW5jdGlvbi5cbiAgICogQG1lbWJlcm9mIEZpbHRlclxuICAgKi9cbiAgc3RhdGljIHJlZ2lzdGVyIChuYW1lLCBmaWx0ZXJGdW5jKSB7XG4gICAgQ2FtYW4ucHJvdG90eXBlW25hbWVdID0gZmlsdGVyRnVuY1xuICB9XG59XG4iLCJpbXBvcnQgQ2FtYW4gZnJvbSAnLi9jYW1hbidcbi8qKlxuICogU2ltcGxlIGNvbnNvbGUgbG9nZ2VyIGNsYXNzIHRoYXQgY2FuIGJlIHRvZ2dsZWQgb24gYW5kIG9mZiBiYXNlZCBvbiBDYW1hbi5ERUJVR1xuICpcbiAqIEBjbGFzcyBMb2dnZXJcbiAqL1xuY2xhc3MgTG9nZ2VyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIGNvbnN0IGxvZ0xldmVsID0gWydsb2cnLCAnaW5mbycsICd3YXJuJywgJ2Vycm9yJ11cbiAgICBmb3IgKGxldCBpIGluIGxvZ0xldmVsKSB7XG4gICAgICBjb25zdCBuYW1lID0gbG9nTGV2ZWxbaV1cbiAgICAgIHRoaXNbbmFtZV0gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICBpZiAoIUNhbWFuLkRFQlVHKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zb2xlW25hbWVdLmFwcGx5KGNvbnNvbGUsIGFyZ3MpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBXZSdyZSBwcm9iYWJseSB1c2luZyBJRTkgb3IgZWFybGllclxuICAgICAgICAgIGNvbnNvbGVbbmFtZV0oYXJncylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRlYnVnID0gdGhpcy5sb2dcbiAgfVxufVxuXG5jb25zdCBMb2cgPSBuZXcgTG9nZ2VyKClcbmV4cG9ydCBkZWZhdWx0IExvZ1xuIiwiLyoqXG4gKiBTdG9yZXMgYW5kIHJlZ2lzdGVycyBzdGFuZGFsb25lIHBsdWdpbnNcbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUGx1Z2luXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbiB7XG4gIHN0YXRpYyBwbHVnaW5zID0ge31cblxuICBzdGF0aWMgcmVnaXN0ZXIgKG5hbWUsIHBsdWdpbikge1xuICAgIHRoaXMucGx1Z2luc1tuYW1lXSA9IHBsdWdpblxuICB9XG5cbiAgc3RhdGljIGV4ZWN1dGUgKGNvbnRleHQsIG5hbWUsIGFyZ3MpIHtcbiAgICB0aGlzLnBsdWdpbnNbbmFtZV0uYXBwbHkoY29udGV4dCwgYXJncylcbiAgfVxufVxuIiwiLyoqXG4gKiBSZXByZXNlbnRzIGEgc2luZ2xlIFBpeGVsIGluIGFuIGltYWdlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBQaXhlbFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaXhlbCB7XG4gIHN0YXRpYyBjb29yZGluYXRlc1RvTG9jYXRpb24gKHgsIHksIHdpZHRoKSB7XG4gICAgcmV0dXJuICh5ICogd2lkdGggKyB4KSAqIDRcbiAgfVxuICBzdGF0aWMgbG9jYXRpb25Ub0Nvb3JkaW5hdGVzIChsb2MsIHdpZHRoKSB7XG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IobG9jIC8gKHdpZHRoICogNCkpXG4gICAgY29uc3QgeCA9IChsb2MgJSAod2lkdGggKiA0KSkgLyA0XG5cbiAgICByZXR1cm4ge3gsIHl9XG4gIH1cblxuICBjb25zdHJ1Y3RvciAociA9IDAsIGcgPSAwLCBiID0gMCwgYSA9IDI1NSwgYyA9IG51bGwpIHtcbiAgICB0aGlzLmxvYyA9IDBcbiAgICB0aGlzLnIgPSByXG4gICAgdGhpcy5nID0gZ1xuICAgIHRoaXMuYiA9IGJcbiAgICB0aGlzLmEgPSBhXG4gICAgdGhpcy5jID0gY1xuICB9XG5cbiAgc2V0Q29udGV4dCAoYykge1xuICAgIHRoaXMuYyA9IGNcbiAgfVxuXG4gIC8vIFJldHJpZXZlcyB0aGUgWCwgWSBsb2NhdGlvbiBvZiB0aGUgY3VycmVudCBwaXhlbC4gVGhlIG9yaWdpbiBpcyBhdCB0aGUgYm90dG9tIGxlZnQgY29ybmVyIG9mIHRoZSBpbWFnZSwgbGlrZSBhIG5vcm1hbCBjb29yZGluYXRlIHN5c3RlbS5cbiAgbG9jYXRpb25YWSAoKSB7XG4gICAgaWYgKCF0aGlzLmMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZXMgYSBDYW1hbkpTIGNvbnRleHQnKVxuICAgIH1cbiAgICBjb25zdCB5ID0gdGhpcy5jLmRpbWVuc2lvbnMuaGVpZ2h0IC0gTWF0aC5mbG9vcih0aGlzLmxvYyAvICh0aGlzLmMuZGltZW5zaW9ucy53aWR0aCAqIDQpKVxuICAgIGNvbnN0IHggPSAodGhpcy5sb2MgJSAodGhpcy5jLmRpbWVuc2lvbnMud2lkdGggKiA0KSkgLyA0XG5cbiAgICByZXR1cm4ge3gsIHl9XG4gIH1cblxuICBwaXhlbEF0TG9jYXRpb24gKGxvYykge1xuICAgIGlmICghdGhpcy5jKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVpcmVzIGEgQ2FtYW5KUyBjb250ZXh0JylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBpeGVsKFxuICAgICAgdGhpcy5jLnBpeGVsRGF0YVtsb2NdLFxuICAgICAgdGhpcy5jLnBpeGVsRGF0YVtsb2MgKyAxXSxcbiAgICAgIHRoaXMuYy5waXhlbERhdGFbbG9jICsgMl0sXG4gICAgICB0aGlzLmMucGl4ZWxEYXRhW2xvYyArIDNdLFxuICAgICAgdGhpcy5jXG4gICAgKVxuICB9XG5cbiAgLy8gUmV0dXJucyBhbiBSR0JBIG9iamVjdCBmb3IgYSBwaXhlbCB3aG9zZSBsb2NhdGlvbiBpcyBzcGVjaWZpZWQgaW4gcmVsYXRpb24gdG8gdGhlIGN1cnJlbnQgcGl4ZWwuXG4gIGdldFBpeGVsUmVsYXRpdmUgKGhvcml6LCB2ZXJ0KSB7XG4gICAgaWYgKCF0aGlzLmMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZXMgYSBDYW1hbkpTIGNvbnRleHQnKVxuICAgIH1cblxuICAgIC8vIFdlIGludmVydCB0aGUgdmVydF9vZmZzZXQgaW4gb3JkZXIgdG8gbWFrZSB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gbm9uLWludmVydGVkLiBJbiBsYXltYW5zIHRlcm1zOiAtMSBtZWFucyBkb3duIGFuZCArMSBtZWFucyB1cC5cbiAgICBjb25zdCBuZXdMb2MgPSB0aGlzLmxvYyArICh0aGlzLmMuZGltZW5zaW9ucy53aWR0aCAqIDQgKiAodmVydCAqIC0xKSkgKyAoNCAqIGhvcml6KVxuXG4gICAgaWYgKG5ld0xvYyA+IHRoaXMuYy5waXhlbERhdGEubGVuZ3RoIHx8IG5ld0xvYyA8IDApIHtcbiAgICAgIHJldHVybiBuZXcgUGl4ZWwoMCwgMCwgMCwgMjU1LCB0aGlzLmMpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGl4ZWxBdExvY2F0aW9uKG5ld0xvYylcbiAgfVxuXG4gIC8vIFRoZSBjb3VudGVycGFydCB0byBnZXRQaXhlbFJlbGF0aXZlLCB0aGlzIHVwZGF0ZXMgdGhlIHZhbHVlIG9mIGEgcGl4ZWwgd2hvc2UgbG9jYXRpb24gaXMgc3BlY2lmaWVkIGluIHJlbGF0aW9uIHRvIHRoZSBjdXJyZW50IHBpeGVsLlxuICBzdGF0aWMgcHV0UGl4ZWxSZWxhdGl2ZSAoaG9yaXosIHZlcnQsIHJnYmEpIHtcbiAgICBpZiAoIXRoaXMuYykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlcyBhIENhbWFuSlMgY29udGV4dCcpXG4gICAgfVxuXG4gICAgY29uc3QgbmV3TG9jID0gdGhpcy5sb2MgKyAodGhpcy5jLmRpbWVuc2lvbnMud2lkdGggKiA0ICogKHZlcnQgKiAtMSkpICsgKDQgKiBob3JpeilcblxuICAgIGlmIChuZXdMb2MgPiB0aGlzLmMucGl4ZWxEYXRhLmxlbmd0aCB8fCBuZXdMb2MgPCAwKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLmMucGl4ZWxEYXRhW25ld0xvY10gPSByZ2JhLnJcbiAgICB0aGlzLmMucGl4ZWxEYXRhW25ld0xvYyArIDFdID0gcmdiYS5nXG4gICAgdGhpcy5jLnBpeGVsRGF0YVtuZXdMb2MgKyAyXSA9IHJnYmEuYlxuICAgIHRoaXMuYy5waXhlbERhdGFbbmV3TG9jICsgM10gPSByZ2JhLmFcblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICAvLyBHZXRzIGFuIFJHQkEgb2JqZWN0IGZvciBhbiBhcmJpdHJhcnkgcGl4ZWwgaW4gdGhlIGNhbnZhcyBzcGVjaWZpZWQgYnkgYWJzb2x1dGUgWCwgWSBjb29yZGluYXRlc1xuICBnZXRQaXhlbCAoeCwgeSkge1xuICAgIGlmICghdGhpcy5jKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVpcmVzIGEgQ2FtYW5KUyBjb250ZXh0JylcbiAgICB9XG5cbiAgICBjb25zdCBsb2MgPSB0aGlzLmNvb3JkaW5hdGVzVG9Mb2NhdGlvbih4LCB5LCB0aGlzLndpZHRoKVxuICAgIHJldHVybiB0aGlzLnBpeGVsQXRMb2NhdGlvbihsb2MpXG4gIH1cblxuICAvLyBVcGRhdGVzIHRoZSBwaXhlbCBhdCB0aGUgZ2l2ZW4gWCwgWSBjb29yZGluYXRlXG4gIHB1dFBpeGVsICh4LCB5LCByZ2JhKSB7XG4gICAgaWYgKCF0aGlzLmMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZXMgYSBDYW1hbkpTIGNvbnRleHQnKVxuICAgIH1cblxuICAgIGNvbnN0IGxvYyA9IHRoaXMuY29vcmRpbmF0ZXNUb0xvY2F0aW9uKHgsIHksIHRoaXMud2lkdGgpXG5cbiAgICB0aGlzLmMucGl4ZWxEYXRhW2xvY10gPSByZ2JhLnJcbiAgICB0aGlzLmMucGl4ZWxEYXRhW2xvYyArIDFdID0gcmdiYS5nXG4gICAgdGhpcy5jLnBpeGVsRGF0YVtsb2MgKyAyXSA9IHJnYmEuYlxuICAgIHRoaXMuYy5waXhlbERhdGFbbG9jICsgM10gPSByZ2JhLmFcbiAgfVxuXG4gIHRvU3RyaW5nICgpIHtcbiAgICB0aGlzLnRvS2V5KClcbiAgfVxuXG4gIHRvSGV4IChpbmNsdWRlQWxwaGEgPSBmYWxzZSkge1xuICAgIGxldCBoZXggPSBgIyR7dGhpcy5yLnRvU3RyaW5nKDE2KX0ke3RoaXMuZy50b1N0cmluZygxNil9JHt0aGlzLmIudG9TdHJpbmcoMTYpfWBcblxuICAgIGlmIChpbmNsdWRlQWxwaGEpIHtcbiAgICAgIGhleCArPSB0aGlzLmEudG9TdHJpbmcoMTYpXG4gICAgfVxuICAgIHJldHVybiBoZXhcbiAgfVxufVxuIiwiaW1wb3J0IENhbWFuIGZyb20gJy4vY2FtYW4nXG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nZ2VyJ1xuXG4vKipcbiAqIFZhcmlvdXMgSS9PIGJhc2VkIG9wZXJhdGlvbnNcbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgSU9cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSU8ge1xuICAvLyBVc2VkIGZvciBwYXJzaW5nIGltYWdlIFVSTHMgZm9yIGRvbWFpbiBuYW1lcy5cbiAgc3RhdGljIGRvbWFpblJlZ2V4ID0gLyg/Oig/Omh0dHB8aHR0cHMpOlxcL1xcLykoKD86XFx3KylcXC4oPzooPzpcXHd8XFwuKSspKS9cblxuICAvKipcbiAgICogSXMgdGhlIGdpdmVuIFVSTCByZW1vdGU/XG4gICAqIElmIGEgY3Jvc3Mtb3JpZ2luIHNldHRpbmcgaXMgc2V0LCB3ZSBhc3N1bWUgeW91IGhhdmUgQ09SUyBwcm9wZXJseSBjb25maWd1cmVkLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IERPTU9iamVjdCB9IGltZyBUaGUgaW1hZ2UgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHsgQm9vbGVhbiB9XG4gICAqIEBtZW1iZXJvZiBJT1xuICAgKi9cbiAgc3RhdGljIGlzUmVtb3RlIChpbWcpIHtcbiAgICBpZiAoIWltZykge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmICh0aGlzLmNvcnNFbmFibGVkKGltZykpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pc1VSTFJlbW90ZShpbWcuc3JjKVxuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGFuIGltYWdlLCB3ZSBjaGVjayB0byBzZWUgaWYgYSBDT1JTIHBvbGljeSBoYXMgYmVlbiBkZWZpbmVkLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IERPTU9iamVjdCB9IGltZyBUaGUgaW1hZ2UgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHsgQm9vbGVhbiB9XG4gICAqIEBtZW1iZXJvZiBJT1xuICAgKi9cbiAgc3RhdGljIGNvcnNFbmFibGVkIChpbWcpIHtcbiAgICByZXR1cm4gaW1nLmNyb3NzT3JpZ2luICYmIChpbWcuY3Jvc3NPcmlnaW4udG9Mb3dlckNhc2UoKSA9PT0gJ2Fub255bW91cycgfHwgaW1nLmNyb3NzT3JpZ2luLnRvTG93ZXJDYXNlKCkgPT09ICd1c2UtY3JlZGVudGlhbHMnKVxuICB9XG5cbiAgLyoqXG4gICAqIERvZXMgdGhlIGdpdmVuIFVSTCBleGlzdCBvbiBhIGRpZmZlcmVudCBkb21haW4gdGhhbiB0aGUgY3VycmVudCBvbmU/XG4gICAqIFRoaXMgaXMgZG9uZSBieSBjb21wYXJpbmcgdGhlIFVSTCB0byBgZG9jdW1lbnQuZG9tYWluYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBTdHJpbmcgfSB1cmwgVGhlIFVSTCB0byBjaGVjay5cbiAgICogQHJldHVybnMgeyBCb29sZWFuIH1cbiAgICogQG1lbWJlcm9mIElPXG4gICAqL1xuICBzdGF0aWMgaXNVUkxSZW1vdGUgKHVybCkge1xuICAgIGNvbnN0IG1hdGNoZXMgPSB1cmwubWF0Y2godGhpcy5kb21haW5SZWdleClcbiAgICByZXR1cm4gbWF0Y2hlcyA/IG1hdGNoZXNbMV0gIT09IGRvY3VtZW50LmRvbWFpbiA6IGZhbHNlXG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgVVJMIGlzIHJlbW90ZSwgYW5kIGlmIHRoZXJlIGlzIGEgcHJveHkgZGVmaW5lZFxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHNyYyBUaGUgVVJMIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7IFN0cmluZyB9IFRoZSBwcm94eSBVUkwgaWYgdGhlIGltYWdlIGlzIHJlbW90ZS4gTm90aGluZyBvdGhlcndpc2UuXG4gICAqIEBtZW1iZXJvZiBJT1xuICAgKi9cbiAgc3RhdGljIHJlbW90ZUNoZWNrIChzcmMpIHtcbiAgICBpZiAodGhpcy5pc1VSTFJlbW90ZShzcmMpKSB7XG4gICAgICBpZiAoIUNhbWFuLnJlbW90ZVByb3h5Lmxlbmd0aCkge1xuICAgICAgICBMb2cuaW5mbyhgQXR0ZW1wdGluZyB0byBsb2FkIGEgcmVtb3RlIGltYWdlIHdpdGhvdXQgYSBjb25maWd1cmVkIHByb3h5LiBVUkw6IC8vJHtzcmN9YClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChDYW1hbi5pc1VSTFJlbW90ZShDYW1hbi5yZW1vdGVQcm94eSkpIHtcbiAgICAgICAgICBMb2cuaW5mbygnQ2Fubm90IHVzZSBhIHJlbW90ZSBwcm94eSBmb3IgbG9hZGluZyBpbWFnZXMuJylcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm94eVVybChzcmMpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgVVJMLCBnZXQgdGhlIHByb3h5IFVSTCBmb3IgaXQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gc3JjIFRoZSBVUkwgdG8gcHJveHkuXG4gICAqIEByZXR1cm5zIHsgU3RyaW5nIH0gVGhlIHByb3h5IFVSTC5cbiAgICogQG1lbWJlcm9mIElPXG4gICAqL1xuICBzdGF0aWMgcHJveHlVcmwgKHNyYykge1xuICAgIHJldHVybiBgJHtDYW1hbi5yZW1vdGVQcm94eSA/IENhbWFuLnJlbW90ZVByb3h5IDogJyd9IC8vJHtDYW1hbi5wcm94eVBhcmFtfT0vLyR7ZW5jb2RlVVJJQ29tcG9uZW50KHNyYyl9YFxuICB9XG5cbiAgLyoqXG4gICAqIFNob3J0Y3V0IGZvciB1c2luZyBvbmUgb2YgdGhlIGJ1bmRsZWQgcHJveGllcy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBsYW5nIFN0cmluZyBpZGVudGlmaWVyIGZvciB0aGUgcHJveHkgc2NyaXB0IGxhbmd1YWdlLlxuICAgKiBAcmV0dXJucyB7IFN0cmluZyB9IEEgcHJveHkgVVJMLlxuICAgKiBAbWVtYmVyb2YgSU9cbiAgICovXG4gIHN0YXRpYyB1c2VQcm94eSAobGFuZykge1xuICAgIGNvbnN0IGxhbmdUb0V4dCA9IHtcbiAgICAgIHJ1Ynk6ICdyYicsXG4gICAgICBweXRob246ICdweScsXG4gICAgICBwZXJsOiAncGwnLFxuICAgICAgamF2YXNjcmlwdDogJ2pzJ1xuICAgIH1cblxuICAgIGxhbmcgPSBsYW5nLnRvTG93ZXJDYXNlKClcbiAgICBsYW5nID0gbGFuZ1RvRXh0W2xhbmddID8gbGFuZ1RvRXh0W2xhbmddIDogbGFuZ1xuXG4gICAgcmV0dXJuIGBwcm94aWVzL2NhbWFuX3Byb3h5LiR7bGFuZ31gXG4gIH1cbn1cbiIsImltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50J1xuaW1wb3J0IEZpbHRlciBmcm9tICcuL2ZpbHRlcidcbmltcG9ydCB7IFV0aWwgfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nZ2VyJ1xuaW1wb3J0IFBsdWdpbiBmcm9tICcuL3BsdWdpbidcbmltcG9ydCBQaXhlbCBmcm9tICcuL3BpeGVsJ1xuaW1wb3J0IElPIGZyb20gJy4vaW8nXG4vKipcbiAqIEhhbmRsZXMgYWxsIG9mIHRoZSB2YXJpb3VzIHJlbmRlcmluZyBtZXRob2RzIGluIENhbWFuLiBNb3N0IG9mIHRoZSBpbWFnZSBtb2RpZmljYXRpb24gaGFwcGVucyBoZXJlLiBBIG5ldyBSZW5kZXJlciBvYmplY3QgaXMgY3JlYXRlZCBmb3IgZXZlcnkgcmVuZGVyIG9wZXJhdGlvbi5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUmVuZGVyZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXIge1xuICAvLyBUaGUgbnVtYmVyIG9mIGJsb2NrcyB0byBzcGxpdCB0aGUgaW1hZ2UgaW50byBkdXJpbmcgdGhlIHJlbmRlciBwcm9jZXNzIHRvIHNpbXVsYXRlIGNvbmN1cnJlbmN5LiBUaGlzIGFsc28gaGVscHMgdGhlIGJyb3dzZXIgbWFuYWdlIHRoZSAocG9zc2libHkpIGxvbmcgcnVubmluZyByZW5kZXIgam9icy5cbiAgc3RhdGljIEJsb2NrcyA9IDRcblxuICBjb25zdHJ1Y3RvciAoYykge1xuICAgIHRoaXMuYyA9IGNcbiAgICB0aGlzLnJlbmRlclF1ZXVlID0gW11cbiAgICB0aGlzLm1vZFBpeGVsRGF0YSA9IG51bGxcbiAgfVxuXG4gIGFkZCAoam9iKSB7XG4gICAgaWYgKCFqb2IpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLnJlbmRlclF1ZXVlLnB1c2goam9iKVxuICB9XG5cbiAgLy8gR3JhYnMgdGhlIG5leHQgb3BlcmF0aW9uIGZyb20gdGhlIHJlbmRlciBxdWV1ZSBhbmQgcGFzc2VzIGl0IHRvIFJlbmRlcmVyIGZvciBleGVjdXRpb25cbiAgcHJvY2Vzc05leHQgKCkge1xuICAgIC8vIElmIHRoZSBxdWV1ZSBpcyBlbXB0eSwgZmlyZSB0aGUgZmluaXNoZWQgY2FsbGJhY2tcbiAgICBpZiAodGhpcy5yZW5kZXJRdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIEV2ZW50LnRyaWdnZXIodGhpcywgJ3JlbmRlckZpbmlzaGVkJylcbiAgICAgIHRoaXMuZmluaXNoZWRGbiAmJiB0aGlzLmZpbmlzaGVkRm4uY2FsbCh0aGlzLmMpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRKb2IgPSB0aGlzLnJlbmRlclF1ZXVlLnNoaWZ0KClcblxuICAgIHN3aXRjaCAodGhpcy5jdXJyZW50Sm9iLnR5cGUpIHtcbiAgICAgIGNhc2UgRmlsdGVyLlR5cGUuTGF5ZXJEZXF1ZXVlOlxuICAgICAgICBjb25zdCBsYXllciA9IHRoaXMuYy5jYW52YXNRdWV1ZS5zaGlmdCgpXG4gICAgICAgIHRoaXMuYy5leGVjdXRlTGF5ZXIobGF5ZXIpXG4gICAgICAgIHRoaXMucHJvY2Vzc05leHQoKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBGaWx0ZXIuVHlwZS5MYXllckZpbmlzaGVkOlxuICAgICAgICB0aGlzLmMuYXBwbHlDdXJyZW50TGF5ZXIoKVxuICAgICAgICB0aGlzLmMucG9wQ29udGV4dCgpXG4gICAgICAgIHRoaXMucHJvY2Vzc05leHQoKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBGaWx0ZXIuVHlwZS5Mb2FkT3ZlcmxheTpcbiAgICAgICAgdGhpcy5sb2FkT3ZlcmxheSh0aGlzLmN1cnJlbnRKb2IubGF5ZXIsIHRoaXMuY3VycmVudEpvYi5zcmMpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIEZpbHRlci5UeXBlLlBsdWdpbjpcbiAgICAgICAgdGhpcy5leGVjdXRlUGx1Z2luKClcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuZXhlY3V0ZUZpbHRlcigpXG4gICAgfVxuICB9XG5cbiAgZXhlY3V0ZSAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmZpbmlzaGVkRm4gPSBjYWxsYmFja1xuICAgIHRoaXMubW9kUGl4ZWxEYXRhID0gVXRpbC5kYXRhQXJyYXkodGhpcy5jLnBpeGVsRGF0YS5sZW5ndGgpXG4gICAgdGhpcy5wcm9jZXNzTmV4dCgpXG4gIH1cblxuICBlYWNoQmxvY2sgKGZuKSB7XG4gICAgLy8gUHJlcGFyZSBhbGwgdGhlIHJlcXVpcmVkIHJlbmRlciBkYXRhXG4gICAgdGhpcy5ibG9ja3NEb25lID0gMFxuXG4gICAgY29uc3QgbiA9IHRoaXMuYy5waXhlbERhdGEubGVuZ3RoXG4gICAgY29uc3QgYmxvY2tQaXhlbExlbmd0aCA9IE1hdGguZmxvb3IoKG4gLyA0KSAvIFJlbmRlcmVyLkJsb2NrcylcbiAgICBjb25zdCBibG9ja04gPSBibG9ja1BpeGVsTGVuZ3RoICogNFxuICAgIGNvbnN0IGxhc3RCbG9ja04gPSBibG9ja04gKyAoKG4gLyA0KSAlIFJlbmRlcmVyLkJsb2NrcykgKiA0XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IFJlbmRlcmVyLkJsb2NrczsgaSsrKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGkgKiBibG9ja05cbiAgICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgKGkgPT09IFJlbmRlcmVyLkJsb2NrcyAtIDEgPyBsYXN0QmxvY2tOIDogYmxvY2tOKVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGZuLmNhbGwodGhpcywgaSwgc3RhcnQsIGVuZClcbiAgICAgIH0sIDApXG4gICAgfVxuICB9XG5cbiAgLy8gVGhlIGNvcmUgb2YgdGhlIGltYWdlIHJlbmRlcmluZywgdGhpcyBmdW5jdGlvbiBleGVjdXRlcyB0aGUgcHJvdmlkZWQgZmlsdGVyLlxuICAvLyBOT1RFOiB0aGlzIGRvZXMgbm90IHdyaXRlIHRoZSB1cGRhdGVkIHBpeGVsIGRhdGEgdG8gdGhlIGNhbnZhcy4gVGhhdCBoYXBwZW5zIHdoZW4gYWxsIGZpbHRlcnMgYXJlIGZpbmlzaGVkIHJlbmRlcmluZyBpbiBvcmRlciB0byBiZSBhcyBmYXN0IGFzIHBvc3NpYmxlLlxuICBleGVjdXRlRmlsdGVyICgpIHtcbiAgICBFdmVudC50cmlnZ2VyKHRoaXMuYywgJ3Byb2Nlc3NTdGFydCcsIHRoaXMuY3VycmVudEpvYilcblxuICAgIGlmICh0aGlzLmN1cnJlbnRKb2IudHlwZSA9PT0gRmlsdGVyLlR5cGUuU2luZ2xlKSB7XG4gICAgICB0aGlzLmVhY2hCbG9jayh0aGlzLnJlbmRlckJsb2NrKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVhY2hCbG9jayh0aGlzLnJlbmRlcktlcm5lbClcbiAgICB9XG4gIH1cblxuICAvLyBFeGVjdXRlcyBhIHN0YW5kYWxvbmUgcGx1Z2luXG4gIGV4ZWN1dGVQbHVnaW4gKCkge1xuICAgIExvZy5kZWJ1ZyhgRXhlY3V0aW5nIHBsdWdpbiAke3RoaXMuY3VycmVudEpvYi5wbHVnaW59YClcbiAgICBQbHVnaW4uZXhlY3V0ZSh0aGlzLmMsIHRoaXMuY3VycmVudEpvYi5wbHVnaW4sIHRoaXMuY3VycmVudEpvYi5hcmdzKVxuICAgIExvZy5kZWJ1ZyhgUGx1Z2luICR7dGhpcy5jdXJyZW50Sm9iLnBsdWdpbn0gZmluaXNoZWQhYClcblxuICAgIHRoaXMucHJvY2Vzc05leHQoKVxuICB9XG5cbiAgLy8gUmVuZGVycyBhIHNpbmdsZSBibG9jayBvZiB0aGUgY2FudmFzIHdpdGggdGhlIGN1cnJlbnQgZmlsdGVyIGZ1bmN0aW9uXG4gIHJlbmRlckJsb2NrIChibnVtLCBzdGFydCwgZW5kKSB7XG4gICAgTG9nLmRlYnVnKGBCbG9jayAjJHtibnVtfSAtIEZpbHRlcjogJHt0aGlzLmN1cnJlbnRKb2IubmFtZX0sIFN0YXJ0OiAke3N0YXJ0fSwgRW5kOiAke2VuZH1gKVxuICAgIEV2ZW50LnRyaWdnZXIodGhpcy5jLCAnYmxvY2tTdGFydGVkJywge1xuICAgICAgYmxvY2tOdW06IGJudW0sXG4gICAgICB0b3RhbEJsb2NrczogUmVuZGVyZXIuQmxvY2tzLFxuICAgICAgc3RhcnRQaXhlbDogc3RhcnQsXG4gICAgICBlbmRQaXhlbDogZW5kXG4gICAgfSlcblxuICAgIGNvbnN0IHBpeGVsID0gbmV3IFBpeGVsKClcbiAgICBwaXhlbC5zZXRDb250ZXh0KHRoaXMuYylcblxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSA0KSB7XG4gICAgICBwaXhlbC5sb2MgPSBpXG5cbiAgICAgIHBpeGVsLnIgPSB0aGlzLmMucGl4ZWxEYXRhW2ldXG4gICAgICBwaXhlbC5nID0gdGhpcy5jLnBpeGVsRGF0YVtpICsgMV1cbiAgICAgIHBpeGVsLmIgPSB0aGlzLmMucGl4ZWxEYXRhW2kgKyAyXVxuICAgICAgcGl4ZWwuYSA9IHRoaXMuYy5waXhlbERhdGFbaSArIDNdXG5cbiAgICAgIHRoaXMuY3VycmVudEpvYi5wcm9jZXNzRm4ocGl4ZWwpXG5cbiAgICAgIHRoaXMuYy5waXhlbERhdGFbaV0gPSBVdGlsLmNsYW1wUkdCKHBpeGVsLnIpXG4gICAgICB0aGlzLmMucGl4ZWxEYXRhW2kgKyAxXSA9IFV0aWwuY2xhbXBSR0IocGl4ZWwuZylcbiAgICAgIHRoaXMuYy5waXhlbERhdGFbaSArIDJdID0gVXRpbC5jbGFtcFJHQihwaXhlbC5iKVxuICAgICAgdGhpcy5jLnBpeGVsRGF0YVtpICsgM10gPSBVdGlsLmNsYW1wUkdCKHBpeGVsLmEpXG4gICAgfVxuXG4gICAgdGhpcy5ibG9ja0ZpbmlzaGVkKGJudW0pXG4gIH1cblxuICAvLyBBcHBsaWVzIGFuIGltYWdlIGtlcm5lbCB0byB0aGUgY2FudmFzXG4gIHJlbmRlcktlcm5lbCAoYm51bSwgc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IGJpYXMgPSB0aGlzLmN1cnJlbnRKb2IuYmlhc1xuICAgIGNvbnN0IGRpdmlzb3IgPSB0aGlzLmN1cnJlbnRKb2IuZGl2aXNvclxuICAgIGNvbnN0IG4gPSB0aGlzLmMucGl4ZWxEYXRhLmxlbmd0aFxuXG4gICAgY29uc3QgYWRqdXN0ID0gdGhpcy5jdXJyZW50Sm9iLmFkanVzdFxuICAgIGNvbnN0IGFkanVzdFNpemUgPSBNYXRoLnNxcnQoYWRqdXN0Lmxlbmd0aClcblxuICAgIGNvbnN0IGtlcm5lbCA9IFtdXG5cbiAgICBMb2cuZGVidWcoYFJlbmRlcmluZyBrZXJuZWwgLSBGaWx0ZXI6ICR7dGhpcy5jdXJyZW50Sm9iLm5hbWV9YClcblxuICAgIHN0YXJ0ID0gTWF0aC5tYXgoc3RhcnQsIHRoaXMuYy5kaW1lbnNpb25zLndpZHRoICogNCAqICgoYWRqdXN0U2l6ZSAtIDEpIC8gMikpXG4gICAgZW5kID0gTWF0aC5taW4oZW5kLCBuIC0gKHRoaXMuYy5kaW1lbnNpb25zLndpZHRoICogNCAqICgoYWRqdXN0U2l6ZSAtIDEpIC8gMikpKVxuXG4gICAgY29uc3QgYnVpbGRlciA9IChhZGp1c3RTaXplIC0gMSkgLyAyXG5cbiAgICBjb25zdCBwaXhlbCA9IG5ldyBQaXhlbCgpXG4gICAgcGl4ZWwuc2V0Q29udGV4dCh0aGlzLmMpXG5cbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gNCkge1xuICAgICAgcGl4ZWwubG9jID0gaVxuICAgICAgbGV0IGJ1aWxkZXJJbmRleCA9IDBcblxuICAgICAgZm9yIChsZXQgaiA9IC1idWlsZGVyOyBqIDw9IGJ1aWxkZXI7IGorKykge1xuICAgICAgICBmb3IgKGxldCBrID0gYnVpbGRlcjsgayA+PSAtYnVpbGRlcjsgay0tKSB7XG4gICAgICAgICAgbGV0IHAgPSBwaXhlbC5nZXRQaXhlbFJlbGF0aXZlKGosIGspXG4gICAgICAgICAga2VybmVsW2J1aWxkZXJJbmRleCAqIDNdID0gcC5yXG4gICAgICAgICAga2VybmVsW2J1aWxkZXJJbmRleCAqIDMgKyAxXSA9IHAuZ1xuICAgICAgICAgIGtlcm5lbFtidWlsZGVySW5kZXggKiAzICsgMl0gPSBwLmJcbiAgICAgICAgICBidWlsZGVySW5kZXgrK1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlcyA9IHRoaXMucHJvY2Vzc0tlcm5lbChhZGp1c3QsIGtlcm5lbCwgZGl2aXNvciwgYmlhcylcblxuICAgICAgdGhpcy5tb2RQaXhlbERhdGFbaV0gPSBVdGlsLmNsYW1wUkdCKHJlcy5yKVxuICAgICAgdGhpcy5tb2RQaXhlbERhdGFbaSArIDFdID0gVXRpbC5jbGFtcFJHQihyZXMuZylcbiAgICAgIHRoaXMubW9kUGl4ZWxEYXRhW2kgKyAyXSA9IFV0aWwuY2xhbXBSR0IocmVzLmIpXG4gICAgICB0aGlzLm1vZFBpeGVsRGF0YVtpICsgM10gPSB0aGlzLmMucGl4ZWxEYXRhW2kgKyAzXVxuICAgIH1cblxuICAgIHRoaXMuYmxvY2tGaW5pc2hlZChibnVtKVxuICB9XG5cbiAgLy8gQ2FsbGVkIHdoZW4gYSBzaW5nbGUgYmxvY2sgaXMgZmluaXNoZWQgcmVuZGVyaW5nLiBPbmNlIGFsbCBibG9ja3MgYXJlIGRvbmUsIHdlIHNpZ25hbCB0aGF0IHRoaXMgZmlsdGVyIGlzIGZpbmlzaGVkIHJlbmRlcmluZyBhbmQgY29udGludWUgdG8gdGhlIG5leHQgc3RlcC5cbiAgYmxvY2tGaW5pc2hlZCAoYm51bSkge1xuICAgIGlmIChibnVtID49IDApIHtcbiAgICAgIExvZy5kZWJ1ZyhgQmxvY2sgIyR7Ym51bX0gZmluaXNoZWQhIEZpbHRlcjogJHt0aGlzLmN1cnJlbnRKb2IubmFtZX1gKVxuICAgIH1cbiAgICB0aGlzLmJsb2Nrc0RvbmUrK1xuXG4gICAgRXZlbnQudHJpZ2dlcih0aGlzLmMsICdibG9ja0ZpbmlzaGVkJywge1xuICAgICAgYmxvY2tOdW06IGJudW0sXG4gICAgICBibG9ja3NGaW5pc2hlZDogdGhpcy5ibG9ja3NEb25lLFxuICAgICAgdG90YWxCbG9ja3M6IFJlbmRlcmVyLkJsb2Nrc1xuICAgIH0pXG5cbiAgICBpZiAodGhpcy5ibG9ja3NEb25lID09PSBSZW5kZXJlci5CbG9ja3MpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRKb2IudHlwZSA9PT0gRmlsdGVyLlR5cGUuS2VybmVsKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jLnBpeGVsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuYy5waXhlbERhdGFbaV0gPSB0aGlzLm1vZFBpeGVsRGF0YVtpXVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChibnVtID49IDApIHtcbiAgICAgICAgTG9nLmRlYnVnKGBGaWx0ZXIgJHt0aGlzLmN1cnJlbnRKb2IubmFtZX0gZmluaXNoZWQhYClcbiAgICAgIH1cbiAgICAgIEV2ZW50LnRyaWdnZXIodGhpcy5jLCAncHJvY2Vzc0NvbXBsZXRlJywgdGhpcy5jdXJyZW50Sm9iKVxuICAgICAgdGhpcy5wcm9jZXNzTmV4dCgpXG4gICAgfVxuICB9XG5cbiAgLy8gVGhlIFwiZmlsdGVyIGZ1bmN0aW9uXCIgZm9yIGtlcm5lbCBhZGp1c3RtZW50cy5cbiAgcHJvY2Vzc0tlcm5lbCAoYWRqdXN0LCBrZXJuZWwsIGRpdmlzb3IsIGJpYXMpIHtcbiAgICBjb25zdCB2YWwgPSB7XG4gICAgICByOiAwLFxuICAgICAgZzogMCxcbiAgICAgIGI6IDBcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGp1c3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbC5yICs9IGFkanVzdFtpXSAqIGtlcm5lbFtpICogM11cbiAgICAgIHZhbC5nICs9IGFkanVzdFtpXSAqIGtlcm5lbFtpICogMyArIDFdXG4gICAgICB2YWwuYiArPSBhZGp1c3RbaV0gKiBrZXJuZWxbaSAqIDMgKyAyXVxuICAgIH1cblxuICAgIHZhbC5yID0gKHZhbC5yIC8gZGl2aXNvcikgKyBiaWFzXG4gICAgdmFsLmcgPSAodmFsLmcgLyBkaXZpc29yKSArIGJpYXNcbiAgICB2YWwuYiA9ICh2YWwuYiAvIGRpdmlzb3IpICsgYmlhc1xuICAgIHJldHVybiB2YWxcbiAgfVxuXG4gIC8vIExvYWRzIGFuIGltYWdlIG9udG8gdGhlIGN1cnJlbnQgY2FudmFzXG4gIGxvYWRPdmVybGF5IChsYXllciwgc3JjKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKVxuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBsYXllci5jb250ZXh0LmRyYXdJbWFnZShpbWcsIDAsIDAsIHRoaXMuYy5kaW1lbnNpb25zLndpZHRoLCB0aGlzLmMuZGltZW5zaW9ucy5oZWlnaHQpXG4gICAgICBsYXllci5pbWFnZURhdGEgPSBsYXllci5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmMuZGltZW5zaW9ucy53aWR0aCwgdGhpcy5jLmRpbWVuc2lvbnMuaGVpZ2h0KVxuICAgICAgbGF5ZXIucGl4ZWxEYXRhID0gbGF5ZXIuaW1hZ2VEYXRhLmRhdGFcblxuICAgICAgdGhpcy5jLnBpeGVsRGF0YSA9IGxheWVyLnBpeGVsRGF0YVxuXG4gICAgICB0aGlzLnByb2Nlc3NOZXh0KClcbiAgICB9XG5cbiAgICBjb25zdCBwcm94eVVybCA9IElPLnJlbW90ZUNoZWNrKHNyYylcbiAgICBpbWcuc3JjID0gcHJveHlVcmwgfHwgc3JjXG4gIH1cbn1cbiIsIi8qKlxuICogQnVpbHQtaW4gbGF5ZXIgYmxlbmRlcnMuIE1hbnkgb2YgdGhlc2UgbWltaWMgUGhvdG9zaG9wIGJsZW5kIG1vZGVzLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBCbGVuZGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsZW5kZXIge1xuICBzdGF0aWMgYmxlbmRlcnMgPSB7fVxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgYmxlbmRlci4gQ2FuIGJlIHVzZWQgdG8gYWRkIHlvdXIgb3duIGJsZW5kZXJzIG91dHNpZGUgb2YgdGhlIGNvcmUgbGlicmFyeSwgaWYgbmVlZGVkLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgTmFtZSBvZiB0aGUgYmxlbmRlci5cbiAgICogQHBhcmFtIHsgRnVuY3Rpb24gfSBmdW5jIFRoZSBibGVuZGVyIGZ1bmN0aW9uLlxuICAgKiBAbWVtYmVyb2YgQmxlbmRlclxuICAgKi9cbiAgc3RhdGljIHJlZ2lzdGVyIChuYW1lLCBmdW5jKSB7XG4gICAgdGhpcy5ibGVuZGVyc1tuYW1lXSA9IGZ1bmNcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyBhIGJsZW5kZXIgdG8gY29tYmluZSBhIGxheWVyIHdpdGggaXRzIHBhcmVudC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBuYW1lIE5hbWUgb2YgdGhlIGJsZW5kaW5nIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAgICogQHBhcmFtIHsgT2JqZWN0IH0gcmdiYUxheWVyIFJHQkEgb2JqZWN0IG9mIHRoZSBjdXJyZW50IHBpeGVsIGZyb20gdGhlIGxheWVyLlxuICAgKiBAcGFyYW0geyBPYmplY3QgfSByZ2JhUGFyZW50IFJHQkEgb2JqZWN0IG9mIHRoZSBjb3JyZXNwb25kaW5nIHBpeGVsIGluIHRoZSBwYXJlbnQgbGF5ZXIuXG4gICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gUkdCQSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBibGVuZGVkIHBpeGVsLlxuICAgKiBAbWVtYmVyb2YgQmxlbmRlclxuICAgKi9cbiAgc3RhdGljIGV4ZWN1dGUgKG5hbWUsIHJnYmFMYXllciwgcmdiYVBhcmVudCkge1xuICAgIHJldHVybiB0aGlzLmJsZW5kZXJzW25hbWVdKHJnYmFMYXllciwgcmdiYVBhcmVudClcbiAgfVxufVxuIiwiaW1wb3J0IHsgJCwgVXRpbCB9IGZyb20gJy4vdXRpbCdcbmltcG9ydCBGaWx0ZXIgZnJvbSAnLi9maWx0ZXInXG5pbXBvcnQgQmxlbmRlciBmcm9tICcuL2JsZW5kZXInXG5cbi8qKlxuICogVGhlIGVudGlyZSBsYXllcmluZyBzeXN0ZW0gZm9yIENhbWFuIHJlc2lkZXMgaW4gdGhpcyBmaWxlLiBMYXllcnMgZ2V0IHRoZWlyIG93biBjYW52YXNMYXllciBvYmplY3Qgd2hpY2ggaXMgY3JlYXRlZCB3aGVuIG5ld0xheWVyKCkgaXMgY2FsbGVkLiBGb3IgZXh0ZW5zaXZlIGluZm9ybWF0aW9uIHJlZ2FyZGluZyB0aGUgc3BlY2lmaWNzIG9mIGhvdyB0aGUgbGF5ZXJpbmcgc3lzdGVtIHdvcmtzLCB0aGVyZSBpcyBhbiBpbi1kZXB0aCBibG9nIHBvc3Qgb24gdGhpcyB2ZXJ5IHRvcGljLlxuICogSW5zdGVhZCBvZiBjb3B5aW5nIHRoZSBlbnRpcmV0eSBvZiB0aGF0IHBvc3QsIEknbGwgc2ltcGx5IHBvaW50IHlvdSB0b3dhcmRzIHRoZSBbYmxvZyBsaW5rXShodHRwOi8vYmxvZy5tZWx0aW5naWNlLm5ldC9wcm9ncmFtbWluZy9pbXBsZW1lbnRpbmctbGF5ZXJzLWNhbWFuanMpLlxuICogSG93ZXZlciwgdGhlIGdpc3Qgb2YgdGhlIGxheWVyaW5nIHN5c3RlbSBpcyB0aGF0LCBmb3IgZWFjaCBsYXllciwgaXQgY3JlYXRlcyBhIG5ldyBjYW52YXMgZWxlbWVudCBhbmQgdGhlbiBlaXRoZXIgY29waWVzIHRoZSBwYXJlbnQgbGF5ZXIncyBkYXRhIG9yIGFwcGxpZXMgYSBzb2xpZCBjb2xvciB0byB0aGUgbmV3IGxheWVyLiBBZnRlciBzb21lIChvcHRpb25hbCkgZWZmZWN0cyBhcmUgYXBwbGllZCwgdGhlIGxheWVyIGlzIGJsZW5kZWQgYmFjayBpbnRvIHRoZSBwYXJlbnQgY2FudmFzIGxheWVyIHVzaW5nIG9uZSBvZiBtYW55IGRpZmZlcmVudCBibGVuZGluZyBhbGdvcml0aG1zLlxuICogWW91IGNhbiBhbHNvIGxvYWQgYW4gaW1hZ2UgKGxvY2FsIG9yIHJlbW90ZSwgd2l0aCBhIHByb3h5KSBpbnRvIGEgY2FudmFzIGxheWVyLCB3aGljaCBpcyB1c2VmdWwgaWYgeW91IHdhbnQgdG8gYWRkIHRleHR1cmVzIHRvIGFuIGltYWdlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBMYXllclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXllciB7XG4gIGNvbnN0cnVjdG9yIChjKSB7XG4gICAgLy8gQ29tcGF0aWJpbGl0eVxuICAgIHRoaXMuYyA9IGNcbiAgICB0aGlzLmZpbHRlciA9IGNcblxuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIGJsZW5kaW5nTW9kZTogJ25vcm1hbCcsXG4gICAgICBvcGFjaXR5OiAxLjBcbiAgICB9XG5cbiAgICAvLyBFYWNoIGxheWVyIGdldHMgaXRzIG93biB1bmlxdWUgSURcbiAgICB0aGlzLmxheWVySUQgPSBVdGlsLnVuaXFpZCgpLmdldCgpXG5cbiAgICAvLyBDcmVhdGUgdGhlIGNhbnZhcyBmb3IgdGhpcyBsYXllclxuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcblxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5jLmRpbWVuc2lvbnMud2lkdGhcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmMuZGltZW5zaW9ucy5oZWlnaHRcblxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICB0aGlzLmNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpXG4gICAgdGhpcy5pbWFnZURhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpXG4gICAgdGhpcy5waXhlbERhdGEgPSB0aGlzLmltYWdlRGF0YS5kYXRhXG4gIH1cblxuICAvLyBJZiB5b3Ugd2FudCB0byBjcmVhdGUgbmVzdGVkIGxheWVyc1xuICBuZXdMYXllciAoY2IpIHtcbiAgICB0aGlzLmMubmV3TGF5ZXIoY2IpXG4gIH1cblxuICAvLyBTZXRzIHRoZSBibGVuZGluZyBtb2RlIG9mIHRoaXMgbGF5ZXIuIFRoZSBtb2RlIGlzIHRoZSBuYW1lIG9mIGEgYmxlbmRlciBmdW5jdGlvbi5cbiAgc2V0QmxlbmRpbmdNb2RlIChtb2RlKSB7XG4gICAgdGhpcy5vcHRpb25zLmJsZW5kaW5nTW9kZSA9IG1vZGVcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gU2V0cyB0aGUgb3BhY2l0eSBvZiB0aGlzIGxheWVyLiBUaGlzIGFmZmVjdHMgaG93IG11Y2ggb2YgdGhpcyBsYXllciBpcyBhcHBsaWVkIHRvIHRoZSBwYXJlbnQgbGF5ZXIgYXQgcmVuZGVyIHRpbWUuXG4gIG9wYWNpdHkgKG9wYWNpdHkpIHtcbiAgICB0aGlzLm9wdGlvbnMub3BhY2l0eSA9IG9wYWNpdHkgLyAxMDBcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gQ29waWVzIHRoZSBjb250ZW50cyBvZiB0aGUgcGFyZW50IGxheWVyIHRvIHRoaXMgbGF5ZXJcbiAgY29weVBhcmVudCAoKSB7XG4gICAgY29uc3QgcGFyZW50RGF0YSA9IHRoaXMucGl4ZWxEYXRhXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmMucGl4ZWxEYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICB0aGlzLnBpeGVsRGF0YVtpXSA9IHBhcmVudERhdGFbaV1cbiAgICAgIHRoaXMucGl4ZWxEYXRhW2kgKyAxXSA9IHBhcmVudERhdGFbaSArIDFdXG4gICAgICB0aGlzLnBpeGVsRGF0YVtpICsgMl0gPSBwYXJlbnREYXRhW2kgKyAyXVxuICAgICAgdGhpcy5waXhlbERhdGFbaSArIDNdID0gcGFyZW50RGF0YVtpICsgM11cbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIEZpbGxzIHRoaXMgbGF5ZXIgd2lkdGggYSBzaW5nbGUgY29sb3JcbiAgZmlsbENvbG9yICgpIHtcbiAgICB0aGlzLmMuZmlsbENvbG9yLmFwcGx5KHRoaXMuYywgYXJndW1lbnRzKVxuICB9XG5cbiAgLy8gTG9hZHMgYW5kIG92ZXJsYXlzIGFuIGltYWdlIG9udG8gdGhpcyBsYXllclxuICBvdmVybGF5SW1hZ2UgKGltYWdlKSB7XG4gICAgaWYgKHR5cGVvZiBpbWFnZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGltYWdlID0gaW1hZ2Uuc3JjXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaW1hZ2UgPT09ICdzdHJpbmcnICYmIGltYWdlWzBdID09PSAnIycpIHtcbiAgICAgIGltYWdlID0gJChpbWFnZSkuc3JjXG4gICAgfVxuXG4gICAgaWYgKCFpbWFnZSkge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICB0aGlzLmMucmVuZGVyZXIucmVuZGVyUXVldWUucHVzaCh7XG4gICAgICB0eXBlOiBGaWx0ZXIuVHlwZS5Mb2FkT3ZlcmxheSxcbiAgICAgIHNyYzogaW1hZ2UsXG4gICAgICBsYXllcjogdGhpc1xuICAgIH0pXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gVGFrZXMgdGhlIGNvbnRlbnRzIG9mIHRoaXMgbGF5ZXIgYW5kIGFwcGxpZXMgdGhlbSB0byB0aGUgcGFyZW50IGxheWVyIGF0IHJlbmRlciB0aW1lLiBUaGlzIHNob3VsZCBuZXZlciBiZSBjYWxsZWQgZXhwbGljaXRseSBieSB0aGUgdXNlci5cbiAgYXBwbHlUb1BhcmVudCAoKSB7XG4gICAgY29uc3QgcGFyZW50RGF0YSA9IHRoaXMuYy5waXhlbFN0YWNrW3RoaXMuYy5waXhlbFN0YWNrLmxlbmd0aCAtIDFdXG4gICAgY29uc3QgbGF5ZXJEYXRhID0gdGhpcy5jLnBpeGVsRGF0YVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllckRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIGNvbnN0IHJnYmFQYXJlbnQgPSB7XG4gICAgICAgIHI6IHBhcmVudERhdGFbaV0sXG4gICAgICAgIGc6IHBhcmVudERhdGFbaSArIDFdLFxuICAgICAgICBiOiBwYXJlbnREYXRhW2kgKyAyXSxcbiAgICAgICAgYTogcGFyZW50RGF0YVtpICsgM11cbiAgICAgIH1cbiAgICAgIGNvbnN0IHJnYmFMYXllciA9IHtcbiAgICAgICAgcjogbGF5ZXJEYXRhW2ldLFxuICAgICAgICBnOiBsYXllckRhdGFbaSArIDFdLFxuICAgICAgICBiOiBsYXllckRhdGFbaSArIDJdLFxuICAgICAgICBhOiBsYXllckRhdGFbaSArIDNdXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IEJsZW5kZXIuZXhlY3V0ZSh0aGlzLm9wdGlvbnMuYmxlbmRpbmdNb2RlLCByZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpXG4gICAgICByZXN1bHQuciA9IFV0aWwuY2xhbXBSR0IocmVzdWx0LnIpXG4gICAgICByZXN1bHQuZyA9IFV0aWwuY2xhbXBSR0IocmVzdWx0LmcpXG4gICAgICByZXN1bHQuYiA9IFV0aWwuY2xhbXBSR0IocmVzdWx0LmIpXG4gICAgICBpZiAoIXJlc3VsdC5hKSB7XG4gICAgICAgIHJlc3VsdC5hID0gcmdiYUxheWVyLmFcbiAgICAgIH1cblxuICAgICAgcGFyZW50RGF0YVtpXSA9IHJnYmFQYXJlbnQuciAtICgocmdiYVBhcmVudC5yIC0gcmVzdWx0LnIpICogKHRoaXMub3B0aW9ucy5vcGFjaXR5ICogKHJlc3VsdC5hIC8gMjU1KSkpXG4gICAgICBwYXJlbnREYXRhW2kgKyAxXSA9IHJnYmFQYXJlbnQuZyAtICgocmdiYVBhcmVudC5nIC0gcmVzdWx0LmcpICogKHRoaXMub3B0aW9ucy5vcGFjaXR5ICogKHJlc3VsdC5hIC8gMjU1KSkpXG4gICAgICBwYXJlbnREYXRhW2kgKyAyXSA9IHJnYmFQYXJlbnQuYiAtICgocmdiYVBhcmVudC5iIC0gcmVzdWx0LmIpICogKHRoaXMub3B0aW9ucy5vcGFjaXR5ICogKHJlc3VsdC5hIC8gMjU1KSkpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgTW9kdWxlIGZyb20gJy4vbW9kdWxlJ1xuaW1wb3J0IHsgJCwgbm9vcCwgVXRpbCB9IGZyb20gJy4vdXRpbCdcbmltcG9ydCBTdG9yZSBmcm9tICcuL3N0b3JlJ1xuaW1wb3J0IEFuYWx5emUgZnJvbSAnLi9hbmFseXplJ1xuaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vcmVuZGVyZXInXG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nZ2VyJ1xuaW1wb3J0IElPIGZyb20gJy4vaW8nXG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCdcbmltcG9ydCBGaWx0ZXIgZnJvbSAnLi9maWx0ZXInXG5pbXBvcnQgTGF5ZXIgZnJvbSAnLi9sYXllcidcblxuLyoqXG4gKiBIZXJlIGl0IGJlZ2lucy4gQ2FtYW4gaXMgZGVmaW5lZC5cbiAqIFRoZXJlIGFyZSBtYW55IGRpZmZlcmVudCBpbml0aWFsaXphdGlvbiBmb3IgQ2FtYW4sIHdoaWNoIGFyZSBkZXNjcmliZWQgb24gdGhlIFtHdWlkZXNdKGh0dHA6Ly9jYW1hbmpzLmNvbS9ndWlkZXMpLlxuICogSW5pdGlhbGl6YXRpb24gaXMgdHJpY2t5IGJlY2F1c2Ugd2UgbmVlZCB0byBtYWtlIHN1cmUgZXZlcnl0aGluZyB3ZSBuZWVkIGlzIGFjdHVhbGx5IGZ1bGx5IG9hZGVkIGluIHRoZSBET00gYmVmb3JlIHByb2NlZWRpbmcuIFdoZW4gaW5pdGlhbGl6ZWQgb24gYW4gaW1hZ2UsIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGltYWdlIGlzIGRvbmUgbG9hZGluZyBiZWZvcmUgY29udmVydGluZyBpdCB0byBhIGNhbnZhcyBlbGVtZW50IGFuZCB3cml0aW5nIHRoZSBwaXhlbCBkYXRhLiBJZiB3ZSBkbyB0aGlzIHByZW1hdHVyZWx5LCB0aGUgYnJvd3NlciB3aWxsIHRocm93IGEgRE9NIEVycm9yLCBhbmQgY2hhb3Mgd2lsbCBlbnN1ZS4gSW4gdGhlIGV2ZW50IHRoYXQgd2UgaW5pdGlhbGl6ZSBDYW1hbiBvbiBhIGNhbnZhcyBlbGVtZW50IHdoaWxlIHNwZWNpZnlpbmcgYW4gaW1hZ2UgVVJMLCB3ZSBuZWVkIHRvIGNyZWF0ZSBhIG5ldyBpbWFnZSBlbGVtZW50LCBsb2FkIHRoZSBpbWFnZSwgdGhlbiBjb250aW51ZSB3aXRoIGluaXRpYWxpemF0aW9uLlxuICogVGhlIG1haW4gZ29hbCBmb3IgQ2FtYW4gd2FzIHNpbXBsaWNpdHksIHNvIGFsbCBvZiB0aGlzIGlzIGhhbmRsZWQgdHJhbnNwYXJlbnRseSB0byB0aGUgZW5kLXVzZXIuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIENhbWFuXG4gKiBAZXh0ZW5kcyB7TW9kdWxlfVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW1hbiBleHRlbmRzIE1vZHVsZSB7XG4gIC8vIFRoZSBjdXJyZW50IHZlcnNpb24uXG4gIHN0YXRpYyB2ZXJzaW9uID0ge1xuICAgIHJlbGVhc2U6ICcxLjAuMCcsXG4gICAgZGF0ZTogJzYvMDgvMjAxOCdcbiAgfVxuXG4gIC8vIEBwcm9wZXJ0eSBbQm9vbGVhbl0gRGVidWcgbW9kZSBlbmFibGVzIGNvbnNvbGUgbG9nZ2luZy5cbiAgc3RhdGljIERFQlVHID0gdHJ1ZVxuXG4gIC8vIEBwcm9wZXJ0eSBbQm9vbGVhbl0gQWxsb3cgcmV2ZXJ0aW5nIHRoZSBjYW52YXM/XG4gIC8vIElmIHlvdXIgSlMgcHJvY2VzcyBpcyBydW5uaW5nIG91dCBvZiBtZW1vcnksIGRpc2FibGluZ1xuICAvLyB0aGlzIGNvdWxkIGhlbHAgZHJhc3RpY2FsbHkuXG4gIHN0YXRpYyBhbGxvd1JldmVydCA9IHRydWVcblxuICAvLyBAcHJvcGVydHkgW1N0cmluZ10gRGVmYXVsdCBjcm9zcy1vcmlnaW4gcG9saWN5LlxuICBzdGF0aWMgY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJ1xuXG4gIC8vIEBwcm9wZXJ0eSBbU3RyaW5nXSBTZXQgdGhlIFVSTCBvZiB0aGUgaW1hZ2UgcHJveHkgc2NyaXB0LlxuICBzdGF0aWMgcmVtb3RlUHJveHkgPSAnJ1xuXG4gIC8vIEBwcm9wYXJ0eSBbU3RyaW5nXSBUaGUgR0VUIHBhcmFtIHVzZWQgd2l0aCB0aGUgcHJveHkgc2NyaXB0LlxuICBzdGF0aWMgcHJveHlQYXJhbSA9ICdjYW1hblByb3h5VXJsJ1xuXG4gIC8vIEBwcm9wZXJ0eSBbQm9vbGVhbl0gQXJlIHdlIGluIGEgd2VjaGF0IG1pbmkgcHJvZ3JhbSBlbnZpcm9ubWVudD9cbiAgc3RhdGljIHdlY2hhdCA9IHR5cGVvZiB3eCAhPT0gJ3VuZGVmaW5lZCdcblxuICAvLyBAcHJvcGVydHkgW0Jvb2xlYW5dIFNob3VsZCB3ZSBjaGVjayB0aGUgRE9NIGZvciBpbWFnZXMgd2l0aCBDYW1hbiBpbnN0cnVjdGlvbnM/XG4gIHN0YXRpYyBhdXRvbG9hZCA9ICFDYW1hbi5Ob2RlSlNcblxuICAvLyBDdXN0b20gdG9TdHJpbmcoKVxuICAvLyBAcmV0dXJuIFtTdHJpbmddIFZlcnNpb24gYW5kIHJlbGVhc2UgaW5mb3JtYXRpb24uXG4gIHN0YXRpYyB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIGBWZXJzaW9uICR7Q2FtYW4udmVyc2lvbi5yZWxlYXNlfSwgUmVsZWFzZWQgJHtDYW1hbi52ZXJzaW9uLmRhdGV9YFxuICB9XG5cbiAgLy8gR2V0IHRoZSBJRCBhc3NpZ25lZCB0byB0aGlzIGNhbnZhcyBieSBDYW1hbi5cbiAgLy8gQHBhcmFtIFtET01PYmplY3RdIGNhbnZhcyBUaGUgY2FudmFzIHRvIGluc3BlY3QuXG4gIC8vIEByZXR1cm4gW1N0cmluZ10gVGhlIENhbWFuIElEIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNhbnZhcy5cbiAgc3RhdGljIGdldEF0dHJJZCAoY2FudmFzKSB7XG4gICAgaWYgKHR5cGVvZiBjYW52YXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjYW52YXMgPSAkKGNhbnZhcylcbiAgICB9XG4gICAgaWYgKGNhbnZhcyAmJiBjYW52YXMuZ2V0QXR0cmlidXRlKSB7XG4gICAgICByZXR1cm4gY2FudmFzLmdldEF0dHJpYnV0ZSgnZGF0YS1jYW1hbi1pZCcpXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICAvKipcbiAgICogVGhlIENhbWFuIGZ1bmN0aW9uLiBXaGlsZSB0ZWNobmljYWxseSBhIGNvbnN0cnVjdG9yLCBpdCB3YXMgbWFkZSB0byBiZSBjYWxsZWQgd2l0aG91dCB0aGUgYG5ld2Aga2V5d29yZC4gQ2FtYW4gd2lsbCBmaWd1cmUgaXQgb3V0LlxuICAgKiBAcGFyYW0geyBET01PYmplY3QgfCBTdHJpbmcgfSBpbml0aWFsaXplciBUaGUgRE9NIHNlbGVjdG9yIG9yIERPTSBvYmplY3QgdG8gaW5pdGlhbGl6ZS5cbiAgICogQG92ZXJsb2FkIENhbWFuKGluaXRpYWxpemVyKVxuICAgKiAgIEluaXRpYWxpemUgQ2FtYW4gd2l0aG91dCBhIGNhbGxiYWNrLlxuICAgKlxuICAgKiBAb3ZlcmxvYWQgQ2FtYW4oaW5pdGlhbGl6ZXIsIGNhbGxiYWNrKVxuICAgKiAgIEluaXRpYWxpemUgQ2FtYW4gd2l0aCBhIGNhbGxiYWNrLlxuICAgKiAgIEBwYXJhbSBbRnVuY3Rpb25dIGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGNhbGwgb25jZSBpbml0aWFsaXphdGlvbiBjb21wbGV0ZXMuXG4gICAqXG4gICAqIEBvdmVybG9hZCBDYW1hbihpbml0aWFsaXplciwgdXJsKVxuICAgKiAgIEluaXRpYWxpemUgQ2FtYW4gd2l0aCBhIFVSTCB0byBhbiBpbWFnZSBhbmQgbm8gY2FsbGJhY2suXG4gICAqICAgQHBhcmFtIFtTdHJpbmddIHVybCBVUmwgdG8gYW4gaW1hZ2UgdG8gZHJhdyB0byB0aGUgY2FudmFzLlxuICAgKlxuICAgKiBAb3ZlcmxvYWQgQ2FtYW4oaW5pdGlhbGl6ZXIsIHVybCwgY2FsbGJhY2spXG4gICAqICAgSW5pdGlhbGl6ZSBDYW1hbiB3aXRoIGEgY2FudmFzLCBVUkwgdG8gYW4gaW1hZ2UsIGFuZCBhIGNhbGxiYWNrLlxuICAgKiAgIEBwYXJhbSBbU3RyaW5nXSB1cmwgVVJsIHRvIGFuIGltYWdlIHRvIGRyYXcgdG8gdGhlIGNhbnZhcy5cbiAgICogICBAcGFyYW0gW0Z1bmN0aW9uXSBjYWxsYmFjayBGdW5jdGlvbiB0byBjYWxsIG9uY2UgaW5pdGlhbGl6YXRpb24gY29tcGxldGVzLlxuICAgKlxuICAgKiBAb3ZlcmxvYWQgQ2FtYW4oZmlsZSlcbiAgICogICBOb2RlSlM6IEluaXRpYWxpemUgQ2FtYW4gd2l0aCBhIHBhdGggdG8gYW4gaW1hZ2UgZmlsZSBhbmQgbm8gY2FsbGJhY2suXG4gICAqICAgQHBhcmFtIFtTdHJpbmcsIEZpbGVdIGZpbGUgRmlsZSBvYmplY3Qgb3IgcGF0aCB0byBpbWFnZSB0byByZWFkLlxuICAgKlxuICAgKiBAb3ZlcmxvYWQgQ2FtYW4oZmlsZSwgY2FsbGJhY2spXG4gICAqICAgTm9kZUpTOiBJbml0aWFsaXplIENhbWFuIHdpdGggYSBmaWxlIGFuZCBhIGNhbGxiYWNrLlxuICAgKiAgIEBwYXJhbSBbU3RyaW5nLCBGaWxlXSBmaWxlIEZpbGUgb2JqZWN0IG9yIHBhdGggdG8gaW1hZ2UgdG8gcmVhZC5cbiAgICogICBAcGFyYW0gW0Z1bmN0aW9uXSBjYWxsYmFjayBGdW5jdGlvbiB0byBjYWxsIG9uY2UgaW5pdGlhbGl6YXRpb24gY29tcGxldGVzLlxuICAgKiBAcmV0dXJuIFtDYW1hbl0gSW5pdGlhbGl6ZWQgQ2FtYW4gaW5zdGFuY2UuXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgY29uc3RydWN0b3IgKC4uLmFyZ3MpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKVxuICAgIH1cbiAgICBzdXBlcigpXG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDYW1hbikge1xuICAgICAgLy8gV2UgaGF2ZSB0byBkbyB0aGlzIHRvIGF2b2lkIHBvbGx1dGluZyB0aGUgZ2xvYmFsIHNjb3BlXG4gICAgICAvLyBiZWNhdXNlIG9mIGhvdyBDb2ZmZWVzY3JpcHQgYmluZHMgZnVuY3Rpb25zIHNwZWNpZmllZFxuICAgICAgLy8gd2l0aCA9PiBhbmQgdGhlIGZhY3QgdGhhdCBDYW1hbiBjYW4gYmUgaW52b2tlZCBhcyBib3RoXG4gICAgICAvLyBhIGZ1bmN0aW9uIGFuZCBhcyBhICduZXcnIG9iamVjdC5cbiAgICAgIHRoaXMuZmluaXNoSW5pdCA9IHRoaXMuZmluaXNoSW5pdC5iaW5kKHRoaXMpXG4gICAgICB0aGlzLmltYWdlTG9hZGVkID0gdGhpcy5pbWFnZUxvYWRlZC5iaW5kKHRoaXMpXG5cbiAgICAgIGNvbnN0IGlkID0gcGFyc2VJbnQoQ2FtYW4uZ2V0QXR0cklkKGFyZ3NbMF0pLCAxMClcbiAgICAgIGxldCBjYWxsYmFja1xuICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNhbGxiYWNrID0gYXJnc1sxXVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYWxsYmFjayA9IGFyZ3NbMl1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrID0gbm9vcFxuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGlkKSAmJiBTdG9yZS5oYXMoaWQpKSB7XG4gICAgICAgIHJldHVybiBTdG9yZS5leGVjdXRlKGlkLCBjYWxsYmFjaylcbiAgICAgIH1cblxuICAgICAgLy8gRXZlcnkgaW5zdGFuY2UgZ2V0cyBhIHVuaXF1ZSBJRC4gTWFrZXMgaXQgbXVjaCBzaW1wbGVyIHRvIGNoZWNrIGlmIHR3byB2YXJpYWJsZXMgYXJlIHRoZSBzYW1lIGluc3RhbmNlLlxuICAgICAgdGhpcy5pZCA9IFV0aWwudW5pcWlkKCkuZ2V0KClcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWRQaXhlbERhdGEgPSB0aGlzLm9yaWdpbmFsUGl4ZWxEYXRhID0gbnVsbFxuICAgICAgdGhpcy5jcm9wQ29vcmRpbmF0ZXMgPSB7IHg6IDAsIHk6IDAgfVxuICAgICAgdGhpcy5jcm9wcGVkID0gZmFsc2VcbiAgICAgIHRoaXMucmVzaXplZCA9IGZhbHNlXG5cbiAgICAgIHRoaXMucGl4ZWxTdGFjayA9IFtdIC8vIFN0b3JlcyB0aGUgcGl4ZWwgbGF5ZXJzXG4gICAgICB0aGlzLmxheWVyU3RhY2sgPSBbXSAvLyBTdG9yZXMgYWxsIG9mIHRoZSBsYXllcnMgd2FpdGluZyB0byBiZSByZW5kZXJlZFxuICAgICAgdGhpcy5jYW52YXNRdWV1ZSA9IFtdIC8vIFN0b3JlcyBhbGwgb2YgdGhlIGNhbnZhc2VzIHRvIGJlIHByb2Nlc3NlZFxuICAgICAgdGhpcy5jdXJyZW50TGF5ZXIgPSBudWxsXG4gICAgICB0aGlzLnNjYWxlZCA9IGZhbHNlXG5cbiAgICAgIHRoaXMuYW5hbHl6ZSA9IG5ldyBBbmFseXplKHRoaXMpXG4gICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKHRoaXMpXG5cbiAgICAgIHRoaXMuZG9tSXNMb2FkZWQoKCkgPT4ge1xuICAgICAgICB0aGlzLnBhcnNlQXJndW1lbnRzKGFyZ3MpXG4gICAgICAgIHRoaXMuc2V0dXAoKVxuICAgICAgfSlcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgQ2FtYW4oLi4uYXJncylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHRvIGVuc3VyZSB0aGUgRE9NIGlzIGxvYWRlZC4gRW5zdXJlcyB0aGUgY2FsbGJhY2sgaXMgYWx3YXlzIGZpcmVkLCBldmVuIGlmIHRoZSBET00gaXMgYWxyZWFkeSBsb2FkZWQgYmVmb3JlIGl0J3MgaW52b2tlZC4gVGhlIGNhbGxiYWNrIGlzIGFsc28gYWx3YXlzIGNhbGxlZCBhc3luY2hyb25vdXNseS5cbiAgICpcbiAgICogQHBhcmFtIHsgRnVuY3Rpb24gfSBjYiBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZmlyZSB3aGVuIHRoZSBET00gaXMgcmVhZHkuXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgZG9tSXNMb2FkZWQgKGNiKSB7XG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgIExvZy5kZWJ1ZygnRE9NIGluaXRpYWxpemVkJylcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjYi5jYWxsKHRoaXMpXG4gICAgICB9LCAwKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsaXN0ZW5lciA9ICgpID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICBMb2cuZGVidWcoJ0RPTSBpbml0aWFsaXplZCcpXG4gICAgICAgICAgY2IuY2FsbCh0aGlzKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgbGlzdGVuZXIsIGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIGFyZ3VtZW50cyBnaXZlbiB0byB0aGUgQ2FtYW4gZnVuY3Rpb24sIGFuZCBzZXRzIHRoZSBhcHByb3ByaWF0ZSBwcm9wZXJ0aWVzIG9uIHRoaXMgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7IEFycmF5IH0gYXJncyBBcnJheSBvZiBhcmd1bWVudHMgcGFzc2VkIHRvIENhbWFuLlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHBhcnNlQXJndW1lbnRzIChhcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzIGdpdmVuJylcbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0c1xuICAgIHRoaXMuaW5pdE9iaiA9IG51bGxcbiAgICB0aGlzLmluaXRUeXBlID0gbnVsbFxuICAgIHRoaXMuaW1hZ2VVcmwgPSBudWxsXG4gICAgdGhpcy5jYWxsYmFjayA9IG5vb3BcblxuICAgIC8vIEZpcnN0IGFyZ3VtZW50IGlzIGFsd2F5cyBvdXIgY2FudmFzL2ltYWdlXG4gICAgdGhpcy5zZXRJbml0T2JqZWN0KGFyZ3NbMF0pXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzd2l0Y2ggKHR5cGVvZiBhcmdzWzFdKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICB0aGlzLmltYWdlVXJsID0gYXJnc1sxXVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gYXJnc1sxXVxuICAgICAgICBicmVha1xuICAgIH1cblxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5jYWxsYmFjayA9IGFyZ3NbMl1cblxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgZm9yIChsZXQga2V5IGluIGFyZ3NbNF0pIHtcbiAgICAgICAgaWYgKGFyZ3NbNF0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gYXJnc1s0XVtrZXldXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgaW5pdGlhbGl6YXRpb24gb2JqZWN0IGZvciB0aGlzIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0geyBPYmplY3QgfCBTdHJpbmcgfSBvYmogVGhlIGluaXRpYWxpemF0aW9uIGFyZ3VtZW50LlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHNldEluaXRPYmplY3QgKG9iaikge1xuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5pbml0T2JqID0gb2JqXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5pdE9iaiA9ICQob2JqKVxuICAgIH1cblxuICAgIGlmICghdGhpcy5pbml0T2JqKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGltYWdlIG9yIGNhbnZhcyBmb3IgaW5pdGlhbGl6YXRpb24uJylcbiAgICB9XG5cbiAgICB0aGlzLmluaXRUeXBlID0gdGhpcy5pbml0T2JqLm5vZGVOYW1lLnRvTG93ZXJDYXNlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBCZWdpbnMgdGhlIHNldHVwIHByb2Nlc3NcbiAgICpcbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICBzZXR1cCAoKSB7XG4gICAgc3dpdGNoICh0aGlzLmluaXRUeXBlKSB7XG4gICAgICBjYXNlICdpbWcnOlxuICAgICAgICB0aGlzLmluaXRJbWFnZSgpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdjYW52YXMnOlxuICAgICAgICB0aGlzLmluaXRDYW52YXMoKVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIC8vIEluaXRpYWxpemF0aW9uIGZ1bmN0aW9uIGZvciB0aGUgYnJvd3NlciBhbmQgaW1hZ2Ugb2JqZWN0cy5cbiAgaW5pdEltYWdlICgpIHtcbiAgICB0aGlzLmltYWdlID0gdGhpcy5pbml0T2JqXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICBVdGlsLmNvcHlBdHRyaWJ1dGVzKHRoaXMuaW1hZ2UsIHRoaXMuY2FudmFzLCB7ZXhjZXB0OiBbJ3NyYyddfSlcblxuICAgIC8vIFN3YXAgb3V0IGltYWdlIHdpdGggdGhlIGNhbnZhcyBlbGVtZW50IGlmIHRoZSBpbWFnZSBleGlzdHMgaW4gdGhlIERPTS5cbiAgICB0aGlzLmltYWdlLnBhcmVudE5vZGUgJiYgdGhpcy5pbWFnZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh0aGlzLmNhbnZhcywgdGhpcy5pbWFnZSlcblxuICAgIHRoaXMuaW1hZ2VBZGp1c3RtZW50cygpXG4gICAgdGhpcy53YWl0Rm9ySW1hZ2VMb2FkZWQoKVxuICB9XG5cbiAgLy8gSW5pdGlhbGl6YXRpb24gZnVuY3Rpb24gZm9yIGJyb3dzZXIgYW5kIGNhbnZhcyBvYmplY3RzXG4gIC8vIFRPRE86XG4gIGluaXRDYW52YXMgKCkge1xuICAgIHRoaXMuY2FudmFzID0gdGhpcy5pbml0T2JqXG4gICAgY29uc29sZS5sb2codGhpcy5jYW52YXMpXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXG4gICAgaWYgKHRoaXMuaW1hZ2VVcmwpIHtcbiAgICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgICAgdGhpcy5pbWFnZS5zcmMgPSB0aGlzLmltYWdlVXJsXG5cbiAgICAgIHRoaXMuaW1hZ2VBZGp1c3RtZW50cygpXG4gICAgICB0aGlzLndhaXRGb3JJbWFnZUxvYWRlZCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmluaXNoSW5pdCgpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF1dG9tYXRpY2FsbHkgY2hlY2sgZm9yIGEgSGlEUEkgY2FwYWJsZSBzY3JlZW4gYW5kIHN3YXAgb3V0IHRoZSBpbWFnZSBpZiBwb3NzaWJsZS5cbiAgICogQWxzbyBjaGVja3MgdGhlIGltYWdlIFVSTCB0byBzZWUgaWYgaXQncyBhIGNyb3NzLWRvbWFpbiByZXF1ZXN0LCBhbmQgYXR0ZW1wdCB0byBwcm94eSB0aGUgaW1hZ2UuIElmIGEgY3Jvc3Mtb3JpZ2luIHR5cGUgaXMgY29uZmlndXJlZCwgdGhlIHByb3h5IHdpbGwgYmUgaWdub3JlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICBpbWFnZUFkanVzdG1lbnRzICgpIHtcbiAgICBpZiAoSU8uaXNSZW1vdGUodGhpcy5pbWFnZSkpIHtcbiAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gSU8ucHJveHlVcmwodGhpcy5pbWFnZS5zcmMpXG4gICAgICBMb2cuZGVidWcoYFJlbW90ZSBpbWFnZSBkZXRlY3RlZCwgdXNpbmcgVVJMID0gJHt0aGlzLmltYWdlLnNyY31gKVxuICAgIH1cbiAgfVxuXG4gIC8vIFV0aWxpdHkgZnVuY3Rpb24gdGhhdCBmaXJlcyB7Q2FtYW4jaW1hZ2VMb2FkZWR9IG9uY2UgdGhlIGltYWdlIGlzIGZpbmlzaGVkIGxvYWRpbmcuXG4gIHdhaXRGb3JJbWFnZUxvYWRlZCAoKSB7XG4gICAgaWYgKHRoaXMuaXNJbWFnZUxvYWRlZCgpKSB7XG4gICAgICB0aGlzLmltYWdlTG9hZGVkKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSB0aGlzLmltYWdlTG9hZGVkXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gaW1hZ2UgaXMgZmluaXNoZWQgbG9hZGluZy5cbiAgICogQHJldHVybnMgeyBCb29sZWFuIH0gSXMgdGhlIGltYWdlIGxvYWRlZD9cbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICBpc0ltYWdlTG9hZGVkICgpIHtcbiAgICBpZiAoIXRoaXMuaW1hZ2UuY29tcGxldGUpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAodGhpcy5pbWFnZS5uYXR1cmFsV2lkdGggJiYgdGhpcy5pbWFnZS5uYXR1cmFsV2lkdGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgLyoqXG4gICAqIEludGVybmV0IEV4cGxvcmVyIGhhcyBpc3N1ZXMgZmlndXJpbmcgb3V0IGltYWdlIGRpbWVuc2lvbnMgd2hlbiB0aGV5IGFyZW4ndCBleHBsaWNpdGx5IGRlZmluZWQsIGFwcGFyZW50bHkuIFdlIGNoZWNrIHRoZSBub3JtYWwgd2lkdGgvaGVpZ2h0IHByb3BlcnRpZXMgZmlyc3QsIGJ1dCBmYWxsIGJhY2sgdG8gbmF0dXJhbCBzaXplcyBpZiB0aGV5IGFyZSAwLlxuICAgKiBAcmV0dXJucyB7IE51bWJlciB9IFdpZHRoIG9mIHRoZSBpbml0aWFsaXphdGlvbiBpbWFnZS5cbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICBpbWFnZVdpZHRoICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZS53aWR0aCB8fCB0aGlzLmltYWdlLm5hdHVyYWxXaWR0aFxuICB9XG5cbiAgLyoqXG4gICAqIEBzZWUgQ2FtYW4jaW1hZ2VXaWR0aFxuICAgKlxuICAgKiBAcmV0dXJucyB7IE51bWJlciB9IEhlaWdodCBvZiB0aGUgaW5pdGlhbGl6YXRpb24gaW1hZ2UuXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgaW1hZ2VIZWlnaHQgKCkge1xuICAgIHJldHVybiB0aGlzLmltYWdlLmhlaWdodCB8fCB0aGlzLmltYWdlLm5hdHVyYWxIZWlnaHRcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBvbmNlIHRoZSBpbml0aWFsaXphdGlvbiBpbWFnZSBpcyBmaW5pc2hlZCBsb2FkaW5nLlxuICAgKiBXZSBtYWtlIHN1cmUgdGhhdCB0aGUgY2FudmFzIGRpbWVuc2lvbnMgYXJlIHByb3Blcmx5IHNldCBoZXJlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIGltYWdlTG9hZGVkICgpIHtcbiAgICBMb2cuZGVidWcoYEltYWdlIGxvYWRlZC4gV2lkdGggPSAke3RoaXMuaW1hZ2VXaWR0aCgpfSwgSGVpZ2h0ID0gJHt0aGlzLmltYWdlSGVpZ2h0KCl9YClcblxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5pbWFnZVdpZHRoKClcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmltYWdlSGVpZ2h0KClcblxuICAgIHRoaXMuZmluaXNoSW5pdCgpXG4gIH1cblxuICAvKipcbiAgICogRmluYWwgc3RlcCBvZiBpbml0aWFsaXphdGlvbi4gV2UgZmluaXNoIHNldHRpbmcgdXAgb3VyIGNhbnZhcyBlbGVtZW50LCBhbmQgd2UgZHJhdyB0aGUgaW1hZ2UgdG8gdGhlIGNhbnZhcyAoaWYgYXBwbGljYWJsZSkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgZmluaXNoSW5pdCAoKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRleHQpIHtcbiAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICB9XG5cbiAgICB0aGlzLm9yaWdpbmFsV2lkdGggPSB0aGlzLnByZVNjYWxlZFdpZHRoID0gdGhpcy53aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoXG4gICAgdGhpcy5vcmlnaW5hbEhlaWdodCA9IHRoaXMucHJlU2NhbGVkSGVpZ2h0ID0gdGhpcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHRcblxuICAgIGlmICghdGhpcy5oYXNJZCgpKSB7XG4gICAgICB0aGlzLmFzc2lnbklkKClcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbWFnZSkge1xuICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAwLCAwLCB0aGlzLmltYWdlV2lkdGgoKSwgdGhpcy5pbWFnZUhlaWdodCgpLCAwLCAwLCB0aGlzLnByZVNjYWxlZFdpZHRoLCB0aGlzLnByZVNjYWxlZEhlaWdodClcbiAgICB9XG5cbiAgICB0aGlzLmltYWdlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodClcbiAgICB0aGlzLnBpeGVsRGF0YSA9IHRoaXMuaW1hZ2VEYXRhLmRhdGFcblxuICAgIGlmIChDYW1hbi5hbGxvd1JldmVydCkge1xuICAgICAgdGhpcy5pbml0aWFsaXplZFBpeGVsRGF0YSA9IFV0aWwuZGF0YUFycmF5KHRoaXMucGl4ZWxEYXRhLmxlbmd0aClcbiAgICAgIHRoaXMub3JpZ2luYWxQaXhlbERhdGEgPSBVdGlsLmRhdGFBcnJheSh0aGlzLnBpeGVsRGF0YS5sZW5ndGgpXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waXhlbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHBpeGVsID0gdGhpcy5waXhlbERhdGFbaV1cbiAgICAgICAgdGhpcy5pbml0aWFsaXplZFBpeGVsRGF0YVtpXSA9IHBpeGVsXG4gICAgICAgIHRoaXMub3JpZ2luYWxQaXhlbERhdGFbaV0gPSBwaXhlbFxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZGltZW5zaW9ucyA9IHtcbiAgICAgIHdpZHRoOiB0aGlzLmNhbnZhcy53aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5jYW52YXMuaGVpZ2h0XG4gICAgfVxuXG4gICAgU3RvcmUucHV0KHRoaXMuaWQsIHRoaXMpXG5cbiAgICB0aGlzLmNhbGxiYWNrKHRoaXMpXG5cbiAgICAvLyBSZXNldCB0aGUgY2FsbGJhY2sgc28gcmUtaW5pdGlhbGl6YXRpb24gZG9lc24ndCB0cmlnZ2VyIGl0IGFnYWluLlxuICAgIHRoaXMuY2FsbGJhY2sgPSBub29wXG4gIH1cblxuICAvKipcbiAgICogSWYgeW91IGhhdmUgYSBzZXBhcmF0ZSBjb250ZXh0IHJlZmVyZW5jZSB0byB0aGlzIGNhbnZhcyBvdXRzaWRlIG9mIENhbWFuSlMgYW5kIHlvdSBtYWtlIGEgY2hhbmdlIHRvIHRoZSBjYW52YXMgb3V0c2lkZSBvZiBDYW1hbkpTLCB5b3Ugd2lsbCBoYXZlIHRvIGNhbGwgdGhpcyBmdW5jdGlvbiB0byB1cGRhdGUgb3VyIGNvbnRleHQgcmVmZXJlbmNlIHRvIGluY2x1ZGUgdGhvc2UgY2hhbmdlcy5cbiAgICpcbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICByZWxvYWRDYW52YXNEYXRhICgpIHtcbiAgICB0aGlzLmltYWdlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodClcbiAgICB0aGlzLnBpeGVsRGF0YSA9IHRoaXMuaW1hZ2VEYXRhLmRhdGFcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgY2FudmFzIHBpeGVscyB0byB0aGUgb3JpZ2luYWwgc3RhdGUgYXQgaW5pdGlhbGl6YXRpb24uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgcmVzZXRPcmlnaW5hbFBpeGVsRGF0YSAoKSB7XG4gICAgaWYgKCFDYW1hbi5hbGxvd1JldmVydCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXZlcnQgZGlzYWJsZWQnKVxuICAgIH1cblxuICAgIHRoaXMub3JpZ2luYWxQaXhlbERhdGEgPSBVdGlsLmRhdGFBcnJheSh0aGlzLnBpeGVsRGF0YS5sZW5ndGgpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpeGVsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHBpeGVsID0gdGhpcy5waXhlbERhdGFbaV1cbiAgICAgIHRoaXMub3JpZ2luYWxQaXhlbERhdGFbaV0gPSBwaXhlbFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEb2VzIHRoaXMgaW5zdGFuY2UgaGF2ZSBhbiBJRCBhc3NpZ25lZD9cbiAgICogQHJldHVybnMgeyBCb29sZWFuIH0gRXhpc3RhbmNlIG9mIGFuIElELlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIGhhc0lkICgpIHtcbiAgICByZXR1cm4gISFDYW1hbi5nZXRBdHRySWQodGhpcy5jYW52YXMpXG4gIH1cbiAgLyoqXG4gICAqIEFzc2lnbiBhIHVuaXF1ZSBJRCB0byB0aGlzIGluc3RhbmNlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIGFzc2lnbklkICgpIHtcbiAgICBpZiAodGhpcy5jYW52YXMuZ2V0QXR0cmlidXRlKCdkYXRhLWNhbWFuLWlkJykpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2RhdGEtY2FtYW4taWQnLCB0aGlzLmlkKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHRoZSBjdXJyZW50IGNhbnZhcyB3aXRoIGEgbmV3IG9uZSwgYW5kIHByb3Blcmx5IHVwZGF0ZXMgYWxsIG9mIHRoZSBhcHBsaWNhYmxlIHJlZmVyZW5jZXMgZm9yIHRoaXMgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7IERPTU9iamVjdCB9IG5ld0NhbnZhcyBUaGUgY2FudmFzIHRvIHN3YXAgaW50byB0aGlzIGluc3RhbmNlLlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHJlcGxhY2VDYW52YXMgKG5ld0NhbnZhcykge1xuICAgIGNvbnN0IG9sZENhbnZhcyA9IHRoaXMuY2FudmFzXG4gICAgdGhpcy5jYW52YXMgPSBuZXdDYW52YXNcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG5cbiAgICBvbGRDYW52YXMucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodGhpcy5jYW52YXMsIG9sZENhbnZhcylcblxuICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aFxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0XG5cbiAgICB0aGlzLnJlbG9hZENhbnZhc0RhdGEoKVxuXG4gICAgdGhpcy5kaW1lbnNpb25zID0ge1xuICAgICAgd2lkdGg6IHRoaXMuY2FudmFzLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmNhbnZhcy5oZWlnaHRcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQmVnaW5zIHRoZSByZW5kZXJpbmcgcHJvY2Vzcy4gVGhpcyB3aWxsIGV4ZWN1dGUgYWxsIG9mIHRoZSBmaWx0ZXIgZnVuY3Rpb25zIGNhbGxlZCBlaXRoZXIgc2luY2UgaW5pdGlhbGl6YXRpb24gb3IgdGhlIHByZXZpb3VzIHJlbmRlci5cbiAgICpcbiAgICogQHBhcmFtIHsgRnVuY3Rpb24gfSBbY2FsbGJhY2s9bm9vcF0gRnVuY3Rpb24gdG8gY2FsbCB3aGVuIHJlbmRlcmluZyBpcyBmaW5pc2hlZC5cbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICByZW5kZXIgKGNhbGxiYWNrID0gbm9vcCkge1xuICAgIEV2ZW50LnRyaWdnZXIodGhpcywgJ3JlbmRlclN0YXJ0JylcblxuICAgIHRoaXMucmVuZGVyZXIuZXhlY3V0ZSgoKSA9PiB7XG4gICAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuaW1hZ2VEYXRhLCAwLCAwKVxuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmV2ZXJ0cyB0aGUgY2FudmFzIGJhY2sgdG8gaXQncyBvcmlnaW5hbCBzdGF0ZSB3aGlsZVxuICAjIG1haW50YWluaW5nIGFueSBjcm9wcGVkIG9yIHJlc2l6ZWQgZGltZW5zaW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHsgQm9vbGVhbiB9IFt1cGRhdGVDb250ZXh0PXRydWVdIFNob3VsZCB3ZSBhcHBseSB0aGUgcmV2ZXJ0ZWQgcGl4ZWwgZGF0YSB0byB0aGUgY2FudmFzIGNvbnRleHQgdGh1cyB0cmlnZ2VyaW5nIGEgcmUtcmVuZGVyIGJ5IHRoZSBicm93c2VyP1xuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHJldmVydCAodXBkYXRlQ29udGV4dCA9IHRydWUpIHtcbiAgICBpZiAoIUNhbWFuLmFsbG93UmV2ZXJ0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JldmVydCBkaXNhYmxlZCcpXG4gICAgfVxuXG4gICAgY29uc3Qgb3JpZ2luYWxWaXNpYmxlUGl4ZWxzID0gdGhpcy5vcmlnaW5hbFZpc2libGVQaXhlbHMoKVxuICAgIGZvciAobGV0IGkgPSAwLCBqID0gb3JpZ2luYWxWaXNpYmxlUGl4ZWxzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgbGV0IHBpeGVsID0gb3JpZ2luYWxWaXNpYmxlUGl4ZWxzW2ldXG4gICAgICB0aGlzLnBpeGVsRGF0YVtpXSA9IHBpeGVsXG4gICAgfVxuXG4gICAgaWYgKHVwZGF0ZUNvbnRleHQpIHtcbiAgICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5pbWFnZURhdGEsIDAsIDApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbXBsZXRlbHkgcmVzZXRzIHRoZSBjYW52YXMgYmFjayB0byBpdCdzIG9yaWdpbmFsIHN0YXRlLlxuICAgKiBBbnkgc2l6ZSBhZGp1c3RtZW50cyB3aWxsIGFsc28gYmUgcmVzZXQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgcmVzZXQgKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgVXRpbC5jb3B5QXR0cmlidXRlcyh0aGlzLmNhbnZhcywgY2FudmFzKVxuXG4gICAgY2FudmFzLndpZHRoID0gdGhpcy5vcmlnaW5hbFdpZHRoXG4gICAgY2FudmFzLmhlaWdodCA9IHRoaXMub3JpZ2luYWxIZWlnaHRcblxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgY29uc3QgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpXG4gICAgY29uc3QgcGl4ZWxEYXRhID0gaW1hZ2VEYXRhLmRhdGFcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pbml0aWFsaXplZFBpeGVsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHBpeGVsID0gdGhpcy5pbml0aWFsaXplZFBpeGVsRGF0YVtpXVxuICAgICAgcGl4ZWxEYXRhW2ldID0gcGl4ZWxcbiAgICB9XG5cbiAgICBjdHgucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMClcblxuICAgIHRoaXMuY3JvcENvb3JkaW5hdGVzID0ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9XG4gICAgdGhpcy5yZXNpemVkID0gZmFsc2VcbiAgICB0aGlzLnJlcGxhY2VDYW52YXMoY2FudmFzKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG9yaWdpbmFsIHBpeGVsIGRhdGEgd2hpbGUgbWFpbnRhaW5pbmcgYW55IGNyb3BwaW5nIG9yIHJlc2l6aW5nIHRoYXQgbWF5IGhhdmUgb2NjdXJyZWQuXG4gICAqICoqV2FybmluZyoqOiB0aGlzIGlzIGN1cnJlbnRseSBpbiBiZXRhIHN0YXR1cy5cbiAgICogQHJldHVybnMgeyBBcnJheSB9IE9yaWdpbmFsIHBpeGVsIHZhbHVlcyBzdGlsbCB2aXNpYmxlIGFmdGVyIGNyb3BwaW5nIG9yIHJlc2l6aW5nLlxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIC8vIFRPRE86XG4gIG9yaWdpbmFsVmlzaWJsZVBpeGVscyAoKSB7XG4gICAgaWYgKCFDYW1hbi5hbGxvd1JldmVydCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXZlcnQgZGlzYWJsZWQnKVxuICAgIH1cblxuICAgIGNvbnN0IHBpeGVscyA9IFtdXG4gICAgcmV0dXJuIHBpeGVsc1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hlcyB0aGUgZmlsdGVyIGNhbGxiYWNrIHRoYXQgbW9kaWZpZXMgdGhlIFJHQkEgb2JqZWN0IGludG8gdGhlXG4gICMgcmVuZGVyIHF1ZXVlLlxuICAgKlxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBuYW1lIE5hbWUgb2YgdGhlIGZpbHRlciBmdW5jdGlvbi5cbiAgICogQHBhcmFtIHsgRnVuY3Rpb24gfSBwcm9jZXNzRm4gIFRoZSBGaWx0ZXIgZnVuY3Rpb24uXG4gICAqIEByZXR1cm5zIHsgQ2FtYW4gfVxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIHByb2Nlc3MgKG5hbWUsIHByb2Nlc3NGbikge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkKHtcbiAgICAgIHR5cGU6IEZpbHRlci5UeXBlLlNpbmdsZSxcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBwcm9jZXNzRm46IHByb2Nlc3NGblxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoZXMgdGhlIGtlcm5lbCBpbnRvIHRoZSByZW5kZXIgcXVldWUuXG4gICAqXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGtlcm5lbC5cbiAgICogQHBhcmFtIHsgQXJyYXkgfSBhZGp1c3QgVGhlIGNvbnZvbHV0aW9uIGtlcm5lbCByZXByZXNlbnRlZCBhcyBhIDFEIGFycmF5LlxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBbZGl2aXNvcj1udWxsXSBUaGUgZGl2aXNvciBmb3IgdGhlIGNvbnZvbHV0aW9uLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2JpYXM9MF0gVGhlIGJpYXMgZm9yIHRoZSBjb252b2x1dGlvbi5cbiAgICogQHJldHVybnMgeyBDYW1hbiB9XG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgcHJvY2Vzc0tlcm5lbCAobmFtZSwgYWRqdXN0LCBkaXZpc29yID0gbnVsbCwgYmlhcyA9IDApIHtcbiAgICBpZiAoIWRpdmlzb3IpIHtcbiAgICAgIGRpdmlzb3IgPSAwXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBhZGp1c3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGl2aXNvciArPSBhZGp1c3RbaV1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFkZCh7XG4gICAgICB0eXBlOiBGaWx0ZXIuVHlwZS5LZXJuZWwsXG4gICAgICBuYW1lLFxuICAgICAgYWRqdXN0LFxuICAgICAgZGl2aXNvcixcbiAgICAgIGJpYXNcbiAgICB9KVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgc3RhbmRhbG9uZSBwbHVnaW4gaW50byB0aGUgcmVuZGVyIHF1ZXVlLlxuICAgKlxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBwbHVnaW4gTmFtZSBvZiB0aGUgcGx1Z2luLlxuICAgKiBAcGFyYW0geyBBcnJheSB9IGFyZ3MgQXJyYXkgb2YgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIHBsdWdpbi5cbiAgICogQHJldHVybnMgeyBDYW1hbiB9XG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgcHJvY2Vzc1BsdWdpbiAocGx1Z2luLCBhcmdzKSB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGQoe1xuICAgICAgdHlwZTogRmlsdGVyLlR5cGUuUGx1Z2luLFxuICAgICAgcGx1Z2luLFxuICAgICAgYXJnc1xuICAgIH0pXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2hlcyBhIG5ldyBsYXllciBvcGVyYXRpb24gaW50byB0aGUgcmVuZGVyIHF1ZXVlIGFuZCBjYWxscyB0aGUgbGF5ZXJcbiAgIyBjYWxsYmFjay5cbiAgICpcbiAgICogQHBhcmFtIHsgRnVuY3Rpb24gfSBjYWxsYmFjayAgRnVuY3Rpb24gdGhhdCBpcyBleGVjdXRlZCB3aXRoaW4gdGhlIGNvbnRleHQgb2YgdGhlIGxheWVyLlxuICAgKiBBbGwgZmlsdGVyIGFuZCBhZGp1c3RtZW50IGZ1bmN0aW9ucyBmb3IgdGhlIGxheWVyIHdpbGwgYmUgZXhlY3V0ZWQgaW5zaWRlIG9mIHRoaXMgZnVuY3Rpb24uXG4gICAqIEByZXR1cm5zIHsgQ2FtYW4gfVxuICAgKiBAbWVtYmVyb2YgQ2FtYW5cbiAgICovXG4gIG5ld0xheWVyIChjYWxsYmFjaykge1xuICAgIGNvbnN0IGxheWVyID0gbmV3IExheWVyKHRoaXMpXG4gICAgdGhpcy5jYW52YXNRdWV1ZS5wdXNoKGxheWVyKVxuICAgIHRoaXMucmVuZGVyZXIuYWRkKHtcbiAgICAgIHR5cGU6IEZpbHRlci5UeXBlLkxheWVyRGVxdWV1ZVxuICAgIH0pXG5cbiAgICBjYWxsYmFjay5jYWxsKGxheWVyKVxuXG4gICAgdGhpcy5yZW5kZXJlci5hZGQoe1xuICAgICAgdHlwZTogRmlsdGVyLlR5cGUuTGF5ZXJGaW5pc2hlZFxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoZXMgdGhlIGxheWVyIGNvbnRleHQgYW5kIG1vdmVzIHRvIHRoZSBuZXh0IG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHsgTGF5ZXIgfSBsYXllciBUaGUgbGF5ZXIgdG8gZXhlY3V0ZS5cbiAgICogQG1lbWJlcm9mIENhbWFuXG4gICAqL1xuICBleGVjdXRlTGF5ZXIgKGxheWVyKSB7XG4gICAgdGhpcy5wdXNoQ29udGV4dChsYXllcilcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYWxsIG9mIHRoZSByZWxldmFudCBkYXRhIHRvIHRoZSBuZXcgbGF5ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7IExheWVyIH0gbGF5ZXIgVGhlIGxheWVyIHdob3NlIGNvbnRleHQgd2Ugd2FudCB0byBzd2l0Y2ggdG8uXG4gICAqIEBtZW1iZXJvZiBDYW1hblxuICAgKi9cbiAgcHVzaENvbnRleHQgKGxheWVyKSB7XG4gICAgdGhpcy5sYXllclN0YWNrLnB1c2godGhpcy5jdXJyZW50TGF5ZXIpXG4gICAgdGhpcy5waXhlbFN0YWNrLnB1c2godGhpcy5waXhlbERhdGEpXG4gICAgdGhpcy5jdXJyZW50TGF5ZXIgPSBsYXllclxuICAgIHRoaXMucGl4ZWxEYXRhID0gbGF5ZXIucGl4ZWxEYXRhXG4gIH1cblxuICAvLyBSZXN0b3JlIHRoZSBwcmV2aW91cyBsYXllciBjb250ZXh0LlxuICBwb3BDb250ZXh0ICgpIHtcbiAgICB0aGlzLnBpeGVsRGF0YSA9IHRoaXMucGl4ZWxTdGFjay5wb3AoKVxuICAgIHRoaXMuY3VycmVudExheWVyID0gdGhpcy5sYXllclN0YWNrLnBvcCgpXG4gIH1cblxuICAvLyBBcHBsaWVzIHRoZSBjdXJyZW50IGxheWVyIHRvIGl0cyBwYXJlbnQgbGF5ZXIuXG4gIGFwcGx5Q3VycmVudExheWVyICgpIHtcbiAgICB0aGlzLmN1cnJlbnRMYXllci5hcHBseVRvUGFyZW50KClcbiAgfVxuXG4gIC8qXG4gICAqIEdyYWJzIHRoZSBjYW52YXMgZGF0YSwgZW5jb2RlcyBpdCB0byBCYXNlNjQsIHRoZW4gc2V0cyB0aGUgYnJvd3NlciBsb2NhdGlvbiB0byB0aGUgZW5jb2RlZCBkYXRhIHNvIHRoYXQgdGhlIHVzZXIgd2lsbCBiZSBwcm9tcHRlZCB0byBkb3dubG9hZCBpdC5cbiAgICpcbiAgICogQHNlZSBDYW1hblxuICAgKi9cbiAgc2F2ZSAoKSB7XG4gICAgdGhpcy5icm93c2VyU2F2ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gIH1cblxuICBicm93c2VyU2F2ZSAodHlwZSA9ICdwbmcnKSB7XG4gICAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKVxuICAgIC8vIEZvcmNlIGRvd25sb2FkIChpdHMgYSBiaXQgaGFja2lzaClcbiAgICBjb25zdCBpbWFnZSA9IHRoaXMudG9CYXNlNjQodHlwZSkucmVwbGFjZShgaW1hZ2UvJHt0eXBlfWAsICdpbWFnZS9vY3RldC1zdHJlYW0nKVxuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBpbWFnZVxuICB9XG5cbiAgLypcbiAgICogVGFrZXMgdGhlIGN1cnJlbnQgY2FudmFzIGRhdGEsIGNvbnZlcnRzIGl0IHRvIEJhc2U2NCwgdGhlbiBzZXRzIGl0IGFzIHRoZSBzb3VyY2Ugb2YgYSBuZXcgSW1hZ2Ugb2JqZWN0IGFuZCByZXR1cm5zIGl0LlxuICAgKi9cbiAgdG9JbWFnZSAodHlwZSkge1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKClcbiAgICBpbWcuc3JjID0gdGhpcy50b0Jhc2U2NCh0eXBlKVxuICAgIGltZy53aWR0aCA9IHRoaXMuZGltZW5zaW9ucy53aWR0aFxuICAgIGltZy5oZWlnaHQgPSB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0XG5cbiAgICBpZiAod2luZG93LmRldmljZVBpeGVsUmF0aW8pIHtcbiAgICAgIGltZy53aWR0aCAvPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb1xuICAgICAgaW1nLmhlaWdodCAvPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb1xuICAgIH1cbiAgICByZXR1cm4gaW1nXG4gIH1cblxuICAvKlxuICAqIEJhc2U2NCBlbmNvZGVzIHRoZSBjdXJyZW50IGNhbnZhc1xuICAqL1xuICB0b0Jhc2U2NCAodHlwZSA9ICdwbmcnKSB7XG4gICAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKVxuICAgIHJldHVybiB0aGlzLmNhbnZhcy50b0RhdGFVUkwoYGltYWdlLyR7dHlwZX1gKVxuICB9XG59XG4iLCIvKipcbiAqXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsqfSBCbGVuZGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZ2lzdGVyQmxlbmRlcihCbGVuZGVyKSB7XG4gIC8vIERpcmVjdGx5IGFwcGx5IHRoZSBjaGlsZCBsYXllcidzIHBpeGVscyB0byB0aGUgcGFyZW50IGxheWVyIHdpdGggbm8gc3BlY2lhbCBjaGFuZ2VzXG4gIEJsZW5kZXIucmVnaXN0ZXIoJ25vcm1hbCcsIChyZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcjogcmdiYUxheWVyLnIsXG4gICAgICBnOiByZ2JhTGF5ZXIuZyxcbiAgICAgIGI6IHJnYmFMYXllci5iXG4gICAgfVxuICB9KVxuXG4gIC8vIEFwcGx5IHRoZSBjaGlsZCB0byB0aGUgcGFyZW50IGJ5IG11bHRpcGx5aW5nIHRoZSBjb2xvciB2YWx1ZXMuIFRoaXMgZ2VuZXJhbGx5IGNyZWF0ZXMgY29udHJhc3QuXG4gIEJsZW5kZXIucmVnaXN0ZXIoJ211bHRpcGx5JywgKHJnYmFMYXllciwgcmdiYVBhcmVudCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICByOiAocmdiYUxheWVyLnIgKiByZ2JhUGFyZW50LnIpIC8gMjU1LFxuICAgICAgZzogKHJnYmFMYXllci5nICogcmdiYVBhcmVudC5nKSAvIDI1NSxcbiAgICAgIGI6IChyZ2JhTGF5ZXIuYiAqIHJnYmFQYXJlbnQuYikgLyAyNTVcbiAgICB9XG4gIH0pXG5cbiAgQmxlbmRlci5yZWdpc3Rlcignc2NyZWVuJywgKHJnYmFMYXllciwgcmdiYVBhcmVudCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICByOiAyNTUgLSAoKCgyNTUgLSByZ2JhTGF5ZXIucikgKiAoMjU1IC0gcmdiYVBhcmVudC5yKSkgLyAyNTUpLFxuICAgICAgZzogMjU1IC0gKCgoMjU1IC0gcmdiYUxheWVyLmcpICogKDI1NSAtIHJnYmFQYXJlbnQuZykpIC8gMjU1KSxcbiAgICAgIGI6IDI1NSAtICgoKDI1NSAtIHJnYmFMYXllci5iKSAqICgyNTUgLSByZ2JhUGFyZW50LmIpKSAvIDI1NSlcbiAgICB9XG4gIH0pXG5cbiAgQmxlbmRlci5yZWdpc3Rlcignb3ZlcmxheScsIChyZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB7fVxuICAgIHJlc3VsdC5yID0gcmdiYVBhcmVudC5yID4gMTI4ID8gMjU1IC0gMiAqICgyNTUgLSByZ2JhTGF5ZXIucikgKiAoMjU1IC0gcmdiYVBhcmVudC5yKSAvIDI1NSA6IChyZ2JhUGFyZW50LnIgKiByZ2JhTGF5ZXIuciAqIDIpIC8gMjU1XG4gICAgcmVzdWx0LmcgPSByZ2JhUGFyZW50LmcgPiAxMjggPyAyNTUgLSAyICogKDI1NSAtIHJnYmFMYXllci5nKSAqICgyNTUgLSByZ2JhUGFyZW50LmcpIC8gMjU1IDogKHJnYmFQYXJlbnQuZyAqIHJnYmFMYXllci5nICogMikgLyAyNTVcbiAgICByZXN1bHQuYiA9IHJnYmFQYXJlbnQuYiA+IDEyOCA/IDI1NSAtIDIgKiAoMjU1IC0gcmdiYUxheWVyLmIpICogKDI1NSAtIHJnYmFQYXJlbnQuYikgLyAyNTUgOiAocmdiYVBhcmVudC5iICogcmdiYUxheWVyLmIgKiAyKSAvIDI1NVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9KVxuXG4gIEJsZW5kZXIucmVnaXN0ZXIoJ2RpZmZlcmVuY2UnLCAocmdiYUxheWVyLCByZ2JhUGFyZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHJnYmFMYXllci5yIC0gcmdiYVBhcmVudC5yLFxuICAgICAgZzogcmdiYUxheWVyLmcgLSByZ2JhUGFyZW50LmcsXG4gICAgICBiOiByZ2JhTGF5ZXIuYiAtIHJnYmFQYXJlbnQuYlxuICAgIH1cbiAgfSlcblxuICBCbGVuZGVyLnJlZ2lzdGVyKCdhZGRpdGlvbicsIChyZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcjogcmdiYVBhcmVudC5yICsgcmdiYUxheWVyLnIsXG4gICAgICBnOiByZ2JhUGFyZW50LmcgKyByZ2JhTGF5ZXIuZyxcbiAgICAgIGI6IHJnYmFQYXJlbnQuYiArIHJnYmFMYXllci5iXG4gICAgfVxuICB9KVxuXG4gIEJsZW5kZXIucmVnaXN0ZXIoJ2V4Y2x1c2lvbicsIChyZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcjogMTI4IC0gMiAqIChyZ2JhUGFyZW50LnIgLSAxMjgpICogKHJnYmFMYXllci5yIC0gMTI4KSAvIDI1NSxcbiAgICAgIGc6IDEyOCAtIDIgKiAocmdiYVBhcmVudC5nIC0gMTI4KSAqIChyZ2JhTGF5ZXIuZyAtIDEyOCkgLyAyNTUsXG4gICAgICBiOiAxMjggLSAyICogKHJnYmFQYXJlbnQuYiAtIDEyOCkgKiAocmdiYUxheWVyLmIgLSAxMjgpIC8gMjU1XG4gICAgfVxuICB9KVxuXG4gIEJsZW5kZXIucmVnaXN0ZXIoJ3NvZnRMaWdodCcsIChyZ2JhTGF5ZXIsIHJnYmFQYXJlbnQpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB7fVxuXG4gICAgcmVzdWx0LnIgPSByZ2JhUGFyZW50LnIgPiAxMjggPyAyNTUgLSAoKDI1NSAtIHJnYmFQYXJlbnQucikgKiAoMjU1IC0gKHJnYmFMYXllci5yIC0gMTI4KSkpIC8gMjU1IDogKHJnYmFQYXJlbnQuciAqIChyZ2JhTGF5ZXIuciArIDEyOCkpIC8gMjU1XG5cbiAgICByZXN1bHQuZyA9IHJnYmFQYXJlbnQuZyA+IDEyOCA/IDI1NSAtICgoMjU1IC0gcmdiYVBhcmVudC5nKSAqICgyNTUgLSAocmdiYUxheWVyLmcgLSAxMjgpKSkgLyAyNTUgOiAocmdiYVBhcmVudC5nICogKHJnYmFMYXllci5nICsgMTI4KSkgLyAyNTVcblxuICAgIHJlc3VsdC5iID0gcmdiYVBhcmVudC5iID4gMTI4ID8gMjU1IC0gKCgyNTUgLSByZ2JhUGFyZW50LmIpICogKDI1NSAtIChyZ2JhTGF5ZXIuYiAtIDEyOCkpKSAvIDI1NSA6IChyZ2JhUGFyZW50LmIgKiAocmdiYUxheWVyLmIgKyAxMjgpKSAvIDI1NVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9KVxuXG4gIEJsZW5kZXIucmVnaXN0ZXIoJ2xpZ2h0ZW4nLCAocmdiYUxheWVyLCByZ2JhUGFyZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHJnYmFQYXJlbnQuciA+IHJnYmFMYXllci5yID8gcmdiYVBhcmVudC5yIDogcmdiYUxheWVyLnIsXG4gICAgICBnOiByZ2JhUGFyZW50LmcgPiByZ2JhTGF5ZXIuZyA/IHJnYmFQYXJlbnQuZyA6IHJnYmFMYXllci5nLFxuICAgICAgYjogcmdiYVBhcmVudC5iID4gcmdiYUxheWVyLmIgPyByZ2JhUGFyZW50LmIgOiByZ2JhTGF5ZXIuYlxuICAgIH1cbiAgfSlcblxuICBCbGVuZGVyLnJlZ2lzdGVyKCdkYXJrZW4nLCAocmdiYUxheWVyLCByZ2JhUGFyZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHJnYmFQYXJlbnQuciA+IHJnYmFMYXllci5yID8gcmdiYUxheWVyLnIgOiByZ2JhUGFyZW50LnIsXG4gICAgICBnOiByZ2JhUGFyZW50LmcgPiByZ2JhTGF5ZXIuZyA/IHJnYmFMYXllci5nIDogcmdiYVBhcmVudC5nLFxuICAgICAgYjogcmdiYVBhcmVudC5iID4gcmdiYUxheWVyLmIgPyByZ2JhTGF5ZXIuYiA6IHJnYmFQYXJlbnQuYlxuICAgIH1cbiAgfSlcbn1cbiIsIi8qKlxuICogVG9ucyBvZiBjb2xvciBjb252ZXJzaW9uIHV0aWxpdHkgZnVuY3Rpb25zLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBDb252ZXJ0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnZlcnQge1xuICAvKipcbiAgICogQ29udmVydHMgdGhlIGhleCByZXByZXNlbnRhdGlvbiBvZiBhIGNvbG9yIHRvIFJHQiB2YWx1ZXMuXG4gICAqIEhleCB2YWx1ZSBjYW4gb3B0aW9uYWxseSBzdGFydCB3aXRoIHRoZSBoYXNoICgjKS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBoZXggVGhlIGNvbG9ycyBoZXggdmFsdWVcbiAgICogQHJldHVybnMgeyBPYmplY3QgfSBUaGUgUkdCIHJlcHJlc2VudGF0aW9uXG4gICAqIEBtZW1iZXJvZiBDb252ZXJ0XG4gICAqL1xuICBzdGF0aWMgaGV4VG9SR0IgKGhleCkge1xuICAgIGlmIChoZXguY2hhckF0KDApID09PSAnIycpIHtcbiAgICAgIGhleCA9IGhleC5zdWJzdHIoMSlcbiAgICB9XG4gICAgY29uc3QgciA9IHBhcnNlSW50KGhleC5zdWJzdHIoMCwgMiksIDE2KVxuICAgIGNvbnN0IGcgPSBwYXJzZUludChoZXguc3Vic3RyKDIsIDIpLCAxNilcbiAgICBjb25zdCBiID0gcGFyc2VJbnQoaGV4LnN1YnN0cig0LCAyKSwgMTYpXG4gICAgcmV0dXJuIHsgciwgZywgYiB9XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYW4gUkdCIGNvbG9yIHRvIEhTTC5cbiAgICogQXNzdW1lcyByLCBnLCBhbmQgYiBhcmUgaW4gdGhlIHNldCBbMCwgMjU1XSBhbmRcbiAgICogcmV0dXJucyBoLCBzLCBhbmQgbCBpbiB0aGUgc2V0IFswLCAxXS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBOdW1iZXIgfSByIFJlZCBjaGFubmVsXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IGcgR3JlZW4gY2hhbm5lbFxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBiIEJsdWUgY2hhbm5lbFxuICAgKiBAcmV0dXJuIHsgQXJyYXkgfSBUaGUgSFNMIHJlcHJlc2VudGF0aW9uXG4gICAqIEBtZW1iZXJvZiBDb252ZXJ0XG4gICAqL1xuICBzdGF0aWMgcmdiVG9IU0wgKHIsIGcsIGIpIHtcbiAgICBpZiAodHlwZW9mIHIgPT09ICdvYmplY3QnKSB7XG4gICAgICBnID0gci5nXG4gICAgICBiID0gci5iXG4gICAgICByID0gci5yXG4gICAgfVxuXG4gICAgciAvPSAyNTVcbiAgICBnIC89IDI1NVxuICAgIGIgLz0gMjU1XG5cbiAgICBjb25zdCBtYXggPSBNYXRoLm1heChyLCBnLCBiKVxuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKHIsIGcsIGIpXG4gICAgY29uc3QgbCA9IChtYXggKyBtaW4pIC8gMlxuICAgIGxldCBoLCBzXG4gICAgaWYgKG1heCA9PT0gbWluKSB7XG4gICAgICBoID0gcyA9IDBcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZCA9IG1heCAtIG1pblxuICAgICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pXG5cbiAgICAgIGlmIChtYXggPT09IHIpIHtcbiAgICAgICAgaCA9IChnIC0gYikgLyBkICsgZyA8IGIgPyA2IDogMFxuICAgICAgfSBlbHNlIGlmIChtYXggPT09IGcpIHtcbiAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMlxuICAgICAgfSBlbHNlIGlmIChtYXggPT09IGIpIHtcbiAgICAgICAgaCA9IChyIC0gZykgLyBkICsgNFxuICAgICAgfVxuXG4gICAgICBoIC89IDZcbiAgICB9XG4gICAgcmV0dXJuIHtoLCBzLCBsfVxuICB9XG5cbiAgLyoqXG4gICAqIG9udmVydHMgYW4gSFNMIGNvbG9yIHZhbHVlIHRvIFJHQi4gQ29udmVyc2lvbiBmb3JtdWxhIGFkYXB0ZWQgZnJvbSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hTTF9jb2xvcl9zcGFjZS5cbiAgICogQXNzdW1lcyBoLCBzLCBhbmQgbCBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDFdIGFuZCByZXR1cm5zIHIsIGcsIGFuZCBiIGluIHRoZSBzZXQgWzAsIDI1NV0uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gaCBUaGUgaHVlXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHMgVGhlIHNhdHVyYXRpb25cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gbCBUaGUgbGlnaHRuZXNzXG4gICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gVGhlIFJHQiByZXByZXNlbnRhdGlvblxuICAgKiBAbWVtYmVyb2YgQ29udmVydFxuICAgKi9cbiAgc3RhdGljIGhzbFRvUkdCIChoLCBzLCBsKSB7XG4gICAgbGV0IHIsIGcsIGIsIHAsIHFcbiAgICBpZiAodHlwZW9mIGggPT09ICdvYmplY3QnKSB7XG4gICAgICBzID0gaC5zXG4gICAgICBsID0gaC5sXG4gICAgICBoID0gaC5oXG4gICAgfVxuICAgIGlmIChzID09PSAwKSB7XG4gICAgICByID0gZyA9IGIgPSBsXG4gICAgfSBlbHNlIHtcbiAgICAgIHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzXG4gICAgICBwID0gMiAqIGwgLSBxXG5cbiAgICAgIHIgPSB0aGlzLmh1ZVRvUkdCKHAsIHEsIGggKyAxIC8gMylcbiAgICAgIGcgPSB0aGlzLmh1ZVRvUkdCKHAsIHEsIGgpXG4gICAgICBiID0gdGhpcy5odWVUb1JHQihwLCBxLCBoIC0gMSAvIDMpXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICByOiByICogMjU1LFxuICAgICAgZzogZyAqIDI1NSxcbiAgICAgIGI6IGIgKiAyNTVcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgZnJvbSB0aGUgaHVlIGNvbG9yIHNwYWNlIGJhY2sgdG8gUkdCLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHBcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gcVxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB0XG4gICAqIEByZXR1cm5zIHsgTnVtYmVyIH0gUkdCIHZhbHVlXG4gICAqIEBtZW1iZXJvZiBDb252ZXJ0XG4gICAqL1xuICBzdGF0aWMgaHVlVG9SR0IgKHAsIHEsIHQpIHtcbiAgICBpZiAodCA8IDApIHtcbiAgICAgIHQgKz0gMVxuICAgIH1cbiAgICBpZiAodCA+IDEpIHtcbiAgICAgIHQgLT0gMVxuICAgIH1cbiAgICBpZiAodCA8IDEgLyA2KSB7XG4gICAgICByZXR1cm4gcCArIChxIC0gcCkgKiA2ICogdFxuICAgIH1cbiAgICBpZiAodCA8IDEgLyAyKSB7XG4gICAgICByZXR1cm4gcVxuICAgIH1cbiAgICBpZiAodCA8IDIgLyAzKSB7XG4gICAgICByZXR1cm4gcCArIChxIC0gcCkgKiAoMiAvIDMgLSB0KSAqIDZcbiAgICB9XG4gICAgcmV0dXJuIHBcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhbiBSR0IgY29sb3IgdmFsdWUgdG8gSFNWLiBDb252ZXJzaW9uIGZvcm11bGEgYWRhcHRlZCBmcm9tIHtodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hTVl9jb2xvcl9zcGFjZX0uXG4gICAqIEFzc3VtZXMgciwgZywgYW5kIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdIGFuZCByZXR1cm5zIGgsIHMsIGFuZCB2IGluIHRoZSBzZXQgWzAsIDFdLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7Kn0gciBUaGUgcmVkIGNvbG9yIHZhbHVlXG4gICAqIEBwYXJhbSB7Kn0gZyBUaGUgZ3JlZW4gY29sb3IgdmFsdWVcbiAgICogQHBhcmFtIHsqfSBiIFRoZSBibHVlIGNvbG9yIHZhbHVlXG4gICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gVGhlIEhTViByZXByZXNlbnRhdGlvblxuICAgKiBAbWVtYmVyb2YgQ29udmVydFxuICAgKi9cbiAgc3RhdGljIHJnYlRvSFNWIChyLCBnLCBiKSB7XG4gICAgciAvPSAyNTVcbiAgICBnIC89IDI1NVxuICAgIGIgLz0gMjU1XG5cbiAgICBjb25zdCBtYXggPSBNYXRoLm1heChyLCBnLCBiKVxuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKHIsIGcsIGIpXG4gICAgY29uc3QgdiA9IG1heFxuICAgIGNvbnN0IGQgPSBtYXggLSBtaW5cblxuICAgIGNvbnN0IHMgPSBtYXggPT09IDAgPyAwIDogZCAvIG1heFxuICAgIGxldCBoXG4gICAgaWYgKG1heCA9PT0gbWluKSB7XG4gICAgICBoID0gMFxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobWF4ID09PSByKSB7XG4gICAgICAgIGggPSAoZyAtIGIpIC8gZCArIGcgPCBiID8gNiA6IDBcbiAgICAgIH0gZWxzZSBpZiAobWF4ID09PSBnKSB7XG4gICAgICAgIGggPSAoYiAtIHIpIC8gZCArIDJcbiAgICAgIH0gZWxzZSBpZiAobWF4ID09PSBiKSB7XG4gICAgICAgIGggPSAociAtIGcpIC8gZCArIDRcbiAgICAgIH1cbiAgICAgIGggLz0gNlxuICAgIH1cblxuICAgIHJldHVybiB7aCwgcywgdn1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhbiBIU1YgY29sb3IgdmFsdWUgdG8gUkdCLiBDb252ZXJzaW9uIGZvcm11bGEgYWRhcHRlZCBmcm9tIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSFNWX2NvbG9yX3NwYWNlLlxuICAgKiBBc3N1bWVzIGgsIHMsIGFuZCB2IGFyZSBjb250YWluZWQgaW4gdGhlIHNldCBbMCwgMV0gYW5kIHJldHVybnMgciwgZywgYW5kIGIgaW4gdGhlIHNldCBbMCwgMjU1XS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBoIFRoZSBodWVcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gcyBUaGUgc2F0dXJhdGlvblxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB2IFRoZSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IFRoZSBSR0IgcmVwcmVzZW50YXRpb25cbiAgICogQG1lbWJlcm9mIENvbnZlcnRcbiAgICovXG4gIHN0YXRpYyBoc3ZUb1JHQiAoaCwgcywgdikge1xuICAgIGNvbnN0IGkgPSBNYXRoLmZsb29yKGggKiA2KVxuICAgIGNvbnN0IGYgPSBoICogNiAtIGlcbiAgICBjb25zdCBwID0gdiAqICgxIC0gcylcbiAgICBjb25zdCBxID0gdiAqICgxIC0gZiAqIHMpXG4gICAgY29uc3QgdCA9IHYgKiAoMSAtICgxIC0gZikgKiBzKVxuXG4gICAgbGV0IHIsIGcsIGJcbiAgICBzd2l0Y2ggKGkgJSA2KSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHIgPSB2XG4gICAgICAgIGcgPSB0XG4gICAgICAgIGIgPSBwXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDE6XG4gICAgICAgIHIgPSBxXG4gICAgICAgIGcgPSB2XG4gICAgICAgIGIgPSBwXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDI6XG4gICAgICAgIHIgPSBwXG4gICAgICAgIGcgPSB2XG4gICAgICAgIGIgPSB0XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHIgPSBwXG4gICAgICAgIGcgPSBxXG4gICAgICAgIGIgPSB2XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHIgPSB0XG4gICAgICAgIGcgPSBwXG4gICAgICAgIGIgPSB2XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDU6XG4gICAgICAgIHIgPSB2XG4gICAgICAgIGcgPSBwXG4gICAgICAgIGIgPSBxXG4gICAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IE1hdGguZmxvb3IociAqIDI1NSksXG4gICAgICBnOiBNYXRoLmZsb29yKGcgKiAyNTUpLFxuICAgICAgYjogTWF0aC5mbG9vcihiICogMjU1KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIFJHQiBjb2xvciB2YWx1ZSB0byB0aGUgWFlaIGNvbG9yIHNwYWNlLiBGb3JtdWxhcyBhcmUgYmFzZWQgb24gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TUkdCIGFzc3VtaW5nIHRoYXQgUkdCIHZhbHVlcyBhcmUgc1JHQi5cbiAgICogQXNzdW1lcyByLCBnLCBhbmQgYiBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDI1NV0gYW5kIHJldHVybnMgeCwgeSwgYW5kIHouXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gciBUaGUgcmVkIGNvbG9yIHZhbHVlXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IGcgVGhlIGdyZWVuIGNvbG9yIHZhbHVlXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IGIgVGhlIGJsdWUgY29sb3IgdmFsdWVcbiAgICogQHJldHVybnMgeyBPYmplY3QgfSBUaGUgWFlaIHJlcHJlc2VudGF0aW9uXG4gICAqIEBtZW1iZXJvZiBDb252ZXJ0XG4gICAqL1xuICBzdGF0aWMgcmdiVG9YWVogKHIsIGcsIGIpIHtcbiAgICByIC89IDI1NVxuICAgIGcgLz0gMjU1XG4gICAgYiAvPSAyNTVcblxuICAgIGlmIChyID4gMC4wNDA0NSkge1xuICAgICAgciA9IE1hdGgucG93KChyICsgMC4wNTUpIC8gMS4wNTUsIDIuNClcbiAgICB9IGVsc2Uge1xuICAgICAgciAvPSAxMi45MlxuICAgIH1cblxuICAgIGlmIChnID4gMC4wNDA0NSkge1xuICAgICAgZyA9IE1hdGgucG93KChnICsgMC4wNTUpIC8gMS4wNTUsIDIuNClcbiAgICB9IGVsc2Uge1xuICAgICAgZyAvPSAxMi45MlxuICAgIH1cblxuICAgIGlmIChiID4gMC4wNDA0NSkge1xuICAgICAgYiA9IE1hdGgucG93KChiICsgMC4wNTUpIC8gMS4wNTUsIDIuNClcbiAgICB9IGVsc2Uge1xuICAgICAgYiAvPSAxMi45MlxuICAgIH1cblxuICAgIGNvbnN0IHggPSByICogMC40MTI0ICsgZyAqIDAuMzU3NiArIGIgKiAwLjE4MDVcbiAgICBjb25zdCB5ID0gciAqIDAuMjEyNiArIGcgKiAwLjcxNTIgKyBiICogMC4wNzIyXG4gICAgY29uc3QgeiA9IHIgKiAwLjAxOTMgKyBnICogMC4xMTkyICsgYiAqIDAuOTUwNVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHggKiAxMDAsXG4gICAgICB5OiB5ICogMTAwLFxuICAgICAgejogeiAqIDEwMFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIFhZWiBjb2xvciB2YWx1ZSB0byB0aGUgc1JHQiBjb2xvciBzcGFjZS4gRm9ybXVsYXMgYXJlIGJhc2VkIG9uIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU1JHQiBhbmQgdGhlIHJlc3VsdGluZyBSR0IgdmFsdWUgd2lsbCBiZSBpbiB0aGUgc1JHQiBjb2xvciBzcGFjZS5cbiAgICogQXNzdW1lcyB4LCB5IGFuZCB6IHZhbHVlcyBhcmUgd2hhdGV2ZXIgdGhleSBhcmUgYW5kIHJldHVybnMgciwgZyBhbmQgYiBpbiB0aGUgc2V0IFswLCAyNTVdLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHggVGhlIFggdmFsdWVcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0geSBUaGUgWSB2YWx1ZVxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB6IFRoZSBaIHZhbHVlXG4gICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gVGhlIFJHQiByZXByZXNlbnRhdGlvblxuICAgKiBAbWVtYmVyb2YgQ29udmVydFxuICAgKi9cbiAgc3RhdGljIHh5elRvUkdCICh4LCB5LCB6KSB7XG4gICAgeCAvPSAxMDBcbiAgICB5IC89IDEwMFxuICAgIHogLz0gMTAwXG5cbiAgICBsZXQgciA9ICgzLjI0MDYgKiB4KSArICgtMS41MzcyICogeSkgKyAoLTAuNDk4NiAqIHopXG4gICAgbGV0IGcgPSAoLTAuOTY4OSAqIHgpICsgKDEuODc1OCAqIHkpICsgKDAuMDQxNSAqIHopXG4gICAgbGV0IGIgPSAoMC4wNTU3ICogeCkgKyAoLTAuMjA0MCAqIHkpICsgKDEuMDU3MCAqIHopXG5cbiAgICBpZiAociA+IDAuMDAzMTMwOCkge1xuICAgICAgciA9ICgxLjA1NSAqIE1hdGgucG93KHIsIDAuNDE2NjY2NjY2NykpIC0gMC4wNTVcbiAgICB9IGVsc2Uge1xuICAgICAgciAqPSAxMi45MlxuICAgIH1cblxuICAgIGlmIChnID4gMC4wMDMxMzA4KSB7XG4gICAgICBnID0gKDEuMDU1ICogTWF0aC5wb3coZywgMC40MTY2NjY2NjY3KSkgLSAwLjA1NVxuICAgIH0gZWxzZSB7XG4gICAgICBnICo9IDEyLjkyXG4gICAgfVxuXG4gICAgaWYgKGIgPiAwLjAwMzEzMDgpIHtcbiAgICAgIGIgPSAoMS4wNTUgKiBNYXRoLnBvdyhiLCAwLjQxNjY2NjY2NjcpKSAtIDAuMDU1XG4gICAgfSBlbHNlIHtcbiAgICAgIGIgKj0gMTIuOTJcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcjogciAqIDI1NSxcbiAgICAgIGc6IGcgKiAyNTUsXG4gICAgICBiOiBiICogMjU1XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgWFlaIGNvbG9yIHZhbHVlIHRvIHRoZSBDSUVMQUIgY29sb3Igc3BhY2UuIEZvcm11bGFzIGFyZSBiYXNlZCBvbiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xhYl9jb2xvcl9zcGFjZSBUaGUgcmVmZXJlbmNlIHdoaXRlIHBvaW50IHVzZWQgaW4gdGhlIGNvbnZlcnNpb24gaXMgRDY1LlxuICAgKiBBc3N1bWVzIHgsIHkgYW5kIHogdmFsdWVzIGFyZSB3aGF0ZXZlciB0aGV5IGFyZSBhbmQgcmV0dXJucyBMKiwgYSogYW5kIGIqIHZhbHVlc1xuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IHggVGhlIFggdmFsdWVcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0geSBUaGUgWSB2YWx1ZVxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB6IFRoZSBaIHZhbHVlXG4gICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gVGhlIExhYiByZXByZXNlbnRhdGlvblxuICAgKiBAbWVtYmVyb2YgQ29udmVydFxuICAgKi9cbiAgc3RhdGljIHh5elRvTGFiICh4LCB5LCB6KSB7XG4gICAgaWYgKHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgICAgeSA9IHgueVxuICAgICAgeiA9IHguelxuICAgICAgeCA9IHgueFxuICAgIH1cblxuICAgIGNvbnN0IHdoaXRlWCA9IDk1LjA0N1xuICAgIGNvbnN0IHdoaXRlWSA9IDEwMC4wXG4gICAgY29uc3Qgd2hpdGVaID0gMTA4Ljg4M1xuXG4gICAgeCAvPSB3aGl0ZVhcbiAgICB5IC89IHdoaXRlWVxuICAgIHogLz0gd2hpdGVaXG5cbiAgICBpZiAoeCA+IDAuMDA4ODU2NDUxNjc5KSB7XG4gICAgICB4ID0gTWF0aC5wb3coeCwgMC4zMzMzMzMzMzMzKVxuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gKDcuNzg3MDM3MDM3ICogeCkgKyAwLjEzNzkzMTAzNDVcbiAgICB9XG5cbiAgICBpZiAoeSA+IDAuMDA4ODU2NDUxNjc5KSB7XG4gICAgICB5ID0gTWF0aC5wb3coeSwgMC4zMzMzMzMzMzMzKVxuICAgIH0gZWxzZSB7XG4gICAgICB5ID0gKDcuNzg3MDM3MDM3ICogeSkgKyAwLjEzNzkzMTAzNDVcbiAgICB9XG5cbiAgICBpZiAoeiA+IDAuMDA4ODU2NDUxNjc5KSB7XG4gICAgICB6ID0gTWF0aC5wb3coeiwgMC4zMzMzMzMzMzMzKVxuICAgIH0gZWxzZSB7XG4gICAgICB6ID0gKDcuNzg3MDM3MDM3ICogeikgKyAwLjEzNzkzMTAzNDVcbiAgICB9XG5cbiAgICBjb25zdCBsID0gMTE2ICogeSAtIDE2XG4gICAgY29uc3QgYSA9IDUwMCAqICh4IC0geSlcbiAgICBjb25zdCBiID0gMjAwICogKHkgLSB6KVxuXG4gICAgcmV0dXJuIHsgbCwgYSwgYiB9XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBMKiwgYSosIGIqIGNvbG9yIHZhbHVlcyBmcm9tIHRoZSBDSUVMQUIgY29sb3Igc3BhY2UgdG8gdGhlIFhZWiBjb2xvciBzcGFjZS4gRm9ybXVsYXMgYXJlIGJhc2VkIG9uIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGFiX2NvbG9yX3NwYWNlIFRoZSByZWZlcmVuY2Ugd2hpdGUgcG9pbnQgdXNlZCBpbiB0aGUgY29udmVyc2lvbiBpcyBENjUuXG4gICAqIEFzc3VtZXMgTCosIGEqIGFuZCBiKiB2YWx1ZXMgYXJlIHdoYXRldmVyIHRoZXkgYXJlIGFuZCByZXR1cm5zIHgsIHkgYW5kIHogdmFsdWVzLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7Kn0gbCBUaGUgTCogdmFsdWVcbiAgICogQHBhcmFtIHsqfSBhIFRoZSBhKiB2YWx1ZVxuICAgKiBAcGFyYW0geyp9IGIgVGhlIGIqIHZhbHVlXG4gICAqIEByZXR1cm5zICB7IE9iamVjdCB9IFRoZSBYWVogcmVwcmVzZW50YXRpb25cbiAgICogQG1lbWJlcm9mIENvbnZlcnRcbiAgICovXG4gIHN0YXRpYyBsYWJUb1hZWiAobCwgYSwgYikge1xuICAgIGlmICh0eXBlb2YgbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGEgPSBsLmFcbiAgICAgIGIgPSBsLmJcbiAgICAgIGwgPSBsLmxcbiAgICB9XG5cbiAgICBsZXQgeSA9IChsICsgMTYpIC8gMTE2XG4gICAgbGV0IHggPSB5ICsgKGEgLyA1MDApXG4gICAgbGV0IHogPSB5IC0gKGIgLyAyMDApXG5cbiAgICBpZiAoeCA+IDAuMjA2ODk2NTUxNykge1xuICAgICAgeCA9IHggKiB4ICogeFxuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gMC4xMjg0MTg1NDkzICogKHggLSAwLjEzNzkzMTAzNDUpXG4gICAgfVxuICAgIGlmICh5ID4gMC4yMDY4OTY1NTE3KSB7XG4gICAgICB5ID0geSAqIHkgKiB5XG4gICAgfSBlbHNlIHtcbiAgICAgIHkgPSAwLjEyODQxODU0OTMgKiAoeSAtIDAuMTM3OTMxMDM0NSlcbiAgICB9XG4gICAgaWYgKHogPiAwLjIwNjg5NjU1MTcpIHtcbiAgICAgIHogPSB6ICogeiAqIHpcbiAgICB9IGVsc2Uge1xuICAgICAgeiA9IDAuMTI4NDE4NTQ5MyAqICh6IC0gMC4xMzc5MzEwMzQ1KVxuICAgIH1cblxuICAgIC8vIEQ2NSByZWZlcmVuY2Ugd2hpdGUgcG9pbnRcbiAgICByZXR1cm4ge1xuICAgICAgeDogeCAqIDk1LjA0NyxcbiAgICAgIHk6IHkgKiAxMDAuMCxcbiAgICAgIHo6IHogKiAxMDguODgzXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIEwqLCBhKiwgYiogYmFjayB0byBSR0IgdmFsdWVzLlxuICAgKiBAc2VlIENvbnZlcnQucmdiVG9YWVpcbiAgICogQHNlZSBDb252ZXJ0Lnh5elRvTGFiXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsqfSByIFRoZSByZWQgY29sb3IgdmFsdWVcbiAgICogQHBhcmFtIHsqfSBnIFRoZSBncmVlbiBjb2xvciB2YWx1ZVxuICAgKiBAcGFyYW0geyp9IGIgVGhlIGJsdWUgY29sb3IgdmFsdWVcbiAgICogQG1lbWJlcm9mIENvbnZlcnRcbiAgICovXG4gIHN0YXRpYyByZ2JUb0xhYiAociwgZywgYikge1xuICAgIGlmICh0eXBlb2YgciA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGcgPSByLmdcbiAgICAgIGIgPSByLmJcbiAgICAgIHIgPSByLnJcbiAgICB9XG5cbiAgICBjb25zdCB4eXogPSB0aGlzLnJnYlRvWFlaKHIsIGcsIGIpXG4gICAgcmV0dXJuIHRoaXMueHl6VG9MYWIoeHl6KVxuICB9XG59XG4iLCIvKipcbiAqIFZhcmlvdXMgbWF0aC1oZWF2eSBoZWxwZXJzIHRoYXQgYXJlIHVzZWQgdGhyb3VnaG91dCBDYW1hbkpTLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBDYWxjdWxhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsY3VsYXRlIHtcbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50cy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB4MSAxc3QgcG9pbnQgeC1jb29yZGluYXRlLlxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB5MSAxc3QgcG9pbnQgeS1jb29yZGluYXRlLlxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB4MiAybmQgcG9pbnQgeC1jb29yZGluYXRlLlxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSB5MiAybmQgcG9pbnQgeS1jb29yZGluYXRlLlxuICAgKiBAcmV0dXJucyB7IE51bWJlciB9IFRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSB0d28gcG9pbnRzLlxuICAgKiBAbWVtYmVyb2YgQ2FsY3VsYXRlXG4gICAqL1xuICBzdGF0aWMgZGlzdGFuY2UgKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4MiAtIHgxLCAyKSArIE1hdGgucG93KHkyIC0geTEsIDIpKVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIHBzZXVkb3JhbmRvbSBudW1iZXIgdGhhdCBsaWVzIHdpdGhpbiB0aGUgbWF4IC0gbWl4IHJhbmdlLiBUaGUgbnVtYmVyIGNhbiBiZSBlaXRoZXIgYW4gaW50ZWdlciBvciBhIGZsb2F0IGRlcGVuZGluZyBvbiB3aGF0IHRoZSB1c2VyIHNwZWNpZmllcy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBtaW4gVGhlIGxvd2VyIGJvdW5kIChpbmNsdXNpdmUpLlxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBtYXggVGhlIHVwcGVyIGJvdW5kIChpbmNsdXNpdmUpLlxuICAgKiBAcGFyYW0geyBCb29sZWFuIH0gZ2V0RmxvYXQgUmV0dXJuIGEgRmxvYXQgb3IgYSByb3VuZGVkIEludGVnZXI/XG4gICAqIEByZXR1cm5zIHsgTnVtYmVyIH0gVGhlIHBzZXVkb3JhbmRvbSBudW1iZXIsIGVpdGhlciBhcyBhIGZsb2F0IG9yIGludGVnZXIuXG4gICAqIEBtZW1iZXJvZiBDYWxjdWxhdGVcbiAgICovXG4gIHN0YXRpYyByYW5kb21SYW5nZSAobWluLCBtYXgsIGdldEZsb2F0ID0gZmFsc2UpIHtcbiAgICBjb25zdCByYW5kID0gbWluICsgKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSlcbiAgICBpZiAoZ2V0RmxvYXQpIHtcbiAgICAgIHJldHVybiByYW5kLnRvRml4ZWQoZ2V0RmxvYXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKHJhbmQpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGx1bWluYW5jZSBvZiBhIHNpbmdsZSBwaXhlbCB1c2luZyBhIHNwZWNpYWwgd2VpZ2h0ZWQgc3VtLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IE9iamVjdCB9IHJnYmEgUkdCQSBvYmplY3QgZGVzY3JpYmluZyBhIHNpbmdsZSBwaXhlbC5cbiAgICogQHJldHVybnMgeyBOdW1iZXIgfSBUaGUgbHVtaW5hbmNlIHZhbHVlIG9mIHRoZSBwaXhlbC5cbiAgICogQG1lbWJlcm9mIENhbGN1bGF0ZVxuICAgKi9cbiAgc3RhdGljIGx1bWluYW5jZSAocmdiYSkge1xuICAgIHJldHVybiAoMC4yOTkgKiByZ2JhLnIpICsgKDAuNTg3ICogcmdiYS5nKSArICgwLjExNCAqIHJnYmEuYilcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBiZXppZXIgY3VydmUgZ2l2ZW4gYSBzdGFydCBhbmQgZW5kIHBvaW50LCB3aXRoIGNvbnRyb2wgcG9pbnRzIGluIGJldHdlZW4uXG4gICAqIENhbiBhbHNvIG9wdGlvbmFsbHkgYm91bmQgdGhlIHkgdmFsdWVzIGJldHdlZW4gYSBsb3cgYW5kIGhpZ2ggYm91bmQuXG4gICAqIFRoaXMgaXMgZGlmZmVyZW50IHRoYW4gbW9zdCBiZXppZXIgY3VydmUgZnVuY3Rpb25zIGJlY2F1c2UgaXQgYXR0ZW1wdHMgdG8gY29uc3RydWN0IGl0IGluIHN1Y2ggYSB3YXkgdGhhdCB3ZSBjYW4gdXNlIGl0IG1vcmUgbGlrZSBhIHNpbXBsZSBpbnB1dCAtPiBvdXRwdXQgc3lzdGVtLCBvciBhIG9uZS10by1vbmUgZnVuY3Rpb24uXG4gICAqIEluIG90aGVyIHdvcmRzIHdlIGNhbiBwcm92aWRlIGFuIGlucHV0IGNvbG9yIHZhbHVlLCBhbmQgaW1tZWRpYXRlbHkgcmVjZWl2ZSBhbiBvdXRwdXQgbW9kaWZpZWQgY29sb3IgdmFsdWUuXG4gICAqIE5vdGUgdGhhdCwgYnkgZGVzaWduLCB0aGlzIGRvZXMgbm90IGZvcmNlIFggdmFsdWVzIHRvIGJlIGluIHRoZSByYW5nZSBbMC4uMjU1XS4gVGhpcyBpcyB0byBnZW5lcmFsaXplIHRoZSBmdW5jdGlvbiBhIGJpdCBtb3JlLiBJZiB5b3UgZ2l2ZSBpdCBhIHN0YXJ0aW5nIFggdmFsdWUgdGhhdCBpc24ndCAwLCBhbmQvb3IgYSBlbmRpbmcgWCB2YWx1ZSB0aGF0IGlzbid0IDI1NSwgeW91IG1heSBydW4gaW50byBwcm9ibGVtcyB3aXRoIHlvdXIgZmlsdGVyIVxuICAgKlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7IEFycmF5IH0gY29udHJvbFBvaW50cyAyLWl0ZW0gYXJyYXlzIGRlc2NyaWJpbmcgdGhlIHgsIHkgY29vcmRpbmF0ZXMgb2YgdGhlIGNvbnRyb2wgcG9pbnRzLiBNaW5pbXVtIHR3by5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gW2xvd0JvdW5kPTBdIE1pbmltdW0gcG9zc2libGUgdmFsdWUgZm9yIGFueSB5LXZhbHVlIGluIHRoZSBjdXJ2ZS5cbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gW2hpZ2hCb3VuZD0yNTVdIE1heGltdW0gcG9zc2libGUgdmFsdWUgZm9yIGFueSB5LXZhbHVlIGluIHRoZSBjdXJ2ZS5cbiAgICogQHJldHVybnMgeyBBcnJheSB9IEFycmF5IHdob3NlIGluZGV4IHJlcHJlc2VudHMgZXZlcnkgeC12YWx1ZSBiZXR3ZWVuIHN0YXJ0IGFuZCBlbmQsIGFuZCB2YWx1ZSByZXByZXNlbnRzIHRoZSBjb3JyZXNwb25kaW5nIHktdmFsdWUuXG4gICAqIEBtZW1iZXJvZiBDYWxjdWxhdGVcbiAgICovXG4gIHN0YXRpYyBiZXppZXIgKGNvbnRyb2xQb2ludHMsIGxvd0JvdW5kID0gMCwgaGlnaEJvdW5kID0gMjU1KSB7XG4gICAgaWYgKGNvbnRyb2xQb2ludHMubGVuZ3RoIDwgMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG51bWJlciBvZiBhcmd1bWVudHMgdG8gYmV6aWVyJylcbiAgICB9XG5cbiAgICBsZXQgYmV6aWVyID0ge31cbiAgICBjb25zdCBsZXJwID0gKGEsIGIsIHQpID0+IGEgKiAoMSAtIHQpICsgYiAqIHRcbiAgICBjb25zdCBjbGFtcCA9IChhLCBtaW4sIG1heCkgPT4gTWF0aC5taW4oTWF0aC5tYXgoYSwgbWluKSwgbWF4KVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwOyBpKyspIHtcbiAgICAgIGxldCB0ID0gaSAvIDEwMDBcbiAgICAgIGxldCBwcmV2ID0gY29udHJvbFBvaW50c1xuXG4gICAgICB3aGlsZSAocHJldi5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbnN0IG5leHQgPSBbXVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBwcmV2Lmxlbmd0aCAtIDI7IGorKykge1xuICAgICAgICAgIG5leHQucHVzaChbXG4gICAgICAgICAgICBsZXJwKHByZXZbal1bMF0sIHByZXZbaiArIDFdWzBdLCB0KSxcbiAgICAgICAgICAgIGxlcnAocHJldltqXVsxXSwgcHJldltqICsgMV1bMV0sIHQpXG4gICAgICAgICAgXSlcbiAgICAgICAgfVxuICAgICAgICBwcmV2ID0gbmV4dFxuICAgICAgfVxuXG4gICAgICBiZXppZXJbTWF0aC5yb3VuZChwcmV2WzBdWzBdKV0gPSBNYXRoLnJvdW5kKGNsYW1wKHByZXZbMF1bMV0sIGxvd0JvdW5kLCBoaWdoQm91bmQpKVxuICAgIH1cblxuICAgIGNvbnN0IGVuZFggPSBjb250cm9sUG9pbnRzW2NvbnRyb2xQb2ludHMubGVuZ3RoIC0gMV1bMF1cbiAgICBiZXppZXIgPSBDYWxjdWxhdGUubWlzc2luZ1ZhbHVlcyhiZXppZXIsIGVuZFgpXG5cbiAgICAvLyBFZGdlIGNhc2VcbiAgICBpZiAoIWJlemllcltlbmRYXSkge1xuICAgICAgYmV6aWVyW2VuZFhdID0gYmV6aWVyW2VuZFggLSAxXVxuICAgIH1cblxuICAgIHJldHVybiBiZXppZXJcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHBvc3NpYmxlIG1pc3NpbmcgdmFsdWVzIGZyb20gYSBnaXZlbiB2YWx1ZSBhcnJheS4gTm90ZSB0aGF0IHRoaXMgcmV0dXJucyBhIGNvcHkgYW5kIGRvZXMgbm90IG11dGF0ZSB0aGUgb3JpZ2luYWwuIEluIGNhc2Ugbm8gdmFsdWVzIGFyZSBtaXNzaW5nIHRoZSBvcmlnaW5hbCBhcnJheSBpcyByZXR1cm5lZCBhcyB0aGF0IGlzIGNvbnZlbmllbnQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsgQXJyYXkgfSAyLWl0ZW0gYXJyYXlzIGRlc2NyaWJpbmcgdGhlIHgsIHkgY29vcmRpbmF0ZXMgb2YgdGhlIGNvbnRyb2wgcG9pbnRzLlxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBlbmQgeCB2YWx1ZSBvZiB0aGUgYXJyYXkgKG1heGltdW0pXG4gICAqIEByZXR1cm4geyBBcnJheSB9IEFycmF5IHdob3NlIGluZGV4IHJlcHJlc2VudHMgZXZlcnkgeC12YWx1ZSBiZXR3ZWVuIHN0YXJ0IGFuZCBlbmQsIGFuZCB2YWx1ZSByZXByZXNlbnRzIHRoZSBjb3JyZXNwb25kaW5nIHktdmFsdWUuXG4gICAqIEBtZW1iZXJvZiBDYWxjdWxhdGVcbiAgICovXG4gIHN0YXRpYyBtaXNzaW5nVmFsdWVzICh2YWx1ZXMsIGVuZFgpIHtcbiAgICAvLyBEbyBhIHNlYXJjaCBmb3IgbWlzc2luZyB2YWx1ZXMgaW4gdGhlIGJlemllciBhcnJheSBhbmQgdXNlIGxpbmVhclxuICAgIC8vIGludGVycG9sYXRpb24gdG8gYXBwcm94aW1hdGUgdGhlaXIgdmFsdWVzXG4gICAgaWYgKE9iamVjdC5rZXlzKHZhbHVlcykubGVuZ3RoIDwgZW5kWCArIDEpIHtcbiAgICAgIGNvbnN0IHJldCA9IHt9XG4gICAgICBsZXQgbGVmdENvb3JkLCByaWdodENvb3JkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBlbmRYOyBpKyspIHtcbiAgICAgICAgaWYgKHZhbHVlc1tpXSkge1xuICAgICAgICAgIHJldFtpXSA9IHZhbHVlc1tpXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxlZnRDb29yZCA9IFtpIC0gMSwgcmV0W2kgLSAxXV1cbiAgICAgICAgICAvLyBGaW5kIHRoZSBmaXJzdCB2YWx1ZSB0byB0aGUgcmlnaHQuIElkZWFsbHkgdGhpcyBsb29wIHdpbGwgYnJlYWtcbiAgICAgICAgICAvLyB2ZXJ5IHF1aWNrbHkuXG4gICAgICAgICAgZm9yIChsZXQgaiA9IGk7IGogPD0gZW5kWDsgaisrKSB7XG4gICAgICAgICAgICBpZiAodmFsdWVzW2pdKSB7XG4gICAgICAgICAgICAgIHJpZ2h0Q29vcmQgPSBbaiwgdmFsdWVzW2pdXVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXRbaV0gPSBsZWZ0Q29vcmRbMV0gKyAoKHJpZ2h0Q29vcmRbMV0gLSBsZWZ0Q29vcmRbMV0pIC8gKHJpZ2h0Q29vcmRbMF0gLSBsZWZ0Q29vcmRbMF0pKSAqIChpIC0gbGVmdENvb3JkWzBdKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXNcbiAgfVxufVxuIiwiLy8gVGhlIGZpbHRlcnMgZGVmaW5lIGFsbCBvZiB0aGUgYnVpbHQtaW4gZnVuY3Rpb25hbGl0eSB0aGF0IGNvbWVzIHdpdGggQ2FtYW4gKGFzIG9wcG9zZWQgdG8gYmVpbmcgIHByb3ZpZGVkIGJ5IGEgcGx1Z2luKS4gQWxsIG9mIHRoZXNlIGZpbHRlcnMgYXJlIHJhdGhlcmJhc2ljLCBidXQgYXJlIGV4dHJlbWVseSBwb3dlcmZ1bCB3aGVuIG1hbnkgYXJlIGNvbWJpbmVkLiBGb3IgaW5mb3JtYXRpb24gb24gY3JlYXRpbmcgcGx1Z2lucywgY2hlY2sgb3V0IHRoZSBbUGx1Z2luIENyZWF0aW9uXShodHRwOi8vY2FtYW5qcy5jb20vZG9jcy9wbHVnaW4tY3JlYXRpb24pIHBhZ2UsIGFuZCBmb3IgaW5mb3JtYXRpb24gb24gdXNpbmcgdGhlIHBsdWdpbnMsIGNoZWNrIG91dCB0aGUgW0J1aWx0LUluIEZ1bmN0aW9uYWxpdHkoaHR0cDovL2NhbWFuanMuY29tL2RvY3MvYnVpbHQtaW4pIHBhZ2UuXG5cbmltcG9ydCBDb252ZXJ0IGZyb20gJy4uL2NvcmUvY29udmVydCdcbmltcG9ydCBDYWxjdWxhdGUgZnJvbSAnLi4vY29yZS9jYWxjdWxhdGUnXG5cbi8qKlxuICpcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyp9IEZpbHRlclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWdpc3RlckZpbHRlciAoRmlsdGVyKSB7XG4gIC8qXG4gICogRmlsbCBDb2xvclxuICAqIEZpbGxzIHRoZSBjYW52YXMgd2l0aCBhIHNpbmdsZSBzb2xpZCBjb2xvci5cbiAgKiBBcmd1bWVudHM6IENhbiB0YWtlIGVpdGhlciBzZXBhcmF0ZSBSLCBHLCBhbmQgQiB2YWx1ZXMgYXMgYXJndW1lbnRzLCBvciBhIHNpbmdsZSBoZXggY29sb3IgdmFsdWUuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignZmlsbENvbG9yJywgZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBsZXQgY29sb3JcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNvbG9yID0gQ29udmVydC5oZXhUb1JHQihhcmdzWzBdKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb2xvciA9IHtcbiAgICAgICAgcjogYXJnc1swXSxcbiAgICAgICAgZzogYXJnc1sxXSxcbiAgICAgICAgYjogYXJnc1syXVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnByb2Nlc3MoJ2ZpbGxDb2xvcicsIChyZ2JhKSA9PiB7XG4gICAgICByZ2JhLnIgPSBjb2xvci5yXG4gICAgICByZ2JhLmcgPSBjb2xvci5nXG4gICAgICByZ2JhLmIgPSBjb2xvci5iXG4gICAgICByZ2JhLmEgPSAyNTVcbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIEJyaWdodG5lc3NcbiAgKiBTaW1wbGUgYnJpZ2h0bmVzcyBhZGp1c3RtZW50LlxuICAqIEFyZ3VtZW50czogUmFuZ2UgaXMgLTEwMCB0byAxMDAuIFZhbHVlcyA8IDAgd2lsbCBkYXJrZW4gaW1hZ2Ugd2hpbGUgdmFsdWVzID4gMCB3aWxsIGJyaWdodGVuLlxuICAqL1xuICBGaWx0ZXIucmVnaXN0ZXIoJ2JyaWdodG5lc3MnLCBmdW5jdGlvbiAoYWRqdXN0KSB7XG4gICAgYWRqdXN0ID0gTWF0aC5mbG9vcigyNTUgKiAoYWRqdXN0IC8gMTAwKSlcbiAgICB0aGlzLnByb2Nlc3MoJ2JyaWdodG5lc3MnLCAocmdiYSkgPT4ge1xuICAgICAgcmdiYS5yICs9IGFkanVzdFxuICAgICAgcmdiYS5nICs9IGFkanVzdFxuICAgICAgcmdiYS5iICs9IGFkanVzdFxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogU2F0dXJhdGlvblxuICAqIEFkanVzdHMgdGhlIGNvbG9yIHNhdHVyYXRpb24gb2YgdGhlIGltYWdlLlxuICAqIEFyZ3VtZW50czogUmFuZ2UgaXMgLTEwMCB0byAxMDAuIFZhbHVlcyA8IDAgd2lsbCBkZXNhdHVyYXRlIHRoZSBpbWFnZSB3aGlsZSB2YWx1ZXMgPiAwIHdpbGwgc2F0dXJhdGUgaXQuXG4gICogSWYgeW91IHdhbnQgdG8gY29tcGxldGVseSBkZXNhdHVyYXRlIHRoZSBpbWFnZSwgdXNpbmcgdGhlIGdyZXlzY2FsZSBmaWx0ZXIgaXMgaGlnaGx5IHJlY29tbWVuZGVkIGJlY2F1c2UgaXQgd2lsbCB5aWVsZCBiZXR0ZXIgcmVzdWx0cy5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdzYXR1cmF0aW9uJywgZnVuY3Rpb24gKGFkanVzdCkge1xuICAgIGFkanVzdCAqPSAtMC4wMVxuICAgIHRoaXMucHJvY2Vzcygnc2F0dXJhdGlvbicsIChyZ2JhKSA9PiB7XG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1heChyZ2JhLnIsIHJnYmEuZywgcmdiYS5iKVxuXG4gICAgICBpZiAocmdiYS5yICE9PSBtYXgpIHtcbiAgICAgICAgcmdiYS5yICs9IChtYXggLSByZ2JhLnIpICogYWRqdXN0XG4gICAgICB9XG4gICAgICBpZiAocmdiYS5nICE9PSBtYXgpIHtcbiAgICAgICAgcmdiYS5nICs9IChtYXggLSByZ2JhLmcpICogYWRqdXN0XG4gICAgICB9XG4gICAgICBpZiAocmdiYS5iICE9PSBtYXgpIHtcbiAgICAgICAgcmdiYS5iICs9IChtYXggLSByZ2JhLmIpICogYWRqdXN0XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIFZpYnJhbmNlXG4gICogU2ltaWxhciB0byBzYXR1cmF0aW9uLCBidXQgYWRqdXN0cyB0aGUgc2F0dXJhdGlvbiBsZXZlbHMgaW4gYSBzbGlnaHRseSBzbWFydGVyLCBtb3JlIHN1YnRsZSB3YXkuXG4gICogVmlicmFuY2Ugd2lsbCBhdHRlbXB0IHRvIGJvb3N0IGNvbG9ycyB0aGF0IGFyZSBsZXNzIHNhdHVyYXRlZCBtb3JlIGFuZCBib29zdCBhbHJlYWR5IHNhdHVyYXRlZCBjb2xvcnMgbGVzcywgd2hpbGUgc2F0dXJhdGlvbiBib29zdHMgYWxsIGNvbG9ycyBieSB0aGUgc2FtZSBsZXZlbC5cbiAgKiBBcmd1bWVudHM6IFJhbmdlIGlzIC0xMDAgdG8gMTAwLiBWYWx1ZXMgPCAwIHdpbGwgZGVzYXR1cmF0ZSB0aGUgaW1hZ2Ugd2hpbGUgdmFsdWVzID4gMCB3aWxsIHNhdHVyYXRlIGl0LlxuICAqIElmIHlvdSB3YW50IHRvIGNvbXBsZXRlbHkgZGVzYXR1cmF0ZSB0aGUgaW1hZ2UsIHVzaW5nIHRoZSBncmV5c2NhbGUgZmlsdGVyIGlzIGhpZ2hseSByZWNvbW1lbmRlZCBiZWNhdXNlIGl0IHdpbGwgeWllbGQgYmV0dGVyIHJlc3VsdHMuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcigndmlicmFuY2UnLCBmdW5jdGlvbiAoYWRqdXN0KSB7XG4gICAgYWRqdXN0ICo9IC0xXG4gICAgdGhpcy5wcm9jZXNzKCd2aWJyYW5jZScsIChyZ2JhKSA9PiB7XG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1heChyZ2JhLnIsIHJnYmEuZywgcmdiYS5iKVxuICAgICAgY29uc3QgYXZnID0gKHJnYmEuciArIHJnYmEuZyArIHJnYmEuYikgLyAzXG4gICAgICBjb25zdCBhbXQgPSAoKE1hdGguYWJzKG1heCAtIGF2ZykgKiAyIC8gMjU1KSAqIGFkanVzdCkgLyAxMDBcblxuICAgICAgaWYgKHJnYmEuciAhPT0gbWF4KSB7XG4gICAgICAgIHJnYmEuciArPSAobWF4IC0gcmdiYS5yKSAqIGFtdFxuICAgICAgfVxuICAgICAgaWYgKHJnYmEuZyAhPT0gbWF4KSB7XG4gICAgICAgIHJnYmEuZyArPSAobWF4IC0gcmdiYS5nKSAqIGFtdFxuICAgICAgfVxuICAgICAgaWYgKHJnYmEuYiAhPT0gbWF4KSB7XG4gICAgICAgIHJnYmEuYiArPSAobWF4IC0gcmdiYS5iKSAqIGFtdFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBHcmV5c2NhbGVcbiAgKiBBbiBpbXByb3ZlZCBncmV5c2NhbGUgZnVuY3Rpb24gdGhhdCBzaG91bGQgbWFrZSBwcmV0dGllciByZXN1bHRzIHRoYW4gc2ltcGx5IHVzaW5nIHRoZSBzYXR1cmF0aW9uIGZpbHRlciB0byByZW1vdmUgY29sb3IuIEl0IGRvZXMgc28gYnkgdXNpbmcgZmFjdG9ycyB0aGF0IGRpcmVjdGx5IHJlbGF0ZSB0byBob3cgdGhlIGh1bWFuIGV5ZSBwZXJjZXZlcyBjb2xvciBhbmQgdmFsdWVzLiBUaGVyZSBhcmUgbm8gYXJndW1lbnRzLCBpdCBzaW1wbHkgbWFrZXMgdGhlIGltYWdlIGdyZXlzY2FsZSB3aXRoIG5vIGluLWJldHdlZW4uXG4gICogQWxnb3JpdGhtIGFkb3B0ZWQgZnJvbSBodHRwOi8vd3d3LnBocGllZC5jb20vaW1hZ2UtZnVuL1xuICAqL1xuICBGaWx0ZXIucmVnaXN0ZXIoJ2dyZXlzY2FsZScsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnByb2Nlc3MoJ2dyZXlzY2FsZScsIChyZ2JhKSA9PiB7XG4gICAgICBjb25zdCBhdmcgPSBDYWxjdWxhdGUubHVtaW5hbmNlKHJnYmEpXG4gICAgICByZ2JhLnIgPSBhdmdcbiAgICAgIHJnYmEuZyA9IGF2Z1xuICAgICAgcmdiYS5iID0gYXZnXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBDb250cmFzdFxuICAqIEluY3JlYXNlcyBvciBkZWNyZWFzZXMgdGhlIGNvbG9yIGNvbnRyYXN0IG9mIHRoZSBpbWFnZS5cbiAgKiBBcmd1bWVudHM6IFJhbmdlIGlzIC0xMDAgdG8gMTAwLiBWYWx1ZXMgPCAwIHdpbGwgZGVjcmVhc2UgY29udHJhc3Qgd2hpbGUgdmFsdWVzID4gMCB3aWxsIGluY3JlYXNlIGNvbnRyYXN0LlxuICAqIFRoZSBjb250cmFzdCBhZGp1c3RtZW50IHZhbHVlcyBhcmUgYSBiaXQgc2Vuc2l0aXZlLiBXaGlsZSB1bnJlc3RyaWN0ZWQsIHNhbmUgYWRqdXN0bWVudCB2YWx1ZXMgYXJlIHVzdWFsbHkgYXJvdW5kIDUtMTAuXG4gICovXG4gIEZpbHRlci5yZWdpc3RlcignY29udHJhc3QnLCBmdW5jdGlvbihhZGp1c3QpIHtcbiAgICBhZGp1c3QgPSBNYXRoLnBvdygoYWRqdXN0ICsgMTAwKSAvIDEwMCwgMilcbiAgICB0aGlzLnByb2Nlc3MoJ2NvbnRyYXN0JywgKHJnYmEpID0+IHtcbiAgICAgIC8vIFJlZCBjaGFubmVsXG4gICAgICByZ2JhLnIgLz0gMjU1XG4gICAgICByZ2JhLnIgLT0gMC41XG4gICAgICByZ2JhLnIgKj0gYWRqdXN0XG4gICAgICByZ2JhLnIgKz0gMC41XG4gICAgICByZ2JhLnIgKj0gMjU1XG5cbiAgICAgIC8vIEdyZWVuIGNoYW5uZWxcbiAgICAgIHJnYmEuZyAvPSAyNTVcbiAgICAgIHJnYmEuZyAtPSAwLjVcbiAgICAgIHJnYmEuZyAqPSBhZGp1c3RcbiAgICAgIHJnYmEuZyArPSAwLjVcbiAgICAgIHJnYmEuZyAqPSAyNTVcblxuICAgICAgLy8gQmx1ZSBjaGFubmVsXG4gICAgICByZ2JhLmIgLz0gMjU1XG4gICAgICByZ2JhLmIgLT0gMC41XG4gICAgICByZ2JhLmIgKj0gYWRqdXN0XG4gICAgICByZ2JhLmIgKz0gMC41XG4gICAgICByZ2JhLmIgKj0gMjU1XG5cbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIEh1ZVxuICAqIEFkanVzdHMgdGhlIGh1ZSBvZiB0aGUgaW1hZ2UuIEl0IGNhbiBiZSB1c2VkIHRvIHNoaWZ0IHRoZSBjb2xvcnMgaW4gYW4gaW1hZ2UgaW4gYSB1bmlmb3JtIGZhc2hpb24uIElmIHlvdSBhcmUgdW5mYW1pbGlhciB3aXRoIEh1ZSwgSSByZWNvbW1lbmQgcmVhZGluZyB0aGlzIFtXaWtpcGVkaWEgYXJ0aWNsZV0oaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9IdWUpLlxuICAqIEFyZ3VtZW50czogUmFuZ2UgaXMgMCB0byAxMDBcbiAgKiBTb21ldGltZXMsIEh1ZSBpcyBleHByZXNzZWQgaW4gdGhlIHJhbmdlIG9mIDAgdG8gMzYwLiBJZiB0aGF0J3MgdGhlIHRlcm1pbm9sb2d5IHlvdSdyZSB1c2VkIHRvLCB0aGluayBvZiAwIHRvIDEwMCByZXByZXNlbnRpbmcgdGhlIHBlcmNlbnRhZ2Ugb2YgSHVlIHNoaWZ0IGluIHRoZSAwIHRvIDM2MCByYW5nZS5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdodWUnLCBmdW5jdGlvbiAoYWRqdXN0KSB7XG4gICAgdGhpcy5wcm9jZXNzKCdodWUnLCAocmdiYSkgPT4ge1xuICAgICAgY29uc3QgaHN2ID0gQ29udmVydC5yZ2JUb0hTVihyZ2JhLnIsIHJnYmEuZywgcmdiYS5iKVxuXG4gICAgICBsZXQgaCA9IGhzdi5oICogMTAwXG4gICAgICBoICs9IE1hdGguYWJzKGFkanVzdClcbiAgICAgIGggPSBoICUgMTAwXG4gICAgICBoIC89IDEwMFxuICAgICAgaHN2LmggPSBoXG5cbiAgICAgIGNvbnN0IHtyLCBnLCBifSA9IENvbnZlcnQuaHN2VG9SR0IoaHN2LmgsIGhzdi5zLCBoc3YudilcbiAgICAgIHJnYmEuciA9IHJcbiAgICAgIHJnYmEuZyA9IGdcbiAgICAgIHJnYmEuYiA9IGJcblxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogQ29sb3JpemVcbiAgKiBVbmlmb3JtbHkgc2hpZnRzIHRoZSBjb2xvcnMgaW4gYW4gaW1hZ2UgdG93YXJkcyB0aGUgZ2l2ZW4gY29sb3IuIFRoZSBhZGp1c3RtZW50IHJhbmdlIGlzIGZyb20gMCB0byAxMDAuIFRoZSBoaWdoZXIgdGhlIHZhbHVlLCB0aGUgY2xvc2VyIHRoZSBjb2xvcnMgaW4gdGhlIGltYWdlIHNoaWZ0IHRvd2FyZHMgdGhlIGdpdmVuIGFkanVzdG1lbnQgY29sb3IuXG4gICogQXJndW1lbnRzOiBUaGlzIGZpbHRlciBpcyBwb2x5bW9ycGhpYyBhbmQgY2FuIHRha2UgdHdvIGRpZmZlcmVudCBzZXRzIG9mIGFyZ3VtZW50cy4gRWl0aGVyIGEgaGV4IGNvbG9yIHN0cmluZyBhbmQgYW4gYWRqdXN0bWVudCB2YWx1ZSwgb3IgUkdCIGNvbG9ycyBhbmQgYW4gYWRqdXN0bWVudCB2YWx1ZS5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdjb2xvcml6ZScsIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgbGV0IHJnYiwgbGV2ZWxcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHJnYiA9IENvbnZlcnQuaGV4VG9SR0IoYXJnc1swXSlcbiAgICAgIGxldmVsID0gYXJnc1sxXVxuICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT09IDQpIHtcbiAgICAgIHJnYiA9IHtcbiAgICAgICAgcjogYXJnc1swXSxcbiAgICAgICAgZzogYXJnc1sxXSxcbiAgICAgICAgYjogYXJnc1syXVxuICAgICAgfVxuICAgICAgbGV2ZWwgPSBhcmdzWzNdXG4gICAgfVxuXG4gICAgdGhpcy5wcm9jZXNzKCdjb2xvcml6ZScsIChyZ2JhKSA9PiB7XG4gICAgICByZ2JhLnIgLT0gKHJnYmEuciAtIHJnYi5yKSAqIChsZXZlbCAvIDEwMClcbiAgICAgIHJnYmEuZyAtPSAocmdiYS5nIC0gcmdiLmcpICogKGxldmVsIC8gMTAwKVxuICAgICAgcmdiYS5iIC09IChyZ2JhLmIgLSByZ2IuYikgKiAobGV2ZWwgLyAxMDApXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBJbnZlcnRcbiAgKiBJbnZlcnRzIGFsbCBjb2xvcnMgaW4gdGhlIGltYWdlIGJ5IHN1YnRyYWN0aW5nIGVhY2ggY29sb3IgY2hhbm5lbCB2YWx1ZSBmcm9tIDI1NS4gTm8gYXJndW1lbnRzLlxuICAqL1xuICBGaWx0ZXIucmVnaXN0ZXIoJ2ludmVydCcsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnByb2Nlc3MoJ2ludmVydCcsIChyZ2JhKSA9PiB7XG4gICAgICByZ2JhLnIgPSAyNTUgLSByZ2JhLnJcbiAgICAgIHJnYmEuZyA9IDI1NSAtIHJnYmEuZ1xuICAgICAgcmdiYS5iID0gMjU1IC0gcmdiYS5iXG4gICAgICByZXR1cm4gcmdiYVxuICAgIH0pXG4gIH0pXG5cbiAgLypcbiAgKiBTZXBpYVxuICAqIEFwcGxpZXMgYW4gYWRqdXN0YWJsZSBzZXBpYSBmaWx0ZXIgdG8gdGhlIGltYWdlLlxuICAqIEFyZ3VtZW50czogQXNzdW1lcyBhZGp1c3RtZW50IGlzIGJldHdlZW4gMCBhbmQgMTAwLCB3aGljaCByZXByZXNlbnRzIGhvdyBtdWNoIHRoZSBzZXBpYSBmaWx0ZXIgaXMgYXBwbGllZC5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdzZXBpYScsIGZ1bmN0aW9uIChhZGp1c3QgPSAxMDApIHtcbiAgICBhZGp1c3QgLz0gMTAwXG4gICAgdGhpcy5wcm9jZXNzKCdzZXBpYScsIChyZ2JhKSA9PiB7XG4gICAgICAvLyBBbGwgdGhyZWUgY29sb3IgY2hhbm5lbHMgaGF2ZSBzcGVjaWFsIGNvbnZlcnNpb24gZmFjdG9ycyB0aGF0XG4gICAgICAvLyBkZWZpbmUgd2hhdCBzZXBpYSBpcy4gSGVyZSB3ZSBhZGp1c3QgZWFjaCBjaGFubmVsIGluZGl2aWR1YWxseSxcbiAgICAgIC8vIHdpdGggdGhlIHR3aXN0IHRoYXQgeW91IGNhbiBwYXJ0aWFsbHkgYXBwbHkgdGhlIHNlcGlhIGZpbHRlci5cbiAgICAgIHJnYmEuciA9IE1hdGgubWluKDI1NSwgKHJnYmEuciAqICgxIC0gKDAuNjA3ICogYWRqdXN0KSkpICsgKHJnYmEuZyAqICgwLjc2OSAqIGFkanVzdCkpICsgKHJnYmEuYiAqICgwLjE4OSAqIGFkanVzdCkpKVxuICAgICAgcmdiYS5nID0gTWF0aC5taW4oMjU1LCAocmdiYS5yICogKDAuMzQ5ICogYWRqdXN0KSkgKyAocmdiYS5nICogKDEgLSAoMC4zMTQgKiBhZGp1c3QpKSkgKyAocmdiYS5iICogKDAuMTY4ICogYWRqdXN0KSkpXG4gICAgICByZ2JhLmIgPSBNYXRoLm1pbigyNTUsIChyZ2JhLnIgKiAoMC4yNzIgKiBhZGp1c3QpKSArIChyZ2JhLmcgKiAoMC41MzQgKiBhZGp1c3QpKSArIChyZ2JhLmIgKiAoMSAtICgwLjg2OSAqIGFkanVzdCkpKSlcbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIEdhbW1hXG4gICogQWRqdXN0cyB0aGUgZ2FtbWEgb2YgdGhlIGltYWdlLlxuICAqIEFyZ3VtZW50czogUmFuZ2UgaXMgZnJvbSAwIHRvIGluZmluaXR5LCBhbHRob3VnaCBzYW5lIHZhbHVlcyBhcmUgZnJvbSAwIHRvIDQgb3IgNS5cbiAgKiBWYWx1ZXMgYmV0d2VlbiAwIGFuZCAxIHdpbGwgbGVzc2VuIHRoZSBjb250cmFzdCB3aGlsZSB2YWx1ZXMgZ3JlYXRlciB0aGFuIDEgd2lsbCBpbmNyZWFzZSBpdC5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdnYW1tYScsIGZ1bmN0aW9uIChhZGp1c3QpIHtcbiAgICB0aGlzLnByb2Nlc3MoJ2dhbW1hJywgKHJnYmEpID0+IHtcbiAgICAgIHJnYmEuciA9IE1hdGgucG93KHJnYmEuciAvIDI1NSwgYWRqdXN0KSAqIDI1NVxuICAgICAgcmdiYS5nID0gTWF0aC5wb3cocmdiYS5nIC8gMjU1LCBhZGp1c3QpICogMjU1XG4gICAgICByZ2JhLmIgPSBNYXRoLnBvdyhyZ2JhLmIgLyAyNTUsIGFkanVzdCkgKiAyNTVcbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIE5vaXNlXG4gICogQWRkcyBub2lzZSB0byB0aGUgaW1hZ2Ugb24gYSBzY2FsZSBmcm9tIDEgLSAxMDAuIEhvd2V2ZXIsIHRoZSBzY2FsZSBpc24ndCBjb25zdHJhaW5lZCwgc28geW91IGNhbiBzcGVjaWZ5IGEgdmFsdWUgPiAxMDAgaWYgeW91IHdhbnQgYSBMT1Qgb2Ygbm9pc2UuXG4gICovXG4gIEZpbHRlci5yZWdpc3Rlcignbm9pc2UnLCBmdW5jdGlvbiAoYWRqdXN0KSB7XG4gICAgYWRqdXN0ID0gTWF0aC5hYnMoYWRqdXN0KSAqIDIuNTVcblxuICAgIHRoaXMucHJvY2Vzcygnbm9pc2UnLCAocmdiYSkgPT4ge1xuICAgICAgY29uc3QgcmFuZCA9IENhbGN1bGF0ZS5yYW5kb21SYW5nZShhZGp1c3QgKiAtMSwgYWRqdXN0KVxuICAgICAgcmdiYS5yICs9IHJhbmRcbiAgICAgIHJnYmEuZyArPSByYW5kXG4gICAgICByZ2JhLmIgKz0gcmFuZFxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogQ2xpcFxuICAqIENsaXBzIGEgY29sb3IgdG8gbWF4IHZhbHVlcyB3aGVuIGl0IGZhbGxzIG91dHNpZGUgb2YgdGhlIHNwZWNpZmllZCByYW5nZS5cbiAgKiBBcmd1bWVudHM6IHN1cHBsaWVkIHZhbHVlIHNob3VsZCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdjbGlwJywgZnVuY3Rpb24gKGFkanVzdCkge1xuICAgIGFkanVzdCA9IE1hdGguYWJzKGFkanVzdCkgKiAyLjU1XG5cbiAgICB0aGlzLnByb2Nlc3MoJ2NsaXAnLCAocmdiYSkgPT4ge1xuICAgICAgaWYgKHJnYmEuciA+IDI1NSAtIGFkanVzdCkge1xuICAgICAgICByZ2JhLnIgPSAyNTVcbiAgICAgIH0gZWxzZSBpZiAocmdiYS5yIDwgYWRqdXN0KSB7XG4gICAgICAgIHJnYmEuciA9IDBcbiAgICAgIH1cblxuICAgICAgaWYgKHJnYmEuZyA+IDI1NSAtIGFkanVzdCkge1xuICAgICAgICByZ2JhLmcgPSAyNTVcbiAgICAgIH0gZWxzZSBpZiAocmdiYS5nIDwgYWRqdXN0KSB7XG4gICAgICAgIHJnYmEuZyA9IDBcbiAgICAgIH1cblxuICAgICAgaWYgKHJnYmEuYiA+IDI1NSAtIGFkanVzdCkge1xuICAgICAgICByZ2JhLmIgPSAyNTVcbiAgICAgIH0gZWxzZSBpZiAocmdiYS5iIDwgYWRqdXN0KSB7XG4gICAgICAgIHJnYmEuYiA9IDBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogQ2hhbm5lbHNcbiAgKiBMZXRzIHlvdSBtb2RpZnkgdGhlIGludGVuc2l0eSBvZiBhbnkgY29tYmluYXRpb24gb2YgcmVkLCBncmVlbiwgb3IgYmx1ZSBjaGFubmVscyBpbmRpdmlkdWFsbHkuXG4gICogQXJndW1lbnRzOiBNdXN0IGJlIGdpdmVuIGF0IGxlYXN0IG9uZSBjb2xvciBjaGFubmVsIHRvIGFkanVzdCBpbiBvcmRlciB0byB3b3JrLlxuICAqIE9wdGlvbnMgZm9ybWF0IChtdXN0IHNwZWNpZnkgMSAtIDMgY29sb3JzKTpcbiAgKiB7XG4gICogICByZWQ6IDIwLFxuICAqICAgZ3JlZW46IC01LFxuICAqICAgYmx1ZTogLTQwXG4gICogfVxuICAqL1xuICBGaWx0ZXIucmVnaXN0ZXIoJ2NoYW5uZWxzJywgZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBmb3IgKGxldCBjaGFuIGluIG9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KGNoYW4pKSB7XG4gICAgICAgIGlmIChvcHRpb25zW2NoYW5dID09PSAwKSB7XG4gICAgICAgICAgZGVsZXRlIG9wdGlvbnNbY2hhbl1cbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnNbY2hhbl0gLz0gMTAwXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICB0aGlzLnByb2Nlc3MoJ2NoYW5uZWxzJywgKHJnYmEpID0+IHtcbiAgICAgIGlmIChvcHRpb25zLnJlZCkge1xuICAgICAgICBpZiAob3B0aW9ucy5yZWQgPiAwKSB7XG4gICAgICAgICAgcmdiYS5yICs9ICgyNTUgLSByZ2JhLnIpICogb3B0aW9ucy5yZWRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZ2JhLnIgLT0gcmdiYS5yICogTWF0aC5hYnMob3B0aW9ucy5yZWQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLmdyZWVuKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmdyZWVuID4gMCkge1xuICAgICAgICAgIHJnYmEuZyArPSAoMjU1IC0gcmdiYS5nKSAqIG9wdGlvbnMuZ3JlZW5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZ2JhLmcgLT0gcmdiYS5nICogTWF0aC5hYnMob3B0aW9ucy5ncmVlbilcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMuYmx1ZSkge1xuICAgICAgICBpZiAob3B0aW9ucy5ibHVlID4gMCkge1xuICAgICAgICAgIHJnYmEuYiArPSAoMjU1IC0gcmdiYS5iKSAqIG9wdGlvbnMuYmx1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJnYmEuYiAtPSByZ2JhLmIgKiBNYXRoLmFicyhvcHRpb25zLmJsdWUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIC8qXG4gICogQ3VydmVzXG4gICogQ3VydmVzIGltcGxlbWVudGF0aW9uIHVzaW5nIEJlemllciBjdXJ2ZSBlcXVhdGlvbi4gSWYgeW91J3JlIGZhbWlsaWFyIHdpdGggdGhlIEN1cnZlcyBmdW5jdGlvbmFsaXR5IGluIFBob3Rvc2hvcCwgdGhpcyB3b3JrcyBpbiBhIHZlcnkgc2ltaWxhciBmYXNoaW9uLlxuICAqIEFyZ3VtZW50czpcbiAgKiBjaGFuIC0gW3IsIGcsIGIsIHJnYl1cbiAgKiBjcHMgLSBbeCwgeV0qIChjdXJ2ZSBjb250cm9sIHBvaW50cywgbWluLiAyOyAwIC0gMjU1KVxuICAqIGFsZ28gLSBmdW5jdGlvbiAob3B0aW9uYWwpXG4gICpcbiAgKiBUaGUgZmlyc3QgYXJndW1lbnQgcmVwcmVzZW50cyB0aGUgY2hhbm5lbHMgeW91IHdpc2ggdG8gbW9kaWZ5IHdpdGggdGhlIGZpbHRlci4gSXQgY2FuIGJlIGFuIGFycmF5IG9mIGNoYW5uZWxzIG9yIGEgc3RyaW5nIChmb3IgYSBzaW5nbGUgY2hhbm5lbCkuIFRoZSByZXN0IG9mIHRoZSBhcmd1bWVudHMgYXJlIDItZWxlbWVudCBhcnJheXMgdGhhdCByZXByZXNlbnQgcG9pbnQgY29vcmRpbmF0ZXMuIFRoZXkgYXJlIHNwZWNpZmllZCBpbiB0aGUgc2FtZSBvcmRlciBhcyBzaG93biBpbiB0aGlzIGltYWdlIHRvIHRoZSByaWdodC4gVGhlIGNvb3JkaW5hdGVzIGFyZSBpbiB0aGUgcmFuZ2Ugb2YgMCB0byAyNTUgZm9yIGJvdGggWCBhbmQgWSB2YWx1ZXMuXG4gICogSXQgaXMgcG9zc2libGUgdG8gcGFzcyB0aGUgZnVuY3Rpb24gYW4gb3B0aW9uYWwgZnVuY3Rpb24gZGVzY3JpYmluZyB3aGljaCBjdXJ2ZSBhbGdvcml0aG0gdG8gdXNlLlxuICAqIEl0IGRlZmF1bHRzIHRvIGJlemllci5cbiAgKiBUaGUgeC1heGlzIHJlcHJlc2VudHMgdGhlIGlucHV0IHZhbHVlIGZvciBhIHNpbmdsZSBjaGFubmVsLCB3aGlsZSB0aGUgeS1heGlzIHJlcHJlc2VudHMgdGhlIG91dHB1dCB2YWx1ZS5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdjdXJ2ZXMnLCBmdW5jdGlvbiAoY2hhbnMsIC4uLmNwcykge1xuICAgIGNvbnN0IGxhc3QgPSBjcHNbY3BzLmxlbmd0aCAtIDFdXG4gICAgbGV0IGFsZ29cbiAgICBpZiAodHlwZW9mIGxhc3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFsZ28gPSBsYXN0XG4gICAgICBjcHMucG9wKClcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBsYXN0ID09PSAnc3RyaW5nJykge1xuICAgICAgYWxnbyA9IENhbGN1bGF0ZVtsYXN0XVxuICAgICAgY3BzLnBvcCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZ28gPSBDYWxjdWxhdGUuYmV6aWVyXG4gICAgfVxuXG4gICAgLy8gSWYgY2hhbm5lbHMgYXJlIGluIGEgc3RyaW5nLCBzcGxpdCB0byBhbiBhcnJheVxuICAgIGlmICh0eXBlb2YgY2hhbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjaGFucyA9IGNoYW5zLnNwbGl0KCcnKVxuICAgIH1cbiAgICBpZiAoY2hhbnNbMF0gPT09ICd2Jykge1xuICAgICAgY2hhbnMgPSBbJ3InLCAnZycsICdiJ11cbiAgICB9XG5cbiAgICBpZiAoY3BzLmxlbmd0aCA8IDIpIHtcbiAgICAgIC8vIG1pZ2h0IHdhbnQgdG8gZ2l2ZSBhIHdhcm5pbmcgbm93XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBjdXJ2ZXMgZmlsdGVyJylcbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZSBhIGN1cnZlXG4gICAgY29uc3QgYmV6aWVyID0gYWxnbyhjcHMsIDAsIDI1NSlcblxuICAgIC8vIElmIHRoZSBjdXJ2ZSBzdGFydHMgYWZ0ZXIgeCA9IDAsIGluaXRpYWxpemUgaXQgd2l0aCBhIGZsYXQgbGluZVxuICAgIC8vIHVudGlsIHRoZSBjdXJ2ZSBiZWdpbnMuXG4gICAgY29uc3Qgc3RhcnQgPSBjcHNbMF1cbiAgICBpZiAoc3RhcnRbMF0gPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJ0WzBdOyBpKyspIHtcbiAgICAgICAgYmV6aWVyW2ldID0gc3RhcnRbMV1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBlbmQgPSBjcHNbY3BzLmxlbmd0aCAtIDFdXG4gICAgaWYgKGVuZFswXSA8IDI1NSkge1xuICAgICAgZm9yIChsZXQgaSA9IGVuZFswXTsgaSA8PSAyNTU7IGkrKykge1xuICAgICAgICBiZXppZXJbaV0gPSBlbmRbMV1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnByb2Nlc3MoJ2N1cnZlcycsIChyZ2JhKSA9PiB7XG4gICAgICAvLyBOb3cgdGhhdCB3ZSBoYXZlIHRoZSBiZXppZXIgY3VydmUsIHdlIGRvIGEgYmFzaWMgaGFzaG1hcCBsb29rdXBcbiAgICAgIC8vIHRvIGZpbmQgYW5kIHJlcGxhY2UgY29sb3IgdmFsdWVzLlxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFucy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZ2JhW2NoYW5zW2ldXSA9IGJlemllcltyZ2JhW2NoYW5zW2ldXV1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcbiAgfSlcblxuICAvKlxuICAqIEV4cG9zdXJlXG4gICogQWRqdXN0cyB0aGUgZXhwb3N1cmUgb2YgdGhlIGltYWdlIGJ5IHVzaW5nIHRoZSBjdXJ2ZXMgZnVuY3Rpb24uXG4gICogQXJndW1lbnRzOiBSYW5nZSBpcyAtMTAwIHRvIDEwMC4gVmFsdWVzIDwgMCB3aWxsIGRlY3JlYXNlIGV4cG9zdXJlIHdoaWxlIHZhbHVlcyA+IDAgd2lsbCBpbmNyZWFzZSBleHBvc3VyZS5cbiAgKi9cbiAgRmlsdGVyLnJlZ2lzdGVyKCdleHBvc3VyZScsIGZ1bmN0aW9uIChhZGp1c3QpIHtcbiAgICBjb25zdCBwID0gTWF0aC5hYnMoYWRqdXN0KSAvIDEwMFxuXG4gICAgbGV0IGN0cmwxID0gWzAsIDI1NSAqIHBdXG4gICAgbGV0IGN0cmwyID0gWzI1NSAtICgyNTUgKiBwKSwgMjU1XVxuXG4gICAgaWYgKGFkanVzdCA8IDApIHtcbiAgICAgIGN0cmwxID0gY3RybDEucmV2ZXJzZSgpXG4gICAgICBjdHJsMiA9IGN0cmwyLnJldmVyc2UoKVxuICAgIH1cbiAgICB0aGlzLmN1cnZlcygncmdiJywgWzAsIDBdLCBjdHJsMSwgY3RybDIsIFsyNTUsIDI1NV0pXG4gIH0pXG59XG4iLCJpbXBvcnQgQ2FsY3VsYXRlIGZyb20gJy4uL2NvcmUvY2FsY3VsYXRlJ1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4uL2NvcmUvdXRpbCdcbmltcG9ydCBDb252ZXJ0IGZyb20gJy4uL2NvcmUvY29udmVydCdcblxuY29uc3QgdmlnbmV0dGVGaWx0ZXJzID0ge1xuICBicmlnaHRuZXNzIChyZ2JhLCBhbXQsIG9wdHMpIHtcbiAgICByZ2JhLnIgPSByZ2JhLnIgLSAocmdiYS5yICogYW10ICogb3B0cy5zdHJlbmd0aClcbiAgICByZ2JhLmcgPSByZ2JhLmcgLSAocmdiYS5nICogYW10ICogb3B0cy5zdHJlbmd0aClcbiAgICByZ2JhLmIgPSByZ2JhLmIgLSAocmdiYS5iICogYW10ICogb3B0cy5zdHJlbmd0aClcbiAgICByZXR1cm4gcmdiYVxuICB9LFxuICBnYW1tYSAocmdiYSwgYW10LCBvcHRzKSB7XG4gICAgcmdiYS5yID0gTWF0aC5wb3cocmdiYS5yIC8gMjU1LCBNYXRoLm1heCgxMCAqIGFtdCAqIG9wdHMuc3RyZW5ndGgsIDEpKSAqIDI1NVxuICAgIHJnYmEuZyA9IE1hdGgucG93KHJnYmEuZyAvIDI1NSwgTWF0aC5tYXgoMTAgKiBhbXQgKiBvcHRzLnN0cmVuZ3RoLCAxKSkgKiAyNTVcbiAgICByZ2JhLmIgPSBNYXRoLnBvdyhyZ2JhLmIgLyAyNTUsIE1hdGgubWF4KDEwICogYW10ICogb3B0cy5zdHJlbmd0aCwgMSkpICogMjU1XG4gICAgcmV0dXJuIHJnYmFcbiAgfSxcbiAgY29sb3JpemUgKHJnYmEsIGFtdCwgb3B0cykge1xuICAgIHJnYmEuciAtPSAocmdiYS5yIC0gb3B0cy5jb2xvci5yKSAqIGFtdFxuICAgIHJnYmEuZyAtPSAocmdiYS5nIC0gb3B0cy5jb2xvci5nKSAqIGFtdFxuICAgIHJnYmEuYiAtPSAocmdiYS5iIC0gb3B0cy5jb2xvci5iKSAqIGFtdFxuICAgIHJldHVybiByZ2JhXG4gIH1cbn1cblxuLyoqXG4gKlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gRmlsdGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZ2lzdGVyQ2FtZXJhRmlsdGVyIChGaWx0ZXIpIHtcbiAgRmlsdGVyLnJlZ2lzdGVyKCd2aWduZXR0ZScsIGZ1bmN0aW9uIChzaXplLCBzdHJlbmd0aCA9IDYwKSB7XG4gICAgbGV0IGJlemllciwgY2VudGVyLCBlbmQsIHN0YXJ0XG5cbiAgICBpZiAodHlwZW9mIHNpemUgPT09ICdzdHJpbmcnICYmIHNpemUuc3Vic3RyKC0xKSA9PT0gJyUnKSB7XG4gICAgICBpZiAodGhpcy5kaW1lbnNpb25zLmhlaWdodCA+IHRoaXMuZGltZW5zaW9ucy53aWR0aCkge1xuICAgICAgICBzaXplID0gdGhpcy5kaW1lbnNpb25zLndpZHRoICogKHBhcnNlSW50KHNpemUuc3Vic3RyKDAsIHNpemUubGVuZ3RoIC0gMSksIDEwKSAvIDEwMClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNpemUgPSB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0ICogKHBhcnNlSW50KHNpemUuc3Vic3RyKDAsIHNpemUubGVuZ3RoIC0gMSksIDEwKSAvIDEwMClcbiAgICAgIH1cbiAgICB9XG4gICAgc3RyZW5ndGggLz0gMTAwXG4gICAgY2VudGVyID0gW3RoaXMuZGltZW5zaW9ucy53aWR0aCAvIDIsIHRoaXMuZGltZW5zaW9ucy5oZWlnaHQgLyAyXVxuICAgIHN0YXJ0ID0gTWF0aC5zcXJ0KE1hdGgucG93KGNlbnRlclswXSwgMikgKyBNYXRoLnBvdyhjZW50ZXJbMV0sIDIpKVxuICAgIGVuZCA9IHN0YXJ0IC0gc2l6ZVxuICAgIGJlemllciA9IENhbGN1bGF0ZS5iZXppZXIoWzAsIDFdLCBbMzAsIDMwXSwgWzcwLCA2MF0sIFsxMDAsIDgwXSlcbiAgICB0aGlzLnByb2Nlc3MoJ3ZpZ25ldHRlJywgZnVuY3Rpb24gKHJnYmEpIHtcbiAgICAgIHZhciBkaXN0LCBkaXYsIGxvY1xuICAgICAgbG9jID0gcmdiYS5sb2NhdGlvblhZKClcbiAgICAgIGRpc3QgPSBDYWxjdWxhdGUuZGlzdGFuY2UobG9jLngsIGxvYy55LCBjZW50ZXJbMF0sIGNlbnRlclsxXSlcbiAgICAgIGlmIChkaXN0ID4gZW5kKSB7XG4gICAgICAgIGRpdiA9IE1hdGgubWF4KDEsIChiZXppZXJbTWF0aC5yb3VuZCgoKGRpc3QgLSBlbmQpIC8gc2l6ZSkgKiAxMDApXSAvIDEwKSAqIHN0cmVuZ3RoKVxuICAgICAgICByZ2JhLnIgPSBNYXRoLnBvdyhyZ2JhLnIgLyAyNTUsIGRpdikgKiAyNTVcbiAgICAgICAgcmdiYS5nID0gTWF0aC5wb3cocmdiYS5nIC8gMjU1LCBkaXYpICogMjU1XG4gICAgICAgIHJnYmEuYiA9IE1hdGgucG93KHJnYmEuYiAvIDI1NSwgZGl2KSAqIDI1NVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3RlcigncmVjdGFuZ3VsYXJWaWduZXR0ZScsIGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgbGV0IGRlZmF1bHRzLCBkaW0sIHBlcmNlbnQsIHNpemUsIF9pLCBfbGVuLCBfcmVmXG4gICAgZGVmYXVsdHMgPSB7XG4gICAgICBzdHJlbmd0aDogNTAsXG4gICAgICBjb3JuZXJSYWRpdXM6IDAsXG4gICAgICBtZXRob2Q6ICdicmlnaHRuZXNzJyxcbiAgICAgIGNvbG9yOiB7XG4gICAgICAgIHI6IDAsXG4gICAgICAgIGc6IDAsXG4gICAgICAgIGI6IDBcbiAgICAgIH1cbiAgICB9XG4gICAgb3B0cyA9IFV0aWwuZXh0ZW5kKGRlZmF1bHRzLCBvcHRzKVxuICAgIGlmICghb3B0cy5zaXplKSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMuc2l6ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBlcmNlbnQgPSBwYXJzZUludChvcHRzLnNpemUsIDEwKSAvIDEwMFxuICAgICAgb3B0cy5zaXplID0ge1xuICAgICAgICB3aWR0aDogdGhpcy5kaW1lbnNpb25zLndpZHRoICogcGVyY2VudCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0ICogcGVyY2VudFxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMuc2l6ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIF9yZWYgPSBbJ3dpZHRoJywgJ2hlaWdodCddXG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgZGltID0gX3JlZltfaV1cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzLnNpemVbZGltXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBvcHRzLnNpemVbZGltXSA9IHRoaXMuZGltZW5zaW9uc1tkaW1dICogKHBhcnNlSW50KG9wdHMuc2l6ZVtkaW1dLCAxMCkgLyAxMDApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wdHMuc2l6ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHNpemUgPSBvcHRzLnNpemVcbiAgICAgIG9wdHMuc2l6ZSA9IHtcbiAgICAgICAgd2lkdGg6IHNpemUsXG4gICAgICAgIGhlaWdodDogc2l6ZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mIG9wdHMuY29ybmVyUmFkaXVzID09PSAnc3RyaW5nJykge1xuICAgICAgb3B0cy5jb3JuZXJSYWRpdXMgPSAob3B0cy5zaXplLndpZHRoIC8gMikgKiAocGFyc2VJbnQob3B0cy5jb3JuZXJSYWRpdXMsIDEwKSAvIDEwMClcbiAgICB9XG4gICAgb3B0cy5zdHJlbmd0aCAvPSAxMDBcbiAgICBvcHRzLnNpemUud2lkdGggPSBNYXRoLmZsb29yKG9wdHMuc2l6ZS53aWR0aClcbiAgICBvcHRzLnNpemUuaGVpZ2h0ID0gTWF0aC5mbG9vcihvcHRzLnNpemUuaGVpZ2h0KVxuICAgIG9wdHMuaW1hZ2UgPSB7XG4gICAgICB3aWR0aDogdGhpcy5kaW1lbnNpb25zLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0XG4gICAgfVxuICAgIGlmIChvcHRzLm1ldGhvZCA9PT0gJ2NvbG9yaXplJyAmJiB0eXBlb2Ygb3B0cy5jb2xvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG9wdHMuY29sb3IgPSBDb252ZXJ0LmhleFRvUkdCKG9wdHMuY29sb3IpXG4gICAgfVxuICAgIG9wdHMuY29vcmRzID0ge1xuICAgICAgbGVmdDogKHRoaXMuZGltZW5zaW9ucy53aWR0aCAtIG9wdHMuc2l6ZS53aWR0aCkgLyAyLFxuICAgICAgcmlnaHQ6IHRoaXMuZGltZW5zaW9ucy53aWR0aCAtIG9wdHMuY29vcmRzLmxlZnQsXG4gICAgICBib3R0b206ICh0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0IC0gb3B0cy5zaXplLmhlaWdodCkgLyAyLFxuICAgICAgdG9wOiB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0IC0gb3B0cy5jb29yZHMuYm90dG9tXG4gICAgfVxuICAgIG9wdHMuY29ybmVycyA9IFtcbiAgICAgIHtcbiAgICAgICAgeDogb3B0cy5jb29yZHMubGVmdCArIG9wdHMuY29ybmVyUmFkaXVzLFxuICAgICAgICB5OiBvcHRzLmNvb3Jkcy50b3AgLSBvcHRzLmNvcm5lclJhZGl1c1xuICAgICAgfSwge1xuICAgICAgICB4OiBvcHRzLmNvb3Jkcy5yaWdodCAtIG9wdHMuY29ybmVyUmFkaXVzLFxuICAgICAgICB5OiBvcHRzLmNvb3Jkcy50b3AgLSBvcHRzLmNvcm5lclJhZGl1c1xuICAgICAgfSwge1xuICAgICAgICB4OiBvcHRzLmNvb3Jkcy5yaWdodCAtIG9wdHMuY29ybmVyUmFkaXVzLFxuICAgICAgICB5OiBvcHRzLmNvb3Jkcy5ib3R0b20gKyBvcHRzLmNvcm5lclJhZGl1c1xuICAgICAgfSwge1xuICAgICAgICB4OiBvcHRzLmNvb3Jkcy5sZWZ0ICsgb3B0cy5jb3JuZXJSYWRpdXMsXG4gICAgICAgIHk6IG9wdHMuY29vcmRzLmJvdHRvbSArIG9wdHMuY29ybmVyUmFkaXVzXG4gICAgICB9XG4gICAgXVxuICAgIG9wdHMubWF4RGlzdCA9IENhbGN1bGF0ZS5kaXN0YW5jZSgwLCAwLCBvcHRzLmNvcm5lcnNbM10ueCwgb3B0cy5jb3JuZXJzWzNdLnkpIC0gb3B0cy5jb3JuZXJSYWRpdXNcbiAgICB0aGlzLnByb2Nlc3MoJ3JlY3Rhbmd1bGFyVmlnbmV0dGUnLCBmdW5jdGlvbiAocmdiYSkge1xuICAgICAgdmFyIGFtdCwgbG9jLCByYWRpYWxEaXN0XG4gICAgICBsb2MgPSByZ2JhLmxvY2F0aW9uWFkoKVxuICAgICAgaWYgKChsb2MueCA+IG9wdHMuY29ybmVyc1swXS54ICYmIGxvYy54IDwgb3B0cy5jb3JuZXJzWzFdLngpICYmIChsb2MueSA+IG9wdHMuY29vcmRzLmJvdHRvbSAmJiBsb2MueSA8IG9wdHMuY29vcmRzLnRvcCkpIHtcbiAgICAgICAgcmV0dXJuIHJnYmFcbiAgICAgIH1cbiAgICAgIGlmICgobG9jLnggPiBvcHRzLmNvb3Jkcy5sZWZ0ICYmIGxvYy54IDwgb3B0cy5jb29yZHMucmlnaHQpICYmIChsb2MueSA+IG9wdHMuY29ybmVyc1szXS55ICYmIGxvYy55IDwgb3B0cy5jb3JuZXJzWzJdLnkpKSB7XG4gICAgICAgIHJldHVybiByZ2JhXG4gICAgICB9XG4gICAgICBpZiAobG9jLnggPiBvcHRzLmNvcm5lcnNbMF0ueCAmJiBsb2MueCA8IG9wdHMuY29ybmVyc1sxXS54ICYmIGxvYy55ID4gb3B0cy5jb29yZHMudG9wKSB7XG4gICAgICAgIGFtdCA9IChsb2MueSAtIG9wdHMuY29vcmRzLnRvcCkgLyBvcHRzLm1heERpc3RcbiAgICAgIH0gZWxzZSBpZiAobG9jLnkgPiBvcHRzLmNvcm5lcnNbMl0ueSAmJiBsb2MueSA8IG9wdHMuY29ybmVyc1sxXS55ICYmIGxvYy54ID4gb3B0cy5jb29yZHMucmlnaHQpIHtcbiAgICAgICAgYW10ID0gKGxvYy54IC0gb3B0cy5jb29yZHMucmlnaHQpIC8gb3B0cy5tYXhEaXN0XG4gICAgICB9IGVsc2UgaWYgKGxvYy54ID4gb3B0cy5jb3JuZXJzWzBdLnggJiYgbG9jLnggPCBvcHRzLmNvcm5lcnNbMV0ueCAmJiBsb2MueSA8IG9wdHMuY29vcmRzLmJvdHRvbSkge1xuICAgICAgICBhbXQgPSAob3B0cy5jb29yZHMuYm90dG9tIC0gbG9jLnkpIC8gb3B0cy5tYXhEaXN0XG4gICAgICB9IGVsc2UgaWYgKGxvYy55ID4gb3B0cy5jb3JuZXJzWzJdLnkgJiYgbG9jLnkgPCBvcHRzLmNvcm5lcnNbMV0ueSAmJiBsb2MueCA8IG9wdHMuY29vcmRzLmxlZnQpIHtcbiAgICAgICAgYW10ID0gKG9wdHMuY29vcmRzLmxlZnQgLSBsb2MueCkgLyBvcHRzLm1heERpc3RcbiAgICAgIH0gZWxzZSBpZiAobG9jLnggPD0gb3B0cy5jb3JuZXJzWzBdLnggJiYgbG9jLnkgPj0gb3B0cy5jb3JuZXJzWzBdLnkpIHtcbiAgICAgICAgcmFkaWFsRGlzdCA9IENhbGN1bGF0ZS5kaXN0YW5jZShsb2MueCwgbG9jLnksIG9wdHMuY29ybmVyc1swXS54LCBvcHRzLmNvcm5lcnNbMF0ueSlcbiAgICAgICAgYW10ID0gKHJhZGlhbERpc3QgLSBvcHRzLmNvcm5lclJhZGl1cykgLyBvcHRzLm1heERpc3RcbiAgICAgIH0gZWxzZSBpZiAobG9jLnggPj0gb3B0cy5jb3JuZXJzWzFdLnggJiYgbG9jLnkgPj0gb3B0cy5jb3JuZXJzWzFdLnkpIHtcbiAgICAgICAgcmFkaWFsRGlzdCA9IENhbGN1bGF0ZS5kaXN0YW5jZShsb2MueCwgbG9jLnksIG9wdHMuY29ybmVyc1sxXS54LCBvcHRzLmNvcm5lcnNbMV0ueSlcbiAgICAgICAgYW10ID0gKHJhZGlhbERpc3QgLSBvcHRzLmNvcm5lclJhZGl1cykgLyBvcHRzLm1heERpc3RcbiAgICAgIH0gZWxzZSBpZiAobG9jLnggPj0gb3B0cy5jb3JuZXJzWzJdLnggJiYgbG9jLnkgPD0gb3B0cy5jb3JlcnNbMl0ueSkge1xuICAgICAgICByYWRpYWxEaXN0ID0gQ2FsY3VsYXRlLmRpc3RhbmNlKGxvYy54LCBsb2MueSwgb3B0cy5jb3JuZXJzWzJdLngsIG9wdHMuY29ybmVyc1syXS55KVxuICAgICAgICBhbXQgPSAocmFkaWFsRGlzdCAtIG9wdHMuY29ybmVyUmFkaXVzKSAvIG9wdHMubWF4RGlzdFxuICAgICAgfSBlbHNlIGlmIChsb2MueCA8PSBvcHRzLmNvcm5lcnNbM10ueCAmJiBsb2MueSA8PSBvcHRzLmNvcm5lcnNbM10ueSkge1xuICAgICAgICByYWRpYWxEaXN0ID0gQ2FsY3VsYXRlLmRpc3RhbmNlKGxvYy54LCBsb2MueSwgb3B0cy5jb3JuZXJzWzNdLngsIG9wdHMuY29ybmVyc1szXS55KVxuICAgICAgICBhbXQgPSAocmFkaWFsRGlzdCAtIG9wdHMuY29ybmVyUmFkaXVzKSAvIG9wdHMubWF4RGlzdFxuICAgICAgfVxuICAgICAgaWYgKGFtdCA8IDApIHtcbiAgICAgICAgcmV0dXJuIHJnYmFcbiAgICAgIH1cbiAgICAgIHJldHVybiB2aWduZXR0ZUZpbHRlcnNbb3B0cy5tZXRob2RdKHJnYmEsIGFtdCwgb3B0cylcbiAgICB9KVxuICB9KVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVnaXN0ZXJCbHVyRmlsdGVyIChGaWx0ZXIpIHtcbiAgRmlsdGVyLnJlZ2lzdGVyKCdib3hCbHVyJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucHJvY2Vzc0tlcm5lbCgnQm94IEJsdXInLCBbMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMV0pXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdoZWF2eVJhZGlhbEJsdXInLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5wcm9jZXNzS2VybmVsKCdIZWF2eSBSYWRpYWwgQmx1cicsIFswLCAwLCAxLCAwLCAwLCAwLCAxLCAxLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAxLCAxLCAwLCAwLCAwLCAxLCAwLCAwXSlcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ2dhdXNzaWFuQmx1cicsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnByb2Nlc3NLZXJuZWwoJ0dhdXNzaWFuIEJsdXInLCBbMSwgNCwgNiwgNCwgMSwgNCwgMTYsIDI0LCAxNiwgNCwgNiwgMjQsIDM2LCAyNCwgNiwgNCwgMTYsIDI0LCAxNiwgNCwgMSwgNCwgNiwgNCwgMV0pXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdtb3Rpb25CbHVyJywgZnVuY3Rpb24gKGRlZ3JlZXMpIHtcbiAgICBsZXQga2VybmVsXG4gICAgaWYgKGRlZ3JlZXMgPT09IDAgfHwgZGVncmVlcyA9PT0gMTgwKSB7XG4gICAgICBrZXJuZWwgPSBbMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgMF1cbiAgICB9IGVsc2UgaWYgKChkZWdyZWVzID4gMCAmJiBkZWdyZWVzIDwgOTApIHx8IChkZWdyZWVzID4gMTgwICYmIGRlZ3JlZXMgPCAyNzApKSB7XG4gICAgICBrZXJuZWwgPSBbMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMF1cbiAgICB9IGVsc2UgaWYgKGRlZ3JlZXMgPT09IDkwIHx8IGRlZ3JlZXMgPT09IDI3MCkge1xuICAgICAga2VybmVsID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdXG4gICAgfSBlbHNlIHtcbiAgICAgIGtlcm5lbCA9IFsxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxXVxuICAgIH1cbiAgICB0aGlzLnByb2Nlc3NLZXJuZWwoJ01vdGlvbiBCbHVyJywga2VybmVsKVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3Rlcignc2hhcnBlbicsIGZ1bmN0aW9uIChhbXQgPSAxMDApIHtcbiAgICBhbXQgLz0gMTAwXG4gICAgdGhpcy5wcm9jZXNzS2VybmVsKCdTaGFycGVuJywgWzAsIC1hbXQsIDAsIC1hbXQsIDQgKiBhbXQgKyAxLCAtYW10LCAwLCAtYW10LCAwXSlcbiAgfSlcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZ2lzdGVyUG9zdGVyaXplRmlsdGVyIChGaWx0ZXIpIHtcbiAgRmlsdGVyLnJlZ2lzdGVyKCdwb3N0ZXJpemUnLCBmdW5jdGlvbiAoYWRqdXN0KSB7XG4gICAgdmFyIG51bU9mQXJlYXMsIG51bU9mVmFsdWVzXG4gICAgbnVtT2ZBcmVhcyA9IDI1NiAvIGFkanVzdFxuICAgIG51bU9mVmFsdWVzID0gMjU1IC8gKGFkanVzdCAtIDEpXG4gICAgdGhpcy5wcm9jZXNzKCdwb3N0ZXJpemUnLCBmdW5jdGlvbiAocmdiYSkge1xuICAgICAgcmdiYS5yID0gTWF0aC5mbG9vcihNYXRoLmZsb29yKHJnYmEuciAvIG51bU9mQXJlYXMpICogbnVtT2ZWYWx1ZXMpXG4gICAgICByZ2JhLmcgPSBNYXRoLmZsb29yKE1hdGguZmxvb3IocmdiYS5nIC8gbnVtT2ZBcmVhcykgKiBudW1PZlZhbHVlcylcbiAgICAgIHJnYmEuYiA9IE1hdGguZmxvb3IoTWF0aC5mbG9vcihyZ2JhLmIgLyBudW1PZkFyZWFzKSAqIG51bU9mVmFsdWVzKVxuICAgICAgcmV0dXJuIHJnYmFcbiAgICB9KVxuICB9KVxufVxuIiwiLyoqXG4gKiBzb21lIHByZXNldCBmaWx0ZXJzXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsqfSBGaWx0ZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVnaXN0ZXJQcmVzZXRGaWx0ZXIgKEZpbHRlcikge1xuICBGaWx0ZXIucmVnaXN0ZXIoJ3ZpbnRhZ2UnLCBmdW5jdGlvbiAodmlnbmV0dGUgPSB0cnVlKSB7XG4gICAgdGhpcy5ncmV5c2NhbGUoKVxuICAgIHRoaXMuY29udHJhc3QoNSlcbiAgICB0aGlzLm5vaXNlKDMpXG4gICAgdGhpcy5zZXBpYSgxMDApXG4gICAgdGhpcy5jaGFubmVscyh7cmVkOiA4LCBibHVlOiAyLCBncmVlbjogNH0pXG4gICAgdGhpcy5nYW1tYSgwLjg3KVxuXG4gICAgaWYgKHZpZ25ldHRlKSB7XG4gICAgICB0aGlzLnZpZ25ldHRlKCc0MCUnLCAzMClcbiAgICB9XG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdsb21vJywgZnVuY3Rpb24gKHZpZ25ldHRlID0gdHJ1ZSkge1xuICAgIHRoaXMuYnJpZ2h0bmVzcygxNSlcbiAgICB0aGlzLmV4cG9zdXJlKDE1KVxuICAgIHRoaXMuY3VydmVzKCdyZ2InLCBbMCwgMF0sIFsyMDAsIDBdLCBbMTU1LCAyNTVdLCBbMjU1LCAyNTVdKVxuICAgIHRoaXMuc2F0dXJhdGlvbigtMjApXG4gICAgdGhpcy5nYW1tYSgxLjgpXG4gICAgaWYgKHZpZ25ldHRlKSB7XG4gICAgICB0aGlzLnZpZ25ldHRlKCc1MCUnLCA2MClcbiAgICB9XG4gICAgdGhpcy5icmlnaHRuZXNzKDUpXG4gIH0pXG5cbiAgLy8gRklYTUU6c2hhcnBlblxuICBGaWx0ZXIucmVnaXN0ZXIoJ2NsYXJpdHknLCBmdW5jdGlvbiAoZ3JleSA9IGZhbHNlKSB7XG4gICAgdGhpcy52aWJyYW5jZSgyMClcbiAgICB0aGlzLmN1cnZlcygncmdiJywgWzUsIDBdLCBbMTMwLCAxNTBdLCBbMTkwLCAyMjBdLCBbMjUwLCAyNTVdKVxuICAgIHRoaXMuc2hhcnBlbigxNSlcbiAgICB0aGlzLnZpZ25ldHRlKCc0NSUnLCAyMClcbiAgICBpZiAoZ3JleSkge1xuICAgICAgdGhpcy5ncmV5c2NhbGUoKVxuICAgICAgdGhpcy5jb250cmFzdCg0KVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9KVxuXG4gIEZpbHRlci5yZWdpc3Rlcignc2luQ2l0eScsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNvbnRyYXN0KDEwMClcbiAgICB0aGlzLmJyaWdodG5lc3MoMTUpXG4gICAgdGhpcy5leHBvc3VyZSgxMClcbiAgICB0aGlzLnBvc3Rlcml6ZSg4MClcbiAgICB0aGlzLmNsaXAoMzApXG4gICAgdGhpcy5ncmV5c2NhbGUoKVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3Rlcignc3VucmlzZScsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmV4cG9zdXJlKDMuNSlcbiAgICB0aGlzLnNhdHVyYXRpb24oLTUpXG4gICAgdGhpcy52aWJyYW5jZSg1MClcbiAgICB0aGlzLnNlcGlhKDYwKVxuICAgIHRoaXMuY29sb3JpemUoJyNlODdiMjInLCAxMClcbiAgICB0aGlzLmNoYW5uZWxzKHtcbiAgICAgIHJlZDogOCxcbiAgICAgIGJsdWU6IDhcbiAgICB9KVxuICAgIHRoaXMuY29udHJhc3QoNSlcbiAgICB0aGlzLmdhbW1hKDEuMilcbiAgICB0aGlzLnZpZ25ldHRlKCc1NSUnLCAyNSlcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ2Nyb3NzUHJvY2VzcycsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmV4cG9zdXJlKDUpXG4gICAgdGhpcy5jb2xvcml6ZSgnI2U4N2IyMicsIDQpXG4gICAgdGhpcy5zZXBpYSgyMClcbiAgICB0aGlzLmNoYW5uZWxzKHtcbiAgICAgIGJsdWU6IDgsXG4gICAgICByZWQ6IDNcbiAgICB9KVxuICAgIHRoaXMuY3VydmVzKCdiJywgWzAsIDBdLCBbMTAwLCAxNTBdLCBbMTgwLCAxODBdLCBbMjU1LCAyNTVdKVxuICAgIHRoaXMuY29udHJhc3QoMTUpXG4gICAgdGhpcy52aWJyYW5jZSg3NSlcbiAgICB0aGlzLmdhbW1hKDEuNilcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ29yYW5nZVBlZWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jdXJ2ZXMoJ3JnYicsIFswLCAwXSwgWzEwMCwgNTBdLCBbMTQwLCAyMDBdLCBbMjU1LCAyNTVdKVxuICAgIHRoaXMudmlicmFuY2UoLTMwKVxuICAgIHRoaXMuc2F0dXJhdGlvbigtMzApXG4gICAgdGhpcy5jb2xvcml6ZSgnI2ZmOTAwMCcsIDMwKVxuICAgIHRoaXMuY29udHJhc3QoLTUpXG4gICAgdGhpcy5nYW1tYSgxLjQpXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdsb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYnJpZ2h0bmVzcyg1KVxuICAgIHRoaXMuZXhwb3N1cmUoOClcbiAgICB0aGlzLmNvbnRyYXN0KDQpXG4gICAgdGhpcy5jb2xvcml6ZSgnI2M0MjAwNycsIDMwKVxuICAgIHRoaXMudmlicmFuY2UoNTApXG4gICAgdGhpcy5nYW1tYSgxLjMpXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdncnVuZ3knLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5nYW1tYSgxLjUpXG4gICAgdGhpcy5jbGlwKDI1KVxuICAgIHRoaXMuc2F0dXJhdGlvbigtNjApXG4gICAgdGhpcy5jb250cmFzdCg1KVxuICAgIHRoaXMubm9pc2UoNSlcbiAgICB0aGlzLnZpZ25ldHRlKCc1MCUnLCAzMClcbiAgfSlcbiAgLy8gRklYTUU6c2hhcnBlblxuICBGaWx0ZXIucmVnaXN0ZXIoJ2phcnF1ZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zYXR1cmF0aW9uKC0zNSlcbiAgICB0aGlzLmN1cnZlcygnYicsIFsyMCwgMF0sIFs5MCwgMTIwXSwgWzE4NiwgMTQ0XSwgWzI1NSwgMjMwXSlcbiAgICB0aGlzLmN1cnZlcygncicsIFswLCAwXSwgWzE0NCwgOTBdLCBbMTM4LCAxMjBdLCBbMjU1LCAyNTVdKVxuICAgIHRoaXMuY3VydmVzKCdnJywgWzEwLCAwXSwgWzExNSwgMTA1XSwgWzE0OCwgMTAwXSwgWzI1NSwgMjQ4XSlcbiAgICB0aGlzLmN1cnZlcygncmdiJywgWzAsIDBdLCBbMTIwLCAxMDBdLCBbMTI4LCAxNDBdLCBbMjU1LCAyNTVdKVxuICAgIHRoaXMuc2hhcnBlbigyMClcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ3BpbmhvbGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5ncmV5c2NhbGUoKVxuICAgIHRoaXMuc2VwaWEoMTApXG4gICAgdGhpcy5leHBvc3VyZSgxMClcbiAgICB0aGlzLmNvbnRyYXN0KDE1KVxuICAgIHRoaXMudmlnbmV0dGUoJzYwJScsIDM1KVxuICB9KVxuXG4gIEZpbHRlci5yZWdpc3Rlcignb2xkQm9vdCcsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNhdHVyYXRpb24oLTIwKVxuICAgIHRoaXMudmlicmFuY2UoLTUwKVxuICAgIHRoaXMuZ2FtbWEoMS4xKVxuICAgIHRoaXMuc2VwaWEoMzApXG4gICAgdGhpcy5jaGFubmVscyh7XG4gICAgICByZWQ6IC0xMCxcbiAgICAgIGJsdWU6IDVcbiAgICB9KVxuICAgIHRoaXMuY3VydmVzKCdyZ2InLCBbMCwgMF0sIFs4MCwgNTBdLCBbMTI4LCAyMzBdLCBbMjU1LCAyNTVdKVxuICAgIHJldHVybiB0aGlzLnZpZ25ldHRlKCc2MCUnLCAzMClcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ2dsb3dpbmdTdW4nLCBmdW5jdGlvbiAodmlnbmV0dGUgPSB0cnVlKSB7XG4gICAgdGhpcy5icmlnaHRuZXNzKDEwKVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ211bHRpcGx5JylcbiAgICAgIHRoaXMub3BhY2l0eSg4MClcbiAgICAgIHRoaXMuY29weVBhcmVudCgpXG4gICAgICB0aGlzLmZpbHRlci5nYW1tYSgwLjgpXG4gICAgICB0aGlzLmZpbHRlci5jb250cmFzdCg1MClcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlci5leHBvc3VyZSgxMClcbiAgICB9KVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ3NvZnRMaWdodCcpXG4gICAgICB0aGlzLm9wYWNpdHkoODApXG4gICAgICByZXR1cm4gdGhpcy5maWxsQ29sb3IoJyNmNDk2MDAnKVxuICAgIH0pXG4gICAgdGhpcy5leHBvc3VyZSgyMClcbiAgICB0aGlzLmdhbW1hKDAuOClcbiAgICBpZiAodmlnbmV0dGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZpZ25ldHRlKCc0NSUnLCAyMClcbiAgICB9XG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdoYXp5RGF5cycsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmdhbW1hKDEuMilcbiAgICB0aGlzLm5ld0xheWVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0QmxlbmRpbmdNb2RlKCdvdmVybGF5JylcbiAgICAgIHRoaXMub3BhY2l0eSg2MClcbiAgICAgIHRoaXMuY29weVBhcmVudCgpXG4gICAgICB0aGlzLmZpbHRlci5jaGFubmVscyh7XG4gICAgICAgIHJlZDogNVxuICAgICAgfSlcbiAgICAgIHRoaXMuZmlsdGVyLnN0YWNrQmx1cigxNSlcbiAgICB9KVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ2FkZGl0aW9uJylcbiAgICAgIHRoaXMub3BhY2l0eSg0MClcbiAgICAgIHRoaXMuZmlsbENvbG9yKCcjNjg5OWJhJylcbiAgICB9KVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ211bHRpcGx5JylcbiAgICAgIHRoaXMub3BhY2l0eSgzNSlcbiAgICAgIHRoaXMuY29weVBhcmVudCgpXG4gICAgICB0aGlzLmZpbHRlci5icmlnaHRuZXNzKDQwKVxuICAgICAgdGhpcy5maWx0ZXIudmlicmFuY2UoNDApXG4gICAgICB0aGlzLmZpbHRlci5leHBvc3VyZSgzMClcbiAgICAgIHRoaXMuZmlsdGVyLmNvbnRyYXN0KDE1KVxuICAgICAgdGhpcy5maWx0ZXIuY3VydmVzKCdyJywgWzAsIDQwXSwgWzEyOCwgMTI4XSwgWzEyOCwgMTI4XSwgWzI1NSwgMjE1XSlcbiAgICAgIHRoaXMuZmlsdGVyLmN1cnZlcygnZycsIFswLCA0MF0sIFsxMjgsIDEyOF0sIFsxMjgsIDEyOF0sIFsyNTUsIDIxNV0pXG4gICAgICB0aGlzLmZpbHRlci5jdXJ2ZXMoJ2InLCBbMCwgNDBdLCBbMTI4LCAxMjhdLCBbMTI4LCAxMjhdLCBbMjU1LCAyMTVdKVxuICAgICAgdGhpcy5maWx0ZXIuc3RhY2tCbHVyKDUpXG4gICAgfSlcbiAgICB0aGlzLmN1cnZlcygncicsIFsyMCwgMF0sIFsxMjgsIDE1OF0sIFsxMjgsIDEyOF0sIFsyMzUsIDI1NV0pXG4gICAgdGhpcy5jdXJ2ZXMoJ2cnLCBbMjAsIDBdLCBbMTI4LCAxMjhdLCBbMTI4LCAxMjhdLCBbMjM1LCAyNTVdKVxuICAgIHRoaXMuY3VydmVzKCdiJywgWzIwLCAwXSwgWzEyOCwgMTA4XSwgWzEyOCwgMTI4XSwgWzIzNSwgMjU1XSlcbiAgICB0aGlzLnZpZ25ldHRlKCc0NSUnLCAyMClcbiAgfSlcblxuICBGaWx0ZXIucmVnaXN0ZXIoJ2hlck1hamVzdHknLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5icmlnaHRuZXNzKDQwKVxuICAgIHRoaXMuY29sb3JpemUoJyNlYTFjNWQnLCAxMClcbiAgICB0aGlzLmN1cnZlcygnYicsIFswLCAxMF0sIFsxMjgsIDE4MF0sIFsxOTAsIDE5MF0sIFsyNTUsIDI1NV0pXG4gICAgdGhpcy5uZXdMYXllcihmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuc2V0QmxlbmRpbmdNb2RlKCdvdmVybGF5JylcbiAgICAgIHRoaXMub3BhY2l0eSg1MClcbiAgICAgIHRoaXMuY29weVBhcmVudCgpXG4gICAgICB0aGlzLmZpbHRlci5nYW1tYSgwLjcpXG4gICAgICByZXR1cm4gdGhpcy5uZXdMYXllcihmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ25vcm1hbCcpXG4gICAgICAgIHRoaXMub3BhY2l0eSg2MClcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsbENvbG9yKCcjZWExYzVkJylcbiAgICAgIH0pXG4gICAgfSlcbiAgICB0aGlzLm5ld0xheWVyKGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5zZXRCbGVuZGluZ01vZGUoJ211bHRpcGx5JylcbiAgICAgIHRoaXMub3BhY2l0eSg2MClcbiAgICAgIHRoaXMuY29weVBhcmVudCgpXG4gICAgICB0aGlzLmZpbHRlci5zYXR1cmF0aW9uKDUwKVxuICAgICAgdGhpcy5maWx0ZXIuaHVlKDkwKVxuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyLmNvbnRyYXN0KDEwKVxuICAgIH0pXG4gICAgdGhpcy5nYW1tYSgxLjQpXG4gICAgdGhpcy52aWJyYW5jZSgtMzApXG4gICAgdGhpcy5uZXdMYXllcihmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMub3BhY2l0eSgxMClcbiAgICAgIHJldHVybiB0aGlzLmZpbGxDb2xvcignI2U1ZjBmZicpXG4gICAgfSlcbiAgICByZXR1cm4gdGhpc1xuICB9KVxuXG4gIEZpbHRlci5yZWdpc3Rlcignbm9zdGFsZ2lhJywgZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zYXR1cmF0aW9uKDIwKVxuICAgIHRoaXMuZ2FtbWEoMS40KVxuICAgIHRoaXMuZ3JleXNjYWxlKClcbiAgICB0aGlzLmNvbnRyYXN0KDUpXG4gICAgdGhpcy5zZXBpYSgxMDApXG4gICAgdGhpcy5jaGFubmVscyh7XG4gICAgICByZWQ6IDgsXG4gICAgICBibHVlOiAyLFxuICAgICAgZ3JlZW46IDRcbiAgICB9KVxuICAgIHRoaXMuZ2FtbWEoMC44KVxuICAgIHRoaXMuY29udHJhc3QoNSlcbiAgICB0aGlzLmV4cG9zdXJlKDEwKVxuICAgIHRoaXMubmV3TGF5ZXIoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnNldEJsZW5kaW5nTW9kZSgnb3ZlcmxheScpXG4gICAgICB0aGlzLmNvcHlQYXJlbnQoKVxuICAgICAgdGhpcy5vcGFjaXR5KDU1KVxuICAgICAgdGhpcy5maWx0ZXIuc3RhY2tCbHVyKDEwKVxuICAgIH0pXG4gICAgdGhpcy52aWduZXR0ZSgnNTAlJywgMzApXG4gIH0pXG5cbiAgRmlsdGVyLnJlZ2lzdGVyKCdoZW1pbmd3YXknLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5ncmV5c2NhbGUoKVxuICAgIHRoaXMuY29udHJhc3QoMTApXG4gICAgdGhpcy5nYW1tYSgwLjkpXG4gICAgdGhpcy5uZXdMYXllcihmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNldEJsZW5kaW5nTW9kZSgnbXVsdGlwbHknKVxuICAgICAgdGhpcy5vcGFjaXR5KDQwKVxuICAgICAgdGhpcy5jb3B5UGFyZW50KClcbiAgICAgIHRoaXMuZmlsdGVyLmV4cG9zdXJlKDE1KVxuICAgICAgdGhpcy5maWx0ZXIuY29udHJhc3QoMTUpXG4gICAgICB0aGlzLmZpbHRlci5jaGFubmVscyh7XG4gICAgICAgIGdyZWVuOiAxMCxcbiAgICAgICAgcmVkOiA1XG4gICAgICB9KVxuICAgIH0pXG4gICAgdGhpcy5zZXBpYSgzMClcbiAgICB0aGlzLmN1cnZlcygncmdiJywgWzAsIDEwXSwgWzEyMCwgOTBdLCBbMTgwLCAyMDBdLCBbMjM1LCAyNTVdKVxuICAgIHRoaXMuY2hhbm5lbHMoe1xuICAgICAgcmVkOiA1LFxuICAgICAgZ3JlZW46IC0yXG4gICAgfSlcbiAgICByZXR1cm4gdGhpcy5leHBvc3VyZSgxNSlcbiAgfSlcblxuICAvLyBGSVhNRTogc2hhcnBlblxuICBGaWx0ZXIucmVnaXN0ZXIoJ2NvbmNlbnRyYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2hhcnBlbig0MClcbiAgICB0aGlzLnNhdHVyYXRpb24oLTUwKVxuICAgIHRoaXMuY2hhbm5lbHMoe1xuICAgICAgcmVkOiAzXG4gICAgfSlcbiAgICB0aGlzLm5ld0xheWVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0QmxlbmRpbmdNb2RlKCdtdWx0aXBseScpXG4gICAgICB0aGlzLm9wYWNpdHkoODApXG4gICAgICB0aGlzLmNvcHlQYXJlbnQoKVxuICAgICAgdGhpcy5maWx0ZXIuc2hhcnBlbig1KVxuICAgICAgdGhpcy5maWx0ZXIuY29udHJhc3QoNTApXG4gICAgICB0aGlzLmZpbHRlci5leHBvc3VyZSgxMClcbiAgICAgIHRoaXMuZmlsdGVyLmNoYW5uZWxzKHtcbiAgICAgICAgYmx1ZTogNVxuICAgICAgfSlcbiAgICB9KVxuICAgIHRoaXMuYnJpZ2h0bmVzcygxMClcbiAgfSlcbn1cbiIsIi8qXG5TdGFja0JsdXIgLSBhIGZhc3QgYWxtb3N0IEdhdXNzaWFuIEJsdXIgRm9yIENhbnZhcyB2MC4zMSBtb2RpZmllZCBmb3IgQ2FtYW5KU1xuXG5WZXJzaW9uOiAgIDAuMzFcbkF1dGhvcjogICAgTWFyaW8gS2xpbmdlbWFublxuQ29udGFjdDogICBtYXJpb0BxdWFzaW1vbmRvLmNvbVxuV2Vic2l0ZTogIGh0dHA6Ly93d3cucXVhc2ltb25kby5jb20vU3RhY2tCbHVyRm9yQ2FudmFzXG5Ud2l0dGVyOiAgQHF1YXNpbW9uZG9cbk1vZGlmaWVkIEJ5OiBSeWFuIExlRmV2cmUgKEBtZWx0aW5naWNlKVxuXG5JbiBjYXNlIHlvdSBmaW5kIHRoaXMgY2xhc3MgdXNlZnVsIC0gZXNwZWNpYWxseSBpbiBjb21tZXJjaWFsIHByb2plY3RzIC1cbkkgYW0gbm90IHRvdGFsbHkgdW5oYXBweSBmb3IgYSBzbWFsbCBkb25hdGlvbiB0byBteSBQYXlQYWwgYWNjb3VudFxubWFyaW9AcXVhc2ltb25kby5kZVxuXG5PciBzdXBwb3J0IG1lIG9uIGZsYXR0cjpcbmh0dHBzOi8vZmxhdHRyLmNvbS90aGluZy83Mjc5MS9TdGFja0JsdXItYS1mYXN0LWFsbW9zdC1HYXVzc2lhbi1CbHVyLUVmZmVjdC1mb3ItQ2FudmFzSmF2YXNjcmlwdFxuXG5Db3B5cmlnaHQgKGMpIDIwMTAgTWFyaW8gS2xpbmdlbWFublxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxub2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbmZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dFxucmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsXG5jb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlXG5Tb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZ1xuY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbmluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTXG5PRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORFxuTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFRcbkhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLFxuV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG5GUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SXG5PVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxubGV0IEJsdXJTdGFjaywgbXVsVGFibGUsIHNoZ1RhYmxlXG5tdWxUYWJsZSA9IFs1MTIsIDUxMiwgNDU2LCA1MTIsIDMyOCwgNDU2LCAzMzUsIDUxMiwgNDA1LCAzMjgsIDI3MSwgNDU2LCAzODgsIDMzNSwgMjkyLCA1MTIsIDQ1NCwgNDA1LCAzNjQsIDMyOCwgMjk4LCAyNzEsIDQ5NiwgNDU2LCA0MjAsIDM4OCwgMzYwLCAzMzUsIDMxMiwgMjkyLCAyNzMsIDUxMiwgNDgyLCA0NTQsIDQyOCwgNDA1LCAzODMsIDM2NCwgMzQ1LCAzMjgsIDMxMiwgMjk4LCAyODQsIDI3MSwgMjU5LCA0OTYsIDQ3NSwgNDU2LCA0MzcsIDQyMCwgNDA0LCAzODgsIDM3NCwgMzYwLCAzNDcsIDMzNSwgMzIzLCAzMTIsIDMwMiwgMjkyLCAyODIsIDI3MywgMjY1LCA1MTIsIDQ5NywgNDgyLCA0NjgsIDQ1NCwgNDQxLCA0MjgsIDQxNywgNDA1LCAzOTQsIDM4MywgMzczLCAzNjQsIDM1NCwgMzQ1LCAzMzcsIDMyOCwgMzIwLCAzMTIsIDMwNSwgMjk4LCAyOTEsIDI4NCwgMjc4LCAyNzEsIDI2NSwgMjU5LCA1MDcsIDQ5NiwgNDg1LCA0NzUsIDQ2NSwgNDU2LCA0NDYsIDQzNywgNDI4LCA0MjAsIDQxMiwgNDA0LCAzOTYsIDM4OCwgMzgxLCAzNzQsIDM2NywgMzYwLCAzNTQsIDM0NywgMzQxLCAzMzUsIDMyOSwgMzIzLCAzMTgsIDMxMiwgMzA3LCAzMDIsIDI5NywgMjkyLCAyODcsIDI4MiwgMjc4LCAyNzMsIDI2OSwgMjY1LCAyNjEsIDUxMiwgNTA1LCA0OTcsIDQ4OSwgNDgyLCA0NzUsIDQ2OCwgNDYxLCA0NTQsIDQ0NywgNDQxLCA0MzUsIDQyOCwgNDIyLCA0MTcsIDQxMSwgNDA1LCAzOTksIDM5NCwgMzg5LCAzODMsIDM3OCwgMzczLCAzNjgsIDM2NCwgMzU5LCAzNTQsIDM1MCwgMzQ1LCAzNDEsIDMzNywgMzMyLCAzMjgsIDMyNCwgMzIwLCAzMTYsIDMxMiwgMzA5LCAzMDUsIDMwMSwgMjk4LCAyOTQsIDI5MSwgMjg3LCAyODQsIDI4MSwgMjc4LCAyNzQsIDI3MSwgMjY4LCAyNjUsIDI2MiwgMjU5LCAyNTcsIDUwNywgNTAxLCA0OTYsIDQ5MSwgNDg1LCA0ODAsIDQ3NSwgNDcwLCA0NjUsIDQ2MCwgNDU2LCA0NTEsIDQ0NiwgNDQyLCA0MzcsIDQzMywgNDI4LCA0MjQsIDQyMCwgNDE2LCA0MTIsIDQwOCwgNDA0LCA0MDAsIDM5NiwgMzkyLCAzODgsIDM4NSwgMzgxLCAzNzcsIDM3NCwgMzcwLCAzNjcsIDM2MywgMzYwLCAzNTcsIDM1NCwgMzUwLCAzNDcsIDM0NCwgMzQxLCAzMzgsIDMzNSwgMzMyLCAzMjksIDMyNiwgMzIzLCAzMjAsIDMxOCwgMzE1LCAzMTIsIDMxMCwgMzA3LCAzMDQsIDMwMiwgMjk5LCAyOTcsIDI5NCwgMjkyLCAyODksIDI4NywgMjg1LCAyODIsIDI4MCwgMjc4LCAyNzUsIDI3MywgMjcxLCAyNjksIDI2NywgMjY1LCAyNjMsIDI2MSwgMjU5XVxuc2hnVGFibGUgPSBbOSwgMTEsIDEyLCAxMywgMTMsIDE0LCAxNCwgMTUsIDE1LCAxNSwgMTUsIDE2LCAxNiwgMTYsIDE2LCAxNywgMTcsIDE3LCAxNywgMTcsIDE3LCAxNywgMTgsIDE4LCAxOCwgMTgsIDE4LCAxOCwgMTgsIDE4LCAxOCwgMTksIDE5LCAxOSwgMTksIDE5LCAxOSwgMTksIDE5LCAxOSwgMTksIDE5LCAxOSwgMTksIDE5LCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMCwgMjAsIDIwLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMSwgMjEsIDIxLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjIsIDIyLCAyMiwgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjMsIDIzLCAyMywgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0LCAyNCwgMjQsIDI0XVxuQmx1clN0YWNrID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnIgPSAwXG4gIHRoaXMuZyA9IDBcbiAgdGhpcy5iID0gMFxuICB0aGlzLmEgPSAwXG4gIHRoaXMubmV4dCA9IG51bGxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyU3RhY2tCbHVyUGx1Z2luIChQbHVnaW4pIHtcbiAgUGx1Z2luLnJlZ2lzdGVyKCdzdGFja0JsdXInLCBmdW5jdGlvbihyYWRpdXMpIHtcbiAgICBsZXQgYkluU3VtLCBiT3V0U3VtLCBiU3VtLCBkaXYsIGdJblN1bSwgZ091dFN1bSwgZ1N1bSwgaGVpZ2h0LCBoZWlnaHRNaW51czEsIGksIG11bFN1bSwgcCwgcGIsIHBnLCBwaXhlbHMsIHByLCBySW5TdW0sIHJPdXRTdW0sIHJTdW0sIHJhZGl1c1BsdXMxLCByYnMsIHNoZ1N1bSwgc3RhY2ssIHN0YWNrRW5kLCBzdGFja0luLCBzdGFja091dCwgc3RhY2tTdGFydCwgc3VtRmFjdG9yLCB3aWR0aCwgd2lkdGhNaW51czEsIHgsIHksIHlpLCB5cCwgeXcsIF9pLCBfaiwgX2ssIF9sLCBfbSwgX24sIF9vLCBfcCwgX3FcbiAgICBpZiAoaXNOYU4ocmFkaXVzKSB8fCByYWRpdXMgPCAxKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgcmFkaXVzIHw9IDBcbiAgICBwaXhlbHMgPSB0aGlzLnBpeGVsRGF0YVxuICAgIHdpZHRoID0gdGhpcy5kaW1lbnNpb25zLndpZHRoXG4gICAgaGVpZ2h0ID0gdGhpcy5kaW1lbnNpb25zLmhlaWdodFxuICAgIGRpdiA9IHJhZGl1cyArIHJhZGl1cyArIDFcbiAgICB3aWR0aE1pbnVzMSA9IHdpZHRoIC0gMVxuICAgIGhlaWdodE1pbnVzMSA9IGhlaWdodCAtIDFcbiAgICByYWRpdXNQbHVzMSA9IHJhZGl1cyArIDFcbiAgICBzdW1GYWN0b3IgPSByYWRpdXNQbHVzMSAqIChyYWRpdXNQbHVzMSArIDEpIC8gMlxuICAgIHN0YWNrU3RhcnQgPSBuZXcgQmx1clN0YWNrKClcbiAgICBzdGFjayA9IHN0YWNrU3RhcnRcbiAgICBmb3IgKGkgPSBfaSA9IDE7IGRpdiA+PSAxID8gX2kgPCBkaXYgOiBfaSA+IGRpdjsgaSA9IGRpdiA+PSAxID8gKytfaSA6IC0tX2kpIHtcbiAgICAgIHN0YWNrID0gc3RhY2submV4dCA9IG5ldyBCbHVyU3RhY2soKVxuICAgICAgaWYgKGkgPT09IHJhZGl1c1BsdXMxKSB7XG4gICAgICAgIHN0YWNrRW5kID0gc3RhY2tcbiAgICAgIH1cbiAgICB9XG4gICAgc3RhY2submV4dCA9IHN0YWNrU3RhcnRcbiAgICBzdGFja0luID0gbnVsbFxuICAgIHN0YWNrT3V0ID0gbnVsbFxuICAgIHl3ID0geWkgPSAwXG4gICAgbXVsU3VtID0gbXVsVGFibGVbcmFkaXVzXVxuICAgIHNoZ1N1bSA9IHNoZ1RhYmxlW3JhZGl1c11cbiAgICBmb3IgKHkgPSBfaiA9IDA7IGhlaWdodCA+PSAwID8gX2ogPCBoZWlnaHQgOiBfaiA+IGhlaWdodDsgeSA9IGhlaWdodCA+PSAwID8gKytfaiA6IC0tX2opIHtcbiAgICAgIHJJblN1bSA9IGdJblN1bSA9IGJJblN1bSA9IHJTdW0gPSBnU3VtID0gYlN1bSA9IDBcbiAgICAgIHJPdXRTdW0gPSByYWRpdXNQbHVzMSAqIChwciA9IHBpeGVsc1t5aV0pXG4gICAgICBnT3V0U3VtID0gcmFkaXVzUGx1czEgKiAocGcgPSBwaXhlbHNbeWkgKyAxXSlcbiAgICAgIGJPdXRTdW0gPSByYWRpdXNQbHVzMSAqIChwYiA9IHBpeGVsc1t5aSArIDJdKVxuICAgICAgclN1bSArPSBzdW1GYWN0b3IgKiBwclxuICAgICAgZ1N1bSArPSBzdW1GYWN0b3IgKiBwZ1xuICAgICAgYlN1bSArPSBzdW1GYWN0b3IgKiBwYlxuICAgICAgc3RhY2sgPSBzdGFja1N0YXJ0XG4gICAgICBmb3IgKGkgPSBfayA9IDA7IHJhZGl1c1BsdXMxID49IDAgPyBfayA8IHJhZGl1c1BsdXMxIDogX2sgPiByYWRpdXNQbHVzMTsgaSA9IHJhZGl1c1BsdXMxID49IDAgPyArK19rIDogLS1faykge1xuICAgICAgICBzdGFjay5yID0gcHJcbiAgICAgICAgc3RhY2suZyA9IHBnXG4gICAgICAgIHN0YWNrLmIgPSBwYlxuICAgICAgICBzdGFjayA9IHN0YWNrLm5leHRcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IF9sID0gMTsgcmFkaXVzUGx1czEgPj0gMSA/IF9sIDwgcmFkaXVzUGx1czEgOiBfbCA+IHJhZGl1c1BsdXMxOyBpID0gcmFkaXVzUGx1czEgPj0gMSA/ICsrX2wgOiAtLV9sKSB7XG4gICAgICAgIHAgPSB5aSArICgod2lkdGhNaW51czEgPCBpID8gd2lkdGhNaW51czEgOiBpKSA8PCAyKVxuICAgICAgICByU3VtICs9IChzdGFjay5yID0gKHByID0gcGl4ZWxzW3BdKSkgKiAocmJzID0gcmFkaXVzUGx1czEgLSBpKVxuICAgICAgICBnU3VtICs9IChzdGFjay5nID0gKHBnID0gcGl4ZWxzW3AgKyAxXSkpICogcmJzXG4gICAgICAgIGJTdW0gKz0gKHN0YWNrLmIgPSAocGIgPSBwaXhlbHNbcCArIDJdKSkgKiByYnNcbiAgICAgICAgckluU3VtICs9IHByXG4gICAgICAgIGdJblN1bSArPSBwZ1xuICAgICAgICBiSW5TdW0gKz0gcGJcbiAgICAgICAgc3RhY2sgPSBzdGFjay5uZXh0XG4gICAgICB9XG4gICAgICBzdGFja0luID0gc3RhY2tTdGFydFxuICAgICAgc3RhY2tPdXQgPSBzdGFja0VuZFxuICAgICAgZm9yICh4ID0gX20gPSAwOyB3aWR0aCA+PSAwID8gX20gPCB3aWR0aCA6IF9tID4gd2lkdGg7IHggPSB3aWR0aCA+PSAwID8gKytfbSA6IC0tX20pIHtcbiAgICAgICAgcGl4ZWxzW3lpXSA9IChyU3VtICogbXVsU3VtKSA+PiBzaGdTdW1cbiAgICAgICAgcGl4ZWxzW3lpICsgMV0gPSAoZ1N1bSAqIG11bFN1bSkgPj4gc2hnU3VtXG4gICAgICAgIHBpeGVsc1t5aSArIDJdID0gKGJTdW0gKiBtdWxTdW0pID4+IHNoZ1N1bVxuICAgICAgICByU3VtIC09IHJPdXRTdW1cbiAgICAgICAgZ1N1bSAtPSBnT3V0U3VtXG4gICAgICAgIGJTdW0gLT0gYk91dFN1bVxuICAgICAgICByT3V0U3VtIC09IHN0YWNrSW4uclxuICAgICAgICBnT3V0U3VtIC09IHN0YWNrSW4uZ1xuICAgICAgICBiT3V0U3VtIC09IHN0YWNrSW4uYlxuICAgICAgICBwID0gKHl3ICsgKChwID0geCArIHJhZGl1cyArIDEpIDwgd2lkdGhNaW51czEgPyBwIDogd2lkdGhNaW51czEpKSA8PCAyXG4gICAgICAgIHJJblN1bSArPSAoc3RhY2tJbi5yID0gcGl4ZWxzW3BdKVxuICAgICAgICBnSW5TdW0gKz0gKHN0YWNrSW4uZyA9IHBpeGVsc1twICsgMV0pXG4gICAgICAgIGJJblN1bSArPSAoc3RhY2tJbi5iID0gcGl4ZWxzW3AgKyAyXSlcbiAgICAgICAgclN1bSArPSBySW5TdW1cbiAgICAgICAgZ1N1bSArPSBnSW5TdW1cbiAgICAgICAgYlN1bSArPSBiSW5TdW1cbiAgICAgICAgc3RhY2tJbiA9IHN0YWNrSW4ubmV4dFxuICAgICAgICByT3V0U3VtICs9IChwciA9IHN0YWNrT3V0LnIpXG4gICAgICAgIGdPdXRTdW0gKz0gKHBnID0gc3RhY2tPdXQuZylcbiAgICAgICAgYk91dFN1bSArPSAocGIgPSBzdGFja091dC5iKVxuICAgICAgICBySW5TdW0gLT0gcHJcbiAgICAgICAgZ0luU3VtIC09IHBnXG4gICAgICAgIGJJblN1bSAtPSBwYlxuICAgICAgICBzdGFja091dCA9IHN0YWNrT3V0Lm5leHRcbiAgICAgICAgeWkgKz0gNFxuICAgICAgfVxuICAgICAgeXcgKz0gd2lkdGhcbiAgICB9XG4gICAgZm9yICh4ID0gX24gPSAwOyB3aWR0aCA+PSAwID8gX24gPCB3aWR0aCA6IF9uID4gd2lkdGg7IHggPSB3aWR0aCA+PSAwID8gKytfbiA6IC0tX24pIHtcbiAgICAgIGdJblN1bSA9IGJJblN1bSA9IHJJblN1bSA9IGdTdW0gPSBiU3VtID0gclN1bSA9IDBcbiAgICAgIHlpID0geCA8PCAyXG4gICAgICByT3V0U3VtID0gcmFkaXVzUGx1czEgKiAocHIgPSBwaXhlbHNbeWldKVxuICAgICAgZ091dFN1bSA9IHJhZGl1c1BsdXMxICogKHBnID0gcGl4ZWxzW3lpICsgMV0pXG4gICAgICBiT3V0U3VtID0gcmFkaXVzUGx1czEgKiAocGIgPSBwaXhlbHNbeWkgKyAyXSlcbiAgICAgIHJTdW0gKz0gc3VtRmFjdG9yICogcHJcbiAgICAgIGdTdW0gKz0gc3VtRmFjdG9yICogcGdcbiAgICAgIGJTdW0gKz0gc3VtRmFjdG9yICogcGJcbiAgICAgIHN0YWNrID0gc3RhY2tTdGFydFxuICAgICAgZm9yIChpID0gX28gPSAwOyByYWRpdXNQbHVzMSA+PSAwID8gX28gPCByYWRpdXNQbHVzMSA6IF9vID4gcmFkaXVzUGx1czE7IGkgPSByYWRpdXNQbHVzMSA+PSAwID8gKytfbyA6IC0tX28pIHtcbiAgICAgICAgc3RhY2suciA9IHByXG4gICAgICAgIHN0YWNrLmcgPSBwZ1xuICAgICAgICBzdGFjay5iID0gcGJcbiAgICAgICAgc3RhY2sgPSBzdGFjay5uZXh0XG4gICAgICB9XG4gICAgICB5cCA9IHdpZHRoXG4gICAgICBmb3IgKGkgPSBfcCA9IDE7IHJhZGl1cyA+PSAxID8gX3AgPD0gcmFkaXVzIDogX3AgPj0gcmFkaXVzOyBpID0gcmFkaXVzID49IDEgPyArK19wIDogLS1fcCkge1xuICAgICAgICB5aSA9ICh5cCArIHgpIDw8IDJcbiAgICAgICAgclN1bSArPSAoc3RhY2suciA9IChwciA9IHBpeGVsc1t5aV0pKSAqIChyYnMgPSByYWRpdXNQbHVzMSAtIGkpXG4gICAgICAgIGdTdW0gKz0gKHN0YWNrLmcgPSAocGcgPSBwaXhlbHNbeWkgKyAxXSkpICogcmJzXG4gICAgICAgIGJTdW0gKz0gKHN0YWNrLmIgPSAocGIgPSBwaXhlbHNbeWkgKyAyXSkpICogcmJzXG4gICAgICAgIHJJblN1bSArPSBwclxuICAgICAgICBnSW5TdW0gKz0gcGdcbiAgICAgICAgYkluU3VtICs9IHBiXG4gICAgICAgIHN0YWNrID0gc3RhY2submV4dFxuICAgICAgICBpZiAoaSA8IGhlaWdodE1pbnVzMSkge1xuICAgICAgICAgIHlwICs9IHdpZHRoXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHlpID0geFxuICAgICAgc3RhY2tJbiA9IHN0YWNrU3RhcnRcbiAgICAgIHN0YWNrT3V0ID0gc3RhY2tFbmRcbiAgICAgIGZvciAoeSA9IF9xID0gMDsgaGVpZ2h0ID49IDAgPyBfcSA8IGhlaWdodCA6IF9xID4gaGVpZ2h0OyB5ID0gaGVpZ2h0ID49IDAgPyArK19xIDogLS1fcSkge1xuICAgICAgICBwID0geWkgPDwgMlxuICAgICAgICBwaXhlbHNbcF0gPSAoclN1bSAqIG11bFN1bSkgPj4gc2hnU3VtXG4gICAgICAgIHBpeGVsc1twICsgMV0gPSAoZ1N1bSAqIG11bFN1bSkgPj4gc2hnU3VtXG4gICAgICAgIHBpeGVsc1twICsgMl0gPSAoYlN1bSAqIG11bFN1bSkgPj4gc2hnU3VtXG4gICAgICAgIHJTdW0gLT0gck91dFN1bVxuICAgICAgICBnU3VtIC09IGdPdXRTdW1cbiAgICAgICAgYlN1bSAtPSBiT3V0U3VtXG4gICAgICAgIHJPdXRTdW0gLT0gc3RhY2tJbi5yXG4gICAgICAgIGdPdXRTdW0gLT0gc3RhY2tJbi5nXG4gICAgICAgIGJPdXRTdW0gLT0gc3RhY2tJbi5iXG4gICAgICAgIHAgPSAoeCArICgoKHAgPSB5ICsgcmFkaXVzUGx1czEpIDwgaGVpZ2h0TWludXMxID8gcCA6IGhlaWdodE1pbnVzMSkgKiB3aWR0aCkpIDw8IDJcbiAgICAgICAgclN1bSArPSAockluU3VtICs9IChzdGFja0luLnIgPSBwaXhlbHNbcF0pKVxuICAgICAgICBnU3VtICs9IChnSW5TdW0gKz0gKHN0YWNrSW4uZyA9IHBpeGVsc1twICsgMV0pKVxuICAgICAgICBiU3VtICs9IChiSW5TdW0gKz0gKHN0YWNrSW4uYiA9IHBpeGVsc1twICsgMl0pKVxuICAgICAgICBzdGFja0luID0gc3RhY2tJbi5uZXh0XG4gICAgICAgIHJPdXRTdW0gKz0gKHByID0gc3RhY2tPdXQucilcbiAgICAgICAgZ091dFN1bSArPSAocGcgPSBzdGFja091dC5nKVxuICAgICAgICBiT3V0U3VtICs9IChwYiA9IHN0YWNrT3V0LmIpXG4gICAgICAgIHJJblN1bSAtPSBwclxuICAgICAgICBnSW5TdW0gLT0gcGdcbiAgICAgICAgYkluU3VtIC09IHBiXG4gICAgICAgIHN0YWNrT3V0ID0gc3RhY2tPdXQubmV4dFxuICAgICAgICB5aSArPSB3aWR0aFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJTdGFja0JsdXJGaWx0ZXIgKEZpbHRlcikge1xuICBGaWx0ZXIucmVnaXN0ZXIoJ3N0YWNrQmx1cicsIGZ1bmN0aW9uIChyYWRpdXMpIHtcbiAgICB0aGlzLnByb2Nlc3NQbHVnaW4oJ3N0YWNrQmx1cicsIFtyYWRpdXNdKVxuICB9KVxufVxuIiwiaW1wb3J0IHJlZ2lzdGVyQ2FtZXJhRmlsdGVyIGZyb20gJy4vY2FtZXJhJ1xuaW1wb3J0IHJlZ2lzdGVyQmx1ckZpbHRlciBmcm9tICcuL2JsdXInXG5pbXBvcnQgcmVnaXN0cmVyUG9zdGVyaXplRmlsdGVyIGZyb20gJy4vcG9zdGVyaXplJ1xuaW1wb3J0IHJlZ2lzdGVyUHJlc2V0RmlsdGVyIGZyb20gJy4vcHJlc2V0cydcbmltcG9ydCB7IHJlZ2lzdGVyU3RhY2tCbHVyUGx1Z2luLCByZWdpc3RlclN0YWNrQmx1ckZpbHRlciB9IGZyb20gJy4vc3RhY2tCbHVyJ1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJQbHVnaW4gKFBsdWdpbikge1xuICByZWdpc3RlclN0YWNrQmx1clBsdWdpbihQbHVnaW4pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclBsdWdpbkZpbHRlciAoRmlsdGVyKSB7XG4gIHJlZ2lzdGVyQ2FtZXJhRmlsdGVyKEZpbHRlcilcbiAgcmVnaXN0ZXJCbHVyRmlsdGVyKEZpbHRlcilcbiAgcmVnaXN0cmVyUG9zdGVyaXplRmlsdGVyKEZpbHRlcilcbiAgcmVnaXN0ZXJQcmVzZXRGaWx0ZXIoRmlsdGVyKVxuICByZWdpc3RlclN0YWNrQmx1ckZpbHRlcihGaWx0ZXIpXG59XG4iLCJpbXBvcnQgQ2FtYW4gZnJvbSAnLi9jYW1hbidcbmltcG9ydCBCbGVuZGVyIGZyb20gJy4vYmxlbmRlcidcbmltcG9ydCBGaWx0ZXIgZnJvbSAnLi9maWx0ZXInXG5pbXBvcnQgUGx1Z2luIGZyb20gJy4vcGx1Z2luJ1xuXG5pbXBvcnQgcmVnaXN0ZXJCbGVuZGVyIGZyb20gJy4uL2xpYi9ibGVuZGVycydcbmltcG9ydCByZWdpc3RlckZpbHRlciBmcm9tICcuLi9saWIvZmlsdGVycydcbmltcG9ydCB7IHJlZ2lzdGVyUGx1Z2luLCByZWdpc3RlclBsdWdpbkZpbHRlciB9IGZyb20gJy4uL2xpYi9wbHVnaW5zJ1xuXG4vLyB3ZWNoYXQgbWluaSBwcm9ncmFtIGVudlxuaWYgKHR5cGVvZiB3eCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgLy8gdGhyb3cgbmV3IEVycm9yKCdXZWNoYXQtQ2FtYW5KUyBjYW4gb25seSBydW4gaW4gd2VjaGF0IG1pbmkgcHJvZ3JhbScpXG59XG5yZWdpc3RlckJsZW5kZXIoQmxlbmRlcilcbnJlZ2lzdGVyRmlsdGVyKEZpbHRlcilcblxucmVnaXN0ZXJQbHVnaW4oUGx1Z2luKVxucmVnaXN0ZXJQbHVnaW5GaWx0ZXIoRmlsdGVyKVxuXG5leHBvcnQgZGVmYXVsdCBDYW1hblxuIl0sIm5hbWVzIjpbIm1vZHVsZUtleXdvcmRzIiwiTW9kdWxlIiwib2JqIiwia2V5IiwiaW5kZXhPZiIsImV4dGVuZGVkIiwiYXBwbHkiLCJwcm90b3R5cGUiLCJpbmNsdWRlZCIsImFyZ3MiLCJ0YXJnZXQiLCJwb3AiLCJpIiwic291cmNlIiwidG8iLCJmcm9tIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJzZXQiLCJ2YWwiLCJmdW5jIiwiY2FsbCIsIiQiLCJzZWwiLCJyb290IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibm9vcCIsIlV0aWwiLCJpZCIsImRlc3QiLCJzcmMiLCJjb3B5IiwicHJvcCIsImhhc093blByb3BlcnR5Iiwib3B0cyIsImF0dHJpYnV0ZXMiLCJhdHRyIiwiZXhjZXB0Iiwibm9kZU5hbWUiLCJzZXRBdHRyaWJ1dGUiLCJub2RlVmFsdWUiLCJsZW5ndGgiLCJVaW50OEFycmF5IiwiQXJyYXkiLCJTdG9yZSIsInNlYXJjaCIsIml0ZW1zIiwibmFtZSIsImNhbGxiYWNrIiwic2V0VGltZW91dCIsIkFuYWx5emUiLCJjIiwibGV2ZWxzIiwiciIsImciLCJiIiwiaiIsInBpeGVsRGF0YSIsIm51bVBpeGVscyIsIkV2ZW50IiwidHlwZSIsImRhdGEiLCJldmVudHMiLCJldmVudCIsImZuIiwiX3R5cGUiLCJfZm4iLCJ0eXBlcyIsInB1c2giLCJGaWx0ZXIiLCJmaWx0ZXJGdW5jIiwiQ2FtYW4iLCJTaW5nbGUiLCJLZXJuZWwiLCJMYXllckRlcXVldWUiLCJMYXllckZpbmlzaGVkIiwiTG9hZE92ZXJsYXkiLCJQbHVnaW4iLCJMb2dnZXIiLCJsb2dMZXZlbCIsIkRFQlVHIiwiY29uc29sZSIsImUiLCJkZWJ1ZyIsImxvZyIsIkxvZyIsInBsdWdpbiIsInBsdWdpbnMiLCJjb250ZXh0IiwiUGl4ZWwiLCJ4IiwieSIsIndpZHRoIiwibG9jIiwiTWF0aCIsImZsb29yIiwiYSIsIkVycm9yIiwiZGltZW5zaW9ucyIsImhlaWdodCIsImhvcml6IiwidmVydCIsIm5ld0xvYyIsInBpeGVsQXRMb2NhdGlvbiIsImNvb3JkaW5hdGVzVG9Mb2NhdGlvbiIsInJnYmEiLCJ0b0tleSIsImluY2x1ZGVBbHBoYSIsImhleCIsInRvU3RyaW5nIiwiSU8iLCJpbWciLCJjb3JzRW5hYmxlZCIsImlzVVJMUmVtb3RlIiwiY3Jvc3NPcmlnaW4iLCJ0b0xvd2VyQ2FzZSIsInVybCIsIm1hdGNoZXMiLCJtYXRjaCIsImRvbWFpblJlZ2V4IiwiZG9tYWluIiwicmVtb3RlUHJveHkiLCJpbmZvIiwicHJveHlVcmwiLCJwcm94eVBhcmFtIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwibGFuZyIsImxhbmdUb0V4dCIsInJ1YnkiLCJweXRob24iLCJwZXJsIiwiamF2YXNjcmlwdCIsIlJlbmRlcmVyIiwicmVuZGVyUXVldWUiLCJtb2RQaXhlbERhdGEiLCJqb2IiLCJ0cmlnZ2VyIiwiZmluaXNoZWRGbiIsImN1cnJlbnRKb2IiLCJzaGlmdCIsIlR5cGUiLCJsYXllciIsImNhbnZhc1F1ZXVlIiwiZXhlY3V0ZUxheWVyIiwicHJvY2Vzc05leHQiLCJhcHBseUN1cnJlbnRMYXllciIsInBvcENvbnRleHQiLCJsb2FkT3ZlcmxheSIsImV4ZWN1dGVQbHVnaW4iLCJleGVjdXRlRmlsdGVyIiwiZGF0YUFycmF5IiwiYmxvY2tzRG9uZSIsIm4iLCJibG9ja1BpeGVsTGVuZ3RoIiwiQmxvY2tzIiwiYmxvY2tOIiwibGFzdEJsb2NrTiIsInN0YXJ0IiwiZW5kIiwiZWFjaEJsb2NrIiwicmVuZGVyQmxvY2siLCJyZW5kZXJLZXJuZWwiLCJleGVjdXRlIiwiYm51bSIsImJsb2NrTnVtIiwidG90YWxCbG9ja3MiLCJzdGFydFBpeGVsIiwiZW5kUGl4ZWwiLCJwaXhlbCIsInNldENvbnRleHQiLCJwcm9jZXNzRm4iLCJjbGFtcFJHQiIsImJsb2NrRmluaXNoZWQiLCJiaWFzIiwiZGl2aXNvciIsImFkanVzdCIsImFkanVzdFNpemUiLCJzcXJ0Iiwia2VybmVsIiwibWF4IiwibWluIiwiYnVpbGRlciIsImJ1aWxkZXJJbmRleCIsImsiLCJwIiwiZ2V0UGl4ZWxSZWxhdGl2ZSIsInJlcyIsInByb2Nlc3NLZXJuZWwiLCJibG9ja3NGaW5pc2hlZCIsIkltYWdlIiwib25sb2FkIiwiZHJhd0ltYWdlIiwiaW1hZ2VEYXRhIiwiZ2V0SW1hZ2VEYXRhIiwicmVtb3RlQ2hlY2siLCJCbGVuZGVyIiwiYmxlbmRlcnMiLCJyZ2JhTGF5ZXIiLCJyZ2JhUGFyZW50IiwiTGF5ZXIiLCJmaWx0ZXIiLCJvcHRpb25zIiwiYmxlbmRpbmdNb2RlIiwib3BhY2l0eSIsImxheWVySUQiLCJ1bmlxaWQiLCJjYW52YXMiLCJjcmVhdGVFbGVtZW50IiwiZ2V0Q29udGV4dCIsImNyZWF0ZUltYWdlRGF0YSIsImNiIiwibmV3TGF5ZXIiLCJtb2RlIiwicGFyZW50RGF0YSIsImZpbGxDb2xvciIsImFyZ3VtZW50cyIsImltYWdlIiwicmVuZGVyZXIiLCJwaXhlbFN0YWNrIiwibGF5ZXJEYXRhIiwicmVzdWx0IiwidmVyc2lvbiIsInJlbGVhc2UiLCJkYXRlIiwiZ2V0QXR0cmlidXRlIiwiZmluaXNoSW5pdCIsImJpbmQiLCJpbWFnZUxvYWRlZCIsInBhcnNlSW50IiwiZ2V0QXR0cklkIiwiaXNOYU4iLCJoYXMiLCJpbml0aWFsaXplZFBpeGVsRGF0YSIsIm9yaWdpbmFsUGl4ZWxEYXRhIiwiY3JvcENvb3JkaW5hdGVzIiwiY3JvcHBlZCIsInJlc2l6ZWQiLCJsYXllclN0YWNrIiwiY3VycmVudExheWVyIiwic2NhbGVkIiwiYW5hbHl6ZSIsImRvbUlzTG9hZGVkIiwicGFyc2VBcmd1bWVudHMiLCJzZXR1cCIsInJlYWR5U3RhdGUiLCJsaXN0ZW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbml0T2JqIiwiaW5pdFR5cGUiLCJpbWFnZVVybCIsInNldEluaXRPYmplY3QiLCJpbml0SW1hZ2UiLCJpbml0Q2FudmFzIiwiY29weUF0dHJpYnV0ZXMiLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwiaW1hZ2VBZGp1c3RtZW50cyIsIndhaXRGb3JJbWFnZUxvYWRlZCIsImlzUmVtb3RlIiwiaXNJbWFnZUxvYWRlZCIsImNvbXBsZXRlIiwibmF0dXJhbFdpZHRoIiwibmF0dXJhbEhlaWdodCIsImltYWdlV2lkdGgiLCJpbWFnZUhlaWdodCIsIm9yaWdpbmFsV2lkdGgiLCJwcmVTY2FsZWRXaWR0aCIsIm9yaWdpbmFsSGVpZ2h0IiwicHJlU2NhbGVkSGVpZ2h0IiwiaGFzSWQiLCJhc3NpZ25JZCIsImFsbG93UmV2ZXJ0IiwicHV0IiwibmV3Q2FudmFzIiwib2xkQ2FudmFzIiwicmVsb2FkQ2FudmFzRGF0YSIsInB1dEltYWdlRGF0YSIsInVwZGF0ZUNvbnRleHQiLCJvcmlnaW5hbFZpc2libGVQaXhlbHMiLCJjdHgiLCJyZXBsYWNlQ2FudmFzIiwicGl4ZWxzIiwiYWRkIiwicHVzaENvbnRleHQiLCJhcHBseVRvUGFyZW50IiwiYnJvd3NlclNhdmUiLCJ0b0Jhc2U2NCIsInJlcGxhY2UiLCJsb2NhdGlvbiIsImhyZWYiLCJ3aW5kb3ciLCJkZXZpY2VQaXhlbFJhdGlvIiwidG9EYXRhVVJMIiwid3giLCJOb2RlSlMiLCJyZWdpc3RlckJsZW5kZXIiLCJyZWdpc3RlciIsIkNvbnZlcnQiLCJjaGFyQXQiLCJzdWJzdHIiLCJsIiwiaCIsInMiLCJkIiwicSIsImh1ZVRvUkdCIiwidCIsInYiLCJmIiwicG93IiwieiIsIndoaXRlWCIsIndoaXRlWSIsIndoaXRlWiIsInh5eiIsInJnYlRvWFlaIiwieHl6VG9MYWIiLCJDYWxjdWxhdGUiLCJ4MSIsInkxIiwieDIiLCJ5MiIsImdldEZsb2F0IiwicmFuZCIsInJhbmRvbSIsInRvRml4ZWQiLCJyb3VuZCIsImNvbnRyb2xQb2ludHMiLCJsb3dCb3VuZCIsImhpZ2hCb3VuZCIsImJlemllciIsImxlcnAiLCJjbGFtcCIsInByZXYiLCJuZXh0IiwiZW5kWCIsIm1pc3NpbmdWYWx1ZXMiLCJ2YWx1ZXMiLCJrZXlzIiwicmV0IiwibGVmdENvb3JkIiwicmlnaHRDb29yZCIsInJlZ2lzdGVyRmlsdGVyIiwiY29sb3IiLCJoZXhUb1JHQiIsInByb2Nlc3MiLCJhdmciLCJhbXQiLCJhYnMiLCJsdW1pbmFuY2UiLCJoc3YiLCJyZ2JUb0hTViIsImhzdlRvUkdCIiwicmdiIiwibGV2ZWwiLCJyYW5kb21SYW5nZSIsImNoYW4iLCJyZWQiLCJncmVlbiIsImJsdWUiLCJjaGFucyIsImNwcyIsImxhc3QiLCJhbGdvIiwic3BsaXQiLCJjdHJsMSIsImN0cmwyIiwicmV2ZXJzZSIsImN1cnZlcyIsInZpZ25ldHRlRmlsdGVycyIsImJyaWdodG5lc3MiLCJzdHJlbmd0aCIsImdhbW1hIiwiY29sb3JpemUiLCJyZWdpc3RlckNhbWVyYUZpbHRlciIsInNpemUiLCJjZW50ZXIiLCJkaXN0IiwiZGl2IiwibG9jYXRpb25YWSIsImRpc3RhbmNlIiwiZGVmYXVsdHMiLCJkaW0iLCJwZXJjZW50IiwiX2kiLCJfbGVuIiwiX3JlZiIsImNvcm5lclJhZGl1cyIsIm1ldGhvZCIsImV4dGVuZCIsImJhYmVsSGVscGVycy50eXBlb2YiLCJjb29yZHMiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJ0b3AiLCJjb3JuZXJzIiwibWF4RGlzdCIsInJhZGlhbERpc3QiLCJjb3JlcnMiLCJyZWdpc3RlckJsdXJGaWx0ZXIiLCJkZWdyZWVzIiwicmVnaXN0ZXJQb3N0ZXJpemVGaWx0ZXIiLCJudW1PZkFyZWFzIiwibnVtT2ZWYWx1ZXMiLCJyZWdpc3RlclByZXNldEZpbHRlciIsInZpZ25ldHRlIiwiZ3JleXNjYWxlIiwiY29udHJhc3QiLCJub2lzZSIsInNlcGlhIiwiY2hhbm5lbHMiLCJleHBvc3VyZSIsInNhdHVyYXRpb24iLCJncmV5IiwidmlicmFuY2UiLCJzaGFycGVuIiwicG9zdGVyaXplIiwiY2xpcCIsInNldEJsZW5kaW5nTW9kZSIsImNvcHlQYXJlbnQiLCJzdGFja0JsdXIiLCJodWUiLCJCbHVyU3RhY2siLCJtdWxUYWJsZSIsInNoZ1RhYmxlIiwicmVnaXN0ZXJTdGFja0JsdXJQbHVnaW4iLCJyYWRpdXMiLCJiSW5TdW0iLCJiT3V0U3VtIiwiYlN1bSIsImdJblN1bSIsImdPdXRTdW0iLCJnU3VtIiwiaGVpZ2h0TWludXMxIiwibXVsU3VtIiwicGIiLCJwZyIsInByIiwickluU3VtIiwick91dFN1bSIsInJTdW0iLCJyYWRpdXNQbHVzMSIsInJicyIsInNoZ1N1bSIsInN0YWNrIiwic3RhY2tFbmQiLCJzdGFja0luIiwic3RhY2tPdXQiLCJzdGFja1N0YXJ0Iiwic3VtRmFjdG9yIiwid2lkdGhNaW51czEiLCJ5aSIsInlwIiwieXciLCJfaiIsIl9rIiwiX2wiLCJfbSIsIl9uIiwiX28iLCJfcCIsIl9xIiwicmVnaXN0ZXJTdGFja0JsdXJGaWx0ZXIiLCJwcm9jZXNzUGx1Z2luIiwicmVnaXN0ZXJQbHVnaW4iLCJyZWdpc3RlclBsdWdpbkZpbHRlciIsInJlZ2lzdHJlclBvc3Rlcml6ZUZpbHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQ0EsSUFBTUEsaUJBQWlCLENBQUMsVUFBRCxFQUFhLFVBQWIsQ0FBdkI7O0VBRUE7Ozs7Ozs7Ozs7OztNQVdxQkM7Ozs7Ozs7O0VBQ25CO2tDQUNnQkMsS0FBSztFQUNuQixXQUFLLElBQUlDLEdBQVQsSUFBZ0JELEdBQWhCLEVBQXFCO0VBQ25CLFlBQUlGLGVBQWVJLE9BQWYsS0FBMkIsQ0FBQyxDQUFoQyxFQUFtQztFQUNqQyxlQUFLRCxHQUFMLElBQVlELElBQUlDLEdBQUosQ0FBWjtFQUNEO0VBQ0Y7RUFDREQsVUFBSUcsUUFBSixJQUFnQkgsSUFBSUcsUUFBSixDQUFhQyxLQUFiLENBQW1CLElBQW5CLENBQWhCO0VBQ0EsYUFBTyxJQUFQO0VBQ0Q7O0VBRUQ7Ozs7K0JBQ2lCSixLQUFLO0VBQ3BCLFdBQUssSUFBSUMsR0FBVCxJQUFnQkQsR0FBaEIsRUFBcUI7RUFDbkIsWUFBSUYsZUFBZUksT0FBZixLQUEyQixDQUFDLENBQWhDLEVBQW1DO0VBQ2pDLGVBQUtHLFNBQUwsQ0FBZUosR0FBZixJQUFzQkQsSUFBSUMsR0FBSixDQUF0QjtFQUNEO0VBQ0Y7RUFDREQsVUFBSU0sUUFBSixJQUFnQk4sSUFBSU0sUUFBSixDQUFhRixLQUFiLENBQW1CLElBQW5CLENBQWhCO0VBQ0EsYUFBTyxJQUFQO0VBQ0Q7O0VBRUQ7RUFDQTs7OztpQ0FDMEI7RUFBQSx3Q0FBTkcsSUFBTTtFQUFOQSxZQUFNO0VBQUE7O0VBQ3hCLFVBQU1DLFNBQVNELEtBQUtFLEdBQUwsRUFBZjtFQUNBLFdBQUssSUFBSUMsQ0FBVCxJ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RUFBcE4sRUFBd04sRUFBeE4sRUFBNE4sRUFBNU4sRUFBZ08sRUFBaE8sRUFBb08sRUFBcE8sRUFBd08sRUFBeE8sRUFBNE8sRUFBNU8sRUFBZ1AsRUFBaFAsRUFBb1AsRUFBcFAsRUFBd1AsRUFBeFAsRUFBNFAsRUFBNVAsRUFBZ1EsRUFBaFEsRUFBb1EsRUFBcFEsRUFBd1EsRUFBeFEsRUFBNFEsRUFBNVEsRUFBZ1IsRUFBaFIsRUFBb1IsRUFBcFIsRUFBd1IsRUFBeFIsRUFBNFIsRUFBNVIsRUFBZ1MsRUFBaFMsRUFBb1MsRUFBcFMsRUFBd1MsRUFBeFMsRUFBNFMsRUFBNVMsRUFBZ1QsRUFBaFQsRUFBb1QsRUFBcFQsRUFBd1QsRUFBeFQsRUFBNFQsRUFBNVQsRUFBZ1UsRUFBaFUsRUFBb1UsRUFBcFUsRUFBd1UsRUFBeFUsRUFBNFUsRUFBNVUsRUFBZ1YsRUFBaFYsRUFBb1YsRUFBcFYsRUFBd1YsRUFBeFYsRUFBNFYsRUFBNVYsRUFBZ1csRUFBaFcsRUFBb1csRUFBcFcsRUFBd1csRUFBeFcsRUFBNFcsRUFBNVcsRUFBZ1gsRUFBaFgsRUFBb1gsRUFBcFgsRUFBd1gsRUFBeFgsRUFBNFgsRUFBNVgsRUFBZ1ksRUFBaFksRUFBb1ksRUFBcFksRUFBd1ksRUFBeFksRUFBNFksRUFBNVksRUFBZ1osRUFBaFosRUFBb1osRUFBcFosRUFBd1osRUFBeFosRUFBNFosRUFBNVosRUFBZ2EsRUFBaGEsRUFBb2EsRUFBcGEsRUFBd2EsRUFBeGEsRUFBNGEsRUFBNWEsRUFBZ2IsRUFBaGIsRUFBb2IsRUFBcGIsRUFBd2IsRUFBeGIsRUFBNGIsRUFBNWIsRUFBZ2MsRUFBaGMsRUFBb2MsRUFBcGMsRUFBd2MsRUFBeGMsRUFBNGMsRUFBNWMsRUFBZ2QsRUFBaGQsRUFBb2QsRUFBcGQsRUFBd2QsRUFBeGQsRUFBNGQsRUFBNWQsRUFBZ2UsRUFBaGUsRUFBb2UsRUFBcGUsRUFBd2UsRUFBeGUsRUFBNGUsRUFBNWUsRUFBZ2YsRUFBaGYsRUFBb2YsRUFBcGYsRUFBd2YsRUFBeGYsRUFBNGYsRUFBNWYsRUFBZ2dC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
