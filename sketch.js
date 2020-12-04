
var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup(){
 createCanvas(600,300);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  
  
    
  ground = createSprite(300,275,1000,10);
  ground.velocityX=-4;
  ground.x = ground.width/2;
 
  

      
    
 
  
  
  
  
}

function draw(){
  background("skyblue");
  fill("black");
  text("SURVIVAL TIME: "+score, 470, 20);
  text("BANANAS COLLECTED: "+bananaScore,300,20);
  
  if (gameState === PLAY){
    Spawnobstacles();
    Spawnbananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score/100);
    
    if(keyDown("space")){
      monkey.velocityY=-10;
    }
  
    
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 50){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
   
    
    
  }
  
drawSprites();
  monkey.collide(ground);
}
  
 

function Spawnbananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    

    
  }
  

  
}

function Spawnobstacles(){
  if (frameCount%300 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addImage("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}


