<h1>
	 <img height="67" width="387" src="https://cdn.rawgit.com/WebDevLuke/OrionJS/develop/misc/orionjs-logo.svg">
</h1>

[![CircleCI](https://circleci.com/gh/WebDevLuke/OrionJS/tree/master.svg?style=shield)](https://circleci.com/gh/WebDevLuke/OrionJS/tree/master)

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

Or you can copy `node_modules/orionjs/sample.main.js` and use that as a starting point.

You may need to edit the paths referencing `node_modules` to resemble your own project directory structure.

## Helpers
OrionJS provides you with helper functions which help you achieve common tasks. Please refer to a helper's source code for full documentation.

### closestParent
Recursively finds the closest parent element which has the specified class.

### fireEvent
Manually fires the given event for the given element.

### getIndex
Returns the index of the given element

### swipeDetect
Sets up a swipe event listener

## Modules
In addition to helpers, you also have access to modules. These are reusable functions which are attached to elements in HTML via data attributes. They make common DOM manipulation tasks quick and easy to implement.

Please refer to a modules's source code for full documentation.

### data-class
data-class adds functionality for any components with `data-class` and `data-class-element` attributes. It allows you to quickly add, remove or toggle classes on elements on click and/or swipe events.

### data-toggle-text
data-toggle-text adds functionality for any components with a `data-toggle-text` attribute. It allows you to toggle text content of an element on click.


## Using with OrionBP
When you use OrionJS via the front-end boilerplate [OrionBP](https://github.com/WebDevLuke/Orion-Framework), you gain access to specifically built Gulp tasks to compile and optimise your JS. These JS tasks include:

- A setup task which automates the setup process by creating all the directories and files you need to get you up and running as quickly as possible.
- `Build` and `Watch` tasks to easily bundle and then minify your JS using [Browerify](http://browserify.org/).

Please refer to [OrionBP](https://github.com/WebDevLuke/Orion-Framework)'s github repository for more information.


## About the Developer
I'm Luke Harrison, a Sheffield-based Web Designer &amp; Developer from the UK, currently working at [Evolution Funding](https://github.com/EvolutionFunding). Read more about me at [lukeharrison.net](http://www.lukeharrison.net) and/or follow me on twitter at [@WebDevLuke](https://twitter.com/WebDevLuke).

