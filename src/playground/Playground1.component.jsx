import React, { useState } from "react";

import { PhaserScene, PhaserObject, PhaserTilemap, PhaserCamera } from "@orbits/react-phaser";

import { tilesImage } from "../scenes/TilemapScene.component";


function minmax(value, min = -Infinity, max = Infinity){
    return Math.min(max, Math.max(value, min));
}

console.log("minmax", minmax(25, 8, 15));


const MIN_ZOOM = 1/8;
const MAX_ZOOM = 8;

const MIN_SCROLL_X = -640;
const MAX_SCROLL_X = (1280 * 32);

const MIN_SCROLL_Y = -640;
const MAX_SCROLL_Y = (1280 * 32);


console.log("SETTINGS: ", {
    MIN_ZOOM,      MAX_ZOOM,
    MIN_SCROLL_X,  MAX_SCROLL_X,
    MIN_SCROLL_Y,  MAX_SCROLL_Y,
});


const border = 12;
const inner = [4, 5, 7, 8]
const data = [];
for(let x = -640; x <= 640; x++){
    const row = [];
    data.push(row);
    for(let y = -640; y <= 640; y++){
       (x === -640 || x === 640 || y === -640 || y === 640)
       ? row.push(border)
       : row.push( inner[Math.floor( Math.random() * 4 )] );
    }
}



export default () => {

    const [ scrollX,      setScrollX      ] = useState(0);
    const [ scrollY,      setScrollY      ] = useState(0);

    const [ originX,      setOriginX      ] = useState(0.5);
    const [ originY,      setOriginY      ] = useState(0.5);

    const [ dragging,     setDragging     ] = useState(false);
    const [ scrollAnchor, setScrollAnchor ] = useState(null);
    const [ mouseAnchor,  setMouseAnchor  ] = useState(null);

    const [ zoom,         setZoom         ] = useState(1);


    return <PhaserScene

        id="playground-1-scene"

        images = {{
            // tiles: tilesImage,
            // background: "/images/battleback1.png",
        }}

        onPointerDown = { (event) => {
            setDragging(true);
            setScrollAnchor({ x: scrollX, y : scrollY });
            setMouseAnchor({...event.position});
        }}
        onPointerUp          = { (event) => {
            setDragging(false);
            setScrollAnchor(null);
            setMouseAnchor(null);
        }}

        onPointerMove = { (event) => {
            const { x, y } = event.position;

            // setOriginX( ( (x / window.innerWidth) ) );
            // setOriginY( ( (y / window.innerHeight) ) );

            if(!dragging) return;


            const vector = {
                x: -( x - mouseAnchor.x ) / zoom,
                y: -( y - mouseAnchor.y ) / zoom,
            };


            const scrollX = minmax(scrollAnchor.x + vector.x, MIN_SCROLL_X, MAX_SCROLL_X);
            const scrollY = minmax(scrollAnchor.y + vector.y, MIN_SCROLL_Y, MAX_SCROLL_Y);

            // console.log("SCROLL: ", scrollX, scrollY, vector, scrollAnchor);

            setScrollX( scrollX );
            setScrollY( scrollY );



        }}

        onWheel={ event => {
            // [0.2, 0.3, 0.45]
            const direction = (event.deltaY > 0 ? 0.9 : 1.1);
            // 1 / 1.1
            const newZoom = minmax(zoom * direction, MIN_ZOOM, MAX_ZOOM);
            // const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom * direction));


            // const { x, y } = event.position;

            // setOriginX( ((x / zoom) / (1600) )  );
            // setOriginY( ((y / zoom) / (1600) )  );


            // console.log("wheel position", x, y );


            // console.log("NEW Vireport Position", [cameraX, cameraY],
            //     cameraX + ( (x - cameraX) / newZoom ),
            //     cameraY + ( (y - cameraY) / newZoom ),
            // );
            // // const vector = {
            // //     x: (mouseAnchor.x - x) / (zoom),
            // //     y: (mouseAnchor.y - y) / (zoom),
            // // };

            // setCameraX(cameraX + ( (x - cameraX) / newZoom ));
            // setCameraY(cameraY + ( (y - cameraY) / newZoom ));



            // setZoom( zoom + diff );

            setZoom( newZoom );

        }}

    >
        {/* <PhaserObject
            id="background"
            create={ scene => scene.add.image(400, 300, 'background') }
        /> */}



        <PhaserCamera

            id              = "tilemap-camera"
            scroll       = {{ x: scrollX, y: scrollY }}
            // position     = {{ x: cameraX, y: cameraY }}
            // scroll       = {{ x: cameraX, y: cameraY }}

            // angle           = { angle           } // Rotation angle in degrees
            // rotation        = { rotation        } // Rotation angle in radians
            // alpha           = { alpha           } // alpha transparency of the scene
            // backgroundColor = { backgroundColor } // Background color in hex code

            // size={{width: 300, height: 300}}
            type="WEBGL" // "CANVAS", "WEBGL", "HEADLESS" or "AUTO" (default)

            // bounds={{
            //     x:        MIN_SCROLL_X,
            //     y:        MIN_SCROLL_Y,
            //     width:    MAX_SCROLL_X,
            //     height:   MAX_SCROLL_Y,
            //     // centerOn: true
            // }}

            // origin = {{ x: originX, y: originY }}

            zoom = {{ x: zoom, y: zoom }}

            // viewport={{
            //     x:        viewportX,
            //     y:        viewportY,
            //     width:    viewportWidth,
            //     height:   viewportHeight
            // }}

            // size         = {{ width: sizeWidth,     height: sizeHeight     }}
            // deadZone     = {{ width: deadzoneWidth, height: deadzoneHeight }}

            // followOffset = {{ x: followOffsetX, y: followOffsetY }}
            // zoom         = {{ x: zoomX,         y: zoomY         }}
            // lerp         = {{ x: lerpX,         y: lerpY         }}
            // origin       = {{ x: originX,       y: originY       }}
            // position     = {{ x: positionX,     y: positionY     }}
            // scroll       = {{ x: scrollX,       y: scrollY       }}


            // isSceneCamera = { isSceneCamera }
            // roundPixels   = { roundPixels   }
            // visible       = { visible       }

            // follow={ follow ? "ninja" : null }
        />





        <PhaserTilemap

            layer={0} // Number or string
            position={{ x: -640, y: -640 }}

            // data = {[
            //     [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ],
            //     [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ],
            //     [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ],
            //     [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ],
            //     [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ],
            // ]}

            data = { data }


            tileWidth  = {32}
            tileHeight = {32}

            // image={"tiles"}

            image={{ url: tilesImage, name: "my-tiles" }}

        />


        <div style={{
            position: "fixed", zIndex: "100",
            bottom:   "10px",  right: "10px",
            color:    "white", backgroundColor: "black",
        }}> [zoom:{zoom}] [scrollX:{scrollX}] [scrollY{scrollY}] </div>



        {/* <p>Empty Scene</p> */}
    </PhaserScene>;
}


