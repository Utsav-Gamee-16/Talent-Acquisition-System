// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EvaluationService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'app/constants/apiConstants';
import { BehaviorSubject, Subject, observable } from 'rxjs';


const BACKEND_EVALUATION_GET = API.getevaluation ;
const BACKEND_CANDIDATE_GET = API.getCandidate ;
const BACKEND_USER_GET = API.getUser ;
const BACKEND_INTERVIEWER_GET = API.getAllInterviewer;
const BACKEND_EVALUATION_POST = API.addevaluation ;
const BACKEND_EVALUATION_UPDATE = API.updateEvaluations ;


@Injectable({
  providedIn: 'root'
})

export class EvaluationService {
  
  public err = new BehaviorSubject<any>(null);

  public getJsonValue : any;
  public gettest : any;
  constructor(private http: HttpClient) { }

  getEvaluations() {
    return this.http
      .get(
        `${BACKEND_EVALUATION_GET}`,
      )
  }

  getUsers() {
    return this.http
      .get(
        `${BACKEND_USER_GET}`,
      )
  }
  
 
  getCandidates() {
    return this.http
      .get(
        `${BACKEND_CANDIDATE_GET}`,
      )
  }

  getInterviewers() {
    return this.http
      .get(
        `${BACKEND_INTERVIEWER_GET}`,
      )
  }


  updateEvaluations(id:any,value:any) {
    return this.http
      .put(
        `${BACKEND_EVALUATION_UPDATE}/${id}`,value,
      )
  }

  postEvaluations(value:any) {
    return this.http
      .post(
        `${BACKEND_EVALUATION_POST}`,value
      )
  }
}
