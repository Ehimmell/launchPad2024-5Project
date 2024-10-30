import {AfterViewInit, Component, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent implements AfterViewInit {
  searchInput: HTMLElement | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)) {
      this.searchInput = document.getElementById('searchInput');
      if (this.searchInput) {
        this.searchInput.addEventListener('keydown', (e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            console.log('Search for:');
          }
        });
      }
    }
  }
}
