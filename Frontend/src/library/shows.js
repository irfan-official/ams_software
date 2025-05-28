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

    this.studentID.forEach(eID => {
      this.Present.push({
        studentID: eID,
        status: true
      });

      this.studentSignature.push({
        studentID: eID,
        signature: ""
      });

      this.supervisorComments.push({
        studentID: eID,
        comment: ""
      });

      this.remarks.push({
        studentID: eID,
        remarks: ""
      });
    });
  }
}
