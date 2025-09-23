const { Scene } = require("phaser");

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

const game = new Phaser.Game(config);

//Assets
function preload(){
    //Loas images, spritesheets, audio, etc.
}

function create(){
    //Create sprites, animations, input handlers, etc.
}

//Game Loop
function update(){
    //update game objects, check collisions, etc
}