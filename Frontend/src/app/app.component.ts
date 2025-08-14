import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Find-Your-College';
  currentYear = new Date().getFullYear();
  name = 'Anil Kumar Goud G';
  email ='mailto:anilkumargoudgattu@gmail.com';
  linkedin = 'https://www.linkedin.com/in/g-anil-kumar-goud/';
  leetcode ='https://leetcode.com/AnilKumarGoud_G';

  openLink(link: string) {
    window.open(link, '_blank');
  }
}
