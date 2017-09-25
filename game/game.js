// ------------------------------------------ declare variables
var cv1, cx1, cv2, cx2, scX, scY, scL, scT;     // canvas 1, buffer 1, canvas 2, buffer 2, screen width, screen height
var FPSManagerDraw, FPSManagerUpdate, mouse, math, img; // 2 managers to calculate drawing frames per second and calculation rounds per second
var swarmId, entityId;
var swarm1;
var grid = null;

var activeTemplate = "bee";

var im_stepsPerRotation = 1;    // rotate picture by 1 degree => create 360 pictures (360 maximum)
var im_imageFolder = "./_img/";
var im_imageOriginal = [];
var im_imageRadius = [];
var im_image = [];
var im_imageCollection = { "fish" : "fish.png",  "blob" : "blob.png", "small fish" : "small_fish.png", "bee" : "small_fish.png" };

// ------------------------------------------ declare settings
var settingsUpdatesPerDrawFrame = 1;  // >1 means multiple calculation rounds per draw round
var settingsGridSize = 200;
var settingsRandomStartVelocity = 0.5;
var settingsDistanceFromMouse = 250;


// ================================================================================ init() - game init - call this to restart everything
function init() {


	initGame();                         // init the canvas 1 & 2 for double buffering (gameHelper.js)
	grid = new grid();                    // init new grid
	grid.init( settingsGridSize );
	swarmId = 0;
	entityId = 0;

	setTimeout( loop, 50 );              // give the game 0,1 sec to load: reduces flickering at start

	// read params from formular fields

	// ------------------------------------------ spawn some fish
	swarm1 = new swarm();
	var spawn = 3;
	var dist = 500 / spawn;

	for( var i = 0; i < spawn; i++ ) {
		for( var j = 0; j < spawn; j++ ) {
			swarm1.add( 50 + i * dist, 50 + j * dist );
		}
	}

//	loadSwarmTemplate( swarm1, "FishSmall" );
	loadSwarmTemplate(swarm1, "bee" );
//	loadSwarmTemplate( swarm1, activeTemplate );


}
// ================================================================================ loop() - handles the game loop
function loop() {
	if( mouse.state[ 1 ] > 0 ) {
		swarm1.add( mouse.x + (Math.random() - 0.5) * settingsDistanceFromMouse, mouse.y + (Math.random() - 0.5) * settingsDistanceFromMouse );
	}
	if( swarm1.deleteAll ) {
		swarm1 = new swarm();
		loadSwarmTemplate( swarm1, activeTemplate );
	}

	for( var i = 0; i < settingsUpdatesPerDrawFrame; i++ ) { update(); }    // update x times before drawing
	draw();                                                     // then draw
}
// ================================================================================ update() - main game loop
function update() {
	grid.clear();               // empty grid
	swarm1.update();            // calculate swarm behaviour
	FPSManagerUpdate.update();  // update calcPerSec counter
}
function game_removeALlSwarms() {
	swarm1.deleteAll = true;
	//console.log("okey" );
	//swarm1.deleteAll = true;
}

// ================================================================================ draw() - draw
function draw() {

	// draw blackground
	cx2.fillStyle = rgb( 0, 0, 0 );
	cx2.fillRect( 0, 0, scX, scY );

	// draw grid
	grid.draw();

	// draw swarm
	swarm1.draw();

	// end of draw
	mouse.update();
	cx1.drawImage( cv2, 0, 0 );     // draw backbuffer to frontbuffer
	FPSManagerDraw.update();        // calculate frames per second
	document.getElementById( "fpsviewercalc" ).innerHTML = FPSManagerUpdate.currentFPS.toString();
	document.getElementById( "fpsviewerdraw" ).innerHTML = this.entityId;//FPSManagerDraw.currentFPS.toString();
	requestAnimationFrame( loop );  // wait for browser to trigger the loop again (should results in 60 FPS)
}