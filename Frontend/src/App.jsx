import React, { useState, useEffect, useContext, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import data from "./seeds/allGroup.json"
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrAdd } from "react-icons/gr";
import Sdata from "./seeds/sampleAttandence.json"
import axios from "./library/axiosInstance.js"
import { UserContext } from "./context/Context.jsx";
import { useNavigate } from 'react-router-dom';
import DeleteGroupButton from './DeleteGroupButton.jsx';
import InitialGroupShow from './InitialGroupShow.jsx';

function App() {

  let { allGroup, setAllGroup, groupID, userID, setGroupID, setReportData, setDetails, setUpdateGroup, setUserID, setCrrentGroupTypes, setCurrentGroupID } = useContext(UserContext)

  const navigate = useNavigate();

  const [del, setDelete] = useState({
    groupName: "",
    groupTypes: "",
    clickStatus: false,
    index: null
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("/group/api/v1/allgroup", { withCredentials: true });
        if (!response.data.success) {
          navigate("/login/teacher")
        }

        setUserID(response.data.userID)
        setAllGroup(response.data.responseData);

      } catch (error) {
        alert(error.message);
        navigate("/login/teacher")
        console.log(error);
      }
    };
    fetchData();
  }, [allGroup]);
 

  function clearDel() {
    setDelete((prev) => ({ ...prev, groupName: "", groupTypes: "", clickStatus: false, index: null }))
  }

  async function deleteGroup(groupID) {
    try {
      console.log("del => ", groupID)
      clearDel();
      let response = await axios.delete("/group/api/v1/delete-group", {
        data: {
          groupID: groupID
        },
        withCredentials: true,
      })

      if (!response.data.status) {

        alert(response.data.message)

      } else {
        navigate("/")
      }
      setDelete((prev) => ({ ...prev, groupName: "", groupTypes: "", clickStatus: false, index: null }))
    } catch (error) {
      alert(error.message);
    }
  }


  return (
    <div className='w-full min-h-screen mx-auto bg-gray-300  pt-1 overflow-x-hidden absolute z-20'>

      {
        del.clickStatus ? <DeleteGroupButton del={del} deleteGroup={deleteGroup} clearDel={clearDel} setDelete={setDelete} /> : <></>
      }
      {
        allGroup.length < 1 ? <InitialGroupShow /> :
          <>
            <h1 className='text-center mt-24 text-6xl font-semibold select-none'>ALL Groups</h1>
            <div className=" w-full my-10 mt-20 flex items-center justify-center flex-col gap-4 ">
              {
                allGroup.map((elem, index) => {
                  return <div className={`w-[60%] px-4 py-3 ${del.index === index ? "bg-red-800 text-white" : ""} bg-gray-400 hover:bg-gray-500 hover:text-white flex gap-2 items-center rounded-md border border-gray-200 shadow-[0_2px_6px_rgba(0,0,0,0.6)] `}>

                    <NavLink
                      to="/overview"
                     onClick={() => {
                       localStorage.setItem("groupID", elem._id)
                       setCrrentGroupTypes(elem.groupTypes);  }} 
                       
                       className='w-[90%] text-start'>{elem?.group?.title || "Deleted"}</NavLink>

                    <div className="w-[10%] h-full flex items-center justify-between px-2 ">
                      <NavLink
                        onClick={() => {

                          /*
                            groupName: "This is my Group",
                            groupMembers: ["0812110205101017", "0812110205101027", "0812110205101020"],
                            groupTypes: "Thesis",
                            semister: "7"
                           */
                          localStorage.setItem("groupID", elem?._id)
                          setUpdateGroup({
                            groupID: elem?._id,
                            groupName: elem?.group.title,
                            groupMembers: elem?.groupMembers,
                            groupTypes: elem?.groupTypes,
                            semister: elem?.semister
                          })

                        }}
                        to="/update/group" className="scale-150 hover:text-lime-400 ">
                        <FaRegEdit />
                      </NavLink>
                      <button onClick={() => {
                         localStorage.setItem("groupID", elem?._id)
                        setDelete((prev) => ({ ...prev, groupID: elem._id, groupName: elem.group.title, groupTypes: elem.groupTypes, clickStatus: !prev.clickStatus, index: index }))
                      }} className="scale-[155%] hover:text-red-600  relative z-40 cursor-pointer">
                        <RiDeleteBinLine />
                      </button>
                    </div>

                  </div>
                })
              }
              <NavLink
                to="/create/group"
                className='w-[60%] mb-16 h-10 flex items-center justify-center border border-gray-100 rounded-md hover:bg-slate-300 shadow-[0_2px_6px_rgba(0,0,0,0.6)] bg-slate-200'>
                <span className='scale-110'>
                  <GrAdd />
                </span>
              </NavLink>
            </div>
          </>
      }
    </div>
  )
}

export default App