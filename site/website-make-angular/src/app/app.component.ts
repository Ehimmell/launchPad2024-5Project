import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgOptimizedImage} from "@angular/common";
import {SearchbarComponent} from "./searchbar/searchbar.component";
import {QaComponent} from "./qa/qa.component";
import {DisclaimerComponent} from "./disclaimer/disclaimer.component";
import {ProfessorCardComponent} from "./professor-card/professor-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, SearchbarComponent, QaComponent, DisclaimerComponent, ProfessorCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'website-make-angular';
}
