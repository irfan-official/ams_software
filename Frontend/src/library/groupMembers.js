class CreateGroupMember {
  constructor(name, studentID, semister, department, designation) {
    this.student = {
      name,
      studentID,
      semister,
      department,
    };
    this.designation = designation;
  }
}

export default CreateGroupMember;
