import Config from './config'
/**
 * Simple console logger class that can be toggled on and off based on Caman.DEBUG
 *
 * @class Logger
 */
class Logger {
  constructor () {
    const logLevel = ['log', 'info', 'warn', 'error']
    for (let i in logLevel) {
      const name = logLevel[i]
      this[name] = (...args) => {
        if (!Config.DEBUG) {
          return
        }
        try {
          console[name].apply(console, args)
        } catch (e) {
          // We're probably using IE9 or earlier
          console[name](args)
        }
      }
    }
    this.debug = this.log
  }
}

const Log = new Logger()
export default Log
