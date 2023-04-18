// Conditions of input box //

const input1 = document.getElementById("num-floor");
const input2 = document.getElementById("num-lift");
const myButton = document.getElementById("btn");

function checkInputs() {
  if (input1.value.length > 0 && input2.value.length > 0) {
    myButton.disabled = false;
    myButton.addEventListener("click", function () {
      container.style.display = "none";
    });
  } else {
    myButton.disabled = true;
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
function returnVa() {
  for (i = 0; i < va; i++) {
    const main = document.querySelector(".floor-box");
    const sec = document.createElement("section");
    sec.classList.add("floor");
    main.appendChild(sec);
  }
}
