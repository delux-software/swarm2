// ================================================================================ Image Manager class
var ImageManager = function() {
	// constants
	this.init();
};
// ================================================================================ createRotatableImage () - preload full rotation of image
ImageManager.prototype.createRotatableImage = function( objectName ) {
	im_imageOriginal[ objectName ] = new Image();
	im_imageOriginal[ objectName ].src = im_imageFolder + im_imageCollection[ objectName ];
	im_image[ objectName ] = [];
	im_image [objectName ] = [];
	im_imageOriginal[ objectName ].onload = function() {  // when image is loaded, continue
		var tsteps = im_stepsPerRotation;
		var tradius = Math.max( im_imageOriginal[ objectName ].width, im_imageOriginal[ objectName ].height );  // calc radius
		im_imageRadius[ objectName ] = tradius;
		var iMax = Math.ceil( 360 / tsteps ) * tsteps;  // make sure to have this value >= 360 to avoid array out of bounds
		// exception
		for( var i = 0; i <= iMax; i += tsteps ) {

			var nr = i / tsteps;
			var tcanvas = document.createElement( 'canvas' );
			var tctx = tcanvas.getContext( "2d" );
			tcanvas.width = tradius;
			tcanvas.height = tradius;
			var tcx = tcanvas.width / 2;
			var tcy = tcanvas.height / 2;

			// umsetzen, rotieren, zeichnen, speichern
			tctx.translate( tcx, tcy );
			tctx.rotate( math.degToRad( i ) );
			tctx.drawImage( im_imageOriginal[ objectName ], -tcx, -tcy );
			im_image[ objectName ][ nr ] = new Image();
			im_image[ objectName ][ nr ].src = tcanvas.toDataURL( "image/png" );
			im_image[ objectName ][ nr ].onload = function() {

			}

		}
		console.log("loaded ["+nr+"]"+objectName);
	}
};
// ================================================================================ init() - precalculate asin & acos
ImageManager.prototype.init = function() {
	var array = im_imageCollection;
	for( var key in array ) {
		if( array.hasOwnProperty( key ) ) {
			im_image [ key ] = [];
			this.createRotatableImage( key );
		}
	}
// ================================================================================ gets image from degree angle
	ImageManager.prototype.getRotatedImage = function( objectName, an ) {
		var nr = Math.round( (an % 360) / im_stepsPerRotation  );
		return im_image[ objectName ][ nr ];
	};
}