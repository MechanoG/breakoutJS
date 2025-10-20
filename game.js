

const config = {
    type: Phaser.AUTO,
    width: 800,   
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      }
    },
    parent: 'game',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Usa la variable global 'Phaser'
const game = new Phaser.Game(config);

function preload(){

  this.load.atlas("backgrounds", "assets/images/Backround_Tiles.png", "assets/images/backgrounds.json");
  this.load.atlas("ballPadle", "assets/images/paddles_and_balls.png", "assets/images/ballPadle.json");
  this.load.atlas("bricks", "assets/images/bricks.png", "assets/images/bricks.json");
  this.load.atlas("heart", "assets/images/Hearts.png", "assets/images/heart.json");
  this.load.audio("hitBall", "assets/audio/ball-hit.wav");
  
}
 
function create(){

  this.lifeAvaliable = 3;

  //Carga spritesheet de backguronds
  let backgroundTexture = this.textures.get("backgrounds");
  let backgroundFrames = backgroundTexture.getFrameNames();
  
  this.add.image(100,300, "backgrounds", backgroundFrames[0]).setDisplaySize(200,600);
  this.add.image(300,300, "backgrounds", backgroundFrames[1]).setDisplaySize(200,600);
  this.add.image(500,300, "backgrounds", backgroundFrames[2]).setDisplaySize(200,600);
  this.add.image(700,300, "backgrounds", backgroundFrames[3]).setDisplaySize(200,600);

  //names of sprites on atlas 
  let ballpadleTexture = this.textures.get("ballPadle");
  let ballpadleFrames = ballpadleTexture.getFrameNames();

  let bricksTexture = this.textures.get("bricks");
  let bricksFrames = bricksTexture.getFrameNames();

  //Sounds
  this.ballSound = this.sound.add("hitBall");

  //World limits
  this.physics.world.setBoundsCollision(true, true, true, false);
  
  //Padle
  paddle = this.physics.add.image(400, 550, "ballPadle", ballpadleFrames[2]).setImmovable(true);
  paddle.setDisplaySize(100, 30);
  paddle.setCollideWorldBounds(true);


  //Ball
  ball= this.physics.add.sprite(400,paddle.y-35, "ballPadle", ballpadleFrames[0]).setDisplaySize(30, 30);
  ball.setCollideWorldBounds(true);
  ball.setBounce(1);
  ball.setData('onPaddle',true);

  //Permite emitir eventos de colicion con el mundo
  ball.body.onWorldBounds = true;
  
  ball.body.world.on('worldbounds', hitworld, this);


   //names of the sprites bricks
  let graybrick = bricksFrames[0];
  let greenbrick = bricksFrames[1];
  let yellowbrick = bricksFrames[2];
  let orangebrick = bricksFrames[3];
  let redbrick = bricksFrames[4];
  let purplebrick = bricksFrames[5];

  //Bricks
  bricks =  this.physics.add.staticGroup({
    key : "bricks",
    frame: [graybrick,greenbrick,yellowbrick,orangebrick,redbrick,purplebrick],
    frameQuantity : 7,
    gridAlign :{width: 7, height:6, cellWidth : 105, cellHeight: 35, x: 75, y: 100}
   });

  bricks.children.iterate((child) =>{
    child.setDisplaySize(100, 30)
    child.setData('cracked', false);
  })

  const HEARTY = 575;

  this.heart1 = this.add.image(30, HEARTY, "heart", "heart0001").setDisplaySize(60,60);
  this.heart2 = this.add.image(80, HEARTY, "heart", "heart0001").setDisplaySize(60,60);
  this.heart3 = this.add.image(130, HEARTY, "heart", "heart0001").setDisplaySize(60,60);
  
  //Collisions
  
  this.physics.add.collider(paddle,ball, hitpaddle, null, this);
  this.physics.add.collider(ball, bricks, hitBricks, null, this);
  

  //Keyboard input 
  cursor = this.input.keyboard.createCursorKeys();
  
}

function resetBall(){

  ball.setPosition(paddle.x, paddle.y-45);
  ball.setVelocity(0,0);
  ball.setData("onPaddle", true);

}
function hitworld(){
  this.ballSound.play();
}

function resetLevel(){
  

  let resetCodes =  [
    "sprite14", "sprite15",
    "sprite16", "sprite17",
    "sprite18", "sprite19"  
  ]

  resetBall();

  let colum = 0;
  let index = 0

  bricks.children.each(brick => {
   
    brick.enableBody(false,0,0, true, true);
    brick.setData('cracked', false);
    brick.setFrame(resetCodes[index]);

    colum +=1;

    //7 es el numero de ladrillos por fila
    //buscar como puede hacerse para obtenerlo directamente del grid

    if (colum >=7){
      index +=1;
      colum = 0;
    }
  })
}

function hitpaddle(){
  let diff=0;

  this.ballSound.play();
  
  if(ball.x >paddle.x ){
    diff = ball.x - paddle.x;
    ball.setVelocityX(diff*10);

  }else if(ball.x < paddle.x ){
    diff = paddle.x - ball.x;
    ball.setVelocityX(diff*-10);
  }else{
    ball.setVelocityX(2+Math.random()*8)
  }

}

function hitBricks(ball, brick){

  let nameCodes =  {
    sprite14 : "brick1broken",
    sprite15 : "brick2broken",
    sprite16 : "brick3broken",
    sprite17 : "brick4broken",
    sprite18 : "brick5broken",
    sprite19 : "brick6broken",

  }

  this.ballSound.play();

  if (brick.getData('cracked')){
    brick.disableBody(true, true);
  }

  brick.setData('cracked', true);
  let framename = brick.frame.name;
  brick.setFrame(nameCodes[framename]);
  
  if (bricks.countActive() === 0){
    this.lifeAvaliable = 3;
    window.alert("GANASTE TILIN");
    resetLevel();
  }
}


function update(){
/**Logica de actualizacion */

/////Paddle
  if(cursor.left.isDown){
    if(ball.getData('onPaddle')){
      ball.x = paddle.x;  
    } 
    paddle.setVelocityX(-375)
  }else if(cursor.right.isDown){
    if(ball.getData('onPaddle')){
      ball.x = paddle.x;  
    } 
    paddle.setVelocityX(375);
  }else if(cursor.up.isDown){
    if (ball.getData("onPaddle")){
      ball.setVelocity(-75,-500);
      ball.setData("onPaddle", false);
    }
  }else{
    paddle.setVelocityX(0);
  }

  if(ball.y > 600 ){
    
    if(this.lifeAvaliable <= 1){
      this.lifeAvaliable = 3;
      window.alert("PERDISTE FRACASADO");
      resetLevel();  
    }else{

      this.lifeAvaliable -=1;

    }
    resetBall();
  }

}