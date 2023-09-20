import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'app/constants/apiConstants';
import { BehaviorSubject, Subject, observable } from 'rxjs';


const BACKEND_EVENTS_GET = API.getEvents ;
const BACKEND_EVENTS_DELETE = API.deleteEvents ;
const BACKEND_EVENTS_ADD = API.addEvents ;
const BACKEND_EVENTS_UPDATE = API.updateEvents ;

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  
  public err = new BehaviorSubject<any>(null);
  
  public getJsonValue : any;
  public gettest : any;
  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http
    .get(
      `${BACKEND_EVENTS_GET}`,
    );
  }
  updateEvents(id:any,value:any) {
    return this.http
      .put(
        `${BACKEND_EVENTS_UPDATE}/${id}`,value,
      )
  }
  addEvents(value: any) {
    return this.http
    .post(
      `${BACKEND_EVENTS_ADD}`,value
    );
  }
  deleteEvents(id:any) {
    return this.http
      .delete(
        `${BACKEND_EVENTS_DELETE}/${id}`,
      )
  }
}
