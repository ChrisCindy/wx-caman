export default function registerBlurFilter (Filter) {
  Filter.register('boxBlur', function () {
    this.processKernel('Box Blur', [1, 1, 1, 1, 1, 1, 1, 1, 1])
  })

  Filter.register('heavyRadialBlur', function () {
    this.processKernel('Heavy Radial Blur', [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0])
  })

  Filter.register('gaussianBlur', function () {
    this.processKernel('Gaussian Blur', [1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, 36, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1])
  })

  Filter.register('motionBlur', function (degrees) {
    let kernel
    if (degrees === 0 || degrees === 180) {
      kernel = [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0]
    } else if ((degrees > 0 && degrees < 90) || (degrees > 180 && degrees < 270)) {
      kernel = [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0]
    } else if (degrees === 90 || degrees === 270) {
      kernel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    } else {
      kernel = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]
    }
    this.processKernel('Motion Blur', kernel)
  })

  Filter.register('sharpen', function (amt = 100) {
    amt /= 100
    this.processKernel('Sharpen', [0, -amt, 0, -amt, 4 * amt + 1, -amt, 0, -amt, 0])
  })
}
