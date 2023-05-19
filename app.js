// Conditions of input box //

const number_of_floors = document.getElementById("num-floor");
const number_of_lifts = document.getElementById("num-lift");
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
  const floors_value = parseInt(number_of_floors.value);
  const lifts_value = parseInt(number_of_lifts.value);

  if (floors_value === "" || lifts_value === "") {
    alert("Please enter values for both inputs");
    return;
  } else {
    if (isNaN(floors_value) || isNaN(lifts_value)) {
      alert("Please enter valid integer values for both inputs");
      return;
    } else {
      if (floors_value < 0 || lifts_value < 0) {
        alert("negative number not allowed");
        return;
      }
    }
  }

  checkInputs(floors_value, lifts_value);
});

function createUI() {
  const main = document.querySelector(".floor-box");
  for (let i = 0; i < number_of_floors.value; i++) {
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
    upBtn.classList.add("btn-up");
    downBtn.classList.add("btn-down");
    upBtn.textContent = "Up";
    downBtn.textContent = "Down";

    main.appendChild(floorSection);
    floorSection.appendChild(floorDiv);
    floorDiv.appendChild(btnDiv);
    btnDiv.appendChild(floorHeading);
    btnDiv.appendChild(upBtn);
    btnDiv.appendChild(downBtn);

    for (let j = 0; j < number_of_lifts.value; j++) {
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

const StartSimulation = () => {
  createUI();
  // let currentFloor = 1; // initialize the current floor to 1
  const upbtns = document.querySelectorAll(".btn-up");
  const downbtns = document.querySelectorAll(".btn-down");
  const floors = document.querySelectorAll(".floor");
  const queue = [];

  function runElevator() {
    moveLift(upbtns);
    moveLift(downbtns);
  }

  const lifts = document.querySelectorAll(".lift");
  lifts.forEach((lift) => {
    lift.dataset.status = "free";
  });

  const moveLift = (buttons) => {
    let liftBusy = false; // Flag to indicate if the lift is currently busy

    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        queue.push(parseInt(btn.id.split("-")[1]));

        if (!liftBusy) {
          processQueue();
        }
      });
    });

    const processQueue = () => {
      if (queue.length > 0) {
        liftBusy = true;

        const target = queue.shift();
        const floor = Array.from(floors)[target - 1];
        const floorHeight = floor.offsetHeight + 5;
        const freeLift = getFreeLift();

        if (freeLift) {
          liftmov(freeLift, target, floorHeight);
        }
      }
    };

    const getFreeLift = () => {
      return Array.from(lifts).find((lift) => lift.dataset.status === "free");
    };

    const liftmov = (lift, target_floor, floorHeight) => {
      lift.style.transform = `translateY(${
        -floorHeight * (target_floor - 1)
      }px)`;
      lift.dataset.status = "busy";
      const transitionDuration = target_floor * 1;
      lift.style.transition = `transform ${transitionDuration}s ease-in-out`;

      setTimeout(() => {
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
        setTimeout(() => {
          lift.dataset.status = "free";
          liftBusy = false;
          if (queue.length > 0) {
            processQueue(); // Process the next request in the queue
          }
        }, 5500);
      }, Math.abs(target_floor) * 1000);
    };
  };

  runElevator();
};
