// Conditions of input box //

const input1 = document.getElementById("num-floor");
const input2 = document.getElementById("num-lift");
const myButton = document.getElementById("btn");


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
  for (i = 0; i < input1.value ; i++) {

    // create back button 
    if (i==0){
      const bac = document.createElement("input")
      bac.classList.add("bac-btn")
      main.appendChild(bac)
    }
    const sec = document.createElement("section");
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const h1 = document.createElement("h1");
    const bnt_up = document.createElement("button");
    const bnt_down = document.createElement("button");
    
    sec.classList.add("floor");
    sec.setAttribute("id",`floor-${i + 1}"`)
    div.classList.add("floor-section");
    div2.classList.add("btn-section");
    h1.textContent = `floor ${i + 1}`;
    bnt_up.setAttribute("id",`up-${i+1}`)
    bnt_down.setAttribute("id",`down-${i+1}`)
    bnt_up.classList.add("btn" , "btn-up");
    bnt_down.classList.add("btn", "btn-down");
    bnt_up.textContent = "Up";
    bnt_down.textContent = "Down";
    
    main.appendChild(sec);
    sec.appendChild(div);
    div.appendChild(div2);
    div2.appendChild(h1);
    div2.appendChild(bnt_up);
    div2.appendChild(bnt_down);

    for (j = 0; j < input2.value; j++) {
      if (i === 0) {
        const lift = document.createElement("div");
        const left = document.createElement("span");
        const right = document.createElement("span");
        lift.classList.add("lift");
        lift.setAttribute("id",`lift-${j+1}`)
        left.classList.add("left");
        right.classList.add("right");
        lift.appendChild(left);
        lift.appendChild(right);
        div.appendChild(lift);
      }
    }
  }
    // 
    
    

    const upbtns = document.querySelectorAll(".floor .btn-up");
    const floors = document.querySelectorAll(".floor");
    upbtns.forEach((btn,index) => {
      btn.addEventListener("click", function() {
        const lift = document.querySelector('.lift');
        const floorNum = btn.id.split("-")[1];
        console.log(floorNum)
        const floor = Array.from(floors)[index];
        // const floor = document.querySelectorAll(`#floor-${floorNum}`);
        console.log(floor)
        lift.style.transform = `translateY(${-180  * (floorNum - 1)}px)`;

        // const rect = floor?.getBoundingClientRect();
        // console.log(rect)
        // const lift = document.querySelector(`#lift-${btn.id.split("-")[1]}`);
        // lift.style.transform = `translateY(-${rect.top}px)`;
      });
    });




  // const lift = document.querySelector(".lift");
  // const floors = document.querySelectorAll(".floor");
  // const btns = document.querySelectorAll(".btn-up");

  // btns.forEach((btn, index) => {
  //   btn.addEventListener("click", () => {
  //     const floor = Array.from(floors)[index];
  //     console.log(floor)
  //     const rect = floor.getBoundingClientRect();
  //     // console.log(rect.top);
  //     lift.style.transform = `translateY(-${rect.top}px)`;
  //   });
  // });
    
}
