import React, { useContext, useEffect } from "react";
import { UserContext } from "./context/Context.jsx";

import Sdata from "./seeds/sampleAttandence.json" with { type: "json" };

function Attendance() {

  let { reportData, setReportData } = useContext(UserContext)

  useEffect(()=> {
    console.log("reportData = ", reportData)
  },[])

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
            reportData.map(
              (
                {
                   week, date, students, present, studentSignature, supervisorComments, remarks 
                }, 
                index_1) =>
              <tr key={index_1} className="border-black">
                <td className="border border-black align-middle  p-2"><h2 className="p-2">{week}.</h2></td>
                <td className="border border-black align-middle p-2"><h2 className="p-2">{date}</h2></td>
                <td className="border border-black align-middle">
                  <td className="align-middle flex flex-col">
                    {present.map(({ student, presentStatus }, index) => (
                      <span key={index}>
                        <h3 className="p-2 h-10 flex item-center">
                          <p className="flex items-center justify-center text-center">
                            {student.studentID}
                          </p>
                          {presentStatus ? (
                            <></>
                          ) : (
                            <p className="flex items-center justify-center text-center  ml-1">
                              (A)
                            </p>
                          )}

                        </h3>
                        {index + 1 != present.length ? <hr /> : <></>}
                      </span>
                    ))}
                  </td>
                </td>
                <td className="border border-black  ">
                  {
                    studentSignature.map(({ student, signature }, index) => <>
                    <h3 className=" p-2 h-10">{""}</h3>
                     {index + 1 != studentSignature.length ? <hr /> : <></>} </>)
                  }
                </td>
                <td className="border border-black ">
                  {
                    supervisorComments.map(({ student, comment }, index) => <>
                    <h3 className="p-2 h-10">{comment.comment}</h3>
                     {index + 1 != supervisorComments.length ? <hr />
                      : <></>} </>)
                  }
                </td>
                <td className="border border-black">
                  {
                    remarks.map((obj, index) => <>
                    <h3 className="p-2 h-10 ">{obj.remarks.remarks}</h3>
                     {remarks.length != index+1 ? <hr /> : null} </>)
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

