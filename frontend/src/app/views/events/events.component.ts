import { Component ,OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup ,FormBuilder, Validators} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { EventsService } from 'app/services/events/events.service';
import { HttpClient } from '@angular/common/http';
import { event } from 'jquery';
import { DeleteDailogeComponent } from "../delete-dialoge/delete-dailoge/delete-dailoge.component";
import { MatDialog } from "@angular/material/dialog";
declare var $: any;


interface event {
  Event_name : String;
  Total_interview : Number;
  Time : String;
}


@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{
  showview:boolean = true
  showadd:boolean = false
  formtitle : string;
  // formsubtitle : string;  
  saveButton:any = false;
  updateButton:any = false;

  pagination:number=1;
  

  addForm : FormGroup;

  // for dynamic view
events : event[] ;
data:any = "";

  constructor(private formBuilder : FormBuilder,
   private http : HttpClient,private eventService: EventsService,private dialog: MatDialog) { 
    this.addForm = this.formBuilder.group({
      event_name : ['',Validators.required],
      total_interviews : ['',[Validators.required,Validators.pattern("^[0-9]*$")]],
      time : ['',Validators.required]
    })   
     
    this.getEvent();
  }
  
  public myError = (controlName: string, errorName: string) =>{
    return this.addForm.controls[controlName].hasError(errorName);
  }


  showSuccess(from, align,messagedata) {
    const type = ["success"];
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

 addEvent(){
    this.showview =! this.showview
    this.showadd =!this.showadd
    this.saveButton = true
    this.updateButton = false
    this.formtitle = "Event Details";
    // this.formsubtitle = "Event details";
  }

  updateEvent(event:any){
    
    this.formtitle = "Event Details";
    // this.formsubtitle = "Event details";
    console.log(event);
    this.data=event;
    //for set previous value
    this.addForm.setValue({
      "event_name":event.event_name,
      "total_interviews":event.total_interviews,
      "time": new Date(event.time)});
    this.showview =! this.showview
    this.showadd =! this.showadd
    this.updateButton = true;
    this.saveButton = false;
     }

  cancel(){
    console.log("cancel");
    this.showadd =! this.showadd;
    this.showview =! this.showview;
    this.addForm.reset();
  }

  //getevent
  getEvent(){
    this.eventService.getEvents().subscribe((response:any) => {
      this.events = response.data;
     console.log("response",response);
    })
  }

 //save event
  onSubmit(from, align){
    
    console.log(this.addForm.value);
    this.eventService.addEvents(this.addForm.value).subscribe((response:any) => {
     console.log("response",response);
     this.showSuccess(from, align,response.message);
     this.getEvent();
   })
    this.addForm.reset()    
    
   this.showview =! this.showview
    this.showadd =!this.showadd
  }

  //update
  onUpdate(from, align){
    console.log("event called",this.data);
    console.log(this.addForm.value);
    this.eventService.updateEvents(this.data.event_id,this.addForm.value).subscribe((response:any) => {
     
      this.showSuccess(from, align,response.message);
     this.getEvent();
     console.log(response.data);
   })
    this.addForm.reset()    
  
   this.showview =! this.showview
   this.showadd =!this.showadd

  }

//delete button
delete(event: any,from, align){
  console.log(event.event_id);
 
  if (confirm("are you sure you wants to delete it?") == true) {
    this.eventService.deleteEvents(event.event_id).subscribe((response:any) => {      
     console.log(response.data);
     this.showSuccess(from, align,response.message); 
     this.getEvent(); 
   })
  } 
}

@ViewChild(MatPaginator) paginator: MatPaginator;
ngOnInit() {
  // this.dataSource.paginator = this.paginator;
  
}
renderPage(event:number){
  this.pagination = event;
}

//Delete dailog box
openDialog(
  deleteDetails,
  enterAnimationDuration: string,
  exitAnimationDuration: string
) {
  const dialogRef = this.dialog.open(DeleteDailogeComponent, {
    data: {function : this.eventService.deleteEvents(deleteDetails.event_id)}
  });
  console.log("in interviewers open dialog box ", deleteDetails);
  dialogRef.afterClosed().subscribe({
    next: (result) => {
      this.getEvent();
    },
  });

}
}
