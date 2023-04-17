
    //input page js script 
    /*function returnVa(){
        const btn = document.getElementById("btn");
        btn.addEventListener("click", function(){
            const floor = document.getElementById("num-floor").value
            const lift = document.getElementById("num-lift").value
            alert(floor)
      })
    } */
    let va = 0
const floor = document.querySelector("#floor")
const flo = document.querySelector(".tem")

floor.addEventListener('change',(e)=>{
    va = e.target.value
})

    function returnVa(){
        console.log(va)
    } 
    
    for (i = 0; i< floor;i++){
        const main = document.querySelector(".floor-box")
        const sec = document.createElement("section")
        sec.classList.add("floor");
        main.appendChild(sec)
    }
    
  

