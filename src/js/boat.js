import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import boatModel from "../../Models/boat_lowpoly.glb?url";

/**
 * A class representing a boat.
 * @class
 */
class Boat {
  /**
   * Creates an instance of Boat.
   * @param {Object} [options={SPEED: 1, MAXSPEED: 10}] The options object for the boat.
   */
  constructor(options = { SPEED: 1, MAXSPEED: 10 }) {
    this.SPEED = options.SPEED;
    this.MAXSPEED = options.MAXSPEED;
    this.loader = new GLTFLoader();
    this.promise = this.loadModel(boatModel);
  }
  /**
   * Loads a 3D model in GLTF format
   * @param {string} GLTFModel - The path to the 3D model in GLTF format
   * @return {Promise} A Promise that is resolved with the loaded 3D model if successful, otherwise rejected with an error
   */
  loadModel(GLTFModel) {
    return new Promise((resolve, reject) => {
      this.loader.load(
        GLTFModel,
        (gltf) => {
          const model = gltf.scene;
          resolve(model);
        },
        undefined,
        reject
      );
    });
  }

  /**
   * Gets the speed of the boat.
   * @return {number} The speed of the boat.
   */
  getSpeed() {
    return this.SPEED;
  }

  /**
   * Gets the maximum speed of the boat.
   * @return {number} The maximum speed of the boat.
   */
  getMaxSpeed() {
    return this.MAXSPEED;
  }
}

export { Boat };
