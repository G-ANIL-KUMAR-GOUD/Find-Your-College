import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { College } from '../models/college.model';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getFilteredColleges(
    rank?: number,
    gender?: string,
    branch?: string,
    sortBy?: string,
    order?: string
  ): Observable<College[]> {
    let params = new HttpParams();

    if (rank !== undefined) params = params.set('rank', rank.toString());
    if (gender) params = params.set('gender', gender);
    if (branch) params = params.set('branch', branch);
    if (sortBy) params = params.set('sortBy', sortBy);
    if (order) params = params.set('order', order);

    return this.http.get<College[]>(`${this.baseUrl}/filter`, { params });
  }

  searchColleges(query: string): Observable<string[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<string[]>(`${this.baseUrl}/search`, { params });
  }

  getCollegeDetails(collegeCode: string): Observable<College[]> {
    return this.http.get<College[]>(`${this.baseUrl}/details/${collegeCode}`);
  }
  
}
