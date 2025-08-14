import { Component } from '@angular/core';
import { College } from 'src/app/models/college.model';
import { CollegeService } from 'src/app/services/college.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  colleges: College[] = [];
  selectedCollegeDetails: College[] = [];

  constructor(private collegeService: CollegeService) {}

  onFilterChange(filter: { rank: number; gender: string; branch: string }) {
    this.collegeService.getFilteredColleges(filter.rank, filter.gender, filter.branch)
      .subscribe(data => {
        this.colleges = data;
        this.selectedCollegeDetails = []; // clear details view
      });
  }

  onSortChange(sort: { sortBy: string; order: string }) {
    this.collegeService.getFilteredColleges(undefined, undefined, undefined, sort.sortBy, sort.order)
      .subscribe(data => {
        this.colleges = data;
        this.selectedCollegeDetails = [];
      });
  }

  onCollegeSelect(collegeCode: string) {
    this.collegeService.getCollegeDetails(collegeCode)
      .subscribe(data => {
        this.selectedCollegeDetails = data;
      });
  }

  onCollegeSearch(query: string) {
    this.collegeService.searchColleges(query)
      .subscribe(suggestions => {
       
        console.log('Suggestions:', suggestions);
      });
  }

  onSearchSubmit(collegeCode: string) {
    this.onCollegeSelect(collegeCode);
  }
}
