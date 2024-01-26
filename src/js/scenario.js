import { Goal } from "./goal";
import { Wind } from "./wind";

/**
 * Creates an instance of Scenario.
 * @class Scenario
 * @classdesc A scenario for the game.
 * @param {number} id - The unique identifier for the scenario.
 * @param {string} name - The name of the scenario.
 * @param {Wind} wind - The wind object for the scenario.
 * @param {Goal} goal - The goal object for the scenario.
 */
class Scenario {
  constructor(id, name, wind, goal) {
    (this.id = id), (this.name = name), (this.wind = wind), (this.goal = goal);
  }

  /**
   * This function needs an input string and returns the scenario
   * @function
   * @param {string} level - The level name.
   * @returns {Scenario} The scenario with the given level name.
   */

  getScenario(level) {
    if (level === "Landratte") {
      return Landratte;
    } else if (level === "Matrose") {
      return Matrose;
    } else if (level === "Kapitän") {
      return Kapitän;
    }
  }
}

const Landratte = new Scenario(
  0,
  "Landratte",
  new Wind(180, 1),
  new Goal(0, 1, -80)
);

const Matrose = new Scenario(
  1,
  "Matrose",
  new Wind(140, 1),
  new Goal(20, 1, -80)
);

const Kapitän = new Scenario(2, "Kapitän", new Wind(0, 1), new Goal(0, 1, -80));

export { Scenario };
