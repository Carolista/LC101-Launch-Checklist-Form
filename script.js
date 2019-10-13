
// for bonus mission
function randomize(max = 100, min = 0) {
	return Math.floor(Math.random() * (max - min) + min);
}

// LOAD PAGE

window.addEventListener("load", function() {

    // FETCH PLANETARY DATA

    console.log("Fetching planetary data.");

    fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        response.json().then( function(json) {
            // console.log(json);
            const div = document.getElementById("missionTarget");
            let p = randomize(json.length,0);
            console.log(`Selected planet at index ${p}.`);
            div.innerHTML += `
                <h2>Mission Destination</h2>
                    <ol>
                        <li>Name: ${json[p].name}</li>
                        <li>Diameter: ${json[p].diameter}</li>
                        <li>Star: ${json[p].star}</li>
                        <li>Distance from Earth: ${json[p].distance}</li>
                        <li>Number of Moons: ${json[p].moons}</li>
                    </ol>
                <img src="${json[p].image}"><br><br>
            `;  
        });
    }); 

    // VALIDATE FORM ENTRIES

    let form = document.getElementById("formTag");

    form.addEventListener("submit", function(event) {   

        console.log("Form event handler initiated upon attempt to submit.");

        // Reset launch status information box if needed
        let status = document.getElementById("launchStatus");  
        let faulty = document.getElementById("faultyItems");
        status.innerHTML = "Awaiting Information Before Launch";
        status.style.color = "black";
        faulty.style.visibility = "hidden";
        console.log(`Launch Status is ${faulty.style.visibility}.`);

        // Reference all four fields
        let pilot = document.querySelector("input[name = pilotName]");
        let copilot = document.querySelector("input[name = copilotName]");
        let fuel = document.querySelector("input[name = fuelLevel]");
        let cargo = document.querySelector("input[name = cargoWeight]");

        // Log values entered
        console.log(`Pilot: ${pilot.value}  Co-pilot: ${copilot.value}`);
        console.log(`Fuel: ${fuel.value}  Cargo: ${cargo.value}`); 

        let fieldsNotEmpty, namesAlpha, amountsNumbers = false;

        // Are any of the fields empty?
        if ( pilot.value === "" || copilot.value === "" || fuel.value === "" || cargo.value === "" ) {
            console.log("User did not fill all fields.");
            alert("All fields required.");
            event.preventDefault();
        } else {
            fieldsNotEmpty = true;
        }

        // Are the pilot's and co-pilot's names something other than alphabetic strings?
        let alphaRegEx = /^[a-zA-Z]+$/;
        if ( ! pilot.value.match(alphaRegEx) || ! copilot.value.match(alphaRegEx) ) {
            console.log("User tried to enter non-alphabetic name(s).");
            alert("Oops! Please check that you have entered valid names for both pilot and copilot.");
            event.preventDefault();
        } else {
            namesAlpha = true;
        }
        
        // Are the fuel level and cargo weight something other than numbers?
        if ( isNaN(Number(fuel.value)) || isNaN(Number(cargo.value)) ) {
            console.log("User did not use valid number(s).");
            alert("Oops! Please check that you have entered valid numbers for both fuel level and cargo weight.");
            event.preventDefault();
        } else {
            amountsNumbers = true;
        }
        
        // Display launch status information only if all entries were valid
        if ( fieldsNotEmpty && namesAlpha && amountsNumbers ) {

            // NOW THAT DATA HAS BEEN VALIDATED...
            console.log(`${pilot.value} and ${copilot.value} are requesting to launch with ${fuel.value} gallons of fuel and ${cargo.value} pounds of cargo.`); 

            // Update shuttle requirements 
            // Note "faulty" and "status" were defined at top of event handler
            let pilotStatus = document.getElementById("pilotStatus");
            let copilotStatus = document.getElementById("copilotStatus");
            let fuelStatus = document.getElementById("fuelStatus");
            let cargoStatus = document.getElementById("cargoStatus");

            // Add pilot's and co-pilot's names
            pilotStatus.innerHTML = `Pilot, ${pilot.value}, ready`;
            copilotStatus.innerHTML = `Co-pilot, ${copilot.value}, ready`;

            // Is there enough fuel?
            if ( fuel.value < 10000 ) {
                fuelStatus.innerHTML = "Not enough fuel to launch";
                status.style.color = "red";
                status.innerHTML = "Shuttle not ready for launch";
                console.log("Fuel status changed: not enough fuel to launch");
            }

            // Is the cargo too heavy?
            if ( cargo.value > 10000) {
                cargoStatus.innerHTML = "Cargo is too heavy to launch";
                status.style.color = "red";
                status.innerHTML = "Shuttle not ready for launch"; 
                console.log("Cargo status changed: cargo is too heavy.");       
            } 

            // If everything checks out, indicate go for launch
            if ( fuel.value >= 10000 && cargo.value <= 10000 ) {
                status.style.color = "green";
                status.innerHTML = "Shuttle is ready for launch";
                fuelStatus.innerHTML = "Fuel level high enough for launch";
                cargoStatus.innerHTML = "Cargo weight low enough for launch";
                console.log("Go for launch!")
            }

            // Make visible now that all status updates have been made
            faulty.style.visibility = "visible";
            console.log(`Launch Status is ${faulty.style.visibility}.`);

            // Keep page from reloading after data is made visible
            event.preventDefault();

        } else {
            console.log("Waiting for user to resubmit with valid data.");
        }

    });

});