//control the move of pads
function move(){
        if(panel1.isLeft)
            x1 -=15*slow;
        if(panel1.isRight)
            x1 +=15*slow;
        if(panel2.isLeft)
            x2 -=15*slow;
        if(panel2.isRight)
            x2 +=15*slow;
    
        if(x1 <80)
            x1 = 80;
        if(x1 > width/2 - 15 - 80)
            x1 = width/2 - 95;
        if(x2 < width/2 + 15 + 80)
            x2 = width/2 + 95;
        if(x2 > width - 80)
            x2 = width - 80;        
    }


function lose(){
       if(ball.position.y> height+20 && ball.position.x<width/2){
          reset();
          score2++;
          }
       if(ball.position.y> height+20 && ball.position.x>width/2){
          reset();
          score1++;
          } 
}

var panel1;
var panel2;
var ball;
var img;
var score1;
var score2;
var wallTop, wallBottom, wallLeft, wallRight, wallMid;
var x1;
var x2;
var gravity = 0;
var time = 0;
var countTime;

var power;
var doubleG = 1;
var doubleV = 1;
var slow = 1;
var bc = 0;
var c;
var v;
var b;
var n;
var pList;
var theP;
var sts = 20;


function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    x1 = width/4;
    x2 = width - width/4;
    
    img = loadImage("assets/ls.png");
    
    panel1 = createSprite(width/4, height-60, 200, 15);
    panel1.immovable = true;
    panel2 = createSprite(width - width/4, height-60, 200, 15);
    panel2.immovable = true;
    
    ball = createSprite(width/4, height-400, 40, 40);
    ball.addImage(img);
    ball.setCollider("circle", 0,0,20);

    wallTop = createSprite(width/2, -15, width+60, 30);
    wallTop.immovable = true;
    wallLeft = createSprite(-15, height/2, 30, height);
    wallLeft.immovable = true;
    wallRight = createSprite(width+15, height/2, 30, height);
    wallRight.immovable = true;
    wallMid = createSprite(width/2, height, 20, height); 
    wallMid.immovable = true;
    panel1.shapeColor = color(230,255,230);
    panel2.shapeColor = color(230,255,230);
    ball.shapeColor = color(255,255,255);
    wallMid.shapeColor = color(255,255,255);
    score1 = 0;
    score2 = 0;
    
    pList = ["dg","ds","s","hl"];

}

function draw() {
	background(bc);
    
    noFill();
    stroke(255,255,255,200);
    rect(width/2-400,40,800,20);
    fill(150,230,255);
    rect(width/2-400,40,time*0.45,20);
    
    noStroke();
    move();
    panel1.position.x = constrain(x1, 100, width/2-100);
    panel2.position.x = constrain(x2, width/2+100, width-100);
    
    if(keyDown('Q')){
    panel1.rotation -= 4;
        if(panel1.rotation < -45){
            panel1.rotation = -45;
        }
    }
    if(keyDown('W')){
    panel1.rotation += 4;
        if(panel1.rotation > 45){
            panel1.rotation = 45;
        }
    }
    
    if(keyDown('I')){
    panel2.rotation -= 4;
        if(panel2.rotation < -45){
            panel2.rotation = -45;
        }
    }
    if(keyDown('O')){
    panel2.rotation += 4;
        if(panel2.rotation > 45){
            panel2.rotation = 45;
        }
    }
    
    ball.velocity.y += gravity*doubleG;
    
    if(ball.bounce(panel1)){
       ball.setSpeed(10*doubleV, ball.getDirection() + panel1.rotation);
       ball.velocity.y -= 10;
    }
    if(ball.bounce(panel2)){
       ball.setSpeed(10*doubleV, ball.getDirection() + panel2.rotation);
       ball.velocity.y -= 10;
    }
    
    ball.bounce(wallTop);
    ball.bounce(wallLeft);
    ball.bounce(wallRight);
    ball.bounce(wallMid);

    showPower();
    lose();
    showScore();
    timer();
    drawSprites();
    
    //ball.debug = mouseIsPressed;
    //panel1.debug = mouseIsPressed;
    //panel2.debug = mouseIsPressed;
}

//input keys and their effects
function keyPressed(){
    if(keyCode==32 && ball.velocity.x == 0 && ball.velocity.y == 0){
        sts = 0;
        ball.setSpeed(10, 90);
        gravity = .2;
        countTime = true;
        theP = int(random(pList.length));
    }
    if(key=='A')
        panel1.isLeft = true;
    if(key=='S')
        panel1.isRight = true;
    if(key=='K')
        panel2.isLeft = true;
    if(key=='L')
        panel2.isRight = true;
    
    if(c==true && key=='C')
        doubleG = 2;
    if(v==true && key=='V')
        doubleV = 2;
    if(b==true && key=='B')
        slow = 0.5;
    if(n==true && key=='N')
        bc = 250;
}
function keyReleased(){
    if(key=='A')
        panel1.isLeft = false;
    if(key=='S')
        panel1.isRight = false;
    if(key=='K')
        panel2.isLeft = false;
    if(key=='L')
        panel2.isRight = false;
}

//reset
function reset(){
    x1 = width/4;
    x2 = width - width/4;
    panel1.rotation = 0;
    panel2.rotation = 0;
    ball.setSpeed(0,0);
    gravity = 0;
    doubleG = 1;
    doubleV = 1;
    slow = 1;
    bc = 0;
    c = false;
    v = false;
    b = false;
    n = false;
    time = 0;
    power = false;
    countTime = false;
    ball.position.x = width/4;
    ball.position.y = height - 400;
    sts = 20;
}

function showScore(){
    fill(200);
    textSize(50);
    text(score1,width/8,70);
    text(score2,width-width/8-25,70);
    fill(255);
    noStroke();
    textSize(30);
    text("Rotate: Q/W",0,120);
    text("Move: A/S",0,150);
    text("Rotate: I/O",width-170,120);
    text("Move: K/L",width-140,150);
    
    
    fill(0,255,0);
    noStroke();
    textSize(sts);
    text("Press Space Button to Start",width/4-120,height - 450);
}
  
function timer(){
    if(countTime == true){
    if(time > 800/0.45){
       time = 800/0.45;
       power = true;
    }else{
       time++
    }
 }
}

//control of power
function showPower(){
    if(power == true){
        fill(255,255,255);
        textSize(30);
        if(pList[theP] == "dg"){
        text("Gravity×2:C",width/2-100,85);
        c = true;
        }
        if(pList[theP] == "ds"){
        text("Speed×2:V",width/2-90,85);
        v = true;
        }
        if(pList[theP] == "s"){
        text("Slow:B",width/2-50,85);
        b = true;
        }
        if(pList[theP] == "hl"){
        text("High Light:N",width/2-110,85);
        n = true;
        }
    }
}