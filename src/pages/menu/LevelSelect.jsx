import { Link } from "react-router-dom";
import sky from "../../assets/sky_background_1.png";
import teddy from "../../assets/teddy_1.png";


export default function LevelSelect() {
  return (
    <div className="overflow-hidden flex justify-center">
      <img className=" absolute h-full w-full blur-md z-0 " src={sky}></img>

      <div className="z-10 flex  w-10/12 xl:w-6/12  justify-center items-center space-x-4 h-screen ">
        <img className="rounded-full h-[200px]" src={teddy}></img>

        <div className="bg-[#fff] rounded-lg  py-8 px-6 space-y-4">
          <h1 className="font-serif text-[#19b8cb] text-2xl">
            Aufgepasst!
          </h1>
          <p className="font-serif text-xl">
            Ihr seht noch aus wie Landratten! Also, entscheidet euch!
            Welchen Schwierigkeitsgrad wählt ihr? Landratte, Matrose oder
            Kapitän?
          </p>
          <div className=" flex space-x-4">
            <Link to="/play/Landratte">
              <button className="font-serif mt-4 inline-flex  max-w-fit items-center px-6 py-3 uppercase border border-transparent text-base font-serif rounded-full shadow-sm  bg-[#7190fc] hover:bg-[#718ffcd7] focus:outline-none ">
                Landratte
              </button>
            </Link>
            <Link to="/play/Matrose">
              <button className="font-serif mt-4 inline-flex  max-w-fit items-center px-6 py-3 uppercase border border-transparent text-base font-serif rounded-full shadow-sm   bg-[#fccb71] hover:bg-[#fccb71c4] focus:outline-none ">
                Matrose
              </button>
            </Link>
            <Link to="/play/Kapitän">
              <button className="font-serif mt-4 inline-flex  max-w-fit items-center px-6 py-3 uppercase border border-transparent text-base font-serif rounded-full shadow-sm  bg-[#fc7171] hover:bg-[#fc7171c3] focus:outline-none ">
                Kapitän
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
