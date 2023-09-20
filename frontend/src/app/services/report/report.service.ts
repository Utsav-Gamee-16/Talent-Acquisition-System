import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API } from "app/constants/apiConstants";
import { BehaviorSubject, Subject, observable } from "rxjs";
import { ReportData } from "app/models/users";

const BACKEND_REPORT_URL = API.getReport;
@Injectable({
  providedIn: "root",
})
export class ReportService {
  public date1: string;
  public date2: string;
  public err = new BehaviorSubject<any>(null);

  public getJsonValue: any;
  public gettest: any;
  constructor(private http: HttpClient) {}

  //Get Report
  report(date1: string, date2: string) {
    // const reportData: ReportData = { date1: date1, date2: date2 };
    return this.http.get(`${BACKEND_REPORT_URL}?date2=${date2}&date1=${date1}`);
  }
}
