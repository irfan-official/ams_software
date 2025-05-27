import React, {useState, useEffect} from "react";
import Sdata from "./seeds/sampleAttandence.json" with { type: "json" };
import { data } from "react-router-dom";

function App() {

  const [cpySdata, setCPYSdata] = useState(Sdata)

  function changeIT(name, index_1, e){
    setCPYSdata((prev) => prev.map((item, index_2) => index_1 === index_2 ? {...item, [name]: e.target.value.trim()} : item))
  }
  return (
    <div>
      <form >
        <div className="overflow-x-auto p-4 min-w-[85%] ">
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
              <th className="border border-black p-2">Supervisor's Comments</th>
              <th className="border border-black p-2">Remarks</th>
            </tr>
          </thead>
          <tbody className="">
            {cpySdata.map(
              (
                {
                  week,
                  Date,
                  StudentID,
                  Present,
                  studentSignature,
                  supervisorComments,
                  remarks,
                },
                index_1
              ) => (
                <tr className="border-black sm:border-b-2 xl:border-b-3 ">

                  <td className="w-full h-30 align-middle   p-2 flex">
                   <input onChange={(e) => {changeIT("week", index_1, e)}} className="border-none w-full h-full pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white " type="text" value={week}/>
                  </td>



                  <td className="border h-30 border-black align-middle p-2">
                    <input onChange={(e) => {changeIT("Date", index_1, e)}} className="border-none w-full h-full pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white" type="text" value={Date}/>
                  </td>
                  <td className="border border-black align-middle">
                    {Present.map(({ studentID, status }, index) => (
                      <>
                        <h3 className="p-2 h-10 flex justify-between">
                          <p className="flex items-center justify-center text-center">
                            {studentID}
                          </p> 
                      <input
                          className="w-5"
                          type="checkbox"
                          checked={status}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setCPYSdata((prev) =>
                              prev.map((item, weekIndex) => {
                                if (weekIndex === index_1) {
                                  return {
                                    ...item,
                                    Present: item.Present.map((pItem, studentIndex) =>
                                      studentIndex === index ? { ...pItem, status: checked } : pItem
                                    ),
                                  };
                                }
                                return item;
                              })
                            );
                          }}
                        />

                        </h3>
                        {index + 1 != Present.length ? <hr /> : <></>}{" "}
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
                    {supervisorComments.map(({ studentID, comment }, index) => (
                      <>
                        <h3 className="p-[3px]  h-10"><input type="text" 
                        onChange={(e) => {
                            const inputvalue = e.target.value;
                            setCPYSdata((prev) =>
                              prev.map((item, weekIndex) => {
                                if (weekIndex === index_1) {
                                  return {
                                    ...item,
                                    supervisorComments: item.supervisorComments.map((pItem, studentIndex) =>
                                      studentIndex === index ? { ...pItem, comment: inputvalue } : pItem
                                    ),
                                  };
                                }
                                return item;
                              })
                            );
                          }}
                        className="border-none w-full h-full pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white" value={comment}/></h3>
                        {index + 1 != supervisorComments.length ? <hr /> : <></>}
                      </>
                    ))}
                  </td>
                  <td className="border border-black align-top">
                    {remarks.map(({ studentID, remarks }, index) => (
                      <>
                        <h3 className="p-[3px] h-10"><input type="text" 
                        onChange={(e) => {
                            const inputvalue = e.target.value;
                            setCPYSdata((prev) =>
                              prev.map((item, weekIndex) => {
                                if (weekIndex === index_1) {
                                  return {
                                    ...item,
                                    remarks: item.remarks.map((pItem, studentIndex) =>
                                      studentIndex === index ? { ...pItem, remarks: inputvalue } : pItem
                                    ),
                                  };
                                }
                                return item;
                              })
                            );
                          }}
                        className="border-none w-full h-full pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white" value={remarks}/></h3>
                        {index + 1 != remarks.length ? <hr /> : <></>}
                      </>
                    ))}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      </form>
    </div>
  );
}

export default App;
