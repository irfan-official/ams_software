import React, {useState, useEffect, useMemo} from 'react'
import StudentProfileCard from './StudentProfileCard.jsx'
import axios from './library/axiosInstance.js'


function AllSupervisors() {

  let [AllStudentsData, SetAllStudentsData] = useState([])

  useEffect( () => {
    const fetchData = async () => {
      try{
        let response = await axios.get("/group/api/v1/allStudents", {
          withCredentials: true,
        });

        console.log("response ===> ", response.data.responseData)

        SetAllStudentsData(response.data.responseData)

       }catch(error){
          // alert(error.message)
      }
    }
  fetchData();
  }, [])
  return (
    <div className="w-full min-h-screen bg-gray-300 p-1">
      <div className=" text-4xl text-slate-600 font-semibold text-center mt-2">
        All Students
      </div>
      <div className="px-4 w-full mt-3">
        <hr className=' bg-lime-200 border-1' />
      </div>
      <div className=' w-full min-h-full flex justify-center items-start p-4 flex-wrap gap-10'>

        {AllStudentsData.map((data, index) => 
          <StudentProfileCard name={data.name} image={data.image} id={data.studentID} semister={data.semister} department={data.department} />
        )}
        
      </div>
    </div>

  )
}

export default AllSupervisors