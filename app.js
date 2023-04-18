// Conditions of input box //

const input1 = document.getElementById("num-floor");
const input2 = document.getElementById("num-lift");
const myButton = document.getElementById("btn");

function checkInputs() {
  if(input1.value.length < 0 || input2.value.length < 0){
    myButton.disabled = true;
    alert("negative number not allowed")
  } else {
    if (input1.value.length > 0 && input2.value.length > 0) {
      myButton.disabled = false;
      myButton.addEventListener("click", function () {
        container.style.display = "none";
      });
    } else {
      myButton.disabled = true;
    }
  }
  
}
input1.addEventListener("input", checkInputs);
input2.addEventListener("input", checkInputs);

//

let va = 0;
input1.addEventListener("change", (e) => {
  //store value of
  va = e.target.value;
});
    
function createFloor() {
  const main = document.querySelector(".floor-box");

  for (i = 0; i < va; i++) {
    const sec = document.createElement("section");
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const h1 = document.createElement("h1");
    const bnt_up = document.createElement("button");
    const bnt_down = document.createElement("button");
    sec.classList.add("floor");
    div.classList.add("floor-section");
    div2.classList.add("btn-section");
    h1.textContent = (`floor ${i + 1}`);
    bnt_up.classList.add("btn");
    bnt_down.classList.add("btn");
    bnt_up.textContent=("Up");
    bnt_down.textContent=("Down");
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
        left.classList.add("left");
        right.classList.add("right");
        lift.appendChild(left);
        lift.appendChild(right);
        div.appendChild(lift);
      }
    }
  }
}


