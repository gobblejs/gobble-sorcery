var path = require( 'path' );
var pattern = /#\s*sourceMappingURL=([^\s]+)/;

module.exports = function sorcery ( inputdir, outputdir, options ) {
	var sander = require( 'sander' ),
		_sorcery = require( 'sorcery' );

	return sander.lsr( inputdir ).then( function ( files ) {
		var promises, queue = [];

		promises = files.map( function ( file ) {
			return _sorcery.load( path.join( inputdir, file ) ).then( function ( chain ) {
				var map, promises;

				if ( !chain ) {
					// this is an original source
					return sander.link( inputdir, file ).to( outputdir, file );
				}

				// don't write yet, as the .map file could be overwritten by an
				// existing .map file. Instead, enqueue it
				queue.push({
					dest: path.join( outputdir, file ),
					chain: chain
				});
			});
		});

		return sander.Promise.all( promises ).then( function () {
			var promises = queue.map( function ( item ) {
				return item.chain.write( item.dest, options );
			});

			return sander.Promise.all( promises );
		});
	});
};
