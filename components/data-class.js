//--------------------------------------------------------------------------------------------------------------------------------------
// DATA-CLASS COMPONENT
//--------------------------------------------------------------------------------------------------------------------------------------

/*
DATA-CLASS adds functionality for any components with data-class and data-class-element attributes.

It allows you to quickly add, remove or toggle classes on elements on click and/or swipe events.
*/


// DATA ATTRIBUTES
//--------------------------------------------------------------------------------------------------------------------------------------

/*
data-class (Required)
- A comma seperated list of classes you wish to add.

data-class-element (Required)
- A comma seperated list of elements data-class will target.

data-class-behaviour (Optional)
- The behaviour which occurs when triggered. You have 3 choices:-
	- "toggle": This adds the class if it's not already present or removes if it is
	- "add": This adds the class if it's not present 
	- "remove": This removes the class if it's present

data-class-swipe (Optional)
- If defined, the specified swipe direction triggers class functionality. You have 4 choices for directions:-
	- "up"
	- "right"
	- "down"
	- "left"
- You can also specify if or not the swipe event should replace the click event, or if both should coexist. To do this add a comma then either true or false after your direction.
	- "true": Swipe event replaces click event
	- "false": Swipe event and click event are both added
*/


// EXAMPLE
//--------------------------------------------------------------------------------------------------------------------------------------

/*
<div data-class="is-active, is-invalid, is-hidden" data-class-element="js-elem, js-elem2, js-elem3" data-class-behaviour="toggle, remove, add" data-class-swipe="left, false">

In the above example, when our element is either clicked or a left swipe is detected the following happens:-
	1) is-active class is toggled on js-elem
	2) is-invalid class is removed from js-elem2
	3) is-hidden class is added to js-elem3 
*/ 


// CODE
//--------------------------------------------------------------------------------------------------------------------------------------


(function(){

	// Import swipe helper
	var swipeDetect = require("../helpers/swipeDetect.js"),
	// Grab all elements with required data-attributes
	elems = document.querySelectorAll("[data-class][data-class-element]"),
	dataClass, 
	dataClassElement,
	dataClassBehaviour,
	elem,
	elemClass,
	elemBehaviour,
	elemSwipe,
	elemSwipeBool,
	direction,
	currentElem,
	elemRef,
	a,
	b,
	processChange = function(elem){
		// Grab data-class data and convert to array
		dataClass = elem.getAttribute("data-class");
		dataClass = dataClass.split(", ");

		// Grab data-class-element data
		dataClassElement = elem.getAttribute("data-class-element");
		dataClassElement = dataClassElement.split(", ");

		// Grab data-class-behaviour if present
		if(elem.getAttribute("data-class-behaviour")) {
			dataClassBehaviour = elem.getAttribute("data-class-behaviour");
			dataClassBehaviour = dataClassBehaviour.split(", ");
		}

		// Loop through all our dataClassElement items
		for(b = 0; b < dataClassElement.length; b++) {
			// Grab elem reference
			elemRef = document.querySelector("." + dataClassElement[b]);
			// Grab class we will add
			elemClass = dataClass[b];
			// Grab behaviour if any exists
			if(dataClassBehaviour) {
				elemBehaviour = dataClassBehaviour[b];
			}
			// Do
			if(elemBehaviour === "add") {
				if(!elemRef.classList.contains(elemClass)) {
					elemRef.classList.add(elemClass);
				}
			}
			else if(elemBehaviour === "remove") {
				if(elemRef.classList.contains(elemClass)) {
					elemRef.classList.remove(elemClass);
				}
			}
			else {
				elemRef.classList.toggle(elemClass);
			}
		}
	};

	// Only go ahead if we've found any matches
	if (elems.length) {
		// Loop through our matches and add click events
		for(a = 0; a < elems.length; a++){
			// Detect data-swipe attribute
			if(elems[a].getAttribute("data-class-swipe")){
				elemSwipe = elems[a].getAttribute("data-class-swipe");
				elemSwipe = elemSwipe.split(", ");
				direction = elemSwipe[0];
				elemSwipeBool = elemSwipe[1];
				currentElem = elems[a];

				if(elemSwipeBool === "false") {
					// Assign click event
					elems[a].addEventListener("click", function(e){
						// Prevent default action of element
						e.preventDefault();	
						// Run class function
						processChange(this);
					});
				}
				swipeDetect(elems[a], function(swipedir){
					if(swipedir === direction) {
						// Run class function
						processChange(currentElem);
					}
				})
			}
			else {
				// Assign click event
				elems[a].addEventListener("click", function(e){
					// Prevent default action of element
					e.preventDefault();	
					// Run class function
					processChange(this);
				});
			}
		}
	}
})();