import React, { useContext } from 'react'
import { UserContext } from "./context/Context.jsx";
import { FaRegCheckCircle } from "react-icons/fa";

function DetailsShow({ CSS, updateDetailsData, show }) {

  let { details, setDetails, crrentGroupTypes } = useContext(UserContext)

  return (
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
            <th className={`${CSS().optionalDisplay} p-2`}> {crrentGroupTypes || ""} Title</th>
          </tr>
        </thead>

        <tbody>
          {details.map(({ _id, studentID, studentName, title }, index) => <tr key={index}>
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
                    onClick={() => updateDetailsData(_id, studentID, studentName, title)}
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
  )
}

export default DetailsShow