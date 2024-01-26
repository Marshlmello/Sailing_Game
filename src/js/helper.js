/**
 * @class The Helper class includes the most important functions of the sailing simulation.
 *
 */
class Helper {
  /**
   *The function calculates the current sailing course by the parameters wind direction and boat direction
   * @param {number} windDirection  a number of degrees in the circle between 0 - 359
   * @param {number} boatDirection  a number of degrees in the circle between 0 - 359
   * @returns the current sailing course as a string
   *
   * @example
   * // The expected return value is downwind
   * let windDirection = 0;
   * let boatDirection = 180;
   * let currentCourse = getBoatCourse(windDirection, boatDirection); //currentCourse == "downwind"
   *
   */
  getBoatCourse(windDirection, boatDirection) {
    let diff = this.calcClockwiseDistance(windDirection, boatDirection);

    if ((diff >= 35 && diff <= 40) || (diff >= 320 && diff < 325)) {
      return "high close hauled"; //faktor= 0.5
    }

    if ((diff > 40 && diff <= 80) || (diff > 280 && diff < 320)) {
      return "close hauled"; //faktor= 0.6
    }

    if ((diff > 80 && diff <= 105) || (diff > 255 && diff <= 280)) {
      return "beam reach"; //faktor= 1.0
    }

    if ((diff > 105 && diff <= 150) || (diff > 210 && diff <= 255)) {
      return "broad reach"; //faktor= 0.8
    }

    if (diff > 150 && diff <= 210) {
      return "downwind"; //faktor= 0.6
    } else return "no wind"; //faktor= 0
  }

  /**
 * Determines if the boat direction and sail direction are suitable for a high close hauled course, based on the wind direction.
 * @param {number} windDirection  a number of degrees in the circle between 0 - 359
 * @param {number} boatDirection  a number of degrees in the circle between 0 - 359
 * @param {number} sailDirection  a number of degrees in the circle between 0 - 359
 * @returns {boolean} `true` if the boat and sail directions are suitable for a broad reach course, `false` otherwise.
 * 
 * @example 
 * //The boat is sailing by wind direction is 0°, boat direction is 270° and sail direction is 300°
    const windDirection = 0;
    const boatDirection = 322;
    const sailDirection = 140;
    
    let isSails = highCloseHauled(windDirection, boatDirection, sailDirection) // returns: true
 * @example 
 * //The boat is not sailing by wind direction is 0°, boat direction is 90° and sail direction is 300°
    const windDirection = 0;
    const boatDirection = 36;
    const sailDirection = 140;
    
    let isSails = highCloseHauled(windDirection, boatDirection, sailDirection) // returns: false
 */
  highCloseHauled(windDirection, boatDirection, sailDirection) {
    if ((windDirection || boatDirection || sailDirection) == null) {
      return;
    }

    var diffBoat = this.calcClockwiseDistance(windDirection, boatDirection);
    var diffSail = this.calcClockwiseDistance(windDirection, sailDirection);

    if (diffBoat >= 35 && diffBoat <= 40 && diffSail >= 225 && diffSail < 240) {
      return true;
    }
    if (
      diffBoat >= 320 &&
      diffBoat < 325 &&
      diffSail >= 120 &&
      diffSail < 145
    ) {
      return true;
    } else return false;
  }

  /**
 * Determines if the boat direction and sail direction are suitable for a close hauled course, based on the wind direction.
 * @param {number} windDirection  a number of degrees in the circle between 0 - 359
 * @param {number} boatDirection  a number of degrees in the circle between 0 - 359
 * @param {number} sailDirection  a number of degrees in the circle between 0 - 359
 * @returns {boolean} `true` if the boat and sail directions are suitable for a broad reach course, `false` otherwise.
 * 
 * @example 
 * //The boat is sailing by wind direction is 0°, boat direction is 50° and sail direction is 250°
   const windDirection = 0;
    const boatDirection = 50;
    const sailDirection = 250;
    
    let isSails = closeHauled(windDirection, boatDirection, sailDirection) // returns: true
 * @example 
 * //The boat is not sailing by wind direction is 0°, boat direction is 50° and sail direction is 150°
    const windDirection = 0;
    const boatDirection = 50;
    const sailDirection = 150;
    
    let isSails = closeHauled(windDirection, boatDirection, sailDirection) // returns: false
 */
  closeHauled(windDirection, boatDirection, sailDirection) {
    if ((windDirection || boatDirection || sailDirection) == null) {
      return;
    }

    var diffBoat = this.calcClockwiseDistance(windDirection, boatDirection);
    var diffSail = this.calcClockwiseDistance(windDirection, sailDirection);

    if (diffBoat > 40 && diffBoat <= 80 && diffSail >= 200 && diffSail < 260) {
      return true;
    }

    if (diffBoat > 280 && diffBoat < 320 && diffSail >= 100 && diffSail < 160) {
      return true;
    } else return false;
  }

