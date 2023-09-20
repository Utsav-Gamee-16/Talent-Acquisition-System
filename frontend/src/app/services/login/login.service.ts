import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { API } from '../../constants/apiConstants';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
    headers;
    constructor(private _dataService: DataService) { }

    login(formData: any): Observable<any> {
        // const url = API.login;
        const url = API.login;
        const apiType = API.publicAPI;
        return this._dataService.post(url, formData, apiType, this.headers);
    }
}
