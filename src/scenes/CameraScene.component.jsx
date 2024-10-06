import React, { useState } from "react";

import { PhaserScene, PhaserObject, PhaserCamera } from "@orbits/react-phaser";

export default () => {

    const [ angle,           setAngle           ] = useState(0);
    const [ rotation,        setRotation        ] = useState(0);
    const [ alpha,           setAlpha           ] = useState(1);
    const [ backgroundColor, setBackgroundColor ] = useState("#000000");

    const [ boundsX,         setBoundsX         ] = useState(0);
    const [ boundsY,         setBoundsY         ] = useState(0);
    const [ boundsWidth,     setBoundsWidth     ] = useState(window.innerWidth);
    const [ boundsHeight,    setBoundsHeight    ] = useState(window.innerHeight);
    const [ boundsCenter,    setBoundsCenter    ] = useState(true);

    const [ deadzoneWidth,   setDeadzoneWidth   ] = useState(0);
    const [ deadzoneHeight,  setDeadzoneHeight  ] = useState(0);

    const [ followOffsetX,   setFollowOffsetX   ] = useState(0);
    const [ followOffsetY,   setFollowOffsetY   ] = useState(0);

    const [ isSceneCamera,   setIsSceneCamera   ] = useState(true);

    const [ lerpX,           setLerpX           ] = useState(1);
    const [ lerpY,           setLerpY           ] = useState(1);

    const [ cameraName,      setCameraName      ] = useState("my-camera");

    const [ originX,         setOriginX         ] = useState(0.5);
    const [ originY,         setOriginY         ] = useState(0.5);

    const [ positionX,       setPositionX       ] = useState(0);
    const [ positionY,       setPositionY       ] = useState(0);

    const [ roundPixels,     setRoundPixels     ] = useState(true);

    const [ visible,         setVisible         ] = useState(true);

    const [ scrollX,         setScrollX         ] = useState(0);
    const [ scrollY,         setScrollY         ] = useState(0);

    const [ zoomX,           setZoomX           ] = useState(1);
    const [ zoomY,           setZoomY           ] = useState(1);

    const [ sizeWidth,       setSizeWidth       ]  = useState(window.innerWidth);
    const [ sizeHeight,      setSizeHeight      ] = useState(window.innerHeight);

    const [ viewportX,       setViewportX       ] = useState(0);
    const [ viewportY,       setViewportY       ] = useState(0);
    const [ viewportWidth,   setViewportWidth   ] = useState(window.innerWidth);
    const [ viewportHeight,  setViewportHeight  ] = useState(window.innerHeight);

    const [ follow,          setFollow          ] = useState(false);

    // TODO: https://newdocs.phaser.io/docs/3.55.2/focus/Phaser.GameObjects.Components.Pipeline-setPostPipeline

    // TODO: https://newdocs.phaser.io/docs/3.55.1/focus/Phaser.Cameras.Scene2D.Camera-setMask
    const [ maskFixed,    setMaskFixed    ] = useState(true);
    const [ maskGeometry, setMaskGeometry ] = useState(undefined);
    const [ maskBitmap,   setMaskBitmap   ] = useState(undefined);

    return <PhaserScene
        
        id="sound-scene"

        images={{       // Preloaded images
            background: "/images/battleback1.png",
        }}

        sprites={{
            ninja_m:  { 
                url: "/images/sprites/ninja_m.png", frameWidth: 32, frameHeight: 36, startFrame: 0, endFrame: 11,
                animations: {
                    'ninja_m.walk_east':  { frameRate: 5, repeat: -1, frames: { start: 3, end: 5 } },
                }
            },
        }}

    >
        <PhaserObject
            id="background"
            create={
                scene => scene.add.image(400, 300, 'background')
            }
        />


        <PhaserCamera

            id              = { cameraName      } // Unique id of camera object

            angle           = { angle           } // Rotation angle in degrees
            rotation        = { rotation        } // Rotation angle in radians
            alpha           = { alpha           } // alpha transparency of the scene
            backgroundColor = { backgroundColor } // Background color in hex code

            bounds={{
                x:        boundsX,
                y:        boundsY,
                width:    boundsWidth,
                height:   boundsHeight,
                centerOn: boundsCenter
            }}

            viewport={{
                x:        viewportX,
                y:        viewportY,
                width:    viewportWidth,
                height:   viewportHeight
            }}

            size         = {{ width: sizeWidth,     height: sizeHeight     }}
            deadZone     = {{ width: deadzoneWidth, height: deadzoneHeight }}

            followOffset = {{ x: followOffsetX, y: followOffsetY }}
            zoom         = {{ x: zoomX,         y: zoomY         }}
            lerp         = {{ x: lerpX,         y: lerpY         }}
            origin       = {{ x: originX,       y: originY       }}
            position     = {{ x: positionX,     y: positionY     }}
            scroll       = {{ x: scrollX,       y: scrollY       }}
            
            
            isSceneCamera = { isSceneCamera }
            roundPixels   = { roundPixels   }
            visible       = { visible       }
            
            follow={ follow ? "ninja" : null }
        />






        <PhaserObject

            id="ninja"

            create={ scene => {

                const object = scene.physics.add.sprite(400, 100, 'ninja_m');
                object.setVelocity(10, 100);
                object.setBounce(1, 1);
                object.setCollideWorldBounds(true);
                object.setGravity(5);

                object.play("ninja_m.walk_east", 150);

                return object;
            }}


        />
        <p style={{bottom: "0px", color: "white"}}>
            Angle: <input
                type="range"
                value={angle}
                min="-180" max="180" step="1"
                onChange={ e => setAngle(parseFloat(e.target.value))}
            /> [{angle}]
        </p>

        <p style={{bottom: "2em", color: "white"}}>
            Alpha: <input
                type="range"
                value={alpha}
                min="0" max="1" step="0.01"
                onChange={ e => setAlpha(parseFloat(e.target.value))}
            /> [{alpha}]
        </p>

        <p style={{bottom: "4em", color: "white"}}>
            Background color: <input
                type="color"
                value={backgroundColor}
                onChange={ e => setBackgroundColor(e.target.value)}
            /> [{backgroundColor}]
        </p>

        <p style={{bottom: "6em", color: "white"}}>
            Bounds X: <input
                type="range"
                min="0" max={window.innerWidth} step="1"
                value={boundsX}
                onChange={ e => setBoundsX(parseFloat(e.target.value))}
            /> [{boundsX}]
            Bounds Y: <input
                type="range"
                min="0" max={window.innerHeight} step="1"
                value={boundsY}
                onChange={ e => setBoundsY(parseFloat(e.target.value))}
            /> [{boundsY}]
            Bounds Width: <input
                type="range"
                min="0" max={window.innerWidth} step="1"
                value={boundsWidth}
                onChange={ e => setBoundsWidth(parseFloat(e.target.value))}
            /> [{boundsWidth}]
            Bounds Height: <input
                type="range"
                min="0" max={window.innerHeight} step="1"
                value={boundsHeight}
                onChange={ e => setBoundsHeight(parseFloat(e.target.value))}
            /> [{boundsHeight}]
            Center: <input
                type="checkbox"
                value={boundsCenter}
                onChange={ e => setBoundsCenter(e.target.checked)}
            /> [{boundsCenter + ''}]
        </p>

        <p style={{bottom: "8em", color: "whiteRoundPixels"}}>
            Deadzone Width: <input
                type="range"
                min="0" max={window.innerWidth} step="1"
                value={deadzoneWidth}
                onChange={ e => setDeadzoneWidth(parseFloat(e.target.value))}
            /> [{deadzoneWidth}]
            Deadzone Height: <input
                type="range"
                min="0" max={window.innerHeight} step="1"
                value={deadzoneHeight}
                onChange={ e => setDeadzoneHeight(parseFloat(e.target.value))}
            /> [{deadzoneHeight}]
        </p>

        <p style={{bottom: "10em", color: "white"}}>
            Follow offset X: <input
                type="range"
                min="-100" max="100" step="1"
                value={followOffsetX}
                onChange={ e => setFollowOffsetX(parseFloat(e.target.value))}
            /> [{followOffsetX}]
            Follow offset Y: <input
                type="range"
                min="-100" max="100" step="1"
                value={followOffsetY}
                onChange={ e => setFollowOffsetY(parseFloat(e.target.value))}
            /> [{followOffsetY}]
        </p>

        <p style={{bottom: "12em", color: "white"}}>
            Is scene camera: <input
                type="checkbox"
                checked={isSceneCamera}
                onChange={ e => setIsSceneCamera(e.target.checked)}
            /> [{isSceneCamera + ''}]
        </p>

        <p style={{bottom: "14em", color: "white"}}>
            Lerp X: <input
                type="range"
                min="0" max="1" step="0.01"
                value={lerpX}
                onChange={ e => setLerpX(parseFloat(e.target.value))}
            /> [{lerpX}]
            Lerp Y: <input
                type="range"
                min="0" max="1" step="0.01"
                value={lerpY}
                onChange={ e => setLerpY(parseFloat(e.target.value))}
            /> [{lerpY}]
        </p>

        <p style={{bottom: "16em", color: "white"}}>
            Name: <input
                type="text"
                value={cameraName}
                onChange={ e => setCameraName(e.target.value)}
            /> [{cameraName}]
        </p>

        <p style={{bottom: "18em", color: "white"}}>
            Origin X: <input
                type="range"
                min="0" max="1" step="0.01"
                value={originX}
                onChange={ e => setOriginX(parseFloat(e.target.value))}
            /> [{originX}]
            Origin Y: <input
                type="range"
                min="0" max="1" step="0.01"
                value={originY}
                onChange={ e => setOriginY(parseFloat(e.target.value))}
            /> [{originY}]
        </p>

        <p style={{bottom: "20em", color: "white"}}>
            Position X: <input
                type="range"
                min="0" max="1000" step="1"
                value={positionX}
                onChange={ e => setPositionX(parseFloat(e.target.value))}
            /> [{positionX}]
            Position Y: <input
                type="range"
                min="0" max="1000" step="1"
                value={positionY}
                onChange={ e => setPositionY(parseFloat(e.target.value))}
            /> [{positionY}]
        </p>

        <p style={{bottom: "22em", color: "white"}}>
            Rotation: <input
                type="range"
                value={rotation}
                min={-Math.PI} max={Math.PI} step="0.01"
                onChange={ e => setRotation(parseFloat(e.target.value))}
            /> [{rotation}]
        </p>

        <p style={{bottom: "24em", color: "white"}}>
            Round pixels: <input
                type="checkbox"
                checked={roundPixels}
                onChange={ e => setRoundPixels(e.target.checked)}
            /> [{roundPixels + ''}]
        </p>

        <p style={{bottom: "26em", color: "white"}}>
            Scroll X: <input
                type="range"
                min="0" max="1000" step="1"
                value={scrollX}
                onChange={ e => setScrollX(parseFloat(e.target.value))}
            /> [{scrollX}]
            Scroll Y: <input
                type="range"
                min="0" max="1000" step="1"
                value={scrollY}
                onChange={ e => setScrollY(parseFloat(e.target.value))}
            /> [{scrollY}]
        </p>

        <p style={{bottom: "28em", color: "white"}}>
            Size width: <input
                type="range"
                min="0" max="2000" step="1"
                value={sizeWidth}
                onChange={ e => setSizeWidth(parseFloat(e.target.value))}
            /> [{sizeWidth}]
            Size height: <input
                type="range"
                min="0" max="2000" step="1"
                value={sizeHeight}
                onChange={ e => setSizeHeight(parseFloat(e.target.value))}
            /> [{sizeHeight}]
        </p>

        <p style={{bottom: "30em", color: "white"}}>
            Viewport X: <input
                type="range"
                min="0" max={window.innerWidth} step="1"
                value={viewportX}
                onChange={ e => setViewportX(parseFloat(e.target.value))}
            /> [{viewportX}]
            Viewport Y: <input
                type="range"
                min="0" max={window.innerHeight} step="1"
                value={viewportY}
                onChange={ e => setViewportY(parseFloat(e.target.value))}
            /> [{viewportY}]
            Viewport Width: <input
                type="range"
                min="0" max={window.innerWidth} step="1"
                value={viewportWidth}
                onChange={ e => setViewportWidth(parseFloat(e.target.value))}
            /> [{viewportWidth}]
            Viewport Height: <input
                type="range"
                min="0" max={window.innerHeight} step="1"
                value={viewportHeight}
                onChange={ e => setViewportHeight(parseFloat(e.target.value))}
            /> [{viewportHeight}]
        </p>

        <p style={{bottom: "32em", color: "white"}}>
            Visible: <input
                type="checkbox"
                checked={visible}
                onChange={ e => setVisible(e.target.checked)}
            /> [{visible + ''}]
        </p>

        <p style={{bottom: "34em", color: "white"}}>
            Zoom X: <input
                type="range"
                min="0.2" max="5" step="0.01"
                value={zoomX}
                onChange={ e => setZoomX(parseFloat(e.target.value))}
            /> [{zoomX}]
            Zoom Y: <input
                type="range"
                min="0.2" max="5" step="0.01"
                value={zoomY}
                onChange={ e => setZoomY(parseFloat(e.target.value))}
            /> [{zoomY}]
        </p>

        <p style={{bottom: "36em", color: "white"}}>
            Follow: <input
                type="checkbox"
                checked={follow}
                onChange={ e => setFollow(e.target.checked)}
            /> [{follow + ''}]
        </p>
    </PhaserScene>
}


