import { Component, EventEmitter, Output } from '@angular/core';
import { CollegeService } from '../../services/college.service';
import { SharedCollegeService } from 'src/app/services/shared-college.service';
import { CollegeListComponent } from '../college-list/college-list.component';

@Component({
  selector: 'app-search-college',
  templateUrl: './search-college.component.html'
})
export class SearchCollegeComponent {
  query: string = '';
  suggestions: string[] = [];
  
  @Output() collegeSelected = new EventEmitter<string>();

  constructor(private collegeService: CollegeService,
     private sharedCollegeService: SharedCollegeService,
     ) {}

  onSearch() {
    if (this.query.length >= 2) {
      
      this.collegeService.searchColleges(this.query).subscribe((data: string[]) => {
        this.suggestions = data;
        // console.log('Search Suggestions:', this.suggestions);
      });
    } else {
      this.suggestions = [];
    }
  }
 

  selectCollege(college: string) {
    console.log('Selected College:', college);
    
    
    const collegeCode = college.split('-')[0].trim(); // Assuming college code is the first part before ' - '
    // this.collegeSelected.emit(college);
    this.sharedCollegeService.setSelectedCollege(collegeCode);
    this.query = college;
    this.suggestions = [];
  }
}