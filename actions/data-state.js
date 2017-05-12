//--------------------------------------------------------------------------------------------------------------------------------------
// DATA-STATE COMPONENT
//--------------------------------------------------------------------------------------------------------------------------------------

/*
DATA-STATE adds functionality for any elements with data-state attribute.

It allows you to quickly add, remove or toggle states on elements on click and/or swipe events.

If adding elements to the DOM after initial render, fire a "dataState" event on document.body to trigger
the data-state logic assignment. Otherwise when your new data-state element is clicked, nothing will happen!
*/


// DATA ATTRIBUTES
//--------------------------------------------------------------------------------------------------------------------------------------

/*
data-state (Required)
- A comma seperated list of states you wish to add.
- If a state is missed, the last valid state will be used. This allows you to have one state for many actions.

data-state-element (Optional)
- A comma seperated list of elements data-state will target.
- If data-state-element isn't present, it and also data-state-scope will be set as trigger element, essentially replicating "this"

data-state-behaviour (Optional)
- The behaviour which occurs when triggered. You have 3 choices:-
	- "toggle": This adds the state if it's not already present or removes if it is (Default)
	- "add": This adds the states if it's not present 
	- "remove": This removes the state if it's present
- If a behaviour is missed, the last valid behaviour will be used. This allows you to have one behaviour for many actions.

data-state-scope (Optional)
- A comma seperated list of states relative to the trigger element which encapsulates the scope of the action.
- If data-state-scope is not detected or "false" is passed, the scope is document-level.
- If a scope is missed, the last valid scope will be used. This allows you to have one scope for many actions.

data-state-swipe (Optional)
- If defined, the specified swipe direction triggers state functionality. You have 4 choices for directions:-
	- "up"
	- "right"
	- "down"
	- "left"
- You can also specify if or not the swipe event should replace the click event, or if both should coexist. To do this add a comma then either true or false after your direction.
	- "true": Swipe event replaces click event
	- "false": Swipe event and click event are both added (Default)
*/

// EXAMPLE 1
//--------------------------------------------------------------------------------------------------------------------------------------

/*
<div class="js-elem" data-state="is-active">

In the above example, when our element is clicked the following happens:
1) is-active state is toggled the element
*/

// EXAMPLE 2
//--------------------------------------------------------------------------------------------------------------------------------------

/*
<div data-state-element="js-elem, js-elem2, js-elem3" data-state="is-active" data-state-behaviour="add">

In the above example, when our element is clicked the following happens:
1) is-active state is added to js-elem, js-elem2 and js-elem3
*/


// EXAMPLE 3
//--------------------------------------------------------------------------------------------------------------------------------------

/*
<div data-state="is-active, is-invalid, is-hidden" data-state-element="js-elem, js-elem2, js-elem3" data-state-behaviour="toggle, remove, add" data-state-swipe="left, false">

In the above example, when our element is either clicked or a left swipe is detected the following happens:
1) is-active state is toggled on any js-elem class
2) is-invalid state is removed from any js-elem2 class
3) is-hidden state is added to any js-elem3 class
*/ 


// EXAMPLE 4
//--------------------------------------------------------------------------------------------------------------------------------------

/*
<div class="js-parent">
	<div class="js-elem" data-state="is-active" data-state-element="js-elem" data-state-scope="js-parent">Trigger 1</div>
	<div class="js-elem" data-state="is-active, is-invalid" data-state-element="js-elem, js-elem" data-state-scope="false, js-parent">Trigger 2</div>
	<div class="js-elem" data-state="is-active" data-state-element="js-parent" data-state-scope="js-parent">
		Trigger 3
		<div class="js-parent"></div>
	</div>
</div>
<div class="js-elem" data-state="is-active">Trigger 4</div>


1) When "Trigger 1" is clicked, all instances of "js-elem" within "js-parent" will have "is-active" toggled.
2) When "Trigger 2" is clicked, as the first scope is set to "false", all instances of "js-elem" everywhere will have "is-active" toggled. In addition, all instances of "js-elem" within "js-parent" will have "is-invalid" toggled.
3) When "Trigger 3" is clicked, "is-active" will be added to all instances of "js-parent" within and including the first parent instance of "js-parent" relative to the trigger element.
4) When "Trigger 4" is clicked, it will toggle "is-active" on itself only.
*/ 


// CODE
//--------------------------------------------------------------------------------------------------------------------------------------

