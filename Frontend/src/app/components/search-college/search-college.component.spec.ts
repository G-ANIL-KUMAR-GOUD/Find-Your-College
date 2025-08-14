import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCollegeComponent } from './search-college.component';

describe('SearchCollegeComponent', () => {
  let component: SearchCollegeComponent;
  let fixture: ComponentFixture<SearchCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCollegeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
