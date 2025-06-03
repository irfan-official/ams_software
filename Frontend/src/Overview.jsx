import React, { useState, useEffect, useRef, useContext, use } from "react";
import Sdata from "./seeds/sampleAttandence.json" with { type: "json" };
import { GrAdd } from "react-icons/gr";
import showsClass from "./library/shows.js"
import axios from "axios"
import { NavLink } from "react-router-dom";
import Rdata from "./seeds/sampleRepresent.json" with { type: "json" };
import { IoIosCreate } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { UserContext } from "./context/Context.jsx";
import { useNavigate } from "react-router-dom";


function Overview() {

  let {reportData, setReportData} = useContext(UserContext)
  let {details, setDetails} = useContext(UserContext)

  const navigate = useNavigate();

useEffect(() => {
  if (!reportData || !details) {
    navigate(-1);
  }
}, [reportData, details]);


  const timeoutRef = useRef(null);

  const [cpySdata, setCPYSdata] = useState(Sdata || [])
  const [createdNewData, setCreatedNewData] = useState([])
  
  const [click, setClick] = useState(false)
  const [show, setShow] = useState(false)

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

  async function updateDetailsData(/*_id, */ studentID, studentName, title) {

    if (!studentID || !studentName || !title) return

    try {
      let responsedata = await axios.patch("/url",
        {
          // reportID: _id,
          studentID,
          studentName,
          title
        },
        {
          withCredentials: true
        }
      );

      setDetails(responsedata)
    } catch (error) {
      console.log("req details error => ", error)
    }
  }

  async function deleteReport(reportID = "") {

    if (!reportID) return

    try {
      const responsedata = await axios.delete("/url", {
        data: { reportID: reportID },
        withCredentials: true
      });

      setReportData(responsedata);

    } catch (error) {
      console.log("req details error => ", error);
    }
  }

  async function getGroupReport(groupID = "") {
    try {
      if (!groupID) return;

      const response = await axios.post("/url", {
        groupID,
      }, { withCredentials: true });

      if (!response.data.redirect) {
        alert(response.data.message);
      }

    } catch (error) {
      console.log("getGroupReport error:", error);
      alert("Something went wrong", error.message);
    }
  }

  async function createReport(groupID = "", studentID = [], titleID = []) {
    try {
      if (!groupID || !studentID || !titleID) return;

      const response = await axios.post("/url", {
        groupID, studentID, titleID
      }, { withCredentials: true });

      if (!response.data.redirect) {
        alert(response.data.message);
        setReportData(response.data.responseData);
      }
    } catch (error) {
      console.log("getGroupReport error:", error);
      alert("Something went wrong", error.message);
    }
  }

  async function updateReport(
    groupID = "",
    week = "",
    date = "",
    studentID = [],
    studentSignature = [],
    title = [],
    supervisorComments = "",
    remarks = "") {

    try {
      if (!week || !date || !studentID || !studentSignature || !title || !supervisorComments || !remarks) {
        return;
      }
      let responsedata = await axios.patch("/url",
        {
          groupID,
          week,
          date,
          studentID,
          studentSignature,
          title,
          supervisorComments,
          remarks
        },
        {
          withCredentials: true
        }
      );

      setReportData(responsedata.data.responseData)

    } catch (error) {
      console.log("req details error => ", error)
    }


  }


  function CSS(index = 0, Present_length = 0) {
    return {
      tdCSS: "h-30 align-middle p-2 border border-gray-300",

      thCSS: "border border-gray-300 p-1 rounded-lg ",

      th_h3: "bg-white border border-gray-300 py-3 rounded-md shadow-[0_2px_6px_rgba(0,0,0,0.4)]",

      inputBox: "border-none w-full h-full pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white shadow-[0_2px_6px_rgba(0,0,0,0.4)] rounded-md hover:bg-slate-200 bg-white",

      h3: `h-9 flex justify-between shadow-[0_2px_6px_rgba(0,0,0,0.4)] rounded-md hover:bg-slate-200 border border-gray-300 bg-white ${index + 1 != Present_length ? "mb-1" : ""}`,

      p: "flex items-center justify-center text-center",

      inputBox1: "border-none w-full h-full rounded-md pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white",

      ButtonCss: "w-full h-10 flex items-center justify-center mt-2 mb-7 border border-gray-300 rounded-md hover:bg-slate-200 shadow-[0_2px_6px_rgba(0,0,0,0.5)]",

      optionalDisplay: "border border-dotted border-gray-400"
    }
  }

  function changeIT(name, index_1, e) {
    setCPYSdata((prev) => prev.map((item, index_2) => index_1 === index_2 ? { ...item, [name]: e.target.value.trim() } : item))
  }


  return (
    <div className="w-full min-h-screen flex  items-center bg-gray-50 flex-col">

      <div
        className={`w-[80%] h-[4vw]  ${click ? "sticky" : "relative"} top-0 z-[100] flex justify-center items-center`}>
        <div
          className="w-full h-full flex justify-center items-center bg-slate-950 border-2 rounded-full mt-4 mb-2 
      border-gray-300 hover:bg-slate-900 hover:border-orange-500 shadow-[0_2px_6px_rgba(0,0,0,0.5)] text-white text-xl select-none"
          onClick={() => {
            setShow((prev) => !prev)
          }}
        >
          <h1 className="">Details</h1>
        </div>


        <span className="absolute right-4 top-[1rem] justify-center items-center">
          <label className="relative inline-block w-6 h-6 cursor-pointer ">
            <input
              type="checkbox"
              className="opacity-0 w-0 h-0 peer"
              checked={click}
              onChange={() => setClick((prev) => !prev)}
            />
            <span className="absolute inset-0 rounded-full border-2 border-slate-600 peer-checked:bg-lime-400 transition">

            </span>
          </label>
        </span>


        <div className={`
          w-[90%] border-2 border-orange-500 border-t-0 bg-slate-900 absolute z-[-40] 
          rounded-b-lg shadow-[0_2px_6px_rgba(0,0,0,0.8)] text-white p-5
           transition-all duration-500 ease-in-out
          ${show ? "top-[103.6%] opacity-100 pointer-events-auto z-[-40]" : "top-0 opacity-0 pointer-events-none z-[-40] "}
        `}>

          <table className="table-auto border border-dotted border-black w-full xl:text-[1vw] sm:text-[2vw]">
            <thead>
              <tr className="">
                <th className={`${CSS().optionalDisplay} p-2`}>SL</th>
                <th className={`${CSS().optionalDisplay} p-2`}>Student ID</th>
                <th className={`${CSS().optionalDisplay} p-2`}>Student Name</th>
                <th className={`${CSS().optionalDisplay} p-2`}> {Rdata[0].courseType} Title</th>
              </tr>
            </thead>

            <tbody>
              {details.map(({/*_id, */ studentID, studentName, title }, index) => <tr>
                <td className={` ${CSS().optionalDisplay} h-10 p-2`}>{index + 1}.</td>
                <td className={` ${CSS().optionalDisplay} h-10 p-2`}>{studentID}</td>

                <td className={` ${CSS().optionalDisplay} h-10 `}>
                  <div className="w-full h-full flex items-center justify-between">
                    <input
                      className="border-none w-[90%] h-full focus:outline-0 focus:bg-slate-700 pl-2"

                      onChange={(e) => {
                        setDetails((prev) => prev.map((data, dataIndex) =>
                          index === dataIndex ? { ...data, studentName: e.target.value } : data
                        ))
                      }}

                      value={studentName}
                      type="text" />
                    <span className="w-[10%] h-full flex justify-center items-center">
                      <span
                        onClick={() => updateDetailsData(/*_id, */ studentID, studentName, title)}
                        className="scale-150 text-slate-400 hover:text-lime-400 cursor-pointer">
                        <FaRegCheckCircle />
                      </span>
                    </span>

                  </div>
                </td>

                <td className={` ${CSS().optionalDisplay} h-10`}>
                  <div className="w-ful h-full flex items-center justify-center">
                    <input
                      className="border-none w-[90%] h-full focus:outline-0 focus:bg-slate-700 pl-2"
                      onChange={(e) => {
                        setDetails((prev) => prev.map((data, dataIndex) =>
                          index === dataIndex ? { ...data, title: e.target.value } : data
                        ))
                      }}
                      value={title}
                      type="text" />

                    <span className="w-[10%] h-full flex justify-center items-center">
                      <span
                        onClick={() => sendDetailsData(/*_id, */ studentID, studentName, title)}
                        className="scale-150 text-slate-400 hover:text-lime-400 cursor-pointer">
                        <FaRegCheckCircle />
                      </span>
                    </span>

                  </div>
                </td>

              </tr>)
              }
            </tbody>
          </table>
        </div>



      </div>

      <form className="w-[90%]" >
        <div className="overflow-x-visible p-4 w-full ">
          <span className="relative">
            <table className="table-auto w-full xl:text-[1vw] sm:text-[2vw]">
              <caption className="sm:text-[3vw] xl:text-[1.5vw] sm:mb-4 xl:mb-8 mt-2 relative ">
                <strong>
                  <u className="text-3xl">
                    {"Thesis Title"} (8th semister)
                  </u>
                </strong>
                <button onClick={() => getGroupReport(/* groupID */)} className="px-7 py-3 bg-slate-600 text-white text-[1rem] rounded-md absolute top-[-2] right-5 shadow-[0_2px_6px_rgba(0,0,0,0.4)] border border-gray-300">
                  Report
                </button>
              </caption>

              <thead className="border-none">
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
                  <th className={CSS().thCSS}><h3 className={CSS().th_h3}>Supervisor's Comments</h3></th>
                  <th className={CSS().thCSS}><h3 className={CSS().th_h3}>Remarks</h3></th>
                </tr>
              </thead>

              <tbody className="border-none outline-0">
                {reportData.map(
                  (
                    {
                      _id = "",
                      week,
                      date,
                      studentID,
                      Present,
                      title,
                      supervisorComments,
                      remarks,
                    },
                    index_1
                  ) => (
                    <tr key={index_1} className="">
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
                        {supervisorComments.map(({ studentID, comment }, index) => (

                          <h3 key={index} className={CSS(index, Present.length).h3}>
                            <input type="text"
                              onChange={(e) => {
                                const inputvalue = e.target.value;
                                setCPYSdata((prev) =>
                                  prev.map((item, itemIndex) => {
                                    if (itemIndex === index_1) {
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
                              value={comment} />
                          </h3>

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
                      <td>
                        <span
                          onClick={() => deleteReport(/* _id */)}
                          className="scale-[250%] text-slate-500 hover:text-red-600 absolute ml-5">
                          <MdDeleteForever />
                        </span>
                      </td>
                    </tr>

                  )
                )}

              </tbody>
            </table>
          </span>
          <div
            onClick={() => {
              const newData = new showsClass(cpySdata[cpySdata.length - 1]?.week || 1, cpySdata[cpySdata.length - 1]?.studentID || ["0812110205101017", "0812110205101027", "0812110205101020"])
              newData.greet();
              setCreatedNewData((prev) => [...prev, newData].sort((a, b) => a.week - b.week))
              setCPYSdata((prev) => [...prev, newData])
            }}
            className={CSS().ButtonCss}><GrAdd /></div>
        </div>
      </form>
    </div>
  );
}

export default Overview;
