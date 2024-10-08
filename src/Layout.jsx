import React    from "react";
import { Link, Outlet } from "react-router-dom";


export default () => <div>
  <div>
                                                  &nbsp;&nbsp;
    <Link to="/"              > Home      </Link> &nbsp;&nbsp;
    <Link to="/game"          > Scene     </Link> &nbsp;&nbsp;
    <Link to="/game/image"    > Image     </Link> &nbsp;&nbsp;
    <Link to="/game/particles"> Particles </Link> &nbsp;&nbsp;
    <Link to="/game/sprite"   > Sprite    </Link> &nbsp;&nbsp;
    <Link to="/game/mouse-object" > Mouse(object) </Link> &nbsp;&nbsp;
    <Link to="/game/mouse-scene"  > Mouse(scene)  </Link> &nbsp;&nbsp;
    <Link to="/game/sound"  >       Sound         </Link> &nbsp;&nbsp;
  </div>
  <div>
    <Outlet />
  </div>
</div>;