/* this application is based on following simple swarm rules
 1. Move in the same direction as your neighbours
 2. Be close to your neighbors (not lonely), otherwise move towards center of swarm
 3. Avoid collisions with your neighbours
 4. Avoid enemies / entities from other swarms
 5. Avoid the edge of the fishtank (graphical bounds)
 6. Lose Velocity because of friction
 */
// ================================================================================ swarm class
var swarm = function() {
	this.id = (++swarmId);
	this.entities = [];
	this.entityId = 0;
	this.deleteAll = false;
	this.average = function() {   // object to save average speed and position, needed for swarm rules 1 & 2
		this.fx = 0.0;  // average position (center point)
		this.fy = 0.0;
		this.x = 0;
		this.y = 0;
		this.vx = 0.0;  // calculated average speed of the swarm entities
		this.vy = 0.0;
	};
	this.templateName = "default";
	this.moveInSameDirection = 0.0005;      // rule 1 factor
	this.moveToCenterAlways = 0.00001;  // rule 2 factor - ONLY if we want to have entities always moving towards the center
	this.moveToCenterWhenLonely = 0.0001;     // rule 2 factor - this is triggered as soon as the entity feels "lonely"
	this.moveAwayWhenTooClose = 0.003;             // rule 3 factor - multiplier for movement change
	this.moveAwayFromEdge = 0.0055;        // rule 5 factor - multiplier for keeping distance to screen bounds
	this.minDistanceToOthers = 25;                // rule 3 factor - radius where nothing should be to feel "not to close"
	this.maxDistanceToOthers = 50;                // rule 3 factor - radius where something should be to feel "not lonely"
	this.minDistanceToEdge = 50;            // rule 5 factor - min distance from screen bounds
	this.frictionLoss = 0.995;          // rule 6 factor - how much velocity the entity keeps each round
};

// ================================================================================ add() - add new entity to the swarm
swarm.prototype.add = function( tx, ty ) {
	var e = new entity( this );
	e.fx = tx;
	e.fy = ty;
	e.x = e.fx;
	e.y = e.fy;
	e.vx = (Math.random() * 2 - 1) * settingsRandomStartVelocity;
	e.vy = (Math.random() * 2 - 1) * settingsRandomStartVelocity;
	this.entities[ this.entityId ] = e;
	this.entityId++;  // swarm specific entity counter
	entityId++; // global entity counter
	return e;
};

