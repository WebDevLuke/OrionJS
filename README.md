<h1>
	 <img height="67" width="387" src="https://cdn.rawgit.com/WebDevLuke/OrionJS/develop/misc/orionjs-logo.svg">
</h1>

OrionJS is a simple collection of reusable functions to help streamline DOM manipulation in UI development

## Getting Started

The best way to use OrionJS is via [OrionBP](https://github.com/WebDevLuke/Orion-Framework), a simple front-end boilerplate designed to compliment this collection. [(More Info)](#using-with-orionbp)

You can also use OrionJS on it's own as a part of your own framework. To install it as a depedency using NPM, run the following command:

```
npm install orionjs --save
```

Then you can import modules and/or helpers using the commonJS pattern:-

```
// Import getIndex helper
var getIndex = require("node_modules/orionjs/helpers/getIndex.js");

// Import data-class module
require("node_modules/orionjs/modules/data-class.js");
```

## Helpers


## Modules


## Using with OrionBP
When you use OrionJS via the front-end boilerplate [OrionBP](https://github.com/WebDevLuke/Orion-Framework), you gain access to specifically built Gulp tasks to compile and optimise your JS. These JS tasks include:

- A setup task which automates the setup process by creating all the directories and files you need to get you up and running as quickly as possible.
- `Build` and `Watch` tasks to easily bundle and then minify your JS using [Browerify](http://browserify.org/).

Please refer to [OrionBP](https://github.com/WebDevLuke/Orion-Framework)'s github repository for more information.


## About the Developer
I'm Luke Harrison, a Sheffield-based Web Designer &amp; Developer from the UK, currently working at [Evolution Funding](https://github.com/EvolutionFunding). Read more about me at [lukeharrison.net](http://www.lukeharrison.net) and/or follow me on twitter at [@WebDevLuke](https://twitter.com/WebDevLuke).

