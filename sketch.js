var plane;
var missile;
var building;
var plane2;
var planeImg, explosionImg, missileImg, skyImg, buildingImg, plane2Img;
var gameOver, restart;
var gameState = "play";
var score = 0;
var buildingsGroup;
var plane2Group;

function preload(){
    skyImg = loadImage("clouds.jpg");
    missileImg = loadImage("missile.png");
    planeImg = loadImage("plane.png")
    plane2Img = loadImage("plane2.png");
    buildingImg = loadImage("building.png");
    explosionImg = loadImage("explosion.png");
}

function setup() {
    createCanvas(600,300);
    plane = createSprite(200,150,10,10);
    plane.addImage(planeImg);
    plane.scale = 0.1;
    plane.setCollider('rectangle',10,10);
    missile = createSprite(100,150,10,10);
    missile.addImage(missileImg);
    missile.scale = 0.1;
    missile.setCollider('rectangle',10,10);
    buildingsGroup = new Group();
    plane2Group = new Group();
    score = 0;
}

function draw() {

    edges=createEdgeSprites();

    background(skyImg);

    if(gameState === "play")
    {
        
        score = score + Math.round(getFrameRate()/60);
        
        if(frameCount % 60 === 0)
        {
        spawnBuilding();
        }
        if(frameCount % 80 === 0)
        {
            spawnPlanes();
        }

        plane.collide(edges);

        if(keyDown("up"))
        {
            plane.y = plane.y - 7;
        }
        if(keyDown("down"))
        {
            plane.y = plane.y + 7;
        }

        missile.y = plane.y;

        if(plane.isTouching(buildingsGroup))
        {
            plane.x = plane.x - 1;
        }
        
        if(missile.isTouching(plane) || plane2Group.isTouching(plane))
        {
            gameState = "end";
        }
    }
    else if(gameState === "end")
    {
        fill("red")
        text("Game Over; Press Space to restart", 300, 150)
        plane.addImage(explosionImg);
        plane.changeImage(explosionImg);
        buildingsGroup.setVelocityEach(0,0);
        plane2Group.setVelocityEach(0,0);
        plane2Group.lifetime = -1;
        buildingsGroup.lifetime = -1;
        if(keyDown("space"))
        {
            reset();
        }
    }
 
    drawSprites();

    fill("red");
    text("Score: "+(score), 50, 50);
}
function spawnBuilding()
{
    var building = createSprite(600,250,20,200); 
    building.velocityX = -4+(-score/100);
    building.lifetime = 300;
    building.addImage(buildingImg);
    building.scale = 0.8;
    building.setCollider('rectangle',20,200);
    buildingsGroup.add(building);
}
function spawnPlanes()
{   
    var plane2 = createSprite(600,Math.round(random(50,250)),10,10);
    plane2.velocityX = -4+(-score/100);
    plane2.lifetime = 300;
    plane2.addImage(plane2Img);
    plane2.scale = 0.1;
    plane2Group.add(plane2);
}

function reset(){
    gameState = "play";
    
   buildingsGroup.destroyEach();
   plane2Group.destroyEach();
   plane.addImage(planeImg);
   plane.changeImage(planeImg);
   plane.x = 200;
    
    score = 0;
}  