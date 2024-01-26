/**
 * A class for checking for collisions between two objects
 */

import * as THREE from "three";

class Detection {
  /**
   * Creates an instance of Detection.
   * @param {number} collisionDistance - The distance at which the objects are considered to be in collision
   */
  constructor(collisionDistance) {
    this.collisionDistance = collisionDistance;
    this.maxDistance = 100;
    this.distance = new THREE.Vector3();
  }

  /**
   * Checks for collision between two objects
   * @param {THREE.Mesh} mesh1 - The first mesh to check for collision
   * @param {THREE.Mesh} mesh2 - The second mesh to check for collision
   * @param {function} isCollision - The function to call if a collision is detected
   * @param {function} toFarAway - The function to call if the distance is greater than the maximum distance
   */
  check(mesh1, mesh2, isCollision, toFarAway) {
    this.distance.subVectors(mesh1.position, mesh2.position);

    // Check if the distance is less than the collision threshold
    if (this.distance.length() < this.collisionDistance) {
      // If the meshes are in contact, change the color of one of the meshes
      mesh1.material.color.set(0x00ff00);
      console.log("Collision detected!");
      isCollision();
    } else {
      // If the meshes are not in contact, set the color back to the original
      mesh1.material.color.set(0xff0000);
    }
    if (this.distance.length() > this.maxDistance) {
      console.log("Boat spotted too far!");
      toFarAway();
    }
  }
}
export { Detection };
