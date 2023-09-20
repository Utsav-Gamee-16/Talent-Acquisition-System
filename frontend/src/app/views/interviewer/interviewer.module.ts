import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InterviewerComponent } from "./interviewer.component";
import { InterviewerRoutingModule } from "./interviewer-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { MatPaginatorModule } from "@angular/material/paginator";
import { NgxPaginationModule } from "ngx-pagination";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    InterviewerRoutingModule,
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
    MatPaginatorModule,
    NgxPaginationModule,
    MatSortModule,
    MatAutocompleteModule,
    MatTableModule
  ],
  declarations: [InterviewerComponent],
})
export class InterviewerModule {}
