window.addEventListener("load", () => {

    /***** SELECTORS *****/
    let storedName = localStorage.getItem("urName");
    let startButton = document.querySelector(".start");
    let welcome = document.querySelector("#welcome");
    let greeting = document.querySelector("#greeting");
    let timer = document.querySelector("#timer");
    let scoreContainer = document.querySelector("#score");
    let killedContainer = document.querySelector("#killed");
    let container = document.querySelector(".container3");
    let winner = document.querySelector(".container5");
    let loser = document.querySelector(".container6");
    let scoring1 = document.querySelector("#scoring1");
    let scoring2 = document.querySelector("#scoring2");
    let lastScore = document.querySelector("#scored");
    let lastVisit = document.querySelector("#visit");
    let playAgain1 = document.querySelector(".again1");
    let playAgain2 = document.querySelector(".again2");
    let bird = ["../images/1.gif", "../images/2.gif", "../images/3.gif"];
    let downInterval = null;
    let rightInterval = null;
    let bombing = null;
    let birdsFly = null;
    let seconds = 59;
    let score = 0;
    let birdsKilled = 0;
    let dateTime = new Date().toLocaleString();
    let storedScore = localStorage.getItem("score");
    let storedDate = localStorage.getItem("date");

    welcome.innerHTML = `Welcome ${storedName}`;
    greeting.innerHTML = `Welcome ${storedName}`;
    lastScore.innerHTML = `Last Score: ${storedScore}.`;
    lastVisit.innerHTML = `Last Visit: ${storedDate}.`

    /***** GAME START *****/
    startButton.addEventListener("click", () => {
        localStorage.setItem("date", dateTime);
        container.style.display = "none";
        timeFunction();
        birdsFunction();
        bombFunction();
    });

    /***** BOMB *****/
    let bombFunction = () => {
        bombing = setInterval(() => {
            let bomb = document.createElement("img");
            bomb.src = "../images/bomb.png";
            bomb.classList.add('bomb');
            let bombContainer = document.querySelector(".bombContainer");
            bombContainer.appendChild(bomb);
            let random = Math.floor(Math.random() * (window.innerWidth - bomb.width) + bomb.width);
            bomb.style.left = 0.8 * random + "px";
            bomb.style.top = 0 + "px";
        }, 1000)

        downInterval = setInterval(() => {
            document.querySelectorAll(".bomb").forEach((bomb) => {
                if (parseInt(bomb.style.top) < 0.97 * (window.innerHeight - bomb.height) + bomb.style.height) {
                    bomb.style.top = parseInt(bomb.style.top) + 10 + "px";
                }
                else {
                    bomb.remove();
                }
            });
            bombArray = document.querySelectorAll(".bomb");
            bombArray.forEach(bomb => {
                bomb.onclick = function () {
                    birds = document.querySelectorAll(".bird");
                    birds.forEach(bird => {
                        console.log(bird.src);
                        console.log(score);
                        let bombLeft = 120 + bird.offsetLeft + bird.offsetWidth > bomb.offsetLeft && bird.offsetLeft + bird.offsetWidth < bomb.offsetLeft + bomb.offsetWidth + 410;
                        let bombTop = 120 + bird.offsetTop + bird.offsetWidth > bomb.offsetTop && bird.offsetTop + bird.offsetWidth < bomb.offsetTop + bomb.offsetWidth + 410;
                        if (bombLeft && bombTop) {
                            counting(bird);
                            bird.remove();
                            bomb.src = "../images/boom.png";
                            setTimeout(() => {
                                bomb.remove();
                            }, 200);
                            birdsKilled += 1;
                            scoreContainer.innerHTML = `Score: ${score}`;
                            killedContainer.innerHTML = `Birds Killed: ${birdsKilled}`;
                        }
                    });

                }
            })
        }, 50)

        let counting = (bird) => {
            if (bird.src.slice(21) == "/images/1.gif") {
                console.log("bombing1");
                score += 5;
            }
            if (bird.src.slice(21) == "/images/2.gif") {
                console.log("bombing2");
                score += 10;
            }
            if (bird.src.slice(21) == "/images/3.gif") {
                console.log("bombing3");
                score -= 10;
            }
            localStorage.setItem("score", score);
        }
    }

    /***** BIRDS *****/
    let birdsFunction = () => {
        birdsFly = setInterval(() => {
            let birdImages = document.createElement("img");
            let randomBirds = Math.floor(Math.random() * 3);
            let selectedBird = bird[randomBirds];
            if (selectedBird == "../images/1.gif") {
                birdImages.classList.add("bird1")
            }
            else if (selectedBird == "../images/2.gif") {
                birdImages.classList.add("bird2")
            }
            else if (selectedBird == "../images/3.gif") {
                birdImages.classList.add("bird3")
            }
            document.querySelector(".imageContainer").appendChild(birdImages);
            birdImages.src = selectedBird;
            birdImages.classList.add("bird");
            let randomizing = Math.floor(Math.random() * (innerHeight - birdImages.height) + birdImages.height);
            birdImages.style.left = -20 + "px";
            birdImages.style.top = 0.7 * randomizing + "px";
        }, 700)

        rightInterval = setInterval(() => {
            document.querySelectorAll(".bird").forEach((birdImages) => {
                if (parseInt(birdImages.style.left) < 0.97 * (innerWidth - birdImages.width) + birdImages.style.width) {
                    birdImages.style.left = parseInt(birdImages.style.left) + 10 + "px";
                }
                else {
                    birdImages.remove();
                }
            });
        }, 30)
    }

    /***** TIMER *****/
    let timeFunction = () => {
        let time = setInterval(() => {
            if (seconds < 60 && seconds > 9) {
                timer.innerHTML = `Time: 0:${seconds--}`;
            }
            else if (seconds < 10 && seconds > -1) {
                timer.innerHTML = `Time: 0:0${seconds--}`;
            }
            else {
                clearInterval(time);
                clearInterval(downInterval);
                clearInterval(rightInterval);
                clearInterval(bombing);
                clearInterval(birdsFly);
                document.querySelector(".imageContainer").remove();
                if (score >= 50) {
                    winner.style.visibility = "visible";
                    scoring1.innerHTML = `Your score is ${score}.`;
                    playAgain1.addEventListener("click", () => {
                        location.reload();
                    });
                }
                else {
                    loser.style.visibility = "visible";
                    scoring2.innerHTML = `Your score is ${score}.`;
                    playAgain2.addEventListener("click", () => {
                        location.reload();
                    });
                }
            }
        }, 1000);
    }

});    