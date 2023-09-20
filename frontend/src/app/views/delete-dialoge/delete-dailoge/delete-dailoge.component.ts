import { Component,Output,EventEmitter,Input,OnInit,Inject} from '@angular/core';
import { InterviewerComponent } from 'app/views/interviewer/interviewer.component'; 
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { InterviewerService } from "app/services/interviewer/interviewer.service";
import { UserProfileService } from "app/services/user-profile/user-profile.service";
import { CandidatesService } from 'app/services/candidates/candidates.service';
import { EventsService } from 'app/services/events/events.service';

import { event } from '../../events/event';

declare var $: any;
@Component({
  selector: 'delete-dailoge',
  templateUrl: './delete-dailoge.component.html',
  styleUrls: ['./delete-dailoge.component.css']
})
export class DeleteDailogeComponent implements OnInit{

  deleteData : any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    public MatDialogRef: MatDialogRef<DeleteDailogeComponent>,
    private interviewerService: InterviewerService,
    private userService : UserProfileService,
    private candidateService: CandidatesService,
    private eventService:EventsService
  ) {}
  ngOnInit(): void {}

  //notification
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

    // delete interviewer
    deleteInterviewer(data, from, align) {
      console.log("iterviewer id : ", data.id);
      // console.log("in delete ", data);
      this.interviewerService
        .removeInterviewer(data.id)
        .subscribe((response: any) => {
          this.deleteData = response.data;
          // this.getInterviewer();
          console.log("delete data", this.deleteData);
          // window.location.reload();
          this.showNotificationSuccess(from, align, response.message);
        });
    }


    // delete user
    deleteUser(User: any, from, align) {
      console.log("user_id : ", User.user_id);
      console.log(User);
      // if (confirm("Sure delete this data") == true) {
        this.userService.deleteUsers(User.user_id).subscribe((response: any) => {
          //this.users = response.data;
          console.log(response.data);
          this.showNotificationSuccess(from, align,response.message);
        });
      
    }



    delete(data,from,align){
    data.function.subscribe((response: any) => {
      console.log(response.data);
      this.showNotificationSuccess(from, align,response.message);
    });

    }  
}

