import React from "react";

import { createBrowserRouter, Outlet } from "react-router-dom";

import Layout from "./Layout.jsx";

import { PhaserGame   } from "@orbits/react-phaser";

import EmptyScene       from "scenes/EmptyScene.component";
import ImageScene       from "scenes/ImageScene.component";
import ParticlesScene   from "scenes/ParticlesScene.component";
import SpriteScene      from "scenes/SpriteScene.component";
import MouseObjectScene from "scenes/MouseObjectScene.component";
import MouseSceneScene  from "scenes/MouseSceneScene.component";
import SoundScene       from "scenes/SoundScene.component";

export default createBrowserRouter([
  // <Outlet /> means 'children' inside any parent of children components
  { path: "/", element: <Layout />, children: [
      
    
    {
      path:    "game",
      element: (
        <PhaserGame
          type="WEBGL" // "CANVAS", "WEBGL", "HEADLESS" or "AUTO" (default)
          width={800} height={600}
          physics={{
            default: 'arcade',
            arcade: { gravity: { y: 10 } }
          }}
        >
          <Outlet />
        </PhaserGame>
      ),

      children: [
        { path: "",             element: <EmptyScene       /> },
        { path: "image",        element: <ImageScene       /> },
        { path: "particles",    element: <ParticlesScene   /> },
        { path: "sprite",       element: <SpriteScene      /> },
        { path: "mouse-object", element: <MouseObjectScene /> },
        { path: "mouse-scene",  element: <MouseSceneScene  /> },
        { path: "sound",        element: <SoundScene       /> },

      ]
    },





  ]},
]);