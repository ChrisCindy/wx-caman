# wxCaman

[![Build Status](https://travis-ci.com/ChrisCindy/wxCaman.svg?branch=master)](https://travis-ci.com/ChrisCindy/wxCaman)

> 基于 [CamanJS](https://github.com/meltingice/CamanJS) 的微信小程序 Canvas 像素级滤镜处理库

## 介绍

由于微信小程序中的 canvas 组件与 DOM Canvas 元素有较大差异，因此传统的 Canvas 处理库几乎无法在小程序中使用。WxCaman 由 [CamanJS](https://github.com/meltingice/CamanJS) 封装而来并针对微信小程序进行了适配。其使用基本与 CamanJS 保持一致，能够对小程序中的 canvas 进行像素级别的图像滤镜处理。

## 安装

### npm

在 [mpvue](https://github.com/Meituan-Dianping/mpvue) 等支持 npm 的小程序开发框架中，可以直接使用 npm 进行安装：
```shell
npm install WxCaman
```
然后在项目中引入：
```js
// es6 modules
import WxCaman from 'wxCaman'

// or cjs
var WxCaman = require('WxCaman').default
```

### 直接引入文件

将当前 repo 中 `dist/` 目录下的 `wxCaman.min.js` 文件直接拷贝至你的小程序项目中的 `vendor` 目录下，然后在项目中引入：
```js
var WxCaman = require('vendor/wxCaman.min.js').default
```


## 快速开始

小程序对于 canvas 组件限制较多，详情参考[官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html#canvas)。在使用 WxCaman 前，我们必须在 WXML 中定义 canvas 组件并且设置 canvas-id。

```html
<canvas style="width: 300px; height: 200px;" canvas-id="firstCanvas"></canvas>
```

```js
Page({
  onReady: function (e) {
    // 使用 wx.createContext 获取绘图上下文 context
    var context = wx.createCanvasContext('firstCanvas')

    context.setStrokeStyle('#00ff00')
    context.setLineWidth(5)
    context.rect(0, 0, 200, 200)
    context.stroke()
    context.setStrokeStyle('#ff0000')
    context.setLineWidth(2)
    context.moveTo(160, 100)
    context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    context.draw(false, function() {
      new WxCaman('firstCanvas', 300, 200, function () {
        this.brightness(10)
        this.contrast(30)
        this.sepia(60)
        this.saturation(-30)
        this.render()
      })
    })
  }
})
```

## 进阶使用
此处文档可直接参考 CamanJS 文档：[AsvancedUsage](http://camanjs.com/guides/#AdvancedUsage)

注：wxCaman 不支持 Cropping/Resizing 和 Events。

## 内置函数
此处文档可直接参考 CamanJS 文档：[Built-In Functionality](http://camanjs.com/guides/#BuiltIn)

支持基础滤镜如下：
- Brightness
- Channels
- Clip
- Colorize
- Contrast
- Curves
- Exposure
- Fill Color
- Gamma
- Greyscale
- Hue
- Invert
- Noise
- Saturation
- Sepia
- Vibrance

## 预设滤镜
wxCaman 支持以下预设滤镜：
- vintage
- lomo
- sinCity
- sunrise
- crossProcess
- orangePeel
- love
- grungy
- pinhole
- oldBoot
- glowingSun
- hazyDays
- herMajesty
- nostalgia
- hemingway

其中，`vintage/lomo/sunrise/grungy/pinhole/oldBoot/glowingSun/hazyDays/nostalgia` 可接收一个 Boolean 参数，表示是否使用晕映效果，默认为 true，即使用晕映效果。

使用示例：
```
new WxCaman('firstCanvas', 300, 200, function () {
  this.lomo(false)
  this.render()
})
```


## 注意事项
- 为了确保 wxCaman 准确获取 canvas 组件的像素数据，请务必在 draw 的回调函数中使用 wxCaman
- wxCaman 需要获取到 canvas 组件的真实宽高。但在实际使用中 canvas 组件可能使用了 `width: 90%` 等相对宽高数值，此时可使用 `wx.createSelectorQuery()` 来获取到 canvas 组件渲染后的实际宽高，然后再进行 wxCaman 的初始化
