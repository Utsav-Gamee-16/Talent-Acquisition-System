import { Injectable } from "@angular/core";
import { API } from "../../constants/apiConstants";
import { HttpClient } from "@angular/common/http";

const BACKEND_GET_EVENT_COUNT_URL = API.getEventCount;
const BACKEND_GET_INTERVIEW_COUNT_URL = API.getInterviewCount;
const BACKEND_GET_CANDIDATE_COUNT_URL = API.getCandidateCount;
const BACKEND_GET_UPCOMING_INTERVIEWS_URL = API.getUpcomingInterviews;
const BACKEND_GET_CANDIDATE_STATUS_URL = API.getCandidateStatus;

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getEventCount() {
    return this.http.get(`${BACKEND_GET_EVENT_COUNT_URL}`);
  }

  getInterviewCount() {
    return this.http.get(`${BACKEND_GET_INTERVIEW_COUNT_URL}`);
  }
  getCandidateCount() {
    return this.http.get(`${BACKEND_GET_CANDIDATE_COUNT_URL}`);
  }

  getCandidateStatus() {
    return this.http.get(`${BACKEND_GET_CANDIDATE_STATUS_URL}`);
  }

  getUpcomingInterviews() {
    return this.http.get(`${BACKEND_GET_UPCOMING_INTERVIEWS_URL}`);
  }
}
