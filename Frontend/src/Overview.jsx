import React, { useState, useEffect, useRef, useContext, use } from "react";
import Sdata from "./seeds/sampleAttandence.json" with { type: "json" };
import { GrAdd } from "react-icons/gr";
import showsClass from "./library/shows.js"
import { NavLink } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { UserContext } from "./context/Context.jsx";
import { useNavigate } from "react-router-dom";
import NavDetails from "./NavDetails.jsx";
import axios from "./library/axiosInstance.js"
import DeleteReportButton from "./DeleteReportButton.jsx";

function Overview() {

  const groupID = useRef(localStorage.getItem("groupID") || "");

  useEffect(() => {
    if (!groupID.current) {
      navigate("/");
    }
  }, []);


  let { reportData, setReportData } = useContext(UserContext)
  let { details, setDetails, setCurrentGroupID } = useContext(UserContext)

  function NameArray(){
    let arr = [];
    details.forEach(({title},index) => {
      arr.push(title)
    })
    return arr;          
  }


  useEffect(() => {

    async function initiate() {
      try {

        setCurrentGroupID(groupID.current)

        let response = await axios.post("/group/api/v1/group-report",
          { groupID: groupID.current },
          { withCredentials: true }
        );

        if (response.data.success) {
          setReportData(response.data.responseData1)
          setDetails(response.data.responseData2)
        }

      } catch (error) {

        alert(error.message)
        navigate("/")
        console.log(error)
      }
    }
    initiate()

  }, [groupID.current])

  const navigate = useNavigate();

  const presentArray = useRef([]);
  const supervisorCommentsArray = useRef([]);
  const remarksArray = useRef([]);

  const [click, setClick] = useState(false)
  const [show, setShow] = useState(false)
  const [delClick, setDelClick] = useState({
    clickStatus: false,
    reportID: "",
    week: "",
    date: "",
  })

  const isDeleteThrottled = useRef(false);


  useEffect(() => {
    details.map(({ studentID, studentName, title }, index) => {
      presentArray.current.push({
        student: studentID,
        presentStatus: true,
      });

      supervisorCommentsArray.current.push({
        student: studentID,
        comment: "",
      });

      remarksArray.current.push({
        student: studentID,
        remarks: "",
      });
    });
  }, [details])


  async function updateDetailsData(title_ObjID, student_ObjID, fieldName, inputValue, main_group_ObjectID) {

    if (!fieldName || !inputValue) {
      return alert("field name or title name required")
    }

    try {
      let response = await axios.patch("/group/api/v1/update-details",
        {
          title_ObjID,
          student_ObjID,
          inputValue,
          fieldName,
          main_group_ObjectID,
          nameArray : NameArray()
        },
        {
          withCredentials: true
        }
      );

      if (response.data.success) {
        alert(response.data.message)
      }
    } catch (error) {
      alert(error.message)
      console.log("req details error => ", error)
    }
  }

  async function deleteReport(reportID = "") {
    if (!reportID || isDeleteThrottled.current) return;

    isDeleteThrottled.current = true; // Block further delete calls

    setDelClick({
      clickStatus: false,
      reportID: "",
      week: "",
      date: "",
    })

    try {
      const response = await axios.delete("/group/api/v1/delete-report", {
        data: { reportID },
        withCredentials: true,
      });

      if (response.data.success) {
        setReportData((prev) => prev.filter((obj) => String(obj._id) !== String(response.data.reportID)))

      }

    } catch (error) {
      console.log("deleteReport error:", error);
      alert(error.message)
    } finally {
      setTimeout(() => {
        isDeleteThrottled.current = false; // Re-enable deletes after delay
      }, 2000); // 2 seconds throttle
    }
  }


  async function createReport() {

    try {

      const response = await axios.post("/group/api/v1/create-report",
        {
          groupID: groupID.current,

        }, { withCredentials: true });

      if (!response.data.redirect) {
        setReportData(response.data.responseData);
      }
    } catch (error) {
      console.log("getGroupReport error:", error.message);
      alert("Something went wrong", error.message);
    }
  }

  function CSS(index = 0, Present_length = 0) {
    return {
      tdCSS: "h-10 align-middle p-2 border border-gray-300",

      thCSS: "border border-gray-300 p-1 rounded-lg ",

      th_h3: "bg-white border border-gray-300 py-3 rounded-md shadow-[0_2px_6px_rgba(0,0,0,0.4)]",

      inputBox: "border-none w-full h-full pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white shadow-[0_2px_6px_rgba(0,0,0,0.4)] rounded-md hover:bg-slate-200 bg-white",

      h3: `h-9 flex justify-between shadow-[0_2px_6px_rgba(0,0,0,0.4)] rounded-md hover:bg-slate-200 border border-gray-300 bg-white ${index + 1 != Present_length ? "mb-1" : ""}`,

      p: "flex items-center justify-center text-center",

      inputBox1: "border-none w-full h-full rounded-md pl-2 focus:bg-gray-500 focus:outline-0 focus:text-white",

      ButtonCss: "w-full h-10 flex items-center justify-center mt-2 mb-7 border border-gray-300 rounded-md hover:bg-slate-200 shadow-[0_2px_6px_rgba(0,0,0,0.5)] cursor-pointer",

      optionalDisplay: "border border-dotted border-gray-400 cursor-pointer"
    }
  }

  function changeIT(name, index_1, e) {
    setReportData((prev) => prev.map((item, index_2) => index_1 === index_2 ? { ...item, [name]: e.target.value.trim() } : item))
  }

  function useDebouncedUpdate(delay = 300) {
    const debounceTimerRef = useRef(null);

    const update = (reportID, student, fieldName, inputValue) => { ////////////////////////////////////// main culprit is this
      // Clear any previous timer
      clearTimeout(debounceTimerRef.current);

      // Set new timer
      debounceTimerRef.current = setTimeout(async () => {
        try {
          const req = await axios.patch(
            "/group/api/v1/update-report",
            { groupID, reportID, studentID: student, fieldName, inputValue },
            { withCredentials: true }
          );

          if (req.data.success) {
            setReportData((prev) => prev.map((reportObj, index) => {
              return req.data.responseData._id === reportData._id ? req.data.responseData : reportData
            })
            )
          }
        } catch (err) {
          console.error("Update failed:", err);
        }
      }, delay);
    };

    return update;
  }

  const update = useDebouncedUpdate(300);


  return (
    <div className="w-full min-h-screen flex  items-center bg-gray-50 flex-col">

      {
        delClick.clickStatus ? <DeleteReportButton reportID={delClick.reportID} week={delClick.week} date={delClick.date} deleteReport={deleteReport} setDelClick={setDelClick} /> : <></>
      }

      <NavDetails CSS={CSS} updateDetailsData={updateDetailsData} click={click} setClick={setClick} setShow={setShow} show={show} />

      <form className="w-[90%]" >
        <div className="overflow-x-visible p-4 w-full ">
          <span className="relative">
            <table className="table-auto w-full xl:text-[1vw] sm:text-[2vw]">
              <caption className="sm:text-[3vw] xl:text-[1.5vw] sm:mb-4 xl:mb-8 mt-2 relative ">
                <strong>
                  <u className="text-3xl">   {/*_____________________Headline______________________________________*/}
                    {"Thesis Title"} (8th semister)
                  </u>
                </strong>
                <NavLink to="/report" className="px-7 py-3 bg-slate-600 text-white text-[1rem] rounded-md absolute top-[-2] right-5 shadow-[0_2px_6px_rgba(0,0,0,0.4)] border border-gray-300">
                  Report
                </NavLink>
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

              <tbody className={`border-none outline-0 `}>
                {/*_____________________Report start Here____________________________________*/}
                {reportData.map(
                  (
                    {
                      _id = "",
                      group,
                      supervisor,
                      week,
                      date,
                      students,
                      studentSignature,
                      titles,
                      present,
                      supervisorComments,
                      remarks,
                    },
                    index_1
                  ) => (
                    <tr key={index_1} className={`${delClick.clickStatus ? _id === delClick.reportID ? "bg-red-600" : "" : ""}`}>
                      <td className={CSS().tdCSS}>
                        {/*_____________________week____________________________________*/}
                        <input onChange={(e) => {

                          changeIT("week", index_1, e);

                          let reportID = _id;

                          let STUDENT_ID = "";

                          update(reportID, STUDENT_ID, "week", e.target.value)


                        }} className={CSS().inputBox} type="text" value={week} />
                      </td>
                      <td className={CSS().tdCSS}>  {/*_____________________date____________________________________*/}
                        <input onChange={(e) => {

                          let reportID = _id;

                          let STUDENT_ID = "";

                          update(reportID, STUDENT_ID, "date", e.target.value);

                          changeIT("date", index_1, e)

                        }} className={CSS().inputBox} type="text" value={date} />
                      </td>
                      <td className={CSS().tdCSS}>  {/*_____________________present____________________________________*/}
                        {present.map(({ student, presentStatus }, index) => (
                          <h3 key={index} className={`${CSS(index, present.length).h3} p-2 `}>
                            <p className={CSS().p}>
                              {student.studentID}
                            </p>
                            <input
                              className="w-5 cursor-pointer"
                              type="checkbox"
                              checked={presentStatus}
                              onChange={(e) => {

                                let reportID = _id;
     
                                update(reportID, student, "present", e.target.checked);

                                const checked = e.target.checked;

                                setReportData((prev) =>
                                  prev.map((item, weekIndex) => {
                                    if (weekIndex === index_1) {
                                      return {
                                        ...item,
                                        present: item.present.map((pItem, studentIndex) =>
                                          studentIndex === index ? { ...pItem, presentStatus: checked } : pItem
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
                      <td className={CSS().tdCSS}>  {/*_____________________supervisorComments____________________________________*/}

                        {supervisorComments.map(({ student, comment }, index) => (

                          <h3 key={index} className={CSS(index, supervisorComments.length).h3}>
                            <input type="text"
                              onChange={(e) => {
                                let reportID = _id;
                            
                                update(reportID, student, "supervisorComments", e.target.value);
                                const inputvalue = e.target.value;
                                setReportData((prev) =>
                                  prev.map((item, itemIndex) => {
                                    if (itemIndex === index_1) {
                                      return {
                                        ...item,
                                        supervisorComments: item.supervisorComments.map((pItem, studentIndex) =>
                                          studentIndex === index ? { ...pItem, comment: { ...comment, comment: inputvalue } } : pItem
                                        ),
                                      };
                                    }
                                    return item;
                                  })
                                );
                              }}
                              className={CSS().inputBox1}
                              value={comment.comment} />
                          </h3>

                        ))}
                      </td>
                      <td className={CSS().tdCSS}>  {/*_____________________remarks____________________________________*/}
                        {remarks.map(({ student, remarks }, index) => (

                          <h3 key={index} className={CSS(index, remarks.length).h3}>
                            <input type="text"
                              onChange={(e) => {
                                let reportID = _id;
                   
                                update(reportID, student, "remarks", e.target.value);
                                const inputvalue = e.target.value;
                                setReportData((prev) =>
                                  prev.map((item, weekIndex) => {
                                    if (weekIndex === index_1) {
                                      return {
                                        ...item,
                                        remarks: item.remarks.map((pItem, studentIndex) =>
                                          studentIndex === index ? { ...pItem, remarks: { ...remarks, remarks: inputvalue } } : pItem
                                        ),
                                      };
                                    }
                                    return item;
                                  })
                                );
                              }}
                              className={CSS().inputBox1} value={remarks.remarks} /></h3>

                        ))}
                      </td>
                      <td>  {/*_____________________||__deleteReport__||__________________________________*/}
                        <span
                          onClick={() => setDelClick((prev) => ({ ...prev, week, date, reportID: _id, clickStatus: !prev.clickStatus }))}
                          className="scale-[250%] text-slate-500 hover:text-red-600 absolute ml-5 cursor-pointer">
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
            onClick={createReport}
            className={CSS().ButtonCss}><GrAdd /></div> {/*_____________________||__Add Report__||__________________________________ */}
        </div>
      </form>
    </div>
  );
}

export default Overview;