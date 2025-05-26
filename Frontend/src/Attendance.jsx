import React from "react";

import Sdata from "./seeds/sampleAttandence.json" with { type: "json" };

function Attendance(data = {}) {
  return (
    <div className="overflow-x-auto p-4 min-w-[85%] ">
      <table className="table-auto border border-black w-full xl:text-[1vw] sm:text-[2vw]">
        <caption className="sm:text-[3vw] xl:text-[1.5vw] sm:mb-4 xl:mb-8"><strong><u className="">Progress Report for “Thesis Title” (8th semister)</u></strong></caption>
        
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-2">Week</th>
            <th className="border border-black p-2">Date</th>
            <th className="border border-black p-2">Student ID</th>
            <th className="border border-black p-2">Student Signature</th>
            <th className="border border-black p-2">Supervisor's Comments</th>
            <th className="border border-black p-2">Remarks</th>
          </tr>
        </thead>
        <tbody className="">
            {
              Sdata.map(({week, Date, StudentID, Present, studentSignature, supervisorComments, remarks}, index) => 
          <tr className="border-black border-b-3">
            <td className="border border-black align-middle  p-2"><h2 className="p-2">{week}.</h2></td>
            <td className="border border-black align-middle p-2"><h2 className="p-2">{Date}</h2></td>
            <td className="border border-black align-middle">
              {
                StudentID.map((ID, index) => <><h3 className="p-2 h-10">{ID}</h3> {index+1 != StudentID.length ? <hr/> : <></>} </>)
              }
              </td>
            <td className="border border-black align-top ">
              {
                studentSignature.map(({studentID, signature}, index) => <><h3 className=" p-2 h-10">{signature}</h3> {index+1 != StudentID.length ? <hr/> : <></>} </>)
              }
            </td>
            <td className="border border-black align-top">
                          {
                supervisorComments.map(({studentID, comment}, index) => <><h3 className="p-2 h-10">{comment}</h3> {index+1 != StudentID.length ? <hr/> : <></>} </>)
              }
            </td>
            <td className="border border-black align-top">
                          {
                remarks.map(({studentID, remarks}, index) => <><h3 className="p-2 h-10">{remarks}</h3> {index+1 != StudentID.length ? <hr/> : <></>} </>)
              }
            </td>
          </tr>)
            }
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;


          // <tr>
          //   <td className="border border-black align-top p-2">1.</td>
          //   <td className="border border-black align-top p-2"></td>
          //   <td className="border border-black align-top">
          //     0812110205101017
          //     <hr />
          //     0812110105101027
          //     </td>
          //   <td className="border border-black align-top p-2"></td>
          //   <td className="border border-black align-top p-2"></td>
          //   <td className="border border-black align-top p-2"></td>
          // </tr>