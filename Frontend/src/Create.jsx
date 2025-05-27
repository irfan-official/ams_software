import React, { useState, useEffect } from "react";
import Rdata from "./seeds/sampleRepresent.json" with { type: "json" };

function Create() {
  const [week, setWeek] = useState("");
  const [date, setDate] = useState((new Date()).toLocaleDateString('en-GB'));


  function findIT(param, bool = false){
    let arr = [];
    Rdata.forEach((item, index, ) => {
      if(!bool){
        arr.push({ "studentID": item.studentID, [param]: "" })
      }else{
        arr.push({ "studentID": item.studentID, [param]: bool })
      }
    })
    return arr;
  }

  const [present, setPresent] = useState(findIT("status", true));
  const [studentSignature, setStudentSignature] = useState(findIT("signature"));
  const [supervisorComments, setSupervisorComments] = useState(findIT("comment"));
  const [remarks, setRemarks] = useState(findIT("remarks"));


  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form className="overflow-x-auto p-4 min-w-[85%] ">
          <table className="table-auto border border-black w-full xl:text-[1vw] sm:text-[2vw]">
            <caption className="sm:text-[3vw] xl:text-[1.5vw] sm:mb-4 xl:mb-8">
              <strong>
                <u className="">
                  Progress Report for “Thesis Title” (8th semister)
                </u>
              </strong>
            </caption>

            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2">Week</th>
                <th className="border border-black p-2">Date</th>
                <th className="border border-black p-2">Student ID</th>
                <th className="border border-black p-2">Student Signature</th>
                <th className="border border-black p-2">
                  Supervisor's Comments
                </th>
                <th className="border border-black p-2">Remarks</th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="border-black sm:border-b-2 xl:border-b-3 ">
                <td className="w-full h-30 align-middle   p-2 flex">
                  <input
                    onChange={(e) => {
                      setWeek((prev) => e.target.value);
                    }}
                    className="border-none w-full h-full pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white "
                    type="text"
                    value={week}
                  />
                </td>

                <td className="border h-30 border-black align-middle p-2">
                  <input
                    onChange={(e) => {
                      setDate((prev) => e.target.value);
                    }}
                    className="border-none w-full h-full pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white"
                    type="text"
                    value={date}
                  />
                </td>
                <td className="border border-black align-middle">
                  {present.map(({ studentID, status }, index_1) => (
                    <>
                      <h3 className="p-2 h-10 flex justify-between gap-x-10">
                        <p className="flex items-center justify-center text-center">
                          {studentID}
                        </p>
                        <input
                          className="w-8"
                          type="checkbox"
                          checked={status}
                          onChange={(e) => {
                           setPresent((data) => data.map((item, index_2) => index_1 === index_2 ? {...item, status: !item.status} : item))
                          }}
                        />
                      </h3>
                      {index_1 + 1 != present.length ? <hr /> : <></>}
                    </>
                  ))}
                </td>
                <td className="border border-black align-top ">
                  {studentSignature.map(({ studentID, signature }, index) => (
                    <>
                      <h3 className=" p-2 h-10">{signature}</h3>
                      {index + 1 != studentSignature.length ? <hr /> : <></>}
                    </>
                  ))}
                </td>
                <td className="border border-black align-top">
                  {supervisorComments.map(({ studentID, comment }, index_1) => (
                    <>
                      <h3 className="p-[3px]  h-10">
                        <input
                          type="text"
                          onChange={(e) => {
                           setSupervisorComments((data) => data.map((item, index_2) => index_1 === index_2 ? {...item, comment: e.target.value} : item))
                          }}
                          className="border-none w-full h-full pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white"
                          value={comment}
                        />
                      </h3>
                      {index_1 + 1 != supervisorComments.length ? <hr /> : <></>}
                    </>
                  ))}
                </td>
                <td className="border border-black align-top">
                  {remarks.map(({ studentID, remarks }, index_1) => (
                    <>
                      <h3 className="p-[3px] h-10">
                        <input
                          type="text"
                          onChange={(e) => {
                           setRemarks((data) => data.map((item, index_2) => index_1 === index_2 ? {...item, remarks: e.target.value} : item))
                          }}
                          className="border-none w-full h-full pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white"
                          value={remarks}
                        />
                      </h3>
                      {index_1 + 1 != remarks.length ? <hr /> : <></>}
                    </>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
      </form>
    </div>
  );
}

export default Create;
