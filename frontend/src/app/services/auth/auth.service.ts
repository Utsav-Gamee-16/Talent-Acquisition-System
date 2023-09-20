import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthData } from '../../models/user';
import { API } from "../../constants/apiConstants";
declare var $: any;

const BACKEND_LOGIN_URL = API.login;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private userType : string;
  private tokenTimer: any;
  public errorLogin :any = true;
 

  private userId: string;
  private authStatusListener = new Subject<boolean>();
  public err = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, private router: Router) { }

 showErrorNotify(from, align) {
    const type = ["danger"];
    $.notify(
      {
        icon: "notifications",
        message:"Your Email or Password is incorrect",
      },
      {
        type: type,
        timer: 2000,
        placement: {
          from: from,
          align: align,
        },
      }
    );
  }

  getErrorLogin(){
    this.errorLogin = true;
    return this.errorLogin
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserType() {
    return this.userType;
  }

  getUserId() {
    return this.userId;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }




  signIn(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
     this.http
      .post<any>(
        BACKEND_LOGIN_URL,
        authData
      )
      .subscribe(response => {

        this.err.next(null)
        if (response.data.length == 0) {
         this.showErrorNotify("top","center");
        } else {
          const token = response.data.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.data.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.data.user_id;
            this.userType = response.data.user_type;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

            this.saveAuthData(token, expirationDate, this.userId,this.userType);
            this.router.navigate(["/dashboard"]);
          }
        }
      },
        err => {
          this.err.next(err)
        });
  }

  logout() {
    this.token = null;
    this.userType = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
    localStorage.removeItem('token')
  }


  autoAuthUser() {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.userType = authInformation.userType;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userType: userType
    }
  }

  private setAuthTimer(duration: number) {

    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string,userType: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("userType", userType);
  }


  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    localStorage.removeItem("profile");
    localStorage.removeItem("uname");
  }

}