  /**
 * Determines if the boat direction and sail direction are suitable for a beam reach course, based on the wind direction.
 * @param {number} windDirection  a number of degrees in the circle between 0 - 359
 * @param {number} boatDirection  a number of degrees in the circle between 0 - 359
 * @param {number} sailDirection  a number of degrees in the circle between 0 - 359
 * @returns {boolean} `true` if the boat and sail directions are suitable for a broad reach course, `false` otherwise.
 * 
 * @example 
 * //The boat is sailing by wind direction is 0°, boat direction is 90° and sail direction is 300°
   const windDirection = 0;
    const boatDirection = 90;
    const sailDirection = 300;
    
    let isSails = beamReach(windDirection, boatDirection, sailDirection) // returns: true
 * @example 
 * //The boat is not sailing by wind direction is 0°, boat direction is 90° and sail direction is 50
    const windDirection = 0;
    const boatDirection = 90;
    const sailDirection = 50;
    
    let isSails = beamReach(windDirection, boatDirection, sailDirection) // returns: false
 */

  beamReach(windDirection, boatDirection, sailDirection) {
    if ((windDirection || boatDirection || sailDirection) == null) {
      return;
    }

    var diffBoat = this.calcClockwiseDistance(windDirection, boatDirection);
    var diffSail = this.calcClockwiseDistance(windDirection, sailDirection);

    if (diffBoat > 80 && diffBoat <= 105 && diffSail >= 210 && diffSail < 330) {
      return true;
    }
    if (diffBoat > 255 && diffBoat <= 280 && diffSail > 30 && diffSail < 150) {
      return true;
    } else {
      return false;
    }
  }

  /**
 * Determines if the boat direction and sail direction are suitable for a broad reach course, based on the wind direction.
 * @param {number} windDirection  a number of degrees in the circle between 0 - 359
 * @param {number} boatDirection  a number of degrees in the circle between 0 - 359
 * @param {number} sailDirection  a number of degrees in the circle between 0 - 359
 * @returns {boolean} `true` if the boat and sail directions are suitable for a broad reach course, `false` otherwise.
 * 
 * @example 
 * //The boat is sailing by wind direction is 0°, boat direction is 150° and sail direction is 300°
    const windDirection = 0;
    const boatDirection = 150;
    const sailDirection = 300;
    
    let isSails = broadReach(windDirection, boatDirection, sailDirection) // returns: true
 * @example 
 * //The boat is not sailing by wind direction is 0°, boat direction is 150° and sail direction is 50°
    const windDirection = 0;
    const boatDirection = 150;
    const sailDirection = 50;

    
    let isSails = broadReach(windDirection, boatDirection, sailDirection) // returns: false
 */

  broadReach(windDirection, boatDirection, sailDirection) {
    if ((windDirection || boatDirection || sailDirection) == null) {
      return;
    }

    var diffBoat = this.calcClockwiseDistance(windDirection, boatDirection);
    var diffSail = this.calcClockwiseDistance(windDirection, sailDirection);

    if (diffBoat > 105 && diffBoat <= 150 && diffSail > 210 && diffSail < 330) {
      return true;
    }
    if (diffBoat > 210 && diffBoat <= 255 && diffSail > 30 && diffSail < 150) {
      return true;
    } else {
      return false;
    }
  }

  /**
 * Determines if the sail direction is suitable for a downwind course, based on the wind direction.
 * @param {number} windDirection  a number of degrees in the circle between 0 - 359
 * @param {number} sailDirection  a number of degrees in the circle between 0 - 359
 * @returns {boolean} `true` if the sail direction is suitable for a downwind course, `false` otherwise.
 * 
 * @example 
 * //The boat is sailing by wind direction is 0° and sail direction is 300°
    const windDirection = 0;
    const sailDirection = 300;
    
    let isSails = downwind(windDirection, sailDirection) // returns: true
 * @example 
 * //The boat is sailing by wind direction is 0° and sail direction is 0°
    const windDirection = 0;
    const sailDirection = 0;
    
    let isSails = downwind(windDirection, sailDirection) // returns: false
 */

