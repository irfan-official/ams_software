import React, { useState, useEffect, useRef } from "react";
import Sdata from "./seeds/sampleAttandence.json" with { type: "json" };
import { GrAdd } from "react-icons/gr";
import showsClass from "./library/shows.js"
import axios from "axios"
import { NavLink } from "react-router-dom";

function Overview() {

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



    function CSS(index = 0, Present_length = 0) {
    return {
      tdCSS: "h-30 align-middle p-2 border border-gray-300",

      thCSS: "border border-gray-300 p-1 rounded-lg ",

      th_h3: "bg-white border border-gray-300 py-3 rounded-md shadow-[0_2px_6px_rgba(0,0,0,0.4)]",

      inputBox: "border-none w-full h-full pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white shadow-[0_2px_6px_rgba(0,0,0,0.4)] rounded-md hover:bg-slate-200 bg-white",

      h3: `h-9 flex justify-between shadow-[0_2px_6px_rgba(0,0,0,0.4)] rounded-md hover:bg-slate-200 border border-gray-300 bg-white ${index + 1 != Present_length ? "mb-1" : ""}`,

      p: "flex items-center justify-center text-center",

      inputBox1: "border-none w-full h-full rounded-md pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white",

      AddCss: "w-full h-10 flex items-center justify-center mt-2 mb-7 border border-gray-300 rounded-md hover:bg-slate-200 shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
    }
  }

  function changeIT(name, index_1, e) {
    setCPYSdata((prev) => prev.map((item, index_2) => index_1 === index_2 ? { ...item, [name]: e.target.value.trim() } : item))
  }


  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <form className="w-[90%]" >
        <div className="overflow-x-auto p-4 w-full ">
          <table className="table-auto border border-black w-full xl:text-[1vw] sm:text-[2vw]">
            <caption className="sm:text-[3vw] xl:text-[1.5vw] sm:mb-4 xl:mb-8 mt-[3.5rem] relative ">
              <strong>
                <u className="text-3xl">
                  {"Thesis Title"} (8th semister)
                </u>
              </strong>
               <NavLink  to="/report" className="px-7 py-3 bg-slate-600 text-white text-[1rem] rounded-md absolute bottom-0 right-5 shadow-[0_2px_6px_rgba(0,0,0,0.4)] border border-gray-300">
                Report
              </NavLink>
            </caption>

            <thead>
              <tr className="bg-gray-100">
                <th className={CSS().thCSS}>
                  <h3 className={CSS().th_h3}>
                    Week
                  </h3>
                </th>
                <th className={CSS().thCSS}>
                  <h3 className={CSS().th_h3}>Date</h3>
                </th>
                <th className={CSS().thCSS}><h3 className={CSS().th_h3}>Student ID</h3></th>
                <th className={CSS().thCSS}><h3 className={`${CSS().th_h3} px-5`}>Student Signature</h3></th>
                <th className={CSS().thCSS}><h3 className={CSS().th_h3}>Supervisor's Comments</h3></th>
                <th className={CSS().thCSS}><h3 className={CSS().th_h3}>Remarks</h3></th>
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
                  <tr key={index_1} className=" ">

                    <td className={CSS().tdCSS}>
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

                      }} className={CSS().inputBox} type="text" value={week} />
                    </td>
                    <td className={CSS().tdCSS}>
                      <input onChange={(e) => { changeIT("date", index_1, e) }} className={CSS().inputBox} type="text" value={date} />
                    </td>
                    <td className={CSS().tdCSS}>
                      {Present.map(({ studentID, status }, index) => (
                        <h3 key={index} className={`${CSS(index, Present.length).h3} p-2`}>
                          <p className={CSS().p}>
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
                      ))}
                    </td>
                    <td className={CSS().tdCSS}>
                      {studentSignature.map(({ studentID, signature }, index) => (

                        <h3 key={index} className={CSS(index, Present.length).h3}>{signature}</h3>

                      ))}
                    </td>
                    <td className={CSS().tdCSS}>
                      {supervisorComments.map(({ studentID, comment }, index) => (

                        <h3 key={index} className={CSS(index, Present.length).h3}>
                          <input type="text"
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
                            className={CSS().inputBox1}
                            value={comment} /></h3>

                      ))}
                    </td>
                    <td className={CSS().tdCSS}>
                      {remarks.map(({ studentID, remarks }, index) => (

                        <h3 key={index} className={CSS(index, Present.length).h3}>
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
                            className={CSS().inputBox1} value={remarks} /></h3>

                      ))}
                    </td>
                  </tr>
                )
              )}

            </tbody>
          </table>
          <div
            onClick={() => {
              const newData = new showsClass(cpySdata[cpySdata.length - 1]?.week || 1, cpySdata[cpySdata.length - 1]?.studentID || ["0812110205101017", "0812110205101027", "0812110205101020"])
              newData.greet();
              setCreatedNewData((prev) => [...prev, newData].sort((a, b) => a.week - b.week))
              setCPYSdata((prev) => [...prev, newData])
            }}
            className={CSS().AddCss}><GrAdd /></div>
        </div>
      </form>
    </div>
  );
}

export default Overview;
