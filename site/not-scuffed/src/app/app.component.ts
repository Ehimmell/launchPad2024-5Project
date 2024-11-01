import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BannerComponent} from './banner/banner.component';
import {SearchbarComponent} from './searchbar/searchbar.component';
import {DropdownComponent} from './dropdown/dropdown.component';
import {MainButtonsComponent} from './main-buttons/main-buttons.component';
import {FlyingPicturesComponent} from './flying-pictures/flying-pictures.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BannerComponent, SearchbarComponent, DropdownComponent, MainButtonsComponent, FlyingPicturesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'not-scuffed';
}
