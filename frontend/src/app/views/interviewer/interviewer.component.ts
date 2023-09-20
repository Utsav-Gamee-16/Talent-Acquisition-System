import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { InterviewerService } from "app/services/interviewer/interviewer.service";
import { Observable } from "rxjs";
import { DeleteDailogeComponent } from "../delete-dialoge/delete-dailoge/delete-dailoge.component";

declare var $: any;

@Component({
  selector: "interviewer",
  templateUrl: "./interviewer.component.html",
  styleUrls: ["./interviewer.component.css"],
})
export class InterviewerComponent implements OnInit {
  displayview: boolean = true;
  showadd: boolean = false;
  display_update_btn: boolean = false;
  display_save_btn: boolean = true;
  display_user_data: boolean = false;
  formtitle: string;

  data: any = "";
  addForm: FormGroup;
  public getInterviewerValue: any;
  public getInterviewerFromUser: any;
  public filteredOptions: Observable<string[]>;
  public add_interviewer: any;
  public deleteData: any = [];
  public updateData: any = [];

  myControl = new FormControl("");
  options: string[] = [];

  //pagination detalis
  page: number = 1;
  tableSize: number = 5;

  constructor(
    private formBuilder: FormBuilder,
    private interviewerService: InterviewerService,
    private dialog: MatDialog
  ) {
    this.addForm = this.formBuilder.group({
      user_id: new FormControl('', Validators.required),
      designation: [
        "",
        [Validators.required],
      ],
      experience: ["", [Validators.required, Validators.pattern("[0-9]+$")]],
      domain: ["", Validators.required],
      skills: ["", Validators.required],
    });
  }

  hide(data:any){
    if(data.length>10){
      return true;
    }
    else {
      return false;
    }
  }

  show(data:any){
    return false
  }

  ngOnInit(): void {
    this.getInterviewer();
    this.getInterviewerFromUsers();
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.addForm.controls[controlName].hasError(errorName);
  }

  showNotificationSuccess(from, align, msg) {
    const type = ["success"];
    $.notify(
      {
        icon: "notifications",
        message: msg,
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
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
 

  //Get interviewers from interviewer table
  getInterviewer() {
    this.interviewerService.getAllInterviewers().subscribe((response: any) => {
      this.getInterviewerValue = response.data;
    });
  }

  //Get interviewers from user table
  getInterviewerFromUsers() {
    this.interviewerService.getInterviewers().subscribe((response: any) => {
      this.getInterviewerFromUser = response.data;
      console.log(this.getInterviewerFromUser);
    });
  }

  //add interviewers
  addInterviewerdata(from, align) {
    console.log(this.addForm.value);

    this.interviewerService
      .addInterviewer(this.addForm.value)
      .subscribe((response: any) => {
        this.add_interviewer = response.data;
        this.getInterviewer();
        this.addForm.reset();
        this.displayview = !this.displayview;
        this.showadd = !this.showadd;
        this.showNotificationSuccess(from, align, response.message);
      });
  }

  //Add Interviewer table
  addInterviewerForm(data: any) {
    this.displayview = !this.displayview;
    this.showadd = !this.showadd;
    this.display_update_btn = false;
    this.display_user_data = true;
    this.display_save_btn = true;
    this.formtitle = "Interviewer Details";
  }

  //update interviewer
  updateInterviewer(from, align) {
    this.interviewerService
      .updateInterviewer(this.data.interviewer_id,this.addForm.value)
      .subscribe((response: any) => {
        this.updateData = response.data;
        this.getInterviewer();
        this.addForm.reset();
        this.displayview = !this.displayview;
        this.showadd = !this.showadd;
        this.showNotificationSuccess(from, align, response.message);

      });
  }

  //Update Interviewer table
  updateInterviewerForm(updatedata: any) {
    this.displayview = !this.displayview;
    this.showadd = !this.showadd;
    this.display_save_btn = false;
    this.display_user_data = false;
    this.data = updatedata;
    console.log("data at user_id",updatedata);
    this.display_update_btn = true;
    this.formtitle = "Interviewer Details";

    this.addForm.setValue({
      "user_id": updatedata.user_id,
      "designation":updatedata.designation,
      "experience":updatedata.experience,
      "domain": updatedata.domain,
      "skills": updatedata.skills
    })
  }

  //cancle button
  cancel() {
    console.log("cancel");
    this.showadd = !this.showadd;
    this.displayview = !this.displayview;
    this.addForm.reset();
  }

  //delete interviewer
  deleteInterviewer(data: any, from, align) {
    let confirmMessage = "Sure delete this data";
    console.log("data",data)
    
    if (confirm(confirmMessage) == true) {
      this.interviewerService
        .removeInterviewer(data.interviewer_id)
        .subscribe((response: any) => {
          this.deleteData = response.data;
          this.getInterviewer();
          this.showNotificationSuccess(from, align, response.message);
        });
    } else {
      confirmMessage = "cancelled!";
    }
  }

  //paginator
  onTableDataChange(event: number) {
    this.page = event;
  }

  

  //Delete dailog box
  openDialog(
    deleteDetails,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    const dialogRef = this.dialog.open(DeleteDailogeComponent, {
      data: {function : this.interviewerService.removeInterviewer(deleteDetails.interviewer_id)}
    });
    console.log("in interviewers open dialog box ", deleteDetails);
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        this.getInterviewer();
      },
    });
}
}