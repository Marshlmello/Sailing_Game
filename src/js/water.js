import * as THREE from "three";
import { Water as Water2 } from "three/examples/jsm/objects/Water";
import waterImgUrl from "../../img/waternormals.jpg";

/**
 * A class representing a water.
 * @class
 */
class Water {
  /**
   * Constructor for the Water class.
   */
  constructor() {
    this.promise = this.init();
  }

  /**
   * Initializes and loads the water texture and properties.
   * @returns {Promise} - A promise that resolves with the created water object.
   */

  init() {
    return new Promise((resolve, reject) => {
      const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

      let water = new Water2(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load(
          waterImgUrl,
          function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          }
        ),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x0c7883,
        distortionScale: 3.7,
        wireframe: true,
      });
      water.receiveShadow = true;
      water.rotation.x = -Math.PI / 2;
      water.name = "Water";
      resolve(water), undefined, reject;
    });
  }
}

export { Water };
