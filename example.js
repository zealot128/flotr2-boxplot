options = {
  box_plot: {
    show: true,
    fillColor: "#00b8e0"
  },
  title: "Fake Data Euro per Capita",
  xaxis: {
    ticks: [
			[0, "Germany"],
			[1, "USA"]
		],
	},

  yaxis: {
    tickFormatter: function(data) {
      return String(data).replace(/(d*)(\d{3})$/,"$1.$2") + " &euro;"
    },
    minorTickFreq: 25,
    noTicks: 10,
    min: 0,
    max: 60000
  },
  mouse: {
    track: true,
    relative: true,
    radius: 10000,
    sensibility: 50,
    trackFormatter: function(a) {
      return "Median: " + a.y + " EUR";
  },
  }
}
counts = [
	// idx , median , whiskaMax , whiskaMin , 0.25 quart , 0.75 quart , [outliers]
	[   0 , 34000  , 42000     , 22000     , 25000      , 35000      , [7000,9500,50000,55000] ],
	[   1 , 30000  , 50000     , 4000     , 22000      , 40000      , [7200,9120,50500,55000,59000,58000,57000] ]
	]


element = document.getElementById("chart")
Flotr.draw( element, [counts], options);

