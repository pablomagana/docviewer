import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string;
  @Input() routeGoBack: string;

  constructor(private router: Router) {}

  canGoBack() {
    return this.routeGoBack;
  }
  goBack() {
    this.router.navigate([this.routeGoBack]);
  }
}
