// ================================================================================ FPS Manager class
var entity = function( tmpSwarm ) {
	this.globalId = (++entityId);
	this.swarm = tmpSwarm;
	this.swarmId = tmpSwarm.id;
	this.id = tmpSwarm.entityId;

	this.fx = 0.0;    // float coordinates
	this.fy = 0.0;
	this.vx = 0.0;    // float velocities
	this.vy = 0.0;
	this.ax = 0.0;    // float accelerations
	this.ay = 0.0;
	this.x = 0;       // int coordinates for drawing
	this.y = 0;
	this.gx = 0;      // grid position
	this.gy = 0;


	this.dead = false;
	this.tooClose = false;
	this.tooFar = false;

	// health, status, AD, AS ...
};

entity.prototype.draw = function() {

	var objectName = "fish";

	// calculate angle and draw fish
	var an = math.andegFromXY( -this.vx, -this.vy );
	var image = img.getRotatedImage( this.swarm.templateObj.image, an );
	var tx = Math.floor ( this.x - im_imageRadius[objectName] / 2 );
	var ty =  Math.floor ( this.y - im_imageRadius[objectName] / 2 );

	cx2.drawImage( 	image, tx, ty );

	// "debug" options for showing tooClose / tooFar indicators
	var drawDebug = 0;
	drawDebug = 0;

	if( drawDebug > 0 ) {
		cx2.fillStyle = rgb( 0, 192, 64 );
		if( this.tooClose === true ) {
			cx2.fillStyle = rgb( 255, 0, 0 );
		}
		if( this.tooFar === true ) {
			cx2.fillStyle = rgb( 0, 128, 255 );
		}
		if( this.tooFar === true || this.tooClose === true || drawDebug > 1 ) {
			cx2.fillRect( this.x - 2, this.y - 2, 4, 4 );
		}
	}
	//cx2.strokeStyle = rgb(255,255,255);
	//cx2.strokeText( this.x+","+this.y, this.x, this.y );
	//cx2.strokeText( this.id, this.x, this.y );
};