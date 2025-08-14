import { Component, OnDestroy, OnChanges, OnInit } from '@angular/core';
import { College } from 'src/app/models/college.model';
import { CollegeService } from 'src/app/services/college.service';
import { SharedCollegeService } from 'src/app/services/shared-college.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Input } from '@angular/core';
@Component({
  selector: 'app-college-details',
  templateUrl: './college-details.component.html',
  styleUrls: ['./college-details.component.css']
})
export class CollegeDetailsComponent implements OnInit, OnDestroy {
  @Input() collegeDetails: College[] = [];
      // collegeDetails: College[] = [];
  loading: boolean = false;
  // selectedCollege: any;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private sharedCollege: SharedCollegeService,
    private collegeService: CollegeService
  ) {}
  ngOnInit() {
       this.sharedCollege.selectedCollege$
      .pipe(takeUntil(this.destroy$))
      .subscribe(collegeCode => {
        if (collegeCode) {
          console.log('Fetching details for code:', collegeCode);
          this.fetchCollegeDetails(collegeCode);
        }
      });
}
fetchCollegeDetails(collegeCode: string) {
 this.loading = true;
    this.collegeService.getCollegeDetails(collegeCode)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          
          this.collegeDetails = data;
          console.log('College Details:', data);
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load college details';
          this.loading = false;
        }
      });
}
  ngOnDestroy() {
    
     this.destroy$.next();
    this.destroy$.complete();
  }
}
