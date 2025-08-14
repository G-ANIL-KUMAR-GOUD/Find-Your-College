import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent  } from './components/home/home.component';
import { CollegeDetailsComponent } from './components/college-details/college-details.component';


const routes: Routes = [
    { path: 'college-details/:collegeCode', component: CollegeDetailsComponent },
    { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
