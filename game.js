const config = {
    type: Phaser.AUTO,
    width: 800,   
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {y : 300},
        debug: false 
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
  
  
  /*
  this.load.image("sky" , "assets/images/sky.png");
  this.load.image("star" , "assets/images/star.png");
  this.load.image("ground" , "assets/images/platform.png");
  this.load.image("bomb" , "assets/images/bomb.png")
  this.load.spritesheet("dude" , "assets/images/dude.png",
    {frameWidth: 32, frameHeigth: 48}
  );*/
}
 
function create(){

  let backgroundTexture = this.textures.get("backgrounds");
  let backgroundFrames = backgroundTexture.getFrameNames();
  
  this.add.image(100,300, "backgrounds", backgroundFrames[0]).setDisplaySize(200,600);
  this.add.image(300,300, "backgrounds", backgroundFrames[1]).setDisplaySize(200,600);
  this.add.image(500,300, "backgrounds", backgroundFrames[2]).setDisplaySize(200,600);
  this.add.image(700,300, "backgrounds", backgroundFrames[3]).setDisplaySize(200,600);

  let ballpadleTexture = this.textures.get("ballPadle");
  let ballpadleFrames = ballpadleTexture.getFrameNames();

  //Padle
  paddle = this.physics.add.sprite(400,550, "ballPadle", ballpadleFrames[2]);
  paddle.setDisplaySize(100, 30);
  paddle.body.setAllowGravity(false);
  paddle.setCollideWorldBounds(true);


  //Ball
  ball= this.physics.add.sprite(400,525, "ballPadle", ballpadleFrames[0]).setDisplaySize(30, 30);
  
  

  //Collision of paddle and ball
  this.physics.add.collider(paddle,ball);

  //Keyboard input 
  cursor = this.input.keyboard.createCursorKeys();
  

  /*this.add.image(400, 300, "sky");
  
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  player = this.physics.add.sprite(100, 450, 'dude');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  //player.body.setGravityY(300);
  
  this.physics.add.collider(player, platforms);

  this.anims.create({
    key: 'left',
    frames:this.anims.generateFrameNumbers('dude', {start : 0, end : 3}),
    framerate: 10,
    repeat:-1
  });

  this.anims.create({
    key: 'turn',
    frames: [{key: 'dude', frame: 4}],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
    frame: 10,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();

  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: {x : 12, y: 0, stepX: 70 }
  });

  stars.children.iterate( function(child){
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  this.physics.add.collider(stars, platforms);

  this.physics.add.overlap(player, stars, collecStar, 
    null, this);

  function collecStar(player, star){
    star.disableBody(true, true);

    score +=10;
    scoreText.setText('Score:' + score);

    if(stars.countAvtive(true) === 0){
      stars.children.iterate(function (child){
        child.enableBody(true, child.x, true, true);
      });

      var x = (player.x < 400) ? Phaser.Math.Between(400,800) : Phaser.Math.Between(0,400);

      var bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    } 
  }

  var score = 0;
  var scoreText;

  scoreText = this.add.text(16, 16, 'Score = 0', {fontSize:
    '32px', fill: '#000'
  });

  bombs = this.physics.add.group();
  this.physics.add.collider(bombs,platforms);
  this.physics.add.collider(player, bombs, hitbomb, null, this);

  function hitbomb(player, bomb){
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");
    gameOver = "true";
  }
  
  */
  
}

function update(){
/**Logica de actualizacion */

/////Paddle
  if(cursor.left.isDown){
    paddle.setVelocityX(-150)
  }else if(cursor.right.isDown){
    paddle.setVelocityX(150);
  }else{
    paddle.setVelocityX(0);
  }


  /* Lógica de actualización
  if (cursors.left.isDown){
    player.setVelocityX(-160);
    player.anims.play('left', true);
  }
  else if (cursors.right.isDown){
    player.setVelocityX(160);
    player.anims.play('right', true);
  }
  else{
    player.setVelocityX(0);
    player.anims.play('turn');
  }
  
  if (cursors.up.isDown && player.body.touching.down){
    player.setVelocityY(-330);
  }*/
}