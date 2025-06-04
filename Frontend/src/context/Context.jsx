import React, {useState} from 'react'
import { createContext } from 'react'
import ReportData from "../seeds/sampleAttandence.json"
import DetailsData from "../seeds/sampleRepresent.json"

export const UserContext = createContext();

function Context(props) {

 const [reportData, setReportData] = useState([])
  const [details, setDetails] = useState([])
  const [allGroup, setAllGroup] = useState([])
  const [userID, setUserID] = useState("")
  const [currentGroupTypes, setCrrentGroupTypes] = useState("")
    let [currentGroupID, setCurrentGroupID] = useState("")
  const [updateGroup, setUpdateGroup] = useState({
    groupID: "",
    groupName: "",
    groupMembers: [],
    groupTypes: [],
    semister: ""
  })
  const [errorMessage, setErrorMessage] = useState("")


  return <UserContext.Provider 
  value={{reportData, setReportData, details, setDetails, allGroup, setAllGroup, updateGroup, setUpdateGroup, errorMessage, setErrorMessage, userID, setUserID, currentGroupTypes, setCrrentGroupTypes, currentGroupID, setCurrentGroupID}}>
    {props.children}
    </UserContext.Provider>
}

export default Context


