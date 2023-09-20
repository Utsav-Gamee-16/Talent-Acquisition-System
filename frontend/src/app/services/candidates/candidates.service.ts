import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'app/constants/apiConstants';
import { BehaviorSubject, Subject, observable } from 'rxjs';


const BACKEND_CANDIDATES_GET = API.getCandidate ;
const BACKEND_CANDIDATES_DELETE = API.deleteCandidate ;
const BACKEND_CANDIDATES_ADD = API.addCandidate ;
const BACKEND_CANDIDATES_UPDATE = API.updateCandidate ;


@Injectable({
  providedIn: 'root'
})

export class CandidatesService {
  
  public err = new BehaviorSubject<any>(null);
  public getJsonValue : any;
  public gettest : any;

  constructor(private http: HttpClient) { }
  getCandidates() {
    return this.http
      .get(
        `${BACKEND_CANDIDATES_GET}`,
      )
  }

  updateCandidates(id:any,value: any){
    return this.http
      .put(
        `${BACKEND_CANDIDATES_UPDATE}/${id}`,value
      )
  }

  deleteCandidates(id:any) {
    return this.http
      .delete(
        `${BACKEND_CANDIDATES_DELETE}/${id}`,
      )
  }

  addCandidates(value: any) {
    return this.http
      .post(
        `${BACKEND_CANDIDATES_ADD}`,value
      )
  }
}