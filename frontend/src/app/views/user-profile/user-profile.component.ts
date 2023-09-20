import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserProfileService } from "../../services/user-profile/user-profile.service";
import { DeleteDailogeComponent } from "../delete-dialoge/delete-dailoge/delete-dailoge.component";
import { MatDialog } from "@angular/material/dialog";

declare var $: any; 
interface User {
  user: string;
  email: string;
  mobile: number;
  usertype: string;
}

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  pagination: number = 1;
  users: User[];

  showaddform: boolean = false;
  showusers: boolean = true;
  showupdateform: boolean = false;
  showsavebtn: boolean = false;
  showupdatebtn: boolean = false;
  user_id : any;
  title : string;
  // subtitle : string;

  addForm: FormGroup;

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

  showDelete(from, align,messagedata) {
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

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private http: HttpClient,
    private userService: UserProfileService,
    private dialog: MatDialog
  ) {
    this.addForm = this.formBuilder.group({
      first_name: ["", Validators.required],
      middle_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), ], ],
      mobile: [ "", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10), ], ],
      user_type: ["", Validators.required],
    });

    this.getUser();
  }

  public myError = (controlName: string, errorName: string) => {
    return this.addForm.controls[controlName].hasError(errorName);
  };

  getUser() {
    this.userService.getUsers().subscribe((response: any) => {
      this.users = response.data;
      console.log(this.users);
    });
  }

  addUser(from, align) {
    this.userService.addUsers(this.addForm.value).subscribe((response: any) => {
     // this.users = response.data;
      console.log(response.data);
      this.showSuccess(from, align,response.message);
      this.getUser();
    });
  }

  updateUser(from, align) {
    this.userService.updateUser(this.user_id,this.addForm.value).subscribe((response: any) => {
     // this.users = response.data;
      console.log(response.data);
      this.showSuccess(from, align,response.message);
      this.getUser();
    });
  }

  deleteUser(User: any, from, align) {
    console.log(User);
    if (confirm("Sure delete this data") == true) {
      this.userService.deleteUsers(User.user_id).subscribe((response: any) => {
        //this.users = response.data;
        console.log(response.data);
        this.getUser();
        this.showSuccess(from, align,response.message);
      });
    }
  }
  
  onSubmit(from, align) {
    if (this.addForm.valid) {
      this.addUser(from, align);     
      this.showusers = !this.showusers;
      this.showaddform = !this.showaddform;
      console.log(this.addForm.value);
      this.addForm.reset();
    }
  }

  onUpdate(from, align) {
    if (this.addForm.valid) {
      this.updateUser(from, align);
      this.showusers = !this.showusers;
      this.showaddform = !this.showaddform;
      console.log(this.addForm.value);
      this.addForm.reset();
    }
  }

  renderPage(event: number) {
    this.pagination = event;
  }

  ngOnInit(): void { }

  addUserform() {
    this.showusers = !this.showusers;
    this.showaddform = !this.showaddform;
    this.showsavebtn = true;
    this.showupdatebtn = false;
    this.title = "User Details";
  }

  updateUserform(User: any) {
    this.showusers = !this.showusers;
    this.showaddform = !this.showaddform;
    this.showsavebtn = false;
    this.showupdatebtn = true;
    this.title = "User Details";
    this.user_id = User.user_id;
    console.log(User);
    this.addForm.setValue({
      "first_name": User.first_name,
      "middle_name": User.middle_name,
      "last_name": User.last_name,
      "email": User.email,
      "mobile": User.mobile,
      "user_type": User.user_type,
    });
  }

  cancel() {
    console.log("cancel");
    this.showusers = !this.showusers;
    this.showaddform = !this.showaddform;
    this.addForm.reset();
  }

   //Delete dailog box
   openDialog(
    deleteDetails,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    const dialogRef = this.dialog.open(DeleteDailogeComponent, {
      data: {function : this.userService.deleteUsers(deleteDetails.user_id)}
    });
    console.log("in users open dialog box ", deleteDetails);
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        this.getUser();
      },
    });
}
}
