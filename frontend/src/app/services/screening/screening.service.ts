import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { API } from 'app/constants/apiConstants';


const BACKEND_SCREENING_GET = API.getscreening ;
const BACKEND_CANDIDATE_GET = API.getCandidate ;
const BACKEND_SCREENING_POST = API.addscreening ;
@Injectable({
  providedIn: 'root'
})
export class ScreeningService {

  public err = new BehaviorSubject<any>(null);

  public getJsonValue : any;
  public gettest : any;
  constructor(private http: HttpClient) { }

  getScreenings() {
    return this.http
      .get(
        `${BACKEND_SCREENING_GET}`,
      )
  }
  
  getcandidate() {
    return this.http
      .get(
        `${BACKEND_CANDIDATE_GET}`,
      )
  }
 

  postScreenings(value:any) {
    return this.http
      .post(
        `${BACKEND_SCREENING_POST}`,value
      )
  }

}
