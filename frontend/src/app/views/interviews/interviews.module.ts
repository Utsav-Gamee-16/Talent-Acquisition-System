import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewsComponent } from './interviews.component';
import { InterviewsRoutingModule } from './interviews-routing.module';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import {MatIconModule} from '@angular/material/icon'; 
import { FormGroup,FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  imports: [
    InterviewsRoutingModule,
    CommonModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [ InterviewsComponent ]
})
export class InterviewsModule { }