import { Component, Input } from '@angular/core';
import { College } from 'src/app/models/college.model';

@Component({
  selector: 'app-college-list',
  templateUrl: './college-list.component.html',
  styleUrls: ['./college-list.component.css']
})
export class CollegeListComponent {
  @Input() colleges: College[] = [];
  ngOnInit() {
    console.log(this.colleges);
  }
}
