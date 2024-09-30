import { Component, Input } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-question-answer',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './question-answer.component.html',
  styleUrl: './question-answer.component.css'
})
export class QuestionAnswerComponent {
  @Input() question: string | undefined;
  @Input() answer: string | undefined;
  answerVis: boolean = false;
  dropDownCarat: string = this.answerVis ? '▲' : '▼';

  toggleAnswer() {
    this.answerVis = !this.answerVis;
    this.dropDownCarat = this.answerVis ? '▲' : '▼';
  }
}
