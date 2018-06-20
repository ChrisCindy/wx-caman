const Config = {
  // Debug mode enables console logging.
  DEBUG: false,
  // All of the different render operatives
  FILTER_TYPE: {
    Single: 1,
    Kernel: 2,
    LayerDequeue: 3,
    LayerFinished: 4,
    LoadOverlay: 5,
    Plugin: 6
  }
}

export default Config
