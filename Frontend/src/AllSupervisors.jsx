import React, { useState, useEffect } from 'react'
import SupervisorProfileCard from './SupervisorProfileCard.jsx'
import axios from './library/axiosInstance.js'

function AllSupervisors() {

  let [AllSupervisorsData, SetAllSupervisorsData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("/group/api/v1/allSupervisors", {
          withCredentials: true,
        });

        console.log("response ===> ", response.data.responseData)

        SetAllSupervisorsData(response.data.responseData)

      } catch (error) {
        // alert(error.message)
      }
    }
    fetchData();
  }, [])

  return (
    <div className="w-full min-h-screen bg-gray-300 p-1">
      <div className=" text-4xl text-slate-600 font-semibold text-center mt-2">
        All Supervisors
      </div>
      <div className="px-4 w-full mt-3">
        <hr className=' bg-lime-200 border-1' />
      </div>
      <div className=' w-full min-h-full flex justify-center items-start p-4 flex-wrap gap-10'>
        {AllSupervisorsData.map((data, index) =>
          <SupervisorProfileCard name={data.name} image={data.image} department={data.department} email={data.email} gender={data.gender}/>
        )}
      </div>
    </div>

  )
}

export default AllSupervisors