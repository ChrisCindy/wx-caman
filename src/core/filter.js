import Caman from './caman'

/**
 * Responsible for registering and storing all of the filters.
 *
 * @export
 * @class Filter
 */
export default class Filter {
  /**
   * Registers a filter function.
   *
   * @static
   * @param { String } name The name of the filter.
   * @param { Function } filterFunc The filter function.
   * @memberof Filter
   */
  static register (name, filterFunc) {
    Caman.prototype[name] = filterFunc
  }
}
