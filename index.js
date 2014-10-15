var path = require( 'path' );

module.exports = function sorcery ( inputdir, outputdir, options ) {
	var sander = require( 'sander' ),
		_sorcery = require( 'sorcery' );

	return sander.lsr( inputdir ).then( function ( files ) {
		var promises = files.map( function ( file ) {
			return _sorcery.resolve( path.join( inputdir, file ) ).then( function ( map ) {
				var mappath;

				if ( !map ) {
					// this is an original source
					return sander.link( inputdir, file ).to( outputdir, file );
				}

				mappath = file + '.map';

				return sander.Promise.all([
					// write the file, pointing to new map
					sander.readFile( inputdir, file ).then( String ).then( function ( code ) {
						code = code.replace( /\/\/#\s*sourceMappingURL=([^\s]+)/, '//# sourceMappingURL=' + path.basename( mappath ) );
						return sander.writeFile( outputdir, file, code );
					}),

					// ...and the new map
					sander.writeFile( outputdir, mappath, JSON.stringify( map ) )
				]);
			}).catch( function ( err ) {
				// For some reason we get ENOENT errors... squelching them for now
			});
		});

		return sander.Promise.all( promises );
	});
};
