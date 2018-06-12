/**
 * Stores and registers standalone plugins
 *
 * @export
 * @class Plugin
 */
export default class Plugin {
  static plugins = {}

  static register (name, plugin) {
    this.plugins[name] = plugin
  }

  static execute (context, name, args) {
    this.plugins[name].apply(context, args)
  }
}
