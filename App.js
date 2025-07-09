let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-btn")
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")

let turn0 = true; //player x, player0

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],

];

const resetgame = () => {
    turn0 = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
    msgcontainer.classList.remove("show-animation");
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {

        // console.log("box was clicked ");
        if (turn0 === true) {
            box.innerText = "O";
            box.classList.add("o-style");
            turn0 = false;
        } else {
            box.innerText = "X";
            box.classList.add("x-style");
            turn0 = true;
        }
        box.disabled = true;
        checkwinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x-style", "o-style")
    }
}

const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    msgcontainer.classList.add("show-animation");
    disableBoxes();
}

// fordraw 
const showDraw = () => {
    msg.innerText = "😐 It's a Draw!";
    msgcontainer.classList.remove("hide");
    msgcontainer.classList.add("show-animation");
    disableBoxes();
}

const checkwinner = () => {
    for (let patter of winPatterns) {
        // console.log(patter[0],patter[1],patter[2])
        let pos1val = boxes[patter[0]].innerText;
        let pos2val = boxes[patter[1]].innerText;
        let pos3val = boxes[patter[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                // console.log("Winner", pos1val);
                showWinner(pos1val);
            }
        }
    }

    let isDraw = true;
    boxes.forEach((box)=>{
        if(box.innerText === ""){
            isDraw = false;
        }
    });

    if(isDraw){
       showDraw();
    }
}

newGame.addEventListener('click', resetgame);
resetbtn.addEventListener('click', resetgame)


document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});

