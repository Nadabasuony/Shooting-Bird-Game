window.addEventListener("load",()=>{

    let input= document.getElementById("name");
    let goButton= document.querySelector(".go");
    let noNameError= document.getElementById("noNameError");

    function returnText(){
        localStorage.setItem("urName", input.value);
    }

        goButton.addEventListener("click", ()=>{
            if(input.value=="")
            {
                noNameError.classList.remove("hidden");
            }   
            else {
                noNameError.classList.add("hidden");
                returnText();
                window.location.href = "../pages/game.html";
            }
        });
});




