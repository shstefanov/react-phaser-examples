import React, { useState } from "react";

import { PhaserScene, PhaserObject } from "@orbits/react-phaser";


export default () => {

    const [ selected, setSelected ] = useState(false);

    return <PhaserScene   
        
        id="mouse-scene-scene"

        images={{       // Preloaded images
            background: "/images/battleback1.png",
        }}

        sprites={{
            ninja_m:  { 
                url: "/images/sprites/ninja_m.png", frameWidth: 32, frameHeight: 36, startFrame: 0, endFrame: 11,
                animations: {
                    'ninja_m.walk_north': { frameRate: 5, repeat: -1, frames: { start: 0, end: 2 } }, // Range of frames
                    'ninja_m.walk_east':  { frameRate: 5, repeat: -1, frames: { start: 3, end: 5 } },
                    'ninja_m.walk_south': { frameRate: 5, repeat: -1, frames: [ 6,  7, 8 ]         }, // or selected individual frames
                    'ninja_m.walk_west':  { frameRate: 5, repeat: -1, frames: [ 9,  9, 9, 10, 11 ] },
                }
            },
        }}

            onDrag               = { (event, object) => { console.log("onDrag",               { object, event} ); } }
            onDragEnter          = { (event, object) => { console.log("onDragEnter",          { object, event} ); } }
            onDragLeave          = { (event, object) => { console.log("onDragLeave",          { object, event} ); } }
            onDragStart          = { (event, object) => { console.log("onDragStart",          { object, event} ); } }
            onDragEnd            = { (event, object) => { console.log("onDragEnd",            { object, event} ); } }
            onDragOver           = { (event, object) => { console.log("onDragOver",           { object, event} ); } }
            onDrop               = { (event, object) => { console.log("onDrop",               { object, event} ); } }

            onGameObjectDown     = { (event, object) => { console.log("onGameObjectDown",     { event, object} ); } }
            onGameObjectMove     = { (event, object) => { console.log("onGameObjectMove",     { event, object} ); } }
            onGameObjectOver     = { (event, object) => { console.log("onGameObjectOver",     { event, object} ); } }
            onGameObjectOut      = { (event, object) => { console.log("onGameObjectOut",      { event, object} ); } }
            
            onGameObjectUp       = { (event, object) => { console.log("onGameObjectUp",       { event, object} ); } }
            onGameObjectWheel    = { (event, object) => { console.log("onGameObjectWheel",    { event, object} ); } }
            
            onPointerDown        = { (event, object) => { console.log("onPointerDown",        { event } ); } }
            onPointerUp          = { (event, object) => { console.log("onPointerUp",          { event } ); } }
            onPointerOver        = { (event, object) => { console.log("onPointerOver",        { event } ); } }
            onPointerOut         = { (event, object) => { console.log("onPointerOut",         { event } ); } }
            onPointerMove        = { (event, object) => { console.log("onPointerMove",        { event } ); } }
            onPointerDownOutside = { (event, object) => { console.log("onPointerDownOutside", { event } ); } }
            onPointerUpOutside   = { (event, object) => { console.log("onPointerUpOutside",   { event } ); } }
            onPointerLockChange  = { (event, object) => { console.log("onPointerLockChange",  { event } ); } }
            onWheel              = { (event, object) => { console.log("onWheel",              { event } ); } }

    >
        <PhaserObject
            id="background"
            create={ scene => scene.add.image(400, 300, 'background') }
        />

        <PhaserObject

            id="ninja"

            interactive={true}
            draggable={true}

            create={ scene => {

                const object = scene.physics.add.sprite(400, 100, 'ninja_m');
                object.setVelocity(10, 100);
                object.setBounce(1, 1);
                object.setCollideWorldBounds(true);
                object.setGravity(5);

                window.object = object;

                // Add W, A, S, D keys
                object.keys = scene.input.keyboard.addKeys({
                    up:    Phaser.Input.Keyboard.KeyCodes.W,
                    down:  Phaser.Input.Keyboard.KeyCodes.S,
                    left:  Phaser.Input.Keyboard.KeyCodes.A,
                    right: Phaser.Input.Keyboard.KeyCodes.D
                });


                object.play("ninja_m.walk_east", 150);

                return object;
            }}

            update={ ( scene, object ) => {
                if( object.keys.up.isDown)    { object.anims.play('ninja_m.walk_north', true); object.setVelocityY(-100); }
                if( object.keys.down.isDown)  { object.anims.play('ninja_m.walk_south', true); object.setVelocityY( 100); }
                if( object.keys.left.isDown)  { object.anims.play('ninja_m.walk_west',  true); object.setVelocityX(-100); }
                if( object.keys.right.isDown) { object.anims.play('ninja_m.walk_east',  true); object.setVelocityX( 100); }
            }}

        />

        <p>Mouse Events</p>
        { selected && <p>Selected</p> }
    </PhaserScene>
}


