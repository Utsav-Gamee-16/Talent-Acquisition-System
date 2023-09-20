import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  showerror =false;
  showforgot:boolean = false;
  showlogin:boolean = true;
  error: any = null;
  isLoading = false;

  forgot(){
    this.showlogin = false;
    this.showforgot = true;
    return false;
  }

  login(){
    this.showlogin = true;
    this.showforgot = false;
    return false;
  }

  myForm: FormGroup;

  constructor(private formBuilder : FormBuilder,private route:Router, private authService: AuthService) { 
    
    this.myForm = this.formBuilder.group({
      Email: ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Password : ['',Validators.required,],
    })
  }

  
  public myError = (controlName: string, errorName: string) =>{
    return this.myForm.controls[controlName].hasError(errorName);
  }

  onSubmit(){
    if(this.myForm.valid){ 
      let data = this.authService.signIn(this.myForm.value.Email, this.myForm.value.Password)
      console.log("data", data)
    }    
  }

  ngOnInit(): void {
    this.error = null
    this.authService.err.subscribe(err => {
      this.error = err
      console.log("error",this.error);      
    })
  }
}
