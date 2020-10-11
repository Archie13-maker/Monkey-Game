var monkey , monkey_running;
var banana, bananaImage;
var obstacle, obstacleImage;
var foodsGroup;
var obstaclesGroup;
var ground;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
function setup() {
monkey=createSprite(200,400,10,10);
monkey.addAnimation("running", monkey_running);
monkey.scale=0.1;
  
ground=createSprite(450,440,700,20);
ground.velocityX=-4;


foodsGroup = createGroup();
obstaclesGroup = createGroup();
}

function draw() {
createCanvas(450,450);
stroke("black");
textSize(15);
fill("black");  
text("Survival Time:"+score,200,50);
  
if(gameState===PLAY){  

score=score+Math.ceil(frameCount/500);

ground.x=ground.width/2;
  
if(keyDown("space")&& monkey.y>200){
monkey.velocityY=-20;
}
monkey.velocityY= monkey.velocityY+2;
monkey.collide(ground);
  
if(obstaclesGroup.isTouching(monkey)){
gameState=END;
}
  
if(foodsGroup.isTouching(monkey)){
  foodsGroup.destroyEach();
}
  
bananas();
obstacles();
}
if(gameState===END){
monkey.VelocityY=0;
monkey.y=400;
ground.velocityX=0;
obstaclesGroup.setVelocityXEach(0);
obstaclesGroup.setLifetimeEach(-1);
foodsGroup.setVelocityXEach(0);
foodsGroup.setLifetimeEach(-1);
  
stroke("black");
textSize(30);
fill("black");
text("Game Over!",150,170);
text("Press R To Restart",120,200);
  
if(keyDown("R")){
restart(); 

}
}

createEdgeSprites();
drawSprites();
  
function bananas(){
if(frameCount% 90===0){
banana= createSprite(420,Math.round(random(100,200)),10,10);
banana.velocityX= -10;
banana.addImage(bananaImage);
banana.scale=0.1;
banana.lifetime=300;
foodsGroup.add(banana);
}
}
  
function obstacles(){
if(frameCount% 300===0){
obstacle= createSprite(420,395,10,10);
obstacle.velocityX= -7;
obstacle.addImage(obstacleImage);
obstacle.scale=0.2;
obstacle.lifetime=300;
obstaclesGroup.add(obstacle);
}
}
function restart() {
gameState=PLAY;
foodsGroup.destroyEach();
obstaclesGroup.destroyEach();
score=0;
} 

}






