
const moduleKeywords = ['extended', 'included']

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
export default class Module {
  // Extend the base object itself like a static method
  static extends (obj) {
    for (let key in obj) {
      if (moduleKeywords.indexOf === -1) {
        this[key] = obj[key]
      }
    }
    obj.extended && obj.extended.apply(this)
    return this
  }

  // Include methods on the object prototype
  static includes (obj) {
    for (let key in obj) {
      if (moduleKeywords.indexOf === -1) {
        this.prototype[key] = obj[key]
      }
    }
    obj.included && obj.included.apply(this)
    return this
  }

  // Add methods on this prototype that point to another method
  // on another object's prototype.
  static delegate (...args) {
    const target = args.pop()
    for (let i in args) {
      const source = args[i]
      this.prototype[source] = target.prototype[source]
    }
  }

  // Create an alias for a function
  static aliasFunction (to, from) {
    this.prototype[to] = (...args) => {
      this.prototype[from].apply(this, args)
    }
  }

  // Create an alias for a property
  static aliasProperty (to, from) {
    Object.defineProperty(this.prototype, to, {
      get() {
        return this[from]
      },
      set (val) {
        this[from] = val
      }
    })
  }

  // Execute a function in the context of the object,
  // and pass a reference to the object's prototype.
  static included (func) {
    func.call(this, this.prototype)
  }
}
