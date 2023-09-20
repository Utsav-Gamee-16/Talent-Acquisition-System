import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'app/constants/apiConstants';
import { BehaviorSubject, Subject, observable } from 'rxjs';


const BACKEND_INTERVIEWS_GET = API.getInterviews ;
const BACKEND_INTERVIEWS_DELETE = API.deleteInterviews ;
const BACKEND_INTERVIEWS_ADD = API.addInterviews ;
const BACKEND_INTERVIEWS_UPDATE = API.updateInterviews ;

//get candidate
const BACKEND_CANDIDATE_GET = API.getCandidate ;
//get candidate
const BACKEND_INTERVIEWER_GT = API.getAllInterviewer ;

@Injectable({
  providedIn: 'root'
})

export class InterviewsService {
  
  public err = new BehaviorSubject<any>(null);

  public getJsonValue : any;
  public gettest : any;
  constructor(private http: HttpClient) { }
  getInterviews() {
    return this.http
      .get(
        `${BACKEND_INTERVIEWS_GET}`,
      )
  }
  updateInterviews(id:any,value:any) {
    return this.http
      .put(
        `${BACKEND_INTERVIEWS_UPDATE}/${id}`,value,
      )
  }
 

  addInterviews(value: any) {
    return this.http
      .post(
        `${BACKEND_INTERVIEWS_ADD}`,value
      )
  }
  deleteInterviews(id:any) {
    return this.http
      .delete(
        `${BACKEND_INTERVIEWS_DELETE}/${id}`,
      )
  }

  // for options
  getcandidate() {
    return this.http
      .get(
        `${BACKEND_CANDIDATE_GET}`,
      )
  }

  getInterviewer() {
    return this.http
      .get(
        `${BACKEND_INTERVIEWER_GT}`,
      )
  }
}
