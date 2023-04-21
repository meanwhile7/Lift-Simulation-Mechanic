// Conditions of input box //

const input1 = document.getElementById("num-floor");
const input2 = document.getElementById("num-lift");
const myButton = document.getElementById("btn");


function checkInputs() {
  input1.addEventListener("input", checkInputs);
  input2.addEventListener("input", checkInputs);
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

function onClickButton() {
  
  checkInputs();
}

myButton.addEventListener("click", onClickButton);



// trying different values

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
    div.classList.add("floor-section");
    div2.classList.add("btn-section");
    h1.textContent = `floor ${i + 1}`;
    bnt_up.setAttribute("id",`up-${i+1}`)
    bnt_down.setAttribute("id",`down-${i+1}`)
    bnt_up.classList.add("btn");
    bnt_down.classList.add("btn");
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
    const upbtn = document.getElementById("up-2")
    upbtn.addEventListener("click",function() {
    const lift = document.querySelector('.lift');
    moveLiftUp();
    })
}
//   for (r=0 ; r < input1.value ; r++){

//     const upbtn = document.getElementById(`up-${r}`)
//     upbtn.addEventListener("click",function() {
//     const lift = document.querySelector('.lift');
//     console.log("upbtn")
//     const rec = lift.getBoundingClientRect();
//     moveLiftUp();
//   // console.log(rec)
// })
//  
    


// const floorButtons = document.querySelectorAll('.btn');

// // Attach event listener to each button
// btn.forEach(btn => {
//  btn.addEventListener('click', moveLiftUp);
// });

//moving the lift

function moveLiftUp() {

  const lift = document.querySelector('.lift');
  lift.style.transform = "translateY(-180px)"

}