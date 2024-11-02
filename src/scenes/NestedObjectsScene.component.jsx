import React, { useState } from "react";

import { PhaserScene, PhaserObject } from "@orbits/react-phaser";


export default () => {

    return <PhaserScene   
        
        id="mouse-scene-scene"

        images={{       // Preloaded images
            background: "/images/battleback1.png",
            drop:       "/images/rain_drop_0.png",
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
        <PhaserObject
            id="background"
            create={ scene => scene.add.image(0, 0, 'background') }
        />

        <PhaserObject

            id="ninja"

            interactive={true}
            draggable={true}

            create={ scene => {

                const object = scene.physics.add.sprite(400, 100, 'ninja_m');
                object.setVelocity(1, 10);
                object.setBounce(1, 1);
                object.setCollideWorldBounds(true);
                object.setGravity(0);
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

        >
            <PhaserObject
                id="nested-drop"
                position={{ x: 70, y: -25 }}
                create={ scene => scene.add.image(0, 0, 'drop') }
            ></PhaserObject>
        </PhaserObject>

        <p>Nested Objects</p>

    </PhaserScene>
}


