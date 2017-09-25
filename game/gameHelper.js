// ================================================================================ initGame() - reduces size of main game class
function initGame() {
	// ------------------------------------------ init 2d graphics engine
	cv1 = document.getElementById( "canvas" );  // get html5 canvas
	scX = cv1.width;
	scY = cv1.height;
	var trect = cv1.getBoundingClientRect();
	scL = trect.left;
	scT = trect.top;
	cx1 = cv1.getContext( "2d" );
	cv2 = document.createElement( 'canvas' );   // create double buffer
	cv2.width = scX;
	cv2.height = scY;
	cx2 = cv2.getContext( "2d" );
	// ------------------------------------------ init managers
	FPSManagerDraw = new FPSManager();    // fps calculator for draws per second
	FPSManagerUpdate = new FPSManager();  // fps calculator for updates per second
	mouse = new MouseManager();           // mouse manager
	math = new MathManager();             // math manager
	img = new ImageManager();             // image manager

	cv1.addEventListener( 'mousemove', function( evt ) { mouse.move( evt ); } );    // add mouse motion listener
	cv1.addEventListener( 'mousedown', function( evt ) { mouse.down( evt); } );     // add mouse down listener
	cv1.addEventListener( 'mouseup', function( evt ) { mouse.up( evt); } );         // add mouse up listener
}
// ================================================================================ rgb functions to feed canvasContext.fillStyle
function rgb( r, g, b ) {
	return rgba( r, g, b, "1.0" );   // rgb calls rgba with full alpha value (100%)
}
// ------------------------------------------ rgba ( r, g, b, a ) with parameter checks and error messages
function rgba( r, g, b, a ) {
	var alph = parseFloat( a );
	if( r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 || alph < 0 || alph > 1 ) {
		console.log( "rgba called with wrong params. r: " + r + ", g: " + g + ", b: " + b + ", a:" + a );
	}
	else {
		return "rgba(" + r + ", " + g + ", " + b + ", " + a + " )";
	}
}