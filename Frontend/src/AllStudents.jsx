import React, {useState, useEffect, useMemo, useRef} from 'react'
import StudentProfileCard from './StudentProfileCard.jsx'
import axios from './library/axiosInstance.js'
import { RiSkipLeftLine } from 'react-icons/ri'


function AllSupervisors() {

  let [AllStudentsData, SetAllStudentsData] = useState([])
  let [SearchStudentData, SetSearchStudentData] = useState("")

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

   function useDebouncedUpdate(delay = 300) {

    
      const debounceTimerRef = useRef(null);
  
      const CheckData = (inputValue) => { 
        
        
        
        // Clear any previous timer
        clearTimeout(debounceTimerRef.current);
  
        // Set new timer
        debounceTimerRef.current = setTimeout(async () => {
          try {
            const response = await axios.get(
              "/group/api/v1/check-student-searchdata",
              { params: {inputValue}, withCredentials: true }
            );
  
            if (response.data.success) {
              SetAllStudentsData(response.data.responseData)
            }
          } catch (err) {
            console.error("Update failed:", err);
          }
        }, delay);
      };
  
      return CheckData;
    }
  
  const search = useDebouncedUpdate(400);

  return (
    <div className="w-full min-h-screen bg-gray-300 p-1">
      <div className="flex gap-10 items-center justify-between mt-4">
       <div className="w-[30%] flex items-center justify-center">
         <h1 className='text-4xl text-slate-600 font-semibold '>All Students</h1>
       </div>
       <div className="w-[50%]  flex items-center justify-center mr-10 gap-4">
        <h2 className="font-bold text-2xl text-slate-700">Search:</h2>
         <input
         onChange={(e) => {
          SetSearchStudentData(e.target.value)
          search(e.target.value);
         }}
         value={SearchStudentData}
          className='bg-white border border-slate-400 w-full rounded-lg py-2  px-3 outline-0' type="text" placeholder='Advance search with ID or semister or department or name '/>
       </div>
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