import React from "react";
import Rdata from "./seeds/sampleRepresent.json" with { type: "json" };


function Represent() {
  return (
    <div className="overflow-x-auto p-4 xl:w-[85%] sm:w-[100%]">
      <h1 className="sm:text-[2.5vw] xl:text-[1.3vw] "><strong><u>Supervisor Name</u>: Md, Omar Faru1</strong> (Assistant Professor), Department of CSE</h1>
      <table className="table-auto border border-black w-full xl:text-[1vw] sm:text-[2vw]">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-2">SL</th>
            <th className="border border-black p-2">Student ID</th>
            <th className="border border-black p-2">Student Name</th>
            <th className="border border-black p-2"> {Rdata[0].courseType} Title</th>
          </tr>
        </thead>
        <tbody>
        { Rdata.map(({studentID, studentName, title}, index) => <tr>
            <td className="border border-black p-2 h-10">{index+1}.</td>
            <td className="border border-black p-2 h-10">{studentID}</td>
            <td className="border border-black p-2 h-10">{studentName}</td>
            <td className="border border-black p-2 h-10">{title}</td>
          </tr>) 
        }
        </tbody>
      </table>
    </div>
  );
}

export default Represent;

