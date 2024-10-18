import React, { useState } from "react";

import * as Phaser from "phaser";

import { PhaserScene, PhaserObject } from "@orbits/react-phaser";



// TODO: implement object properties:
/*
    object.setBodySize(width, height, center);
    object.enableBody(reset, x, y, enableGameObject, showGameObject);
    object.disableBody(disableGameObject, hideGameObject);
    object.refreshBody();
    
    object.setAngularDrag(value);
   
    object.setCircle(radius, offsetX, offsetY);

    object.setDamping.(value);
    object.setDebug.(showBody, showVelocity, bodyColor);
    object.setDebugBodyColor(value);
    object.setDirectControl(value);

    object.setDrag(x, y);         object.setDragX(x);         object.setDragY(y);
    object.setFriction(x, y);     object.setFrictionX(x);     object.setFrictionY(y);
    object.setGravity(x, y);      object.setGravityX(x);      object.setGravityY(y);
    
    object.setImmovable(value);
    object.setMass(value);
    object.setMaxVelocity(x, y);
    object.setOffset(x, y);
    object.setPushable(value);


    // Also, implement animation

*/

export default () => {

    const [ collidesWith, setCollidesWith ] = useState([1,2,3]);
    function createCollidesWith(){
        const result = [];
        for(let i = 0; i < 3; i++) result.push(Math.ceil(Math.random() * 10));
        setCollidesWith(result.filter( (a,i,arr) => arr.indexOf(a) === i ));
    }

    const [ visible,             setVisible             ] = useState(true);
    const [ collideWorldBounds,  setCollideWorldBounds  ] = useState(true);

    const [ angularAcceleration, setAngularAcceleration ] = useState(0);
    const [ angularVelocity,     setAngularVelocity     ] = useState(0);
    const [ angle,               setAngle               ] = useState(0);
    const [ rotation,            setRotation            ] = useState(0);
    const [ position,            setPosition            ] = useState({ x: 50, y: 50, z: 50, w: 50 });
    const [ acceleration,        setAcceleration        ] = useState({ x: 0, y: 0 });
    const [ origin,              setOrigin              ] = useState({ x: 0, y: 0 });

    const [ size,                setSize                ] = useState({ width: 60, height: 60 });

    const [ velocity,            setVelocity            ] = useState({ x: 0, y: 0 });
    const [ bounce,              setBounce              ] = useState({ x: 1, y: 1 });

    const [ alpha,               setAlpha               ] = useState(1);

    const [ tint,                setTint                ] = useState("#00ffff");
    const [ tintFill,            setTintFill            ] = useState("#00ffff");

    const [ zIndex,              setZIndex              ] = useState(0);

    const [ flip,                setFlip                ] = useState({ x: false, y: false });

    const [ blendMode,           setBlendMode           ] = useState('NORMAL');

    return <PhaserScene   
        
        id="object-attrs-scene"

        images={{       // Preloaded images
            background: "/images/battleback1.png",
        }}

        sprites={{
            ninja_m:  { 
                url: "/images/sprites/ninja_m.png", frameWidth: 32, frameHeight: 36, startFrame: 0, endFrame: 11,
                animations: {
                    'ninja_m.walk_north': { frameRate: 5, repeat: -1, frames: { start: 0, end: 2 } }, // Range of frames
                    'ninja_m.walk_east':  { frameRate: 5, repeat: -1, frames: { start: 3, end: 5 } },
                    'ninja_m.walk_south': { frameRate: 5, repeat: -1, frames: [ 6,  7,  8 ] },      // or selected individual frames
                    'ninja_m.walk_west':  { frameRate: 5, repeat: -1, frames: [ 9, 9, 9, 10, 11 ] },
                }
            },
        }}

    >
        <PhaserObject
            id="background"
            create={ scene => scene.add.image(400, 300, 'background') }
        />

        <PhaserObject
    
            id="ninja"

            // Array, categories of objects that Arcade Physics Body will collide
            collidesWith={collidesWith} 

            visible             = { visible }


            alpha               = { alpha }
            // alpha               = { [topLeft, topRight, bottomLeft, bottomRight] }

            zIndex              = { zIndex }

            flip                = { flip }
            // tint                = { tint }
            // tintFill            = { tintFill }
            
            angularAcceleration = { angularAcceleration } // Angular acceleration
            angularVelocity     = { angularVelocity     } // Angular velocity
            angle               = { angle               } // Angular orientation in degrees
            rotation            = { rotation            } // Angular orientation in radians

            velocity            = { velocity            } //
            bounce              = { bounce              } //
            position            = { position            } //
            size                = { size                } //
            acceleration        = { acceleration        } //
            origin              = { origin              } //

            blendMode           = { blendMode           } // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/blendmode/

            collideWorldBounds  = { collideWorldBounds }

            // TODO: postFX - https://rexrainbow.github.io/phaser3-rex-notes/docs/site/gameobject/#post-fx-pipeline

            create={ scene => {

                const object = scene.physics.add.sprite(400, 100, 'ninja_m');

                window.object = object;
                // object.setVelocity(10, 100);
                // object.setBounce(1, 1);
                // object.setCollideWorldBounds(true);

                object.play("ninja_m.walk_east", 150);

                return object;
            }}

        />





        {/* Collides with */}
        <p style={{bottom: "0px", color: "white"}}>
            Collides:           <button onClick={createCollidesWith}>Collides</button> [{collidesWith.join(", ")}]
            Visible:            <input type="checkbox" checked={visible} onChange={ e => setVisible(e.target.checked)} />
            collideWorldBounds: <input type="checkbox" checked={collideWorldBounds} onChange={ e => setCollideWorldBounds(e.target.checked)} />
        </p>

        {/* Angular acceleration */}
        <p style={{bottom: "2em", color: "white"}}>
            Angular acceleration: <input
                type="range"
                value={angularAcceleration}
                min="0" max="6" step="0.01"
                onChange={ e => setAngularAcceleration(parseFloat(e.target.value))}
            /> [{angularAcceleration}]

            Angular velocity: <input
                type="range"
                value={angularVelocity}
                min="-10" max="10" step="0.1"
                onChange={ e => setAngularVelocity(parseFloat(e.target.value))}
            /> [{angularVelocity}]

            Angle: <input
                type="range"
                value={angle}
                min="-180" max="180" step="1"
                onChange={ e => setAngle(parseFloat(e.target.value))}
            /> [{angularVelocity}]
            
            Rotation (radians): <input
                type="range"
                value={rotation}
                min="-12" max="12" step="0.1"
                onChange={ e => setRotation(parseFloat(e.target.value))}
            /> [{rotation}]
        </p>

        {/* Position */}
        <p style={{bottom: "4em", color: "white"}}>
            Position X: <input
                type="range"
                value={position.x}
                min="0" max="100" step="1"
                onChange={ e => setPosition({...position, x: parseFloat(e.target.value)})}
            /> [{position.x}]

            Position Y: <input
                type="range"
                value={position.y}
                min="0" max="100" step="1"
                onChange={ e => setPosition({...position, y: parseFloat(e.target.value)})}
            /> [{position.y}]

            Position Z: <input
                type="range"
                value={position.z}
                min="0" max="100" step="1"
                onChange={ e => setPosition({...position, z: parseFloat(e.target.value)})}
            /> [{position.z}]

            Position W: <input
                type="range"
                value={position.w}
                min="0" max="100" step="1"
                onChange={ e => setPosition({...position, w: parseFloat(e.target.value)})}
            /> [{position.w}]
        </p>

        {/* Acceleration */}
        <p style={{bottom: "6em", color: "white"}}>
            Acceleration X: <input
                type="range"
                value={acceleration.x}
                min="-50" max="50" step="1"
                onChange={ e => setAcceleration({...acceleration, x: parseFloat(e.target.value)})}
            /> [{acceleration.x}]

            Acceleration Y: <input
                type="range"
                value={acceleration.y}
                min="-50" max="50" step="1"
                onChange={ e => setAcceleration({...acceleration, y: parseFloat(e.target.value)})}
            /> [{acceleration.y}]


            Velocity X: <input
                type="range"
                value={velocity.x}
                min="-20" max="20" step="0.1"
                onChange={ e => setVelocity({...velocity, x: parseFloat(e.target.value)})}
            /> [{velocity.x}]

            Velocity Y: <input
                type="range"
                value={velocity.y}
                min="-20" max="20" step="0.1"
                onChange={ e => setVelocity({...velocity, y: parseFloat(e.target.value)})}
            /> [{velocity.y}]

        </p>

        {/* Alpha, zIndex, Tint */}
        <p style={{bottom: "8em", color: "white"}}>
            Alpha: <input
                type="range"
                value={alpha}
                min="0" max="1" step="0.01"
                onChange={ e => setAlpha(parseFloat(e.target.value)) }
            /> [{alpha}]

            zIndex: <input
                type="range"
                value={zIndex}
                min="0" max="100" step="1"
                onChange={ e => setZIndex(parseFloat(e.target.value)) }
            /> [{zIndex}]

            Tint: <input
                type="color"
                value={tint}
                onChange={ e => setTint(e.target.value) }
            /> [{tint}]


            TintFill: <input
                type="color"
                value={tintFill}
                onChange={ e => setTintFill(e.target.value) }
            /> [{tintFill}]
        </p>

        {/* Flip, Origin */}
        <p style={{bottom: "10em", color: "white"}}>
            [
                Flip X: <input
                    type="checkbox"
                    checked={flip.x}
                    onChange={ e => setFlip({...flip, x: e.target.checked})}
                /> [{flip.x + ''}]

                Flip Y: <input
                    type="checkbox"
                    checked={flip.y}
                    onChange={ e => setFlip({...flip, y: e.target.checked})}
                /> [{flip.y + ''}]
            ]
            [
                Origin X: <input
                    type="range"
                    value={origin.x}
                    min="0" max="1" step="0.01"
                    onChange={ e => setOrigin({...origin, x: parseFloat(e.target.value)})}
                /> [{origin.x}]

                Origin Y: <input
                    type="range"
                    value={origin.y}
                    min="0" max="1" step="0.01"
                    onChange={ e => setOrigin({...origin, y: parseFloat(e.target.value)})}
                /> [{origin.y}]
            ]

            [
                Bounce X: <input
                    type="range"
                    value={bounce.x}
                    min="0" max="3" step="0.01"
                    onChange={ e => setBounce({...bounce, x: parseFloat(e.target.value)})}
                /> [{bounce.x}]

                Bounce Y: <input
                    type="range"
                    value={bounce.y}
                    min="0" max="3" step="0.01"
                    onChange={ e => setBounce({...bounce, y: parseFloat(e.target.value)})}
                /> [{bounce.y}]
            ]

        </p>

        <p style={{bottom: "12em", color: "white"}}>
            [ 
                <select onChange={ e => setBlendMode(e.target.value)} value={blendMode}>
                    { Object.keys(Phaser.BlendModes).map( blendMode => <option key={`bm-${blendMode}`} value={blendMode}>{blendMode}</option>) }
                </select>
            ]
            [
                Size width: <input
                    type="range"
                    value={size.width}
                    min="30" max="100" step="0.1"
                    onChange={ e => setSize({...size, width: parseFloat(e.target.value)})}
                /> [{size.width}]

                Size height: <input
                    type="range"
                    value={size.height}
                    min="30" max="100" step="0.1"
                    onChange={ e => setSize({...size, height: parseFloat(e.target.value)})}
                /> [{size.height}]
            ]



        </p>



    </PhaserScene>

}


