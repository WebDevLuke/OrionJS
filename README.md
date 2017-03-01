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
OrionJS provides you with helper functions which help you achieve common tasks. These are:-

### fireEvent
Manually fires the given event for the given element.

```
// Import helper
var fireEvent = require("node_modules/orionjs/helpers/fireEvent.js");

// Grab element
var myElem = document.querySelector(".my-elem");

// Fire event
fireEvent(myElem, "click");
```

### getIndex
Returns the index of the given element

```
// Import helper
var getIndex = require("../helpers/getIndex.js");

// Grab element
var myElem = document.querySelector(".my-elem");

// Get index of myElem
var index = getIndex(myElem);
```

### swipeDetect
Sets up a swipe event listener

```
// Import helper
var swipeDetect = require("node_modules/orionjs/helpers/swipeDetect.js");

// Grab element
var myElem = document.querySelector(".my-elem");

// Set up event listener to trigger on left swipe
swipeDetect(myElem, function(swipedir){
	if(swipedir === "left") {
		// Define action
	}
})
```

## Modules
In addition to helpers, you also have access to modules. These are reusable functions which make common DOM manipulation tasks quick and easy to implement.

#### data-class
DATA-CLASS adds functionality for any components with data-class and data-class-element attributes. It allows you to quickly define class-based click and/or swipe events on elements.

---
`data-class` (Required)
- A comma seperated list of classes you wish to add.
---

`data-class-element` (Required)
- A comma seperated list of elements data-class will target.
---

`data-class-behaviour` (Optional)
- The behaviour which occurs when triggered. You have 3 choices:-
	- `toggle`: This adds the class if it's not already present or removes if it is
	- `add`: This adds the class if it's not present 
	- `remove`: This removes the class if it's present
---

`data-class-swipe` (Optional)
- If defined, the specified swipe direction triggers class functionality. You have 4 choices for directions:-
	- `up`
	- `right`
	- `down`
	- `left`
- You can also specify if or not the swipe event should replace the click event, or if both should coexist. To do this add a comma then either true or false after your direction.
	- `true`: Swipe event replaces click event
	- `false`: Swipe event and click event are both added
---

```
<div data-class="is-active, is-invalid, is-hidden" data-class-element="js-elem, js-elem2, js-elem3" data-class-behaviour="toggle, remove, add" data-class-swipe="left, false">
```
In the above example, when our element is either clicked or a left swipe is derected the following happens:-
1. is-active class is toggled on js-elem
2. is-invalid class is removed from js-elem2
3. is-hidden class is added to js-elem3 


## Using with OrionBP
When you use OrionJS via the front-end boilerplate [OrionBP](https://github.com/WebDevLuke/Orion-Framework), you gain access to specifically built Gulp tasks to compile and optimise your JS. These JS tasks include:

- A setup task which automates the setup process by creating all the directories and files you need to get you up and running as quickly as possible.
- `Build` and `Watch` tasks to easily bundle and then minify your JS using [Browerify](http://browserify.org/).

Please refer to [OrionBP](https://github.com/WebDevLuke/Orion-Framework)'s github repository for more information.


## About the Developer
I'm Luke Harrison, a Sheffield-based Web Designer &amp; Developer from the UK, currently working at [Evolution Funding](https://github.com/EvolutionFunding). Read more about me at [lukeharrison.net](http://www.lukeharrison.net) and/or follow me on twitter at [@WebDevLuke](https://twitter.com/WebDevLuke).

