import {Component, Input, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SlidingChartComponent} from "../sliding-chart/sliding-chart.component";

@Component({
  selector: 'app-professor-card',
  standalone: true,
  imports: [CommonModule, SlidingChartComponent],
  templateUrl: './professor-card.component.html',
  styleUrl: './professor-card.component.css'
})
export class ProfessorCardComponent {
  @Input() classes: string[] = ['Mystery Class 1'];
  @Input() GPAs: number[] = [0];
  @Input() summary: string = 'No summary- yet!';
  @Input() name: string = 'Mystery Professor';
  classesEqualGPAs: boolean = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['classes'] || changes['GPAs']) {
      this.classesEqualGPAs = this.classes.length === this.GPAs.length;
    }
  }
}
