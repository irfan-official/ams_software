import React, { useState, useEffect, useRef } from "react";
import Sdata from "./seeds/sampleAttandence.json" with { type: "json" };
import { GrAdd } from "react-icons/gr";
import showsClass from "./library/shows.js"
import axios from "axios"

function App() {

  const timeoutRef = useRef(null);

  const [cpySdata, setCPYSdata] = useState(Sdata || [])
  const [createdNewData, setCreatedNewData] = useState([])

  useEffect(() => {
    if (createdNewData.length > 0) {
      let handler = setTimeout(() => {
        //axios.post('', createdNewData)
        console.log("createdData = ", createdNewData)
        setCreatedNewData([])
      }, 5000)
      return () => clearTimeout(handler);
    }
  }, [cpySdata])


  function changeIT(name, index_1, e) {
    setCPYSdata((prev) => prev.map((item, index_2) => index_1 === index_2 ? { ...item, [name]: e.target.value.trim() } : item))
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form className="w-[90%]" >
        <div className="overflow-x-auto p-4 w-full ">
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
            <tbody>
              {cpySdata.map(
                (
                  {
                    week,
                    date,
                    studentID,
                    Present,
                    studentSignature,
                    supervisorComments,
                    remarks,
                  },
                  index_1
                ) => (
                  <tr className=" ">

                    <td className=" h-30 align-middle p-2 border border-gray-300 ">
                      <input onChange={(e) => {
                        changeIT("week", index_1, e);

                        // Clear the previous timer
                        if (timeoutRef.current) {
                          clearTimeout(timeoutRef.current);
                        }

                        // Set new debounce timer
                        timeoutRef.current = setTimeout(() => {
                          setCPYSdata((prev) => [...prev].sort((a, b) => a.week - b.week));
                        }, 7000);

                      }} className="border-none w-full h-full pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white shadow-[0_2px_6px_rgba(0,0,0,0.4)] rounded-md hover:bg-slate-200 " type="text" value={week} />
                    </td>
                    <td className=" h-30 align-middle p-2 border border-gray-300  ">
                      <input onChange={(e) => { changeIT("Date", index_1, e) }} className="border-none w-full h-full pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white shadow-[0_2px_6px_rgba(0,0,0,0.4)] rounded-md hover:bg-slate-200" type="text" value={date} />
                    </td>
                    <td className="h-30 align-middle p-2 border border-gray-300">
                      {Present.map(({ studentID, status }, index) => (
                        <>
                          <h3 className={`p-2 h-9 flex justify-between shadow-[0_2px_6px_rgba(0,0,0,0.4)] rounded-md hover:bg-slate-200 border border-gray-300 ${index + 1 != Present.length ? "mb-1" : ""}`}>
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

                        </>
                      ))}
                    </td>
                    <td className="h-30 align-middle p-2 border border-gray-300 ">
                      {studentSignature.map(({ studentID, signature }, index) => (
                        <>
                          <h3 className={`p-2 h-9 flex justify-between shadow-[0_2px_6px_rgba(0,0,0,0.4)] rounded-md hover:bg-slate-200 border border-gray-300 ${index + 1 != Present.length ? "mb-1" : ""}`}>{signature}</h3>
                        </>
                      ))}
                    </td>
                    <td className="h-30 align-middle p-2 border border-gray-300">
                      {supervisorComments.map(({ studentID, comment }, index) => (
                        <>
                          <h3 className={`h-9 flex justify-between shadow-[0_2px_6px_rgba(0,0,0,0.4)] rounded-md hover:bg-slate-200 border border-gray-300 ${index + 1 != Present.length ? "mb-1" : ""}`}><input type="text"
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
                            className="border-none w-full h-full rounded-md pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white"
                            value={comment} /></h3>
                        </>
                      ))}
                    </td>
                    <td className="h-30 align-middle p-2 border border-gray-300">
                      {remarks.map(({ studentID, remarks }, index) => (
                        <>
                          <h3 className={`h-9 flex justify-between shadow-[0_2px_6px_rgba(0,0,0,0.4)] rounded-md hover:bg-slate-200 border border-gray-300 ${index + 1 != Present.length ? "mb-1" : ""}`}>
                            <input type="text"
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
                              className="border-none rounded-md w-full h-full pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white" value={remarks} /></h3>
                        </>
                      ))}
                    </td>
                  </tr>
                )
              )}

            </tbody>
          </table>
          <div
            onClick={() => {
              const newData = new showsClass(cpySdata[cpySdata.length - 1].week, cpySdata[cpySdata.length - 1].studentID)
              newData.greet();
              setCreatedNewData((prev) => [...prev, newData].sort((a, b) => a.week - b.week))
              setCPYSdata((prev) => [...prev, newData])



            }}
            className="w-full h-10 flex items-center justify-center mt-2 mb-7 border border-gray-300 rounded-md hover:bg-slate-200 shadow-[0_2px_6px_rgba(0,0,0,0.5)]"><GrAdd /></div>
        </div>
      </form>
    </div>
  );
}

export default App;
