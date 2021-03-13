var Balloon;
var background1;
var database;
var balloonAnimation1;
var balloonImage2;
var position;


function preload(){
  background1 = loadImage("HotAirBallon-01.png")
  balloonAnimation1 = loadAnimation("HotAirBallon-02.png")
 // balloonImage2=loadAnimation("HotAirBallon-02.png","HotAirBallon-03.png","HotAirBallon-03.png","HotAirBallon-03.png");

}



function setup() {
  database= firebase.database();

  createCanvas(500,500);
  Balloon = createSprite(230,300,10,10)
  Balloon.addAnimation("hotAirBalloon",balloonAnimation1);
  Balloon.scale = 0.5;

  var BalloonPosition=database.ref('balloon/position');

  BalloonPosition.on("value",readPosition);




}

function readPosition(data)
{
   position=data.val();
   //console.log(position);

   Balloon.x=position.x;
   Balloon.y=position.y;

}


function draw() {
  //textSize(20);
  //text("Use the arrow keys to Move the Hot Air Balloon!",20,20);
  background(background1);
  if(keyDown(LEFT_ARROW)){
    changePosition(-10,0);
    Balloon.addAnimation("hotAirBalloon",balloonImage2);
}
else if(keyDown(RIGHT_ARROW)){
  changePosition(10,0);
  Balloon.addAnimation("hotAirBalloon",balloonImage2);
}
else if(keyDown(UP_ARROW)){
  changePosition(10,-1);
  Balloon.addAnimation("hotAirBalloon",balloonImage2);
  Balloon.scale=Balloon.scale -0.005;
}
else if(keyDown(DOWN_ARROW)){
  changePosition(0,+10);
  Balloon.addAnimation("hotAirBalloon",balloonImage2);
  Balloon.scale=Balloon.scale+0.005;
}
  drawSprites();

  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",60,40);
}

function changePosition(x,y){
  //WRITTING TO THE DATABASE
 //create the reference again, without variable

 database.ref('balloon/position').set(
 {
     'x':position.x+x,
     'y':position.y+y,
 }

 )

}