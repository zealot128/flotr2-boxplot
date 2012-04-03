Flotr.BoxPlotLabelFormatter = function(number) {
  return number;
};
Flotr.addType('box_plot', {
  options: {
    show: false,
    lineWidth: 1,
    candleWidth: 0.6,
    fill: true,
    fillColor: "#00A8F0",
    outlierColor: "#ee3333",
    fillOpacity: 0.5,
    barcharts: false,
    treshold: 2000,
    outlierRadius: 3,
    outlierFontSize: 12,
    labelFormatter: Flotr.BoxPlotLabelFormatter,
    showLabels: true
  },
  draw: function(options) {
    var context;
    context = options.context;
    context.save();
    context.lineJoin = "miter";
    context.lineCap = "butt";
    context.lineWidth = options.lineWidth;
    this.plot(options);
    return context.restore();
  },
  plot: function(options) {
    var bottom, bottom2, close, color, context, data, datum, fontSize, high, i, left, low, lower_quart, median, open, outlier, outliers, pixelOffset, right, scaledMedian, shadowSize, top, top2, upper_quart, width, x, xScale, y, yScale, _i, _len, _results;
    data = options.data;
    context = options.context;
    xScale = options.xScale;
    yScale = options.yScale;
    width = options.candleWidth / 2;
    shadowSize = options.shadowSize;
    pixelOffset = (options.lineWidth % 2) / 2;
    color = void 0;
    datum = void 0;
    x = void 0;
    y = void 0;
    open = void 0;
    high = void 0;
    low = void 0;
    close = void 0;
    left = void 0;
    right = void 0;
    bottom = void 0;
    top = void 0;
    bottom2 = void 0;
    top2 = void 0;
    i = void 0;
    if (data.length < 1) {
      return;
    }
    i = 0;
    _results = [];
    while (i < data.length) {
      datum = data[i];
      x = datum[0];
      median = datum[1];
      high = datum[2];
      low = datum[3];
      lower_quart = datum[4];
      upper_quart = datum[5];
      outliers = datum[6];
      left = xScale(x - width);
      right = xScale(x + width);
      bottom = yScale(low);
      top = yScale(high);
      bottom2 = yScale(lower_quart);
      top2 = yScale(upper_quart);
      color = options["fillColor"];
      scaledMedian = yScale(median);
      if (options.fill) {
        context.fillStyle = "rgba(0,0,0,0.05)";
        context.fillRect(left + shadowSize, top2 + shadowSize, right - left, bottom2 - top2);
        context.save();
        context.globalAlpha = options.fillOpacity;
        context.fillStyle = color;
        context.fillRect(left, top2 + width, right - left, bottom2 - top2);
        context.restore();
      }
      if (options.lineWidth) {
        x = Math.floor((left + right) / 2) + pixelOffset;
        context.strokeStyle = color;
        context.beginPath();
        context.strokeRect(left, top2 + width, right - left, bottom2 - top2);
        context.moveTo(x, Math.floor(top2 + width));
        context.lineTo(x, Math.floor(top + width));
        context.moveTo(x, Math.floor(bottom2 + width));
        context.lineTo(x, Math.floor(bottom + width));
        context.moveTo(left, scaledMedian);
        context.lineTo(right, scaledMedian);
        context.moveTo(left, top);
        context.lineTo(right, top);
        context.moveTo(left, bottom);
        context.lineTo(right, bottom);
        context.closePath();
        context.stroke();
      }
      if (options.showLabels) {
        fontSize = options.outlierFontSize;
        context.strokeStyle = "#333333";
        context.lineWidth = 0.8;
        context.font = "" + fontSize + "px sans-serif";
        context.beginPath();
        context.strokeText(options.labelFormatter(high), left, top + fontSize, xScale(width));
        context.strokeText(options.labelFormatter(low), left, bottom - 2, xScale(width));
        context.strokeText(options.labelFormatter(median), x + 3, scaledMedian - 3, xScale(width / 2));
        context.closePath();
        context.stroke();
      }
      for (_i = 0, _len = outliers.length; _i < _len; _i++) {
        outlier = outliers[_i];
        y = yScale(outlier);
        context.beginPath();
        context.fillStyle = "#aaaaaa";
        context.arc(x + 1, y + 1, options.outlierRadius, 0, 2 * Math.PI, true);
        context.fill();
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(x, y, options.outlierRadius, 0, 2 * Math.PI, true);
        context.fillStyle = options.outlierColor;
        context.fill();
        context.stroke();
        context.closePath();
      }
      _results.push(i++);
    }
    return _results;
  },
  extendXRange: function(axis, data, options) {
    if (axis.options.max === null) {
      axis.max = Math.max(axis.datamax + 0.5, axis.max);
      return axis.min = Math.min(axis.datamin - 0.5, axis.min);
    }
  }
});