import * as helper from "../src/js/helper.js";

import { describe, it, expect } from "vitest";

describe("Testing the boat course high close hauled", () => {
  it("The wind direction is 0 and boat direction is 36° ", () => {
    const windDirection = 0;
    const boatDirection = 36;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe(
      "high close hauled"
    );
  });
  it("The wind direction is 0 and boat direction is 324° ", () => {
    const windDirection = 0;
    const boatDirection = 324;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe(
      "high close hauled"
    );
  });
  it("The wind direction is 90 and boat direction is 125 ", () => {
    const windDirection = 90;
    const boatDirection = 125;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe(
      "high close hauled"
    );
  });
  it("The wind direction is 90 and boat direction is 54° ", () => {
    const windDirection = 90;
    const boatDirection = 54;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe(
      "high close hauled"
    );
  });
});

describe("Testing the boat course close hauled", () => {
  it("The wind direction is 0 and boat direction is 60° ", () => {
    const windDirection = 0;
    const boatDirection = 60;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe(
      "close hauled"
    );
  });
  it("The wind direction is 0 and boat direction is 300° ", () => {
    const windDirection = 0;
    const boatDirection = 300;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe(
      "close hauled"
    );
  });
  it("The wind direction is 90 and boat direction is 150° ", () => {
    const windDirection = 90;
    const boatDirection = 150;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe(
      "close hauled"
    );
  });
  it("The wind direction is 90 and boat direction is 30° ", () => {
    const windDirection = 90;
    const boatDirection = 30;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe(
      "close hauled"
    );
  });
});

describe("Testing the boat course beam reach", () => {
  it("The wind direction is 0 and boat direction is 90° ", () => {
    const windDirection = 0;
    const boatDirection = 90;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe(
      "beam reach"
    );
  });
  it("The wind direction is 0 and boat direction is 270 ", () => {
    const windDirection = 0;
    const boatDirection = 270;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe(
      "beam reach"
    );
  });
  it("The wind direction is 90 and boat direction is 180° ", () => {
    const windDirection = 90;
    const boatDirection = 180;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe(
      "beam reach"
    );
  });
  it("The wind direction is 90 and boat direction is 0 ", () => {
    const windDirection = 90;
    const boatDirection = 0;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe(
      "beam reach"
    );
  });
});

describe("Testing the boat course broad reach", () => {
  it("The wind direction is 0 and boat direction is 120 ", () => {
    const windDirection = 0;
    const boatDirection = 120;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe(
      "broad reach"
    );
  });
  it("The wind direction is 0 and boat direction is 250° ", () => {
    const windDirection = 0;
    const boatDirection = 250;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe(
      "broad reach"
    );
  });
  it("The wind direction is 90 and boat direction is 200° ", () => {
    const windDirection = 90;
    const boatDirection = 200;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe(
      "broad reach"
    );
  });
  it("The wind direction is 90 and boat direction is 330 ", () => {
    const windDirection = 90;
    const boatDirection = 330;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe(
      "broad reach"
    );
  });
});

describe("Testing the boat course downwind", () => {
  it("The wind direction is 0 and boat direction is 90° ", () => {
    const windDirection = 0;
    const boatDirection = 180;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe("downwind");
  });
  it("The wind direction is 0 and boat direction is 178 ", () => {
    const windDirection = 0;
    const boatDirection = 178;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe("downwind");
  });
  it("The wind direction is 90 and boat direction is 277° ", () => {
    const windDirection = 90;
    const boatDirection = 277;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe("downwind");
  });
  it("The wind direction is 180 and boat direction is 0 ", () => {
    const windDirection = 180;
    const boatDirection = 0;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe("downwind");
  });
});
describe("Testing the boat course no wind", () => {
  it("The wind direction is 0 and boat direction is 90° ", () => {
    const windDirection = 0;
    const boatDirection = 0;
    expect(helper.getBoatCourse(windDirection, boatDirection)).toBe("no wind");
  });
});

