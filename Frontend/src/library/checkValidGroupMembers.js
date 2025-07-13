function checkValidGroupMembers(groupMembers = []) {
  if (!groupMembers) {
    return {
      success: false,
      message: "Enter a valid groupMembers",
    };
  }
  let validSemister = ["1", "2", "3", "4", "5", "6", "7", "8"];
  let validDepartment = ["CSE", "EEE", "ICE", "ME", "BBA", "ENG", "LAW"];
  let validDesignation = ["Design Secretary", "Project Leader", "Developer"];

  let index = 0;

  for (let { student, designation } of groupMembers) {
    if (!designation) {
      return {
        success: false,
        message: `Enter a valid designation for S-${index + 1}`,
      };
    }

    if (!student) {
      return {
        success: false,
        message: `Enter a valid student information for S-${index + 1}`,
      };
    }

    if (!validDesignation.includes(designation)) {
      return {
        success: false,
        message: `Enter a valid designation for S-${
          index + 1
        } only Design Secretary, Project Leader and Developer designation allowed`,
      };
    }
    let { name = "", semister = "", department = "", studentID = "" } = student;

    if (!name || !semister || !department || !studentID) {
      return {
        success: false,
        message: `Enter a valid student name or semister or department or studentID infomation for S-${
          index + 1
        }`,
      };
    }

    if (!validSemister.includes(semister)) {
      return {
        success: false,
        message: `Enter a valid semister for S-${
          index + 1
        } only 1, 2, 3, 4, 5, 6, 7 and 8 semister allowed`,
      };
    }
    if (!validDepartment.includes(department)) {
      return {
        success: false,
        message: `Enter a valid department for S-${
          index + 1
        } only CSE, EEE, ICE, ME, BBA, ENG and LAW department allowed`,
      };
    }

    index++;
  }

  return {
    success: true,
  };
}

export default checkValidGroupMembers;
