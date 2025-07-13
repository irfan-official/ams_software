import React, { useState, useEffect, useContext, useRef } from "react";
import { GrAdd } from "react-icons/gr";
import { FiMinusCircle } from "react-icons/fi";
import axios from "./library/axiosInstance.js";
import { UserContext } from "./context/Context.jsx";
import { useNavigate } from "react-router-dom";
import Student from "../../Backend/models/student.models.js";
import CreateGroupMember from "./library/groupMembers.js";
import checkValidGroupMembers from "./library/checkValidGroupMembers.js";

function CreateGroup() {
  let { userID } = useContext(UserContext);

  const navigate = useNavigate();

  const submitHandlerRef = useRef(null);
  const [groupName, setGroupName] = useState("");
  const [groupTypes, setGroupTypes] = useState("");
  const [groupMembers, setGroupMembers] = useState([
    {
      student: {
        name: "",
        studentID: "",
        semister: "",
        department: "",
      },
      designation: "",
    },
  ]);
  const [clickIndex, setClickIndex] = useState(0);
  const [semister, setSemister] = useState("");

  const lastCalledRef = useRef(0);
  const throttleDelay = 1000; // 1 second throttle

  async function handleSubmit(e) {
    e.preventDefault();

    if (!groupName || !groupTypes || !semister) {
      alert("All fields are required");
      return;
    }

    let validGroupMembers = checkValidGroupMembers(groupMembers);

    if (!validGroupMembers.success) {
      alert(validGroupMembers.message);
      return;
    }

    const now = Date.now();
    if (now - lastCalledRef.current < throttleDelay) {
      alert("please wait");
      return;
    }
    lastCalledRef.current = now;

    try {
      const response = await axios.post(
        "/group/api/v1/create-group",
        {
          groupName,
          groupTypes,
          groupMembers,
          semister,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        navigate("/");
      } else {
        alert("Something is not good");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }
  function useDebouncedUpdate(delay = 300) {
    const debounceTimerRef = useRef(null);

    const update = (studentID, index) => {
      // Clear any previous timer
      clearTimeout(debounceTimerRef.current);

      // Set new timer
      debounceTimerRef.current = setTimeout(async () => {
        try {
          const req = await axios.post(
            "/group/api/v1/check-user",
            { studentID },
            { withCredentials: true }
          );

          if (req.data.success) {
            setGroupMembers((prev) =>
              prev.map((groupMembersObj, mapIndex) => {
                return index === mapIndex
                  ? {
                      ...groupMembersObj,
                      student: {
                        studentID: req.data.responseData.studentID,
                        name: req.data.responseData.name,
                        semister: req.data.responseData.semister,
                        department: req.data.responseData.department,
                      },
                    }
                  : groupMembersObj;
              })
            );
            return;
          } else {
            setGroupMembers((prev) =>
              prev.map((groupMembersObj, mapIndex) => {
                return index === mapIndex
                  ? {
                      ...groupMembersObj,
                      student: {
                        ...groupMembersObj.student,
                        name: "",
                        semister: "",
                        department: "",
                      },
                    }
                  : groupMembersObj;
              })
            );
          }
        } catch (err) {
          setGroupMembers((prev) =>
            prev.map((groupMembersObj, mapIndex) => {
              return index === mapIndex
                ? {
                    ...groupMembersObj,
                    student: {
                      ...groupMembersObj.student,
                      name: "",
                      semister: "",
                      department: "",
                    },
                  }
                : groupMembersObj;
            })
          );
        }
      }, delay);
    };

    return update;
  }

  const update = useDebouncedUpdate(300);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-h-screen flex gap-20 items-center justify-center bg-gray-100 py-12"
    >
      <div className="__top__ relative w-full  max-w-md  px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5  sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              Create Group
            </h1>
            <p className="mt-2 text-gray-500">
              Create group to make a new journey
            </p>
          </div>
          <div className="mt-5">
            <div>
              <div className="__groupName__ relative mt-6">
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

              <div className="__studentID__ relative mt-6">
                {groupMembers.map(({ designation, student }, index) => (
                  <div key={index} className="relative">
                    <input
                      onChange={(e) => {
                        setGroupMembers((prev) => {
                          let arr = prev.map(
                            ({ student, designation }, mapIndex) => {
                              return index === mapIndex
                                ? {
                                    designation,
                                    student: {
                                      ...student,
                                      studentID: e.target.value,
                                    },
                                  }
                                : { designation, student };
                            }
                          );
                          return arr;
                        });
                        update(e.target.value, index);
                      }}
                      value={student.studentID}
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
                      className="__delete_button__ rounded-full hover:bg-red-500 shadow-[0_2px_6px_rgba(0,0,0,0.1)] scale-125 absolute top-[35%] right-0 bg-transparent hover:text-white cursor-pointer"
                    >
                      <FiMinusCircle />
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="__add_studentID_button__ w-full mt-2 rounded-lg flex items-center justify-center p-1 border border-gray-300 hover:bg-slate-200 shadow-[0_2px_6px_rgba(0,0,0,0.2)] cursor-pointer"
                onClick={() =>
                  setGroupMembers((prev) => [
                    ...prev,
                    {
                      student: {
                        name: "",
                        studentID: "",
                        semister: semister,
                        subject: "",
                      },
                      designation: "",
                    },
                  ])
                }
              >
                <GrAdd />
              </div>

              <div className="__groupTypes&semister__ relative mt-6 flex justify-between">
                <div className="__groupTypes__ w-[50%]">
                  <select
                    name="groupTypes"
                    required
                    value={groupTypes}
                    onChange={(e) => setGroupTypes(e.target.value)}
                    className="peer mt-1 w-full border-b-2 border-gray-300 bg-transparent px-0 py-1 text-gray-900 focus:border-gray-500 focus:outline-none"
                  >
                    <option value="" disabled className="text-gray-400">
                      Group Types
                    </option>
                    <option value="IDP">IDP</option>
                    <option value="Thesis">Thesis</option>
                  </select>
                </div>
                <div className="__semister__ w-[25%]">
                  <select
                    name="semister"
                    required
                    value={semister}
                    onChange={(e) => setSemister(e.target.value)}
                    className="peer mt-1 w-full border-b-2 border-gray-300 bg-transparent px-0 py-1 text-gray-900 focus:border-gray-500 focus:outline-none"
                  >
                    <option value="" disabled className="text-gray-400">
                      Semister
                    </option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="__submit_update_button__ my-6">
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
            </div>
          </div>
        </div>
      </div>
      <div required className="__bottom__ relative w-full  max-w-md  ">
        <div className="__folder_icon__ w-full h-10  select-none cursor-pointer  border-b-gray-300 flex items-center justify-start">
          {groupMembers.map((_, index) => (
            <div
              key={index}
              onClick={() => {
                setClickIndex(index);
              }}
              className="w-14 h-full relative flex justify-center items-center "
            >
              <img
                className="h-10 "
                src={`${
                  clickIndex === index
                    ? "/assets/file_6.png"
                    : "/assets/darkFile3.png"
                }`}
                alt=""
              />
              {clickIndex === index ? (
                <div
                  className={`absolute bg-gray-100  w-[95%] h-2 bottom-[-2px] z-10 `}
                ></div>
              ) : (
                <></>
              )}
              <div className="absolute bg-transparent w-full h-full flex text-center items-center justify-center px-2 py-1 top-[2px] z-10">
                <strong>S - {index + 1}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className=" relative w-full  max-w-md  shadow-xl border-x-1 border-y-1  border-gray-300  rounded-bl-xl rounded-br-xl rounded-tr-xl">
          <div className="w-full pt-10 pb-8 px-10">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900">
                Student Information
              </h1>
              <br />
            </div>
            <div className="mt-5">
              <div>
                <div className="__name__ relative mt-6">
                  <input
                    onChange={(e) =>
                      setGroupMembers((prev) => {
                        let arr = prev.map(
                          ({ student, designation }, index) => {
                            return index === clickIndex
                              ? {
                                  designation,
                                  student: { ...student, name: e.target.value },
                                }
                              : { designation, student };
                          }
                        );
                        return arr;
                      })
                    }
                    value={groupMembers[clickIndex]?.student.name || ""}
                    type="text"
                    name="studentName"
                    required
                    placeholder="Group Name"
                    className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  />
                  <label
                    htmlFor="Student Name"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Student Name
                  </label>
                </div>
                <div className="__studentID__ relative mt-6">
                  <input
                    onChange={(e) =>
                      setGroupMembers((prev) => {
                        let arr = prev.map(
                          ({ student, designation }, index) => {
                            return index === clickIndex
                              ? {
                                  designation,
                                  student: {
                                    ...student,
                                    studentID: e.target.value,
                                  },
                                }
                              : { designation, student };
                          }
                        );
                        return arr;
                      })
                    }
                    value={groupMembers[clickIndex]?.student.studentID || ""}
                    type="text"
                    name="studentID"
                    required
                    placeholder="studentID"
                    className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  />
                  <label
                    htmlFor="studentID"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    studentID
                  </label>
                </div>

                <div className="__department__ relative mt-6">
                  <select
                    id="department"
                    name="department"
                    required
                    value={groupMembers[clickIndex]?.student.department || ""}
                    onChange={(e) =>
                      setGroupMembers((prev) => {
                        let arr = prev.map(
                          ({ student, designation }, index) => {
                            return index === clickIndex
                              ? {
                                  designation,
                                  student: {
                                    ...student,
                                    department: e.target.value,
                                  },
                                }
                              : { designation, student };
                          }
                        );
                        return arr;
                      })
                    }
                    className="peer mt-1 w-full border-b-2 border-gray-300 bg-transparent px-0 py-1 text-gray-900 focus:border-gray-500 focus:outline-none"
                  >
                    <option value="" disabled className="text-gray-400">
                      Department
                    </option>
                    <option value="CSE">
                      Computer Science and Engineering
                    </option>
                    <option value="EEE">Electrical Engineering</option>
                    <option value="ICE">
                      Information and Communication Engineering
                    </option>
                    <option value="ME">Mechanical Engineering</option>
                    <option value="BBA">Business Administration</option>
                    <option value="ENG">English</option>
                    <option value="LAW">Law</option>
                  </select>
                </div>

                <div className="__designation_&_semister__ relative mt-6 flex justify-between">
                  <div className="__designation__ w-[50%]">
                    <select
                      name="Designation"
                      required
                      value={groupMembers[clickIndex]?.designation || ""}
                      onChange={(e) =>
                        setGroupMembers((prev) => {
                          let arr = prev.map(
                            ({ student, designation }, index) => {
                              return index === clickIndex
                                ? {
                                    designation: e.target.value,
                                    student,
                                  }
                                : { designation, student };
                            }
                          );
                          return arr;
                        })
                      }
                      className="peer mt-1 w-full border-b-2 border-gray-300 bg-transparent px-0 py-1 text-gray-900 focus:border-gray-500 focus:outline-none"
                    >
                      <option value="" disabled className="text-gray-400">
                        Designation
                      </option>
                      <option value="Design Secretary">Design Secretary</option>
                      <option value="Project Leader">Preoject Leader</option>
                      <option value="Developer">Developer</option>
                    </select>
                  </div>
                  <div className="__semister__ w-[25%]">
                    <select
                      name="semister"
                      required
                      value={groupMembers[clickIndex]?.student.semister || ""}
                      onChange={(e) =>
                        setGroupMembers((prev) => {
                          let arr = prev.map(
                            ({ student, designation }, index) => {
                              return index === clickIndex
                                ? {
                                    designation,
                                    student: {
                                      ...student,
                                      semister: e.target.value,
                                    },
                                  }
                                : { designation, student };
                            }
                          );
                          return arr;
                        })
                      }
                      className="peer mt-1 w-full border-b-2 border-gray-300 bg-transparent px-0 py-1 text-gray-900 focus:border-gray-500 focus:outline-none"
                    >
                      <option value="" disabled className="text-gray-400">
                        Semister
                      </option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateGroup;
