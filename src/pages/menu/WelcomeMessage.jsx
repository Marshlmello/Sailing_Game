import { Link } from "react-router-dom";
import sky from "../../assets/sky_background_1.png";
import teddy from "../../assets/teddy_1.png";

export default function WelcomeMessage() {
  return (
    <div className="overflow-hidden flex justify-center">
      <img className=" absolute h-full w-full blur-md z-0 " src={sky}></img>

      <div className="z-10 flex w-10/12 xl:w-6/12 justify-center items-center space-x-4 h-screen ">
        <img className="rounded-full h-[200px]" src={teddy}></img>

        <div className="bg-[#fff] rounded-lg  py-8 px-6 space-y-4">
          <h1 className="font-serif text-[#19b8cb] text-2xl">
            Ahoi!
          </h1>
          <p className="font-serif text-xl">
            Willkommen an Bord! Ich bin Kapitän Teddy und ich
            freue mich dich zu begleiten. 
            Packt eure Rucksäcke und Abenteuerlust aus, denn wir
            werden lernen, wie man ein Schiff steuert und die Segel setzt. 
          </p>
          <Link to="/level">
            <button className="font-serif mt-4 inline-flex  max-w-fit items-center px-6 py-3 uppercase border border-transparent text-base font-serif rounded-full shadow-sm  bg-[#fccb71] hover:bg-[#fccb71c1] focus:outline-none ">
              Aye Aye Käptn
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