describe("Testing the boat sail high close hauled ", () => {
  it("The boat is not sailing by wind direction is 0°, boat direction is not a number and sail direction is 300°", () => {
    const windDirection = 0;
    const boatDirection = isNaN;
    const sailDirection = 300;

    expect(
      helper.highCloseHauled(windDirection, boatDirection, sailDirection)
    ).toBeFalsy();
  });
  it("The boat is not sailing by wind direction is null, boat direction is null and sail direction is null", () => {
    const windDirection = null;
    const boatDirection = null;
    const sailDirection = null;

    expect(
      helper.highCloseHauled(windDirection, boatDirection, sailDirection)
    ).toBeUndefined();
  });
  it("The boat is sailing by wind direction is 0°, boat direction is 36° and sail direction is 300°", () => {
    const windDirection = 0;
    const boatDirection = 36;
    const sailDirection = 230;

    expect(
      helper.highCloseHauled(windDirection, boatDirection, sailDirection)
    ).toBeTruthy();
  });
  it("The boat is not sailing by wind direction is 0°, boat direction is 90° and sail direction is 300°", () => {
    const windDirection = 0;
    const boatDirection = 36;
    const sailDirection = 140;

    expect(
      helper.highCloseHauled(windDirection, boatDirection, sailDirection)
    ).toBeFalsy();
  });

  it("The boat is sailing by wind direction is 0°, boat direction is 270° and sail direction is 300°", () => {
    const windDirection = 0;
    const boatDirection = 322;
    const sailDirection = 140;

    expect(
      helper.highCloseHauled(windDirection, boatDirection, sailDirection)
    ).toBeTruthy();
  });
  it("The boat is not sailing by wind direction is 0°, boat direction is 90° and sail direction is 300°", () => {
    const windDirection = 0;
    const boatDirection = 322;
    const sailDirection = 300;

    expect(
      helper.highCloseHauled(windDirection, boatDirection, sailDirection)
    ).toBeFalsy();
  });
});
describe("Testing the boat sail close hauled ", () => {
  it("The boat is not sailing by wind direction is 0°, boat direction is not a number and sail direction is 300°", () => {
    const windDirection = 0;
    const boatDirection = isNaN;
    const sailDirection = 300;

    expect(
      helper.closeHauled(windDirection, boatDirection, sailDirection)
    ).toBeFalsy();
  });
  it("The boat is not sailing by wind direction is null, boat direction is null and sail direction is null", () => {
    const windDirection = null;
    const boatDirection = null;
    const sailDirection = null;

    expect(
      helper.closeHauled(windDirection, boatDirection, sailDirection)
    ).toBeUndefined();
  });
  it("The boat is sailing by wind direction is 0°, boat direction is 50° and sail direction is 250°", () => {
    const windDirection = 0;
    const boatDirection = 50;
    const sailDirection = 250;

    expect(
      helper.closeHauled(windDirection, boatDirection, sailDirection)
    ).toBeTruthy();
  });
  it("The boat is not sailing by wind direction is 0°, boat direction is 50° and sail direction is 150°", () => {
    const windDirection = 0;
    const boatDirection = 50;
    const sailDirection = 150;

    expect(
      helper.closeHauled(windDirection, boatDirection, sailDirection)
    ).toBeFalsy();
  });

  it("The boat is sailing by wind direction is 0°, boat direction is 270° and sail direction is 300°", () => {
    const windDirection = 0;
    const boatDirection = 300;
    const sailDirection = 150;

    expect(
      helper.closeHauled(windDirection, boatDirection, sailDirection)
    ).toBeTruthy();
  });
  it("The boat is not sailing by wind direction is 0°, boat direction is 300° and sail direction is 300°", () => {
    const windDirection = 0;
    const boatDirection = 300;
    const sailDirection = 300;

    expect(
      helper.closeHauled(windDirection, boatDirection, sailDirection)
    ).toBeFalsy();
  });
});

