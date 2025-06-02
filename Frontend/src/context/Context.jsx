import React, {useState} from 'react'
import { createContext } from 'react'
import ReportData from "../seeds/sampleAttandence.json"
import DetailsData from "../seeds/sampleRepresent.json"

export const UserContext = createContext();

function Context(props) {

 const [reportData, setReportData] = useState(ReportData)
  const [details, setDetails] = useState(DetailsData)


  return <UserContext.Provider 
  value={{reportData, setReportData, details, setDetails}}>
    {props.children}
    </UserContext.Provider>
}

export default Context


