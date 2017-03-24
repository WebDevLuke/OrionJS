//--------------------------------------------------------------------------------------------------------------------------------------
// DATA-TOGGLE-TEXT COMPONENT
//--------------------------------------------------------------------------------------------------------------------------------------

/*
DATA-TOGGLE-TEXT adds functionality for any components with a data-toggle-text attribute.

It allows you to toggle text content of an element on click and/or swipe.
*/


// DATA ATTRIBUTES
//--------------------------------------------------------------------------------------------------------------------------------------

/*
data-toggle-text (Required)
- On click the elements text content toggles to this

data-toggle-text-swipe (Optional)
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
<div data-toggle-text="Goodbye" data-toggle-text-swipe="left, false">Hello</div>

In the example above, when our element is clicked or a left swipe is detected, the "hello" text toggles to "goodbye". When clicked or swiped again,
it swaps back.
*/


// CODE
//--------------------------------------------------------------------------------------------------------------------------------------

(function(){

	// Import swipe helper
	var swipeDetect = require("../helpers/swipeDetect.js"),

	// Grab all elements with data-toggle-text attribute
	elems = document.querySelectorAll("[data-toggle-text]"),

	// Declare variables
	elemSwipe,

	// Function to process changes
	processChange = function(elem){
		// Grab toggle value
		var toggleText = elem.getAttribute('data-toggle-text'),
		// Grab original value
		originalValue = elem.getAttribute("data-toggle-text-original");
		// Swap text values
		if(elem.innerText === toggleText) {
			elem.innerText = originalValue;
		}
		else {
			elem.innerText = toggleText;
		}
	};

	if(elems.length){
		// Add event listeners to each one 
		for(var a = 0; a < elems.length; a++){
			// Cache original value
			elems[a].setAttribute("data-toggle-text-original", elems[a].innerText);

			// Detect data-swipe attribute
			if(elems[a].getAttribute("data-toggle-text-swipe")){
				var elemSwipe = elems[a].getAttribute("data-toggle-text-swipe"),
				elemSwipe = elemSwipe.split(", "),
				direction = elemSwipe[0],
				elemSwipeBool = elemSwipe[1],
				currentElem = elems[a];

				if(elemSwipeBool === "false") {
					// Assign click event
					elems[a].addEventListener("click", function(e){
						// Prevent default action of element
						e.preventDefault();	
						// Run change function
						processChange(this);
					});
				}
				swipeDetect(elems[a], function(swipedir){
					if(swipedir === direction) {
						// Run change function
						processChange(currentElem);
					}
				})
			}
			else {
				// Assign click event
				elems[a].addEventListener("click", function(e){
					// Prevent default action of element
					e.preventDefault();	
					// Run change function
					processChange(this);
				});
			}
		}
	}

})();