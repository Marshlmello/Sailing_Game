import { Link } from "react-router-dom";
import BackgroundImg from "../../assets/boat_high_res.jpeg";

export default function Hero() {
  return (
    <div className="">
      <img src={BackgroundImg} className="absolute z-0 h-full w-full" />

      <div className="flex flex-col w-full  min-h-screen space-y-4 p-16 z-10">
        <h1 className="z-10 font-serif w-full text-4xl text-[#4ff1f5] ">
          The interactive sailing game
          </h1>
        <h2 className="z-10 font-serif w-full text-8xl text-[#f8cf85] ">
          Ahoi!
          </h2>
        <p className="z-10 font-serif w-1/2 text-2xl text-[#f9fcfc]">
          Entdecke die Welt des Segelns mit unserem interaktiven Spiel. Lern die
          Konzepte des Segelns auf eine unterhaltsame Art und Weise. Werde ein
          Meister auf dem Wasser.
        </p>

        <div className="flex flex-row z-10">
          <Link to="/welcome">
            <button className="inline-flex  max-w-fit items-center px-6 py-3 border border-transparent text-2xl font-serif rounded-full shadow-sm text-[#2da3b1] bg-[#f9fcfc] hover:bg-[#e0dfdf] focus:outline-none ">
              Play
            </button>
          </Link>
          {/* <button>Contact Sales</button> */}
        </div>
      </div>
    </div>
  );
}
