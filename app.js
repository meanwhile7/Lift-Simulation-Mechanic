// Conditions of input box //

const input1 = document.getElementById("num-floor");
const input2 = document.getElementById("num-lift");
const myButton = document.getElementById("btn");

function checkInputs(inputValue1, inputValue2) {
  if (inputValue1 > 0 && inputValue2 > 0) {
    container.style.display = "none";
    StartSimulation();
  } else {
    myButton.disabled = true;
  }
}

myButton.addEventListener("click", function () {
  const inputValue1 = parseInt(input1.value);
  const inputValue2 = parseInt(input2.value);

  if (inputValue1 === "" || inputValue2 === "") {
    alert("Please enter values for both inputs");
    return;
  } else {
    if (isNaN(inputValue1) || isNaN(inputValue2)) {
      alert("Please enter valid integer values for both inputs");
      return;
    } else {
      if (inputValue1 < 0 || inputValue2 < 0) {
        alert("negative number not allowed");
        return;
      }
    }
  }

  checkInputs(inputValue1, inputValue2);
});

function createUI() {
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
        const door = document.createElement("div");
        const leftSpan = document.createElement("span");
        const rightSpan = document.createElement("span");
        lift.classList.add("lift");
        lift.setAttribute("id", `lift-${j + 1}`);
        door.classList.add("door");
        leftSpan.classList.add("left");
        rightSpan.classList.add("right");
        lift.appendChild(door);
        door.appendChild(leftSpan);
        door.appendChild(rightSpan);
        floorDiv.appendChild(lift);
      }
    }
  }
   //back button

   back = document.querySelector(".bac-btn");
   back.addEventListener("click", () => {
     location.reload();
   });
   
}

const StartSimulation = () =>{
  createUI();
  // let currentFloor = 1; // initialize the current floor to 1
  const upbtns = document.querySelectorAll(".floor .btn-up");
  const downbtns = document.querySelectorAll(".floor .btn-down");
  const floors = document.querySelectorAll(".floor");
  let currentFloor = 1;

  // Define a map to store the previous floor value for each lift

  function runElevator() {
    moveLift(upbtns, "up");
    moveLift(downbtns, "down");
  }

  const lifts = document.querySelectorAll(".lift");
  lifts.forEach((lift) => {
    lift.dataset.status = "free";
  });

  function moveLift(buttons, direction) {
    const queue = []; // Create a queue to store the lift requests

    buttons.forEach((btn, index) => {
      btn.addEventListener("click", function () {
        const floorNum = parseInt(btn.id.split("-")[1]);
        const floor = Array.from(floors)[index];
        const floorHeight = floor.offsetHeight + 5;

        const liftArray = Array.from(lifts);
        const freeLifts = liftArray.find(
          (lift) => lift.dataset.status === "free"
        );

        const lift = freeLifts;
          if (queue.length === 0) {
            // If the queue is empty, immediately process the request
            processRequest(floorNum);
          } else {
            // If there are pending requests, add the current request to the queue
            queue.push(floorNum);
          }
        
        

        function processRequest(floorNum) {
          lift.style.transform = `translateY(${
            -floorHeight * (floorNum - 1)
          }px)`;
          lift.dataset.status = "busy";
          console.log(
            `The elevator has arrived from floor ${currentFloor} at floor ${floorNum}.`
          );

          const transitionDuration = floorNum * 1;
          lift.style.transition = `transform ${transitionDuration}s ease-in-out`;
          lift.dataset.currentfloor = floorNum;
          currentFloor = floorNum;
          lift.dataset.currentfloor = currentFloor;

          function doorOpenClose(lift) {
            let door = lift.firstChild;

            setTimeout(() => {
              door.children[0].style.transform = "translateX( -40px)";
              door.children[0].style.transition = "all 2.5s ease-in-out";

              door.children[1].style.transform = "translateX( 40px)";
              door.children[1].style.transition = "all 2.5s ease-in-out";
            }, 0);

            setTimeout(() => {
              door.children[0].style.transform = "translateX(0px)";
              door.children[1].style.transform = "translateX(0px)";
            }, 2500);
          }

          setTimeout(() => {
            doorOpenClose(lift);
            setTimeout(() => {
              lift.dataset.status = "free";
              if (queue.length > 0) {
                console.log(queue)
                // If there are pending requests, process the next request in the queue
                const nextFloor = queue.shift();
                processRequest(nextFloor);
              }
            }, 5500);
          }, Math.abs(floorNum) * 1000);
        }
      });
    });
  }

  runElevator();

 
}
