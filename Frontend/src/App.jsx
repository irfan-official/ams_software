import React from "react";
import Attendance from "./Attendance.jsx";
import Represent from "./Represent.jsx";

function App() {
  return (
    <div className="w-full min-h-full flex flex-col justify-center, items-center">
      <h1 className=" w-full text-center sm:text-[3vw] xl:text-[2vw] sm:mt-2 xl:mt-12">
        <strong>BANGLADESH ARMY UNIVERSITY OF ENGINEERING & TECHNOLOGY</strong>
      </h1>
      <h2 className="w-full text-center sm:text-[2.7vw] xl:text-[2vw]">
        <strong className="font-semibold">
          DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
        </strong>
      </h2>
      <h3 className="w-full text-center sm:text-[2.3vw] xl:text-[2vw]">
        <strong className="font-semibold">QUADIRANBAD, NATORE-6431</strong>
      </h3>
      <br />
      <Represent />
      <br />
      <Attendance />
    </div>
  );
}

export default App;
