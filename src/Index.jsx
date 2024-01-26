import { useState } from "react";
import ChooseLvl from "./menu/ChooseLvl.jsx";
import StartScreen from "./menu/StartScreen.jsx";
import App from "./App";

function Index() {
  const [showStartMenu, setShowStartMenu] = useState(true);
  const [showChooseLvl, setShowChooseLvl] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [lvl, setLvl] = useState("");

  return (
    <>
      {showStartMenu && (
        <StartScreen
          disableStartScreen={() => {
            setShowStartMenu(false), setShowChooseLvl(true);
          }}
        />
      )}
      {showChooseLvl && (
        <ChooseLvl
          startGame={() => {
            setShowChooseLvl(false), setStartGame(true);
          }}
          getLvl={(x) => setLvl(x)}
        />
      )}
      {startGame && 
      <App 
        lvl={lvl}
        pushHomeButton={() => {
          setStartGame(false),
          setShowStartMenu(true)
          }}
          restart={() => {
          setStartGame(false)
          setTimeout(setStartGame(true), 5000)
        }}
      />
      }
    </>
  );
}

export default Index;
