import React from "react";

import { PhaserScene, PhaserObject } from "@orbits/react-phaser";

export default () => <PhaserScene   
    
    id="particles-scene"

    images={{       // Preloaded images
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

        images={{  // Laziloaded images
            drops: "/images/rain_drop_0.png",
        }}

        create={ scene => { 

            const particles = scene.add.particles( 0, 0, 'drops', {
                speed: 100,
                scale: { start: 1, end: 0 },
                blendMode: 'ADD'
            });

            const object = scene.physics.add.image(400, 100, 'jumper');

            object.setVelocity(10, 100);
            object.setBounce(1, 1);
            object.setCollideWorldBounds(true);

            particles.startFollow(object);

            return object;
        }}
    />

    <p>Particles scene</p>
</PhaserScene>
