import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  constructor(private location: Location) {}

  goBack(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
