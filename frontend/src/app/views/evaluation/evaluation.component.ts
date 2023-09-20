import { Component , ViewChild,OnInit} from '@angular/core';
import { FormGroup ,FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from 'app/services/evaluation/evaluation.service';
import { EventsService } from 'app/services/events/events.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';


@Component({
  selector: "evaluation",
  templateUrl: "./evaluation.component.html",
  styleUrls: ["./evaluation.component.css"],
})
export class PaginatorOverviewExample {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
}

// interfaces 
interface evaluation {  
  candidate: String;  
  candidate_id: Number;
  interviewer: String;
  interviewer_id: Number;    
  evaluation_for: String; 
  evaluation_by: String;  
  user: String; 
  user_id: Number;
  round: Number;  
  position_assigned : string;
  comment : string;

}  

interface interviewer {
  interviewer_id : Number;
  interviewer : String;
}

interface candidate {
  candidate_id : Number;
  candidate : String;
}

interface user {
  user_id : Number;
  user : String;
}

declare var $: any;

@Component({
  selector: 'evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit{
  mycontrol = new FormControl();
  [x: string]: any;
  title = "Evaluation";
  // show = false;
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
  showview:boolean = true
  showadd:boolean = false
  formtitle : string;
  // formsubtitle : string;
  data :any;
  
  saveButton:any = false;
  updateButton:any = false;

  //for dynamic data

  // for dynamic view
 public evaluationsData :any ;
 public evaluationsAllData :any ;


 
  interviewers : interviewer[] ; 
  candidates : candidate[];
  users : user[];

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

  public myError = (controlName: string, errorName: string) =>{
    return this.addForm.controls[controlName].hasError(errorName);
  }

  // constructor
  addForm : FormGroup;

  constructor(private formBuilder : FormBuilder,private route:Router,
    private http : HttpClient,private evaluationsService: EvaluationService,private eventsService: EventsService) { 
    this.addForm = this.formBuilder.group({
      interviewer_id : ['',Validators.required],
      candidate_id :['',Validators.required],
      evaluation_for : ['',Validators.required],
      evaluation_by : [''],
      round : ['',Validators.required],
      position_assigned : ['',Validators.required],
      comment : ['',Validators.required] 
    })
    

    this.getEvaluation();
    this.getUser();
    this.getCandidates();
    this.getInterviewer();
  }

  //get items for form
//evaluation
getEvaluation(){
  this.evaluationsService.getEvaluations().subscribe((response:any) => {
    this.evaluationsAllData = response.data;
   console.log(this.evaluationsAllData);
  })
}


postEvaluation(){
  this.evaluationsService.postEvaluations(this.addForm.value).subscribe((response:any) => {
    this.evaluationsData = response.data;
   console.log(response.data);  
  })
}


//candidates
getCandidates(){
  this.evaluationsService.getCandidates().subscribe((response:any) => {
    this.candidates = response.data;
   console.log(response.data);
  })
}
// //get interviewers
getInterviewer(){
  this.evaluationsService.getInterviewers().subscribe((response:any) => {
  this.interviewers = response.data;
  console.log("interviewer data",response.data);
 })
}

//get users
getUser(){
    this.evaluationsService.getUsers().subscribe((response:any) => {
    this.users = response.data;
    console.log("user data",response.data);
   })
 } 

  
  //to save data
  onSubmit(from, align){
   
    console.log("data onsubmit",this.addForm.value);
    this.evaluationsService.postEvaluations(this.addForm.value).subscribe((response:any) => {
     console.log(response.data);
     this.showNotificationSuccess(from,align,' Data Saved Successfully.');
     this.getEvaluation();
   })
    this.addForm.reset()    
    this.saveButton = true
    this.updateButton = false
    
   this.showview =! this.showview
    this.showadd =!this.showadd
  }
  

  //to update data
  onUpdate(from,align){
    this.evaluationsService.updateEvaluations(this.data,this.addForm.value).subscribe((response:any) => {
      this.getEvaluation();
      console.log(response.data);
      this.showNotificationSuccess(from,align,'Data Updated Successfully.');
    })

    
    this.updateButton = true;
    this.saveButton = false;
    this.showview =! this.showview
    this.showadd =!this.showadd
  }

  ngOnInit() {
    
  }
  clickAlert(){
    confirm("Sure delete this data")
  }

 addEvaluations(){
    this.showview =! this.showview
    this.showadd =!this.showadd
    this.saveButton = true
    this.updateButton = false
    this.formtitle = "Evaluation Details";
    // this.formsubtitle = "Evaluation details";
    console.log(this.addForm.value);
  }

  updateEvaluations(evaluation:any){
    this.showview =! this.showview
    this.showadd =! this.showadd
    this.updateButton = true;
    this.saveButton = false;
    this.formtitle = "Evaluation Details";
    console.log("update evaluation",evaluation);
    this.data = evaluation.evaluation_id;

    this.addForm.setValue({
      "candidate_id":evaluation.candidate_id.toString(),
      "interviewer_id":evaluation.interviewer_id.toString(),
      "round":evaluation.round.toString(),
      "evaluation_for":evaluation.evaluation_for.toString(),
      "position_assigned":evaluation.position_assigned.toString(),
      "evaluation_by":evaluation.evaluation_by.toString(),
      "comment" :evaluation.comment.toString(),
     });
    
  }

  cancel(){
    console.log("cancel");
    this.showadd =! this.showadd;
    this.showview =! this.showview;
    this.addForm.reset()
  }

  
  // / Pagination
  pagination: number = 1;

  renderPage(event: number) {
    this.pagination = event;
  }




}


  

  
  

