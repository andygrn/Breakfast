// @andygrn 2013
function Breakfast( breakpoint_array ){
	this.breakpoints = [];
	this.addBreakPoints( breakpoint_array );
	var _self = this;
	window.addEventListener( 'resize', function(){
		_self.checkBreaks();
	} );
}

Breakfast.prototype.addBreakPoints = function( breakpoint_array ){
	var breakpoint;
	for( var i = 0, b; b = breakpoint_array[i]; i += 1 ){
		if( !b.on && !b.off ){
			continue;
		}
		breakpoint = {
			min: b.min || 0,
			max: b.max || 9999,
			f_on: this.createBreakerFunction( b.on || function(){} ),
			f_off: this.createBreakerFunction( b.off || function(){} )
		};
		this.breakpoints.push( breakpoint );
	}
	this.checkBreaks();
};

Breakfast.prototype.checkBreaks = function(){
	var window_width = window.innerWidth;
	for( var i = 0, b; b = this.breakpoints[i]; i += 1 ){
		if( window_width >= b.min && window_width <= b.max ){
			b.f_off.reset();
			b.f_on();
		}
		else{
			b.f_on.reset();
			b.f_off();
		}
	}
};

Breakfast.prototype.createBreakerFunction = function( func ){
	var wrap = function(){
		if( !wrap.called ){
			wrap.called = true;
			func.apply( func, arguments );
		}
	};
	wrap.reset = function(){
		this.called = false;
	};
	return wrap;
};