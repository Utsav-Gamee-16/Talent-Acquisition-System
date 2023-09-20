import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatesService } from '../../services/candidates/candidates.service';
import { DeleteDailogeComponent } from "../delete-dialoge/delete-dailoge/delete-dailoge.component";
import { MatDialog } from "@angular/material/dialog";


declare var $: any;

interface Candidate {
  candidate: string;
  date_of_birth: string;
  email: string;
  personal_mobile: number;
  home_mobile: number;
  designation: string;
  previous_company: string;
  experience: number;
  education: string;
  cv: string;
}

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  file: File;
  pagination: number = 1;
  candidates: Candidate[];

  showaddform: boolean = false;
  showcandidates: boolean = true;
  showupdateform: boolean = false;
  showsavebtn: boolean = false;
  showupdatebtn: boolean = false;
  candidate_id: any;
  title: string;
  subtitle: string;
  baseurl = "http://localhost:3000/"

  addForm: FormGroup;

  showSuccess(from, align, messagedata) {
    const type = ["success"];
    $.notify(
      {
        icon: "notifications",
        message: messagedata,
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

  showDelete(from, align, messagedata) {
    const type = ["danger"];
    $.notify(
      {
        icon: "notifications",
        message: messagedata,
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


  constructor(private formBuilder: FormBuilder, private route: Router, private http: HttpClient,
     private candidateService: CandidatesService,
      private dialog: MatDialog) {
    this.addForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      last_name: ['', Validators.required],
      date_of_birth: ['',Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      personal_mobile: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      home_mobile: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      designation: ['', Validators.required],
      previous_company: ['',],
      experience: ['', Validators.required],
      education: ['', Validators.required],
      cv: ['',],
    })

    this.getCandidate();

  }
  
  onChange(event) {
    this.file = event.target.files[0];
    console.log("event", this.file);
  }

  floor(year:number){
    return Math.floor(year);
  }
  public myError = (controlName: string, errorName: string) => {
    return this.addForm.controls[controlName].hasError(errorName);
  }

  getCandidate() {
    this.candidateService.getCandidates().subscribe((response: any) => {
      this.candidates = response.data;
      console.log(response.data);
      
    })
  }
  addCandidate(from, align) {
    console.log("file ", this.file)
    console.log("first_name",this.addForm.get('first_name').value)
    const DOB = this.addForm.value.date_of_birth.toString();
    console.log("fdkjjbg",typeof(DOB));
    console.log("type");
    console.log("dhbfjsd",DOB.slice(0,22));

    const formData = new FormData();
    formData.append('first_name', this.addForm.get('first_name').value);
    formData.append('middle_name',this.addForm.value.middle_name);
    formData.append('last_name',this.addForm.value.last_name);
    formData.append('date_of_birth',DOB.slice(0,24));
    formData.append('email',this.addForm.value.email);
    formData.append('personal_mobile',this.addForm.value.personal_mobile);
    formData.append('home_mobile',this.addForm.value.home_mobile);
    formData.append('designation',this.addForm.value.designation);
    formData.append('previous_company',this.addForm.value.previous_company);
    formData.append('experience',this.addForm.value.experience);
    formData.append('education',this.addForm.value.education);
    formData.append('cv', this.file);

    console.log("formdata", JSON.stringify(formData));
    formData.forEach((value, key) => {
      console.log(key + " " + value)
    });

    this.candidateService.addCandidates(formData).subscribe((response: any) => {
      //this.candidates = response.data;
      console.log(response.data);
      this.showSuccess(from, align, response.message);
      this.getCandidate();

    })
  }

  updateCandidate(from, align) {
    const DOB = this.addForm.value.date_of_birth.toString();

    const formData = new FormData();
    formData.append('first_name', this.addForm.get('first_name').value);
    formData.append('middle_name',this.addForm.value.middle_name);
    formData.append('last_name',this.addForm.value.last_name);
    formData.append('date_of_birth',DOB.slice(0,24));
    formData.append('email',this.addForm.value.email);
    formData.append('personal_mobile',this.addForm.value.personal_mobile);
    formData.append('home_mobile',this.addForm.value.home_mobile);
    formData.append('designation',this.addForm.value.designation);
    formData.append('previous_company',this.addForm.value.previous_company);
    formData.append('experience',this.addForm.value.experience);
    formData.append('education',this.addForm.value.education);
    formData.append('cv', this.file);

    console.log("formdata", JSON.stringify(formData));
    formData.forEach((value, key) => {
      console.log(key + " " + value)
    });

    this.candidateService.updateCandidates(this.candidate_id, formData ).subscribe((response: any) => {
      //this.candidates = response.data;
      console.log(response.data);
      this.showSuccess(from, align, response.message);
      this.getCandidate();


    })
  }

  deleteCandidate(Candidate: any, from, align) {
    console.log(Candidate);
    if (confirm("Sure delete this data") == true) {
      this.candidateService.deleteCandidates(Candidate.candidate_id).subscribe((response: any) => {
        //this.users = response.data;
        console.log(response.data);
        this.getCandidate();
        this.showSuccess(from, align, response.message);

      });
    }
  }

  onSubmit(from, align) {
    if (this.addForm.valid) {
      this.addCandidate(from, align)
     
      this.showcandidates = !this.showcandidates
      this.showaddform = !this.showaddform
      //console.log(this.addForm.value)
      this.addForm.reset()
    }
  }

  onUpdate(from, align) {
    if (this.addForm.valid) {
      this.updateCandidate(from, align)

      this.showcandidates = !this.showcandidates
      this.showaddform = !this.showaddform
      console.log(this.addForm.value)
      this.addForm.reset()
    }
  }

  renderPage(event: number) {
    this.pagination = event;
  }

  ngOnInit(): void {
  }

  addCandidateform() {
    this.showcandidates = !this.showcandidates
    this.showaddform = !this.showaddform
    this.showsavebtn = true;
    this.showupdatebtn = false;
    this.title = "Candidate Details";
    // this.subtitle = "Fill candidate details";
  }

  updateCandidateform(Candidate: any) {
    this.showcandidates = !this.showcandidates
    this.showaddform = !this.showaddform
    this.showsavebtn = false;
    this.showupdatebtn = true;
    this.title = "Candidate Details";
    // this.subtitle = "Update candidate details";

    this.candidate_id = Candidate.candidate_id
    this.addForm.setValue({
      "first_name": Candidate.first_name,
      "middle_name": Candidate.middle_name,
      "last_name": Candidate.last_name,
      "date_of_birth": Candidate.date_of_birth,
      "email": Candidate.email,
      "personal_mobile": Candidate.personal_mobile,
      "home_mobile": Candidate.home_mobile,
      "designation": Candidate.designation,
      "previous_company": Candidate.previous_company,
      "experience": Candidate.experience,
      "education": Candidate.education,
      "cv": null
    });
  }

  cancel() {
    console.log("cancel");
    this.showcandidates = !this.showcandidates;
    this.showaddform = !this.showaddform;
    this.addForm.reset()
  }


  //Delete dailog box
  openDialog(
    deleteDetails,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    const dialogRef = this.dialog.open(DeleteDailogeComponent, {
      data: { function: this.candidateService.deleteCandidates(deleteDetails.candidate_id) }
    });
    console.log("in candidate open dialog box ", deleteDetails);
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        this.getCandidate();
      },
    });
  }
}
