export default function registerPosterizeFilter (Filter) {
  Filter.register('posterize', function (adjust) {
    var numOfAreas, numOfValues
    numOfAreas = 256 / adjust
    numOfValues = 255 / (adjust - 1)
    this.process('posterize', function (rgba) {
      rgba.r = Math.floor(Math.floor(rgba.r / numOfAreas) * numOfValues)
      rgba.g = Math.floor(Math.floor(rgba.g / numOfAreas) * numOfValues)
      rgba.b = Math.floor(Math.floor(rgba.b / numOfAreas) * numOfValues)
      return rgba
    })
  })
}
