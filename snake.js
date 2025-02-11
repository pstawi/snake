document.addEventListener("DOMContentLoaded", function() {

    console.log("DOM chargé");

const burgerIMG = new Image();
burgerIMG.src = "./img/burger.png";

const canvas = document.getElementById("serpent");
const graph = canvas.getContext("2d");
let corpsSerpent = 20;
let serpent = [
    {x: 200, y: 200}
];

canvas.width = 400;
canvas.height = 400;
let burger = {
    x: Math.floor(Math.random()*(canvas.width/corpsSerpent)) * corpsSerpent,
    y: Math.floor(Math.random()*(canvas.height/corpsSerpent)) * corpsSerpent,
};
graph.fillStyle = "yellow";
graph.fillRect(200, 200, corpsSerpent, corpsSerpent);





console.log(burger);

function dessinerBurger() {
    // graph.fillStyle = "red";
    // graph.fillRect(burger.x, burger.y, 10, 10);
    graph.drawImage(burgerIMG, burger.x, burger.y, corpsSerpent, corpsSerpent);
}

function mangerBurger() {
    if (serpent[0].x === burger.x && serpent[0].y === burger.y) {
        serpent.push({});
        
        burger = {
            x: Math.floor(Math.random() *(canvas.width/corpsSerpent)) * corpsSerpent,
            y: Math.floor(Math.random() *(canvas.height/corpsSerpent)) * corpsSerpent,
        };
        
    }
};


let direction = "bas";

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" && direction !== "bas") {
        direction = "haut";
    }
    if (event.key === "ArrowDown" && direction !== "haut") {
        direction = "bas";
    }
    if (event.key === "ArrowLeft" && direction !== "droite") {
        direction = "gauche";
    }
    if (event.key === "ArrowRight"  && direction !== "gauche") {
        direction = "droite";
    }
});

function miseAJourSerpent(){
    const teteSerpent = {x: serpent[0].x, y: serpent[0].y};
    if(direction === "haut"){
        teteSerpent.y = teteSerpent.y - corpsSerpent
    }
    if(direction === "bas"){
        teteSerpent.y = teteSerpent.y + corpsSerpent
    }
    if(direction === "gauche"){
        teteSerpent.x = teteSerpent.x - corpsSerpent
    }
    if(direction === "droite"){
        teteSerpent.x = teteSerpent.x + corpsSerpent
    }

    serpent.unshift(teteSerpent);
    serpent.pop();
}

function dessinerSerpent() {
    graph.clearRect(0, 0, canvas.width, canvas.height);
    serpent.forEach(partie => {
        graph.fillStyle = "yellow";
        graph.fillRect(partie.x, partie.y, corpsSerpent, corpsSerpent)
    });
}

function collision(){
    const teteSerpent = serpent[0];

    // limite du canvas
    if(teteSerpent.x < 0 || teteSerpent.x >= canvas.width || teteSerpent.y < 0 || teteSerpent.y >= canvas.height){
        alert("Game Over bord touché");
    };

    //serpent
    for(let i = 1; i < serpent.length; i++){
        if(serpent[0].x === serpent[i].x && serpent[0].y === serpent[i].y){
            alert("Game Over");
        }
    }

}

setInterval(() => {
    miseAJourSerpent();
    dessinerSerpent();
    mangerBurger();
    dessinerBurger();
    collision();
    console.log(serpent[0].x, serpent[0].y);
}, 100);



});