describe("Testing the boat sail beam reach ", () => {
  it("The boat is not sailing by wind direction is 0°, boat direction is not a number and sail direction is 300°", () => {
    const windDirection = 0;
    const boatDirection = isNaN;
    const sailDirection = 300;

    expect(
      helper.beamReach(windDirection, boatDirection, sailDirection)
    ).toBeFalsy();
  });
  it("The boat is not sailing by wind direction is null, boat direction is null and sail direction is null", () => {
    const windDirection = null;
    const boatDirection = null;
    const sailDirection = null;

    expect(
      helper.beamReach(windDirection, boatDirection, sailDirection)
    ).toBeUndefined();
  });
  it("The boat is sailing by wind direction is 0°, boat direction is 90° and sail direction is 300°", () => {
    const windDirection = 0;
    const boatDirection = 90;
    const sailDirection = 300;

    expect(
      helper.beamReach(windDirection, boatDirection, sailDirection)
    ).toBeTruthy();
  });
  it("The boat is not sailing by wind direction is 0°, boat direction is 90° and sail direction is 50", () => {
    const windDirection = 0;
    const boatDirection = 90;
    const sailDirection = 50;

    expect(
      helper.beamReach(windDirection, boatDirection, sailDirection)
    ).toBeFalsy();
  });

  it("The boat is sailing by wind direction is 0°, boat direction is 270° and sail direction is 300°", () => {
    const windDirection = 0;
    const boatDirection = 270;
    const sailDirection = 50;

    expect(
      helper.beamReach(windDirection, boatDirection, sailDirection)
    ).toBeTruthy();
  });
  it("The boat is not sailing by wind direction is 0°, boat direction is 90° and sail direction is 300°", () => {
    const windDirection = 0;
    const boatDirection = 270;
    const sailDirection = 300;

    expect(
      helper.beamReach(windDirection, boatDirection, sailDirection)
    ).toBeFalsy();
  });
});

describe("Testing the boat sail broad reach ", () => {
  it("The boat is not sailing by wind direction is 0°, boat direction is not a number and sail direction is 300°", () => {
    const windDirection = 0;
    const boatDirection = isNaN;
    const sailDirection = 300;

    expect(
      helper.broadReach(windDirection, boatDirection, sailDirection)
    ).toBeFalsy();
  });
  it("The boat is not sailing by wind direction is null, boat direction is null and sail direction is null", () => {
    const windDirection = null;
    const boatDirection = null;
    const sailDirection = null;

    expect(
      helper.broadReach(windDirection, boatDirection, sailDirection)
    ).toBeUndefined();
  });
  it("The boat is sailing by wind direction is 0°, boat direction is 150° and sail direction is 300°", () => {
    const windDirection = 0;
    const boatDirection = 150;
    const sailDirection = 300;

    expect(
      helper.broadReach(windDirection, boatDirection, sailDirection)
    ).toBeTruthy();
  });
  it("The boat is not sailing by wind direction is 0°, boat direction is 150° and sail direction is 50°", () => {
    const windDirection = 0;
    const boatDirection = 150;
    const sailDirection = 50;

    expect(
      helper.broadReach(windDirection, boatDirection, sailDirection)
    ).toBeFalsy();
  });

  it("The boat is sailing by wind direction is 0°, boat direction is 250° and sail direction is 50°", () => {
    const windDirection = 0;
    const boatDirection = 250;
    const sailDirection = 50;

    expect(
      helper.broadReach(windDirection, boatDirection, sailDirection)
    ).toBeTruthy();
  });
  it("The boat is not sailing by wind direction is 0°, boat direction is 270° and sail direction is 300°", () => {
    const windDirection = 0;
    const boatDirection = 250;
    const sailDirection = 300;

    expect(
      helper.broadReach(windDirection, boatDirection, sailDirection)
    ).toBeFalsy();
  });
});

describe("Testing the boat sail downwind", () => {
  it("The boat is not sailing by wind direction is 0° and sail direction is not a number", () => {
    const windDirection = 0;
    const sailDirection = isNaN;

    expect(helper.downwind(windDirection, sailDirection)).toBeFalsy();
  });
  it("The boat is not sailing by wind direction is null and sail direction is null", () => {
    const windDirection = null;
    const sailDirection = null;

    expect(helper.downwind(windDirection, sailDirection)).toBeUndefined();
  });
  it("The boat is sailing by wind direction is 0° and sail direction is 300°", () => {
    const windDirection = 0;
    const sailDirection = 300;

    expect(helper.downwind(windDirection, sailDirection)).toBeTruthy();
  });
  it("The boat is not sailing by wind direction is 0° and sail direction is 0°", () => {
    const windDirection = 0;
    const sailDirection = 0;

    expect(helper.downwind(windDirection, sailDirection)).toBeFalsy();
  });

  it("The boat is sailing by wind direction is 90° and sail direction is 178°", () => {
    const windDirection = 90;
    const sailDirection = 178;

    expect(helper.downwind(windDirection, sailDirection)).toBeTruthy();
  });
  it("The boat is not sailing by wind direction is 180° and sail direction is 300°", () => {
    const windDirection = 180;
    const sailDirection = 300;

    expect(helper.downwind(windDirection, sailDirection)).toBeFalsy();
  });
});

