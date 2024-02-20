import "./App.css";
import * as THREE from "three";
import { useEffect, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";
import { Water } from "./js/water";
import { Helper } from "./js/helper.js";
import { radToDeg } from "three/src/math/MathUtils";
import { Boat } from "./js/boat";
import { Detection } from "./js/detection";
import gsap from "gsap";
import { DefaultScene } from "./js/defaultScene";
import { skybox } from "./js/skybox";
import HomeButton from "./assets/homeButton.png";
import ResetButton from "./assets/restartButton.png";
import PauseButton from "./assets/pauseButton.png";
import StartButton from "./assets/startButton.png";
import WindIndicator from "./assets/windIndicator.png";
import { useParams, Link } from "react-router-dom";
import Confetti from "react-dom-confetti ";
import { Scenario } from "./js/scenario";
import teddy from "./assets/teddy_1.png";

/**
 * @file App.jsx is the root file for the Sailing Simulator
 * @author Anton Richter, Marcel Wohlfahrt, Yannik Simon, Nicolas Lerecouvreux
 */

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: "178",
  dragFriction: "0.09",
  duration: "5320",
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "468px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

let clock = new THREE.Clock();

let paramsHasChanged = true;
let rudderPosition = 0;
let speed = 0;
let pause = true;
let ruderDirection = 2;
let sailDirection = 0;

function App() {
  // => Marcel
  let { level } = useParams();
  // => Marcel
  const [refresh, setRefresh] = useState(false);
  const [pauseButton, setPauseButton] = useState(false);
  const [ruderValue, setRuderValue] = useState(2);
  const [sailValue, setSailValue] = useState(0);
  const [collition, setCollition] = useState(false);
  const [isToFarAway, setIsToFarAway] = useState(false);
  const [shotConfetti, setShotConfetti] = useState(false);
  const [startValue, setStartValue] = useState(false);
  const [landratte, setLandratte] = useState(false);
  const [matrose, setMatrose] = useState(false);
  const [kapitan, setKapitan] = useState(false);

  console.log("Speed", speed);

  let defaultScene = null;
  // => Marcel
  // blocking scrolling
  useEffect(() => {
    document.querySelector("body").style = "overflow: hidden";

    return () => {
      document.querySelector("body").style = "overflow: auto";
    };
  }, []);
  // => Marcel
  useEffect(() => {
    //back Button from Browser deaktivieren
    history.pushState(null, null, location.href);
    window.onpopstate = function (event) {
      history.go(1);
    };
    // => Marcel
    //set lvl
    if (level === "Landratte") {
      setLandratte(true);
      setMatrose(false);
      setKapitan(false);
    }
    if (level === "Matrose") {
      setLandratte(false);
      setMatrose(true);
      setKapitan(false);
    }
    if (level === "Kapitän") {
      setLandratte(false);
      setMatrose(false);
      setKapitan(true);
    }

    const canvas = document.getElementById("canvas");
    //Scene
    defaultScene = new DefaultScene(canvas);

    const gameSettings = new Scenario().getScenario(level);

    const helper = new Helper();

    let wind = gameSettings.wind;
    let goal = gameSettings.goal;

    defaultScene.scene.add(goal.mesh);

    windIndicator.style.transform = `rotate(${wind.direction}deg)`;

    //Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    //Light
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 20, 10);
    defaultScene.scene.add(light);

    const detection = new Detection(5);

    //Controls
    const controls = new OrbitControls(
      defaultScene.camera,
      defaultScene.renderer.domElement
    );
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enabled = false;

    //Water
    const water = new Water();

    water.promise.then((ocean) => {
      defaultScene.scene.add(ocean);
    });

    //Boat
    let boatSettings = new Boat();

    boatSettings.promise.then((model) => {
      // add the model to the scene here
      boatSettings.direction = model.rotation;

      defaultScene.scene.add(model.getObjectByName("Boat"));
    });

    //Resize
    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      // => Marcel
      //Update Camera
      defaultScene.camera.aspect = sizes.width / sizes.height;
      defaultScene.camera.updateProjectionMatrix();
      defaultScene.renderer.setSize(sizes.width, sizes.height);
    });
    // => Marcel
    //render the szene
    function render() {
      if (pause && cameraMoveFinished) {
        ruderDirection = 2;
        setRuderValue(2);
        return;
      }
      if (cameraMoveFinished) {
        animateBoat();
      }

      defaultScene.renderer.render(defaultScene.scene, defaultScene.camera);
    }
    // => Marcel
    //Camera movement at the begiign from the game
    let cameraMoveFinished = false;

    async function startCameraMovement() {
      if (!cameraMoveFinished) {
        const t1 = gsap.timeline();

        await t1.to(defaultScene.camera.position, {
          x: 0.1426,
          y: 8.866,
          z: 26.044,
          duration: 2.5,
          ease: t1.SlowMo,
          onUpdate: function () {
            defaultScene.camera.lookAt(0, 0, 0);
          },
        });
        pause = false;
        setStartValue(true);
        cameraMoveFinished = true;
      }
    }

    let start = 0;
    // => Marcel
    //Collition detector
    function isCollisionTrigger() {
      setCollition(true);
      pauseFunc();
      setTimeout(() => setShotConfetti(true), 200);
    }
    // => Marcel
    // to far away detector
    function toFarAwayTrigger() {
      setIsToFarAway(true);
      pauseFunc();
    }

    //animate boat and movement from the boat
    const animateBoat = () => {
      controls.update();

      var step = clock.getDelta();

      let boat = defaultScene.scene.getObjectByName("Boat");
      let water = defaultScene.scene.getObjectByName("Water");

      windIndicator.style.transform = `rotate(${wind.direction}deg)`;
      let course;

      detection.check(
        gameSettings.goal.mesh,
        boat,
        isCollisionTrigger,
        toFarAwayTrigger
      );
      const cameraOffset = new THREE.Vector3(0.1426, 8.866, 26.044);
      defaultScene.camera.position.copy(boat.position).add(cameraOffset);
      defaultScene.camera.lookAt(boat.position);

      // Ruder and Boot Movement
      if (ruderDirection === "0") {
        boat.rotation.y -= step / 4;
        paramsHasChanged = true;
        (boat.children[5].rotation.y = -1), 4;
      } else if (ruderDirection === "1") {
        boat.rotation.y -= step / 8;
        paramsHasChanged = true;
        (boat.children[5].rotation.y = -0.5), 4;
      } else if (ruderDirection === "3") {
        boat.rotation.y += step / 8;
        paramsHasChanged = true;
        (boat.children[5].rotation.y = +0.5), 4;
      } else if (ruderDirection === "4") {
        boat.rotation.y += step / 4;
        paramsHasChanged = true;
        (boat.children[5].rotation.y = +1), 4;
      } else {
        boat.children[5].rotation.y = 0;
      }

      // Sail Movement
      boat.children[4].rotation.y = THREE.MathUtils.degToRad(sailDirection);

      if (boat != undefined && paramsHasChanged == true) {
        paramsHasChanged = false;
        let windDir = wind.direction;
        let bootDir = helper.positiveDegree(
          THREE.MathUtils.radToDeg(boat.rotation.y)
        );
        let segelDir = helper.positiveDegree(
          THREE.MathUtils.radToDeg(-boat.getObjectByName("Mast").rotation.y) +
            180 +
            bootDir
        );

        course = helper.getBoatCourse(windDir, bootDir);

        speed = helper.getCalcSpeed(course, windDir, bootDir, segelDir);
      }
      boat.rotation.y -= rudderPosition / 200;

      if (speed > 0) {
        start = helper.movement(start, step, speed, boatSettings.MAXSPEED);
        boat.translateZ(start / 100);
        // console.log(start);
      }
      if (speed < 0 || speed == undefined) {
        start = helper.movement(start, step, -1, boatSettings.MAXSPEED);
        boat.translateZ(start / 100);
        // console.log(start);
        water.material.uniforms["time"].value += 0.05 / 60;
      }
      light.position.copy({
        x: boat.position.x,
        y: boat.position.y + 20,
        z: boat.position.z + 10,
      });
    };

    // => Marcel
    //since something is always moving with us it is always reloaded
    defaultScene.renderer.setAnimationLoop(render);

    // => Marcel
    //start camera movement at tge beginning
    setTimeout(startCameraMovement, 1000);

    //Skybox
    defaultScene.scene.background = skybox;

    // => Marcel
    //end animation loop if this page is closed!!!
    return function () {
      console.log("end three.js ");
      defaultScene.renderer.setAnimationLoop(null);
    };
  }, [refresh]);

  // => Marcel
  function restartFunc() {
    setRefresh(!refresh);
    setCollition(false);
    setIsToFarAway(false);
    ruderDirection = 2;
    setRuderValue(2);
    sailDirection = 0;
    setSailValue(0);
    setShotConfetti(false);
    pause = true;
    setPauseButton(false);
    speed = 0;
    setStartValue(false);
  }

  // => Marcel
  function pauseFunc() {
    setPauseButton(!pauseButton);
    pause = !pause;
    console.log(pause);
  }

  // => Marcel
  const updateRuder = (e) => {
    ruderDirection = e.target.value;
    setRuderValue(e.target.value);
  };

  // => Marcel
  const updateSail = (e) => {
    sailDirection = e.target.value;
    paramsHasChanged = true;
    setSailValue(e.target.value);
  };

  // => Marcel
  return (
    //Overlay Buttons
    <div className="overflow-x-hidden overflow-y-hidden">
      {/* top left corner */}
      <div className=" absolute  pt-12 xl:pt-20 pl-12 xl:pl-24 ">
        <Link to="/welcome">
          <button className="z-10 w-16 mb-4 ">
            <img src={HomeButton} onClick={restartFunc} className="flex z-10" />
            <p className="text-white font-bold mt-2">Home</p>
          </button>
        </Link>

        <button
          type="button"
          onClick={restartFunc}
          className="z-10 w-16  ml-8  "
        >
          <img src={ResetButton} className="flex z-10" />
          <p className="text-white font-bold mt-2">Reset</p>
        </button>
      </div>

      {/* top right corner */}
      <div className=" absolute pt-12 pr-12  xl:pt-20 xl:pr-24 right-0 ">
        {!pauseButton && startValue && (
          <button type="button" onClick={pauseFunc} className="z-10 w-16  ">
            <img src={PauseButton} className="flex z-10" />
            <p className="text-white font-bold mt-2">Pause</p>
          </button>
        )}
        {!pauseButton && !startValue && (
          <button
            type="button"
            disabled
            onClick={pauseFunc}
            className="z-10 w-16 grayscale "
          >
            <img src={PauseButton} className="flex z-10" />
            <p className="text-white font-bold mt-2">Pause</p>
          </button>
        )}
        {pauseButton && (
          <button type="button" onClick={pauseFunc} className="z-10 w-16  ">
            <img src={StartButton} className="flex z-10" />
            <p className="text-white font-bold mt-2">Weiter</p>
          </button>
        )}
      </div>

      {/* wind indicator */}
      <div className="absolute  left-12 xl:left-32 top-1/4  ">
        <img
          src={WindIndicator}
          alt="Windrichtung"
          id="windIndicator"
          className="mt-24"
        />
        <p className="text-white font-bold mt-2">Windrichtung</p>
      </div>

      {/* ruder slider */}
      <div className=" absolute bottom-0 left-0 right-0 text-center z-10 pb-28 xl:pb-40">
        {!pause && (
          <input
            type="range"
            min="0"
            max="4"
            value={ruderValue}
            className="
            slider
          form-range
          w-96
          h-6
          p-0 
          appearance-none
          bg-fuchsia-300
          bg-opacity-80
          rounded-full
          cursor-pointer 
          focus:outline-none focus:ring-0 focus:shadow-none
          slider
          rudder
        "
            onChange={updateRuder}
          />
        )}
        {pause && (
          <input
            type="range"
            min="0"
            max="4"
            disabled
            value={ruderValue}
            className="
          form-range
          w-96
          h-6
          p-0 
          appearance-none
          bg-fuchsia-300
          bg-opacity-30
          rounded-full
          cursor-pointer 
          focus:outline-none focus:ring-0 focus:shadow-none
          slider    
        "
            onChange={updateRuder}
          />
        )}
      </div>

      {/* sail slider */}
      <div className=" absolute xl:right-0 right-[-98px] top-1/2 rotate-90 z-10 ">
        {!pause && (
          <input
            type="range"
            min="-90"
            max="90"
            value={sailValue}
            className="
          form-range
          w-96
          h-6
          p-0
          
          appearance-none
          bg-amber-300
          bg-opacity-80
          rounded-full
          cursor-pointer 
          focus:outline-none focus:ring-0 focus:shadow-none
          slider
          sail
        "
            onChange={updateSail}
          />
        )}
        {pause && (
          <input
            type="range"
            min="-90"
            max="90"
            disabled
            value={sailValue}
            className="
          form-range
          w-96
          h-6
          p-0
          appearance-none
          bg-amber-300
          bg-opacity-30
          rounded-full
          cursor-pointer 
          focus:outline-none focus:ring-0 focus:shadow-none
          slider     
        "
            onChange={updateSail}
          />
        )}
      </div>

      {/* finsih collition overlay */}
      {collition && (
        <>
          <div className=" absolute top-0 left-0 z-10 h-screen w-screen flex items-center justify-center">
            <div className="absolute top-0 left-0 bg-slate-200 opacity-50 z-10 h-screen w-screen flex items-center justify-cente " />
            <div className="z-10 flex absolute  items-center justify-center">
              <Confetti
                active={shotConfetti}
                className="z-10 "
                config={config}
              />
            </div>

            <div className="z-10 flex w-10/12  justify-center items-center   space-x-6 h-screen ">
              <img className="rounded-full h-[200px]" src={teddy}></img>

              <div className="bg-[#fff] rounded-lg text-center  py-8 px-6 space-y-4">
                {!kapitan && (
                  <>
                    <h1 className="font-serif text-[#19b8cb] text-2xl">
                      Du hast es geschafft!
                    </h1>
                    <p className="font-serif text-xl">
                      Du bist hast deine Fähigkeiten als {level} unter Beweis
                      gestellt. <br />
                      Aber schaffst du es auch zum {landratte && "Matrose"}
                      {matrose && "Kapitän"} ?
                    </p>

                    <div className=" flex flex-col  items-center space-y-8 mb-8 ">
                      {landratte && (
                        <Link to="/play/Matrose">
                          <button
                            type="button"
                            className="font-serif mt-4 inline-flex  max-w-fit items-center px-6 py-3 uppercase border border-transparent text-base font-serif rounded-full shadow-sm   bg-[#fccb71] hover:bg-[#fccb71c4] focus:outline-none "
                            onClick={restartFunc}
                          >
                            Weiter zum Matrosen
                          </button>
                        </Link>
                      )}
                      {matrose && (
                        <Link to="/play/Kapitän">
                          <button
                            type="button"
                            className="font-serif mt-4 inline-flex  max-w-fit items-center px-6 py-3 uppercase border border-transparent text-base font-serif rounded-full shadow-sm  bg-[#fc7171] hover:bg-[#fc7171c3] focus:outline-none "
                            onClick={restartFunc}
                          >
                            Weiter zum Kapitän
                          </button>
                        </Link>
                      )}
                      {landratte && (
                        <button
                          type="button"
                          className="font-serif mt-4 inline-flex  max-w-fit items-center px-6 py-3 uppercase border border-transparent text-base font-serif rounded-full shadow-sm  bg-[#7190fc] hover:bg-[#718ffcd7] focus:outline-none "
                          onClick={restartFunc}
                        >
                          Landratte wiederholen
                        </button>
                      )}
                      {matrose && (
                        <button
                          type="button"
                          className="font-serif mt-4 inline-flex  max-w-fit items-center px-6 py-3 uppercase border border-transparent text-base font-serif rounded-full shadow-sm   bg-[#fccb71] hover:bg-[#fccb71c4] focus:outline-none "
                        >
                          Matrose wiederholen
                        </button>
                      )}
                    </div>
                  </>
                )}
                {kapitan && (
                  <>
                    <h1 className=" z-10 m-8  text-center">
                      Sehr gut! <br />
                      Du hast dein können gezeigt. <br />
                      Du bist ein wahrer Kapitän!
                    </h1>
                    <div className=" flex flex-col  items-center space-y-8 mb-8 ">
                      <Link to="/welcome">
                        <button
                          type="button"
                          className="inline-flex   max-w-fit items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={restartFunc}
                        >
                          Home
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* to far away overlay */}
      {isToFarAway && (
        <>
          <div className=" absolute top-0 left-0 z-10 h-screen w-screen flex items-center justify-center">
            <div className="absolute top-0 left-0 bg-slate-200 opacity-50 z-10 h-screen w-screen flex items-center justify-cente " />
            <div className="z-10 flex md:w-10/12 lg:w-6/12 justify-center items-center w-6/12 space-x-6 h-screen ">
              <img className="rounded-full h-[200px]" src={teddy}></img>
              <div className="bg-[#fff] text-center rounded-lg  py-8 px-6 space-y-4">
                <h1 className="font-serif text-[#19b8cb] text-2xl">Ups!</h1>
                <p className="font-serif text-xl">Versuche es noch einmal</p>
                <button
                  type="button"
                  className="font-serif mt-4 inline-flex  max-w-fit items-center px-6 py-3 uppercase border border-transparent text-base font-serif rounded-full shadow-sm  bg-[#fc7171] hover:bg-[#fc7171c3] focus:outline-none "
                  onClick={restartFunc}
                >
                  Restart
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div>
        <canvas id="canvas" />
      </div>
    </div>
  );
}

export default App;
