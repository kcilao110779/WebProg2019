let cvsWrapper = null;

var birdX = 220;
var birdY = 300;
var vx=0;
let vy=0.3;
var ay=2.1;
var ang = -0.7;
var ang_a = 1.05;

var bgImg;
var baseImg;
var bg_x = 0;
var bg_v = 1.7; //背景移動的速度

var soundWing;
var soundPoint;
var pipeUp;
var pipeDown;
var pipes = [];
var pipeWidth;

var gameOverImg;
var gameOver; //boolean判斷遊戲結束了沒
var gameStartImg;
var gameStart = false;

var scoreCount = 0;
var scoreImg = new Array(10);

function preload() {
    bgImg = loadImage("assets/sprites/background-day.png");
    baseImg = loadImage("assets/sprites/base.png");
    birdImg = loadImage("assets/sprites/bluebird-midflap.png");
    pipeUp = loadImage("assets/sprites/pipe-green-upper.png");
    pipeDown = loadImage("assets/sprites/pipe-green-lower.png");
    soundWing = loadSound("assets/audio/wing.wav");
    soundPoint = loadSound("assets/audio/point.wav");
    gameOverImg = loadImage("assets/sprites/gameover.png");
    gameStartImg = loadImage("assets/sprites/message.png");
    for (var i = 0; i < scoreImg.length; i++){  //載入計分的圖示
        console.log("assets/sprites/"+i+".png"); 
        scoreImg[i] = loadImage("assets/sprites/"+i+".png");
    }

}

function setup() {
    // Game basic setup.
    // Mounting canvas onto div for convenient styling.
    cvsWrapper = document.getElementById("canvasWrapper");
    const myCanvas = createCanvas(
        cvsWrapper.offsetWidth,
        cvsWrapper.offsetHeight
    );
    myCanvas.parent("canvasWrapper");
    bgImg.width = width;
    bgImg.height = height;
    baseImg.width = width;
    gameStartImg.width = width;
    gameStartImg.height = height;
    pipeWidth = pipeUp.width;
    background_img();
    image(gameStartImg, 0,0);
    
}


function draw() {
    background_img();
    if (!gameStart){  //顯示初始畫面
        image(gameStartImg, 0,0);
        image(birdImg, width/2 - 30, height/2 + 20, birdImg.width * 2, birdImg.height * 2);
    }
    else{
        if (frameCount % 180 == 0){
            pipes.push(new pipe());
        }
        for (var i = pipes.length-1; i >= 0 && !gameOver; i--){
            pipes[i].show();
            pipes[i].move();
            if (pipes[i].hits()){
                console.log("HIT");
                gameOver = true;
                break;
            }
            if (pipes[i].x < -pipeUp.width){  //柱子超出畫面後，可以將此柱子delete
                pipes.splice(i,1)
            } 
        }
        if (gameOver) { // gameOver的畫面控制
            for (var i = pipes.length-1; i >= 0; i--){  //讓柱子停下來
                pipes[i].speed = 0;
                pipes[i].show();
            }
            bg_v = 0; //讓背景停下來
            image(gameOverImg, width * 1/5, height * 1/4, gameOverImg.width * 1.5, gameOverImg.height * 1.5); //顯示gameOver的字眼
        }
        showScore();
        image(baseImg, 0, 670);
        bird();
    }  
}
function pipe(){
    this.heightScale = random(0.4,1.5); //控制上方柱子高度的隨機變化
    this.x = width;
    this.top = pipeUp.height * this.heightScale; //上方柱子的長度
    this.space = 85; //兩個柱子間的空隙大小
    this.y_down = this.top + this.space; //下方柱子的y座標
    this.speed = bg_v;

    this.getPoint = false; //用以判斷鳥通過該柱子了沒

    this.move = function (){
        this.x -= this.speed;   
    }
    this.show = function (){
        image(pipeUp, this.x, 0, pipeWidth, this.top);
        image(pipeDown, this.x,  this.y_down, pipeWidth, pipeDown.height*1.5);
    }
    this.hits = function(){ //用以判斷鳥有沒有撞到柱子
        if (birdX > this.x && birdX < this.x + pipeWidth){ //鳥在柱子的x座標內
            if (birdY < this.top || birdY >  this.y_down){  //鳥碰到柱子
              return true;
            }
            else{ //鳥沒碰到柱子，得分!!!
                if (!this.getPoint && !gameOver){ //用!getPoint判斷得分過了沒，以免在1/60秒內一直得分或一直音效
                  soundPoint.play();
                  this.getPoint = true;
                  scoreCount ++;
                  console.log(scoreCount);
                }
            }
        }
        return false;
    }
  }
function background_img(){
   // background(220);
    image(bgImg, bg_x, 0);
    image(bgImg, width + bg_x, 0); //讓第二張背景接續再上一張背景後面
    if (width + bg_x < 0){ //第二張背景超出畫面後再歸零bg_x重來
        bg_x = 0; 
    }
    bg_x -= bg_v;
    
   
}
function showScore(){
  if (scoreCount < 10)
      image(scoreImg[scoreCount],width/2, 130);
  else{ //分數超過兩位數時，要載入兩張圖片，預設沒人會無聊到玩到三位數ㄏㄏ
      var digitFirst = scoreCount % 10;
      var digitSecond = (scoreCount - scoreCount % 10) / 10;
      image(scoreImg[digitFirst],width/2+12, 130);
      image(scoreImg[digitSecond],width/2-12, 130);
  }
}
function bird(){
    vy-=ay*0.13;
    birdY -= vy;
    translate(birdX, birdY);
    if (ang < 1){ //不要讓鳥囀太多會頭暈QQ
        ang +=0.03;
        rotate(ang);
    }
    else 
       rotate(ang);

    image(birdImg, 0, 0);
    if (birdY < 0 || birdY > 630){ //鳥掉到地板或是飛到天花板上 
        console.log("fail");
        gameOver = true;
        ay = 0; //讓鳥停住不動
        vy = 0;
    }
  
}
function keyPressed() {
    gameStart = true;
    if (keyCode === 32 && !gameOver) {
        soundWing.play();
        vy = 3.7;
        if (ang > -1){  //不要讓鳥囀太多會頭暈QQ
          ang = ang - 0.75;
          rotate(ang);
        }
    }
    if (keyCode === 32 && gameOver){
        gameOver = false;
    }

}
	
