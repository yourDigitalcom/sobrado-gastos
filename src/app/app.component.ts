import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'disk-breja-cotia';

  constructor(private router: Router) {}

  ngOnInit() {
    if (window.location.pathname === '/statement') {
      this.router.navigate(['home']);
    }
  }
}
