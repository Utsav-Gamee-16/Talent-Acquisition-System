import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'app/constants/apiConstants';
import { BehaviorSubject, Subject, observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

const BACKEND_USERS_GET = API.getUser ;
const BACKEND_USERS_DELETE = API.deleteUser ;
const BACKEND_USERS_ADD = API.addUser ;
const BACKEND_USERS_UPDATE = API.updateUser ;


@Injectable({
  providedIn: 'root'
})

export class UserProfileService {
  
  public err = new BehaviorSubject<any>(null);
  public getJsonValue : any;
  public gettest : any;

  constructor(private http: HttpClient, private authService : AuthService) { }
  getUsers() {
    // return this.http
    //   .get(
    //     `${BACKEND_USERS_GET}`,
    //   )
    return this.http.get<{ user: any, message: string }>
        (BACKEND_USERS_GET)
  }

  updateUser(id:any,value: any){
    return this.http
      .put(
        `${BACKEND_USERS_UPDATE}/${id}`,value
      )
  }

  deleteUsers(id:any) {
    return this.http
      .delete(
        `${BACKEND_USERS_DELETE}/${id}`,
      )
  }

  addUsers(value: any) {
    return this.http
      .post(
        `${BACKEND_USERS_ADD}`,value
      )
  }

  getToken(){
    return localStorage.getItem('token')  
  }
}