import {Component, HostListener, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BannerComponent} from './banner/banner.component';
import {SearchbarComponent} from './searchbar/searchbar.component';
import {DropdownComponent} from './dropdown/dropdown.component';
import {MainButtonsComponent} from './main-buttons/main-buttons.component';
import {FlyingPicturesComponent} from './flying-pictures/flying-pictures.component';
import {ProfessorCardComponent} from './professor-card/professor-card.component';
import {isPlatformBrowser, NgForOf, NgStyle} from '@angular/common';

interface Star {
  x: number;
  y: number;
  size: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BannerComponent, SearchbarComponent, DropdownComponent, MainButtonsComponent, FlyingPicturesComponent, ProfessorCardComponent, NgForOf, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'not-scuffed';

  stars: Star[] = [];
  numberOfStars = 500;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)) {
      this.generateStars();
    }
  }

  generateStars() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.stars = [];

    for (let i = 0; i < this.numberOfStars; i++) {
      const star: Star = {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
      };
      this.stars.push(star);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.generateStars();
  }
}
