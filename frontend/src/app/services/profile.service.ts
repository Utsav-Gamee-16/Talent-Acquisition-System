import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Profile } from '../models/profile';
import {environment} from '../../environments/environment'
import { API } from "../constants/apiConstants";

const BACKEND_PROFILE_GET = API.getProfile ;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profile: Profile;
  private isProfileSet: boolean = false
  private updatedProfile = new Subject<Profile>();
  public err = new BehaviorSubject<any>(null);
  public userId : any;
  constructor(
    private http: HttpClient, private router: Router
  ) {
     
   }

  // getProfile() {

  //   this.http.get<{ profile: any, message: string }>
  //   (API.login)
  //     .subscribe(profile => {

  //       let prof = profile.profile
  //       this.profile = prof
  //       this.isProfileSet = true
  //       this.updatedProfile.next(profile.profile)
  //     },
  //       err => {
  //       })

  // }
  
  getProfile() {
    this.userId = localStorage.getItem("userId");
     console.log("id",this.userId);
    return this.http
      .get(
        `${BACKEND_PROFILE_GET}/${this.userId}`,
      )
  }

}