  downwind(windDirection, sailDirection) {
    if ((windDirection || sailDirection) == null) {
      return;
    }
    var diff = this.calcClockwiseDistance(windDirection, sailDirection);
    if ((diff > 10 && diff < 90) || (diff > 270 && diff < 350)) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Returns the calculated the factor of the sailing course based on the given course, wind direction, boat direction, and sail direction.
   *
   * @param {string} course - The type of course. Can be one of "high close hauled", "close hauled", "beam reach", "broad reach", or "downwind".
   * @param {number} windDirection - The direction of the wind.
   * @param {number} boatDirection - The direction of the boat.
   * @param {number} sailDirection - The direction of the sail.
   * @returns {number} The calculated sail cource factor, or -1 if the course is not valid.
   *
   * @example
   * // return the factor from "downwind"
   *
   * let windDirection = 180;
   * let sailDirection = 300:
   * let result = downwind(windDirection, sailDirection) // result: 0.6
   */
  getCalcSpeed(course, windDirection, boatDriection, sailDirection) {
    let isSails;

    if (course == "high close hauled") {
      isSails = this.highCloseHauled(
        windDirection,
        boatDriection,
        sailDirection
      );
      if (isSails == true) {
        return 0.5;
      } else return -1;
    }
    if (course == "close hauled") {
      isSails = this.closeHauled(windDirection, boatDriection, sailDirection);
      if (isSails == true) {
        return 0.6;
      } else return -1;
    }

    if (course == "beam reach") {
      isSails = this.beamReach(windDirection, boatDriection, sailDirection);

      if (isSails == true) {
        return 1;
      } else return -1;
    }
    if (course == "broad reach") {
      isSails = this.broadReach(windDirection, boatDriection, sailDirection);
      if (isSails == true) {
        return 0.8;
      } else return -1;
    }
    if (course == "downwind") {
      isSails = this.downwind(windDirection, sailDirection);
      if (isSails == true) {
        return 0.6;
      } else return -1;
    }
    return -1;
  }

  /**
   * Calculates the movement based on the starting point, time elapsed, wind direction, and maximum speed.
   *
   * @param {number} velocity - The current velocity of the movement.
   * @param {number} time - The amount of time elapsed in the movement.
   * @param {number} sailingCourseFactor - The Factor of the sailing course. Range [-1, 1]
   * @param {number} maxSpeed - The maximum speed of the movement.
   * @returns {number} The calculated movement based on the inputs.
   * @example
   * // return 0 for negative velocity value
   * let velocity = -10;
   * let time = 0.5;
   * let sailingCourseFactor = 1;
   * let maxSpeed= 20;
   *
   * let result = movement(velocity, time, sailingCourseFactor, maxSpeed); // result: 0
   * @example
   * // return max speed for velocity value greater than max speed"
   * let velocity = 25;
   * let time = 0.5;
   * let sailingCourseFactor = 1;
   * let maxSpeed= 20;
   *
   * let result = movement(velocity, time, sailingCourseFactor, maxSpeed); // result: 20
   *
   * @example
   * // return correct result for positive sailing course factor  and time
   * let velocity = 10;
   * let time = 0.5;
   * let sailingCourseFactor = 1;
   * let maxSpeed= 20;
   *
   * let result = movement(velocity, time, sailingCourseFactor, maxSpeed); // result: 10.01
   *
   * @example
   * // return correct result for negativ sailing course factor  and time
   * let velocity = 10;
   * let time = 0.5;
   * let sailingCourseFactor = -1;
   * let maxSpeed= 20;
   *
   * let result = movement(velocity, time, sailingCourseFactor, maxSpeed); // result: 9.99
   */

  movement(velocity, time, sailingCourseFactor, maxSpeed) {
    let max = maxSpeed * sailingCourseFactor;
    if (velocity < 0) {
      return 0;
    } else if (velocity > max && max > 0) {
      return max;
    } else {
      if (sailingCourseFactor < 0) {
        return (
          (1 - time) * velocity + time * velocity + 0.01 * sailingCourseFactor
        );
      } else
        return (
          (1 - time) * velocity + time * velocity + 0.01 * sailingCourseFactor
        );
    }
  }
  /**
   * Converts a given degree to its positive equivalent within the range [0, 360).
   * @param {number} degree a number no matter if poisitive or negative
   * @returns {number} a positve degree number between 0 to 359
   * @example
   * let result = positiveDegree(-5); //returns: 355
   * @example
   * let result = positiveDegree(5); //returns: 5
   *
   */
  positiveDegree(degree) {
    return ((degree % 360) + 360) % 360;
  }

  /**
   * This function calculates the angele between two angles in a clockwise circle
   * @param {number} startAngle  a degree number
   * @param {number} endAngle a degree number
   * @returns {number} a degree number between 0 to 359
   */
  calcClockwiseDistance(startAngle, endAngle) {
    let delta = (360 + (endAngle - startAngle)) % 360;
    return delta;
  }
}
export { Helper };
