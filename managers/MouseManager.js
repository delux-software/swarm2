// ================================================================================ Mouse Manager class
var MouseManager = function() {
	this.x = 0;
	this.y = 0;
	this.state = [];
	this.init();
}
// ================================================================================ init()
MouseManager.prototype.init = function() {
	for ( var i = 1; i < 4; i++) {
		this.state[i] = 0;
	}
};
// ================================================================================ update()
MouseManager.prototype.update = function() {
	for ( var i = 1; i < 4; i++) {
		if ( this.state[i] == 1 ) {
			this.state[i] = 2;          // 2 means it is STILL pressed, 1 means it was just clicked
		}
	}
};
// ================================================================================ move( evt ) - Mouse Motion Event
MouseManager.prototype.move = function( evt ) {
	this.x = evt.clientX - scL;
	this.y = evt.clientY - scT;
	//console.log( "mouse moved to " + this.x + ", " + this.y );
};

// ================================================================================ click( evt ) - Mouse Click Event
MouseManager.prototype.down = function( evt ) {
	var btn = evt.which;
	this.state [ btn ] = 1;
};

MouseManager.prototype.up = function( evt ) {
	var btn = evt.which;
	this.state [ btn ] = 0;
}