Flotr.BoxPlotLabelFormatter = (number) ->
  return number

Flotr.addType 'box_plot',
  options:
    show: false
    lineWidth: 1
    candleWidth: 0.6
    fill: true
    fillColor: "#00A8F0"
    outlierColor: "#ee3333"
    fillOpacity: 0.5
    barcharts: false
    treshold: 2000
    outlierRadius: 3
    outlierFontSize: 12
    labelFormatter: Flotr.BoxPlotLabelFormatter
    showLabels: true

  draw: (options) ->
    context = options.context
    context.save()
    context.lineJoin  = "miter"  # no idea, copied from candles
    context.lineCap   = "butt"
    context.lineWidth = options.lineWidth
    @plot options
    context.restore()

  plot: (options) ->
    data    = options.data
    context = options.context
    xScale  = options.xScale
    yScale  = options.yScale
    width   = options.candleWidth / 2
    shadowSize    = options.shadowSize
    pixelOffset   = (options.lineWidth % 2) / 2
    color   = undefined
    datum   = undefined
    x       = undefined
    y       = undefined
    open    = undefined
    high    = undefined
    low     = undefined
    close   = undefined
    left    = undefined
    right   = undefined
    bottom  = undefined
    top     = undefined
    bottom2 = undefined
    top2    = undefined
    i       = undefined
    return  if data.length < 1
    i = 0
    while i < data.length

      # BOX:  open -> open + close
      datum                = data[i]
      x                    = datum[0]
      median               = datum[1]
      high                 = datum[2]
      low                  = datum[3]
      lower_quart          = datum[4]
      upper_quart          = datum[5]
      outliers             = datum[6]
      left                 = xScale(x - width)
      right                = xScale(x + width)
      bottom               = yScale(low)     # global Minimum
      top                  = yScale(high)    # global Maximum
      bottom2              = yScale(lower_quart)
      top2                 = yScale(upper_quart)
      color                = options["fillColor"]
      scaledMedian = yScale(median)
      # quartil box between 0.25 and 0.75 quartil
      if options.fill
        context.fillStyle = "rgba(0,0,0,0.05)"
        context.fillRect left + shadowSize, top2 + shadowSize, right - left, bottom2 - top2
        context.save()
        context.globalAlpha = options.fillOpacity
        context.fillStyle = color
        context.fillRect left, top2 + width, right - left, bottom2 - top2
        context.restore()

      if options.lineWidth
        x = Math.floor((left + right) / 2) + pixelOffset
        # border for quartil box
        context.strokeStyle = color
        context.beginPath()
        context.strokeRect left, top2 + width, right - left, bottom2 - top2
        context.moveTo x, Math.floor(top2 + width)
        context.lineTo x, Math.floor(top + width)
        context.moveTo x, Math.floor(bottom2 + width)
        context.lineTo x, Math.floor(bottom + width)

        # median line
        context.moveTo left, scaledMedian
        context.lineTo right, scaledMedian

        # whiska max line
        context.moveTo left, top
        context.lineTo right, top

        # whiska min line
        context.moveTo left, bottom
        context.lineTo right, bottom
        context.closePath()
        context.stroke()
      # labels for whiskas and median
      if options.showLabels
        fontSize = options.outlierFontSize
        context.strokeStyle = "#333333"
        context.lineWidth = 0.8
        context.font = "#{fontSize}px sans-serif"
        context.beginPath()
        context.strokeText options.labelFormatter(high), left, top + fontSize , xScale(width)
        context.strokeText options.labelFormatter(low), left, bottom - 2 , xScale(width)
        context.strokeText options.labelFormatter(median), x + 3, scaledMedian - 3 , xScale(width / 2)
        context.closePath()
        context.stroke()

      # each outlier as dot
      for outlier in outliers
        y = yScale(outlier)
        # shadow
        context.beginPath()
        context.fillStyle = "#aaaaaa"
        context.arc(x + 1, y + 1, options.outlierRadius, 0, 2 * Math.PI, true)
        context.fill()
        context.stroke()
        context.closePath()

        context.beginPath()
        context.arc(x, y, options.outlierRadius, 0, 2 * Math.PI, true)
        context.fillStyle = options.outlierColor
        context.fill()
        context.stroke()
        context.closePath()

      i++

  extendXRange: (axis, data, options) ->
    if axis.options.max is null
      axis.max = Math.max(axis.datamax + 0.5, axis.max)
      axis.min = Math.min(axis.datamin - 0.5, axis.min)



  #TODO Hit Box bei hover ueber Whiskas
  #hit: (options) ->
