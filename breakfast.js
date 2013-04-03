// @andygrn 2013
function Breakfast( breakpoint_array ){
	this.breakpoints = [];
	if( breakpoint_array ){
		this.addBreakPoints( breakpoint_array );
	}
	var _self = this;
	var event_handler = function(){
		_self.checkBreaks();
	};
	if( window.addEventListener ){
		window.addEventListener( 'resize', event_handler, false );
	}
	else if( window.attachEvent ){
		window.attachEvent( 'onresize', event_handler );
	}
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
	var window_width = window.innerWidth || document.documentElement.clientWidth;
	var offs = [];
	var ons = [];
	for( var i = 0, b; b = this.breakpoints[i]; i += 1 ){
		if( window_width >= b.min && window_width <= b.max ){
			b.f_off.reset();
			ons.push( b.f_on );
		}
		else{
			b.f_on.reset();
			offs.push( b.f_off );
		}
	}
	for( var i = 0, f; f = offs[i]; i += 1 ){
		f();
	}
	for( var i = 0, f; f = ons[i]; i += 1 ){
		f();
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