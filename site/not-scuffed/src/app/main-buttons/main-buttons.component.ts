import { Component } from '@angular/core';

@Component({
  selector: 'app-main-buttons',
  standalone: true,
  imports: [],
  templateUrl: './main-buttons.component.html',
  styleUrl: './main-buttons.component.css'
})
export class MainButtonsComponent {
  search(): void {
    window.scrollTo({ top: 550, behavior: 'smooth' });
  }

  qa(): void {
    window.scrollTo({ top: 1000, behavior: 'smooth' });
  }
}
