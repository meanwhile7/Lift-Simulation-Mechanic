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

  function runElevator() {
    moveLift(upbtns, "up");
    moveLift(downbtns, "down");
  }

  const lifts = document.querySelectorAll(".lift")
  lifts.forEach((lift)=>{
    lift.dataset.status="free"
  })
  

  function moveLift(buttons, direction) {
    buttons.forEach((btn, index) => {
      btn.addEventListener("click", function () {
        const floorNum = parseInt(btn.id.split("-")[1]);
        const floor = Array.from(floors)[index];
        const floorHeight = floor.offsetHeight + 5;

        const liftArray = Array.from(lifts)
        const freeLifts = liftArray.find((lift) => lift.dataset.status === "free");
        console.log(freeLifts)

        let currentLiftId = availableLifts[0];
        const lift = document.querySelector(`#${currentLiftId}`);
        
  
        lift.style.transform = `translateY(${-floorHeight * (floorNum - 1)}px)`;
        lift.dataset.status = "busy";
        console.log(
          `The elevator has arrived from floor ${currentFloor} at floor ${floorNum}.`
        );
  
        const transitionDuration = floorNum * 1;
        lift.style.transition = `transform ${transitionDuration}s ease-in-out`;
        lift.dataset.currentfloor = floorNum;
        lift.dataset.previousfloor = currentFloor;
        currentFloor = floorNum;
        lift.dataset.currentfloor = currentFloor;
  
        const liftDoors = document.querySelectorAll(`#${currentLiftId} .door`);
        liftDoors.forEach((door) => {
          door.classList.add("open");
        });
  
        busy.push(currentLiftId);
        availableLifts.splice(availableLifts.indexOf(currentLiftId), 1);
  
        console.log("Available lifts: ", availableLifts);
        console.log("Busy lifts: ", busy);
  
        lift.addEventListener("transitionend", function () {
          lift.dataset.status = "free";
        });
  
        setTimeout(() => {
          // doorOpenClose(lift);
          setTimeout(() => {
            lift.dataset.status = "free";
          }, 5500);
        }, Math.abs(floorNum) * 2000);
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
