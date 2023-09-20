import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API } from "app/constants/apiConstants";
import { BehaviorSubject, Observable, Subject, observable } from "rxjs";
import { ReportData } from "app/models/users";

const BACKEND_INTERVIEWER_URL = API.getAllInterviewer;
const BACKEND_INTERVIEWER_FROM_USER_URL = API.getInterviewer;
const BACKEND_REMOVE_INTERVIEWER_URL = API.removeInterviewer;
const BACKEND_UPDATE_INTERVIEWER_URL = API.updateInterviewer;
const BACKEND_ADD_INTERVIEWER_URL = API.addInterviewer;

@Injectable({
  providedIn: "root",
})
export class InterviewerService {
  constructor(private http: HttpClient) {}

  //Get Interviewers
  getAllInterviewers(): Observable<any> {
    return this.http.get(`${BACKEND_INTERVIEWER_URL}`);
  }

  //Get Interviewers from users table
  getInterviewers(): Observable<any> {
    return this.http.get(`${BACKEND_INTERVIEWER_FROM_USER_URL}`);
  }

  //add Interviewer
  addInterviewer(addForm) {
    return this.http.post(`${BACKEND_ADD_INTERVIEWER_URL}`, addForm);
  }

  //remove Interviewers
  removeInterviewer(interviewerId: any) {
    return this.http.delete(
      `${BACKEND_REMOVE_INTERVIEWER_URL}/${interviewerId}`
    );
  }

  //update Interviewers
  updateInterviewer(interviewerId: any, addForm: any) {
    return this.http.put(
      `${BACKEND_UPDATE_INTERVIEWER_URL}/${interviewerId}`,
      addForm
    );
  }
}
