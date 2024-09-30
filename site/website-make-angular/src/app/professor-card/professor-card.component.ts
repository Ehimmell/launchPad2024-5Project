import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-professor-card',
  standalone: true,
  imports: [],
  templateUrl: './professor-card.component.html',
  styleUrl: './professor-card.component.css'
})
export class ProfessorCardComponent {
  @Input() GPA: number = 0;
  @Input() summary: string = 'No summary- yet!';
  @Input() name: string = 'Mystery Professor';
}