// ================================================================================ update() - calculate swarm behaviour / movements
swarm.prototype.update = function() {
	var len = this.entities.length;
	var i, e, j;


	// ------------------------------------------ calculate center point and average velocity, check grid
	var tvx = 0.0, tvy = 0.0, tfx = 0.0, tfy = 0.0;
	for( i = 0; i < len; i++ ) {
		e = this.entities[ i ];
		tfx += e.fx;
		tfy += e.fy;
		tvx += e.vx;
		tvy += e.vy;

		e.gx = Math.floor( e.x / grid.size );   // calculate in which grid the entity is now
		e.gy = Math.floor( e.y / grid.size );
		grid.entities[ e.gx][ e.gy ].push(e);   // fill the correct grid rectangle with this entity
	}
	this.average.fx = tfx / len;
	this.average.fy = tfy / len;
	this.average.x = Math.round( this.average.fx );
	this.average.y = Math.round( this.average.fy );
	this.average.vx = tvx / len;
	this.average.vy = tvy / len;

	// ------------------------------------------ calculate movement for every single entity
	for( var i2 = 0; i2 < len; i2++ ) {
		e = this.entities[ i2 ];

		var ovx = e.vx;
		var ovy = e.vy;

		// calculate velocity for rule 1 (move in same direction as the swarm)
		var dvx = this.average.vx - e.vx;
		var dvy = this.average.vy - e.vy;
		dvx *= this.moveInSameDirection;
		dvy *= this.moveInSameDirection;
		e.vx += dvx;
		e.vy += dvy;

		// calculate velocity for rule 2 (move towards center of the swarm)
		var dcx = this.average.fx - e.fx;
		var dcy = this.average.fy - e.fy;
		dcx *= this.moveToCenterAlways;
		dcy *= this.moveToCenterAlways;
		e.vx += dcx;
		e.vy += dcy;

		// calculate velocity for rule 5 (evade edge of the fishtank)
		var dex = 0, dey = 0;
		if( e.fx < this.minDistanceToEdge ) {
			dex = this.minDistanceToEdge - e.fx;
		}
		if( e.fx > scX - this.minDistanceToEdge ) {
			dex = -this.minDistanceToEdge + scX - e.fx;
		}
		if( e.fy < this.minDistanceToEdge ) {
			dey = this.minDistanceToEdge - e.fy;
		}
		if( e.fy > scY - this.minDistanceToEdge ) {
			dey = -this.minDistanceToEdge + scY - e.fy;
		}
		dex *= this.moveAwayFromEdge;
		dey *= this.moveAwayFromEdge;
		e.vx += dex;
		e.vy += dey;

		// calculate distances in this and surrounding grids
		e.tooClose = false;
		e.tooFar = true;
		for ( var tx = -1; tx <= 1; tx++) {
			for ( var ty = -1; ty <= 1; ty++) {
				var tgx = e.gx + tx;
				var tgy = e.gy + ty;
				if(tgx >= -grid.bounds && tgx <= grid.x + grid.bounds && tgy >= -grid.bounds && tgy <= grid.y + grid.bounds) {
					var tents = grid.entities[ tgx ][ tgy ];
					var tents_length = tents.length;
					if( tents_length > 0 ) {               // if the checking grid contains entities, loop them
						for( j = 0; j < tents_length; j++ ) {
							var e2 = tents[ j ];
							if( e2.id !== e.id ) {              // found an entity that is a) in a near/same grid and b) not self
								var dx = e2.fx - e.fx;
								var dy = e2.fy - e.fy;
								var d = Math.pow( Math.pow( dx, 2 ) + Math.pow( dy, 2 ), 0.5 );
								if( d < this.minDistanceToOthers ) {    // e2 is too close
									dx *= -this.moveAwayWhenTooClose;      // negative because e should move away from e2
									dy *= -this.moveAwayWhenTooClose;
									e.vx += dx;
									e.vy += dy;
									e.tooClose = true;
								}
								if( d < this.maxDistanceToOthers ) {     // someone is near e - no reason to feel lonely
									e.tooFar = false;
								}
							}
						}
					}
				} else {
					console.log("tried to fail by accessing grid ["+tgx+"]["+tgy+"] which does not exist.");
				}
			}
		}

		// if the fish is lonely, move towards center of the swarm
		if( e.tooFar === true) {
			var dcx2 = this.average.fx - e.fx;
			var dcy2 = this.average.fy - e.fy;
			dcx2 *= this.moveToCenterWhenLonely;
			dcy2 *= this.moveToCenterWhenLonely;
			e.vx += dcx2;
			e.vy += dcy2;
		}

		// calculate friction
		e.vx *= this.frictionLoss;
		e.vy *= this.frictionLoss;

		// apply velocity
		e.fx += e.vx;
		e.fy += e.vy;

		// calculate acceleration
		e.ax = ovx - e.vx;
		e.ay = ovy - e.vy;

		// fish cannot be outside the tank
		if( e.fx < 1.0 ) {
			e.fx = 1.0;
		}
		if( e.fx > scX - 1.0 ) {
			e.fx = scX - 1.0;
		}
		if( e.fy < 1.0 ) {
			e.fy = 1.0;
		}
		if( e.fy > scY - 1.0 ) {
			e.fy = scY - 1.0;
		}

		// parse calculated float position back to the int position, which is used for drawing
		e.x = Math.round( e.fx );
		e.y = Math.round( e.fy );

		// delete all
		if ( this.deleteAll == true ) {
			//console.log("delte");
			//delete this.entities[ i ];
			delete this.entities;
		}

	}
};

// ================================================================================ draw() - draw the entities
swarm.prototype.draw = function() {
	for( var i = 0, len = this.entities.length; i < len; i++ ) {  // loop over all entities
		var e = this.entities[ i ];
		e.draw();
	}
};