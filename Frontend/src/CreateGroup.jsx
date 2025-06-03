import React, { useState, useEffect, useContext } from 'react'
import { GrAdd } from "react-icons/gr";
import { FiMinusCircle } from "react-icons/fi";
import { useRef } from 'react';
import axios from "./library/axiosInstance.js"
import { UserContext } from "./context/Context.jsx";
import { useNavigate } from 'react-router-dom';


function CreateGroup() {

  let {userID, } = useContext(UserContext)

  const navigate = useNavigate();

useEffect(() => {
  if (!userID) {
    navigate("/login/teacher");
  }
}, [userID]); 

  const submitHandlerRef = useRef(null);
  const [groupName, setGroupName] = useState("");
  const [groupTypes, setGroupTypes] = useState("");
  const [groupMembers, setGroupMembers] = useState([""]);
  const [semister, setSemister] = useState("");

async function handleSubmit(e) {
  e.preventDefault();

  if (!groupName || !groupTypes || !semister) {
    alert("All fields are required");
    return;
  }

  // Always clear previous timeout
  if (submitHandlerRef.current) {
    clearTimeout(submitHandlerRef.current);
  }

  const ids = groupMembers.map((elem) => elem[0]);
  const obj = { groupName, groupTypes, ids, semister };

  // Set debounce timer
  submitHandlerRef.current = setTimeout(async () => {
    console.log("obj =>", obj);

    // Optionally send the data
    // axios.post('/api/group', obj);

    alert("create group req send")

    let response = await axios.post("/group/api/v1/create-group", {
      groupName, groupTypes, groupMembers, semister
    }, 
      { withCredentials: true }
    )

   if(response.data.success){
     navigate("/");
     return;
   }
   alert("something is not good")

  }, 3000);
}


  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Create Group</h1>
            <p className="mt-2 text-gray-500">Create group to make a new journey</p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="relative mt-6">
                <input
                  onChange={(e) => setGroupName(e.target.value)}
                  value={groupName}
                  type="text"
                  name="groupName"
                  required
                  placeholder="Group Name"
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label
                  htmlFor="groupName"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Group Name
                </label>
              </div>

              <div className="relative mt-6">
                {groupMembers.map((member, index) => (
                  <div key={index} className='relative'>
                    <input
                      onChange={(e) => {
                        const newMembers = [...groupMembers];
                        newMembers[index] = e.target.value;
                        setGroupMembers(newMembers);
                      }}
                      value={member}
                      type="text"
                      name={`groupMember${index + 1}`}
                      required
                      placeholder={`Group Member ${index + 1} ID`}
                      className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 focus:border-gray-500 focus:outline-none"
                      autoComplete="off"
                    />
                    <span
                      onClick={() => {
                        if (groupMembers.length > 1) {
                          setGroupMembers((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }
                      }}
                      className='rounded-full hover:bg-red-500 shadow-[0_2px_6px_rgba(0,0,0,0.1)] scale-125 absolute top-[35%] right-0 bg-transparent hover:text-white cursor-pointer'
                    >
                      <FiMinusCircle />
                    </span>
                  </div>
                ))}
              </div>

              <div
                onClick={() => setGroupMembers((prev) => [...prev, ""])}
                className='w-full mt-2 rounded-lg flex items-center justify-center p-1 border border-gray-300 hover:bg-slate-200 shadow-[0_2px_6px_rgba(0,0,0,0.2)] cursor-pointer'
              >
                <GrAdd />
              </div>

              <div className="relative mt-6 flex justify-between">
                <div className='w-[50%]'>
                  <select
                    name="groupTypes"
                    required
                    value={groupTypes}
                    onChange={(e) => setGroupTypes(e.target.value)}
                    className="peer mt-1 w-full border-b-2 border-gray-300 bg-transparent px-0 py-1 text-gray-900 focus:border-gray-500 focus:outline-none"
                  >
                    <option value="" disabled className="text-gray-400">Group Types</option>
                    <option value="IDP">IDP</option>
                    <option value="Thesis">Thesis</option>
                  </select>
                </div>
                <div className='w-[25%]'>
                  <select
                    name="semister"
                    required
                    value={semister}
                    onChange={(e) => setSemister(e.target.value)}
                    className="peer mt-1 w-full border-b-2 border-gray-300 bg-transparent px-0 py-1 text-gray-900 focus:border-gray-500 focus:outline-none"
                  >
                    <option value="" disabled className="text-gray-400">Semister</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="my-6">
                <button
                  type="submit"
                  className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                >
                  Create
                </button>
              </div>
              <p className="text-center text-sm text-gray-500">
                Already have an account yet?
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateGroup;
