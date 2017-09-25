// ================================================================================ Math Manager class
var MathManager = function() {
	this.asinv = [];
	this.acosv = [];
	this.accuracy = 10000;
	this.init();
};
// ================================================================================ init() - precalculate asin & acos
MathManager.prototype.init = function() {
	for( var i = -this.accuracy; i <= this.accuracy; i++ ) {
		var val = i / this.accuracy;
		this.asinv[ i ] = Math.asin( val );
		this.acosv[ i ] = Math.acos( val );
	}
};
// ================================================================================ asin() - read asin precalc from array
MathManager.prototype.asin = function( tval ) {
	if( tval < -1 || tval > 1 ) {
		console.log( "asin with wrong value parameter "+tval );
		return;
	}
	var tval2 = Math.round( tval * this.accuracy );
  return this.asinv[ tval2 ];
};
// ================================================================================ acos() - read acos precalc from array
MathManager.prototype.acos = function( tval ) {
	if( tval < -1 || tval > 1 ) {
		console.log( "acos with wrong value parameter "+ tval );
		return;
	}
	var tval2 = Math.round( tval * this.accuracy );
	return this.acosv[ tval2 ];
};
// ================================================================================ andegFromXY -> calculate degree angle from x,y
MathManager.prototype.andegFromXY = function( tx, ty ) {
	return (this.radToDeg(this.anradFromXY( tx, ty )));
};
// ================================================================================ anradFromXY -> calculate radian angle from x,y
MathManager.prototype.anradFromXY = function( tx, ty ) {
	var td = Math.pow( Math.pow( tx, 2 ) + Math.pow( ty, 2 ), 0.5 );
	var tasin = this.asin( ty / td );
	var tacos = this.acos( tx / td );
	var tanew = 0.0;
	if( tasin < 0 ) {
		tanew = 2 * Math.PI - tacos;
	} else {
		tanew = tacos;
	}
	return tanew;
};
// ================================================================================ degToRad , radToDeg - convert radian<->degree
MathManager.prototype.degToRad = function ( varDeg ) {
	return Math.PI * varDeg / 180;
};
MathManager.prototype.radToDeg = function ( varRad ) {
	return varRad * 180 / Math.PI;
};