{exec} = require 'child_process'

task 'build', 'build js from coffee', (options) ->
  for x in ['./flotr2_box_plot.coffee']
    exec "coffee -c -b #{x}"

