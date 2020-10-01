var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var survivalTime = 0;

var gamestate = "PLAY";

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);

  bananaGroup = new Group();
  obstacleGroup = new Group();


}


function draw() {
  background(255);

  //  if(gamestate === "PLAY") {
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if (keyDown("space") && monkey.y >= 300) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);

  food();
  obstacles();

  if (bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
  }

  drawSprites();

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time: " + survivalTime, 100, 50);

  if (obstacleGroup.isTouching(monkey)) {
    gameState = "END";
  }

  if (gamestate === "END") {
    fruit.lifetime = -1;
    obstacle.lifetime = -1;
    fruit.velocityX = 0;
    obstacle.velocityX = 0;
    ground.velocityX = 0;
  }


}

function food() {
  if (World.frameCount % 80 === 0) {
    var rand = Math.round(random(170, 250));
    var banana = createSprite(400, 200, 20, 20);
    banana.addImage(bananaImage);
    banana.y = rand;
    banana.velocityX = -8;
    banana.lifetime = 300;
    banana.scale = 0.1;
    bananaGroup.add(banana);
    //banana.debug = true;  
  }
}

function obstacles() {
  if (World.frameCount % 300 === 0) {
    var obstacle = createSprite(400, 320, 50, 50);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -8;
    obstacle.lifetime = 300;
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    //obstacle.debug = true; 

  }
}