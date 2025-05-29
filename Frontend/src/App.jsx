import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import data from "./seeds/allGroup.json"
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

function App() {
  const [allGroup, setAllGroup] = useState(data || []);

  const [del, setDelete] = useState({
    groupName: "",
    groupTypes: "",
    clickStatus: false,
    index: null
  })

  function clearDel(){
    setDelete((prev) => ({...prev, groupName: "", groupTypes: "", clickStatus: false, index: null}))
    return;
  }

  return (
    <div className='w-full min-h-screen mx-auto bg-gray-300  pt-1 overflow-x-hidden absolute z-20'>

      {
        del.clickStatus ? <div className='w-full h-screen bg-[rgba(192,192,192,0.734)] flex items-center justify-center fixed  z-50 bottom-0'>
          <div className="rounded-md bg-slate-600 flex flex-col items-center justify-between py-5 px-5 shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
            <h3 className='text-white font-semibold text-xl text-start'>Delete this {del.groupTypes} group</h3>
            <h4 className='py-5 text-white'><strong className='text-yellow-500'>Title:</strong> {del.groupName}</h4>
            <div className='flex w-full justify-center gap-10 px-2'>
              <button onClick={clearDel} className='px-5 py-3 w-28 rounded-md text-center bg-gray-500 text-white [0_2px_6px_rgba(0,0,0,0.9)]'>Back</button>
              <button
              onClick={() => {
                console.log("del => ", del)
                setAllGroup((prev) => prev.filter((item, index) => index != del.index));
                clearDel()
              }}
               className='px-5 py-3 w-28 rounded-md text-center bg-red-500 text-white [0_2px_6px_rgba(0,0,0,0.9)]'>Delete</button>
            </div>
          </div>
        </div> : <></>
      }
      {
         allGroup.length < 1 ? <div className='w-full min-h-[98vh] bg-gray-200 flex items-center justify-center flex-col  gap-6 '>
          <h1 className='text-3xl'>You dont have any group now</h1>
          <h2 className='text-xl'>Create group to see group</h2>
          <NavLink to="/create/group" className='px-4 py-3 bg-gray-600 cursor-pointer text-white rounded-md shadow-[0_2px_6px_rgba(0,0,0,0.4)]'>Create Group</NavLink>
        </div> :
          <>
            <h1 className='text-center mt-24 text-6xl font-semibold select-none'>ALL Groups</h1>
            <div className=" w-full my-10 mt-20 flex items-center justify-center flex-col gap-4 ">
              {
                allGroup.map((elem, index) => {
                  return <NavLink className={`w-[60%] px-4 py-3 ${del.index === index ? "bg-red-800 text-white" : ""} bg-gray-400 flex justify-between items-center rounded-md border border-gray-200 shadow-[0_2px_6px_rgba(0,0,0,0.3)] `}>
                    <h6 className='w-[70%]'>{elem.groupName}</h6>
                    <div className="w-[13%] h-full flex items-center justify-between px-3">
                      <NavLink to="/update/group" className="scale-150 hover:text-blue-700"><FaRegEdit /></NavLink>
                      <button onClick={() => {
                        setDelete((prev) => ({...prev, groupName: elem.groupName, groupTypes: elem.groupTypes,  clickStatus: !prev.clickStatus, index: index}))
                      }} className="scale-[155%] hover:text-red-600"><RiDeleteBinLine /></button>
                    </div>

                  </NavLink>
                })
              }
            </div>
          </>
      }
    </div>
  )
}

export default App