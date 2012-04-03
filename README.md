## Statistic Box plot chart plugin for flotr2 js library.


Checkout [Wikipedia](http://en.wikipedia.org/wiki/Box_plot) for more information on box plots, terms and calculations.


```javascript

options = {
  box_plot: {
    show: true,
    fillColor: "#00b8e0"
  }, ...
}
// precalulcate median, max, min, whiskas, outliers before

counts = [
	// idx , median , whiskaMax , whiskaMin , 0.25 quart , 0.75 quart , [outliers]
	[   0 , 34000  , 42000     , 22000     , 25000      , 35000      , [7000,9500,50000,55000] ],
	[   1 , 30000  , 50000     , 4000     , 22000      , 40000      , [7200,9120,50500,55000,59000,58000,57000] ]
	]
element = document.getElementById("chart")
Flotr.draw( element, [counts], options);

```

This script expects precalculated data. It consumes 7-tuples, consist of:
* index (for reference with x-axis labels)
* median
* top whiska, the top bar
* bottom whiska, the bottom bar
* 0.25 quartil, the lower quartil
* 0.75 quartil, the upper quartil
* outliers: array of numbers, that are classified as outliers and therefore drawn as a dot




### todo
* under development.
* missing good mouse tracking for whiska-values
