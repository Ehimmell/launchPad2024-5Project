import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-answer',
  standalone: true,
  imports: [],
  templateUrl: './question-answer.component.html',
  styleUrl: './question-answer.component.css'
})
export class QuestionAnswerComponent {
  @Input() question: string | undefined;
  @Input() answer: string | undefined;
}
