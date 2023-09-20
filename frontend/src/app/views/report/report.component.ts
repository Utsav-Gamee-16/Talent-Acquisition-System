import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl,FormBuilder,FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { ReportService } from "app/services/report/report.service";
import { ngxCsv } from "ngx-csv/ngx-csv";
declare var $: any;

@Component({
  selector: "report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"],
})
export class ReportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  reportDates: FormGroup;


  datePipeString: string;
  public reportData: any = [];
  displayview: boolean = true;
  showadd: boolean = false;
  showpaginator: boolean = false;
  minDate: Date;
  maxDate: Date;
  page: number = 1;
  tableSize: number = 6;
  null_date = Date.parse("") || 0;
  date = new Date(Date.now()).getDate();
  month = new Date(Date.now()).getMonth();
  year = new Date(Date.now()).getFullYear();
  expport_date = `report(${this.date}-${this.month}-${this.year})`;


  

  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
    private reportService: ReportService,
    private formBuilder: FormBuilder,
  ) {
    this.reportDates = this.formBuilder.group({
        date1 : [''],
        date2 : ['']
    })
  }
  ngOnInit(): void {
    this.reportData = [];
    // this.onSubmit();
  }


  public myError = (controlName: string, errorName: string) =>{
    return this.reportDates.controls[controlName].hasError(errorName);
  }


  showNotificationSuccess(from, align, msg, msgtype) {
    const type = msgtype;

    $.notify(
      {
        icon: "notifications",
        message: msg,
      },
      {
        type: type,
        timer: 20,
        placement: {
          from: from,
          align: align,
        },
      }
    );
  }

  onStartDate(selectedDate: Date) {
    this.minDate = selectedDate;
  }

  onSubmit(from, align) {
    this.displayview = !this.displayview;
    this.showadd = !this.showadd;
    //Convert date format using pipes
    const startDate = this.datePipe.transform(
      this.reportDates.controls['date1'].value ?? "",
      "yyyy-MM-dd"
    );
    const endDate = this.datePipe.transform(
      this.reportDates.controls['date2'].value ?? "",
      "yyyy-MM-dd"
    );

    if (startDate == null || endDate == null) {
      this.showNotificationSuccess(from, align, "Please enter date.", "danger");
      this.reportData = [];
      this.showpaginator = false;
    } else {
      //call a report service
      this.reportService
        .report(startDate, endDate)
        .subscribe((response: any) => {
          this.reportData = response.data;
          // console.log(startDate, endDate);

          if (this.reportData.length !== 0) {
            this.showNotificationSuccess(
              from,
              align,
              response.message,
              "success"
            );
            this.showpaginator = true;
          } else {
            this.showNotificationSuccess(
              from,
              align,
              response.message,
              "danger"
            );
          }
        });
        this.reportDates.reset()

    }
  }
//For download report data sheet
  exportReport(from, align) {
    var options = {
      title: "Report Details",
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalseparator: ".",
      showLables: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
      headers: [
        "Candidate id",
        "First Name",
        "Last Name",
        "Email",
        "Personal Mobile",
        "Designation",
        "Evaluation Round",
        "Evaluation By",
        "Comment",
        "Interview Time",
      ],
    };
    new ngxCsv(this.reportData, this.expport_date, options);
    this.showNotificationSuccess(
      from,
      align,
      "Report successfully downloaded.",
      "success"
    );
  }
  onTableDataChange(event: number) {
    this.page = event;
  }
}
