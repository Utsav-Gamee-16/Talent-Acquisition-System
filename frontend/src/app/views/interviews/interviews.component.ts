import { Component ,OnInit} from '@angular/core';
import { FormGroup ,FormBuilder,FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewsService } from 'app/services/interviews/interviews.service';
import { EventsService } from 'app/services/events/events.service';
import { HttpClient } from '@angular/common/http';
import { DeleteDailogeComponent } from "../delete-dialoge/delete-dailoge/delete-dailoge.component";
import { MatDialog } from "@angular/material/dialog";

declare var $: any;

// interfaces 
interface interview {  
  Interviewer: String;  
  Interviewer_id: Number;
  Candidate: String;
  Candidate_id: Number;    
  Time: String;  
  Event: String; 
  Event_id: Number;
  Round: Number;  
  Status : string;
}  

interface interviewer {
  interviewer_id : Number;
  name : String;
}

interface candidate {
  candidate_id : Number;
  name : String;
}

interface event {
  event_id : Number;
  name : String;
}



@Component({
  selector: 'interviewer',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit{
  showview:boolean = true
  showadd:boolean = false
  showSatus:boolean = false
  formtitle : string;
  // formsubtitle : string;

  data : any;
  interviewTime : string;
  
  saveButton:any = false;
  updateButton:any = false;

  //for dynamic data

  // for dynamic view
  interviews : interview[] ;

  // option for interviewer 
  interviewers : interviewer[] ;

   // option for candidates 
   candidates : candidate[];

    // option for events
  events : event[];

  addForm : FormGroup;

  pagination:number=1;

  public startDate: Date = new Date();

  renderPage(event:number){
    this.pagination = event;
  }

  convertStartDate(event: Event) {
    const date = (event.target as HTMLInputElement).value;
    this.startDate = new Date(date);
    console.log(this.startDate);
  }


  constructor(private formBuilder : FormBuilder,private route:Router,private dialog: MatDialog,
    private http : HttpClient,private interviewsService: InterviewsService,private eventsService: EventsService) { 
    this.addForm = this.formBuilder.group({
      interviewer_id : ['',Validators.required],
      candidate_id :['',Validators.required],
      interview_time : new FormControl<string | null>(
        this.startDate.toISOString(),
        Validators.required
      ),
      event_id : ['',Validators.required],
      round : [''],
      status : ['']
    })

    
  }

  //notofications
  showSuccess(from, align,messagedata) {
    const type = ["success"];
    $.notify(
      {
        icon: "notifications",
        message:messagedata,
      },
      {
        type: type,
        timer: 100,
        placement: {
          from: from,
          align: align,
        },
      }
    );
  }

  showDlete(from, align,messagedata) {
    const type = ["danger"];
    $.notify(
      {
        icon: "notifications",
        message:messagedata,
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

  //get items for form
//events
getEvent(){
  this.eventsService.getEvents().subscribe((response:any) => {
    this.events = response.data;
   console.log(response.data);
  })
}
//candidates
getCandidates(){
  this.interviewsService.getcandidate().subscribe((response:any) => {
    this.candidates = response.data;
   console.log(response.data);
  })
}
//get interviewers
getInterviewer(){
  this.interviewsService.getInterviewer().subscribe((response:any) => {
  this.interviewers = response.data;
  console.log(response.data);
 })
}

//get interviews
getInterviews(){
    this.interviewsService.getInterviews().subscribe((response:any) => {
    this.interviews = response.data;
    console.log(response.data);
   })
 } 

  //delete intervires
  delete(interview: any,from, align){
    console.log(interview.interview_id);
   
    if (confirm("are you sure you wants to delete it?") == true) {
      this.interviewsService.deleteInterviews(interview.interview_id).subscribe((response:any) => {      
       console.log(response.data);
       this.showSuccess(from, align,response.message);    
       this.getInterviews(); 
     })
    } 
  }

  //to save data
  onSubmit(from, align){
    console.log(this.addForm.value);
    this.interviewsService.addInterviews(this.addForm.value).subscribe((response:any) => {
     console.log(response.data);
     this.showSuccess(from, align,response.message);
     this.getInterviews();
   })
    this.addForm.reset()    
    
   this.showview =! this.showview
    this.showadd =!this.showadd
  }

  //to update data
  onUpdate(from, align){
    console.log("event called",this.data);
    console.log("update time data",this.addForm.value);
    this.interviewsService.updateInterviews(this.data,this.addForm.value).subscribe((response:any) => {
     
     this.showSuccess(from, align,response.message);
     this.getInterviews();
     console.log("update response",response.data);
   })
    this.addForm.reset()    
  
   this.showview =! this.showview
   this.showadd =!this.showadd

  }

  ngOnInit() {
    this.getInterviews();
    this.getEvent();
    this.getCandidates();
    this.getInterviewer();
    console.log("intreviewers",this.interviewers)
    
  }

 addInterviews(){
    this.showview =! this.showview
    this.showadd =!this.showadd
    this.showSatus = this.showSatus
    this.saveButton = true
    this.updateButton = false
    this.formtitle = "Interview Details";
    // this.formsubtitle = "Interview details";
    console.log("add interviews");
  }

  updateInterviews(interview:any){
    this.formtitle = "Interview Details";
    // this.formsubtitle = "Interview details";
    console.log("update interviews",interview);
    this.showview =! this.showview
    this.showadd =! this.showadd
    this.showSatus = !this.showSatus
    this.updateButton = true;
    this.saveButton = false;
    this.data = interview.interview_id;

    console.log("interviewtime",this.interviewTime);
    
    this.addForm.setValue({
      "interviewer_id":interview.interviewer_id.toString(),
      "candidate_id":interview.candidate_id.toString(),
      "interview_time":interview.interview_time.slice(0, 16),
      "event_id":interview.event_id.toString(),
      "round":interview.round.toString(),
      "status":interview.status});
    console.log(this.addForm.value);
    
  }

  cancel(){
    console.log("cancel");
    this.showadd =! this.showadd;
    this.showview =! this.showview;
    this.addForm.reset()
  }



  //Delete dailog box
  openDialog(
    deleteDetails,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    const dialogRef = this.dialog.open(DeleteDailogeComponent, {
      data: {function : this.interviewsService.deleteInterviews(deleteDetails.interview_id)}
    });
    console.log("in interviewers open dialog box ", deleteDetails);
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        this.getInterviews();      },
    });
}
}
