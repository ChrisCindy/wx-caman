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

  // Look what you make do Javascript

  // DOM simplifier (no jQuery dependency)
  // NodeJS compatible
  var $$1 = function $(sel) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    if ((typeof sel === 'undefined' ? 'undefined' : _typeof(sel)) === 'object' || typeof exports !== 'undefined') {
      return el;
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
      value: function putPixelRelative(hiriz, vert, rgba) {
        if (!this.c) {
          throw new Error('Requires a CamanJS context');
        }

        var nowLoc = this.loc + this.c.dimensions.width * 4 * (vert * -1) + 4 * horiz;

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
            return;
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

        for (var i = 0; i < Renderer.Blocks; i++) {

          setTimeout(function (i, start, end) {
            fn.call(_this, i, start, end);
          }, 0);
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
        var name = this.currentJob.name;
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
          Log.debug('Block ##{bnum} finished! Filter: #{@currentJob.name}');
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

        var img = new Image();
        img.onload = function () {
          layer.context.drawImage(img, 0, 0, _this2.c.dimensions.width, _this2.c.dimensions.height);
          layer.imageData = layer.context.getImageData(0, 0, _this2.c.dimensions.width, _this2.c.dimensions.height);
          layer.pixelData = layer.imageData.data;

          _this2.c.pixelData = layer.pixelData;

          _this2.processNext();
        };

        var proxyUrl = IO.remoteCheck(src);
        img.src = proxyUrl ? proxyUrl : src;
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
      this.filter = c;

      this.options = {
        blendingMode: 'normal',
        opacity: 1.0

        // Each layer gets its own unique ID
      };this.layerID = Util.uniqid().get();

      // Create the canvas for this layer
      this.canvas = typeof exports !== 'undefined' ? new Canvas() : document.createElement('canvas');

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
        this.c.newLayer.call(this.c, cb);
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

  // wechat mini program env

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
          canvas = $$1(canvas);
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
          this.initObj = $$1(obj);
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
        switch (this.initType) {
          case 'node':
            this.initNode();
          case 'img':
            this.initImage();
          case 'canvas':
            this.initCanvas();
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

        this.callback.call(this, this);

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
          this.pixelData[i] = pixel;
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
    }, {
      key: 'nodeSave',
      value: function nodeSave(file) {
        var _this4 = this;

        var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        try {
          var stats = fs.statSync(file);
          if (stats.isFile() && !overwrite) {
            return false;
          }
        } catch (e) {
          Log.debug('Creating output file ' + file);
        }

        fs.writeFile(file, this.canvas.toBuffer(), function (err) {
          Log.debug('Finished writing to ' + file);
          if (callback) {
            callback.call(_this4, err);
          }
        });
      }

      /*
       * Takes the current canvas data, converts it to Base64, then sets it as the source of a new Image object and returns it.
       */

    }, {
      key: 'toImage',
      value: function toImage(type) {
        var img = new Image();
        img.src = this.toBase64(type);
        img.width = this.dimensions.width;
        img.height = this.dimensions.height;

        if (window.devicePixelRatio) {
          img.width /= window.devicePixelRatio;
          img.height /= windwo.devicePixelRatio;
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
    value: false
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
    value: "camanProxyUrl"
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

        endX = controlPoints[controlPoints.length - 1][0];
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
          for (var i = 0; i <= endX; i++) {
            if (values[i]) {
              ret[i] = values[i];
            } else {
              var leftCoord = [i - 1, ret[i - 1]];
              // Find the first value to the right. Ideally this loop will break
              // very quickly.
              for (var j = i; j <= endX; j++) {
                if (values[j]) {
                  var _rightCoord = [j, values[j]];
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

        h = hsv.h * 100;
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
        if (options.hasOwnproperty(chan)) {
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

  registerBlender(Blender);
  registerFilter(Filter);

  return Caman;

})));
