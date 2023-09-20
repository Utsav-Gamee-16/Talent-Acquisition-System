import { Component, ViewChild,OnInit} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { ScreeningService } from "app/services/screening/screening.service";
declare var $: any;

@Component({
  selector: "screening",
  templateUrl: "./screening.component.html",
  styleUrls: ["./screening.component.css"],
})
export class PaginatorOverviewExample {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
}
// interfaces
 interface screening {
  CandidateName: string;
  designation: string;
  Skills: string;
  Review: string;
  created_at : string;
  candidate_id : Number;
}

interface candidate {
  candidate_id : Number;
  name : String;
}

@Component({
  selector: "screening",
  templateUrl: "./screening.component.html",
  styleUrls: ["./screening.component.css"],
})



export class ScreeningComponent implements OnInit{
  [x: string]: any;
  title = "Screening";
  //  show = false;
  hide(screening:any){
    if(screening.length>10){
      return true;
    }
    else {
      return false;
    }
  }
  showview: boolean = true;
  showadd: boolean = false;
  formtitle: string;
  // formsubtitle: string;
  screeningform: any;
  saveButton:any = false;


  // for dynamic view
  screenings: screening[];
  displayedColumns: string[] = ['CandidateName', 'Designation', 'Skills', '  Review Status'];

  // option for candidates 
  candidates : candidate[];


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
  
  // submit and redirect page
  onSubmit(from, align){
    
    console.log("add date data",this.addForm.value);
    this.screeningService.postScreenings(this.addForm.value).subscribe((response:any) => {
     console.log(response.data);
     this.showNotificationSuccess(from,align,'Saved Successfully.');
     this.getScreening();
   })
    this.addForm.reset()    
    
   this.showview =! this.showview
    this.showadd =!this.showadd
  }  

  // add screening details 
  addScreening() {
    console.log(this.addForm.value);
    this.showview = !this.showview;
    this.showadd = !this.showadd;
    this.saveButton = true;
    this.formtitle = "Screening Details";
  } 
 
  cancel() {
    console.log("cancel");
    this.showadd = !this.showadd;
    this.showview = !this.showview;
    this.addForm.reset()
  }
  
  //constructor
  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private screeningService: ScreeningService , ) {
    this.addForm = this.formBuilder.group({
      candidate_id : [" ",Validators.required],

      designation: ["", Validators.required],
      skills: ["", Validators.required],
      review: ["", Validators.required],  
    });
    this.getScreening();
    this.getCandidates()
    
  }
 
  
  ngOnInit(): void {
  }

  // screening details get method
  getScreening(){
    this.screeningService.getScreenings().subscribe((response:any) => {
      this.screenings = response.data;
     console.log("fgfg",response.data);
    })
  }

  getCandidates(){
    this.screeningService.getcandidate().subscribe((response:any) => {
      this.candidates = response.data;
     console.log("CANDIDATES",response.data);
    })
  }
  // post method to add screen details
  postScreening(from:any, align:any){
    this.screeningService.postScreenings(this.addForm.value).subscribe((response:any) => {
      this.screenings = response.data;
     console.log(response.data);    
    })
  }


  // Pagination
  pagination: number = 1;

  renderPage(event: number) {
    this.pagination = event;
  }
}
