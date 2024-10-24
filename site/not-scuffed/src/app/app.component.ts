import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BannerComponent} from './banner/banner.component';
import {SearchbarComponent} from './searchbar/searchbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BannerComponent, SearchbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'not-scuffed';
}
