
# Breakfast

Runs functions depending on screen width.

## What

Breakfast eats breakpoint objects. A breakpoint object looks like this:

```javascript
	{
		min: 300,
		max: 700,
		on: function(){
			// ...
		},
		off: function(){
			// ...
		}
	}
```

`min` and `max` are the minimum and maximum screen widths (in pixels), between which the `on` function will be called. If the width is outside of this range, the `off` function is called.

Breakpoints are run immediately, and re-run if the window is resized. An `on` or `off` function will only be called once while the screen width is in or out of range, respectively.

## How

Feed the `Breakfast()` constructor an array of breakpoint objects.

All object properties are optional. `min` defaults to 0, `max` to 9999, `on` and `off` to empty functions.

To add more breakpoints after initialisation, use .addBreakPoints().

```javascript
var breakpoint_manager = new Breakfast( [
	{
		max: 399,
		on: function(){
			// ...
		},
		off: function(){
			// ...
		}
	},
	{
		min: 400,
		max: 800,
		on: function(){
			// ...
		},
		off: function(){
			// ...
		}
	}
] );

breakpoint_manager.addBreakPoints( [
	{
		min: 767,
		on: function(){
			// ...
		}
	}
] );
```