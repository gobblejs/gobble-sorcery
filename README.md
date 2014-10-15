# gobble-sorcery

*Experimental integration with [sorcery](https://github.com/rich-harris/sorcery). Watch this space...*

Normally, if you have steps in your build process that generate source maps - such as minification, or transpiling CoffeeScript to JavaScript - the sourcemap that accompanies the end result only maps back to the penultimate stage, rendering it effectively useless.

Sorcery traces mappings all the way back to the original source. The gobble-sorcery plugin automates this process and links everything together for you.

## Installation

First, you need to have gobble installed - see the [gobble readme](https://github.com/gobblejs/gobble) for details. Then,

```bash
npm i -D gobble-sorcery
```

## Usage

```js
var gobble = require( 'gobble' );
module.exports = gobble( 'src/coffee' )
  .transform( 'coffee' )
  .transform( 'uglify' )
  .transform( 'sorcery' );
```


## License

MIT. Copyright 2014 Rich Harris
