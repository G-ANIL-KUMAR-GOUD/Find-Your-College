import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedCollegeService {

  constructor() { }
  private selectedCollegeSource = new BehaviorSubject<any>(null); // default empty
  selectedCollege$ = this.selectedCollegeSource.asObservable();

  setSelectedCollege(collegeCode: any) {
    this.selectedCollegeSource.next(collegeCode);
  }
}
