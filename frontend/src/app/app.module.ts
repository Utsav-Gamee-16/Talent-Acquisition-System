import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './views/components/components.module';
import { AdminLayoutModule } from './views/layouts/admin-layout/admin-layout.module'
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './views/layouts/admin-layout/admin-layout.component';
import { ProfileComponent } from './views/components/profile/profile.component';
import { AuthService } from './services/auth/auth.service';
import { CandidatesService } from './services/candidates/candidates.service';
import { UserProfileService } from './services/user-profile/user-profile.service';
import { DashboardService } from './services/dashboard/dashboard.service';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { AuthInterceptor } from './services/auth/auth-interceptor';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { DeleteDailogeComponent } from './views/delete-dialoge/delete-dailoge/delete-dailoge.component'
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,   
    RouterModule,
    AppRoutingModule,
    AdminLayoutModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ProfileComponent,
    DeleteDailogeComponent,
  ],

  providers: [AuthService,CandidatesService, UserProfileService,DashboardService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
