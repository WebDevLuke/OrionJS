//--------------------------------------------------------------------------------------------------------------------------------------
// JS-CLASS COMPONENT
//--------------------------------------------------------------------------------------------------------------------------------------

/*
JS-CLASS component allows you to quickly define class-based click events on elements.

You can define multiple behaviours by defining comma seperated lists. Each item corosponds to it's matching index in all the related data tags.

data-class (Required)
- A comma seperated list of classes you wish to add.

data-class-element (Required)
- A comma seperated list of elements data-class will target.

data-class-behaviour (Optional)
- The behaviour which occurs when triggered. You have 3 choices:-
	- "toggle": This adds the class if it's not already present or removes if it is
	- "add": This adds the class if it's not present 
	- "remove": This removes the class if it's present

<div data-class="is-active, is-invalid, is-hidden" data-class-element="js-elem, js-elem2, js-elem3" data-class-behaviour="toggle, remove, add">

In the above example, when our element is clicked the following happens:-
	1) is-active class is toggled on js-elem
	2) is-invalid class is removed from js-elem2
	3) is-hidden class is added to js-elem3 
*/ 

(function(){  

	// Grab all elements with required data-attributes and declare variables
	var elems = document.querySelectorAll("[data-class][data-class-element]"),
	dataClass, 
	dataClassElement,
	dataClassBehaviour,
	elem,
	elemClass,
	elemBehaviour,
	a,
	b;

	// Only go ahead if we've found any matches
	if (elems.length) {
		// Loop through our matches and add click events
		for(a = 0; a < elems.length; a++){
			elems[a].addEventListener("click", function(e){

				// Prevent default action of element
				e.preventDefault();	

				// Grab data-class data and convert to array
				dataClass = this.getAttribute("data-class");
				dataClass = dataClass.split(", ");

				// Grab data-class-element data
				dataClassElement = this.getAttribute("data-class-element");
				dataClassElement = dataClassElement.split(", ");

				// Grab data-class-behaviour if present
				if(this.getAttribute("data-class-behaviour")) {
					dataClassBehaviour = this.getAttribute("data-class-behaviour");
					dataClassBehaviour = dataClassBehaviour.split(", ");
				}

				// Loop through all our dataClassElement items
				for(b = 0; b < dataClassElement.length; b++) {
					// Grab elem reference
					elem = document.querySelector("." + dataClassElement[b]);
					// Grab class we will add
					elemClass = dataClass[b];
					// Grab behaviour if any exists
					if(dataClassBehaviour) {
						elemBehaviour = dataClassBehaviour[b];
					}
					// Do
					if(elemBehaviour === "add") {
						if(!elem.classList.contains(elemClass)) {
							elem.classList.add(elemClass);
						}
					}
					else if(elemBehaviour === "remove") {
						if(elem.classList.contains(elemClass)) {
							elem.classList.remove(elemClass);
						}
					}
					else {
						elem.classList.toggle(elemClass);
					}
				}
			});
		}
	}
})();