import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Mozart';
  isOpen = true;
  mobile = window.screen.width < 720;

  routes = [
    {
      name: 'Search',
      link: './search',
    },
    {
      name: 'Latest CVEs',
      link: './cves',
    },
    {
      name: 'State Reports',
      link: './states',
    },
  ];

  toggle(button: boolean) {
    if (button) {
      this.isOpen = !this.isOpen;
    } else if (this.mobile) {
      this.isOpen = !this.isOpen;
    }
  }
}
