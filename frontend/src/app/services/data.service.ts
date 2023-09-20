import { Injectable } from '@angular/core';
// import { AuthService } from './auth.Service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { API } from '../constants/apiConstants';
import { Config } from '../models/config';

@Injectable()
export class DataService {
    identityToken: any ;
    headerType: undefined;
    deleteBody: string | undefined;
    refreshTokenHeader: any;
    
    constructor(private httpClient: HttpClient /*, private _auth: AuthService*/) { }

    createRequestOptions(apiType: string): any {
    //   if (this._auth.isTokenExpired()) {
    //     // this._auth.logout();
    //   }
    //   this.identityToken = this._auth.getLocalStorageItem('identityToken');
    //   const authorization = this._auth.getLocalStorageItem('accesstoken');
      let headers = new HttpHeaders();
      if (this.headerType !== undefined) {
          this.headerType = undefined;
      } else {
          headers = headers.append('Content-Type', 'application/json').append('Accept', 'application/json');
      }
      headers = headers.append("rf", "oem");
      if (API.privateAPI === apiType && this.identityToken) {
          // headers = headers.append('Access-Control-Allow-Origin', '*');
          headers = headers.append(API.idToken, `${API.tokenType} ${this.identityToken}`);
      }
    //   if (authorization) {
    //       headers = headers.append(API.authorization, `${authorization}`);
    //   }
      if (this.deleteBody && this.deleteBody !== '{}') {
          const requestOptions = {
              'headers': headers,
               observe: 'response',
               'body': this.deleteBody
          };
          return requestOptions;

      } else {
        const requestOptions = {
          'headers': headers,
           observe: 'response'
        };
        return requestOptions;
      }

    }


    get(url: string, apiType: string):  Observable<HttpResponse<Config>> {
        const requestOptions = this.createRequestOptions(apiType);
        if (requestOptions) {
            return this.httpClient.get<any>(url, requestOptions)
            .pipe(map((response: any) => {
                return response;
            })).pipe(catchError((errorResponse: any) => {
                return throwError(() => new Error(errorResponse));
            }));
        }
    }

    post(url: string, body: any, apiType: any, headers?: undefined): Observable<HttpResponse<Config>> {
        if (headers !== undefined) {
            this.headerType = headers;
        }
        const requestOptions = this.createRequestOptions(apiType);
        if (requestOptions) {
            return this.httpClient.post<any>(url, body, requestOptions)
            .pipe(map((response: any) => {
                return response;
            })).pipe(catchError((errorResponse: any) => {
                return throwError(() => new Error(errorResponse));
            }));
        }
    }

    delete(url: string, apiType: any): Observable<HttpResponse<Config>> {
        const requestOptions = this.createRequestOptions(apiType);
        
        if (requestOptions) {
            return this.httpClient.delete<any>(url, requestOptions)
            .pipe(map((response: any) => {
                return response;
            })).pipe(catchError((errorResponse: any) => {
                return throwError(() => new Error(errorResponse));
            }));
        }
    }

    put(url: string, body: any, apiType: any, headers?: undefined): Observable<HttpResponse<Config>> {
        if (headers !== undefined) {
          this.headerType = headers;
      }
        const requestOptions = this.createRequestOptions(apiType);
        if (requestOptions) {
            return this.httpClient.put<any>(url, body, requestOptions)
            .pipe(map((response: any) => {
                return response;
            })).pipe(catchError((errorResponse: any) => {
                return throwError(() => new Error(errorResponse));
            }));
        }
    }
}
