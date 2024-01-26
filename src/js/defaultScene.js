/**
 * A class for creating a default scene using Three.js
 */

import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";

/**
 * Creates an instance of DefaultScene.
 * @param {HTMLCanvasElement} canvas - The canvas element to render the default scene on
 */

class DefaultScene {
  constructor(canvas) {
    this.scene = new THREE.Scene();
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      1,
      10000
    );
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
    this.environment = new RoomEnvironment();
    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);

    this.init();
  }

  /**
   * Initializes the default scene
   */
  init() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(2);
    this.camera.position.set(-0.48, 43.406, 15.07);
    this.scene.add(this.camera);
    this.scene.environment = this.pmremGenerator.fromScene(
      this.environment
    ).texture;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.8;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
  }
}

export { DefaultScene };
