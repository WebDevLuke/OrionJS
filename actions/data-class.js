//--------------------------------------------------------------------------------------------------------------------------------------
// DATA-CLASS COMPONENT
//--------------------------------------------------------------------------------------------------------------------------------------

/*
DATA-CLASS adds functionality for any elements with data-class attribute.

It allows you to quickly add, remove or toggle classes on elements on click and/or swipe events.

If adding elements to the DOM after initial render, fire a "dataClass" event on document.body to trigger
the data-class logic assignment. Otherwise when your new data-class element is clicked, nothing will happen!
*/


// DATA ATTRIBUTES
//--------------------------------------------------------------------------------------------------------------------------------------

/*
data-class (Required)
- A comma seperated list of classes you wish to add.
- If a class is missed, the last valid class will be used. This allows you to have one class for many actions.

data-class-element (Optional)
- A comma seperated list of elements data-class will target.
- If data-class-element isn't present, it and also data-class-scope will be set as trigger element, essentially replicating "this"

data-class-behaviour (Optional)
- The behaviour which occurs when triggered. You have 3 choices:-
	- "toggle": This adds the class if it's not already present or removes if it is (Default)
	- "add": This adds the class if it's not present 
	- "remove": This removes the class if it's present
- If a behaviour is missed, the last valid behaviour will be used. This allows you to have one behaviour for many actions.

data-class-scope (Optional)
- A comma seperated list of classes relative to the trigger element which encapsulates the scope of the action.
- If data-class-scope is not detected or "false" is passed, the scope is document-level.
- If a scope is missed, the last valid scope will be used. This allows you to have one scope for many actions.

data-class-swipe (Optional)
- If defined, the specified swipe direction triggers class functionality. You have 4 choices for directions:-
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
<div class="js-elem" data-class="is-active">

In the above example, when our element is clicked the following happens:
1) is-active class is toggled the element
*/

// EXAMPLE 2
//--------------------------------------------------------------------------------------------------------------------------------------

/*
<div data-class-element="js-elem, js-elem2, js-elem3" data-class="is-active" data-class-behaviour="add">

In the above example, when our element is clicked the following happens:
1) is-active class is added to js-elem, js-elem2 and js-elem3
*/


// EXAMPLE 3
//--------------------------------------------------------------------------------------------------------------------------------------

/*
<div data-class="is-active, is-invalid, is-hidden" data-class-element="js-elem, js-elem2, js-elem3" data-class-behaviour="toggle, remove, add" data-class-swipe="left, false">

In the above example, when our element is either clicked or a left swipe is detected the following happens:
1) is-active class is toggled on any js-elem class
2) is-invalid class is removed from any js-elem2 class
3) is-hidden class is added to any js-elem3 class
*/ 


// EXAMPLE 4
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
<div class="js-elem" data-class="is-active">Trigger 4</div>


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

		// Grab data-class list and convert to array
		var dataClass = elem.getAttribute("data-class");
		dataClass = dataClass.split(", ");

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

		// Grab data-class-element list and convert to array
		// If data-class-element isn't found, pass self, set scope to self, essentially replicating "this"
		if(elem.getAttribute("data-class-element")) {
			var dataClassElement = elem.getAttribute("data-class-element");
			dataClassElement = dataClassElement.split(", ");
		}
		else {
			var dataClassElement = [];
			dataClassElement.push(elem.classList[0]);
			dataClassScope = dataClassElement;
		}

		// Loop through all our dataClassElement items
		for(var b = 0; b < dataClassElement.length; b++) {

			// Grab elem references, apply scope if found
			if(dataClassScope && dataClassScope[b] !== "false") {

				// Grab parent
				// If one isn't found, keep last valid one
				if(dataClassScope[b] !== undefined) {
					var elemParent = closestParent(elem, dataClassScope[b]);
				}

				// Grab all matching child elements of parent
				var elemRef = elemParent.querySelectorAll("." + dataClassElement[b]);

				// Convert to array
				elemRef = Array.prototype.slice.call(elemRef);

				// Add parent if it matches the data-class-element and fits within scope
				if(elemParent.classList.contains(dataClassElement[b])) {
					elemRef.unshift(elemParent);
				}
			}
			else {
				var elemRef = document.querySelectorAll("." + dataClassElement[b]);
			}
			// Grab class we will add
			// If one isn't found, keep last valid one
			if(dataClass[b] !== undefined) {
				var elemClass = dataClass[b];
			}		
			// Grab behaviour if any exists
			// If one isn't found, keep last valid one
			if(dataClassBehaviour) {
				if(dataClassBehaviour[b] !== undefined) {
					var elemBehaviour = dataClassBehaviour[b];
				}
			}
			// Do
			for(var c = 0; c < elemRef.length; c++) {
				if(elemBehaviour === "add") {
					elemRef[c].classList.add(elemClass);
				}
				else if(elemBehaviour === "remove") {
					elemRef[c].classList.remove(elemClass);
				}
				else {
					elemRef[c].classList.toggle(elemClass);
				}
			}

		}

	},
	// Init function
	initDataClass = function(){
		// Grab all elements with required data-attributes
		var elems = document.querySelectorAll("[data-class]");

		// Loop through our matches and add click events
		for(var a = 0; a < elems.length; a++){

			// Add class-registered attribute if not present and set to false
			if(!elems[a].getAttribute("data-class-registered")){
				elems[a].setAttribute("data-class-registered", "false"); 
			}

			// Only preceed further if our current node has a FALSE data-class-registered
			// This stops us from reassigning event listeners which already exist
			if(elems[a].getAttribute("data-class-registered") === "false"){
				// Record assignment
				elems[a].setAttribute("data-class-registered", "true"); 
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
	};

	// Run when DOM has finished loading
	document.addEventListener("DOMContentLoaded", function() {
		// Run first time
		initDataClass();
	});

	// On dataClass custom event fire, look again for new data-class instances
	document.body.addEventListener("dataClass", function() {
		initDataClass();
	});	

})();