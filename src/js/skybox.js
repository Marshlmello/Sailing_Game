import * as THREE from "three";
import Box_Right from "/src/assets/skybox/Box_Right.bmp?url";
import Box_Left from "/src/assets/skybox/Box_Left.bmp?url";
import Box_Top from "/src/assets/skybox/Box_Top.bmp?url";
import Box_Bottom from "/src/assets/skybox/Box_Bottom.bmp?url";
import Box_Front from "/src/assets/skybox/Box_Front.bmp?url";
import Box_Back from "/src/assets/skybox/Box_Back.bmp?url";

const skybox = new THREE.CubeTextureLoader().load([
  Box_Right,
  Box_Left,
  Box_Top,
  Box_Bottom,
  Box_Front,
  Box_Back,
]);

export { skybox };
