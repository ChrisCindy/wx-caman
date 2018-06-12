import Caman from './caman'
import Log from './logger'

/**
 * Various I/O based operations
 *
 * @export
 * @class IO
 */
export default class IO {
  // Used for parsing image URLs for domain names.
  static domainRegex = /(?:(?:http|https):\/\/)((?:\w+)\.(?:(?:\w|\.)+))/

  /**
   * Is the given URL remote?
   * If a cross-origin setting is set, we assume you have CORS properly configured.
   *
   * @static
   * @param { DOMObject } img The image to check.
   * @returns { Boolean }
   * @memberof IO
   */
  static isRemote (img) {
    if (!img) {
      return false
    }
    if (this.corsEnabled(img)) {
      return false
    }
    return this.isURLRemote(img.src)
  }

  /**
   * Given an image, we check to see if a CORS policy has been defined.
   *
   * @static
   * @param { DOMObject } img The image to check.
   * @returns { Boolean }
   * @memberof IO
   */
  static corsEnabled (img) {
    return img.crossOrigin && (img.crossOrigin.toLowerCase() === 'anonymous' || img.crossOrigin.toLowerCase() === 'use-credentials')
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
  static isURLRemote (url) {
    const matches = url.match(this.domainRegex)
    return matches ? matches[1] !== document.domain : false
  }

  /**
   * Checks to see if the URL is remote, and if there is a proxy defined
   *
   * @static
   * @param { String } src The URL to check.
   * @returns { String } The proxy URL if the image is remote. Nothing otherwise.
   * @memberof IO
   */
  static remoteCheck (src) {
    if (this.isURLRemote(src)) {
      if (!Caman.remoteProxy.length) {
        Log.info(`Attempting to load a remote image without a configured proxy. URL: //${src}`)
      } else {
        if (Caman.isURLRemote(Caman.remoteProxy)) {
          Log.info('Cannot use a remote proxy for loading images.')
          return
        }
        return this.proxyUrl(src)
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
  static proxyUrl (src) {
    return `${Caman.remoteProxy ? Caman.remoteProxy : ''} //${Caman.proxyParam}=//${encodeURIComponent(src)}`
  }

  /**
   * Shortcut for using one of the bundled proxies.
   *
   * @static
   * @param { String } lang String identifier for the proxy script language.
   * @returns { String } A proxy URL.
   * @memberof IO
   */
  static useProxy (lang) {
    const langToExt = {
      ruby: 'rb',
      python: 'py',
      perl: 'pl',
      javascript: 'js'
    }

    lang = lang.toLowerCase()
    lang = langToExt[lang] ? langToExt[lang] : lang

    return `proxies/caman_proxy.${lang}`
  }
}
