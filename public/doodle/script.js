document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const doodleman = document.createElement("div");
    let doodlerLeftSpace = 50;
    let begin = 150;
    let doodlerBottomSpace = begin;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId;
    let downTimerId;
    let jumping = true;
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimerId;
    let rightTimerId;
    let score = 0;
    class Platform {
    constructor(newPlatBottom) {
    this.bottom = newPlatBottom;
    this.left = Math.random() * 315;
    this.visual = document.createElement("div");
    const visual = this.visual;
    visual.classList.add("platform");
    visual.style.left = this.left + "px";
    visual.style.bottom = this.bottom + "px";
    grid.appendChild(visual);
    }
    }
    function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
    let platGap = 600 / platformCount;
    let newPlatBottom = 100 + i * platGap;
    let newPlat = new Platform(newPlatBottom);
    platforms.push(newPlat);
    console.log(platforms);
    }
    }
    function movePlatforms() {
    if (doodlerBottomSpace > 200) {
    platforms.forEach(platform => {
    platform.bottom -= 4;
    let visual = platform.visual;
    visual.style.bottom = platform.bottom + "px";
    if (platform.bottom < 10) {
    let firstPlatform = platforms[0].visual;
    firstPlatform.classList.remove("platform");
    platforms.shift();
    console.log(platforms);
    score++;
    let newPlatform = new Platform(600);
    platforms.push(newPlatform);
    }
    });
    }
    }
    function createDoodler() {
    grid.appendChild(doodleman
);
    doodleman.classList.add("doodleman");
    doodlerLeftSpace = platforms[0].left;
    doodleman.style.left = doodlerLeftSpace + "px";
    doodleman.style.bottom = doodlerBottomSpace + "px";
    }
    function fall() {
    jumping = false;
    clearInterval(upTimerId);
    downTimerId = setInterval(function() {
    doodlerBottomSpace -= 5;
    doodleman.style.bottom = doodlerBottomSpace + "px";
    if (doodlerBottomSpace <= 0) {
    gameOver();
    }
    platforms.forEach(platform => {
    if (
    doodlerBottomSpace >= platform.bottom &&
    doodlerBottomSpace <= platform.bottom + 15 &&
    doodlerLeftSpace + 60 >= platform.left &&
    doodlerLeftSpace <= platform.left + 85 &&
    !jumping
    ) {
    console.log("landed");
    begin = doodlerBottomSpace;
    jump();
    jumping = true;
    }
    });
    }, 20);
    }
    function jump() {
    clearInterval(downTimerId);
    jumping = true;
    upTimerId = setInterval(function() {
    doodlerBottomSpace += 20;
    doodleman.style.bottom = doodlerBottomSpace + "px";
    if (doodlerBottomSpace > begin + 200) {
    fall();
    jumping = false;
    }
    }, 30);
    }
    function moveLeft() {
    if (isGoingRight) {
    clearInterval(rightTimerId);
    isGoingRight = false;
    }
    isGoingLeft = true;
    leftTimerId = setInterval(function() {
    if (doodlerLeftSpace >= 0) {
    doodlerLeftSpace -= 5;
    doodleman.style.left = doodlerLeftSpace + "px";
    } else moveRight();
    }, 20);
    }
    function moveRight() {
    if (isGoingLeft) {
    clearInterval(leftTimerId);
    isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(function() {
    if (doodlerLeftSpace <= 340) {
    doodlerLeftSpace += 5;
    doodleman.style.left = doodlerLeftSpace + "px";
    } else moveLeft();
    }, 20);
    }
    function moveStraight() {
    isGoingLeft = false;
    isGoingRight = false;
    clearInterval(rightTimerId);
    clearInterval(leftTimerId);
    }
    function control(e) {
    doodleman.style.bottom = doodlerBottomSpace + "px";
    if (e.key === "ArrowLeft") {
    moveLeft();
    } else if (e.key === "ArrowRight") {
    moveRight();
    } else if (e.key === "ArrowUp") {
    moveStraight();
    }
    }
    function gameOver() {
    console.log("game over");
    isGameOver = true;
    while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
    }
    grid.innerHTML = score;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
    }
    function start() {
    if (!isGameOver) {
    createPlatforms();
    createDoodler();
    setInterval(movePlatforms, 30);
    jump(begin);
    document.addEventListener("keyup", control);
    }
    }
    start();
   });