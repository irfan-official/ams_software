import React, {useRef} from "react";
import Attendance from "./Attendance.jsx";
import Represent from "./Represent.jsx";

function Report() {
    const groupID = useRef(localStorage.getItem("groupID") || "");

    useEffect(() => {
      if(!groupID){
        navigate("/");
      }
    }, []);

  return (
    <div className="w-full min-h-full flex flex-col justify-center, items-center relative ">

      <h1 className=" w-full text-center sm:text-[3vw] xl:text-[2vw] sm:mt-2 xl:mt-12">
        <strong>BANGLADESH ARMY UNIVERSITY OF ENGINEERING & TECHNOLOGY</strong>
      </h1>
      <h2 className="w-full text-center sm:text-[2.7vw] xl:text-[1.7vw]">
        <strong className="font-semibold">
          DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
        </strong>
      </h2>
      <h3 className="w-full text-center sm:text-[2.3vw] xl:text-[1.5vw] relative">
        <strong className="font-semibold">QUADIRANBAD, NATORE-6431</strong>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-slate-500 text-[1rem] text-white  hover:bg-blue-700 absolute  bottom-0 right-28 shadow-[0_2px_6px_rgba(0,0,0,0.4)] border border-gray-300 rounded-md xl:visible sm:invisible"
        >
          Print Page
        </button>
      </h3>
      <br />
      <Represent />
      <br />
      <Attendance />
    </div>
  );
}

export default Report;
