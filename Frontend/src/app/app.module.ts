import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchCollegeComponent } from './components/search-college/search-college.component';
import { FormsModule } from '@angular/forms';
import { CollegeDetailsComponent } from './components/college-details/college-details.component';
import { CollegeListComponent } from './components/college-list/college-list.component';
import { HomeComponent } from './components/home/home.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { SortOptionsComponent } from './components/sort-options/sort-options.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchCollegeComponent,
    CollegeDetailsComponent,
    CollegeListComponent,
    HomeComponent,
    FilterFormComponent,
    SortOptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
