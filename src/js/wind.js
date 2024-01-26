/**
 * A class representing a wind.
 * @class
 */

class Wind {
  /**
   *
   * @param {number} direction - The direction of the wind in degrees (0 to 359).
   * @param {number} force - The force of the wind. Currently unused.
   */
  constructor(direction, force) {
    this.direction = direction;
    this.force = force;
  }
  /**
   * Returns the direction of the wind.
   * @return {number} The direction of the wind.
   */
  getDirection() {
    return direction;
  }
  /**
   * Returns the force of the wind.
   * @return {number} The force of the wind.
   */
  getForce() {
    return force;
  }
}

export { Wind };
