import React from "react";

import { PhaserScene, PhaserObject } from "@orbits/react-phaser";

export default () => <PhaserScene
    
    id="empty-scene"

    images = {{
        background: "/images/battleback1.png",
    }}
>
    <PhaserObject create={
        scene => scene.add.image(400, 300, 'background')
    }/>
    <p>Empty Scene</p>
</PhaserScene>
