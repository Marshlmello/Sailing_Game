import teacher1 from "../../assets/teacher_1.png";

export default function Testimonial() {
  return (
    <div className=" flex font-serif flex-col items-center jusify-center text-center m-6 tracking-wider">
      <h3 className=" font-serif text-lg uppercase ">
        Was unsere Nutzer denken
        </h3>
      <div className=" flex flex-col space-y-6 max-w-xl mt-6 justify-center  items-center text-center ">
        <img className="rounded-full h-[180px]" src={teacher1} alt="teacher" />
        <h4 className="font-serif text-lg uppercase">Teacher Teacher</h4>
        <p className="text-[#393939]">Berufung</p>
        <p className="text-[#393939]">
          Das Programm bietet interaktive Lernmethoden und visuelle Hilfsmittel,
          um Schülern die Konzepte des Segelns, wie das Kreuzen und Segeln "am
          Wind" beizubringen. Ich habe es in meinem Unterricht eingesetzt und es
          hat dazu beigetragen, die Schüler im Segeln zu unterstützen. Basierend
          auf meiner Erfahrung, kann ich sagen, dass das Spiel ein nützliches
          Werkzeug sein kann, um Schülern das Segeln beizubringen.
        </p>
      </div>
    </div>
  );
}
