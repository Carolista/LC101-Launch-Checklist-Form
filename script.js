// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/


// VALIDATORS

window.addEventListener("load", function() {

    let form = document.getElementById("formTag"); // reference form

    form.addEventListener("submit", function(event) {   

        console.log("Form event handler initiated.");

        // Reference all four fields
        let pilot = document.querySelector("input[name = pilotName]");
        let copilot = document.querySelector("input[name = copilotName]");
        let fuel = document.querySelector("input[name = fuelLevel]");
        let cargo = document.querySelector("input[name = cargoWeight]");
        console.log(pilot, copilot, fuel, cargo); // data check

        // Are any of the fields empty?
        if (pilot.value === "" || copilot.value === "" || fuel.value === "" || cargo.value === "") {
            alert("All fields required.");
            event.preventDefault();
        }

        // Are the pilot's and co-pilot's names something other than strings?
        // THIS IS NOT WORKING YET... FIND BETTER WAY TO ENSURE CAN'T BE CONVERTED TO STRING
        if ( typeof String(pilot.value) !== 'string' || typeof String(copilot.value) !== 'string') {
            alert("Oops! Please check that you have entered valid names.");
            event.preventDefault();
        }

    });

});
