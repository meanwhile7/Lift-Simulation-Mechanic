// Conditions of input box //

const input1 = document.getElementById("num-floor");
const input2 = document.getElementById("num-lift");
const myButton = document.getElementById("btn");
let availableLifts = [];

function checkInputs() {
  if (input1.value < 0 || input2.value < 0) {
    myButton.disabled = true;
    alert("negative number not allowed");
    location.reload();
  } else {
    if (input1.value > 0 && input2.value > 0) {
      container.style.display = "none";
      createFloor();
    } else {
      myButton.disabled = true;
    }
  }
}

input1.addEventListener("input", checkInputs);
input2.addEventListener("input", checkInputs);

myButton.addEventListener("click", checkInputs());

function createFloor() {
  const main = document.querySelector(".floor-box");
  for (let i = 0; i < input1.value; i++) {
    // create back button
    if (i === 0) {
      const bac = document.createElement("button");
      bac.textContent = "Back";
      bac.classList.add("bac-btn");
      main.appendChild(bac);
    }

    const floorSection = document.createElement("section");
    const floorDiv = document.createElement("div");
    const btnDiv = document.createElement("div");
    const floorHeading = document.createElement("h1");
    const upBtn = document.createElement("button");
    const downBtn = document.createElement("button");

    floorSection.classList.add("floor");
    floorSection.setAttribute("id", `floor-${i + 1}`);
    floorDiv.classList.add("floor-section");
    btnDiv.classList.add("btn-section");
    floorHeading.textContent = `floor ${i + 1}`;
    upBtn.setAttribute("id", `up-${i + 1}`);
    downBtn.setAttribute("id", `down-${i + 1}`);
    upBtn.classList.add("btn", "btn-up");
    downBtn.classList.add("btn", "btn-down");
    upBtn.textContent = "Up";
    downBtn.textContent = "Down";

    main.appendChild(floorSection);
    floorSection.appendChild(floorDiv);
    floorDiv.appendChild(btnDiv);
    btnDiv.appendChild(floorHeading);
    btnDiv.appendChild(upBtn);
    btnDiv.appendChild(downBtn);

    for (let j = 0; j < input2.value; j++) {
      if (i === 0) {
        const lift = document.createElement("div");
        const leftSpan = document.createElement("span");
        const rightSpan = document.createElement("span");
        lift.classList.add("lift");
        lift.setAttribute("id", `lift-${j + 1}`);
        availableLifts.push(lift.id);
        leftSpan.classList.add("door");
        rightSpan.classList.add("door");
        lift.appendChild(leftSpan);
        lift.appendChild(rightSpan);
        floorDiv.appendChild(lift);
      }
    }
  }

  // let currentFloor = 1; // initialize the current floor to 1
  const upbtns = document.querySelectorAll(".floor .btn-up");
  const downbtns = document.querySelectorAll(".floor .btn-down");
  const floors = document.querySelectorAll(".floor");
  let currentFloor = 1;
  busy = [];
  // Define a map to store the previous floor value for each lift
  const currFloorMap = new Map();

  function runElevator() {
    moveLift(upbtns, "up");
    moveLift(downbtns, "down");
  }

  function moveLift(buttons, direction) {
    buttons.forEach((btn, index) => {
      btn.addEventListener("click", function () {
        // setting floor number and floor height

        const floorNum = parseInt(btn.id.split("-")[1]);
        const floor = Array.from(floors)[index];
        const floorHeight = floor.offsetHeight + 5;

        //lift selecting part
        let currentLiftId = availableLifts[0];
        const lift = document.querySelector(`#${currentLiftId}`);

        // Set data attribute to indicate lift is busy
        lift.dataset.status = "busy";

        // logic part for moving lift  (need to update)

        lift.style.transform = `translateY(${-floorHeight * (floorNum - 1)}px)`;

        console.log(
          `The elevator has arrived from floor ${currentFloor} at floor ${floorNum}.`
        );

        // Calculate the transition duration based on the floor number
        const transitionDuration = floorNum * 1; // Increase duration with floor number

        lift.style.transition = `transform ${transitionDuration}s ease-in-out`;
        // Set the currentfloor data attribute of the lift to the liftfloor variable
        lift.dataset.currentfloor = floorNum;
        lift.dataset.previousfloor = currentFloor;
        currentFloor = floorNum;
        // Set the currentfloor data attribute of the lift to the liftfloor variable
        lift.dataset.currentfloor = currentFloor;

        // Get the previous floor value for the current lift from the prevFloorMap
        const currFloor = currFloorMap.get(currentLiftId);

        // If the previous floor value exists, set the prevfloor data attribute of the lift to the previous floor value
        if (currFloor !== undefined) {
          lift.dataset.currfloor = currFloor;
        }

        // Update the prevFloorMap with the current floor number as the previous floor value for the current lift
        currFloorMap.set(currentLiftId, currentFloor);
        console.log(currFloorMap);
        // Add the lift to the busy lifts array and remove it from the available lifts array
        busy.push(currentLiftId);
        availableLifts.splice(availableLifts.indexOf(currentLiftId), 1);

        console.log("Available lifts: ", availableLifts);
        console.log("Busy lifts: ", busy);

        // Remove the busy status data attribute when the lift transition ends
        lift.addEventListener("transitionend", function () {
          lift.dataset.status = "free";
          
          // Clear the status data attribute
        });
      });
    });
  }

  runElevator();

  //back button

  back = document.querySelector(".bac-btn");
  back.addEventListener("click", () => {
    location.reload();
  });
}
