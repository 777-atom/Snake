const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/photo-2.jpg";

const foodImg = new Image();
foodImg.src = "img/favicon1.ico";

let box = 32;
let score = 0;
let food = {
    x: Math.floor(Math.random()*17*1)*box,
    y: Math.floor(Math.random()*17*1)*box
}

let snake = [];
snake[0] = {
    x: 10*box,
    y: 10*box
}

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != "right")
        dir = "left";
    else if(event.keyCode == 38 && dir != "down")
        dir = "up";
    else if(event.keyCode == 39 && dir != "left") 
        dir = "right";
    else if(event.keyCode == 40 && dir != "up")
        dir = "down"; 
}

function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game),
            alert("GAME OVER!!!");
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0, 600, 600)
    ctx.drawImage(foodImg, food.x, food.y)
    
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "black" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.fillStyle = "black";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 1, box * 2);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random()*17*1)*box,
            y: Math.floor(Math.random()*17*1)*box
        };

    }else {
        snake.pop();
    }

    if(snakeX < 0 * box || snakeX > box * 18
        || snakeY <  0 * box || snakeY > box * 18)
        clearInterval(game),
        alert("GAME OVER!!!");

    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;
    
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    
    eatTail(newHead, snake);

    snake.unshift(newHead);

}

let game = setInterval(drawGame, 100);
