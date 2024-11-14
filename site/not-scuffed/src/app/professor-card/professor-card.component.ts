import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';
import {SlidingGpaGraphComponent} from '../sliding-gpa-graph/sliding-gpa-graph.component';


@Component({
  selector: 'app-professor-card',
  standalone: true,
  templateUrl: './professor-card.component.html',
  imports: [
    NgForOf,
    SlidingGpaGraphComponent
  ],
  styleUrls: ['./professor-card.component.css']
})
export class ProfessorCardComponent {
  @Input()name: string = "Mystery Professor";
  @Input()classes: string[] = ["CS 251", "CS 381"];
  @Input()gpas: number[] = [2.0, 1.0];
  @Input()summary: string = "No review on a professor we can't find!";
}
