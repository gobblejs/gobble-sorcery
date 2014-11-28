var gobble = require( 'gobble' ),
	sorcery = require( '../' );

module.exports = gobble([

	'src/root',

	gobble( 'src/js' )
		.transform( 'esperanto-bundle', {
			entry: 'main',
			sourceMap: true,
			type: 'umd',
			name: 'app'
		})
		.transform( '6to5', {
			sourceMap: 'inline'
		})
		.transform( sorcery )

]);