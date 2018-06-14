/**
 * Event system that can be used to register callbacks that get fired during certain times in the render process.
 *
 * @export
 * @class Event
 */
export default class Event {
  static events = {}
  // All of the supported event types
  static types = [
    'processStart',
    'processComplete',
    'renderStart',
    'renderFinished',
    'blockStarted',
    'blockFinished',
    '_pixelDataReady'
  ]

  /**
   * Trigger an event.
   *
   * @static
   * @param { Caman } target Instance of Caman emitting the event.
   * @param { String } type The event type.
   * @param { Object } [data=null] Extra data to send with the event.
   * @memberof Event
   */
  static trigger (target, type, data = null) {
    if (this.events[type] && this.events[type].length) {
      for (let i in this.events[type]) {
        let event = this.events[type][i]
        if (event.target === null || target.id === event.target.id) {
          event.fn.call(target, data)
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
  static listen (target, type, fn) {
    // Adjust arguments if target is omitted
    if (typeof target === 'string') {
      const _type = target
      const _fn = type

      target = null
      type = _type

      fn = _fn
    }

    // Validation
    if (this.types.indexOf(type) === -1) {
      return false
    }

    if (!this.events[type]) {
      this.events[type] = []
    }
    this.events[type].push({target, fn})
    return true
  }
}