(function(){

	// Import swipe helper
	var swipeDetect = require("../helpers/swipeDetect.js"),
	// Import closestParent helper
	closestParent = require("../helpers/closestParent.js"),
	// Change function
	processChange = function(elem){

		// Grab data-state list and convert to array
		var dataState = elem.getAttribute("data-state");
		dataState = dataState.split(", ");

		// Grab data-state-behaviour list if present and convert to array
		if(elem.getAttribute("data-state-behaviour")) {
			var dataStateBehaviour = elem.getAttribute("data-state-behaviour");
			dataStateBehaviour = dataStateBehaviour.split(", ");
		}

		// Grab data-scope list if present and convert to array
		if(elem.getAttribute("data-state-scope")) {
			var dataStateScope = elem.getAttribute("data-state-scope");
			dataStateScope = dataStateScope.split(", ");
		}

		// Grab data-state-element list and convert to array
		// If data-state-element isn't found, pass self, set scope to self if none is present, essentially replicating "this"
		if(elem.getAttribute("data-state-element")) {
			var dataStateElement = elem.getAttribute("data-state-element");
			dataStateElement = dataStateElement.split(", ");
		}
		else {
			var dataStateElement = [];
			dataStateElement.push(elem.classList[0]);
			if(!dataStateScope) {
				var dataStateScope = dataStateElement;
			}
		}

		// Find out which has the biggest length between states and elements and use that length as loop number
		// This is to make sure situations where we have one data-state-element value and many data-state values are correctly setup
		var dataLength = Math.max(dataStateElement.length, dataState.length);

		// Loop through to assign out event listeners
		for(var b = 0; b < dataLength; b++) {

			// If a data-state-element value isn't found, use last valid one
			if(dataStateElement[b] !== undefined) {
				var dataStateElementValue = dataStateElement[b];
			} 

			// If scope isn't found, use last valid one
			if(dataStateScope && dataStateScope[b] !== undefined) {
				var cachedScope = dataStateScope[b];
			}
			else if(cachedScope) {
				dataStateScope[b] = cachedScope;
			}

			// Grab elem references, apply scope if found
			if(dataStateScope && dataStateScope[b] !== "false") {

				// Grab parent
				var elemParent = closestParent(elem, dataStateScope[b]);

				// Grab all matching child elements of parent
				var elemRef = elemParent.querySelectorAll("." + dataStateElementValue);

				// Convert to array
				elemRef = Array.prototype.slice.call(elemRef);

				// Add parent if it matches the data-state-element and fits within scope
				if(elemParent.classList.contains(dataStateElementValue)) {
					elemRef.unshift(elemParent);
				}
			}
			else {
				var elemRef = document.querySelectorAll("." + dataStateElementValue);
			}
			// Grab state we will add
			// If one isn't found, keep last valid one
			if(dataState[b] !== undefined) {
				var elemState = dataState[b];
			}		
			// Grab behaviour if any exists
			// If one isn't found, keep last valid one
			if(dataStateBehaviour) {
				if(dataStateBehaviour[b] !== undefined) {
					var elemBehaviour = dataStateBehaviour[b];
				}
			}
			// Do
			for(var c = 0; c < elemRef.length; c++) {
				// Find out if we're manipulating aria-attributes or classes
				var toggleAttr;
				if(elemRef[c].getAttribute(elemState)) {
					toggleAttr = true;
				}
				else {
					toggleAttr = false;
				}
				if(elemBehaviour === "add") {
					if(toggleAttr) {
						elemRef[c].setAttribute(elemState, true);
					}
					else {
						elemRef[c].classList.add(elemState);
					}
				}
				else if(elemBehaviour === "remove") {
					if(toggleAttr) {
						elemRef[c].setAttribute(elemState, false);
					}
					else {
						elemRef[c].classList.remove(elemState);
					}
				}
				else {
					if(toggleAttr) {
						if(elemRef[c].getAttribute(elemState) === "true") {
							elemRef[c].setAttribute(elemState, false);
						}
						else {
							elemRef[c].setAttribute(elemState, true);
						}
					}
					else {
						elemRef[c].classList.toggle(elemState);
					}
				}
			}

		}

	},
	// Init function
	initDataState = function(elem){
		// Detect data-swipe attribute
		if(elem.getAttribute("data-state-swipe")){
			// Grab swipe specific data     
			var elemSwipe = elem.getAttribute("data-state-swipe"),
			elemSwipe = elemSwipe.split(", "),
			direction = elemSwipe[0],
			elemSwipeBool = elemSwipe[1],
			currentElem = elem;

			if(elemSwipeBool === "false" || !elemSwipeBool) {
				// Assign click event
				elem.addEventListener("click", function(e){
					// Prevent default action of element
					e.preventDefault();	
					// Run state function
					processChange(this);
				});
			}
			swipeDetect(elem, function(swipedir){
				if(swipedir === direction) {
					// Run state function
					processChange(currentElem);
				}
			})
		}
		else {
			// Assign click event
			elem.addEventListener("click", function(e){
				// Prevent default action of element
				e.preventDefault();	
				// Run state function
				processChange(this);
			});
		}
	};

	// Run when DOM has finished loading
	document.addEventListener("DOMContentLoaded", function() {

		// Grab all elements with required data-attributes
		var elems = document.querySelectorAll("[data-state]");

		// Loop through our matches and add click events
		for(var a = 0; a < elems.length; a++){
			initDataState(elems[a]);
		}

		// Setup mutation observer to track changes for matching elements added after initial DOM render
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				for(var d = 0; d < mutation.addedNodes.length; d++) {
					if(mutation.addedNodes[d].getAttribute("data-state")) {
						initDataState(mutation.addedNodes[d]);
					}
				}
			});    
		});

		// Define type of change our observer will watch out for
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	}); 


})();