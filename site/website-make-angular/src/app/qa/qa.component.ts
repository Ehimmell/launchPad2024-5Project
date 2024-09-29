import { Component } from '@angular/core';
import {QuestionAnswerComponent} from "../question-answer/question-answer.component";

@Component({
  selector: 'app-qa',
  standalone: true,
  imports: [
    QuestionAnswerComponent
  ],
  templateUrl: './qa.component.html',
  styleUrl: './qa.component.css'
})
export class QaComponent {

}
