import { Component, OnInit } from "@angular/core";
import { DashboardService } from "app/services/dashboard/dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  public getEventCountValue: any;
  public getInterviewCountValue: any;
  public getCandidateCountValue: any;
  public getUpcomingInterviews: any;

  public candidateStatus: any;
  public pieChartColors = [
    {
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ];
  public chartD = [];
  public pendingCandidate: any;
  public val: any;
  constructor(private dashboardService: DashboardService) {}

  //pie chart
  public pieChartLabels = ["Selected", "Rejected", "Stand-by"];
  public pieChartData = this.chartD;
  public pieChartType = "pie";

  getInterviewerCount() {
    this.dashboardService
      .getInterviewCount()
      .subscribe((responseInterviewCount: any) => {
        this.getInterviewCountValue = responseInterviewCount.data;
      });
  }
  getEventCount() {
    this.dashboardService
      .getEventCount()
      .subscribe((responseEventCount: any) => {
        this.getEventCountValue = responseEventCount.data;
      });
  }
  getCandidateCount() {
    this.dashboardService
      .getCandidateCount()
      .subscribe((responseCandidateCount: any) => {
        this.getCandidateCountValue = responseCandidateCount.data;
      });
  }
  getUpcomingInterview() {
    this.dashboardService
      .getUpcomingInterviews()
      .subscribe((responseUpcomingInterview: any) => {
        this.getUpcomingInterviews = responseUpcomingInterview.data;
      });
  }
  getCandidateStatus() {
    this.dashboardService
      .getCandidateStatus()
      .subscribe((responseCandidateStatus: any) => {
        // let selectedCandidate = 0;
        // let notselectedCandidate = 0;
        // let pendingselectedCandidate = 0;
        this.candidateStatus = responseCandidateStatus.data;
   
        // console.log("candidate status : ", this.candidateStatus);
        // console.log("not selected: ", notselectedCandidate);
        this.chartD.push(this.candidateStatus[0].pass);
        this.chartD.push(this.candidateStatus[0].fail);
        this.chartD.push(this.candidateStatus[0].standby);
        // console.log('pass data: ',this.candidateStatus[0].pass);
        // console.log("chart data",this.chartD);
        
        
      });
  }
  ngOnInit() {
    this.getCandidateCount();
    this.getEventCount();
    this.getInterviewerCount();
    this.getUpcomingInterview();
    this.getCandidateStatus();
  }
}
