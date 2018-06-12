import Caman from './caman'

/**
 * Responsible for registering and storing all of the filters.
 *
 * @export
 * @class Filter
 */
export default class Filter {
  // All of the different render operatives
  static Type = {
    Single: 1,
    Kernel: 2,
    LayerDequeue: 3,
    LayerFinished: 4,
    LoadOverlay: 5,
    Plugin: 6
  }

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
