import React, { useState } from "react";

import { PhaserScene, PhaserObject } from "@orbits/react-phaser";

export default () => {

    const [ selected, setSelected ] = useState(false);

    return <PhaserScene
        
        id="mouse-object-scene"

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

    >
        <PhaserObject create={
            scene => scene.add.image(400, 300, 'background')
        }/>

        <PhaserObject

            interactive draggable

            onDrag               = { (object, event) => { console.log("onDrag",               { object, event} ); } }
            onDragEnter          = { (object, event) => { console.log("onDragEnter",          { object, event} ); } }
            onDragLeave          = { (object, event) => { console.log("onDragLeave",          { object, event} ); } }
            onDragStart          = { (object, event) => { console.log("onDragStart",          { object, event} ); } }
            onDragEnd            = { (object, event) => { console.log("onDragEnd",            { object, event} ); } }
            onDragOver           = { (object, event) => { console.log("onDragOver",           { object, event} ); } }
            onDrop               = { (object, event) => { console.log("onDrop",               { object, event} ); } }

            onPointerDown        = { (object, event) => { console.log("onPointerDown",        { object, event } ); } }
            onPointerUp          = { (object, event) => { console.log("onPointerUp",          { object, event } ); } }
            onPointerOver        = { (object, event) => { console.log("onPointerOver",        { object, event } ); } }
            onPointerOut         = { (object, event) => { console.log("onPointerOut",         { object, event } ); } }
            onPointerMove        = { (object, event) => { console.log("onPointerMove",        { object, event } ); } }
            onPointerUpOutside   = { (object, event) => { console.log("onPointerUpOutside",   { object, event } ); } }
            onPointerDownOutside = { (object, event) => { console.log("onPointerDownOutside", { object, event } ); } }
            onPointerLockChange  = { (object, event) => { console.log("onPointerLockChange",  { object, event } ); } }

            onWheel              = { (object, event) => { console.log("onWheel",    { object, event } ); } }


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