describe("Testing postive degree", () => {
  it("Input value is negativ", () => {
    expect(helper.positiveDegree(-1)).toBe(359);
  });
  it("Input value is positve", () => {
    expect(helper.positiveDegree(1)).toBe(1);
  });
  it("Input value is 360", () => {
    expect(helper.positiveDegree(360)).toBe(0);
  });
});

describe("Testing movement", () => {
  it("Boat speed less than 0", () => {
    let start = -1;
    let t = 0.1;
    let windCourse = 1;
    let maxSpeed = 10;
    expect(helper.movement(start, t, windCourse, maxSpeed)).toBe(0);
  });
});

describe("Testing getCalcSpeed", () => {
  it("should return 0.5 for high close hauled course with proper wind direction", () => {
    const result = helper.getCalcSpeed("high close hauled", 0, 35, 230);
    expect(result).toBe(0.5);
  });
  it("should return 0.5 for high close hauled course with proper wind direction", () => {
    const result = helper.getCalcSpeed("high close hauled", 0, 35, 30);
    expect(result).toBe(-1);
  });

  it("should return -1 for invalid course", () => {
    const result = helper.getCalcSpeed("invalid course", 100, 90, 80);
    expect(result).toBe(-1);
  });

  it("should return 1 for beam reach course with proper wind direction", () => {
    const result = helper.getCalcSpeed("beam reach", 0, 90, 300);
    expect(result).toBe(1);
  });
  it("should return -1 for beam reach course with non-driving wind direction", () => {
    const result = helper.getCalcSpeed("beam reach", 200, 90, 80);
    expect(result).toBe(-1);
  });

  it("should return 0.8 for broad reach course with driving wind direction", () => {
    const result = helper.getCalcSpeed("broad reach", 0, 120, 250);
    expect(result).toBe(0.8);
  });
  it("should return 0.8 for broad reach course with non driving wind direction", () => {
    const result = helper.getCalcSpeed("broad reach", 0, 120, 120);
    expect(result).toBe(-1);
  });

  it("should return 0.6 for downwind course", () => {
    const result = helper.getCalcSpeed("downwind", 0, 180, 80);
    expect(result).toBe(0.6);
  });
  it("should return -1 for downwind course with non-driving wind direction", () => {
    const result = helper.getCalcSpeed("downwind", 0, 90, 10);
    expect(result).toBe(-1);
  });

  it("should return 0.6 for close hauled course", () => {
    const result = helper.getCalcSpeed("close hauled", 0, 50, 230);
    expect(result).toBe(0.6);
  });
  it("should return - 1 for close hauled course with non-driving wind direction", () => {
    const result = helper.getCalcSpeed("close hauled", 0, 50, 50);
    expect(result).toBe(-1);
  });
});

describe("Testing movement", () => {
  it("should return 0 for negative start value", () => {
    const result = helper.movement(-5, 0.5, 1, 20);
    expect(result).toBe(0);
  });

  it("should return max speed for start value greater than max speed", () => {
    const result = helper.movement(25, 0.5, 1, 20);
    expect(result).toBe(20);
  });

  it("should return correct result for positive sail course factor  and time", () => {
    const result = helper.movement(10, 0.5, 1, 20);
    expect(result).toBeCloseTo(10.01);
  });

  it("should return correct result for negative sail course factor and time", () => {
    const result = helper.movement(10, 0.5, -1, 20);
    expect(result).toBeCloseTo(9.99);
  });

  it("should return start for time 0", () => {
    const result = helper.movement(10, 0, 10, 20);
    expect(result).toBe(10.1);
  });
});
