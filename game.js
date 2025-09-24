const config = {
    type: Phaser.AUTO,
    width: 800,
    heigth: 600,
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
  this.load.image('sky' ,'assets\images\sky.png');
}

function create(){
  // Lógica de creación
  this.image.load(400, 300, 'sky');
}

function update(){
  // Lógica de actualización
}