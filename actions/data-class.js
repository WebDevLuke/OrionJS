//--------------------------------------------------------------------------------------------------------------------------------------
// DATA-CLASS COMPONENT
//--------------------------------------------------------------------------------------------------------------------------------------

/*
DATA-CLASS adds functionality for any elements with data-class and data-class-element attributes.

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
	- "toggle": This adds the class if it's not already present or removes if it is (Default)
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
	- "false": Swipe event and click event are both added (Default)

data-class-scope (Optional)
- A comma seperated list of classes relative to the trigger element which encapsulates the scope of the action.
- If data-class-scope is not detected or "false" is passed, the scope is document-level.
*/


// BASIC EXAMPLE
//--------------------------------------------------------------------------------------------------------------------------------------

/*
<div data-class="is-active, is-invalid, is-hidden" data-class-element="js-elem, js-elem2, js-elem3" data-class-behaviour="toggle, remove, add" data-class-swipe="left, false">

In the above example, when our element is either clicked or a left swipe is detected the following happens:
1) is-active class is toggled on any js-elem class
2) is-invalid class is removed from any js-elem2 class
3) is-hidden class is added to any js-elem3 class
*/ 


// DATA-CLASS-SCOPE EXAMPLE
//--------------------------------------------------------------------------------------------------------------------------------------

/*
<div class="js-parent">
	<div class="js-elem" data-class="is-active" data-class-element="js-elem" data-class-scope="js-parent">Trigger 1</div>
	<div class="js-elem" data-class="is-active, is-invalid" data-class-element="js-elem, js-elem" data-class-scope="false, js-parent">Trigger 2</div>
	<div class="js-elem" data-class="is-active" data-class-element="js-parent" data-class-scope="js-parent">
		Trigger 3
		<div class="js-parent"></div>
	</div>
</div>
<div class="js-elem" data-class="is-active" data-class-element="js-elem" data-class-scope="js-elem">Trigger 4</div>


1) When "Trigger 1" is clicked, all instances of "js-elem" within "js-parent" will have "is-active" toggled.
2) When "Trigger 2" is clicked, as the first scope is set to "false", all instances of "js-elem" everywhere will have "is-active" toggled. In addition, all instances of "js-elem" within "js-parent" will have "is-invalid" toggled.
3) When "Trigger 3" is clicked, "is-active" will be added to all instances of "js-parent" within and including the first parent instance of "js-parent" relative to the trigger element.
4) When "Trigger 4" is clicked, as it has itself defined as scope, it will toggle "is-active" on itself only.
*/ 


// CODE
//--------------------------------------------------------------------------------------------------------------------------------------

(function(){

	// Import swipe helper
	var swipeDetect = require("../helpers/swipeDetect.js"),
	// Import closestParent helper
	closestParent = require("../helpers/closestParent.js"),
	// Grab all elements with required data-attributes
	elems = document.querySelectorAll("[data-class][data-class-element]"),
	processChange = function(elem){
		// Grab data-class list and convert to array
		var dataClass = elem.getAttribute("data-class");
		dataClass = dataClass.split(", ");

		// Grab data-class-element list and convert to array
		var dataClassElement = elem.getAttribute("data-class-element");
		dataClassElement = dataClassElement.split(", ");

		// Grab data-class-behaviour list if present and convert to array
		if(elem.getAttribute("data-class-behaviour")) {
			var dataClassBehaviour = elem.getAttribute("data-class-behaviour");
			dataClassBehaviour = dataClassBehaviour.split(", ");
		}

		// Grab data-scope list if present and convert to array
		if(elem.getAttribute("data-class-scope")) {
			var dataClassScope = elem.getAttribute("data-class-scope");
			dataClassScope = dataClassScope.split(", ");
		}

		// Loop through all our dataClassElement items
		for(var b = 0; b < dataClassElement.length; b++) {
			// Grab elem references, apply scope if found
			if(dataClassScope && dataClassScope[b] !== "false") {
				// Grab parent
				var elemParent = closestParent(elem, dataClassScope[b]),

				// Grab all matching child elements of parent
				elemRef = elemParent.querySelectorAll("." + dataClassElement[b]);

				// Convert to array
				elemRef = Array.prototype.slice.call(elemRef);

				// Add parent if it matches the data-class-element and fits within scope
				if(dataClassScope[b] === dataClassElement[b] && elemParent.classList.contains(dataClassElement[b])) {
					elemRef.unshift(elemParent);
				}
			}
			else {
				var elemRef = document.querySelectorAll("." + dataClassElement[b]);
			}
			// Grab class we will add
			var elemClass = dataClass[b];
			// Grab behaviour if any exists
			if(dataClassBehaviour) {
				var elemBehaviour = dataClassBehaviour[b];
			}
			// Do
			for(var c = 0; c < elemRef.length; c++) {
				if(elemBehaviour === "add") {
					if(!elemRef[c].classList.contains(elemClass)) {
						elemRef[c].classList.add(elemClass);
					}
				}
				else if(elemBehaviour === "remove") {
					if(elemRef[c].classList.contains(elemClass)) {
						elemRef[c].classList.remove(elemClass);
					}
				}
				else {
					elemRef[c].classList.toggle(elemClass);
				}
			}
		}
	};

	// Only go ahead if we've found any matches
	if (elems.length) {
		// Loop through our matches and add click events
		for(var a = 0; a < elems.length; a++){
			// Detect data-swipe attribute
			if(elems[a].getAttribute("data-class-swipe")){
				// Grab swipe specific data     
				var elemSwipe = elems[a].getAttribute("data-class-swipe"),
				elemSwipe = elemSwipe.split(", "),
				direction = elemSwipe[0],
				elemSwipeBool = elemSwipe[1],
				currentElem = elems[a];

				if(elemSwipeBool === "false" || !elemSwipeBool) {
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