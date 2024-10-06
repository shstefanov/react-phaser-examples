import React from "react";

import { PhaserScene, PhaserObject } from "@orbits/react-phaser";

export default () => <PhaserScene   
    
    id="image-scene"

    images={{
        background: "/images/battleback1.png",
        jumper:     "/images/IconGreen.png",
    }}
>
    <PhaserObject
        id="background"
        create={ scene => scene.add.image(400, 300, 'background') }
    />

    <PhaserObject

        id="image"

        images={{
            jumper:     "/images/IconGreen.png",
        }}

        create={ scene => { 
            const object = scene.physics.add.image(400, 100, 'jumper');
            object.setVelocity(10, 100);
            object.setBounce(1, 1);
            object.setCollideWorldBounds(true);
            return object;
        }}
    />

    <p>Image object scene</p>
</PhaserScene>
