import * as THREE from "three";

/**

@class
Class representing a Goal object
*/
class Goal {
  /**
   * Create a Goal object
   * @constructor
   * @param {number} [x=0] - x position of the goal
   * @param {number} [y=0] - y position of the goal
   * @param {number} [z=0] - z position of the goal
   */
  constructor(x, y, z) {
    this.position = new THREE.Vector3(x, y, z) ?? THREE.Vector3();
    this.geometry = new THREE.TorusGeometry(8, 2, 16, 100);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xff0000, //color: red
      opacity: 0.2,
      transparent: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.mesh.name = "Goal";
  }
  /**
   * Generates a random position for the goal. <br>
   *
   * Changed x and z position, y is always 1. <br>
   *
   * A random number between -25 and 25.
   * Math.random() generates a random decimal between 0 and 1.
   * Multiplying this decimal by (25 - -25 + 1) gives us a decimal between 0 and 50.
   * Adding -25 to this decimal gives us a decimal between -25 and 25.
   * Math.floor() rounds down to the nearest whole number.
   * So the result of this expression is a whole number between -25 and 25.
   * @function
   */
  random() {
    this.position.x = Math.floor(Math.random() * (25 - -25 + 1) + -25);
    this.position.y = 1;
    this.position.z = Math.floor(Math.random() * (25 - -25 + 1) + -25);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  }

  /**
   * Gets the direction arrow of the goal
   * @function
   * @returns {THREE.ArrowHelper} - an instance of THREE.ArrowHelper representing the direction of the goal
   */
  getArrow() {
    let dir = new THREE.Vector3(this.position.x, 0, this.position.z);
    let origin = new THREE.Vector3(0, 3, 0);
    dir.normalize();

    const length = 5;
    const hex = 0xffff00;

    let arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
    return arrowHelper;
  }
}

export { Goal };

// function goal(scene, mesh) {
//   //arrow
//   let dir;
//   let origin = new THREE.Vector3(0, 3, 0);
//   const length = 5;
//   const hex = 0xffff00;
//   let arrowHelper;

//   //Goal
//   function goalPos(obj) {
//     let goalx = Math.floor(Math.random() * (25 - -25 + 1) + -25); // set the goal at a random x between [-25;25]
//     let goalz = Math.floor(Math.random() * (25 - -25 + 1) + -25); // set the goal at a random z between [-25;25]
//     obj.position.set(goalx, 1, goalz);

//     dir = new THREE.Vector3(goalx, 0, goalz); // update arrow
//     arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);

//     dir.normalize();

//     scene.add(arrowHelper);
//   }

//   const cone = new THREE.CylinderGeometry(1, 1, 4, 30);
//   const material2 = new THREE.MeshStandardMaterial({
//     color: "#FFC300",
//   });
//   const goal = new THREE.Mesh(cone, material2);
//   goalPos(goal);

//   scene.add(goal);
//   document.getElementById("cheers").style.display = "none";

//   function confetti() {
//     document.getElementById("cheers").style.display = "block";

//     setTimeout(() => {
//       document.getElementById("cheers").style.display = "none";
//     }, 5000);
//   }

//   //get the position of the square
//   document.body.addEventListener("keydown", function () {
//     document.getElementById("goal").innerHTML = // display the position of the square
//       "boat pos -> x:" +
//       Math.round(mesh.position.x) +
//       "z:" +
//       Math.round(mesh.position.z);
//     if (
//       // when goal is reached
//       mesh.position.x == goal.position.x &&
//       mesh.position.z == goal.position.z
//     ) {
//       confetti();
//       goalPos(goal); //update the position of the goal
//     }
//   });

//   //grid helper
//   const size = 100;
//   const divisions = 10;

//   const gridHelper = new THREE.GridHelper(size, divisions);
//   scene.add(gridHelper);

//   var xSpeed = 1;
//   var ySpeed = 1;

//   document.addEventListener("keydown", onDocumentKeyDown, false);
//   function onDocumentKeyDown(event) {
//     var keyCode = event.which;
//     if (keyCode == 39) {
//       mesh.position.z += ySpeed;
//     } else if (keyCode == 37) {
//       mesh.position.z -= ySpeed;
//     } else if (keyCode == 40) {
//       mesh.position.x -= xSpeed;
//     } else if (keyCode == 38) {
//       mesh.position.x += xSpeed;
//     } else if (keyCode == 32) {
//       mesh.position.set(0, 0, 0);
//     }
//   }
// }
