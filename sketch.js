var space,rocket,missile,color,gameOver,restart,missile,ufo,astroid,star;
var spaceImg,rocketImg,colorImg,missileImg,gameOverImg,restartImg;
var ufoG,astroidG,starG,missileGroup;
var ufoImg,astroidImg,starImg;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var Points = 0;
var score = 0;

function preload(){
 spaceImg = loadImage("space.png");
 rocketImg = loadImage("rocket.png");
 astroidImg = loadImage("astroid.png");
 ufoImg = loadImage("ufo.png");
 missileImg = loadImage("missile.png");
 starImg = loadImage("star.png");
 colorImg = loadImage("color.png");  
 gameOverImg = loadImage("gameOver.png"); 
 restartImg = loadImage("restart.png"); 
 

}

  

function setup(){
 createCanvas(800,500);
 //creating SpaceBackground
 space = createSprite(300,200);
 space.addImage(spaceImg);
 space.velocityY = -5;
  
 //creating rocket 
 rocket = createSprite(100,450);
 rocket.addImage(rocketImg);
 rocket.scale = 0.1;
  
 //creating gameOver image 
 gameOver = createSprite(350,300);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.8;
 gameOver.visible = false;
 
  restart = createSprite(660,300);
  restart.addImage(restartImg);
  restart.scale = 0.2;
  restart.visible = false;


 
 missileGroup = new Group();
  ufoG = new Group();
 astroidG = new Group();
 starG = new Group();
 


}


function draw (){
  background(0);
  
 if(gameState === PLAY){
  if(space.y < 0){
  space.y = space.height/2;
  }


  if(keyDown("space")){
    createMissileGroup();
   }  
  if(keyDown("right")){
    rocket.x = rocket.x + 6;
  }
  
  if(keyDown("left")){
  rocket.x = rocket.x - 6;
  }
  
  edges= createEdgeSprites();
  rocket.collide(edges);
 rocket.debug = true;

 

 var select_sprites = Math.round(random(1,3));
 if(World.frameCount % 60 == 0){
 if(select_sprites == 1){
  createUfoG();
 }else if (select_sprites == 2){
  createAstroidG();
 } else {
  createStarG();
 }


}
 
 if (starG.isTouching(rocket)) {
  starG.destroyEach();
  Points = Points + 5;
}
 
 
 else if(ufoG.isTouching(rocket)){
  gameState = END;
  ufoG.destroyEach();
 space.velocityY = 0; 
  
}
  
 else  if(astroidG.isTouching(rocket)){
  gameState = END;
  astroidG.destroyEach();
 space.velocityY = 0; 
 }
  
  
  else if (missileGroup.isTouching(ufoG)) {
  ufoG.destroyEach();
  missileGroup.destroyEach();
  score=score+3;
}
 
 
else if (missileGroup.isTouching(astroidG)) {
  astroidG.destroyEach();
  missileGroup.destroyEach();
  score=score+3;
}
 
 


 
}  
 else if (gameState === END){
 gameOver.visible = true;
 restart.visible = true;
 space.velocityY = 0;
 
 ufoG.setVelocityYEach(0);
 astroidG.setVelocityYEach(0);
 starG.setVelocityYEach(0);

 rocket.scale = 0.0001;


 
 if(mousePressedOver(restart)){
   reset();
 }

 


 }

 drawSprites();
 textSize(20);
 fill(340);
 text("Points: "+Points,700,70);

 textSize(20);
 fill(340);
 text("Score: "+score,700,100);


 
 

}


 

 function reset(){
  gameState=PLAY;
  gameOver.visible = false;  
  restart.visible = false;
 
  rocket.changeImage(rocketImg);
  space.velocityY = -4
  ufoG.destroyEach();
  starG.destroyEach();
  astroidG.destroyEach();
  missileGroup.destroyEach();
  
  Points = 0;

}    










function createUfoG(){
 ufo = createSprite(random(50,550),50,500,10);
 ufo.addImage(ufoImg);
 ufo.velocityY = 1;  
 ufo.scale = 0.1;
 ufo.lifetime = 400;
 ufoG.add(ufo);
}   


function createAstroidG(){
  astroid = createSprite(random(50,550),50,10,10);
  astroid.addImage(astroidImg);
  astroid.velocityY = 7;  
  astroid.scale = 0.05;
  astroid.lifetime = 400;
  astroidG.add(astroid);
}

function createStarG(){
 star = createSprite(random(50,550),50,10,10);
 star.addImage(starImg);
 star.velocityY = 7;
 star.scale = 0.1;
 star.lifetime = 400; 
 starG.add(star);
}

function createMissileGroup(){
  missile = createSprite(180,10,10,10);
  missile.addImage(missileImg);
  missile.y = 360;
  missile.x=rocket.x;
  missile.velocityY = -4;
  missile.lifetime = 200;  
  missile.scale = 0.2;
  missileGroup.add(missile);
}




