/**
 * Used for storing instances of CamanInstance objects such that, when Caman() is called on an already initialized element, it returns that object instead of re-initializing.
 *
 * @export
 * @class Store
 */
export default class Store {
  static items = {}

  static has (search) {
    return !!this.items[search]
  }

  static get (search) {
    return this.items[search]
  }

  static put (name, obj) {
    this.items[name] = obj
  }

  static execute (search, callback) {
    setTimeout(() => {
      callback.call(this.get(search), this.get(search))
    }, 0)

    return this.get(search)
  }

  static flush (name = false) {
    if (name) {
      delete this.items[name]
    } else {
      this.items = {}
    }
  }
}
