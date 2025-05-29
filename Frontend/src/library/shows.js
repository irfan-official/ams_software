export default class Person {
  constructor(prevWeek = 1, ID = []) {
    this.week = prevWeek;
    this.date = (new Date()).toLocaleDateString('en-GB'); 
    this.studentID = ID;
    this.Present = [];
    this.studentSignature = [];
    this.supervisorComments = [];
    this.remarks = [];
  }

  greet() {

    this.studentID.forEach(sID => {
      this.Present.push({
        studentID: sID,
        status: true
      });

      this.studentSignature.push({
        studentID: sID,
        signature: ""
      });

      this.supervisorComments.push({
        studentID: sID,
        comment: ""
      });

      this.remarks.push({
        studentID: sID,
        remarks: ""
      });
    });
  }
}
